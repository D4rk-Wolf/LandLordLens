import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { propertyInspections } from '@landlordlens/db/schema'

const createInspectionSchema = z.object({
  propertyId: z.string().uuid(),
  tenancyId: z.string().uuid().optional(),
  inspectionType: z.enum(['routine', 'check_in', 'check_out', 'maintenance', 'compliance', 'complaint']),
  scheduledDate: z.string(),
  conductedBy: z.string().min(1),
  tenantPresent: z.boolean().default(false),
  notes: z.string().optional(),
})

const updateInspectionSchema = createInspectionSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'rescheduled']).optional(),
  actualDate: z.string().optional(),
  overallCondition: z.enum(['excellent', 'good', 'fair', 'poor']).optional(),
  issuesFound: z.boolean().optional(),
})

export const inspectionsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(propertyInspections)
      .where(eq(propertyInspections.userId, ctx.user.id))
      .orderBy(desc(propertyInspections.scheduledDate))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(propertyInspections)
        .where(and(eq(propertyInspections.propertyId, input.propertyId), eq(propertyInspections.userId, ctx.user.id)))
        .orderBy(desc(propertyInspections.scheduledDate))
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [inspection] = await ctx.db
        .select()
        .from(propertyInspections)
        .where(and(eq(propertyInspections.id, input.id), eq(propertyInspections.userId, ctx.user.id)))
      if (!inspection) throw new TRPCError({ code: 'NOT_FOUND' })
      return inspection
    }),

  create: protectedProcedure
    .input(createInspectionSchema)
    .mutation(async ({ ctx, input }) => {
      const [inspection] = await ctx.db
        .insert(propertyInspections)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return inspection!
    }),

  update: protectedProcedure
    .input(updateInspectionSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(propertyInspections)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(propertyInspections.id, id), eq(propertyInspections.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),
})
