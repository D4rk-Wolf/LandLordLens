import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@landlordlens/api'

export const trpc = createTRPCReact<AppRouter>()
