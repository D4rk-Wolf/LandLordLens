'use client'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', gap: '16px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
