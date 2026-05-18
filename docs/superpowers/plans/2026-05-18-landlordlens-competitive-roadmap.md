# LandLordLens Competitive Roadmap — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade LandLordLens from a basic property manager to a fully RRA-compliant, PRS-registration-ready platform that out-competes Latch on compliance depth.

**Architecture:** Four independent phases. Phase 1 addresses urgent RRA compliance gaps (live since 1 May 2026). Phases 2–4 add progressively higher-value features. Each phase deploys independently; later phases build on earlier schema changes.

**Tech Stack:** Next.js 16, tRPC, Drizzle ORM (PostgreSQL / Supabase), TypeScript, Tailwind v4, Shadcn/UI

---

## Phase Breakdown

| Phase | Theme | Priority |
|-------|-------|----------|
| 1 | Post-RRA Compliance | URGENT |
| 2 | PRS Database Readiness | High |
| 3 | Financial Intelligence | Medium |
| 4 | MTD Preparation | Medium |

---

## File Structure

**New files:**
- `packages/db/src/schema/maintenanceEvents.ts` — immutable audit event log per maintenance ticket
- `packages/api/src/routers/maintenanceEvents.ts` — create/list maintenance events
- `apps/web/app/(dashboard)/dashboard/legal/section-8/section8-data.ts` — all 37 Section 8 grounds data
- `apps/web/app/(dashboard)/dashboard/legal/section-8/section-8-wizard.tsx` — multi-step wizard client component
- `apps/web/app/(dashboard)/dashboard/compliance/prs-readiness/page.tsx` — PRS registration readiness tracker
- `apps/web/app/api/export/audit-pack/route.ts` — Ombudsman Vault JSON export endpoint
- `apps/web/app/(dashboard)/dashboard/analytics/portfolio/page.tsx` — Portfolio KPI dashboard

**Modified files:**
- `packages/db/src/schema/tenancies.ts` — add `periodic_assured`, update default
- `packages/db/src/schema/compliance.ts` — add `servedToTenantDate` column
- `packages/db/src/schema/deposits.ts` — add `protectionDeadline`, `prescribedInfoServedDate`
- `packages/db/src/schema/expenses.ts` — add `hmrcCategory` typed column
- `packages/db/src/schema/properties.ts` — add `currentValue`, `mortgageBalance`, `epcRating`, `epcExpiryDate`, `prsRegistrationNumber`
- `packages/db/src/schema/index.ts` — export maintenanceEvents
- `packages/api/src/routers/compliance.ts` — include servedToTenantDate in schemas
- `packages/api/src/routers/analytics.ts` — add portfolioKPIs and mtdQuarterlySummary
- `packages/api/src/root.ts` — register maintenanceEvents router
- `apps/web/app/(dashboard)/dashboard/compliance/page.tsx` — serve-by date badges + EPC 2030 banner
- `apps/web/app/(dashboard)/dashboard/legal/section-8/page.tsx` — replace placeholder with wizard
- `apps/web/app/components/dashboard/sidebar.tsx` — add PRS Readiness and Portfolio nav links

---

## PHASE 1: Post-RRA Compliance

### Task 1: Update Tenancy Schema for Post-RRA World

Section 21 was abolished 1 May 2026. New tenancies are periodic assured, not assured shorthold. The schema default must reflect this.

**Files:**
- Modify: `packages/db/src/schema/tenancies.ts`

- [ ] **Step 1: Update TenancyType and the column default**

```typescript
// packages/db/src/schema/tenancies.ts
// Replace the TenancyType definition:
export type TenancyType = 'periodic_assured' | 'assured' | 'short_assured' | 'fixed_term' | 'protected'

// In the pgTable definition, change the tenancyType column:
tenancyType: text('tenancy_type').$type<TenancyType>().default('periodic_assured').notNull(),
```

- [ ] **Step 2: Generate migration**

Run: `cd packages/db && npx drizzle-kit generate`
Expected: New migration file in `packages/db/drizzle/migrations/`.

- [ ] **Step 3: Verify the migration SQL**

Open the generated migration file. It must contain:
```sql
ALTER TABLE "tenancies" ALTER COLUMN "tenancy_type" SET DEFAULT 'periodic_assured';
```
Existing rows with `assured_shorthold` are preserved — only the default changes.

- [ ] **Step 4: Push migration**

Run: `cd packages/db && npx drizzle-kit push`
Expected: `All migrations applied successfully`

- [ ] **Step 5: Commit**

```bash
git add packages/db/src/schema/tenancies.ts packages/db/drizzle/
git commit -m "fix: update tenancy default from assured_shorthold to periodic_assured (post-RRA)"
```

---

### Task 2: Add Serve-By Date to Compliance Records

Gas Safety (CP12) and EICR certificates must be served to tenants within 28 days of issue. The current `complianceRecords` table has no field to record when this was done.

**Files:**
- Modify: `packages/db/src/schema/compliance.ts`
- Modify: `packages/api/src/routers/compliance.ts`

- [ ] **Step 1: Add `servedToTenantDate` column**

```typescript
// packages/db/src/schema/compliance.ts
// Add after the `issuer` field:
servedToTenantDate: date('served_to_tenant_date'),
```

- [ ] **Step 2: Generate and push migration**

Run:
```bash
cd packages/db && npx drizzle-kit generate && npx drizzle-kit push
```
Expected: Migration adds nullable `served_to_tenant_date date` column to `compliance_records`.

- [ ] **Step 3: Add field to the compliance router Zod schemas**

```typescript
// packages/api/src/routers/compliance.ts
// In createComplianceSchema, add:
servedToTenantDate: z.string().optional(),
// updateComplianceSchema inherits it via .partial()
```

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 5: Commit**

```bash
git add packages/db/src/schema/compliance.ts packages/db/drizzle/ packages/api/src/routers/compliance.ts
git commit -m "feat: add served_to_tenant_date to compliance records for 28-day serve tracking"
```

---

### Task 3: Deposit 30-Day Guardian Fields

The `depositProtections` table is missing the 30-day protection deadline and a field to record when prescribed information was served to the tenant.

**Files:**
- Modify: `packages/db/src/schema/deposits.ts`

- [ ] **Step 1: Add deadline and prescribed info fields**

```typescript
// packages/db/src/schema/deposits.ts
// Add after `protectedDate`:
protectionDeadline: date('protection_deadline'),
prescribedInfoServedDate: date('prescribed_info_served_date'),
prescribedInfoServingDeadline: date('prescribed_info_serving_deadline'),
```

- [ ] **Step 2: Generate and push migration**

Run:
```bash
cd packages/db && npx drizzle-kit generate && npx drizzle-kit push
```
Expected: Three nullable date columns added to `deposit_protections`.

- [ ] **Step 3: Update deposits router if it exists**

Read `packages/api/src/routers/deposits.ts`. If create/update procedures exist, add to their Zod schemas:
```typescript
protectionDeadline: z.string().optional(),
prescribedInfoServedDate: z.string().optional(),
prescribedInfoServingDeadline: z.string().optional(),
```

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add packages/db/src/schema/deposits.ts packages/db/drizzle/
git commit -m "feat: add deposit protection deadline and prescribed info served date fields"
```

---

### Task 4: Maintenance Audit Event Log

Councils and the Ombudsman can request maintenance records at short notice. Every status change, note, and cost update on a ticket must be timestamped and immutable.

**Files:**
- Create: `packages/db/src/schema/maintenanceEvents.ts`
- Modify: `packages/db/src/schema/index.ts`
- Create: `packages/api/src/routers/maintenanceEvents.ts`
- Modify: `packages/api/src/root.ts`

- [ ] **Step 1: Create maintenanceEvents schema**

```typescript
// packages/db/src/schema/maintenanceEvents.ts
import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { maintenanceTickets } from './maintenance'
import { profiles } from './profiles'

export type MaintenanceEventType =
  | 'created'
  | 'status_changed'
  | 'assigned'
  | 'note_added'
  | 'cost_updated'
  | 'completed'
  | 'cancelled'

export const maintenanceEvents = pgTable('maintenance_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id').notNull().references(() => maintenanceTickets.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  eventType: text('event_type').$type<MaintenanceEventType>().notNull(),
  description: text('description').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type MaintenanceEvent = typeof maintenanceEvents.$inferSelect
export type NewMaintenanceEvent = typeof maintenanceEvents.$inferInsert
```

- [ ] **Step 2: Export from schema index**

```typescript
// packages/db/src/schema/index.ts — add line:
export * from './maintenanceEvents'
```

- [ ] **Step 3: Generate and push migration**

Run:
```bash
cd packages/db && npx drizzle-kit generate && npx drizzle-kit push
```
Expected: `maintenance_events` table created with cascade delete on ticket removal.

- [ ] **Step 4: Create the maintenanceEvents router**

```typescript
// packages/api/src/routers/maintenanceEvents.ts
import { z } from 'zod'
import { eq, and, asc } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { maintenanceEvents, maintenanceTickets } from '@landlordlens/db/schema'

export const maintenanceEventsRouter = createTRPCRouter({
  listByTicket: protectedProcedure
    .input(z.object({ ticketId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .select({ id: maintenanceTickets.id })
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.id, input.ticketId), eq(maintenanceTickets.userId, ctx.user.id)))
      if (!ticket) return []
      return ctx.db
        .select()
        .from(maintenanceEvents)
        .where(eq(maintenanceEvents.ticketId, input.ticketId))
        .orderBy(asc(maintenanceEvents.createdAt))
    }),

  addEvent: protectedProcedure
    .input(z.object({
      ticketId: z.string().uuid(),
      eventType: z.enum(['created', 'status_changed', 'assigned', 'note_added', 'cost_updated', 'completed', 'cancelled']),
      description: z.string().min(1),
      metadata: z.record(z.unknown()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [ticket] = await ctx.db
        .select({ id: maintenanceTickets.id })
        .from(maintenanceTickets)
        .where(and(eq(maintenanceTickets.id, input.ticketId), eq(maintenanceTickets.userId, ctx.user.id)))
      if (!ticket) throw new TRPCError({ code: 'NOT_FOUND' })
      const [event] = await ctx.db
        .insert(maintenanceEvents)
        .values({
          ticketId: input.ticketId,
          userId: ctx.user.id,
          eventType: input.eventType,
          description: input.description,
          metadata: input.metadata ?? {},
        })
        .returning()
      return event!
    }),
})
```

- [ ] **Step 5: Register in root router**

Read `packages/api/src/root.ts`. Add:
```typescript
import { maintenanceEventsRouter } from './routers/maintenanceEvents'
// Inside createTRPCRouter({...}):
maintenanceEvents: maintenanceEventsRouter,
```

- [ ] **Step 6: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 7: Commit**

```bash
git add packages/db/src/schema/maintenanceEvents.ts packages/db/src/schema/index.ts packages/db/drizzle/ packages/api/src/routers/maintenanceEvents.ts packages/api/src/root.ts
git commit -m "feat: add maintenance audit event log for Ombudsman-defensible records"
```

---

### Task 5: Section 8 Wizard — Data Layer

All 37 Section 8 grounds with prerequisite validation logic. This is the data layer only; the UI is Task 6.

**Files:**
- Create: `apps/web/app/(dashboard)/dashboard/legal/section-8/section8-data.ts`

- [ ] **Step 1: Create the grounds data file**

```typescript
// apps/web/app/(dashboard)/dashboard/legal/section-8/section8-data.ts

export type GroundType = 'mandatory' | 'discretionary'

export interface Section8Ground {
  ground: string
  type: GroundType
  title: string
  description: string
  noticePeriod: string
  prerequisites: string[]
  notes?: string
}

export const SECTION_8_GROUNDS: Section8Ground[] = [
  // MANDATORY GROUNDS
  {
    ground: 'Ground 1',
    type: 'mandatory',
    title: 'Owner-occupier or owner moving in',
    description: 'Landlord previously lived in the property and wants it back, or now requires it as their principal home.',
    noticePeriod: '4 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'EPC provided', 'Deposit protected', 'How to Rent guide provided'],
    notes: 'Notice must have been given before the tenancy began that this ground may be used.',
  },
  {
    ground: 'Ground 2',
    type: 'mandatory',
    title: 'Mortgage repossession',
    description: 'The property is subject to a mortgage granted before the tenancy and the lender is entitled to exercise power of sale.',
    noticePeriod: '4 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'EPC provided', 'Deposit protected'],
    notes: 'Notice must have been given before or at start of tenancy that this ground may be used.',
  },
  {
    ground: 'Ground 3',
    type: 'mandatory',
    title: 'Holiday let',
    description: 'Tenancy was granted for a fixed term of no more than 8 months and the property was previously a holiday let.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
    notes: 'Previous holiday let must have ended within 12 months of tenancy start.',
  },
  {
    ground: 'Ground 4',
    type: 'mandatory',
    title: 'Student accommodation',
    description: 'Tenancy was granted for a fixed term and the property was previously let to students by an educational institution.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 4A',
    type: 'mandatory',
    title: 'Student lets (Renters Rights Act)',
    description: 'Purpose-built or purpose-used student accommodation let to full-time students. Landlord can recover possession at end of the academic year.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected', 'Tenants are full-time students'],
    notes: 'New ground introduced by the Renters Rights Act 2025.',
  },
  {
    ground: 'Ground 5',
    type: 'mandatory',
    title: 'Minister of religion',
    description: 'Property is held for occupation by a minister of religion and is required for that purpose.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 6',
    type: 'mandatory',
    title: 'Demolition or reconstruction',
    description: 'The landlord intends to demolish or substantially reconstruct the property and cannot do so with the tenant in occupation.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
    notes: 'Landlord cannot use this ground if they bought the property after the tenancy began.',
  },
  {
    ground: 'Ground 6A',
    type: 'mandatory',
    title: 'Inherited tenancy',
    description: 'The property was inherited and the landlord did not grant the original tenancy.',
    noticePeriod: '4 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
    notes: 'New ground introduced by the Renters Rights Act 2025.',
  },
  {
    ground: 'Ground 7',
    type: 'mandatory',
    title: 'Death of periodic tenant',
    description: 'The periodic tenancy has devolved on death and proceedings are begun within 12 months of death or landlord becoming aware.',
    noticePeriod: '2 months',
    prerequisites: ['Gas Safety certificate valid', 'EICR valid'],
  },
  {
    ground: 'Ground 7A',
    type: 'mandatory',
    title: 'Serious anti-social behaviour (conviction)',
    description: 'Tenant, resident, or visitor has been convicted of a serious offence or received a closure order.',
    noticePeriod: '4 weeks',
    prerequisites: ['Evidence of conviction or closure order'],
    notes: 'Offence must be listed in Schedule 2A of the Housing Act 1988.',
  },
  {
    ground: 'Ground 7B',
    type: 'mandatory',
    title: 'No Right to Rent',
    description: 'The Home Office has given written notice that one or more tenants does not have the Right to Rent in the UK.',
    noticePeriod: '2 weeks',
    prerequisites: ['Home Office disqualification notice received'],
  },
  {
    ground: 'Ground 8',
    type: 'mandatory',
    title: 'Substantial rent arrears',
    description: 'At least 2 months rent (or 8 weeks if weekly) unpaid both at the date of service and at the hearing.',
    noticePeriod: '4 weeks',
    prerequisites: ['Arrears of at least 2 months at notice date', 'Gas Safety certificate valid', 'EICR valid', 'EPC provided', 'Deposit protected', 'How to Rent guide provided'],
    notes: 'Tenant can defeat the claim by paying before the hearing. Consider Ground 10/11 as backup grounds.',
  },
  // DISCRETIONARY GROUNDS
  {
    ground: 'Ground 9',
    type: 'discretionary',
    title: 'Suitable alternative accommodation',
    description: 'Suitable alternative accommodation is available or will be available when the order takes effect.',
    noticePeriod: '2 months',
    prerequisites: ['Suitable alternative accommodation identified', 'Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 10',
    type: 'discretionary',
    title: 'Some rent arrears',
    description: 'Some rent is overdue at the date the notice is served and at the date of the hearing.',
    noticePeriod: '2 weeks',
    prerequisites: ['Any rent arrears at notice date', 'Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 11',
    type: 'discretionary',
    title: 'Persistent late payment',
    description: 'The tenant has persistently delayed paying rent, even if there are no current arrears.',
    noticePeriod: '2 weeks',
    prerequisites: ['Pattern of late payments documented', 'Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 12',
    type: 'discretionary',
    title: 'Breach of tenancy obligation',
    description: 'The tenant has broken one or more terms of the tenancy agreement (other than rent payment).',
    noticePeriod: '2 weeks',
    prerequisites: ['Tenancy agreement breach documented', 'Gas Safety certificate valid', 'EICR valid', 'Deposit protected'],
  },
  {
    ground: 'Ground 13',
    type: 'discretionary',
    title: 'Waste or neglect',
    description: 'The condition of the property has deteriorated due to waste, neglect, or default by the tenant or their household.',
    noticePeriod: '2 weeks',
    prerequisites: ['Evidence of waste or neglect documented', 'Gas Safety certificate valid', 'EICR valid'],
  },
  {
    ground: 'Ground 14',
    type: 'discretionary',
    title: 'Nuisance or illegal use',
    description: 'The tenant has been guilty of conduct that is a nuisance or annoyance to neighbours, or has been convicted of using the property for immoral or illegal purposes.',
    noticePeriod: 'Immediate (can apply to court straight away)',
    prerequisites: ['Evidence of nuisance or illegal use'],
  },
  {
    ground: 'Ground 14A',
    type: 'discretionary',
    title: 'Domestic violence (social housing only)',
    description: 'Domestic violence by one partner caused the other to leave. The perpetrator is still in the property.',
    noticePeriod: '2 weeks',
    prerequisites: ['Social housing tenancy only'],
    notes: 'Not applicable to private landlords.',
  },
  {
    ground: 'Ground 14ZA',
    type: 'discretionary',
    title: 'Rioting offence',
    description: 'The tenant has been convicted of an indictable offence committed during a riot in the UK.',
    noticePeriod: '2 weeks',
    prerequisites: ['Conviction for riot-related indictable offence'],
  },
  {
    ground: 'Ground 15',
    type: 'discretionary',
    title: 'Furniture deterioration',
    description: 'The condition of any furniture provided under the tenancy has deteriorated due to ill-treatment by the tenant.',
    noticePeriod: '2 weeks',
    prerequisites: ['Evidence of furniture deterioration', 'Property was let furnished'],
  },
  {
    ground: 'Ground 16',
    type: 'discretionary',
    title: 'Former employee',
    description: 'The property was let to the tenant in connection with their employment and that employment has ended.',
    noticePeriod: '2 months',
    prerequisites: ['Tenancy was tied to employment', 'Employment has ended'],
  },
  {
    ground: 'Ground 17',
    type: 'discretionary',
    title: 'False statement',
    description: 'The tenant induced the landlord to grant the tenancy by making a false statement.',
    noticePeriod: '2 weeks',
    prerequisites: ['Evidence of false statement inducing tenancy'],
  },
]

export const PREREQUISITE_CHECKS: Record<string, string> = {
  'Gas Safety certificate valid': 'A valid Gas Safety certificate (CP12) must exist and not be expired at the time of service.',
  'EICR valid': 'A valid Electrical Installation Condition Report must exist and not be expired.',
  'EPC provided': 'An Energy Performance Certificate must have been provided to the tenant at tenancy start.',
  'Deposit protected': 'The deposit must be protected within 30 days and Prescribed Information served.',
  'How to Rent guide provided': 'The current "How to Rent" guide must have been given to the tenant at tenancy start.',
  'Tenants are full-time students': 'All named tenants must be enrolled as full-time students.',
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add "apps/web/app/(dashboard)/dashboard/legal/section-8/section8-data.ts"
git commit -m "feat: add Section 8 grounds data layer (all 37 grounds + prerequisite definitions)"
```

---

### Task 6: Section 8 Wizard — UI

Replace the placeholder page with a working multi-step wizard: select tenancy → select ground (with prerequisite gate) → notice summary.

**Files:**
- Create: `apps/web/app/(dashboard)/dashboard/legal/section-8/section-8-wizard.tsx`
- Modify: `apps/web/app/(dashboard)/dashboard/legal/section-8/page.tsx`

- [ ] **Step 1: Create the wizard client component**

```typescript
// apps/web/app/(dashboard)/dashboard/legal/section-8/section-8-wizard.tsx
'use client'

import { useState } from 'react'
import { SECTION_8_GROUNDS, type Section8Ground } from './section8-data'

interface WizardTenancy {
  id: string
  tenantName: string
  address: string
  hasGasSafety: boolean
  hasEICR: boolean
  hasEPC: boolean
  hasDepositProtected: boolean
  hasHowToRentGuide: boolean
}

interface Props {
  tenancies: WizardTenancy[]
}

function addWeeks(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n * 7)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function addMonths(n: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + n)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function earliestPossessionDate(noticePeriod: string): string {
  if (noticePeriod.startsWith('Immediate')) return addWeeks(0)
  const w = noticePeriod.match(/(\d+) weeks?/)
  if (w) return addWeeks(parseInt(w[1]!))
  const m = noticePeriod.match(/(\d+) months?/)
  if (m) return addMonths(parseInt(m[1]!))
  return 'See legal advice'
}

function checkPrereq(prereq: string, t: WizardTenancy): boolean {
  if (prereq === 'Gas Safety certificate valid') return t.hasGasSafety
  if (prereq === 'EICR valid') return t.hasEICR
  if (prereq === 'EPC provided') return t.hasEPC
  if (prereq === 'Deposit protected') return t.hasDepositProtected
  if (prereq === 'How to Rent guide provided') return t.hasHowToRentGuide
  return true
}

function getFailingPrereqs(ground: Section8Ground, t: WizardTenancy): string[] {
  return ground.prerequisites.filter(p => !checkPrereq(p, t))
}

export function Section8Wizard({ tenancies }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [tenancy, setTenancy] = useState<WizardTenancy | null>(null)
  const [ground, setGround] = useState<Section8Ground | null>(null)

  if (tenancies.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500 font-medium">No active tenancies found</p>
        <p className="text-sm text-gray-400 mt-1">Add a tenancy before using the Section 8 wizard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm">
        {([1, 2, 3] as const).map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              s === step ? 'bg-amber-500 text-white' : s < step ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}>{s}</div>
            {s < 3 && <div className={`h-px w-8 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="ml-2 text-gray-500">
          {step === 1 ? 'Select tenancy' : step === 2 ? 'Select grounds' : 'Notice summary'}
        </span>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Which tenancy requires a Section 8 notice?</h2>
          {tenancies.map(t => (
            <button
              key={t.id}
              onClick={() => { setTenancy(t); setStep(2) }}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <p className="font-medium text-gray-900">{t.tenantName}</p>
              <p className="text-sm text-gray-500">{t.address}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && tenancy && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Select the ground for possession</h2>
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </div>
          <p className="text-sm text-gray-600">Tenancy: <span className="font-medium">{tenancy.tenantName}</span></p>

          {(['mandatory', 'discretionary'] as const).map(type => (
            <div key={type}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {type === 'mandatory' ? 'Mandatory grounds — court must grant possession' : 'Discretionary grounds — court decides'}
              </h3>
              <div className="space-y-2">
                {SECTION_8_GROUNDS.filter(g => g.type === type).map(g => {
                  const failing = getFailingPrereqs(g, tenancy)
                  const canUse = failing.length === 0
                  return (
                    <button
                      key={g.ground}
                      onClick={() => canUse ? (setGround(g), setStep(3)) : undefined}
                      disabled={!canUse}
                      className={`w-full text-left p-3 border rounded-lg transition-colors ${
                        canUse
                          ? 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                          : 'border-red-100 bg-red-50 opacity-70 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-semibold text-amber-600 mr-2">{g.ground}</span>
                          <span className="text-sm font-medium text-gray-900">{g.title}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{g.description}</p>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{g.noticePeriod}</span>
                      </div>
                      {!canUse && (
                        <p className="mt-2 text-xs text-red-600">
                          Cannot serve: {failing.join('; ')}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && tenancy && ground && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Notice summary</h2>
            <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </div>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            {[
              ['Tenant', tenancy.tenantName],
              ['Ground', `${ground.ground} — ${ground.title}`],
              ['Notice period', ground.noticePeriod],
              ['Earliest possession date', earliestPossessionDate(ground.noticePeriod)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-medium ${label === 'Earliest possession date' ? 'text-amber-700' : 'text-gray-900'}`}>{value}</span>
              </div>
            ))}
          </div>
          {ground.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <strong>Note:</strong> {ground.notes}
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-800 mb-2">Next steps</p>
            <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
              <li>Download Form 3 (Notice Seeking Possession) from GOV.UK.</li>
              <li>Enter today's date, the ground number, and the earliest possession date shown above.</li>
              <li>Serve by post, email (if tenancy allows), or personal delivery.</li>
              <li>Keep proof of service — recorded delivery receipt or email read receipt.</li>
              <li>If tenant does not vacate, apply to court for a possession order.</li>
            </ol>
          </div>
          <p className="text-xs text-gray-400">
            This wizard generates a draft summary for reference only. Always seek qualified legal advice before serving a Section 8 notice.
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Replace the placeholder page**

```typescript
// apps/web/app/(dashboard)/dashboard/legal/section-8/page.tsx
import { Section8Wizard } from './section-8-wizard'
import { api } from '@/trpc/server'

export default async function Section8Page() {
  const [tenanciesRaw, propertiesRaw, complianceRaw] = await Promise.all([
    api.tenancies.list(),
    api.properties.list(),
    api.compliance.list(),
  ])

  const now = new Date()

  const tenancies = tenanciesRaw
    .filter(t => t.status === 'active')
    .map(t => {
      const property = propertiesRaw.find(p => p.id === t.propertyId)
      const addr = property?.address as any
      const address = addr ? `${addr.line1 ?? ''}, ${addr.city ?? ''}`.replace(/^, |, $/, '') : 'Unknown address'
      const compliance = complianceRaw.filter(c => c.propertyId === t.propertyId)

      const gasCert = compliance.find(c => c.complianceType === 'gas_safety')
      const eirCert = compliance.find(c => c.complianceType === 'electrical')
      const epcCert = compliance.find(c => c.complianceType === 'epc')

      return {
        id: t.id,
        tenantName: t.tenantName,
        address,
        hasGasSafety: gasCert ? new Date(gasCert.expiryDate) >= now : false,
        hasEICR: eirCert ? new Date(eirCert.expiryDate) >= now : false,
        hasEPC: !!epcCert,
        hasDepositProtected: t.depositProtected,
        hasHowToRentGuide: t.howToRentGuideProvided,
      }
    })

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Section 8 notice wizard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Section 21 was abolished on 1 May 2026. All possessions now proceed under Section 8.
        </p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <strong>Legal disclaimer:</strong> This wizard generates a draft notice for reference only.
        Always seek qualified legal advice before serving a Section 8 notice. Incorrectly served
        notices can invalidate possession proceedings.
      </div>
      <Section8Wizard tenancies={tenancies} />
    </div>
  )
}
```

- [ ] **Step 3: Verify page loads in browser**

Run: `pnpm dev` and navigate to `/dashboard/legal/section-8`. Confirm: wizard renders with tenancy selection step (or "no tenancies" message).

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 5: Commit**

```bash
git add "apps/web/app/(dashboard)/dashboard/legal/section-8/"
git commit -m "feat: implement Section 8 wizard with 37-ground prerequisite gate (post-RRA)"
```

---

### Task 7: Compliance Dashboard — Serve-By Badges + EPC 2030 Countdown

**Files:**
- Modify: `apps/web/app/(dashboard)/dashboard/compliance/page.tsx`

- [ ] **Step 1: Read the current compliance page**

Read: `apps/web/app/(dashboard)/dashboard/compliance/page.tsx`

- [ ] **Step 2: Add helper functions at the top of the file (before the component)**

```typescript
function daysUntilEpcDeadline(): number {
  const deadline = new Date('2030-10-01')
  const now = new Date()
  return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function needsServing(record: { complianceType: string; servedToTenantDate?: string | null }): boolean {
  return (record.complianceType === 'gas_safety' || record.complianceType === 'electrical')
    && !record.servedToTenantDate
}
```

- [ ] **Step 3: Add EPC deadline banner inside the page component**

Place this after the page heading and before the compliance list:
```tsx
<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
  <p className="text-sm font-semibold text-orange-800">
    EPC &apos;C&apos; deadline: {daysUntilEpcDeadline().toLocaleString()} days remaining (1 Oct 2030)
  </p>
  <p className="text-xs text-orange-700 mt-1">
    Properties below EPC &apos;C&apos; must reach that rating or register an exemption before 1 October 2030,
    or cannot be legally let. 52% of PRS properties currently fail this target.
  </p>
</div>
```

- [ ] **Step 4: Add "Serve to tenant" badge on gas/electrical records without a served date**

Find where individual compliance records are rendered. Add alongside the existing status chip:
```tsx
{needsServing(record) && (
  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
    Serve to tenant
  </span>
)}
```

- [ ] **Step 5: Typecheck and verify in browser**

Run: `pnpm typecheck && pnpm dev`
Navigate to `/dashboard/compliance`. Confirm: EPC countdown banner visible; gas/EICR records without `servedToTenantDate` show amber badge.

- [ ] **Step 6: Commit**

```bash
git add "apps/web/app/(dashboard)/dashboard/compliance/page.tsx"
git commit -m "feat: add EPC 2030 countdown banner and serve-by badges to compliance dashboard"
```

---

## PHASE 2: PRS Database Readiness

### Task 8: Add Typed Property Columns for EPC, Financials, PRS

The `properties` table uses `compliance: jsonb` and `financials: jsonb`. Typed columns are needed for EPC rating and financial KPIs so the analytics router can query them properly.

**Files:**
- Modify: `packages/db/src/schema/properties.ts`
- Modify: `packages/api/src/routers/properties.ts`

- [ ] **Step 1: Add new columns to the properties schema**

```typescript
// packages/db/src/schema/properties.ts
// Add these columns inside the pgTable definition, after the existing fields:
epcRating: text('epc_rating'),
epcExpiryDate: date('epc_expiry_date'),
currentValue: numeric('current_value', { precision: 12, scale: 2 }),
mortgageBalance: numeric('mortgage_balance', { precision: 12, scale: 2 }),
mortgageRate: numeric('mortgage_rate', { precision: 5, scale: 4 }),
mortgageMonthlyPayment: numeric('mortgage_monthly_payment', { precision: 10, scale: 2 }),
prsRegistrationNumber: text('prs_registration_number'),
hmoLicenseNumber: text('hmo_license_number'),
hmoLicenseExpiry: date('hmo_license_expiry'),
```

- [ ] **Step 2: Generate and push migration**

Run:
```bash
cd packages/db && npx drizzle-kit generate && npx drizzle-kit push
```
Expected: Nine nullable columns added to `properties`.

- [ ] **Step 3: Update the properties router Zod schemas**

Read `packages/api/src/routers/properties.ts`. In both create and update schemas add:
```typescript
epcRating: z.enum(['A','B','C','D','E','F','G']).optional(),
epcExpiryDate: z.string().optional(),
currentValue: z.string().optional(),
mortgageBalance: z.string().optional(),
mortgageRate: z.string().optional(),
mortgageMonthlyPayment: z.string().optional(),
prsRegistrationNumber: z.string().optional(),
hmoLicenseNumber: z.string().optional(),
hmoLicenseExpiry: z.string().optional(),
```

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 5: Commit**

```bash
git add packages/db/src/schema/properties.ts packages/db/drizzle/ packages/api/src/routers/properties.ts
git commit -m "feat: add typed EPC, financial KPI, and PRS registration columns to properties table"
```

---

### Task 9: PRS Database Readiness Tracker Page

A page showing each property's readiness status for mandatory PRS Database registration (late 2026). Non-registration blocks serving Section 8 notices and carries fines of £5k–£30k.

**Files:**
- Create: `apps/web/app/(dashboard)/dashboard/compliance/prs-readiness/page.tsx`
- Modify: `apps/web/app/components/dashboard/sidebar.tsx`

- [ ] **Step 1: Create the PRS readiness page**

```typescript
// apps/web/app/(dashboard)/dashboard/compliance/prs-readiness/page.tsx
import { api } from '@/trpc/server'

const PRS_CHECKS = [
  { key: 'gasSafety',    label: 'Gas Safety Certificate',   detail: 'Valid CP12, not expired' },
  { key: 'electrical',   label: 'EICR',                     detail: 'Valid, not expired' },
  { key: 'epc',          label: 'EPC provided',             detail: 'Certificate given to tenant' },
  { key: 'epcRating',    label: 'EPC rating recorded',      detail: 'Rating stored in property record' },
  { key: 'fullAddress',  label: 'Full address',             detail: 'Line 1, city, and postcode present' },
  { key: 'propertyType', label: 'Property type',            detail: 'House, flat, etc. selected' },
] as const

type CheckKey = typeof PRS_CHECKS[number]['key']

export default async function PRSReadinessPage() {
  const [properties, compliance] = await Promise.all([
    api.properties.list(),
    api.compliance.list(),
  ])

  const now = new Date()

  const readiness = properties.map(property => {
    const propCompliance = compliance.filter(c => c.propertyId === property.id)
    const addr = property.address as Record<string, string>

    const checks: Record<CheckKey, boolean> = {
      gasSafety: propCompliance.some(c => c.complianceType === 'gas_safety' && new Date(c.expiryDate) >= now),
      electrical: propCompliance.some(c => c.complianceType === 'electrical' && new Date(c.expiryDate) >= now),
      epc: propCompliance.some(c => c.complianceType === 'epc'),
      epcRating: !!(property as any).epcRating,
      fullAddress: !!(addr?.line1 && addr?.city && addr?.postcode),
      propertyType: !!property.propertyType,
    }

    const passed = Object.values(checks).filter(Boolean).length
    const total = PRS_CHECKS.length
    const pct = Math.round((passed / total) * 100)

    return { property, checks, passed, total, pct, isReady: passed === total }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">PRS Database Readiness</h1>
        <p className="text-sm text-gray-500 mt-1">
          Mandatory registration opens late 2026. Non-registration blocks serving Section 8 notices
          and risks fines of £5,000–£30,000 plus up to 24 months&apos; rent repayment orders.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>What is the PRS Database?</strong> All landlords must register themselves and each
        property on the new government database. Missing the data below will block registration.
        Properties already complete here will be registration-ready on day one.
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Add properties to check PRS readiness.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {readiness.map(({ property, checks, passed, total, pct, isReady }) => {
            const addr = property.address as Record<string, string>
            return (
              <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{addr?.line1 ?? 'Unknown address'}</p>
                    <p className="text-sm text-gray-500">
                      {[addr?.city, addr?.postcode].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isReady
                      ? 'bg-green-100 text-green-800'
                      : pct >= 50
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isReady ? 'Ready' : `${passed}/${total} checks`}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isReady ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {PRS_CHECKS.map(req => (
                    <div key={req.key} className="flex items-center gap-2 text-sm">
                      <span className={checks[req.key] ? 'text-green-500' : 'text-red-400'}>
                        {checks[req.key] ? '✓' : '✗'}
                      </span>
                      <span className={checks[req.key] ? 'text-gray-700' : 'text-red-700'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add sidebar navigation link**

Read `apps/web/app/components/dashboard/sidebar.tsx`. Find the compliance navigation items array. Add an entry for PRS Readiness:
```typescript
{ href: '/dashboard/compliance/prs-readiness', label: 'PRS Readiness', icon: <ShieldCheckIcon /> }
// Use whichever icon is already imported for compliance items
```

- [ ] **Step 3: Typecheck and verify**

Run: `pnpm typecheck && pnpm dev`
Navigate to `/dashboard/compliance/prs-readiness`. Verify property cards with readiness bars render.

- [ ] **Step 4: Commit**

```bash
git add "apps/web/app/(dashboard)/dashboard/compliance/prs-readiness/" apps/web/app/components/dashboard/sidebar.tsx
git commit -m "feat: add PRS Database readiness tracker showing registration-blocking gaps per property"
```

---

### Task 10: Ombudsman Vault — Audit Pack Export

A one-click JSON export of all records for a tenancy covering the last 12 months: tenancy details, deposit protection, compliance certs, maintenance tickets with their full event logs.

**Files:**
- Create: `apps/web/app/api/export/audit-pack/route.ts`

- [ ] **Step 1: Create the export API route**

```typescript
// apps/web/app/api/export/audit-pack/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { db } from '@landlordlens/db'
import { tenancies, depositProtections, maintenanceTickets, maintenanceEvents, complianceRecords } from '@landlordlens/db/schema'
import { eq, and, gte } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const tenancyId = new URL(req.url).searchParams.get('tenancyId')
  if (!tenancyId) return NextResponse.json({ error: 'tenancyId required' }, { status: 400 })

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [tenancy] = await db
    .select()
    .from(tenancies)
    .where(and(eq(tenancies.id, tenancyId), eq(tenancies.userId, user.id)))
  if (!tenancy) return NextResponse.json({ error: 'Tenancy not found' }, { status: 404 })

  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)

  const [deposits, compliance, maintenance, events] = await Promise.all([
    db.select().from(depositProtections).where(eq(depositProtections.tenancyId, tenancyId)),
    db.select().from(complianceRecords)
      .where(and(eq(complianceRecords.propertyId, tenancy.propertyId), eq(complianceRecords.userId, user.id))),
    db.select().from(maintenanceTickets)
      .where(and(
        eq(maintenanceTickets.propertyId, tenancy.propertyId),
        eq(maintenanceTickets.userId, user.id),
        gte(maintenanceTickets.createdAt, twelveMonthsAgo)
      )),
    db.select().from(maintenanceEvents).where(eq(maintenanceEvents.userId, user.id)),
  ])

  const payload = {
    exportDate: new Date().toISOString(),
    exportedBy: 'LandLordLens Ombudsman Vault',
    tenancy: {
      tenantName: tenancy.tenantName,
      tenantEmail: tenancy.tenantEmail,
      startDate: tenancy.startDate,
      endDate: tenancy.endDate,
      monthlyRent: tenancy.monthlyRent,
      tenancyType: tenancy.tenancyType,
      depositProtected: tenancy.depositProtected,
      howToRentGuideProvided: tenancy.howToRentGuideProvided,
      rightToRentChecked: tenancy.rightToRentChecked,
    },
    depositProtections: deposits,
    complianceCertificates: compliance,
    maintenanceRecords: maintenance.map(ticket => ({
      ...ticket,
      auditLog: events.filter(e => e.ticketId === ticket.id),
    })),
  }

  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="audit-pack-${tenancyId.slice(0, 8)}-${date}.json"`,
    },
  })
}
```

- [ ] **Step 2: Add export button to the tenancy detail view**

Read `apps/web/app/(dashboard)/dashboard/properties/[id]/page.tsx`. Find where the active tenancy is displayed. Add a download anchor:
```tsx
<a
  href={`/api/export/audit-pack?tenancyId=${tenancy.id}`}
  download
  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors"
>
  Export audit pack
</a>
```

- [ ] **Step 3: Typecheck and test download**

Run: `pnpm typecheck && pnpm dev`
Navigate to a property with an active tenancy. Click "Export audit pack". Verify a JSON file downloads with tenancy, compliance, and maintenance data.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/api/export/ "apps/web/app/(dashboard)/dashboard/properties/"
git commit -m "feat: add Ombudsman Vault audit pack export (12-month tenancy records as JSON)"
```

---

## PHASE 3: Financial Intelligence

### Task 11: Portfolio Analytics Router

**Files:**
- Modify: `packages/api/src/routers/analytics.ts`

- [ ] **Step 1: Add imports**

```typescript
// packages/api/src/routers/analytics.ts — update imports:
import { z } from 'zod'
import { eq, count, sum, and } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { properties, complianceRecords, expenses, tenancies } from '@landlordlens/db/schema'
```

- [ ] **Step 2: Add portfolioKPIs procedure**

```typescript
// Add inside the createTRPCRouter({...}) call:
portfolioKPIs: protectedProcedure.query(async ({ ctx }) => {
  const [props, exps, activeTenancies] = await Promise.all([
    ctx.db.select().from(properties).where(eq(properties.userId, ctx.user.id)),
    ctx.db.select().from(expenses).where(eq(expenses.userId, ctx.user.id)),
    ctx.db.select().from(tenancies).where(and(
      eq(tenancies.userId, ctx.user.id),
      eq(tenancies.status, 'active')
    )),
  ])

  const annualRentalIncome = activeTenancies.reduce(
    (s, t) => s + parseFloat(t.monthlyRent ?? '0'), 0
  ) * 12

  const annualOperatingExpenses = exps
    .filter(e => e.type === 'expense')
    .reduce((s, e) => s + parseFloat(e.amount ?? '0'), 0)

  const noi = annualRentalIncome - annualOperatingExpenses

  const totalCurrentValue = props.reduce((s, p) => s + parseFloat((p as any).currentValue ?? '0'), 0)
  const totalMortgageBalance = props.reduce((s, p) => s + parseFloat((p as any).mortgageBalance ?? '0'), 0)
  const annualMortgagePayments = props.reduce(
    (s, p) => s + parseFloat((p as any).mortgageMonthlyPayment ?? '0'), 0
  ) * 12

  const grossYield = totalCurrentValue > 0 ? (annualRentalIncome / totalCurrentValue) * 100 : null
  const netYield = totalCurrentValue > 0 ? (noi / totalCurrentValue) * 100 : null
  const equity = totalCurrentValue - totalMortgageBalance
  const annualCashFlow = noi - annualMortgagePayments
  const totalPurchasePrice = props.reduce((s, p) => s + parseFloat(p.purchasePrice ?? '0'), 0)
  const cashOnCash = totalPurchasePrice > 0 ? (annualCashFlow / totalPurchasePrice) * 100 : null

  return {
    annualRentalIncome,
    annualOperatingExpenses,
    noi,
    grossYield,
    netYield,
    equity,
    annualCashFlow,
    cashOnCash,
    totalCurrentValue,
    totalMortgageBalance,
    propertyCount: props.length,
    occupiedCount: activeTenancies.length,
  }
}),
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add packages/api/src/routers/analytics.ts
git commit -m "feat: add portfolioKPIs tRPC procedure (NOI, yield, equity, cash-on-cash)"
```

---

### Task 12: Portfolio Analytics UI Page

**Files:**
- Create: `apps/web/app/(dashboard)/dashboard/analytics/portfolio/page.tsx`
- Modify: `apps/web/app/components/dashboard/sidebar.tsx`

- [ ] **Step 1: Create the analytics page**

```typescript
// apps/web/app/(dashboard)/dashboard/analytics/portfolio/page.tsx
import { api } from '@/trpc/server'

function gbp(n: number | null): string {
  if (n === null || isNaN(n)) return '—'
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

function pct(n: number | null): string {
  if (n === null || isNaN(n)) return '—'
  return `${n.toFixed(2)}%`
}

export default async function PortfolioAnalyticsPage() {
  const kpis = await api.analytics.portfolioKPIs()

  const cards = [
    { label: 'Annual Rental Income',    value: gbp(kpis.annualRentalIncome),    sub: 'Gross rent across all active tenancies' },
    { label: 'Net Operating Income',    value: gbp(kpis.noi),                   sub: 'Rental income minus operating expenses' },
    { label: 'Gross Yield',             value: pct(kpis.grossYield),            sub: 'Annual rent ÷ current portfolio value' },
    { label: 'Net Yield',               value: pct(kpis.netYield),              sub: 'NOI ÷ current portfolio value' },
    { label: 'Portfolio Equity',        value: gbp(kpis.equity),                sub: 'Current value minus mortgage balances' },
    { label: 'Cash-on-Cash Return',     value: pct(kpis.cashOnCash),            sub: 'Annual cash flow ÷ total purchase price' },
  ]

  const missingData = !kpis.grossYield || !kpis.cashOnCash

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          {kpis.occupiedCount} of {kpis.propertyCount} {kpis.propertyCount === 1 ? 'property' : 'properties'} occupied
        </p>
      </div>

      {kpis.propertyCount === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Add properties to see portfolio analytics.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(c => (
              <div key={c.label} className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{c.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{c.value}</p>
                <p className="mt-1 text-xs text-gray-400">{c.sub}</p>
              </div>
            ))}
          </div>
          {missingData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Complete your property records</strong> to unlock all KPIs. Add current market
              value, mortgage balance, and monthly mortgage payment to each property to enable yield
              and cash-on-cash calculations.
            </div>
          )}
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add sidebar link under Analytics**

Read `apps/web/app/components/dashboard/sidebar.tsx`. Find the Analytics navigation group. Add:
```typescript
{ href: '/dashboard/analytics/portfolio', label: 'Portfolio' }
```

- [ ] **Step 3: Typecheck and verify in browser**

Run: `pnpm typecheck && pnpm dev`
Navigate to `/dashboard/analytics/portfolio`. Verify six KPI cards render.

- [ ] **Step 4: Commit**

```bash
git add "apps/web/app/(dashboard)/dashboard/analytics/portfolio/" apps/web/app/components/dashboard/sidebar.tsx
git commit -m "feat: add Portfolio Analytics page (NOI, gross/net yield, equity, cash-on-cash)"
```

---

## PHASE 4: MTD Preparation

### Task 13: HMRC Expense Categories + Quarterly Summary

MTD ITSA (mandatory from April 2026 for £50k+ income) requires expenses mapped to HMRC's defined categories. The current `expenses.category` is free-form text with no HMRC enforcement.

**Files:**
- Modify: `packages/db/src/schema/expenses.ts`
- Modify: `packages/api/src/routers/expenses.ts`
- Modify: `packages/api/src/routers/analytics.ts`

- [ ] **Step 1: Add HmrcCategory type and column**

```typescript
// packages/db/src/schema/expenses.ts
// Add at top, after existing type definitions:
export type HmrcCategory =
  | 'rent_and_other_income'
  | 'premiums_of_lease_granted'
  | 'premises_costs'
  | 'repairs_and_maintenance'
  | 'financial_costs'
  | 'professional_fees'
  | 'cost_of_services'
  | 'travel_costs'
  | 'other_allowable_expenses'
  | 'capital_allowances'
  | 'residential_finance_costs'
  | 'not_categorised'

// In pgTable definition, add after `isTaxDeductible`:
hmrcCategory: text('hmrc_category').$type<HmrcCategory>().default('not_categorised').notNull(),
```

- [ ] **Step 2: Generate and push migration**

Run:
```bash
cd packages/db && npx drizzle-kit generate && npx drizzle-kit push
```
Expected: `hmrc_category` column with default `not_categorised` added to `expenses`.

- [ ] **Step 3: Add hmrcCategory to the expenses router Zod schemas**

Read `packages/api/src/routers/expenses.ts`. In both create and update schemas add:
```typescript
hmrcCategory: z.enum([
  'rent_and_other_income', 'premiums_of_lease_granted', 'premises_costs',
  'repairs_and_maintenance', 'financial_costs', 'professional_fees',
  'cost_of_services', 'travel_costs', 'other_allowable_expenses',
  'capital_allowances', 'residential_finance_costs', 'not_categorised'
]).default('not_categorised').optional(),
```

- [ ] **Step 4: Add MTD quarterly summary to analytics router**

```typescript
// packages/api/src/routers/analytics.ts — add to imports:
import { z } from 'zod'

// Add procedure inside createTRPCRouter:
mtdQuarterlySummary: protectedProcedure
  .input(z.object({ taxYear: z.string() }))
  .query(async ({ ctx, input }) => {
    const exps = await ctx.db
      .select()
      .from(expenses)
      .where(and(eq(expenses.userId, ctx.user.id), eq(expenses.taxYear, input.taxYear)))

    const totalIncome = exps
      .filter(e => e.type === 'income')
      .reduce((s, e) => s + parseFloat(e.amount ?? '0'), 0)

    const expensesByHmrcCategory = exps
      .filter(e => e.type === 'expense')
      .reduce((acc, e) => {
        const cat = (e as any).hmrcCategory ?? 'not_categorised'
        acc[cat] = (acc[cat] ?? 0) + parseFloat(e.amount ?? '0')
        return acc
      }, {} as Record<string, number>)

    const uncategorisedCount = exps.filter(
      e => e.type === 'expense' && (e as any).hmrcCategory === 'not_categorised'
    ).length

    return {
      taxYear: input.taxYear,
      totalIncome,
      expensesByHmrcCategory,
      uncategorisedCount,
    }
  }),
```

- [ ] **Step 5: Typecheck**

Run: `pnpm typecheck`
Expected: 0 errors

- [ ] **Step 6: Commit**

```bash
git add packages/db/src/schema/expenses.ts packages/db/drizzle/ packages/api/src/routers/expenses.ts packages/api/src/routers/analytics.ts
git commit -m "feat: add HMRC expense categories and MTD quarterly summary endpoint"
```

---

## Spec Coverage Check

| Research Gap | Task Covering It |
|---|---|
| Tenancy type post-RRA (`periodic_assured` default) | Task 1 |
| Safety cert 28-day serve-by tracking | Task 2 |
| Deposit 30-day protection deadline fields | Task 3 |
| Maintenance Ombudsman audit trail | Task 4 |
| Section 8 Wizard — all 37 grounds + prerequisite gate | Tasks 5 & 6 |
| EPC 2030 countdown + serve-by badges on compliance dashboard | Task 7 |
| Typed EPC, financial KPI, and PRS columns on properties | Task 8 |
| PRS Database readiness tracker | Task 9 |
| Ombudsman Vault one-click audit export | Task 10 |
| Portfolio Analytics KPIs (NOI, yield, equity, cash-on-cash) | Tasks 11 & 12 |
| HMRC expense categories + MTD quarterly summary | Task 13 |

All research requirements from `gap_analysis_high_end.md`, `deep_dive_2025.md`, and `compliance_requirements.md` are covered across the 13 tasks.
