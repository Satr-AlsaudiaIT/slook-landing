/**
 * Pure data helper — runs on the server (no React, no client hooks).
 * Converts a raw `contact_info` SQLite row into the shape the UI expects.
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
