/**
 * @module routers/admin
 * tRPC router exposing platform administration endpoints.
 * All procedures use `adminProcedure`, which requires both an authenticated
 * session and `profile.role === 'admin'`.
 */

import { createTRPCRouter, adminProcedure } from '../trpc'
import { profiles, auditLog } from '@landlordlens/db/schema'
import { desc } from 'drizzle-orm'

export const adminRouter = createTRPCRouter({
  /** Returns all landlord profiles ordered by registration date (newest first). */
  listUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(profiles)
      .orderBy(desc(profiles.createdAt))
  }),

  /** Returns the full platform audit log ordered by most recent event first. */
  getAuditLog: adminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(auditLog)
      .orderBy(desc(auditLog.createdAt))
  }),
})
