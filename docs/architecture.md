# LandLordLens — Architecture

## Overview

LandLordLens is a **UK property compliance SaaS** built on a TypeScript monorepo managed by [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build). The application targets "accidental landlords" (1–5 properties) and is framed around the post-Renters' Rights Act (RRA 2025/2026) regulatory landscape.

---

## Monorepo Structure

```
landlordlens/
├── apps/
│   ├── web/          # Next.js 16 application (the main product)
│   └── email/        # React Email template preview server (dev-only)
└── packages/
    ├── api/          # tRPC router definitions — all business logic lives here
    ├── auth/         # Supabase Auth wrappers (browser client, server client, session helpers)
    ├── billing/      # Stripe integration (checkout, portal, webhooks, tier guards)
    ├── db/           # Drizzle ORM schema + postgres client
    ├── ui/           # Shared Shadcn/UI component library (Card, Button, etc.)
    └── config/       # Shared TypeScript / ESLint / Tailwind config files
```

### Package roles

| Package | Responsibility |
|---|---|
| `apps/web` | Next.js App Router app, pages, API routes, middleware |
| `apps/email` | React Email template previews — run locally with `pnpm email:dev` |
| `packages/api` | All tRPC routers; imported by both `apps/web` server components and the `/api/trpc` route handler |
| `packages/auth` | Supabase client factories (browser + server + service-role), session helpers, role predicates, edge middleware |
| `packages/billing` | Stripe client singleton, checkout/portal session helpers, subscription tier config, webhook handler, property limit guard |
| `packages/db` | Drizzle ORM client (direct postgres connection), all table schemas, migration config |
| `packages/ui` | Shadcn/UI component wrappers — keeps UI primitives version-pinned across the repo |
| `packages/config` | Shared `tsconfig.base.json`, ESLint config, Tailwind preset |

---

## Request Flow

```
Browser
  │
  ▼
Next.js Edge Middleware  (apps/web/middleware.ts)
  │  • Refreshes expired Supabase session tokens
  │  • Redirects unauthenticated users away from /dashboard and /admin
  ▼
Next.js App Router
  │
  ├── Server Component page
  │     │  calls createServerCaller() — cached tRPC caller, no HTTP round-trip
  │     ▼
  │   packages/api  →  packages/db  →  Supabase PostgreSQL
  │
  └── Client Component ('use client')
        │  calls trpc.*.useMutation / trpc.*.useQuery
        ▼
      /api/trpc/[trpc]  (apps/web/app/api/trpc/[trpc]/route.ts)
        │  tRPC fetchRequestHandler
        ▼
      packages/api  →  packages/db  →  Supabase PostgreSQL
```

**Key rule:** Server components use `createServerCaller()` (zero-latency in-process call). Client components use the standard tRPC HTTP transport via `/api/trpc`.

---

## Authentication Flow

1. User signs in at `/sign-in` using Supabase Auth (email+password or magic link).
2. Supabase sets an `sb-*` session cookie in the browser.
3. On every subsequent request, Next.js middleware (`apps/web/middleware.ts`) calls `updateSession()` from `@landlordlens/auth/middleware`. This:
   - Reads the session cookie.
   - Silently refreshes the access token if it has expired (using the refresh token).
   - Writes the updated cookie to the response.
   - Redirects to `/sign-in` if no valid session exists and the path is protected.
4. In tRPC context (`createTRPCContext`), `supabase.auth.getUser()` verifies the JWT and returns the authenticated user.
5. The `profiles` row is fetched and attached to the context so every procedure has immediate access to `ctx.profile.role` and `ctx.profile.subscription`.

---

## Key Patterns

### Server components — `createServerCaller`

```ts
// apps/web/lib/trpc/server.ts
const caller = await createServerCaller()
const properties = await caller.properties.list()
```

`createServerCaller` is wrapped in React `cache()` so repeated calls within the same request share the tRPC context (one `getUser()` call, one `profiles` query).

### Client components — tRPC hooks

```ts
// 'use client'
const mutation = trpc.properties.create.useMutation({ onSuccess: () => router.refresh() })
```

tRPC mutations trigger a full page refresh (`router.refresh()`) after success to re-run server component data fetching.

### `protectedProcedure` — auth guard

Every tRPC procedure that accesses user data uses `protectedProcedure`, which throws `UNAUTHORIZED` if `ctx.user` or `ctx.profile` is null.

### `adminProcedure` — admin guard

Admin procedures additionally check `ctx.profile.role === 'admin'`. Promote a user to admin with:
```sql
UPDATE profiles SET role = 'admin' WHERE id = '<supabase-uuid>';
```

---

## Environment Variables

| Variable | Used by | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | billing checkout/portal | Production URL for Stripe redirect URLs |
| `NEXT_PUBLIC_SUPABASE_URL` | auth (browser + server) | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | auth (browser + server) | Supabase anon key (safe to expose) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry client config | DSN for client-side error reporting |
| `SUPABASE_SERVICE_ROLE_KEY` | auth service-role client | Bypasses RLS — keep secret |
| `DATABASE_URL` | db client | Direct postgres connection string |
| `STRIPE_SECRET_KEY` | billing client | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | billing webhooks | HMAC signing secret for webhook verification |
| `STRIPE_PRICE_PROFESSIONAL_MONTHLY` | billing tiers | Stripe price ID for Professional monthly |
| `STRIPE_PRICE_PROFESSIONAL_ANNUAL` | billing tiers | Stripe price ID for Professional annual |
| `STRIPE_PRICE_BUSINESS_MONTHLY` | billing tiers | Stripe price ID for Business monthly |
| `STRIPE_PRICE_BUSINESS_ANNUAL` | billing tiers | Stripe price ID for Business annual |
| `STRIPE_PRICE_ENTERPRISE_MONTHLY` | billing tiers | Stripe price ID for Enterprise monthly |
| `STRIPE_PRICE_ENTERPRISE_ANNUAL` | billing tiers | Stripe price ID for Enterprise annual |
| `STRIPE_PRICING_TABLE_ID` | pricing page | Stripe pricing table embed ID |
| `SENTRY_AUTH_TOKEN` | build (Sentry source maps) | Token for uploading source maps during CI build |

---

## Stripe Integration

```
User clicks "Monthly" / "Annual"
  │
  ▼
billing.checkout mutation (tRPC)
  │  1. Creates Stripe customer if none exists → saves to profiles.stripeCustomerId
  │  2. Creates Checkout Session with tier metadata + success/cancel URLs
  ▼
Stripe-hosted checkout page
  │
  ▼  (on success)
Stripe fires webhook → POST /api/webhooks/stripe
  │  1. Verifies HMAC signature with STRIPE_WEBHOOK_SECRET
  │  2. Routes event type:
  │     - customer.subscription.created / .updated → update profiles.subscription + endDate
  │     - customer.subscription.deleted → reset to 'free', clear subscriptionId
  ▼
profiles table updated — next tRPC call reflects new tier
```

---

## Sentry Integration

- **Instrumentation:** `instrumentation.ts` (server) + `instrumentation-client.js` (client) initialise Sentry at app startup.
- **Configs:** `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`.
- **Sampling:** `tracesSampleRate: 0.1` (10%) — balances observability with cost.
- **PII:** `sendDefaultPii: false` — does not capture cookies or request headers (GDPR).
- **Tunnel:** Events are proxied through `/monitoring` to avoid ad-blocker interference.
- **Source maps:** Uploaded automatically during Vercel builds via `withSentryConfig` in `next.config.ts`. The `SENTRY_AUTH_TOKEN` env var must be set in Vercel.
