/**
 * @module routers/expenses
 * tRPC router for income and expense records used in HMRC self-assessment
 * reporting, with HMRC SA105 category support.
 */

import { z } from 'zod'
import { eq, and, desc, sum } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { expenses } from '@landlordlens/db/schema'

/**
 * Input schema for creating an income or expense record.
 *
 * The `hmrcCategory` field maps to the SA105 property income supplementary
 * page categories used in UK self-assessment tax returns.
 * Defaults to `not_categorised` so records can be bulk-imported and
 * categorised later.
 */
const createExpenseSchema = z.object({
  propertyId: z.string().uuid().optional(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  amount: z.string(),
  date: z.string(),
  description: z.string().min(1),
  supplier: z.string().optional(),
  isTaxDeductible: z.boolean().default(true),
  hmrcCategory: z.enum([
    'rent_and_other_income', 'premiums_of_lease_granted', 'premises_costs',
    'repairs_and_maintenance', 'financial_costs', 'professional_fees',
    'cost_of_services', 'travel_costs', 'other_allowable_expenses',
    'capital_allowances', 'residential_finance_costs', 'not_categorised'
  ]).default('not_categorised').optional(),
  taxYear: z.string().optional(),
})

/** Input schema for updating an existing expense record; all fields optional except `id`. */
const updateExpenseSchema = createExpenseSchema.partial().extend({
  id: z.string().uuid(),
})

export const expensesRouter = createTRPCRouter({
  /** Returns all expense/income records for the landlord, sorted by transaction date descending. */
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, ctx.user.id))
      .orderBy(desc(expenses.date))
  }),

  /** Returns all expense/income records for a specific property, sorted by date descending. */
  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(expenses)
        .where(and(eq(expenses.propertyId, input.propertyId), eq(expenses.userId, ctx.user.id)))
        .orderBy(desc(expenses.date))
    }),

  /** Fetches a single expense record by UUID, returning 404 if not found or not owned. */
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [expense] = await ctx.db
        .select()
        .from(expenses)
        .where(and(eq(expenses.id, input.id), eq(expenses.userId, ctx.user.id)))
      if (!expense) throw new TRPCError({ code: 'NOT_FOUND' })
      return expense
    }),

  /** Creates a new income or expense record linked to the landlord's account. */
  create: protectedProcedure
    .input(createExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const [expense] = await ctx.db
        .insert(expenses)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return expense!
    }),

  /** Partially updates an expense record (e.g. to assign an HMRC category after import). */
  update: protectedProcedure
    .input(updateExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(expenses)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(expenses.id, id), eq(expenses.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),

  /** Permanently deletes an expense/income record. */
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(expenses)
        .where(and(eq(expenses.id, input.id), eq(expenses.userId, ctx.user.id)))
        .returning()
      if (!deleted) throw new TRPCError({ code: 'NOT_FOUND' })
    }),
})
