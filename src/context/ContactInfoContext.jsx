'use client'

import { createContext, useContext } from 'react'
import { constants } from '../i18n.js'

/**
 * Holds the live contact info loaded server-side from the DB.
 * Provided once near the top of the landing tree; consumed by
 * Navbar, Footer, Contact (and anywhere else that used to import
 * the static `constants` from src/i18n).
 *
 * Shape mirrors the contact_info row, but normalizes the address
 * by language and pre-builds tel: / mailto: links for convenience.
 */
const ContactInfoContext = createContext(null)

export function ContactInfoProvider({ value, children }) {
  return (
    <ContactInfoContext.Provider value={value}>
      {children}
    </ContactInfoContext.Provider>
  )
}

export function useContactInfo() {
  const ctx = useContext(ContactInfoContext)
  if (!ctx) {
    return {
      phone: constants.phone,
      phoneLink: constants.phoneLink,
      email: constants.email,
      emailLink: constants.emailLink,
      whatsapp: constants.whatsapp,
      address: { ar: '', en: '' },
      social: constants.social,
      updatedAt: null,
    }
  }
  return ctx
}

/**
 * Normalize a raw contact_info row from SQLite into the shape
 * the UI components expect.
 */
export function normalizeContactInfo(row) {
  if (!row) return null
  const phoneDigits = String(row.phone || '').replace(/[^0-9+]/g, '')
  return {
    phone: row.phone,
    phoneLink: phoneDigits ? `tel:${phoneDigits}` : '#',
    email: row.email,
    emailLink: row.email ? `mailto:${row.email}` : '#',
    whatsapp: row.whatsapp,
    address: { ar: row.address_ar || '', en: row.address_en || '' },
    social: {
      instagram: row.instagram || '',
      twitter: row.twitter || '',
      linkedin: row.linkedin || '',
      tiktok: row.tiktok || '',
    },
    updatedAt: row.updated_at,
  }
}
