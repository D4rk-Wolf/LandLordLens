import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendComplianceReminderEmail(
  to: string,
  complianceName: string,
  propertyAddress: string,
  dueDate: Date,
  daysUntilDue: number
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "LandlordLens <noreply@landlordlens.com>",
      to: [to],
      subject: `Reminder: ${complianceName} due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 16px 0; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>LandlordLens Compliance Reminder</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>This is a reminder that your <strong>${complianceName}</strong> for <strong>${propertyAddress}</strong> is due in <strong>${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}</strong>.</p>
                <div class="alert">
                  <strong>Due Date:</strong> ${dueDate.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </div>
                <p>Please ensure this compliance requirement is completed and documented before the due date to avoid any legal issues.</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/compliance" class="button">View Compliance Records</a>
                <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">
                  This is an automated reminder from LandlordLens. You can manage your compliance records in your dashboard.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}

export async function sendTenantInvitationEmail(
  to: string,
  tenantName: string,
  propertyAddress: string,
  inviteUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "LandlordLens <noreply@landlordlens.com>",
      to: [to],
      subject: "You've been invited to LandlordLens Tenant Portal",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to LandlordLens Tenant Portal</h1>
              </div>
              <div class="content">
                <p>Hello ${tenantName},</p>
                <p>Your landlord has invited you to access the LandlordLens Tenant Portal for your tenancy at <strong>${propertyAddress}</strong>.</p>
                <p>Click the button below to set up your account and access your tenant portal:</p>
                <a href="${inviteUrl}" class="button">Accept Invitation & Set Up Account</a>
                <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">
                  This invitation link will expire in 24 hours. If you didn't expect this invitation, you can safely ignore this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}

