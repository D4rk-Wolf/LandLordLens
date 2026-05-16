# Technical Data Sources & Compliance Protocols

**Date**: December 2025
**Purpose**: Define technical methods for automating compliance checks and handling data privacy.

## 1. Energy Performance Certificates (EPC)
*   **Source**: Open Data Communities API (DLUHC).
*   **Authentication**: Basic Auth (User Email + API Key).
*   **Capability**:
    *   Search by Postcode.
    *   Retrieve current rating (A-G), potential rating, and expiry date.
    *   Retrieve "Recommendations" list (e.g., "Low energy lighting", "Solar water heating").
*   **Implementation Strategy**:
    *   On property creation, trigger background job: `GET /domestic/search?postcode={postcode}`.
    *   If exact match found, auto-populate: `epcRating`, `epcExpiry`.
    *   Store `recommendations` for the "Improvement Plan" feature.

## 2. Licensing (HMO & Selective)
*   **Findings**: There is **NO central API** for property licensing in the UK.
*   **Landscape**:
    *   Schemes are fragmented by local borough (London alone has 30+ variations).
    *   Aggregators (e.g., Kamma, Searchland) exist but are expensive enterprise solutions.
*   **Implementation Strategy (MVP)**:
    *   **Manual Flagging**: Allow user to manually select "HMO" or "Selective License".
    *   **Council Lookup**: Use postcode to identify the Local Authority (via `postcodes.io` free API).
    *   **Dynamic Linking**: Provide a deep link to the specific council's housing page based on the postcode lookup (e.g., `google.com/search?q={council_name}+property+licensing`).

## 3. Data Retention & GDPR
*   **Conflict**: "Right to be Forgotten" (GDPR) vs "Record Keeping" (Ombudsman/HMRC).
*   **Legal Stance**: **Legal obligation supersedes GDPR**.
    *   **Right to Rent Checks**: Must be kept for **2 years** after tenancy ends.
    *   **Financial Records (HMRC)**: Must be kept for **6-7 years**.
    *   **Claims Limitation**: 6 years (contract), 12 years (deeds).
*   **Policy Decision**:
    *   **Default Retention**: 7 years for all tenancy-related data.
    *   **"Right to Erasure" Requests**: Can only process *after* retention period expires, OR for data not legally required (e.g., marketing preferences, un-progressed inquiries).
    *   **Ombudsman Vault**: Data must be "locked" (immutable) rather than deleted.
