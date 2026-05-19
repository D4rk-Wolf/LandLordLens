import { NextRequest, NextResponse } from 'next/server'
import { db } from '@landlordlens/db'
import { profiles, payments } from '@landlordlens/db/schema'
import { lt, isNotNull, and, eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
    await db.update(payments)
      .set({ retentionReason: 'hmrc_7yr' })
      .where(eq(payments.userId, account.id))

    const { error } = await supabaseAdmin.auth.admin.deleteUser(account.id)
    if (!error) purgedCount++
  }

  return NextResponse.json({ purged: purgedCount })
}
