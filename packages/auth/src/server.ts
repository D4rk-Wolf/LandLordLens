/**
 * @module auth/server
 * Server-side Supabase client factories for Next.js App Router.
 *
 * Two clients are exported:
 * - `createServerClient` — uses the anon key and reads/writes cookies via
 *   Next.js `cookies()`.  Use this for user-scoped operations (getUser, signIn).
 * - `createServiceRoleClient` — uses the service role key and bypasses Row Level
 *   Security.  Use only in trusted server contexts (webhooks, admin procedures).
 */
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client that reads and writes session cookies via the
 * Next.js `cookies()` API.  The `setAll` implementation silently swallows
 * errors when called from a Server Component because cookies can only be
 * written from middleware in that context — the session refresh in middleware
 * handles the actual write.
 */
export async function createServerClient() {
  const cookieStore = await cookies()
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component — cookies will be set by middleware
          }
        },
      },
    },
  )
}

/**
 * Creates a Supabase client using the service role key, which bypasses
 * Row Level Security.  Required for admin operations such as listing all users
 * or writing auth metadata.
 *
 * Uses `require()` to avoid the `@supabase/supabase-js` package being bundled
 * into client-side code — this function must only ever be called on the server.
 */
export function createServiceRoleClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
