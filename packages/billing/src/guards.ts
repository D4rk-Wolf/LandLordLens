import { eq, count } from 'drizzle-orm'
import { properties } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'
import { getPropertyLimit } from './tiers'
import type { SubscriptionTier } from './tiers'

export class TierLimitError extends Error {
  constructor(tier: SubscriptionTier, limit: number) {
    super(`Your ${tier} plan allows up to ${limit} properties. Upgrade to add more.`)
    this.name = 'TierLimitError'
  }
}

export async function canAddProperty(
  userId: string,
  tier: SubscriptionTier,
  db: DB,
): Promise<void> {
  const limit = getPropertyLimit(tier)
  if (limit === Infinity) return

  const [result] = await db
    .select({ count: count() })
    .from(properties)
    .where(eq(properties.userId, userId))

  const current = result?.count ?? 0
  if (current >= limit) {
    throw new TierLimitError(tier, limit)
  }
}
