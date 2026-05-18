'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home,
  Building2,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  Wrench,
  Scale,
} from 'lucide-react'
import { createClient as createBrowserClient } from '@landlordlens/auth/browser'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home, exact: true },
  { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/dashboard/compliance/prs-readiness', label: 'PRS Readiness', icon: ShieldCheck },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/legal/section-8', label: 'Legal', icon: Scale },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside
      style={{
        display: 'none',
        width: 220,
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: 'var(--shell-bg)',
        borderRight: '1px solid var(--shell-border-subtle)',
        flexDirection: 'column',
        fontFamily: 'var(--font-outfit, system-ui), sans-serif',
      }}
      className="sidebar-desktop"
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--shell-border-subtle)',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div
            style={{
              fontFamily: 'var(--font-syne, system-ui)',
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: '-0.02em',
              color: 'var(--shell-text)',
            }}
          >
            LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
          </div>
          <div
            style={{
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase' as const,
              color: 'var(--shell-text-faint)',
              marginTop: 2,
            }}
          >
            by D4rkWolf Studios
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: '12px 10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <p
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--shell-text-faint)',
            padding: '4px 10px 8px',
          }}
        >
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '7px 10px',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--shell-accent)' : 'var(--shell-text-muted)',
                background: active ? 'var(--shell-accent-dim)' : 'transparent',
                borderLeft: active ? '2px solid var(--shell-accent)' : '2px solid transparent',
                transition: 'color 0.15s, background 0.15s',
                letterSpacing: '-0.005em',
              }}
            >
              <Icon
                size={14}
                style={{
                  flexShrink: 0,
                  color: active ? 'var(--shell-accent)' : 'var(--shell-text-faint)',
                }}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div
        style={{
          padding: '10px',
          borderTop: '1px solid var(--shell-border-subtle)',
        }}
      >
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '7px 10px',
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--shell-text-faint)',
            fontSize: 13,
            fontWeight: 400,
            cursor: 'pointer',
            width: '100%',
            transition: 'color 0.15s, background 0.15s',
            fontFamily: 'var(--font-outfit, system-ui)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--shell-text-muted)'
            el.style.background = 'var(--shell-surface)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--shell-text-faint)'
            el.style.background = 'transparent'
          }}
        >
          <LogOut size={13} style={{ flexShrink: 0 }} />
          Sign out
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; }
        }
      `}</style>
    </aside>
  )
}
