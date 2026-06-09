import fs from 'node:fs'
import { NextResponse } from 'next/server'
import { getSession, getUserSession } from '@/lib/auth'
import { getSubmission } from '@/lib/db'
import { resolveUploadAbsolutePath } from '@/lib/uploads'

/**
 * GET /api/submissions/[id]/pdf
 *
 * Streams the PDF for a single submission. Access is allowed when:
 *   • requester has a valid admin session, OR
 *   • requester is the owner of the submission (matching app_user id)
 *
 * Anyone else gets 401/404 — we never reveal whether the row exists.
 */
export async function GET(_req, { params }) {
  const { id: rawId } = await params
  const id = Number(rawId)
  if (!Number.isInteger(id) || id <= 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  const submission = getSubmission(id)
  if (!submission) {
    return new NextResponse('Not found', { status: 404 })
  }

  // --- Authorization
  const adminSession = await getSession()
  const userSession = await getUserSession()

  const isAdmin = !!adminSession.userId
  const isOwner = userSession.userId === submission.user_id

  if (!isAdmin && !isOwner) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // --- Read + stream the file
  let absolutePath
  try {
    absolutePath = resolveUploadAbsolutePath(submission.pdf_path)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  let buf
  try {
    buf = await fs.promises.readFile(absolutePath)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  const filename = submission.pdf_original_name || `submission-${id}.pdf`
  // RFC 5987-style filename* for non-ASCII safe headers
  const asciiName = filename.replace(/[^\x20-\x7E]+/g, '_')
  const encodedName = encodeURIComponent(filename)

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(buf.length),
      'Content-Disposition': `inline; filename="${asciiName}"; filename*=UTF-8''${encodedName}`,
      'Cache-Control': 'private, no-store',
    },
  })
}
