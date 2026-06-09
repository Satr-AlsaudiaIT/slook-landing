'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { getSession, requireAdmin } from '@/lib/auth'
import { sendMail } from '@/lib/mail'
import {
  getUserByUsername,
  updateContactInfo,
  getMessage,
  markMessageReplied,
  archiveMessage,
  deleteMessage,
  updateSubmissionStatus,
  setSubmissionAdminNotes,
  deleteSubmission,
  setAppUserActive,
} from '@/lib/db'
import { deleteUploadIfExists } from '@/lib/uploads'

/* ------------------------------ auth ------------------------------ */

export async function loginAction(prevState, formData) {
  const username = String(formData.get('username') || '').trim()
  const password = String(formData.get('password') || '')

  if (!username || !password) {
    return { ok: false, error: 'missing_fields' }
  }

  const user = getUserByUsername(username)
  if (!user) {
    return { ok: false, error: 'invalid_credentials' }
  }

  const valid = bcrypt.compareSync(password, user.password_hash)
  if (!valid) {
    return { ok: false, error: 'invalid_credentials' }
  }

  const session = await getSession()
  session.userId = user.id
  session.username = user.username
  await session.save()

  redirect('/admin/messages')
}

export async function logoutAction() {
  const session = await getSession()
  session.destroy()
  redirect('/admin/login')
}

/* -------------------------- contact info -------------------------- */

export async function updateContactAction(prevState, formData) {
  await requireAdmin()

  const values = {
    phone: String(formData.get('phone') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    whatsapp: String(formData.get('whatsapp') || '').trim(),
    address_ar: String(formData.get('address_ar') || '').trim(),
    address_en: String(formData.get('address_en') || '').trim(),
    instagram: String(formData.get('instagram') || '').trim(),
    twitter: String(formData.get('twitter') || '').trim(),
    linkedin: String(formData.get('linkedin') || '').trim(),
    tiktok: String(formData.get('tiktok') || '').trim(),
  }

  if (!values.phone || !values.email || !values.whatsapp) {
    return { ok: false, error: 'missing_required' }
  }

  try {
    updateContactInfo(values)
    // Revalidate the public landing so visitors see the new info
    revalidatePath('/')
    revalidatePath('/admin/contact')
    return { ok: true, savedAt: new Date().toISOString() }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[updateContactAction]', err)
    return { ok: false, error: 'server_error' }
  }
}

/* ----------------------------- messages --------------------------- */

export async function replyToMessageAction(prevState, formData) {
  await requireAdmin()

  const id = Number(formData.get('id'))
  const reply = String(formData.get('reply') || '').trim()

  if (!id || !reply) {
    return { ok: false, id, error: 'missing_fields' }
  }

  const msg = getMessage(id)
  if (!msg) {
    return { ok: false, id, error: 'not_found' }
  }

  // Send email reply
  try {
    await sendMail({
      to: msg.email,
      subject: `Re: ${msg.message.slice(0, 60).replace(/\s+/g, ' ')}`,
      text: `Hi ${msg.name},\n\n${reply}\n\n— Slook team\nhttps://slook.sa`,
      html: `<p>Hi ${escapeHtml(msg.name)},</p>
             <p>${escapeHtml(reply).replace(/\n/g, '<br>')}</p>
             <p>— Slook team<br><a href="https://slook.sa">slook.sa</a></p>`,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[mail send failed]', err)
    return { ok: false, id, error: 'mail_failed' }
  }

  markMessageReplied(id, reply)
  revalidatePath('/admin/messages')
  return { ok: true, id }
}

export async function archiveMessageAction(formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  if (id) archiveMessage(id)
  revalidatePath('/admin/messages')
}

export async function deleteMessageAction(formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  if (id) deleteMessage(id)
  revalidatePath('/admin/messages')
}

/* --------------------- portal submissions / users ----------------- */

const VALID_SUBMISSION_STATUSES = new Set(['new', 'reviewed', 'archived'])

export async function setSubmissionStatusAction(formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  const status = String(formData.get('status') || '')
  if (!id || !VALID_SUBMISSION_STATUSES.has(status)) return
  updateSubmissionStatus(id, status)
  revalidatePath('/admin/submissions')
  revalidatePath('/portal/dashboard')
}

export async function saveSubmissionNotesAction(prevState, formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  const notes = String(formData.get('notes') || '').trim()
  if (!id) return { ok: false, id, error: 'missing_fields' }
  setSubmissionAdminNotes(id, notes || null)
  revalidatePath('/admin/submissions')
  return { ok: true, id }
}

export async function deleteSubmissionAction(formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  if (!id) return
  // deleteSubmission returns the row so we can also remove the PDF file
  const row = deleteSubmission(id)
  if (row?.pdf_path) {
    await deleteUploadIfExists(row.pdf_path)
  }
  revalidatePath('/admin/submissions')
}

export async function setUserActiveAction(formData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  const isActive = formData.get('isActive') === '1'
  if (!id) return
  setAppUserActive(id, isActive)
  revalidatePath('/admin/users')
}

/* ----------------------------- helpers ---------------------------- */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
