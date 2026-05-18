# Gap Analysis: High-End Landlord Features (2025/2026)

**Purpose**: Identify missing features required to compete with "Top Tier" SaaS products (e.g., Landlord Studio, Hammock).

## 1. Advanced Financial Intelligence (The "Investor" View)
*   **Current State**: Basic Income/Expense tracking (MTD compliant).
*   **The Gap**: High-end landlords treat property as an asset class, not just a cash book.
*   **Missing KPIs**:
    *   **Net Operating Income (NOI)**: Revenue minus operating expenses (crucial for valuation).
    *   **Yield Tracker**: Gross vs Net Yield (Dynamic, based on current market value).
    *   **Cash-on-Cash Return**: Annual cash flow / Total Cash Invested.
    *   **Equity Monitor**: Current Value - Mortgage Balance.
*   **Action**: Create a "Portfolio Analytics" dashboard separate from the "Tax Dashboard".

## 2. Market Intelligence ("Am I Undercharging?")
*   **The Gap**: Users currently guess their rent price.
*   **Solution**: **Automated Valuation Model (AVM)** integration.
    *   **API**: `PropertyData` (UK) or `PropAPIS` (Zoopla).
    *   **Feature**: "Rent Estimator" - Enter postcode/beds -> Get estimated monthly rent range.
    *   **Value**: Justifying rent increases to tenants with data.

## 3. Legal Automation (Post-Section 21 World)
*   **The Gap**: Section 21 is abolished (Renters Rights Act). Landlords are terrified of "stuck" tenants.
*   **Solution**: **Section 8 Wizard**.
    *   **Logic**: "I want possession because..." -> Select Ground (e.g., "Selling", "Moving In", "Arrears").
    *   **Validation**: Check prerequisites (e.g., "Is deposit protected?", "Is EPC valid?"). IF NO -> Block Notice.
    *   **Output**: Generate the correct Form 3 notice with calculated notice dates (4 months for selling, 2 months for specific grounds).
    *   **New Mandatory Grounds**: Include *Selling Property* and *Student Lets* (Ground 4A).

## 4. Smart Maintenance Workflow
*   **The Gap**: Simple "Ticket Logging" is manual.
*   **High-End Solution**: **"Uber for Repairs"**.
    *   **Tenant Side**: Tenant uploads video of leak.
    *   **Landlord Side**: "Forward to Trade" button.
    *   **Integration**: Connect to generic email/SMS output for trades, but track the *status* (Quote Received -> Job Booked -> Invoice Paid).

## 5. UI/UX "Polish" Features

- **Visuals**: Dark mode now implemented (May 2026 redesign). Amber/gold accent system.
- **Interactions**: "Swipe to action" on mobile lists.
- **AI**: "Lease Reader" - Drag & drop a PDF tenancy agreement, AI extracts start/end dates and rent amount (finetuned OCR).

---

## 6. Competitive Gap vs Latch (New Entrant — Urgent)

> **UPDATE (May 2026)**: Latch has emerged as the most capable new competitor. They lead on AI. We must lead on compliance depth.

Latch's AI agent "Matt" handles: rent chasing, document analysis, compliance reminders, tenant comms. Landlords report 5–10 hrs/week saved. Pricing: Free (3 leases) / £20/mo Pro.

**What Latch does NOT have (our differentiation):**
- Section 8 wizard with ground validation and prerequisite checking
- PRS Database readiness tracker
- Ombudsman Vault (12-month audit pack export)
- Deposit protection prescribed info generator
- Right-to-Rent check tracking
- Maintenance audit log (Ombudsman-defensible)

**Action**: Prioritise all of the above before adding AI features. Compliance depth is the moat. Once those are built, layer in AI for document extraction and automated alerts.

## 7. MTD Now Live — Hammock Has HMRC Recognition

> **UPDATE (May 2026)**: MTD ITSA Phase 1 mandatory from 6 April 2026 (£50k+ income). Hammock is first HMRC-recognised landlord platform.

**Gap**: LandLordLens needs HMRC API integration for direct quarterly submission. Current state generates reports but does not submit. Required steps:
1. Register as MTD software vendor with HMRC.
2. Implement OAuth 2.0 for landlord HMRC account authorisation.
3. Build quarterly submission endpoint against HMRC sandbox, then production.
4. Add End-of-Period Statement and Final Declaration flows.

This is a 6–9 month engineering track but is now **urgent** given Phase 1 is live.
