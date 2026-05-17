import { createTRPCRouter, adminProcedure } from '../trpc'
import { profiles, auditLog } from '@landlordlens/db/schema'
import { desc } from 'drizzle-orm'

export const adminRouter = createTRPCRouter({
  listUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(profiles)
      .orderBy(desc(profiles.createdAt))
  }),

  getAuditLog: adminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(auditLog)
      .orderBy(desc(auditLog.createdAt))
  }),
})
