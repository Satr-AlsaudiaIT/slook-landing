'use client'

import { setUserActiveAction } from '../actions'

export default function UserRow({ user }) {
  const joined = new Date(user.created_at + 'Z').toLocaleDateString()
  const isActive = !!user.is_active

  return (
    <tr className="border-t border-white/5 hover:bg-white/[0.02]">
      <td className="px-4 py-3 font-medium text-white">{user.name}</td>
      <td className="px-4 py-3 text-white/75">
        <a href={`mailto:${user.email}`} className="hover:text-white">
          {user.email}
        </a>
      </td>
      <td className="px-4 py-3 text-white/65">{user.submission_count}</td>
      <td className="px-4 py-3 text-white/65">{joined}</td>
      <td className="px-4 py-3">
        {isActive ? (
          <span className="rounded-full bg-slook-blue/15 px-2.5 py-0.5 text-[11px] font-medium text-slook-blue">
            Active
          </span>
        ) : (
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/45">
            Disabled
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-end">
        <form action={setUserActiveAction} className="inline-block">
          <input type="hidden" name="id" value={user.id} />
          <input type="hidden" name="isActive" value={isActive ? '0' : '1'} />
          <button
            type="submit"
            className={
              'rounded-md border px-3 py-1.5 text-xs transition-colors ' +
              (isActive
                ? 'border-red-500/30 bg-red-500/5 text-red-300 hover:border-red-500/60 hover:bg-red-500/10'
                : 'border-slook-blue/40 bg-slook-blue/10 text-slook-blue hover:border-slook-blue')
            }
          >
            {isActive ? 'Disable' : 'Re-enable'}
          </button>
        </form>
      </td>
    </tr>
  )
}
