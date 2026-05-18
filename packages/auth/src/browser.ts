/**
 * @module auth/browser
 * Browser-side Supabase client factory.
 *
 * Uses `@supabase/ssr`'s `createBrowserClient` which handles cookie storage
 * automatically via the browser's `document.cookie` API.  Import this only
 * in `'use client'` components — for Server Components use `createServerClient`
 * from `auth/server` instead.
 */
import { createBrowserClient } from '@supabase/ssr'

/** Creates a Supabase client suitable for use in client-side React components. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
