import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@landlordlens/auth'
import {
  Building2,
  ShieldCheck,
  BarChart3,
  FileText,
  Scale,
  Wrench,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Portfolio management',
    desc: 'Track every property, tenancy, and document in one place. Add unlimited properties on paid plans.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance engine',
    desc: 'Never miss a gas safety, EPC, or electrical certificate again. Automated expiry alerts keep you covered.',
  },
  {
    icon: BarChart3,
    title: 'Financial analytics',
    desc: 'Income, expenses, yield calculations and tax summaries — all derived from your live portfolio data.',
  },
  {
    icon: FileText,
    title: 'Document vault',
    desc: 'Store tenancy agreements, compliance certificates, and inspection reports securely in one place.',
  },
  {
    icon: Scale,
    title: 'Legal tools',
    desc: 'Generate Section 8 notices with the built-in wizard. Stay current with UK tenancy law.',
  },
  {
    icon: Wrench,
    title: 'Services marketplace',
    desc: 'Connect with trusted tradespeople, letting agents, and property professionals near you.',
  },
]

const stats = [
  { value: '100%', label: 'UK compliance focus' },
  { value: '6', label: 'Core modules' },
  { value: '£0', label: 'To get started' },
]

export default async function LandingPage() {
  const user = await getCurrentUser()
  if (user) redirect('/dashboard')

  return (
    <div
      style={{
        background: 'var(--shell-bg)',
        color: 'var(--shell-text)',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
        minHeight: '100vh',
      }}
    >
      <style>{`.nav-link-muted:hover { color: var(--shell-text) !important; }`}</style>
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: '-20vh',
          left: '-10vw',
          width: '60vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, rgba(224,154,26,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ─── NAV ─── */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--shell-text-faint)',
                paddingTop: 2,
              }}
            >
              by D4rkWolf Studios
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link
              href="/pricing"
              className="nav-link-muted"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--shell-text-muted)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                transition: 'color 0.15s',
              }}
            >
              Pricing
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
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1120,
          margin: '0 auto',
          padding: '96px 24px 80px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 100,
            border: '1px solid var(--shell-border)',
            background: 'var(--shell-surface)',
            marginBottom: 32,
            animation: 'fadeIn 0.5s ease forwards',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--shell-accent)',
              animation: 'pulseAmber 2s ease infinite',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--shell-text-muted)',
            }}
          >
            UK property management platform
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-syne, system-ui)',
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 720,
            margin: '0 0 24px',
            animation: 'fadeUp 0.6s ease 0.1s both',
          }}
        >
          Manage your portfolio
          <br />
          with{' '}
          <span
            style={{
              color: 'var(--shell-accent)',
              position: 'relative',
            }}
          >
            precision.
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--shell-text-muted)',
            maxWidth: 520,
            margin: '0 0 40px',
            animation: 'fadeUp 0.6s ease 0.2s both',
          }}
        >
          The intelligent platform for UK landlords. Track compliance, analyse financials
          and manage tenancies — all in one place.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            animation: 'fadeUp 0.6s ease 0.3s both',
          }}
        >
          <Link
            href="/sign-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 8,
              background: 'var(--shell-accent)',
              color: '#0B0B0D',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              transition: 'opacity 0.15s',
              letterSpacing: '-0.01em',
            }}
          >
            Get started free
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid var(--shell-border)',
              background: 'transparent',
              color: 'var(--shell-text)',
              fontWeight: 500,
              fontSize: 14,
              textDecoration: 'none',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            View pricing
          </Link>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid var(--shell-border-subtle)',
            animation: 'fadeUp 0.6s ease 0.4s both',
            flexWrap: 'wrap',
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-syne, system-ui)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--shell-accent)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--shell-text-muted)',
                  marginTop: 4,
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--shell-border-subtle)',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
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
              Everything you need
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                maxWidth: 480,
              }}
            >
              Built for the modern UK landlord.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 1,
              background: 'var(--shell-border-subtle)',
              border: '1px solid var(--shell-border-subtle)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: 'var(--shell-surface)',
                  padding: '28px 28px 32px',
                  transition: 'background 0.15s',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: 'var(--shell-accent-dim)',
                    border: '1px solid rgba(224,154,26,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--shell-accent)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-syne, system-ui)',
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--shell-text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: 'var(--shell-text-muted)',
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px 96px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '2px',
              borderRadius: 12,
              background:
                'linear-gradient(135deg, rgba(224,154,26,0.4) 0%, rgba(224,154,26,0.08) 100%)',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                borderRadius: 10,
                background: 'var(--shell-bg)',
                padding: '40px 48px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-syne, system-ui)',
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                Ready to manage smarter?
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--shell-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                Start free. No credit card required. Upgrade when you need more.
              </p>
              <Link
                href="/sign-up"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  borderRadius: 8,
                  background: 'var(--shell-accent)',
                  color: '#0B0B0D',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                Create free account
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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
            <span style={{ color: 'var(--shell-text-faint)', fontSize: 13 }}>—</span>
            <span
              style={{
                fontSize: 12,
                color: 'var(--shell-text-faint)',
              }}
            >
              © {new Date().getFullYear()} D4rkWolf Studios. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link
              href="/pricing"
              style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              style={{ fontSize: 12, color: 'var(--shell-text-faint)', textDecoration: 'none' }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
