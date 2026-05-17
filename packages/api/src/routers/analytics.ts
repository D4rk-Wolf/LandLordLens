import { eq, count, sum } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties, complianceRecords, expenses } from '@landlordlens/db/schema'

export const analyticsRouter = createTRPCRouter({
  portfolioStats: protectedProcedure.query(async ({ ctx }) => {
    const [propertyCount] = await ctx.db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.userId, ctx.user.id))

    const [complianceCount] = await ctx.db
      .select({ count: count() })
      .from(complianceRecords)
      .where(eq(complianceRecords.userId, ctx.user.id))

    return {
      totalProperties: propertyCount?.count ?? 0,
      totalComplianceRecords: complianceCount?.count ?? 0,
    }
  }),

  expensesSummary: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({ category: expenses.category, total: sum(expenses.amount) })
      .from(expenses)
      .where(eq(expenses.userId, ctx.user.id))
      .groupBy(expenses.category)
  }),
})
