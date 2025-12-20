const express = require('express');
const User = require('../../models/User');
const Payment = require('../../models/Payment');
const { stripe } = require('../../lib/stripe');
const { getSubscriptionTier } = require('../../lib/subscription');

const router = express.Router();

// Stripe webhook secret from environment
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 * Note: Raw body parsing is handled in server/index.js before this route
 */
router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

/**
 * Handle checkout session completed
 */
async function handleCheckoutCompleted(session) {
  try {
    const userId = session.metadata?.userId;
    if (!userId) {
      console.error('No userId in checkout session metadata');
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return;
    }

    // Get subscription from Stripe
    const subscriptionId = session.subscription;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await updateUserSubscription(user, subscription, session.metadata);
    }
  } catch (error) {
    console.error('Error handling checkout completed:', error);
  }
}

/**
 * Handle subscription update
 */
async function handleSubscriptionUpdate(subscription) {
  try {
    const customerId = subscription.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found for customer: ${customerId}`);
      return;
    }

    await updateUserSubscription(user, subscription);
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription) {
  try {
    const customerId = subscription.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found for customer: ${customerId}`);
      return;
    }

    // Downgrade to free tier
    user.subscription = 'free';
    user.subscriptionStatus = 'canceled';
    user.subscriptionCanceledAt = new Date();
    user.subscriptionEndDate = new Date();
    user.stripeSubscriptionId = null;
    user.updatedAt = new Date();
    await user.save();

    console.log(`Subscription canceled for user: ${user.email}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

/**
 * Handle invoice paid
 */
async function handleInvoicePaid(invoice) {
  try {
    const customerId = invoice.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found for customer: ${customerId}`);
      return;
    }

    // Create payment record
    const payment = new Payment({
      userId: user._id,
      amount: invoice.amount_paid / 100, // Convert from cents
      currency: invoice.currency.toUpperCase(),
      status: 'completed',
      paymentMethod: 'card',
      stripeChargeId: invoice.charge,
      stripeSubscriptionId: invoice.subscription,
      transactionId: invoice.id,
      type: 'subscription',
      subscriptionTier: user.subscription,
      subscriptionPeriod: invoice.billing_reason === 'subscription_create' || invoice.billing_reason === 'subscription_cycle'
        ? (invoice.period_end - invoice.period_start === 31536000 ? 'yearly' : 'monthly')
        : null,
      description: `Subscription payment - ${user.subscription} tier`,
      metadata: {
        invoiceId: invoice.id,
        billingReason: invoice.billing_reason,
      },
    });

    await payment.save();
    console.log(`Payment recorded for user: ${user.email}, amount: ${invoice.amount_paid / 100}`);
  } catch (error) {
    console.error('Error handling invoice paid:', error);
  }
}

/**
 * Handle invoice payment failed
 */
async function handleInvoicePaymentFailed(invoice) {
  try {
    const customerId = invoice.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
      console.error(`User not found for customer: ${customerId}`);
      return;
    }

    // Update subscription status
    user.subscriptionStatus = 'past_due';
    user.updatedAt = new Date();
    await user.save();

    // Create failed payment record
    const payment = new Payment({
      userId: user._id,
      amount: invoice.amount_due / 100,
      currency: invoice.currency.toUpperCase(),
      status: 'failed',
      paymentMethod: 'card',
      stripeSubscriptionId: invoice.subscription,
      transactionId: invoice.id,
      type: 'subscription',
      description: `Failed subscription payment - ${user.subscription} tier`,
      metadata: {
        invoiceId: invoice.id,
        attemptCount: invoice.attempt_count,
      },
    });

    await payment.save();
    console.log(`Payment failed for user: ${user.email}`);
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

/**
 * Handle payment intent succeeded
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    // This is typically for one-time payments
    // Subscription payments are handled via invoice.paid
    console.log(`Payment intent succeeded: ${paymentIntent.id}`);
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

/**
 * Update user subscription based on Stripe subscription
 */
async function updateUserSubscription(user, subscription, metadata = {}) {
  try {
    // Determine tier from subscription metadata or price
    let tier = metadata.tier || user.subscription;
    
    // If no tier in metadata, try to determine from price
    if (!metadata.tier && subscription.items?.data?.length > 0) {
      const priceId = subscription.items.data[0].price.id;
      // You can map price IDs to tiers here if needed
      // For now, keep existing tier or default to basic
      tier = tier || 'basic';
    }

    // Determine period from subscription interval
    const period = subscription.items?.data?.[0]?.price?.recurring?.interval === 'year' ? 'yearly' : 'monthly';

    // Update user subscription
    user.subscription = tier;
    user.subscriptionStatus = subscription.status === 'active' || subscription.status === 'trialing' ? 'active' : subscription.status;
    user.subscriptionPeriod = period;
    user.stripeSubscriptionId = subscription.id;
    user.subscriptionStartDate = new Date(subscription.current_period_start * 1000);
    user.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
    
    if (subscription.cancel_at_period_end) {
      user.subscriptionCanceledAt = new Date(subscription.canceled_at * 1000);
    } else {
      user.subscriptionCanceledAt = null;
    }

    user.updatedAt = new Date();
    await user.save();

    console.log(`Subscription updated for user: ${user.email}, tier: ${tier}, status: ${subscription.status}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
}

module.exports = router;
