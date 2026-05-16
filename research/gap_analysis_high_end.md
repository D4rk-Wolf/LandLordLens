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
*   **Visuals**: Dark Mode (Deep Midnight), Glassmorphism cards.
*   **Interactions**: "Swipe to action" on mobile lists.
*   **AI**: "Lease Reader" - Drag & drop a PDF tenancy agreement, AI extracts start/end dates and rent amount (finetuned OCR).
