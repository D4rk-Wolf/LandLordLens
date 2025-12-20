const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../../models/User');
const Payment = require('../../models/Payment');
const Property = require('../../models/tenant/Property');
const {
  getSubscriptionTier,
  getMaxProperties,
  getRequiredTier,
  validateSubscriptionForProperties,
} = require('../../lib/subscription');
const {
  createCheckoutSession,
  createPortalSession,
  cancelSubscription,
  getSubscription,
  getOrCreateCustomer,
} = require('../../lib/stripe');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * POST /api/payments/create-checkout
 * Create Stripe checkout session for subscription
 */
router.post('/create-checkout', async (req, res) => {
  try {
    const { tier, period = 'monthly' } = req.body;

    if (!tier) {
      return res.status(400).json({ error: 'Subscription tier is required' });
    }

    const validTiers = ['basic', 'premium'];
    if (!validTiers.includes(tier)) {
      return res.status(400).json({
        error: 'Invalid subscription tier',
        message: 'Free tier does not require payment. Use basic or premium.',
      });
    }

    const validPeriods = ['monthly', 'yearly'];
    if (!validPeriods.includes(period)) {
      return res.status(400).json({
        error: 'Invalid subscription period',
        validPeriods: validPeriods,
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has an active paid subscription
    if (user.subscriptionStatus === 'active' && user.subscription !== 'free') {
      return res.status(400).json({
        error: 'Active subscription exists',
        message: 'You already have an active subscription. Use the portal to manage it.',
      });
    }

    const session = await createCheckoutSession(user, tier, period);

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message,
    });
  }
});

/**
 * POST /api/payments/create-portal
 * Create Stripe customer portal session
 */
router.post('/create-portal', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.stripeCustomerId) {
      return res.status(400).json({
        error: 'No active subscription',
        message: 'You do not have an active subscription to manage.',
      });
    }

    const returnUrl = req.body.returnUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings/billing`;
    const session = await createPortalSession(user.stripeCustomerId, returnUrl);

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({
      error: 'Failed to create portal session',
      message: error.message,
    });
  }
});

/**
 * POST /api/payments/cancel-subscription
 * Cancel user's subscription
 */
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { immediately = false } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.stripeSubscriptionId) {
      return res.status(400).json({
        error: 'No active subscription',
        message: 'You do not have an active subscription to cancel.',
      });
    }

    await cancelSubscription(user.stripeSubscriptionId, immediately);

    // Update user subscription status
    user.subscriptionStatus = 'canceled';
    user.subscriptionCanceledAt = new Date();
    if (immediately) {
      // Downgrade to free tier if canceling immediately
      user.subscription = 'free';
      user.subscriptionEndDate = new Date();
    }
    user.updatedAt = new Date();
    await user.save();

    res.json({
      message: immediately
        ? 'Subscription canceled immediately'
        : 'Subscription will be canceled at the end of the billing period',
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      error: 'Failed to cancel subscription',
      message: error.message,
    });
  }
});

/**
 * GET /api/payments/history
 * Get user's payment history
 */
router.get('/history', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/payments/subscription-status
 * Get current subscription and payment status
 */
router.get('/subscription-status', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let stripeSubscription = null;
    if (user.stripeSubscriptionId) {
      try {
        stripeSubscription = await getSubscription(user.stripeSubscriptionId);
      } catch (error) {
        console.error('Error fetching Stripe subscription:', error);
      }
    }

    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const subscriptionTier = getSubscriptionTier(user.subscription);

    res.json({
      subscription: {
        tier: user.subscription,
        status: user.subscriptionStatus,
        period: user.subscriptionPeriod,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
        canceledAt: user.subscriptionCanceledAt,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
      },
      stripeSubscription: stripeSubscription
        ? {
            id: stripeSubscription.id,
            status: stripeSubscription.status,
            currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
          }
        : null,
      usage: {
        propertyCount: currentPropertyCount,
        maxProperties: getMaxProperties(user.subscription),
        validation: validateSubscriptionForProperties(user.subscription, currentPropertyCount),
      },
      tierDetails: {
        name: subscriptionTier.name,
        maxProperties: subscriptionTier.maxProperties,
        description: subscriptionTier.description,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
