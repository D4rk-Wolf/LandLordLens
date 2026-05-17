import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function statusChip(days: number) {
  if (days < 0)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Overdue {Math.abs(days)}d</span>
  if (days <= 14)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Expires in {days}d</span>
  if (days <= 60)
    return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Due in {days}d</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Valid</span>
}

export default async function CompliancePage() {
  const caller = await createServerCaller()
  const records = await caller.compliance.list()

  const overdue = records.filter((r) => daysUntil(r.expiryDate) < 0)
  const soonDue = records.filter((r) => {
    const d = daysUntil(r.expiryDate)
    return d >= 0 && d <= 30
  })
  const valid = records.filter((r) => daysUntil(r.expiryDate) > 30)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
        <p className="text-sm text-gray-500 mt-1">All compliance records across your portfolio</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{overdue.length}</p>
          <p className="text-sm text-red-600">Overdue</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{soonDue.length}</p>
          <p className="text-sm text-amber-600">Due in 30 days</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{valid.length}</p>
          <p className="text-sm text-green-600">Valid</p>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No compliance records yet</p>
          <p className="text-sm text-gray-400 mt-1">Add compliance records from individual property pages</p>
        </div>
      ) : (
        <div className="space-y-2">
          {records
            .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate))
            .map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {record.complianceType.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Expires: {record.expiryDate}
                      {record.issuer && ` · ${record.issuer}`}
                    </p>
                  </div>
                  {statusChip(daysUntil(record.expiryDate))}
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
