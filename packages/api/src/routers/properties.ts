/**
 * @module routers/properties
 * tRPC router for managing a landlord's property portfolio, including
 * tier-gated property creation and per-user data isolation.
 */

import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties } from '@landlordlens/db/schema'
import { canAddProperty, TierLimitError } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'

/** Zod schema for a structured UK postal address stored as JSONB. */
const addressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  county: z.string().optional(),
  postcode: z.string().min(1),
  country: z.string().default('United Kingdom'),
})

/** Input schema for creating a new property. */
const createPropertySchema = z.object({
  address: addressSchema,
  propertyType: z.enum(['house', 'flat', 'apartment', 'bungalow', 'other']).default('house'),
  bedrooms: z.number().int().min(0).default(1),
  bathrooms: z.number().int().min(0).default(1),
  rentAmount: z.string().optional(),
  region: z.enum(['england', 'wales', 'scotland', 'northern_ireland']).default('england'),
  epcRating: z.enum(['A','B','C','D','E','F','G']).optional(),
  epcExpiryDate: z.string().optional(),
  currentValue: z.string().optional(),
  mortgageBalance: z.string().optional(),
  mortgageRate: z.string().optional(),
  mortgageMonthlyPayment: z.string().optional(),
  prsRegistrationNumber: z.string().optional(),
  hmoLicenseNumber: z.string().optional(),
  hmoLicenseExpiry: z.string().optional(),
  notes: z.string().optional(),
})

/** Input schema for updating an existing property; all fields are optional except `id`. */
const updatePropertySchema = createPropertySchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['vacant', 'occupied', 'maintenance']).optional(),
})

export const propertiesRouter = createTRPCRouter({
  /** Returns all properties owned by the authenticated landlord, newest first. */
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(properties)
      .where(eq(properties.userId, ctx.user.id))
      .orderBy(desc(properties.createdAt))
  }),

  /**
   * Fetches a single property by UUID.
   * The `userId` check ensures a landlord cannot read another user's property
   * even if they know the UUID.
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [property] = await ctx.db
        .select()
        .from(properties)
        .where(and(eq(properties.id, input.id), eq(properties.userId, ctx.user.id)))
      if (!property) throw new TRPCError({ code: 'NOT_FOUND' })
      return property
    }),

  /**
   * Creates a new property after verifying the landlord's subscription tier
   * permits additional properties.
   *
   * The tier limit is enforced here (server-side) in addition to any
   * client-side gating, so the billing guard cannot be bypassed via the API.
   * A `TierLimitError` from the billing package is converted to a tRPC
   * FORBIDDEN error with the human-readable upgrade message.
   */
  create: protectedProcedure
    .input(createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      const tier = ctx.profile.subscription as SubscriptionTier
      try {
        await canAddProperty(ctx.user.id, tier, ctx.db)
      } catch (e) {
        if (e instanceof TierLimitError) {
          throw new TRPCError({ code: 'FORBIDDEN', message: e.message })
        }
        throw e
      }
      const [property] = await ctx.db
        .insert(properties)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return property!
    }),

  /**
   * Partially updates an existing property.
   * The `userId` guard in the WHERE clause prevents cross-user writes;
   * a null result means the record either doesn't exist or belongs to someone else.
   */
  update: protectedProcedure
    .input(updatePropertySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(properties)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(properties.id, id), eq(properties.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),
})
