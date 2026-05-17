// Server component — fetches live contact info from SQLite on every request.
// No "use client" here: this runs on the server and hands the result to <Landing>.

import { getContactInfo } from '@/lib/db'
// import { normalizeContactInfo } from '@/context/ContactInfoContext'
import Landing from './landing'
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

// Always read fresh from the DB so admin edits show immediately.
export const dynamic = 'force-dynamic'

export default async function Page() {
  const row = getContactInfo()
  console.log('[slook] fetched contact_info row from DB:', row)
  const contactInfo = normalizeContactInfo(row)

// return null 

  console.log('[slook] loaded contact_info from DB:', contactInfo)
  return <Landing contactInfo={contactInfo} />
}
