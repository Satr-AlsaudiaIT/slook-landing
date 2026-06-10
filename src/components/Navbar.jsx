'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    { href: '/apply', label: t.nav.apply },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled && 'bg-slook-ink/85 backdrop-blur-md border-b border-white/5'
      )}
    >
      <div className="container-slook flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/favicon/slook اللي ما يشتري يتفرج.png" alt="Slook logo" className="h-12 object-contain" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggle}
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-full border-white/15 bg-transparent text-white/85 hover:border-slook-purple hover:bg-slook-purple/10 hover:text-white"
          >
            <Globe className="size-4" />
            {lang === 'ar' ? 'EN' : 'AR'}
          </Button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all bg-gradient-to-r from-slook-purple to-slook-blue shadow-[0_0_24px_rgba(114,64,237,0.4)] hover:shadow-[0_0_32px_rgba(114,64,237,0.6)] hover:from-[#8350FF] hover:to-[#1B75FF]"
          >
            {t.nav.cta}
          </a>
          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
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
                href="#contact"
                onClick={() => setOpen(false)}
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
