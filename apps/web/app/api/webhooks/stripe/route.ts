/**
 * Stripe webhook receiver — `/api/webhooks/stripe`
 *
 * Stripe calls this endpoint with signed event payloads whenever a billing
 * event occurs (e.g. `checkout.session.completed`, `customer.subscription.updated`,
 * `invoice.payment_failed`).
 *
 * Security: the raw request body and the `stripe-signature` header are passed
 * to `constructWebhookEvent` which verifies the HMAC signature using the
 * `STRIPE_WEBHOOK_SECRET` environment variable.  Any request without a valid
 * signature is rejected with a 400 before any business logic runs.
 *
 * Processing: `handleWebhookEvent` (from `@landlordlens/billing`) maps each
 * Stripe event type to the appropriate database update — for example, updating
 * the user's subscription tier and `subscriptionEndDate` in the `profiles` table
 * after a successful checkout or renewal.
 */
import { NextResponse } from 'next/server'
import { constructWebhookEvent, handleWebhookEvent } from '@landlordlens/billing'
import { db } from '@landlordlens/db'

export async function POST(req: Request) {
  // Stripe sends the raw body; reading it as text preserves the exact bytes
  // required for HMAC signature verification (JSON.parse would reformat it).
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  try {
    // Throws if the signature is invalid or the webhook secret is misconfigured.
    const event = constructWebhookEvent(body, signature)
    await handleWebhookEvent(event, db)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 })
  }
}
