import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind,
} from '@react-email/components'

interface Props {
  purgeDate: string
}

export function AccountDeletionEmail({ purgeDate }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your LandLordLens account has been scheduled for deletion</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Account deletion scheduled</Text>
            <Text className="text-gray-600">
              Your LandLordLens account has been scheduled for permanent deletion on{' '}
              <strong>{purgeDate}</strong>. Your account is now locked.
            </Text>
            <Text className="text-gray-600">
              All data including properties, tenancies, documents, and compliance records will be
              permanently deleted on that date. Payment records are retained for 7 years as required
              by HMRC.
            </Text>
            <Text className="text-sm text-gray-500">
              Changed your mind? Email privacy@landlordlens.co.uk before {purgeDate} to cancel
              the deletion request.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
