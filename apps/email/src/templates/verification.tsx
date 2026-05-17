import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  verificationUrl: string
}

export function VerificationEmail({ verificationUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Verify your LandLordLens account</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Verify your email</Text>
            <Text className="text-gray-600">
              Click the button below to verify your email address and activate your LandLordLens
              account.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={verificationUrl}
              >
                Verify email address
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 24 hours. If you didn&apos;t create an account, you can safely ignore
              this email.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
