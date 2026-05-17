'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LanguageIcon from '@mui/icons-material/Language'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'

// TODO: replace this SVG with the real Slook diamond logo from your brand kit
function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="slookGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7240ED" />
          <stop offset="100%" stopColor="#0065F7" />
        </linearGradient>
      </defs>
      {/* Diamond outline */}
      <path
        d="M32 4 L60 32 L32 60 L4 32 Z"
        fill="none"
        stroke="url(#slookGrad)"
        strokeWidth="3"
      />
      {/* Inner S-curve nodes (simplified) */}
      <circle cx="32" cy="14" r="4" fill="#7240ED" />
      <circle cx="14" cy="32" r="4" fill="#7240ED" />
      <circle cx="50" cy="32" r="4" fill="#7240ED" />
      <circle cx="32" cy="50" r="4" fill="#7240ED" />
      <path
        d="M14 32 Q32 22 50 32 Q32 42 14 32"
        fill="#7240ED"
        opacity="0.85"
      />
    </svg>
  )
}

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const { whatsapp } = useContactInfo()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#process', label: t.nav.process },
    { href: '#services', label: t.nav.services },
    { href: '#clients', label: t.nav.clients },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-slook-ink/85 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-slook flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-xl font-semibold tracking-tight">
            Slook
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggle}
            size="small"
            startIcon={<LanguageIcon fontSize="small" />}
            sx={{
              color: 'rgba(255,255,255,0.85)',
              borderColor: 'rgba(255,255,255,0.15)',
              '&:hover': { borderColor: '#7240ED', background: 'rgba(114,64,237,0.08)' },
            }}
            variant="outlined"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </Button>

          <Button
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<WhatsAppIcon className="icon-flip" />}
            className="hidden sm:inline-flex"
            sx={{
              background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
              boxShadow: '0 0 24px rgba(114, 64, 237, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #8350FF 0%, #1B75FF 100%)',
              },
            }}
          >
            {t.nav.cta}
          </Button>

          {/* Mobile menu trigger */}
          <IconButton
            className="md:!hidden"
            onClick={() => setOpen((v) => !v)}
            sx={{ color: '#fff' }}
            aria-label="menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden border-t border-white/5 bg-slook-ink/95 backdrop-blur"
          >
            <nav className="container-slook flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-md bg-gradient-to-r from-slook-purple to-slook-blue px-4 py-2 text-center text-sm font-semibold"
              >
                {t.nav.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
