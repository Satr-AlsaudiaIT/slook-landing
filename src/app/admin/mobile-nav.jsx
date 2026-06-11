'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/submissions', label: 'Submissions' },
  { href: '/admin/users', label: 'Portal users' },
  { href: '/admin/contact', label: 'Contact info' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
        aria-label="Toggle menu"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-14 z-50 border-b border-white/5 bg-black/95 backdrop-blur">
          <nav className="flex flex-col gap-1 p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
