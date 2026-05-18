/**
 * Next.js configuration for the LandLordLens web application.
 *
 * Key concerns handled here:
 *  - Security headers applied to every response (HSTS, CSP-adjacent headers,
 *    referrer policy, permissions policy).
 *  - Turbopack root override so the bundler can resolve workspace packages that
 *    live outside the `apps/web` directory.
 *  - `transpilePackages` list ensures the monorepo's internal packages (ui, auth,
 *    billing, api, db, email) are compiled by the Next.js webpack/turbopack pipeline
 *    rather than assumed to be pre-built CJS modules.
 *  - Sentry integration via `withSentryConfig` for source-map uploads and the
 *    `/monitoring` tunnel route that avoids ad-blocker interference.
 */
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'

/**
 * HTTP security headers added to all responses.
 * - `X-Frame-Options: DENY` prevents clickjacking by disallowing framing.
 * - `X-Content-Type-Options: nosniff` stops browsers from MIME-sniffing responses.
 * - `Referrer-Policy` limits referrer information sent to cross-origin destinations.
 * - `Permissions-Policy` disables camera, microphone, and geolocation access.
 * - `Strict-Transport-Security` enforces HTTPS for 2 years including subdomains,
 *   and opts the domain into HSTS preload lists.
 */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  turbopack: {
    // Point Turbopack at the monorepo root so workspace package imports resolve
    // correctly without needing to eject to a custom webpack alias.
    root: path.resolve(__dirname, '../..'),
  },
  transpilePackages: [
    '@landlordlens/ui',
    '@landlordlens/auth',
    '@landlordlens/billing',
    '@landlordlens/api',
    '@landlordlens/db',
    '@landlordlens/email',
  ],
}

export default withSentryConfig(nextConfig, {
  org: 'd4rkwolf-o6',
  project: 'landlordlens',
  // Suppress Sentry CLI output outside CI to keep local dev noise-free.
  silent: !process.env.CI,
  // Upload client-side source maps from deeply nested chunks (e.g. lazy-loaded
  // route segments) so Sentry can fully de-obfuscate client errors.
  widenClientFileUpload: true,
  // Proxy Sentry events through /monitoring to prevent ad-blocker interference.
  tunnelRoute: '/monitoring',
  webpack: {
    treeshake: { removeDebugLogging: true },
  },
})
