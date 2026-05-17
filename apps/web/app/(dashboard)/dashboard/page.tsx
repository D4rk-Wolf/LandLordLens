import { createServerCaller } from '@/lib/trpc/server'
import { StatCard } from '@/app/components/dashboard/stat-card'
import { ComplianceAlertList } from '@/app/components/dashboard/compliance-alert-list'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'
import Link from 'next/link'
import { ErrorButton } from '@/app/components/sentry-error-button'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const caller = await createServerCaller()
  const [stats, compliance] = await Promise.all([
    caller.analytics.portfolioStats(),
    caller.compliance.list(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio overview</h1>
        <p className="text-sm text-gray-500 mt-1">Your property management at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total properties" value={stats.totalProperties} />
        <StatCard
          label="Compliance records"
          value={stats.totalComplianceRecords}
          sublabel="across all properties"
        />
        <StatCard
          label="Quick links"
          value="→"
          sublabel="Add property below"
          accent="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceAlertList records={compliance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/properties/new"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              Add property
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/dashboard/compliance"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              View all compliance
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              View analytics
              <span className="text-gray-400">→</span>
            </Link>
            <ErrorButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
