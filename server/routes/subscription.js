/**
 * SUBSCRIPTION ROUTES
 * This file handles all API endpoints related to subscription management.
 * It connects the frontend to the SubscriptionService and handles data validation.
 */

const express = require('express');
const { authenticateToken } = require('./auth'); // Middleware to ensure user is logged in
const User = require('../../models/User');
const Property = require('../../models/tenant/Property');
const subscriptionService = require('../services/SubscriptionService');
// Import helper functions for subscription logic (pricing, limits, etc.)
const {
  getAllTiers,
  getSubscriptionTier,
  getMaxProperties,
  canAddProperty,
  validateSubscriptionForProperties,
  getRequiredTier,
  getFormattedPrice,
  getYearlySavings,
} = require('../../lib/subscription');

const router = express.Router();

// --- AUTHENTICATION ---
// All routes in this file require the user to be logged in.
// This middleware adds the `req.user` object with the user's ID.
router.use(authenticateToken);

/**
 * GET /api/subscription
 * Retrieves the current user's subscription details and usage stats.
 * Used by the dashboard to show "5/10 Properties Used", etc.
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate current usage
    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const userSubscription = user.subscription || 'free';
    const subscriptionTier = getSubscriptionTier(userSubscription);

    // Assemble a comprehensive response object
    const subscriptionInfo = {
      currentTier: userSubscription,
      tierDetails: {
        name: subscriptionTier.name,
        maxProperties: subscriptionTier.maxProperties,
        description: subscriptionTier.description,
        price: {
          monthly: subscriptionTier.price.monthly,
          yearly: subscriptionTier.price.yearly,
          currency: subscriptionTier.price.currency,
          formatted: {
            monthly: getFormattedPrice(userSubscription, 'monthly'),
            yearly: getFormattedPrice(userSubscription, 'yearly'),
          },
        },
        yearlySavings: getYearlySavings(userSubscription),
      },
      usage: {
        propertyCount: currentPropertyCount,
        maxProperties: getMaxProperties(userSubscription),
        canAddMore: canAddProperty(userSubscription, currentPropertyCount), // Boolean helper
        remainingProperties: Math.max(0, getMaxProperties(userSubscription) - currentPropertyCount),
      },
      // Check if they are over their limit (e.g., after a downgrade or trial expiry)
      validation: validateSubscriptionForProperties(userSubscription, currentPropertyCount),
    };

    res.json(subscriptionInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/subscription/tiers
 * Returns all available subscription plans.
 * Used by the Pricing page to verify features and prices.
 */
router.get('/tiers', async (req, res) => {
  try {
    const tiers = getAllTiers();
    const formattedTiers = {};

    // Format the static tier data for the frontend
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/subscription
 * Manually updates a user's subscription tier.
 * NOTE: This is mainly for free/basic tier changes or admin overrides.
 * Paid upgrades should go through Stripe checkout.
 */
router.put('/', async (req, res) => {
  try {
    const { tier } = req.body;

    if (!tier) {
      return res.status(400).json({ error: 'Subscription tier is required' });
    }

    // Validate request
    const validTiers = ['free', 'basic', 'premium'];
    if (!validTiers.includes(tier)) {
      return res.status(400).json({
        error: 'Invalid subscription tier',
        validTiers: validTiers,
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check logic: Prevent downgrading if they are using too many properties
    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const newTierMaxProperties = getMaxProperties(tier);

    if (currentPropertyCount > newTierMaxProperties) {
      const requiredTier = getRequiredTier(currentPropertyCount);
      return res.status(400).json({
        error: 'Cannot downgrade subscription',
        message: `You currently have ${currentPropertyCount} properties. The ${tier} tier only supports up to ${newTierMaxProperties} properties. You need at least the ${requiredTier} tier.`,
        currentPropertyCount: currentPropertyCount,
        requestedTierMaxProperties: newTierMaxProperties,
        requiredTier: requiredTier, // Suggest the tier they actually need
      });
    }

    // Update the database
    user.subscription = tier;
    user.updatedAt = Date.now();
    await user.save();

    const subscriptionTier = getSubscriptionTier(tier);

    res.json({
      message: 'Subscription updated successfully',
      subscription: {
        tier: tier,
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
        },
        usage: {
          propertyCount: currentPropertyCount,
          maxProperties: getMaxProperties(tier),
          canAddMore: canAddProperty(tier, currentPropertyCount),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/subscription/check-upgrade
 * Helper endpoint to check if a user needs to upgrade BEFORE they try to add a property.
 * Used to show "Upgrade Required" modal.
 */
router.get('/check-upgrade', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const userSubscription = user.subscription || 'free';
    const validation = validateSubscriptionForProperties(userSubscription, currentPropertyCount);

    if (validation.valid) {
      return res.json({
        needsUpgrade: false,
        message: 'Your current subscription is sufficient for your property count',
        currentTier: userSubscription,
        propertyCount: currentPropertyCount,
      });
    }

    // Calculate details for the upgrade prompt
    const requiredTier = validation.requiredTier;
    const requiredTierDetails = getSubscriptionTier(requiredTier);

    res.json({
      needsUpgrade: true,
      message: validation.message,
      currentTier: userSubscription,
      currentPropertyCount: currentPropertyCount,
      requiredTier: requiredTier,
      requiredTierDetails: {
        name: requiredTierDetails.name,
        maxProperties: requiredTierDetails.maxProperties,
        price: {
          monthly: requiredTierDetails.price.monthly,
          yearly: requiredTierDetails.price.yearly,
          formatted: {
            monthly: getFormattedPrice(requiredTier, 'monthly'),
            yearly: getFormattedPrice(requiredTier, 'yearly'),
          },
        },
        yearlySavings: getYearlySavings(requiredTier),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/subscription/create-checkout-session
 * EXPECTS: { tier: 'professional', period: 'monthly' }
 * Initiates the flow to redirect the user to Stripe.
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { tier, period } = req.body;
    if (!tier || !period) {
      return res.status(400).json({ error: 'Tier and period are required' });
    }

    // Call service to generate Stripe URL
    const session = await subscriptionService.createCheckoutSession(req.user.userId, tier, period);
    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/subscription/create-portal-session
 * Initiates flow for user to manage existing subscription (Stripe hosted portal).
 */
router.post('/create-portal-session', async (req, res) => {
  try {
    const session = await subscriptionService.createPortalSession(req.user.userId);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
