import { pgTable, uuid, text, date, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type BackgroundCheckStatus = 'approved' | 'rejected' | 'conditional' | 'pending'

export const tenantBackgroundChecks = pgTable('tenant_background_checks', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenancyId: uuid('tenancy_id').notNull().references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  tenantName: text('tenant_name').notNull(),
  checkDate: date('check_date').notNull(),
  creditCheck: jsonb('credit_check').default({ performed: false }).notNull(),
  employmentCheck: jsonb('employment_check').default({ performed: false }).notNull(),
  previousLandlordReference: jsonb('previous_landlord_reference').default({ performed: false }).notNull(),
  criminalRecordCheck: jsonb('criminal_record_check').default({ performed: false }).notNull(),
  overallStatus: text('overall_status').$type<BackgroundCheckStatus>().default('pending').notNull(),
  notes: text('notes'),
  documents: jsonb('documents').default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type TenantBackgroundCheck = typeof tenantBackgroundChecks.$inferSelect
export type NewTenantBackgroundCheck = typeof tenantBackgroundChecks.$inferInsert
