import {
  Body, Button, Container, Head, Hr, Html, Preview, Section, Text, Tailwind,
} from '@react-email/components'

interface Props {
  resetUrl: string
}

export function PasswordResetEmail({ resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your LandLordLens password</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Reset your password</Text>
            <Text className="text-gray-600">
              We received a request to reset your password. Click below to choose a new one.
            </Text>
            <Section className="my-6">
              <Button
                className="rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
                href={resetUrl}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-sm text-gray-500">
              This link expires in 1 hour. If you didn&apos;t request a reset, you can safely ignore
              this email — your password won&apos;t change.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
