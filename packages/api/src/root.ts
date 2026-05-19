/**
 * @module root
 * Assembles all domain routers into the single `appRouter` that is mounted
 * by the Next.js API route handler.
 */

import { createTRPCRouter } from './trpc'
import { propertiesRouter } from './routers/properties'
import { tenanciesRouter } from './routers/tenancies'
import { complianceRouter } from './routers/compliance'
import { expensesRouter } from './routers/expenses'
import { documentsRouter } from './routers/documents'
import { inspectionsRouter } from './routers/inspections'
import { maintenanceRouter } from './routers/maintenance'
import { analyticsRouter } from './routers/analytics'
import { adminRouter } from './routers/admin'
import { billingRouter } from './routers/billing'
import { maintenanceEventsRouter } from './routers/maintenanceEvents'

/**
 * The root tRPC router for the entire API surface.
 * Each key becomes the namespace prefix when calling procedures from the client
 * (e.g. `api.properties.list`, `api.billing.checkout`).
 */
export const appRouter = createTRPCRouter({
  properties: propertiesRouter,
  tenancies: tenanciesRouter,
  compliance: complianceRouter,
  expenses: expensesRouter,
  documents: documentsRouter,
  inspections: inspectionsRouter,
  maintenance: maintenanceRouter,
  analytics: analyticsRouter,
  admin: adminRouter,
  billing: billingRouter,
  maintenanceEvents: maintenanceEventsRouter,
})

/** Inferred TypeScript type used by tRPC clients and the React query hooks. */
export type AppRouter = typeof appRouter
