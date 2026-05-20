import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

export default async function PropertyInspectionsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let inspectionList
  try {
    inspectionList = await caller.inspections.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Inspections</h2>

      {inspectionList.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No inspections recorded</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inspectionList.map((inspection) => (
            <Card key={inspection.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {inspection.inspectionType.replace(/_/g, ' ')} inspection
                  </p>
                  <p className="text-sm text-gray-500">By {inspection.conductedBy}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Scheduled: {inspection.scheduledDate}
                    {inspection.actualDate && ` · Completed: ${inspection.actualDate}`}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                  inspection.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : inspection.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {inspection.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
