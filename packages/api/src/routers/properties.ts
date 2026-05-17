import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties } from '@landlordlens/db/schema'
import { canAddProperty, TierLimitError } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'

const addressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  county: z.string().optional(),
  postcode: z.string().min(1),
  country: z.string().default('United Kingdom'),
})

const createPropertySchema = z.object({
  address: addressSchema,
  propertyType: z.enum(['house', 'flat', 'apartment', 'bungalow', 'other']).default('house'),
  bedrooms: z.number().int().min(0).default(1),
  bathrooms: z.number().int().min(0).default(1),
  rentAmount: z.string().optional(),
  region: z.enum(['england', 'wales', 'scotland', 'northern_ireland']).default('england'),
  notes: z.string().optional(),
})

const updatePropertySchema = createPropertySchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['vacant', 'occupied', 'maintenance']).optional(),
})

export const propertiesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(properties)
      .where(eq(properties.userId, ctx.user.id))
      .orderBy(desc(properties.createdAt))
  }),

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
