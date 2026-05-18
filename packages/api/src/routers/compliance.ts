import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { complianceRecords } from '@landlordlens/db/schema'

const createComplianceSchema = z.object({
  propertyId: z.string().uuid(),
  complianceType: z.enum(['gas_safety', 'epc', 'electrical', 'fire_safety', 'hmo_license', 'legionella', 'pat_testing', 'smoke_alarm', 'carbon_monoxide_alarm', 'landlord_registration', 'rent_smart_wales', 'other']),
  region: z.enum(['england', 'wales', 'scotland', 'northern_ireland', 'all']).default('all'),
  certificateNumber: z.string().optional(),
  issueDate: z.string(),
  expiryDate: z.string(),
  issuer: z.string().optional(),
  servedToTenantDate: z.string().optional(),
  notes: z.string().optional(),
})

const updateComplianceSchema = createComplianceSchema.partial().extend({
  id: z.string().uuid(),
})

export const complianceRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(complianceRecords)
      .where(eq(complianceRecords.userId, ctx.user.id))
      .orderBy(desc(complianceRecords.expiryDate))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(complianceRecords)
        .where(and(eq(complianceRecords.propertyId, input.propertyId), eq(complianceRecords.userId, ctx.user.id)))
        .orderBy(desc(complianceRecords.expiryDate))
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [record] = await ctx.db
        .select()
        .from(complianceRecords)
        .where(and(eq(complianceRecords.id, input.id), eq(complianceRecords.userId, ctx.user.id)))
      if (!record) throw new TRPCError({ code: 'NOT_FOUND' })
      return record
    }),

  create: protectedProcedure
    .input(createComplianceSchema)
    .mutation(async ({ ctx, input }) => {
      const [record] = await ctx.db
        .insert(complianceRecords)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return record!
    }),

  update: protectedProcedure
    .input(updateComplianceSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(complianceRecords)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(complianceRecords.id, id), eq(complianceRecords.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(complianceRecords)
        .where(and(eq(complianceRecords.id, input.id), eq(complianceRecords.userId, ctx.user.id)))
        .returning()
      if (!deleted) throw new TRPCError({ code: 'NOT_FOUND' })
    }),
})
