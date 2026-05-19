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
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px 80px',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--shell-text-faint)', marginBottom: 8 }}>
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

      <div
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--shell-border-subtle)',
          fontSize: 12,
          color: 'var(--shell-text-faint)',
        }}
      >
        <Link href="/" style={{ color: 'var(--shell-text-faint)', textDecoration: 'none' }}>
          ← Back to LandLordLens
        </Link>
      </div>
    </div>
  )
}
