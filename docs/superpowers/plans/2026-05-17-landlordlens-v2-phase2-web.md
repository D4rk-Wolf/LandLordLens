# LandLordLens v2 — Phase 2: apps/web (Next.js 15 App Router)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `apps/web` — the Next.js 15 App Router application that is a thin UI layer consuming all Phase 1 packages, delivering a complete UK property management SaaS with auth, dashboard, property CRUD, compliance tracking, expenses, documents, inspections, maintenance, analytics, billing, and admin.

**Architecture:** Server Components fetch initial data via tRPC server caller (no loading spinners on navigation). Client Components own mutations via tRPC React Query. Supabase SSR handles auth via Next.js middleware. All business logic lives in packages — apps/web has zero inline business logic.

**Tech Stack:** Next.js 15 (App Router), React 19, tRPC 11 + React Query 5, Supabase SSR, Tailwind CSS v4, shadcn/ui (via `@landlordlens/ui`), TypeScript 5.7

---

## Existing packages (already built — import from these)

| Package | What it exports |
|---|---|
| `@landlordlens/db` | `db`, `DB`, all schema tables and types |
| `@landlordlens/db/schema` | All schema exports: `profiles`, `properties`, `tenancies`, `complianceRecords`, `expenses`, `documents`, `propertyInspections`, `maintenanceTickets`, `auditLog` |
| `@landlordlens/auth` | `createServerClient`, `createServiceRoleClient`, `createBrowserClient`, `getCurrentUser`, `requireUser`, `updateSession`, `isAdmin`, `isLandlord`, `UserRole` |
| `@landlordlens/auth/server` | `createServerClient`, `createServiceRoleClient` |
| `@landlordlens/auth/browser` | `createClient` (the browser Supabase client) |
| `@landlordlens/auth/middleware` | `updateSession` |
| `@landlordlens/billing` | `TIERS`, `getTierConfig`, `getPropertyLimit`, `SubscriptionTier`, `TierConfig`, `createCheckoutSession`, `createCustomerPortalSession`, `createStripeCustomer`, `constructWebhookEvent`, `handleWebhookEvent`, `canAddProperty`, `TierLimitError` |
| `@landlordlens/api` | `appRouter`, `AppRouter`, `createTRPCContext`, `createCallerFactory` |
| `@landlordlens/ui` | `Button`, `Card`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`, `Input`, `Label`, `Badge`, `Separator`, `Skeleton`, `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogTrigger`, `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger`, `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`, `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`, `cn` |
| `@landlordlens/email` | `sendVerificationEmail`, `sendWelcomeEmail`, `sendPasswordResetEmail`, `sendComplianceAlertEmail`, `sendTenantInviteEmail` |

## Critical DB schema facts

- `profiles.subscription` holds the tier (`'free' | 'starter' | 'professional' | 'business' | 'enterprise'`). Cast to `SubscriptionTier` from `@landlordlens/billing` where needed.
- `properties.address` is `jsonb` — shape: `{ line1: string, line2?: string, city: string, county?: string, postcode: string, country: string }`
- `properties.status` values: `'vacant' | 'occupied' | 'maintenance'` (no `deletedAt`)
- `properties.propertyType` values: `'house' | 'flat' | 'apartment' | 'bungalow' | 'other'`
- Compliance table name: `complianceRecords`, compliance type field: `complianceType`
- Inspections table: `propertyInspections`, type field: `inspectionType`
- Maintenance table: `maintenanceTickets` (not `maintenanceRequests`)

---

## File Map

### Root files
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/middleware.ts`

### App shell
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/app/components/providers.tsx`
- Create: `apps/web/lib/trpc/server.ts`
- Create: `apps/web/lib/trpc/client.ts`

### API routes
- Create: `apps/web/app/api/trpc/[trpc]/route.ts`
- Create: `apps/web/app/api/webhooks/stripe/route.ts`

### Auth pages
- Create: `apps/web/app/(auth)/layout.tsx`
- Create: `apps/web/app/(auth)/sign-in/page.tsx`
- Create: `apps/web/app/(auth)/sign-in/sign-in-form.tsx`
- Create: `apps/web/app/(auth)/sign-up/page.tsx`
- Create: `apps/web/app/(auth)/sign-up/sign-up-form.tsx`
- Create: `apps/web/app/(auth)/verify-email/page.tsx`
- Create: `apps/web/app/(auth)/reset-password/page.tsx`
- Create: `apps/web/app/(auth)/reset-password/reset-password-form.tsx`

### Dashboard layout
- Create: `apps/web/app/(dashboard)/layout.tsx`
- Create: `apps/web/app/components/dashboard/sidebar.tsx`
- Create: `apps/web/app/components/dashboard/mobile-header.tsx`

### Dashboard home
- Create: `apps/web/app/(dashboard)/page.tsx`
- Create: `apps/web/app/components/dashboard/stat-card.tsx`
- Create: `apps/web/app/components/dashboard/compliance-alert-list.tsx`

### Properties
- Create: `apps/web/app/(dashboard)/properties/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/new/page.tsx`
- Create: `apps/web/app/components/properties/property-card.tsx`
- Create: `apps/web/app/components/properties/property-form.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/tenancies/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/compliance/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/documents/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/expenses/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/inspections/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/maintenance/page.tsx`
- Create: `apps/web/app/components/properties/address-display.tsx`

### Portfolio-wide pages
- Create: `apps/web/app/(dashboard)/compliance/page.tsx`
- Create: `apps/web/app/(dashboard)/analytics/page.tsx`

### Settings + Billing
- Create: `apps/web/app/(dashboard)/settings/page.tsx`
- Create: `apps/web/app/(dashboard)/settings/billing/page.tsx`

### Other pages
- Create: `apps/web/app/(dashboard)/services/page.tsx`
- Create: `apps/web/app/(dashboard)/legal/section-8/page.tsx`
- Create: `apps/web/app/(admin)/admin/page.tsx`
- Create: `apps/web/app/pricing/page.tsx`

---

## Task 1: Scaffold apps/web

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/middleware.ts`

- [ ] **Step 1.1: Write apps/web/package.json**

```json
{
  "name": "@landlordlens/web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@trpc/server": "^11.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "@tanstack/react-query": "^5.0.0",
    "superjson": "^2.2.1",
    "@landlordlens/api": "workspace:*",
    "@landlordlens/auth": "workspace:*",
    "@landlordlens/billing": "workspace:*",
    "@landlordlens/db": "workspace:*",
    "@landlordlens/ui": "workspace:*",
    "@landlordlens/email": "workspace:*",
    "drizzle-orm": "^0.38.0",
    "zod": "^3.23.0",
    "stripe": "^17.0.0",
    "lucide-react": "^0.454.0"
  },
  "devDependencies": {
    "@landlordlens/config": "workspace:*",
    "typescript": "^5.7.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.0.0"
  }
}
```

- [ ] **Step 1.2: Write apps/web/tsconfig.json**

```json
{
  "extends": "@landlordlens/config/tsconfig/nextjs",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 1.3: Write apps/web/next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@landlordlens/ui',
    '@landlordlens/auth',
    '@landlordlens/billing',
    '@landlordlens/api',
    '@landlordlens/db',
    '@landlordlens/email',
  ],
}

export default nextConfig
```

- [ ] **Step 1.4: Write apps/web/postcss.config.mjs**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 1.5: Write apps/web/middleware.ts**

```typescript
import { updateSession } from '@landlordlens/auth/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 1.6: Install dependencies**

```bash
cd apps/web && pnpm install
```

Expected: no errors, lockfile updated.

- [ ] **Step 1.7: Commit scaffold**

```bash
git add apps/web/package.json apps/web/tsconfig.json apps/web/next.config.ts apps/web/postcss.config.mjs apps/web/middleware.ts
git commit -m "feat: scaffold apps/web Next.js 15 app"
```

---

## Task 2: App shell — layout, globals, tRPC wiring, Providers

**Files:**
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/app/components/providers.tsx`
- Create: `apps/web/lib/trpc/server.ts`
- Create: `apps/web/lib/trpc/client.ts`

Create all required directories first:
```bash
mkdir -p apps/web/app/components/dashboard apps/web/app/components/properties apps/web/app/components/compliance apps/web/lib/trpc apps/web/app/\(auth\) apps/web/app/\(dashboard\)/properties apps/web/app/\(dashboard\)/compliance apps/web/app/\(dashboard\)/analytics apps/web/app/\(dashboard\)/settings/billing apps/web/app/\(dashboard\)/services apps/web/app/\(dashboard\)/legal/section-8 apps/web/app/\(admin\)/admin apps/web/app/api/trpc/\[trpc\] apps/web/app/api/webhooks/stripe apps/web/app/pricing
```

- [ ] **Step 2.1: Write apps/web/app/globals.css**

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

- [ ] **Step 2.2: Write apps/web/lib/trpc/client.ts**

```typescript
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@landlordlens/api'

export const trpc = createTRPCReact<AppRouter>()
```

- [ ] **Step 2.3: Write apps/web/lib/trpc/server.ts**

```typescript
import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { createCallerFactory } from '@landlordlens/api'
import { appRouter } from '@landlordlens/api'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'

const createCaller = createCallerFactory(appRouter)

export const createServerCaller = cache(async () => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  const headersList = await headers()

  return createCaller({
    db,
    user,
    profile,
    headers: headersList,
  })
})
```

- [ ] **Step 2.4: Write apps/web/app/components/providers.tsx**

```typescript
'use client'
import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from '@/lib/trpc/client'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
```

- [ ] **Step 2.5: Write apps/web/app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LandLordLens — UK Property Management',
  description: 'Compliance-first property management for UK landlords',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 2.6: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.` Fix any import path errors before proceeding. Common issue: if `@trpc/react-query` is not installed, run `pnpm install` again.

- [ ] **Step 2.7: Commit**

```bash
git add apps/web/app/globals.css apps/web/app/layout.tsx apps/web/app/components/providers.tsx apps/web/lib/
git commit -m "feat: add app shell, globals, tRPC wiring, and providers"
```

---

## Task 3: API routes — tRPC handler + Stripe webhook

**Files:**
- Create: `apps/web/app/api/trpc/[trpc]/route.ts`
- Create: `apps/web/app/api/webhooks/stripe/route.ts`

- [ ] **Step 3.1: Write apps/web/app/api/trpc/[trpc]/route.ts**

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@landlordlens/api'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }
```

- [ ] **Step 3.2: Write apps/web/app/api/webhooks/stripe/route.ts**

```typescript
import { NextResponse } from 'next/server'
import { constructWebhookEvent, handleWebhookEvent } from '@landlordlens/billing'
import { db } from '@landlordlens/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  try {
    const event = constructWebhookEvent(body, signature)
    await handleWebhookEvent(event, db)
    return NextResponse.json({ received: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
```

- [ ] **Step 3.3: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 3.4: Commit**

```bash
git add apps/web/app/api/
git commit -m "feat: add tRPC HTTP handler and Stripe webhook route"
```

---

## Task 4: Auth pages — sign-in, sign-up, verify-email, reset-password

**Files:**
- Create: `apps/web/app/(auth)/layout.tsx`
- Create: `apps/web/app/(auth)/sign-in/page.tsx`
- Create: `apps/web/app/(auth)/sign-in/sign-in-form.tsx`
- Create: `apps/web/app/(auth)/sign-up/page.tsx`
- Create: `apps/web/app/(auth)/sign-up/sign-up-form.tsx`
- Create: `apps/web/app/(auth)/verify-email/page.tsx`
- Create: `apps/web/app/(auth)/reset-password/page.tsx`
- Create: `apps/web/app/(auth)/reset-password/reset-password-form.tsx`

Create subdirs first:
```bash
mkdir -p "apps/web/app/(auth)/sign-in" "apps/web/app/(auth)/sign-up" "apps/web/app/(auth)/verify-email" "apps/web/app/(auth)/reset-password"
```

- [ ] **Step 4.1: Write apps/web/app/(auth)/layout.tsx**

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">LandLordLens</h1>
          <p className="mt-1 text-sm text-gray-500">UK property management, simplified</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4.2: Write apps/web/app/(auth)/sign-in/sign-in-form.tsx**

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@landlordlens/auth'

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <div className="flex items-center justify-between text-sm">
        <Link href="/sign-up" className="text-indigo-600 hover:underline">
          Create account
        </Link>
        <Link href="/reset-password" className="text-gray-500 hover:underline">
          Forgot password?
        </Link>
      </div>
    </form>
  )
}
```

- [ ] **Step 4.3: Write apps/web/app/(auth)/sign-in/page.tsx**

```typescript
import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return <SignInForm />
}
```

- [ ] **Step 4.4: Write apps/web/app/(auth)/sign-up/sign-up-form.tsx**

```typescript
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@landlordlens/auth'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Check your email</h2>
        <p className="text-gray-600 text-sm">
          We sent a verification link to <strong>{email}</strong>. Click it to activate your
          account.
        </p>
        <p className="text-xs text-gray-400">
          Didn't receive it? Check your spam folder.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Create account</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="mt-1 text-xs text-gray-400">Minimum 8 characters</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
```

- [ ] **Step 4.5: Write apps/web/app/(auth)/sign-up/page.tsx**

```typescript
import { SignUpForm } from './sign-up-form'

export default function SignUpPage() {
  return <SignUpForm />
}
```

- [ ] **Step 4.6: Write apps/web/app/(auth)/verify-email/page.tsx**

```typescript
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Email verified</h2>
      <p className="text-gray-600 text-sm">
        Your email address has been verified. You can now sign in to your account.
      </p>
      <Link
        href="/sign-in"
        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign in
      </Link>
    </div>
  )
}
```

- [ ] **Step 4.7: Write apps/web/app/(auth)/reset-password/reset-password-form.tsx**

```typescript
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@landlordlens/auth'

export function ResetPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sign-in`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Check your email</h2>
        <p className="text-gray-600 text-sm">
          We sent a password reset link to <strong>{email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Reset password</h2>
      <p className="text-sm text-gray-500">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send reset link'}
      </button>

      <p className="text-center text-sm">
        <Link href="/sign-in" className="text-indigo-600 hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
```

- [ ] **Step 4.8: Write apps/web/app/(auth)/reset-password/page.tsx**

```typescript
import { ResetPasswordForm } from './reset-password-form'

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
```

- [ ] **Step 4.9: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 4.10: Commit**

```bash
git add "apps/web/app/(auth)/"
git commit -m "feat: add auth pages — sign-in, sign-up, verify-email, reset-password"
```

---

## Task 5: Dashboard layout — sidebar + shell

**Files:**
- Create: `apps/web/app/(dashboard)/layout.tsx`
- Create: `apps/web/app/components/dashboard/sidebar.tsx`
- Create: `apps/web/app/components/dashboard/mobile-header.tsx`

Create subdir:
```bash
mkdir -p "apps/web/app/(dashboard)"
```

- [ ] **Step 5.1: Write apps/web/app/components/dashboard/sidebar.tsx**

```typescript
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  Wrench,
  Scale,
  Users,
} from 'lucide-react'
import { cn } from '@landlordlens/ui'
import { createBrowserClient } from '@landlordlens/auth'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home, exact: true },
  { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/legal/section-8', label: 'Legal', icon: Scale },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white h-screen sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <span className="text-xl font-bold text-gray-900">LandLordLens</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive(href, exact)
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
```

- [ ] **Step 5.2: Write apps/web/app/components/dashboard/mobile-header.tsx**

```typescript
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Building2, ShieldCheck, BarChart3, Settings, Wrench, Scale } from 'lucide-react'
import { cn } from '@landlordlens/ui'
import { createBrowserClient } from '@landlordlens/auth'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home, exact: true },
  { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/legal/section-8', label: 'Legal', icon: Scale },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  async function handleSignOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-lg font-bold text-gray-900">LandLordLens</span>
        <button onClick={() => setOpen(!open)} className="p-1 text-gray-600">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-200 p-4 space-y-1 bg-white">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                isActive(href, exact)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 w-full"
          >
            Sign out
          </button>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 5.3: Write apps/web/app/(dashboard)/layout.tsx**

```typescript
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@landlordlens/auth'
import { Sidebar } from '@/app/components/dashboard/sidebar'
import { MobileHeader } from '@/app/components/dashboard/mobile-header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 5.4: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 5.5: Commit**

```bash
git add "apps/web/app/(dashboard)/layout.tsx" apps/web/app/components/dashboard/
git commit -m "feat: add dashboard layout with sidebar and mobile header"
```

---

## Task 6: Dashboard home — portfolio overview

**Files:**
- Create: `apps/web/app/(dashboard)/page.tsx` — redirects to `/dashboard`
- Create: `apps/web/app/components/dashboard/stat-card.tsx`
- Create: `apps/web/app/components/dashboard/compliance-alert-list.tsx`
- Note: Next.js App Router uses route groups, so the dashboard page is at `app/(dashboard)/page.tsx` which serves `/`... Actually since the layout covers `(dashboard)`, we need a redirect from `/` to `/dashboard`. Let me reconsider the routing.

**Routing note:** The spec shows `/dashboard` as the root. In Next.js App Router with route groups:
- `app/(dashboard)/page.tsx` renders at `/` (the route group prefix is not in the URL)
- Create `app/page.tsx` as a redirect to `/dashboard` won't work with this structure

**Correct approach:** The dashboard home renders at `/` (since the route group `(dashboard)` adds no URL segment). But this conflicts with the public pricing page also at `/`. Fix: use a redirect.

**Revised routing:**
- `app/page.tsx` → redirect to `/dashboard`
- `app/(dashboard)/dashboard/page.tsx` → the actual dashboard home (URL: `/dashboard`)

Create subdir:
```bash
mkdir -p "apps/web/app/(dashboard)/dashboard"
```

- [ ] **Step 6.1: Write apps/web/app/page.tsx (root redirect)**

```typescript
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/dashboard')
}
```

- [ ] **Step 6.2: Write apps/web/app/components/dashboard/stat-card.tsx**

```typescript
import { Card, CardContent } from '@landlordlens/ui'

interface StatCardProps {
  label: string
  value: string | number
  sublabel?: string
  accent?: 'default' | 'green' | 'red' | 'amber'
}

const accentMap = {
  default: 'text-gray-900',
  green: 'text-green-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
}

export function StatCard({ label, value, sublabel, accent = 'default' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${accentMap[accent]}`}>{value}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 6.3: Write apps/web/app/components/dashboard/compliance-alert-list.tsx**

```typescript
import type { ComplianceRecord } from '@landlordlens/db/schema'
import { Badge } from '@landlordlens/ui'

interface Props {
  records: ComplianceRecord[]
}

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function urgencyBadge(days: number) {
  if (days < 0) return <Badge variant="destructive">Overdue</Badge>
  if (days <= 14) return <Badge className="bg-amber-500 hover:bg-amber-600">Expires soon</Badge>
  if (days <= 30) return <Badge variant="secondary">Due in {days}d</Badge>
  return null
}

export function ComplianceAlertList({ records }: Props) {
  const alerts = records
    .map((r) => ({ ...r, days: daysUntil(r.expiryDate) }))
    .filter((r) => r.days <= 30)
    .sort((a, b) => a.days - b.days)

  if (alerts.length === 0) {
    return <p className="text-sm text-gray-500">No compliance items due in the next 30 days.</p>
  }

  return (
    <ul className="space-y-3">
      {alerts.map((record) => (
        <li key={record.id} className="flex items-center justify-between text-sm">
          <span className="text-gray-700 capitalize">
            {record.complianceType.replace(/_/g, ' ')}
          </span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>{record.expiryDate}</span>
            {urgencyBadge(record.days)}
          </div>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 6.4: Write apps/web/app/(dashboard)/dashboard/page.tsx**

```typescript
import { createServerCaller } from '@/lib/trpc/server'
import { StatCard } from '@/app/components/dashboard/stat-card'
import { ComplianceAlertList } from '@/app/components/dashboard/compliance-alert-list'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'
import Link from 'next/link'

export default async function DashboardPage() {
  const caller = await createServerCaller()
  const [stats, compliance] = await Promise.all([
    caller.analytics.portfolioStats(),
    caller.compliance.list(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio overview</h1>
        <p className="text-sm text-gray-500 mt-1">Your property management at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total properties" value={stats.totalProperties} />
        <StatCard
          label="Compliance records"
          value={stats.totalComplianceRecords}
          sublabel="across all properties"
        />
        <StatCard
          label="Quick links"
          value="→"
          sublabel="Add property below"
          accent="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceAlertList records={compliance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/properties/new"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Add property
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/dashboard/compliance"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              View all compliance
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              View analytics
              <span className="text-gray-400">→</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

- [ ] **Step 6.5: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 6.6: Commit**

```bash
git add apps/web/app/page.tsx "apps/web/app/(dashboard)/dashboard/" apps/web/app/components/dashboard/stat-card.tsx apps/web/app/components/dashboard/compliance-alert-list.tsx
git commit -m "feat: add dashboard home with portfolio stats and compliance alerts"
```

---

## Task 7: Properties — list, create, address helpers

**Files:**
- Create: `apps/web/app/components/properties/address-display.tsx`
- Create: `apps/web/app/components/properties/property-card.tsx`
- Create: `apps/web/app/components/properties/property-form.tsx`
- Create: `apps/web/app/(dashboard)/properties/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/new/page.tsx`

Create subdirs:
```bash
mkdir -p "apps/web/app/(dashboard)/properties/new" "apps/web/app/components/properties"
```

- [ ] **Step 7.1: Write apps/web/app/components/properties/address-display.tsx**

```typescript
interface Address {
  line1: string
  line2?: string
  city: string
  county?: string
  postcode: string
  country?: string
}

export function formatAddress(address: unknown): string {
  const a = address as Address
  return [a.line1, a.line2, a.city, a.postcode].filter(Boolean).join(', ')
}

export function AddressDisplay({ address }: { address: unknown }) {
  const a = address as Address
  return (
    <address className="not-italic text-sm text-gray-600 space-y-0.5">
      <p>{a.line1}</p>
      {a.line2 && <p>{a.line2}</p>}
      <p>
        {a.city}, {a.postcode}
      </p>
    </address>
  )
}
```

- [ ] **Step 7.2: Write apps/web/app/components/properties/property-card.tsx**

```typescript
import Link from 'next/link'
import { Card, CardContent, Badge } from '@landlordlens/ui'
import { formatAddress } from './address-display'
import type { Property } from '@landlordlens/db/schema'

const statusColour: Record<string, string> = {
  vacant: 'bg-amber-100 text-amber-800',
  occupied: 'bg-green-100 text-green-800',
  maintenance: 'bg-red-100 text-red-800',
}

interface Props {
  property: Property
}

export function PropertyCard({ property }: Props) {
  return (
    <Link href={`/dashboard/properties/${property.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {formatAddress(property.address)}
              </p>
              <p className="text-xs text-gray-400 capitalize mt-0.5">
                {property.propertyType} · {property.bedrooms} bed
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize flex-shrink-0 ${statusColour[property.status] ?? 'bg-gray-100 text-gray-700'}`}
            >
              {property.status}
            </span>
          </div>
          {property.rentAmount && (
            <p className="text-sm text-gray-600">
              £{Number(property.rentAmount).toLocaleString()}/mo
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 7.3: Write apps/web/app/components/properties/property-form.tsx**

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/client'
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@landlordlens/ui'

interface PropertyFormProps {
  mode: 'create'
}

export function PropertyForm({ mode }: PropertyFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const createProperty = trpc.properties.create.useMutation({
    onSuccess: (property) => {
      router.push(`/dashboard/properties/${property.id}`)
      router.refresh()
    },
    onError: (err) => setError(err.message),
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    createProperty.mutate({
      address: {
        line1: fd.get('line1') as string,
        line2: (fd.get('line2') as string) || undefined,
        city: fd.get('city') as string,
        county: (fd.get('county') as string) || undefined,
        postcode: fd.get('postcode') as string,
        country: 'United Kingdom',
      },
      propertyType: fd.get('propertyType') as 'house' | 'flat' | 'apartment' | 'bungalow' | 'other',
      bedrooms: parseInt(fd.get('bedrooms') as string, 10),
      bathrooms: parseInt(fd.get('bathrooms') as string, 10),
      rentAmount: (fd.get('rentAmount') as string) || undefined,
      region: fd.get('region') as 'england' | 'wales' | 'scotland' | 'northern_ireland',
      notes: (fd.get('notes') as string) || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 w-full">
          Address
        </legend>
        <div>
          <Label htmlFor="line1">Address line 1</Label>
          <Input id="line1" name="line1" required className="mt-1" placeholder="123 High Street" />
        </div>
        <div>
          <Label htmlFor="line2">Address line 2 (optional)</Label>
          <Input id="line2" name="line2" className="mt-1" placeholder="Flat 2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City / Town</Label>
            <Input id="city" name="city" required className="mt-1" placeholder="Manchester" />
          </div>
          <div>
            <Label htmlFor="county">County (optional)</Label>
            <Input id="county" name="county" className="mt-1" placeholder="Greater Manchester" />
          </div>
        </div>
        <div>
          <Label htmlFor="postcode">Postcode</Label>
          <Input id="postcode" name="postcode" required className="mt-1 max-w-[140px]" placeholder="M1 1AA" />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 w-full">
          Property details
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="propertyType">Type</Label>
            <select
              id="propertyType"
              name="propertyType"
              defaultValue="house"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <select
              id="region"
              name="region"
              defaultValue="england"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="england">England</option>
              <option value="wales">Wales</option>
              <option value="scotland">Scotland</option>
              <option value="northern_ireland">Northern Ireland</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min="0" defaultValue="1" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min="0" defaultValue="1" required className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="rentAmount">Monthly rent (£, optional)</Label>
          <Input id="rentAmount" name="rentAmount" type="number" min="0" step="0.01" className="mt-1 max-w-[180px]" placeholder="1200" />
        </div>
      </fieldset>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <Button type="submit" disabled={createProperty.isPending}>
        {createProperty.isPending ? 'Adding…' : 'Add property'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 7.4: Write apps/web/app/(dashboard)/properties/page.tsx**

```typescript
import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { PropertyCard } from '@/app/components/properties/property-card'
import { Button } from '@landlordlens/ui'
import { Plus } from 'lucide-react'

export default async function PropertiesPage() {
  const caller = await createServerCaller()
  const properties = await caller.properties.list()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">{properties.length} propert{properties.length === 1 ? 'y' : 'ies'}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 font-medium">No properties yet</p>
          <p className="text-sm text-gray-400 mt-1">Add your first property to get started</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/properties/new">Add property</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 7.5: Write apps/web/app/(dashboard)/properties/new/page.tsx**

```typescript
import { PropertyForm } from '@/app/components/properties/property-form'

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add property</h1>
        <p className="text-sm text-gray-500 mt-1">Enter the details of your property</p>
      </div>
      <PropertyForm mode="create" />
    </div>
  )
}
```

- [ ] **Step 7.6: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 7.7: Commit**

```bash
git add "apps/web/app/(dashboard)/properties/" apps/web/app/components/properties/
git commit -m "feat: add properties list, create, card, and form components"
```

---

## Task 8: Property detail page with sub-tabs

**Files:**
- Create: `apps/web/app/(dashboard)/properties/[id]/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/tenancies/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/compliance/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/documents/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/expenses/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/inspections/page.tsx`
- Create: `apps/web/app/(dashboard)/properties/[id]/maintenance/page.tsx`

Create subdirs:
```bash
mkdir -p "apps/web/app/(dashboard)/properties/[id]/tenancies" \
         "apps/web/app/(dashboard)/properties/[id]/compliance" \
         "apps/web/app/(dashboard)/properties/[id]/documents" \
         "apps/web/app/(dashboard)/properties/[id]/expenses" \
         "apps/web/app/(dashboard)/properties/[id]/inspections" \
         "apps/web/app/(dashboard)/properties/[id]/maintenance"
```

- [ ] **Step 8.1: Write apps/web/app/(dashboard)/properties/[id]/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { AddressDisplay } from '@/app/components/properties/address-display'
import { Badge } from '@landlordlens/ui'

const statusColour: Record<string, string> = {
  vacant: 'bg-amber-100 text-amber-800 border-amber-200',
  occupied: 'bg-green-100 text-green-800 border-green-200',
  maintenance: 'bg-red-100 text-red-800 border-red-200',
}

const subTabs = [
  { href: 'tenancies', label: 'Tenancies' },
  { href: 'compliance', label: 'Compliance' },
  { href: 'documents', label: 'Documents' },
  { href: 'expenses', label: 'Expenses' },
  { href: 'inspections', label: 'Inspections' },
  { href: 'maintenance', label: 'Maintenance' },
]

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let property
  try {
    property = await caller.properties.getById({ id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/properties" className="text-sm text-gray-400 hover:text-gray-600">
              Properties
            </Link>
            <span className="text-gray-300">/</span>
          </div>
          <AddressDisplay address={property.address} />
          <p className="text-xs text-gray-400 mt-1 capitalize">
            {property.propertyType} · {property.bedrooms} bed · {property.bathrooms} bath
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColour[property.status] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          {property.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        {property.rentAmount && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-500">Monthly rent</p>
            <p className="font-semibold text-gray-900 mt-0.5">
              £{Number(property.rentAmount).toLocaleString()}
            </p>
          </div>
        )}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Region</p>
          <p className="font-semibold text-gray-900 mt-0.5 capitalize">
            {property.region.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Added</p>
          <p className="font-semibold text-gray-900 mt-0.5">
            {new Date(property.createdAt).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {subTabs.map(({ href, label }) => (
            <Link
              key={href}
              href={`/dashboard/properties/${id}/${href}`}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {property.notes && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
          <p className="text-sm text-gray-600">{property.notes}</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.2: Write apps/web/app/(dashboard)/properties/[id]/tenancies/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'
import Link from 'next/link'

export default async function PropertyTenanciesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let tenancies
  try {
    tenancies = await caller.tenancies.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Tenancies</h2>
      </div>

      {tenancies.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No tenancies recorded for this property</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tenancies.map((tenancy) => (
            <Card key={tenancy.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{tenancy.tenantName}</p>
                  <p className="text-sm text-gray-500">{tenancy.tenantEmail}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {tenancy.startDate} → {tenancy.endDate ?? 'ongoing'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    £{Number(tenancy.monthlyRent).toLocaleString()}/mo
                  </p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 capitalize ${tenancy.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tenancy.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.3: Write apps/web/app/(dashboard)/properties/[id]/compliance/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function statusChip(days: number) {
  if (days < 0) return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Overdue</span>
  if (days <= 14) return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Expires in {days}d</span>
  if (days <= 60) return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Due in {days}d</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Valid</span>
}

export default async function PropertyCompliancePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let records
  try {
    records = await caller.compliance.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Compliance records</h2>

      {records.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No compliance records for this property</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => {
            const days = daysUntil(record.expiryDate)
            return (
              <Card key={record.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {record.complianceType.replace(/_/g, ' ')}
                    </p>
                    {record.issuer && <p className="text-sm text-gray-500">Issued by {record.issuer}</p>}
                    <p className="text-xs text-gray-400 mt-1">
                      Issued: {record.issueDate} · Expires: {record.expiryDate}
                    </p>
                  </div>
                  {statusChip(days)}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.4: Write apps/web/app/(dashboard)/properties/[id]/documents/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'
import { FileText } from 'lucide-react'

export default async function PropertyDocumentsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let docs
  try {
    docs = await caller.documents.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Documents</h2>

      {docs.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No documents uploaded for this property</p>
        </div>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {doc.category} · {new Date(doc.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.5: Write apps/web/app/(dashboard)/properties/[id]/expenses/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export default async function PropertyExpensesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let expenseList
  try {
    expenseList = await caller.expenses.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  const total = expenseList.reduce((sum, e) => sum + Number(e.amount), 0)

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
        {expenseList.length > 0 && (
          <span className="text-sm text-gray-500">
            Total: <strong className="text-gray-900">£{total.toLocaleString()}</strong>
          </span>
        )}
      </div>

      {expenseList.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No expenses recorded for this property</p>
        </div>
      ) : (
        <div className="space-y-2">
          {expenseList.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {expense.category} · {expense.date}
                    {expense.isTaxDeductible && (
                      <span className="ml-2 text-green-600">Tax deductible</span>
                    )}
                  </p>
                </div>
                <p className={`font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {expense.type === 'income' ? '+' : ''}£{Number(expense.amount).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.6: Write apps/web/app/(dashboard)/properties/[id]/inspections/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export default async function PropertyInspectionsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let inspectionList
  try {
    inspectionList = await caller.inspections.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Inspections</h2>

      {inspectionList.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No inspections recorded</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inspectionList.map((inspection) => (
            <Card key={inspection.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {inspection.inspectionType.replace(/_/g, ' ')} inspection
                  </p>
                  <p className="text-sm text-gray-500">By {inspection.conductedBy}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Scheduled: {inspection.scheduledDate}
                    {inspection.actualDate && ` · Completed: ${inspection.actualDate}`}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                  inspection.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : inspection.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {inspection.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.7: Write apps/web/app/(dashboard)/properties/[id]/maintenance/page.tsx**

```typescript
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

const priorityColour: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
}

export default async function PropertyMaintenancePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let tickets
  try {
    tickets = await caller.maintenance.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Maintenance</h2>

      {tickets.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No maintenance tickets</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  {ticket.description && (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{ticket.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(ticket.createdAt).toLocaleDateString('en-GB')}
                    {ticket.assignedTo && ` · Assigned to ${ticket.assignedTo}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${priorityColour[ticket.priority] ?? 'bg-gray-100 text-gray-600'}`}>
                    {ticket.priority}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {ticket.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 8.8: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 8.9: Commit**

```bash
git add "apps/web/app/(dashboard)/properties/[id]/"
git commit -m "feat: add property detail page with tenancies, compliance, documents, expenses, inspections, and maintenance sub-pages"
```

---

## Task 9: Portfolio compliance page + Analytics page

**Files:**
- Create: `apps/web/app/(dashboard)/compliance/page.tsx`
- Create: `apps/web/app/(dashboard)/analytics/page.tsx`

Create subdirs:
```bash
mkdir -p "apps/web/app/(dashboard)/compliance" "apps/web/app/(dashboard)/analytics"
```

- [ ] **Step 9.1: Write apps/web/app/(dashboard)/compliance/page.tsx**

```typescript
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'
import Link from 'next/link'

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function statusChip(days: number) {
  if (days < 0)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Overdue {Math.abs(days)}d</span>
  if (days <= 14)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Expires in {days}d</span>
  if (days <= 60)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Due in {days}d</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Valid</span>
}

export default async function CompliancePage() {
  const caller = await createServerCaller()
  const records = await caller.compliance.list()

  const overdue = records.filter((r) => daysUntil(r.expiryDate) < 0)
  const soonDue = records.filter((r) => {
    const d = daysUntil(r.expiryDate)
    return d >= 0 && d <= 30
  })
  const valid = records.filter((r) => daysUntil(r.expiryDate) > 30)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
        <p className="text-sm text-gray-500 mt-1">All compliance records across your portfolio</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{overdue.length}</p>
          <p className="text-sm text-red-600">Overdue</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{soonDue.length}</p>
          <p className="text-sm text-amber-600">Due in 30 days</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{valid.length}</p>
          <p className="text-sm text-green-600">Valid</p>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No compliance records yet</p>
          <p className="text-sm text-gray-400 mt-1">Add compliance records from individual property pages</p>
        </div>
      ) : (
        <div className="space-y-2">
          {records
            .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate))
            .map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {record.complianceType.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Expires: {record.expiryDate}
                      {record.issuer && ` · ${record.issuer}`}
                    </p>
                  </div>
                  {statusChip(daysUntil(record.expiryDate))}
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 9.2: Write apps/web/app/(dashboard)/analytics/page.tsx**

```typescript
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'

export default async function AnalyticsPage() {
  const caller = await createServerCaller()
  const [stats, expenses] = await Promise.all([
    caller.analytics.portfolioStats(),
    caller.analytics.expensesSummary(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Portfolio performance and financial summary</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Total properties</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">{stats.totalProperties}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Compliance records</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">{stats.totalComplianceRecords}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expenses by category</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500">No expenses recorded yet</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((row) => (
                <div key={row.category} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 capitalize">{row.category}</span>
                  <span className="font-semibold text-gray-900">
                    £{Number(row.total ?? 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 9.3: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 9.4: Commit**

```bash
git add "apps/web/app/(dashboard)/compliance/" "apps/web/app/(dashboard)/analytics/"
git commit -m "feat: add portfolio compliance and analytics pages"
```

---

## Task 10: Settings + Billing pages

**Files:**
- Create: `apps/web/app/(dashboard)/settings/page.tsx`
- Create: `apps/web/app/(dashboard)/settings/billing/page.tsx`

Create subdirs:
```bash
mkdir -p "apps/web/app/(dashboard)/settings/billing"
```

- [ ] **Step 10.1: Write apps/web/app/(dashboard)/settings/page.tsx**

```typescript
import { createServerCaller } from '@/lib/trpc/server'
import { getCurrentUser } from '@landlordlens/auth'
import { TIERS } from '@landlordlens/billing'
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@landlordlens/ui'
import Link from 'next/link'

export default async function SettingsPage() {
  const [user, caller] = await Promise.all([getCurrentUser(), createServerCaller()])

  if (!user) return null

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email address</p>
            <p className="text-sm text-gray-900 mt-0.5">{user.email}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-gray-500">Account ID</p>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{user.id}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Subscription</CardTitle>
          <Link href="/dashboard/settings/billing" className="text-sm text-indigo-600 hover:underline">
            Manage billing →
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Manage your plan, upgrade, or view invoices on the billing page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 10.2: Write apps/web/app/(dashboard)/settings/billing/page.tsx**

```typescript
import { getCurrentUser } from '@landlordlens/auth'
import { createServerCaller } from '@/lib/trpc/server'
import { TIERS, getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'
import Link from 'next/link'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default async function BillingPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const caller = await createServerCaller()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tierOrder.map((tier) => {
          const config = getTierConfig(tier)
          return (
            <Card key={tier} className="relative">
              <CardHeader>
                <CardTitle className="text-base">{config.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {config.monthlyPriceGbp === 0 ? 'Free' : `£${config.monthlyPriceGbp}/mo`}
                  </p>
                  {config.yearlyPriceGbp > 0 && (
                    <p className="text-xs text-gray-400">or £{config.yearlyPriceGbp}/yr</p>
                  )}
                </div>
                <ul className="space-y-1">
                  {config.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="text-sm text-gray-500">
        To upgrade or manage your subscription, contact support or use the Stripe customer portal when available.
      </p>
    </div>
  )
}
```

- [ ] **Step 10.3: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 10.4: Commit**

```bash
git add "apps/web/app/(dashboard)/settings/"
git commit -m "feat: add settings and billing pages"
```

---

## Task 11: Services, Section 8, Admin, Pricing pages

**Files:**
- Create: `apps/web/app/(dashboard)/services/page.tsx`
- Create: `apps/web/app/(dashboard)/legal/section-8/page.tsx`
- Create: `apps/web/app/(admin)/admin/page.tsx`
- Create: `apps/web/app/pricing/page.tsx`

Create subdirs:
```bash
mkdir -p "apps/web/app/(dashboard)/services" \
         "apps/web/app/(dashboard)/legal/section-8" \
         "apps/web/app/(admin)/admin" \
         "apps/web/app/pricing"
```

- [ ] **Step 11.1: Write apps/web/app/(dashboard)/services/page.tsx**

```typescript
export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services marketplace</h1>
        <p className="text-sm text-gray-500 mt-1">
          Connect with trusted tradespeople, letting agents, and property professionals
        </p>
      </div>

      <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500 font-medium">Coming soon</p>
        <p className="text-sm text-gray-400 mt-1">
          The services marketplace will be available in a future update
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 11.2: Write apps/web/app/(dashboard)/legal/section-8/page.tsx**

```typescript
export default function Section8Page() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Section 8 notice wizard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate a Section 8 notice for your tenancy
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <strong>Legal disclaimer:</strong> This wizard generates a draft notice for reference only.
        Always seek qualified legal advice before serving a Section 8 notice. Incorrectly served
        notices can invalidate possession proceedings.
      </div>

      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500 font-medium">Section 8 wizard</p>
        <p className="text-sm text-gray-400 mt-1">
          Select a tenancy above to generate a notice. Coming in a future update.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 11.3: Write apps/web/app/(admin)/admin/page.tsx**

```typescript
import { redirect } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@landlordlens/auth'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'

export default async function AdminPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const role = user.user_metadata?.['role'] as string | undefined
  if (!isAdmin(role as any)) redirect('/dashboard')

  const caller = await createServerCaller()
  const [users, auditLog] = await Promise.all([
    caller.admin.listUsers(),
    caller.admin.getAuditLog(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Platform administration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{u.name ?? 'No name'}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {u.role} · {u.subscription}
                    </p>
                  </div>
                  <span className={`text-xs ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent audit log</CardTitle>
          </CardHeader>
          <CardContent>
            {auditLog.length === 0 ? (
              <p className="text-sm text-gray-500">No audit events</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditLog.slice(0, 50).map((entry) => (
                  <div key={entry.id} className="text-sm py-2 border-b border-gray-100 last:border-0">
                    <p className="font-medium text-gray-900">{entry.action}</p>
                    <p className="text-xs text-gray-400">
                      {entry.resourceType && `${entry.resourceType} · `}
                      {new Date(entry.createdAt).toLocaleString('en-GB')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

- [ ] **Step 11.4: Write apps/web/app/pricing/page.tsx**

```typescript
import Link from 'next/link'
import { TIERS, getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-gray-500">
            Start free. Upgrade when you need more properties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tierOrder.map((tier) => {
            const config = getTierConfig(tier)
            const isPaid = config.monthlyPriceGbp > 0
            const isPopular = tier === 'professional'

            return (
              <div
                key={tier}
                className={`relative bg-white rounded-xl border-2 p-6 flex flex-col ${isPopular ? 'border-indigo-500 shadow-lg' : 'border-gray-200'}`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{config.name}</h2>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {isPaid ? `£${config.monthlyPriceGbp}` : 'Free'}
                    </span>
                    {isPaid && <span className="text-gray-400 text-sm">/month</span>}
                  </div>
                  {isPaid && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      £{config.yearlyPriceGbp}/year (save 2 months)
                    </p>
                  )}
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {config.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={`block text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isPopular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tier === 'free' ? 'Get started' : 'Start free trial'}
                </Link>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          All prices in GBP. VAT may apply. Cancel anytime.
        </p>

        <div className="text-center mt-8">
          <Link href="/sign-in" className="text-indigo-600 hover:underline text-sm">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 11.5: Typecheck**

```bash
cd apps/web && pnpm typecheck
```

Expected: `Found 0 errors.`

- [ ] **Step 11.6: Commit**

```bash
git add "apps/web/app/(dashboard)/services/" "apps/web/app/(dashboard)/legal/" "apps/web/app/(admin)/" apps/web/app/pricing/
git commit -m "feat: add services, section-8, admin, and pricing pages"
```

---

## Task 12: Final typecheck, build verify, and README update

**Files:**
- Modify: `apps/web/app/(dashboard)/layout.tsx` (add `/dashboard` redirect if needed — confirm routing works)
- Modify: root `turbo.json` if needed to add `web` to build pipeline

- [ ] **Step 12.1: Run full typecheck across all packages**

```bash
cd "/home/turkish/Documents/D4rkWolf/Business software/Software/LandLordLens" && pnpm --filter "@landlordlens/web" typecheck
```

Expected: `Found 0 errors.`

Fix any remaining type errors before proceeding.

- [ ] **Step 12.2: Verify Next.js build**

```bash
cd apps/web && pnpm build 2>&1 | tail -30
```

Expected: build completes successfully (some pages may show static/dynamic markers). Fix any build-time errors — common ones:
- Missing `@/` path alias — check `tsconfig.json` has `"paths": { "@/*": ["./*"] }`
- Dynamic server usage (cookies) in static pages — add `export const dynamic = 'force-dynamic'` to affected pages

If any Server Component page calls `createServerCaller()` and Next.js tries to statically render it, add this export at the top of that page file:
```typescript
export const dynamic = 'force-dynamic'
```
Pages that need this: any `(dashboard)` page, the `admin` page.

- [ ] **Step 12.3: Add `export const dynamic = 'force-dynamic'` to all dashboard pages that use createServerCaller()**

Add this line immediately after imports in these files (if build shows static generation errors):
- `apps/web/app/(dashboard)/dashboard/page.tsx`
- `apps/web/app/(dashboard)/properties/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/tenancies/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/compliance/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/documents/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/expenses/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/inspections/page.tsx`
- `apps/web/app/(dashboard)/properties/[id]/maintenance/page.tsx`
- `apps/web/app/(dashboard)/compliance/page.tsx`
- `apps/web/app/(dashboard)/analytics/page.tsx`
- `apps/web/app/(dashboard)/settings/page.tsx`
- `apps/web/app/(dashboard)/settings/billing/page.tsx`
- `apps/web/app/(admin)/admin/page.tsx`

Example addition to `dashboard/page.tsx`:
```typescript
import { createServerCaller } from '@/lib/trpc/server'
// ... other imports

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // ...
}
```

- [ ] **Step 12.4: Re-run build after fixes**

```bash
cd apps/web && pnpm build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with route listing.

- [ ] **Step 12.5: Commit final build fixes**

```bash
git add apps/web/
git commit -m "feat: complete apps/web Phase 2 — Next.js 15 frontend with all dashboard pages"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Sign-in, sign-up, verify-email, reset-password auth pages
- ✅ Dashboard route group with auth guard in layout
- ✅ Portfolio overview (stats + compliance alerts)
- ✅ Properties list + create
- ✅ Property detail with tenancies, compliance, documents, expenses, inspections, maintenance sub-pages
- ✅ Portfolio-wide compliance view
- ✅ Analytics page (stats + expense summary)
- ✅ Settings page
- ✅ Billing page (tier display)
- ✅ Services page (stub)
- ✅ Section 8 wizard (stub)
- ✅ Admin page (users + audit log)
- ✅ Pricing page (public)
- ✅ tRPC HTTP handler at `/api/trpc/[trpc]`
- ✅ Stripe webhook at `/api/webhooks/stripe`
- ✅ Middleware wrapping `updateSession`
- ✅ Server Components with tRPC server caller (no loading states on nav)
- ✅ Client Components for mutations (property creation form)

**Known limitations (not spec gaps — YAGNI):**
- Property update form not built (can add in Phase 3)
- Tenancy create/update forms not built (add in Phase 3)
- Compliance record add form not built (add in Phase 3)
- Stripe portal redirect not wired (needs live Stripe customer IDs)
- No Section 8 document generation (Phase 3)
