/* What's new: a small card shown once per release, bottom right. Newest first; bump nothing else, the first id is the release. */
(function(){
const NEWS=[
{id:'2026-11-24b',date:'24 Nov 2026',tag:'New',title:'Daily piping challenge',text:'A new piping question on the homepage every day, with the answer, the guide and the tool behind it. Keep your streak going.',href:'./'},
{id:'2026-11-24a',date:'24 Nov 2026',tag:'New',title:'AutoCAD and BricsCAD commands for piping',text:'Searchable commands and aliases, piping workflows for isometrics, P&IDs and take-offs, and a printable cheat sheet.',href:'cad-commands-piping.html'},
{id:'2026-11-23b',date:'23 Nov 2026',tag:'New',title:'Eight instrument and electrical guides',text:'Control valve stations, thermowells, pressure taps, level bridles, instrument tubing, earthing and bonding, insulating flange kits and cable trays on racks.',href:'guides.html'},
{id:'2026-11-23a',date:'23 Nov 2026',tag:'New tool',title:'Instrument tag decoder',text:'Type a tag like FIC-101 or LAHH-3301 and read each letter, the loop number and what the piping layout must allow for.',href:'instrument-tag-decoder.html'},
{id:'2026-11-22d',date:'22 Nov 2026',tag:'New',title:'Two more guides',text:'P&ID valve symbols with drawings, and how to calculate pipe cut length from an isometric.',href:'pid-valve-symbols.html'},
{id:'2026-11-22c',date:'22 Nov 2026',tag:'New',title:'Piping guides',text:'Ten short guides: gate vs globe valves, pipe schedules, weld neck vs slip-on, RF vs RTJ, trunnions, supports, expansion loops, hydrotest, elbows and line blinds.',href:'guides.html'},
{id:'2026-11-22b',date:'22 Nov 2026',tag:'New tool',title:'Hydrotest pressure calculator',text:'B31.3 and B31.1 test pressure with static head at low points, a yield check, the B16.5 flange limit and the water volume.',href:'hydrotest-pressure.html'},
{id:'2026-11-22a',date:'22 Nov 2026',tag:'Update',title:'Where to support',text:'New on the Pipe supports page: typical support arrangements at pumps, exchangers, columns, relief valves, racks, control valve stations, tank nozzles and small-bore branches.',href:'pipe-supports.html#where-to-support'},
{id:'2026-11-21c',date:'21 Nov 2026',tag:'Update',title:'Flange joint: more gaskets, bolting and sizes',text:'Ring joint and kammprofile gaskets, B7M, L7M and B8 Class 2 bolting, lubricant choice, B16.47 large flanges and a full bolt table you can download.',href:'flange-joint.html'},
{id:'2026-11-21c',date:'21 Nov 2026',tag:'New tool',title:'P&ID take-off from PDF',text:'Open a PDF P&ID, teach each symbol once, and get valve, flange and tee counts for every line. The file never leaves your computer.',href:'pid-takeoff.html'},
{id:'2026-11-21b',date:'21 Nov 2026',tag:'New page',title:'Refinery units for piping engineers',text:'Follow a barrel of crude through the refinery, then see each unit with its typical conditions and the piping watch-outs.',href:'refinery-units.html'},
{id:'2026-11-21a',date:'21 Nov 2026',tag:'New page',title:'Piping fundamentals',text:'Learn piping step by step: scroll to build a small piping system, then see how it is designed on a real job. Switch to a normal reading view any time.',href:'piping-basics.html'},
{id:'2026-11-20a',date:'20 Nov 2026',tag:'Update',title:'More pipe supports in 3D',text:'Added the variable spring support (base type), rigid strut and expansion bellows.',href:'pipe-supports.html'},
{id:'2026-11-19a',date:'19 Nov 2026',tag:'New page',title:'Instrument straight runs',text:'Orifice plate straight lengths (ISO 5167-2) in D and mm, plus flowmeters and control valves.',href:'straight-runs.html'},
{id:'2026-11-18d',date:'18 Nov 2026',tag:'New tool',title:'Pipe cut length calculator',text:'Iso dimension minus fitting take-outs and weld gaps, with a cut list you can copy or print.',href:'cut-length.html'},
{id:'2026-11-18b',date:'18 Nov 2026',tag:'New page',title:'Piping glossary',text:'395 piping terms and abbreviations, from FOT and BOP to FFW and PWHT, each linked to its page.',href:'glossary.html'},
{id:'2026-11-18',date:'18 Nov 2026',tag:'Site',title:'Pipe Ref is now piperef.net',text:'Old piperef.site links still work and forward to the same page.',href:null},
{id:'2026-11-17c',date:'17 Nov 2026',tag:'New page',title:'Piping interview questions',text:'106 questions with answers, from fresher to senior, filter by level and topic.',href:'interview-questions.html'},
{id:'2026-11-17b',date:'17 Nov 2026',tag:'New page',title:'Large flanges, ASME B16.47',text:'NPS 26 to 60, Series A and B, with a check that flags where the two series differ.',href:'large-flanges.html'},
{id:'2026-11-17a',date:'17 Nov 2026',tag:'New page',title:'Isometric symbols and conventions',text:'73 iso symbols, how isos are dimensioned and read, and an annotated sample.',href:'isometric-symbols.html'},
{id:'2026-11-16b',date:'16 Nov 2026',tag:'New tool',title:'Branch reinforcement check',text:'ASME B31.3 304.3.3 area replacement with a plain-language result and a section sketch.',href:'branch-reinforcement.html'},
{id:'2026-11-16a',date:'16 Nov 2026',tag:'New pages',title:'Knowledge base, lessons learned and discussions',text:'150 Q&As, rework and safety cases, and a moderated forum.',href:'knowledge-base.html'}
];
const SHOW=4,KEY='piperef_news_seen',latest=NEWS[0].id;
const get=()=>{try{return localStorage.getItem(KEY)}catch(e){return latest}},set=()=>{try{localStorage.setItem(KEY,latest)}catch(e){}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
function css(){if(document.getElementById('news-css'))return;const st=document.createElement('style');st.id='news-css';st.textContent=`
.nw{position:fixed;right:20px;bottom:20px;z-index:60;width:min(370px,calc(100vw - 24px));max-height:min(560px,calc(100vh - 40px));display:flex;flex-direction:column;background:var(--sheet,#fff);color:var(--ink,#0F1B2D);border:1px solid var(--rule-strong,#D5DCE6);border-radius:16px;box-shadow:0 18px 50px rgba(15,27,45,.22);overflow:hidden;animation:nwIn .28s ease-out}
@keyframes nwIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.nw{animation:none}}
.nw-h{display:flex;align-items:center;gap:10px;padding:14px 14px 10px 18px}
.nw-h b{font-size:16px;flex:1}.nw-h .dot{width:8px;height:8px;border-radius:50%;background:var(--accent,#1849A9)}
.nw-x{width:32px;height:32px;border:0;border-radius:8px;background:none;color:var(--muted,#5B6B80);font-size:20px;line-height:1;cursor:pointer}
.nw-x:hover{background:rgba(24,73,169,.08)}
.nw-l{list-style:none;margin:0;padding:0 8px;overflow-y:auto}
.nw-i a,.nw-i div.nw-c{display:block;padding:10px 10px 11px;border-radius:10px;color:inherit;text-decoration:none}
.nw-i a:hover,.nw-i a:focus-visible{background:rgba(24,73,169,.06)}
.nw-i+.nw-i{border-top:1px solid var(--rule,#E6EBF2)}
.nw-m{display:flex;gap:8px;align-items:center;font-size:11.5px;color:var(--muted,#5B6B80);margin-bottom:3px}
.nw-t{font-size:11px;font-weight:700;padding:1px 7px;border-radius:99px;background:rgba(24,73,169,.1);color:var(--accent,#1849A9)}
.nw-i strong{display:block;font-size:14px;line-height:1.35}.nw-i span.d{display:block;font-size:13px;line-height:1.45;color:var(--ink-2,#3B4A5E);margin-top:2px}
.nw-i.new strong::after{content:'New';margin-left:6px;font-size:10.5px;font-weight:700;color:#147A4A;vertical-align:1px}
.nw-f{display:flex;gap:8px;justify-content:space-between;align-items:center;padding:10px 14px 14px 18px;border-top:1px solid var(--rule,#E6EBF2)}
.nw-f small{font-size:12px;color:var(--muted,#5B6B80)}
.nw-ok{height:34px;padding:0 16px;border:0;border-radius:8px;background:var(--accent,#1849A9);color:#fff;font:inherit;font-size:13.5px;font-weight:600;cursor:pointer}
[data-theme=dark] .nw{box-shadow:0 18px 50px rgba(0,0,0,.5)}[data-theme=dark] .nw-i.new strong::after{color:#7ED6A8}
@media (max-width:600px){.nw{right:12px;left:12px;bottom:12px;width:auto;max-height:55vh}.nw-i span.d{display:none}.nw-i a,.nw-i div.nw-c{padding:8px 10px}}
@media print{.nw{display:none}}`;document.head.appendChild(st);}
function show(all){
 if(document.querySelector('.nw'))return;css();
 const seen=get(),idx=NEWS.findIndex(n=>n.id===seen),fresh=idx<0?NEWS.length:idx;
 const list=all?NEWS:NEWS.slice(0,idx<0?SHOW:Math.max(SHOW,Math.min(fresh,6)));
 const here=location.pathname.split('/').pop()||'index.html';
 const el=document.createElement('section');el.className='nw';el.setAttribute('role','dialog');el.setAttribute('aria-modal','false');el.setAttribute('aria-labelledby','nwH');
 el.innerHTML=`<div class="nw-h"><span class="dot" aria-hidden="true"></span><b id="nwH">What's new on Pipe Ref</b><button class="nw-x" type="button" aria-label="Close">×</button></div>
 <ul class="nw-l">${list.map((n,i)=>{const body=`<div class="nw-m"><span class="nw-t">${esc(n.tag)}</span>${esc(n.date)}</div><strong>${esc(n.title)}</strong><span class="d">${esc(n.text)}</span>`;
  const cls='nw-i'+(i<fresh&&idx>=0?' new':'');
  return `<li class="${cls}">${n.href&&n.href!==here?`<a href="${n.href}">${body}</a>`:`<div class="nw-c">${body}</div>`}</li>`;}).join('')}</ul>
 <div class="nw-f"><small>Spot a mistake? <a href="contact.html">Tell us</a></small><button class="nw-ok" type="button">Got it</button></div>`;
 document.body.appendChild(el);
 const close=()=>{set();el.remove();document.removeEventListener('keydown',key);};
 const key=e=>{if(e.key==='Escape')close();};
 el.querySelector('.nw-x').onclick=close;el.querySelector('.nw-ok').onclick=close;
 el.querySelectorAll('a').forEach(a=>a.addEventListener('click',set));
 document.addEventListener('keydown',key);
 if(all)el.querySelector('.nw-ok').focus({preventScroll:true});}
window.showNews=()=>show(true);
const s=get();
if(s!==latest&&!/[?&]nonews\b/.test(location.search))setTimeout(()=>show(false),2500);
})();
