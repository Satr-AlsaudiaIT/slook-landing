import { useState } from 'react'
import { updateServiceAction, deleteServiceAction, setServiceActiveAction } from '../actions'
import { Popconfirm, Switch, Input, Select } from 'antd'
import icons from '../../../lib/iconsList.json';

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

  const cancelAction = () => {
    setForm({
      title_en: service.title_en,
      title_ar: service.title_ar,
      body_en: service.body_en,
      body_ar: service.body_ar,
      category: service.category,
      icon_slug: service.icon_slug,
    })
    stopEditing()
  }

  const saveAction = async () => {
    await updateServiceAction({
      id: service.id,
      ...form,
      sort_order: service.sort_order,
      category: form.category,
      icon_slug: form.icon_slug,
      is_active: service.is_active,
    })
    stopEditing()
  }

  const deleteAction = async () => {
    await deleteServiceAction({ id: service.id })
  }

  const switchAction = async () => {
    await setServiceActiveAction(service.id)
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
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="admin-textarea"
            value={form.body_en}
            onChange={(e) => handleChange('body_en', e.target.value)}
          />
        ) : (
          service.body_en
        )}
      </td>
      <td className="px-4 py-3 text-white/75 min-w-[200px]">
        {editing ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="admin-textarea"
            value={form.body_ar}
            onChange={(e) => handleChange('body_ar', e.target.value)}
          />
        ) : (
          service.body_ar
        )}
      </td>
      <td className="px-4 py-3 text-white/75 capitalize">
        {editing ? (
          <Select
            value={form.category}
            className="min-w-32"
            onChange={(value) => handleChange('category', value)}
            options={[
              { value: 'digital', label: 'Digital' },
              { value: 'offline', label: 'Offline' },
              { value: 'training', label: 'Training' },
            ]}
          />
        ) : (
          service.category
        )}
      </td>
      <td className="px-4 py-3 text-white/75 capitalize">
        {editing ? (
          // TODO: use native for option jumping?
          <Select
            value={form.icon_slug}
            className="min-w-36"
            onChange={(value) => handleChange('icon_slug', value)}
            options={icons.map((icon) => ({
              value: icon,
              label: icon,
            }))}
          />
        ) : (
          service.icon_slug
        )}
      </td>
      <td className="px-4 py-3 text-end">
        <Switch checked={isActive} onChange={switchAction} />
      </td>
      <td className="px-4 py-3 text-end">
        <div className="flex flex-col gap-2">
          {editing ? (
            <div className="flex flex-col gap-2">
              <button
                className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs text-green-300 transition-colors hover:border-green-500/60 hover:bg-green-500/20"
                onClick={saveAction}
              >
                Save
              </button>
              <button
                className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/30"
                onClick={cancelAction}
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
              <Popconfirm
                title="Are you sure you want to delete this service?"
                onConfirm={deleteAction}
                okText="Yes"
                cancelText="No"
                // placement={lang === 'ar' ? 'topRight' : 'topLeft'}
                placement="topLeft"
                styles={{
                  root: { direction: 'ltr' }
                }}
                classNames={{
                  root: 'slook-popconfirm',
                }}
              >
                <button
                  className={
                    'rounded-md border px-3 py-1.5 text-xs transition-colors border-red-500/30 bg-red-500/5 text-red-300 hover:border-red-500/60 hover:bg-red-500/10'
                  }
                >
                  Delete
                </button>
              </Popconfirm>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
