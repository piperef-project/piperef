/* CAD commands page: task finder + search + category filter + print. */
(function(){
const P=document.getElementById('p-cad');if(!P)return;
const q=P.querySelector('#cdQ'),rows=[...P.querySelectorAll('#cdT tbody tr')],none=P.querySelector('#cdNone');let cat='all';
function apply(){const s=(q.value||'').trim().toLowerCase();let n=0;
  rows.forEach(r=>{const ok=(cat==='all'||r.dataset.c===cat)&&(!s||r.textContent.toLowerCase().includes(s));r.hidden=!ok;if(ok)n++;});
  none.hidden=n>0;}
q.addEventListener('input',apply);
function setCat(c){cat=c;P.querySelectorAll('.cd-chip').forEach(x=>x.classList.toggle('on',x.dataset.c===c));}
P.querySelectorAll('.cd-chip').forEach(b=>b.addEventListener('click',()=>{setCat(b.dataset.c);apply();}));
const pr=P.querySelector('#cdPrint');if(pr)pr.addEventListener('click',()=>{q.value='';setCat('all');apply();P.querySelectorAll('.cd-fix').forEach(d=>d.open=true);window.print();});
// ---- task finder ----
const a=P.querySelector('#cdA'),out=P.querySelector('#cdOut'),tEl=P.querySelector('#cd-tasks');if(!a||!out||!tEl)return;
const TASKS=JSON.parse(tEl.textContent);
const CMDS=new Set(rows.map(r=>r.querySelector('code').textContent));
const STOP=new Set('a an the to of in on for and or i want need how do can my me is it with from into all this that drawing dwg autocad bricscad cad please way make get some one'.split(' '));
const SYN={delete:'remove',erase:'remove',double:'duplicate',overlap:'duplicate',overlapping:'duplicate',qty:'count',quantity:'count',tally:'count',total:'count',
 numbering:'number',renumber:'number',sequence:'number',sequential:'number',spreadsheet:'excel',csv:'excel',xls:'excel',xlsx:'excel',iso:'isometric',isometrics:'isometric',
 plot:'print',printing:'print',dashed:'dashed',hidden:'dashed',center:'centre',centerline:'centreline',bom:'mto',takeoff:'mto','take-off':'mto',tags:'tag',valves:'valve',
 lines:'line',blocks:'block',layers:'layer',dimensions:'dimension',dims:'dimension',dim:'dimension',xrefs:'xref',reference:'xref',references:'xref',crop:'clip',
 shrink:'smaller',reduce:'smaller',big:'size',heavy:'size',corrupt:'damaged',corrupted:'damaged',broken:'damaged',pipes:'pipe',supports:'support'};
const norm=w=>{w=w.toLowerCase().replace(/[^a-z0-9-]/g,'');if(SYN[w])return SYN[w];if(w.length>4&&w.endsWith('ing'))w=w.slice(0,-3);else if(w.length>3&&w.endsWith('es')&&!w.endsWith('ses'))w=w.slice(0,-2);else if(w.length>3&&w.endsWith('s'))w=w.slice(0,-1);return SYN[w]||w;};
const toks=s=>s.split(/[\s,./]+/).map(norm).filter(w=>w&&!STOP.has(w));
const IDX=TASKS.map(([t,k])=>new Set(toks(t+' '+k)));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const link=s=>esc(s).replace(/\b([A-Z][A-Z0-9]{1,15})\b/g,m=>CMDS.has(m)?`<button type="button" class="cd-cmd" data-cmd="${m}">${m}</button>`:m);
function find(){const qt=toks(a.value);if(!qt.length){out.innerHTML='';return;}
  const sc=IDX.map((set,i)=>{let s=0;qt.forEach(w=>{if(set.has(w))s+=2;else if(w.length>=4)for(const x of set){if(x.startsWith(w)||w.startsWith(x)&&x.length>=4){s+=1;break;}}});return [s/(1+qt.length*.15),i];})
    .filter(x=>x[0]>=1.5).sort((x,y)=>y[0]-x[0]).slice(0,3);
  if(!sc.length){out.innerHTML=`<p class="cd-miss">No ready answer for that yet. Try other words, search the command list below, or <a href="contact.html#ask">ask Pipe Ref</a>.</p>`;return;}
  out.innerHTML=sc.map(([s,i],k)=>{const [t,,st]=TASKS[i];return `<div class="cd-ans${k?'':' best'}"><b>${esc(t)}</b><ol>${st.map(x=>`<li>${link(x)}</li>`).join('')}</ol></div>`;}).join('');}
a.addEventListener('input',find);
P.querySelectorAll('.cd-ex').forEach(b=>b.addEventListener('click',()=>{a.value=b.textContent;find();}));
out.addEventListener('click',e=>{const b=e.target.closest('.cd-cmd');if(!b)return;setCat('all');q.value=b.dataset.cmd;apply();q.scrollIntoView({behavior:'smooth',block:'center'});});
window.__cdFind=t=>{a.value=t;find();return [...out.querySelectorAll('.cd-ans b')].map(x=>x.textContent);};
})();
