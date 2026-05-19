import { eq, sql } from 'drizzle-orm'
import { db } from './client'
import {
  complianceRecords,
  depositProtections,
  expenses,
  maintenanceEvents,
  maintenanceTickets,
  profiles,
  properties,
  rightToRent,
  tenancies,
} from './schema'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uuid(): string {
  return crypto.randomUUID()
}

/** ISO date string for "N days from today" (negative = past) */
function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]!
}

/** ISO date string for "N months from today" (negative = past) */
function monthsFromNow(n: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + n)
  return d.toISOString().split('T')[0]!
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  // ── 1. Resolve user ────────────────────────────────────────────────────────
  const userId = process.env.SEED_USER_ID

  let user: { id: string } | undefined

  if (userId) {
    const [profile] = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.id, userId))
    user = profile
  } else {
    const [first] = await db.select({ id: profiles.id }).from(profiles).limit(1)
    user = first
  }

  if (!user) {
    console.error(
      'No user found in profiles table.\n' +
      'Sign up in the app first, then re-run:\n' +
      '  SEED_USER_ID=<your-uuid> pnpm db:seed'
    )
    process.exit(1)
  }

  const uid = user.id
  console.log(`Seeding for user: ${uid}`)

  // ── 2a. Drop stale check constraints (left over from earlier drizzle-kit push runs) ──
  await db.execute(sql`ALTER TABLE tenancies DROP CONSTRAINT IF EXISTS tenancies_tenancy_type_check`)
  await db.execute(sql`ALTER TABLE tenancies DROP CONSTRAINT IF EXISTS tenancies_status_check`)

  // ── 2. Clear existing seed data (FK-safe order) ───────────────────────────
  console.log('Clearing existing data…')
  await db.delete(maintenanceEvents).where(eq(maintenanceEvents.userId, uid))
  await db.delete(maintenanceTickets).where(eq(maintenanceTickets.userId, uid))
  await db.delete(rightToRent).where(eq(rightToRent.userId, uid))
  await db.delete(depositProtections).where(eq(depositProtections.userId, uid))
  await db.delete(complianceRecords).where(eq(complianceRecords.userId, uid))
  await db.delete(expenses).where(eq(expenses.userId, uid))
  await db.delete(tenancies).where(eq(tenancies.userId, uid))
  await db.delete(properties).where(eq(properties.userId, uid))

  // ── 3. Properties ─────────────────────────────────────────────────────────
  console.log('Inserting properties…')

  const propManchesterId = uuid()
  const propLondonId = uuid()
  const propBirminghamId = uuid()
  const propLeedsId = uuid()

  await db.insert(properties).values([
    {
      id: propManchesterId,
      userId: uid,
      address: { line1: '14 Maple Avenue', city: 'Manchester', postcode: 'M14 5HJ', country: 'United Kingdom' },
      propertyType: 'house',
      bedrooms: 3,
      bathrooms: 1,
      rentAmount: '1200.00',
      purchasePrice: '185000.00',
      purchaseDate: '2019-06-15',
      status: 'occupied',
      availabilityStatus: 'rented',
      region: 'england',
      furnished: false,
      epcRating: 'C',
      epcExpiryDate: '2031-03-14',
      currentValue: '228000.00',
      mortgageBalance: '118500.00',
      mortgageRate: '0.0390',
      mortgageMonthlyPayment: '890.00',
      compliance: {},
      financials: {},
    },
    {
      id: propLondonId,
      userId: uid,
      address: { line1: 'Flat 3', line2: '22 Victoria Road', city: 'London', postcode: 'E8 1DZ', country: 'United Kingdom' },
      propertyType: 'flat',
      bedrooms: 1,
      bathrooms: 1,
      rentAmount: '1650.00',
      purchasePrice: '310000.00',
      purchaseDate: '2021-04-20',
      status: 'occupied',
      availabilityStatus: 'rented',
      region: 'england',
      furnished: true,
      epcRating: 'D',
      epcExpiryDate: '2027-08-19',
      currentValue: '338000.00',
      mortgageBalance: '243000.00',
      mortgageRate: '0.0450',
      mortgageMonthlyPayment: '1320.00',
      compliance: {},
      financials: {},
    },
    {
      id: propBirminghamId,
      userId: uid,
      address: { line1: '8 Birch Lane', city: 'Birmingham', postcode: 'B15 2TQ', country: 'United Kingdom' },
      propertyType: 'house',
      bedrooms: 2,
      bathrooms: 1,
      rentAmount: '950.00',
      purchasePrice: '165000.00',
      purchaseDate: '2022-09-01',
      status: 'vacant',
      availabilityStatus: 'ready_for_rent',
      region: 'england',
      furnished: false,
      epcRating: 'E',
      // No epcExpiryDate — never had a proper cert
      currentValue: '174000.00',
      mortgageBalance: '132000.00',
      mortgageRate: '0.0520',
      mortgageMonthlyPayment: '720.00',
      compliance: {},
      financials: {},
    },
    {
      id: propLeedsId,
      userId: uid,
      address: { line1: '12 Oak Street', city: 'Leeds', postcode: 'LS6 2AE', country: 'United Kingdom' },
      propertyType: 'house',
      bedrooms: 2,
      bathrooms: 1,
      rentAmount: '900.00',
      purchasePrice: '148000.00',
      purchaseDate: '2020-02-28',
      status: 'maintenance',
      availabilityStatus: 'ready_for_rent',
      region: 'england',
      furnished: false,
      epcRating: 'C',
      epcExpiryDate: '2029-11-29',
      currentValue: '163000.00',
      mortgageBalance: '96000.00',
      mortgageRate: '0.0320',
      mortgageMonthlyPayment: '580.00',
      compliance: {},
      financials: {},
    },
  ])

  // ── 4. Tenancies ──────────────────────────────────────────────────────────
  console.log('Inserting tenancies…')

  const tenancyManchesterId = uuid()
  const tenancyLondonId = uuid()
  const tenancyLeedsEndedId = uuid()

  await db.insert(tenancies).values([
    {
      id: tenancyManchesterId,
      propertyId: propManchesterId,
      userId: uid,
      tenantName: 'James Mitchell',
      tenantEmail: 'james.mitchell@example.com',
      tenantPhone: '07700 900123',
      startDate: '2024-03-01',
      monthlyRent: '1200.00',
      deposit: '1200.00',
      depositProtected: true,
      tenancyType: 'periodic_assured',
      status: 'active',
      rightToRentChecked: true,
      howToRentGuideProvided: true,
      howToRentGuideDate: '2024-03-01',
      tenantInformationPackProvided: true,
      tenantInformationPackDate: '2024-03-01',
      rentReviewDate: '2025-03-01',
    },
    {
      id: tenancyLondonId,
      propertyId: propLondonId,
      userId: uid,
      tenantName: 'Emily Chen',
      tenantEmail: 'emily.chen@example.com',
      tenantPhone: '07700 900456',
      startDate: '2023-06-01',
      monthlyRent: '1650.00',
      deposit: '1650.00',
      depositProtected: true,
      tenancyType: 'periodic_assured',
      status: 'active',
      rightToRentChecked: true,
      howToRentGuideProvided: true,
      howToRentGuideDate: '2023-06-01',
      tenantInformationPackProvided: true,
      tenantInformationPackDate: '2023-06-01',
      rentReviewDate: monthsFromNow(1),
    },
    {
      id: tenancyLeedsEndedId,
      propertyId: propLeedsId,
      userId: uid,
      tenantName: 'David Thompson',
      tenantEmail: 'david.t@example.com',
      tenantPhone: '07700 900789',
      startDate: '2023-09-01',
      endDate: '2025-08-31',
      monthlyRent: '850.00',
      deposit: '850.00',
      depositProtected: true,
      tenancyType: 'periodic_assured',
      status: 'ended',
      rightToRentChecked: true,
      howToRentGuideProvided: true,
    },
  ])

  // ── 5. Deposit protections ────────────────────────────────────────────────
  console.log('Inserting deposit protections…')

  await db.insert(depositProtections).values([
    {
      id: uuid(),
      tenancyId: tenancyManchesterId,
      userId: uid,
      depositAmount: '1200.00',
      scheme: 'dps',
      protectionReference: 'DPS-2024-0038271',
      protectedDate: '2024-03-04',
      protectionDeadline: '2024-03-31',
      prescribedInfoServedDate: '2024-03-05',
      prescribedInfoServingDeadline: '2024-03-31',
      status: 'protected',
    },
    {
      id: uuid(),
      tenancyId: tenancyLondonId,
      userId: uid,
      depositAmount: '1650.00',
      scheme: 'mydeposits',
      protectionReference: 'MYD-2023-0091452',
      protectedDate: '2023-06-05',
      protectionDeadline: '2023-07-01',
      prescribedInfoServedDate: '2023-06-07',
      prescribedInfoServingDeadline: '2023-07-01',
      status: 'protected',
    },
    {
      id: uuid(),
      tenancyId: tenancyLeedsEndedId,
      userId: uid,
      depositAmount: '850.00',
      scheme: 'tds',
      protectionReference: 'TDS-2023-0054871',
      protectedDate: '2023-09-06',
      protectionDeadline: '2023-10-01',
      prescribedInfoServedDate: '2023-09-08',
      prescribedInfoServingDeadline: '2023-10-01',
      status: 'returned',
      returnDate: '2025-09-05',
      returnAmount: '850.00',
    },
  ])

  // ── 6. Right to Rent ──────────────────────────────────────────────────────
  console.log('Inserting right to rent records…')

  await db.insert(rightToRent).values([
    {
      id: uuid(),
      tenancyId: tenancyManchesterId,
      userId: uid,
      tenantName: 'James Mitchell',
      tenantDateOfBirth: '1988-07-15',
      documentType: 'uk_passport',
      documentNumber: '520844231',
      expiryDate: '2031-08-14',
      checkDate: '2024-02-20',
      checkedBy: 'Connor Simmons',
      status: 'passed',
    },
    {
      id: uuid(),
      tenancyId: tenancyLondonId,
      userId: uid,
      tenantName: 'Emily Chen',
      tenantDateOfBirth: '1995-03-28',
      documentType: 'biometric_residence_permit',
      documentNumber: 'ZA1234567',
      expiryDate: daysFromNow(180), // expiring in 6 months — triggers follow-up
      checkDate: '2023-05-25',
      checkedBy: 'Connor Simmons',
      status: 'passed',
      followUpRequired: true,
      followUpDate: daysFromNow(150),
    },
  ])

  // ── 7. Compliance records ─────────────────────────────────────────────────
  console.log('Inserting compliance records…')

  await db.insert(complianceRecords).values([
    // ── Manchester: all current, gas served ──
    {
      id: uuid(),
      propertyId: propManchesterId,
      userId: uid,
      complianceType: 'gas_safety',
      region: 'england',
      certificateNumber: 'GSC-2025-MAN-00471',
      issueDate: '2025-11-01',
      expiryDate: '2026-10-31',
      issuer: 'British Gas HomeCare',
      servedToTenantDate: '2025-11-02',
    },
    {
      id: uuid(),
      propertyId: propManchesterId,
      userId: uid,
      complianceType: 'electrical',
      region: 'england',
      certificateNumber: 'EICR-2023-MAN-00182',
      issueDate: '2023-05-10',
      expiryDate: '2028-05-09',
      issuer: 'Spark Electrical Ltd',
      servedToTenantDate: '2024-03-01',
    },
    {
      id: uuid(),
      propertyId: propManchesterId,
      userId: uid,
      complianceType: 'smoke_alarm',
      region: 'england',
      issueDate: '2024-03-01',
      expiryDate: '2034-03-01', // 10-year device lifespan
      issuer: 'Connor Simmons',
      servedToTenantDate: '2024-03-01',
      notes: 'Mains-wired interlinked alarms tested at check-in',
    },
    {
      id: uuid(),
      propertyId: propManchesterId,
      userId: uid,
      complianceType: 'carbon_monoxide_alarm',
      region: 'england',
      issueDate: '2024-03-01',
      expiryDate: '2031-03-01', // 7-year device lifespan
      issuer: 'Connor Simmons',
      servedToTenantDate: '2024-03-01',
    },

    // ── London: gas expiring soon (25 days), NOT served; EICR OK ──
    {
      id: uuid(),
      propertyId: propLondonId,
      userId: uid,
      complianceType: 'gas_safety',
      region: 'england',
      certificateNumber: 'GSC-2025-LON-00893',
      issueDate: daysFromNow(-340),
      expiryDate: daysFromNow(25), // expiring soon!
      issuer: 'Corgi HomePlan',
      // servedToTenantDate intentionally NULL → triggers amber badge
    },
    {
      id: uuid(),
      propertyId: propLondonId,
      userId: uid,
      complianceType: 'electrical',
      region: 'england',
      certificateNumber: 'EICR-2021-LON-00341',
      issueDate: '2021-08-01',
      expiryDate: '2026-07-31',
      issuer: 'London Electrical Services',
      servedToTenantDate: '2023-06-01',
    },
    {
      id: uuid(),
      propertyId: propLondonId,
      userId: uid,
      complianceType: 'epc',
      region: 'england',
      certificateNumber: 'EPC-2017-LON-00221',
      issueDate: '2017-08-20',
      expiryDate: '2027-08-19',
      issuer: 'Energy Assessors UK',
      notes: 'Rated D — upgrade required before EPC 2030 deadline',
    },

    // ── Birmingham: gas EXPIRED 7 weeks ago, no EICR, EPC E ──
    {
      id: uuid(),
      propertyId: propBirminghamId,
      userId: uid,
      complianceType: 'gas_safety',
      region: 'england',
      certificateNumber: 'GSC-2025-BHM-00312',
      issueDate: daysFromNow(-430),
      expiryDate: daysFromNow(-65), // EXPIRED
      issuer: 'Homeserve',
    },
    {
      id: uuid(),
      propertyId: propBirminghamId,
      userId: uid,
      complianceType: 'epc',
      region: 'england',
      certificateNumber: 'EPC-2022-BHM-00098',
      issueDate: '2022-09-01',
      expiryDate: '2032-08-31',
      issuer: 'Midlands Energy Surveys',
      notes: 'Rated E — significant upgrade work required for 2030 deadline',
    },

    // ── Leeds: all current ──
    {
      id: uuid(),
      propertyId: propLeedsId,
      userId: uid,
      complianceType: 'gas_safety',
      region: 'england',
      certificateNumber: 'GSC-2026-LDS-00054',
      issueDate: '2026-01-15',
      expiryDate: '2027-01-14',
      issuer: 'Yorkshire Gas Services',
    },
    {
      id: uuid(),
      propertyId: propLeedsId,
      userId: uid,
      complianceType: 'electrical',
      region: 'england',
      certificateNumber: 'EICR-2022-LDS-00201',
      issueDate: '2022-11-01',
      expiryDate: '2027-10-31',
      issuer: 'Northern Electrical Inspections',
    },
  ])

  // ── 8. Maintenance tickets ────────────────────────────────────────────────
  console.log('Inserting maintenance tickets…')

  const ticketLeakId = uuid()
  const ticketBoilerId = uuid()
  const ticketCleanId = uuid()
  const ticketPipeId = uuid()

  await db.insert(maintenanceTickets).values([
    {
      id: ticketLeakId,
      propertyId: propLondonId,
      userId: uid,
      title: 'Leaking kitchen tap',
      description: 'Tenant reports persistent drip from hot tap. Getting worse — leaving bucket under sink.',
      priority: 'medium',
      status: 'in_progress',
      reportedBy: 'Emily Chen',
      assignedTo: 'Southgate Plumbers Ltd',
      notes: 'Quote received: £120 inc VAT. Awaiting tenant availability to book.',
    },
    {
      id: ticketBoilerId,
      propertyId: propManchesterId,
      userId: uid,
      title: 'Annual boiler service',
      description: 'Routine annual boiler service — Worcester Bosch 28i.',
      priority: 'low',
      status: 'completed',
      reportedBy: 'Connor Simmons',
      assignedTo: 'British Gas HomeCare',
      cost: '95.00',
      completedDate: '2025-12-10',
    },
    {
      id: ticketCleanId,
      propertyId: propBirminghamId,
      userId: uid,
      title: 'End-of-tenancy deep clean',
      description: 'Full professional clean before relisting — carpets, oven, windows.',
      priority: 'medium',
      status: 'completed',
      reportedBy: 'Connor Simmons',
      assignedTo: 'Gleam Cleaning Co',
      cost: '280.00',
      completedDate: '2026-04-15',
    },
    {
      id: ticketPipeId,
      propertyId: propLeedsId,
      userId: uid,
      title: 'Burst pipe — bathroom',
      description: 'Pipe behind bath panel burst overnight. Water damage to floor and adjacent bedroom wall. Property unoccupied — water now isolated.',
      priority: 'urgent',
      status: 'open',
      reportedBy: 'Connor Simmons',
    },
  ])

  // ── 9. Maintenance events (audit log) ─────────────────────────────────────
  console.log('Inserting maintenance events…')

  const now = new Date()
  const ts = (daysAgo: number, hoursAgo = 0) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    d.setHours(d.getHours() - hoursAgo)
    return d
  }

  await db.insert(maintenanceEvents).values([
    // Leaking tap (in progress)
    {
      id: uuid(), ticketId: ticketLeakId, userId: uid,
      eventType: 'created',
      description: 'Ticket created — leaking kitchen tap reported by tenant.',
      metadata: {},
      createdAt: ts(17),
    },
    {
      id: uuid(), ticketId: ticketLeakId, userId: uid,
      eventType: 'assigned',
      description: 'Assigned to Southgate Plumbers Ltd.',
      metadata: { assignedTo: 'Southgate Plumbers Ltd' },
      createdAt: ts(16),
    },
    {
      id: uuid(), ticketId: ticketLeakId, userId: uid,
      eventType: 'note_added',
      description: 'Plumber visited and assessed. Quote: £120 inc VAT (replace tap cartridge and service ball valve). Awaiting tenant to confirm access.',
      metadata: { quoteAmount: 120 },
      createdAt: ts(13),
    },
    {
      id: uuid(), ticketId: ticketLeakId, userId: uid,
      eventType: 'status_changed',
      description: 'Status changed: open → in_progress.',
      metadata: { from: 'open', to: 'in_progress' },
      createdAt: ts(10),
    },

    // Annual boiler service (completed)
    {
      id: uuid(), ticketId: ticketBoilerId, userId: uid,
      eventType: 'created',
      description: 'Annual service booked — due date approaching.',
      metadata: {},
      createdAt: ts(169),
    },
    {
      id: uuid(), ticketId: ticketBoilerId, userId: uid,
      eventType: 'assigned',
      description: 'Assigned to British Gas HomeCare.',
      metadata: { assignedTo: 'British Gas HomeCare' },
      createdAt: ts(167),
    },
    {
      id: uuid(), ticketId: ticketBoilerId, userId: uid,
      eventType: 'status_changed',
      description: 'Status changed: open → in_progress.',
      metadata: { from: 'open', to: 'in_progress' },
      createdAt: ts(161),
    },
    {
      id: uuid(), ticketId: ticketBoilerId, userId: uid,
      eventType: 'cost_updated',
      description: 'Invoice received: £95.00.',
      metadata: { cost: '95.00', supplier: 'British Gas HomeCare' },
      createdAt: ts(159),
    },
    {
      id: uuid(), ticketId: ticketBoilerId, userId: uid,
      eventType: 'completed',
      description: 'Boiler service completed — passed. Next service due Dec 2026.',
      metadata: { completedDate: '2025-12-10' },
      createdAt: ts(159, 2),
    },

    // Deep clean (completed)
    {
      id: uuid(), ticketId: ticketCleanId, userId: uid,
      eventType: 'created',
      description: 'End-of-tenancy clean requested following David Thompson vacating.',
      metadata: {},
      createdAt: ts(47),
    },
    {
      id: uuid(), ticketId: ticketCleanId, userId: uid,
      eventType: 'assigned',
      description: 'Assigned to Gleam Cleaning Co.',
      metadata: { assignedTo: 'Gleam Cleaning Co' },
      createdAt: ts(46),
    },
    {
      id: uuid(), ticketId: ticketCleanId, userId: uid,
      eventType: 'completed',
      description: 'Deep clean completed. Property ready to relist.',
      metadata: { completedDate: '2026-04-15', cost: '280.00' },
      createdAt: ts(33),
    },

    // Burst pipe (open — just created)
    {
      id: uuid(), ticketId: ticketPipeId, userId: uid,
      eventType: 'created',
      description: 'Urgent: burst pipe discovered in bathroom. Water isolated. Emergency plumber being sourced.',
      metadata: { urgent: true },
      createdAt: ts(8),
    },
  ])

  // ── 10. Expenses ──────────────────────────────────────────────────────────
  console.log('Inserting expenses…')

  // Helper — determine tax year from date string
  const taxYear = (dateStr: string): string => {
    const d = new Date(dateStr)
    const apr6 = new Date(d.getFullYear(), 3, 6) // April 6
    return d >= apr6
      ? `${d.getFullYear()}-${String(d.getFullYear() + 1).slice(-2)}`
      : `${d.getFullYear() - 1}-${String(d.getFullYear()).slice(-2)}`
  }

  type ExpenseRow = {
    id: string
    propertyId: string
    tenancyId?: string
    userId: string
    type: 'income' | 'expense'
    category: string
    hmrcCategory: 'rent_and_other_income' | 'premiums_of_lease_granted' | 'premises_costs' | 'repairs_and_maintenance' | 'financial_costs' | 'professional_fees' | 'cost_of_services' | 'travel_costs' | 'other_allowable_expenses' | 'capital_allowances' | 'residential_finance_costs' | 'not_categorised'
    amount: string
    currency: string
    date: string
    description: string
    supplier?: string
    isTaxDeductible: boolean
    paymentMethod: 'bank_transfer' | 'card' | 'cash' | 'cheque' | 'other'
    taxYear: string
  }

  const expenseRows: ExpenseRow[] = []

  const addExpense = (row: Omit<ExpenseRow, 'id' | 'userId' | 'currency' | 'isTaxDeductible'> & Partial<Pick<ExpenseRow, 'isTaxDeductible'>>) => {
    expenseRows.push({
      id: uuid(),
      userId: uid,
      currency: 'GBP',
      isTaxDeductible: true,
      ...row,
    })
  }

  // ── Manchester (propManchesterId + tenancyManchesterId)
  // Rent income: 14 months (Mar 2025 – Apr 2026 = 14 payments)
  const manchesterRentMonths = [
    '2025-03-01', '2025-04-01', '2025-05-01', '2025-06-01', '2025-07-01',
    '2025-08-01', '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01',
    '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01',
  ]
  manchesterRentMonths.forEach(date => {
    addExpense({
      propertyId: propManchesterId,
      tenancyId: tenancyManchesterId,
      type: 'income',
      category: 'Rental Income',
      hmrcCategory: 'rent_and_other_income',
      amount: '1200.00',
      date,
      description: 'Monthly rent — James Mitchell',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  // Mortgage interest (approx. interest portion only)
  manchesterRentMonths.forEach(date => {
    addExpense({
      propertyId: propManchesterId,
      type: 'expense',
      category: 'Mortgage',
      hmrcCategory: 'residential_finance_costs',
      amount: '390.00', // ~interest portion at 3.9% on £120k
      date,
      description: 'Mortgage interest — 14 Maple Avenue',
      supplier: 'NatWest Mortgages',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  // Buildings insurance (annual, paid July)
  addExpense({
    propertyId: propManchesterId,
    type: 'expense',
    category: 'Insurance',
    hmrcCategory: 'premises_costs',
    amount: '384.00',
    date: '2025-07-01',
    description: 'Buildings & contents insurance annual premium',
    supplier: 'Simply Business',
    paymentMethod: 'card',
    taxYear: taxYear('2025-07-01'),
  })
  // Gas safety cert
  addExpense({
    propertyId: propManchesterId,
    type: 'expense',
    category: 'Compliance',
    hmrcCategory: 'premises_costs',
    amount: '78.00',
    date: '2025-11-01',
    description: 'Annual gas safety inspection & certificate',
    supplier: 'British Gas HomeCare',
    paymentMethod: 'card',
    taxYear: taxYear('2025-11-01'),
  })
  // Boiler service
  addExpense({
    propertyId: propManchesterId,
    type: 'expense',
    category: 'Maintenance',
    hmrcCategory: 'repairs_and_maintenance',
    amount: '95.00',
    date: '2025-12-10',
    description: 'Annual boiler service — Worcester Bosch 28i',
    supplier: 'British Gas HomeCare',
    paymentMethod: 'bank_transfer',
    taxYear: taxYear('2025-12-10'),
  })

  // ── London (propLondonId + tenancyLondonId)
  // Rent income: Jun 2023 is too far back; let's do 14 months to May 2026
  const londonRentMonths = [
    '2025-04-01', '2025-05-01', '2025-06-01', '2025-07-01', '2025-08-01',
    '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01',
    '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01',
  ]
  londonRentMonths.forEach(date => {
    addExpense({
      propertyId: propLondonId,
      tenancyId: tenancyLondonId,
      type: 'income',
      category: 'Rental Income',
      hmrcCategory: 'rent_and_other_income',
      amount: '1650.00',
      date,
      description: 'Monthly rent — Emily Chen',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  // Mortgage interest
  londonRentMonths.forEach(date => {
    addExpense({
      propertyId: propLondonId,
      type: 'expense',
      category: 'Mortgage',
      hmrcCategory: 'residential_finance_costs',
      amount: '910.00', // ~interest at 4.5% on £243k
      date,
      description: 'Mortgage interest — Flat 3, 22 Victoria Road',
      supplier: 'Nationwide Building Society',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  // Buildings insurance
  addExpense({
    propertyId: propLondonId,
    type: 'expense',
    category: 'Insurance',
    hmrcCategory: 'premises_costs',
    amount: '612.00',
    date: '2025-06-01',
    description: 'Buildings insurance annual premium — London flat',
    supplier: 'Simply Business',
    paymentMethod: 'card',
    taxYear: taxYear('2025-06-01'),
  })
  // Gas safety
  addExpense({
    propertyId: propLondonId,
    type: 'expense',
    category: 'Compliance',
    hmrcCategory: 'premises_costs',
    amount: '92.00',
    date: daysFromNow(-340),
    description: 'Annual gas safety inspection & certificate',
    supplier: 'Corgi HomePlan',
    paymentMethod: 'card',
    taxYear: taxYear(daysFromNow(-340)),
  })
  // Plumbing repair (tap — in progress but pre-pay deposit)
  addExpense({
    propertyId: propLondonId,
    type: 'expense',
    category: 'Maintenance',
    hmrcCategory: 'repairs_and_maintenance',
    amount: '120.00',
    date: daysFromNow(-10),
    description: 'Plumbing repair — leaking kitchen tap (Southgate Plumbers)',
    supplier: 'Southgate Plumbers Ltd',
    paymentMethod: 'bank_transfer',
    taxYear: taxYear(daysFromNow(-10)),
  })
  // Accountant fees
  addExpense({
    propertyId: propLondonId,
    type: 'expense',
    category: 'Professional Fees',
    hmrcCategory: 'professional_fees',
    amount: '350.00',
    date: '2026-01-20',
    description: 'Property accountant — self-assessment preparation',
    supplier: 'Reynolds & Co Accountants',
    paymentMethod: 'bank_transfer',
    taxYear: taxYear('2026-01-20'),
  })

  // ── Birmingham (vacant — minimal expenses)
  addExpense({
    propertyId: propBirminghamId,
    type: 'expense',
    category: 'Maintenance',
    hmrcCategory: 'repairs_and_maintenance',
    amount: '280.00',
    date: '2026-04-15',
    description: 'End-of-tenancy deep clean — 8 Birch Lane',
    supplier: 'Gleam Cleaning Co',
    paymentMethod: 'bank_transfer',
    taxYear: taxYear('2026-04-15'),
  })
  addExpense({
    propertyId: propBirminghamId,
    type: 'expense',
    category: 'Insurance',
    hmrcCategory: 'premises_costs',
    amount: '310.00',
    date: '2025-09-01',
    description: 'Buildings insurance annual premium — 8 Birch Lane',
    supplier: 'Simply Business',
    paymentMethod: 'card',
    taxYear: taxYear('2025-09-01'),
  })
  // Mortgage interest (still being paid on vacant property)
  const birminghamMortgageMonths = [
    '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01',
    '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01',
  ]
  birminghamMortgageMonths.forEach(date => {
    addExpense({
      propertyId: propBirminghamId,
      type: 'expense',
      category: 'Mortgage',
      hmrcCategory: 'residential_finance_costs',
      amount: '572.00', // ~interest at 5.2% on £132k
      date,
      description: 'Mortgage interest — 8 Birch Lane',
      supplier: 'Virgin Money',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })

  // ── Leeds (ended tenancy — historical income + current mortgage)
  const leedsRentMonths = [
    '2025-04-01', '2025-05-01', '2025-06-01', '2025-07-01', '2025-08-01',
  ]
  leedsRentMonths.forEach(date => {
    addExpense({
      propertyId: propLeedsId,
      tenancyId: tenancyLeedsEndedId,
      type: 'income',
      category: 'Rental Income',
      hmrcCategory: 'rent_and_other_income',
      amount: '900.00',
      date,
      description: 'Monthly rent — David Thompson',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  const leedsMortgageMonths = [
    '2025-04-01', '2025-05-01', '2025-06-01', '2025-07-01', '2025-08-01',
    '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01',
    '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01',
  ]
  leedsMortgageMonths.forEach(date => {
    addExpense({
      propertyId: propLeedsId,
      type: 'expense',
      category: 'Mortgage',
      hmrcCategory: 'residential_finance_costs',
      amount: '256.00', // ~interest at 3.2% on £96k
      date,
      description: 'Mortgage interest — 12 Oak Street',
      supplier: 'Halifax',
      paymentMethod: 'bank_transfer',
      taxYear: taxYear(date),
    })
  })
  // Emergency plumber call-out (burst pipe)
  addExpense({
    propertyId: propLeedsId,
    type: 'expense',
    category: 'Maintenance',
    hmrcCategory: 'repairs_and_maintenance',
    amount: '165.00',
    date: daysFromNow(-8),
    description: 'Emergency plumber call-out — burst pipe bathroom',
    supplier: 'Yorkshire Emergency Plumbing',
    paymentMethod: 'card',
    taxYear: taxYear(daysFromNow(-8)),
  })

  await db.insert(expenses).values(expenseRows)

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log(`\nSeed complete:`)
  console.log(`  4 properties`)
  console.log(`  3 tenancies (2 active, 1 ended)`)
  console.log(`  3 deposit protections`)
  console.log(`  2 right-to-rent records`)
  console.log(`  11 compliance records`)
  console.log(`  4 maintenance tickets, 13 events`)
  console.log(`  ${expenseRows.length} income/expense entries`)
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
