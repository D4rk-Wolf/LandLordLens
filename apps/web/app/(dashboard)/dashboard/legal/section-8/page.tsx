import { createServerCaller } from '@/lib/trpc/server'
import { Section8Wizard } from './section-8-wizard'

export const dynamic = 'force-dynamic'

export default async function Section8Page() {
  const caller = await createServerCaller()
  const [tenanciesRaw, propertiesRaw, complianceRaw] = await Promise.all([
    caller.tenancies.list(),
    caller.properties.list(),
    caller.compliance.list(),
  ])

  const now = new Date()

  const tenancies = tenanciesRaw
    .filter(t => t.status === 'active')
    .map(t => {
      const property = propertiesRaw.find(p => p.id === t.propertyId)
      const addr = property?.address as Record<string, string> | undefined
      const address = addr
        ? [addr.line1, addr.city].filter(Boolean).join(', ')
        : 'Unknown address'
      const compliance = complianceRaw.filter(c => c.propertyId === t.propertyId)

      const gasCert = compliance.find(c => c.complianceType === 'gas_safety')
      const eirCert = compliance.find(c => c.complianceType === 'electrical')
      const epcCert = compliance.find(c => c.complianceType === 'epc')

      return {
        id: t.id,
        tenantName: t.tenantName,
        address,
        hasGasSafety: gasCert ? new Date(gasCert.expiryDate) >= now : false,
        hasEICR: eirCert ? new Date(eirCert.expiryDate) >= now : false,
        hasEPC: !!epcCert,
        hasDepositProtected: t.depositProtected,
        hasHowToRentGuide: t.howToRentGuideProvided,
      }
    })

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Section 8 notice wizard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Section 21 was abolished on 1 May 2026. All possessions now proceed under Section 8.
        </p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <strong>Legal disclaimer:</strong> This wizard generates a draft notice for reference only.
        Always seek qualified legal advice before serving a Section 8 notice. Incorrectly served
        notices can invalidate possession proceedings.
      </div>
      <Section8Wizard tenancies={tenancies} />
    </div>
  )
}
