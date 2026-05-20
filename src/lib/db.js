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
  `)
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
