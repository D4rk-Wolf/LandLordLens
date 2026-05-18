/**
 * MobileHeader — collapsible top navigation bar for small screens.
 *
 * Visible only on screens < 768 px wide (hidden on desktop where `Sidebar` is
 * shown instead).  A hamburger / close toggle reveals a full-height nav drawer
 * with the same links as the sidebar.
 *
 * Mirrors the active-route logic from `Sidebar`: exact matching for routes that
 * would otherwise greedily match child paths (e.g. `/dashboard` and
 * `/dashboard/analytics`), prefix matching for section roots.
 *
 * Clicking any nav link closes the drawer (`setOpen(false)`) to restore the
 * page content view immediately.  Sign-out follows the same pattern as the
 * sidebar: Supabase browser client sign-out followed by redirect to `/sign-in`.
 */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, Building2, ShieldCheck, BarChart3, Settings, Wrench, Scale, LogOut } from 'lucide-react'
import { createClient as createBrowserClient } from '@landlordlens/auth/browser'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home, exact: true },
  { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/dashboard/compliance/prs-readiness', label: 'PRS Readiness', icon: ShieldCheck },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3, exact: true },
  { href: '/dashboard/analytics/portfolio', label: 'Portfolio Analytics', icon: BarChart3 },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/legal/section-8', label: 'Legal', icon: Scale },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  /** Signs the user out and redirects to the sign-in page. */
  async function handleSignOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--shell-bg)',
          borderBottom: '1px solid var(--shell-border-subtle)',
          fontFamily: 'var(--font-outfit, system-ui), sans-serif',
        }}
        className="mobile-header-bar"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            height: 52,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-syne, system-ui)',
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: '-0.02em',
                color: 'var(--shell-text)',
              }}
            >
              LandLord<span style={{ color: 'var(--shell-accent)' }}>Lens</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: 6,
              borderRadius: 6,
              border: '1px solid var(--shell-border)',
              background: 'var(--shell-surface)',
              color: 'var(--shell-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {open && (
          <nav
            style={{
              borderTop: '1px solid var(--shell-border-subtle)',
              background: 'var(--shell-surface)',
              padding: '8px 10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {navItems.map(({ href, label, icon: Icon, exact }) => {
              const active = isActive(href, exact)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '8px 10px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--shell-accent)' : 'var(--shell-text-muted)',
                    background: active ? 'var(--shell-accent-dim)' : 'transparent',
                    borderLeft: active ? '2px solid var(--shell-accent)' : '2px solid transparent',
                  }}
                >
                  <Icon size={14} style={{ flexShrink: 0 }} />
                  {label}
                </Link>
              )
            })}
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'var(--shell-text-faint)',
                fontSize: 13.5,
                cursor: 'pointer',
                width: '100%',
                marginTop: 4,
                fontFamily: 'var(--font-outfit, system-ui)',
              }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </nav>
        )}
      </header>

      <style>{`
        @media (min-width: 768px) {
          .mobile-header-bar { display: none !important; }
        }
      `}</style>
    </>
  )
}
