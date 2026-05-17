import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
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
          color: 'var(--shell-accent)',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        ✓
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-syne, system-ui)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--shell-text)',
          marginBottom: 8,
        }}
      >
        Email verified
      </h2>
      <p
        style={{
          fontSize: 13,
          color: 'var(--shell-text-muted)',
          lineHeight: 1.6,
          marginBottom: 24,
        }}
      >
        Your email address has been verified. You can now sign in to your account.
      </p>
      <Link
        href="/sign-in"
        style={{
          display: 'inline-block',
          padding: '10px 22px',
          borderRadius: 7,
          background: 'var(--shell-accent)',
          color: '#0B0B0D',
          fontWeight: 600,
          fontSize: 13.5,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        Sign in to your account
      </Link>
    </div>
  )
}
