import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { documents } from '@landlordlens/db/schema'

const createDocumentSchema = z.object({
  propertyId: z.string().uuid().optional(),
  name: z.string().min(1),
  category: z.enum(['compliance', 'tenancy', 'legal', 'financial', 'inspection', 'other']).default('other'),
  storagePath: z.string().min(1),
  mimeType: z.string().optional(),
  sizeBytes: z.number().int().optional(),
})

export const documentsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(documents)
      .where(eq(documents.userId, ctx.user.id))
      .orderBy(desc(documents.createdAt))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(documents)
        .where(and(eq(documents.propertyId, input.propertyId), eq(documents.userId, ctx.user.id)))
        .orderBy(desc(documents.createdAt))
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [doc] = await ctx.db
        .select()
        .from(documents)
        .where(and(eq(documents.id, input.id), eq(documents.userId, ctx.user.id)))
      if (!doc) throw new TRPCError({ code: 'NOT_FOUND' })
      return doc
    }),

  create: protectedProcedure
    .input(createDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const [doc] = await ctx.db
        .insert(documents)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return doc!
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(documents)
        .where(and(eq(documents.id, input.id), eq(documents.userId, ctx.user.id)))
        .returning()
      if (!deleted) throw new TRPCError({ code: 'NOT_FOUND' })
    }),
})
