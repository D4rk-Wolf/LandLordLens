/**
 * tRPC React-Query client for use inside Client Components.
 *
 * Exports a fully-typed `trpc` object whose procedure hooks (e.g.
 * `trpc.properties.list.useQuery()`) are derived from the server-side
 * `AppRouter` type.  The actual HTTP transport and QueryClient are
 * configured in `app/components/providers.tsx`, which wraps the component
 * tree with `trpc.Provider` and `QueryClientProvider`.
 *
 * Usage in client components:
 *   import { trpc } from '@/lib/trpc/client'
 *   const { data } = trpc.properties.list.useQuery()
 */
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@landlordlens/api'

export const trpc = createTRPCReact<AppRouter>()
