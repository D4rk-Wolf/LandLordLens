/**
 * tRPC HTTP handler — `/api/trpc/[trpc]`
 *
 * This catch-all route mounts the entire `AppRouter` from `@landlordlens/api`
 * as a standard Fetch-API handler compatible with the Next.js App Router.
 * Both GET (for queries) and POST (for mutations and batched requests) are
 * supported.  The tRPC client in the browser sends batched procedure calls to
 * this endpoint via `httpBatchLink`.
 *
 * `createTRPCContext` is called per-request to populate the tRPC context with
 * the authenticated Supabase user (read from the request cookies), the Drizzle
 * DB client, and the user's profile row.
 */
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@landlordlens/api'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }
