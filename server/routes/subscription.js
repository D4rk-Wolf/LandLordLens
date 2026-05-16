const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const subscriptionService = require('../services/SubscriptionService');
const {
  getAllTiers,
  getSubscriptionTier,
  getMaxProperties,
  canAddProperty,
  validateSubscriptionForProperties,
  getFormattedPrice,
  getYearlySavings,
} = require('../../lib/subscription');

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user.userId).single();
    const { count } = await supabaseAdmin.from('properties').select('id', { count: 'exact', head: true }).eq('user_id', req.user.userId);
    const tier = profile?.subscription ?? 'free';
    const subscriptionTier = getSubscriptionTier(tier);

    res.json({
      currentTier: tier,
      tierDetails: {
        name: subscriptionTier.name,
        maxProperties: subscriptionTier.maxProperties,
        description: subscriptionTier.description,
        price: {
          monthly: subscriptionTier.price.monthly,
          yearly: subscriptionTier.price.yearly,
          currency: subscriptionTier.price.currency,
          formatted: {
            monthly: getFormattedPrice(tier, 'monthly'),
            yearly: getFormattedPrice(tier, 'yearly'),
          },
        },
        yearlySavings: getYearlySavings(tier),
      },
      usage: {
        propertyCount: count ?? 0,
        maxProperties: getMaxProperties(tier),
        canAddMore: canAddProperty(tier, count ?? 0),
        remainingProperties: Math.max(0, getMaxProperties(tier) - (count ?? 0)),
      },
      subscriptionStatus: profile?.subscription_status,
      subscriptionPeriod: profile?.subscription_period,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tiers', (_req, res) => {
  const tiers = getAllTiers();
  const formattedTiers = {};
  Object.keys(tiers).forEach((tierKey) => {
    const tier = tiers[tierKey];
    formattedTiers[tierKey] = {
      name: tier.name,
      maxProperties: tier.maxProperties === Infinity ? 'Unlimited' : tier.maxProperties,
      description: tier.description,
      price: {
        monthly: tier.price.monthly,
        yearly: tier.price.yearly,
        currency: tier.price.currency,
        formatted: {
          monthly: getFormattedPrice(tierKey, 'monthly'),
          yearly: getFormattedPrice(tierKey, 'yearly'),
        },
      },
      yearlySavings: getYearlySavings(tierKey),
    };
  });
  res.json({ tiers: formattedTiers });
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { tier, period } = req.body;
    if (!tier || !period) return res.status(400).json({ error: 'Tier and period are required' });
    const session = await subscriptionService.createCheckoutSession(req.user.userId, tier, period);
    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-portal-session', async (req, res) => {
  try {
    const session = await subscriptionService.createPortalSession(req.user.userId);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
