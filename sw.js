/* Pipe Ref service worker: pages network-first (always fresh when online), assets cache-first by version, offline fallback. */
const V='20261122d',CACHE='piperef-'+V;
const CORE=['./','index.html','assets/app.css?v='+V,'assets/app.js?v='+V,'assets/ui.js?v='+V,'assets/favicon.svg','assets/fonts/Geist-Variable.woff2','manifest.webmanifest','assets/icons/icon-192.png'];
const OFFLINE=`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline – Pipe Ref</title>
<body style="font-family:system-ui,sans-serif;background:#F5F7FA;color:#0F1B2D;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center">
<div><div style="width:56px;height:56px;border-radius:14px;background:#1849A9;margin:0 auto 16px;display:grid;place-items:center"><div style="width:28px;height:28px;border-radius:50%;border:6px solid #fff;box-sizing:border-box"></div></div>
<h1 style="font-size:20px;margin:0 0 8px">You're offline</h1><p style="margin:0 0 16px;color:#3B4A5E;max-width:320px">This page hasn't been saved on this device yet. Pages you have opened before still work without a connection.</p>
<a href="./" style="color:#1849A9;font-weight:600">Open Pipe Ref home</a></div></body>`;
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('piperef-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(u.pathname==='/'?'index.html':r,cp));}return res;})
   .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(u.pathname==='/'?caches.match('index.html'):null)).then(m=>m||new Response(OFFLINE,{headers:{'Content-Type':'text/html; charset=utf-8'}}))));
  return;}
 const keep=u.pathname.startsWith('/assets/')||u.pathname.endsWith('.webmanifest');
 if(!keep||u.pathname.endsWith('.json'))return;               /* data files and anything else: straight to network */
 const net=()=>fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;});
 if(u.searchParams.has('v')){e.respondWith(caches.match(r).then(m=>m||net()));return;}   /* versioned: cache first */
 e.respondWith(caches.match(r).then(m=>{const n=net().catch(()=>m);return m||n;}));        /* unversioned: stale while revalidate */
});
