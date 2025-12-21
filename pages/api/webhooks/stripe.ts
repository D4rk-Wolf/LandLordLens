import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe } from '../../../lib/stripe';

// Disable body parsing for webhook
export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'customer.subscription.created':
                await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
                break;

            case 'customer.subscription.updated':
                await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
                break;

            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
                break;

            case 'invoice.paid':
                await handleInvoicePaid(event.data.object as Stripe.Invoice);
                break;

            case 'invoice.payment_failed':
                await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
                break;

            case 'customer.subscription.trial_will_end':
                await handleTrialWillEnd(event.data.object as Stripe.Subscription);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    console.log('Subscription created:', subscription.id);

    const userId = subscription.metadata.userId;
    if (!userId) {
        console.error('No userId in subscription metadata');
        return;
    }

    // Update user subscription in database
    // TODO: Implement database update
    // await updateUserSubscription(userId, {
    //   stripeSubscriptionId: subscription.id,
    //   stripeCustomerId: subscription.customer as string,
    //   stripePriceId: subscription.items.data[0].price.id,
    //   status: subscription.status,
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    console.log('Subscription updated:', subscription.id);

    const userId = subscription.metadata.userId;
    if (!userId) return;

    // Update subscription status
    // TODO: Implement database update
    // await updateUserSubscription(userId, {
    //   status: subscription.status,
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //   stripePriceId: subscription.items.data[0].price.id,
    // });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log('Subscription deleted:', subscription.id);

    const userId = subscription.metadata.userId;
    if (!userId) return;

    // Downgrade user to starter tier
    // TODO: Implement database update
    // await updateUserSubscription(userId, {
    //   status: 'canceled',
    //   tier: 'starter',
    // });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
    console.log('Invoice paid:', invoice.id);

    // Send receipt email
    // TODO: Implement email sending
    // await sendReceiptEmail(invoice);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    console.log('Invoice payment failed:', invoice.id);

    // Send payment failed email
    // TODO: Implement email sending
    // await sendPaymentFailedEmail(invoice);
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
    console.log('Trial ending soon:', subscription.id);

    const userId = subscription.metadata.userId;
    if (!userId) return;

    // Send trial ending reminder
    // TODO: Implement email sending
    // await sendTrialEndingEmail(userId, subscription);
}
