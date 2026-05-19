# Project Tidy-Up Design

**Date:** 2026-05-19  
**Branch:** `review/code-quality`  
**Scope:** Code fixes on current branch + branch hygiene (PRs + dead branch removal)

---

## Goal

Bring the repo to a clean, mergeable state: typecheck passes, no dead stubs on the API surface, no open stale branches, and all in-flight work raised as reviewable PRs.

---

## What Gets Done

### 1. Fix `seed.ts` type errors (on this branch)

`packages/db/src/seed.ts` lines 27 and 34 fail `pnpm typecheck` with:

> Type `string | undefined` is not assignable to type `string`

Root cause: TypeScript strict mode treats array index access (`arr[0]`) as `T | undefined`. The `daysFromNow()` and `monthsFromNow()` helpers call `.toISOString().split('T')[0]` and return `string | undefined`.

Fix: add an explicit `: string` return type to each helper and use a non-null assertion on the array access (`split('T')[0]!`). The value can never actually be undefined — `toISOString()` always returns a well-formed ISO string and `split('T')` always yields at least one element.

### 2. Remove `services.ts` stub (on this branch)

`packages/api/src/routers/services.ts` is a placeholder that returns an empty array. It adds noise to the API surface with no value.

- Delete `packages/api/src/routers/services.ts`
- Remove its export from the router index (`packages/api/src/root.ts` or equivalent)
- Verify no frontend code calls `api.services.list`

### 3. Verify and fix billing UI colour inconsistency (on this branch)

Memory records a `bg-indigo-600` in `CheckoutButtons` inconsistent with the app's `--shell-accent` amber. Grep `apps/web` for `bg-indigo` / `indigo-`:

- If found: replace with the amber `--shell-accent` inline-style pattern used elsewhere in the settings page
- If not found: confirm already resolved and close the blocker in memory

### 4. Raise PR for `review/code-quality` → `main`

Once typecheck passes and the above code items are done, open a GitHub PR. Title: `chore: project tidy-up — fix types, remove services stub, billing UI fix`.

### 5. Raise PR for `security/review-and-hardening` → `main`

One commit: privilege escalation fix, security headers, hardened API error responses. Open a separate PR for review.

### 6. Delete dead branch `feature/competitive-roadmap-phase1-4`

Already merged into main. Delete locally. Check if remote exists and delete there too.

---

## Out of Scope

The following items from the technical debt doc are acknowledged but not touched here — they require their own design and implementation cycles:

- Rate limiting / CSRF protection
- Optimistic updates on mutations
- Pagination on list queries
- Staging environment
- Automated migration in CI/CD
- Transactional email service (Resend)
- Legacy JSONB column migration

---

## Success Criteria

- `pnpm typecheck` exits 0 across all packages
- `packages/api/src/routers/services.ts` does not exist
- No `bg-indigo` in `apps/web` billing/settings area (or confirmed already clean)
- PR open for `review/code-quality`
- PR open for `security/review-and-hardening`
- `feature/competitive-roadmap-phase1-4` branch deleted locally and remotely
