# Stripe Setup Guide

## Prerequisites
- Stripe account (sign up at https://stripe.com)
- LandLordLens application running locally

## Step 1: Create Stripe Products

### Professional Tier

#### Create Professional Monthly Subscription:
- **Name**: LandLordLens Professional Monthly
- **Description**: Professional tier - Up to 10 properties
- **Price**: £12.00
- **Billing Period**: Monthly
- **Currency**: GBP

After creating, copy the **Price ID** (starts with `price_`)
- Add to `.env` as `STRIPE_PRICE_PROFESSIONAL_MONTHLY`

#### Create Professional Annual Subscription:
- **Name**: LandLordLens Professional Annual
- **Description**: Professional tier - Up to 10 properties (Annual)
- **Price**: £120.00
- **Billing Period**: Yearly
- **Currency**: GBP

After creating, copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_PROFESSIONAL_ANNUAL`

### Business Tier

#### Create Business Monthly Subscription:
- **Name**: LandLordLens Business Monthly
- **Description**: Business tier - Up to 50 properties, 5 users
- **Price**: £29.00
- **Billing Period**: Monthly
- **Currency**: GBP

After creating, copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_BUSINESS_MONTHLY`

#### Create Business Annual Subscription:
- **Name**: LandLordLens Business Annual
- **Description**: Business tier - Up to 50 properties, 5 users (Annual)
- **Price**: £290.00
- **Billing Period**: Yearly
- **Currency**: GBP

After creating, copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_BUSINESS_ANNUAL`

### Enterprise Tier

#### Create Enterprise Monthly Subscription:
- **Name**: LandLordLens Enterprise Monthly
- **Description**: Enterprise tier - Unlimited properties and users
- **Price**: £99.00
- **Billing Period**: Monthly
- **Currency**: GBP

After creating, copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_ENTERPRISE_MONTHLY`

#### Create Enterprise Annual Subscription:
- **Name**: LandLordLens Enterprise Annual
- **Description**: Enterprise tier - Unlimited properties and users (Annual)
- **Price**: £990.00
- **Billing Period**: Yearly
- **Currency**: GBP

After creating, copy the **Price ID**
- Add to `.env` as `STRIPE_PRICE_ENTERPRISE_ANNUAL`

## Step 2: Configure Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy the **Webhook Signing Secret**
6. Add to `.env` as `STRIPE_WEBHOOK_SECRET`

## Step 3: Update Environment Variables

Add all Stripe configuration to your `.env` file:

```bash
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_xxxxxxxxxxxxx
STRIPE_PRICE_BUSINESS_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_BUSINESS_ANNUAL=price_xxxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_xxxxxxxxxxxxx
```

## Step 4: Test the Integration

### Local Testing with Stripe CLI

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5000/api/webhooks/stripe
   ```
4. Use test card: `4242 4242 4242 4242`

### Test Flow
1. Navigate to pricing page
2. Select a subscription tier
3. Complete checkout with test card
4. Verify webhook received in terminal
5. Check user subscription updated in database

## Step 5: Go Live

1. Switch to live mode in Stripe Dashboard
2. Create live products and prices (same as test mode)
3. Update `.env` with live API keys and price IDs
4. Configure live webhook endpoint
5. Test with real card (small amount)
6. Monitor Stripe Dashboard for activity

## Troubleshooting

### Webhook Not Receiving Events
- Check webhook URL is correct
- Verify webhook secret matches
- Check server logs for errors
- Test with Stripe CLI first

### Payment Fails
- Verify price IDs are correct
- Check Stripe Dashboard for error details
- Ensure test mode matches (test keys with test prices)

### Subscription Not Updating
- Check webhook events in Stripe Dashboard
- Verify database connection
- Check application logs
- Ensure user ID is passed in metadata

## Support
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
