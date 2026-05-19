/**
 * @module routers/billing
 * tRPC router for Stripe billing: exposes the current subscription state,
 * initiates Stripe Checkout for upgrades, and opens the Stripe Customer Portal
 * for self-service plan management.
 */

import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import {
  createCheckoutSession,
  createCustomerPortalSession,
  createStripeCustomer,
} from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'
import { eq } from 'drizzle-orm'
import { profiles } from '@landlordlens/db/schema'

export const billingRouter = createTRPCRouter({
  /**
   * Returns the authenticated landlord's current subscription details as
   * stored in the `profiles` table.
   *
   * This data is written by the Stripe webhook handler on subscription
   * lifecycle events and should be treated as the single source of truth for
   * billing state within the app.
   */
  subscription: protectedProcedure.query(({ ctx }) => {
    const { profile } = ctx
    return {
      tier: profile.subscription as SubscriptionTier,
      status: profile.subscriptionStatus,
      period: profile.subscriptionPeriod,
      endDate: profile.subscriptionEndDate,
      /** Indicates whether the user already has a Stripe customer record. */
      hasStripeCustomer: !!profile.stripeCustomerId,
    }
  }),

  /**
   * Creates a Stripe Checkout Session for upgrading to a paid plan.
   *
   * If the user does not yet have a Stripe customer record, one is created
   * on demand and saved to `profiles.stripeCustomerId` before redirecting.
   * This lazy-creation approach avoids creating Stripe customers for users
   * who never attempt to upgrade.
   *
   * The `tier` metadata attached to `subscription_data` is read back by the
   * `customer.subscription.created` webhook to write the correct tier to the
   * `profiles` table.
   *
   * @returns An object containing the Stripe Checkout Session URL to redirect the client to.
   */
  checkout: protectedProcedure
    .input(
      z.object({
        /** The target subscription tier (free is excluded — users cannot "upgrade" to free). */
        tier: z.enum(['professional', 'business', 'enterprise']),
        interval: z.enum(['month', 'year']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, user, profile } = ctx
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

      let customerId = profile.stripeCustomerId
      if (!customerId) {
        // Create a Stripe customer so the checkout session is associated with
        // a permanent customer object rather than a one-off guest.
        const customer = await createStripeCustomer(user.email ?? '', user.id)
        customerId = customer.id
        await db
          .update(profiles)
          .set({ stripeCustomerId: customerId, updatedAt: new Date() })
          .where(eq(profiles.id, user.id))
      }

      const session = await createCheckoutSession({
        customerId,
        tier: input.tier as SubscriptionTier,
        interval: input.interval,
        successUrl: `${appUrl}/dashboard/settings/billing?success=1`,
        cancelUrl: `${appUrl}/dashboard/settings/billing`,
      })

      return { url: session.url! }
    }),

  /**
   * Opens a Stripe Customer Portal session so the user can manage their
   * subscription (cancel, change plan, update payment method) without
   * leaving to Stripe's hosted page permanently.
   *
   * Requires an existing Stripe customer ID — throws BAD_REQUEST with an
   * actionable message if the user is still on the free plan.
   *
   * @returns An object containing the portal session URL to redirect the client to.
   */
  portal: protectedProcedure.mutation(async ({ ctx }) => {
    const { profile } = ctx
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    if (!profile.stripeCustomerId) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'No Stripe customer found — upgrade to a paid plan first' })
    }

    const session = await createCustomerPortalSession(
      profile.stripeCustomerId,
      `${appUrl}/dashboard/settings/billing`,
    )

    return { url: session.url }
  }),
})
