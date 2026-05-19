# LandLordLens — Technical Debt & Deferred Backlog

This file tracks known issues, deferred work, and architectural decisions that should be revisited as the product grows. Items are grouped by area and rated by risk level.

**Risk levels:**
- 🔴 **High** — likely to cause a production bug or security issue if not addressed soon
- 🟡 **Medium** — will cause problems at scale or impede future development
- 🟢 **Low** — quality or developer experience improvements, not urgent

---

## Security

### 🟡 Rate limiting on API routes

There is currently no rate limiting on tRPC mutations or sensitive API routes (`/api/webhooks/stripe`, `/api/export/audit-pack`). Under heavy use or targeted abuse this could allow:
- Brute-force scraping of data
- Replay attacks on the webhook endpoint (mitigated by HMAC verification, but not rate-limited)
- Abuse of the checkout mutation to spam Stripe customer creation

**Recommended fix:** Add rate limiting middleware (e.g. Upstash Redis + `@upstash/ratelimit`) on the tRPC route handler and the two API routes listed above.

---

### 🟡 No CSRF protection on API routes

Next.js App Router API routes do not have explicit CSRF protection. This is partially mitigated by the tRPC `Content-Type: application/json` requirement, but custom API routes (`/api/webhooks/stripe`, `/api/export/audit-pack`) could be cross-origin targets.

**Recommended fix:** Add `SameSite=Lax` assertion on cookies (Supabase default) and consider adding a CSRF token for state-changing non-tRPC requests.

---

### 🟡 Supabase Storage bucket permissions not audited

Documents are uploaded directly to Supabase Storage from the browser. The bucket policies have not been audited to ensure landlords can only read their own files. If bucket policies are too permissive, any authenticated user could access any file by guessing the path.

**Recommended fix:** Audit and tighten Supabase Storage RLS policies so each bucket enforces `auth.uid() = user_id` at the storage level, not just in the application.

---

### 🟢 `audit_log.user_id` has no foreign key constraint

The `audit_log` table stores `user_id` without a FK to `profiles`. This was intentional (to retain logs for deleted users) but means the column has no referential integrity. If a user ID is accidentally wrong, there is no database-level check.

---

## Data Model

### 🟡 Legacy `compliance` and `financials` JSONB blobs on `properties`

The `properties` table has two legacy JSONB columns (`compliance`, `financials`) that were superseded by the `compliance_records` and `expenses` tables. Older data may still reference these blobs. They are kept for backwards compatibility.

**Recommended fix:** Migrate any existing data from these blobs into the proper tables, then drop the columns and remove the `financials: jsonb` and `compliance: jsonb` definitions from the schema.

---

### 🟡 `tenancies.deposit_protected` is redundant

The `tenancies` table has a `deposit_protected` boolean, but there is also a separate `deposit_protections` table. These two sources can get out of sync if one is updated without the other.

**Recommended fix:** Derive the boolean from the existence of a `deposit_protections` row rather than storing it separately, or add a DB trigger to keep them in sync.

---

### 🟢 `expenses` table serves double duty as income ledger

The table is named `expenses` but stores both income and expense records. This is documented in the schema, but the naming causes confusion. A future migration could rename the table to `financial_transactions` and update all references.

---

### 🟢 `services` router is a stub

`packages/api/src/routers/services.ts` returns an empty array and has no implementation. This is a placeholder for a future service directory feature. It currently adds noise to the API surface without providing value.

---

## Application Layer

### 🟡 No optimistic updates on mutations

Client components call `router.refresh()` after every mutation to re-run server component queries. This causes a full page reload on every form submission, which is noticeably slow on pages with many server queries (e.g. the property detail page which loads tenancies, compliance, expenses, and maintenance in parallel).

**Recommended fix:** For frequently-mutated data (tenancy status, compliance records), add optimistic updates via tRPC's `onMutate` + `queryClient.setQueryData` pattern to update the UI immediately before the server confirms.

---

### 🟡 `createServerCaller` is called multiple times per page in some layouts

Some page files call `createServerCaller()` more than once because different data-fetching calls are in separate components in the same server component tree. While React `cache()` deduplicates the context setup, each `caller.*` call still hits the database.

**Recommended fix:** Pass data as props between server components rather than each component fetching independently. Consider a top-level data loader pattern per page route.

---

### 🟢 No pagination on any list queries

All `list` procedures return unbounded result sets. For landlords with many records (especially `expenses` and `maintenanceEvents`), this will become slow and expensive as the dataset grows.

**Recommended fix:** Add `limit` and `cursor` (or `offset`) parameters to all list procedures and implement cursor-based pagination in the client.

---

### 🟢 `analytics.portfolioKPIs` loads all records into memory

The `portfolioKPIs` procedure fetches all properties, all expenses, and all tenancies for the user into memory in JavaScript and computes KPIs there. This is fine for small portfolios but will slow down as data grows.

**Recommended fix:** Push the aggregation into SQL using `sum()`, `avg()`, and conditional aggregates. This is a straightforward query rewrite that will scale to large portfolios without code complexity.

---

## Infrastructure

### 🟡 No staging environment

There is currently no staging Vercel deployment or separate Supabase project for staging. All testing happens locally or on production.

**Recommended fix:** Create a separate Supabase project for staging and a separate Vercel environment (deploy from a `staging` branch). This is particularly important before going fully live, so Stripe webhook changes and database migrations can be validated before hitting production users.

---

### 🟡 Database migrations are applied manually

There is no automated migration step in the CI/CD pipeline. Migrations must be run manually before deploying breaking schema changes.

**Recommended fix:** Add a pre-deploy step in Vercel (or a GitHub Actions workflow) that runs `pnpm db:migrate` with the production `DATABASE_URL`, scoped to only run on `main` branch deploys.

---

### 🟢 No automated test suite

There are currently no unit, integration, or end-to-end tests. All testing is manual.

**Recommended fix (priority order):**
1. Unit tests for pure functions (billing tier guard, analytics KPI calculations)
2. Integration tests for tRPC procedures using a test database
3. End-to-end tests for critical user flows (sign-up, add property, upgrade plan) using Playwright

---

## Third-Party Dependencies

### 🟡 Stripe webhook only handles subscription events

The webhook handler at `/api/webhooks/stripe` handles `customer.subscription.*` events but does not handle payment failure events (`invoice.payment_failed`) or dispute events. A failed payment silently leaves the subscription in `past_due` without notifying the user.

**Recommended fix:** Handle `invoice.payment_failed` to send a notification to the landlord (once an email service is integrated) and `customer.subscription.updated` already fires for `past_due` status changes — confirm the UI surfaces this status visibly.

---

### 🟡 No transactional email service

Supabase handles auth emails (sign-up confirmation, magic links, password reset) natively. However, there is no service for product-level emails (e.g. "Your Gas Safety certificate expires in 30 days", "Your payment failed", "Your subscription was cancelled").

**Recommended fix:** Integrate [Resend](https://resend.com) or a similar transactional email service. The `apps/email` package already has React Email templates ready to send. Wire up `RESEND_API_KEY` and a server-side email sending function.

---

### 🟢 Sentry `tracesSampleRate` is hardcoded at 10%

The 10% trace sample rate in `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts` is appropriate for early production but should be reviewed once traffic patterns are understood.

---

## Feature Parity Gaps

These features were planned but not yet implemented. They are not bugs, just missing functionality.

| Feature | Status | Notes |
|---|---|---|
| Section 8 wizard | Not built | Planned for Business plan. Requires `tenancies` boolean flags as prerequisites. |
| Ombudsman Vault export | Partially built | `/api/export/audit-pack` exists but UI trigger not wired up |
| Right to Rent record UI | DB table exists | No frontend for `right_to_rent` table |
| Background checks UI | DB table exists | No frontend for `tenant_background_checks` table |
| Inventory UI | DB table exists | No frontend for `inventories` table |
| Property Portal registration | Not started | England will require landlord registration on the new Property Portal |
| Tenant portal | Not started | Read-only tenant view of their tenancy details and documents |
| Bulk CSV import | Not started | Import expenses, compliance records from spreadsheets |
| Rent payment tracking | Partial | `payments` table exists but no rent-tracking workflow |
