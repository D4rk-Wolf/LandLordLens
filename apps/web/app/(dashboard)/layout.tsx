import { redirect } from 'next/navigation'
import { getCurrentUser } from '@landlordlens/auth'
import { Sidebar } from '@/app/components/dashboard/sidebar'
import { MobileHeader } from '@/app/components/dashboard/mobile-header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--shell-bg)',
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: 'hsl(var(--background))',
          borderLeft: '1px solid var(--shell-border-subtle)',
        }}
      >
        <MobileHeader />
        <main
          style={{
            flex: 1,
            padding: '28px 32px',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
