# Stripe Deployment Checklist - LandLordLens

Use this checklist to ensure your Stripe integration is correctly configured for deployment.

## 1. Environment Variables Verification
- [ ] **`.env` & `.env.local` Consistency**: Ensure both files exist and have the same keys.
- [ ] **Stripe Keys**:
    - [ ] `STRIPE_PUBLISHABLE_KEY`: Should start with `pk_live_` (for prod) or `pk_test_` (for dev).
    - [ ] `STRIPE_SECRET_KEY`: Should start with `sk_live_` (for prod) or `sk_test_` (for dev).
    - [ ] `STRIPE_WEBHOOK_SECRET`: Should start with `whsec_`.
- [ ] **Price IDs (CRITICAL)**:
    - [ ] Ensure all values start with `price_` (e.g., `price_1Mvc...`), **NOT** `prod_`.
    - [ ] Verify IDs against the Stripe Dashboard > Product Catalog > Pricing.
    - [ ] `STRIPE_PRICE_PROFESSIONAL_MONTHLY`
    - [ ] `STRIPE_PRICE_PROFESSIONAL_ANNUAL`
    - [ ] `STRIPE_PRICE_BUSINESS_MONTHLY`
    - [ ] `STRIPE_PRICE_BUSINESS_ANNUAL`
    - [ ] `STRIPE_PRICE_ENTERPRISE_MONTHLY`
    - [ ] `STRIPE_PRICE_ENTERPRISE_ANNUAL`

## 2. Stripe Dashboard Configuration
- [ ] **Business Settings**: Ensure business details and branding are updated in Stripe Settings.
- [ ] **Customer Portal**:
    - [ ] Enable the Customer Portal in Settings.
    - [ ] Configure allowed actions (Cancel, Pause, Switch Plans).
- [ ] **Webhooks**:
    - [ ] Add endpoint: `https://your-domain.com/api/webhooks/stripe`
    - [ ] Select events:
        - `checkout.session.completed`
        - `customer.subscription.created`
        - `customer.subscription.updated`
        - `customer.subscription.deleted`
        - `invoice.paid`
        - `invoice.payment_failed`

## 3. Product & Pricing Setup
- [ ] **Professional Tier**:
    - [ ] Monthly Price created (£12.00)
    - [ ] Annual Price created (£120.00)
- [ ] **Business Tier**:
    - [ ] Monthly Price created (£29.00)
    - [ ] Annual Price created (£290.00)
- [ ] **Enterprise Tier**:
    - [ ] Monthly Price created (£99.00)
    - [ ] Annual Price created (£990.00)

## 4. Testing & Validation
- [ ] **Webhook Test**:
    - Run `stripe listen` locally and verify events are received.
    - Verify `checkout.session.completed` updates the database.
- [ ] **Checkout Flow**:
    - Complete a purchase in Test Mode.
    - Verify user is redirected to success page.
    - Verify subscription status in database is `active`.

## 5. Security & Final Checks
- [ ] **HTTPS**: Ensure the production site uses HTTPS.
- [ ] **Secret Management**: Ensure `.env` is **NOT** committed to version control.
