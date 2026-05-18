# LandLordLens — User Guide

LandLordLens is a property compliance and management tool designed for UK landlords — particularly those with a small number of properties who need to stay on top of their legal obligations without the complexity of traditional letting agent software.

---

## Getting Started

### Creating an Account

1. Go to the app and click **Sign up**
2. Enter your email address and choose a password
3. You'll be sent a verification email — click the link to confirm your address
4. You'll be taken straight to your dashboard

New accounts start on the **Free plan**, which supports up to 2 properties.

---

## The Dashboard

When you log in you'll see your dashboard, which gives you an overview of:

- **Portfolio summary** — total properties, occupied vs vacant, and active tenancies
- **Compliance alerts** — any certificates expiring soon, highlighted in amber (expiring within 60 days) or red (expired)
- **Financial KPIs** — gross yield, net yield, equity, and annual cash flow across your portfolio
- **Quick links** — add a property, record an expense, log a compliance certificate

---

## Properties

### Adding a Property

1. Click **Add property** from the dashboard or the Properties page
2. Enter the address, property type, and number of bedrooms and bathrooms
3. Optionally add financial details (purchase price, current value, mortgage information)
4. Add your EPC rating and expiry date — you'll receive alerts when it approaches the 2030 minimum C-rating deadline
5. If your property needs an HMO licence (5 or more people from 2 or more households), fill in the licence number and expiry date

### Property Status

Each property can be marked as:
- **Vacant** — currently unoccupied
- **Occupied** — has an active tenancy
- **Maintenance** — undergoing works

### Property Limits by Plan

| Plan | Properties |
|---|---|
| Free | 2 |
| Professional | 10 |
| Business | 50 |
| Enterprise | Unlimited |

If you've reached your plan limit, you'll be prompted to upgrade when you try to add a new property.

---

## Tenancies

### Creating a Tenancy

1. Go to a property and click **Add tenancy**
2. Enter the tenant's name, email address, and phone number
3. Set the start date and monthly rent amount
4. Record the deposit amount (if applicable)
5. Select the tenancy type — this defaults to **Periodic Assured**, which is the correct type for new tenancies under the Renters' Rights Act 2025

### Tenancy Types

- **Periodic Assured** — the standard type for new tenancies under the Renters' Rights Act 2025. No fixed end date; the tenancy rolls on a month-to-month basis until either party gives notice.
- **Fixed Term** — a legacy type. All existing fixed-term tenancies converted to Periodic on 1 May 2026 under the Renters' Rights Act.
- **Assured / Short Assured / Protected** — other historic or Scottish types.

### Prescribed Information Checklist

The tenancy form tracks which legal documents and information have been provided to the tenant:

- **How to Rent Guide** — must be provided at the start of every new tenancy in England. Download the latest version from [gov.uk](https://www.gov.uk/government/publications/how-to-rent).
- **Right to Rent check** — you must verify your tenant's right to live in the UK before or at the start of the tenancy.
- **Deposit protection** — the deposit must be protected in a government-approved scheme within 30 days of receipt, and prescribed information served to the tenant in the same window.

These flags affect which possession grounds are available to you if you ever need to use Section 8.

---

## Compliance

The compliance section helps you track all certificates and licences required by law.

### Certificate Types

| Certificate | Who needs it | Renewal period |
|---|---|---|
| Gas Safety (CP12) | All landlords with gas appliances | Annual |
| Electrical Installation Condition Report (EICR) | All landlords | Every 5 years |
| Energy Performance Certificate (EPC) | All landlords | Every 10 years (min rating C required from 2030) |
| Fire safety | HMO landlords | Varies |
| HMO licence | Properties with 5+ occupants from 2+ households | Typically 5 years |
| Legionella risk assessment | All landlords | Every 2 years (recommended) |
| Landlord Registration | Scotland | Every 3 years |
| Rent Smart Wales | Wales | Every 5 years |

### Adding a Certificate

1. Go to **Compliance** from the navigation
2. Click **Add record**
3. Select the certificate type and the property it applies to
4. Enter the issue date and expiry date
5. Record when you served a copy to your tenant (`served_to_tenant_date`) — this is important if you ever need to use Section 8

### Compliance Status Colours

- **Green** — certificate is valid with more than 60 days remaining
- **Amber** — expiring within 60 days
- **Red** — expired

---

## Deposit Protection

Each tenancy can have a deposit protection record linked to it.

UK law requires you to:
1. Protect the deposit in a government-approved scheme within **30 days** of receiving it
2. Serve the prescribed information on the tenant within **30 days**

The app tracks both deadlines and alerts you if they are approaching or missed.

**Approved schemes in England and Wales:**
- Deposit Protection Service (DPS)
- MyDeposits
- Tenancy Deposit Scheme (TDS)

Scotland and Northern Ireland have their own regional schemes.

---

## Maintenance

The maintenance section lets you log repair and maintenance requests and track them through to completion.

### Creating a Ticket

1. Go to **Maintenance** or select a property and click **Add ticket**
2. Give the issue a title and description
3. Set the priority: Low, Medium, High, or Urgent
4. Record who reported the issue

### Ticket Status

- **Open** — newly created, not yet started
- **In Progress** — work has begun
- **Completed** — repair finished; record the cost and completion date
- **Cancelled** — not going ahead

Every status change is recorded in an audit log. This log can be included in your Ombudsman Vault export if you ever need to evidence responsive repairs management.

---

## Finances

The expenses section tracks all income and outgoings for your property business and maps them to HMRC SA105 categories for self-assessment.

### Recording Income and Expenses

1. Go to **Finances**
2. Click **Add record**
3. Select whether it's **Income** (e.g. rent received) or **Expense** (e.g. repair cost)
4. Enter the amount, date, and description
5. Assign an HMRC category for tax purposes

### HMRC Categories

These map directly to the SA105 (property income) supplementary pages used in self-assessment:

- Rent and other income
- Premises costs (ground rent, service charges)
- Repairs and maintenance
- Financial costs (bank charges, etc.)
- Professional fees (accountant, solicitor)
- Cost of services
- Travel costs
- Other allowable expenses
- Capital allowances
- Residential finance costs (mortgage interest — section 24 restriction applies)

Records without an HMRC category are flagged as **Uncategorised** — you should categorise these before filing your tax return.

### Tax Year Summary

Go to **Finances → Tax Summary** and select a tax year (e.g. 2025–26) to see a breakdown of income and expenses by HMRC category. This is designed to help you or your accountant complete the SA105.

---

## Inspections

Record property inspections — routine visits, check-ins, and check-outs.

### Inspection Types

- **Routine** — periodic condition checks (typically every 3–6 months)
- **Check In** — at the start of a tenancy
- **Check Out** — at the end of a tenancy
- **Maintenance** — linked to a repair
- **Compliance** — to verify a compliance requirement
- **Complaint** — following a complaint by the tenant

### Recording Results

Once an inspection has taken place, update it with:
- Actual date
- Overall condition (Excellent / Good / Fair / Poor)
- Whether issues were found
- Notes

---

## Documents

Upload and organise documents linked to your properties:

- **Compliance** — certificates and licences
- **Tenancy** — tenancy agreements, notices, correspondence
- **Legal** — solicitor letters, court orders
- **Financial** — invoices, receipts
- **Inspection** — inspection reports

Files are stored securely in Supabase Storage. Use the document category to keep everything organised.

---

## Billing and Plans

Go to **Settings → Billing** to view your current plan and upgrade.

### Plans

| Plan | Price | Properties |
|---|---|---|
| Free | £0 | Up to 2 |
| Professional | £12/month or £120/year | Up to 10 |
| Business | £29/month or £290/year | Up to 50 |
| Enterprise | £99/month or £990/year | Unlimited |

Annual billing saves approximately 2 months compared to paying monthly.

### Upgrading

1. Go to **Settings → Billing**
2. Click **Upgrade**
3. Choose your plan and billing frequency
4. You'll be taken to a secure Stripe payment page
5. After payment, your plan is activated immediately

### Managing Your Subscription

Use the **Manage subscription** button to:
- Cancel your plan
- Change between monthly and annual billing
- Update your payment method

Cancellations take effect at the end of the current billing period.

---

## Frequently Asked Questions

**Do I need to sign any contracts?**  
No. LandLordLens is a monthly or annual subscription — cancel at any time from your account settings.

**Is my data secure?**  
Yes. Data is stored in Supabase (hosted on AWS), which is ISO 27001 certified. Payments are handled by Stripe — we never see your card details.

**Does LandLordLens provide legal advice?**  
No. The app helps you track your obligations, but it is not a substitute for legal advice. Always consult a qualified solicitor or letting agent for complex situations.

**What happens to my data if I cancel?**  
Your data remains accessible until the end of your billing period. Contact support if you need a data export before cancelling.

**I'm in Scotland / Wales — does the app support me?**  
Yes. The app supports region-specific compliance types including Landlord Registration (Scotland), Rent Smart Wales, and SafeDeposits Scotland. Set the region on your property record and the relevant compliance types will appear.

**What is the Renters' Rights Act?**  
The Renters' Rights Act 2025/2026 is the most significant change to tenancy law in England in decades. Key changes include:
- Section 21 "no-fault" evictions abolished (from May 2026)
- All fixed-term tenancies converted to periodic tenancies
- A new Private Rented Sector Ombudsman
- A new Property Portal for landlord registration

LandLordLens is designed with these changes in mind — the default tenancy type is Periodic Assured, and the Section 8 wizard (Business plan and above) guides you through the updated grounds for possession.
