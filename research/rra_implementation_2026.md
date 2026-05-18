# Renters' Rights Act 2025 — Full Implementation Reference

**Last Updated**: May 2026
**Source**: GOV.UK Implementation Roadmap, Keystone Law, The Independent Landlord, Trowers & Hamlins

---

## Implementation Timeline

The Renters' Rights Act 2025 received Royal Assent on 27 October 2025. Implementation is phased:

| Phase | Date | Key Changes |
|-------|------|-------------|
| **Phase 1** | 1 May 2026 | ASTs abolished, Section 21 gone, all tenancies become periodic assured tenancies, 37-ground Section 8 regime live |
| **Phase 2** | Late 2026+ | PRS Database launches, Landlord Ombudsman established |
| **Phase 3** | 2028 | Mandatory Ombudsman membership for all landlords |
| **Phase 4** | 2029–2035 | Awaab's Law extended to PRS, Decent Homes Standard applies |

> **Critical for LandLordLens**: Phase 1 is already live (1 May 2026). Every user of the platform is legally affected **now**.

---

## Phase 1 Changes (Live: 1 May 2026)

### Tenancy Types
- Assured Shorthold Tenancies (ASTs) are abolished.
- All existing ASTs automatically converted to **periodic assured tenancies** on 1 May 2026.
- No new fixed-term assured tenancies can be granted.
- New tenancies are periodic from the start with no end date.

### Section 21 Abolished
- No-fault eviction is entirely removed from the law.
- Landlords can only recover possession via **Section 8**, using one of 37 specific grounds.

---

## Complete Section 8 Grounds (Post-1 May 2026)

37 total grounds: 20 mandatory, 17 discretionary. Up from 17 grounds previously.

### Mandatory Grounds

| Ground | Common Name | Notice Period | Min. Tenancy | Key Prerequisite |
|--------|-------------|---------------|--------------|------------------|
| 1 | Family moving in | **4 months** | 12 months | Tenancy must be 12+ months before notice expires |
| 1A | Selling the property | **4 months** | 12 months | Landlord must genuinely intend to sell |
| 1B | Social rent-to-buy | **4 months** | 12 months | Registered provider, rent-to-buy agreement |
| 2 | Mortgage repossession | **4 months** | None | Lender exercises power of sale |
| 2ZA | End of superior lease | **4 months** | None | Limited landlord types |
| 2ZB | Superior lease ends (21yr+) | **4 months** | None | Fixed term >21 years expired |
| 2ZC | Possession by superior landlord | **4 months** | None | Specified landlord types |
| 2ZD | Superior landlord (21yr+) | **4 months** | None | Fixed term >21 years expired |
| 4 | Student accommodation | **2 weeks** | None | Educational establishment let |
| 4A | Student HMO (academic year) | **4 months** | None | Recovery window: June–September only |
| 5 | Minister of religion | **2 months** | None | Property required for ministerial duties |
| 5A | Agricultural worker housing | **2 months** | None | Landlord requires for employee |
| 5B | Key worker eligibility | **2 months** | None | Social landlord, eligibility criteria |
| 5C | Employment-linked tenancy ended | **2 months** | None | Employment ended |
| 5D | Eligibility criteria ceased | **2 months** | None | Social landlord |
| 5E | Supported accommodation (wrong occupant) | **4 weeks** | None | Tenant not qualifying for care/support |
| 5F | Supported accommodation services end | **4 weeks** | None | Funding or services ended |
| 5G | Homelessness temp accommodation | **4 weeks** | None | LA notifies no longer required |
| 5H | Stepping stone accommodation | **2 months** | None | Eligibility ceased or period ended |
| 6 | Redevelopment | **4 months** | 6 months | Cannot redevelop with tenant present |
| 6B | Enforcement action compliance | **4 months** | None | LA enforcement or banning order |
| 7 | Death of tenant | **2 months** | None | Proceedings within 24 months of death |
| 7A | Severe ASB / criminal conviction | **Immediate*** | None | Conviction or IPNA breach |
| 7B | No right to rent | **2 weeks** | None | Tenant lacks immigration status |
| 8 | Rent arrears (3 months) | **4 weeks** | None | 3 months arrears at **both** notice and hearing |

*Court order takes effect minimum 14 days after notice service.

### Discretionary Grounds

| Ground | Common Name | Notice Period | Notes |
|--------|-------------|---------------|-------|
| 9 | Suitable alternative accommodation | 2 months | Judge discretion |
| 10 | Any rent arrears | 4 weeks | Any amount owed |
| 11 | Persistent late payment | 4 weeks | Pattern of arrears |
| 12 | Tenancy breach | 2 weeks | Excluding rent |
| 13 | Property deterioration | 2 weeks | Tenant-caused damage |
| 14 | Anti-social behaviour | Immediate* | Nuisance or indictable offence |
| 14A | Domestic abuse | 2 weeks | Social landlords only |
| 14ZA | Riot offence | 2 weeks | Indictable conviction during riot |
| 15 | Furniture deterioration | 2 weeks | Tenant-caused damage |
| 17 | False statement | 2 weeks | Tenancy via misrepresentation |
| 18 | Supported accommodation (refusing support) | 4 weeks | Tenant refusing engagement |

> **Software Implication**: The Section 8 wizard must enforce the 12-month minimum tenancy prerequisite for Grounds 1 and 1A. The wizard must also verify deposit protection is in place (required for all grounds except 7A and 14).

---

## Phase 2: PRS Database (Late 2026)

### What It Is
A mandatory national register of all private rented properties and landlords. All data is public-facing to inform tenant choices and support council enforcement.

### Registration Requirements
- Every landlord must register themselves and every property.
- Required data: landlord details, Gas Safety cert, EICR, EPC, Unique Property Identifier (UPI).
- Annual fee applies (amount TBC closer to launch).

### Penalties for Non-Registration
| Offence | Penalty |
|---------|---------|
| Failure to register | Up to **£5,000** |
| Providing false information | Up to **£30,000** |
| Letting after revocation | Up to **£30,000** |
| Continued breach | Rent Repayment Order up to **24 months' rent** |

### Operational Consequences of Non-Registration
- Cannot serve a valid Section 8 notice.
- Cannot instruct a letting agent.
- Cannot renew an HMO licence.

> **Software Opportunity**: "PRS Registration Readiness" checklist. Flag missing data (Gas Safety, EICR, EPC) that blocks registration. Show which properties are registration-ready vs blocked.

---

## Phase 2: Landlord Ombudsman (Late 2026)

- A new Property Ombudsman specifically for the PRS will be established.
- Dispute resolution between tenants and landlords without court proceedings.
- Mandatory membership will be required from **2028** (when the Secretary of State confirms the service is ready).
- Councils can request **12 months of records** at short notice.

### Records Landlords Must Retain
- Tenancy agreements
- Deposit protection + Prescribed Information
- Right-to-Rent checks
- Maintenance logs (complaints and repairs with timestamps)

> **Software Implication**: Maintenance ticket audit trail is now a legal compliance tool, not just a convenience feature.

---

## Phase 4: Decent Homes Standard (2035)

- Extended to the private rented sector for the first time.
- Government consultation outcome published 28 January 2026.
- Full compliance required by **2035** (long runway, but landlords encouraged to start now).
- Properties must be free from Category 1 health/safety hazards and provide reasonable thermal comfort.
- Local councils can issue civil penalties up to **£40,000** for non-compliance.
- Awaab's Law (hazard response time limits) also extended to PRS in Phase 4.

---

## Sources
- [GOV.UK Implementation Roadmap](https://www.gov.uk/government/publications/renters-rights-act-2025-implementation-roadmap/implementing-the-renters-rights-act-2025-our-roadmap-for-reforming-the-private-rented-sector)
- [Keystone Law — Grounds & Notice Periods](https://keystonelaw.com/keynotes/the-renters-rights-act-2025-what-are-the-grounds-for-possession-and-their-notice-periods/)
- [The Independent Landlord — Full Grounds Table](https://theindependentlandlord.com/rrb-grounds-table/)
- [Gowling WLG — Final Countdown 1 May 2026](https://gowlingwlg.com/en-gb/insights-resources/articles/2026/renters-rights-act-2025-the-final-countdown-1-may-2026)
- [PRS Database Explained — August App](https://www.augustapp.com/blog/private-rented-sector-database)
- [Decent Homes Standard — TSP Legal](https://www.tsplegal.com/articles/the-renters-rights-act-2025-phase-3-decent-homes-standard-the-extension-of-awaabs-law/)
- [Ombudsman — Property Week](https://www.property118.com/small-landlords-need-support-to-adapt-to-renters-rights-act-the-property-ombudsman/)
