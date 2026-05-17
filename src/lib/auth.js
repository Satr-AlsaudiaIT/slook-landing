import 'server-only'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'

/**
 * Iron-session config.
 *
 * SESSION_SECRET must be at least 32 chars in production. Falls back to a
 * dev-only value so first-time `npm run dev` works without env setup, but
 * any real deployment MUST override it.
 */
const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'dev-only-secret-please-change-me-to-a-long-random-string',
  cookieName: 'slook-admin-session',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  },
}

export async function getSession() {
  const cookieStore = await cookies()
  return await getIronSession(cookieStore, sessionOptions)
}

/**
 * Use inside admin server components / actions. Redirects to /admin/login
 * when there's no valid session.
 */
export async function requireAdmin() {
  const session = await getSession()
  if (!session.userId) {
    redirect('/admin/login')
  }
  return session
}
