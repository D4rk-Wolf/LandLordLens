import { getCurrentUser } from '@landlordlens/auth'
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@landlordlens/ui'
import Link from 'next/link'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'
import { DataExportButton } from './data-export-button'
import { DeleteAccountButton } from './delete-account-button'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) return null

  const [profile] = await db.select({
    lastExportRequestedAt: profiles.lastExportRequestedAt,
  }).from(profiles).where(eq(profiles.id, user.id))

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
            <p className="text-xs text-gray-500 font-mono mt-0.5">{user.id}</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Download your data</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Export all your account data as a JSON file. One request per 24 hours.
            </p>
            <DataExportButton lastRequestedAt={profile?.lastExportRequestedAt ?? null} />
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-red-600">Delete account</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Permanently delete your account and all data after a 30-day grace period.
            </p>
            <DeleteAccountButton email={user.email ?? ''} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
