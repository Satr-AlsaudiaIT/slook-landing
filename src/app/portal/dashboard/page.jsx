import { requireUser } from '@/lib/auth'
import { getAppUserById, listSubmissionsByUser } from '@/lib/db'
import DashboardClient from './dashboard-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await requireUser()
  const user = getAppUserById(session.userId)
  const submissions = listSubmissionsByUser(session.userId)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <DashboardClient user={user} submissions={submissions} />
    </div>
  )
}
