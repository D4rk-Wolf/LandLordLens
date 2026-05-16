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
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
