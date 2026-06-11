'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { TextField, Button, Alert } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { loginAction } from '../actions'

const ERR_MAP = {
  missing_fields: 'Username and password are required.',
  invalid_credentials: 'Invalid username or password.',
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

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      disabled={pending}
      endIcon={<LoginIcon />}
      sx={{
        background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
        boxShadow: '0 0 24px rgba(114, 64, 237, 0.4)',
        '&.Mui-disabled': { opacity: 0.7, color: '#fff' },
      }}
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { ok: null })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <Alert severity="error" variant="outlined">
          {ERR_MAP[state.error] || 'Sign-in failed'}
        </Alert>
      )}
      <TextField
        name="username"
        label="Username"
        autoComplete="username"
        required
        fullWidth
        autoFocus
        sx={textFieldSx}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
        fullWidth
        sx={textFieldSx}
      />
      <SubmitButton />
    </form>
  )
}
