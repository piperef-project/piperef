-- Pipe Ref community: discussions (threads + replies) and site stories, all moderated
CREATE TABLE IF NOT EXISTS threads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  topic       TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  name        TEXT NOT NULL,
  role        TEXT,
  email       TEXT,                                -- private
  status      TEXT NOT NULL DEFAULT 'pending',     -- pending | approved | rejected
  replies     INTEGER NOT NULL DEFAULT 0,          -- approved replies
  last_at     TEXT,
  ip_hash     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  approved_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_thr_status ON threads(status, last_at);
CREATE INDEX IF NOT EXISTS idx_thr_ip ON threads(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS replies (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id   INTEGER NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  parent_id   INTEGER,
  body        TEXT NOT NULL,
  name        TEXT NOT NULL,
  role        TEXT,
  email       TEXT,
  status      TEXT NOT NULL DEFAULT 'pending',
  ip_hash     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  approved_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_rep_thread ON replies(thread_id, status);
CREATE INDEX IF NOT EXISTS idx_rep_ip ON replies(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS stories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  kind        TEXT NOT NULL,                       -- rework | safety | quality | other
  title       TEXT NOT NULL,
  story       TEXT NOT NULL,
  lesson      TEXT,
  name        TEXT,
  role        TEXT,
  email       TEXT,
  status      TEXT NOT NULL DEFAULT 'pending',
  ip_hash     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  approved_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_sto_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_sto_ip ON stories(ip_hash, created_at);
