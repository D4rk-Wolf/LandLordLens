interface Address {
  line1: string
  line2?: string
  city: string
  county?: string
  postcode: string
  country?: string
}

export function formatAddress(address: unknown): string {
  const a = address as Address
  return [a.line1, a.line2, a.city, a.postcode].filter(Boolean).join(', ')
}

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
