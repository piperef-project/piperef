-- Pipe Ref correction log
CREATE TABLE IF NOT EXISTS corrections (
  ref        TEXT PRIMARY KEY,
  type       TEXT NOT NULL DEFAULT 'Correction',   -- Correction | Question | New tool idea
  page       TEXT,                                 -- tab key, e.g. flange
  item       TEXT,                                 -- short public description of what is affected
  std_ref    TEXT,                                 -- standard, table and size given by the sender
  message    TEXT,                                 -- private
  name       TEXT,                                 -- private
  email      TEXT,                                 -- private
  submitted  TEXT NOT NULL,                        -- YYYY-MM-DD
  status     TEXT NOT NULL DEFAULT 'submitted',    -- submitted | review | verified | closed
  corrected  TEXT,                                 -- date of correction
  ver_from   TEXT,                                 -- data version the sender was looking at
  ver_to     TEXT,                                 -- data version after the fix
  summary    TEXT,                                 -- public outcome
  ip_hash    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_corr_status ON corrections(status);
CREATE INDEX IF NOT EXISTS idx_corr_ip ON corrections(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS history (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  ref    TEXT NOT NULL REFERENCES corrections(ref) ON DELETE CASCADE,
  date   TEXT NOT NULL,
  status TEXT NOT NULL,
  note   TEXT
);
CREATE INDEX IF NOT EXISTS idx_hist_ref ON history(ref);
CREATE TABLE IF NOT EXISTS datasets (
  key  TEXT PRIMARY KEY,
  v    TEXT NOT NULL,
  date TEXT NOT NULL
);
INSERT OR IGNORE INTO datasets (key, v, date) VALUES
('size','1.0','2026-11-15'),
('pipe','1.0','2026-11-15'),
('flange','1.0','2026-11-15'),
('fj','1.0','2026-11-15'),
('bw','1.0','2026-11-15'),
('sw','1.0','2026-11-15'),
('gasket','1.0','2026-11-15'),
('blind','1.0','2026-11-15'),
('pt','1.0','2026-11-15'),
('span','1.0','2026-11-15'),
('sup','1.0','2026-11-15'),
('spc','1.0','2026-11-15'),
('vdim','1.0','2026-11-15'),
('cv','1.0','2026-11-15'),
('valve','1.0','2026-11-15'),
('rack','1.0','2026-11-15'),
('exp','1.0','2026-11-15'),
('acc','1.0','2026-11-15'),
('shoe','1.0','2026-11-15'),
('eqck','1.0','2026-11-15'),
('calc','1.0','2026-11-15');
