import { requireAdmin } from '@/lib/auth'
import { listSubmissionsForAdmin } from '@/lib/db'
import SubmissionCard from './submission-card'

export const dynamic = 'force-dynamic'

export default async function AdminSubmissionsPage() {
  await requireAdmin()
  const submissions = listSubmissionsForAdmin({ limit: 500 })

  const counts = submissions.reduce(
    (acc, s) => ((acc[s.status] = (acc[s.status] || 0) + 1), acc),
    {}
  )

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Submissions</h1>
          <p className="mt-1 text-sm text-white/55">
            Files uploaded by portal users (<code className="text-white/80">/portal</code>).
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <Stat label="New"      value={counts.new || 0}      color="#7240ED" />
          <Stat label="Reviewed" value={counts.reviewed || 0} color="#0065F7" />
          <Stat label="Archived" value={counts.archived || 0} color="#666" />
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="card-glass rounded-2xl p-10 text-center text-white/55">
          No submissions yet. Once a portal user uploads via{' '}
          <code className="text-white/80">/portal/dashboard</code>, they land here.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {submissions.map((s) => (
            <SubmissionCard key={s.id} submission={s} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="text-white/55">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}
