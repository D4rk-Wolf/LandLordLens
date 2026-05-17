import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: 'var(--shell-bg)',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
    >
      {/* Brand panel */}
      <div
        style={{
          display: 'none',
          flex: '0 0 420px',
          background: 'var(--shell-surface)',
          borderRight: '1px solid var(--shell-border-subtle)',
          padding: '48px 48px 40px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="auth-brand-panel"
      >
        {/* Amber glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-20%',
            width: '80%',
            height: '60%',
            background:
              'radial-gradient(ellipse at center, rgba(224,154,26,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.025em',
                color: 'var(--shell-text)',
              }}
            >
              LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--shell-text-faint)',
                marginTop: 4,
              }}
            >
              by D4rkWolf Studios
            </div>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-syne, system-ui)',
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: 'var(--shell-text)',
              marginBottom: 16,
            }}
          >
            Property management
            <br />
            <span style={{ color: 'var(--shell-accent)' }}>built for precision.</span>
          </p>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.65,
              color: 'var(--shell-text-muted)',
            }}
          >
            Compliance tracking, financial analytics and tenant management for the UK landlord.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontSize: 11,
              color: 'var(--shell-text-faint)',
              letterSpacing: '0.02em',
            }}
          >
            © {new Date().getFullYear()} D4rkWolf Studios
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        {/* Mobile logo */}
        <div
          style={{
            marginBottom: 40,
            textAlign: 'center',
          }}
          className="auth-mobile-logo"
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.025em',
                color: 'var(--shell-text)',
              }}
            >
              LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--shell-text-faint)',
                marginTop: 3,
              }}
            >
              by D4rkWolf Studios
            </div>
          </Link>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: 360,
            background: 'var(--shell-surface)',
            borderRadius: 12,
            border: '1px solid var(--shell-border)',
            padding: '32px',
            animation: 'fadeUp 0.5s ease both',
          }}
        >
          {children}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .auth-brand-panel { display: flex !important; }
          .auth-mobile-logo { display: none !important; }
        }
      `}</style>
    </div>
  )
}
