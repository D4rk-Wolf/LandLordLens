'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
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
        Welcome back
      </h2>
      <p style={{ fontSize: 13, color: 'var(--shell-text-muted)', marginBottom: 24 }}>
        Sign in to your LandLordLens account
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
          <Link
            href="/reset-password"
            style={{ fontSize: 11.5, color: 'var(--shell-text-muted)', textDecoration: 'none', letterSpacing: '0.01em' }}
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused('password')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle,
            borderColor: focused === 'password' ? 'var(--shell-accent)' : 'var(--shell-border)',
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
          transition: 'opacity 0.15s',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-outfit, system-ui)',
        }}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--shell-text-muted)', marginTop: 20 }}>
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" style={{ color: 'var(--shell-accent)', textDecoration: 'none', fontWeight: 500 }}>
          Create one free
        </Link>
      </p>
    </form>
  )
}
