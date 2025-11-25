# LandlordLens - Complete Setup & Testing Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **PostgreSQL** database running locally or remote
- **Git** installed
- A code editor (VS Code recommended)

## Step 1: Clone and Install

```bash
# Navigate to your project directory
cd LandLordLens

# Install all dependencies
npm install
```

## Step 2: Database Setup

### Option A: Local PostgreSQL

1. Create a new database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE landlordlens;

# Exit
\q
```

2. Update your `.env` file:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/landlordlens?schema=public"
```

### Option B: Remote PostgreSQL (Supabase, Railway, etc.)

Use the connection string provided by your hosting service.

## Step 3: Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in the following:

### Required Variables

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:password@localhost:5432/landlordlens?schema=public"

# Next-Auth (REQUIRED)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-this-with: openssl rand -base64 32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Optional Variables (for full feature testing)

```env
# Stripe (for subscription testing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Only needed for production webhooks

# Email (Resend) - for compliance reminders and tenant invitations
RESEND_API_KEY="re_..."

# SMS (Twilio) - for SMS reminders
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+44..."

# Cron Job Protection
CRON_SECRET="generate-random-string-here"
```

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate CRON_SECRET
openssl rand -base64 32
```

## Step 4: Database Migration

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates all tables)
npm run db:push

# Seed compliance types (Gas Safety, EPC, etc.)
npm run db:seed
```

**Note:** If you encounter any errors, you can also use migrations:
```bash
npm run db:migrate
```

## Step 5: Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Step 6: Initial Testing

### 1. Create Your First Account

1. Go to http://localhost:3000
2. Click "Start Free Trial"
3. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: (at least 8 characters)
4. Click "Create Account"

### 2. Complete Onboarding

You'll be redirected to a 4-step onboarding:

1. **Step 1: Your Information**
   - Enter your landlord name

2. **Step 2: Your First Property**
   - Address: `123 Main Street`
   - Postcode: `SW1A 1AA`
   - Purchase Date: (optional)

3. **Step 3: First Tenancy**
   - Tenant Name: `John Doe`
   - Start Date: (today or earlier)
   - Monthly Rent: `1000`

4. **Step 4: Compliance Setup**
   - Last Gas Safety Check Date: (any date)
   - Next Due Date: (auto-calculated)

5. Click "Complete Setup"

### 3. Explore the Dashboard

You should now see:
- **Critical Alerts** section (if any compliance items are due)
- **Financial Summary** (monthly income/expenses)
- **Properties Overview**
- **My Properties** list

## Feature Testing Checklist

### ✅ Core Features

- [ ] **Authentication**
  - Sign up new account
  - Sign in with credentials
  - Sign out

- [ ] **Property Management**
  - View properties list
  - Add new property (free plan allows 1)
  - View property details
  - Try adding second property (should show upgrade prompt)

- [ ] **Tenancy Management**
  - View tenancies on property page
  - Add new tenancy
  - Edit tenancy details

- [ ] **Compliance Tracking**
  - View compliance records
  - Add new compliance record
  - See critical alerts on dashboard
  - View compliance page with overdue/due soon items

### ✅ Advanced Features

- [ ] **Maintenance Tickets**
  - Go to `/dashboard/maintenance`
  - Create new maintenance ticket
  - Filter by status/priority
  - Update ticket status

- [ ] **Financial Tracking**
  - On property page, add a transaction (income/expense)
  - View transaction list
  - Check dashboard financial summary updates

- [ ] **Document Generation**
  - Go to `/dashboard/documents`
  - Select a tenancy
  - Generate and download PDF tenancy agreement

- [ ] **Analytics**
  - Go to `/dashboard/analytics`
  - View monthly cashflow chart
  - See portfolio yield metrics
  - (Add property value estimate to see yield calculation)

- [ ] **Tenant Portal** (if email configured)
  - On property page, click "Invite Tenant" on a tenancy
  - Enter tenant email
  - Check email for invitation link
  - Click link and set up tenant account
  - Log in as tenant and view tenant dashboard

### ✅ Email/SMS Reminders (Optional)

If you've configured Resend/Twilio:

- [ ] **Test Compliance Reminders**
  - Manually trigger: `GET http://localhost:3000/api/cron/compliance-reminders`
  - Add `Authorization: Bearer YOUR_CRON_SECRET` header
  - Check email/SMS for reminders

## Common Issues & Solutions

### Issue: Database Connection Error

**Solution:**
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL format in `.env`
- Ensure database exists: `psql -U postgres -l`

### Issue: Prisma Client Not Generated

**Solution:**
```bash
npm run db:generate
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
PORT=3001 npm run dev
```

### Issue: Stripe errors

**Solution:**
- Use test keys from Stripe Dashboard
- For local testing, you can skip Stripe setup initially
- The app will work without Stripe, just subscription features won't work

### Issue: Email not sending

**Solution:**
- Check RESEND_API_KEY is set correctly
- Verify email domain is verified in Resend
- Check console for error messages
- For testing, you can skip email setup - tenant invitations will still create accounts

## Testing Without External Services

You can test most features without setting up:
- ✅ Stripe (subscription features won't work, but everything else will)
- ✅ Resend (emails won't send, but tenant accounts can still be created)
- ✅ Twilio (SMS reminders won't send)

**Minimum setup for core testing:**
- Database (REQUIRED)
- NEXTAUTH_SECRET (REQUIRED)
- NEXTAUTH_URL (REQUIRED)

## Database Management

### View Data in Prisma Studio

```bash
npm run db:studio
```

Opens at http://localhost:5555 - great for inspecting data!

### Reset Database (Development Only)

```bash
# WARNING: This deletes all data!
npx prisma migrate reset
npm run db:seed
```

## Production Deployment Checklist

Before deploying to production:

- [ ] Set all environment variables in hosting platform
- [ ] Use production database
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Set up Stripe webhooks
- [ ] Configure Vercel Cron for compliance reminders
- [ ] Verify email domain in Resend
- [ ] Test all critical flows
- [ ] Set up proper error monitoring

## Next Steps

1. **Customize**: Update branding, colors, and content
2. **Add Features**: Extend functionality based on user feedback
3. **Deploy**: Push to Vercel, Railway, or your preferred hosting
4. **Monitor**: Set up error tracking (Sentry, etc.)

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database is accessible
4. Check Prisma Studio to verify data

Happy testing! 🎉

