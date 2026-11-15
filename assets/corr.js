/* Correction workflow on the Contact page: reference numbers, data versions, status tracking and the public correction history.
   Source of truth: assets/corrections.json (edited by the site owner). Submissions made in this browser are remembered in localStorage. */
(function(){
const P=document.getElementById('p-contact'),F=document.getElementById('cfForm');if(!P||!F||window.__corr)return;
if(!document.getElementById('corr-css')){const st=document.createElement('style');st.id='corr-css';st.textContent=`
#cfPageSel{height:34px;width:100%;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);box-sizing:border-box}
.cr-meta{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:12.5px;color:var(--ink-2);margin:2px 0 0;padding:8px 10px;border:1px dashed var(--rule-strong);border-radius:8px;background:var(--paper-2)}
.cr-meta b{font-variant-numeric:tabular-nums;color:var(--ink)}
.cr-sec{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:16px 18px;margin:18px 0 0}
.cr-sec h2{font-size:17px;margin:0 0 4px}.cr-sec>p{margin:0 0 12px;font-size:13.5px;color:var(--muted);line-height:1.5}
.cr-find{display:flex;gap:8px;flex-wrap:wrap}.cr-find input{flex:1 1 220px;height:38px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 12px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);text-transform:uppercase;letter-spacing:.03em}
.cr-find button{height:38px;padding:0 16px;border:1px solid var(--accent);border-radius:var(--r);background:var(--accent);color:var(--on-accent,#fff);font:inherit;font-weight:600;cursor:pointer}
.cr-res{margin-top:14px}
.cr-card{border:1px solid var(--rule);border-radius:12px;padding:14px 16px}
.cr-card h3{margin:0 0 2px;font-size:15px;font-variant-numeric:tabular-nums}.cr-card .sub{font-size:13px;color:var(--muted);margin:0 0 12px}
.cr-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin:4px 0 12px;list-style:none;padding:0;counter-reset:s}
.cr-steps li{position:relative;padding:22px 6px 0;text-align:center;font-size:12.5px;color:var(--muted)}
.cr-steps li::before{content:"";position:absolute;top:6px;left:0;right:0;height:3px;background:var(--rule)}
.cr-steps li::after{content:"";position:absolute;top:0;left:50%;width:15px;height:15px;margin-left:-7.5px;border-radius:50%;background:var(--sheet);border:2px solid var(--rule-strong)}
.cr-steps li.done{color:var(--ink)}.cr-steps li.done::before{background:var(--accent)}.cr-steps li.done::after{background:var(--accent);border-color:var(--accent)}
.cr-steps li.now{color:var(--accent);font-weight:650}.cr-steps li.now::after{box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 22%,transparent)}
.cr-steps li small{display:block;font-weight:400;color:var(--muted);font-variant-numeric:tabular-nums}
.cr-kv{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;font-size:13.5px;margin:0}.cr-kv dt{color:var(--muted)}.cr-kv dd{margin:0;font-variant-numeric:tabular-nums}
.cr-st{display:inline-block;font-size:12px;font-weight:650;padding:2px 9px;border-radius:99px;white-space:nowrap}
.cr-st.submitted{background:rgba(91,107,128,.12);color:#46546A}.cr-st.review{background:rgba(201,138,4,.14);color:#8A5A00}.cr-st.verified{background:rgba(20,122,74,.12);color:#147A4A}.cr-st.closed{background:rgba(91,107,128,.12);color:#46546A}
[data-theme=dark] .cr-st.submitted,[data-theme=dark] .cr-st.closed{color:#B8C2CF}[data-theme=dark] .cr-st.review{color:#F2D58E}[data-theme=dark] .cr-st.verified{color:#7DD3A8}
.cr-t{width:100%;border-collapse:collapse;font-size:13.5px}.cr-t th{font-size:12px;color:var(--muted);font-weight:600;text-align:left;padding:6px 8px;border-bottom:1px solid var(--rule)}
.cr-t td{padding:8px;border-bottom:1px solid var(--rule);vertical-align:top;font-variant-numeric:tabular-nums}.cr-t td.ref{font-weight:650;white-space:nowrap}
.cr-t tr.mine td.ref::after{content:" (you)";font-weight:400;color:var(--muted);font-size:12px}
.cr-empty{padding:14px;text-align:center;color:var(--muted);font-size:13.5px;border:1px dashed var(--rule);border-radius:10px}
.cr-how{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;list-style:none;padding:0;margin:0}
.cr-how li{border:1px solid var(--rule);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.45;color:var(--ink-2)}.cr-how li .cr-st{margin-bottom:6px}
.cr-scroll{overflow-x:auto}
.cr-t td,.cr-t th{text-align:left!important}
.ver-chip{text-decoration:none}.ver-chip:hover{border-color:var(--accent)}
@media (max-width:760px){.cr-how{grid-template-columns:1fr 1fr}.cr-t .hide-s{display:none}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ data */
const PAGES=(typeof TABS!=='undefined'?TABS:[]).filter(t=>!['home','contact','iso','mto'].includes(t[0]));
const LBL=k=>(PAGES.find(t=>t[0]===k)||[k,k])[1];
const STS={submitted:'Submitted',review:'Under review',verified:'Verified, corrected',closed:'Closed, no change needed'};
const KEY='pr_corr_sent';
const mine=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
const saveMine=a=>{try{localStorage.setItem(KEY,JSON.stringify(a.slice(-50)))}catch(e){}};
const today=()=>new Date().toISOString().slice(0,10);
const fmtD=d=>{if(!d)return '—';const x=new Date(d+'T00:00:00');return isNaN(x)?d:x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});};
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
/* reference: PR-C-YYMMDD-XXXX (C correction, Q question, I idea), no look-alike letters */
const ABC='23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const newRef=type=>{const d=new Date(),p=n=>String(n).padStart(2,'0');let r='';const a=new Uint8Array(4);(crypto||window.msCrypto).getRandomValues(a);a.forEach(b=>r+=ABC[b%ABC.length]);
 return `PR-${type==='Question'?'Q':type==='New tool idea'?'I':'C'}-${String(d.getFullYear()).slice(2)}${p(d.getMonth()+1)}${p(d.getDate())}-${r}`;};
let LOG={datasets:{},items:[]};
const loaded=fetch('assets/corrections.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(j=>{if(j)LOG=j;}).catch(()=>{});
const ver=k=>LOG.datasets&&LOG.datasets[k]?LOG.datasets[k]:null;

/* ------------------------------------------------------------ form: page select, reference, data version */
const inp=F.querySelector('#cfPage');
const sel=document.createElement('select');sel.className='inp';sel.id='cfPageSel';sel.setAttribute('aria-label','Page or tool');
sel.innerHTML='<option value="">Choose a page…</option>'+PAGES.map(t=>`<option value="${t[0]}">${esc(t[1])}</option>`).join('')+'<option value="other">Other / whole site</option>';
inp.hidden=true;inp.after(sel);
const guess=()=>{const v=(inp.value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();const t=PAGES.find(t=>t[1].toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()===v)||PAGES.find(t=>v&&t[1].toLowerCase().includes(v.split(' ')[0]));return t?t[0]:'';};
sel.value=guess();
const meta=document.createElement('div');meta.className='cr-meta cf-corr';meta.setAttribute('aria-live','polite');
F.querySelector('.cf-grid').after(meta);
let REF=newRef(F.type.value);
const showMeta=()=>{const k=sel.value,v=ver(k),t=F.type.value;if(!REF.includes(`-${t==='Question'?'Q':t==='New tool idea'?'I':'C'}-`))REF=newRef(t);
 meta.innerHTML=`<span>Reference <b>${REF}</b></span>${t==='Correction'?`<span>Affected data <b>${k&&k!=='other'?esc(LBL(k))+(v?` v${v.v}`:''):'not chosen'}</b>${v?` (updated ${fmtD(v.date)})`:''}</span>`:''}<span>Date <b>${fmtD(today())}</b></span>`;
 meta.classList.toggle('cf-corr',t==='Correction');};
sel.addEventListener('change',()=>{inp.value=sel.value&&sel.value!=='other'?LBL(sel.value):sel.value==='other'?'Other / whole site':'';showMeta();});
F.addEventListener('change',e=>{if(e.target.name==='type')showMeta();});
sel.dispatchEvent(new Event('change'));loaded.then(showMeta);

/* hooks used by the send code in app.js */
window.__corr={
 fields(type){const k=sel.value,v=ver(k);return {reference_no:REF,submitted_on:today(),...(type==='Correction'?{page_key:k||'(not chosen)',data_version:v?`v${v.v} (${v.date})`:'(not versioned)'}:{})};},
 sent(type){const k=sel.value,v=ver(k),rec={ref:REF,date:today(),type,page:k,ver:v?v.v:''};saveMine([...mine(),rec]);const r=REF;REF=newRef(type);sel.value='';inp.value='';showMeta();draw();return r;}};

/* ------------------------------------------------------------ tracking, history, versions */
const box=document.createElement('div');box.id='corr-app';
(P.querySelector('.cf-or')||F).before(box);
function steps(it){const order=['submitted','review','verified'],s=it.status==='closed'?'verified':it.status,idx=order.indexOf(s);
 const dt=st=>{const h=(it.history||[]).find(x=>x.status===st||(st==='verified'&&x.status==='closed'));return h?fmtD(h.date):st==='submitted'?fmtD(it.submitted):'';};
 return `<ol class="cr-steps">${order.map((o,i)=>`<li class="${i<idx?'done':i===idx?'done now':''}">${o==='verified'&&it.status==='closed'?'Closed':STS[o].split(',')[0]}<small>${dt(o)||'&nbsp;'}</small></li>`).join('')}</ol>`;}
function card(it,local){
 if(!it&&local)it={ref:local.ref,page:local.page,submitted:local.date,status:'submitted',from:local.ver,history:[{date:local.date,status:'submitted'}]};
 return `<div class="cr-card"><h3>${esc(it.ref)} <span class="cr-st ${it.status}">${STS[it.status]||it.status}</span></h3><p class="sub">${esc(LBL(it.page)||'')}${it.item?' · '+esc(it.item):''}</p>${steps(it)}
 <dl class="cr-kv"><dt>Submitted</dt><dd>${fmtD(it.submitted)}</dd>
 <dt>Data version</dt><dd>${it.from?'v'+esc(it.from):'—'}${it.to?` → <b>v${esc(it.to)}</b>`:''}</dd>
 <dt>Date of correction</dt><dd>${it.corrected?fmtD(it.corrected):it.status==='closed'?'No change needed':'Not yet'}</dd>
 ${it.summary?`<dt>Outcome</dt><dd>${esc(it.summary)}</dd>`:''}
 ${(it.history||[]).length?`<dt>History</dt><dd>${it.history.map(h=>`${fmtD(h.date)}: ${STS[h.status]||h.status}${h.note?' – '+esc(h.note):''}`).join('<br>')}</dd>`:''}</dl>
 ${!LOG.items.find(x=>x.ref===it.ref)?'<p class="sub" style="margin:10px 0 0">Received. It appears in the public history once the review starts.</p>':''}</div>`;}
function find(ref){ref=(ref||'').trim().toUpperCase();const out=box.querySelector('.cr-res');if(!ref){out.innerHTML='';return;}
 const it=LOG.items.find(x=>x.ref.toUpperCase()===ref),loc=mine().find(x=>x.ref.toUpperCase()===ref);
 out.innerHTML=it||loc?card(it,loc):`<div class="cr-empty">No correction found for <b>${esc(ref)}</b>. Check the number (format PR-C-YYMMDD-XXXX). New submissions show here from the browser they were sent from, and for everyone once the review starts.</div>`;
 try{history.replaceState(null,'',location.pathname+'?ref='+encodeURIComponent(ref)+'#track');}catch(e){}}
function draw(){
 const my=mine().slice().reverse(),items=LOG.items.slice().sort((a,b)=>(b.submitted||'').localeCompare(a.submitted||'')),mineRefs=new Set(my.map(x=>x.ref));
 const ds=Object.entries(LOG.datasets||{}).filter(([k])=>PAGES.some(t=>t[0]===k));
 box.innerHTML=`
 <section class="cr-sec" id="track"><h2>Track a correction</h2><p>Enter the reference number you got after sending a correction.</p>
  <form class="cr-find" role="search"><input id="crRef" placeholder="PR-C-261115-ABCD" aria-label="Reference number" maxlength="24" autocomplete="off"><button type="submit">Check status</button></form><div class="cr-res" aria-live="polite"></div>
  ${my.length?`<h3 style="font-size:14px;margin:16px 0 6px">Sent from this browser</h3><div class="cr-scroll"><table class="cr-t"><thead><tr><th>Reference</th><th>Page</th><th>Sent</th><th>Status</th></tr></thead><tbody>${my.map(m=>{const it=LOG.items.find(x=>x.ref===m.ref),st=it?it.status:'submitted';return `<tr><td class="ref"><a href="#track" data-ref="${esc(m.ref)}">${esc(m.ref)}</a></td><td>${esc(m.page&&m.page!=='other'?LBL(m.page):m.type)}</td><td>${fmtD(m.date)}</td><td><span class="cr-st ${st}">${STS[st]}</span></td></tr>`;}).join('')}</tbody></table></div>`:''}
 </section>
 <section class="cr-sec" id="corr-how"><h2>How a correction is handled</h2><p>Every message gets a reference number. Corrections then move through these steps; the date and the data version are logged at each step.</p>
  <ul class="cr-how"><li><span class="cr-st submitted">Submitted</span><br>Received with a reference number and the version of the data you were looking at.</li>
  <li><span class="cr-st review">Under review</span><br>Being checked against the standard, table and edition you named.</li>
  <li><span class="cr-st verified">Verified, corrected</span><br>Value fixed on the site. The page's data version goes up and the date of correction is logged.</li>
  <li><span class="cr-st closed">Closed, no change</span><br>The value was already right (for example a different edition or a rounding note). The reason is logged.</li></ul></section>
 <section class="cr-sec" id="corr-history"><h2>Correction history</h2><p>All reviewed corrections, newest first.${LOG.updated?` Log updated ${fmtD(LOG.updated)}.`:''}</p>
  ${items.length?`<div class="cr-scroll"><table class="cr-t"><thead><tr><th>Reference</th><th>Page</th><th class="hide-s">What</th><th>Submitted</th><th>Status</th><th>Corrected on</th><th>Data version</th></tr></thead><tbody>${items.map(it=>`<tr${mineRefs.has(it.ref)?' class="mine"':''}><td class="ref"><a href="#track" data-ref="${esc(it.ref)}">${esc(it.ref)}</a></td><td>${esc(LBL(it.page))}</td><td class="hide-s">${esc(it.item||'')}</td><td>${fmtD(it.submitted)}</td><td><span class="cr-st ${it.status}">${STS[it.status]||it.status}</span></td><td>${it.corrected?fmtD(it.corrected):'—'}</td><td>${it.from?'v'+esc(it.from):''}${it.to?' → v'+esc(it.to):''}</td></tr>`).join('')}</tbody></table></div>`:'<div class="cr-empty">No corrections logged yet. Spotted a wrong value? Use the form above.</div>'}
 </section>
 <section class="cr-sec" id="data-versions"><h2>Data versions</h2><p>Each page's data has a version. It goes up whenever a verified correction changes a value, so you can tell which numbers you used.</p>
  <div class="cr-scroll"><table class="cr-t"><thead><tr><th>Page</th><th>Version</th><th>Last updated</th><th>Corrections</th></tr></thead><tbody>${ds.map(([k,v])=>{const n=LOG.items.filter(x=>x.page===k&&x.status==='verified').length;return `<tr><td><a href="${typeof PAGE!=='undefined'&&PAGE[k]?PAGE[k]:'#'}">${esc(LBL(k))}</a></td><td><b>v${esc(v.v)}</b></td><td>${fmtD(v.date)}</td><td>${n||'—'}</td></tr>`;}).join('')}</tbody></table></div></section>`;
 const fi=box.querySelector('.cr-find');fi.addEventListener('submit',e=>{e.preventDefault();find(box.querySelector('#crRef').value);});
 const q=new URLSearchParams(location.search).get('ref');if(q){box.querySelector('#crRef').value=q;find(q);}}
box.addEventListener('click',e=>{const a=e.target.closest('a[data-ref]');if(!a)return;e.preventDefault();box.querySelector('#crRef').value=a.dataset.ref;find(a.dataset.ref);box.querySelector('#track').scrollIntoView({behavior:'smooth',block:'start'});});
draw();loaded.then(()=>{draw();if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView({block:'start'});}});
})();
