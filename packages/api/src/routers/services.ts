import { createTRPCRouter, protectedProcedure } from '../trpc'

export const servicesRouter = createTRPCRouter({
  list: protectedProcedure.query(async () => {
    return []
  }),
})
