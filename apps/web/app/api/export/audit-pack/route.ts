import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { tenancies, depositProtections, maintenanceTickets, maintenanceEvents, complianceRecords } from '@landlordlens/db/schema'
import { eq, and, gte } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const tenancyId = new URL(req.url).searchParams.get('tenancyId')
  if (!tenancyId) return NextResponse.json({ error: 'tenancyId required' }, { status: 400 })

  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [tenancy] = await db
    .select()
    .from(tenancies)
    .where(and(eq(tenancies.id, tenancyId), eq(tenancies.userId, user.id)))
  if (!tenancy) return NextResponse.json({ error: 'Tenancy not found' }, { status: 404 })

  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)

  const [deposits, compliance, maintenance, events] = await Promise.all([
    db.select().from(depositProtections).where(eq(depositProtections.tenancyId, tenancyId)),
    db.select().from(complianceRecords)
      .where(and(eq(complianceRecords.propertyId, tenancy.propertyId), eq(complianceRecords.userId, user.id))),
    db.select().from(maintenanceTickets)
      .where(and(
        eq(maintenanceTickets.propertyId, tenancy.propertyId),
        eq(maintenanceTickets.userId, user.id),
        gte(maintenanceTickets.createdAt, twelveMonthsAgo)
      )),
    db.select().from(maintenanceEvents).where(eq(maintenanceEvents.userId, user.id)),
  ])

  const ticketIds = maintenance.map(t => t.id)
  const scopedEvents = ticketIds.length > 0
    ? events.filter(e => ticketIds.includes(e.ticketId))
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
      depositProtected: tenancy.depositProtected,
      howToRentGuideProvided: tenancy.howToRentGuideProvided,
      rightToRentChecked: tenancy.rightToRentChecked,
    },
    depositProtections: deposits,
    complianceCertificates: compliance,
    maintenanceRecords: maintenance.map(ticket => ({
      ...ticket,
      auditLog: scopedEvents.filter(e => e.ticketId === ticket.id),
    })),
  }

  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="audit-pack-${tenancyId.slice(0, 8)}-${date}.json"`,
    },
  })
}
