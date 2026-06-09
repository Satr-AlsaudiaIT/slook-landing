'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, Send, UserCircle2 } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { submitApplicationAction } from './actions'

function SubmitButton({ label, pending: pendingLabel }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slook-purple to-slook-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(114,64,237,0.4)] transition-all hover:from-[#8350FF] hover:to-[#1B75FF] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send className="size-4 icon-flip" />
      {pending ? pendingLabel : label}
    </button>
  )
}

export default function ApplyForm() {
  const { t } = useLang()
  const { apply } = t
  const [state, formAction] = useActionState(submitApplicationAction, { ok: null })
  const formRef = useRef(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  // Reset preview after successful submit
  useEffect(() => {
    if (state.ok === true) {
      setPhotoPreview(null)
      formRef.current?.reset()
    }
  }, [state.ok])

  // Success screen replaces the form once submitted
  if (state.ok === true) {
    return (
      <div className="card-glass mx-auto rounded-3xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 ring-1 ring-white/10">
          <CheckCircle2 className="size-8 text-slook-purple" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold">
          {apply.success.title}
        </h1>
        <p className="mt-2 text-sm text-white/65">{apply.success.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              // Re-render the form by reloading the page (drops the action state)
              window.location.reload()
            }}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/85 transition-colors hover:border-slook-purple/60 hover:bg-slook-purple/10"
          >
            {apply.success.another}
          </button>
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-slook-purple to-slook-blue px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(114,64,237,0.4)]"
          >
            {apply.success.backHome}
          </Link>
        </div>
      </div>
    )
  }

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPhotoPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
  }

  return (
    <div className="card-glass rounded-3xl p-6 md:p-8">
      <header className="mb-6 text-center">
        <h1 className="font-display text-3xl font-semibold">{apply.title}</h1>
        <p className="mt-2 text-sm text-white/55">{apply.sub}</p>
      </header>

      {state.ok === false && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {apply.errors[state.error] || apply.errors.errorFallback}
        </div>
      )}

      <form
        ref={formRef}
        action={formAction}
        encType="multipart/form-data"
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field name="fullName" label={apply.form.fullName} required maxLength={200} autoComplete="name" />
          <Field name="email" type="email" label={apply.form.email} required autoComplete="email" />
          <Field name="phone" type="tel" label={apply.form.phone} required autoComplete="tel" />
          <Field name="dateOfBirth" type="date" label={apply.form.dateOfBirth} required />
        </div>

        <label className="block">
          <span className="block text-sm text-white/75">{apply.form.description}</span>
          <textarea
            name="description"
            required
            rows={4}
            maxLength={5000}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-slook-purple focus:bg-white/[0.07]"
          />
          <span className="mt-1 block text-xs text-white/40">{apply.form.descriptionHint}</span>
        </label>

        {/* Profile photo */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/5 p-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoPreview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle2 className="size-10 text-white/30" />
            )}
          </div>
          <div className="flex-1">
            <label className="block">
              <span className="block text-sm text-white/75">{apply.form.photo}</span>
              <input
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                required
                onChange={onPhotoChange}
                className="mt-1.5 block w-full text-sm text-white/80 file:me-3 file:rounded-md file:border-0 file:bg-slook-purple/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slook-purple/30"
              />
              <span className="mt-1 block text-xs text-white/40">{apply.form.photoHint}</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <SubmitButton
            label={apply.form.submit}
            pending={apply.form.submitting}
          />
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, type = 'text', required, maxLength, autoComplete }) {
  return (
    <label className="block">
      <span className="block text-sm text-white/75">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-slook-purple focus:bg-white/[0.07]"
      />
    </label>
  )
}
