'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { getUserSession, requireUser } from '@/lib/auth'
import {
  createAppUser,
  getAppUserByEmail,
  getAppUserById,
  createSubmission,
} from '@/lib/db'
import { saveUploadedPdf } from '@/lib/uploads'

/* ----------------------------- helpers ---------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeEmail(input) {
  return String(input || '').trim().toLowerCase()
}

/* ------------------------------ auth ------------------------------ */

export async function signupAction(prevState, formData) {
  const name = String(formData.get('name') || '').trim()
  const email = normalizeEmail(formData.get('email'))
  const password = String(formData.get('password') || '')

  if (!name || !email || !password) {
    return { ok: false, error: 'missing_fields' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'invalid_email' }
  }
  if (password.length < 8) {
    return { ok: false, error: 'weak_password' }
  }

  const existing = getAppUserByEmail(email)
  if (existing) {
    return { ok: false, error: 'email_exists' }
  }

  try {
    const passwordHash = bcrypt.hashSync(password, 10)
    const id = createAppUser({ email, name, passwordHash })

    // Auto-login: stamp the user session immediately
    const session = await getUserSession()
    session.userId = id
    session.email = email
    session.name = name
    await session.save()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[signupAction]', err)
    return { ok: false, error: 'server_error' }
  }

  redirect('/portal/dashboard')
}

export async function signinAction(prevState, formData) {
  const email = normalizeEmail(formData.get('email'))
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { ok: false, error: 'missing_fields' }
  }

  const user = getAppUserByEmail(email)
  if (!user) {
    return { ok: false, error: 'invalid_credentials' }
  }
  if (!user.is_active) {
    return { ok: false, error: 'account_disabled' }
  }
  const valid = bcrypt.compareSync(password, user.password_hash)
  if (!valid) {
    return { ok: false, error: 'invalid_credentials' }
  }

  const session = await getUserSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name
  await session.save()

  redirect('/portal/dashboard')
}

export async function signoutAction() {
  const session = await getUserSession()
  session.destroy()
  redirect('/portal/signin')
}

/* --------------------------- submissions -------------------------- */

export async function createSubmissionAction(prevState, formData) {
  const session = await requireUser()

  // Re-check active state (account could've been disabled mid-session)
  const user = getAppUserById(session.userId)
  if (!user || !user.is_active) {
    session.destroy()
    return { ok: false, error: 'account_disabled' }
  }

  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const file = formData.get('pdf')

  if (!name || !description) {
    return { ok: false, error: 'missing_fields' }
  }

  let saved
  try {
    saved = await saveUploadedPdf(file)
  } catch (err) {
    return { ok: false, error: err.code || 'server_error' }
  }

  try {
    const id = createSubmission({
      userId: session.userId,
      name,
      description,
      pdfPath: saved.relativePath,
      pdfOriginalName: saved.originalName,
      pdfSize: saved.size,
    })
    revalidatePath('/portal/dashboard')
    revalidatePath('/admin/submissions')
    return { ok: true, id }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[createSubmissionAction]', err)
    return { ok: false, error: 'server_error' }
  }
}
