/**
 * Subscription tiers and limits configuration
 */

const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    maxProperties: 2,
    price: {
      monthly: 0,
      yearly: 0,
      currency: 'GBP',
    },
    description: 'Perfect for getting started with up to 2 properties',
  },
  basic: {
    name: 'Basic',
    maxProperties: 5,
    price: {
      monthly: 9.99,
      yearly: 99.00,
      currency: 'GBP',
    },
    description: 'Ideal for small portfolios with 2-5 properties',
  },
  premium: {
    name: 'Premium',
    maxProperties: Infinity, // Unlimited
    price: {
      monthly: 19.99,
      yearly: 199.00,
      currency: 'GBP',
    },
    description: 'For larger portfolios with 5+ properties',
  },
};

/**
 * Get subscription tier configuration
 * @param {string} tier - Subscription tier ('free', 'basic', 'premium')
 * @returns {Object} Subscription tier configuration
 */
function getSubscriptionTier(tier = 'free') {
  return SUBSCRIPTION_TIERS[tier] || SUBSCRIPTION_TIERS.free;
}

/**
 * Get maximum properties allowed for a subscription tier
 * @param {string} tier - Subscription tier
 * @returns {number} Maximum properties allowed
 */
function getMaxProperties(tier = 'free') {
  const subscriptionTier = getSubscriptionTier(tier);
  return subscriptionTier.maxProperties;
}

/**
 * Check if user can add more properties
 * @param {string} tier - User's subscription tier
 * @param {number} currentPropertyCount - Current number of properties
 * @returns {boolean} True if user can add more properties
 */
function canAddProperty(tier = 'free', currentPropertyCount = 0) {
  const maxProperties = getMaxProperties(tier);
  return currentPropertyCount < maxProperties;
}

/**
 * Get the minimum tier required for a given number of properties
 * @param {number} propertyCount - Number of properties
 * @returns {string} Minimum required tier
 */
function getRequiredTier(propertyCount) {
  if (propertyCount <= 2) {
    return 'free';
  } else if (propertyCount <= 5) {
    return 'basic';
  } else {
    return 'premium';
  }
}

/**
 * Check if user's current tier supports their property count
 * @param {string} tier - User's current subscription tier
 * @param {number} propertyCount - Current number of properties
 * @returns {Object} { valid: boolean, requiredTier: string, message: string }
 */
function validateSubscriptionForProperties(tier = 'free', propertyCount = 0) {
  const maxProperties = getMaxProperties(tier);
  const requiredTier = getRequiredTier(propertyCount);
  
  if (propertyCount <= maxProperties) {
    return {
      valid: true,
      requiredTier: tier,
      message: 'Subscription is valid for current property count',
    };
  }
  
  return {
    valid: false,
    requiredTier: requiredTier,
    message: `Your current ${tier} subscription supports up to ${maxProperties} properties. You need to upgrade to ${requiredTier} tier to manage ${propertyCount} properties.`,
  };
}

/**
 * Get formatted price string
 * @param {string} tier - Subscription tier
 * @param {string} period - 'monthly' or 'yearly'
 * @returns {string} Formatted price string
 */
function getFormattedPrice(tier, period = 'monthly') {
  const subscriptionTier = getSubscriptionTier(tier);
  const price = subscriptionTier.price[period];
  const currency = subscriptionTier.price.currency;
  
  if (price === 0) {
    return 'Free';
  }
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Get all available subscription tiers
 * @returns {Object} All subscription tiers
 */
function getAllTiers() {
  return SUBSCRIPTION_TIERS;
}

/**
 * Calculate savings for yearly subscription
 * @param {string} tier - Subscription tier
 * @returns {Object} Savings information
 */
function getYearlySavings(tier) {
  const subscriptionTier = getSubscriptionTier(tier);
  if (subscriptionTier.price.monthly === 0) {
    return { amount: 0, percentage: 0 };
  }
  
  const monthlyTotal = subscriptionTier.price.monthly * 12;
  const yearlyPrice = subscriptionTier.price.yearly;
  const savings = monthlyTotal - yearlyPrice;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  
  return {
    amount: savings,
    percentage: percentage,
    formatted: new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: subscriptionTier.price.currency,
    }).format(savings),
  };
}

module.exports = {
  SUBSCRIPTION_TIERS,
  getSubscriptionTier,
  getMaxProperties,
  canAddProperty,
  getRequiredTier,
  validateSubscriptionForProperties,
  getFormattedPrice,
  getAllTiers,
  getYearlySavings,
};
