/* Pipe Ref · interface layer
   Runs after app.js and only reads its data and helpers (PIPEMAP, FL, flRow, bwRow, L, ul, wt, wu, U, SEL, FLC,
   TABS, PAGE, TAB_ICON, HOME_DESC, NAV_GROUPS, TAB_STD, store). No engineering values are computed here
   except by calling those same helpers, so search answers always match the tables. */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const plain=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent.trim();};
const isMac=/Mac|iPhone|iPad/.test(navigator.platform||'');
const SVG=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const ICO={search:SVG('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),copy:SVG('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
 val:SVG('<path d="M4 7h16M4 12h10M4 17h7"/>'),calc:SVG('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>')};

/* ---------- clipboard + toast ---------- */
const toastEl=$('#toast');let toastT;
function toast(msg){if(!toastEl)return;toastEl.textContent=msg;toastEl.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove('on'),1800);}
function copy(text,msg){const done=()=>toast(msg||`Copied ${text.length>40?'to clipboard':text}`);
 const fb=()=>{const t=document.createElement('textarea');t.value=text;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy');done();}catch(e){toast('Copy is blocked by the browser. Select the value and press Ctrl+C.');}t.remove();};
 try{navigator.clipboard.writeText(text).then(done,fb);}catch(e){fb();}}
function flash(el){el.classList.remove('copied');void el.offsetWidth;el.classList.add('copied');}

/* ---------- mobile drawer ---------- */
const menuBtn=$('#menuBtn'),scrim=$('#scrim');
function setNav(open){document.body.classList.toggle('nav-open',open);if(menuBtn)menuBtn.setAttribute('aria-expanded',open);if(scrim)scrim.hidden=!open;
 if(open){const a=$('#tabs [aria-current="page"]')||$('#tabs a');a&&a.focus();}}
menuBtn&&menuBtn.addEventListener('click',()=>setNav(!document.body.classList.contains('nav-open')));
scrim&&scrim.addEventListener('click',()=>{setNav(false);menuBtn.focus();});
matchMedia('(min-width:961px)').addEventListener('change',e=>{if(e.matches)setNav(false);});

/* ---------- page bar: breadcrumb + governing standards ---------- */
function pageBar(){const k=document.body.dataset.page;if(k==='home'||$('.pagebar'))return;
 const g=typeof tabGroup==='function'?tabGroup(k):'',lbl=(TABS.find(t=>t[0]===k)||[,''])[1],std=(TAB_STD[k]||'');
 const chips=std&&std!=='All tables'?std.split(' / ').map(s=>`<span class="std-chip"><i></i>${/^(B|PFI)/.test(s)?'ASME ':''}${esc(s)}</span>`).join(''):'';
 const bar=document.createElement('div');bar.className='pagebar';
 bar.innerHTML=`<ol class="crumbs" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li>${g&&g!==lbl?`<li><span>${esc(g)}</span></li>`:''}<li><span aria-current="page">${esc(lbl)}</span></li></ol><div class="stds" aria-label="Governing standards">${chips}</div>`;
 $('#main').prepend(bar);}

/* ---------- search index ---------- */
const KW={size:'line size summary everything one sheet',pipe:'od outside diameter wall thickness id inside diameter schedule weight kg/m b36.10 b36.19 pipe id flow area',
 flange:'b16.5 wn weld neck slip on socket weld threaded npt lap joint stub end blind flange bolt circle pcd stud bolting raised face rf hub class 400',pt:'pressure temperature rating class 150 300 400 600 900 1500 2500 material group 1.1 2.1 2.2 carbon steel 304 316 stainless flange rating',
 bw:'b16.9 elbow 90 45 tee reducer cap return lr sr butt weld centre to end center',sw:'b16.11 socket weld threaded npt coupling forged fittings 3000 6000 b1.20.1 thread',
 gasket:'b16.20 spiral wound gasket winding centering ring inner ring filler graphite ptfe',blind:'b16.48 spectacle figure 8 paddle blank spacer rtj line blind',
 span:'support span spacing pipe supports b31.1 deflection',sup:'pipe supports shoe guide line stop anchor hold down u-bolt trunnion dummy leg clevis hanger clamp riser spring variable constant snubber pipe roll slide plate ptfe cold shoe mss sp-58 3d',spc:'rack spacing centre to centre pipe rack clearance insulation',
 vdim:'valve face to face b16.10 api 609 butterfly gate globe check ball handwheel stem height',fj:'flange joint assembly bolt length stud length gasket thickness flange gap bolt torque tightening sequence star cross pattern pcc-1 bolt up',rack:'pipe rack width calculator tiers process utility fire water cable tray future space section drawing pdf dxf dwg',cv:'control valve actuator dimensions pneumatic diaphragm positioner electro pneumatic e/p motorised motorized electric actuator esv esdv shutdown valve scotch yoke spring return solenoid limit switch',valve:'valve access operability handwheel height reach f1166',
 shoe:'shoe support spool minimum spool length bolt removal clearance stud pipe support',acc:'access maintenance escape route crane road lift clearance',
 eqck:'equipment vendor drawing datasheet nozzle checklist verify',calc:'calculator wall thickness b31.3 flange class bolt length rolling offset slope elbow take-off unit converter pipe id',
 iso:'isometric iso compare revision pdf pcf ifc',contact:'email feedback correction report value'};
const CALCS=[['c-wall','Pipe wall thickness','B31.3 Eq. 3a, t = PD / 2(SEW + PY)','wall thickness pressure design b31.3 pipe id'],['c-pt','Flange class selection','B16.5 Groups 1.1, 2.1, 2.2, interpolated at temperature','flange class rating pressure temperature'],
 ['c-elb','Elbow take-off','A = R × tan(θ/2) for any bend angle','elbow take off cut angle'],['c-off','Rolling offset','Travel and run with fittings of angle θ','rolling offset travel run'],
 ['c-slope','Pipe slope','Drop, slope or run length','slope fall gradient drop'],['c-bolt','Bolt length','Stud or machine bolt for RF joints, B16.5','bolt stud length bolting removal clearance'],
 ['c-sp','Line spacing on a rack','Centre-to-centre with flange and insulation','rack spacing'],['c-cv','Unit converter','Length, pressure and temperature','convert unit bar psi mm inch']];
const ITEMS=[];
NAV_GROUPS.forEach(([g,ks])=>ks.forEach(k=>ITEMS.push({k,t:(TABS.find(t=>t[0]===k)||[,k])[1],d:HOME_DESC[k]||'',s:TAB_STD[k]==='All tables'?'':TAB_STD[k]||'',g,href:PAGE[k],kw:KW[k]||'',ic:TAB_ICON[k]})));
CALCS.forEach(([id,t,d,kw])=>ITEMS.push({k:'calc',t,d,s:'Calculator',g:'Calculators',href:'calculators.html#'+id,kw,ic:ICO.calc}));
ITEMS.push({k:'contact',t:'Contact & corrections',d:HOME_DESC.contact||'',s:'',g:'Help',href:PAGE.contact,kw:KW.contact,ic:TAB_ICON.contact});

/* ---------- query parsing ---------- */
const SIZE_KEYS=PIPE.map(p=>p[0]);
function toSize(v){const x=SIZE_KEYS.find(k=>Math.abs(fr(k)-v)<1e-6);return x||null;}
function parse(q){let s=' '+q.toLowerCase().replace(/[″"]/g,' ').replace(/\s+/g,' ')+' ';const r={};
 s=s.replace(/\b(?:cl(?:ass)?\.?\s*|#\s*)(\d{3,4})\b|\b(\d{3,4})\s*(?:#|lbs?\b)/,(m,a,b)=>{const c=a||b;if(CLASSES.includes(c)){r.cls=c;return ' ';}return m;});
 s=s.replace(/\bsch(?:edule)?\.?\s*(\d{1,3}s?|std|xxs|xs)\b/,(m,a)=>{r.sch=a;return ' ';});
 if(!r.sch)s=s.replace(/\s(std|xxs|xs|\d{1,2}s)(?=\s)/,(m,a)=>{r.sch=a;return ' ';});
 if(r.sch){let k=r.sch.toUpperCase();if(k==='40S')k='STD';if(k==='80S')k='XS';r.sch=k;}
 s=s.replace(/\bdn\s*(\d{1,4})\b/,(m,a)=>{const k=Object.keys(DN).find(n=>DN[n]===+a);if(k){r.nps=k;return ' ';}return m;});
 if(!r.nps)s=s.replace(/\s(?:nps\s*)?(\d{1,2})[\s-](\d)\/(\d{1,2})(?=\s)|\s(?:nps\s*)?(\d)\/(\d{1,2})(?=\s)|\s(?:nps\s*)?(\d{1,2}(?:\.\d{1,3})?|\.\d{1,3})(?:\s?in(?:ch)?)?(?=\s)/,(m,a,b,c,d,e,f)=>{
  const v=a?+a+b/c:d?d/e:+f;const k=toSize(v);if(k){r.nps=k;return ' ';}return m;});
 if(!r.cls&&r.nps)s=s.replace(/\s(\d{3,4})(?=\s)/,(m,a)=>{if(CLASSES.includes(a)){r.cls=a;return ' ';}return m;});
 const w=s.trim().split(/\s+/).filter(Boolean);
 r.bw=w.find(x=>/^(elbows?|ells?|bends?|tees?|reducers?|caps?|returns?|180|fittings?|b16\.9)$/.test(x));
 r.fl=w.some(x=>/^(flanges?|flg|wn|pcd|bolting|b16\.5)$/.test(x));
 r.pipe=w.some(x=>/^(pipe|od|id|wall|thk|thickness|weight)$/.test(x));
 r.words=w;return r;}

/* ---------- answers (values from app.js helpers) ---------- */
const val=h=>{const t=plain(String(h));return t&&t!=='—'?t:'—';};
function ansPipe(n,sch){const p=PIPEMAP[n];let s=sch&&p[2][sch]!=null?sch:(p[2].STD!=null?'STD':Object.keys(p[2])[0]);const D=p[1],t=p[2][s];
 const miss=sch&&p[2][sch]==null?`Sch ${sch} is not listed for NPS ${n}. Showing Sch ${s}.`:'';
 return {id:'pipe',title:`Pipe NPS ${n}″ / DN ${DN[n]}, Sch ${s}`,src:'ASME B36.10M / B36.19M',href:PAGE.pipe,set:{nps:n,pss:s},miss,
  vals:[['OD',L(D,'od'),ul()],['Wall',L(t,'w'),ul()],['ID',L(D-2*t,'od'),ul()],['Weight, empty',wt(D,t).toFixed(2),wu()]]};}
function ansFl(n,c){const f=flRow(c,n),base={id:'fl',title:`B16.5 flange NPS ${n}″, Class ${c}`,src:'ASME B16.5',href:PAGE.flange,set:{nps:n,flc:c}};
 if(!f)return {...base,vals:[],miss:FL['150'].nps.includes(n)?`NPS ${n} is not listed in B16.5 Class ${c}. Try another class or the next standard size.`:`NPS ${n} is outside B16.5, which covers NPS ½ to 24. Use B16.47 Series A or B for larger flanges.`};
 return {...base,vals:[['Flange OD',L(f.O),ul()],['Thickness tf',L(f.tf),ul()],['Bolt circle',L(f.BC),ul()],['Bolting',`${f.n} × ${f.d}″`,''],['RF diameter',L(f.R),ul()],['WN length Y',L(f.Y),ul()]]};}
function ansBw(n,kind){const b=bwRow(n),base={id:'bw',title:`B16.9 fittings NPS ${n}″`,src:'ASME B16.9',href:PAGE.bw,set:{nps:n}};
 if(!b)return {...base,vals:[],miss:`NPS ${n} is not covered by the B16.9 table on this site.`};
 const all={elbow:[['90° LR, A',b.lr90],['45° LR, B',b.lr45],['90° SR',b.sr90],['90° 3D',b.d390]],ret:[['180° LR, O',b.r180O]],tee:[['Tee c-e, C',b.tee]],red:[['Reducer, H',b.red]],cap:[['Cap, E',b.cap]]};
 const k=/^ell|^elb|^bend/.test(kind)?'elbow':/^ret|^180/.test(kind)?'ret':/^tee/.test(kind)?'tee':/^red/.test(kind)?'red':/^cap/.test(kind)?'cap':null;
 const rows=k?[...all[k],...(k==='elbow'?all.ret:[])]:[...all.elbow.slice(0,2),...all.tee,...all.red,...all.cap];
 return {...base,vals:rows.map(([l,v])=>[l,L(v,'fit'),ul()])};}
function answers(r){if(!r.nps)return [];const out=[];
 if(r.bw)out.push(ansBw(r.nps,r.bw));
 if(r.fl||r.cls)out.push(ansFl(r.nps,r.cls||FLC));
 if(r.pipe||r.sch||!out.length)out.push(ansPipe(r.nps,r.sch));
 return out;}
const ansText=a=>`${a.title}: `+a.vals.map(([k,v,u])=>`${k} ${val(v)}${u?' '+u:''}`).join(', ');

/* ---------- search dialog ---------- */
const dlg=$('#cmdk'),inp=$('#cmdkInput'),list=$('#cmdkList');let RES=[],CUR=0,OPENER=null;
const sbk=$('.sb-k');if(sbk)sbk.textContent=isMac?'⌘ K':'Ctrl K';
function open(q=''){if(!dlg)return;OPENER=document.activeElement;setNav(false);dlg.hidden=false;document.body.style.overflow='hidden';inp.value=q;run();inp.focus();inp.select();}
function close(){if(!dlg||dlg.hidden)return;dlg.hidden=true;document.body.style.overflow='';OPENER&&OPENER.focus&&OPENER.focus();}
function hl(t,ws){let h=esc(t);ws.forEach(w=>{if(w.length<2)return;h=h.replace(new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>');});return h;}
function run(){const q=inp.value.trim(),r=parse(q),ans=answers(r);
 const ws=r.words.filter(w=>!/^(flanges?|flg|pipe|elbows?|ells?|tees?|reducers?|caps?|fittings?|od|id|wall|weight)$/.test(w)||!ans.length);
 let pages=[];
 if(!q)pages=ITEMS.filter(i=>i.g!=='Calculators');
 else if(ws.length){pages=ITEMS.map(i=>{const hay=(i.t+' '+i.d+' '+i.s+' '+i.kw+' '+i.g).toLowerCase(),t=i.t.toLowerCase();let sc=0;
   for(const w of ws){if(!hay.includes(w))return null;sc+=t.startsWith(w)?30:t.includes(w)?15:i.s.toLowerCase().includes(w)?10:3;}return {...i,sc};}).filter(Boolean).sort((a,b)=>b.sc-a.sc).slice(0,8);}
 else if(ans.length){const rel={pipe:['pipe','size'],fl:['flange','pt','gasket','blind'],bw:['bw','size']};const ks=[...new Set(ans.flatMap(a=>rel[a.id]))];pages=ks.map(k=>ITEMS.find(i=>i.k===k&&!i.href.includes('#')));}
 RES=[...ans.map(a=>({type:'ans',...a})),...pages.map(p=>({type:'page',...p}))];CUR=0;
 if(!RES.length){list.innerHTML=`<div class="cmdk-empty"><b>No results for “${esc(q)}”.</b><br>Search a size with a schedule or class, a standard such as B16.9, or a tool name.<br>${['6 sch 80','3 cl600 flange','B16.20','bolt length'].map(x=>`<button type="button" data-q="${x}">${x}</button>`).join('')}</div>`;return;}
 let h='',grp=null;
 RES.forEach((it,i)=>{const g=it.type==='ans'?'Values · '+(U==='mm'?'millimetres':'inches'):(q?'Pages and tools':it.g);if(g!==grp){h+=`<div class="cmdk-g" role="presentation">${esc(g)}</div>`;grp=g;}
  if(it.type==='ans')h+=`<div class="cmdk-it" role="option" id="ci${i}" data-i="${i}" aria-selected="false">${ICO.val}<div class="ci-b"><div class="ci-t">${esc(it.title)}</div><div class="ci-d">${esc(it.src)} · press Enter to open the table</div>${it.miss?`<div class="ans-x">${esc(it.miss)}</div>`:''}${it.vals.length?`<div class="ans">${it.vals.map(([k,v,u])=>`<div><span>${esc(k)}</span><b>${esc(val(v))}${u?`<u>${esc(u)}</u>`:''}</b></div>`).join('')}</div>`:''}</div>${it.vals.length?`<button class="ci-copy" type="button" tabindex="-1" data-copyi="${i}">Copy</button>`:''}</div>`;
  else h+=`<div class="cmdk-it" role="option" id="ci${i}" data-i="${i}" aria-selected="false">${it.ic||''}<div class="ci-b"><div class="ci-t">${hl(it.t,ws)}</div><div class="ci-d">${esc(it.d)}</div></div>${it.s?`<span class="ci-s">${esc(it.s)}</span>`:''}</div>`;});
 list.innerHTML=h;sel(0);}
function sel(i){if(!RES.length)return;CUR=(i+RES.length)%RES.length;$$('.cmdk-it',list).forEach(e=>e.setAttribute('aria-selected',+e.dataset.i===CUR));
 const e=$('#ci'+CUR);if(e){inp.setAttribute('aria-activedescendant','ci'+CUR);e.scrollIntoView({block:'nearest'});}}
function go(i){const it=RES[i];if(!it)return;if(it.type==='ans'){for(const k in it.set)store.set(k,it.set[k]);}
 const here=location.pathname.split('/').pop()||'index.html',[file,hash]=it.href.split('#');
 if(file===here&&it.type!=='ans'){close();if(hash){const t=document.getElementById(hash);t&&t.scrollIntoView({block:'start'});}else window.scrollTo({top:0});return;}
 location.href=it.href;}
if(dlg){
 inp.addEventListener('input',run);
 inp.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();sel(CUR+1);}else if(e.key==='ArrowUp'){e.preventDefault();sel(CUR-1);}
  else if(e.key==='Enter'){e.preventDefault();go(CUR);}else if(e.key==='Escape'){e.preventDefault();close();}
  else if(e.key==='Tab'){e.preventDefault();sel(CUR+(e.shiftKey?-1:1));}
  else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='c'&&inp.selectionStart===inp.selectionEnd){const it=RES[CUR];if(it&&it.type==='ans'&&it.vals.length){e.preventDefault();copy(ansText(it),'Copied '+it.title);}}});
 list.addEventListener('mousemove',e=>{const it=e.target.closest('.cmdk-it');if(it&&+it.dataset.i!==CUR)sel(+it.dataset.i);});
 list.addEventListener('click',e=>{const c=e.target.closest('[data-copyi]');if(c){e.stopPropagation();const it=RES[+c.dataset.copyi];copy(ansText(it),'Copied '+it.title);inp.focus();return;}
  const q=e.target.closest('[data-q]');if(q){inp.value=q.dataset.q;run();inp.focus();return;}
  const it=e.target.closest('.cmdk-it');if(it)go(+it.dataset.i);});
 dlg.addEventListener('mousedown',e=>{if(e.target===dlg)close();});
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cmdk]');if(b){e.preventDefault();open();return;}
 const q=e.target.closest('.hero-try [data-q]');if(q)open(q.dataset.q);});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.hidden?open():close();return;}
 const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)||document.activeElement.isContentEditable;
 if(e.key==='/'&&!typing&&dlg.hidden){e.preventDefault();open();}
 if(e.key==='Escape'&&document.body.classList.contains('nav-open')){setNav(false);menuBtn.focus();}});

/* ---------- click-to-copy values ---------- */
document.addEventListener('click',e=>{const el=e.target.closest('.kv dd,.pv-stat b,[data-copy]');if(!el||el.closest('button,a'))return;
 const t=el.textContent.replace(/\s+/g,' ').trim();if(!t||t==='—')return;
 const u=el.querySelector('u'),num=u?el.textContent.replace(u.textContent,'').trim():t;copy(u&&u.textContent?`${num} ${u.textContent.trim()}`:t);flash(el);});
document.addEventListener('dblclick',e=>{const td=e.target.closest('.tw td');if(!td)return;const t=td.textContent.trim();if(!t||t==='—')return;
 window.getSelection&&window.getSelection().removeAllRanges();copy(t);flash(td);});


/* ---------- clickable dimensions on the pipe / flange / butt-weld / socket-weld drawings ----------
   Same behaviour as the Figure-8 panel: click a dimension in the list or on the drawing to highlight
   both; click again to clear. The choice survives re-renders (size, class or unit changes). */
const DIMSEL=new Map();
function dimApply(grid){const pid=(grid.closest('.panel')||{}).id,k=DIMSEL.get(pid)||null,svg=grid.querySelector('.pv-fig svg');
 const has=k&&grid.querySelector(`.pv-dims [data-k="${CSS.escape(k)}"]`);const on=has?k:null;
 grid.querySelectorAll('.pv-dims button').forEach(b=>{const x=b.dataset.k===on;b.classList.toggle('on',x);b.setAttribute('aria-pressed',x);});
 if(svg){svg.classList.toggle('has-on',!!on);svg.querySelectorAll('.dimg').forEach(g=>g.classList.toggle('on',g.dataset.k===on));}}
/* Leader labels (socket bore B, gap G, NPT pitch P …) are drawn without a label box. Give every dimension
   label a box sized to its rendered text, so the selected state (filled box, white text) stays readable. */
function labelBoxes(svg){svg.querySelectorAll('.dimg .pv-t').forEach(t=>{if(t.dataset.box)return;const p=t.previousElementSibling;
 if(p&&p.classList.contains('pv-lblbg')){t.dataset.box='1';return;}let b;try{b=t.getBBox();}catch(e){return;}if(!b||!b.width)return;
 const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('class','pv-lblbg');r.setAttribute('rx','3');
 r.setAttribute('x',(b.x-4).toFixed(1));r.setAttribute('y',(b.y-2).toFixed(1));r.setAttribute('width',(b.width+8).toFixed(1));r.setAttribute('height',(b.height+4).toFixed(1));
 t.before(r);t.dataset.box='1';});}
function dimAll(){document.querySelectorAll('#main .pv-grid').forEach(g=>{const svg=g.querySelector('.pv-fig svg');if(svg)labelBoxes(svg);dimApply(g);});}
document.addEventListener('click',e=>{const t=e.target.closest('.pv-grid .pv-dims button[data-k], .pv-grid .pv-fig .dimg[data-k]');if(!t)return;
 const grid=t.closest('.pv-grid'),pid=(grid.closest('.panel')||{}).id,k=t.dataset.k;
 /* a dimension that this view does not show (e.g. Y on the flange face view): switch to the section view, keep it selected */
 const drawn=grid.querySelector(`.pv-fig .dimg[data-k="${CSS.escape(k)}"]`),sec=grid.querySelector('[data-fv="sec"][aria-pressed="false"]');
 if(!drawn&&sec){DIMSEL.set(pid,k);sec.click();return;}
 DIMSEL.set(pid,DIMSEL.get(pid)===k?null:k);dimApply(grid);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const g=e.target.closest&&e.target.closest('.pv-grid');if(g){DIMSEL.set((g.closest('.panel')||{}).id,null);dimApply(g);}}});

/* ---------- table tools: filter, sort, copy ---------- */
const STATE=new Map();
const num=t=>{t=t.replace(/[″"′,]/g,'').trim();const m=/^-?\d+(?:-\d+\/\d+|\/\d+|\.\d+)?/.exec(t);if(!m)return NaN;try{return fr(m[0]);}catch(e){return parseFloat(m[0]);}};
const cellTxt=c=>c.textContent.replace(/\s+/g,' ').trim();
const thTxt=th=>{const s=th.querySelector('small');const main=s?th.textContent.replace(s.textContent,'').trim():th.textContent.trim();return (s?`${main} (${s.textContent.trim()})`:main).replace(/\s+/g,' ');};
const hasTouch=matchMedia('(pointer:coarse)').matches;
function enhanceTables(){
 $$('#main .tw').forEach((tw,idx)=>{if(tw.dataset.tt||tw.closest('.calc,.cmdk'))return;const table=$('table',tw);if(!table||!table.tBodies[0])return;
  tw.dataset.tt='1';const body=table.tBodies[0],rows=[...body.rows];if(rows.length<4)return;
  const panel=tw.closest('.panel'),key=(panel?panel.id:'x')+':'+$$('.tw',panel||document).indexOf(tw);
  const st=STATE.get(key)||{q:'',col:-1,dir:0};STATE.set(key,st);rows.forEach((r,i)=>r.dataset.oi=i);
  const hRows=table.tHead?[...table.tHead.rows]:[],last=hRows[hRows.length-1],ncol=rows[0].cells.length;
  const sortable=last&&last.cells.length===ncol&&![...last.cells].some(c=>c.colSpan>1)&&!rows.some(r=>[...r.cells].some(c=>c.colSpan>1));
  const bar=document.createElement('div');bar.className='tt';const filt=rows.length>=6;
  bar.innerHTML=`${filt?`<label class="tt-f">${ICO.search}<span class="sr">Filter rows</span><input type="search" placeholder="Filter rows" value="${esc(st.q)}" autocomplete="off"></label>`:''}<span class="tt-n" aria-live="polite"></span>${hasTouch?'':'<span class="tt-hint">Double-click a value to copy it</span>'}<button class="tt-b" type="button">${ICO.copy}Copy table</button>`;
  tw.before(bar);const cnt=$('.tt-n',bar);
  const apply=()=>{const ws=st.q.toLowerCase().split(/\s+/).filter(Boolean);let shown=0;
   rows.forEach(r=>{const ok=!ws.length||ws.every(w=>r.textContent.toLowerCase().includes(w));r.hidden=!ok;if(ok)shown++;});
   let em=$('tr.tt-empty',body);if(!shown){if(!em){em=document.createElement('tr');em.className='tt-empty';body.append(em);}em.innerHTML=`<td colspan="${ncol}">No rows match <b>“${esc(st.q)}”</b>. Check the size format (for example 1-1/2) or<button type="button">clear the filter</button></td>`;$('button',em).onclick=e=>{e.stopPropagation();st.q='';const i=$('input',bar);i.value='';apply();i.focus();};}else if(em)em.remove();
   cnt.innerHTML=ws.length?`Showing <b>${shown}</b> of ${rows.length} rows`:`<b>${rows.length}</b> rows`;};
  const sortNow=()=>{let ord=[...rows];if(st.dir&&st.col>=0){const v=r=>cellTxt(r.cells[st.col]);ord.sort((a,b)=>{const x=num(v(a)),y=num(v(b));
    if(isNaN(x)&&isNaN(y))return st.dir*v(a).localeCompare(v(b));if(isNaN(x))return 1;if(isNaN(y))return -1;return st.dir*(x-y);});}
   else ord.sort((a,b)=>a.dataset.oi-b.dataset.oi);
   const em=$('tr.tt-empty',body);ord.forEach(r=>body.append(r));if(em)body.append(em);
   if(sortable)[...last.cells].forEach((th,i)=>th.setAttribute('aria-sort',i===st.col&&st.dir?(st.dir>0?'ascending':'descending'):'none'));};
  if(sortable)[...last.cells].forEach((th,i)=>{th.classList.add('sortable');const b=document.createElement('button');b.type='button';b.innerHTML=th.innerHTML;b.title='Sort by '+thTxt(th);th.innerHTML='';th.append(b);
   b.addEventListener('click',e=>{e.stopPropagation();if(st.col!==i){st.col=i;st.dir=1;}else st.dir=st.dir===1?-1:st.dir===-1?0:1;sortNow();});});
  const fi=$('input',bar);if(fi){fi.addEventListener('input',()=>{st.q=fi.value;apply();});fi.addEventListener('keydown',e=>{if(e.key==='Escape'&&fi.value){e.stopPropagation();fi.value='';st.q='';apply();}});}
  $('.tt-b',bar).addEventListener('click',()=>{const vis=rows.filter(r=>!r.hidden);
   const head=sortable?[[...last.cells].map(thTxt)]:hRows.map(r=>[...r.cells].flatMap(c=>[thTxt(c),...Array(Math.max(0,c.colSpan-1)).fill('')]));
   const tsv=[...head,...vis.map(r=>[...r.cells].map(cellTxt))].map(r=>r.join('\t')).join('\n');
   const sec=panel&&$('.phead h1,.phead h2',panel);copy(tsv,`Copied ${vis.length} rows${sec?' from '+sec.textContent.trim():''}. Paste into Excel.`);});
  apply();sortNow();});}
let raf=0;const schedule=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;enhanceTables();dimAll();});};
new MutationObserver(schedule).observe($('#main'),{childList:true,subtree:true});

/* ---------- start ---------- */
pageBar();enhanceTables();dimAll();
if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)requestAnimationFrame(()=>t.scrollIntoView({block:'start'}));}
})();
document.documentElement.classList.add('js-ready');

/* Translate the whole site with GTranslate (Google machine translation), loaded only when a language other than English is picked.
   The choice is kept, so every page opens in that language. Drawings, sizes and the brand stay untranslated. */
(()=>{
const L=[['en','English','English'],['hi','हिन्दी','Hindi'],['te','తెలుగు','Telugu'],['ta','தமிழ்','Tamil'],['kn','ಕನ್ನಡ','Kannada'],['ml','മലയാളം','Malayalam'],['mr','मराठी','Marathi'],['bn','বাংলা','Bengali'],['gu','ગુજરાતી','Gujarati'],['ur','اردو','Urdu'],
 ['ar','العربية','Arabic'],['fr','Français','French'],['es','Español','Spanish'],['pt','Português','Portuguese'],['de','Deutsch','German'],['it','Italiano','Italian'],['pl','Polski','Polish'],['ru','Русский','Russian'],['tr','Türkçe','Turkish'],
 ['zh-CN','中文（简体）','Chinese'],['ja','日本語','Japanese'],['ko','한국어','Korean'],['id','Bahasa Indonesia','Indonesian'],['vi','Tiếng Việt','Vietnamese'],['th','ไทย','Thai'],['fa','فارسی','Persian']];
const btn=document.getElementById('langBtn'),menu=document.getElementById('langMenu');if(!btn||!menu)return;
const KEY='pr_lang',get=()=>{try{return localStorage.getItem(KEY)||'en'}catch(e){return'en'}},put=v=>{try{v==='en'?localStorage.removeItem(KEY):localStorage.setItem(KEY,v)}catch(e){}};
let cur=get();
const code=c=>c==='zh-CN'?'中文':c.toUpperCase();
const show=()=>{const l=L.find(x=>x[0]===cur)||L[0];document.getElementById('langCode').textContent=code(l[0]);btn.setAttribute('aria-label','Language: '+l[2]);};
menu.innerHTML='<p>Machine translation by Google, through GTranslate. Sizes, numbers and drawings stay as they are; check anything important against the English page.</p>'+
 L.map((l,i)=>(i===1?'<hr>':i===10?'<hr>':'')+`<button type="button" role="menuitemradio" data-l="${l[0]}" aria-checked="${l[0]===cur}" lang="${l[0]}"><span>${l[1]}</span><small>${l[0]==='en'?'Original':l[2]}</small></button>`).join('');
/* keep drawings, code, sizes and the brand out of translation, including content drawn later */
const keep=root=>{(root.querySelectorAll?root:document).querySelectorAll('svg,code,kbd,.top-brand,#npsSel,.notr').forEach(e=>{e.classList.add('notranslate');e.setAttribute('translate','no');});};
let mo=null;const guard=()=>{keep(document);if(mo)return;mo=new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.tagName==='svg'||n.tagName==='SVG'){n.classList.add('notranslate');n.setAttribute('translate','no');}else keep(n);});});mo.observe(document.body,{childList:true,subtree:true});};
const note=t=>{let n=document.querySelector('.lang-note');if(!n){n=document.createElement('div');n.className='lang-note';n.setAttribute('role','status');document.body.appendChild(n);}n.textContent=t;clearTimeout(note.t);note.t=setTimeout(()=>n.remove(),5000);};
let loading=null;
function load(){if(loading)return loading;guard();
 const w=document.createElement('div');w.className='gtranslate_wrapper';w.setAttribute('aria-hidden','true');document.body.appendChild(w);
 window.gtranslateSettings={default_language:'en',languages:L.map(l=>l[0]),wrapper_selector:'.gtranslate_wrapper',native_language_names:true,detect_browser_language:false};
 loading=new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.gtranslate.net/widgets/latest/dropdown.js';s.defer=true;s.onload=()=>ok();s.onerror=()=>no();document.head.appendChild(s);});
 return loading;}
function go(l){
 const pair='en|'+l,ready=()=>typeof window.doGTranslate==='function'||document.querySelector('.gtranslate_wrapper select');
 let tries=0;const t=setInterval(()=>{if(ready()){clearInterval(t);
   if(typeof window.doGTranslate==='function')window.doGTranslate(pair);else{const s=document.querySelector('.gtranslate_wrapper select');s.value=pair;s.dispatchEvent(new Event('change'));}}
  else if(++tries>60){clearInterval(t);note('Translation could not start. Check your connection or ad blocker and try again.');}},100);}
function pick(l){cur=l;put(l);show();menu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.l===l)));close();
 document.documentElement.lang=l;
 if(l==='en'){if(loading){go('en');}return;}
 load().then(()=>go(l)).catch(()=>note('Translation could not load. Check your connection or ad blocker and try again.'));}
const open=()=>{menu.hidden=false;btn.setAttribute('aria-expanded','true');(menu.querySelector('[aria-checked=true]')||menu.querySelector('button')).focus();};
const close=()=>{menu.hidden=true;btn.setAttribute('aria-expanded','false');};
btn.addEventListener('click',e=>{e.stopPropagation();menu.hidden?open():close();});
menu.addEventListener('click',e=>{const b=e.target.closest('button[data-l]');if(b)pick(b.dataset.l);});
menu.addEventListener('keydown',e=>{const bs=[...menu.querySelectorAll('button')],i=bs.indexOf(document.activeElement);
 if(e.key==='ArrowDown'){e.preventDefault();bs[(i+1)%bs.length].focus();}else if(e.key==='ArrowUp'){e.preventDefault();bs[(i-1+bs.length)%bs.length].focus();}
 else if(e.key==='Escape'){close();btn.focus();}});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.lang'))close();});
show();
/* a saved language: translate this page too */
if(cur!=='en'){document.documentElement.lang=cur;load().then(()=>go(cur)).catch(()=>{});}
})();
