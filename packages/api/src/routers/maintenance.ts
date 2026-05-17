import { z } from 'zod'
import { eq, and, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { maintenanceTickets } from '@landlordlens/db/schema'

const createMaintenanceSchema = z.object({
  propertyId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  reportedBy: z.string().optional(),
})

const updateMaintenanceSchema = createMaintenanceSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['open', 'in_progress', 'completed', 'cancelled']).optional(),
  assignedTo: z.string().optional(),
  cost: z.string().optional(),
  completedDate: z.string().optional(),
})

export const maintenanceRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(maintenanceTickets)
      .where(eq(maintenanceTickets.userId, ctx.user.id))
      .orderBy(desc(maintenanceTickets.createdAt))
  }),

  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.propertyId, input.propertyId), eq(maintenanceTickets.userId, ctx.user.id)))
        .orderBy(desc(maintenanceTickets.createdAt))
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .select()
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.id, input.id), eq(maintenanceTickets.userId, ctx.user.id)))
      if (!ticket) throw new TRPCError({ code: 'NOT_FOUND' })
      return ticket
    }),

  create: protectedProcedure
    .input(createMaintenanceSchema)
    .mutation(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .insert(maintenanceTickets)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return ticket!
    }),

  update: protectedProcedure
    .input(updateMaintenanceSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(maintenanceTickets)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(maintenanceTickets.id, id), eq(maintenanceTickets.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),
})
