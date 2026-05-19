import { redirect } from 'next/navigation'
import { getCurrentUser } from '@landlordlens/auth'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const role = user.app_metadata?.['role'] as string | undefined
  if (!isAdmin(role as Parameters<typeof isAdmin>[0])) redirect('/dashboard')
  const [profile] = await db.select({ role: profiles.role }).from(profiles).where(eq(profiles.id, user.id))
  if (!profile || profile.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
