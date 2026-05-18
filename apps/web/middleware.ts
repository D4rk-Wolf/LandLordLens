/**
 * Next.js Edge Middleware — session refresh and unauthenticated redirect guard.
 *
 * Runs on every request except static assets, image optimisation responses, the
 * favicon, and the Sentry tunnel route (`/monitoring`).  The heavy lifting is
 * delegated to `updateSession` from `@landlordlens/auth/middleware`, which:
 *   1. Reads the Supabase Auth cookie from the incoming request.
 *   2. If the access token is expired but a valid refresh token exists, silently
 *      refreshes the session and writes the updated cookies to the response so
 *      the user stays logged in.
 *   3. If no valid session exists on a protected route, redirects to `/sign-in`.
 *
 * Keeping this logic in Edge middleware means auth state is evaluated at the
 * CDN edge before any page or API handler runs, preventing flash-of-unauthenticated
 * content and reducing unnecessary origin hits.
 */
import { updateSession } from '@landlordlens/auth/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  // Exclude build artefacts and the Sentry monitoring tunnel from middleware to
  // avoid interfering with Next.js internals and Sentry's source-map upload route.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|monitoring).*)'],
}
