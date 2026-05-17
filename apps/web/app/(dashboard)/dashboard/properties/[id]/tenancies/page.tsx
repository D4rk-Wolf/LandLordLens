import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

export default async function PropertyTenanciesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let tenancies
  try {
    tenancies = await caller.tenancies.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Tenancies</h2>
      </div>

      {tenancies.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No tenancies recorded for this property</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tenancies.map((tenancy) => (
            <Card key={tenancy.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{tenancy.tenantName}</p>
                  <p className="text-sm text-gray-500">{tenancy.tenantEmail}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {tenancy.startDate} → {tenancy.endDate ?? 'ongoing'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    £{Number(tenancy.monthlyRent).toLocaleString()}/mo
                  </p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 capitalize ${tenancy.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tenancy.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
