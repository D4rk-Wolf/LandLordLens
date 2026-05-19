/**
 * @module billing/client
 * Lazily-initialised singleton Stripe SDK client.
 *
 * Using a module-level singleton avoids re-instantiating the Stripe client on
 * every request in a serverless environment while still failing loudly at the
 * first call if the secret key is missing (rather than at module load time,
 * which would break builds where the key is injected at runtime).
 */
import Stripe from 'stripe'

/** Module-level singleton; initialised once and reused across requests. */
let stripeClient: Stripe | null = null

/**
 * Returns the shared Stripe client instance, creating it on first call.
 *
 * @throws {Error} If `STRIPE_SECRET_KEY` is not set in the environment.
 */
export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    stripeClient = new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
  }
  return stripeClient
}
