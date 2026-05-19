/**
 * Address display utilities for UK property addresses.
 *
 * The `address` field on the `properties` table is stored as a JSONB column,
 * so it arrives in the application as `unknown` and must be cast.  Both
 * exports handle that cast internally.
 */

/** Shape of a UK property address as stored in the JSONB `address` column. */
interface Address {
  line1: string
  line2?: string
  city: string
  county?: string
  postcode: string
  country?: string
}

/**
 * Formats a property address JSONB value into a single-line string suitable
 * for compact display (e.g. inside `PropertyCard`).
 *
 * Line 2 and county are omitted if absent; country is always omitted from the
 * short form since all properties are UK-based.
 *
 * @param address - Raw JSONB address value from the database.
 * @returns Comma-separated address string, e.g. "123 High Street, Manchester, M1 1AA".
 */
export function formatAddress(address: unknown): string {
  const a = address as Address
  return [a.line1, a.line2, a.city, a.postcode].filter(Boolean).join(', ')
}

/**
 * Renders a structured UK address using the semantic `<address>` HTML element.
 * Displays address lines stacked vertically, omitting `line2` when absent.
 *
 * @param address - Raw JSONB address value from the database.
 */
export function AddressDisplay({ address }: { address: unknown }) {
  const a = address as Address
  return (
    <address className="not-italic text-sm text-gray-600 space-y-0.5">
      <p>{a.line1}</p>
      {a.line2 && <p>{a.line2}</p>}
      <p>
        {a.city}, {a.postcode}
      </p>
    </address>
  )
}
