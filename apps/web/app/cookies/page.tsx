import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy — LandLordLens',
}

const heading2Style: React.CSSProperties = {
  fontFamily: 'var(--font-syne, system-ui)',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--shell-text)',
  marginTop: 32,
  marginBottom: 8,
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--shell-text-muted)',
  lineHeight: 1.7,
  marginBottom: 12,
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  marginBottom: 16,
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  background: 'var(--shell-elevated)',
  color: 'var(--shell-text)',
  fontWeight: 600,
  borderBottom: '1px solid var(--shell-border)',
}

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  color: 'var(--shell-text-muted)',
  borderBottom: '1px solid var(--shell-border-subtle)',
  verticalAlign: 'top',
}

export default function CookiesPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--shell-bg)',
        color: 'var(--shell-text)',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: '-20vh',
          right: '-10vw',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(224,154,26,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--shell-border-subtle)',
          backdropFilter: 'blur(12px)',
          background: 'rgba(11,11,13,0.85)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 24px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.02em',
                color: 'var(--shell-text)',
              }}
            >
              LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
            </span>
          </Link>
          <Link
            href="/sign-in"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--shell-text)',
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid var(--shell-border)',
              background: 'var(--shell-surface)',
            }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 720,
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        <p style={{ fontSize: 12, color: 'var(--shell-text-muted)', marginBottom: 8 }}>
          Last updated: 19 May 2026
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-syne, system-ui)',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--shell-text)',
            marginBottom: 8,
          }}
        >
          Cookie Policy
        </h1>
        <p style={paraStyle}>
          This policy explains what cookies LandLordLens sets and why.
        </p>

        <h2 style={heading2Style}>Cookies we set</h2>
        <p style={paraStyle}>
          LandLordLens sets only strictly necessary cookies. No analytics, advertising, or
          preference cookies are used.
        </p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Cookie</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Set by</th>
              <th style={thStyle}>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><code>sb-*</code></td>
              <td style={tdStyle}>Authentication session tokens — keeps you logged in</td>
              <td style={tdStyle}>Supabase</td>
              <td style={tdStyle}>1 week (refreshed on activity)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Stripe session cookies</td>
              <td style={tdStyle}>Payment processing session state — required when completing a subscription purchase</td>
              <td style={tdStyle}>Stripe</td>
              <td style={tdStyle}>Session</td>
            </tr>
          </tbody>
        </table>

        <h2 style={heading2Style}>Do I need to consent?</h2>
        <p style={paraStyle}>
          No. All cookies on LandLordLens are strictly necessary for the service to function.
          Under UK GDPR and PECR, strictly necessary cookies do not require consent.
          We do not show a cookie banner because there is nothing optional to consent to.
        </p>

        <h2 style={heading2Style}>Managing cookies</h2>
        <p style={paraStyle}>
          You can block or delete cookies via your browser settings. Blocking the{' '}
          <code style={{ background: 'var(--shell-elevated)', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>
            sb-*
          </code>{' '}
          cookies will prevent you from logging in.
        </p>
        <p style={paraStyle}>
          Browser cookie management guides:{' '}
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--shell-accent)' }}
          >
            Chrome
          </a>
          {' · '}
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--shell-accent)' }}
          >
            Firefox
          </a>
          {' · '}
          <a
            href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--shell-accent)' }}
          >
            Safari
          </a>
        </p>
      </main>

      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--shell-border-subtle)',
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--shell-text)',
              }}
            >
              LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
            </span>
            <span style={{ color: 'var(--shell-text-muted)', fontSize: 13 }}>—</span>
            <span style={{ fontSize: 12, color: 'var(--shell-text-muted)' }}>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> D4rkWolf Studios. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
              { href: '/cookies', label: 'Cookies' },
              { href: '/sign-in', label: 'Sign in' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: 12, color: 'var(--shell-text-muted)', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
