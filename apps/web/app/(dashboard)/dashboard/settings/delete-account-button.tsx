'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@landlordlens/ui'

interface Props {
  email: string
}

export function DeleteAccountButton({ email }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (confirmEmail !== email) {
      setError('Email address does not match.')
      return
    }

    setLoading(true)
    setError(null)

    const res = await fetch('/api/user/delete', { method: 'DELETE' })
    const body = await res.json()

    if (!res.ok) {
      setError(body.error ?? 'Deletion failed. Please try again.')
      setLoading(false)
      return
    }

    router.push('/sign-in?deleted=1')
  }

  if (!open) {
    return (
      <Button
        variant="destructive"
        size="sm"
        className="mt-2"
        onClick={() => setOpen(true)}
      >
        Delete my account
      </Button>
    )
  }

  return (
    <div className="mt-2 rounded border border-red-200 bg-red-50 p-4 space-y-3">
      <p className="text-sm text-red-800">
        This will permanently delete your account and all data after a 30-day grace period.
        This cannot be undone. Type your email address to confirm.
      </p>
      <input
        type="email"
        placeholder={email}
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className="block w-full rounded border border-red-300 px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={loading || confirmEmail !== email}
          onClick={handleDelete}
        >
          {loading ? 'Deleting…' : 'Permanently delete account'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setOpen(false); setError(null); setConfirmEmail('') }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
