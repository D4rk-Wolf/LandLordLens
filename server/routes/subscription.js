const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../../models/User');
const Property = require('../../models/tenant/Property');
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

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/subscription
 * Get current user's subscription information
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const userSubscription = user.subscription || 'free';
    const subscriptionTier = getSubscriptionTier(userSubscription);

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
        canAddMore: canAddProperty(userSubscription, currentPropertyCount),
        remainingProperties: Math.max(0, getMaxProperties(userSubscription) - currentPropertyCount),
      },
      validation: validateSubscriptionForProperties(userSubscription, currentPropertyCount),
    };

    res.json(subscriptionInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/subscription/tiers
 * Get all available subscription tiers
 */
router.get('/tiers', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/subscription
 * Update user's subscription tier
 */
router.put('/', async (req, res) => {
  try {
    const { tier } = req.body;

    if (!tier) {
      return res.status(400).json({ error: 'Subscription tier is required' });
    }

    // Validate tier
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

    // Check if downgrading would violate property limits
    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const currentTier = user.subscription || 'free';
    const newTierMaxProperties = getMaxProperties(tier);

    // If downgrading, check if user has too many properties
    if (currentPropertyCount > newTierMaxProperties) {
      const requiredTier = getRequiredTier(currentPropertyCount);
      return res.status(400).json({
        error: 'Cannot downgrade subscription',
        message: `You currently have ${currentPropertyCount} properties. The ${tier} tier only supports up to ${newTierMaxProperties} properties. You need at least the ${requiredTier} tier.`,
        currentPropertyCount: currentPropertyCount,
        requestedTierMaxProperties: newTierMaxProperties,
        requiredTier: requiredTier,
      });
    }

    // Update subscription
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
 * Check if user needs to upgrade based on current property count
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

module.exports = router;
