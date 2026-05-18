import { NextResponse } from 'next/server'
import { constructWebhookEvent, handleWebhookEvent } from '@landlordlens/billing'
import { db } from '@landlordlens/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  try {
    const event = constructWebhookEvent(body, signature)
    await handleWebhookEvent(event, db)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 })
  }
}
