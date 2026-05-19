/**
 * @module schema/compliance
 * Compliance certificate records for a property.
 *
 * Each row represents a single regulatory certificate (Gas Safety CP12, EPC,
 * EICR, HMO licence, etc.) with its issue/expiry dates and whether a copy was
 * served to the tenant.  The app uses expiry dates to compute compliance status
 * colours (green / amber / red) shown on the compliance dashboard.
 *
 * `servedToTenantDate` is particularly important for Section 8 notice validity —
 * several grounds require the landlord to prove prescribed information was
 * served before or at the start of the tenancy.
 */
import { pgTable, uuid, text, date, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { profiles } from './profiles'

export type ComplianceType =
  | 'gas_safety'
  | 'epc'
  | 'electrical'
  | 'fire_safety'
  | 'hmo_license'
  | 'legionella'
  | 'pat_testing'
  | 'smoke_alarm'
  | 'carbon_monoxide_alarm'
  | 'landlord_registration'
  | 'rent_smart_wales'
  | 'other'

export type ComplianceRegion = 'england' | 'wales' | 'scotland' | 'northern_ireland' | 'all'

export const complianceRecords = pgTable('compliance_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  complianceType: text('compliance_type').$type<ComplianceType>().notNull(),
  region: text('region').$type<ComplianceRegion>().default('all').notNull(),
  certificateNumber: text('certificate_number'),
  issueDate: date('issue_date').notNull(),
  expiryDate: date('expiry_date').notNull(),
  issuer: text('issuer'),
  servedToTenantDate: date('served_to_tenant_date'),
  notes: text('notes'),
  documents: jsonb('documents').default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type ComplianceRecord = typeof complianceRecords.$inferSelect
export type NewComplianceRecord = typeof complianceRecords.$inferInsert
