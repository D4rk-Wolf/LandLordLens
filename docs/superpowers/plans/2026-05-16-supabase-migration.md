# Supabase Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate LandLordLens from MongoDB/Mongoose + custom JWT auth to Supabase Postgres + Supabase Auth.

**Architecture:** The Express backend stays as the API layer. The frontend uses `@supabase/supabase-js` for auth (sign in, sign up, session management) and sends the Supabase access token as a Bearer header to Express. Express verifies tokens via the Supabase admin client and queries Postgres using the service role key (bypassing RLS). All Mongoose models are replaced by Postgres tables with JSONB for nested/array fields.

**Tech Stack:** `@supabase/supabase-js` (frontend + backend), Supabase Auth (email/password), Supabase Postgres (eu-west-2), Express.js, TypeScript, React 19.

**Supabase Project:**
- Project ID: `jjpsessttexydvjithdl`
- URL: `https://jjpsessttexydvjithdl.supabase.co`
- Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o`
- Service role key: **Get from Supabase Dashboard → Project Settings → API → service_role secret**

---

## File Map

**Create:**
- `lib/supabase.ts` — Supabase admin client (service role) for Express backend
- `src/lib/supabase.ts` — Supabase browser client (anon key) for frontend

**Modify:**
- `server/index.ts` — remove MongoDB import, update imports
- `server/routes/auth.ts` — replace JWT/bcrypt with Supabase Admin auth calls
- `server/routes/properties.js` — replace Mongoose queries with Supabase client
- `server/routes/tenancies.js` — same pattern
- `server/routes/compliance.js` — same pattern
- `server/routes/inspections.js` — same pattern
- `server/routes/expenses.js` — same pattern
- `server/routes/payments.js` — same pattern
- `server/routes/subscription.js` — same pattern
- `server/routes/admin.ts` — same pattern
- `server/routes/webhooks.js` — update user lookup
- `src/contexts/AuthContext.tsx` — replace API calls with Supabase Auth
- `src/utils/api-client.ts` — inject Supabase access_token into requests
- `.env` — add Supabase vars, keep MongoDB URI until cutover
- `.env.example` — update

**Delete (after all tasks complete):**
- `models/` (all Mongoose models)
- `lib/mongodb.ts`

---

## Task 1: Create the Database Schema

**Files:**
- Supabase project `jjpsessttexydvjithdl` (via MCP `execute_sql`)

Run each SQL block below as a separate `execute_sql` call.

- [ ] **Step 1: Create profiles table (extends Supabase auth.users)**

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'landlord' check (role in ('landlord', 'admin', 'tenant')),
  is_active boolean not null default true,
  subscription text not null default 'free'
    check (subscription in ('free', 'starter', 'professional', 'business', 'enterprise')),
  subscription_status text not null default 'active'
    check (subscription_status in ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  subscription_period text check (subscription_period in ('monthly', 'yearly')),
  subscription_start_date timestamptz,
  subscription_end_date timestamptz,
  subscription_canceled_at timestamptz,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
```

- [ ] **Step 2: Auto-create profile on signup (trigger)**

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'landlord'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- [ ] **Step 3: Create properties table**

```sql
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  address jsonb not null,
  property_type text not null check (property_type in ('house', 'flat', 'apartment', 'bungalow', 'other')),
  bedrooms integer not null,
  bathrooms integer not null default 1,
  rent_amount numeric,
  purchase_price numeric,
  purchase_date date,
  status text not null default 'vacant' check (status in ('vacant', 'occupied', 'maintenance')),
  availability_status text not null default 'ready_for_rent'
    check (availability_status in ('free', 'for_sale', 'ready_for_rent', 'rented', 'not_available')),
  region text not null default 'england'
    check (region in ('england', 'wales', 'scotland', 'northern_ireland')),
  compliance jsonb not null default '{}',
  financials jsonb not null default '{}',
  furnished boolean not null default false,
  allows_pets boolean not null default false,
  allows_smoking boolean not null default false,
  mortgage_consent_obtained boolean not null default false,
  mortgage_consent_date date,
  mortgage_consent_expiry date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index properties_user_id_idx on public.properties(user_id);
create index properties_status_idx on public.properties(status);

alter table public.properties enable row level security;
create policy "Users manage own properties" on public.properties
  using (auth.uid() = user_id);
```

- [ ] **Step 4: Create tenancies table**

```sql
create table public.tenancies (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  tenant_name text not null,
  tenant_email text not null,
  tenant_phone text,
  start_date date not null,
  end_date date,
  monthly_rent numeric not null,
  deposit numeric,
  deposit_protected boolean not null default false,
  tenancy_type text not null default 'assured_shorthold'
    check (tenancy_type in ('assured_shorthold', 'assured', 'short_assured', 'fixed_term', 'protected')),
  status text not null default 'active' check (status in ('active', 'ended', 'pending')),
  rent_review_date date,
  last_rent_increase jsonb,
  section13_notice_served boolean not null default false,
  section13_notice_date date,
  how_to_rent_guide_provided boolean not null default false,
  how_to_rent_guide_date date,
  tenant_information_pack_provided boolean not null default false,
  tenant_information_pack_date date,
  rent_book_provided boolean not null default false,
  right_to_rent_checked boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tenancies_user_id_idx on public.tenancies(user_id);
create index tenancies_property_id_idx on public.tenancies(property_id);
create index tenancies_status_idx on public.tenancies(status);

alter table public.tenancies enable row level security;
create policy "Users manage own tenancies" on public.tenancies
  using (auth.uid() = user_id);
```

- [ ] **Step 5: Create compliance_records table**

```sql
create table public.compliance_records (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  compliance_type text not null check (compliance_type in (
    'gas_safety','epc','electrical','fire_safety','hmo_license','legionella',
    'pat_testing','smoke_alarm','carbon_monoxide_alarm','landlord_registration',
    'rent_smart_wales','other'
  )),
  region text not null default 'all'
    check (region in ('england','wales','scotland','northern_ireland','all')),
  certificate_number text,
  issue_date date not null,
  expiry_date date not null,
  issuer text,
  notes text,
  documents jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index compliance_expiry_idx on public.compliance_records(expiry_date);
create index compliance_property_type_idx on public.compliance_records(property_id, compliance_type);

alter table public.compliance_records enable row level security;
create policy "Users manage own compliance" on public.compliance_records
  using (auth.uid() = user_id);
```

- [ ] **Step 6: Create maintenance_tickets table**

```sql
create table public.maintenance_tickets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  status text not null default 'open' check (status in ('open','in_progress','completed','cancelled')),
  reported_by text,
  assigned_to text,
  cost numeric,
  completed_date date,
  notes text,
  images jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index maintenance_property_id_idx on public.maintenance_tickets(property_id);
create index maintenance_status_idx on public.maintenance_tickets(status);

alter table public.maintenance_tickets enable row level security;
create policy "Users manage own tickets" on public.maintenance_tickets
  using (auth.uid() = user_id);
```

- [ ] **Step 7: Create expenses table with UK tax year trigger**

```sql
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  tenancy_id uuid references public.tenancies(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  category text not null,
  amount numeric not null,
  currency text not null default 'GBP',
  date date not null default current_date,
  description text not null,
  supplier text,
  invoice_number text,
  is_tax_deductible boolean not null default true,
  vat_amount numeric,
  payment_method text check (payment_method in ('bank_transfer','card','cash','cheque','other')),
  receipt jsonb,
  notes text,
  tax_year text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_expense_tax_year()
returns trigger language plpgsql as $$
declare
  d date := coalesce(new.date, current_date);
  y integer := extract(year from d)::integer;
  m integer := extract(month from d)::integer;
  day integer := extract(day from d)::integer;
begin
  if new.tax_year is null then
    if m < 4 or (m = 4 and day < 6) then
      new.tax_year := (y - 1)::text || '-' || y::text;
    else
      new.tax_year := y::text || '-' || (y + 1)::text;
    end if;
  end if;
  return new;
end;
$$;

create trigger set_tax_year
  before insert or update on public.expenses
  for each row execute procedure public.set_expense_tax_year();

create index expenses_user_date_idx on public.expenses(user_id, date desc);
create index expenses_property_id_idx on public.expenses(property_id);
create index expenses_tax_year_idx on public.expenses(tax_year);

alter table public.expenses enable row level security;
create policy "Users manage own expenses" on public.expenses
  using (auth.uid() = user_id);
```

- [ ] **Step 8: Create deposit_protections, property_inspections, right_to_rent tables**

```sql
create table public.deposit_protections (
  id uuid primary key default gen_random_uuid(),
  tenancy_id uuid not null references public.tenancies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  deposit_amount numeric not null,
  scheme text not null check (scheme in (
    'dps','mydeposits','tds','lps_scotland','safedeposits_scotland',
    'mydeposits_scotland','tds_ni','mydeposits_ni','lps_ni'
  )),
  protection_reference text not null,
  protected_date date not null,
  status text not null default 'protected'
    check (status in ('protected','returned','disputed','forfeited')),
  return_date date,
  return_amount numeric,
  notes text,
  documents jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.deposit_protections enable row level security;
create policy "Users manage own deposits" on public.deposit_protections
  using (auth.uid() = user_id);

create table public.property_inspections (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenancy_id uuid references public.tenancies(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  inspection_type text not null
    check (inspection_type in ('routine','check_in','check_out','maintenance','compliance','complaint')),
  scheduled_date date not null,
  actual_date date,
  conducted_by text not null,
  tenant_present boolean not null default false,
  status text not null default 'scheduled'
    check (status in ('scheduled','completed','cancelled','rescheduled')),
  items jsonb not null default '[]',
  issues jsonb not null default '[]',
  overall_condition text check (overall_condition in ('excellent','good','fair','poor')),
  issues_found boolean not null default false,
  notes text,
  photos jsonb not null default '[]',
  next_inspection_due date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.property_inspections enable row level security;
create policy "Users manage own inspections" on public.property_inspections
  using (auth.uid() = user_id);

create table public.right_to_rent (
  id uuid primary key default gen_random_uuid(),
  tenancy_id uuid not null references public.tenancies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  tenant_name text not null,
  tenant_date_of_birth date not null,
  document_type text not null check (document_type in (
    'uk_passport','eu_passport','biometric_residence_permit',
    'birth_certificate','driving_licence','other'
  )),
  document_number text not null,
  expiry_date date,
  check_date date not null default current_date,
  checked_by text not null,
  status text not null default 'pending'
    check (status in ('passed','failed','pending','expired')),
  notes text,
  documents jsonb not null default '[]',
  follow_up_required boolean not null default false,
  follow_up_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.right_to_rent enable row level security;
create policy "Users manage own rtr" on public.right_to_rent
  using (auth.uid() = user_id);
```

- [ ] **Step 9: Create tenant_background_checks and inventories tables**

```sql
create table public.tenant_background_checks (
  id uuid primary key default gen_random_uuid(),
  tenancy_id uuid not null references public.tenancies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  tenant_name text not null,
  check_date date not null default current_date,
  credit_check jsonb not null default '{"performed": false}',
  employment_check jsonb not null default '{"performed": false}',
  previous_landlord_reference jsonb not null default '{"performed": false}',
  criminal_record_check jsonb not null default '{"performed": false}',
  overall_status text not null default 'pending'
    check (overall_status in ('approved','rejected','conditional','pending')),
  notes text,
  documents jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tenant_background_checks enable row level security;
create policy "Users manage own checks" on public.tenant_background_checks
  using (auth.uid() = user_id);

create table public.inventories (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenancy_id uuid references public.tenancies(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('check_in','check_out','interim')),
  date date not null default current_date,
  conducted_by text not null,
  tenant_present boolean not null default false,
  items jsonb not null default '[]',
  overall_condition text check (overall_condition in ('excellent','good','fair','poor')),
  notes text,
  photos jsonb not null default '[]',
  signed_by jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inventories enable row level security;
create policy "Users manage own inventories" on public.inventories
  using (auth.uid() = user_id);
```

- [ ] **Step 10: Create payments table**

```sql
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_payment_intent_id text,
  stripe_charge_id text,
  stripe_subscription_id text,
  amount numeric not null,
  currency text not null default 'GBP',
  status text not null default 'pending'
    check (status in ('pending','succeeded','failed','refunded','canceled')),
  payment_type text check (payment_type in ('subscription','one_time')),
  description text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.payments enable row level security;
create policy "Users view own payments" on public.payments
  for select using (auth.uid() = user_id);
```

- [ ] **Step 11: Commit schema**

```bash
git add -A
git commit -m "feat: add Supabase schema — profiles, properties, tenancies, and all landlord tables"
```

---

## Task 2: Backend — Supabase Admin Client

**Files:**
- Create: `lib/supabase.ts`
- Modify: `server/index.ts`

- [ ] **Step 1: Get service role key**

Go to [Supabase Dashboard → Project Settings → API](https://supabase.com/dashboard/project/jjpsessttexydvjithdl/settings/api), copy the `service_role` secret key. Add to `.env`:

```
SUPABASE_URL=https://jjpsessttexydvjithdl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<paste_service_role_key_here>
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o
```

- [ ] **Step 2: Install @supabase/supabase-js on backend**

```bash
npm install @supabase/supabase-js
```

- [ ] **Step 3: Create lib/supabase.ts**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

export default supabaseAdmin;
```

- [ ] **Step 4: Remove MongoDB from server/index.ts**

In `server/index.ts`, remove these lines:

```typescript
import { connectToMongoDB } from '../lib/mongodb';
```

And in `startServer()`, replace `await connectToMongoDB();` with:

```typescript
logger.info('Using Supabase Postgres — no local DB connection needed.');
```

- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts server/index.ts .env.example
git commit -m "feat: add Supabase admin client for backend"
```

---

## Task 3: Backend — Auth Middleware & Routes

**Files:**
- Modify: `server/routes/auth.ts`

The new auth flow: frontend signs in via Supabase Auth directly and gets an `access_token`. It sends that token as `Authorization: Bearer <token>` to Express. Express verifies it via `supabaseAdmin.auth.getUser(token)`.

- [ ] **Step 1: Rewrite authenticateToken middleware in server/routes/auth.ts**

Replace the entire file content with:

```typescript
import express, { Request, Response, NextFunction } from 'express';
import supabaseAdmin from '../../lib/supabase';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: string;
                subscription: string;
            };
        }
    }
}

const router = express.Router();

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('role, subscription')
        .eq('id', user.id)
        .single();

    req.user = {
        userId: user.id,
        email: user.email ?? '',
        role: profile?.role ?? 'landlord',
        subscription: profile?.subscription ?? 'free',
    };

    next();
};

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', req.user!.userId)
        .single();

    res.json({ user: { id: req.user!.userId, email: req.user!.email, ...profile } });
});

router.post('/signout', (_req: Request, res: Response) => {
    res.json({ message: 'Sign out successful' });
});

export default router;
```

- [ ] **Step 2: Verify server starts without errors**

```bash
npm run server
```

Expected: `Server running on http://localhost:5000` with no Mongoose or JWT errors.

- [ ] **Step 3: Commit**

```bash
git add server/routes/auth.ts
git commit -m "feat: replace JWT middleware with Supabase token verification"
```

---

## Task 4: Backend — Properties Route

**Files:**
- Modify: `server/routes/properties.js`

- [ ] **Step 1: Rewrite server/routes/properties.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const { canAddProperty, getMaxProperties, validateSubscriptionForProperties } = require('../../lib/subscription');

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const { data: properties, error } = await supabaseAdmin
            .from('properties')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const count = properties.length;
        const tier = req.user.subscription;
        res.json({
            properties,
            subscription: {
                currentTier: tier,
                propertyCount: count,
                maxProperties: getMaxProperties(tier),
                canAddMore: canAddProperty(tier, count),
                validation: validateSubscriptionForProperties(tier, count),
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId)
            .single();

        if (error || !property) return res.status(404).json({ error: 'Property not found' });

        const [tenancies, compliance, maintenance] = await Promise.all([
            supabaseAdmin.from('tenancies').select('*').eq('property_id', req.params.id),
            supabaseAdmin.from('compliance_records').select('*').eq('property_id', req.params.id),
            supabaseAdmin.from('maintenance_tickets').select('*').eq('property_id', req.params.id),
        ]);

        res.json({
            property,
            tenancies: tenancies.data ?? [],
            complianceRecords: compliance.data ?? [],
            maintenanceTickets: maintenance.data ?? [],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { data: existing } = await supabaseAdmin
            .from('properties')
            .select('id')
            .eq('user_id', req.user.userId);

        if (!canAddProperty(req.user.subscription, existing?.length ?? 0)) {
            return res.status(403).json({ error: 'Property limit reached. Please upgrade your subscription.' });
        }

        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .insert({ ...req.body, user_id: req.user.userId })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .update({ ...req.body, updated_at: new Date().toISOString() })
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId)
            .select()
            .single();

        if (error || !property) return res.status(404).json({ error: 'Property not found' });
        res.json({ property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabaseAdmin
            .from('properties')
            .delete()
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId);

        if (error) throw error;
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

- [ ] **Step 2: Commit**

```bash
git add server/routes/properties.js
git commit -m "feat: migrate properties route to Supabase"
```

---

## Task 5: Backend — Remaining Data Routes

**Files:**
- Modify: `server/routes/tenancies.js`, `server/routes/compliance.js`, `server/routes/inspections.js`, `server/routes/expenses.js`

All routes follow the same pattern as properties. For each file below, apply the pattern: replace `require('../../models/...')` with `require('../../lib/supabase').default`, replace Mongoose `.find({userId})` with `.from('table').select('*').eq('user_id', req.user.userId)`, etc.

- [ ] **Step 1: Rewrite server/routes/tenancies.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').select('*').eq('user_id', req.user.userId).order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ tenancies: data });
});

router.get('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').select('*').eq('id', req.params.id).eq('user_id', req.user.userId).single();
    if (error || !data) return res.status(404).json({ error: 'Tenancy not found' });
    res.json({ tenancy: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ tenancy: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Tenancy not found' });
    res.json({ tenancy: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('tenancies').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Tenancy deleted' });
});

module.exports = router;
```

- [ ] **Step 2: Rewrite server/routes/compliance.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').select('*').eq('user_id', req.user.userId).order('expiry_date', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ complianceRecords: data });
});

router.get('/property/:propertyId', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').select('*')
        .eq('property_id', req.params.propertyId).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ complianceRecords: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ complianceRecord: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Record not found' });
    res.json({ complianceRecord: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('compliance_records').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Compliance record deleted' });
});

module.exports = router;
```

- [ ] **Step 3: Rewrite server/routes/inspections.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').select('*').eq('user_id', req.user.userId)
        .order('scheduled_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ inspections: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ inspection: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Inspection not found' });
    res.json({ inspection: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('property_inspections').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Inspection deleted' });
});

module.exports = router;
```

- [ ] **Step 4: Rewrite server/routes/expenses.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const query = supabaseAdmin.from('expenses').select('*').eq('user_id', req.user.userId).order('date', { ascending: false });
    if (req.query.taxYear) query.eq('tax_year', req.query.taxYear);
    if (req.query.propertyId) query.eq('property_id', req.query.propertyId);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json({ expenses: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('expenses').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ expense: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('expenses').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Expense not found' });
    res.json({ expense: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('expenses').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Expense deleted' });
});

module.exports = router;
```

- [ ] **Step 5: Commit**

```bash
git add server/routes/tenancies.js server/routes/compliance.js server/routes/inspections.js server/routes/expenses.js
git commit -m "feat: migrate tenancies, compliance, inspections, expenses routes to Supabase"
```

---

## Task 6: Backend — Subscription & Payments Routes

**Files:**
- Modify: `server/routes/subscription.js`, `server/routes/payments.js`, `server/routes/admin.ts`

- [ ] **Step 1: Rewrite server/routes/subscription.js**

```javascript
const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const { getAllTiers, getSubscriptionTier, getMaxProperties, canAddProperty, validateSubscriptionForProperties, getFormattedPrice, getYearlySavings } = require('../../lib/subscription');

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user.userId).single();
    const { count } = await supabaseAdmin.from('properties').select('id', { count: 'exact', head: true }).eq('user_id', req.user.userId);
    const tier = profile?.subscription ?? 'free';
    res.json({
        currentTier: tier,
        tierDetails: getSubscriptionTier(tier),
        usage: {
            propertyCount: count ?? 0,
            maxProperties: getMaxProperties(tier),
            canAddMore: canAddProperty(tier, count ?? 0),
            remainingProperties: Math.max(0, getMaxProperties(tier) - (count ?? 0)),
        },
        subscriptionStatus: profile?.subscription_status,
        subscriptionPeriod: profile?.subscription_period,
    });
});

router.get('/tiers', (_req, res) => res.json({ tiers: getAllTiers() }));

router.put('/', async (req, res) => {
    const { tier, subscriptionStatus, subscriptionPeriod } = req.body;
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ subscription: tier, subscription_status: subscriptionStatus, subscription_period: subscriptionPeriod, updated_at: new Date().toISOString() })
        .eq('id', req.user.userId).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ profile: data });
});

module.exports = router;
```

- [ ] **Step 2: Update server/routes/payments.js to use Supabase for user/payment lookups**

In `server/routes/payments.js`, replace all Mongoose `User.findById(req.user.userId)` with:

```javascript
const supabaseAdmin = require('../../lib/supabase').default;
// ...
const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user.userId).single();
// use profile.stripe_customer_id instead of user.stripeCustomerId
// use profile.stripe_subscription_id instead of user.stripeSubscriptionId
```

Also replace saving back to Mongoose with:
```javascript
await supabaseAdmin.from('profiles').update({ stripe_customer_id: customer.id }).eq('id', req.user.userId);
```

- [ ] **Step 3: Update admin route to use Supabase**

In `server/routes/admin.ts`, replace Mongoose user queries:

```typescript
import supabaseAdmin from '../../lib/supabase';

// List users:
const { data: users } = await supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: false });

// Update user subscription:
await supabaseAdmin.from('profiles').update({ subscription: tier, subscription_status: status }).eq('id', userId);
```

- [ ] **Step 4: Commit**

```bash
git add server/routes/subscription.js server/routes/payments.js server/routes/admin.ts
git commit -m "feat: migrate subscription, payments, admin routes to Supabase"
```

---

## Task 7: Frontend — Supabase Client & Auth

**Files:**
- Create: `src/lib/supabase.ts`
- Modify: `src/contexts/AuthContext.tsx`
- Modify: `src/utils/api-client.ts`

- [ ] **Step 1: Add frontend env vars to .env**

```
SUPABASE_URL=https://jjpsessttexydvjithdl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHNlc3N0dGV4eWR2aml0aGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDE4NjksImV4cCI6MjA5NDUxNzg2OX0.z4U-p4dcJK3MuazmGk7gQbfFctINS8FJ12lCw3Jb-2o
```

- [ ] **Step 2: Expose Supabase vars via webpack DefinePlugin in webpack.config.js**

Add to the `DefinePlugin` entries:

```javascript
'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || ''),
'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || ''),
```

- [ ] **Step 3: Create src/lib/supabase.ts**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 4: Rewrite src/contexts/AuthContext.tsx**

```typescript
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    subscription?: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toUser(supabaseUser: SupabaseUser, profile?: any): User {
    return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? '',
        name: profile?.name ?? supabaseUser.user_metadata?.name ?? '',
        role: profile?.role ?? 'landlord',
        subscription: profile?.subscription ?? 'free',
    };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                setUser(toUser(session.user, profile));
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session?.user) {
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                setUser(toUser(session.user, profile));
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
    }, []);

    const signUp = useCallback(async (email: string, password: string, name: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) throw new Error(error.message);
    }, []);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    }, []);

    const value = useMemo(
        () => ({ user, session, loading, signIn, signUp, signOut, isAuthenticated: !!user }),
        [user, session, loading, signIn, signUp, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
```

- [ ] **Step 5: Update src/utils/api-client.ts to inject Supabase Bearer token**

In the `fetchAndDeduplicate` method, before making the fetch call, add:

```typescript
import { supabase } from '../lib/supabase';

// inside fetchAndDeduplicate, before the fetch:
const { data: { session } } = await supabase.auth.getSession();
if (session?.access_token) {
    requestOptions.headers = {
        ...(requestOptions.headers as Record<string, string> ?? {}),
        'Authorization': `Bearer ${session.access_token}`,
    };
}
```

Also remove the `token` parameter from `get`, `post`, `put`, `delete` methods — token is now injected automatically. Update all call sites that pass token if needed (most pass `token` from `useAuth` which now returns `null`; they can simply be removed).

- [ ] **Step 6: Commit**

```bash
git add src/lib/supabase.ts src/contexts/AuthContext.tsx src/utils/api-client.ts webpack.config.js
git commit -m "feat: migrate frontend auth to Supabase Auth"
```

---

## Task 8: Update .env.example & Cleanup

**Files:**
- Modify: `.env.example`
- Delete: `lib/mongodb.ts`, `models/` directory (after verifying all routes migrated)

- [ ] **Step 1: Update .env.example**

```bash
# ============================================================
# LandLordLens Environment Variables
# ============================================================

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Client-side API URL
REACT_APP_API_URL=http://localhost:5000/api

# ============================================================
# Supabase
# ============================================================
SUPABASE_URL=https://jjpsessttexydvjithdl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=<get from Supabase Dashboard → Settings → API>

# ============================================================
# Security
# ============================================================
JWT_SECRET=<no longer used — kept for transition period only>

# ============================================================
# Sentry
# ============================================================
SENTRY_DSN=https://b53a33de4d809cff5ffae9c642897883@o4510669168181248.ingest.us.sentry.io/4511400968454144
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

- [ ] **Step 2: Start the server and attempt login via the frontend**

```bash
npm run dev
```

Go to `http://localhost:3000/auth/register`, create an account, then sign in. Verify the dashboard loads and properties can be created.

- [ ] **Step 3: Delete Mongoose models and mongodb lib**

Once login + at least one data route is confirmed working:

```bash
rm -rf models/
rm lib/mongodb.ts
```

Remove `mongoose` and `bcryptjs` from package.json dependencies:

```bash
npm uninstall mongoose bcryptjs @types/bcryptjs
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Supabase migration — remove Mongoose, mongodb, and bcryptjs"
```

---

## Task 9: Create Admin User

- [ ] **Step 1: Sign up normally through the app**

Go to `/auth/register` and create your account with your real email and password.

- [ ] **Step 2: Promote to admin via Supabase SQL**

Run in Supabase SQL Editor (or via MCP `execute_sql`):

```sql
update public.profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'your-email@example.com'
);
```

- [ ] **Step 3: Verify admin access**

Sign in, navigate to `/admin` — the Admin Dashboard should be visible and the Sentry test button should appear.

---

## Self-Review

**Spec coverage:**
- ✅ Supabase project created (jjpsessttexydvjithdl)
- ✅ All 12 Mongoose models covered by Postgres tables
- ✅ UK tax year trigger on expenses table
- ✅ Supabase Auth replacing JWT cookies
- ✅ RLS policies on all tables
- ✅ Backend auth middleware updated
- ✅ All core routes migrated: properties, tenancies, compliance, inspections, expenses, subscription, payments, admin
- ✅ Frontend AuthContext uses Supabase Auth
- ✅ API client injects Supabase access_token automatically
- ✅ Admin user creation path documented
- ✅ Cleanup of Mongoose dependencies

**Notes for implementation:**
- The `documents`, `finance`, `legal`, `analytics`, `services` routes also use Mongoose — follow the same pattern as Task 5 for each.
- The `webhooks.js` route handles Stripe webhooks. Update user lookups from `User.findOne({ stripeCustomerId })` to `supabaseAdmin.from('profiles').select('*').eq('stripe_customer_id', customerId).single()`.
- The `token` field on `AuthContextType` is removed. Any component passing `token` to `apiClient` methods can simply drop that argument.
