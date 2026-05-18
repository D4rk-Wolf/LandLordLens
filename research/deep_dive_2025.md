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

> ⚠️ **UPDATE (May 2026)**: MTD ITSA Phase 1 is **now live** (6 April 2026). A third threshold phase (£20k) has since been confirmed.

| Phase | Date | Threshold |
|-------|------|-----------|
| Phase 1 | **6 April 2026** (live) | Combined gross income > £50,000 |
| Phase 2 | April 2027 | Combined gross income > £30,000 |
| Phase 3 | April 2028 | Combined gross income > £20,000 |

*Thresholds apply to combined property + trading income (not per-source).*

- **Requirement**: Submit **quarterly updates** of digital income/expense records, plus an End-of-Period Statement and Final Declaration annually.
- **Software must**: Connect to HMRC APIs, maintain digital records, submit quarterly updates.
- **Technical Spec**:
  - Updates are cumulative totals of income/expense categories.
  - No accounting adjustments needed quarterly.
  - Sandbox: `https://test-api.service.hmrc.gov.uk` available.
- **Software Opportunity**:
  - **Expense Categorisation**: Force users to map expenses to HMRC categories (e.g., "Property repairs", "Loan interest").
  - **Quarterly Snapshots**: Generate report matching MTD schema.
  - **Direct Submission**: HMRC API integration — Hammock has already achieved HMRC recognition; this is now table stakes.

## 4. PRS Database — Updated Timeline

> **UPDATE (May 2026)**: Phase 1 of the RRA is live. PRS Database is Phase 2 (late 2026+).

- Phase 1 (1 May 2026): Section 21 abolished, all tenancies become periodic. **Landlords can no longer operate without understanding Section 8.**
- Phase 2 (late 2026+): PRS Database registration opens. Penalties: £5k–£30k + up to 24 months rent repayment orders.
- Phase 3 (2028): Mandatory Ombudsman membership.

Non-registration blocks: serving Section 8 notices, instructing letting agents, renewing HMO licences.

See `rra_implementation_2026.md` for full detail.

## Strategic Recommendations (Updated May 2026)

1. **Build "Ombudsman Vault"**: Tenancy-aware document storage with one-click 12-month audit export. **Urgent — councils can request records now.**
2. **Upgrade Maintenance**: Add audit log to maintenance tickets (who said what, when). **Now a legal compliance tool.**
3. **MTD is live**: Implement HMRC expense categories immediately. Hammock has HMRC recognition — we need this too.
4. **Section 8 Wizard**: Phase 1 is live. Landlords need guidance on all 37 grounds **right now**.
5. **PRS Database Readiness**: Build a "registration readiness" checker flagging missing Gas/EICR/EPC data before the database launches late 2026.
