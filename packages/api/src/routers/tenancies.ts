/**
 * @module routers/tenancies
 * tRPC router for managing tenancy agreements linked to properties,
 * covering creation, lookup, and status updates (active / ended / pending).
 */

import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { tenancies } from '@landlordlens/db/schema'

/** Input schema for creating a new tenancy agreement. */
const createTenancySchema = z.object({
  propertyId: z.string().uuid(),
  tenantName: z.string().min(1),
  tenantEmail: z.string().email(),
  tenantPhone: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  monthlyRent: z.string(),
  deposit: z.string().optional(),
  tenancyType: z.enum(['periodic_assured', 'assured', 'short_assured', 'fixed_term', 'protected']).default('periodic_assured'),
})

/** Input schema for updating an existing tenancy; all fields optional except `id`. */
const updateTenancySchema = createTenancySchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['active', 'ended', 'pending']).optional(),
  depositProtected: z.boolean().optional(),
})

export const tenanciesRouter = createTRPCRouter({
  /** Returns all tenancies owned by the authenticated landlord, newest first. */
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(tenancies)
      .where(eq(tenancies.userId, ctx.user.id))
      .orderBy(desc(tenancies.createdAt))
  }),

  /**
   * Returns all tenancies for a specific property.
   * Includes the `userId` guard so landlords cannot enumerate tenancies on
   * properties they do not own.
   */
  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(tenancies)
        .where(and(eq(tenancies.propertyId, input.propertyId), eq(tenancies.userId, ctx.user.id)))
        .orderBy(desc(tenancies.createdAt))
    }),

  /** Fetches a single tenancy by UUID, returning 404 if not found or not owned. */
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

  /** Creates a new tenancy linked to the authenticated landlord's account. */
  create: protectedProcedure
    .input(createTenancySchema)
    .mutation(async ({ ctx, input }) => {
      const [tenancy] = await ctx.db
        .insert(tenancies)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return tenancy!
    }),

  /**
   * Partially updates a tenancy record.
   * Used to record status changes (e.g. marking as 'ended') and to flag
   * whether the deposit has been protected with a government-backed scheme.
   */
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
