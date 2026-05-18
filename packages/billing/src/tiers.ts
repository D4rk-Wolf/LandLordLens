/**
 * @module billing/tiers
 * Subscription tier definitions and helper accessors.
 *
 * `TIERS` is the single source of truth for plan names, property limits,
 * GBP pricing, and Stripe price IDs.  Keep this in sync with the
 * `SubscriptionTier` type in `packages/db/src/schema/profiles.ts`.
 *
 * Price IDs are read from environment variables at module load time so that
 * the same code works across test, staging, and production Stripe accounts
 * without code changes.  Missing price IDs resolve to `null` and are caught
 * at checkout time by `createCheckoutSession`.
 */

/** Canonical subscription tier identifiers — must match the DB enum in profiles.ts. */
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
    monthlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY ?? null,
    yearlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL ?? null,
    features: ['10 properties', 'Everything in Free', 'Expense tracking', 'Analytics'],
  },
  business: {
    name: 'Business',
    properties: 50,
    monthlyPriceGbp: 29,
    yearlyPriceGbp: 290,
    monthlyPriceId: process.env.STRIPE_PRICE_BUSINESS_MONTHLY ?? null,
    yearlyPriceId: process.env.STRIPE_PRICE_BUSINESS_ANNUAL ?? null,
    features: ['50 properties', 'Everything in Professional', 'Section 8 wizard', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    properties: Infinity,
    monthlyPriceGbp: 99,
    yearlyPriceGbp: 990,
    monthlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? null,
    yearlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL ?? null,
    features: ['Unlimited properties', 'Everything in Business', 'Dedicated support', 'Custom integrations'],
  },
}

export function getTierConfig(tier: SubscriptionTier): TierConfig {
  return TIERS[tier]
}

export function getPropertyLimit(tier: SubscriptionTier): number {
  return TIERS[tier].properties
}
