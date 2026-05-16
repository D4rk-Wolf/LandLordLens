# LandLordLens v2 — Phase 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Turborepo monorepo and implement all shared packages (`config`, `db`, `auth`, `billing`, `api`, `ui`) and `apps/email` — producing a fully typed, tested foundation that `apps/web` (Phase 2) will consume.

**Architecture:** pnpm workspaces with Turborepo orchestration. Six packages encapsulate all business logic. `packages/api` is the only package that imports from both `packages/db` and `packages/auth`. `packages/billing` handles Stripe entirely. `apps/web` (Phase 2) is a thin layer that imports from packages — no business logic inline.

**Tech Stack:** Turborepo 2, pnpm 9, TypeScript 5.7, tRPC 11, Drizzle ORM 0.38, Supabase (auth + Postgres), @supabase/ssr, Stripe 17, shadcn/ui, Tailwind CSS v4, Vitest 3, React Email, Resend, Zod 3, superjson 2

> **Reference:** Old business logic lives in `server/routes/` and `lib/` — available via `git show HEAD~1:server/routes/properties.js` etc. during tRPC procedure writing.

---

## File Map

### Root
- Replace: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.env.example` (replace existing)
- Delete: `src/`, `server/`, `lib/`, `tests/`, `package-lock.json`, `node_modules/`, `Procfile`

### packages/config
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig.base.json`
- Create: `packages/config/tsconfig.nextjs.json`
- Create: `packages/config/eslint.config.js`
- Create: `packages/config/prettier.config.js`

### packages/db
- Create: `packages/db/package.json`
- Create: `packages/db/tsconfig.json`
- Create: `packages/db/drizzle.config.ts`
- Create: `packages/db/src/client.ts`
- Create: `packages/db/src/schema/profiles.ts`
- Create: `packages/db/src/schema/properties.ts`
- Create: `packages/db/src/schema/tenancies.ts`
- Create: `packages/db/src/schema/compliance.ts`
- Create: `packages/db/src/schema/documents.ts`
- Create: `packages/db/src/schema/inspections.ts`
- Create: `packages/db/src/schema/maintenance.ts`
- Create: `packages/db/src/schema/expenses.ts`
- Create: `packages/db/src/schema/audit.ts`
- Create: `packages/db/src/schema/index.ts`
- Create: `packages/db/src/index.ts`

### packages/auth
- Create: `packages/auth/package.json`
- Create: `packages/auth/tsconfig.json`
- Create: `packages/auth/src/server.ts`
- Create: `packages/auth/src/browser.ts`
- Create: `packages/auth/src/session.ts`
- Create: `packages/auth/src/middleware.ts`
- Create: `packages/auth/src/roles.ts`
- Create: `packages/auth/src/index.ts`
- Create: `packages/auth/src/__tests__/session.test.ts`

### packages/billing
- Create: `packages/billing/package.json`
- Create: `packages/billing/tsconfig.json`
- Create: `packages/billing/src/client.ts`
- Create: `packages/billing/src/tiers.ts`
- Create: `packages/billing/src/checkout.ts`
- Create: `packages/billing/src/webhooks.ts`
- Create: `packages/billing/src/guards.ts`
- Create: `packages/billing/src/index.ts`
- Create: `packages/billing/src/__tests__/tiers.test.ts`
- Create: `packages/billing/src/__tests__/guards.test.ts`
- Create: `packages/billing/vitest.config.ts`

### packages/api
- Create: `packages/api/package.json`
- Create: `packages/api/tsconfig.json`
- Create: `packages/api/src/trpc.ts`
- Create: `packages/api/src/middleware/auth.ts`
- Create: `packages/api/src/middleware/subscription.ts`
- Create: `packages/api/src/routers/properties.ts`
- Create: `packages/api/src/routers/tenancies.ts`
- Create: `packages/api/src/routers/compliance.ts`
- Create: `packages/api/src/routers/expenses.ts`
- Create: `packages/api/src/routers/documents.ts`
- Create: `packages/api/src/routers/inspections.ts`
- Create: `packages/api/src/routers/maintenance.ts`
- Create: `packages/api/src/routers/analytics.ts`
- Create: `packages/api/src/routers/admin.ts`
- Create: `packages/api/src/routers/services.ts`
- Create: `packages/api/src/root.ts`
- Create: `packages/api/src/index.ts`
- Create: `packages/api/src/__tests__/properties.test.ts`
- Create: `packages/api/vitest.config.ts`

### packages/ui
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/cn.ts`
- Create: `packages/ui/src/index.ts`
- (shadcn components added via CLI in task)

### apps/email
- Create: `apps/email/package.json`
- Create: `apps/email/tsconfig.json`
- Create: `apps/email/src/resend.ts`
- Create: `apps/email/src/templates/verification.tsx`
- Create: `apps/email/src/templates/welcome.tsx`
- Create: `apps/email/src/templates/password-reset.tsx`
- Create: `apps/email/src/templates/compliance-alert.tsx`
- Create: `apps/email/src/templates/tenant-invite.tsx`
- Create: `apps/email/src/index.ts`

---

## Task 1: Archive old source + scaffold Turborepo

**Files:**
- Delete: `src/`, `server/`, `lib/`, `tests/`, `node_modules/`, `package-lock.json`, `Procfile`
- Replace: `package.json`
- Create: `pnpm-workspace.yaml`, `turbo.json`, `.env.example`

- [ ] **Step 1.1: Save old route references before deletion**

```bash
# Save old route list to a reference file so you can look up business logic during tRPC writing
git show HEAD:server/routes/properties.js > /tmp/old-properties.js 2>/dev/null || true
git show HEAD:server/routes/tenancies.js > /tmp/old-tenancies.js 2>/dev/null || true
git show HEAD:server/routes/compliance.js > /tmp/old-compliance.js 2>/dev/null || true
git show HEAD:server/routes/expenses.js > /tmp/old-expenses.js 2>/dev/null || true
git show HEAD:lib/subscription.ts > /tmp/old-subscription.ts 2>/dev/null || true
echo "Old routes saved to /tmp/"
```

- [ ] **Step 1.2: Remove old source directories**

```bash
rm -rf src/ server/ lib/ tests/ node_modules/ package-lock.json Procfile
```

- [ ] **Step 1.3: Write root package.json**

```json
{
  "name": "landlordlens",
  "version": "2.0.0",
  "private": true,
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "test:integration": "turbo run test:integration",
    "test:e2e": "turbo run test:e2e",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "db:generate": "turbo run db:generate --filter=@landlordlens/db",
    "db:migrate": "turbo run db:migrate --filter=@landlordlens/db",
    "db:introspect": "turbo run db:introspect --filter=@landlordlens/db",
    "db:studio": "turbo run db:studio --filter=@landlordlens/db",
    "email:dev": "turbo run dev --filter=@landlordlens/email"
  },
  "devDependencies": {
    "turbo": "^2.5.0"
  }
}
```

- [ ] **Step 1.4: Write pnpm-workspace.yaml**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 1.5: Write turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "test:integration": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "test:e2e": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    },
    "db:introspect": {
      "cache": false
    },
    "db:studio": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- [ ] **Step 1.6: Write .env.example**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_...
STRIPE_PRICE_PROFESSIONAL_YEARLY=price_...
STRIPE_PRICE_BUSINESS_MONTHLY=price_...
STRIPE_PRICE_BUSINESS_YEARLY=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_YEARLY=price_...

# Email
RESEND_API_KEY=re_...

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
```

- [ ] **Step 1.7: Create directory structure**

```bash
mkdir -p apps/email/src/templates
mkdir -p packages/{config,db/src/schema,auth/src/__tests__,billing/src/__tests__,api/src/{routers,middleware,__tests__},ui/src}
```

- [ ] **Step 1.8: Install pnpm and turbo, verify workspace**

```bash
npm install -g pnpm@9.15.0
pnpm --version
# Expected: 9.15.x
```

- [ ] **Step 1.9: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Turborepo monorepo structure"
```

---

## Task 2: packages/config

**Files:**
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig.base.json`
- Create: `packages/config/tsconfig.nextjs.json`
- Create: `packages/config/eslint.config.js`
- Create: `packages/config/prettier.config.js`

- [ ] **Step 2.1: Write packages/config/package.json**

```json
{
  "name": "@landlordlens/config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./tsconfig": "./tsconfig.base.json",
    "./tsconfig/nextjs": "./tsconfig.nextjs.json",
    "./eslint": "./eslint.config.js",
    "./prettier": "./prettier.config.js"
  }
}
```

- [ ] **Step 2.2: Write packages/config/tsconfig.base.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true
  },
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2.3: Write packages/config/tsconfig.nextjs.json**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  }
}
```

- [ ] **Step 2.4: Write packages/config/prettier.config.js**

```js
/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
}

module.exports = config
```

- [ ] **Step 2.5: Write packages/config/eslint.config.js**

```js
const { FlatCompat } = require('@eslint/eslintrc')
const compat = new FlatCompat({ baseDirectory: __dirname })

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
]

module.exports = config
```

- [ ] **Step 2.6: Commit**

```bash
git add packages/config/
git commit -m "feat: add packages/config with shared TypeScript and tooling config"
```

---

## Task 3: packages/db

**Files:** All `packages/db/` files listed in the file map.

> **Strategy:** Write the schema from scratch based on the existing Supabase project. This avoids `drizzle-kit introspect` producing verbose auto-generated names. After writing, run `drizzle-kit push` to sync (not migrate, since the tables already exist — introspect verifies column alignment).

- [ ] **Step 3.1: Write packages/db/package.json**

```json
{
  "name": "@landlordlens/db",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./schema": {
      "types": "./src/schema/index.ts",
      "default": "./src/schema/index.ts"
    }
  },
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:introspect": "drizzle-kit introspect",
    "db:studio": "drizzle-kit studio",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "drizzle-orm": "^0.38.0",
    "postgres": "^3.4.5"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "drizzle-kit": "^0.29.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 3.2: Write packages/db/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 3.3: Write packages/db/drizzle.config.ts**

```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
```

- [ ] **Step 3.4: Write packages/db/src/client.ts**

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('DATABASE_URL is not set')

const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })
export type DB = typeof db
```

- [ ] **Step 3.5: Write packages/db/src/schema/profiles.ts**

```typescript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export type SubscriptionTier = 'free' | 'professional' | 'business' | 'enterprise'

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  fullName: text('full_name'),
  tier: text('tier').$type<SubscriptionTier>().default('free').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
```

- [ ] **Step 3.6: Write packages/db/src/schema/properties.ts**

```typescript
import { pgTable, uuid, text, integer, numeric, timestamp, boolean } from 'drizzle-orm/pg-core'

export type PropertyType = 'house' | 'flat' | 'hmo' | 'commercial'
export type PropertyStatus = 'active' | 'vacant' | 'maintenance' | 'archived'

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  address: text('address').notNull(),
  postcode: text('postcode').notNull(),
  propertyType: text('property_type').$type<PropertyType>().default('house').notNull(),
  status: text('status').$type<PropertyStatus>().default('active').notNull(),
  bedrooms: integer('bedrooms').default(1).notNull(),
  bathrooms: integer('bathrooms').default(1),
  monthlyRent: numeric('monthly_rent', { precision: 10, scale: 2 }),
  isHmo: boolean('is_hmo').default(false).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
```

- [ ] **Step 3.7: Write packages/db/src/schema/tenancies.ts**

```typescript
import { pgTable, uuid, text, date, numeric, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type TenancyStatus = 'active' | 'ended' | 'notice_given'

export const tenancies = pgTable('tenancies', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id, { onDelete: 'cascade' }),
  tenantName: text('tenant_name').notNull(),
  tenantEmail: text('tenant_email'),
  tenantPhone: text('tenant_phone'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  monthlyRent: numeric('monthly_rent', { precision: 10, scale: 2 }).notNull(),
  depositAmount: numeric('deposit_amount', { precision: 10, scale: 2 }),
  depositScheme: text('deposit_scheme'),
  depositRef: text('deposit_ref'),
  status: text('status').$type<TenancyStatus>().default('active').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

export type Tenancy = typeof tenancies.$inferSelect
export type NewTenancy = typeof tenancies.$inferInsert
```

- [ ] **Step 3.8: Write packages/db/src/schema/compliance.ts**

```typescript
import { pgTable, uuid, text, date, timestamp, boolean } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type ComplianceType =
  | 'epc'
  | 'gas_safety'
  | 'eicr'
  | 'hmo_licence'
  | 'right_to_rent'
  | 'deposit_protection'
  | 'fire_safety'
  | 'legionella'
  | 'section_13'

export type ComplianceStatus = 'compliant' | 'expiring_soon' | 'expired' | 'not_required'

export const complianceItems = pgTable('compliance_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id, { onDelete: 'cascade' }),
  type: text('type').$type<ComplianceType>().notNull(),
  status: text('status').$type<ComplianceStatus>().default('compliant').notNull(),
  issuedDate: date('issued_date'),
  expiryDate: date('expiry_date'),
  certificateRef: text('certificate_ref'),
  notes: text('notes'),
  documentUrl: text('document_url'),
  isRequired: boolean('is_required').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type ComplianceItem = typeof complianceItems.$inferSelect
export type NewComplianceItem = typeof complianceItems.$inferInsert
```

- [ ] **Step 3.9: Write packages/db/src/schema/documents.ts**

```typescript
import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type DocumentCategory = 'compliance' | 'tenancy' | 'legal' | 'financial' | 'inspection' | 'other'

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  category: text('category').$type<DocumentCategory>().default('other').notNull(),
  storagePath: text('storage_path').notNull(),
  mimeType: text('mime_type'),
  sizeBytes: integer('size_bytes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
```

- [ ] **Step 3.10: Write packages/db/src/schema/inspections.ts**

```typescript
import { pgTable, uuid, text, timestamp, date } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type InspectionType = 'routine' | 'move_in' | 'move_out' | 'compliance' | 'maintenance'
export type InspectionStatus = 'scheduled' | 'completed' | 'cancelled'

export const inspections = pgTable('inspections', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id, { onDelete: 'cascade' }),
  type: text('type').$type<InspectionType>().default('routine').notNull(),
  status: text('status').$type<InspectionStatus>().default('scheduled').notNull(),
  scheduledDate: date('scheduled_date').notNull(),
  completedDate: date('completed_date'),
  conductedBy: text('conducted_by'),
  findings: text('findings'),
  actionRequired: text('action_required'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Inspection = typeof inspections.$inferSelect
export type NewInspection = typeof inspections.$inferInsert
```

- [ ] **Step 3.11: Write packages/db/src/schema/maintenance.ts**

```typescript
import { pgTable, uuid, text, timestamp, numeric } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'emergency'
export type MaintenanceStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export const maintenanceRequests = pgTable('maintenance_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority').$type<MaintenancePriority>().default('medium').notNull(),
  status: text('status').$type<MaintenanceStatus>().default('open').notNull(),
  reportedBy: text('reported_by'),
  assignedTo: text('assigned_to'),
  estimatedCost: numeric('estimated_cost', { precision: 10, scale: 2 }),
  actualCost: numeric('actual_cost', { precision: 10, scale: 2 }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type MaintenanceRequest = typeof maintenanceRequests.$inferSelect
export type NewMaintenanceRequest = typeof maintenanceRequests.$inferInsert
```

- [ ] **Step 3.12: Write packages/db/src/schema/expenses.ts**

```typescript
import { pgTable, uuid, text, date, numeric, timestamp, boolean } from 'drizzle-orm/pg-core'
import { properties } from './properties'

export type ExpenseCategory =
  | 'repairs'
  | 'insurance'
  | 'mortgage'
  | 'management_fees'
  | 'letting_fees'
  | 'professional_fees'
  | 'utilities'
  | 'council_tax'
  | 'ground_rent'
  | 'service_charge'
  | 'cleaning'
  | 'gardening'
  | 'other'

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull(),
  description: text('description').notNull(),
  category: text('category').$type<ExpenseCategory>().default('other').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: date('date').notNull(),
  receiptUrl: text('receipt_url'),
  isTaxDeductible: boolean('is_tax_deductible').default(true).notNull(),
  taxYear: text('tax_year'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert
```

- [ ] **Step 3.13: Write packages/db/src/schema/audit.ts**

```typescript
import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type'),
  resourceId: uuid('resource_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type AuditLogEntry = typeof auditLog.$inferSelect
export type NewAuditLogEntry = typeof auditLog.$inferInsert
```

- [ ] **Step 3.14: Write packages/db/src/schema/index.ts**

```typescript
export * from './profiles'
export * from './properties'
export * from './tenancies'
export * from './compliance'
export * from './documents'
export * from './inspections'
export * from './maintenance'
export * from './expenses'
export * from './audit'
```

- [ ] **Step 3.15: Write packages/db/src/index.ts**

```typescript
export { db } from './client'
export type { DB } from './client'
export * from './schema'
```

- [ ] **Step 3.16: Install packages/db dependencies**

```bash
cd packages/db && pnpm install
```

Expected: dependencies installed, no errors.

- [ ] **Step 3.17: Typecheck packages/db**

```bash
cd packages/db && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 3.18: Verify schema matches Supabase**

```bash
# Introspect the live DB and compare with your schema files
# Set DATABASE_URL from your .env file first
cd packages/db && DATABASE_URL="<your-db-url>" pnpm db:introspect
```

Open `migrations/0000_*.sql` and compare column names/types against `src/schema/*.ts`. Adjust any mismatches in the schema files. Delete the generated introspect migration file after review — it's reference only.

- [ ] **Step 3.19: Commit**

```bash
git add packages/db/
git commit -m "feat: add packages/db with Drizzle schema for all domains"
```

---

## Task 4: packages/auth

**Files:** All `packages/auth/` files.

- [ ] **Step 4.1: Write packages/auth/package.json**

```json
{
  "name": "@landlordlens/auth",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./server": {
      "types": "./src/server.ts",
      "default": "./src/server.ts"
    },
    "./browser": {
      "types": "./src/browser.ts",
      "default": "./src/browser.ts"
    },
    "./middleware": {
      "types": "./src/middleware.ts",
      "default": "./src/middleware.ts"
    }
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.49.0",
    "@supabase/ssr": "^0.5.0"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  },
  "peerDependencies": {
    "next": "^15.0.0"
  },
  "peerDependenciesMeta": {
    "next": { "optional": true }
  }
}
```

- [ ] **Step 4.2: Write packages/auth/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "lib": ["ES2022", "dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 4.3: Write packages/auth/src/server.ts**

```typescript
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerClient() {
  const cookieStore = await cookies()
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component — cookies will be set by middleware
          }
        },
      },
    },
  )
}

export function createServiceRoleClient() {
  const { createClient } = require('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
```

- [ ] **Step 4.4: Write packages/auth/src/browser.ts**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
```

- [ ] **Step 4.5: Write packages/auth/src/roles.ts**

```typescript
export type UserRole = 'landlord' | 'admin' | 'tenant'

export function isAdmin(role: UserRole | null | undefined): boolean {
  return role === 'admin'
}

export function isLandlord(role: UserRole | null | undefined): boolean {
  return role === 'landlord' || role === 'admin'
}
```

- [ ] **Step 4.6: Write packages/auth/src/session.ts**

```typescript
import { createServerClient } from './server'
import type { User } from '@supabase/supabase-js'

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return user
}
```

- [ ] **Step 4.7: Write packages/auth/src/middleware.ts**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/dashboard']
const AUTH_PATHS = ['/sign-in', '/sign-up']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p))

  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

- [ ] **Step 4.8: Write packages/auth/src/index.ts**

```typescript
export { createServerClient, createServiceRoleClient } from './server'
export { createClient as createBrowserClient } from './browser'
export { getCurrentUser, requireUser } from './session'
export { updateSession } from './middleware'
export { isAdmin, isLandlord } from './roles'
export type { UserRole } from './roles'
```

- [ ] **Step 4.9: Write packages/auth/src/__tests__/session.test.ts**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { isAdmin, isLandlord } from '../roles'

describe('roles', () => {
  describe('isAdmin', () => {
    it('returns true for admin role', () => {
      expect(isAdmin('admin')).toBe(true)
    })

    it('returns false for landlord role', () => {
      expect(isAdmin('landlord')).toBe(false)
    })

    it('returns false for null', () => {
      expect(isAdmin(null)).toBe(false)
    })
  })

  describe('isLandlord', () => {
    it('returns true for landlord role', () => {
      expect(isLandlord('landlord')).toBe(true)
    })

    it('returns true for admin (admin can do landlord things)', () => {
      expect(isLandlord('admin')).toBe(true)
    })

    it('returns false for tenant', () => {
      expect(isLandlord('tenant')).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isLandlord(undefined)).toBe(false)
    })
  })
})
```

- [ ] **Step 4.10: Write packages/auth/vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 4.11: Add vitest to packages/auth/package.json devDependencies (already included in Step 4.1). Install and run tests.**

```bash
cd packages/auth && pnpm install && pnpm test
```

Expected output:
```
✓ src/__tests__/session.test.ts (4)
  ✓ roles > isAdmin > returns true for admin role
  ✓ roles > isAdmin > returns false for landlord role
  ✓ roles > isAdmin > returns false for null
  ✓ roles > isLandlord > returns true for landlord role
  ...
Test Files  1 passed (1)
Tests       4 passed (4)
```

- [ ] **Step 4.12: Commit**

```bash
git add packages/auth/
git commit -m "feat: add packages/auth with Supabase SSR helpers and middleware"
```

---

## Task 5: packages/billing

**Files:** All `packages/billing/` files.

- [ ] **Step 5.1: Write packages/billing/package.json**

```json
{
  "name": "@landlordlens/billing",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./tiers": {
      "types": "./src/tiers.ts",
      "default": "./src/tiers.ts"
    },
    "./guards": {
      "types": "./src/guards.ts",
      "default": "./src/guards.ts"
    }
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "stripe": "^17.0.0",
    "@landlordlens/db": "workspace:*"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 5.2: Write packages/billing/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 5.3: Write packages/billing/src/tiers.ts**

```typescript
export type SubscriptionTier = 'free' | 'professional' | 'business' | 'enterprise'

export interface TierConfig {
  name: string
  properties: number
  monthlyPriceGbp: number
  yearlyPriceGbp: number
  monthlyPriceId: string | null
  yearlyPriceId: string | null
  features: string[]
}

export const TIERS: Record<SubscriptionTier, TierConfig> = {
  free: {
    name: 'Free',
    properties: 2,
    monthlyPriceGbp: 0,
    yearlyPriceGbp: 0,
    monthlyPriceId: null,
    yearlyPriceId: null,
    features: ['2 properties', 'Compliance tracking', 'Document storage'],
  },
  professional: {
    name: 'Professional',
    properties: 10,
    monthlyPriceGbp: 12,
    yearlyPriceGbp: 120,
    monthlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY ?? '',
    features: ['10 properties', 'Everything in Free', 'Expense tracking', 'Analytics'],
  },
  business: {
    name: 'Business',
    properties: 50,
    monthlyPriceGbp: 29,
    yearlyPriceGbp: 290,
    monthlyPriceId: process.env.STRIPE_PRICE_BUSINESS_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_BUSINESS_YEARLY ?? '',
    features: ['50 properties', 'Everything in Professional', 'Section 8 wizard', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    properties: Infinity,
    monthlyPriceGbp: 99,
    yearlyPriceGbp: 990,
    monthlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? '',
    yearlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY ?? '',
    features: ['Unlimited properties', 'Everything in Business', 'Dedicated support', 'Custom integrations'],
  },
}

export function getTierConfig(tier: SubscriptionTier): TierConfig {
  return TIERS[tier]
}

export function getPropertyLimit(tier: SubscriptionTier): number {
  return TIERS[tier].properties
}
```

- [ ] **Step 5.4: Write packages/billing/vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 5.5: Write failing tests for tiers**

```typescript
// packages/billing/src/__tests__/tiers.test.ts
import { describe, it, expect } from 'vitest'
import { getPropertyLimit, getTierConfig, TIERS } from '../tiers'

describe('TIERS', () => {
  it('free tier has 2 property limit', () => {
    expect(getPropertyLimit('free')).toBe(2)
  })

  it('professional tier has 10 property limit', () => {
    expect(getPropertyLimit('professional')).toBe(10)
  })

  it('business tier has 50 property limit', () => {
    expect(getPropertyLimit('business')).toBe(50)
  })

  it('enterprise tier has unlimited properties', () => {
    expect(getPropertyLimit('enterprise')).toBe(Infinity)
  })

  it('free tier has no price IDs', () => {
    const config = getTierConfig('free')
    expect(config.monthlyPriceId).toBeNull()
    expect(config.yearlyPriceId).toBeNull()
  })

  it('all paid tiers have correct monthly prices in GBP', () => {
    expect(TIERS.professional.monthlyPriceGbp).toBe(12)
    expect(TIERS.business.monthlyPriceGbp).toBe(29)
    expect(TIERS.enterprise.monthlyPriceGbp).toBe(99)
  })

  it('all paid tiers have correct yearly prices in GBP', () => {
    expect(TIERS.professional.yearlyPriceGbp).toBe(120)
    expect(TIERS.business.yearlyPriceGbp).toBe(290)
    expect(TIERS.enterprise.yearlyPriceGbp).toBe(990)
  })
})
```

- [ ] **Step 5.6: Run tests (expect pass — tiers are pure data)**

```bash
cd packages/billing && pnpm install && pnpm test
```

Expected: `Tests 7 passed (7)`

- [ ] **Step 5.7: Write packages/billing/src/client.ts**

```typescript
import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    stripeClient = new Stripe(key, { apiVersion: '2025-04-30.basil' })
  }
  return stripeClient
}
```

- [ ] **Step 5.8: Write packages/billing/src/guards.ts**

```typescript
import { eq, count, isNull, and } from 'drizzle-orm'
import { properties } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'
import { getPropertyLimit } from './tiers'
import type { SubscriptionTier } from './tiers'

export class TierLimitError extends Error {
  constructor(tier: SubscriptionTier, limit: number) {
    super(`Your ${tier} plan allows up to ${limit} properties. Upgrade to add more.`)
    this.name = 'TierLimitError'
  }
}

export async function canAddProperty(
  userId: string,
  tier: SubscriptionTier,
  db: DB,
): Promise<void> {
  const limit = getPropertyLimit(tier)
  if (limit === Infinity) return

  const [result] = await db
    .select({ count: count() })
    .from(properties)
    .where(and(eq(properties.userId, userId), isNull(properties.deletedAt)))

  const current = result?.count ?? 0
  if (current >= limit) {
    throw new TierLimitError(tier, limit)
  }
}
```

- [ ] **Step 5.9: Write failing guards tests**

```typescript
// packages/billing/src/__tests__/guards.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { canAddProperty, TierLimitError } from '../guards'

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn(),
}

describe('canAddProperty', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allows adding when under the limit', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 1 }])
    await expect(
      canAddProperty('user-1', 'free', mockDb as any),
    ).resolves.toBeUndefined()
  })

  it('throws TierLimitError when at the free tier limit (2)', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 2 }])
    await expect(
      canAddProperty('user-1', 'free', mockDb as any),
    ).rejects.toBeInstanceOf(TierLimitError)
  })

  it('throws TierLimitError when at the professional limit (10)', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 10 }])
    await expect(
      canAddProperty('user-1', 'professional', mockDb as any),
    ).rejects.toBeInstanceOf(TierLimitError)
  })

  it('never throws for enterprise (unlimited)', async () => {
    // DB should not even be queried for enterprise
    await expect(
      canAddProperty('user-1', 'enterprise', mockDb as any),
    ).resolves.toBeUndefined()
    expect(mockDb.select).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 5.10: Run guards tests**

```bash
cd packages/billing && pnpm test
```

Expected: `Tests 11 passed (11)` (7 tier + 4 guard tests)

- [ ] **Step 5.11: Write packages/billing/src/checkout.ts**

```typescript
import { getStripeClient } from './client'
import type { SubscriptionTier } from './tiers'
import { TIERS } from './tiers'

interface CheckoutParams {
  customerId: string
  tier: SubscriptionTier
  interval: 'month' | 'year'
  successUrl: string
  cancelUrl: string
}

export async function createCheckoutSession(params: CheckoutParams) {
  const stripe = getStripeClient()
  const tierConfig = TIERS[params.tier]
  const priceId = params.interval === 'month' ? tierConfig.monthlyPriceId : tierConfig.yearlyPriceId

  if (!priceId) throw new Error(`No price ID for ${params.tier} ${params.interval}`)

  return stripe.checkout.sessions.create({
    customer: params.customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    subscription_data: { metadata: { tier: params.tier } },
  })
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripeClient()
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export async function createStripeCustomer(email: string, userId: string) {
  const stripe = getStripeClient()
  return stripe.customers.create({
    email,
    metadata: { userId },
  })
}
```

- [ ] **Step 5.12: Write packages/billing/src/webhooks.ts**

```typescript
import type Stripe from 'stripe'
import { getStripeClient } from './client'
import { eq } from 'drizzle-orm'
import { profiles } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'
import type { SubscriptionTier } from './tiers'

export function constructWebhookEvent(payload: string, signature: string): Stripe.Event {
  const stripe = getStripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  return stripe.webhooks.constructEvent(payload, signature, secret)
}

export async function handleWebhookEvent(event: Stripe.Event, db: DB): Promise<void> {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const tier = (subscription.metadata['tier'] ?? 'free') as SubscriptionTier
      const customerId = subscription.customer as string
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000)

      await db
        .update(profiles)
        .set({
          tier,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id ?? null,
          stripeCurrentPeriodEnd: currentPeriodEnd,
          updatedAt: new Date(),
        })
        .where(eq(profiles.stripeCustomerId, customerId))
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await db
        .update(profiles)
        .set({
          tier: 'free',
          stripeSubscriptionId: null,
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
          updatedAt: new Date(),
        })
        .where(eq(profiles.stripeCustomerId, customerId))
      break
    }

    default:
      // Unhandled event type — log and ignore
      break
  }
}
```

- [ ] **Step 5.13: Write packages/billing/src/index.ts**

```typescript
export { getStripeClient } from './client'
export { TIERS, getTierConfig, getPropertyLimit } from './tiers'
export type { SubscriptionTier, TierConfig } from './tiers'
export { createCheckoutSession, createCustomerPortalSession, createStripeCustomer } from './checkout'
export { constructWebhookEvent, handleWebhookEvent } from './webhooks'
export { canAddProperty, TierLimitError } from './guards'
```

- [ ] **Step 5.14: Final typecheck + commit**

```bash
cd packages/billing && pnpm typecheck && pnpm test
git add packages/billing/
git commit -m "feat: add packages/billing with Stripe client, tier config, and subscription guards"
```

---

## Task 6: packages/api

**Files:** All `packages/api/` files.

> **Reference for procedure logic:** `git show HEAD~4:server/routes/properties.js` etc. (adjust commit offset based on your history).

- [ ] **Step 6.1: Write packages/api/package.json**

```json
{
  "name": "@landlordlens/api",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./trpc": {
      "types": "./src/trpc.ts",
      "default": "./src/trpc.ts"
    }
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@trpc/server": "^11.0.0",
    "@landlordlens/db": "workspace:*",
    "@landlordlens/auth": "workspace:*",
    "@landlordlens/billing": "workspace:*",
    "drizzle-orm": "^0.38.0",
    "superjson": "^2.2.1",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 6.2: Write packages/api/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 6.3: Write packages/api/src/trpc.ts**

```typescript
import { initTRPC, TRPCError } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@landlordlens/db/schema'
import type { DB } from '@landlordlens/db'

interface Context {
  db: DB
  user: User | null
  profile: Profile | null
  headers: Headers
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  return { db, user, profile, headers: opts.req.headers }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.profile) throw new TRPCError({ code: 'UNAUTHORIZED' })
  // Admin check: stored in profile metadata or a separate admin table
  // For now: admin emails are set via Supabase user metadata
  const isAdmin = ctx.user.user_metadata?.['role'] === 'admin'
  if (!isAdmin) throw new TRPCError({ code: 'FORBIDDEN' })
  return next({ ctx: { ...ctx, user: ctx.user, profile: ctx.profile } })
})

export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
```

- [ ] **Step 6.4: Write packages/api/src/routers/properties.ts**

```typescript
import { z } from 'zod'
import { eq, and, isNull, desc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties } from '@landlordlens/db/schema'
import { canAddProperty, TierLimitError } from '@landlordlens/billing'

const createPropertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  propertyType: z.enum(['house', 'flat', 'hmo', 'commercial']).default('house'),
  bedrooms: z.number().int().min(0).default(1),
  bathrooms: z.number().int().min(0).optional(),
  monthlyRent: z.string().optional(),
  isHmo: z.boolean().default(false),
  notes: z.string().optional(),
})

const updatePropertySchema = createPropertySchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['active', 'vacant', 'maintenance', 'archived']).optional(),
})

export const propertiesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(properties)
      .where(and(eq(properties.userId, ctx.user.id), isNull(properties.deletedAt)))
      .orderBy(desc(properties.createdAt))
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [property] = await ctx.db
        .select()
        .from(properties)
        .where(
          and(
            eq(properties.id, input.id),
            eq(properties.userId, ctx.user.id),
            isNull(properties.deletedAt),
          ),
        )
      if (!property) throw new TRPCError({ code: 'NOT_FOUND' })
      return property
    }),

  create: protectedProcedure
    .input(createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await canAddProperty(ctx.user.id, ctx.profile.tier, ctx.db)
      } catch (e) {
        if (e instanceof TierLimitError) {
          throw new TRPCError({ code: 'FORBIDDEN', message: e.message })
        }
        throw e
      }
      const [property] = await ctx.db
        .insert(properties)
        .values({ userId: ctx.user.id, ...input })
        .returning()
      return property!
    }),

  update: protectedProcedure
    .input(updatePropertySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [updated] = await ctx.db
        .update(properties)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(properties.id, id), eq(properties.userId, ctx.user.id)))
        .returning()
      if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
      return updated
    }),

  softDelete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .update(properties)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(and(eq(properties.id, input.id), eq(properties.userId, ctx.user.id)))
        .returning()
      if (!deleted) throw new TRPCError({ code: 'NOT_FOUND' })
    }),
})
```

- [ ] **Step 6.5: Write remaining routers (tenancies, compliance, expenses, documents, inspections, maintenance, analytics, services, admin)**

Each router follows the exact same pattern as `properties.ts`. For each:
- Import the relevant schema table from `@landlordlens/db/schema`
- Define `createXSchema` and `updateXSchema` with Zod
- Implement: `list`, `getById`, `create`, `update` (and `softDelete` where appropriate)
- Use `and(eq(table.propertyId, input.propertyId), ...)` to scope by property

**tenancies.ts:** Tables: `tenancies`. Reference: `/tmp/old-tenancies.js`
**compliance.ts:** Tables: `complianceItems`. Reference: `/tmp/old-compliance.js`. Add `getByProperty` procedure that returns all compliance items grouped by type.
**expenses.ts:** Tables: `expenses`. Reference: `/tmp/old-expenses.js`. Add `getSummaryByCategory` that aggregates total by category for a tax year.
**documents.ts:** Tables: `documents`. No softDelete — hard delete (files should be deleted from Supabase Storage separately).
**inspections.ts:** Tables: `inspections`.
**maintenance.ts:** Tables: `maintenanceRequests`.
**analytics.ts:** No table writes — read-only queries across multiple tables. Procedures: `portfolioStats` (total properties, total monthly rent, compliance percentage), `expensesByCategory` (totals grouped by category and tax year).
**services.ts:** Stub router for services marketplace (returns `[]` for now — marketplace is Phase 2 content).
**admin.ts:** Uses `adminProcedure`. `listUsers` reads from `profiles`. `getAuditLog` reads from `auditLog`.

- [ ] **Step 6.6: Write packages/api/src/root.ts**

```typescript
import { createTRPCRouter } from './trpc'
import { propertiesRouter } from './routers/properties'
import { tenanciesRouter } from './routers/tenancies'
import { complianceRouter } from './routers/compliance'
import { expensesRouter } from './routers/expenses'
import { documentsRouter } from './routers/documents'
import { inspectionsRouter } from './routers/inspections'
import { maintenanceRouter } from './routers/maintenance'
import { analyticsRouter } from './routers/analytics'
import { adminRouter } from './routers/admin'
import { servicesRouter } from './routers/services'

export const appRouter = createTRPCRouter({
  properties: propertiesRouter,
  tenancies: tenanciesRouter,
  compliance: complianceRouter,
  expenses: expensesRouter,
  documents: documentsRouter,
  inspections: inspectionsRouter,
  maintenance: maintenanceRouter,
  analytics: analyticsRouter,
  admin: adminRouter,
  services: servicesRouter,
})

export type AppRouter = typeof appRouter
```

- [ ] **Step 6.7: Write packages/api/src/index.ts**

```typescript
export { appRouter } from './root'
export type { AppRouter } from './root'
export { createTRPCContext, createCallerFactory } from './trpc'
export { createTRPCRouter, protectedProcedure, adminProcedure, publicProcedure } from './trpc'
```

- [ ] **Step 6.8: Write failing unit test for properties router**

```typescript
// packages/api/src/__tests__/properties.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TRPCError } from '@trpc/server'

// Mock dependencies
vi.mock('@landlordlens/billing', () => ({
  canAddProperty: vi.fn(),
}))

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(),
}))

import { canAddProperty } from '@landlordlens/billing'
import { createCallerFactory } from '../trpc'
import { appRouter } from '../root'

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn(),
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
}

const mockUser = { id: 'user-uuid-1', email: 'test@example.com', user_metadata: {} }
const mockProfile = { id: 'user-uuid-1', tier: 'free' as const, email: 'test@example.com' }

const createCaller = createCallerFactory(appRouter)

function createAuthedCaller() {
  return createCaller({
    db: mockDb as any,
    user: mockUser as any,
    profile: mockProfile as any,
    headers: new Headers(),
  })
}

describe('properties router', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('returns empty array when user has no properties', async () => {
      mockDb.orderBy.mockResolvedValueOnce([])
      const caller = createAuthedCaller()
      const result = await caller.properties.list()
      expect(result).toEqual([])
    })

    it('returns properties for the authenticated user', async () => {
      const mockProperty = { id: 'prop-1', userId: mockUser.id, address: '1 Test St', postcode: 'SW1A 1AA' }
      mockDb.orderBy.mockResolvedValueOnce([mockProperty])
      const caller = createAuthedCaller()
      const result = await caller.properties.list()
      expect(result).toEqual([mockProperty])
    })
  })

  describe('create', () => {
    it('calls canAddProperty before inserting', async () => {
      vi.mocked(canAddProperty).mockResolvedValueOnce(undefined)
      mockDb.returning.mockResolvedValueOnce([{ id: 'new-prop', userId: mockUser.id }])
      const caller = createAuthedCaller()
      await caller.properties.create({
        address: '1 Test St',
        postcode: 'SW1A 1AA',
        propertyType: 'house',
        bedrooms: 3,
        isHmo: false,
      })
      expect(canAddProperty).toHaveBeenCalledWith(mockUser.id, 'free', mockDb)
    })

    it('throws FORBIDDEN TRPCError when tier limit reached', async () => {
      const { TierLimitError } = await import('@landlordlens/billing')
      vi.mocked(canAddProperty).mockRejectedValueOnce(new TierLimitError('free', 2))
      const caller = createAuthedCaller()
      await expect(
        caller.properties.create({
          address: '1 Test St',
          postcode: 'SW1A 1AA',
          propertyType: 'house',
          bedrooms: 3,
          isHmo: false,
        }),
      ).rejects.toMatchObject({ code: 'FORBIDDEN' })
    })
  })
})
```

- [ ] **Step 6.9: Write packages/api/vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 6.10: Install and run tests**

```bash
cd packages/api && pnpm install && pnpm test
```

Expected: `Tests 4 passed (4)`

- [ ] **Step 6.11: Typecheck**

```bash
cd packages/api && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 6.12: Commit**

```bash
git add packages/api/
git commit -m "feat: add packages/api with tRPC router, all domain procedures, and unit tests"
```

---

## Task 7: packages/ui

**Files:** All `packages/ui/` files. shadcn components added via CLI.

- [ ] **Step 7.1: Write packages/ui/package.json**

```json
{
  "name": "@landlordlens/ui",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./cn": {
      "types": "./src/cn.ts",
      "default": "./src/cn.ts"
    },
    "./globals.css": "./src/globals.css"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.454.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-separator": "^1.1.0"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

- [ ] **Step 7.2: Write packages/ui/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "lib": ["ES2022", "dom"],
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 7.3: Write packages/ui/src/cn.ts**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 7.4: Write packages/ui/src/globals.css**

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 238 84% 67%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 238 84% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 238 84% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 238 84% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 7.5: Write packages/ui/src/index.ts (start with cn + lucide re-export; shadcn components added below)**

```typescript
export { cn } from './cn'
export { Button } from './components/button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/card'
export { Input } from './components/input'
export { Label } from './components/label'
export { Badge } from './components/badge'
export { Separator } from './components/separator'
export { Skeleton } from './components/skeleton'
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/dialog'
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/dropdown-menu'
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/tabs'
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/select'
export { useToast, Toaster } from './components/toast'
```

- [ ] **Step 7.6: Install packages/ui deps and add shadcn components**

```bash
cd packages/ui && pnpm install
# Initialise shadcn (choose: TypeScript, no App Router config — this is a package, not an app)
pnpm dlx shadcn@latest init --defaults
# Add core components
pnpm dlx shadcn@latest add button card input label badge separator skeleton dialog dropdown-menu tabs select toast tooltip
```

After adding, confirm components appear in `packages/ui/src/components/`. Update `src/index.ts` if shadcn puts them in a different path.

- [ ] **Step 7.7: Typecheck**

```bash
cd packages/ui && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 7.8: Commit**

```bash
git add packages/ui/
git commit -m "feat: add packages/ui with shadcn/ui components and brand tokens"
```

---

## Task 8: apps/email

**Files:** All `apps/email/` files.

- [ ] **Step 8.1: Write apps/email/package.json**

```json
{
  "name": "@landlordlens/email",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  },
  "scripts": {
    "dev": "email dev --dir src/templates --port 3001",
    "build": "email build",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@react-email/components": "^0.0.30",
    "react-email": "^3.0.0",
    "resend": "^4.0.0"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "react": "^19.0.0",
    "@types/react": "^19.0.0"
  }
}
```

- [ ] **Step 8.2: Write apps/email/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig/nextjs",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 8.3: Write apps/email/src/resend.ts**

```typescript
import { Resend } from 'resend'

let client: Resend | null = null

export function getResendClient(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    client = new Resend(key)
  }
  return client
}

const FROM_ADDRESS = 'LandLordLens <noreply@landlordlens.co.uk>'

export async function sendVerificationEmail(to: string, verificationUrl: string) {
  const { VerificationEmail } = await import('./templates/verification')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Verify your email — LandLordLens',
    react: VerificationEmail({ verificationUrl }),
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  const { WelcomeEmail } = await import('./templates/welcome')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Welcome to LandLordLens',
    react: WelcomeEmail({ name }),
  })
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const { PasswordResetEmail } = await import('./templates/password-reset')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Reset your LandLordLens password',
    react: PasswordResetEmail({ resetUrl }),
  })
}

export async function sendComplianceAlertEmail(
  to: string,
  propertyAddress: string,
  itemType: string,
  expiryDate: string,
  daysUntilExpiry: number,
) {
  const { ComplianceAlertEmail } = await import('./templates/compliance-alert')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `Action required: ${itemType} expiring at ${propertyAddress}`,
    react: ComplianceAlertEmail({ propertyAddress, itemType, expiryDate, daysUntilExpiry }),
  })
}

export async function sendTenantInviteEmail(
  to: string,
  landlordName: string,
  propertyAddress: string,
  inviteUrl: string,
) {
  const { TenantInviteEmail } = await import('./templates/tenant-invite')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `${landlordName} has invited you to view your tenancy`,
    react: TenantInviteEmail({ landlordName, propertyAddress, inviteUrl }),
  })
}
```

- [ ] **Step 8.4: Write apps/email/src/templates/verification.tsx**

```tsx
import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  verificationUrl: string
}

export function VerificationEmail({ verificationUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Verify your LandLordLens account</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Verify your email</Text>
            <Text className="text-gray-600">
              Click the button below to verify your email address and activate your LandLordLens
              account.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={verificationUrl}
              >
                Verify email address
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 24 hours. If you didn't create an account, you can safely ignore
              this email.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

- [ ] **Step 8.5: Write apps/email/src/templates/welcome.tsx**

```tsx
import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind, Heading,
} from '@react-email/components'

interface Props {
  name: string
}

export function WelcomeEmail({ name }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to LandLordLens</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Heading className="text-2xl font-bold text-gray-900">Welcome, {name}</Heading>
            <Text className="text-gray-600">
              Your account is verified. You can now add your properties, track compliance deadlines,
              and manage your tenancies — all in one place.
            </Text>
            <Text className="text-gray-600">
              Start by adding your first property in the dashboard.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

- [ ] **Step 8.6: Write apps/email/src/templates/password-reset.tsx**

```tsx
import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  resetUrl: string
}

export function PasswordResetEmail({ resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your LandLordLens password</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Reset your password</Text>
            <Text className="text-gray-600">
              We received a request to reset your password. Click below to choose a new one.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={resetUrl}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 1 hour. If you didn't request a reset, you can safely ignore
              this email — your password won't change.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

- [ ] **Step 8.7: Write apps/email/src/templates/compliance-alert.tsx**

```tsx
import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind, Heading, Section,
} from '@react-email/components'

interface Props {
  propertyAddress: string
  itemType: string
  expiryDate: string
  daysUntilExpiry: number
}

export function ComplianceAlertEmail({
  propertyAddress,
  itemType,
  expiryDate,
  daysUntilExpiry,
}: Props) {
  const isOverdue = daysUntilExpiry < 0
  const urgency = isOverdue ? 'OVERDUE' : daysUntilExpiry <= 14 ? 'URGENT' : 'REMINDER'
  const colour = isOverdue ? '#dc2626' : daysUntilExpiry <= 14 ? '#d97706' : '#4f46e5'

  return (
    <Html>
      <Head />
      <Preview>
        {urgency}: {itemType} at {propertyAddress}
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Section
              className="mb-6 rounded p-4"
              style={{ backgroundColor: `${colour}15`, borderLeft: `4px solid ${colour}` }}
            >
              <Text className="m-0 font-bold" style={{ color: colour }}>
                {urgency}: {itemType}
              </Text>
            </Section>
            <Heading className="text-xl font-bold text-gray-900">{propertyAddress}</Heading>
            <Text className="text-gray-600">
              {isOverdue
                ? `Your ${itemType} expired on ${expiryDate} (${Math.abs(daysUntilExpiry)} days ago).`
                : `Your ${itemType} expires on ${expiryDate} (in ${daysUntilExpiry} days).`}
            </Text>
            <Text className="text-gray-600">
              Log in to LandLordLens to update this compliance item and upload the renewed
              certificate.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

- [ ] **Step 8.8: Write apps/email/src/templates/tenant-invite.tsx**

```tsx
import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  landlordName: string
  propertyAddress: string
  inviteUrl: string
}

export function TenantInviteEmail({ landlordName, propertyAddress, inviteUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        {landlordName} has invited you to view your tenancy at {propertyAddress}
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">You've been invited</Text>
            <Text className="text-gray-600">
              <strong>{landlordName}</strong> has invited you to view your tenancy details for{' '}
              <strong>{propertyAddress}</strong> on LandLordLens.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={inviteUrl}
              >
                View tenancy details
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 7 days. If you weren't expecting this invite, you can safely
              ignore this email.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

- [ ] **Step 8.9: Write apps/email/src/index.ts**

```typescript
export {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendComplianceAlertEmail,
  sendTenantInviteEmail,
} from './resend'
```

- [ ] **Step 8.10: Install and typecheck**

```bash
cd apps/email && pnpm install && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 8.11: Preview email templates (optional — requires browser)**

```bash
cd apps/email && pnpm dev
# Open http://localhost:3001 to preview all templates
```

- [ ] **Step 8.12: Commit**

```bash
git add apps/email/
git commit -m "feat: add apps/email with React Email templates and Resend sender"
```

---

## Task 9: Verify full workspace builds and tests pass

- [ ] **Step 9.1: Install all workspace dependencies from root**

```bash
pnpm install
```

Expected: All packages linked, no peer dependency errors.

- [ ] **Step 9.2: Run typechecks across all packages**

```bash
pnpm typecheck
```

Expected: `Found 0 errors.` across all packages. Fix any errors before proceeding.

- [ ] **Step 9.3: Run all unit tests**

```bash
pnpm test
```

Expected:
```
@landlordlens/auth > test passed
@landlordlens/billing > test passed
@landlordlens/api > test passed

Test Suites: 3 passed, 3 total
Tests: 15+ passed
```

- [ ] **Step 9.4: Final commit**

```bash
git add -A
git commit -m "chore: verify all packages build, typecheck, and tests pass — Phase 1 complete"
```

---

## Phase 1 Complete

**What's built:**
- Turborepo monorepo with pnpm workspaces
- `packages/config` — shared TypeScript, ESLint, Prettier config
- `packages/db` — Drizzle schema for all 9 domains + DB client
- `packages/auth` — Supabase SSR auth helpers + Next.js middleware
- `packages/billing` — Stripe client, tier config, guards, webhook handler
- `packages/api` — tRPC router with all 10 domain routers
- `packages/ui` — shadcn/ui component library
- `apps/email` — 5 React Email templates + Resend sender

**Next:** Phase 2 plan covers `apps/web` — the Next.js application consuming all packages above.
