/**
 * PropertyCard — summary card for a single property shown in the properties grid.
 *
 * Clicking the card navigates to the property detail page at
 * `/dashboard/properties/[id]`.  The status badge uses a traffic-light colour
 * scheme to communicate occupancy at a glance:
 *   - Amber  — vacant (property is unlet, potential rental income loss)
 *   - Green  — occupied (active tenancy)
 *   - Red    — maintenance (property temporarily taken off-market for works)
 */
import Link from 'next/link'
import { Card, CardContent } from '@landlordlens/ui'
import { formatAddress } from './address-display'
import type { Property } from '@landlordlens/db/schema'

/**
 * Maps a property status value to Tailwind background + text colour classes.
 * Falls back to a neutral grey for any unrecognised status values.
 */
const statusColour: Record<string, string> = {
  vacant: 'bg-amber-100 text-amber-800',
  occupied: 'bg-green-100 text-green-800',
  maintenance: 'bg-red-100 text-red-800',
}

interface Props {
  /** The property record to display. */
  property: Property
}

/**
 * Renders a clickable card summarising a property's address, type, bedroom
 * count, occupancy status, and optional monthly rent.
 */
export function PropertyCard({ property }: Props) {
  return (
    <Link href={`/dashboard/properties/${property.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {formatAddress(property.address)}
              </p>
              <p className="text-xs text-gray-400 capitalize mt-0.5">
                {property.propertyType} · {property.bedrooms} bed
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize flex-shrink-0 ${statusColour[property.status] ?? 'bg-gray-100 text-gray-700'}`}
            >
              {property.status}
            </span>
          </div>
          {/* Only render rent if stored — not all properties have a rent amount set yet. */}
          {property.rentAmount && (
            <p className="text-sm text-gray-600">
              £{Number(property.rentAmount).toLocaleString()}/mo
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
