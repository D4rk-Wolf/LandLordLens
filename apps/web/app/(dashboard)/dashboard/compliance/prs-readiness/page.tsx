import { createServerCaller } from '@/lib/trpc/server'

export const dynamic = 'force-dynamic'

const PRS_CHECKS = [
  { key: 'gasSafety',    label: 'Gas Safety Certificate',   detail: 'Valid CP12, not expired' },
  { key: 'electrical',   label: 'EICR',                     detail: 'Valid, not expired' },
  { key: 'epc',          label: 'EPC provided',             detail: 'Certificate on record' },
  { key: 'epcRating',    label: 'EPC rating recorded',      detail: 'Rating stored in property record' },
  { key: 'fullAddress',  label: 'Full address',             detail: 'Line 1, city, and postcode present' },
  { key: 'propertyType', label: 'Property type',            detail: 'House, flat, etc. selected' },
] as const

type CheckKey = typeof PRS_CHECKS[number]['key']

export default async function PRSReadinessPage() {
  const caller = await createServerCaller()
  const [properties, compliance] = await Promise.all([
    caller.properties.list(),
    caller.compliance.list(),
  ])

  const now = new Date()

  const readiness = properties.map(property => {
    const propCompliance = compliance.filter(c => c.propertyId === property.id)
    const addr = property.address as Record<string, string>

    const checks: Record<CheckKey, boolean> = {
      gasSafety: propCompliance.some(c => c.complianceType === 'gas_safety' && new Date(c.expiryDate) >= now),
      electrical: propCompliance.some(c => c.complianceType === 'electrical' && new Date(c.expiryDate) >= now),
      epc: propCompliance.some(c => c.complianceType === 'epc'),
      epcRating: !!property.epcRating,
      fullAddress: !!(addr?.line1 && addr?.city && addr?.postcode),
      propertyType: !!property.propertyType,
    }

    const passed = Object.values(checks).filter(Boolean).length
    const total = PRS_CHECKS.length
    const pct = Math.round((passed / total) * 100)

    return { property, checks, passed, total, pct, isReady: passed === total }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">PRS Database Readiness</h1>
        <p className="text-sm text-gray-500 mt-1">
          Mandatory registration opens late 2026. Non-registration blocks serving Section 8 notices
          and risks fines of £5,000–£30,000 plus up to 24 months&apos; rent repayment orders.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>What is the PRS Database?</strong> All landlords must register themselves and each
        property on the new government database. Missing the data below will block registration.
        Properties complete here will be registration-ready on day one.
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Add properties to check PRS readiness.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {readiness.map(({ property, checks, passed, total, pct, isReady }) => {
            const addr = property.address as Record<string, string>
            return (
              <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{addr?.line1 ?? 'Unknown address'}</p>
                    <p className="text-sm text-gray-500">
                      {[addr?.city, addr?.postcode].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isReady
                      ? 'bg-green-100 text-green-800'
                      : pct >= 50
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isReady ? 'Ready' : `${passed}/${total} checks`}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isReady ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {PRS_CHECKS.map(req => (
                    <div key={req.key} className="flex items-center gap-2 text-sm">
                      <span className={checks[req.key] ? 'text-green-500' : 'text-red-400'}>
                        {checks[req.key] ? '✓' : '✗'}
                      </span>
                      <span className={checks[req.key] ? 'text-gray-700' : 'text-red-700'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
