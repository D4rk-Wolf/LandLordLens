# Stripe Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Test Keys
STRIPE_PUBLISHABLE_KEY=pk_test_51SUB6e1kfPJSO6RCrArMVo8MY7a65dkTPPCBAV84quVOeOqTh1elceMwGEfvbhV4R1Vk2RrfIgiAdyIngwGEUtT5005vJHeCDW
STRIPE_SECRET_KEY=sk_test_51SUB6e1kfPJSO6RCaPsk73AF1fZPZ5VSg1zrbqHQ8aqY15z1H9jiIxzJLoVlrZZB61uLawhxerRUQjxu0jCZho7N006MV1RoKn
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs (update after creating products)
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_professional_monthly
STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_professional_annual
STRIPE_PRICE_BUSINESS_MONTHLY=price_business_monthly
STRIPE_PRICE_BUSINESS_ANNUAL=price_business_annual
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_enterprise_monthly
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_enterprise_annual
```

## Getting Webhook Secret

Run this command to get your webhook secret for local testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env.local`
