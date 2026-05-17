'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { Button, TextField, Snackbar, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'
import { submitMessage } from '../app/actions'

/**
 * Contact section.
 *
 * - The form submits via a Next.js Server Action (`submitMessage`) which
 *   writes the message to the SQLite messages table. Admin sees it at
 *   /admin/messages.
 * - WhatsApp remains as a secondary quick-chat button (link from DB).
 * - Phone / Email / Address come from the live contact_info row via
 *   useContactInfo() and refresh whenever the admin updates them.
 */

function InfoCard({ icon: Icon, label, value, href }) {
  const Inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 ring-1 ring-white/10">
        <Icon sx={{ color: '#7240ED', fontSize: 22 }} />
      </span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-white/45">
          {label}
        </div>
        <div className="mt-0.5 truncate text-sm font-medium text-white/90">
          {value}
        </div>
      </div>
    </>
  )

  const baseClasses =
    'card-glass group flex items-center gap-3 rounded-xl p-4 transition-transform hover:-translate-y-0.5'

  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={baseClasses}
    >
      {Inner}
    </a>
  ) : (
    <div className={baseClasses}>{Inner}</div>
  )
}

function SubmitButton({ label, pendingLabel }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={pending}
      startIcon={<SendIcon className="icon-flip" />}
      sx={{
        background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
        boxShadow: '0 0 24px rgba(114, 64, 237, 0.4)',
        flex: 1,
        '&:hover': {
          background: 'linear-gradient(135deg, #8350FF 0%, #1B75FF 100%)',
        },
        '&.Mui-disabled': { opacity: 0.7, color: '#fff' },
      }}
    >
      {pending ? pendingLabel : label}
    </Button>
  )
}

export default function Contact() {
  const { t, lang } = useLang()
  const { contact } = t
  const { whatsapp, phone, phoneLink, email, emailLink, address } =
    useContactInfo()

  const [state, formAction] = useFormState(submitMessage, { ok: null })
  const [snack, setSnack] = useState(null)
  const formRef = useRef(null)

  // Pop a snackbar + reset on success/error transitions
  useEffect(() => {
    if (state.ok === true) {
      setSnack({
        severity: 'success',
        msg: contact.snack.success,
      })
      formRef.current?.reset()
    } else if (state.ok === false) {
      const map = contact.snack.errors
      setSnack({ severity: 'error', msg: map[state.error] || contact.snack.errorFallback })
    }
  }, [state, contact.snack])

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slook-gradient opacity-50" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-40" />

      <div className="container-slook">
        <SectionHeading
          kicker={contact.kicker}
          title={contact.title}
          sub={contact.sub}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            ref={formRef}
            action={formAction}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="card-glass rounded-3xl p-6 md:p-8 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField
                required
                fullWidth
                name="name"
                label={contact.form.name}
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                type="email"
                name="email"
                label={contact.form.email}
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                multiline
                minRows={4}
                name="message"
                label={contact.form.message}
                variant="outlined"
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <SubmitButton
                label={contact.form.send}
                pendingLabel={contact.form.sending}
              />
              <Button
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon className="icon-flip" />}
                sx={{
                  color: '#25D366',
                  borderColor: 'rgba(37, 211, 102, 0.5)',
                  flex: 1,
                  '&:hover': {
                    borderColor: '#25D366',
                    background: 'rgba(37, 211, 102, 0.08)',
                  },
                }}
              >
                {contact.form.whatsapp}
              </Button>
            </div>
          </motion.form>

          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3 lg:col-span-2"
          >
            <InfoCard
              icon={PhoneIcon}
              label={contact.cards.phone}
              value={phone}
              href={phoneLink}
            />
            <InfoCard
              icon={EmailIcon}
              label={contact.cards.email}
              value={email}
              href={emailLink}
            />
            <InfoCard
              icon={LocationOnIcon}
              label={contact.cards.location}
              value={address[lang] || address.en || address.ar}
            />
          </motion.div>
        </div>
      </div>

      <Snackbar
        open={!!snack}
        autoHideDuration={5000}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snack && (
          <Alert
            severity={snack.severity}
            variant="filled"
            onClose={() => setSnack(null)}
          >
            {snack.msg}
          </Alert>
        )}
      </Snackbar>
    </section>
  )
}
