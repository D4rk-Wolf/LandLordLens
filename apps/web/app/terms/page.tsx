import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — LandLordLens',
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

const heading3Style: React.CSSProperties = {
  fontFamily: 'var(--font-outfit, system-ui)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--shell-text)',
  marginTop: 20,
  marginBottom: 4,
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--shell-text-muted)',
  lineHeight: 1.7,
  marginBottom: 12,
}

const dpaBoxStyle: React.CSSProperties = {
  background: 'var(--shell-elevated)',
  border: '1px solid var(--shell-border)',
  borderRadius: 8,
  padding: '20px 24px',
  marginTop: 12,
}

export default function TermsPage() {
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
        Terms of Service
      </h1>
      <p style={paraStyle}>
        These terms govern your use of LandLordLens, operated by D4rkwolf Industries.
        By creating an account you agree to these terms.
      </p>

      <h2 style={heading2Style}>1. The service</h2>
      <p style={paraStyle}>
        LandLordLens is a property management tool for UK residential landlords. Access is by
        subscription. The Free tier is available indefinitely. Paid tiers are billed monthly
        or annually via Stripe.
      </p>

      <h2 style={heading2Style}>2. Account</h2>
      <p style={paraStyle}>
        One account per user. You are responsible for maintaining the security of your
        credentials. Accounts may not be shared or transferred to another person.
      </p>

      <h2 style={heading2Style}>3. Acceptable use</h2>
      <p style={paraStyle}>You may use LandLordLens only for lawful UK residential property management. You must not:</p>
      <ul style={{ ...paraStyle, paddingLeft: 20 }}>
        <li>Enter false or fabricated tenant data</li>
        <li>Use the platform for any discriminatory purpose prohibited by the Equality Act 2010</li>
        <li>Attempt to access another user&apos;s data</li>
        <li>Automate requests to the platform without written permission</li>
      </ul>

      <h2 style={heading2Style}>4. Subscription and billing</h2>
      <p style={paraStyle}>
        Pricing: Free (£0), Professional (£12/mo or £120/yr), Business (£29/mo or £290/yr),
        Enterprise (£99/mo or £990/yr). All prices in GBP. VAT may apply.
        Cancellation takes effect at the end of the current billing period.
        No refunds for partial periods.
      </p>

      <h2 style={heading2Style}>5. Intellectual property</h2>
      <p style={paraStyle}>
        All platform IP belongs to D4rkwolf Industries. You retain full ownership of all data
        you enter into LandLordLens.
      </p>

      <h2 style={heading2Style}>6. Limitation of liability</h2>
      <p style={paraStyle}>
        The service is provided as-is. D4rkwolf Industries is not liable for your failure to
        comply with UK housing law (including but not limited to deposit protection, Right to
        Rent checks, or gas safety obligations), loss of data due to user error, or outages
        caused by third-party sub-processors. Our total liability to you in any 12-month period
        is capped at 3 months of subscription fees paid.
      </p>

      <h2 style={heading2Style}>7. Termination</h2>
      <p style={paraStyle}>
        Either party may terminate at any time. On account deletion, your data is retained for
        30 days then permanently deleted, except payment records which are kept for 7 years
        under HMRC rules.
      </p>

      <h2 style={heading2Style}>8. Governing law</h2>
      <p style={paraStyle}>
        These terms are governed by English law. Disputes are subject to the exclusive
        jurisdiction of the courts of England and Wales.
      </p>

      <h2 style={heading2Style}>9. Data Processing Agreement</h2>
      <p style={paraStyle}>
        This section is a legally binding Data Processing Agreement (&ldquo;DPA&rdquo;) between
        you (the Controller) and D4rkwolf Industries (the Processor) under UK GDPR Article 28,
        effective from the date you create your account.
      </p>

      <div style={dpaBoxStyle}>
        <h3 style={heading3Style}>Subject matter and duration</h3>
        <p style={paraStyle}>
          Processing of tenant personal data entered by the landlord into LandLordLens,
          for the duration of these Terms of Service.
        </p>

        <h3 style={heading3Style}>Nature and purpose</h3>
        <p style={paraStyle}>
          Storage, retrieval, organisation, and display of tenant data on the landlord&apos;s
          instruction, for the purpose of UK residential property management and legal compliance.
        </p>

        <h3 style={heading3Style}>Categories of personal data</h3>
        <p style={paraStyle}>
          Names, contact details (email, phone), dates of birth, identity document details and
          copies, financial data (rent amounts, deposits), background check results, and tenancy
          records.
        </p>

        <h3 style={heading3Style}>Controller obligations</h3>
        <p style={paraStyle}>
          You warrant that: (a) you have a lawful basis under UK GDPR for entering each category
          of tenant data; (b) you have provided tenants with a privacy notice describing how their
          data is used; (c) you will handle any tenant Subject Access Requests relating to data
          you entered.
        </p>

        <h3 style={heading3Style}>Processor obligations</h3>
        <p style={paraStyle}>
          D4rkwolf Industries will: (a) process tenant data only on your documented instructions;
          (b) ensure data is protected by appropriate technical and organisational measures
          (encryption at rest and in transit, access controls, audit logging); (c) not engage
          additional sub-processors without notifying you; (d) assist you in responding to data
          subject rights requests; (e) delete all tenant data within 30 days of account termination.
        </p>

        <h3 style={heading3Style}>Sub-processors</h3>
        <p style={{ ...paraStyle, marginBottom: 4 }}>
          Current sub-processors authorised to process tenant data:
        </p>
        <ul style={{ ...paraStyle, paddingLeft: 20 }}>
          <li>Supabase — database and file storage (EU primary)</li>
          <li>Resend — tenant invite emails only (US, Standard Contractual Clauses)</li>
          <li>Sentry — error monitoring with PII disabled (US, Standard Contractual Clauses)</li>
        </ul>
        <p style={paraStyle}>Stripe does not process tenant data.</p>

        <h3 style={heading3Style}>International transfers</h3>
        <p style={paraStyle}>
          Transfers to US sub-processors (Resend, Sentry) are covered by Standard Contractual
          Clauses approved by the European Commission and retained under UK GDPR via the
          UK International Data Transfer Agreement.
        </p>
      </div>

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
