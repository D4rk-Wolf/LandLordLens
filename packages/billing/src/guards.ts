/**
 * @module billing/guards
 * Subscription tier enforcement helpers.
 *
 * Call these guards inside tRPC mutations before creating resources that are
 * gated by the user's subscription tier.  They throw typed errors that surface
 * readable messages to the client via tRPC's error formatter.
 */
import { eq, count } from 'drizzle-orm'
import { properties } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'
import { getPropertyLimit } from './tiers'
import type { SubscriptionTier } from './tiers'

/**
 * Thrown when a user attempts to create a resource that exceeds their tier's limit.
 * Extends `Error` so tRPC's `FORBIDDEN` or `BAD_REQUEST` responses can include
 * the user-facing message without leaking internal stack traces.
 */
export class TierLimitError extends Error {
  constructor(tier: SubscriptionTier, limit: number) {
    super(`Your ${tier} plan allows up to ${limit} properties. Upgrade to add more.`)
    this.name = 'TierLimitError'
  }
}

/**
 * Asserts the user has not exceeded their plan's property limit.
 *
 * Enterprise plan has `Infinity` as its limit and is fast-pathed to avoid the
 * count query.  All others count current properties and compare to the limit.
 *
 * @throws {TierLimitError} If the user's property count is at or above the limit.
 */
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
