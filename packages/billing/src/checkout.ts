import { getStripeClient } from './client'
import type { SubscriptionTier } from './tiers'
import { TIERS } from './tiers'

interface CheckoutParams {
  customerId: string
  tier: SubscriptionTier
  interval: 'month' | 'year'
  successUrl: string
  cancelUrl: string
}

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

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripeClient()
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export async function createStripeCustomer(email: string, userId: string) {
  const stripe = getStripeClient()
  return stripe.customers.create({
    email,
    metadata: { userId },
  })
}
