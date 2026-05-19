/**
 * Ombudsman / audit pack export — `GET /api/export/audit-pack?tenancyId=<id>`
 *
 * Generates and streams a downloadable JSON file ("audit pack") containing all
 * compliance-relevant data for a single tenancy.  This pack is designed to
 * satisfy evidence requirements from the Property Ombudsman and other dispute
 * resolution services, as well as any future PRS Database enforcement checks.
 *
 * Included in the export:
 *  - Tenancy summary (tenant name/email, dates, rent, Right to Rent status,
 *    deposit protection flag, How to Rent guide flag).
 *  - All deposit protection records for the tenancy.
 *  - All compliance certificates (Gas Safety CP12, EPC, EICR, etc.) for the
 *    property associated with the tenancy.
 *  - Maintenance tickets created in the last 12 months, each with their full
 *    status-change audit log (from `maintenanceEvents`).
 *
 * Security: the route verifies the caller is authenticated via Supabase Auth
 * and that the requested tenancy belongs to the authenticated user (row-level
 * ownership check on `tenancies.userId`).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { tenancies, depositProtections, maintenanceTickets, maintenanceEvents, complianceRecords } from '@landlordlens/db/schema'
import { eq, and, gte, inArray } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const tenancyId = new URL(req.url).searchParams.get('tenancyId')
  if (!tenancyId) return NextResponse.json({ error: 'tenancyId required' }, { status: 400 })

  // Authenticate — all audit data is private to the landlord who owns the tenancy.
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Ownership check: ensures landlords cannot export data for other users' tenancies.
  const [tenancy] = await db
    .select()
    .from(tenancies)
    .where(and(eq(tenancies.id, tenancyId), eq(tenancies.userId, user.id)))
  if (!tenancy) return NextResponse.json({ error: 'Tenancy not found' }, { status: 404 })

  // Maintenance records are scoped to the last 12 months to keep the export
  // focused on the most actionable evidence period.
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)

  const [deposits, compliance, maintenance, events] = await Promise.all([
  // Fetch compliance, deposits, and maintenance in parallel for performance.
  const [deposits, compliance, maintenance] = await Promise.all([
    db.select().from(depositProtections).where(and(eq(depositProtections.tenancyId, tenancyId), eq(depositProtections.userId, user.id))),
    db.select().from(complianceRecords)
      .where(and(eq(complianceRecords.propertyId, tenancy.propertyId), eq(complianceRecords.userId, user.id))),
    db.select().from(maintenanceTickets)
      .where(and(
        eq(maintenanceTickets.propertyId, tenancy.propertyId),
        eq(maintenanceTickets.userId, user.id),
        gte(maintenanceTickets.createdAt, twelveMonthsAgo)
      )),
  ])

  // Fetch event audit logs for the maintenance tickets retrieved above.
  // Guarded by a length check to avoid issuing an `IN ()` query with an empty
  // array, which is invalid SQL.
  const ticketIds = maintenance.map(t => t.id)
  const scopedEvents = ticketIds.length > 0
    ? await db.select().from(maintenanceEvents).where(inArray(maintenanceEvents.ticketId, ticketIds))
    : []

  const payload = {
    exportDate: new Date().toISOString(),
    exportedBy: 'LandLordLens Ombudsman Vault',
    tenancy: {
      tenantName: tenancy.tenantName,
      tenantEmail: tenancy.tenantEmail,
      startDate: tenancy.startDate,
      endDate: tenancy.endDate,
      monthlyRent: tenancy.monthlyRent,
      tenancyType: tenancy.tenancyType,
      // These boolean flags are key Section 8 prerequisites — their presence in
      // the export allows advisors to assess notice validity at a glance.
      depositProtected: tenancy.depositProtected,
      howToRentGuideProvided: tenancy.howToRentGuideProvided,
      rightToRentChecked: tenancy.rightToRentChecked,
    },
    depositProtections: deposits,
    complianceCertificates: compliance,
    // Each maintenance record is enriched with its full event audit log so that
    // the chronological history of each repair is preserved in the export.
    maintenanceRecords: maintenance.map(ticket => ({
      ...ticket,
      auditLog: scopedEvents.filter(e => e.ticketId === ticket.id),
    })),
  }

  const date = new Date().toISOString().split('T')[0]
  // Trigger a browser download with a deterministic filename that includes the
  // first 8 chars of the tenancy UUID and the export date for easy archiving.
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="audit-pack-${tenancyId.slice(0, 8)}-${date}.json"`,
    },
  })
}
