import fs from 'node:fs'
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getApplication } from '@/lib/db'
import { resolveUploadAbsolutePath } from '@/lib/uploads'

/**
 * GET /api/applications/[id]/photo
 *
 * Streams the profile photo for a single application. Admin session required.
 * (Photos are mildly sensitive PII — never serve from /uploads directly.)
 */
export async function GET(_req, { params }) {
  const { id: rawId } = await params
  const id = Number(rawId)
  if (!Number.isInteger(id) || id <= 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  const adminSession = await getSession()
  if (!adminSession.userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const application = getApplication(id)
  if (!application) {
    return new NextResponse('Not found', { status: 404 })
  }

  let absolutePath
  try {
    absolutePath = resolveUploadAbsolutePath(application.photo_path)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  let buf
  try {
    buf = await fs.promises.readFile(absolutePath)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': application.photo_mime || 'application/octet-stream',
      'Content-Length': String(buf.length),
      'Cache-Control': 'private, no-store',
    },
  })
}
