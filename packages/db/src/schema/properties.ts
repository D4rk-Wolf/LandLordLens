/**
 * @module schema/properties
 * Core property record — the central entity in the LandLordLens data model.
 *
 * `address` is stored as JSONB (shape: { line1, line2?, city, postcode }) to
 * accommodate varied UK address formats without a normalised address table.
 * `compliance` and `financials` are legacy JSONB blobs superseded by the
 * dedicated `complianceRecords` and `expenses` tables; kept for backwards
 * compatibility with older data.
 *
 * EPC, HMO, and mortgage fields are directly on the property row because they
 * are property-level obligations rather than tenancy-level ones.  The 2030 EPC
 * minimum C-rating requirement drives the EPC countdown banner on the compliance page.
 */
import { pgTable, uuid, text, integer, numeric, date, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { profiles } from './profiles'

export type PropertyType = 'house' | 'flat' | 'apartment' | 'bungalow' | 'other'
export type PropertyStatus = 'vacant' | 'occupied' | 'maintenance'
export type AvailabilityStatus = 'free' | 'for_sale' | 'ready_for_rent' | 'rented' | 'not_available'
export type PropertyRegion = 'england' | 'wales' | 'scotland' | 'northern_ireland'

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  address: jsonb('address').notNull(),
  propertyType: text('property_type').$type<PropertyType>().notNull(),
  bedrooms: integer('bedrooms').notNull(),
  bathrooms: integer('bathrooms').default(1).notNull(),
  rentAmount: numeric('rent_amount', { precision: 10, scale: 2 }),
  purchasePrice: numeric('purchase_price', { precision: 10, scale: 2 }),
  purchaseDate: date('purchase_date'),
  status: text('status').$type<PropertyStatus>().default('vacant').notNull(),
  availabilityStatus: text('availability_status').$type<AvailabilityStatus>().default('ready_for_rent').notNull(),
  region: text('region').$type<PropertyRegion>().default('england').notNull(),
  compliance: jsonb('compliance').default({}).notNull(),
  financials: jsonb('financials').default({}).notNull(),
  furnished: boolean('furnished').default(false).notNull(),
  allowsPets: boolean('allows_pets').default(false).notNull(),
  allowsSmoking: boolean('allows_smoking').default(false).notNull(),
  mortgageConsentObtained: boolean('mortgage_consent_obtained').default(false).notNull(),
  mortgageConsentDate: date('mortgage_consent_date'),
  mortgageConsentExpiry: date('mortgage_consent_expiry'),
  epcRating: text('epc_rating'),
  epcExpiryDate: date('epc_expiry_date'),
  currentValue: numeric('current_value', { precision: 12, scale: 2 }),
  mortgageBalance: numeric('mortgage_balance', { precision: 12, scale: 2 }),
  mortgageRate: numeric('mortgage_rate', { precision: 5, scale: 4 }),
  mortgageMonthlyPayment: numeric('mortgage_monthly_payment', { precision: 10, scale: 2 }),
  prsRegistrationNumber: text('prs_registration_number'),
  hmoLicenseNumber: text('hmo_license_number'),
  hmoLicenseExpiry: date('hmo_license_expiry'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
