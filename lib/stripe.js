/**
 * Stripe payment integration
 */

const logger = require('./logger');

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required. Please set it in your .env file.');
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create or retrieve Stripe customer
 */
async function getOrCreateCustomer(user) {
  try {
    if (user.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(user.stripeCustomerId);
      return customer;
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: user._id.toString(),
      },
    });

    // Update user with customer ID
    user.stripeCustomerId = customer.id;
    await user.save();

    return customer;
  } catch (error) {
    logger.error('Error creating/retrieving Stripe customer', error);
    throw error;
  }
}

/**
 * Create checkout session for subscription
 */
async function createCheckoutSession(user, tier, period = 'monthly') {
  try {
    const customer = await getOrCreateCustomer(user);

    // Get price ID from environment variables or use test mode
    // Format: STRIPE_PRICE_BASIC_MONTHLY, STRIPE_PRICE_BASIC_YEARLY, etc.
    const priceIdKey = `STRIPE_PRICE_${tier.toUpperCase()}_${period.toUpperCase()}`;
    const priceId = process.env[priceIdKey];

    if (!priceId) {
      throw new Error(`Price ID not configured for ${tier} ${period}. Set ${priceIdKey} in environment variables.`);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/subscription/cancel`,
      metadata: {
        userId: user._id.toString(),
        tier: tier,
        period: period,
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Create portal session for subscription management
 */
async function createPortalSession(customerId, returnUrl) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    logger.error('Error creating portal session', error);
    throw error;
  }
}

/**
 * Cancel subscription
 */
async function cancelSubscription(subscriptionId, immediately = false) {
  try {
    if (immediately) {
      return await stripe.subscriptions.cancel(subscriptionId);
    } else {
      return await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }
  } catch (error) {
    logger.error('Error canceling subscription', error);
    throw error;
  }
}

/**
 * Retrieve subscription
 */
async function getSubscription(subscriptionId) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    logger.error('Error retrieving subscription', error);
    throw error;
  }
}

/**
 * Update subscription
 */
async function updateSubscription(subscriptionId, newPriceId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    return await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: 'always_invoice',
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

module.exports = {
  stripe,
  getOrCreateCustomer,
  createCheckoutSession,
  createPortalSession,
  cancelSubscription,
  getSubscription,
  updateSubscription,
};
