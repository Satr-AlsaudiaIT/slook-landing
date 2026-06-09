'use client'

import Link from 'next/link'
import { Languages, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export default function ApplyHeader() {
  const { t, lang, toggle, isRTL } = useLang()
  const BackIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slook-ink/85 backdrop-blur-md">
      <div className="container-slook flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <BackIcon className="size-4" />
          <span className="hidden sm:inline">{t.apply.backToSite}</span>
          <span className="ms-2 font-display text-lg font-semibold tracking-tight text-white">
            Slook
          </span>
        </Link>

        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-slook-purple hover:bg-slook-purple/10"
        >
          <Languages className="size-3.5" />
          {lang === 'ar' ? 'EN' : 'AR'}
        </button>
      </div>
    </header>
  )
}
