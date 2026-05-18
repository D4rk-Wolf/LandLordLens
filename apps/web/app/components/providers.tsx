/**
 * Client-side provider tree for tRPC and React Query.
 *
 * This module is responsible for wiring together:
 *  - A `QueryClient` (TanStack Query) with a 60-second stale time so that
 *    data fetched via tRPC hooks stays fresh without excessive re-fetching.
 *  - A tRPC client configured with `httpBatchLink`, which automatically batches
 *    multiple concurrent procedure calls into a single HTTP request to `/api/trpc`.
 *  - `superjson` as the wire transformer so that rich types (Date, Map, Set,
 *    BigInt, etc.) survive serialisation between server and client.
 *
 * The singleton `browserQueryClient` pattern avoids recreating the QueryClient
 * on every render while still creating a fresh instance per request during SSR
 * (where `typeof window === 'undefined'`), preventing cross-request cache
 * contamination.
 */
'use client'
import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from '@/lib/trpc/client'

/** Creates a new QueryClient with application-wide default options. */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // 60-second stale time means data from a query is considered fresh for
      // one minute before a background refetch is triggered on window focus.
      queries: { staleTime: 60 * 1000 },
    },
  })
}

// Module-level singleton: reused across re-renders in the browser but never
// on the server (where window is undefined).
let browserQueryClient: QueryClient | undefined

/**
 * Returns the browser-scoped singleton QueryClient, or a fresh instance
 * when running on the server during SSR.
 */
function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

/**
 * Application-level provider component.  Wrap the root layout children with
 * this to make `trpc.*` hooks and `useQuery` / `useMutation` available
 * throughout the component tree.
 *
 * @param children - The React subtree to provide context to.
 */
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  // Stable tRPC client reference — created once per browser session so that
  // changing component state doesn't cause a new client to be instantiated.
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
