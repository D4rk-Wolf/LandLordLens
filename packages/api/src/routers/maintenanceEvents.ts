import { z } from 'zod'
import { eq, and, asc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { maintenanceEvents, maintenanceTickets } from '@landlordlens/db/schema'

export const maintenanceEventsRouter = createTRPCRouter({
  listByTicket: protectedProcedure
    .input(z.object({ ticketId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .select({ id: maintenanceTickets.id })
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.id, input.ticketId), eq(maintenanceTickets.userId, ctx.user.id)))
      if (!ticket) return []
      return ctx.db
        .select()
        .from(maintenanceEvents)
        .where(eq(maintenanceEvents.ticketId, input.ticketId))
        .orderBy(asc(maintenanceEvents.createdAt))
    }),

  addEvent: protectedProcedure
    .input(z.object({
      ticketId: z.string().uuid(),
      eventType: z.enum(['created', 'status_changed', 'assigned', 'note_added', 'cost_updated', 'completed', 'cancelled']),
      description: z.string().min(1),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .select({ id: maintenanceTickets.id })
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.id, input.ticketId), eq(maintenanceTickets.userId, ctx.user.id)))
      if (!ticket) throw new TRPCError({ code: 'NOT_FOUND' })
      const [event] = await ctx.db
        .insert(maintenanceEvents)
        .values({
          ticketId: input.ticketId,
          userId: ctx.user.id,
          eventType: input.eventType,
          description: input.description,
          metadata: input.metadata ?? {},
        })
        .returning()
      return event!
    }),
})
