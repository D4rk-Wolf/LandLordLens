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
  subscription: protectedProcedure.query(({ ctx }) => {
    const { profile } = ctx
    return {
      tier: profile.subscription as SubscriptionTier,
      status: profile.subscriptionStatus,
      period: profile.subscriptionPeriod,
      endDate: profile.subscriptionEndDate,
      hasStripeCustomer: !!profile.stripeCustomerId,
    }
  }),

  checkout: protectedProcedure
    .input(
      z.object({
        tier: z.enum(['professional', 'business', 'enterprise']),
        interval: z.enum(['month', 'year']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, user, profile } = ctx
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

      let customerId = profile.stripeCustomerId
      if (!customerId) {
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
