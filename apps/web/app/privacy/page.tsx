import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — LandLordLens',
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

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>
      <p style={paraStyle}>
        This policy explains how D4rkwolf Industries (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses
        personal data when you use LandLordLens at landlordlens.co.uk.
      </p>

      <h2 style={heading2Style}>1. Who we are</h2>
      <p style={paraStyle}>
        D4rkwolf Industries is the data controller for your landlord account data. We are
        pre-registration and operate as a sole trader. Contact:{' '}
        <a href="mailto:privacy@landlordlens.co.uk" style={{ color: 'var(--shell-accent)' }}>
          privacy@landlordlens.co.uk
        </a>
      </p>

      <h2 style={heading2Style}>2. Data we collect about you</h2>
      <p style={paraStyle}>When you create a LandLordLens account, we collect:</p>
      <ul style={{ ...paraStyle, paddingLeft: 20 }}>
        <li>Email address and display name (via Supabase Auth)</li>
        <li>Subscription tier and billing status (via Stripe — we store your Stripe customer ID and subscription ID only)</li>
        <li>IP address (captured in security audit logs)</li>
        <li>Error data via Sentry (PII transmission disabled at source)</li>
      </ul>

      <h2 style={heading2Style}>3. Data you enter about third parties</h2>
      <p style={paraStyle}>
        As a landlord, you may enter personal data about your tenants (names, contact details,
        identity documents, financial data). You are the data controller for that data.
        LandLordLens processes it only as your data processor, on your instructions.
        See Section 9 of our{' '}
        <Link href="/terms" style={{ color: 'var(--shell-accent)' }}>Terms of Service</Link>{' '}
        for the full Data Processing Agreement. You are responsible for informing your tenants
        how their data is used.
      </p>

      <h2 style={heading2Style}>4. Lawful basis</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Lawful basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Account and subscription data</td>
            <td style={tdStyle}>Performance of a contract (UK GDPR Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td style={tdStyle}>Security audit logs and IP addresses</td>
            <td style={tdStyle}>Legitimate interests — fraud prevention and platform security (Art. 6(1)(f))</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>5. Sub-processors</h2>
      <p style={paraStyle}>
        We share data with the following processors, each bound by appropriate data processing terms:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Processor</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Supabase</td>
            <td style={tdStyle}>Database and file storage</td>
            <td style={tdStyle}>EU (Ireland) primary; US entity</td>
          </tr>
          <tr>
            <td style={tdStyle}>Stripe</td>
            <td style={tdStyle}>Payment processing</td>
            <td style={tdStyle}>US</td>
          </tr>
          <tr>
            <td style={tdStyle}>Resend</td>
            <td style={tdStyle}>Transactional email</td>
            <td style={tdStyle}>US</td>
          </tr>
          <tr>
            <td style={tdStyle}>Sentry</td>
            <td style={tdStyle}>Error monitoring (PII disabled)</td>
            <td style={tdStyle}>US</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>6. Data retention</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Retention period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Account and subscription data</td>
            <td style={tdStyle}>Duration of subscription + 30 days after account deletion</td>
          </tr>
          <tr>
            <td style={tdStyle}>Payment records</td>
            <td style={tdStyle}>7 years (HMRC legal requirement)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Security audit logs and IP addresses</td>
            <td style={tdStyle}>12 months</td>
          </tr>
          <tr>
            <td style={tdStyle}>All other platform data (properties, tenancies, documents)</td>
            <td style={tdStyle}>30 days after account deletion request</td>
          </tr>
        </tbody>
      </table>

      <h2 style={heading2Style}>7. Your rights</h2>
      <p style={paraStyle}>
        Under UK GDPR you have the right to: access your personal data, correct inaccuracies,
        request erasure, restrict processing, receive a portable copy of your data, and object
        to processing based on legitimate interests.
      </p>
      <p style={paraStyle}>
        Exercise any right by emailing{' '}
        <a href="mailto:privacy@landlordlens.co.uk" style={{ color: 'var(--shell-accent)' }}>
          privacy@landlordlens.co.uk
        </a>. We will respond within 30 days.
      </p>
      <p style={paraStyle}>
        You also have the right to lodge a complaint with the Information Commissioner&apos;s Office
        at{' '}
        <a
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--shell-accent)' }}
        >
          ico.org.uk
        </a>.
      </p>

      <h2 style={heading2Style}>8. International transfers</h2>
      <p style={paraStyle}>
        Stripe, Resend, and Sentry are US-based. Data transfers to these processors are
        covered by Standard Contractual Clauses. Supabase stores primary data in the EU
        (Ireland).
      </p>

      <h2 style={heading2Style}>9. Changes to this policy</h2>
      <p style={paraStyle}>
        We will notify you by email of any material changes. Continued use of LandLordLens
        after 30 days constitutes acceptance of the updated policy.
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
