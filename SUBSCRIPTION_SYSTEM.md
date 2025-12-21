# Subscription & Payment System Documentation

## Overview

LandLordLens includes a complete subscription and payment system integrated with Stripe. The system supports four tiers with automatic property limit enforcement.

## Subscription Tiers

### Starter (Free)
- **Max Properties**: 2
- **Max Storage**: 100MB
- **Price**: £0/month
- **Features**: Basic property management, tenancy tracking, compliance storage

### Professional
- **Max Properties**: 10
- **Max Storage**: 5GB
- **Price**: £12/month or £120/year (save 17%)
- **Features**: Advanced filtering, financial dashboard, automated reminders, bulk operations, document management

### Business
- **Max Properties**: 50
- **Max Users**: 5
- **Max Storage**: 50GB
- **Price**: £29/month or £290/year (save 17%)
- **Features**: Multi-user access, advanced analytics, calendar integration, tenant portal, priority support

### Enterprise
- **Max Properties**: Unlimited
- **Max Users**: Unlimited
- **Max Storage**: Unlimited
- **Price**: £99/month or £990/year (save 17%)
- **Features**: API access, white-label, custom integrations, dedicated account manager, 24/7 support, SLA guarantee

## API Endpoints

### Subscription Management

#### `GET /api/subscription`
Get current user's subscription information.

**Response:**
```json
{
  "currentTier": "professional",
  "tierDetails": {
    "name": "Professional",
    "maxProperties": 10,
    "price": {
      "monthly": 12.00,
      "yearly": 120.00,
      "formatted": {
        "monthly": "£12.00",
        "yearly": "£120.00"
      }
    }
  },
  "usage": {
    "propertyCount": 5,
    "maxProperties": 10,
    "canAddMore": true,
    "remainingProperties": 5
  }
}
```

#### `GET /api/subscription/tiers`
Get all available subscription tiers.

#### `PUT /api/subscription`
Update user's subscription tier (with validation).

#### `GET /api/subscription/check-upgrade`
Check if user needs to upgrade based on property count.

### Payment Management

#### `POST /api/payments/create-checkout`
Create Stripe checkout session for subscription.

**Request:**
```json
{
  "tier": "professional",
  "period": "monthly"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

#### `POST /api/payments/create-portal`
Create Stripe Customer Portal session for subscription management.

**Response:**
```json
{
  "url": "https://billing.stripe.com/..."
}
```

#### `POST /api/payments/cancel-subscription`
Cancel user's subscription.

**Request:**
```json
{
  "immediately": false
}
```

#### `GET /api/payments/history`
Get user's payment history.

#### `GET /api/payments/subscription-status`
Get current subscription and payment status.

### Admin Endpoints

#### `PUT /api/admin/users/:id/subscription`
Admin endpoint to update user subscription.

**Request:**
```json
{
  "tier": "enterprise",
  "subscriptionStatus": "active",
  "subscriptionPeriod": "yearly"
}
```

## Database Models

### User Model Updates
- `subscription`: Tier (starter, professional, business, enterprise)
- `subscriptionStatus`: Status (active, canceled, past_due, trialing, incomplete)
- `subscriptionPeriod`: Period (monthly, yearly)
- `subscriptionStartDate`: Start date
- `subscriptionEndDate`: End date
- `subscriptionCanceledAt`: Cancellation date
- `stripeCustomerId`: Stripe customer ID
- `stripeSubscriptionId`: Stripe subscription ID

### Payment Model Updates
- Enhanced with subscription fields
- Tracks Stripe payment intents and charges
- Links to subscriptions
- Stores metadata

## Webhook Events

The system handles the following Stripe webhook events:

1. **checkout.session.completed** - User completes checkout
2. **customer.subscription.created** - New subscription created
3. **customer.subscription.updated** - Subscription updated
4. **customer.subscription.deleted** - Subscription canceled
5. **invoice.paid** - Payment successful
6. **invoice.payment_failed** - Payment failed
7. **payment_intent.succeeded** - One-time payment succeeded

## Property Limit Enforcement

Property creation automatically checks subscription limits:

- **Starter**: Max 2 properties
- **Professional**: Max 10 properties
- **Business**: Max 50 properties
- **Enterprise**: Unlimited properties

If limit is reached, API returns:
- HTTP 403 status
- Error message with upgrade suggestion
- Required tier information
- Pricing for required tier

## Setup Requirements

1. **Stripe Account**: Create account and get API keys
2. **Products & Prices**: Create products in Stripe Dashboard
3. **Webhooks**: Configure webhook endpoint
4. **Environment Variables**: Set all required Stripe variables

See `stripe_product_setup.md` for detailed setup instructions.

## Testing

### Test Cards (Stripe Test Mode)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

### Test Flow
1. Create checkout session
2. Complete payment with test card
3. Verify webhook received
4. Check user subscription updated
5. Verify payment record created
6. Test property limit enforcement

## Security

- All payment endpoints require authentication
- Webhook signature verification
- Admin endpoints require admin role
- Subscription validation prevents downgrades that violate limits

## Deployment Checklist

- [ ] Stripe account created and verified
- [ ] Products and prices created in Stripe
- [ ] Webhook endpoint configured
- [ ] Environment variables set
- [ ] Test mode verified
- [ ] Live mode tested
- [ ] Payment flow tested
- [ ] Webhook events verified
- [ ] Property limits tested
- [ ] Admin functions tested

## Support

For issues:
1. Check application logs
2. Review Stripe Dashboard > Webhooks
3. Verify environment variables
4. Check database records
5. Review webhook event payloads
