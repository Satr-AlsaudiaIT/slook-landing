'use client'

import { useEffect, useRef } from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Send, FileText, Download } from 'lucide-react'
import { useLang } from '../../../context/LangContext'
import { createSubmissionAction } from '../actions'

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

export default function DashboardClient({ user, submissions }) {
  const { t } = useLang()
  const { portal } = t
  const [state, formAction] = useActionState(createSubmissionAction, { ok: null })
  const formRef = useRef(null)

  useEffect(() => {
    if (state.ok === true) {
      toast.success(portal.success.submission)
      formRef.current?.reset()
    } else if (state.ok === false) {
      toast.error(portal.errors[state.error] || portal.errors.errorFallback)
    }
  }, [state, portal])

  const firstName = user?.name?.split(' ')[0] || ''

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          {portal.dashboard.welcome}, {firstName}
        </h1>
        <p className="mt-1 text-sm text-white/55">
          {portal.dashboard.welcomeMessage}
        </p>
      </div>

      {/* Submission form */}
      <section className="card-glass rounded-3xl p-6 md:p-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">{portal.dashboard.form.title}</h2>
          <p className="mt-1 text-sm text-white/55">{portal.dashboard.form.sub}</p>
        </div>

        <form ref={formRef} action={formAction} encType="multipart/form-data" className="flex flex-col gap-4">
          <label className="block">
            <span className="block text-sm text-white/75">{portal.dashboard.form.name}</span>
            <input
              name="name"
              type="text"
              required
              maxLength={200}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-slook-purple focus:bg-white/[0.07]"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-white/75">{portal.dashboard.form.description}</span>
            <textarea
              name="description"
              required
              rows={4}
              maxLength={5000}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-slook-purple focus:bg-white/[0.07]"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-white/75">{portal.dashboard.form.pdf}</span>
            <input
              name="pdf"
              type="file"
              accept="application/pdf,.pdf"
              required
              className="mt-1.5 block w-full text-sm text-white/80 file:me-3 file:rounded-md file:border-0 file:bg-slook-purple/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slook-purple/30"
            />
            <span className="mt-1 block text-xs text-white/40">{portal.dashboard.form.pdfHint}</span>
          </label>

          <div className="flex justify-end pt-2">
            <SubmitButton
              label={portal.dashboard.form.submit}
              pending={portal.dashboard.form.submitting}
            />
          </div>
        </form>
      </section>

      {/* Past submissions */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">{portal.dashboard.mySubmissions}</h2>

        {submissions.length === 0 ? (
          <div className="card-glass rounded-2xl p-8 text-center text-sm text-white/55">
            {portal.dashboard.empty}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {submissions.map((s) => (
              <SubmissionRow key={s.id} submission={s} portal={portal} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

const STATUS_TONE = {
  new: 'bg-slook-purple/15 text-slook-purple',
  reviewed: 'bg-slook-blue/15 text-slook-blue',
  archived: 'bg-white/5 text-white/45',
}

function SubmissionRow({ submission, portal }) {
  const created = new Date(submission.created_at + 'Z').toLocaleString()
  const statusKey = submission.status in STATUS_TONE ? submission.status : 'new'

  return (
    <li className="card-glass rounded-2xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{submission.name}</h3>
          <p className="mt-1 text-xs text-white/45">
            {portal.dashboard.submittedOn}: {created}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONE[statusKey]}`}>
          {portal.dashboard.statusLabels[statusKey]}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm text-white/75">
        {submission.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/5 pt-3">
        <a
          href={`/api/submissions/${submission.id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-slook-purple/60 hover:bg-slook-purple/10"
        >
          <FileText className="size-3.5" />
          {submission.pdf_original_name || 'document.pdf'}
          <Download className="size-3.5" />
        </a>
        {submission.admin_notes && (
          <span className="text-xs text-white/50">📝 {submission.admin_notes}</span>
        )}
      </div>
    </li>
  )
}
