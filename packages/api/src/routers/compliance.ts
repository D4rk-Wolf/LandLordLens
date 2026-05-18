/**
 * @module routers/compliance
 * tRPC router for UK landlord compliance records (Gas Safety, EPC, EICR,
 * HMO licences, etc.), ordered by expiry date so the soonest-to-expire
 * records surface first in the dashboard.
 */

import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { complianceRecords } from '@landlordlens/db/schema'

/** Input schema for creating a compliance certificate record. */
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

/** Input schema for updating an existing compliance record; all fields optional except `id`. */
const updateComplianceSchema = createComplianceSchema.partial().extend({
  id: z.string().uuid(),
})

export const complianceRouter = createTRPCRouter({
  /**
   * Returns all compliance records for the landlord across their entire
   * portfolio, sorted by expiry date descending so the most urgent items
   * (soonest to expire) appear first.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(complianceRecords)
      .where(eq(complianceRecords.userId, ctx.user.id))
      .orderBy(desc(complianceRecords.expiryDate))
  }),

  /**
   * Returns compliance records scoped to a single property, also ordered by
   * expiry date so the property compliance view highlights certificates that
   * need renewal soonest.
   */
  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(complianceRecords)
        .where(and(eq(complianceRecords.propertyId, input.propertyId), eq(complianceRecords.userId, ctx.user.id)))
        .orderBy(desc(complianceRecords.expiryDate))
    }),

  /** Fetches a single compliance record, returning 404 if not found or not owned. */
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

  /** Creates a new compliance certificate record for the given property. */
  create: protectedProcedure
    .input(createComplianceSchema)
    .mutation(async ({ ctx, input }) => {
      const [record] = await ctx.db
        .insert(complianceRecords)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return record!
    }),

  /** Partially updates a compliance record (e.g. to record renewal dates or upload a document). */
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

  /** Permanently deletes a compliance record. */
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
