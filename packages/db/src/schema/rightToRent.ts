import { pgTable, uuid, text, date, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type RightToRentDocumentType =
  | 'uk_passport'
  | 'eu_passport'
  | 'biometric_residence_permit'
  | 'birth_certificate'
  | 'driving_licence'
  | 'other'

export type RightToRentStatus = 'passed' | 'failed' | 'pending' | 'expired'

export const rightToRent = pgTable('right_to_rent', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenancyId: uuid('tenancy_id').notNull().references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  tenantName: text('tenant_name').notNull(),
  tenantDateOfBirth: date('tenant_date_of_birth').notNull(),
  documentType: text('document_type').$type<RightToRentDocumentType>().notNull(),
  documentNumber: text('document_number').notNull(),
  expiryDate: date('expiry_date'),
  checkDate: date('check_date').notNull(),
  checkedBy: text('checked_by').notNull(),
  status: text('status').$type<RightToRentStatus>().default('pending').notNull(),
  notes: text('notes'),
  documents: jsonb('documents').default([]).notNull(),
  followUpRequired: boolean('follow_up_required').default(false).notNull(),
  followUpDate: date('follow_up_date'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type RightToRentRecord = typeof rightToRent.$inferSelect
export type NewRightToRentRecord = typeof rightToRent.$inferInsert
