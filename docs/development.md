# LandLordLens — Development Guide

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 22.x | [nodejs.org](https://nodejs.org) or `nvm use 22` |
| pnpm | 9.15.0 | `npm install -g pnpm@9.15.0` |
| Git | any | system package manager |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/D4rk-Wolf/LandLordLens.git
cd LandLordLens
pnpm install
```

### 2. Set up environment variables

Copy the example env file:
```bash
cp apps/web/.env.local.example apps/web/.env.local
```

Fill in the following variables (see [Architecture](./architecture.md#environment-variables) for descriptions):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...          # get from Stripe dashboard after registering webhook
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_...
STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_...
STRIPE_PRICE_BUSINESS_MONTHLY=price_...
STRIPE_PRICE_BUSINESS_ANNUAL=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_...
STRIPE_PRICING_TABLE_ID=prctbl_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Sentry (optional in development)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...
```

### 3. Set up the database

If using an existing Supabase project, link it and run migrations:
```bash
pnpm db:generate   # generate migration files from schema changes
pnpm db:migrate    # apply pending migrations to the database
```

To browse the database visually:
```bash
pnpm db:studio     # opens Drizzle Studio at http://localhost:4983
```

---

## Running the App

### Full dev server (web app + all packages)
```bash
pnpm dev
```
Opens at `http://localhost:3000`. Turborepo runs all `dev` tasks in parallel, including hot-reload for workspace packages.

### Email template preview
```bash
pnpm email:dev
```
Opens the React Email preview server at `http://localhost:3001`. Renders all templates in `apps/email/src/templates/`.

---

## Database Commands

| Command | Description |
|---|---|
| `pnpm db:generate` | Generates SQL migration files from schema changes in `packages/db/src/schema/` |
| `pnpm db:migrate` | Applies pending migrations to the configured `DATABASE_URL` |
| `pnpm db:studio` | Opens Drizzle Studio GUI at `http://localhost:4983` |
| `pnpm db:introspect` | Reverse-engineers the schema from an existing database (rarely needed) |

> **Important:** Always use `db:generate` + `db:migrate`. Never use `drizzle-kit push` in this project — it can cause data loss on production.

---

## Code Quality

```bash
pnpm typecheck    # TypeScript type checking across all packages
pnpm lint         # ESLint across all packages
pnpm build        # Full production build (verifies everything compiles)
```

---

## Adding a New tRPC Router

1. **Create the router file** in `packages/api/src/routers/my-feature.ts`:

```ts
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const myFeatureRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    // ctx.user, ctx.profile, ctx.db are all available
    return []
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // ...
    }),
})
```

2. **Register it in `packages/api/src/root.ts`**:

```ts
import { myFeatureRouter } from './routers/my-feature'

export const appRouter = createTRPCRouter({
  // ... existing routers
  myFeature: myFeatureRouter,
})
```

3. **Use in a server component**:

```ts
const caller = await createServerCaller()
const items = await caller.myFeature.list()
```

4. **Use in a client component**:

```ts
const { data } = trpc.myFeature.list.useQuery()
const mutation = trpc.myFeature.create.useMutation()
```

---

## Adding a New Database Table

1. **Create the schema file** in `packages/db/src/schema/my-table.ts`:

```ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { profiles } from './profiles'

export const myTable = pgTable('my_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type MyRow = typeof myTable.$inferSelect
export type NewMyRow = typeof myTable.$inferInsert
```

2. **Export from the schema index** (`packages/db/src/schema/index.ts`):

```ts
export * from './my-table'
```

3. **Generate and apply the migration**:

```bash
pnpm db:generate
pnpm db:migrate
```

4. **Query in a tRPC procedure** using `ctx.db` and `ctx.user.id` in every query.

---

## Branch Naming

| Prefix | Use for |
|---|---|
| `feature/*` | New features |
| `security/*` | Security fixes and hardening |
| `review/*` | Code review and refactoring |
| `chore/*` | Maintenance, dependency updates, config |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation only |

---

## Project Structure Conventions

- All server-side data fetching in pages goes through `createServerCaller()`.
- Client components that mutate data call `router.refresh()` after success to re-run server component queries.
- Every tRPC mutation must include a `userId` filter when writing to tenant-scoped tables.
- Never call `drizzle-kit push` — always generate + migrate.
- Schema types (`SubscriptionTier` etc.) must stay in sync between `packages/db/src/schema/profiles.ts` and `packages/billing/src/tiers.ts`.
