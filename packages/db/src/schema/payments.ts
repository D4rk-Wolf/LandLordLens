import { pgTable, uuid, text, numeric, jsonb, timestamp, check } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { profiles } from './profiles'

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded' | 'canceled'
export type PaymentType = 'subscription' | 'one_time'

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeChargeId: text('stripe_charge_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('GBP').notNull(),
  status: text('status').$type<PaymentStatus>().default('pending').notNull(),
  paymentType: text('payment_type').$type<PaymentType>(),
  description: text('description'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  retentionReason: text('retention_reason'),
}, (t) => [
  check('payments_user_or_retention', sql`${t.userId} IS NOT NULL OR ${t.retentionReason} IS NOT NULL`)
])

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
