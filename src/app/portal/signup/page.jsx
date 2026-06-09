import { redirect } from 'next/navigation'
import { getUserSession } from '@/lib/auth'
import SignupForm from './signup-form'

export const metadata = { title: 'Sign up · Slook Portal' }

export default async function SignupPage() {
  // If they already have a session, skip the form
  const session = await getUserSession()
  if (session.userId) redirect('/portal/dashboard')

  return (
    <div className="mx-auto w-full max-w-md">
      <SignupForm />
    </div>
  )
}
