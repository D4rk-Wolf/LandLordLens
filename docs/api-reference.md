# LandLordLens — API Reference

All API calls go through tRPC. Server components call `createServerCaller()` directly; client components use the tRPC React hooks via `/api/trpc`.

Every procedure listed here requires an authenticated session unless otherwise stated. All tenant-scoped data is filtered by `userId` so landlords cannot access each other's data.

---

## Router: `properties`

Manages the landlord's property portfolio.

### `properties.list` — Query

Returns all properties owned by the authenticated landlord, newest first.

**Returns:** `Property[]`

---

### `properties.getById` — Query

Fetches a single property by UUID.

**Input:**
```ts
{ id: string /* UUID */ }
```

**Returns:** `Property`

**Errors:** `NOT_FOUND` if the property doesn't exist or belongs to another user.

---

### `properties.create` — Mutation

Creates a new property. Enforces the subscription tier's property limit before inserting.

**Input:**
```ts
{
  address: {
    line1: string
    line2?: string
    city: string
    county?: string
    postcode: string
    country?: string   // defaults to "United Kingdom"
  }
  propertyType?: 'house' | 'flat' | 'apartment' | 'bungalow' | 'other'  // default: 'house'
  bedrooms?: number    // default: 1
  bathrooms?: number   // default: 1
  rentAmount?: string
  region?: 'england' | 'wales' | 'scotland' | 'northern_ireland'  // default: 'england'
  epcRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  epcExpiryDate?: string
  currentValue?: string
  mortgageBalance?: string
  mortgageRate?: string
  mortgageMonthlyPayment?: string
  prsRegistrationNumber?: string
  hmoLicenseNumber?: string
  hmoLicenseExpiry?: string
  notes?: string
}
```

**Returns:** `Property`

**Errors:** `FORBIDDEN` if the user's subscription tier does not permit more properties.

---

### `properties.update` — Mutation

Partially updates an existing property.

**Input:** All fields from `create` are optional, plus:
```ts
{
  id: string  // UUID (required)
  status?: 'vacant' | 'occupied' | 'maintenance'
}
```

**Returns:** `Property`

**Errors:** `NOT_FOUND` if the property doesn't exist or belongs to another user.

---

## Router: `tenancies`

Manages tenancy agreements linked to properties.

### `tenancies.list` — Query

Returns all tenancies for the landlord, newest first.

**Returns:** `Tenancy[]`

---

### `tenancies.getByProperty` — Query

Returns all tenancies for a specific property.

**Input:** `{ propertyId: string }`

**Returns:** `Tenancy[]`

---

### `tenancies.getById` — Query

Fetches a single tenancy by UUID.

**Input:** `{ id: string }`

**Returns:** `Tenancy`

**Errors:** `NOT_FOUND`

---

### `tenancies.create` — Mutation

Creates a new tenancy agreement.

**Input:**
```ts
{
  propertyId: string
  tenantName: string
  tenantEmail: string         // validated as email
  tenantPhone?: string
  startDate: string           // ISO date string
  endDate?: string
  monthlyRent: string         // decimal string, e.g. "1200.00"
  deposit?: string
  tenancyType?: 'periodic_assured' | 'assured' | 'short_assured' | 'fixed_term' | 'protected'
  // default: 'periodic_assured' (per RRA 2025)
}
```

**Returns:** `Tenancy`

---

### `tenancies.update` — Mutation

Partially updates a tenancy. Used to end a tenancy (`status: 'ended'`), record deposit protection, etc.

**Input:** All create fields optional, plus `id: string` (required) and:
```ts
{
  status?: 'active' | 'ended' | 'pending'
  depositProtected?: boolean
}
```

**Returns:** `Tenancy`

**Errors:** `NOT_FOUND`

---

## Router: `compliance`

Manages UK compliance certificates (Gas Safety, EPC, EICR, HMO, etc.).

### `compliance.list` — Query

Returns all compliance records across the landlord's portfolio, sorted by expiry date (most urgent first).

**Returns:** `ComplianceRecord[]`

---

### `compliance.getByProperty` — Query

Returns compliance records for a single property, ordered by expiry.

**Input:** `{ propertyId: string }`

**Returns:** `ComplianceRecord[]`

---

### `compliance.getById` — Query

**Input:** `{ id: string }`

**Returns:** `ComplianceRecord`

**Errors:** `NOT_FOUND`

---

### `compliance.create` — Mutation

Creates a new compliance certificate record.

**Input:**
```ts
{
  propertyId: string
  complianceType: 'gas_safety' | 'epc' | 'electrical' | 'fire_safety' | 'hmo_license'
    | 'legionella' | 'pat_testing' | 'smoke_alarm' | 'carbon_monoxide_alarm'
    | 'landlord_registration' | 'rent_smart_wales' | 'other'
  region?: 'england' | 'wales' | 'scotland' | 'northern_ireland' | 'all'  // default: 'all'
  certificateNumber?: string
  issueDate: string          // ISO date string
  expiryDate: string         // ISO date string
  issuer?: string
  servedToTenantDate?: string  // required for Section 8 eligibility in some cases
  notes?: string
}
```

**Returns:** `ComplianceRecord`

---

### `compliance.update` — Mutation

Partially updates a compliance record (e.g. on renewal).

**Input:** All create fields optional + `id: string` (required).

**Returns:** `ComplianceRecord`

---

### `compliance.delete` — Mutation

Permanently deletes a compliance record.

**Input:** `{ id: string }`

**Errors:** `NOT_FOUND`

---

## Router: `expenses`

Income and expense records for HMRC self-assessment.

### `expenses.list` — Query

Returns all expense/income records for the landlord, sorted by date descending.

**Returns:** `Expense[]`

---

### `expenses.getByProperty` — Query

**Input:** `{ propertyId: string }`

**Returns:** `Expense[]`

---

### `expenses.getById` — Query

**Input:** `{ id: string }`

**Returns:** `Expense`

---

### `expenses.create` — Mutation

Creates an income or expense record.

**Input:**
```ts
{
  propertyId?: string
  type: 'income' | 'expense'
  category: string                 // user-defined label
  amount: string                   // decimal string
  date: string                     // ISO date
  description: string
  supplier?: string
  isTaxDeductible?: boolean        // default: true
  hmrcCategory?: 'rent_and_other_income' | 'premiums_of_lease_granted' | 'premises_costs'
    | 'repairs_and_maintenance' | 'financial_costs' | 'professional_fees'
    | 'cost_of_services' | 'travel_costs' | 'other_allowable_expenses'
    | 'capital_allowances' | 'residential_finance_costs' | 'not_categorised'
    // default: 'not_categorised'
  taxYear?: string                 // format: "YYYY-YY", e.g. "2025-26"
}
```

**Returns:** `Expense`

---

### `expenses.update` — Mutation

Partially updates an expense record.

**Input:** All create fields optional + `id: string` (required).

---

### `expenses.delete` — Mutation

Permanently deletes a record.

**Input:** `{ id: string }`

---

## Router: `maintenance`

Maintenance ticket management.

### `maintenance.list` — Query

Returns all tickets for the landlord, newest first.

**Returns:** `MaintenanceTicket[]`

---

### `maintenance.getByProperty` — Query

**Input:** `{ propertyId: string }`

**Returns:** `MaintenanceTicket[]`

---

### `maintenance.getById` — Query

**Input:** `{ id: string }`

**Returns:** `MaintenanceTicket`

---

### `maintenance.create` — Mutation

**Input:**
```ts
{
  propertyId: string
  title: string
  description: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'  // default: 'medium'
  reportedBy?: string
}
```

**Returns:** `MaintenanceTicket`

---

### `maintenance.update` — Mutation

**Input:** All create fields optional + `id: string`, plus:
```ts
{
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
  assignedTo?: string
  cost?: string
  completedDate?: string
}
```

**Returns:** `MaintenanceTicket`

---

## Router: `maintenanceEvents`

Immutable audit trail for maintenance ticket status changes.

### `maintenanceEvents.listByTicket` — Query

Returns all events for a ticket in chronological order. Returns `[]` if the ticket doesn't exist or isn't owned by the caller.

**Input:** `{ ticketId: string }`

**Returns:** `MaintenanceEvent[]`

---

### `maintenanceEvents.addEvent` — Mutation

Appends an event to the ticket's audit log.

**Input:**
```ts
{
  ticketId: string
  eventType: 'created' | 'status_changed' | 'assigned' | 'note_added' | 'cost_updated' | 'completed' | 'cancelled'
  description: string
  metadata?: Record<string, unknown>
}
```

**Returns:** `MaintenanceEvent`

**Errors:** `NOT_FOUND` if the ticket doesn't exist or isn't owned by the caller.

---

## Router: `inspections`

Property inspection scheduling and recording.

### `inspections.list` — Query

Returns all inspections, sorted by scheduled date descending.

**Returns:** `PropertyInspection[]`

---

### `inspections.getByProperty` — Query

**Input:** `{ propertyId: string }`

**Returns:** `PropertyInspection[]`

---

### `inspections.getById` — Query

**Input:** `{ id: string }`

**Returns:** `PropertyInspection`

---

### `inspections.create` — Mutation

**Input:**
```ts
{
  propertyId: string
  tenancyId?: string
  inspectionType: 'routine' | 'check_in' | 'check_out' | 'maintenance' | 'compliance' | 'complaint'
  scheduledDate: string
  conductedBy: string
  tenantPresent?: boolean   // default: false
  notes?: string
}
```

**Returns:** `PropertyInspection`

---

### `inspections.update` — Mutation

**Input:** All create fields optional + `id: string`, plus:
```ts
{
  status?: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  actualDate?: string
  overallCondition?: 'excellent' | 'good' | 'fair' | 'poor'
  issuesFound?: boolean
}
```

---

## Router: `documents`

Document metadata management (file upload itself uses Supabase Storage directly).

### `documents.list` — Query

Returns all document metadata records for the landlord, newest first.

**Returns:** `Document[]`

---

### `documents.getByProperty` — Query

**Input:** `{ propertyId: string }`

**Returns:** `Document[]`

---

### `documents.getById` — Query

**Input:** `{ id: string }`

**Returns:** `Document`

---

### `documents.create` — Mutation

Registers metadata for a file that has already been uploaded to Supabase Storage.

**Input:**
```ts
{
  propertyId?: string
  name: string
  category?: 'compliance' | 'tenancy' | 'legal' | 'financial' | 'inspection' | 'other'
  storagePath: string      // path in Supabase Storage
  mimeType?: string
  sizeBytes?: number
}
```

**Returns:** `Document`

---

### `documents.delete` — Mutation

Deletes the document metadata record. Does **not** delete the file from Supabase Storage — that must be done separately.

**Input:** `{ id: string }`

---

## Router: `analytics`

Portfolio-level financial KPIs and tax summaries.

### `analytics.portfolioStats` — Query

Returns top-level portfolio counts for the dashboard overview widget.

**Returns:**
```ts
{ totalProperties: number, totalComplianceRecords: number }
```

---

### `analytics.expensesSummary` — Query

Returns total expenses grouped by user-defined category.

**Returns:** `{ category: string | null, total: string | null }[]`

---

### `analytics.portfolioKPIs` — Query

Computes all financial KPIs in a single call. Numeric columns are fetched as strings from Postgres and parsed with `parseFloat`.

**Returns:**
```ts
{
  annualRentalIncome: number
  annualOperatingExpenses: number
  noi: number                    // Net Operating Income (income - expenses, before mortgage)
  grossYield: number | null      // null when currentValue is 0
  netYield: number | null
  equity: number
  annualCashFlow: number
  cashOnCash: number | null      // null when purchasePrice is 0
  totalCurrentValue: number
  totalMortgageBalance: number
  propertyCount: number
  occupiedCount: number
}
```

---

### `analytics.mtdQuarterlySummary` — Query

Aggregates income and expenses for a UK tax year, grouped by HMRC SA105 categories.

**Input:** `{ taxYear: string }` — format `"YYYY-YY"`, e.g. `"2025-26"`

**Returns:**
```ts
{
  taxYear: string
  totalIncome: number
  expensesByHmrcCategory: Record<string, number>
  uncategorisedCount: number   // expenses still tagged 'not_categorised'
}
```

---

## Router: `billing`

Stripe subscription management.

### `billing.subscription` — Query

Returns the user's current subscription state from the `profiles` table.

**Returns:**
```ts
{
  tier: 'free' | 'professional' | 'business' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
  period: 'monthly' | 'yearly' | null
  endDate: Date | null
  hasStripeCustomer: boolean
}
```

---

### `billing.checkout` — Mutation

Creates a Stripe Checkout Session for upgrading to a paid plan. Creates a Stripe customer record on demand if one doesn't exist.

**Input:**
```ts
{
  tier: 'professional' | 'business' | 'enterprise'
  interval: 'month' | 'year'
}
```

**Returns:** `{ url: string }` — redirect the browser to this URL to complete payment.

---

### `billing.portal` — Mutation

Opens a Stripe Customer Portal session for subscription management (cancel, change plan, update payment method).

**Returns:** `{ url: string }` — redirect the browser to this URL.

**Errors:** `BAD_REQUEST` if the user has no Stripe customer (i.e. they are on the free plan and have never checked out).

---

## Router: `admin` (admin only)

All procedures require `profile.role === 'admin'`. Returns `FORBIDDEN` otherwise.

### `admin.listUsers` — Query

Returns all landlord profiles ordered by registration date (newest first).

**Returns:** `Profile[]`

---

### `admin.getAuditLog` — Query

Returns the full platform audit log ordered by most recent event first.

**Returns:** `AuditLogEntry[]`

---

## Router: `services`

Placeholder router reserved for future service directory features.

### `services.list` — Query

Currently returns an empty array.

---

## Error Codes

| Code | Meaning |
|---|---|
| `UNAUTHORIZED` | No valid session — redirect to `/sign-in` |
| `FORBIDDEN` | Session valid but insufficient permissions (e.g. not admin, tier limit reached) |
| `NOT_FOUND` | Resource doesn't exist or belongs to another user |
| `BAD_REQUEST` | Invalid input or missing precondition |
| `INTERNAL_SERVER_ERROR` | Unexpected server error |
