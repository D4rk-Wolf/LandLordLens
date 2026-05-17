import type Stripe from 'stripe'
import { getStripeClient } from './client'
import { eq } from 'drizzle-orm'
import { profiles } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'
import type { SubscriptionTier } from './tiers'

export function constructWebhookEvent(payload: string, signature: string): Stripe.Event {
  const stripe = getStripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  return stripe.webhooks.constructEvent(payload, signature, secret)
}

export async function handleWebhookEvent(event: Stripe.Event, db: DB): Promise<void> {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const tier = (subscription.metadata['tier'] ?? 'free') as SubscriptionTier
      const customerId = subscription.customer as string
      const item = subscription.items.data[0]
      const currentPeriodEnd = new Date((item?.current_period_end ?? 0) * 1000)

      await db
        .update(profiles)
        .set({
          subscription: tier,
          stripeSubscriptionId: subscription.id,
          subscriptionEndDate: currentPeriodEnd,
          updatedAt: new Date(),
        })
        .where(eq(profiles.stripeCustomerId, customerId))
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await db
        .update(profiles)
        .set({
          subscription: 'free',
          stripeSubscriptionId: null,
          subscriptionEndDate: null,
          updatedAt: new Date(),
        })
        .where(eq(profiles.stripeCustomerId, customerId))
      break
    }

    default:
      break
  }
}
