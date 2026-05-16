# Deep Dive Research: Renters' Rights Act & Monetization (Late 2025)

**Date**: December 2025
**Focus**: Renters' Rights Act (Royal Assent Oct 2025), PRS Database, Ombudsman, Monetization APIs, MTD.

## 1. Renters' Rights Act 2025 Impact

The **Renters' Rights Act** (formerly Reform Bill) received Royal Assent on 27 Oct 2025. It fundamentally changes the UK rental landscape.

### A. The Private Rented Sector (PRS) Database
*   **Status**: Mandatory. Implementation expected late 2026 via secondary legislation.
*   **Requirement**: All landlords must register themselves and *every* property.
*   **Data Required**:
    *   Landlord/Agent details.
    *   Property Compliance: **Gas Safety**, **EICR**, **EPC**.
    *   **Unique Property Identifier**: Must be displayed in all marketing.
    *   Occupancy status (Rented vs Marketing).
*   **Software Opportunity**: "PRS Ready" badge.
    *   Store all required data points now.
    *   Alert users if they are missing data that will block registration (and thus possession orders).
    *   Future: API integration to auto-submit to the government database.

### B. The Ombudsman & Record Keeping
*   **Requirement**: Mandatory membership for all landlords.
*   **Powers**: Local councils can request **12 months of records** at short notice.
*   **Critical Records**:
    *   Tenancy Agreements.
    *   Deposit Protection (Prescribed Info).
    *   Right-to-Rent checks.
    *   Maintenance logs (complaints + repairs).
*   **Software Opportunity**: "Ombudsman Vault".
    *   One-click "Audit Pack" export: Zips all docs for a specific tenancy for the last 12 months.
    *   Maintenance ticket tracking is no longer optional; it's a compliance defense.

## 2. Monetization Strategy: API Partners

To monetize the "Freemium" model, we will integrate high-value service APIs.

### A. Tenant Referencing & Onboarding
*   **RentProfile**:
    *   **Pros**: API-first, includes Right-to-Rent checks (critical), AML, and eSign.
    *   **Fit**: High. Allows us to offer a "One Click Onboarding" flow.
*   **Finexer**:
    *   **Pros**: Open Banking based. Fast, verified income.
    *   **Fit**: Good for "Instant Check" feature.
*   **Recommendation**: Integrate **RentProfile** for a full suite (Ref + Contract + Right to Rent).

### B. Insurance
*   **Simply Business**:
    *   **Pros**: Major UK brand, offers API/White-label integration.
    *   **Fit**: High. We can embed "Get Quote" buttons on the Property Dashboard (e.g., when a property is added or renewal is due).

## 3. Making Tax Digital (MTD) for ITSA

*   **Mandatory**: April 2026 (Income > £50k).
*   **Requirement**: Submit **quarterly updates** of digital records.
*   **Technical Spec**:
    *   Updates are **cumulative totals** of income/expense categories.
    *   No accounting adjustments needed quarterly.
    *   Sandbox: `https://test-api.service.hmrc.gov.uk` available.
*   **Software Opportunity**:
    *   **Expense Categorization**: We must force users to map expenses to HMRC categories (e.g., "Property repairs", "Loan interest").
    *   **Quarterly Snapshots**: Generate a JSON/CSV report that matches MTD schema.
    *   **Future**: Direct submission via HMRC API.

## Strategic Recommendations for Next Phase

1.  **Build "Ombudsman Vault"**: Enhance the Document storage to be tenancy-aware and exportable.
2.  **Upgrade Maintenance**: Add "Audit Log" to maintenance tickets (who said what, when).
3.  **Prepare for MTD**: Implement "HMRC Categories" for expenses immediately.
