/**
 * StatCard — a compact summary metric card used on the dashboard overview.
 *
 * Displays a labelled numeric or text value with an optional subtitle and an
 * accent colour variant.  The `accent` prop maps to the app-wide compliance
 * colour convention (green = healthy, amber = warning, red = overdue/critical).
 */
import { Card, CardContent } from '@landlordlens/ui'

interface StatCardProps {
  /** Short label describing the metric (e.g. "Total properties"). */
  label: string
  /** The metric value to display prominently. */
  value: string | number
  /** Optional secondary line beneath the value (e.g. "across all properties"). */
  sublabel?: string
  /**
   * Colour accent for the value text.
   * - `default` — neutral dark grey (most metrics)
   * - `green`   — positive indicator (e.g. all certificates valid)
   * - `amber`   — warning state (e.g. expiring soon)
   * - `red`     — critical / overdue
   */
  accent?: 'default' | 'green' | 'red' | 'amber'
}

/** Maps the `accent` prop value to the corresponding Tailwind text colour class. */
const accentMap = {
  default: 'text-gray-900',
  green: 'text-green-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
}

/**
 * Renders a single KPI card with a label, large value, optional sublabel,
 * and colour accent.
 */
export function StatCard({ label, value, sublabel, accent = 'default' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${accentMap[accent]}`}>{value}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
      </CardContent>
    </Card>
  )
}
