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

export default nextConfig
