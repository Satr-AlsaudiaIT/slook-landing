import 'server-only'
import nodemailer from 'nodemailer'

/**
 * Email helper.
 *
 * If SMTP_HOST is configured in env, sends a real email via nodemailer.
 * Otherwise logs to the server console (dry-run) so dev works without any
 * SMTP account. Configure these env vars to enable real delivery:
 *
 *   SMTP_HOST=smtp.example.com
 *   SMTP_PORT=587
 *   SMTP_SECURE=false        # true for port 465
 *   SMTP_USER=...
 *   SMTP_PASS=...
 *   SMTP_FROM="Slook <no-reply@slook.sa>"
 */

let transporter = null

function getTransporter() {
  if (!process.env.SMTP_HOST) return null
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
  return transporter
}

export async function sendMail({ to, subject, text, html }) {
  const tx = getTransporter()
  if (!tx) {
    // eslint-disable-next-line no-console
    console.log('\n[slook mail · SMTP not configured · dry-run]')
    // eslint-disable-next-line no-console
    console.log({ to, subject, text })
    return { ok: true, dryRun: true }
  }
  const from = process.env.SMTP_FROM || 'Slook <no-reply@slook.sa>'
  const info = await tx.sendMail({ from, to, subject, text, html })
  return { ok: true, id: info.messageId }
}
