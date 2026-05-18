/**
 * @module routers/analytics
 * tRPC router providing portfolio-level financial KPIs and HMRC-aligned
 * expense summaries for the landlord's dashboard and tax reporting views.
 */

import { eq, count, sum, and } from 'drizzle-orm'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties, complianceRecords, expenses, tenancies } from '@landlordlens/db/schema'

export const analyticsRouter = createTRPCRouter({
  /** Returns top-level counts of properties and compliance records for the portfolio overview widget. */
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

  /** Returns total expenses grouped by user-defined category, used for the expenses breakdown chart. */
  expensesSummary: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({ category: expenses.category, total: sum(expenses.amount) })
      .from(expenses)
      .where(eq(expenses.userId, ctx.user.id))
      .groupBy(expenses.category)
  }),

  /**
   * Computes portfolio-level financial KPIs in a single call to avoid
   * multiple round-trips from the client.
   *
   * KPIs calculated:
   * - Gross yield: annualRentalIncome / totalCurrentValue × 100
   * - Net yield: NOI / totalCurrentValue × 100
   *   (NOI = annual rental income minus all operating expenses, before mortgage)
   * - Equity: currentValue − mortgageBalance summed across the portfolio
   * - Annual cash flow: NOI minus annual mortgage payments
   * - Cash-on-cash return: annualCashFlow / totalPurchasePrice × 100
   *
   * Yields and cash-on-cash are null when the divisor is zero to avoid
   * returning Infinity to the client.
   *
   * Note: `monthlyRent` and financial numeric columns are stored as `numeric`
   * strings in Postgres; they are parsed with parseFloat here.
   */
  portfolioKPIs: protectedProcedure.query(async ({ ctx }) => {
    // Fetch all three datasets in parallel to minimise latency.
    const [props, exps, activeTenancies] = await Promise.all([
      ctx.db.select().from(properties).where(eq(properties.userId, ctx.user.id)),
      ctx.db.select().from(expenses).where(eq(expenses.userId, ctx.user.id)),
      ctx.db.select().from(tenancies).where(and(
        eq(tenancies.userId, ctx.user.id),
        eq(tenancies.status, 'active')
      )),
    ])

    // Annualise rent from currently active tenancies only.
    const annualRentalIncome = activeTenancies.reduce(
      (s, t) => s + parseFloat(t.monthlyRent ?? '0'), 0
    ) * 12

    const annualOperatingExpenses = exps
      .filter(e => e.type === 'expense')
      .reduce((s, e) => s + parseFloat(e.amount ?? '0'), 0)

    // Net Operating Income: income before financing costs.
    const noi = annualRentalIncome - annualOperatingExpenses

    const totalCurrentValue = props.reduce((s, p) => s + parseFloat(p.currentValue ?? '0'), 0)
    const totalMortgageBalance = props.reduce((s, p) => s + parseFloat(p.mortgageBalance ?? '0'), 0)
    const annualMortgagePayments = props.reduce(
      (s, p) => s + parseFloat(p.mortgageMonthlyPayment ?? '0'), 0
    ) * 12

    // Guard against division-by-zero when property values are not yet entered.
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

  /**
   * Aggregates income and expenses for a given UK tax year (e.g. "2025-26"),
   * grouped by HMRC SA105 property income categories.
   *
   * The `uncategorisedCount` field flags how many expense records still have
   * `hmrcCategory === 'not_categorised'`, prompting the landlord to complete
   * their categorisation before filing self-assessment.
   *
   * @param input.taxYear - Tax year string in the format "YYYY-YY" (e.g. "2025-26").
   */
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

      // Build a map of HMRC category → total amount for the SA105 expense breakdown.
      const expensesByHmrcCategory = exps
        .filter(e => e.type === 'expense')
        .reduce((acc, e) => {
          const cat = e.hmrcCategory ?? 'not_categorised'
          acc[cat] = (acc[cat] ?? 0) + parseFloat(e.amount ?? '0')
          return acc
        }, {} as Record<string, number>)

      const uncategorisedCount = exps.filter(
        e => e.type === 'expense' && e.hmrcCategory === 'not_categorised'
      ).length

      return {
        taxYear: input.taxYear,
        totalIncome,
        expensesByHmrcCategory,
        uncategorisedCount,
      }
    }),
})
