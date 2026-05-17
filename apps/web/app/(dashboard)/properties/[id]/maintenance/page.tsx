import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

const priorityColour: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
}

export default async function PropertyMaintenancePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let tickets
  try {
    tickets = await caller.maintenance.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Maintenance</h2>

      {tickets.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No maintenance tickets</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  {ticket.description && (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{ticket.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(ticket.createdAt).toLocaleDateString('en-GB')}
                    {ticket.assignedTo && ` · Assigned to ${ticket.assignedTo}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${priorityColour[ticket.priority] ?? 'bg-gray-100 text-gray-600'}`}>
                    {ticket.priority}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {ticket.status.replace(/_/g, ' ')}
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
