import { redirect } from 'next/navigation'
import { getUserSession } from '@/lib/auth'
import SigninForm from './signin-form'

export const metadata = { title: 'Sign in · Slook Portal' }

export default async function SigninPage() {
  const session = await getUserSession()
  if (session.userId) redirect('/portal/dashboard')

  return (
    <div className="mx-auto w-full max-w-md">
      <SigninForm />
    </div>
  )
}
