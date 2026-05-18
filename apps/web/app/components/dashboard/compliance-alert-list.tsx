/**
 * ComplianceAlertList — dashboard widget showing upcoming compliance expirations.
 *
 * Renders a sorted list of compliance records that expire within the next 30 days
 * (including already-overdue items).  Records with more than 30 days remaining are
 * silently filtered out so the widget stays focused on actionable alerts.
 *
 * Colour / urgency logic follows the app-wide compliance colour convention:
 *   - Red (destructive badge)  — already expired (days < 0)
 *   - Amber badge              — expiring within 14 days
 *   - Grey / secondary badge   — due within 15–30 days
 *
 * Data is passed in as a prop from the parent Server Component (dashboard page),
 * which fetches it via `caller.compliance.list()`.
 */
import { Badge } from '@landlordlens/ui'

interface ComplianceRecord {
  id: string
  complianceType: string
  expiryDate: string
  issuer?: string | null
}

interface Props {
  /** Compliance records to evaluate for upcoming expiry. */
  records: ComplianceRecord[]
}

/**
 * Calculates the number of days until a given ISO date string expires.
 * Negative values indicate the date has already passed.
 * Uses midnight of the current day as the reference point to avoid
 * time-of-day fluctuations in the result.
 */
function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Returns an urgency badge for the given number of days remaining, or `null`
 * if the record is not yet urgent (> 30 days away, already filtered out
 * by `ComplianceAlertList` but kept as a fallback guard).
 */
function urgencyBadge(days: number) {
  if (days < 0) return <Badge variant="destructive">Overdue</Badge>
  if (days <= 14) return <Badge className="bg-amber-500 hover:bg-amber-600">Expires soon</Badge>
  if (days <= 30) return <Badge variant="secondary">Due in {days}d</Badge>
  return null
}

/**
 * Displays compliance items expiring within 30 days, sorted by urgency
 * (most overdue / soonest expiry first).
 *
 * @param records - Full list of compliance records; filtering is done internally.
 */
export function ComplianceAlertList({ records }: Props) {
  // Compute days remaining for each record and keep only those at or past the
  // 30-day warning threshold.
  const alerts = records
    .map((r) => ({ ...r, days: daysUntil(r.expiryDate) }))
    .filter((r) => r.days <= 30)
    .sort((a, b) => a.days - b.days)

  if (alerts.length === 0) {
    return <p className="text-sm text-gray-500">No compliance items due in the next 30 days.</p>
  }

  return (
    <ul className="space-y-3">
      {alerts.map((record) => (
        <li key={record.id} className="flex items-center justify-between text-sm">
          <span className="text-gray-700 capitalize">
            {record.complianceType.replace(/_/g, ' ')}
          </span>
          <div className="flex items-center gap-2 text-gray-400">
            <span>{record.expiryDate}</span>
            {urgencyBadge(record.days)}
          </div>
        </li>
      ))}
    </ul>
  )
}
