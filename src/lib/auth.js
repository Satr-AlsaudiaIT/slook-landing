import 'server-only'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'

/**
 * Two separate sessions live side-by-side so admin / portal users never bleed
 * into each other:
 *   • slook-admin-session  → admin dashboard
 *   • slook-user-session   → public portal accounts (app_users)
 *
 * Both reuse the same encryption secret (SESSION_SECRET). MUST be at least
 * 32 characters in production. Falls back to a dev-only value so first-time
 * `npm run dev` works without env setup, but any real deployment MUST
 * override it via .env.local.
 */

const SESSION_PASSWORD =
  process.env.SESSION_SECRET ||
  'dev-only-secret-please-change-me-to-a-long-random-string'

const baseCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
}

const adminSessionOptions = {
  password: SESSION_PASSWORD,
  cookieName: 'slook-admin-session',
  cookieOptions: baseCookieOptions,
}

const userSessionOptions = {
  password: SESSION_PASSWORD,
  cookieName: 'slook-user-session',
  cookieOptions: baseCookieOptions,
}

/* -------------------------- Admin session ------------------------- */

export async function getSession() {
  const cookieStore = await cookies()
  return await getIronSession(cookieStore, adminSessionOptions)
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session.userId) {
    redirect('/admin/login')
  }
  return session
}

/* -------------------------- User session -------------------------- */

export async function getUserSession() {
  const cookieStore = await cookies()
  return await getIronSession(cookieStore, userSessionOptions)
}

/**
 * Use inside /portal/* server components and actions. Redirects to
 * /portal/signin if there's no valid user session.
 */
export async function requireUser() {
  const session = await getUserSession()
  if (!session.userId) {
    redirect('/portal/signin')
  }
  return session
}
