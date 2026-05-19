import Link from 'next/link'
import { getTierConfig } from '@landlordlens/billing'
import type { SubscriptionTier } from '@landlordlens/billing'

const tierOrder: SubscriptionTier[] = ['free', 'professional', 'business', 'enterprise']

export default function PricingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--shell-bg)',
        color: 'var(--shell-text)',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: '-10vh',
          right: '-10vw',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(224,154,26,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Nav */}
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

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1120,
          margin: '0 auto',
          padding: '72px 24px 96px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--shell-accent)',
              marginBottom: 12,
            }}
          >
            Pricing
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-syne, system-ui)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Simple, transparent pricing.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--shell-text-muted)', lineHeight: 1.6 }}>
            Start free. Upgrade when you need more properties.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 16,
          }}
        >
          {tierOrder.map((tier) => {
            const config = getTierConfig(tier)
            const isPaid = config.monthlyPriceGbp > 0
            const isPopular = tier === 'professional'

            return (
              <div
                key={tier}
                style={{
                  position: 'relative',
                  background: isPopular ? 'var(--shell-elevated)' : 'var(--shell-surface)',
                  borderRadius: 12,
                  border: isPopular
                    ? '1px solid rgba(224,154,26,0.4)'
                    : '1px solid var(--shell-border)',
                  padding: '28px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isPopular ? '0 0 32px rgba(224,154,26,0.07)' : 'none',
                }}
              >
                {isPopular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -11,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--shell-accent)',
                      color: '#0B0B0D',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: 100,
                    }}
                  >
                    Most popular
                  </span>
                )}

                <div style={{ marginBottom: 20 }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-syne, system-ui)',
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'var(--shell-text)',
                      marginBottom: 10,
                    }}
                  >
                    {config.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-syne, system-ui)',
                        fontSize: 32,
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: isPopular ? 'var(--shell-accent)' : 'var(--shell-text)',
                      }}
                    >
                      {isPaid ? `£${config.monthlyPriceGbp}` : 'Free'}
                    </span>
                    {isPaid && (
                      <span style={{ fontSize: 13, color: 'var(--shell-text-muted)' }}>/mo</span>
                    )}
                  </div>
                  {isPaid && (
                    <p style={{ fontSize: 11.5, color: 'var(--shell-text-muted)', marginTop: 3 }}>
                      £{config.yearlyPriceGbp}/yr · save 2 months
                    </p>
                  )}
                </div>

                <ul
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginBottom: 24,
                    paddingLeft: 0,
                    listStyle: 'none',
                  }}
                >
                  {config.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: 12.5,
                        color: 'var(--shell-text-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--shell-accent)',
                          flexShrink: 0,
                          marginTop: 1,
                          fontSize: 13,
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '9px 16px',
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    background: isPopular ? 'var(--shell-accent)' : 'var(--shell-elevated)',
                    color: isPopular ? '#0B0B0D' : 'var(--shell-text)',
                    border: isPopular ? 'none' : '1px solid var(--shell-border)',
                  }}
                >
                  {tier === 'free' ? 'Get started free' : 'Start free trial'}
                </Link>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 12, color: 'var(--shell-text-muted)', marginBottom: 12 }}>
            All prices in GBP. VAT may apply. Cancel anytime.
          </p>
          <Link
            href="/sign-in"
            style={{ fontSize: 13, color: 'var(--shell-text-muted)', textDecoration: 'none' }}
          >
            Already have an account?{' '}
            <span style={{ color: 'var(--shell-accent)', fontWeight: 500 }}>Sign in →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
