'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { TextField, Button, Alert } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { updateContactAction } from '../actions'

const ERR_MAP = {
  missing_required: 'Phone, email and WhatsApp are required.',
  server_error: 'Server error — try again.',
}

const textFieldSx = {
  '& .MuiOutlinedInput-input': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#7240ED' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
}

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={pending}
      startIcon={<SaveIcon />}
      sx={{
        background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
        '&.Mui-disabled': { opacity: 0.7, color: '#fff' },
      }}
    >
      {pending ? 'Saving...' : 'Save changes'}
    </Button>
  )
}

export default function ContactForm({ initial }) {
  const [state, formAction] = useActionState(updateContactAction, { ok: null })

  return (
    <form action={formAction} className="card-glass flex flex-col gap-5 rounded-2xl p-6 md:p-8">
      {state.ok === true && (
        <Alert severity="success" variant="outlined">
          Saved. Public landing now reflects these values.
        </Alert>
      )}
      {state.ok === false && (
        <Alert severity="error" variant="outlined">
          {ERR_MAP[state.error] || 'Could not save.'}
        </Alert>
      )}

      <Section title="Primary contact">
        <Row>
          <TextField
            name="phone"
            label="Phone"
            defaultValue={initial?.phone || ''}
            required
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            defaultValue={initial?.email || ''}
            required
            fullWidth
            sx={textFieldSx}
          />
        </Row>
        <TextField
          name="whatsapp"
          label="WhatsApp link (e.g. https://wa.me/966...)"
          defaultValue={initial?.whatsapp || ''}
          required
          fullWidth
          sx={textFieldSx}
        />
      </Section>

      <Section title="Address">
        <Row>
          <TextField
            name="address_ar"
            label="Address (Arabic)"
            defaultValue={initial?.address_ar || ''}
            fullWidth
            multiline
            minRows={2}
            sx={textFieldSx}
          />
          <TextField
            name="address_en"
            label="Address (English)"
            defaultValue={initial?.address_en || ''}
            fullWidth
            multiline
            minRows={2}
            sx={textFieldSx}
          />
        </Row>
      </Section>

      <Section title="Social links (leave blank to hide)">
        <Row>
          <TextField
            name="instagram"
            label="Instagram URL"
            defaultValue={initial?.instagram || ''}
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            name="twitter"
            label="X / Twitter URL"
            defaultValue={initial?.twitter || ''}
            fullWidth
            sx={textFieldSx}
          />
        </Row>
        <Row>
          <TextField
            name="linkedin"
            label="LinkedIn URL"
            defaultValue={initial?.linkedin || ''}
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            name="tiktok"
            label="TikTok URL"
            defaultValue={initial?.tiktok || ''}
            fullWidth
            sx={textFieldSx}
          />
        </Row>
      </Section>

      <div className="flex justify-end pt-2">
        <SaveButton />
      </div>
    </form>
  )
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slook-purple">
        {title}
      </h2>
      {children}
    </div>
  )
}

function Row({ children }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
}
