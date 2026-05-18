import { eq, count, sum, and } from 'drizzle-orm'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties, complianceRecords, expenses, tenancies } from '@landlordlens/db/schema'

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

  portfolioKPIs: protectedProcedure.query(async ({ ctx }) => {
    const [props, exps, activeTenancies] = await Promise.all([
      ctx.db.select().from(properties).where(eq(properties.userId, ctx.user.id)),
      ctx.db.select().from(expenses).where(eq(expenses.userId, ctx.user.id)),
      ctx.db.select().from(tenancies).where(and(
        eq(tenancies.userId, ctx.user.id),
        eq(tenancies.status, 'active')
      )),
    ])

    const annualRentalIncome = activeTenancies.reduce(
      (s, t) => s + parseFloat(t.monthlyRent ?? '0'), 0
    ) * 12

    const annualOperatingExpenses = exps
      .filter(e => e.type === 'expense')
      .reduce((s, e) => s + parseFloat(e.amount ?? '0'), 0)

    const noi = annualRentalIncome - annualOperatingExpenses

    const totalCurrentValue = props.reduce((s, p) => s + parseFloat((p as any).currentValue ?? '0'), 0)
    const totalMortgageBalance = props.reduce((s, p) => s + parseFloat((p as any).mortgageBalance ?? '0'), 0)
    const annualMortgagePayments = props.reduce(
      (s, p) => s + parseFloat((p as any).mortgageMonthlyPayment ?? '0'), 0
    ) * 12

    const grossYield = totalCurrentValue > 0 ? (annualRentalIncome / totalCurrentValue) * 100 : null
    const netYield = totalCurrentValue > 0 ? (noi / totalCurrentValue) * 100 : null
    const equity = totalCurrentValue - totalMortgageBalance
    const annualCashFlow = noi - annualMortgagePayments
    const totalPurchasePrice = props.reduce((s, p) => s + parseFloat(p.purchasePrice ?? '0'), 0)
    const cashOnCash = totalPurchasePrice > 0 ? (annualCashFlow / totalPurchasePrice) * 100 : null

    return {
      annualRentalIncome,
      annualOperatingExpenses,
      noi,
      grossYield,
      netYield,
      equity,
      annualCashFlow,
      cashOnCash,
      totalCurrentValue,
      totalMortgageBalance,
      propertyCount: props.length,
      occupiedCount: activeTenancies.length,
    }
  }),

  mtdQuarterlySummary: protectedProcedure
    .input(z.object({ taxYear: z.string() }))
    .query(async ({ ctx, input }) => {
      const exps = await ctx.db
        .select()
        .from(expenses)
        .where(and(eq(expenses.userId, ctx.user.id), eq(expenses.taxYear, input.taxYear)))

      const totalIncome = exps
        .filter(e => e.type === 'income')
        .reduce((s, e) => s + parseFloat(e.amount ?? '0'), 0)

      const expensesByHmrcCategory = exps
        .filter(e => e.type === 'expense')
        .reduce((acc, e) => {
          const cat = (e as any).hmrcCategory ?? 'not_categorised'
          acc[cat] = (acc[cat] ?? 0) + parseFloat(e.amount ?? '0')
          return acc
        }, {} as Record<string, number>)

      const uncategorisedCount = exps.filter(
        e => e.type === 'expense' && (e as any).hmrcCategory === 'not_categorised'
      ).length

      return {
        taxYear: input.taxYear,
        totalIncome,
        expensesByHmrcCategory,
        uncategorisedCount,
      }
    }),
})
