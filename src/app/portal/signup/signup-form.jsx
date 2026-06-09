'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { UserPlus } from 'lucide-react'
import { useLang } from '../../../context/LangContext'
import { signupAction } from '../actions'

function SubmitButton({ label, pending: pendingLabel }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slook-purple to-slook-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(114,64,237,0.4)] transition-all hover:from-[#8350FF] hover:to-[#1B75FF] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <UserPlus className="size-4 icon-flip" />
      {pending ? pendingLabel : label}
    </button>
  )
}

export default function SignupForm() {
  const { t } = useLang()
  const { portal } = t
  const [state, formAction] = useActionState(signupAction, { ok: null })

  return (
    <div className="card-glass rounded-3xl p-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-semibold">{portal.signup.title}</h1>
        <p className="mt-1 text-sm text-white/55">{portal.signup.sub}</p>
      </div>

      {state.ok === false && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {portal.errors[state.error] || portal.errors.errorFallback}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <Field
          label={portal.signup.name}
          name="name"
          type="text"
          required
          autoComplete="name"
        />
        <Field
          label={portal.signup.email}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label={portal.signup.password}
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          hint={portal.signup.passwordHint}
        />
        <SubmitButton label={portal.signup.submit} pending={portal.signup.submitting} />
      </form>

      <p className="mt-5 text-center text-sm text-white/55">
        {portal.signup.haveAccount}{' '}
        <Link href="/portal/signin" className="text-slook-purple hover:underline">
          {portal.signup.signinLink}
        </Link>
      </p>
    </div>
  )
}

function Field({ label, name, type, required, autoComplete, minLength, hint }) {
  return (
    <label className="block">
      <span className="block text-sm text-white/75">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-slook-purple focus:bg-white/[0.07]"
      />
      {hint && <span className="mt-1 block text-xs text-white/40">{hint}</span>}
    </label>
  )
}
