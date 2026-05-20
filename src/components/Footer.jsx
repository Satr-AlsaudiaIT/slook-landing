'use client'

import { Music } from 'lucide-react'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'
import { FaTiktok } from 'react-icons/fa'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLang()
  const { social, email, emailLink, phone, phoneLink } = useContactInfo()
  const year = new Date().getFullYear()

  const socials = [
    { Icon: InstagramIcon, href: social.instagram, label: 'Instagram' },
    { Icon: XIcon, href: social.twitter, label: 'X / Twitter' },
    { Icon: LinkedInIcon, href: social.linkedin, label: 'LinkedIn' },
    { Icon: FaTiktok, href: social.tiktok, label: 'TikTok' },
  ].filter((s) => s.href)

  return (
    <footer className="relative border-t border-white/5 bg-slook-ink/80 py-12">
      <div className="container-slook">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center">
            <img src="/favicon/slook اللي ما يشتري يتفرج.png" alt="Slook logo" className="h-16 object-contain" />
            <p className="mt-2 text-slook-purple text-sm font-semibold">
              {t.footer.slogan}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-slook-purple/10 hover:text-slook-purple"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row">
          <div>© {year} Slook. {t.footer.rights}.</div>
          <div className="flex items-center gap-4">
            <a href={emailLink} className="hover:text-white/80">{email}</a>
            <span className="opacity-30">·</span>
            <a href={phoneLink} className="hover:text-white/80" dir="ltr">{phone}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
