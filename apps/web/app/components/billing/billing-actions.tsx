'use client'
import { trpc } from '@/lib/trpc/client'
import type { SubscriptionTier } from '@landlordlens/billing'

interface CheckoutButtonsProps {
  tier: Exclude<SubscriptionTier, 'free'>
}

export function CheckoutButtons({ tier }: CheckoutButtonsProps) {
  const mutation = trpc.billing.checkout.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url
    },
  })

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => mutation.mutate({ tier, interval: 'month' })}
        disabled={mutation.isPending}
        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {mutation.isPending ? '...' : 'Monthly'}
      </button>
      <button
        onClick={() => mutation.mutate({ tier, interval: 'year' })}
        disabled={mutation.isPending}
        className="flex-1 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
      >
        {mutation.isPending ? '...' : 'Annual'}
      </button>
    </div>
  )
}

export function ManageSubscriptionButton() {
  const mutation = trpc.billing.portal.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url
    },
  })

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
    >
      {mutation.isPending ? 'Loading...' : 'Manage subscription'}
    </button>
  )
}
