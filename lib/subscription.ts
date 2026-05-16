/**
 * Subscription tiers and limits configuration
 */

export interface SubscriptionPrice {
    monthly: number;
    yearly: number;
    currency: string;
}

export interface SubscriptionTier {
    name: string;
    maxProperties: number;
    price: SubscriptionPrice;
    description: string;
}

export type SubscriptionTierType = 'free' | 'professional' | 'business' | 'enterprise';

const SUBSCRIPTION_TIERS: Record<SubscriptionTierType, SubscriptionTier> = {
    free: {
        name: 'Starter',
        maxProperties: 2,
        price: { monthly: 0, yearly: 0, currency: 'GBP' },
        description: 'Perfect for getting started',
    },
    professional: {
        name: 'Professional',
        maxProperties: 10,
        price: { monthly: 12, yearly: 120, currency: 'GBP' },
        description: 'Up to 10 properties',
    },
    business: {
        name: 'Business',
        maxProperties: 50,
        price: { monthly: 29, yearly: 290, currency: 'GBP' },
        description: 'Up to 50 properties',
    },
    enterprise: {
        name: 'Enterprise',
        maxProperties: Infinity,
        price: { monthly: 99, yearly: 990, currency: 'GBP' },
        description: 'Unlimited properties',
    },
};

/**
 * Get subscription tier configuration
 */
export function getSubscriptionTier(tier: SubscriptionTierType | string = 'free'): SubscriptionTier {
    return SUBSCRIPTION_TIERS[tier as SubscriptionTierType] || SUBSCRIPTION_TIERS.free;
}

/**
 * Get maximum properties allowed for a subscription tier
 */
export function getMaxProperties(tier: SubscriptionTierType | string = 'free'): number {
    const subscriptionTier = getSubscriptionTier(tier);
    return subscriptionTier.maxProperties;
}

/**
 * Check if user can add more properties
 */
export function canAddProperty(tier: SubscriptionTierType | string = 'free', currentPropertyCount: number = 0): boolean {
    const maxProperties = getMaxProperties(tier);
    return currentPropertyCount < maxProperties;
}

/**
 * Get the minimum tier required for a given number of properties
 */
export function getRequiredTier(propertyCount: number): SubscriptionTierType {
    if (propertyCount <= 2) {
        return 'free';
    } else if (propertyCount <= 10) {
        return 'professional';
    } else if (propertyCount <= 50) {
        return 'business';
    } else {
        return 'enterprise';
    }
}

/**
 * Check if user's current tier supports their property count
 */
export function validateSubscriptionForProperties(tier: SubscriptionTierType | string = 'free', propertyCount: number = 0): { valid: boolean; requiredTier: string; message: string } {
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
 */
export function getFormattedPrice(tier: SubscriptionTierType | string, period: 'monthly' | 'yearly' = 'monthly'): string {
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
 */
export function getAllTiers(): Record<SubscriptionTierType, SubscriptionTier> {
    return SUBSCRIPTION_TIERS;
}

/**
 * Calculate savings for yearly subscription
 */
export function getYearlySavings(tier: SubscriptionTierType | string): { amount: number; percentage: number; formatted: string } {
    const subscriptionTier = getSubscriptionTier(tier);
    if (subscriptionTier.price.monthly === 0) {
        return { amount: 0, percentage: 0, formatted: '£0.00' };
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

export default {
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
