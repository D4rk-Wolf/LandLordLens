# LandLordLens — GDPR Compliance Design

**Date:** 2026-05-19  
**Author:** Connor Simmons  
**Status:** Approved

---

## Context

LandLordLens is a UK property management SaaS for landlords. It processes two categories of personal data:

1. **Landlord account data** — D4rkwolf Industries is the **data controller**
2. **Tenant data entered by landlords** — landlords are the **data controllers**, D4rkwolf Industries is the **data processor**

The app is pre-launch. Before the first user signs up, UK GDPR requires published legal pages, a Data Processing Agreement (DPA) with users, and mechanisms for data subjects to exercise their rights.

Tenants do not have platform accounts at launch. All tenant data is entered by landlords. Tenant portal is out of scope.

**Contact for data requests:** privacy@landlordlens.co.uk

**Sub-processors:**
| Processor | Role | Location |
| --- | --- | --- |
| Supabase | Database + file storage | EU (Ireland) + US |
| Stripe | Payment processing | US |
| Resend | Transactional email | US |
| Sentry | Error monitoring (PII disabled) | US |

---

## Scope

### In scope
- Sub-project 1: Legal pages (`/privacy`, `/terms`, `/cookies`)
- Sub-project 2: Data subject rights (export + account deletion)
- Footer links and sign-up page consent line

### Out of scope
- Cookie consent banner (all cookies are strictly necessary — no banner required)
- Tenant portal or tenant-facing data rights
- ICO registration (owner action)
- `privacy@landlordlens.co.uk` inbox setup (owner action)
- Marketing consent or email preferences

---

## Sub-project 1 — Legal Pages

### 1.1 Privacy Policy (`/privacy`)

**Covers:** LandLordLens as data controller for landlord account data only.

**Sections:**

**Who we are**
D4rkwolf Industries, operating LandLordLens at landlordlens.co.uk. Contact: privacy@landlordlens.co.uk.

**Data we collect about you (landlords)**
- Email address and name (account registration via Supabase Auth)
- Subscription and billing status (via Stripe — we store customer ID and subscription ID only; full payment data held by Stripe)
- IP address (captured in audit logs for security purposes)
- Usage data via error monitoring (Sentry — PII disabled at source)

**Data you enter about third parties (tenants)**
Landlords are the data controllers for all tenant data entered into the platform. LandLordLens processes this data only on the landlord's instructions as a data processor. See Section 9 (DPA) of the Terms of Service for full details. Landlords are responsible for informing their tenants how their data is used.

**Lawful basis**
- Account and subscription data: performance of a contract (Article 6(1)(b))
- Audit logs and IP addresses: legitimate interests — security and fraud prevention (Article 6(1)(f))

**Sub-processors**
Full list: Supabase, Stripe, Resend, Sentry — with role and data location for each.

**Data retention**
| Data | Retention period |
| --- | --- |
| Landlord profile and account data | Duration of subscription + 30 days after account deletion |
| Payment records | 7 years (HMRC legal requirement) |
| Audit logs and IP addresses | 12 months |
| All other platform data (properties, tenancies, documents) | 30 days after account deletion |

**Your rights (UK GDPR)**
Right to access, rectification, erasure, restriction of processing, data portability, and objection. Exercise rights via privacy@landlordlens.co.uk. Right to lodge a complaint with the ICO (ico.org.uk).

**International transfers**
Sub-processors Stripe, Resend, and Sentry are US-based. Transfers are covered by Standard Contractual Clauses. Supabase stores primary data in the EU (Ireland).

**Changes to this policy**
Users notified by email of material changes. Continued use after 30 days constitutes acceptance.

---

### 1.2 Terms of Service (`/terms`)

**Covers:** Subscription agreement for landlords, plus an inline Data Processing Agreement.

**Sections:**

**1. The service**
LandLordLens is a property management tool for UK residential landlords. Access is by subscription. Free tier is available indefinitely. Paid tiers billed monthly or annually via Stripe.

**2. Account**
One account per user. User is responsible for maintaining credential security. Accounts may not be shared or transferred.

**3. Acceptable use**
Platform may only be used for lawful property management. No entering false tenant data, no using the platform for discrimination or harassment, no automated scraping.

**4. Subscription and billing**
Tiers: Free, Professional (£12/mo), Business (£29/mo), Enterprise (£99/mo). Annual billing saves 2 months. Prices in GBP, VAT may apply. Cancellation takes effect at end of billing period.

**5. Intellectual property**
All platform IP belongs to D4rkwolf Industries. User retains ownership of all data they enter.

**6. Limitation of liability**
Service provided as-is. D4rkwolf Industries not liable for landlord's failure to comply with UK housing law, loss of data due to user error, or third-party sub-processor outages. Liability capped at 3 months' subscription fees paid.

**7. Termination**
Either party may terminate. On termination, account data deleted after 30-day grace period (excluding payment records retained 7 years per HMRC).

**8. Governing law**
English law. Disputes subject to exclusive jurisdiction of England and Wales courts.

**9. Data Processing Agreement (inline)**

> *This section constitutes a legally binding DPA between the landlord (Controller) and D4rkwolf Industries (Processor) under UK GDPR Article 28.*

- **Subject matter:** Processing of tenant personal data entered by the landlord into LandLordLens
- **Duration:** Duration of the Terms of Service agreement
- **Nature of processing:** Storage, retrieval, organisation, and display of tenant data on landlord's instruction
- **Purpose:** UK residential property management and legal compliance
- **Data categories:** Names, contact details, dates of birth, identity document details and copies, financial data (rent, deposits), background check results, tenancy records
- **Data subjects:** Tenants and prospective tenants of the landlord

**Controller obligations:** Landlord warrants they have a lawful basis under UK GDPR for entering each category of tenant data. Landlord is responsible for providing tenants with a privacy notice. Landlord must handle any tenant Subject Access Requests relating to data the landlord entered.

**Processor obligations:** D4rkwolf Industries will process tenant data only on documented landlord instructions; ensure data is protected by appropriate technical and organisational measures; not engage additional sub-processors without notification; assist the landlord in meeting data subject rights obligations; delete or return all tenant data upon account termination.

**Sub-processors:** Supabase (storage), Stripe (billing — does not process tenant data), Resend (email — tenant invite emails only if landlord uses that feature), Sentry (error monitoring — PII disabled).

**International transfers:** Covered by Standard Contractual Clauses with each sub-processor.

**Security:** Data encrypted at rest and in transit. Access controlled by authentication. Audit logging enabled.

---

### 1.3 Cookie Policy (`/cookies`)

**Covers:** All cookies set by landlordlens.co.uk.

**Cookie inventory:**
| Cookie | Purpose | Type | Expiry |
| --- | --- | --- | --- |
| `sb-*` (Supabase) | Authentication session tokens | Strictly necessary | Session / 1 week |
| Stripe cookies | Payment processing session state | Strictly necessary | Session |

No analytics, marketing, or preference cookies are set. No cookie consent banner is required as all cookies are strictly necessary for the service to function.

**Managing cookies:** Cookies can be blocked via browser settings, but blocking strictly necessary cookies will prevent login.

---

### 1.4 Footer and Sign-up Links

**Footer** (all pages): add links to Privacy Policy, Terms of Service, Cookie Policy alongside existing footer content.

**Sign-up page** (`/sign-up`): add a line below the submit button:

> "By creating an account you agree to our [Terms of Service] and [Privacy Policy]."

Both words link to their respective pages. No checkbox required — this is the standard "browsewrap" notice sufficient for UK SaaS.

---

## Sub-project 2 — Data Subject Rights

### 2.1 Data Export — `GET /api/user/export`

**Purpose:** Fulfils UK GDPR Article 20 right to data portability.

**Auth:** Requires valid Supabase session. Returns 401 if unauthenticated.

**Rate limit:** One request per authenticated user per 24 hours. Returns 429 with `Retry-After` header if exceeded. Timestamp of last request stored in `profiles.last_export_requested_at` (new column).

**Response:** JSON file download with `Content-Disposition: attachment; filename="landlordlens-data-{userId:0-8}-{YYYY-MM-DD}.json"`

**Export contents:**
```
{
  "exported_at": "<ISO timestamp>",
  "profile": { id, name, role, createdAt, subscriptionTier },
  "properties": [ ...all properties owned by user ],
  "tenancies": [ ...all tenancies linked to user's properties ],
  "right_to_rent": [ ...all records linked to user's tenancies ],
  "background_checks": [ ...all records linked to user's tenancies ],
  "compliance_records": [ ...all records linked to user's properties ],
  "expenses": [ ...all records linked to user's properties ],
  "maintenance_tickets": [ ...all records linked to user's properties ],
  "property_inspections": [ ...all records linked to user's properties ],
  "inventories": [ ...all records linked to user's tenancies ],
  "deposit_protections": [ ...all records linked to user's tenancies ],
  "payments": [ ...all payment records for user ],
  "documents": [ ...metadata only (path, name, category, size) — not file contents ]
}
```

Note: Supabase Storage file contents (identity documents, photos, certificates) are not bundled. The export includes storage paths so the user can identify and request files separately via privacy@landlordlens.co.uk.

**Side effect:** Sends confirmation email via Resend to landlord's email address noting the export was triggered.

---

### 2.2 Account Deletion — `DELETE /api/user/delete`

**Purpose:** Fulfils UK GDPR Article 17 right to erasure.

**Auth:** Requires valid Supabase session.

**Pre-condition check:** If landlord has an active paid subscription (not Free tier, not cancelled), return 400 with message directing user to cancel their subscription first. This prevents payment disputes and ensures Stripe billing is cleanly terminated before data removal.

**Flow:**
1. Mark `profiles.deletion_requested_at` = now (new column)
2. Mark `profiles.isActive` = false (account locked immediately)
3. Send confirmation email to landlord: "Your account will be permanently deleted on {date + 30 days}. To cancel, email privacy@landlordlens.co.uk before that date."
4. A scheduled job (Supabase pg_cron or equivalent) runs daily and hard-deletes any profile where `deletion_requested_at` is older than 30 days:
   - Delete from Supabase Auth (`auth.users`)
   - Cascade deletes all owned data via existing FK constraints
   - Exception: `payments` rows are retained for 7 years (HMRC) with `user_id` nullified and a `retention_reason = 'hmrc_7yr'` flag

**Cancellation window:** During 30-day grace period, the locked account can be reinstated by emailing privacy@landlordlens.co.uk (manual process, no UI needed at this stage).

---

### 2.3 Account Settings UI

New "Data & Privacy" card in `/dashboard/settings`.

**Download my data**
- Button: "Download my data"
- On click: calls `GET /api/user/export`, browser downloads the JSON file
- Below button: "Last requested: {date}" if a prior export exists, or "Never" if not
- If rate limited: button disabled, shows "You can request another export on {date}"

**Delete my account**
- Button: "Delete my account" (destructive styling)
- On click: opens confirmation modal
- Modal requires user to type their email address to confirm
- On confirm: calls `DELETE /api/user/delete`
- Success: redirect to `/sign-in` with a message "Your account has been scheduled for deletion."
- If active subscription: modal shows error "Please cancel your subscription before deleting your account" with a link to billing settings

---

## Schema Changes

Two new columns on `profiles`:

```sql
ALTER TABLE profiles
  ADD COLUMN last_export_requested_at TIMESTAMPTZ,
  ADD COLUMN deletion_requested_at TIMESTAMPTZ;
```

One new column on `payments` for retention tracking:

```sql
ALTER TABLE payments
  ADD COLUMN retention_reason TEXT;
```

---

## File Structure

```
apps/web/app/
├── privacy/
│   └── page.tsx                          # Privacy Policy page
├── terms/
│   └── page.tsx                          # Terms of Service + DPA page
├── cookies/
│   └── page.tsx                          # Cookie Policy page
├── api/
│   └── user/
│       ├── export/
│       │   └── route.ts                  # GET /api/user/export
│       └── delete/
│           └── route.ts                  # DELETE /api/user/delete
└── dashboard/
    └── settings/
        └── (existing settings page)      # Add Data & Privacy card

packages/db/src/schema/
└── profiles.ts                           # Add last_export_requested_at, deletion_requested_at

packages/db/src/migrations/
└── XXXX_gdpr_columns.sql                 # Migration for new columns
```

---

## Owner Pre-Launch Actions (Not Code)

1. **Register with the ICO** at ico.org.uk/registration — required before first user signs up. ~£40/year for small organisations.
2. **Create and monitor `privacy@landlordlens.co.uk`** — must be a real inbox before the privacy policy is published.
