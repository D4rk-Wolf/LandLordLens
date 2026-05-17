export type SubscriptionTier = 'free' | 'professional' | 'business' | 'enterprise'

export interface TierConfig {
  name: string
  properties: number
  monthlyPriceGbp: number
  yearlyPriceGbp: number
  monthlyPriceId: string | null
  yearlyPriceId: string | null
  features: string[]
}

export const TIERS: Record<SubscriptionTier, TierConfig> = {
  free: {
    name: 'Free',
    properties: 2,
    monthlyPriceGbp: 0,
    yearlyPriceGbp: 0,
    monthlyPriceId: null,
    yearlyPriceId: null,
    features: ['2 properties', 'Compliance tracking', 'Document storage'],
  },
  professional: {
    name: 'Professional',
    properties: 10,
    monthlyPriceGbp: 12,
    yearlyPriceGbp: 120,
    monthlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY ?? '',
    features: ['10 properties', 'Everything in Free', 'Expense tracking', 'Analytics'],
  },
  business: {
    name: 'Business',
    properties: 50,
    monthlyPriceGbp: 29,
    yearlyPriceGbp: 290,
    monthlyPriceId: process.env.STRIPE_PRICE_BUSINESS_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_BUSINESS_YEARLY ?? '',
    features: ['50 properties', 'Everything in Professional', 'Section 8 wizard', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    properties: Infinity,
    monthlyPriceGbp: 99,
    yearlyPriceGbp: 990,
    monthlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY ?? '',
    features: ['Unlimited properties', 'Everything in Business', 'Dedicated support', 'Custom integrations'],
  },
}

export function getTierConfig(tier: SubscriptionTier): TierConfig {
  return TIERS[tier]
}

export function getPropertyLimit(tier: SubscriptionTier): number {
  return TIERS[tier].properties
}
