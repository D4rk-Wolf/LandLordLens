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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--shell-text-muted)',
  marginBottom: 6,
  letterSpacing: '0.01em',
}

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
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
          ✓
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
          Check your inbox
        </h2>
        <p style={{ fontSize: 13, color: 'var(--shell-text-muted)', lineHeight: 1.6 }}>
          We sent a verification link to{' '}
          <span style={{ color: 'var(--shell-text)', fontWeight: 500 }}>{email}</span>.
          Click it to activate your account.
        </p>
        <p style={{ fontSize: 11.5, color: 'var(--shell-text-faint)', marginTop: 12 }}>
          Didn&apos;t receive it? Check your spam folder.
        </p>
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
        Create an account
      </h2>
      <p style={{ fontSize: 13, color: 'var(--shell-text-muted)', marginBottom: 24 }}>
        Start managing your portfolio for free
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

      <div style={{ marginBottom: 14 }}>
        <label htmlFor="email" style={labelStyle}>Email address</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle,
            borderColor: focused === 'email' ? 'var(--shell-accent)' : 'var(--shell-border)',
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="password" style={labelStyle}>Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused('password')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle,
            borderColor: focused === 'password' ? 'var(--shell-accent)' : 'var(--shell-border)',
          }}
        />
        <p style={{ fontSize: 11, color: 'var(--shell-text-faint)', marginTop: 5 }}>
          Minimum 8 characters
        </p>
      </div>

      <p style={{ fontSize: 11.5, color: 'var(--shell-text-faint)', marginBottom: 16, lineHeight: 1.5 }}>
        By creating an account you agree to our{' '}
        <Link href="/terms" style={{ color: 'var(--shell-accent)', textDecoration: 'none' }}>
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" style={{ color: 'var(--shell-accent)', textDecoration: 'none' }}>
          Privacy Policy
        </Link>.
      </p>

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
        }}
      >
        {loading ? 'Creating account…' : 'Create free account'}
      </button>

      <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--shell-text-muted)', marginTop: 20 }}>
        Already have an account?{' '}
        <Link href="/sign-in" style={{ color: 'var(--shell-accent)', textDecoration: 'none', fontWeight: 500 }}>
          Sign in
        </Link>
      </p>
    </form>
  )
}
