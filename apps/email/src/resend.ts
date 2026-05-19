import { Resend } from 'resend'

let client: Resend | null = null

export function getResendClient(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    client = new Resend(key)
  }
  return client
}

const FROM_ADDRESS = 'LandLordLens <noreply@landlordlens.co.uk>'

export async function sendVerificationEmail(to: string, verificationUrl: string) {
  const { VerificationEmail } = await import('./templates/verification')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Verify your email — LandLordLens',
    react: VerificationEmail({ verificationUrl }),
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  const { WelcomeEmail } = await import('./templates/welcome')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Welcome to LandLordLens',
    react: WelcomeEmail({ name }),
  })
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const { PasswordResetEmail } = await import('./templates/password-reset')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Reset your LandLordLens password',
    react: PasswordResetEmail({ resetUrl }),
  })
}

export async function sendComplianceAlertEmail(
  to: string,
  propertyAddress: string,
  itemType: string,
  expiryDate: string,
  daysUntilExpiry: number,
) {
  const { ComplianceAlertEmail } = await import('./templates/compliance-alert')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `Action required: ${itemType} expiring at ${propertyAddress}`,
    react: ComplianceAlertEmail({ propertyAddress, itemType, expiryDate, daysUntilExpiry }),
  })
}

export async function sendTenantInviteEmail(
  to: string,
  landlordName: string,
  propertyAddress: string,
  inviteUrl: string,
) {
  const { TenantInviteEmail } = await import('./templates/tenant-invite')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `${landlordName} has invited you to view your tenancy`,
    react: TenantInviteEmail({ landlordName, propertyAddress, inviteUrl }),
  })
}

export async function sendDataExportEmail(to: string) {
  const { DataExportEmail } = await import('./templates/data-export')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your LandLordLens data export',
    react: DataExportEmail(),
  })
}

export async function sendAccountDeletionEmail(to: string, purgeDate: string) {
  const { AccountDeletionEmail } = await import('./templates/account-deletion')
  const resend = getResendClient()
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your LandLordLens account has been scheduled for deletion',
    react: AccountDeletionEmail({ purgeDate }),
  })
}
