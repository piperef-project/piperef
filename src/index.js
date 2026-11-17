/* Pipe Ref correction API and admin.
   Public  (any host):   POST /api/corrections, GET /api/log, GET /api/corrections/:ref
   Admin   (ADMIN_HOST, behind Cloudflare Access, JWT checked here too):
           GET /api/admin/corrections, POST /api/admin/corrections, PATCH /api/admin/corrections/:ref,
           DELETE /api/admin/corrections/:ref, PUT /api/admin/datasets/:key, GET /api/admin/me
   Community (all posts wait for approval):
           GET /api/forum/threads, GET /api/forum/threads/:id, POST /api/forum/threads, POST /api/forum/threads/:id/replies,
           GET /api/stories, POST /api/stories
           Admin: GET /api/admin/moderation, PATCH|DELETE /api/admin/moderation/:kind/:id
   The admin pages are static files in public/admin, served only on ADMIN_HOST. */

const STATUSES = ['submitted', 'review', 'verified', 'closed'];
const TYPES = ['Correction', 'Question', 'New tool idea'];
const ABC = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

const today = () => new Date().toISOString().slice(0, 10);
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
const isVer = s => /^\d{1,3}\.\d{1,3}$/.test(s || '');
const clip = (s, n) => (s == null ? null : String(s).trim().slice(0, n) || null);

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
}
function cors(req, env) {
  const o = req.headers.get('Origin') || '';
  const ok = (env.SITE_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!ok.includes(o)) return {};
  return { 'Access-Control-Allow-Origin': o, 'Vary': 'Origin', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Max-Age': '86400' };
}
function newRef(type) {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  const a = new Uint8Array(5); crypto.getRandomValues(a);
  const r = [...a].map(b => ABC[b % ABC.length]).join('');
  return `PR-${type === 'Question' ? 'Q' : type === 'New tool idea' ? 'I' : 'C'}-${String(d.getUTCFullYear()).slice(2)}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}-${r}`;
}
async function sha(s) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(h)].slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ---------- Cloudflare Access JWT check (defence in depth behind the Access policy) ---------- */
let CERTS = null, CERTS_AT = 0;
const b64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
async function accessUser(req, env) {
  if (env.DEV_ADMIN === 'yes') return { email: 'dev@localhost' };              // local `wrangler dev` only (set in .dev.vars)
  const tok = req.headers.get('Cf-Access-Jwt-Assertion');
  if (!tok || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || /REPLACE/.test(env.ACCESS_AUD + env.ACCESS_TEAM_DOMAIN)) return null;
  const [h, p, s] = tok.split('.'); if (!h || !p || !s) return null;
  let head, body; try { head = JSON.parse(new TextDecoder().decode(b64u(h))); body = JSON.parse(new TextDecoder().decode(b64u(p))); } catch { return null; }
  const now = Date.now() / 1000;
  if (!body.exp || body.exp < now || (body.nbf && body.nbf > now + 60)) return null;
  const aud = Array.isArray(body.aud) ? body.aud : [body.aud];
  if (!aud.includes(env.ACCESS_AUD)) return null;
  if (body.iss && body.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) return null;
  if (!CERTS || Date.now() - CERTS_AT > 3600e3) {
    const r = await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`); if (!r.ok) return null;
    CERTS = (await r.json()).keys || []; CERTS_AT = Date.now();
  }
  const jwk = CERTS.find(k => k.kid === head.kid); if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(s), new TextEncoder().encode(`${h}.${p}`));
  return ok ? { email: body.email || 'admin' } : null;
}

/* ---------- data helpers ---------- */
async function historyFor(env, refs) {
  if (!refs.length) return {};
  const out = {};
  for (let i = 0; i < refs.length; i += 90) {
    const part = refs.slice(i, i + 90);
    const { results } = await env.DB.prepare(`SELECT ref, date, status, note FROM history WHERE ref IN (${part.map(() => '?').join(',')}) ORDER BY date, id`).bind(...part).all();
    for (const h of results) (out[h.ref] ||= []).push({ date: h.date, status: h.status, note: h.note || undefined });
  }
  return out;
}
const pub = (c, hist) => ({ ref: c.ref, type: c.type, page: c.page, item: c.item, submitted: c.submitted, status: c.status, corrected: c.corrected, from: c.ver_from, to: c.ver_to, summary: c.summary, history: hist || [] });
async function datasets(env) {
  const { results } = await env.DB.prepare('SELECT key, v, date FROM datasets ORDER BY key').all();
  return Object.fromEntries(results.map(r => [r.key, { v: r.v, date: r.date }]));
}

/* ---------- public handlers ---------- */
async function submit(req, env) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  if (b.botcheck) return json({ ok: true, ref: newRef('Correction') });       // honeypot: pretend success
  const type = TYPES.includes(b.type) ? b.type : 'Correction';
  const message = clip(b.message, 4000);
  if (!message) return json({ error: 'Please write a message.' }, 400);
  const email = clip(b.email, 120);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'That email address looks incomplete.' }, 400);
  const ipHash = await sha((req.headers.get('CF-Connecting-IP') || 'x') + (env.ACCESS_AUD || 'salt'));
  const recent = await env.DB.prepare(`SELECT COUNT(*) AS n FROM corrections WHERE ip_hash = ? AND created_at > datetime('now','-10 minutes')`).bind(ipHash).first();
  if (recent && recent.n >= 5) return json({ error: 'Too many messages in a short time. Please try again in a few minutes.' }, 429);
  const page = clip(b.page, 30);
  let verFrom = null;
  if (page) { const d = await env.DB.prepare('SELECT v FROM datasets WHERE key = ?').bind(page).first(); if (d) verFrom = d.v; }
  let ref = newRef(type);
  for (let i = 0; i < 3; i++) {
    try {
      await env.DB.batch([
        env.DB.prepare(`INSERT INTO corrections (ref, type, page, item, std_ref, message, name, email, submitted, status, ver_from, ip_hash) VALUES (?,?,?,?,?,?,?,?,?,'submitted',?,?)`)
          .bind(ref, type, page, clip(b.item, 160), clip(b.std_ref, 160), message, clip(b.name, 80), email, today(), verFrom, ipHash),
        env.DB.prepare(`INSERT INTO history (ref, date, status) VALUES (?,?, 'submitted')`).bind(ref, today())
      ]);
      return json({ ok: true, ref, submitted: today(), data_version: verFrom });
    } catch (e) { if (!/UNIQUE/i.test(String(e))) throw e; ref = newRef(type); }
  }
  return json({ error: 'Could not save. Please try again.' }, 500);
}
async function log(env) {
  const { results } = await env.DB.prepare(`SELECT * FROM corrections WHERE type = 'Correction' AND status != 'submitted' ORDER BY submitted DESC, created_at DESC LIMIT 500`).all();
  const h = await historyFor(env, results.map(r => r.ref));
  const last = await env.DB.prepare('SELECT MAX(date) AS d FROM history').first();
  return json({ updated: (last && last.d) || today(), datasets: await datasets(env), items: results.map(r => pub(r, h[r.ref])) }, 200, { 'cache-control': 'public, max-age=60' });
}
async function one(env, ref) {
  const r = await env.DB.prepare('SELECT * FROM corrections WHERE ref = ?').bind(ref.toUpperCase()).first();
  if (!r) return json({ error: 'Not found' }, 404);
  const h = await historyFor(env, [r.ref]);
  return json(pub(r, h[r.ref]));
}


/* ---------- community: discussions and stories (moderated) ---------- */
const TOPICS = ['general', 'layout', 'modelling', 'materials', 'stress', 'site', 'careers'];
const KINDS = ['rework', 'safety', 'quality', 'other'];
const MOD = ['pending', 'approved', 'rejected'];
const links = s => (String(s || '').match(/https?:\/\//gi) || []).length;
async function ipOf(req, env) { return sha((req.headers.get('CF-Connecting-IP') || 'x') + (env.ACCESS_AUD || 'salt')); }
async function tooMany(env, ip) {
  const q = t => env.DB.prepare(`SELECT COUNT(*) AS n FROM ${t} WHERE ip_hash = ? AND created_at > datetime('now','-10 minutes')`).bind(ip).first();
  const [a, b, c] = await Promise.all([q('threads'), q('replies'), q('stories')]);
  return (a.n + b.n + c.n) >= 5;
}
function postCheck(b, need) {
  if (b.botcheck) return 'bot';
  if (!b.consent) return 'Please confirm the post has no company, client, project or personal names.';
  for (const [k, min, max, lbl] of need) { const v = String(b[k] || '').trim(); if (v.length < min) return `${lbl} is too short.`; if (v.length > max) return `${lbl} is too long.`; }
  const all = need.map(n => b[n[0]]).join(' ');
  if (links(all) > 2) return 'Please include at most two links.';
  const em = clip(b.email, 120); if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return 'That email address looks incomplete.';
  return null;
}
const pubT = t => ({ id: t.id, topic: t.topic, title: t.title, body: t.body, name: t.name, role: t.role, date: (t.approved_at || t.created_at).slice(0, 10), replies: t.replies, last: (t.last_at || t.approved_at || t.created_at).slice(0, 10) });
const pubR = r => ({ id: r.id, parent: r.parent_id, body: r.body, name: r.name, role: r.role, date: (r.approved_at || r.created_at).slice(0, 10) });
async function threadsList(env, url) {
  const t = url.searchParams.get('topic');
  const q = TOPICS.includes(t) ? env.DB.prepare(`SELECT * FROM threads WHERE status='approved' AND topic=? ORDER BY COALESCE(last_at, approved_at) DESC LIMIT 300`).bind(t)
    : env.DB.prepare(`SELECT * FROM threads WHERE status='approved' ORDER BY COALESCE(last_at, approved_at) DESC LIMIT 300`);
  const { results } = await q.all();
  return json({ items: results.map(r => { const p = pubT(r); p.body = p.body.slice(0, 220); return p; }) }, 200, { 'cache-control': 'public, max-age=30' });
}
async function threadOne(env, id) {
  const t = await env.DB.prepare(`SELECT * FROM threads WHERE id=? AND status='approved'`).bind(id).first();
  if (!t) return json({ error: 'Not found' }, 404);
  const { results } = await env.DB.prepare(`SELECT * FROM replies WHERE thread_id=? AND status='approved' ORDER BY id`).bind(id).all();
  return json({ thread: pubT(t), replies: results.map(pubR) }, 200, { 'cache-control': 'public, max-age=30' });
}
async function threadNew(req, env) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const e = postCheck(b, [['title', 8, 160, 'Title'], ['body', 20, 6000, 'Post'], ['name', 2, 60, 'Display name']]);
  if (e === 'bot') return json({ ok: true }); if (e) return json({ error: e }, 400);
  const ip = await ipOf(req, env); if (await tooMany(env, ip)) return json({ error: 'Too many posts in a short time. Please try again in a few minutes.' }, 429);
  const topic = TOPICS.includes(b.topic) ? b.topic : 'general';
  const r = await env.DB.prepare(`INSERT INTO threads (topic, title, body, name, role, email, ip_hash) VALUES (?,?,?,?,?,?,?)`)
    .bind(topic, clip(b.title, 160), clip(b.body, 6000), clip(b.name, 60), clip(b.role, 60), clip(b.email, 120), ip).run();
  return json({ ok: true, id: r.meta.last_row_id, status: 'pending' });
}
async function replyNew(req, env, id) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const e = postCheck(b, [['body', 5, 4000, 'Reply'], ['name', 2, 60, 'Display name']]);
  if (e === 'bot') return json({ ok: true }); if (e) return json({ error: e }, 400);
  const t = await env.DB.prepare(`SELECT id FROM threads WHERE id=? AND status='approved'`).bind(id).first();
  if (!t) return json({ error: 'That discussion was not found.' }, 404);
  const ip = await ipOf(req, env); if (await tooMany(env, ip)) return json({ error: 'Too many posts in a short time. Please try again in a few minutes.' }, 429);
  let parent = parseInt(b.parent, 10); if (!(parent > 0)) parent = null;
  if (parent) { const p = await env.DB.prepare(`SELECT id FROM replies WHERE id=? AND thread_id=?`).bind(parent, id).first(); if (!p) parent = null; }
  const r = await env.DB.prepare(`INSERT INTO replies (thread_id, parent_id, body, name, role, email, ip_hash) VALUES (?,?,?,?,?,?,?)`)
    .bind(id, parent, clip(b.body, 4000), clip(b.name, 60), clip(b.role, 60), clip(b.email, 120), ip).run();
  return json({ ok: true, id: r.meta.last_row_id, status: 'pending' });
}
async function storiesList(env) {
  const { results } = await env.DB.prepare(`SELECT * FROM stories WHERE status='approved' ORDER BY approved_at DESC LIMIT 300`).all();
  return json({ items: results.map(s => ({ id: s.id, kind: s.kind, title: s.title, story: s.story, lesson: s.lesson, name: s.name || 'Anonymous', role: s.role, date: (s.approved_at || s.created_at).slice(0, 10) })) }, 200, { 'cache-control': 'public, max-age=60' });
}
async function storyNew(req, env) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const e = postCheck(b, [['title', 8, 160, 'Title'], ['story', 40, 6000, 'Story']]);
  if (e === 'bot') return json({ ok: true }); if (e) return json({ error: e }, 400);
  const ip = await ipOf(req, env); if (await tooMany(env, ip)) return json({ error: 'Too many posts in a short time. Please try again in a few minutes.' }, 429);
  const kind = KINDS.includes(b.kind) ? b.kind : 'other';
  const r = await env.DB.prepare(`INSERT INTO stories (kind, title, story, lesson, name, role, email, ip_hash) VALUES (?,?,?,?,?,?,?,?)`)
    .bind(kind, clip(b.title, 160), clip(b.story, 6000), clip(b.lesson, 3000), clip(b.name, 60), clip(b.role, 60), clip(b.email, 120), ip).run();
  return json({ ok: true, id: r.meta.last_row_id, status: 'pending' });
}
async function modList(env, url) {
  const st = MOD.includes(url.searchParams.get('status')) ? url.searchParams.get('status') : 'pending';
  const [t, r, s] = await Promise.all([
    env.DB.prepare(`SELECT * FROM threads WHERE status=? ORDER BY created_at DESC LIMIT 500`).bind(st).all(),
    env.DB.prepare(`SELECT r.*, t.title AS thread_title FROM replies r JOIN threads t ON t.id=r.thread_id WHERE r.status=? ORDER BY r.created_at DESC LIMIT 500`).bind(st).all(),
    env.DB.prepare(`SELECT * FROM stories WHERE status=? ORDER BY created_at DESC LIMIT 500`).bind(st).all()]);
  const cnt = await env.DB.prepare(`SELECT (SELECT COUNT(*) FROM threads WHERE status='pending') AS t, (SELECT COUNT(*) FROM replies WHERE status='pending') AS r, (SELECT COUNT(*) FROM stories WHERE status='pending') AS s`).first();
  return json({ status: st, pending: cnt, threads: t.results, replies: r.results, stories: s.results });
}
async function refreshThread(env, tid) {
  await env.DB.prepare(`UPDATE threads SET replies=(SELECT COUNT(*) FROM replies WHERE thread_id=? AND status='approved'),
    last_at=COALESCE((SELECT MAX(approved_at) FROM replies WHERE thread_id=? AND status='approved'), approved_at) WHERE id=?`).bind(tid, tid, tid).run();
}
async function modSet(req, env, kind, id) {
  const tbl = { thread: 'threads', reply: 'replies', story: 'stories' }[kind]; if (!tbl) return json({ error: 'Unknown type' }, 400);
  if (req.method === 'DELETE') {
    let tid = null; if (kind === 'reply') { const r = await env.DB.prepare('SELECT thread_id FROM replies WHERE id=?').bind(id).first(); tid = r && r.thread_id; }
    if (kind === 'thread') await env.DB.prepare('DELETE FROM replies WHERE thread_id=?').bind(id).run();
    await env.DB.prepare(`DELETE FROM ${tbl} WHERE id=?`).bind(id).run();
    if (tid) await refreshThread(env, tid);
    return json({ ok: true });
  }
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  if (!MOD.includes(b.status)) return json({ error: 'Status must be pending, approved or rejected.' }, 400);
  const cur = await env.DB.prepare(`SELECT * FROM ${tbl} WHERE id=?`).bind(id).first(); if (!cur) return json({ error: 'Not found' }, 404);
  const sets = ['status=?', `approved_at=${b.status === 'approved' ? "COALESCE(approved_at, datetime('now'))" : 'approved_at'}`], vals = [b.status];
  const ed = { thread: ['title', 'body', 'topic'], reply: ['body'], story: ['title', 'story', 'lesson', 'kind'] }[kind];
  for (const f of ed) if (typeof b[f] === 'string' && b[f].trim()) { sets.push(`${f}=?`); vals.push(clip(b[f], 6000)); }
  await env.DB.prepare(`UPDATE ${tbl} SET ${sets.join(', ')} WHERE id=?`).bind(...vals, id).run();
  if (kind === 'thread' && b.status === 'approved') await env.DB.prepare(`UPDATE threads SET last_at=COALESCE(last_at, approved_at) WHERE id=?`).bind(id).run();
  if (kind === 'reply') await refreshThread(env, cur.thread_id);
  return json({ ok: true });
}

/* ---------- admin handlers ---------- */
async function adminList(env, url) {
  const st = url.searchParams.get('status');
  const q = STATUSES.includes(st) ? env.DB.prepare('SELECT * FROM corrections WHERE status = ? ORDER BY created_at DESC LIMIT 1000').bind(st)
    : env.DB.prepare('SELECT * FROM corrections ORDER BY created_at DESC LIMIT 1000');
  const { results } = await q.all();
  const h = await historyFor(env, results.map(r => r.ref));
  return json({ items: results.map(r => ({ ...pub(r, h[r.ref]), std_ref: r.std_ref, message: r.message, name: r.name, email: r.email, created_at: r.created_at })), datasets: await datasets(env) });
}
async function adminUpdate(req, env, ref, user) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const cur = await env.DB.prepare('SELECT * FROM corrections WHERE ref = ?').bind(ref).first();
  if (!cur) return json({ error: 'Not found' }, 404);
  const status = b.status && STATUSES.includes(b.status) ? b.status : cur.status;
  const date = isDate(b.date) ? b.date : today();
  const set = { item: b.item !== undefined ? clip(b.item, 160) : cur.item, summary: b.summary !== undefined ? clip(b.summary, 400) : cur.summary, page: b.page !== undefined ? clip(b.page, 30) : cur.page,
    status, corrected: cur.corrected, ver_to: cur.ver_to };
  const stmts = [];
  if (status === 'verified') {
    set.corrected = isDate(b.corrected) ? b.corrected : (cur.corrected || date);
    if (b.ver_to !== undefined) { if (b.ver_to && !isVer(b.ver_to)) return json({ error: 'Version must look like 1.1' }, 400); set.ver_to = b.ver_to || null; }
    if (set.ver_to && set.page) stmts.push(env.DB.prepare('INSERT INTO datasets (key, v, date) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET v = excluded.v, date = excluded.date').bind(set.page, set.ver_to, set.corrected));
  } else if (status !== 'verified' && cur.status === 'verified' && b.status) { set.corrected = null; set.ver_to = null; }
  stmts.unshift(env.DB.prepare('UPDATE corrections SET item = ?, summary = ?, page = ?, status = ?, corrected = ?, ver_to = ? WHERE ref = ?')
    .bind(set.item, set.summary, set.page, set.status, set.corrected, set.ver_to, ref));
  if (b.status && (b.status !== cur.status || b.note)) stmts.push(env.DB.prepare('INSERT INTO history (ref, date, status, note) VALUES (?,?,?,?)').bind(ref, date, status, clip(b.note, 400)));
  await env.DB.batch(stmts);
  return one(env, ref);
}
async function adminAdd(req, env) {
  let b; try { b = await req.json(); } catch { return json({ error: 'Send JSON.' }, 400); }
  const type = TYPES.includes(b.type) ? b.type : 'Correction';
  const ref = (clip(b.ref, 24) || newRef(type)).toUpperCase();
  const sub = isDate(b.submitted) ? b.submitted : today();
  const page = clip(b.page, 30);
  const d = page ? await env.DB.prepare('SELECT v FROM datasets WHERE key = ?').bind(page).first() : null;
  try {
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO corrections (ref, type, page, item, std_ref, message, name, email, submitted, status, ver_from) VALUES (?,?,?,?,?,?,?,?,?,'submitted',?)`)
        .bind(ref, type, page, clip(b.item, 160), clip(b.std_ref, 160), clip(b.message, 4000), clip(b.name, 80), clip(b.email, 120), sub, clip(b.ver_from, 10) || (d && d.v)),
      env.DB.prepare(`INSERT INTO history (ref, date, status, note) VALUES (?,?, 'submitted', ?)`).bind(ref, sub, 'Added by admin')
    ]);
  } catch (e) { return json({ error: /UNIQUE/i.test(String(e)) ? 'That reference already exists.' : 'Could not save.' }, 400); }
  return one(env, ref);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url), path = url.pathname.replace(/\/+$/, '') || '/';
    const isAdminHost = url.hostname === env.ADMIN_HOST || (env.DEV_ADMIN === 'yes');
    try {
      /* public API */
      if (path.startsWith('/api/') && !path.startsWith('/api/admin')) {
        const c = cors(req, env);
        if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: c });
        let res;
        if (path === '/api/corrections' && req.method === 'POST') res = await submit(req, env);
        else if (path === '/api/log' && req.method === 'GET') res = await log(env);
        else if (path === '/api/versions' && req.method === 'GET') res = json({ datasets: await datasets(env) }, 200, { 'cache-control': 'public, max-age=300' });
        else if (/^\/api\/corrections\/[A-Za-z0-9-]{8,24}$/.test(path) && req.method === 'GET') res = await one(env, path.split('/').pop());
        else if (path === '/api/forum/threads' && req.method === 'GET') res = await threadsList(env, url);
        else if (path === '/api/forum/threads' && req.method === 'POST') res = await threadNew(req, env);
        else if (/^\/api\/forum\/threads\/\d{1,9}$/.test(path) && req.method === 'GET') res = await threadOne(env, +path.split('/').pop());
        else if (/^\/api\/forum\/threads\/\d{1,9}\/replies$/.test(path) && req.method === 'POST') res = await replyNew(req, env, +path.split('/')[4]);
        else if (path === '/api/stories' && req.method === 'GET') res = await storiesList(env);
        else if (path === '/api/stories' && req.method === 'POST') res = await storyNew(req, env);
        else res = json({ error: 'Not found' }, 404);
        for (const [k, v] of Object.entries(c)) res.headers.set(k, v);
        return res;
      }
      /* admin: only on the admin host, only with a valid Access login */
      if (path.startsWith('/api/admin') || path === '/admin' || path.startsWith('/admin/')) {
        if (!isAdminHost) return new Response('Not found', { status: 404 });
        const user = await accessUser(req, env);
        if (!user) return new Response('Sign in through Cloudflare Access to use the admin.', { status: 403 });
        if (path === '/api/admin/me') return json({ email: user.email });
        if (path === '/api/admin/corrections' && req.method === 'GET') return adminList(env, url);
        if (path === '/api/admin/corrections' && req.method === 'POST') return adminAdd(req, env);
        const m = path.match(/^\/api\/admin\/corrections\/([A-Za-z0-9-]{8,24})$/);
        if (m && req.method === 'PATCH') return adminUpdate(req, env, m[1].toUpperCase(), user);
        if (m && req.method === 'DELETE') { await env.DB.prepare('DELETE FROM history WHERE ref = ?').bind(m[1].toUpperCase()).run(); await env.DB.prepare('DELETE FROM corrections WHERE ref = ?').bind(m[1].toUpperCase()).run(); return json({ ok: true }); }
        if (path === '/api/admin/moderation' && req.method === 'GET') return modList(env, url);
        const mm = path.match(/^\/api\/admin\/moderation\/(thread|reply|story)\/(\d{1,9})$/);
        if (mm && (req.method === 'PATCH' || req.method === 'DELETE')) return modSet(req, env, mm[1], +mm[2]);
        const dk = path.match(/^\/api\/admin\/datasets\/([a-z0-9_-]{1,30})$/);
        if (dk && req.method === 'PUT') { const b = await req.json().catch(() => ({})); if (!isVer(b.v) || !isDate(b.date)) return json({ error: 'Version like 1.2 and date YYYY-MM-DD.' }, 400);
          await env.DB.prepare('INSERT INTO datasets (key, v, date) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET v = excluded.v, date = excluded.date').bind(dk[1], b.v, b.date).run(); return json({ ok: true, datasets: await datasets(env) }); }
        if (path.startsWith('/api/admin')) return json({ error: 'Not found' }, 404);
        const a = await env.ASSETS.fetch(new Request(new URL(path === '/admin/moderation' ? '/admin/moderation' : '/admin/', url), req));
        const r = new Response(a.body, a); r.headers.set('cache-control', 'no-store'); r.headers.set('x-robots-tag', 'noindex'); return r;
      }
      if (path === '/' && isAdminHost) return Response.redirect(new URL('/admin/', url).toString(), 302);
      if (path === '/') return json({ service: 'Pipe Ref corrections API', site: 'https://piperef.net/contact.html' });
      return new Response('Not found', { status: 404 });
    } catch (e) {
      console.error(e);
      return json({ error: 'Server error' }, 500);
    }
  }
};
