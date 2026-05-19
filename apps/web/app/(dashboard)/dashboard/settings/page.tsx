import { getCurrentUser } from '@landlordlens/auth'
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@landlordlens/ui'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email address</p>
            <p className="text-sm text-gray-900 mt-0.5">{user.email}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-gray-500">Account ID</p>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{user.id}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Subscription</CardTitle>
          <Link href="/dashboard/settings/billing" className="text-sm text-amber-600 hover:underline">
            Manage billing →
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Manage your plan, upgrade, or view invoices on the billing page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
