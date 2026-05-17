import Link from 'next/link'
import { getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-gray-500">
            Start free. Upgrade when you need more properties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tierOrder.map((tier) => {
            const config = getTierConfig(tier)
            const isPaid = config.monthlyPriceGbp > 0
            const isPopular = tier === 'professional'

            return (
              <div
                key={tier}
                className={`relative bg-white rounded-xl border-2 p-6 flex flex-col ${isPopular ? 'border-indigo-500 shadow-lg' : 'border-gray-200'}`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{config.name}</h2>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {isPaid ? `£${config.monthlyPriceGbp}` : 'Free'}
                    </span>
                    {isPaid && <span className="text-gray-400 text-sm">/month</span>}
                  </div>
                  {isPaid && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      £{config.yearlyPriceGbp}/year (save 2 months)
                    </p>
                  )}
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {config.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={`block text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isPopular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tier === 'free' ? 'Get started' : 'Start free trial'}
                </Link>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          All prices in GBP. VAT may apply. Cancel anytime.
        </p>

        <div className="text-center mt-8">
          <Link href="/sign-in" className="text-indigo-600 hover:underline text-sm">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
