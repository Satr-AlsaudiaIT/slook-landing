import { requireAdmin } from '@/lib/auth'
import { getContactInfo } from '@/lib/db'
import ContactForm from './contact-form'

export const dynamic = 'force-dynamic'

export default async function AdminContactPage() {
  await requireAdmin()
  const info = getContactInfo()

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Contact info</h1>
        <p className="mt-1 text-sm text-white/55">
          These values appear on the public landing page (Navbar, Contact
          section, Footer). Changes are picked up immediately.
        </p>
      </div>
      <ContactForm initial={info} />
    </div>
  )
}
