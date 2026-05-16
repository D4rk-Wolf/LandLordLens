const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

const PRICE_IDS = {
    'professional_monthly': process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY,
    'professional_yearly': process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL,
    'business_monthly': process.env.STRIPE_PRICE_BUSINESS_MONTHLY,
    'business_yearly': process.env.STRIPE_PRICE_BUSINESS_ANNUAL,
    'enterprise_monthly': process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY,
    'enterprise_yearly': process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL,
};

const createCheckoutSession = async (userId, tier, period) => {
    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', userId).single();
    if (!profile) throw new Error('User not found');

    const priceId = PRICE_IDS[`${tier}_${period}`];
    if (!priceId) throw new Error('Invalid subscription tier or period');

    const sessionConfig = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing`,
        client_reference_id: userId,
        metadata: { userId, tier, period },
    };

    if (profile.stripe_customer_id) {
        sessionConfig.customer = profile.stripe_customer_id;
    } else {
        sessionConfig.customer_email = profile.email;
    }

    return stripe.checkout.sessions.create(sessionConfig);
};

const createPortalSession = async (userId) => {
    const { data: profile } = await supabaseAdmin.from('profiles').select('stripe_customer_id').eq('id', userId).single();
    if (!profile?.stripe_customer_id) throw new Error('No Stripe customer found');

    return stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard`,
    });
};

const handleWebhook = async (event) => {
    switch (event.type) {
        case 'checkout.session.completed':
            await handleCheckoutCompleted(event.data.object);
            break;
        case 'customer.subscription.updated':
            await handleSubscriptionUpdated(event.data.object);
            break;
        case 'customer.subscription.deleted':
            await handleSubscriptionDeleted(event.data.object);
            break;
    }
};

const handleCheckoutCompleted = async (session) => {
    const userId = session.client_reference_id;
    if (!userId) return;

    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    await supabaseAdmin.from('profiles').update({
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        subscription_status: subscription.status,
        subscription: session.metadata.tier,
        subscription_period: session.metadata.period,
        subscription_start_date: new Date(subscription.current_period_start * 1000).toISOString(),
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
    }).eq('id', userId);

    logger.info(`Subscription activated for user ${userId}`);
};

const handleSubscriptionUpdated = async (subscription) => {
    const { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('stripe_customer_id', subscription.customer).single();
    if (!profile) return;

    await supabaseAdmin.from('profiles').update({
        subscription_status: subscription.status,
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
    }).eq('id', profile.id);

    logger.info(`Subscription updated for user ${profile.id}`);
};

const handleSubscriptionDeleted = async (subscription) => {
    const { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('stripe_customer_id', subscription.customer).single();
    if (!profile) return;

    await supabaseAdmin.from('profiles').update({
        subscription_status: 'canceled',
        subscription: 'free',
        updated_at: new Date().toISOString(),
    }).eq('id', profile.id);

    logger.info(`Subscription canceled for user ${profile.id}`);
};

module.exports = { createCheckoutSession, createPortalSession, handleWebhook };
