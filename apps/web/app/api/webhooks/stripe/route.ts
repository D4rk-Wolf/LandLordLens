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
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
