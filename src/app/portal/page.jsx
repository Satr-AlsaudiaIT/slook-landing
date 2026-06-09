import { redirect } from 'next/navigation'
import { getUserSession } from '@/lib/auth'

export default async function PortalIndex() {
  const session = await getUserSession()
  redirect(session.userId ? '/portal/dashboard' : '/portal/signin')
}
