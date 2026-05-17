'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient as createBrowserClient } from '@landlordlens/auth/browser'

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  borderRadius: 6,
  border: '1px solid var(--shell-border)',
  background: 'var(--shell-elevated)',
  color: 'var(--shell-text)',
  padding: '9px 12px',
  fontSize: 13.5,
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

export function ResetPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sign-in`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-outfit, system-ui), sans-serif' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--shell-accent-dim)',
            border: '1px solid rgba(224,154,26,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 20,
          }}
        >
          ✉
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-syne, system-ui)',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--shell-text)',
            marginBottom: 8,
          }}
        >
          Reset link sent
        </h2>
        <p style={{ fontSize: 13, color: 'var(--shell-text-muted)', lineHeight: 1.6 }}>
          We sent a password reset link to{' '}
          <span style={{ color: 'var(--shell-text)', fontWeight: 500 }}>{email}</span>.
        </p>
        <Link
          href="/sign-in"
          style={{
            display: 'inline-block',
            marginTop: 20,
            fontSize: 12.5,
            color: 'var(--shell-accent)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'var(--font-outfit, system-ui), sans-serif' }}>
      <h2
        style={{
          fontFamily: 'var(--font-syne, system-ui)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--shell-text)',
          marginBottom: 4,
        }}
      >
        Reset password
      </h2>
      <p style={{ fontSize: 13, color: 'var(--shell-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <div
          style={{
            fontSize: 12.5,
            color: '#f87171',
            background: 'rgba(248,113,113,0.08)',
            border: '1px solid rgba(248,113,113,0.25)',
            borderRadius: 6,
            padding: '9px 12px',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--shell-text-muted)',
            marginBottom: 6,
            letterSpacing: '0.01em',
          }}
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            borderColor: focused ? 'var(--shell-accent)' : 'var(--shell-border)',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 16px',
          borderRadius: 7,
          border: 'none',
          background: loading ? 'rgba(224,154,26,0.5)' : 'var(--shell-accent)',
          color: '#0B0B0D',
          fontWeight: 600,
          fontSize: 13.5,
          cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-outfit, system-ui)',
          marginBottom: 16,
        }}
      >
        {loading ? 'Sending…' : 'Send reset link'}
      </button>

      <p style={{ textAlign: 'center' }}>
        <Link
          href="/sign-in"
          style={{ fontSize: 12.5, color: 'var(--shell-text-muted)', textDecoration: 'none' }}
        >
          ← Back to sign in
        </Link>
      </p>
    </form>
  )
}
