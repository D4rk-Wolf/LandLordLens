# Testing Guide

## Quick Test Flow (15 minutes)

### 1. Initial Setup (2 min)
```bash
npm install
cp .env.example .env
# Edit .env with DATABASE_URL and NEXTAUTH_SECRET
npm run db:generate && npm run db:push && npm run db:seed
npm run dev
```

### 2. Create Account & Onboarding (3 min)
1. Go to http://localhost:3000
2. Click "Start Free Trial"
3. Sign up with:
   - Name: Test Landlord
   - Email: landlord@test.com
   - Password: test1234
4. Complete onboarding:
   - Property: 123 Test Street, SW1A 1AA
   - Tenancy: John Doe, £1000/month
   - Gas Safety: Last check 6 months ago

### 3. Test Core Features (5 min)

#### Property Management
- ✅ View dashboard with your property
- ✅ Click property to see details
- ✅ Try adding second property (should show upgrade prompt)

#### Tenancy Management
- ✅ View tenancy on property page
- ✅ Add another tenancy (end date in past to test history)

#### Compliance
- ✅ View compliance record
- ✅ Add new compliance (EPC, EICR, etc.)
- ✅ Check compliance page for alerts

### 4. Test Advanced Features (5 min)

#### Maintenance Tickets
- ✅ Go to `/dashboard/maintenance`
- ✅ Create ticket: "Broken boiler", High priority
- ✅ Update status to "In Progress"

#### Financial Tracking
- ✅ On property page, add transaction:
  - Type: Income, Amount: £1000, Category: Rent
- ✅ Add expense: Type: Expense, Amount: £50, Category: Repair
- ✅ Check dashboard financial summary updated

#### Document Generation
- ✅ Go to `/dashboard/documents`
- ✅ Select tenancy
- ✅ Generate and download PDF

#### Analytics
- ✅ Go to `/dashboard/analytics`
- ✅ View cashflow chart (may be empty initially)
- ✅ Add property value estimate to see yield

## Feature-Specific Tests

### Maintenance System

**Test Case 1: Create Ticket**
1. Go to property detail page
2. Click "Report Maintenance Issue"
3. Fill form:
   - Title: "Leaking tap"
   - Description: "Kitchen tap leaking"
   - Priority: Medium
4. Submit
5. Verify ticket appears in `/dashboard/maintenance`

**Test Case 2: Filter Tickets**
1. Create multiple tickets with different priorities
2. Use filters on maintenance page
3. Verify filtering works

**Test Case 3: Update Status**
1. Open a ticket
2. Change status to "Resolved"
3. Verify status updates

### Financial Tracking

**Test Case 1: Record Income**
1. On property page, add transaction
2. Type: Income, £1000, Category: Rent
3. Verify appears in transaction list
4. Check dashboard shows income

**Test Case 2: Record Expense**
1. Add transaction: Expense, £200, Category: Repair
2. Verify net calculation: £1000 - £200 = £800

**Test Case 3: Monthly Summary**
1. Add transactions for current month
2. Check dashboard financial summary
3. Verify totals match

### Tenant Portal (Requires Email Setup)

**Test Case 1: Invite Tenant**
1. On property page, find tenancy
2. Click "Invite Tenant"
3. Enter email: tenant@test.com
4. Verify invitation sent (check email or console)

**Test Case 2: Tenant Signup**
1. Click invitation link from email
2. Set password
3. Verify redirects to tenant dashboard

**Test Case 3: Tenant Features**
1. As tenant, view tenancy details
2. Report maintenance issue
3. View open maintenance tickets

### Document Generation

**Test Case 1: Generate Agreement**
1. Go to `/dashboard/documents`
2. Select a tenancy
3. Click "Generate & Download PDF"
4. Verify PDF downloads with correct data

**Test Case 2: Verify Content**
1. Open downloaded PDF
2. Check all fields populated correctly
3. Verify disclaimer present

### Analytics

**Test Case 1: View Charts**
1. Go to `/dashboard/analytics`
2. Verify chart displays (may be empty if no data)
3. Add transactions to see data points

**Test Case 2: Portfolio Yield**
1. Edit property, add value estimate: £200,000
2. Ensure property has active tenancy with rent
3. Check analytics page shows yield percentage

## Edge Cases to Test

### Property Limits
- [ ] Free plan: Try adding 2nd property → Should show upgrade prompt
- [ ] Free plan: Verify can't add 2nd property via API

### Compliance Alerts
- [ ] Create compliance due tomorrow → Should appear in critical alerts
- [ ] Create overdue compliance → Should show as overdue

### Tenant Access
- [ ] Tenant tries to access landlord routes → Should be denied
- [ ] Tenant only sees their own tenancy

### Data Validation
- [ ] Try submitting forms with missing required fields
- [ ] Try invalid email formats
- [ ] Try negative amounts in transactions

## Performance Testing

### Database Queries
- [ ] Load dashboard with 10+ properties
- [ ] Load compliance page with many records
- [ ] Check page load times

### Large Datasets
- [ ] Add 50+ transactions
- [ ] Verify chart still renders smoothly
- [ ] Check pagination if implemented

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile viewport (responsive design)

## Security Testing

- [ ] Try accessing `/dashboard` without login → Should redirect
- [ ] Try accessing other user's data via API → Should be denied
- [ ] Verify password hashing (check database)
- [ ] Test session expiry

## Integration Testing

### Stripe (If Configured)
- [ ] Click "Upgrade to Pro"
- [ ] Complete Stripe checkout
- [ ] Verify subscription status updates
- [ ] Verify can add unlimited properties

### Email (If Configured)
- [ ] Invite tenant → Check email received
- [ ] Trigger compliance reminder → Check email received

### SMS (If Configured)
- [ ] Add phone number to user
- [ ] Trigger compliance reminder → Check SMS received

## Common Test Data

Use these for consistent testing:

**Properties:**
- Address: "123 Test Street"
- Postcode: "SW1A 1AA"
- Type: "House"

**Tenancies:**
- Tenant: "John Doe"
- Rent: £1000/month
- Deposit: £1500

**Compliance:**
- Gas Safety: Due annually
- EPC: Due every 10 years
- EICR: Due every 5 years

**Transactions:**
- Income: £1000 (Rent)
- Expense: £50 (Repair)
- Expense: £100 (Management Fee)

## Automated Testing (Future)

Consider adding:
- Unit tests for utilities
- Integration tests for API routes
- E2E tests with Playwright/Cypress

## Reporting Issues

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/OS
5. Console errors (if any)
6. Database state (if relevant)

## Quick Reset

To start fresh:
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset
npm run db:seed

# Or manually delete and recreate
dropdb landlordlens
createdb landlordlens
npm run db:push
npm run db:seed
```

Happy Testing! 🧪

