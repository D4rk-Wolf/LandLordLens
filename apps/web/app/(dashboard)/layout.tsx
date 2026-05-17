import { redirect } from 'next/navigation'
import { getCurrentUser } from '@landlordlens/auth'
import { Sidebar } from '@/app/components/dashboard/sidebar'
import { MobileHeader } from '@/app/components/dashboard/mobile-header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
