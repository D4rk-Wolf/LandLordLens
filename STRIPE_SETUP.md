# Stripe Setup Guide

## Quick Setup Steps

### 1. Create Stripe Account
1. Go to https://stripe.com and sign up
2. Complete business verification (required for live mode)
3. Navigate to Dashboard > Developers > API keys

### 2. Create Products and Prices

#### In Stripe Dashboard:
1. Go to **Products** in the sidebar
2. Click **+ Add product**

#### Create Basic Monthly Subscription:
- **Name**: Basic Monthly
- **Description**: Basic tier - 2-5 properties
- **Pricing**: 
  - **Recurring**: Monthly
  - **Price**: £9.99
  - **Currency**: GBP
- Click **Save product**
- Copy the **Price ID** (starts with `price_...`)
- Add to `.env` as `STRIPE_PRICE_BASIC_MONTHLY`

#### Create Basic Yearly Subscription:
- **Name**: Basic Yearly
- **Description**: Basic tier - 2-5 properties (Yearly)
- **Pricing**: 
  - **Recurring**: Yearly
  - **Price**: £99.00
  - **Currency**: GBP
- Click **Save product**
- Copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_BASIC_YEARLY`

#### Create Premium Monthly Subscription:
- **Name**: Premium Monthly
- **Description**: Premium tier - 5+ properties
- **Pricing**: 
  - **Recurring**: Monthly
  - **Price**: £19.99
  - **Currency**: GBP
- Click **Save product**
- Copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_PREMIUM_MONTHLY`

#### Create Premium Yearly Subscription:
- **Name**: Premium Yearly
- **Description**: Premium tier - 5+ properties (Yearly)
- **Pricing**: 
  - **Recurring**: Yearly
  - **Price**: £199.00
  - **Currency**: GBP
- Click **Save product**
- Copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_PREMIUM_YEARLY`

### 3. Setup Webhooks

#### For Development (using Stripe CLI):
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:5000/api/webhooks/stripe`
4. Copy the webhook signing secret (starts with `whsec_...`)
5. Add to `.env` as `STRIPE_WEBHOOK_SECRET`

#### For Production:
1. Go to Dashboard > Developers > Webhooks
2. Click **+ Add endpoint**
3. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
4. **Description**: LandLordLens Subscription Webhooks
5. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_...`)
8. Add to `.env` as `STRIPE_WEBHOOK_SECRET`

### 4. Environment Variables

Add these to your `.env` file:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_live_your_live_secret_key  # or sk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs
STRIPE_PRICE_BASIC_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_BASIC_YEARLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_PREMIUM_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_PREMIUM_YEARLY=price_xxxxxxxxxxxxx
```

### 5. Test Mode vs Live Mode

#### Test Mode:
- Use `sk_test_...` keys
- Use test price IDs
- Test cards: https://stripe.com/docs/testing
- No real charges

#### Live Mode:
- Use `sk_live_...` keys
- Use live price IDs
- Real charges
- Requires business verification

### 6. Testing Checklist

- [ ] Create checkout session
- [ ] Complete test payment
- [ ] Verify webhook received
- [ ] Check user subscription updated
- [ ] Verify payment record created
- [ ] Test subscription cancellation
- [ ] Test failed payment handling
- [ ] Test subscription renewal

### 7. Common Issues

**Webhook not receiving events:**
- Verify webhook URL is accessible
- Check webhook secret matches
- Ensure endpoint accepts raw body (not JSON parsed)
- Check Stripe Dashboard > Webhooks for delivery logs

**Price ID not found:**
- Verify price IDs are correct in `.env`
- Check you're using test/live keys matching test/live prices
- Ensure prices are active in Stripe Dashboard

**Payment succeeds but subscription not updated:**
- Check webhook handler logs
- Verify webhook events are being received
- Check database connection
- Review webhook event payload in Stripe Dashboard

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- API Reference: https://stripe.com/docs/api
