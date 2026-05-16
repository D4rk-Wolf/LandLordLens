# Landlord Lens: UK Compliance Feature Specification

Based on valid UK market data, the following specific features are required to solve the top "burden" points for landlords.

## 1. Energy Efficiency (EPC) Manager
*   **The Problem**: 47% of landlords have properties < D rating. 2028 deadline for 'C' rating is looming.
*   **Feature Requirement**:
    *   **EPC Scraper**: Auto-fetch current rating from government register using address.
    *   **Deadline Countdown**: Visual "Days until 2028 deadline" for properties below 'C'.
    *   **Improvement Roadmap**: Checklist of suggested improvements (Insulation, Boiler, etc.).
    *   ** Monetization**: "Get an EPC Assessment Quote" button (Lead Gen).
    *   **[Technical]**: Use *Open Data Communities API* for auto-fill.

## 1b. Smart Market Data (New)
*   **The Problem**: "Am I charging enough rent?"
*   **Feature Requirement**:
    *   **Rent Estimator**: API lookup (e.g., PropertyData) for local rental comparables.
    *   **Yield Calculator**: Live tracking of Gross/Net yield based on current estimated value.

## 2. Deposit Protection Guardian
*   **The Problem**: Strict 30-day limit to protect + serve "Prescribed Information". Fail = 3x fine + no Section 21.
*   **Feature Requirement**:
    *   **Tenancy Start Workflow**: Mandatory step "Has deposit been protected?".
    *   **Day 20 Alert**: "Critical Warning: 10 days left to protect deposit".
    *   **Prescribed Info Generator**: Auto-generate the legal PDF to email/print for tenants.
    *   **Audit Trail**: Log exactly when the tenant received it (proof for court).

## 3. Safety Certificate Tracker (Gas & Electric)
*   **The Problem**: Gas (Annual) and EICR (5yr) are mandatory. Must be served to tenant within 28 days. Jail time possible.
*   **Feature Requirement**:
    *   **Expiry Dashboard**: Red/Amber/Green status for all certs.
    *   **"Serve by" Date**: Distinct from "Expiry Date". Tracks the 28-day window to give to tenant.
    *   **Engineer Booking**: Integrated directory of Gas Safe engineers (Monetization).

## 4. Right to Rent & Legal Automation (Section 8)
*   **The Problem**: Section 21 is gone. Landlords need a "foolproof" way to end tenancies legally.
*   **Feature Requirement**:
    *   **Section 8 Wizard**: Logic tree to select correct Ground (Selling, Arrears, Moving In).
    *   **Pre-Flight Integrity Check**: "Cannot serve notice: Gas Cert was expired at start of tenancy".
    *   **ID Upload Portal**: Secure upload for tenant passport/visa.
    *   **Verification Checklist**: Simple "Does photo match tenant?" Yes/No wizard for landlords.
    *   **"How to Rent" Auto-Send**: Automatically email the latest version of the gov guide on check-in.

## 5. Making Tax Digital (MTD) Prep
*   **The Problem**: 2026 deadline. Landlords confused by "digital record keeping".
*   **Feature Requirement**:
    *   **Expense Categorization**: "Is this a capital expense or revenue expense?" helper (educates user).
    *   **Digital Receipt Box**: One-click photo upload for receipts.
    *   **Quarterly Report Preview**: "See what your MTD submission would look like".

## 6. HMO License Checker
*   **The Problem**: £30k fines. Tenants checking compliance themselves.
*   **Feature Requirement**:
    *   **Occupancy Monitor**: Alert if >2 unrelated tenants added to a property.
    *   **License Expiry Tracker**: Specific field for HMO license number and renewal date.
    *   **[Technical]**: No central API. Use `postcodes.io` to identify Council and link user to local guidance.
