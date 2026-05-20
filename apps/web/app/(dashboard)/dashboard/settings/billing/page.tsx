import { createServerCaller } from '@/lib/trpc/server'
import { getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'
import { CheckoutButtons, ManageSubscriptionButton } from '@/app/components/billing/billing-actions'

export const dynamic = 'force-dynamic'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const caller = await createServerCaller()
  const subscription = await caller.billing.subscription()
  const { success } = await searchParams

  const currentTierConfig = getTierConfig(subscription.tier)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription</p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
          Subscription updated successfully.
        </div>
      )}

      <div className="p-4 bg-white border border-gray-200 rounded-md flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Current plan: {currentTierConfig.name}</p>
          {subscription.endDate && (
            <p className="text-xs text-gray-500 mt-0.5">
              Renews {new Date(subscription.endDate).toLocaleDateString('en-GB')}
            </p>
          )}
        </div>
        {subscription.hasStripeCustomer && <ManageSubscriptionButton />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tierOrder.map((tier) => {
          const config = getTierConfig(tier)
          const isCurrent = subscription.tier === tier

          return (
            <Card key={tier} className={isCurrent ? 'ring-2 ring-amber-500' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{config.name}</CardTitle>
                  {isCurrent && (
                    <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {config.monthlyPriceGbp === 0 ? 'Free' : `£${config.monthlyPriceGbp}/mo`}
                  </p>
                  {config.yearlyPriceGbp > 0 && (
                    <p className="text-xs text-gray-500">or £{config.yearlyPriceGbp}/yr</p>
                  )}
                </div>
                <ul className="space-y-1">
                  {config.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                {!isCurrent && tier !== 'free' && (
                  <CheckoutButtons tier={tier as Exclude<SubscriptionTier, 'free'>} />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
