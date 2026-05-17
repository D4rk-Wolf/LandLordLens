import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  landlordName: string
  propertyAddress: string
  inviteUrl: string
}

export function TenantInviteEmail({ landlordName, propertyAddress, inviteUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        {landlordName} has invited you to view your tenancy at {propertyAddress}
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">You&apos;ve been invited</Text>
            <Text className="text-gray-600">
              <strong>{landlordName}</strong> has invited you to view your tenancy details for{' '}
              <strong>{propertyAddress}</strong> on LandLordLens.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={inviteUrl}
              >
                View tenancy details
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 7 days. If you weren&apos;t expecting this invite, you can safely
              ignore this email.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
