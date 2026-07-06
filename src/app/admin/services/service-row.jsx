import { useState } from 'react'
import { updateServiceAction } from '../actions'

export default function ServiceRow({
  service,
  editing,
  setEditing,
  stopEditing,
}) {
  const isActive = !!service.is_active
  const [form, setForm] = useState({
    title_en: service.title_en,
    title_ar: service.title_ar,
    body_en: service.body_en,
    body_ar: service.body_ar,
    category: service.category,
    icon_slug: service.icon_slug,
  })

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveAction = () => {

  }

  const deleteAction = () => {

  }

  return (
    <tr className="border-t border-white/5 hover:bg-white/[0.02]">
      <td className="px-4 py-3 text-white/75 capitalize">
        {service.sort_order}
      </td>
      <td className="px-4 py-3 text-white/75">
        {editing ? (
          <input
            className="max-w-28 rounded border border-white/15 bg-white/5 px-2 py-1 text-white"
            value={form.title_en}
            onChange={(e) => handleChange('title_en', e.target.value)}
          />
        ) : (
          service.title_en
        )}
      </td>
      <td className="px-4 py-3 text-white/75 w-full">
        {editing ? (
          <input
            className="max-w-28 rounded border border-white/15 bg-white/5 px-2 py-1 text-white"
            value={form.title_ar}
            onChange={(e) => handleChange('title_ar', e.target.value)}
          />
        ) : (
          service.title_ar
        )}
      </td>
      <td className="px-4 py-3 text-white/75 min-w-[200px]">
        {editing ? (
          <textarea
            rows={5}
            className="w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-white resize-none"
            value={form.body_en}
            onChange={(e) => handleChange('body_en', e.target.value)}
          />
        ) : (
          service.body_en
        )}
      </td>
      <td className="px-4 py-3 text-white/75 min-w-[200px]">
        {editing ? (
          <textarea
            rows={5}
            className="w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-white resize-none"
            value={form.body_ar}
            onChange={(e) => handleChange('body_ar', e.target.value)}
          />
        ) : (
          service.body_ar
        )}
      </td>
      <td className="px-4 py-3 text-white/75 capitalize">
        {editing ? (
          <select
            className="max-w-24 rounded border border-white/15 bg-[#1b1b1b] px-2 py-1 text-white"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="digital">Digital</option>
            <option value="offline">Offline</option>
            <option value="training">Training</option>
          </select>
        ) : (
          service.category
        )}
      </td>
      <td className="px-4 py-3 text-white/75 capitalize">
        {editing ? (
          <select
            className="max-w-24 rounded border border-white/15 bg-[#1b1b1b] px-2 py-1 text-white"
            value={form.icon_slug}
            onChange={(e) => handleChange('icon_slug', e.target.value)}
          >
            <option value="store">Store</option>
            <option value="megaphone">Megaphone</option>
            <option value="share2">Share2</option>
            <option value="globe">Globe</option>
            <option value="heart">Heart</option>
            <option value="mic">Mic</option>
            <option value="palette">Palette</option>
            <option value="filetext">FileText</option>
            <option value="camera">Camera</option>
            <option value="barchart2">BarChart2</option>
            <option value="tv">TV</option>
            <option value="partypopper">PartyPopper</option>
            <option value="gift">Gift</option>
            <option value="mappin">MapPin</option>
            <option value="graduationcap">GraduationCap</option>
            <option value="briefcase">Briefcase</option>
          </select>
        ) : (
          service.icon_slug
        )}
      </td>
      {/* TODO: Add action and change to radio button (swtich) */}
      <td className="px-4 py-3 text-end">
              <form action={()=>{}} className="inline-block">
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
      <td className="px-4 py-3 text-end">
        <div className="flex flex-col gap-2">

          {editing ? (
            <div className="flex flex-col gap-2">
              <button
                className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs text-green-300 transition-colors hover:border-green-500/60 hover:bg-green-500/20"
                onClick={async () => {
                  await updateServiceAction({
                    id: service.id,
                    ...form,
                    sort_order: service.sort_order,
                    category: form.category,
                    icon_slug: form.icon_slug,
                    is_active: service.is_active,
                  })
                  stopEditing()
                }}
              >
                Save
              </button>
              <button
                className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/30"
                onClick={() => {
                  setForm({
                    title_en: service.title_en,
                    title_ar: service.title_ar,
                    body_en: service.body_en,
                    body_ar: service.body_ar,
                    category: service.category,
                    icon_slug: service.icon_slug,
                  })
                  stopEditing()
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/30"
                onClick={setEditing}
              >
                Edit
              </button>
              {/* TODO: Add action */}
              <button
                className={
                  'rounded-md border px-3 py-1.5 text-xs transition-colors ' +
                  (isActive
                    ? 'border-red-500/30 bg-red-500/5 text-red-300 hover:border-red-500/60 hover:bg-red-500/10'
                    : 'border-slook-blue/40 bg-slook-blue/10 text-slook-blue hover:border-slook-blue')
                }
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
