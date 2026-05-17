import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const caller = await createServerCaller()
  const [stats, expenses] = await Promise.all([
    caller.analytics.portfolioStats(),
    caller.analytics.expensesSummary(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Portfolio performance and financial summary</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Total properties</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">{stats.totalProperties}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Compliance records</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">{stats.totalComplianceRecords}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expenses by category</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500">No expenses recorded yet</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((row) => (
                <div key={row.category} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 capitalize">{row.category}</span>
                  <span className="font-semibold text-gray-900">
                    £{Number(row.total ?? 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
