import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { AddressDisplay } from '@/app/components/properties/address-display'

export const dynamic = 'force-dynamic'

const statusColour: Record<string, string> = {
  vacant: 'bg-amber-100 text-amber-800 border-amber-200',
  occupied: 'bg-green-100 text-green-800 border-green-200',
  maintenance: 'bg-red-100 text-red-800 border-red-200',
}

const subTabs = [
  { href: 'tenancies', label: 'Tenancies' },
  { href: 'compliance', label: 'Compliance' },
  { href: 'documents', label: 'Documents' },
  { href: 'expenses', label: 'Expenses' },
  { href: 'inspections', label: 'Inspections' },
  { href: 'maintenance', label: 'Maintenance' },
]

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let property
  try {
    property = await caller.properties.getById({ id })
  } catch {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/properties" className="text-sm text-gray-500 hover:text-gray-600">
              Properties
            </Link>
            <span className="text-gray-500">/</span>
          </div>
          <AddressDisplay address={property.address} />
          <p className="text-xs text-gray-500 mt-1 capitalize">
            {property.propertyType} · {property.bedrooms} bed · {property.bathrooms} bath
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColour[property.status] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          {property.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        {property.rentAmount && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-500">Monthly rent</p>
            <p className="font-semibold text-gray-900 mt-0.5">
              £{Number(property.rentAmount).toLocaleString()}
            </p>
          </div>
        )}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Region</p>
          <p className="font-semibold text-gray-900 mt-0.5 capitalize">
            {property.region.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Added</p>
          <p className="font-semibold text-gray-900 mt-0.5">
            {new Date(property.createdAt).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {subTabs.map(({ href, label }) => (
            <Link
              key={href}
              href={`/dashboard/properties/${id}/${href}`}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {property.notes && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
          <p className="text-sm text-gray-600">{property.notes}</p>
        </div>
      )}
    </div>
  )
}
