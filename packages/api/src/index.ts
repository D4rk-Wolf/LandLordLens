/**
 * @module api
 * Public entry point for the `@landlordlens/api` package.
 * Re-exports the tRPC router, type, context factory, and procedure builders
 * so consumer packages only need to import from this single path.
 */

export { appRouter } from './root'
export type { AppRouter } from './root'
export { createTRPCContext, createCallerFactory } from './trpc'
export { createTRPCRouter, protectedProcedure, adminProcedure, publicProcedure } from './trpc'
