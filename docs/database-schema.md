# LandLordLens — Database Schema

All tables live in the default `public` schema of a Supabase PostgreSQL database. The application connects via a direct postgres URL (bypassing Supabase RLS) so **all tenant isolation is enforced in the application layer** — every query includes a `userId` filter.

Schema is managed by Drizzle ORM. Migration files live in `packages/db/src/migrations/`. Never use `drizzle-kit push` in production — always `pnpm db:generate` then `pnpm db:migrate`.

---

## `profiles`

Mirrors `auth.users` from Supabase Auth. Created automatically by a database trigger when a new user signs up.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | — | Same UUID as `auth.users.id` |
| `name` | text | null | Display name |
| `role` | text | `'landlord'` | `'landlord'` \| `'admin'` \| `'tenant'` |
| `is_active` | boolean | `true` | Account active flag |
| `subscription` | text | `'free'` | `'free'` \| `'professional'` \| `'business'` \| `'enterprise'` |
| `subscription_status` | text | `'active'` | `'active'` \| `'canceled'` \| `'past_due'` \| `'trialing'` \| `'incomplete'` |
| `subscription_period` | text | null | `'monthly'` \| `'yearly'` |
| `subscription_start_date` | timestamptz | null | When the current subscription started |
| `subscription_end_date` | timestamptz | null | When the subscription expires or was cancelled |
| `subscription_canceled_at` | timestamptz | null | Cancellation timestamp |
| `stripe_customer_id` | text | null | Stripe customer object ID |
| `stripe_subscription_id` | text | null | Active Stripe subscription ID |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

**Important:** Subscription columns are written exclusively by the Stripe webhook handler. Never update them directly.

To promote a user to admin:
```sql
UPDATE profiles SET role = 'admin' WHERE id = '<supabase-user-uuid>';
```

---

## `properties`

Core property record — the central entity in the data model. Every other table references this.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `user_id` | uuid FK→profiles | — | Owning landlord |
| `address` | jsonb | — | `{ line1, line2?, city, postcode, county?, country }` |
| `property_type` | text | — | `'house'` \| `'flat'` \| `'apartment'` \| `'bungalow'` \| `'other'` |
| `bedrooms` | integer | — | |
| `bathrooms` | integer | 1 | |
| `rent_amount` | numeric(10,2) | null | Listed rent (not same as active tenancy rent) |
| `purchase_price` | numeric(10,2) | null | |
| `purchase_date` | date | null | |
| `status` | text | `'vacant'` | `'vacant'` \| `'occupied'` \| `'maintenance'` |
| `availability_status` | text | `'ready_for_rent'` | `'free'` \| `'for_sale'` \| `'ready_for_rent'` \| `'rented'` \| `'not_available'` |
| `region` | text | `'england'` | `'england'` \| `'wales'` \| `'scotland'` \| `'northern_ireland'` |
| `compliance` | jsonb | `{}` | Legacy blob — superseded by `compliance_records` table |
| `financials` | jsonb | `{}` | Legacy blob — superseded by `expenses` table |
| `furnished` | boolean | false | |
| `allows_pets` | boolean | false | |
| `allows_smoking` | boolean | false | |
| `mortgage_consent_obtained` | boolean | false | Consent to let from mortgage lender |
| `mortgage_consent_date` | date | null | |
| `mortgage_consent_expiry` | date | null | |
| `epc_rating` | text | null | `'A'` through `'G'`. Min C required from 2030. |
| `epc_expiry_date` | date | null | EPC certificates are valid for 10 years |
| `current_value` | numeric(12,2) | null | Current estimated market value |
| `mortgage_balance` | numeric(12,2) | null | Outstanding mortgage balance |
| `mortgage_rate` | numeric(5,4) | null | Annual interest rate as decimal (e.g. 0.0425 = 4.25%) |
| `mortgage_monthly_payment` | numeric(10,2) | null | |
| `prs_registration_number` | text | null | Scotland/Wales private rented sector registration |
| `hmo_license_number` | text | null | HMO licence number (mandatory for 5+ occupants) |
| `hmo_license_expiry` | date | null | |
| `notes` | text | null | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `tenancies`

Tenancy agreements linking a property to a tenant.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | — | |
| `user_id` | uuid FK→profiles | — | Owning landlord |
| `tenant_name` | text | — | |
| `tenant_email` | text | — | |
| `tenant_phone` | text | null | |
| `start_date` | date | — | |
| `end_date` | date | null | null = ongoing periodic tenancy |
| `monthly_rent` | numeric(10,2) | — | |
| `deposit` | numeric(10,2) | null | |
| `deposit_protected` | boolean | false | Whether deposit is in a government scheme |
| `tenancy_type` | text | `'periodic_assured'` | `'periodic_assured'` \| `'assured'` \| `'short_assured'` \| `'fixed_term'` \| `'protected'` |
| `status` | text | `'active'` | `'active'` \| `'ended'` \| `'pending'` |
| `rent_review_date` | date | null | |
| `last_rent_increase` | jsonb | null | History for Section 13 2-month notice verification |
| `section13_notice_served` | boolean | false | Rent increase notice under Section 13 |
| `section13_notice_date` | date | null | |
| `how_to_rent_guide_provided` | boolean | false | Prescribed information obligation |
| `how_to_rent_guide_date` | date | null | |
| `tenant_information_pack_provided` | boolean | false | Scotland/Wales equivalent |
| `tenant_information_pack_date` | date | null | |
| `rent_book_provided` | boolean | false | |
| `right_to_rent_checked` | boolean | false | Immigration Act 2014 check |
| `notes` | text | null | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

**Note:** Default `tenancy_type = 'periodic_assured'` reflects the Renters' Rights Act 2025/2026 which abolished fixed-term assured shorthold tenancies. The Section 13 notice and How to Rent flags are checked by the Section 8 wizard as prerequisites for certain grounds of possession.

---

## `compliance_records`

Regulatory compliance certificates — one row per certificate.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | — | |
| `user_id` | uuid FK→profiles | — | |
| `compliance_type` | text | — | `'gas_safety'` \| `'epc'` \| `'electrical'` \| `'fire_safety'` \| `'hmo_license'` \| `'legionella'` \| `'pat_testing'` \| `'smoke_alarm'` \| `'carbon_monoxide_alarm'` \| `'landlord_registration'` \| `'rent_smart_wales'` \| `'other'` |
| `region` | text | `'all'` | Jurisdiction the certificate applies to |
| `certificate_number` | text | null | |
| `issue_date` | date | — | |
| `expiry_date` | date | — | Used to compute green/amber/red status |
| `issuer` | text | null | Company or engineer name |
| `served_to_tenant_date` | date | null | When a copy was given to the tenant — required for Section 8 eligibility |
| `notes` | text | null | |
| `documents` | jsonb | `[]` | Array of Supabase Storage paths |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `deposit_protections`

Deposit protection scheme records per tenancy.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `tenancy_id` | uuid FK→tenancies | — | |
| `user_id` | uuid FK→profiles | — | |
| `deposit_amount` | numeric(10,2) | — | |
| `scheme` | text | — | `'dps'` \| `'mydeposits'` \| `'tds'` \| `'lps_scotland'` \| `'safedeposits_scotland'` \| `'mydeposits_scotland'` \| `'tds_ni'` \| `'mydeposits_ni'` \| `'lps_ni'` |
| `protection_reference` | text | — | Scheme reference number |
| `protected_date` | date | — | When deposit was lodged with the scheme |
| `protection_deadline` | date | null | 30 days from receipt (Housing Act 2004) |
| `prescribed_info_served_date` | date | null | When prescribed information was given to tenant |
| `prescribed_info_serving_deadline` | date | null | 30 days from receipt |
| `status` | text | `'protected'` | `'protected'` \| `'returned'` \| `'disputed'` \| `'forfeited'` |
| `return_date` | date | null | |
| `return_amount` | numeric(10,2) | null | |
| `notes` | text | null | |
| `documents` | jsonb | `[]` | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `expenses`

Income and expense records for HMRC self-assessment. Despite the name, `type` can be `'income'` or `'expense'`.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | null | Optional — portfolio-level records have no property |
| `tenancy_id` | uuid FK→tenancies | null | Optional link to a specific tenancy |
| `user_id` | uuid FK→profiles | — | |
| `type` | text | — | `'income'` \| `'expense'` |
| `category` | text | — | User-defined label (e.g. "Repairs", "Rent received") |
| `amount` | numeric(10,2) | — | |
| `currency` | text | `'GBP'` | |
| `date` | date | — | Transaction date |
| `description` | text | — | |
| `supplier` | text | null | |
| `invoice_number` | text | null | |
| `is_tax_deductible` | boolean | true | |
| `hmrc_category` | text | `'not_categorised'` | HMRC SA105 property income category — see API reference for enum values |
| `vat_amount` | numeric(10,2) | null | |
| `payment_method` | text | null | `'bank_transfer'` \| `'card'` \| `'cash'` \| `'cheque'` \| `'other'` |
| `receipt` | jsonb | null | Receipt metadata |
| `notes` | text | null | |
| `tax_year` | text | null | Format `"YYYY-YY"` (e.g. `"2025-26"`) |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `maintenance_tickets`

Repair and maintenance requests, tracked from open through to completion.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | — | |
| `user_id` | uuid FK→profiles | — | |
| `title` | text | — | Short description of the issue |
| `description` | text | — | Full details |
| `priority` | text | `'medium'` | `'low'` \| `'medium'` \| `'high'` \| `'urgent'` |
| `status` | text | `'open'` | `'open'` \| `'in_progress'` \| `'completed'` \| `'cancelled'` |
| `reported_by` | text | null | Name of person who reported the issue |
| `assigned_to` | text | null | Name of contractor or engineer |
| `cost` | numeric(10,2) | null | Final repair cost |
| `completed_date` | date | null | |
| `notes` | text | null | |
| `images` | jsonb | `[]` | Array of Supabase Storage paths |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `maintenance_events`

Immutable audit trail for each ticket. Cascades on ticket delete.

| Column | Type | Description |
|---|---|---|
| `id` | uuid PK | |
| `ticket_id` | uuid FK→maintenance_tickets (cascade) | |
| `user_id` | uuid FK→profiles | User who triggered the event |
| `event_type` | text | `'created'` \| `'status_changed'` \| `'assigned'` \| `'note_added'` \| `'cost_updated'` \| `'completed'` \| `'cancelled'` |
| `description` | text | Human-readable description of the change |
| `metadata` | jsonb | Structured data about the event (e.g. old/new status) |
| `created_at` | timestamptz | |

This log is included in the Ombudsman Vault audit pack export as evidence of responsive repairs management.

---

## `property_inspections`

Scheduled and completed property inspections.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | — | |
| `tenancy_id` | uuid FK→tenancies | null | Optional link to a tenancy |
| `user_id` | uuid FK→profiles | — | |
| `inspection_type` | text | — | `'routine'` \| `'check_in'` \| `'check_out'` \| `'maintenance'` \| `'compliance'` \| `'complaint'` |
| `scheduled_date` | date | — | |
| `actual_date` | date | null | When the inspection actually took place |
| `conducted_by` | text | — | |
| `tenant_present` | boolean | false | |
| `status` | text | `'scheduled'` | `'scheduled'` \| `'completed'` \| `'cancelled'` \| `'rescheduled'` |
| `items` | jsonb | `[]` | Inspection checklist items |
| `issues` | jsonb | `[]` | Issues found during inspection |
| `overall_condition` | text | null | `'excellent'` \| `'good'` \| `'fair'` \| `'poor'` |
| `issues_found` | boolean | false | |
| `notes` | text | null | |
| `photos` | jsonb | `[]` | Array of Supabase Storage paths |
| `next_inspection_due` | date | null | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `inventories`

Property inventory records for check-in, check-out, and interim inspections.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties | — | |
| `tenancy_id` | uuid FK→tenancies | null | |
| `user_id` | uuid FK→profiles | — | |
| `type` | text | — | `'check_in'` \| `'check_out'` \| `'interim'` |
| `date` | date | — | |
| `conducted_by` | text | — | |
| `tenant_present` | boolean | false | |
| `items` | jsonb | `[]` | Room-by-room inventory items with condition ratings |
| `overall_condition` | text | null | `'excellent'` \| `'good'` \| `'fair'` \| `'poor'` |
| `notes` | text | null | |
| `photos` | jsonb | `[]` | |
| `signed_by` | jsonb | `{}` | Signatures metadata |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `documents`

Metadata for files stored in Supabase Storage. Actual files are not stored in the database.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `property_id` | uuid FK→properties (cascade) | null | |
| `user_id` | uuid FK→profiles | — | |
| `name` | text | — | Display name of the document |
| `category` | text | `'other'` | `'compliance'` \| `'tenancy'` \| `'legal'` \| `'financial'` \| `'inspection'` \| `'other'` |
| `storage_path` | text | — | Path within Supabase Storage bucket |
| `mime_type` | text | null | |
| `size_bytes` | integer | null | |
| `created_at` | timestamptz | now() | |

---

## `right_to_rent`

Right to Rent check records (Immigration Act 2014).

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `tenancy_id` | uuid FK→tenancies | — | |
| `user_id` | uuid FK→profiles | — | |
| `tenant_name` | text | — | |
| `tenant_date_of_birth` | date | — | |
| `document_type` | text | — | `'uk_passport'` \| `'eu_passport'` \| `'biometric_residence_permit'` \| `'birth_certificate'` \| `'driving_licence'` \| `'other'` |
| `document_number` | text | — | |
| `expiry_date` | date | null | For time-limited right to remain |
| `check_date` | date | — | When the check was performed |
| `checked_by` | text | — | |
| `status` | text | `'pending'` | `'passed'` \| `'failed'` \| `'pending'` \| `'expired'` |
| `notes` | text | null | |
| `documents` | jsonb | `[]` | Copies of identity documents |
| `follow_up_required` | boolean | false | For time-limited right to remain that needs re-checking |
| `follow_up_date` | date | null | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `tenant_background_checks`

Tenant referencing records.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `tenancy_id` | uuid FK→tenancies | — | |
| `user_id` | uuid FK→profiles | — | |
| `tenant_name` | text | — | |
| `check_date` | date | — | |
| `credit_check` | jsonb | `{ performed: false }` | Credit check results |
| `employment_check` | jsonb | `{ performed: false }` | Employment verification results |
| `previous_landlord_reference` | jsonb | `{ performed: false }` | Reference from previous landlord |
| `criminal_record_check` | jsonb | `{ performed: false }` | Criminal record check results |
| `overall_status` | text | `'pending'` | `'approved'` \| `'rejected'` \| `'conditional'` \| `'pending'` |
| `notes` | text | null | |
| `documents` | jsonb | `[]` | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `payments`

Platform payment records (Stripe payments). Updated by the Stripe webhook.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | uuid PK | random | |
| `user_id` | uuid FK→profiles | — | |
| `stripe_payment_intent_id` | text | null | |
| `stripe_charge_id` | text | null | |
| `stripe_subscription_id` | text | null | |
| `amount` | numeric(10,2) | — | |
| `currency` | text | `'GBP'` | |
| `status` | text | `'pending'` | `'pending'` \| `'succeeded'` \| `'failed'` \| `'refunded'` \| `'canceled'` |
| `payment_type` | text | null | `'subscription'` \| `'one_time'` |
| `description` | text | null | |
| `metadata` | jsonb | `{}` | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

---

## `audit_log`

Platform-level audit log for admin observability. Distinct from `maintenance_events` (which is a per-ticket log).

| Column | Type | Description |
|---|---|---|
| `id` | uuid PK | |
| `user_id` | uuid | User who performed the action (no FK constraint — handles deleted users) |
| `action` | text | Description of the action (e.g. `'subscription.upgraded'`) |
| `resource_type` | text | null — type of affected resource (e.g. `'property'`) |
| `resource_id` | uuid | null — ID of affected resource |
| `metadata` | jsonb | null — additional context |
| `ip_address` | text | null |
| `created_at` | timestamptz | |

---

## Entity Relationship Summary

```
profiles (1) ──< properties (many)
properties (1) ──< tenancies
properties (1) ──< compliance_records
properties (1) ──< maintenance_tickets
properties (1) ──< property_inspections
properties (1) ──< inventories
properties (1) ──< expenses (optional)
properties (1) ──< documents (optional)

tenancies (1) ──< deposit_protections
tenancies (1) ──< expenses (optional)
tenancies (1) ──< right_to_rent
tenancies (1) ──< tenant_background_checks
tenancies (1) ──< property_inspections (optional)
tenancies (1) ──< inventories (optional)

maintenance_tickets (1) ──< maintenance_events (cascade delete)

profiles (1) ──< payments
```
