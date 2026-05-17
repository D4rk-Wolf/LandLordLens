# LandLordLens

[![Repository](https://img.shields.io/badge/GitHub-D4rk--Wolf%2FLandLordLens-blue?logo=github)](https://github.com/D4rk-Wolf/LandLordLens)

UK property management and compliance SaaS for landlords. Compliance-first — built to reduce risk for accidental landlords managing 1–50 properties.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Monorepo | Turborepo + pnpm workspaces |
| API | tRPC |
| Database | Supabase Postgres + Drizzle ORM |
| Auth | Supabase Auth |
| Payments | Stripe |
| Email | Resend + React Email |
| Styling | Tailwind CSS + shadcn/ui |
| Testing | Vitest + Playwright |
| Deployment | Vercel |
| Monitoring | Sentry |

## Monorepo Structure

```text
apps/
  web/          Next.js 16 App Router
  email/        React Email templates (Resend)
packages/
  db/           Drizzle schema + migrations
  api/          tRPC router + all procedures
  auth/         Supabase auth helpers + middleware
  billing/      Stripe + subscription tier logic
  ui/           shadcn/ui + custom components
  config/       Shared TS / ESLint / Tailwind config
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables (fill in Supabase, Stripe, and Sentry credentials)
cp apps/web/.env.example apps/web/.env.local

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

## Subscription Tiers

| Tier | Properties | Price |
| --- | --- | --- |
| Free | 2 | £0 |
| Professional | 10 | £12/mo · £120/yr |
| Business | 50 | £29/mo · £290/yr |
| Enterprise | Unlimited | £99/mo · £990/yr |

## UK Compliance Features

- EPC certificate tracking and expiry alerts
- Gas Safety certificate management
- HMO licensing
- Right to Rent verification
- Deposit protection scheme tracking
- Section 8 notice wizard
- Fire safety compliance
- Legionella risk assessment tracking
- Regional compliance (England, Wales, Scotland, Northern Ireland)

## Testing

```bash
pnpm test              # Unit tests (all packages, parallel)
pnpm test:integration  # Integration tests (requires local Supabase)
pnpm test:e2e          # Playwright E2E tests
```

## Design Spec

Full rebuild design documented at [`docs/superpowers/specs/2026-05-16-landlordlens-rebuild-design.md`](docs/superpowers/specs/2026-05-16-landlordlens-rebuild-design.md).

## Security

Please see our [Security Policy](security.md) for details on supported versions and how to report vulnerabilities securely.

## License

Please see the [License](license.md) file for full details. Copyright (c) 2026 D4rk-Wolf. All Rights Reserved.
