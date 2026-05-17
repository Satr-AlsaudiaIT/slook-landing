'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { TextField, Button, Chip, Alert } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  replyToMessageAction,
  archiveMessageAction,
  deleteMessageAction,
} from '../actions'

const STATUS_COLOR = {
  new: { bg: 'rgba(114,64,237,0.18)', color: '#9D7BFF', label: 'New' },
  replied: { bg: 'rgba(0,101,247,0.18)', color: '#5AA0FF', label: 'Replied' },
  archived: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', label: 'Archived' },
}

function ReplyButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="contained"
      size="small"
      disabled={pending}
      startIcon={<ReplyIcon />}
      sx={{
        background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
        '&.Mui-disabled': { opacity: 0.7, color: '#fff' },
      }}
    >
      {pending ? 'Sending...' : 'Send reply'}
    </Button>
  )
}

export default function MessageRow({ message }) {
  const [open, setOpen] = useState(message.status === 'new')
  const [state, formAction] = useFormState(replyToMessageAction, { ok: null })

  const status = STATUS_COLOR[message.status] || STATUS_COLOR.new
  const created = new Date(message.created_at + 'Z').toLocaleString()

  return (
    <li className="card-glass rounded-2xl">
      <header
        className="flex cursor-pointer items-start justify-between gap-3 p-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{message.name}</span>
            <Chip
              size="small"
              label={status.label}
              sx={{
                background: status.bg,
                color: status.color,
                fontSize: 11,
                height: 20,
              }}
            />
          </div>
          <a
            href={`mailto:${message.email}`}
            className="text-xs text-white/55 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {message.email}
          </a>
          <p className="mt-2 line-clamp-2 text-sm text-white/70">
            {message.message}
          </p>
        </div>
        <div className="shrink-0 text-end text-xs text-white/40">
          <div>{created}</div>
          <div className="mt-1 flex justify-end text-white/50">
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </div>
        </div>
      </header>

      {open && (
        <div className="border-t border-white/5 p-4">
          <div className="rounded-lg bg-black/20 p-3 text-sm text-white/85 whitespace-pre-wrap">
            {message.message}
          </div>

          {message.reply && (
            <div className="mt-3 rounded-lg border-l-2 border-slook-blue bg-slook-blue/5 p-3 text-sm text-white/80">
              <div className="mb-1 text-xs uppercase tracking-wider text-slook-blue">
                Your reply ·{' '}
                {message.replied_at &&
                  new Date(message.replied_at + 'Z').toLocaleString()}
              </div>
              <div className="whitespace-pre-wrap">{message.reply}</div>
            </div>
          )}

          {message.status !== 'archived' && (
            <>
              {/* Reply form */}
              <form action={formAction} className="mt-4 flex flex-col gap-3">
                <input type="hidden" name="id" value={message.id} />
                {state.ok === true && state.id === message.id && (
                  <Alert severity="success" variant="outlined">
                    Reply sent to {message.email}.
                  </Alert>
                )}
                {state.ok === false && (
                  <Alert severity="error" variant="outlined">
                    {state.error === 'mail_failed'
                      ? 'Could not send email — check SMTP config.'
                      : 'Could not send reply.'}
                  </Alert>
                )}
                <TextField
                  name="reply"
                  multiline
                  minRows={3}
                  fullWidth
                  placeholder={
                    message.status === 'replied'
                      ? 'Send another follow-up...'
                      : 'Write your reply...'
                  }
                  variant="outlined"
                  required
                />
                <div className="flex justify-end">
                  <ReplyButton />
                </div>
              </form>

              {/* Sibling action forms (kept separate to avoid nested <form>) */}
              <div className="mt-3 flex gap-2 border-t border-white/5 pt-3">
                <form action={archiveMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    startIcon={<ArchiveIcon />}
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    Archive
                  </Button>
                </form>
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </li>
  )
}
