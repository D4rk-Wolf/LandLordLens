import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'
import { sendAccountDeletionEmail } from '@landlordlens/email'

export async function DELETE(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const hasActivePaidSubscription =
    profile.subscription !== 'free' &&
    profile.subscriptionStatus === 'active' &&
    !profile.subscriptionCanceledAt

  if (hasActivePaidSubscription) {
    return NextResponse.json(
      { error: 'Please cancel your subscription before deleting your account.' },
      { status: 400 },
    )
  }

  const deletionRequestedAt = new Date()
  await db.update(profiles)
    .set({ deletionRequestedAt, isActive: false, updatedAt: new Date() })
    .where(eq(profiles.id, user.id))

  if (user.email) {
    const purgeDate = new Date(deletionRequestedAt.getTime() + 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    await sendAccountDeletionEmail(user.email, purgeDate)
  }

  await supabase.auth.signOut()

  return NextResponse.json({ success: true, message: 'Account scheduled for deletion.' })
}
