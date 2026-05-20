import { notFound } from 'next/navigation'
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
  if (days < 0) return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Overdue</span>
  if (days <= 14) return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Expires in {days}d</span>
  if (days <= 60) return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Due in {days}d</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Valid</span>
}

export default async function PropertyCompliancePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let records
  try {
    records = await caller.compliance.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Compliance records</h2>

      {records.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No compliance records for this property</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => {
            const days = daysUntil(record.expiryDate)
            return (
              <Card key={record.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {record.complianceType.replace(/_/g, ' ')}
                    </p>
                    {record.issuer && <p className="text-sm text-gray-500">Issued by {record.issuer}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Issued: {record.issueDate} · Expires: {record.expiryDate}
                    </p>
                  </div>
                  {statusChip(days)}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
