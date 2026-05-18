/**
 * Server-side tRPC caller factory for use in React Server Components and
 * Next.js Route Handlers.
 *
 * `createServerCaller` builds a fully-typed, direct-call tRPC caller that
 * bypasses HTTP entirely — procedures are invoked in-process with no network
 * overhead.  The caller is memoised with React's `cache()` so it is created at
 * most once per request, even when called from multiple parallel server
 * components in the same render pass.
 *
 * Context injected into every tRPC call:
 *  - `db`      — the Drizzle database client.
 *  - `user`    — the authenticated Supabase user object (or `null` for guests).
 *  - `profile` — the user's row from the `profiles` table (includes `role` and
 *                subscription metadata), also `null` for unauthenticated requests.
 *  - `headers` — the Next.js `ReadonlyHeaders` object, forwarded so procedures
 *                can read request metadata if needed.
 *
 * Marked `server-only` to prevent accidental import into client bundles.
 */
import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { createCallerFactory, appRouter } from '@landlordlens/api'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'

const createCaller = createCallerFactory(appRouter)

/**
 * Returns a memoised tRPC caller pre-loaded with the current user's auth
 * context.  Call this at the top of any Server Component that needs data:
 *
 *   const caller = await createServerCaller()
 *   const properties = await caller.properties.list()
 *
 * The result is cached for the duration of the current React render tree, so
 * repeated calls within the same request are free.
 */
export const createServerCaller = cache(async () => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    // Fetch the user's profile row to expose role and subscription tier to
    // tRPC procedures without them needing to query the DB themselves.
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  const headersList = await headers()

  return createCaller({
    db,
    user,
    profile,
    headers: headersList,
  })
})
