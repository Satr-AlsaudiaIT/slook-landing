import 'server-only'
import path from 'node:path'
import fs from 'node:fs'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

/**
 * SQLite database helper.
 *
 * - File lives at ./data/slook.db (gitignored).
 * - Migrations run on first import (idempotent CREATE TABLE IF NOT EXISTS).
 * - On first boot, seeds:
 *     • one admin user from ADMIN_USERNAME / ADMIN_PASSWORD env vars
 *     • one contact_info row with the values from the original branding.
 *
 * Use `getDb()` everywhere — the connection is memoized per Node process.
 */

let dbInstance = null

function defaultDbPath() {
  return process.env.DB_PATH || path.join(process.cwd(), 'data', 'slook.db')
}

export function getDb() {
  if (dbInstance) return dbInstance

  const dbPath = defaultDbPath()
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  migrate(db)
  seed(db)

  dbInstance = db
  return db
}

function migrate(db) {
  db.exec(`
    -- Admin accounts (the existing admin dashboard)
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_info (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      address_ar TEXT,
      address_en TEXT,
      instagram TEXT,
      twitter TEXT,
      linkedin TEXT,
      tiktok TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      reply TEXT,
      replied_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
    CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

    -- Public portal accounts (separate from admin users above)
    CREATE TABLE IF NOT EXISTS app_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_app_users_email ON app_users(email);

    -- Submissions: name + description + PDF, one row per user submission
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      pdf_path TEXT NOT NULL,            -- relative path under data/ (e.g. uploads/xxxx.pdf)
      pdf_original_name TEXT,
      pdf_size INTEGER,
      status TEXT NOT NULL DEFAULT 'new', -- new | reviewed | archived
      admin_notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_submissions_user    ON submissions(user_id);
    CREATE INDEX IF NOT EXISTS idx_submissions_status  ON submissions(status);
    CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);

    -- Public /apply form: open to anyone, no auth needed
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      description TEXT NOT NULL,
      photo_path TEXT NOT NULL,         -- relative path under data/ (uploads/xxx.jpg)
      photo_original_name TEXT,
      photo_size INTEGER,
      photo_mime TEXT,                  -- image/jpeg | image/png | image/webp
      date_of_birth TEXT NOT NULL,      -- ISO yyyy-mm-dd
      status TEXT NOT NULL DEFAULT 'new', -- new | reviewed | archived
      admin_notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_applications_status  ON applications(status);
    CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
  `)

  // Idempotent column adds — SQLite doesn't support "ADD COLUMN IF NOT EXISTS",
  // so we check PRAGMA table_info first. Safe to run on every boot.
  addColumnIfMissing(db, 'applications', 'work_location', 'TEXT')
  addColumnIfMissing(db, 'applications', 'nationality',   'TEXT')
}

function addColumnIfMissing(db, table, column, type) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all()
  if (!cols.find((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`)
  }
}

function seed(db) {
  // Seed default admin user if no users exist
  const userExists = db.prepare('SELECT id FROM users LIMIT 1').get()
  if (!userExists) {
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'slook2026'
    const hash = bcrypt.hashSync(password, 10)
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(
      username,
      hash
    )
    // eslint-disable-next-line no-console
    console.log(`[slook] seeded admin user "${username}"`)
  }

  // Seed default contact info row
  const contactExists = db.prepare('SELECT id FROM contact_info WHERE id = 1').get()
  if (!contactExists) {
    db.prepare(
      `INSERT INTO contact_info
       (id, phone, email, whatsapp, address_ar, address_en, instagram, twitter, linkedin, tiktok)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      '+966 53 263 5789',
      'Info@slook.sa',
      'https://wa.me/966532635789',
      'جدة - حي البساتين، King of the Royal Hall',
      'Jeddah — Al Basateen Dist., King of the Royal Hall',
      'https://instagram.com/slook.sa',
      'https://twitter.com/slook_sa',
      'https://linkedin.com/company/slook',
      'https://tiktok.com/@slook.sa'
    )
    // eslint-disable-next-line no-console
    console.log('[slook] seeded default contact_info')
  }
}

// ---------- Convenience query helpers ----------

export function getContactInfo() {
  return getDb().prepare('SELECT * FROM contact_info WHERE id = 1').get()
}

export function updateContactInfo(values) {
  const fields = [
    'phone',
    'email',
    'whatsapp',
    'address_ar',
    'address_en',
    'instagram',
    'twitter',
    'linkedin',
    'tiktok',
  ]
  const setClause = fields.map((f) => `${f} = ?`).join(', ')
  const params = fields.map((f) => values[f] ?? null)
  getDb()
    .prepare(
      `UPDATE contact_info SET ${setClause}, updated_at = datetime('now') WHERE id = 1`
    )
    .run(...params)
  return getContactInfo()
}

export function createMessage({ name, email, message }) {
  const info = getDb()
    .prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)')
    .run(name, email, message)
  return info.lastInsertRowid
}

export function listMessages({ limit = 100 } = {}) {
  return getDb()
    .prepare('SELECT * FROM messages ORDER BY created_at DESC LIMIT ?')
    .all(limit)
}

export function getMessage(id) {
  return getDb().prepare('SELECT * FROM messages WHERE id = ?').get(id)
}

export function markMessageReplied(id, reply) {
  getDb()
    .prepare(
      `UPDATE messages SET reply = ?, replied_at = datetime('now'), status = 'replied' WHERE id = ?`
    )
    .run(reply, id)
}

export function archiveMessage(id) {
  getDb().prepare(`UPDATE messages SET status = 'archived' WHERE id = ?`).run(id)
}

export function deleteMessage(id) {
  getDb().prepare('DELETE FROM messages WHERE id = ?').run(id)
}

export function getUserByUsername(username) {
  return getDb().prepare('SELECT * FROM users WHERE username = ?').get(username)
}

export function getUserById(id) {
  return getDb().prepare('SELECT id, username FROM users WHERE id = ?').get(id)
}

/* ============================================================
 * Public-portal accounts (app_users table)
 * ============================================================ */

export function createAppUser({ email, name, passwordHash }) {
  const info = getDb()
    .prepare(
      `INSERT INTO app_users (email, name, password_hash) VALUES (?, ?, ?)`
    )
    .run(email, name, passwordHash)
  return Number(info.lastInsertRowid)
}

export function getAppUserByEmail(email) {
  return getDb()
    .prepare('SELECT * FROM app_users WHERE email = ?')
    .get(email)
}

export function getAppUserById(id) {
  return getDb()
    .prepare('SELECT id, email, name, is_active, created_at FROM app_users WHERE id = ?')
    .get(id)
}

export function listAppUsers({ limit = 200 } = {}) {
  return getDb()
    .prepare(
      `SELECT u.id, u.email, u.name, u.is_active, u.created_at,
              (SELECT COUNT(*) FROM submissions s WHERE s.user_id = u.id) AS submission_count
       FROM app_users u
       ORDER BY u.created_at DESC
       LIMIT ?`
    )
    .all(limit)
}

export function setAppUserActive(id, isActive) {
  getDb()
    .prepare(`UPDATE app_users SET is_active = ? WHERE id = ?`)
    .run(isActive ? 1 : 0, id)
}

/* ============================================================
 * Submissions
 * ============================================================ */

export function createSubmission({ userId, name, description, pdfPath, pdfOriginalName, pdfSize }) {
  const info = getDb()
    .prepare(
      `INSERT INTO submissions
         (user_id, name, description, pdf_path, pdf_original_name, pdf_size)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(userId, name, description, pdfPath, pdfOriginalName ?? null, pdfSize ?? null)
  return Number(info.lastInsertRowid)
}

export function getSubmission(id) {
  return getDb()
    .prepare(
      `SELECT s.*, u.email AS user_email, u.name AS user_name
       FROM submissions s
       JOIN app_users u ON u.id = s.user_id
       WHERE s.id = ?`
    )
    .get(id)
}

export function listSubmissionsByUser(userId) {
  return getDb()
    .prepare(
      `SELECT * FROM submissions WHERE user_id = ? ORDER BY created_at DESC`
    )
    .all(userId)
}

export function listSubmissionsForAdmin({ limit = 200 } = {}) {
  return getDb()
    .prepare(
      `SELECT s.*, u.email AS user_email, u.name AS user_name
       FROM submissions s
       JOIN app_users u ON u.id = s.user_id
       ORDER BY s.created_at DESC
       LIMIT ?`
    )
    .all(limit)
}

export function updateSubmissionStatus(id, status) {
  getDb()
    .prepare(`UPDATE submissions SET status = ? WHERE id = ?`)
    .run(status, id)
}

export function setSubmissionAdminNotes(id, notes) {
  getDb()
    .prepare(`UPDATE submissions SET admin_notes = ? WHERE id = ?`)
    .run(notes ?? null, id)
}

export function deleteSubmission(id) {
  // Returns the row first so the caller can clean up the PDF file
  const row = getDb()
    .prepare('SELECT pdf_path FROM submissions WHERE id = ?')
    .get(id)
  getDb().prepare('DELETE FROM submissions WHERE id = ?').run(id)
  return row
}

/* ============================================================
 * Applications (/apply public form)
 * ============================================================ */

export function createApplication({
  fullName,
  email,
  phone,
  description,
  photoPath,
  photoOriginalName,
  photoSize,
  photoMime,
  dateOfBirth,
  workLocation,
  nationality,
}) {
  const info = getDb()
    .prepare(
      `INSERT INTO applications
         (full_name, email, phone, description, photo_path,
          photo_original_name, photo_size, photo_mime, date_of_birth,
          work_location, nationality)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      fullName,
      email,
      phone,
      description,
      photoPath,
      photoOriginalName ?? null,
      photoSize ?? null,
      photoMime ?? null,
      dateOfBirth,
      workLocation ?? null,
      nationality ?? null
    )
  return Number(info.lastInsertRowid)
}

export function getApplication(id) {
  return getDb().prepare('SELECT * FROM applications WHERE id = ?').get(id)
}

export function listApplications({ limit = 200 } = {}) {
  return getDb()
    .prepare(
      `SELECT * FROM applications ORDER BY created_at DESC LIMIT ?`
    )
    .all(limit)
}

export function updateApplicationStatus(id, status) {
  getDb()
    .prepare(`UPDATE applications SET status = ? WHERE id = ?`)
    .run(status, id)
}

export function setApplicationAdminNotes(id, notes) {
  getDb()
    .prepare(`UPDATE applications SET admin_notes = ? WHERE id = ?`)
    .run(notes ?? null, id)
}

export function deleteApplication(id) {
  // Returns the row first so the caller can clean up the photo file
  const row = getDb()
    .prepare('SELECT photo_path FROM applications WHERE id = ?')
    .get(id)
  getDb().prepare('DELETE FROM applications WHERE id = ?').run(id)
  return row
}
