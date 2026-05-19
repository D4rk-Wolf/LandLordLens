'use client'

import { useState } from 'react'
import { Button } from '@landlordlens/ui'

interface Props {
  lastRequestedAt: Date | null
}

export function DataExportButton({ lastRequestedAt }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimited, setRateLimited] = useState(false)

  async function handleExport() {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/user/export')

    if (res.status === 429) {
      setRateLimited(true)
      setLoading(false)
      return
    }

    if (!res.ok) {
      setError('Export failed. Please try again.')
      setLoading(false)
      return
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const contentDisposition = res.headers.get('Content-Disposition') ?? ''
    const match = contentDisposition.match(/filename="([^"]+)"/)
    a.download = match?.[1] ?? 'landlordlens-export.json'
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  const nextAvailable = lastRequestedAt
    ? new Date(new Date(lastRequestedAt).getTime() + 24 * 60 * 60 * 1000)
    : null

  const isDisabled = loading || rateLimited || (nextAvailable !== null && nextAvailable > new Date())

  return (
    <div className="mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isDisabled}
      >
        {loading ? 'Preparing export…' : 'Download my data'}
      </Button>
      {lastRequestedAt && (
        <p className="text-xs text-gray-400 mt-1">
          Last requested:{' '}
          {new Date(lastRequestedAt).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </p>
      )}
      {isDisabled && !loading && nextAvailable && (
        <p className="text-xs text-gray-400 mt-1">
          Next export available:{' '}
          {nextAvailable.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
