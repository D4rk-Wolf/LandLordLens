/**
 * @module auth/session
 * Convenience wrappers around Supabase's `auth.getUser()` for use in
 * Next.js Server Components and Server Actions.
 *
 * Note: `getCurrentUser` calls `supabase.auth.getUser()` which makes a
 * network request to Supabase to verify the JWT.  To avoid double-fetching
 * within a single request, wrap calls in React `cache()` if both a layout
 * and a page need the user object (see technical-debt.md).
 */
import { createServerClient } from './server'
import type { User } from '@supabase/supabase-js'

/**
 * Returns the currently authenticated Supabase user, or `null` if not signed in.
 * Safe to call from any Server Component or Server Action.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Like {@link getCurrentUser} but throws if there is no active session.
 * Use in contexts where an unauthenticated state is a programming error
 * rather than a user-facing condition.
 *
 * @throws {Error} If there is no authenticated user.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return user
}
