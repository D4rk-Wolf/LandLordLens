import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind, Heading,
} from '@react-email/components'

interface Props {
  name: string
}

export function WelcomeEmail({ name }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to LandLordLens</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Heading className="text-2xl font-bold text-gray-900">Welcome, {name}</Heading>
            <Text className="text-gray-600">
              Your account is verified. You can now add your properties, track compliance deadlines,
              and manage your tenancies — all in one place.
            </Text>
            <Text className="text-gray-600">
              Start by adding your first property in the dashboard.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
