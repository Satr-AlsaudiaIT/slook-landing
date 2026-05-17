'use client'

import { IconButton } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MusicNoteIcon from '@mui/icons-material/MusicNote' // TikTok stand-in
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'

export default function Footer() {
  const { t } = useLang()
  const { social, email, emailLink, phone, phoneLink } = useContactInfo()
  const year = new Date().getFullYear()

  // Only render socials that have a URL set in the admin
  const socials = [
    { Icon: InstagramIcon, href: social.instagram, label: 'Instagram' },
    { Icon: TwitterIcon, href: social.twitter, label: 'X / Twitter' },
    { Icon: LinkedInIcon, href: social.linkedin, label: 'LinkedIn' },
    { Icon: MusicNoteIcon, href: social.tiktok, label: 'TikTok' },
  ].filter((s) => s.href)

  return (
    <footer className="relative border-t border-white/5 bg-slook-ink/80 py-12">
      <div className="container-slook">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-start">
            <div className="font-display text-2xl font-semibold tracking-tight">
              Slook
            </div>
            <p className="mt-1 text-sm text-white/55">{t.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ Icon, href, label }) => (
              <IconButton
                key={label}
                aria-label={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#7240ED', background: 'rgba(114, 64, 237, 0.08)' },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row">
          <div>
            © {year} Slook. {t.footer.rights}.
          </div>
          <div className="flex items-center gap-4">
            <a href={emailLink} className="hover:text-white/80">
              {email}
            </a>
            <span className="opacity-30">·</span>
            <a href={phoneLink} className="hover:text-white/80" dir="ltr">
              {phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
