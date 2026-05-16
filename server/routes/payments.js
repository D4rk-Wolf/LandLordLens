const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');
const {
  getSubscriptionTier,
  getMaxProperties,
  validateSubscriptionForProperties,
} = require('../../lib/subscription');
const {
  createCheckoutSession,
  createPortalSession,
  cancelSubscription,
  getSubscription,
} = require('../../lib/stripe');

const router = express.Router();
router.use(authenticateToken);

router.post('/create-checkout', async (req, res) => {
  try {
    const { tier, period = 'monthly' } = req.body;
    if (!tier) return res.status(400).json({ error: 'Subscription tier is required' });

    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user.userId).single();
    if (!profile) return res.status(404).json({ error: 'User not found' });

    if (profile.subscription_status === 'active' && profile.subscription !== 'free') {
      return res.status(400).json({ error: 'Active subscription exists. Use the portal to manage it.' });
    }

    const session = await createCheckoutSession(
      { _id: req.user.userId, email: req.user.email, stripeCustomerId: profile.stripe_customer_id },
      tier,
      period
    );
    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    logger.error('Error creating checkout session', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-portal', async (req, res) => {
  try {
    const { data: profile } = await supabaseAdmin.from('profiles').select('stripe_customer_id').eq('id', req.user.userId).single();
    if (!profile?.stripe_customer_id) return res.status(400).json({ error: 'No active subscription to manage.' });

    const returnUrl = req.body.returnUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings/billing`;
    const session = await createPortalSession(profile.stripe_customer_id, returnUrl);
    res.json({ url: session.url });
  } catch (error) {
    logger.error('Error creating portal session', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/cancel-subscription', async (req, res) => {
  try {
    const { immediately = false } = req.body;
    const { data: profile } = await supabaseAdmin.from('profiles').select('stripe_subscription_id').eq('id', req.user.userId).single();

    if (!profile?.stripe_subscription_id) return res.status(400).json({ error: 'No active subscription to cancel.' });

    await cancelSubscription(profile.stripe_subscription_id, immediately);

    const updates = { subscription_status: 'canceled', subscription_canceled_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    if (immediately) { updates.subscription = 'free'; updates.subscription_end_date = new Date().toISOString(); }

    await supabaseAdmin.from('profiles').update(updates).eq('id', req.user.userId);
    res.json({ message: immediately ? 'Subscription canceled immediately' : 'Subscription will be canceled at end of billing period' });
  } catch (error) {
    logger.error('Error canceling subscription', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('payments').select('*').eq('user_id', req.user.userId).order('created_at', { ascending: false }).limit(50);
    if (error) throw error;
    res.json({ payments: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/subscription-status', async (req, res) => {
  try {
    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user.userId).single();
    if (!profile) return res.status(404).json({ error: 'User not found' });

    const { count: propertyCount } = await supabaseAdmin.from('properties').select('id', { count: 'exact', head: true }).eq('user_id', req.user.userId);

    let stripeSubscription = null;
    if (profile.stripe_subscription_id) {
      try { stripeSubscription = await getSubscription(profile.stripe_subscription_id); } catch (e) { /* ignore */ }
    }

    res.json({
      subscription: {
        tier: profile.subscription,
        status: profile.subscription_status,
        period: profile.subscription_period,
        startDate: profile.subscription_start_date,
        endDate: profile.subscription_end_date,
        canceledAt: profile.subscription_canceled_at,
        stripeCustomerId: profile.stripe_customer_id,
        stripeSubscriptionId: profile.stripe_subscription_id,
      },
      stripeSubscription: stripeSubscription ? {
        id: stripeSubscription.id,
        status: stripeSubscription.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      } : null,
      usage: {
        propertyCount: propertyCount ?? 0,
        maxProperties: getMaxProperties(profile.subscription),
        validation: validateSubscriptionForProperties(profile.subscription, propertyCount ?? 0),
      },
      tierDetails: getSubscriptionTier(profile.subscription),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
