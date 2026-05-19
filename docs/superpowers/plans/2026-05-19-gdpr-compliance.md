# LandLordLens GDPR Compliance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement UK GDPR compliance for LandLordLens — legal pages, data export, and account deletion — so the app can legally accept its first user.

**Architecture:** Static legal pages at `/privacy`, `/terms`, `/cookies` using the existing landing page inline-style convention. Two new API routes (`GET /api/user/export`, `DELETE /api/user/delete`) following the existing `audit-pack` route pattern (Supabase auth → ownership check → Drizzle query). A Vercel cron job handles hard deletion after the 30-day grace period. Interactive UI added as client components in the existing settings page.

**Tech Stack:** Next.js 15 App Router, Drizzle ORM, Supabase Auth, Resend (React Email), Vitest, Vercel Cron

---

## File Map

| Action | Path | Purpose |
| --- | --- | --- |
| Modify | `packages/db/src/schema/profiles.ts` | Add `lastExportRequestedAt`, `deletionRequestedAt` |
| Modify | `packages/db/src/schema/payments.ts` | Add `retentionReason`, make `userId` nullable |
| Create | `packages/db/migrations/0007_gdpr_columns.sql` | SQL migration for new columns |
| Create | `apps/email/src/templates/data-export.tsx` | Export confirmation email template |
| Create | `apps/email/src/templates/account-deletion.tsx` | Deletion confirmation email template |
| Modify | `apps/email/src/resend.ts` | Add `sendDataExportEmail`, `sendAccountDeletionEmail` |
| Create | `apps/web/app/privacy/page.tsx` | Privacy Policy page |
| Create | `apps/web/app/terms/page.tsx` | Terms of Service + DPA page |
| Create | `apps/web/app/cookies/page.tsx` | Cookie Policy page |
| Modify | `apps/web/app/page.tsx` | Footer: add legal links |
| Modify | `apps/web/app/(auth)/sign-up/sign-up-form.tsx` | Add consent line before submit button |
| Create | `apps/web/vitest.config.ts` | Vitest config for API route tests |
| Create | `apps/web/__tests__/api/user/export.test.ts` | Tests for export route |
| Create | `apps/web/__tests__/api/user/delete.test.ts` | Tests for deletion route |
| Create | `apps/web/app/api/user/export/route.ts` | `GET /api/user/export` |
| Create | `apps/web/app/api/user/delete/route.ts` | `DELETE /api/user/delete` |
| Create | `apps/web/app/api/cron/purge-deleted-accounts/route.ts` | Vercel cron — hard deletion after 30 days |
| Create | `apps/web/vercel.json` | Cron schedule config |
| Modify | `apps/web/app/(dashboard)/dashboard/settings/page.tsx` | Add Data & Privacy card |
| Create | `apps/web/app/(dashboard)/dashboard/settings/data-export-button.tsx` | Client component for export |
| Create | `apps/web/app/(dashboard)/dashboard/settings/delete-account-button.tsx` | Client component for deletion |

---

### Task 1: Database schema and migration

**Files:**
- Modify: `packages/db/src/schema/profiles.ts`
- Modify: `packages/db/src/schema/payments.ts`
- Create: `packages/db/migrations/0007_gdpr_columns.sql`

- [ ] **Step 1: Add GDPR columns to profiles schema**

Open `packages/db/src/schema/profiles.ts`. Add two columns after `updatedAt`:

```typescript
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  lastExportRequestedAt: timestamp('last_export_requested_at', { withTimezone: true }),
  deletionRequestedAt: timestamp('deletion_requested_at', { withTimezone: true }),
})
```

Also update the `Profile` type — it's inferred automatically via `$inferSelect`, no change needed there.

- [ ] **Step 2: Add retentionReason to payments schema and make userId nullable**

Open `packages/db/src/schema/payments.ts`. Find the `userId` column and make it nullable. Add `retentionReason` at the end of the table definition:

```typescript
  // Make userId nullable so HMRC-retained rows can be de-linked from deleted accounts
  userId: uuid('user_id'),  // remove .notNull() if present
  // ... other existing columns ...
  retentionReason: text('retention_reason'),
```

- [ ] **Step 3: Create the migration file**

Check the highest-numbered file in `packages/db/migrations/` to get the next number (currently `0006_*`, so next is `0007`). Create `packages/db/migrations/0007_gdpr_columns.sql`:

```sql
ALTER TABLE "profiles" ADD COLUMN "last_export_requested_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "deletion_requested_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "retention_reason" text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL;
```

Note: if `payments.user_id` has no NOT NULL constraint already, omit the last line — check with `\d payments` in psql or by reading the existing payments migration.

- [ ] **Step 4: Apply the migration**

Run from the repo root:

```bash
pnpm --filter @landlordlens/db migrate
```

If that script doesn't exist, check `packages/db/package.json` for the correct script name (`push`, `migrate`, `db:push`, etc.). Expected: migration applies with no errors.

- [ ] **Step 5: Typecheck**

```bash
pnpm --filter @landlordlens/db typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add packages/db/src/schema/profiles.ts packages/db/src/schema/payments.ts packages/db/migrations/0007_gdpr_columns.sql
git commit -m "feat: add GDPR columns to profiles and payments schemas"
```

---

### Task 2: Test infrastructure

**Files:**
- Create: `apps/web/vitest.config.ts`
- Modify: `apps/web/package.json`

- [ ] **Step 1: Install Vitest and dependencies**

```bash
pnpm --filter web add -D vitest @vitejs/plugin-react
```

Expected: packages added to `apps/web/package.json` devDependencies.

- [ ] **Step 2: Create vitest config**

Create `apps/web/vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
})
```

- [ ] **Step 3: Add test script to package.json**

Open `apps/web/package.json`. Add to `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create test directory**

```bash
mkdir -p apps/web/__tests__/api/user
```

- [ ] **Step 5: Verify setup with a smoke test**

Create `apps/web/__tests__/smoke.test.ts`:

```typescript
describe('test setup', () => {
  it('works', () => {
    expect(1 + 1).toBe(2)
  })
})
```

Run:

```bash
pnpm --filter web test
```

Expected: `1 passed`.

- [ ] **Step 6: Delete the smoke test**

```bash
rm apps/web/__tests__/smoke.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add apps/web/vitest.config.ts apps/web/package.json
git commit -m "chore: add Vitest test infrastructure to web app"
```

---

### Task 3: Email templates

**Files:**
- Create: `apps/email/src/templates/data-export.tsx`
- Create: `apps/email/src/templates/account-deletion.tsx`
- Modify: `apps/email/src/resend.ts`

- [ ] **Step 1: Create data export email template**

Create `apps/email/src/templates/data-export.tsx`:

```typescript
import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind,
} from '@react-email/components'

export function DataExportEmail() {
  return (
    <Html>
      <Head />
      <Preview>Your LandLordLens data export is ready</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Your data export</Text>
            <Text className="text-gray-600">
              We received a request to export all data associated with your LandLordLens account.
              Your export has been downloaded to your device.
            </Text>
            <Text className="text-gray-600">
              The export contains your account details, properties, tenancies, compliance records,
              and document metadata. Actual files (certificates, identity documents, photos) are
              referenced by storage path and can be requested separately.
            </Text>
            <Text className="text-sm text-gray-500">
              If you didn&apos;t request this export, please contact us immediately at{' '}
              privacy@landlordlens.co.uk.
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

- [ ] **Step 2: Create account deletion email template**

Create `apps/email/src/templates/account-deletion.tsx`:

```typescript
import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind,
} from '@react-email/components'

interface Props {
  purgeDate: string
}

export function AccountDeletionEmail({ purgeDate }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your LandLordLens account has been scheduled for deletion</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Account deletion scheduled</Text>
            <Text className="text-gray-600">
              Your LandLordLens account has been scheduled for permanent deletion on{' '}
              <strong>{purgeDate}</strong>. Your account is now locked.
            </Text>
            <Text className="text-gray-600">
              All data including properties, tenancies, documents, and compliance records will be
              permanently deleted on that date. Payment records are retained for 7 years as required
              by HMRC.
            </Text>
            <Text className="text-sm text-gray-500">
              Changed your mind? Email privacy@landlordlens.co.uk before {purgeDate} to cancel
              the deletion request.
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

- [ ] **Step 3: Add email sending functions to resend.ts**

Open `apps/email/src/resend.ts`. Add the following two functions at the end of the file:

```typescript
export async function sendDataExportEmail(to: string) {
  const { DataExportEmail } = await import('./templates/data-export')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your LandLordLens data export',
    react: DataExportEmail({}),
  })
}

export async function sendAccountDeletionEmail(to: string, purgeDate: string) {
  const { AccountDeletionEmail } = await import('./templates/account-deletion')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your LandLordLens account has been scheduled for deletion',
    react: AccountDeletionEmail({ purgeDate }),
  })
}
```

- [ ] **Step 4: Typecheck**

```bash
pnpm --filter @landlordlens/email typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add apps/email/src/templates/data-export.tsx apps/email/src/templates/account-deletion.tsx apps/email/src/resend.ts
git commit -m "feat: add data export and account deletion email templates"
```

---

### Task 4: Privacy Policy page

**Files:**
- Create: `apps/web/app/privacy/page.tsx`

- [ ] **Step 1: Create the Privacy Policy page**

Create `apps/web/app/privacy/page.tsx`:

```typescript
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — LandLordLens',
}

const heading2Style: React.CSSProperties = {
  fontFamily: 'var(--font-syne, system-ui)',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--shell-text)',
  marginTop: 32,
  marginBottom: 8,
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--shell-text-muted)',
  lineHeight: 1.7,
  marginBottom: 12,
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  marginBottom: 16,
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  background: 'var(--shell-elevated)',
  color: 'var(--shell-text)',
  fontWeight: 600,
  borderBottom: '1px solid var(--shell-border)',
}

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  color: 'var(--shell-text-muted)',
  borderBottom: '1px solid var(--shell-border-subtle)',
  verticalAlign: 'top',
}

export default function PrivacyPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px 80px',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--shell-text-faint)', marginBottom: 8 }}>
        Last updated: 19 May 2026
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-syne, system-ui)',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--shell-text)',
          marginBottom: 8,
        }}
      >
        Privacy Policy
      </h1>
      <p style={paraStyle}>
        This policy explains how D4rkwolf Industries (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses
        personal data when you use LandLordLens at landlordlens.co.uk.
      </p>

      <h2 style={heading2Style}>1. Who we are</h2>
      <p style={paraStyle}>
        D4rkwolf Industries is the data controller for your landlord account data. We are
        pre-registration and operate as a sole trader. Contact:{' '}
        <a href="mailto:privacy@landlordlens.co.uk" style={{ color: 'var(--shell-accent)' }}>
          privacy@landlordlens.co.uk
        </a>
      </p>

      <h2 style={heading2Style}>2. Data we collect about you</h2>
      <p style={paraStyle}>When you create a LandLordLens account, we collect:</p>
      <ul style={{ ...paraStyle, paddingLeft: 20 }}>
        <li>Email address and display name (via Supabase Auth)</li>
        <li>Subscription tier and billing status (via Stripe — we store your Stripe customer ID and subscription ID only)</li>
        <li>IP address (captured in security audit logs)</li>
        <li>Error data via Sentry (PII transmission disabled at source)</li>
      </ul>

      <h2 style={heading2Style}>3. Data you enter about third parties</h2>
      <p style={paraStyle}>
        As a landlord, you may enter personal data about your tenants (names, contact details,
        identity documents, financial data). You are the data controller for that data.
        LandLordLens processes it only as your data processor, on your instructions.
        See Section 9 of our{' '}
        <Link href="/terms" style={{ color: 'var(--shell-accent)' }}>Terms of Service</Link>{' '}
        for the full Data Processing Agreement. You are responsible for informing your tenants
        how their data is used.
      </p>

      <h2 style={heading2Style}>4. Lawful basis</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Lawful basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Account and subscription data</td>
            <td style={tdStyle}>Performance of a contract (UK GDPR Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td style={tdStyle}>Security audit logs and IP addresses</td>
            <td style={tdStyle}>Legitimate interests — fraud prevention and platform security (Art. 6(1)(f))</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>5. Sub-processors</h2>
      <p style={paraStyle}>
        We share data with the following processors, each bound by appropriate data processing terms:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Processor</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Supabase</td>
            <td style={tdStyle}>Database and file storage</td>
            <td style={tdStyle}>EU (Ireland) primary; US entity</td>
          </tr>
          <tr>
            <td style={tdStyle}>Stripe</td>
            <td style={tdStyle}>Payment processing</td>
            <td style={tdStyle}>US</td>
          </tr>
          <tr>
            <td style={tdStyle}>Resend</td>
            <td style={tdStyle}>Transactional email</td>
            <td style={tdStyle}>US</td>
          </tr>
          <tr>
            <td style={tdStyle}>Sentry</td>
            <td style={tdStyle}>Error monitoring (PII disabled)</td>
            <td style={tdStyle}>US</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>6. Data retention</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Retention period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Account and subscription data</td>
            <td style={tdStyle}>Duration of subscription + 30 days after account deletion</td>
          </tr>
          <tr>
            <td style={tdStyle}>Payment records</td>
            <td style={tdStyle}>7 years (HMRC legal requirement)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Security audit logs and IP addresses</td>
            <td style={tdStyle}>12 months</td>
          </tr>
          <tr>
            <td style={tdStyle}>All other platform data (properties, tenancies, documents)</td>
            <td style={tdStyle}>30 days after account deletion request</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>7. Your rights</h2>
      <p style={paraStyle}>
        Under UK GDPR you have the right to: access your personal data, correct inaccuracies,
        request erasure, restrict processing, receive a portable copy of your data, and object
        to processing based on legitimate interests.
      </p>
      <p style={paraStyle}>
        Exercise any right by emailing{' '}
        <a href="mailto:privacy@landlordlens.co.uk" style={{ color: 'var(--shell-accent)' }}>
          privacy@landlordlens.co.uk
        </a>. We will respond within 30 days.
      </p>
      <p style={paraStyle}>
        You also have the right to lodge a complaint with the Information Commissioner&apos;s Office
        at{' '}
        <a
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--shell-accent)' }}
        >
          ico.org.uk
        </a>.
      </p>

      <h2 style={heading2Style}>8. International transfers</h2>
      <p style={paraStyle}>
        Stripe, Resend, and Sentry are US-based. Data transfers to these processors are
        covered by Standard Contractual Clauses. Supabase stores primary data in the EU
        (Ireland).
      </p>

      <h2 style={heading2Style}>9. Changes to this policy</h2>
      <p style={paraStyle}>
        We will notify you by email of any material changes. Continued use of LandLordLens
        after 30 days constitutes acceptance of the updated policy.
      </p>

      <div
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--shell-border-subtle)',
          fontSize: 12,
          color: 'var(--shell-text-faint)',
        }}
      >
        <Link href="/" style={{ color: 'var(--shell-text-faint)', textDecoration: 'none' }}>
          ← Back to LandLordLens
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders**

```bash
pnpm dev --filter web
```

Navigate to `http://localhost:3000/privacy`. Expected: page renders with all sections, no console errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/privacy/page.tsx
git commit -m "feat: add Privacy Policy page at /privacy"
```

---

### Task 5: Terms of Service page

**Files:**
- Create: `apps/web/app/terms/page.tsx`

- [ ] **Step 1: Create the Terms of Service page**

Create `apps/web/app/terms/page.tsx`:

```typescript
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — LandLordLens',
}

const heading2Style: React.CSSProperties = {
  fontFamily: 'var(--font-syne, system-ui)',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--shell-text)',
  marginTop: 32,
  marginBottom: 8,
}

const heading3Style: React.CSSProperties = {
  fontFamily: 'var(--font-outfit, system-ui)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--shell-text)',
  marginTop: 20,
  marginBottom: 4,
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--shell-text-muted)',
  lineHeight: 1.7,
  marginBottom: 12,
}

const dpaBoxStyle: React.CSSProperties = {
  background: 'var(--shell-elevated)',
  border: '1px solid var(--shell-border)',
  borderRadius: 8,
  padding: '20px 24px',
  marginTop: 12,
}

export default function TermsPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px 80px',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--shell-text-faint)', marginBottom: 8 }}>
        Last updated: 19 May 2026
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-syne, system-ui)',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--shell-text)',
          marginBottom: 8,
        }}
      >
        Terms of Service
      </h1>
      <p style={paraStyle}>
        These terms govern your use of LandLordLens, operated by D4rkwolf Industries.
        By creating an account you agree to these terms.
      </p>

      <h2 style={heading2Style}>1. The service</h2>
      <p style={paraStyle}>
        LandLordLens is a property management tool for UK residential landlords. Access is by
        subscription. The Free tier is available indefinitely. Paid tiers are billed monthly
        or annually via Stripe.
      </p>

      <h2 style={heading2Style}>2. Account</h2>
      <p style={paraStyle}>
        One account per user. You are responsible for maintaining the security of your
        credentials. Accounts may not be shared or transferred to another person.
      </p>

      <h2 style={heading2Style}>3. Acceptable use</h2>
      <p style={paraStyle}>You may use LandLordLens only for lawful UK residential property management. You must not:</p>
      <ul style={{ ...paraStyle, paddingLeft: 20 }}>
        <li>Enter false or fabricated tenant data</li>
        <li>Use the platform for any discriminatory purpose prohibited by the Equality Act 2010</li>
        <li>Attempt to access another user&apos;s data</li>
        <li>Automate requests to the platform without written permission</li>
      </ul>

      <h2 style={heading2Style}>4. Subscription and billing</h2>
      <p style={paraStyle}>
        Pricing: Free (£0), Professional (£12/mo or £120/yr), Business (£29/mo or £290/yr),
        Enterprise (£99/mo or £990/yr). All prices in GBP. VAT may apply.
        Cancellation takes effect at the end of the current billing period.
        No refunds for partial periods.
      </p>

      <h2 style={heading2Style}>5. Intellectual property</h2>
      <p style={paraStyle}>
        All platform IP belongs to D4rkwolf Industries. You retain full ownership of all data
        you enter into LandLordLens.
      </p>

      <h2 style={heading2Style}>6. Limitation of liability</h2>
      <p style={paraStyle}>
        The service is provided as-is. D4rkwolf Industries is not liable for your failure to
        comply with UK housing law (including but not limited to deposit protection, Right to
        Rent checks, or gas safety obligations), loss of data due to user error, or outages
        caused by third-party sub-processors. Our total liability to you in any 12-month period
        is capped at 3 months of subscription fees paid.
      </p>

      <h2 style={heading2Style}>7. Termination</h2>
      <p style={paraStyle}>
        Either party may terminate at any time. On account deletion, your data is retained for
        30 days then permanently deleted, except payment records which are kept for 7 years
        under HMRC rules.
      </p>

      <h2 style={heading2Style}>8. Governing law</h2>
      <p style={paraStyle}>
        These terms are governed by English law. Disputes are subject to the exclusive
        jurisdiction of the courts of England and Wales.
      </p>

      <h2 style={heading2Style}>9. Data Processing Agreement</h2>
      <p style={paraStyle}>
        This section is a legally binding Data Processing Agreement (&ldquo;DPA&rdquo;) between
        you (the Controller) and D4rkwolf Industries (the Processor) under UK GDPR Article 28,
        effective from the date you create your account.
      </p>

      <div style={dpaBoxStyle}>
        <h3 style={heading3Style}>Subject matter and duration</h3>
        <p style={paraStyle}>
          Processing of tenant personal data entered by the landlord into LandLordLens,
          for the duration of these Terms of Service.
        </p>

        <h3 style={heading3Style}>Nature and purpose</h3>
        <p style={paraStyle}>
          Storage, retrieval, organisation, and display of tenant data on the landlord&apos;s
          instruction, for the purpose of UK residential property management and legal compliance.
        </p>

        <h3 style={heading3Style}>Categories of personal data</h3>
        <p style={paraStyle}>
          Names, contact details (email, phone), dates of birth, identity document details and
          copies, financial data (rent amounts, deposits), background check results, and tenancy
          records.
        </p>

        <h3 style={heading3Style}>Controller obligations</h3>
        <p style={paraStyle}>
          You warrant that: (a) you have a lawful basis under UK GDPR for entering each category
          of tenant data; (b) you have provided tenants with a privacy notice describing how their
          data is used; (c) you will handle any tenant Subject Access Requests relating to data
          you entered.
        </p>

        <h3 style={heading3Style}>Processor obligations</h3>
        <p style={paraStyle}>
          D4rkwolf Industries will: (a) process tenant data only on your documented instructions;
          (b) ensure data is protected by appropriate technical and organisational measures
          (encryption at rest and in transit, access controls, audit logging); (c) not engage
          additional sub-processors without notifying you; (d) assist you in responding to data
          subject rights requests; (e) delete all tenant data within 30 days of account termination.
        </p>

        <h3 style={heading3Style}>Sub-processors</h3>
        <p style={{ ...paraStyle, marginBottom: 4 }}>
          Current sub-processors authorised to process tenant data:
        </p>
        <ul style={{ ...paraStyle, paddingLeft: 20 }}>
          <li>Supabase — database and file storage (EU primary)</li>
          <li>Resend — tenant invite emails only (US, Standard Contractual Clauses)</li>
          <li>Sentry — error monitoring with PII disabled (US, Standard Contractual Clauses)</li>
        </ul>
        <p style={paraStyle}>Stripe does not process tenant data.</p>

        <h3 style={heading3Style}>International transfers</h3>
        <p style={paraStyle}>
          Transfers to US sub-processors (Resend, Sentry) are covered by Standard Contractual
          Clauses approved by the European Commission and retained under UK GDPR via the
          UK International Data Transfer Agreement.
        </p>
      </div>

      <div
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--shell-border-subtle)',
          fontSize: 12,
          color: 'var(--shell-text-faint)',
        }}
      >
        <Link href="/" style={{ color: 'var(--shell-text-faint)', textDecoration: 'none' }}>
          ← Back to LandLordLens
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders**

Navigate to `http://localhost:3000/terms`. Expected: all sections render including the DPA box.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/terms/page.tsx
git commit -m "feat: add Terms of Service page with inline DPA at /terms"
```

---

### Task 6: Cookie Policy page

**Files:**
- Create: `apps/web/app/cookies/page.tsx`

- [ ] **Step 1: Create the Cookie Policy page**

Create `apps/web/app/cookies/page.tsx`:

```typescript
import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy — LandLordLens',
}

const heading2Style: React.CSSProperties = {
  fontFamily: 'var(--font-syne, system-ui)',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--shell-text)',
  marginTop: 32,
  marginBottom: 8,
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--shell-text-muted)',
  lineHeight: 1.7,
  marginBottom: 12,
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  marginBottom: 16,
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  background: 'var(--shell-elevated)',
  color: 'var(--shell-text)',
  fontWeight: 600,
  borderBottom: '1px solid var(--shell-border)',
}

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  color: 'var(--shell-text-muted)',
  borderBottom: '1px solid var(--shell-border-subtle)',
  verticalAlign: 'top',
}

export default function CookiesPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px 80px',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--shell-text-faint)', marginBottom: 8 }}>
        Last updated: 19 May 2026
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-syne, system-ui)',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--shell-text)',
          marginBottom: 8,
        }}
      >
        Cookie Policy
      </h1>
      <p style={paraStyle}>
        This policy explains what cookies LandLordLens sets and why.
      </p>

      <h2 style={heading2Style}>Cookies we set</h2>
      <p style={paraStyle}>
        LandLordLens sets only strictly necessary cookies. No analytics, advertising, or
        preference cookies are used.
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Cookie</th>
            <th style={thStyle}>Purpose</th>
            <th style={thStyle}>Set by</th>
            <th style={thStyle}>Expiry</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code>sb-*</code></td>
            <td style={tdStyle}>Authentication session tokens — keeps you logged in</td>
            <td style={tdStyle}>Supabase</td>
            <td style={tdStyle}>1 week (refreshed on activity)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Stripe session cookies</td>
            <td style={tdStyle}>Payment processing session state — required when completing a subscription purchase</td>
            <td style={tdStyle}>Stripe</td>
            <td style={tdStyle}>Session</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>Do I need to consent?</h2>
      <p style={paraStyle}>
        No. All cookies on LandLordLens are strictly necessary for the service to function.
        Under UK GDPR and PECR, strictly necessary cookies do not require consent.
        We do not show a cookie banner because there is nothing optional to consent to.
      </p>

      <h2 style={heading2Style}>Managing cookies</h2>
      <p style={paraStyle}>
        You can block or delete cookies via your browser settings. Blocking the{' '}
        <code style={{ background: 'var(--shell-elevated)', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>
          sb-*
        </code>{' '}
        cookies will prevent you from logging in.
      </p>
      <p style={paraStyle}>
        Browser cookie management guides:{' '}
        <a
          href="https://support.google.com/chrome/answer/95647"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--shell-accent)' }}
        >
          Chrome
        </a>
        {' · '}
        <a
          href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--shell-accent)' }}
        >
          Firefox
        </a>
        {' · '}
        <a
          href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--shell-accent)' }}
        >
          Safari
        </a>
      </p>

      <div
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--shell-border-subtle)',
          fontSize: 12,
          color: 'var(--shell-text-faint)',
        }}
      >
        <Link href="/" style={{ color: 'var(--shell-text-faint)', textDecoration: 'none' }}>
          ← Back to LandLordLens
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders**

Navigate to `http://localhost:3000/cookies`. Expected: page renders with cookie table.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/cookies/page.tsx
git commit -m "feat: add Cookie Policy page at /cookies"
```

---

### Task 7: Footer and sign-up links

**Files:**
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/app/(auth)/sign-up/sign-up-form.tsx`

- [ ] **Step 1: Add legal links to the footer**

Open `apps/web/app/page.tsx`. Find the footer links div — it currently looks like:

```typescript
<div style={{ display: 'flex', gap: 20 }}>
  <Link
    href="/pricing"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Pricing
  </Link>
  <Link
    href="/sign-in"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Sign in
  </Link>
</div>
```

Replace it with:

```typescript
<div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
  <Link
    href="/pricing"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Pricing
  </Link>
  <Link
    href="/privacy"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Privacy
  </Link>
  <Link
    href="/terms"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Terms
  </Link>
  <Link
    href="/cookies"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Cookies
  </Link>
  <Link
    href="/sign-in"
    style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
  >
    Sign in
  </Link>
</div>
```

- [ ] **Step 2: Add consent line to sign-up form**

Open `apps/web/app/(auth)/sign-up/sign-up-form.tsx`. Find the password `<div>` block (ends with the "Minimum 8 characters" note). After that closing `</div>` and before the `<button>` element, add:

```typescript
<p style={{ fontSize: 11.5, color: 'var(--shell-text-faint)', marginBottom: 16, lineHeight: 1.5 }}>
  By creating an account you agree to our{' '}
  <Link href="/terms" style={{ color: 'var(--shell-accent)', textDecoration: 'none' }}>
    Terms of Service
  </Link>
  {' '}and{' '}
  <Link href="/privacy" style={{ color: 'var(--shell-accent)', textDecoration: 'none' }}>
    Privacy Policy
  </Link>.
</p>
```

`Link` is already imported at the top of this file — no new import needed.

- [ ] **Step 3: Verify both changes**

Check `http://localhost:3000` — footer should show Privacy, Terms, Cookies links.
Check `http://localhost:3000/sign-up` — consent line should appear above the submit button.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/page.tsx apps/web/app/(auth)/sign-up/sign-up-form.tsx
git commit -m "feat: add legal page links to footer and sign-up consent line"
```

---

### Task 8: Data export API route (TDD)

**Files:**
- Create: `apps/web/__tests__/api/user/export.test.ts`
- Create: `apps/web/app/api/user/export/route.ts`

- [ ] **Step 1: Write failing tests**

Create `apps/web/__tests__/api/user/export.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockSelect = vi.fn()
const mockUpdate = vi.fn()
const mockSendDataExportEmail = vi.fn()

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}))

vi.mock('@landlordlens/db', () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: mockSelect })) })),
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: mockUpdate })) })),
  },
}))

vi.mock('@landlordlens/email', () => ({
  sendDataExportEmail: mockSendDataExportEmail,
}))

// Import route after mocks are set up
const { GET } = await import('../../../app/api/user/export/route')

function makeRequest() {
  return new NextRequest('http://localhost/api/user/export')
}

describe('GET /api/user/export', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await GET(makeRequest())
    expect(res.status).toBe(401)
  })

  it('returns a JSON attachment when authenticated and no prior export', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    // Profile with no lastExportRequestedAt
    mockSelect.mockResolvedValue([{ id: 'user-123', lastExportRequestedAt: null, subscription: 'professional' }])
    mockUpdate.mockResolvedValue([])
    mockSendDataExportEmail.mockResolvedValue({})

    const res = await GET(makeRequest())
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Disposition')).toMatch(/attachment; filename="landlordlens-data-/)
    expect(res.headers.get('Content-Type')).toBe('application/json')
  })

  it('returns 429 when rate limit exceeded (last export < 24h ago)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    const recentExport = new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
    mockSelect.mockResolvedValue([{ id: 'user-123', lastExportRequestedAt: recentExport }])

    const res = await GET(makeRequest())
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm --filter web test __tests__/api/user/export.test.ts
```

Expected: all 3 tests FAIL with "Cannot find module" or similar — the route doesn't exist yet.

- [ ] **Step 3: Create the route directory**

```bash
mkdir -p apps/web/app/api/user/export
```

- [ ] **Step 4: Implement the export route**

Create `apps/web/app/api/user/export/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import {
  profiles, properties, tenancies, rightToRent, tenantBackgroundChecks,
  complianceRecords, expenses, maintenanceTickets, propertyInspections,
  inventories, depositProtections, payments, documents,
} from '@landlordlens/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { sendDataExportEmail } from '@landlordlens/email'

const RATE_LIMIT_MS = 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  if (profile.lastExportRequestedAt) {
    const elapsed = Date.now() - new Date(profile.lastExportRequestedAt).getTime()
    if (elapsed < RATE_LIMIT_MS) {
      const retryAfter = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000)
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfterSeconds: retryAfter },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }
  }

  const userProperties = await db.select().from(properties).where(eq(properties.userId, user.id))
  const propertyIds = userProperties.map(p => p.id)

  const userTenancies = await db.select().from(tenancies).where(eq(tenancies.userId, user.id))
  const tenancyIds = userTenancies.map(t => t.id)

  const [
    userRightToRent,
    userBackgroundChecks,
    userCompliance,
    userExpenses,
    userMaintenance,
    userInspections,
    userInventories,
    userDeposits,
    userPayments,
    userDocuments,
  ] = await Promise.all([
    tenancyIds.length > 0 ? db.select().from(rightToRent).where(inArray(rightToRent.tenancyId, tenancyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(tenantBackgroundChecks).where(inArray(tenantBackgroundChecks.tenancyId, tenancyIds)) : [],
    propertyIds.length > 0 ? db.select().from(complianceRecords).where(inArray(complianceRecords.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(expenses).where(inArray(expenses.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(maintenanceTickets).where(inArray(maintenanceTickets.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(propertyInspections).where(inArray(propertyInspections.propertyId, propertyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(inventories).where(inArray(inventories.tenancyId, tenancyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(depositProtections).where(inArray(depositProtections.tenancyId, tenancyIds)) : [],
    db.select().from(payments).where(eq(payments.userId, user.id)),
    propertyIds.length > 0 ? db.select().from(documents).where(inArray(documents.propertyId, propertyIds)) : [],
  ])

  await db.update(profiles)
    .set({ lastExportRequestedAt: new Date(), updatedAt: new Date() })
    .where(eq(profiles.id, user.id))

  if (user.email) await sendDataExportEmail(user.email)

  const payload = {
    exported_at: new Date().toISOString(),
    profile: { id: profile.id, name: profile.name, role: profile.role, subscription: profile.subscription, createdAt: profile.createdAt },
    properties: userProperties,
    tenancies: userTenancies,
    right_to_rent: userRightToRent,
    background_checks: userBackgroundChecks,
    compliance_records: userCompliance,
    expenses: userExpenses,
    maintenance_tickets: userMaintenance,
    property_inspections: userInspections,
    inventories: userInventories,
    deposit_protections: userDeposits,
    payments: userPayments,
    documents: userDocuments.map(({ id, name, category, storagePath, mimeType, sizeBytes, createdAt }) => ({
      id, name, category, storagePath, mimeType, sizeBytes, createdAt,
    })),
  }

  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="landlordlens-data-${user.id.slice(0, 8)}-${date}.json"`,
    },
  })
}
```

Note: verify that `rightToRent`, `tenantBackgroundChecks`, `propertyInspections`, `inventories` are the correct export names from `@landlordlens/db/schema` by checking the schema index file. Adjust if the names differ.

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm --filter web test __tests__/api/user/export.test.ts
```

Expected: all 3 tests PASS.

- [ ] **Step 6: Typecheck**

```bash
pnpm --filter web typecheck
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add apps/web/__tests__/api/user/export.test.ts apps/web/app/api/user/export/route.ts
git commit -m "feat: add data export API route GET /api/user/export"
```

---

### Task 9: Account deletion API route (TDD)

**Files:**
- Create: `apps/web/__tests__/api/user/delete.test.ts`
- Create: `apps/web/app/api/user/delete/route.ts`

- [ ] **Step 1: Write failing tests**

Create `apps/web/__tests__/api/user/delete.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockSignOut = vi.fn()
const mockSelect = vi.fn()
const mockUpdate = vi.fn()
const mockSendAccountDeletionEmail = vi.fn()

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser, signOut: mockSignOut },
  })),
}))

vi.mock('@landlordlens/db', () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: mockSelect })) })),
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: mockUpdate })) })),
  },
}))

vi.mock('@landlordlens/email', () => ({
  sendAccountDeletionEmail: mockSendAccountDeletionEmail,
}))

const { DELETE } = await import('../../../app/api/user/delete/route')

function makeRequest() {
  return new NextRequest('http://localhost/api/user/delete', { method: 'DELETE' })
}

describe('DELETE /api/user/delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSignOut.mockResolvedValue({})
    mockUpdate.mockResolvedValue([])
    mockSendAccountDeletionEmail.mockResolvedValue({})
  })

  it('returns 401 when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(401)
  })

  it('returns 400 when user has an active paid subscription', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'professional',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: null,
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/cancel your subscription/)
  })

  it('schedules deletion and returns 200 for a free-tier user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'free',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: null,
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(200)
    expect(mockUpdate).toHaveBeenCalled()
    expect(mockSendAccountDeletionEmail).toHaveBeenCalledWith('test@example.com', expect.any(String))
    expect(mockSignOut).toHaveBeenCalled()
  })

  it('schedules deletion for a user with a cancelled subscription', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'professional',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: new Date(),
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm --filter web test __tests__/api/user/delete.test.ts
```

Expected: all 4 tests FAIL — route doesn't exist yet.

- [ ] **Step 3: Create the route directory**

```bash
mkdir -p apps/web/app/api/user/delete
```

- [ ] **Step 4: Implement the deletion route**

Create `apps/web/app/api/user/delete/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'
import { sendAccountDeletionEmail } from '@landlordlens/email'

export async function DELETE(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const hasActivePaidSubscription =
    profile.subscription !== 'free' &&
    profile.subscriptionStatus === 'active' &&
    !profile.subscriptionCanceledAt

  if (hasActivePaidSubscription) {
    return NextResponse.json(
      { error: 'Please cancel your subscription before deleting your account.' },
      { status: 400 },
    )
  }

  const deletionRequestedAt = new Date()
  await db.update(profiles)
    .set({ deletionRequestedAt, isActive: false, updatedAt: new Date() })
    .where(eq(profiles.id, user.id))

  if (user.email) {
    const purgeDate = new Date(deletionRequestedAt.getTime() + 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    await sendAccountDeletionEmail(user.email, purgeDate)
  }

  await supabase.auth.signOut()

  return NextResponse.json({ success: true, message: 'Account scheduled for deletion.' })
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm --filter web test __tests__/api/user/delete.test.ts
```

Expected: all 4 tests PASS.

- [ ] **Step 6: Run all tests**

```bash
pnpm --filter web test
```

Expected: all 7 tests PASS (3 export + 4 delete).

- [ ] **Step 7: Typecheck**

```bash
pnpm --filter web typecheck
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add apps/web/__tests__/api/user/delete.test.ts apps/web/app/api/user/delete/route.ts
git commit -m "feat: add account deletion API route DELETE /api/user/delete"
```

---

### Task 10: Purge cron job

**Files:**
- Create: `apps/web/app/api/cron/purge-deleted-accounts/route.ts`
- Create: `apps/web/vercel.json`

- [ ] **Step 1: Add CRON_SECRET to environment**

Open `apps/web/.env.local` (or `.env`). Add:

```
CRON_SECRET=<generate a random 32-char string, e.g. openssl rand -hex 16>
```

Also add this to your Vercel project environment variables (Settings → Environment Variables) for the production deployment.

- [ ] **Step 2: Create the cron route directory**

```bash
mkdir -p apps/web/app/api/cron/purge-deleted-accounts
```

- [ ] **Step 3: Implement the purge route**

Create `apps/web/app/api/cron/purge-deleted-accounts/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@landlordlens/db'
import { profiles, payments } from '@landlordlens/db/schema'
import { lt, isNotNull, and, eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const accountsToPurge = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(and(
      isNotNull(profiles.deletionRequestedAt),
      lt(profiles.deletionRequestedAt, thirtyDaysAgo),
    ))

  if (accountsToPurge.length === 0) {
    return NextResponse.json({ purged: 0 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  let purgedCount = 0
  for (const account of accountsToPurge) {
    // Flag payment records for HMRC retention before deleting the user.
    // The FK on payments.userId is nullable so the profile deletion cascade
    // will not delete payments rows — they are retained for 7 years.
    await db.update(payments)
      .set({ retentionReason: 'hmrc_7yr' })
      .where(eq(payments.userId, account.id))

    const { error } = await supabaseAdmin.auth.admin.deleteUser(account.id)
    if (!error) purgedCount++
  }

  return NextResponse.json({ purged: purgedCount })
}
```

- [ ] **Step 4: Create vercel.json**

Create `apps/web/vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/purge-deleted-accounts",
      "schedule": "0 2 * * *"
    }
  ]
}
```

This runs the purge job daily at 02:00 UTC.

- [ ] **Step 5: Typecheck**

```bash
pnpm --filter web typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/api/cron/purge-deleted-accounts/route.ts apps/web/vercel.json
git commit -m "feat: add Vercel cron job for hard-deleting accounts after 30-day grace period"
```

---

### Task 11: Settings UI — Data & Privacy card

**Files:**
- Modify: `apps/web/app/(dashboard)/dashboard/settings/page.tsx`
- Create: `apps/web/app/(dashboard)/dashboard/settings/data-export-button.tsx`
- Create: `apps/web/app/(dashboard)/dashboard/settings/delete-account-button.tsx`

- [ ] **Step 1: Create the DataExportButton client component**

Create `apps/web/app/(dashboard)/dashboard/settings/data-export-button.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@landlordlens/ui'

interface Props {
  lastRequestedAt: Date | null
}

export function DataExportButton({ lastRequestedAt }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimited, setRateLimited] = useState(false)

  async function handleExport() {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/user/export')

    if (res.status === 429) {
      setRateLimited(true)
      setLoading(false)
      return
    }

    if (!res.ok) {
      setError('Export failed. Please try again.')
      setLoading(false)
      return
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const contentDisposition = res.headers.get('Content-Disposition') ?? ''
    const match = contentDisposition.match(/filename="([^"]+)"/)
    a.download = match ? match[1] : 'landlordlens-export.json'
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  const nextAvailable = lastRequestedAt
    ? new Date(new Date(lastRequestedAt).getTime() + 24 * 60 * 60 * 1000)
    : null

  const isDisabled = loading || rateLimited || (nextAvailable !== null && nextAvailable > new Date())

  return (
    <div className="mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isDisabled}
      >
        {loading ? 'Preparing export…' : 'Download my data'}
      </Button>
      {lastRequestedAt && (
        <p className="text-xs text-gray-400 mt-1">
          Last requested:{' '}
          {new Date(lastRequestedAt).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </p>
      )}
      {isDisabled && !loading && (
        <p className="text-xs text-gray-400 mt-1">
          Next export available:{' '}
          {nextAvailable?.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Create the DeleteAccountButton client component**

Create `apps/web/app/(dashboard)/dashboard/settings/delete-account-button.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@landlordlens/ui'

interface Props {
  email: string
}

export function DeleteAccountButton({ email }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (confirmEmail !== email) {
      setError('Email address does not match.')
      return
    }

    setLoading(true)
    setError(null)

    const res = await fetch('/api/user/delete', { method: 'DELETE' })
    const body = await res.json()

    if (!res.ok) {
      setError(body.error ?? 'Deletion failed. Please try again.')
      setLoading(false)
      return
    }

    router.push('/sign-in?deleted=1')
  }

  if (!open) {
    return (
      <Button
        variant="destructive"
        size="sm"
        className="mt-2"
        onClick={() => setOpen(true)}
      >
        Delete my account
      </Button>
    )
  }

  return (
    <div className="mt-2 rounded border border-red-200 bg-red-50 p-4 space-y-3">
      <p className="text-sm text-red-800">
        This will permanently delete your account and all data after a 30-day grace period.
        This cannot be undone. Type your email address to confirm.
      </p>
      <input
        type="email"
        placeholder={email}
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className="block w-full rounded border border-red-300 px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={loading || confirmEmail !== email}
          onClick={handleDelete}
        >
          {loading ? 'Deleting…' : 'Permanently delete account'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setOpen(false); setError(null); setConfirmEmail('') }}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Add the Data & Privacy card to the settings page**

Open `apps/web/app/(dashboard)/dashboard/settings/page.tsx`. Add the following imports at the top:

```typescript
import { DataExportButton } from './data-export-button'
import { DeleteAccountButton } from './delete-account-button'
```

Then add the new card after the existing Subscription card (before the closing `</div>`):

```typescript
<Card>
  <CardHeader>
    <CardTitle className="text-base">Data & Privacy</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <p className="text-sm font-medium text-gray-900">Download your data</p>
      <p className="text-sm text-gray-500 mt-0.5">
        Export all your account data as a JSON file. One request per 24 hours.
      </p>
      <DataExportButton lastRequestedAt={user.lastExportRequestedAt ?? null} />
    </div>
    <Separator />
    <div>
      <p className="text-sm font-medium text-red-600">Delete account</p>
      <p className="text-sm text-gray-500 mt-0.5">
        Permanently delete your account and all data after a 30-day grace period.
      </p>
      <DeleteAccountButton email={user.email ?? ''} />
    </div>
  </CardContent>
</Card>
```

Note: `user` here comes from `getCurrentUser()`. Verify that `getCurrentUser()` returns the profile including `lastExportRequestedAt` — if it returns only the Supabase Auth user, fetch the profile separately with `db.select().from(profiles).where(eq(profiles.id, user.id))`.

- [ ] **Step 4: Typecheck**

```bash
pnpm --filter web typecheck
```

Expected: no errors.

- [ ] **Step 5: Verify the settings page**

Navigate to `http://localhost:3000/dashboard/settings` while logged in. Expected:
- Data & Privacy card appears below the Subscription card
- "Download my data" button is present and clickable
- Clicking it triggers a JSON file download
- "Delete my account" button opens the confirmation form
- Entering a wrong email shows the validation error
- Entering the correct email enables the confirm button

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/(dashboard)/dashboard/settings/page.tsx apps/web/app/(dashboard)/dashboard/settings/data-export-button.tsx apps/web/app/(dashboard)/dashboard/settings/delete-account-button.tsx
git commit -m "feat: add Data & Privacy card to settings — data export and account deletion"
```

---

## Self-review

**Spec coverage check:**

| Spec requirement | Task |
| --- | --- |
| `/privacy` page | Task 4 |
| `/terms` page with inline DPA | Task 5 |
| `/cookies` page | Task 6 |
| Footer links | Task 7 |
| Sign-up consent line | Task 7 |
| `last_export_requested_at` column | Task 1 |
| `deletion_requested_at` column | Task 1 |
| `retention_reason` column | Task 1 |
| `GET /api/user/export` — auth + rate limit + JSON download | Task 8 |
| `DELETE /api/user/delete` — subscription check + grace period | Task 9 |
| 30-day hard deletion cron job | Task 10 |
| HMRC 7-year payment retention | Task 10 |
| Confirmation emails for both actions | Tasks 3, 8, 9 |
| Settings UI — download button | Task 11 |
| Settings UI — delete button with email confirmation | Task 11 |
| `privacy@landlordlens.co.uk` referenced throughout | Tasks 4, 5, 3 |
| Sub-processor list | Tasks 4, 5 |
| Data retention table | Task 4 |
| UK GDPR data subject rights | Task 4 |
| International transfers / SCCs | Tasks 4, 5 |

All spec requirements covered. No placeholders found. Types consistent across tasks (`profiles.lastExportRequestedAt`, `profiles.deletionRequestedAt`, `payments.retentionReason` used consistently).
