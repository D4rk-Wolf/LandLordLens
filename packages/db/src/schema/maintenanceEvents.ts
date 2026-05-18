import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { maintenanceTickets } from './maintenance'
import { profiles } from './profiles'

export type MaintenanceEventType =
  | 'created'
  | 'status_changed'
  | 'assigned'
  | 'note_added'
  | 'cost_updated'
  | 'completed'
  | 'cancelled'

export const maintenanceEvents = pgTable('maintenance_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id').notNull().references(() => maintenanceTickets.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  eventType: text('event_type').$type<MaintenanceEventType>().notNull(),
  description: text('description').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type MaintenanceEvent = typeof maintenanceEvents.$inferSelect
export type NewMaintenanceEvent = typeof maintenanceEvents.$inferInsert
