import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { tenancies } from '@landlordlens/db/schema'

const createTenancySchema = z.object({
  propertyId: z.string().uuid(),
  tenantName: z.string().min(1),
  tenantEmail: z.string().email(),
  tenantPhone: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  monthlyRent: z.string(),
  deposit: z.string().optional(),
  tenancyType: z.enum(['assured_shorthold', 'assured', 'short_assured', 'fixed_term', 'protected']).default('assured_shorthold'),
})

const updateTenancySchema = createTenancySchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['active', 'ended', 'pending']).optional(),
  depositProtected: z.boolean().optional(),
})

export const tenanciesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(tenancies)
      .where(eq(tenancies.userId, ctx.user.id))
      .orderBy(desc(tenancies.createdAt))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(tenancies)
        .where(and(eq(tenancies.propertyId, input.propertyId), eq(tenancies.userId, ctx.user.id)))
        .orderBy(desc(tenancies.createdAt))
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [tenancy] = await ctx.db
        .select()
        .from(tenancies)
        .where(and(eq(tenancies.id, input.id), eq(tenancies.userId, ctx.user.id)))
      if (!tenancy) throw new TRPCError({ code: 'NOT_FOUND' })
      return tenancy
    }),

  create: protectedProcedure
    .input(createTenancySchema)
    .mutation(async ({ ctx, input }) => {
      const [tenancy] = await ctx.db
        .insert(tenancies)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return tenancy!
    }),

  update: protectedProcedure
    .input(updateTenancySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(tenancies)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(tenancies.id, id), eq(tenancies.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),
})
