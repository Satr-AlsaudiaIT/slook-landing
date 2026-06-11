// Admin layout — server component.
// Reads the session (without forcing redirect) so it can:
//   • show the sidebar only when the user is logged in,
//   • render the bare login page when there's no session.
// Individual protected pages call requireAdmin() for explicit guarding.

import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { logoutAction } from './actions'
import MobileNav from './mobile-nav'

export const metadata = {
  title: 'Slook · Admin',
}

export default async function AdminLayout({ children }) {
  const session = await getSession()
  const isAuthed = !!session.userId

  if (!isAuthed) {
    // Login page renders without sidebar chrome
    return <div className="min-h-screen bg-slook-ink">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-slook-ink text-white" dir="ltr">
      <aside className="hidden w-60 shrink-0 border-r border-white/5 bg-black/40 md:flex md:flex-col">
        <div className="px-6 py-5">
          <div className="text-lg font-semibold">Slook Admin</div>
          <div className="mt-0.5 text-xs text-white/40">
            Signed in as <span className="text-white/70">{session.username}</span>
          </div>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
          <NavItem href="/admin/messages"     label="Messages" />
          <NavItem href="/admin/applications" label="Applications" />
          <NavItem href="/admin/submissions"  label="Submissions" />
          <NavItem href="/admin/users"        label="Portal users" />
          <NavItem href="/admin/contact"      label="Contact info" />
        </nav>

        <form action={logoutAction} className="m-3">
          <button
            type="submit"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition-colors hover:border-slook-purple/60 hover:bg-slook-purple/10"
          >
            Sign out
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        {/* Mobile top bar with navigation */}
        <div className="relative flex items-center justify-between border-b border-white/5 bg-black/40 px-4 py-3 md:hidden">
          <div className="text-sm font-semibold">Slook Admin</div>
          <div className="flex items-center gap-3">
            <MobileNav />
            <form action={logoutAction}>
              <button type="submit" className="text-xs text-white/70 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  )
}

function NavItem({ href, label }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
    >
      {label}
    </Link>
  )
}
