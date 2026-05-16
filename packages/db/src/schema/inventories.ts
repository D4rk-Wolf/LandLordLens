import { pgTable, uuid, text, date, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type InventoryType = 'check_in' | 'check_out' | 'interim'
export type InventoryCondition = 'excellent' | 'good' | 'fair' | 'poor'

export const inventories = pgTable('inventories', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id),
  tenancyId: uuid('tenancy_id').references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  type: text('type').$type<InventoryType>().notNull(),
  date: date('date').notNull(),
  conductedBy: text('conducted_by').notNull(),
  tenantPresent: boolean('tenant_present').default(false).notNull(),
  items: jsonb('items').default([]).notNull(),
  overallCondition: text('overall_condition').$type<InventoryCondition>(),
  notes: text('notes'),
  photos: jsonb('photos').default([]).notNull(),
  signedBy: jsonb('signed_by').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Inventory = typeof inventories.$inferSelect
export type NewInventory = typeof inventories.$inferInsert
