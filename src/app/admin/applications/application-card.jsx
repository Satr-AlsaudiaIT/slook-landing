'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Flag,
  CheckCircle2,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
} from 'lucide-react'
import {
  setApplicationStatusAction,
  saveApplicationNotesAction,
  deleteApplicationAction,
} from '../actions'

const STATUS_TONE = {
  new:      { bg: 'bg-slook-purple/15', text: 'text-slook-purple', label: 'New' },
  reviewed: { bg: 'bg-slook-blue/15',   text: 'text-slook-blue',   label: 'Reviewed' },
  archived: { bg: 'bg-white/5',         text: 'text-white/45',     label: 'Archived' },
}

function ageFrom(isoDob) {
  if (!isoDob) return null
  const d = new Date(isoDob)
  if (Number.isNaN(d.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age
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

export default function ApplicationCard({ application }) {
  const [open, setOpen] = useState(application.status === 'new')
  const [notesState, notesAction] = useActionState(saveApplicationNotesAction, { ok: null })

  const tone = STATUS_TONE[application.status] || STATUS_TONE.new
  const created = new Date(application.created_at + 'Z').toLocaleString()
  const age = ageFrom(application.date_of_birth)

  return (
    <li className="card-glass rounded-2xl">
      <header
        className="flex cursor-pointer items-start justify-between gap-3 p-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/applications/${application.id}/photo`}
            alt={application.full_name}
            className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{application.full_name}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tone.bg} ${tone.text}`}>
                {tone.label}
              </span>
            </div>
            <div className="mt-0.5 truncate text-xs text-white/45">
              <a
                href={`mailto:${application.email}`}
                className="hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {application.email}
              </a>
              {' · '}
              <a
                href={`tel:${application.phone}`}
                className="hover:text-white"
                onClick={(e) => e.stopPropagation()}
                dir="ltr"
              >
                {application.phone}
              </a>
              {' · '}
              <span>{created}</span>
            </div>
          </div>
        </div>
        <span className="shrink-0 text-white/50">
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </span>
      </header>

      {open && (
        <div className="border-t border-white/5 p-4">
          {/* Quick facts */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Fact icon={Mail}        label="Email"         value={application.email} href={`mailto:${application.email}`} />
            <Fact icon={Phone}       label="Phone"         value={application.phone} href={`tel:${application.phone}`} dir="ltr" />
            <Fact
              icon={CalendarDays}
              label="Date of birth"
              value={
                application.date_of_birth +
                (age != null ? ` · ${age} yrs` : '')
              }
            />
            <Fact
              icon={MapPin}
              label="Preferred location"
              value={application.work_location || '—'}
            />
            <Fact
              icon={Flag}
              label="Nationality"
              value={application.nationality || '—'}
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <div className="mb-1 text-xs uppercase tracking-wider text-white/45">
              How they made their first sale
            </div>
            <p className="whitespace-pre-wrap rounded-lg bg-black/20 p-3 text-sm text-white/85">
              {application.description}
            </p>
          </div>

          {/* Admin notes */}
          <form
            action={notesAction}
            className="mt-4 flex flex-col gap-2 rounded-lg border border-white/5 p-3"
          >
            <input type="hidden" name="id" value={application.id} />
            <label className="block text-xs text-white/60">Internal notes (only admins see this)</label>
            <textarea
              name="notes"
              defaultValue={application.admin_notes || ''}
              rows={2}
              maxLength={2000}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-slook-purple"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                {notesState.ok === true && notesState.id === application.id ? 'Saved' : ''}
              </span>
              <NotesButton />
            </div>
          </form>

          {/* Action buttons — separate sibling forms */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
            {application.status !== 'reviewed' && (
              <form action={setApplicationStatusAction}>
                <input type="hidden" name="id" value={application.id} />
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
            {application.status !== 'archived' && (
              <form action={setApplicationStatusAction}>
                <input type="hidden" name="id" value={application.id} />
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
            {application.status === 'archived' && (
              <form action={setApplicationStatusAction}>
                <input type="hidden" name="id" value={application.id} />
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
              action={deleteApplicationAction}
              onSubmit={(e) => {
                if (!confirm('Delete this application permanently? The photo will be removed from disk.')) {
                  e.preventDefault()
                }
              }}
              className="ms-auto"
            >
              <input type="hidden" name="id" value={application.id} />
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

function Fact({ icon: Icon, label, value, href, dir }) {
  const inner = (
    <>
      <Icon className="mt-0.5 size-3.5 shrink-0 text-slook-purple" />
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-white/45">{label}</div>
        <div className="truncate text-sm text-white/85" dir={dir}>
          {value}
        </div>
      </div>
    </>
  )
  return href ? (
    <a
      href={href}
      className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-slook-purple/40"
    >
      {inner}
    </a>
  ) : (
    <div className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
      {inner}
    </div>
  )
}
