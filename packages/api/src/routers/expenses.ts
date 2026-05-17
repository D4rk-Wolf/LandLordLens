import { z } from 'zod'
import { eq, and, desc, sum } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { expenses } from '@landlordlens/db/schema'

const createExpenseSchema = z.object({
  propertyId: z.string().uuid().optional(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  amount: z.string(),
  date: z.string(),
  description: z.string().min(1),
  supplier: z.string().optional(),
  isTaxDeductible: z.boolean().default(true),
  taxYear: z.string().optional(),
})

const updateExpenseSchema = createExpenseSchema.partial().extend({
  id: z.string().uuid(),
})

export const expensesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, ctx.user.id))
      .orderBy(desc(expenses.date))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(expenses)
        .where(and(eq(expenses.propertyId, input.propertyId), eq(expenses.userId, ctx.user.id)))
        .orderBy(desc(expenses.date))
    }),

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

  create: protectedProcedure
    .input(createExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const [expense] = await ctx.db
        .insert(expenses)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return expense!
    }),

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
