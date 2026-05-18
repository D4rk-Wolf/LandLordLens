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
import { servicesRouter } from './routers/services'
import { billingRouter } from './routers/billing'
import { maintenanceEventsRouter } from './routers/maintenanceEvents'

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
  services: servicesRouter,
  billing: billingRouter,
  maintenanceEvents: maintenanceEventsRouter,
})

export type AppRouter = typeof appRouter
