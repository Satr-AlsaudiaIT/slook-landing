'use server'

import { revalidatePath } from 'next/cache'
import { createApplication } from '@/lib/db'
import { saveUploadedImage } from '@/lib/uploads'
import { NATIONALITY_KEYS } from '@/lib/nationalities'

/**
 * Public /apply form submission. Open to anyone, no auth needed.
 *
 * Validates everything, persists the photo to data/uploads/, then writes
 * one row to the applications table. The admin sees it at /admin/applications.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Saudi-friendly but permissive — accepts +966..., 05..., spaces and dashes
const PHONE_RE = /^[+0-9\s()-]{7,20}$/

// Canonical allowed values — stored in DB as the English label.
// Work locations are a small fixed set, defined inline.
// Nationalities come from src/lib/nationalities.js (single source of truth
// shared with the form).
const WORK_LOCATIONS = new Set(['Jeddah', 'Riyadh', 'Eastern Province'])

function normalizeEmail(input) {
  return String(input || '').trim().toLowerCase()
}

function isValidDate(input) {
  // Expect HTML date input value: yyyy-mm-dd
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return false
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return false
  // No future dates, must be at least 13 years old (basic sanity check)
  const now = new Date()
  if (d > now) return false
  const thirteenYearsAgo = new Date(
    now.getFullYear() - 13,
    now.getMonth(),
    now.getDate()
  )
  if (d > thirteenYearsAgo) return false
  return true
}

export async function submitApplicationAction(prevState, formData) {
  const fullName = String(formData.get('fullName') || '').trim()
  const email = normalizeEmail(formData.get('email'))
  const phone = String(formData.get('phone') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const dateOfBirth = String(formData.get('dateOfBirth') || '').trim()
  const workLocation = String(formData.get('workLocation') || '').trim()
  const nationality = String(formData.get('nationality') || '').trim()
  const photo = formData.get('photo')

  // Field validation
  if (
    !fullName ||
    !email ||
    !phone ||
    !description ||
    !dateOfBirth ||
    !workLocation ||
    !nationality
  ) {
    return { ok: false, error: 'missing_fields' }
  }
  if (fullName.length > 200) {
    return { ok: false, error: 'name_too_long' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'invalid_email' }
  }
  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: 'invalid_phone' }
  }
  if (description.length > 5000) {
    return { ok: false, error: 'description_too_long' }
  }
  if (!isValidDate(dateOfBirth)) {
    return { ok: false, error: 'invalid_dob' }
  }
  if (!WORK_LOCATIONS.has(workLocation)) {
    return { ok: false, error: 'invalid_work_location' }
  }
  if (!NATIONALITY_KEYS.has(nationality)) {
    return { ok: false, error: 'invalid_nationality' }
  }

  // Photo upload
  let saved
  try {
    saved = await saveUploadedImage(photo)
  } catch (err) {
    return { ok: false, error: err.code || 'server_error' }
  }

  try {
    const id = createApplication({
      fullName,
      email,
      phone,
      description,
      photoPath: saved.relativePath,
      photoOriginalName: saved.originalName,
      photoSize: saved.size,
      photoMime: saved.mime,
      dateOfBirth,
      workLocation,
      nationality,
    })
    revalidatePath('/admin/applications')
    return { ok: true, id }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[submitApplicationAction]', err)
    return { ok: false, error: 'server_error' }
  }
}
