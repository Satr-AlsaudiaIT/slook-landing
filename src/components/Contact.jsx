'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Send, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'
import { submitMessage } from '../app/actions'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function InfoCard({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 ring-1 ring-white/10">
        <Icon className="size-5 text-slook-purple" />
      </span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-white/45">{label}</div>
        <div className="mt-0.5 truncate text-sm font-medium text-white/90">{value}</div>
      </div>
    </>
  )

  const baseClasses = 'card-glass group flex items-center gap-3 rounded-xl p-4 transition-transform hover:-translate-y-0.5'

  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={baseClasses}
    >
      {inner}
    </a>
  ) : (
    <div className={baseClasses}>{inner}</div>
  )
}

function SubmitButton({ label, pendingLabel }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-slook-purple to-slook-blue shadow-[0_0_24px_rgba(114,64,237,0.4)] transition-all hover:from-[#8350FF] hover:to-[#1B75FF] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Send className="size-4 icon-flip" />
      {pending ? pendingLabel : label}
    </button>
  )
}

export default function Contact() {
  const { t, lang } = useLang()
  const { contact } = t
  const { whatsapp, phone, phoneLink, email, emailLink, address } = useContactInfo()

  const [state, formAction] = useFormState(submitMessage, { ok: null })
  const formRef = useRef(null)

  useEffect(() => {
    if (state.ok === true) {
      toast.success(contact.snack.success)
      formRef.current?.reset()
    } else if (state.ok === false) {
      const map = contact.snack.errors
      toast.error(map[state.error] || contact.snack.errorFallback)
    }
  }, [state, contact.snack])

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slook-gradient opacity-50" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-40" />

      <div className="container-slook">
        <SectionHeading kicker={contact.kicker} title={contact.title} sub={contact.sub} />

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
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-white/70">{contact.form.name}</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-slook-purple focus-visible:ring-slook-purple/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/70">{contact.form.email}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-slook-purple focus-visible:ring-slook-purple/20"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="message" className="text-white/70">{contact.form.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-slook-purple focus-visible:ring-slook-purple/20"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <SubmitButton label={contact.form.send} pendingLabel={contact.form.sending} />
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#25D366]/50 px-6 py-3 text-sm font-semibold text-[#25D366] transition-all hover:border-[#25D366] hover:bg-[#25D366]/8"
              >
                <WhatsAppIcon className="size-4" />
                {contact.form.whatsapp}
              </a>
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
            <InfoCard icon={Phone} label={contact.cards.phone} value={phone} href={phoneLink} />
            <InfoCard icon={Mail} label={contact.cards.email} value={email} href={emailLink} />
            <InfoCard icon={MapPin} label={contact.cards.location} value={address[lang] || address.en || address.ar} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
