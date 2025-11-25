import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding compliance types...')

  const complianceTypes = [
    {
      name: 'Gas Safety Certificate',
      description: 'Annual gas safety check must be carried out by a Gas Safe registered engineer. Certificate must be provided to tenants within 28 days of the check.',
      renewalFrequencyMonths: 12,
      isRequired: true,
    },
    {
      name: 'Energy Performance Certificate (EPC)',
      description: 'EPC must be at least E rating (or D from 2025) for new tenancies. Valid for 10 years.',
      renewalFrequencyMonths: 120,
      isRequired: true,
    },
    {
      name: 'Electrical Installation Condition Report (EICR)',
      description: 'Electrical safety inspection must be carried out at least every 5 years by a qualified electrician.',
      renewalFrequencyMonths: 60,
      isRequired: true,
    },
    {
      name: 'Right to Rent Check',
      description: 'Landlords must check that all tenants aged 18 and over have the right to rent property in the UK. Must be done before tenancy starts and repeated if tenant\'s visa expires.',
      renewalFrequencyMonths: 12,
      isRequired: true,
    },
    {
      name: 'Deposit Protection',
      description: 'Tenancy deposits must be protected in a government-approved scheme within 30 days of receipt. Must provide prescribed information to tenants.',
      renewalFrequencyMonths: 0, // One-time check, but we'll track it
      isRequired: true,
    },
    {
      name: 'Legionella Risk Assessment',
      description: 'Landlords must assess and control the risk of exposure to legionella. Should be reviewed regularly, typically every 2 years.',
      renewalFrequencyMonths: 24,
      isRequired: true,
    },
    {
      name: 'Smoke and Carbon Monoxide Alarms',
      description: 'Working smoke alarms on each floor and carbon monoxide alarms in rooms with solid fuel appliances. Must be checked at start of tenancy.',
      renewalFrequencyMonths: 12,
      isRequired: true,
    },
    {
      name: 'How to Rent Guide',
      description: 'Must provide the latest version of the "How to Rent" guide to tenants at the start of the tenancy.',
      renewalFrequencyMonths: 0, // One-time per tenancy
      isRequired: true,
    },
  ]

  for (const complianceType of complianceTypes) {
    await prisma.complianceType.upsert({
      where: { name: complianceType.name },
      update: {},
      create: complianceType,
    })
  }

  console.log('Compliance types seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

