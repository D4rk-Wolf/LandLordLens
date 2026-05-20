'use client'

import { useState } from 'react'
import { SECTION_8_GROUNDS, type Section8Ground } from './section8-data'

export interface WizardTenancy {
  id: string
  tenantName: string
  address: string
  hasGasSafety: boolean
  hasEICR: boolean
  hasEPC: boolean
  hasDepositProtected: boolean
  hasHowToRentGuide: boolean
}

interface Props {
  tenancies: WizardTenancy[]
}

function addWeeks(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n * 7)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function addMonths(n: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + n)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function earliestPossessionDate(noticePeriod: string): string {
  if (noticePeriod.startsWith('Immediate')) return addWeeks(0)
  const w = noticePeriod.match(/(\d+) weeks?/)
  if (w) return addWeeks(parseInt(w[1]!))
  const m = noticePeriod.match(/(\d+) months?/)
  if (m) return addMonths(parseInt(m[1]!))
  return 'See legal advice'
}

function checkPrereq(prereq: string, t: WizardTenancy): boolean {
  if (prereq === 'Gas Safety certificate valid') return t.hasGasSafety
  if (prereq === 'EICR valid') return t.hasEICR
  if (prereq === 'EPC provided') return t.hasEPC
  if (prereq === 'Deposit protected') return t.hasDepositProtected
  if (prereq === 'How to Rent guide provided') return t.hasHowToRentGuide
  return true
}

function getFailingPrereqs(ground: Section8Ground, t: WizardTenancy): string[] {
  return ground.prerequisites.filter(p => !checkPrereq(p, t))
}

export function Section8Wizard({ tenancies }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [tenancy, setTenancy] = useState<WizardTenancy | null>(null)
  const [ground, setGround] = useState<Section8Ground | null>(null)

  if (tenancies.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500 font-medium">No active tenancies found</p>
        <p className="text-sm text-gray-500 mt-1">Add a tenancy before using the Section 8 wizard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm">
        {([1, 2, 3] as const).map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              s === step ? 'bg-amber-500 text-white' : s < step ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>{s}</div>
            {s < 3 && <div className={`h-px w-8 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="ml-2 text-gray-500">
          {step === 1 ? 'Select tenancy' : step === 2 ? 'Select grounds' : 'Notice summary'}
        </span>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Which tenancy requires a Section 8 notice?</h2>
          {tenancies.map(t => (
            <button
              key={t.id}
              onClick={() => { setTenancy(t); setStep(2) }}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <p className="font-medium text-gray-900">{t.tenantName}</p>
              <p className="text-sm text-gray-500">{t.address}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && tenancy && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Select the ground for possession</h2>
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </div>
          <p className="text-sm text-gray-600">Tenancy: <span className="font-medium">{tenancy.tenantName}</span></p>

          {(['mandatory', 'discretionary'] as const).map(type => (
            <div key={type}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {type === 'mandatory' ? 'Mandatory grounds — court must grant possession' : 'Discretionary grounds — court decides'}
              </h3>
              <div className="space-y-2">
                {SECTION_8_GROUNDS.filter(g => g.type === type).map(g => {
                  const failing = getFailingPrereqs(g, tenancy)
                  const canUse = failing.length === 0
                  return (
                    <button
                      key={g.ground}
                      onClick={() => { if (canUse) { setGround(g); setStep(3) } }}
                      disabled={!canUse}
                      className={`w-full text-left p-3 border rounded-lg transition-colors ${
                        canUse
                          ? 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                          : 'border-red-100 bg-red-50 opacity-70 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-semibold text-amber-600 mr-2">{g.ground}</span>
                          <span className="text-sm font-medium text-gray-900">{g.title}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{g.description}</p>
                        </div>
                        <span className="text-xs text-gray-500 shrink-0 whitespace-nowrap">{g.noticePeriod}</span>
                      </div>
                      {!canUse && (
                        <p className="mt-2 text-xs text-red-600">
                          Cannot serve: {failing.join('; ')}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && tenancy && ground && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Notice summary</h2>
            <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </div>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            {([
              ['Tenant', tenancy.tenantName],
              ['Ground', `${ground.ground} — ${ground.title}`],
              ['Notice period', ground.noticePeriod],
              ['Earliest possession date', earliestPossessionDate(ground.noticePeriod)],
            ] as const).map(([label, value]) => (
              <div key={label} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-medium ${label === 'Earliest possession date' ? 'text-amber-700' : 'text-gray-900'}`}>{value}</span>
              </div>
            ))}
          </div>
          {ground.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <strong>Note:</strong> {ground.notes}
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-800 mb-2">Next steps</p>
            <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
              <li>Download Form 3 (Notice Seeking Possession) from GOV.UK.</li>
              <li>Enter today&apos;s date, the ground number, and the earliest possession date shown above.</li>
              <li>Serve by post, email (if tenancy allows), or personal delivery.</li>
              <li>Keep proof of service — recorded delivery receipt or email read receipt.</li>
              <li>If tenant does not vacate, apply to court for a possession order.</li>
            </ol>
          </div>
          <p className="text-xs text-gray-500">
            This wizard generates a draft summary for reference only. Always seek qualified legal advice before serving a Section 8 notice.
          </p>
        </div>
      )}
    </div>
  )
}
