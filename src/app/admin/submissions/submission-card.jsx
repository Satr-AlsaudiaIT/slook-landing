'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  Download,
  FileText,
  CheckCircle2,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
} from 'lucide-react'
import {
  setSubmissionStatusAction,
  saveSubmissionNotesAction,
  deleteSubmissionAction,
} from '../actions'

const STATUS_TONE = {
  new:      { bg: 'bg-slook-purple/15', text: 'text-slook-purple', label: 'New' },
  reviewed: { bg: 'bg-slook-blue/15',   text: 'text-slook-blue',   label: 'Reviewed' },
  archived: { bg: 'bg-white/5',         text: 'text-white/45',     label: 'Archived' },
}

function formatBytes(n) {
  if (!n) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let v = n
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

function NotesButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-slook-purple/60 hover:bg-slook-purple/10 disabled:opacity-60"
    >
      <Save className="size-3.5" />
      {pending ? 'Saving...' : 'Save notes'}
    </button>
  )
}

export default function SubmissionCard({ submission }) {
  const [open, setOpen] = useState(submission.status === 'new')
  const [notesState, notesAction] = useActionState(saveSubmissionNotesAction, { ok: null })

  const tone = STATUS_TONE[submission.status] || STATUS_TONE.new
  const created = new Date(submission.created_at + 'Z').toLocaleString()

  return (
    <li className="card-glass rounded-2xl">
      <header
        className="flex cursor-pointer items-start justify-between gap-3 p-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{submission.name}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tone.bg} ${tone.text}`}>
              {tone.label}
            </span>
          </div>
          <div className="mt-0.5 truncate text-xs text-white/45">
            From{' '}
            <span className="text-white/75">{submission.user_name}</span>{' '}
            ·{' '}
            <a
              href={`mailto:${submission.user_email}`}
              className="hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {submission.user_email}
            </a>{' '}
            · {created}
          </div>
        </div>
        <span className="shrink-0 text-white/50">
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </span>
      </header>

      {open && (
        <div className="border-t border-white/5 p-4">
          <p className="whitespace-pre-wrap rounded-lg bg-black/20 p-3 text-sm text-white/85">
            {submission.description}
          </p>

          {/* PDF link */}
          <div className="mt-3">
            <a
              href={`/api/submissions/${submission.id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 transition-colors hover:border-slook-purple/60 hover:bg-slook-purple/10"
            >
              <FileText className="size-3.5" />
              <span className="max-w-[24ch] truncate">
                {submission.pdf_original_name || 'document.pdf'}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/40">{formatBytes(submission.pdf_size)}</span>
              <Download className="size-3.5" />
            </a>
          </div>

          {/* Admin notes */}
          <form
            action={notesAction}
            className="mt-4 flex flex-col gap-2 rounded-lg border border-white/5 p-3"
          >
            <input type="hidden" name="id" value={submission.id} />
            <label className="block text-xs text-white/60">Internal notes (only admins see this)</label>
            <textarea
              name="notes"
              defaultValue={submission.admin_notes || ''}
              rows={2}
              maxLength={2000}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-slook-purple"
              style={{
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                colorScheme: 'dark',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                {notesState.ok === true && notesState.id === submission.id ? 'Saved' : ''}
              </span>
              <NotesButton />
            </div>
          </form>

          {/* Action buttons — separate forms so they're sibling submissions, not nested */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
            {submission.status !== 'reviewed' && (
              <form action={setSubmissionStatusAction}>
                <input type="hidden" name="id" value={submission.id} />
                <input type="hidden" name="status" value="reviewed" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md border border-slook-blue/40 bg-slook-blue/10 px-3 py-1.5 text-xs text-slook-blue transition-colors hover:border-slook-blue hover:bg-slook-blue/15"
                >
                  <CheckCircle2 className="size-3.5" />
                  Mark reviewed
                </button>
              </form>
            )}
            {submission.status !== 'archived' && (
              <form action={setSubmissionStatusAction}>
                <input type="hidden" name="id" value={submission.id} />
                <input type="hidden" name="status" value="archived" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/30"
                >
                  <Archive className="size-3.5" />
                  Archive
                </button>
              </form>
            )}
            {submission.status === 'archived' && (
              <form action={setSubmissionStatusAction}>
                <input type="hidden" name="id" value={submission.id} />
                <input type="hidden" name="status" value="new" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/30"
                >
                  Restore
                </button>
              </form>
            )}
            <form
              action={deleteSubmissionAction}
              onSubmit={(e) => {
                if (!confirm('Delete this submission permanently? The PDF will be removed from disk.')) {
                  e.preventDefault()
                }
              }}
              className="ms-auto"
            >
              <input type="hidden" name="id" value={submission.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/5 px-3 py-1.5 text-xs text-red-300 transition-colors hover:border-red-500/60 hover:bg-red-500/10"
              >
                <Trash2 className="size-3.5" />
                Delete
              </button>
            </form>
          </div>
        </div>
      )}
    </li>
  )
}
