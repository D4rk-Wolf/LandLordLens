import { pgTable, uuid, text, date, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type InspectionType = 'routine' | 'check_in' | 'check_out' | 'maintenance' | 'compliance' | 'complaint'
export type InspectionStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
export type OverallCondition = 'excellent' | 'good' | 'fair' | 'poor'

export const propertyInspections = pgTable('property_inspections', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id),
  tenancyId: uuid('tenancy_id').references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  inspectionType: text('inspection_type').$type<InspectionType>().notNull(),
  scheduledDate: date('scheduled_date').notNull(),
  actualDate: date('actual_date'),
  conductedBy: text('conducted_by').notNull(),
  tenantPresent: boolean('tenant_present').default(false).notNull(),
  status: text('status').$type<InspectionStatus>().default('scheduled').notNull(),
  items: jsonb('items').default([]).notNull(),
  issues: jsonb('issues').default([]).notNull(),
  overallCondition: text('overall_condition').$type<OverallCondition>(),
  issuesFound: boolean('issues_found').default(false).notNull(),
  notes: text('notes'),
  photos: jsonb('photos').default([]).notNull(),
  nextInspectionDue: date('next_inspection_due'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type PropertyInspection = typeof propertyInspections.$inferSelect
export type NewPropertyInspection = typeof propertyInspections.$inferInsert
