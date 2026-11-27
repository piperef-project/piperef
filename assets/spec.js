/* Piping spec assistant: open a piping material specification PDF, find the pages that answer a question,
   and (optionally) have Claude write the answer from those pages only, through Pipe Ref's /api/spec worker.
   PDF reading by pdf.js (Apache-2.0). The PDF itself never leaves the browser; in "Search only" nothing does. */
const P=document.getElementById('p-spec');
const V='20261127b';
const API='https://spec.piperef.net/api/spec';
const AI_ON=false; // AI answers come back later as a Pro feature
if(!document.getElementById('sp-css')){const st=document.createElement('style');st.id='sp-css';st.textContent=`
#p-spec .sp-app{margin:18px 0 28px;display:grid;gap:16px}
#p-spec .sp-drop{border:2px dashed var(--rule);border-radius:16px;background:var(--sheet);padding:26px 20px;text-align:center;display:grid;gap:10px;justify-items:center}
#p-spec .sp-drop.over{border-color:var(--accent);background:var(--paper)}
#p-spec .sp-drop b{font-size:16px}#p-spec .sp-drop p{margin:0;color:var(--muted);font-size:13.5px}
#p-spec .sp-btns{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
#p-spec .sp-b{font:inherit;font-size:14px;font-weight:600;border-radius:10px;padding:10px 16px;border:1px solid var(--rule);background:var(--sheet);color:var(--ink);cursor:pointer;min-height:44px}
#p-spec .sp-b.pri{background:var(--accent);border-color:var(--accent);color:#fff}
#p-spec .sp-b:focus-visible,#p-spec .sp-q input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#p-spec .sp-file{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 16px;border:1px solid var(--rule);border-radius:14px;background:var(--sheet)}
#p-spec .sp-file b{font-size:14.5px;word-break:break-all}#p-spec .sp-file small{color:var(--muted);font-size:13px}
#p-spec .sp-file .sp-b{margin-left:auto;padding:6px 12px;min-height:36px;font-size:13px}
#p-spec .sp-cls{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px;color:var(--muted)}
#p-spec .sp-cls button{font:inherit;font-size:12.5px;font-weight:600;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:999px;padding:3px 10px;cursor:pointer}
#p-spec .sp-ask{border:1px solid var(--rule);border-radius:16px;background:var(--sheet);padding:16px;display:grid;gap:12px;box-shadow:var(--sh-1)}
#p-spec .sp-q{display:flex;gap:8px}
#p-spec .sp-q input{flex:1;font:inherit;font-size:16px;padding:11px 14px;border:1px solid var(--rule);border-radius:10px;background:var(--paper);color:var(--ink);min-width:0}
#p-spec .sp-ex{display:flex;gap:6px;flex-wrap:wrap}
#p-spec .sp-ex button{font:inherit;font-size:12.5px;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:999px;padding:5px 11px;cursor:pointer}
#p-spec .sp-mode{display:inline-flex;border:1px solid var(--rule);border-radius:10px;overflow:hidden}
#p-spec .sp-mode button{font:inherit;font-size:13px;font-weight:600;border:0;background:var(--sheet);color:var(--muted);padding:7px 12px;cursor:pointer}
#p-spec .sp-mode button[aria-pressed=true]{background:var(--accent);color:#fff}
#p-spec .sp-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between}
#p-spec .sp-priv{font-size:12.5px;color:var(--muted);line-height:1.5;margin:0;max-width:72ch}
#p-spec .sp-left{font-size:12.5px;color:var(--muted)}
#p-spec .sp-ans{border:1px solid var(--rule);border-left:4px solid var(--accent);border-radius:14px;background:var(--sheet);padding:16px 18px;line-height:1.6;font-size:15px}
#p-spec .sp-ans h3{margin:0 0 8px;font-size:13px;color:var(--muted);font-weight:600}
#p-spec .sp-ans p{margin:0 0 8px}#p-spec .sp-ans ul{margin:0 0 8px;padding-left:20px}
#p-spec .sp-ans .sp-off{color:var(--muted);font-size:14px}
#p-spec .pg{font:inherit;font-size:12px;font-weight:600;border:1px solid var(--accent);color:var(--accent);background:none;border-radius:6px;padding:0 6px;cursor:pointer;white-space:nowrap}
#p-spec .sp-hits{display:grid;gap:10px}
#p-spec .sp-hits h3{font-size:14px;margin:6px 0 0}
#p-spec .sp-hit{border:1px solid var(--rule);border-radius:12px;background:var(--sheet);overflow:hidden}
#p-spec .sp-hit header{display:flex;align-items:center;gap:8px;padding:9px 14px;background:var(--paper);border-bottom:1px solid var(--rule);font-size:13px}
#p-spec .sp-hit header b{font-size:13.5px}#p-spec .sp-hit header .pg{margin-left:auto}
#p-spec .sp-hit ul{list-style:none;margin:0;padding:6px 0;font-size:13px}
#p-spec .sp-hit li{padding:4px 14px;white-space:pre-wrap;overflow-wrap:anywhere}
#p-spec .sp-hit li.in{background:rgba(250,204,21,.18)}
#p-spec mark{background:rgba(250,204,21,.55);color:inherit;border-radius:3px;padding:0 1px}
#p-spec .sp-busy{color:var(--muted);font-size:14px}
#p-spec .sp-err{color:#B42318;font-size:14px}
#spDlg{border:0;padding:0;background:transparent;width:min(960px,calc(100vw - 24px));max-height:92vh}
#spDlg::backdrop{background:rgba(11,31,77,.28);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#spDlg .sd{background:var(--sheet);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;max-height:92vh}
#spDlg .sd-h{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--rule);color:var(--ink)}
#spDlg .sd-h b{flex:1}#spDlg .sd-h button{width:40px;height:40px;border-radius:50%;border:1px solid var(--rule);background:var(--paper);color:var(--ink);font-size:20px;cursor:pointer}
#spDlg .sd-b{overflow:auto;background:#fff}#spDlg canvas{display:block;width:100%;height:auto}
@media(max-width:600px){#p-spec .sp-q{flex-direction:column}}
`;document.head.appendChild(st);}

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let pdfjs=null,doc=null,fileName='',pages=[],classes=[],mode=AI_ON?'ai':'search',aiOK=AI_ON?null:false,left=null;
async function lib(){if(pdfjs)return pdfjs;pdfjs=await import(`./pdfjs/pdf.min.mjs?v=${V}`);pdfjs.GlobalWorkerOptions.workerSrc=new URL(`./pdfjs/pdf.worker.min.mjs?v=${V}`,import.meta.url).href;return pdfjs;}

/* ---------- reading ---------- */
async function lines(pg){
  const tc=await pg.getTextContent(),rows=[];
  for(const it of tc.items){if(!it.str||!it.str.trim())continue;const x=it.transform[4],y=it.transform[5],h=Math.abs(it.transform[3])||8;
    let r=rows.find(r=>Math.abs(r.y-y)<Math.max(r.h,h)*0.5);if(!r){r={y,h,its:[]};rows.push(r);}r.its.push({x,s:it.str,w:it.width||0});}
  rows.sort((a,b)=>b.y-a.y);
  return rows.map(r=>{r.its.sort((a,b)=>a.x-b.x);let o='',end=null;for(const t of r.its){if(end!==null){const g=t.x-end;o+=g>r.h*1.6?' | ':(g>r.h*0.12?' ':'');}o+=t.s;end=t.x+t.w;}return o.replace(/\s+/g,' ').trim();}).filter(Boolean);
}
const CLS_RE=/(?:piping\s+)?(?:class|spec(?:ification)?)\s*(?:no\.?|code)?\s*[:#\-]?\s*([A-Z0-9]{1,3}[A-Z0-9\-]{1,6})\b/gi;
function classOf(text){const m={};for(const x of text.matchAll(CLS_RE)){const c=x[1].toUpperCase();if(/\d/.test(c)&&/[A-Z]/.test(c)&&c.length>=2&&c.length<=8)m[c]=(m[c]||0)+1;}
  const k=Object.keys(m).sort((a,b)=>m[b]-m[a]);return k.length===1||(k.length>1&&m[k[0]]>m[k[1]])?k[0]:'';}
const tok=s=>(s.toLowerCase().match(/[a-z0-9]+(?:[\/.][a-z0-9]+)*/g)||[]);

async function open(file){
  const ab=await file.arrayBuffer();fileName=file.name||'spec.pdf';pages=[];classes=[];
  const app=P.querySelector('.sp-app');app.innerHTML=`<p class="sp-busy" role="status">Opening ${esc(fileName)}…</p>`;
  try{const L=await lib();doc=await L.getDocument({data:new Uint8Array(ab)}).promise;}catch(e){app.innerHTML=`<p class="sp-err">This file could not be opened as a PDF.</p>`+dropHTML();bindDrop();return;}
  const st=app.querySelector('.sp-busy');let chars=0,prev='';
  for(let i=1;i<=doc.numPages;i++){if(i%5===1)st.textContent=`Reading page ${i} of ${doc.numPages}…`;
    const ls=await lines(await doc.getPage(i));const text=ls.join('\n');chars+=text.length;
    let c=classOf(ls.slice(0,8).join('\n'))||classOf(text);
    if(!c&&prev&&text.length>200&&!/index|contents|general notes/i.test(ls.slice(0,6).join(' ')))c=prev;
    pages.push({n:i,ls,text,cls:c,tk:tok(text)});if(c)prev=c;}
  classes=[...new Set(pages.map(p=>p.cls).filter(Boolean))];
  idf();ui(chars<50*doc.numPages);
}

/* ---------- search ---------- */
let DF={},AVG=1;
function idf(){DF={};let tot=0;for(const p of pages){tot+=p.tk.length;for(const t of new Set(p.tk))DF[t]=(DF[t]||0)+1;}AVG=tot/Math.max(1,pages.length);}
const SYN={gasket:['gasket','gaskets','spiral','wound','swg','ring'],bolt:['bolt','bolting','stud','studs','nut','nuts','a193','a194'],flange:['flange','flanges','weld','neck','blind','rf'],
 branch:['branch','tee','sockolet','weldolet','olet','header','reinforcement'],valve:['valve','valves','gate','globe','check','ball','butterfly','plug'],
 schedule:['schedule','sch','wall','thickness','pipe'],thickness:['schedule','sch','wall','thickness'],corrosion:['corrosion','allowance','ca'],
 rating:['rating','class','pressure','temperature','barg','limits'],pressure:['pressure','temperature','limits','barg'],temperature:['temperature','pressure','limits'],
 material:['material','astm','a106','a105'],fitting:['fittings','elbow','tee','reducer','cap','b16.9','b16.11'],elbow:['elbow','fittings','b16.9'],hydrotest:['hydrotest','test']};
function parseSizes(q){const out=[];const re=/(?:nps\s*)?(\d+(?:\s*-\s*\d+\/\d+)?(?:\/\d+)?(?:\.\d+)?)\s*(?:"|”|''|in\b|inch|nb\b)|nps\s*(\d+(?:\/\d+)?)/gi;
  for(const m of q.matchAll(re)){const v=num(m[1]||m[2]);if(v>0&&v<=80)out.push(v);}return out;}
function num(s){s=String(s).replace(/\s/g,'');let m=s.match(/^(\d+)-(\d+)\/(\d+)$/);if(m)return +m[1]+m[2]/m[3];m=s.match(/^(\d+)\/(\d+)$/);if(m)return m[1]/m[2];return parseFloat(s);}
function rangeOf(line){const f=line.split(' | ')[0].trim();let m=f.match(/^(\d+(?:-\d+\/\d+)?(?:\/\d+)?)\s*(?:-|to|–)\s*(\d+(?:-\d+\/\d+)?(?:\/\d+)?)$/);if(m)return[num(m[1]),num(m[2])];
  m=f.match(/^(\d+(?:-\d+\/\d+)?(?:\/\d+)?)$/);if(m){const v=num(m[1]);return[v,v];}return null;}
function query(q){
  const qcls=classes.find(c=>new RegExp('\\b'+c.replace(/[-]/g,'\\-')+'\\b','i').test(q))||'';
  const unknown=!qcls&&(q.match(/\bclass\s+([A-Z0-9]{2,8})\b/i)||[])[1];
  const base=tok(q).filter(t=>t.length>1&&!['the','for','and','what','which','is','in','of','on','a','to','with','size','inch','nps','class','do','i','use','are','me','tell'].includes(t)&&t!==(qcls||'').toLowerCase());
  const terms=new Set(base);for(const t of base)for(const k in SYN)if(t.startsWith(k))SYN[k].forEach(x=>terms.add(x));
  const sizes=parseSizes(q);
  const sc=pages.map(p=>{let s=0;const tf={};for(const t of p.tk)if(terms.has(t))tf[t]=(tf[t]||0)+1;
    for(const t in tf){const id=Math.log(1+(pages.length-(DF[t]||0)+.5)/((DF[t]||0)+.5));s+=id*tf[t]*2.2/(tf[t]+1.2*(.25+.75*p.tk.length/AVG));}
    if(sizes.length)for(const l of p.ls){const r=rangeOf(l);if(r&&sizes.some(v=>v>=r[0]-1e-6&&v<=r[1]+1e-6)){s+=.4;}}
    if(qcls){if(p.cls===qcls)s=s*2+4;else if(p.cls)s*=.15;}
    return{p,s};}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
  let pick=qcls?[...sc.filter(x=>x.p.cls===qcls).slice(0,3),...sc.filter(x=>!x.p.cls).slice(0,1)]:sc.slice(0,4);
  let tot=0;pick=pick.filter(x=>(tot+=x.p.text.length)<=32000||x===pick[0]).sort((a,b)=>b.s-a.s);
  return{qcls,unknown,terms,sizes,pick};
}
function hitHTML(r){
  const tr=[...r.terms].filter(t=>t.length>2).sort((a,b)=>b.length-a.length).map(t=>t.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&'));
  const re=tr.length?new RegExp('\\b('+tr.join('|')+')','gi'):null;
  return r.pick.map(({p})=>{
    const sc=p.ls.map((l,i)=>{const lt=tok(l);const tm=lt.filter(t=>r.terms.has(t)).length;const rg=rangeOf(l),inR=!!(rg&&r.sizes.some(v=>v>=rg[0]-1e-6&&v<=rg[1]+1e-6));return{i,l,s:tm*2+(inR?.6:0),inR:inR&&tm>0};});
    const best=sc.filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,8).sort((a,b)=>a.i-b.i);
    const li=best.map(x=>`<li class="${x.inR?'in':''}">${re?esc(x.l).replace(re,'<mark>$1</mark>'):esc(x.l)}</li>`).join('')||`<li>${esc(p.ls.slice(0,4).join(' · '))}</li>`;
    return `<article class="sp-hit"><header><b>Page ${p.n}</b>${p.cls?`<span>Class ${esc(p.cls)}</span>`:''}<button type="button" class="pg" data-pg="${p.n}">Open page</button></header><ul>${li}</ul></article>`;}).join('');
}

/* ---------- AI ---------- */
async function status(){try{const r=await fetch(API+'/status',{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json();aiOK=!!j.ok;left=j.remaining??null;}catch(e){aiOK=false;}paintLeft();}
function paintLeft(){const el=P.querySelector('.sp-left');if(!el)return;el.textContent=aiOK===false?'AI answers are not switched on yet: you will get the matching pages.':left!=null?`${left} AI answers left today`:'';}
function fmt(t){const ref=s=>s.replace(/\[p(?:age)?s?\.?\s*([\d,\s–-]+)\]/gi,(m,g)=>g.split(/[,\s–-]+/).filter(Boolean).map(n=>`<button type="button" class="pg" data-pg="${+n}">p. ${+n}</button>`).join(' '));
  const out=[];let ul=null;for(const raw of esc(t).split('\n')){const l=raw.trim();if(!l){ul=null;continue;}
    const h=ref(l.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>'));
    if(/^[-•*]\s+/.test(l)){if(!ul){ul=[];out.push(ul);}ul.push(h.replace(/^[-•*]\s+/,''));}else{ul=null;out.push(`<p>${h}</p>`);}}
  return out.map(x=>Array.isArray(x)?`<ul>${x.map(i=>`<li>${i}</li>`).join('')}</ul>`:x).join('');}
async function ask(q){
  q=q.trim();if(!q)return;const out=P.querySelector('.sp-out');const r=query(q);
  if(!r.pick.length){out.innerHTML=`<div class="sp-ans"><p class="sp-off">Nothing in this PDF matches that question. Try the component name (gasket, bolting, branch, valve) and the class.</p></div>`;return;}
  const warn=r.unknown?`<p class="sp-off">Class ${esc(r.unknown)} was not found in this PDF. Classes found: ${classes.map(esc).join(', ')||'none'}.</p>`:'';
  const hits=`<section class="sp-hits"><h3>Pages that match</h3>${hitHTML(r)}</section>`;
  if(mode!=='ai'||aiOK===false){out.innerHTML=(warn?`<div class="sp-ans">${warn}</div>`:'')+(mode==='ai'&&AI_ON?`<div class="sp-ans"><p class="sp-off">AI answers are not switched on yet. The rows that match are highlighted below.</p></div>`:'')+hits;return;}
  out.innerHTML=`<div class="sp-ans"><h3>Answer</h3><p class="sp-busy" role="status">Reading pages ${r.pick.map(x=>x.p.n).join(', ')}…</p></div>`+hits;
  try{const res=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({q,file:fileName,pages:r.pick.map(({p})=>({n:p.n,cls:p.cls,text:p.text.slice(0,12000)}))})});
    const j=await res.json().catch(()=>({}));if(j.remaining!=null){left=j.remaining;paintLeft();}
    if(!res.ok){out.querySelector('.sp-ans').innerHTML=`<h3>Answer</h3><p class="sp-off">${esc(j.message||(res.status===404?'AI answers are not switched on yet.':'The AI answer is not available right now.'))} The rows that match are highlighted below.</p>`;if(res.status===404){aiOK=false;paintLeft();}return;}
    out.querySelector('.sp-ans').innerHTML=`<h3>Answer from ${esc(fileName)}</h3>${warn}${fmt(j.answer||'')}<p class="sp-off">Check the page before you use a value. Answers come only from the pages listed.</p>`;
  }catch(e){out.querySelector('.sp-ans').innerHTML=`<h3>Answer</h3><p class="sp-off">Could not reach the AI service. The rows that match are highlighted below.</p>`;}
}

/* ---------- page viewer ---------- */
async function show(n){let d=document.getElementById('spDlg');
  if(!d){d=document.createElement('dialog');d.id='spDlg';d.innerHTML='<div class="sd"><div class="sd-h"><b></b><button type="button" aria-label="Close">×</button></div><div class="sd-b"><canvas></canvas></div></div>';document.body.appendChild(d);
    d.addEventListener('click',e=>{if(e.target===d||e.target.closest('.sd-h button'))d.close();});}
  d.querySelector('b').textContent=`${fileName} · page ${n}`;if(d.showModal&&!d.open)d.showModal();
  const pg=await doc.getPage(n),cv=d.querySelector('canvas'),w=Math.min(960,innerWidth-24)*Math.min(2,devicePixelRatio||1);
  const vp=pg.getViewport({scale:w/pg.getViewport({scale:1}).width});cv.width=vp.width;cv.height=vp.height;await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;}

/* ---------- UI ---------- */
function dropHTML(){return `<div class="sp-drop" id="spDrop"><b>Open your piping spec PDF</b><p>Drop it here or choose a file. A spec exported from Word or a spec tool works; scanned pages cannot be read.</p>
  <div class="sp-btns"><label class="sp-b pri">Choose PDF<input type="file" accept="application/pdf,.pdf" hidden></label><button type="button" class="sp-b" data-sample>Try a sample spec</button></div></div>`;}
function bindDrop(){const d=P.querySelector('#spDrop');if(!d)return;
  d.addEventListener('dragover',e=>{e.preventDefault();d.classList.add('over');});d.addEventListener('dragleave',()=>d.classList.remove('over'));
  d.addEventListener('drop',e=>{e.preventDefault();d.classList.remove('over');const f=e.dataTransfer.files[0];if(f)open(f);});
  d.querySelector('input').addEventListener('change',e=>{const f=e.target.files[0];if(f)open(f);});}
function ui(scanned){
  const c1=classes[0]||'A1A',c2=classes[1]||c1;
  const ex=classes.length?[`Gasket and bolting for 6" in ${c1}`,`Branch for 2" on a 10" header in ${c1}`,`Which gate valve for 1" in ${c2}?`,`Corrosion allowance of each class`]:['Gasket type','Bolting material','Branch table','Corrosion allowance'];
  P.querySelector('.sp-app').innerHTML=`
  <div class="sp-file"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/></svg><div><b>${esc(fileName)}</b><br><small>${doc.numPages} pages · ${classes.length?`${classes.length} piping classes found`:'no class headers found'}</small></div><button type="button" class="sp-b" data-new>Open another PDF</button></div>
  ${scanned?'<p class="sp-err">This PDF has almost no text. It may be scanned pages, which this tool cannot read.</p>':''}
  ${classes.length?`<div class="sp-cls">Classes: ${classes.map(c=>`<button type="button" data-cls="${esc(c)}">${esc(c)}</button>`).join('')}</div>`:''}
  <div class="sp-ask"><form class="sp-q"><input type="text" id="spQ" placeholder="Search a class, size or component" aria-label="Your question" maxlength="300" autocomplete="off"><button class="sp-b pri" type="submit">Search</button></form>
  <div class="sp-ex">${ex.map(e=>`<button type="button">${esc(e)}</button>`).join('')}</div>
  ${AI_ON?`<div class="sp-row"><div class="sp-mode" role="group" aria-label="Answer mode"><button type="button" data-m="ai" aria-pressed="${mode==='ai'}">Ask AI</button><button type="button" data-m="search" aria-pressed="${mode!=='ai'}">Search only</button></div><span class="sp-left"></span></div>`:''}
  <p class="sp-priv">${mode==='ai'?'Ask AI sends the 3 or 4 matching pages, as text, to Claude by Anthropic through Pipe Ref to write the answer. Nothing is stored. The PDF itself stays on your computer. If your spec is confidential, use Search only.':'Your spec is read inside your browser and nothing leaves your computer. You get the matching pages with the rows for your size highlighted.'}</p></div>
  <div class="sp-out"></div>`;
  if(AI_ON){if(aiOK===null)status();else paintLeft();}
}
P.addEventListener('submit',e=>{if(e.target.closest('.sp-q')){e.preventDefault();ask(P.querySelector('#spQ').value);}});
P.addEventListener('click',e=>{const t=e.target;
  if(t.closest('[data-sample]')){fetch(`assets/sample-piping-spec.pdf?v=${V}`).then(r=>r.blob()).then(b=>open(new File([b],'sample-piping-spec.pdf (fictional)')));return;}
  if(t.closest('[data-new]')){P.querySelector('.sp-app').innerHTML=dropHTML();bindDrop();return;}
  const pg=t.closest('.pg');if(pg){show(+pg.dataset.pg);return;}
  const m=t.closest('.sp-mode button');if(m){mode=m.dataset.m;const q=P.querySelector('#spQ').value;ui(false);P.querySelector('#spQ').value=q;return;}
  const c=t.closest('[data-cls]');if(c){const i=P.querySelector('#spQ');i.value=`Pipe, gasket and bolting in ${c.dataset.cls}`;i.focus();return;}
  const x=t.closest('.sp-ex button');if(x){P.querySelector('#spQ').value=x.textContent;ask(x.textContent);}
});
const host=P.querySelector('#spApp')||P;host.insertAdjacentHTML('beforeend',`<div class="sp-app">${dropHTML()}</div>`);bindDrop();
