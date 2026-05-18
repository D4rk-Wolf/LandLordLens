/**
 * @module trpc
 * Initialises the tRPC instance, defines the per-request context, and exports
 * the procedure builders used throughout all API routers.
 */

import { initTRPC, TRPCError } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'

/** Shape of the tRPC request context passed to every procedure handler. */
interface Context {
  /** Drizzle ORM client using the service-role postgres connection (bypasses Supabase RLS). */
  db: DB
  /** Authenticated Supabase user, or null for unauthenticated requests. */
  user: User | null
  /** Landlord profile row from the `profiles` table, or null when not signed in. */
  profile: Profile | null
  /** Raw HTTP request headers forwarded from the fetch adapter. */
  headers: Headers
}

/**
 * Builds the per-request tRPC context.
 *
 * Resolves the Supabase session from the incoming request cookies, then
 * eagerly fetches the corresponding `profiles` row so every downstream
 * procedure has instant access to the user's role and subscription tier.
 *
 * @param opts - Options provided by the tRPC fetch adapter, containing the raw request.
 * @returns A populated {@link Context} object.
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    // Look up the profiles row that mirrors the Supabase auth.users entry.
    // The profile id is the same UUID as the Supabase user id.
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  return { db, user, profile, headers: opts.req.headers }
}

/**
 * Root tRPC instance configured with:
 * - superjson transformer (supports Date, Map, Set over the wire)
 * - custom error formatter that surfaces Zod validation details to the client
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // Flatten ZodError so clients receive field-level validation messages.
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/** Factory for creating tRPC routers. */
export const createTRPCRouter = t.router

/** Factory for creating server-side callers (used in server actions / tests). */
export const createCallerFactory = t.createCallerFactory

/** Unauthenticated procedure — no session check performed. */
export const publicProcedure = t.procedure

/**
 * Middleware that asserts the request is authenticated.
 * Narrows the context type so that `ctx.user` and `ctx.profile` are
 * non-nullable in any procedure that uses it.
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

/**
 * Procedure that requires an authenticated session.
 * Used by the vast majority of routes to ensure only signed-in landlords
 * can access their own data.
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

/**
 * Middleware that asserts the requesting user has the `admin` role.
 * Called after the auth check so both conditions must hold.
 */
const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) throw new TRPCError({ code: 'UNAUTHORIZED' })
  // Only profiles with role === 'admin' may pass; all other roles get 403.
  if (ctx.profile.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' })
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

/**
 * Procedure reserved for platform administrators.
 * Enforces both authentication and the `admin` role check.
 */
export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
