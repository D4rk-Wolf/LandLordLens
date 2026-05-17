import { redirect } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@landlordlens/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const role = user.user_metadata?.['role'] as string | undefined
  if (!isAdmin(role as Parameters<typeof isAdmin>[0])) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
