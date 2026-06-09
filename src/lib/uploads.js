import 'server-only'
import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'

/**
 * Upload helpers for PDF submissions.
 *
 *  - Files live under  data/uploads/  (same volume as SQLite)
 *  - Each file gets a UUID name to avoid collisions and to prevent leaking
 *    the user's original filename in URLs.
 *  - Original filename is kept in the DB column `pdf_original_name`.
 *
 * The PDF download API (/api/submissions/[id]/pdf) is the only public-facing
 * code path that should hand bytes to a client — never serve from /uploads
 * directly.
 */

export const MAX_PDF_BYTES = 10 * 1024 * 1024 // 10 MB
const PDF_MAGIC = Buffer.from('%PDF-', 'utf8') // first 5 bytes of any PDF

function dataRoot() {
  // Same root the DB module uses
  return process.env.DB_PATH
    ? path.dirname(process.env.DB_PATH)
    : path.join(process.cwd(), 'data')
}

function uploadsDir() {
  return path.join(dataRoot(), 'uploads')
}

export function resolveUploadAbsolutePath(relativePath) {
  // Disallow `..` traversal — the relative path MUST stay under data/uploads/
  const root = uploadsDir()
  const abs = path.join(root, path.basename(relativePath))
  if (!abs.startsWith(root)) {
    throw new Error('Invalid upload path')
  }
  return abs
}

/**
 * Validate + save a PDF File (the kind you get from FormData in a Server Action).
 * Returns { relativePath, originalName, size }.
 * Throws an Error with .code set to one of:
 *   'no_file' | 'too_large' | 'bad_mime' | 'bad_signature'
 */
export async function saveUploadedPdf(file) {
  if (!file || typeof file === 'string' || !file.size) {
    const err = new Error('No file provided')
    err.code = 'no_file'
    throw err
  }
  if (file.size > MAX_PDF_BYTES) {
    const err = new Error('File too large')
    err.code = 'too_large'
    throw err
  }
  // MIME header (can lie, but a fast first gate)
  if (file.type && file.type !== 'application/pdf') {
    const err = new Error('Only PDF files are allowed')
    err.code = 'bad_mime'
    throw err
  }

  // Read into buffer + verify magic bytes (%PDF-)
  const arrayBuf = await file.arrayBuffer()
  const buf = Buffer.from(arrayBuf)
  if (buf.length < 5 || !buf.subarray(0, 5).equals(PDF_MAGIC)) {
    const err = new Error('File is not a real PDF')
    err.code = 'bad_signature'
    throw err
  }

  // Ensure target dir
  const dir = uploadsDir()
  fs.mkdirSync(dir, { recursive: true })

  // Write with a UUID name
  const id = randomUUID()
  const filename = `${id}.pdf`
  const absPath = path.join(dir, filename)
  await fs.promises.writeFile(absPath, buf)

  return {
    relativePath: path.posix.join('uploads', filename),
    originalName: typeof file.name === 'string' ? file.name : null,
    size: buf.length,
  }
}

export async function deleteUploadIfExists(relativePath) {
  if (!relativePath) return
  try {
    await fs.promises.unlink(resolveUploadAbsolutePath(relativePath))
  } catch {
    // best-effort cleanup
  }
}
