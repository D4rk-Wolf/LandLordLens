# Project Tidy-Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all typecheck failures, remove dead API surface, align billing UI to the amber design system, and get all in-flight branches raised as PRs with stale branches deleted.

**Architecture:** All code changes land on the `review/code-quality` branch. Branch hygiene (PRs + dead branch deletion) happens after the code fixes are committed. No schema changes, no new packages.

**Tech Stack:** TypeScript, Next.js 15, tRPC, Tailwind CSS, GitHub CLI (`gh`)

---

## File Map

| Action | File |
|--------|------|
| Modify | `packages/db/src/seed.ts` |
| Delete | `packages/api/src/routers/services.ts` |
| Modify | `packages/api/src/root.ts` |
| Modify | `apps/web/app/components/billing/billing-actions.tsx` |
| Modify | `apps/web/app/(dashboard)/dashboard/settings/billing/page.tsx` |
| Modify | `apps/web/app/(dashboard)/dashboard/settings/page.tsx` |
| Modify | `apps/web/app/components/properties/property-form.tsx` |

---

## Task 1: Fix `seed.ts` type errors

**Files:**
- Modify: `packages/db/src/seed.ts:24-35`

TypeScript strict mode treats `array[0]` as `T | undefined`. Both helpers return `string` but TypeScript infers the return as `string | undefined`. Adding `!` satisfies the type checker — the values genuinely cannot be undefined here because `toISOString()` always returns a well-formed ISO string.

- [ ] **Step 1: Open `packages/db/src/seed.ts` and update `daysFromNow`**

Replace lines 23–28:

```ts
function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]!
}
```

- [ ] **Step 2: Update `monthsFromNow` in the same file**

Replace lines 30–35:

```ts
function monthsFromNow(n: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + n)
  return d.toISOString().split('T')[0]!
}
```

- [ ] **Step 3: Verify typecheck passes for the db package**

```bash
pnpm typecheck --filter=@landlordlens/db
```

Expected: exits 0 with no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/db/src/seed.ts
git commit -m "fix: non-null assert on date helper array access in seed.ts"
```

---

## Task 2: Remove the `services` stub router

**Files:**
- Delete: `packages/api/src/routers/services.ts`
- Modify: `packages/api/src/root.ts`

The `servicesRouter` returns `[]` with no implementation and adds noise to the API surface.

- [ ] **Step 1: Delete the services router file**

```bash
rm "packages/api/src/routers/services.ts"
```

- [ ] **Step 2: Remove the import and router key from `packages/api/src/root.ts`**

Remove the line:
```ts
import { servicesRouter } from './routers/services'
```

And remove from `createTRPCRouter({...})`:
```ts
  services: servicesRouter,
```

The final `root.ts` should look like:

```ts
/**
 * @module root
 * Assembles all domain routers into the single `appRouter` that is mounted
 * by the Next.js API route handler.
 */

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
import { billingRouter } from './routers/billing'
import { maintenanceEventsRouter } from './routers/maintenanceEvents'

/**
 * The root tRPC router for the entire API surface.
 * Each key becomes the namespace prefix when calling procedures from the client
 * (e.g. `api.properties.list`, `api.billing.checkout`).
 */
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
  billing: billingRouter,
  maintenanceEvents: maintenanceEventsRouter,
})

/** Inferred TypeScript type used by tRPC clients and the React query hooks. */
export type AppRouter = typeof appRouter
```

- [ ] **Step 3: Confirm no frontend code calls `api.services`**

```bash
grep -r "api\.services\|trpc\.services" apps/web --include="*.tsx" --include="*.ts"
```

Expected: no output (zero matches).

- [ ] **Step 4: Verify typecheck passes for the api package**

```bash
pnpm typecheck --filter=@landlordlens/api
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add packages/api/src/root.ts packages/api/src/routers/services.ts
git commit -m "chore: remove unused services stub router"
```

---

## Task 3: Fix billing UI — `billing-actions.tsx`

**Files:**
- Modify: `apps/web/app/components/billing/billing-actions.tsx`

Three buttons use indigo classes. Replace with amber equivalents consistent with the rest of the dashboard (amber-500 for primary, amber-50/amber-200/amber-700 for secondary).

- [ ] **Step 1: Update the Monthly checkout button (line 52)**

Replace:
```tsx
className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
```

With:
```tsx
className="flex-1 px-3 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 disabled:opacity-50 transition-colors"
```

- [ ] **Step 2: Update the Annual checkout button (line 59)**

Replace:
```tsx
className="flex-1 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
```

With:
```tsx
className="flex-1 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 disabled:opacity-50 transition-colors"
```

- [ ] **Step 3: Update the Manage subscription button (line 92)**

Replace:
```tsx
className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
```

With:
```tsx
className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 disabled:opacity-50 transition-colors"
```

---

## Task 4: Fix billing UI — `billing/page.tsx` and `settings/page.tsx`

**Files:**
- Modify: `apps/web/app/(dashboard)/dashboard/settings/billing/page.tsx`
- Modify: `apps/web/app/(dashboard)/dashboard/settings/page.tsx`

- [ ] **Step 1: Update the current-plan card ring in `billing/page.tsx` (line 49)**

Replace:
```tsx
<Card key={tier} className={isCurrent ? 'ring-2 ring-indigo-500' : ''}>
```

With:
```tsx
<Card key={tier} className={isCurrent ? 'ring-2 ring-amber-500' : ''}>
```

- [ ] **Step 2: Update the "Current" badge in `billing/page.tsx` (line 54)**

Replace:
```tsx
<span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
```

With:
```tsx
<span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
```

- [ ] **Step 3: Update the link in `settings/page.tsx` (line 39)**

Replace:
```tsx
<Link href="/dashboard/settings/billing" className="text-sm text-indigo-600 hover:underline">
```

With:
```tsx
<Link href="/dashboard/settings/billing" className="text-sm text-amber-600 hover:underline">
```

---

## Task 5: Fix indigo focus rings in `property-form.tsx`

**Files:**
- Modify: `apps/web/app/components/properties/property-form.tsx`

Three form inputs use `focus:ring-indigo-500` focus rings.

- [ ] **Step 1: Replace all three `focus:ring-indigo-500` occurrences**

Run a targeted replace across the file. The three affected `className` strings all follow this pattern:

```
focus:ring-2 focus:ring-indigo-500
```

Replace each with:

```
focus:ring-2 focus:ring-amber-500
```

Lines 93, 108, and 139 — update each one. The surrounding className strings are:

Line 93:
```tsx
className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
```

Line 108:
```tsx
className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
```

Line 139:
```tsx
className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
```

- [ ] **Step 2: Confirm no `indigo` remains in the codebase**

```bash
grep -r "indigo" apps/web --include="*.tsx" --include="*.ts"
```

Expected: no output.

- [ ] **Step 3: Commit tasks 3–5 together**

```bash
git add \
  apps/web/app/components/billing/billing-actions.tsx \
  apps/web/app/(dashboard)/dashboard/settings/billing/page.tsx \
  apps/web/app/(dashboard)/dashboard/settings/page.tsx \
  apps/web/app/components/properties/property-form.tsx
git commit -m "chore: replace indigo with amber across billing UI and property form"
```

---

## Task 6: Verify full typecheck passes

- [ ] **Step 1: Run full typecheck**

```bash
pnpm typecheck
```

Expected: all packages exit 0. If any fail, fix before proceeding.

---

## Task 7: Raise PR for `review/code-quality`

- [ ] **Step 1: Push current branch**

```bash
git push origin review/code-quality
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create \
  --base main \
  --head review/code-quality \
  --title "chore: project tidy-up — fix types, remove services stub, amber UI alignment, JSDoc + docs" \
  --body "$(cat <<'EOF'
## Summary

- Fixes typecheck failures in `seed.ts` (non-null assert on date helper array access)
- Removes the unused `services` stub router from the tRPC API surface
- Replaces all indigo Tailwind classes with amber equivalents in billing UI and property form, matching the dashboard design system
- JSDoc comments across all packages and full documentation suite (from earlier commits on this branch)

## Test plan

- [ ] `pnpm typecheck` exits 0
- [ ] `/dashboard/settings/billing` renders with amber buttons and amber current-plan ring/badge
- [ ] `/dashboard/settings` billing link is amber
- [ ] Property form focus rings are amber
- [ ] No `api.services` references in the codebase

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Note the PR URL**

Copy and save the PR URL printed by `gh pr create`.

---

## Task 8: Raise PR for `security/review-and-hardening`

- [ ] **Step 1: Switch to the security branch**

```bash
git checkout security/review-and-hardening
```

- [ ] **Step 2: Push the branch**

```bash
git push origin security/review-and-hardening
```

- [ ] **Step 3: Open the PR**

```bash
gh pr create \
  --base main \
  --head security/review-and-hardening \
  --title "security: fix privilege escalation, add security headers, harden API errors" \
  --body "$(cat <<'EOF'
## Summary

- Fixes a privilege escalation vulnerability (users could access other users' data)
- Adds HTTP security headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
- Hardens API error responses to avoid leaking internal details in production

## Test plan

- [ ] Users cannot access properties/tenancies belonging to other accounts
- [ ] Security headers present on all responses (check DevTools → Network → response headers)
- [ ] API errors in production return generic messages without stack traces

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Switch back to `review/code-quality`**

```bash
git checkout review/code-quality
```

---

## Task 9: Delete the stale `feature/competitive-roadmap-phase1-4` branch

- [ ] **Step 1: Confirm the branch is fully merged into main**

```bash
git log main..feature/competitive-roadmap-phase1-4 --oneline
```

Expected: no output (zero commits ahead of main).

- [ ] **Step 2: Delete the local branch**

```bash
git branch -d feature/competitive-roadmap-phase1-4
```

Expected: `Deleted branch feature/competitive-roadmap-phase1-4`.

- [ ] **Step 3: Delete the remote branch**

```bash
git push origin --delete feature/competitive-roadmap-phase1-4
```

Expected: `- [deleted] feature/competitive-roadmap-phase1-4`

---

## Done

All tasks complete when:
- `pnpm typecheck` exits 0
- `packages/api/src/routers/services.ts` does not exist
- No `indigo` in `apps/web` billing, settings, or property-form files
- PR open for `review/code-quality` → `main`
- PR open for `security/review-and-hardening` → `main`
- `feature/competitive-roadmap-phase1-4` deleted locally and on origin
