# Deployment Guide - LandLordLens

## Pre-Deployment Checklist

### 1. Environment Variables

> [!IMPORTANT]
> **Stripe Configuration**: Please refer to the [Stripe Deployment Checklist](Stripe_Deployment_Checklist.md) for detailed verification of Stripe keys and Price IDs.

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key_change_this

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (from Stripe Dashboard)
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_your_professional_monthly_price_id
STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_your_professional_annual_price_id
STRIPE_PRICE_BUSINESS_MONTHLY=price_your_business_monthly_price_id
STRIPE_PRICE_BUSINESS_ANNUAL=price_your_business_annual_price_id
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_your_enterprise_monthly_price_id
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_your_enterprise_annual_price_id
```

### 2. Stripe Setup

#### Create Stripe Account
1. Sign up at https://stripe.com
2. Complete business verification
3. Get your API keys from Dashboard > Developers > API keys

#### Create Products and Prices
1. Go to Stripe Dashboard > Products
2. Create products for each tier:
   - **Professional Monthly**: £12.00/month
   - **Professional Annual**: £120.00/year
   - **Business Monthly**: £29.00/month
   - **Business Annual**: £290.00/year
   - **Enterprise Monthly**: £99.00/month
   - **Enterprise Annual**: £990.00/year
3. Copy the Price IDs and add them to your `.env` file

#### Setup Webhooks
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
4. Copy the webhook signing secret to your `.env` file

### 3. Database Setup

1. Set up MongoDB Atlas or your MongoDB instance
2. Update `MONGODB_URI` in `.env`
3. Ensure indexes are created (they'll be created automatically on first run)

### 4. Build and Deploy

#### Build the Application
```bash
npm install
npm run build
```

#### Deploy Options

**Option 1: Vercel/Netlify (Frontend) + Railway/Render (Backend)**
- Deploy frontend to Vercel/Netlify
- Deploy backend to Railway/Render
- Update `FRONTEND_URL` in backend `.env`

**Option 2: Docker**
```bash
docker build -t landlordlens .
docker run -p 5000:5000 --env-file .env landlordlens
```

**Option 3: Traditional Server (PM2)**
```bash
npm install -g pm2
pm2 start server/index.js --name landlordlens
pm2 save
pm2 startup
```

### 5. Post-Deployment

1. **Test Stripe Integration**
   - Use Stripe test mode first
   - Test checkout flow
   - Verify webhook events are received

2. **Create Admin User**
   ```bash
   node scripts/create-admin.js
   ```

3. **Verify Endpoints**
   - Health check: `GET /api/health`
   - Test subscription endpoints
   - Test payment endpoints

4. **Monitor Logs**
   - Check webhook logs in Stripe Dashboard
   - Monitor application logs
   - Set up error tracking (Sentry recommended)

### 6. Security Checklist

- [ ] All environment variables are set
- [ ] JWT_SECRET is strong and unique
- [ ] Stripe webhook secret is configured
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly
- [ ] Database connection uses SSL
- [ ] Admin routes are protected
- [ ] Rate limiting is configured (recommended)

### 7. Monitoring & Maintenance

- Set up monitoring for:
  - Server uptime
  - Database performance
  - Payment processing
  - Error rates
  - Webhook delivery

- Regular tasks:
  - Monitor failed payments
  - Review subscription cancellations
  - Check for past_due subscriptions
  - Update Stripe API if needed

## Subscription Management

### Admin Functions

Admins can manage user subscriptions via:
- `PUT /api/admin/users/:id/subscription` - Update user subscription tier and status

### User Functions

Users can manage their subscriptions via:
- `POST /api/payments/create-checkout` - Start subscription
- `POST /api/payments/create-portal` - Manage subscription (Stripe Customer Portal)
- `POST /api/payments/cancel-subscription` - Cancel subscription
- `GET /api/payments/subscription-status` - Check subscription status
- `GET /api/payments/history` - View payment history

## Troubleshooting

### Webhooks Not Working
1. Verify webhook URL is accessible
2. Check webhook secret matches
3. Review Stripe Dashboard > Webhooks for delivery logs
4. Ensure endpoint accepts raw body (not JSON parsed)

### Payment Issues
1. Check Stripe Dashboard for payment status
2. Verify price IDs are correct
3. Check user's Stripe customer ID is set
4. Review application logs for errors

### Subscription Not Updating
1. Verify webhook events are being received
2. Check database connection
3. Review webhook handler logs
4. Manually sync subscription via admin endpoint if needed

## Support

For Stripe-related issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For application issues:
- Check application logs
- Review error messages
- Verify environment variables
