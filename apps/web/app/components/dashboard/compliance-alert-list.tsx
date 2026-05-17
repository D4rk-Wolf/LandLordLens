import { Badge } from '@landlordlens/ui'

interface ComplianceRecord {
  id: string
  complianceType: string
  expiryDate: string
  issuer?: string | null
}

interface Props {
  records: ComplianceRecord[]
}

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dateStr)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function urgencyBadge(days: number) {
  if (days < 0) return <Badge variant="destructive">Overdue</Badge>
  if (days <= 14) return <Badge className="bg-amber-500 hover:bg-amber-600">Expires soon</Badge>
  if (days <= 30) return <Badge variant="secondary">Due in {days}d</Badge>
  return null
}

export function ComplianceAlertList({ records }: Props) {
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
