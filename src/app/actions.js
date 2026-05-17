'use server'

import { createMessage } from '@/lib/db'

/**
 * Public Server Action — called by the landing-page contact form via
 * <form action={submitMessage}>. Returns shape consumed by useFormState.
 */
export async function submitMessage(prevState, formData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()

  // Hand-validate (no zod dep)
  if (!name || !email || !message) {
    return { ok: false, error: 'missing_fields' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'invalid_email' }
  }
  if (message.length > 5000) {
    return { ok: false, error: 'message_too_long' }
  }

  try {
    const id = createMessage({ name, email, message })
    return { ok: true, id: Number(id) }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[submitMessage]', err)
    return { ok: false, error: 'server_error' }
  }
}
