import { pgTable, uuid, text, date, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type DepositScheme =
  | 'dps'
  | 'mydeposits'
  | 'tds'
  | 'lps_scotland'
  | 'safedeposits_scotland'
  | 'mydeposits_scotland'
  | 'tds_ni'
  | 'mydeposits_ni'
  | 'lps_ni'

export type DepositStatus = 'protected' | 'returned' | 'disputed' | 'forfeited'

export const depositProtections = pgTable('deposit_protections', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenancyId: uuid('tenancy_id').notNull().references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  depositAmount: numeric('deposit_amount', { precision: 10, scale: 2 }).notNull(),
  scheme: text('scheme').$type<DepositScheme>().notNull(),
  protectionReference: text('protection_reference').notNull(),
  protectedDate: date('protected_date').notNull(),
  status: text('status').$type<DepositStatus>().default('protected').notNull(),
  returnDate: date('return_date'),
  returnAmount: numeric('return_amount', { precision: 10, scale: 2 }),
  notes: text('notes'),
  documents: jsonb('documents').default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type DepositProtection = typeof depositProtections.$inferSelect
export type NewDepositProtection = typeof depositProtections.$inferInsert
