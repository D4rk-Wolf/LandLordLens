'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, Building2, ShieldCheck, BarChart3, Settings, Wrench, Scale } from 'lucide-react'
import { cn } from '@landlordlens/ui'
import { createClient as createBrowserClient } from '@landlordlens/auth/browser'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home, exact: true },
  { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
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

  async function handleSignOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-lg font-bold text-gray-900">LandLordLens</span>
        <button onClick={() => setOpen(!open)} className="p-1 text-gray-600">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-200 p-4 space-y-1 bg-white">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                isActive(href, exact)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 w-full"
          >
            Sign out
          </button>
        </nav>
      )}
    </header>
  )
}
