import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
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
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  webpack: {
    treeshake: { removeDebugLogging: true },
  },
})
