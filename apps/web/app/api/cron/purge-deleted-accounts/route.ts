import { NextRequest, NextResponse } from 'next/server'
import { db } from '@landlordlens/db'
import { profiles, payments } from '@landlordlens/db/schema'
import { lt, isNotNull, and, eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization')
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const accountsToPurge = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(and(
      isNotNull(profiles.deletionRequestedAt),
      lt(profiles.deletionRequestedAt, thirtyDaysAgo),
    ))

  if (accountsToPurge.length === 0) {
    return NextResponse.json({ purged: 0 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  let purgedCount = 0
  for (const account of accountsToPurge) {
    // Flag and de-link payment records for HMRC 7-year retention BEFORE deleting the profile.
    // The FK is ON DELETE SET NULL so the profile delete would null userId anyway,
    // but we flag first so the check constraint (userId IS NOT NULL OR retentionReason IS NOT NULL)
    // is satisfied from the start.
    await db.update(payments)
      .set({ retentionReason: 'hmrc_7yr' })
      .where(eq(payments.userId, account.id))

    // Delete from auth.users — handles Supabase session invalidation.
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(account.id)
    if (authError) continue

    // Delete the profile explicitly. All other data (properties, tenancies, etc.)
    // is cascade-deleted via FK constraints on the profile.
    // Payments survive because their FK is ON DELETE SET NULL.
    await db.delete(profiles).where(eq(profiles.id, account.id))

    purgedCount++
  }

  return NextResponse.json({ purged: purgedCount })
}
