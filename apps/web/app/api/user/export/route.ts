import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import {
  profiles, properties, tenancies, rightToRent, tenantBackgroundChecks,
  complianceRecords, expenses, maintenanceTickets, propertyInspections,
  inventories, depositProtections, payments, documents,
} from '@landlordlens/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { sendDataExportEmail } from '@landlordlens/email'

const RATE_LIMIT_MS = 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  if (profile.lastExportRequestedAt) {
    const elapsed = Date.now() - new Date(profile.lastExportRequestedAt).getTime()
    if (elapsed < RATE_LIMIT_MS) {
      const retryAfter = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000)
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfterSeconds: retryAfter },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }
  }

  const userProperties = await db.select().from(properties).where(eq(properties.userId, user.id))
  const propertyIds = userProperties.map(p => p.id)

  const userTenancies = await db.select().from(tenancies).where(eq(tenancies.userId, user.id))
  const tenancyIds = userTenancies.map(t => t.id)

  const [
    userRightToRent,
    userBackgroundChecks,
    userCompliance,
    userExpenses,
    userMaintenance,
    userInspections,
    userInventories,
    userDeposits,
    userPayments,
    userDocuments,
  ] = await Promise.all([
    tenancyIds.length > 0 ? db.select().from(rightToRent).where(inArray(rightToRent.tenancyId, tenancyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(tenantBackgroundChecks).where(inArray(tenantBackgroundChecks.tenancyId, tenancyIds)) : [],
    propertyIds.length > 0 ? db.select().from(complianceRecords).where(inArray(complianceRecords.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(expenses).where(inArray(expenses.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(maintenanceTickets).where(inArray(maintenanceTickets.propertyId, propertyIds)) : [],
    propertyIds.length > 0 ? db.select().from(propertyInspections).where(inArray(propertyInspections.propertyId, propertyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(inventories).where(inArray(inventories.tenancyId, tenancyIds)) : [],
    tenancyIds.length > 0 ? db.select().from(depositProtections).where(inArray(depositProtections.tenancyId, tenancyIds)) : [],
    db.select().from(payments).where(eq(payments.userId, user.id)),
    propertyIds.length > 0 ? db.select().from(documents).where(inArray(documents.propertyId, propertyIds)) : [],
  ])

  await db.update(profiles)
    .set({ lastExportRequestedAt: new Date(), updatedAt: new Date() })
    .where(eq(profiles.id, user.id))

  if (user.email) await sendDataExportEmail(user.email)

  const payload = {
    exported_at: new Date().toISOString(),
    profile: {
      id: profile.id,
      name: profile.name,
      role: profile.role,
      subscription: profile.subscription,
      createdAt: profile.createdAt,
    },
    properties: userProperties,
    tenancies: userTenancies,
    right_to_rent: userRightToRent,
    background_checks: userBackgroundChecks,
    compliance_records: userCompliance,
    expenses: userExpenses,
    maintenance_tickets: userMaintenance,
    property_inspections: userInspections,
    inventories: userInventories,
    deposit_protections: userDeposits,
    payments: userPayments,
    documents: userDocuments.map(({ id, name, category, storagePath, mimeType, sizeBytes, createdAt }) => ({
      id, name, category, storagePath, mimeType, sizeBytes, createdAt,
    })),
  }

  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="landlordlens-data-${user.id.slice(0, 8)}-${date}.json"`,
    },
  })
}
