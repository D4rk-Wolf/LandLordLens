import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
