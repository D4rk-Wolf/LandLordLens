/**
 * @module billing/checkout
 * Stripe session helpers: Checkout for new subscriptions, Customer Portal for
 * self-service management, and on-demand customer creation.
 */
import { getStripeClient } from './client'
import type { SubscriptionTier } from './tiers'
import { TIERS } from './tiers'

/** Parameters for creating a Stripe Checkout Session. */
interface CheckoutParams {
  /** Existing Stripe customer ID — create via {@link createStripeCustomer} if absent. */
  customerId: string
  /** Paid subscription tier the user is upgrading to. */
  tier: SubscriptionTier
  /** Billing cadence: monthly or annual. */
  interval: 'month' | 'year'
  /** URL Stripe redirects to on successful payment (should include `?success=1`). */
  successUrl: string
  /** URL Stripe redirects to if the user abandons the checkout flow. */
  cancelUrl: string
}

/**
 * Creates a Stripe Checkout Session for a subscription upgrade.
 *
 * The `tier` value is stored in `subscription_data.metadata` so the
 * `customer.subscription.created` webhook can write the correct tier to
 * the `profiles` table after payment is confirmed.
 *
 * @throws {Error} If the resolved price ID is null (tier/interval misconfigured).
 */
export async function createCheckoutSession(params: CheckoutParams) {
  const stripe = getStripeClient()
  const tierConfig = TIERS[params.tier]
  const priceId = params.interval === 'month' ? tierConfig.monthlyPriceId : tierConfig.yearlyPriceId

  if (!priceId) throw new Error(`No price ID for ${params.tier} ${params.interval}`)

  return stripe.checkout.sessions.create({
    customer: params.customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    subscription_data: { metadata: { tier: params.tier } },
  })
}

/**
 * Opens a Stripe Customer Portal session so the user can manage their
 * subscription without leaving to a permanently external page.
 *
 * @param customerId - The Stripe customer ID stored in `profiles.stripeCustomerId`.
 * @param returnUrl - The app URL Stripe redirects back to after the user closes the portal.
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripeClient()
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

/**
 * Creates a Stripe Customer object linked to this app user.
 *
 * The `userId` in metadata lets us cross-reference Stripe customers with
 * Supabase users if the `stripeCustomerId` column is ever missing.
 *
 * @param email - User's email address (used for Stripe receipts and customer search).
 * @param userId - Supabase user UUID stored in `metadata.userId` for traceability.
 */
export async function createStripeCustomer(email: string, userId: string) {
  const stripe = getStripeClient()
  return stripe.customers.create({
    email,
    metadata: { userId },
  })
}
