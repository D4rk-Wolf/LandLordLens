import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export type UserRole = 'landlord' | 'admin' | 'tenant'
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'business' | 'enterprise'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
export type SubscriptionPeriod = 'monthly' | 'yearly'

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  role: text('role').$type<UserRole>().default('landlord').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  subscription: text('subscription').$type<SubscriptionTier>().default('free').notNull(),
  subscriptionStatus: text('subscription_status').$type<SubscriptionStatus>().default('active').notNull(),
  subscriptionPeriod: text('subscription_period').$type<SubscriptionPeriod>(),
  subscriptionStartDate: timestamp('subscription_start_date', { withTimezone: true }),
  subscriptionEndDate: timestamp('subscription_end_date', { withTimezone: true }),
  subscriptionCanceledAt: timestamp('subscription_canceled_at', { withTimezone: true }),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
