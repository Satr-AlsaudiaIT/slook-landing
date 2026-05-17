import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import LoginForm from './login-form'

export const metadata = {
  title: 'Sign in · Slook Admin',
}

export default async function LoginPage() {
  // If already signed in, skip the form
  const session = await getSession()
  if (session.userId) redirect('/admin/messages')

  return (
    <div className="flex min-h-screen items-center justify-center bg-slook-gradient px-4">
      <div className="card-glass w-full max-w-sm rounded-2xl p-8">
        <div className="mb-6 text-center">
          <div className="font-display text-2xl font-semibold text-white">
            Slook Admin
          </div>
          <p className="mt-1 text-sm text-white/55">Sign in to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
