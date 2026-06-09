'use client'

import Link from 'next/link'
import { Languages, LogOut, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { signoutAction } from './actions'

/**
 * Portal top bar — visible across /portal/* routes.
 * - Brand wordmark links to the public landing.
 * - Language toggle flips AR <-> EN (driven by the existing LangContext).
 * - When signed-in: shows the user's first name and a sign-out button.
 *   When signed-out: shows links to sign-in / sign-up.
 */
export default function PortalNav({ auth }) {
  const { t, lang, toggle, isRTL } = useLang()
  const portal = t.portal
  const BackIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slook-ink/85 backdrop-blur-md">
      <div className="container-slook flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <BackIcon className="size-4" />
          <span className="hidden sm:inline">{portal.nav.back}</span>
          <span className="ms-2 font-display text-lg font-semibold tracking-tight text-white">
            Slook
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-slook-purple hover:bg-slook-purple/10"
          >
            <Languages className="size-3.5" />
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>

          {auth.signedIn ? (
            <>
              <Link
                href="/portal/dashboard"
                className="hidden rounded-lg px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:inline"
              >
                {portal.nav.dashboard}
              </Link>
              <span className="hidden text-sm text-white/55 sm:inline">
                {auth.name?.split(' ')[0]}
              </span>
              <form action={signoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-slook-purple hover:bg-slook-purple/10"
                >
                  <LogOut className="size-3.5" />
                  {portal.nav.signout}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/portal/signin"
                className="rounded-lg px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {portal.nav.signin}
              </Link>
              <Link
                href="/portal/signup"
                className="rounded-lg bg-gradient-to-r from-slook-purple to-slook-blue px-3 py-1.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(114,64,237,0.35)] transition-all hover:from-[#8350FF] hover:to-[#1B75FF]"
              >
                {portal.nav.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
