import { requireAdmin } from '@/lib/auth'
import { listAppUsers } from '@/lib/db'
import UserRow from './user-row'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  await requireAdmin()
  const users = listAppUsers({ limit: 500 })

  const active = users.filter((u) => u.is_active).length
  const disabled = users.length - active

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Portal users</h1>
          <p className="mt-1 text-sm text-white/55">
            Accounts created via <code className="text-white/80">/portal/signup</code>.
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <Stat label="Total" value={users.length} color="#7240ED" />
          <Stat label="Active" value={active} color="#0065F7" />
          <Stat label="Disabled" value={disabled} color="#666" />
        </div>
      </div>

      {users.length === 0 ? (
        <div className="card-glass rounded-2xl p-10 text-center text-white/55">
          No portal users yet.
        </div>
      ) : (
        <div className="card-glass overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Submissions</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow key={u.id} user={u} />
              ))}
            </tbody>
          </table>
        </div>
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
