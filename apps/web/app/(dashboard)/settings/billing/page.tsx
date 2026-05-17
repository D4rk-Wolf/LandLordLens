import { getCurrentUser } from '@landlordlens/auth'
import { getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default async function BillingPage() {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tierOrder.map((tier) => {
          const config = getTierConfig(tier)
          return (
            <Card key={tier} className="relative">
              <CardHeader>
                <CardTitle className="text-base">{config.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {config.monthlyPriceGbp === 0 ? 'Free' : `£${config.monthlyPriceGbp}/mo`}
                  </p>
                  {config.yearlyPriceGbp > 0 && (
                    <p className="text-xs text-gray-400">or £{config.yearlyPriceGbp}/yr</p>
                  )}
                </div>
                <ul className="space-y-1">
                  {config.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="text-sm text-gray-500">
        To upgrade or manage your subscription, contact support or use the Stripe customer portal when available.
      </p>
    </div>
  )
}
