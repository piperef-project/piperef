/* Learn pages: knowledge base search, lessons learned + shared stories, discussions.
   Content for the knowledge base and typical cases is static HTML in the page; stories and discussions come from the API (moderated). */
(function(){
const API='https://api.piperef.site';
const LIVE=/(^|\.)piperef\.(site|net)$/.test(location.hostname);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const para=s=>esc(s).split(/\n{2,}/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
const TOP={general:'General',layout:'Piping layout',modelling:'3D modelling (S3D, E3D)',materials:'Materials and specs',stress:'Stress and supports',site:'Construction and site',careers:'Careers and industry'};
const KIND={rework:'Rework',safety:'Safety',quality:'Quality',other:'Other'};
const fmtD=d=>{try{return new Date(d+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});}catch(e){return d;}};

/* ---------- preview data (only off piperef.site / piperef.net, so the layout can be reviewed) ---------- */
const MOCK={threads:[{id:1,topic:'layout',title:'Straight length before a pump suction when the vendor gives none?',body:'Preview example. What straight length do you keep before an end-suction centrifugal pump when the vendor drawing gives no requirement?',name:'Preview example',role:'Piping designer',date:'2026-11-16',replies:1,last:'2026-11-16'},
 {id:2,topic:'modelling',title:'Keeping insulation attributes right in the 3D model',body:'Preview example. How do you make sure insulation thickness in the model matches the line list after every revision?',name:'Preview example',role:'Piping lead',date:'2026-11-15',replies:0,last:'2026-11-15'}],
 replies:{1:[{id:1,parent:null,body:'Preview example reply. Many specifications ask for at least 5 pipe diameters, more for double-suction pumps; follow the pump standard and the vendor once data arrives.',name:'Preview example',role:'Rotating equipment',date:'2026-11-16'}]},
 stories:[{id:1,kind:'rework',title:'Preview example: spools remade after a nozzle moved',story:'This is an example shown only in the preview. Real stories appear here after review.',lesson:'Hold piping near equipment until certified vendor data.',name:'Anonymous',role:'Piping designer',date:'2026-11-16'}]};
async function get(path){
 if(!LIVE){await new Promise(r=>setTimeout(r,150));
  if(path==='/api/stories')return {items:MOCK.stories};
  if(path.startsWith('/api/forum/threads/')){const id=+path.split('/').pop(),t=MOCK.threads.find(x=>x.id===id);if(!t)throw new Error('Not found');return {thread:t,replies:MOCK.replies[id]||[]};}
  if(path.startsWith('/api/forum/threads')){const tp=new URLSearchParams(path.split('?')[1]||'').get('topic');return {items:MOCK.threads.filter(t=>!tp||t.topic===tp)};}}
 const r=await fetch(API+path,{headers:{Accept:'application/json'}});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not load');return j;}
async function post(path,data){
 if(!LIVE){await new Promise(r=>setTimeout(r,250));return {ok:true,status:'pending'};}
 const r=await fetch(API+path,{method:'POST',headers:{'content-type':'application/json',Accept:'application/json'},body:JSON.stringify(data)});
 const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not send. Please try again.');return j;}
function bindForm(form,path,done){
 form.addEventListener('submit',async e=>{e.preventDefault();const msg=form.querySelector('.lf-msg'),btn=form.querySelector('button[type=submit]');
  const d=Object.fromEntries(new FormData(form).entries());d.consent=!!form.querySelector('[name=consent]').checked;
  const p=typeof path==='function'?path():path;
  msg.className='lf-msg';msg.textContent='';
  if(!d.consent){msg.className='lf-msg bad';msg.textContent='Please tick the box to confirm nothing confidential is included.';return;}
  btn.disabled=true;msg.textContent='Sending…';
  try{await post(p,d);form.reset();msg.className='lf-msg ok';msg.textContent=LIVE?'Thanks. Your post is waiting for review and will appear once approved.':'Preview only: nothing was sent.';done&&done();}
  catch(err){msg.className='lf-msg bad';msg.textContent=err.message;}
  btn.disabled=false;});}
const chipsBind=(wrap,attr,fn)=>wrap&&wrap.addEventListener('click',e=>{const b=e.target.closest('.kb-chip');if(!b)return;wrap.querySelectorAll('.kb-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));fn(b.dataset[attr]);});

/* ---------- knowledge base ---------- */
function initKB(P){
 const q=P.querySelector('#kbQ');if(!q||P.__kb)return;P.__kb=1;
 let T='all',LVL='all';const n=P.querySelector('#kbN'),em=P.querySelector('#kbEmpty');
 const run=()=>{const s=q.value.trim().toLowerCase(),words=s.split(/\s+/).filter(Boolean);let c=0;
  P.querySelectorAll('.kb-sec').forEach(sec=>{let k=0;const tOk=T==='all'||sec.dataset.t===T;
   sec.querySelectorAll('.kb-q').forEach(d=>{const txt=d.textContent.toLowerCase(),ok=tOk&&(LVL==='all'||d.dataset.l===LVL)&&words.every(w=>txt.includes(w));d.hidden=!ok;if(ok)k++;if(words.length&&ok)d.open=true;else if(!words.length&&!d.dataset.keep)d.open=false;});
   sec.hidden=!k;c+=k;});
  n.textContent=c+(c===1?' answer':' answers');em.hidden=!!c;};
 let tm;q.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(run,120);});
 chipsBind(P.querySelector('.kb-chips:not(.iq-lvs)'),'t',v=>{T=v;run();});chipsBind(P.querySelector('.iq-lvs'),'l',v=>{LVL=v;run();});
 const h=location.hash;if(/^#q-/.test(h)){const d=P.querySelector(h);if(d){d.open=true;d.dataset.keep=1;setTimeout(()=>d.scrollIntoView({block:'start'}),60);}}
 P.querySelectorAll('.kb-perma').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',a.getAttribute('href'));const u=location.href;navigator.clipboard&&navigator.clipboard.writeText(u).then(()=>{a.textContent='Link copied';setTimeout(()=>a.textContent='Link to this answer',1600);}).catch(()=>{});}));}

/* ---------- glossary ---------- */
function initGL(P){
 const q=P.querySelector('#glQ');if(!q||P.__gl)return;P.__gl=1;
 let T='all';const n=P.querySelector('#glN'),em=P.querySelector('#glEmpty'),az=P.querySelector('.gl-az');
 const run=()=>{const s=q.value.trim().toLowerCase(),words=s.split(/\s+/).filter(Boolean);let c=0;
  P.querySelectorAll('.gl-sec').forEach(sec=>{let k=0;
   sec.querySelectorAll('.gl-e').forEach(e=>{const term=e.querySelector('b').textContent.toLowerCase(),txt=e.textContent.toLowerCase();
    const ok=(T==='all'||e.dataset.t===T)&&words.every(w=>txt.includes(w));e.hidden=!ok;if(ok)k++;
    e.classList.toggle('hit',!!s&&term===s);});
   sec.hidden=!k;c+=k;const a=az&&az.querySelector('a[href="#'+sec.id+'"]');if(a)a.classList.toggle('off',!k);});
  n.textContent=c+(c===1?' term':' terms');em.hidden=!!c;};
 let tm;q.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(run,120);});
 chipsBind(P.querySelector('.kb-chips'),'t',v=>{T=v;run();});
 const h=location.hash;if(/^#g-/.test(h)){const e=P.querySelector(h);if(e){e.classList.add('hit');setTimeout(()=>e.scrollIntoView({block:'center'}),60);}}}

/* ---------- lessons learned ---------- */
async function initLessons(P){
 if(P.__ll)return;P.__ll=1;
 chipsBind(P.querySelector('.kb-chips'),'k',v=>P.querySelectorAll('.ll-card').forEach(c=>c.hidden=v!=='all'&&c.dataset.k!==v));
 const box=P.querySelector('#llShared');
 const load=async()=>{try{const j=await get('/api/stories');
   box.innerHTML=j.items.length?`<div class="ll-grid">${j.items.map(s=>`<article class="ll-card ll-real"><div class="ll-top"><span class="ll-tag ll-${esc(s.kind)}">${esc(KIND[s.kind]||s.kind)}</span><span class="ll-typ">${esc(s.name||'Anonymous')}${s.role?' · '+esc(s.role):''} · ${fmtD(s.date)}</span></div><h3>${esc(s.title)}</h3>${para(s.story)}${s.lesson?`<div class="ll-prev"><b>What they learned</b>${para(s.lesson)}</div>`:''}</article>`).join('')}</div>`
    :'<p class="ll-sub">No stories yet. Be the first to share one below.</p>';}
  catch(e){box.innerHTML='<p class="ll-sub">Stories could not load right now. Please try again later.</p>';}};
 load();bindForm(P.querySelector('#stForm'),'/api/stories');}

/* ---------- discussions ---------- */
function initForum(P){
 if(P.__fm)return;P.__fm=1;
 let T='all';const list=P.querySelector('#fmList'),tl=P.querySelector('#fmThreads'),one=P.querySelector('#fmThread');
 const loadList=async()=>{tl.innerHTML='<p class="ll-sub">Loading discussions…</p>';
  try{const j=await get('/api/forum/threads'+(T==='all'?'':'?topic='+T));
   tl.innerHTML=j.items.length?`<ul class="fm-list">${j.items.map(t=>`<li><a href="#t-${t.id}" class="fm-row"><span class="fm-t">${esc(t.title)}</span><span class="fm-ex">${esc(t.body)}${t.body.length>=220?'…':''}</span><span class="fm-meta"><span class="ll-tag">${esc(TOP[t.topic]||t.topic)}</span>${esc(t.name)}${t.role?' · '+esc(t.role):''} · ${fmtD(t.date)} · ${t.replies} ${t.replies===1?'reply':'replies'}</span></a></li>`).join('')}</ul>`
    :`<p class="ll-sub">No discussions in this topic yet. <a href="#new">Start one</a>.</p>`;}
  catch(e){tl.innerHTML='<p class="ll-sub">Discussions could not load right now. Please try again later.</p>';}};
 const replyForm=(tid,parent)=>`<form class="lf fm-rf" data-parent="${parent||''}" novalidate><div class="lf-grid">
   <label class="lf-f lf-w"><span>${parent?'Your reply to this comment':'Your reply'}</span><textarea name="body" rows="4" maxlength="4000" required></textarea></label>
   <label class="lf-f"><span>Display name</span><input name="name" maxlength="60" required></label><label class="lf-f"><span>Your role <i>optional</i></span><input name="role" maxlength="60"></label>
   <label class="lf-hp" aria-hidden="true">Leave empty<input name="botcheck" tabindex="-1" autocomplete="off"></label>
   <label class="lf-ck lf-w"><input type="checkbox" name="consent" required> No company, client, project or personal names, and nothing confidential.</label></div>
   <div class="lf-act"><button class="lf-btn" type="submit">Submit reply for review</button><span class="lf-msg" role="status"></span></div></form>`;
 const showThread=async id=>{list.hidden=true;one.hidden=false;one.innerHTML='<p class="ll-sub">Loading…</p>';
  try{const {thread:t,replies:rs}=await get('/api/forum/threads/'+id);
   const top=rs.filter(r=>!r.parent),kids=p=>rs.filter(r=>r.parent===p);
   const rep=(r,lvl)=>`<div class="fm-rep${lvl?' fm-kid':''}" id="r-${r.id}"><div class="fm-meta"><b>${esc(r.name)}</b>${r.role?' · '+esc(r.role):''} · ${fmtD(r.date)}</div>${para(r.body)}${lvl?'':`<button class="fm-rbtn" type="button" data-r="${r.id}">Reply</button><div class="fm-rslot"></div>`}${kids(r.id).map(k=>rep(k,1)).join('')}</div>`;
   one.innerHTML=`<a class="fm-back" href="#">← All discussions</a><article class="fm-op"><span class="ll-tag">${esc(TOP[t.topic]||t.topic)}</span><h2>${esc(t.title)}</h2><div class="fm-meta"><b>${esc(t.name)}</b>${t.role?' · '+esc(t.role):''} · ${fmtD(t.date)}</div>${para(t.body)}</article>
    <h3 class="fm-h">${rs.length} ${rs.length===1?'reply':'replies'}</h3>${top.map(r=>rep(r,0)).join('')||'<p class="ll-sub">No replies yet.</p>'}
    <h3 class="fm-h">Add a reply</h3>${replyForm(id,null)}`;
   one.querySelectorAll('.fm-rf').forEach(f=>bindForm(f,`/api/forum/threads/${id}/replies`));
   one.addEventListener('click',e=>{const b=e.target.closest('.fm-rbtn');if(!b)return;const slot=b.nextElementSibling;if(slot.innerHTML){slot.innerHTML='';return;}
    slot.innerHTML=replyForm(id,b.dataset.r);const f=slot.querySelector('form');
    bindFormParent(f,id,b.dataset.r);f.querySelector('textarea').focus();});
   document.title=t.title+' | Discussions | Pipe Ref';P.scrollIntoView({block:'start'});}
  catch(e){one.innerHTML='<a class="fm-back" href="#">← All discussions</a><p class="ll-sub">That discussion was not found or is waiting for review.</p>';}};
 const bindFormParent=(f,id,parent)=>{f.addEventListener('submit',e=>{const h=f.querySelector('[name=parent]')||Object.assign(document.createElement('input'),{type:'hidden',name:'parent'});h.value=parent;f.appendChild(h);},{capture:true});bindForm(f,`/api/forum/threads/${id}/replies`);};
 const nf=[P.querySelector('#new'),P.querySelector('#fmForm')];const route=()=>{const m=location.hash.match(/^#t-(\d+)$/);nf.forEach(x=>x.hidden=!!m);if(m)showThread(+m[1]);else{one.hidden=true;list.hidden=false;document.title='Discussions | Pipe Ref';if(location.hash==='#new')setTimeout(()=>P.querySelector('#new').scrollIntoView({block:'start'}),30);}};
 window.addEventListener('hashchange',route);
 chipsBind(P.querySelector('#fmList .kb-chips'),'t',v=>{T=v;loadList();});
 one.addEventListener('click',e=>{if(e.target.closest('.fm-back')){e.preventDefault();history.pushState(null,'',location.pathname);route();}});
 bindForm(P.querySelector('#fmForm'),'/api/forum/threads');
 loadList();route();}

window.renderLearn=()=>{const k=typeof TAB!=='undefined'?TAB:'';const P=document.getElementById('p-'+k);if(!P)return;
 if(k==='kb'||k==='iq')initKB(P);else if(k==='gl')initGL(P);else if(k==='lessons')initLessons(P);else if(k==='forum')initForum(P);};
window.renderLearn();
})();
