import {
  Body, Container, Head, Hr, Html, Preview, Text, Tailwind,
} from '@react-email/components'

export function DataExportEmail() {
  return (
    <Html>
      <Head />
      <Preview>Your LandLordLens data export is ready</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded border border-solid border-gray-200 p-8">
            <Text className="text-2xl font-bold text-gray-900">Your data export</Text>
            <Text className="text-gray-600">
              We received a request to export all data associated with your LandLordLens account.
              Your export has been downloaded to your device.
            </Text>
            <Text className="text-gray-600">
              The export contains your account details, properties, tenancies, compliance records,
              and document metadata. Actual files (certificates, identity documents, photos) are
              referenced by storage path and can be requested separately.
            </Text>
            <Text className="text-sm text-gray-500">
              If you didn&apos;t request this export, please contact us immediately at{' '}
              privacy@landlordlens.co.uk.
            </Text>
            <Hr className="border-gray-200" />
            <Text className="text-xs text-gray-400">LandLordLens — UK Property Management</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
