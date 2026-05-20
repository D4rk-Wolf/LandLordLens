import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { PropertyCard } from '@/app/components/properties/property-card'
import { Button } from '@landlordlens/ui'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PropertiesPage() {
  const caller = await createServerCaller()
  const properties = await caller.properties.list()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">{properties.length} propert{properties.length === 1 ? 'y' : 'ies'}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 font-medium">No properties yet</p>
          <p className="text-sm text-gray-500 mt-1">Add your first property to get started</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/properties/new">Add property</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
