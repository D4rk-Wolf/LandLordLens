import { createServerCaller } from '@/lib/trpc/server'

export const dynamic = 'force-dynamic'

function gbp(n: number | null): string {
  if (n === null || isNaN(n)) return '—'
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

function pct(n: number | null): string {
  if (n === null || isNaN(n)) return '—'
  return `${n.toFixed(2)}%`
}

export default async function PortfolioAnalyticsPage() {
  const caller = await createServerCaller()
  const kpis = await caller.analytics.portfolioKPIs()

  const cards = [
    { label: 'Annual Rental Income', value: gbp(kpis.annualRentalIncome), sub: 'Gross rent across all active tenancies' },
    { label: 'Net Operating Income', value: gbp(kpis.noi),                sub: 'Rental income minus operating expenses' },
    { label: 'Gross Yield',          value: pct(kpis.grossYield),         sub: 'Annual rent ÷ current portfolio value' },
    { label: 'Net Yield',            value: pct(kpis.netYield),           sub: 'NOI ÷ current portfolio value' },
    { label: 'Portfolio Equity',     value: gbp(kpis.equity),             sub: 'Current value minus mortgage balances' },
    { label: 'Cash-on-Cash Return',  value: pct(kpis.cashOnCash),         sub: 'Annual cash flow ÷ total purchase price' },
  ]

  const missingData = !kpis.grossYield || !kpis.cashOnCash

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          {kpis.occupiedCount} of {kpis.propertyCount} {kpis.propertyCount === 1 ? 'property' : 'properties'} occupied
        </p>
      </div>

      {kpis.propertyCount === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Add properties to see portfolio analytics.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(c => (
              <div key={c.label} className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{c.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{c.value}</p>
                <p className="mt-1 text-xs text-gray-500">{c.sub}</p>
              </div>
            ))}
          </div>
          {missingData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Complete your property records</strong> to unlock all KPIs. Add current market
              value, mortgage balance, and monthly mortgage payment to each property to enable yield
              and cash-on-cash calculations.
            </div>
          )}
        </>
      )}
    </div>
  )
}
