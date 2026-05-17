import { Card, CardContent } from '@landlordlens/ui'

interface StatCardProps {
  label: string
  value: string | number
  sublabel?: string
  accent?: 'default' | 'green' | 'red' | 'amber'
}

const accentMap = {
  default: 'text-gray-900',
  green: 'text-green-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
}

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
