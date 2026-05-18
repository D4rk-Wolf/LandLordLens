/**
 * @module schema/audit
 * Platform-level audit log for admin observability.
 *
 * Records significant user actions (e.g. subscription changes, property deletion,
 * admin operations) for support and compliance purposes.  Surfaced in the admin
 * dashboard via `admin.getAuditLog`.  Not the same as `maintenanceEvents` which
 * is a per-ticket status-change log included in the Ombudsman export.
 */
import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type'),
  resourceId: uuid('resource_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type AuditLogEntry = typeof auditLog.$inferSelect
export type NewAuditLogEntry = typeof auditLog.$inferInsert
