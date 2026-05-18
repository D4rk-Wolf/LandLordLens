# LandLordLens — Deployment Guide

The app is deployed on **Vercel** connected to the GitHub repository. Every push to `main` triggers a production deployment automatically.

---

## Prerequisites

- Vercel account with the GitHub integration installed
- Supabase project (Production)
- Stripe account with products and prices created
- Sentry project (optional but recommended)

---

## Vercel Configuration

### Project Settings

The Vercel project must be configured with:

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && pnpm build --filter=web` |
| Install Command | `cd ../.. && pnpm install` |
| Output Directory | `.next` (default) |

These settings tell Vercel to install dependencies from the monorepo root before building, which is required for workspace packages (`@landlordlens/api`, `@landlordlens/db`, etc.) to resolve correctly.

### Deploying

Push to `main`:
```bash
git push origin main
```

Vercel picks up the push via GitHub webhook and builds automatically. You can also trigger a manual redeploy from the Vercel dashboard.

### Preview Deployments

Every pull request gets its own preview URL. Preview deployments use the same environment variables as production unless you configure separate preview-specific variables in the Vercel dashboard.

---

## Environment Variables

Set all of these in **Vercel → Project → Settings → Environment Variables** for the Production environment. Most should also be set for Preview.

### Supabase

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → `service_role` key (keep secret) |
| `DATABASE_URL` | Supabase dashboard → Project Settings → Database → Connection string (URI, Transaction pooler) |

For `DATABASE_URL`, use the **Transaction Pooler** connection string (port 6543) rather than the direct connection. The app uses `prepare: false` in the Drizzle config to support PgBouncer.

Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Stripe

| Variable | Where to find it |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → signing secret (see below) |
| `STRIPE_PRICE_PROFESSIONAL_MONTHLY` | Stripe Dashboard → Products → Professional → Monthly price ID |
| `STRIPE_PRICE_PROFESSIONAL_ANNUAL` | Stripe Dashboard → Products → Professional → Annual price ID |
| `STRIPE_PRICE_BUSINESS_MONTHLY` | Stripe Dashboard → Products → Business → Monthly price ID |
| `STRIPE_PRICE_BUSINESS_ANNUAL` | Stripe Dashboard → Products → Business → Annual price ID |
| `STRIPE_PRICE_ENTERPRISE_MONTHLY` | Stripe Dashboard → Products → Enterprise → Monthly price ID |
| `STRIPE_PRICE_ENTERPRISE_ANNUAL` | Stripe Dashboard → Products → Enterprise → Annual price ID |
| `STRIPE_PRICING_TABLE_ID` | Stripe Dashboard → Payment links → Pricing tables |

### App

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g. `https://landlordlens-confoxs-projects.vercel.app`) — **no trailing slash** |

### Sentry (optional)

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry → Project → Settings → Client Keys (DSN) |
| `SENTRY_AUTH_TOKEN` | Sentry → Settings → Auth Tokens → create with `project:releases` scope |

---

## Supabase Auth Configuration

Supabase Auth must know your production URL to generate valid redirect URLs after sign-in and magic link emails.

1. Go to [Supabase Dashboard → Authentication → URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration)
2. Set **Site URL** to your production URL: `https://landlordlens-confoxs-projects.vercel.app`
3. Add the following to **Redirect URLs**:
   - `https://landlordlens-confoxs-projects.vercel.app/**`
   - `http://localhost:3000/**` (for local development)

When a custom domain is added, update the Site URL and add the new domain to Redirect URLs. The old Vercel URL can remain in Redirect URLs for continuity.

---

## Stripe Webhook Setup

The app requires a Stripe webhook to update subscription state after payment.

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set the endpoint URL to: `https://<your-domain>/api/webhooks/stripe`
4. Select these events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. After creating, reveal the **Signing secret** and set it as `STRIPE_WEBHOOK_SECRET` in Vercel

For local development, use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
The CLI prints a webhook signing secret — use that as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## Database Migrations

Migrations are applied manually before or after deploying schema changes.

```bash
# Generate migration files from schema changes
pnpm db:generate

# Apply pending migrations to the database
pnpm db:migrate
```

Never run `drizzle-kit push` — it can cause data loss by dropping and recreating tables.

**Order of operations for schema changes:**
1. Write the schema change in `packages/db/src/schema/`
2. Run `pnpm db:generate` to create the migration file
3. Review the generated SQL in `packages/db/src/migrations/`
4. Run `pnpm db:migrate` against the production database
5. Deploy the application code

---

## Rollback

Vercel makes it easy to roll back a deployment:

1. Go to Vercel → Project → Deployments
2. Find the last known good deployment
3. Click the **...** menu → **Promote to Production**

This is instant — no rebuild required.

For database rollbacks, Drizzle does not generate rollback files. Rollbacks require writing a manual migration:
1. Identify the migration to undo
2. Write a new migration that reverses the change
3. Run `pnpm db:migrate`

---

## Monitoring

- **Vercel Analytics**: available in the Vercel dashboard under Analytics
- **Sentry**: errors are captured automatically when `NEXT_PUBLIC_SENTRY_DSN` is set. View issues at [sentry.io](https://sentry.io). The app routes Sentry events through `/monitoring` to avoid ad-blocker interference.
- **Vercel Function Logs**: available in Vercel dashboard → Deployments → select deployment → Functions tab

---

## Custom Domain (Future)

When a custom domain is ready:

1. Add the domain in Vercel → Project → Settings → Domains
2. Configure DNS as instructed by Vercel (A record or CNAME)
3. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
4. Update **Site URL** in Supabase Auth → URL Configuration
5. Add `https://<new-domain>/**` to Supabase Redirect URLs
6. Update the Stripe webhook endpoint URL
7. Verify the `HSTS` header in `next.config.ts` is appropriate (currently set to 2 years with `preload`)
