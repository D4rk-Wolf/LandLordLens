/**
 * Unit tests for subscription utility functions
 */

const {
  getSubscriptionTier,
  getMaxProperties,
  canAddProperty,
  getRequiredTier,
  validateSubscriptionForProperties,
  getFormattedPrice,
  getAllTiers,
  getYearlySavings,
} = require('../../lib/subscription');

describe('Subscription Utilities', () => {
  describe('getSubscriptionTier', () => {
    test('should return free tier by default', () => {
      const tier = getSubscriptionTier();
      expect(tier.name).toBe('Free');
      expect(tier.maxProperties).toBe(2);
    });

    test('should return correct tier for valid input', () => {
      const basic = getSubscriptionTier('basic');
      expect(basic.name).toBe('Basic');
      expect(basic.maxProperties).toBe(5);

      const premium = getSubscriptionTier('premium');
      expect(premium.name).toBe('Premium');
      expect(premium.maxProperties).toBe(Infinity);
    });

    test('should return free tier for invalid input', () => {
      const tier = getSubscriptionTier('invalid');
      expect(tier.name).toBe('Free');
    });
  });

  describe('getMaxProperties', () => {
    test('should return correct max properties for each tier', () => {
      expect(getMaxProperties('free')).toBe(2);
      expect(getMaxProperties('basic')).toBe(5);
      expect(getMaxProperties('premium')).toBe(Infinity);
    });
  });

  describe('canAddProperty', () => {
    test('should return true when under limit', () => {
      expect(canAddProperty('free', 0)).toBe(true);
      expect(canAddProperty('free', 1)).toBe(true);
      expect(canAddProperty('basic', 4)).toBe(true);
    });

    test('should return false when at limit', () => {
      expect(canAddProperty('free', 2)).toBe(false);
      expect(canAddProperty('basic', 5)).toBe(false);
    });

    test('should return true for premium tier regardless of count', () => {
      expect(canAddProperty('premium', 100)).toBe(true);
      expect(canAddProperty('premium', 1000)).toBe(true);
    });
  });

  describe('getRequiredTier', () => {
    test('should return free tier for 0-2 properties', () => {
      expect(getRequiredTier(0)).toBe('free');
      expect(getRequiredTier(1)).toBe('free');
      expect(getRequiredTier(2)).toBe('free');
    });

    test('should return basic tier for 3-5 properties', () => {
      expect(getRequiredTier(3)).toBe('basic');
      expect(getRequiredTier(5)).toBe('basic');
    });

    test('should return premium tier for 6+ properties', () => {
      expect(getRequiredTier(6)).toBe('premium');
      expect(getRequiredTier(100)).toBe('premium');
    });
  });

  describe('validateSubscriptionForProperties', () => {
    test('should return valid for free tier with 2 properties', () => {
      const result = validateSubscriptionForProperties('free', 2);
      expect(result.valid).toBe(true);
    });

    test('should return invalid when exceeding limit', () => {
      const result = validateSubscriptionForProperties('free', 3);
      expect(result.valid).toBe(false);
      expect(result.requiredTier).toBe('basic');
    });

    test('should return valid for premium tier with any count', () => {
      const result = validateSubscriptionForProperties('premium', 1000);
      expect(result.valid).toBe(true);
    });
  });

  describe('getFormattedPrice', () => {
    test('should return "Free" for free tier', () => {
      expect(getFormattedPrice('free', 'monthly')).toBe('Free');
      expect(getFormattedPrice('free', 'yearly')).toBe('Free');
    });

    test('should format prices correctly', () => {
      const monthly = getFormattedPrice('basic', 'monthly');
      expect(monthly).toContain('£');
      expect(monthly).toContain('9.99');

      const yearly = getFormattedPrice('basic', 'yearly');
      expect(yearly).toContain('£');
      expect(yearly).toContain('99.00');
    });
  });

  describe('getAllTiers', () => {
    test('should return all tiers', () => {
      const tiers = getAllTiers();
      expect(tiers).toHaveProperty('free');
      expect(tiers).toHaveProperty('basic');
      expect(tiers).toHaveProperty('premium');
    });
  });

  describe('getYearlySavings', () => {
    test('should return 0 for free tier', () => {
      const savings = getYearlySavings('free');
      expect(savings.amount).toBe(0);
      expect(savings.percentage).toBe(0);
    });

    test('should calculate savings for paid tiers', () => {
      const basicSavings = getYearlySavings('basic');
      expect(basicSavings.amount).toBeGreaterThan(0);
      expect(basicSavings.percentage).toBeGreaterThan(0);

      const premiumSavings = getYearlySavings('premium');
      expect(premiumSavings.amount).toBeGreaterThan(0);
      expect(premiumSavings.percentage).toBeGreaterThan(0);
    });
  });
});
