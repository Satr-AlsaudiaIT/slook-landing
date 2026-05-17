import { requireAdmin } from '@/lib/auth'
import { listMessages } from '@/lib/db'
import MessageRow from './message-row'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  await requireAdmin()
  const messages = listMessages({ limit: 200 })

  const counts = messages.reduce(
    (acc, m) => ((acc[m.status] = (acc[m.status] || 0) + 1), acc),
    {}
  )

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Messages</h1>
          <p className="mt-1 text-sm text-white/55">
            Submissions from the landing page contact form.
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <Stat label="New" value={counts.new || 0} color="#7240ED" />
          <Stat label="Replied" value={counts.replied || 0} color="#0065F7" />
          <Stat label="Archived" value={counts.archived || 0} color="#666" />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="card-glass rounded-2xl p-10 text-center text-white/55">
          No messages yet. Submissions from <code className="text-white/80">/</code>{' '}
          land here.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      <span className="text-white/55">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}
