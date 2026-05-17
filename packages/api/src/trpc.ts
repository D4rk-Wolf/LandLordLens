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

interface Context {
  db: DB
  user: User | null
  profile: Profile | null
  headers: Headers
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  return { db, user, profile, headers: opts.req.headers }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) throw new TRPCError({ code: 'UNAUTHORIZED' })
  const isAdmin = ctx.user.user_metadata?.['role'] === 'admin'
  if (!isAdmin) throw new TRPCError({ code: 'FORBIDDEN' })
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
