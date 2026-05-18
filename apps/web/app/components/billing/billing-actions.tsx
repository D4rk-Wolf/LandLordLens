/**
 * Billing action components — client-side buttons that initiate Stripe
 * Checkout and the Stripe Customer Portal.
 *
 * Both components use tRPC mutations which call server-side procedures that
 * create Stripe sessions and return redirect URLs.  On success the browser is
 * redirected via `window.location.href` (a hard navigation) because Stripe's
 * Checkout and Portal are external pages outside the Next.js router.
 */
'use client'
import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'
import type { SubscriptionTier } from '@landlordlens/billing'

/** Props for {@link CheckoutButtons}. */
interface CheckoutButtonsProps {
  /**
   * The subscription tier to upgrade to.  The `free` tier is excluded because
   * it requires no payment and therefore no Stripe Checkout session.
   */
  tier: Exclude<SubscriptionTier, 'free'>
}

/**
 * Renders monthly and annual billing interval buttons for a given paid tier.
 *
 * Clicking either button calls `billing.checkout` which creates a Stripe
 * Checkout Session on the server and returns its hosted URL.  The browser is
 * then redirected to Stripe's checkout page.  On completion, Stripe redirects
 * back to `/dashboard/settings/billing?success=true` and fires a webhook to
 * update the subscription in the database.
 *
 * @param tier - The paid subscription tier the user is purchasing.
 */
export function CheckoutButtons({ tier }: CheckoutButtonsProps) {
  const [error, setError] = useState<string | null>(null)
  const mutation = trpc.billing.checkout.useMutation({
    onSuccess: (data) => {
      // Hard-redirect to the Stripe-hosted checkout page.
      window.location.href = data.url
    },
    onError: (err) => setError(err.message),
  })

  return (
    <div className="flex flex-col gap-2 mt-2">
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={() => { setError(null); mutation.mutate({ tier, interval: 'month' }) }}
          disabled={mutation.isPending}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {mutation.isPending ? '...' : 'Monthly'}
        </button>
        <button
          onClick={() => { setError(null); mutation.mutate({ tier, interval: 'year' }) }}
          disabled={mutation.isPending}
          className="flex-1 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
        >
          {mutation.isPending ? '...' : 'Annual'}
        </button>
      </div>
    </div>
  )
}

/**
 * Opens the Stripe Customer Portal so the user can manage their subscription,
 * update payment methods, view invoices, or cancel.
 *
 * Only rendered when the user already has a Stripe customer record
 * (`subscription.hasStripeCustomer === true`).  The `billing.portal` procedure
 * creates a portal session and returns its URL; the browser is then redirected.
 */
export function ManageSubscriptionButton() {
  const [error, setError] = useState<string | null>(null)
  const mutation = trpc.billing.portal.useMutation({
    onSuccess: (data) => {
      // Hard-redirect to the Stripe-hosted customer portal.
      window.location.href = data.url
    },
    onError: (err) => setError(err.message),
  })

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        onClick={() => { setError(null); mutation.mutate() }}
        disabled={mutation.isPending}
        className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 transition-colors"
      >
        {mutation.isPending ? 'Loading...' : 'Manage subscription'}
      </button>
    </div>
  )
}
