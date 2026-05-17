import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind, Heading, Section,
} from '@react-email/components'

interface Props {
  propertyAddress: string
  itemType: string
  expiryDate: string
  daysUntilExpiry: number
}

export function ComplianceAlertEmail({
  propertyAddress,
  itemType,
  expiryDate,
  daysUntilExpiry,
}: Props) {
  const isOverdue = daysUntilExpiry < 0
  const urgency = isOverdue ? 'OVERDUE' : daysUntilExpiry <= 14 ? 'URGENT' : 'REMINDER'
  const colour = isOverdue ? '#dc2626' : daysUntilExpiry <= 14 ? '#d97706' : '#4f46e5'

  return (
    <Html>
      <Head />
      <Preview>
        {urgency}: {itemType} at {propertyAddress}
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Section
              className="mb-6 rounded p-4"
              style={{ backgroundColor: `${colour}15`, borderLeft: `4px solid ${colour}` }}
            >
              <Text className="m-0 font-bold" style={{ color: colour }}>
                {urgency}: {itemType}
              </Text>
            </Section>
            <Heading className="text-xl font-bold text-gray-900">{propertyAddress}</Heading>
            <Text className="text-gray-600">
              {isOverdue
                ? `Your ${itemType} expired on ${expiryDate} (${Math.abs(daysUntilExpiry)} days ago).`
                : `Your ${itemType} expires on ${expiryDate} (in ${daysUntilExpiry} days).`}
            </Text>
            <Text className="text-gray-600">
              Log in to LandLordLens to update this compliance item and upload the renewed
              certificate.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
