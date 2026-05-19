/**
 * @module schema/maintenance
 * Maintenance tickets for property repairs and inspections.
 *
 * Each ticket tracks a single repair or maintenance request from open through to
 * completion.  Tickets are linked to `maintenanceEvents` (see maintenanceEvents.ts)
 * which form an immutable audit log of every status change — this log is included
 * in the Ombudsman Vault export as evidence of responsive repairs management.
 */
import { pgTable, uuid, text, date, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { profiles } from './profiles'

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent'
export type MaintenanceStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export const maintenanceTickets = pgTable('maintenance_tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priority: text('priority').$type<MaintenancePriority>().default('medium').notNull(),
  status: text('status').$type<MaintenanceStatus>().default('open').notNull(),
  reportedBy: text('reported_by'),
  assignedTo: text('assigned_to'),
  cost: numeric('cost', { precision: 10, scale: 2 }),
  completedDate: date('completed_date'),
  notes: text('notes'),
  images: jsonb('images').default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type MaintenanceTicket = typeof maintenanceTickets.$inferSelect
export type NewMaintenanceTicket = typeof maintenanceTickets.$inferInsert
