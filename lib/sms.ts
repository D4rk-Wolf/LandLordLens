import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export async function sendComplianceReminderSMS(
  to: string,
  complianceName: string,
  propertyAddress: string,
  dueDate: Date,
  daysUntilDue: number
) {
  if (!client || !fromNumber) {
    console.warn("Twilio not configured. Skipping SMS.")
    return { success: false, error: "SMS service not configured" }
  }

  try {
    const message = await client.messages.create({
      body: `LandlordLens Reminder: ${complianceName} for ${propertyAddress} is due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}. Due: ${dueDate.toLocaleDateString("en-GB")}. View: ${process.env.NEXT_PUBLIC_APP_URL}/compliance`,
      from: fromNumber,
      to: to,
    })

    return { success: true, messageSid: message.sid }
  } catch (error: any) {
    console.error("SMS sending error:", error)
    return { success: false, error: error.message }
  }
}

