// Portal layout — server component.
// Reads the user session and renders a top bar with a language toggle and
// signin/signout actions. Individual pages still call requireUser() (or check
// session and redirect) for their own guards.

import { getUserSession } from '@/lib/auth'
import PortalNav from './portal-nav'

export const metadata = {
  title: 'Slook · Portal',
}

export default async function PortalLayout({ children }) {
  const session = await getUserSession()
  const auth = session.userId
    ? { signedIn: true, name: session.name, email: session.email }
    : { signedIn: false }

  return (
    <div className="min-h-screen bg-slook-ink text-white">
      <PortalNav auth={auth} />
      <main className="px-4 pb-16 pt-24 md:pt-28">{children}</main>
    </div>
  )
}
