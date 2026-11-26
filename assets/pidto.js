/* P&ID take-off: load a PDF P&ID, teach each symbol once, find them all, trace the lines and count per line number.
   Everything runs in the browser; the PDF never leaves the computer. Engine in pidcore.js, PDF reading by pdf.js (Apache-2.0). */
import {extract,makeTemplate,findAll,guessPipeW,trace} from './pidcore.js?v=20261126c';
const P=document.getElementById('p-pidto');
const V='20261126c';
if(!document.getElementById('pt-css')){const st=document.createElement('style');st.id='pt-css';st.textContent=`
#p-pidto .pt-note{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;border:1px solid var(--rule);border-radius:12px;background:var(--paper,#F7F9FC);font-size:13.5px;line-height:1.5;color:var(--ink-2);margin:12px 0}
#p-pidto .pt-note svg{flex:none;width:18px;height:18px;margin-top:1px;stroke:#147A4A;fill:none;stroke-width:2}
#p-pidto .pt-steps{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 12px;padding:0;list-style:none;counter-reset:s}
#p-pidto .pt-steps li{counter-increment:s;display:flex;align-items:center;gap:7px;padding:6px 12px 6px 6px;border-radius:99px;border:1px solid var(--rule);font-size:13px;color:var(--muted);background:var(--sheet)}
#p-pidto .pt-steps li::before{content:counter(s);width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--rule);color:var(--ink-2);font-weight:700;font-size:12px}
#p-pidto .pt-steps li.on{color:var(--ink);border-color:var(--accent)}#p-pidto .pt-steps li.on::before{background:var(--accent);color:#fff}
#p-pidto .pt-steps li.done::before{background:#147A4A;color:#fff}
#p-pidto .pt-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 10px}
#p-pidto .pt-b{height:36px;padding:0 13px;border:1px solid var(--rule-strong);border-radius:9px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
#p-pidto .pt-b:hover{border-color:var(--accent)}#p-pidto .pt-b.pri{background:var(--accent);border-color:var(--accent);color:#fff}
#p-pidto .pt-b[aria-pressed=true]{background:var(--accent-soft,#E8EFFD);border-color:var(--accent);color:var(--accent)}
#p-pidto .pt-b:disabled{opacity:.45;cursor:not-allowed}
#p-pidto .pt-b svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#p-pidto .pt-sep{width:1px;height:26px;background:var(--rule);margin:0 2px}
#p-pidto select,#p-pidto input[type=text],#p-pidto input[type=number]{height:36px;border:1px solid var(--rule-strong);border-radius:9px;padding:0 10px;font:inherit;font-size:13.5px;background:var(--sheet);color:var(--ink);min-width:0}
#p-pidto .pt-main{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:14px;align-items:start}
#p-pidto .pt-view{position:relative;height:min(72vh,760px);border:1px solid var(--rule);border-radius:14px;overflow:auto;background:#E9EDF2;overscroll-behavior:contain}
#p-pidto .pt-view.empty{display:grid;place-items:center;overflow:hidden}
#p-pidto .pt-empty{text-align:center;color:var(--muted);font-size:14px;max-width:360px;padding:20px}
#p-pidto .pt-empty b{display:block;color:var(--ink);font-size:16px;margin-bottom:6px}
#p-pidto .pt-pg{position:relative;margin:16px;background:#fff;box-shadow:0 1px 4px rgba(15,27,45,.18)}
#p-pidto .pt-pg canvas{display:block;width:100%;height:100%}
#p-pidto .pt-pg svg.ov{position:absolute;inset:0;width:100%;height:100%;touch-action:auto}
#p-pidto .pt-view.teach svg.ov,#p-pidto .pt-view.label svg.ov{cursor:crosshair;touch-action:none}
#p-pidto .pt-view.pan{cursor:grab}
#p-pidto .ov .mk{fill:rgba(24,73,169,.10);stroke:#1849A9;stroke-width:.9;cursor:pointer}
#p-pidto .ov .mk.off{fill:rgba(194,65,42,.08);stroke:#C2412A;stroke-dasharray:2 1.5}
#p-pidto .ov .mk.sel{stroke-width:1.8}
#p-pidto .ov .tb{fill:rgba(224,179,58,.15);stroke:#B7791F;stroke-width:.9;stroke-dasharray:3 2}
#p-pidto .ov .hl{fill:none;stroke:#E0B33A;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;opacity:.65;pointer-events:none}
#p-pidto .ov .end{fill:#147A4A;pointer-events:none}#p-pidto .ov .end.open{fill:#C2412A}
#p-pidto .ov .tee{fill:none;stroke:#7C3AED;stroke-width:1.2;pointer-events:none}
#p-pidto .ov text{font:600 5px Geist,system-ui,sans-serif;fill:#1849A9;pointer-events:none}
#p-pidto .pt-side{display:flex;flex-direction:column;gap:12px;min-width:0}
#p-pidto .pt-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:12px 14px;min-width:0}
#p-pidto .pt-card h3{font-size:15px;margin:0 0 6px;display:flex;align-items:center;justify-content:space-between;gap:8px}
#p-pidto .pt-card h3 small{font-weight:500;color:var(--muted);font-size:12.5px}
#p-pidto .pt-card p{font-size:13px;line-height:1.5;color:var(--ink-2);margin:0 0 8px}
#p-pidto .pt-lib{list-style:none;margin:0;padding:0;max-height:300px;overflow:auto}
#p-pidto .pt-lib li{display:grid;grid-template-columns:44px minmax(0,1fr) auto auto;gap:8px;align-items:center;padding:6px 0;border-top:1px solid var(--rule);font-size:13.5px}
#p-pidto .pt-lib li:first-child{border-top:0}
#p-pidto .pt-lib .th{width:44px;height:30px;border:1px solid var(--rule);border-radius:6px;background:#fff}
#p-pidto .pt-lib .nm b{display:block;font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#p-pidto .pt-lib .nm small{color:var(--muted);font-size:12px}
#p-pidto .pt-lib .ct{font-variant-numeric:tabular-nums;font-weight:700;color:var(--accent);min-width:22px;text-align:right}
#p-pidto .pt-x{border:0;background:none;color:var(--muted);cursor:pointer;font-size:18px;line-height:1;padding:2px 4px;border-radius:6px}#p-pidto .pt-x:hover{color:#C2412A;background:rgba(194,65,42,.08)}
#p-pidto .pt-form{display:grid;gap:8px}#p-pidto .pt-form label{display:grid;gap:4px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
#p-pidto .pt-form .row{display:flex;gap:8px}#p-pidto .pt-form .row>*{flex:1}
#p-pidto .pt-prev{width:100%;height:90px;border:1px solid var(--rule);border-radius:8px;background:#fff}
#p-pidto .pt-msg{font-size:13px;color:var(--ink-2);margin:6px 0 0;min-height:18px}
#p-pidto .pt-msg.warn{color:#9A6A08}
#p-pidto .pt-res{margin-top:16px}
#p-pidto .pt-res h2{font-size:19px;margin:0 0 4px}#p-pidto .pt-res>p{font-size:13.5px;color:var(--muted);margin:0 0 10px}
#p-pidto .pt-tw{overflow-x:auto;border:1px solid var(--rule);border-radius:12px;background:var(--sheet)}
#p-pidto .pt-t{width:100%;border-collapse:collapse;font-size:13.5px}
#p-pidto .pt-t th{font-size:12px;color:var(--muted);font-weight:600;text-align:right;padding:8px 8px;border-bottom:1px solid var(--rule);white-space:nowrap;background:var(--paper,#F7F9FC)}
#p-pidto .pt-t td{padding:7px 8px;border-bottom:1px solid var(--rule);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-pidto .pt-t th:first-child,#p-pidto .pt-t td:first-child{text-align:left;position:sticky;left:0;background:inherit}
#p-pidto .pt-t tbody tr{cursor:pointer}#p-pidto .pt-t tbody tr:hover td{background:rgba(24,73,169,.04)}
#p-pidto .pt-t tbody tr.sel td{background:rgba(224,179,58,.14)}
#p-pidto .pt-t td.est{color:#7A5B0F}
#p-pidto .pt-t tfoot td{font-weight:700;background:var(--paper,#F7F9FC)}
#p-pidto .pt-t input{width:70px;height:30px;text-align:right}
#p-pidto .pt-set{display:flex;flex-wrap:wrap;gap:10px 16px;margin:10px 0}
#p-pidto .pt-set label{display:flex;flex-direction:column;gap:4px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
#p-pidto .pt-set input{width:110px}#p-pidto .pt-set input[type=checkbox]{width:auto;height:auto}
#p-pidto .pt-legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:12.5px;color:var(--muted);margin:8px 0 0}
#p-pidto .pt-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px;vertical-align:-1px}
#p-pidto .pt-help{margin-top:18px}#p-pidto .pt-help h2{font-size:18px;margin:0 0 8px}
#p-pidto .pt-help ol,#p-pidto .pt-help ul{padding-left:20px;margin:0;font-size:14px;line-height:1.6;color:var(--ink-2)}#p-pidto .pt-help li+li{margin-top:4px}
#p-pidto .pt-prog{height:4px;border-radius:2px;background:var(--rule);overflow:hidden;margin:8px 0 0}#p-pidto .pt-prog i{display:block;height:100%;width:0;background:var(--accent);transition:width .2s}
[data-theme=dark] #p-pidto .pt-view{background:#0F1A2B}
@media (max-width:980px){#p-pidto .pt-sep{display:none}#p-pidto .pt-main{grid-template-columns:1fr}#p-pidto .pt-view{height:62vh}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ settings and storage */
const KINDS=[['gate','Gate valve'],['globe','Globe valve'],['check','Check valve'],['ball','Ball valve'],['butterfly','Butterfly valve'],['plug','Plug valve'],['cv','Control valve'],['psv','Relief valve'],['reducer','Reducer'],['strainer','Strainer'],['flange','Flanged joint / spec break'],['blind','Spectacle blind / spacer'],['other','Other item']];
const KN=Object.fromEntries(KINDS);
const SH={gate:'Gate',globe:'Globe',check:'Check',ball:'Ball',butterfly:'Butterfly',plug:'Plug',cv:'Control v.',psv:'Relief v.',reducer:'Reducer',strainer:'Strainer',flange:'Flg. joint',blind:'Blind',other:'Other'};
const FLG={gate:2,globe:2,check:2,ball:2,butterfly:2,plug:2,cv:2,psv:2,strainer:2,flange:2,blind:2,reducer:0,other:0};
const COL={gate:'#1849A9',globe:'#0E7490',check:'#7C3AED',ball:'#0F766E',butterfly:'#4338CA',plug:'#4338CA',cv:'#B45309',psv:'#B91C1C',reducer:'#475569',strainer:'#15803D',flange:'#9333EA',blind:'#9333EA',other:'#64748B'};
const ld=(k,d)=>{try{const v=localStorage.getItem('piperef_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem('piperef_'+k,JSON.stringify(v))}catch(e){}};
try{localStorage.removeItem('piperef_pidto_lib')}catch(e){}
const S={lib:[],pattern:ld('pidto_pat','\\d+(?:-\\d+)?(?:/\\d+)?"-[A-Z]{1,4}-\\d{3,6}-[A-Z0-9]{1,8}'),cls:ld('pidto_cls','300'),sch:ld('pidto_sch','40'),elb:ld('pidto_elb',6),spool:ld('pidto_spool',6),sw:ld('pidto_sw',true),len:ld('pidto_len',{})};
let pdfjs=null,doc=null,fileName='',pg=1,z=1,mode='pan',pages={},sel=null,teachBox=null,labelPick=null,busy=false;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const IC={open:'<svg viewBox="0 0 24 24"><path d="M4 20V6a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v12z"/></svg>',hand:'<svg viewBox="0 0 24 24"><path d="M7 11V6a1.5 1.5 0 0 1 3 0v5M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2.5-4.5a1.5 1.5 0 0 1 2.6-1.5L7 14"/></svg>',
 box:'<svg viewBox="0 0 24 24"><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><circle cx="12" cy="12" r="2.5"/></svg>',tag:'<svg viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
 zin:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',zout:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/></svg>',fit:'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>',
 find:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',shield:'<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>'};

/* ------------------------------------------------------------ page */
function shell(){
 P.innerHTML=`<div class="phead"><div><h1>P&amp;ID take-off</h1><p>Count valves, reducers, flanged joints, tees and line ends straight from a PDF P&amp;ID, line by line. Teach each symbol once by drawing a box around it; the tool finds the rest, follows every pipe and reads the line numbers. Then estimate elbows and spools and send it all to the MTO calculator.</p></div></div>
 <div class="pt-note">${IC.shield}<div><b>Your drawing stays on your computer.</b> The PDF is read in your browser and is never uploaded. Nothing is stored: the symbols you teach stay on this page until you reload it.</div></div>
 <ol class="pt-steps" id="ptSteps"><li>Open the P&amp;ID</li><li>Teach the symbols</li><li>Find and check</li><li>Lines and counts</li></ol>
 <div class="pt-bar">
  <label class="pt-b pri" style="position:relative">${IC.open}Open PDF<input id="ptFile" type="file" accept="application/pdf,.pdf" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>
  <button class="pt-b" id="ptSample" type="button">Try the sample P&amp;ID</button>
  <span class="pt-sep"></span>
  <select id="ptPage" aria-label="Page" disabled><option>Page</option></select>
  <button class="pt-b" id="ptZo" type="button" aria-label="Zoom out" disabled>${IC.zout}</button><button class="pt-b" id="ptZi" type="button" aria-label="Zoom in" disabled>${IC.zin}</button><button class="pt-b" id="ptFit" type="button" disabled>${IC.fit}Fit</button>
  <span class="pt-sep"></span>
  <button class="pt-b" id="ptPan" type="button" aria-pressed="true" disabled>${IC.hand}Move</button>
  <button class="pt-b" id="ptTeach" type="button" aria-pressed="false" disabled>${IC.box}Teach a symbol</button>
  <button class="pt-b" id="ptLabel" type="button" aria-pressed="false" disabled>${IC.tag}Name a line</button>
 </div>
 <div class="pt-main">
  <div class="pt-view empty pan" id="ptView"><div class="pt-empty"><b>Open a PDF P&amp;ID to start</b>A PDF exported from CAD works best. No file to hand? Try the sample P&amp;ID.</div></div>
  <aside class="pt-side">
   <div class="pt-card" id="ptTeachCard"></div>
   <div class="pt-card"><h3>Symbol library <small id="ptLibN"></small></h3><ul class="pt-lib" id="ptLib"></ul>
    <div class="pt-bar" style="margin:10px 0 0"><button class="pt-b pri" id="ptFind" type="button" disabled>${IC.find}Find on all pages</button></div>
    <div class="pt-prog" id="ptProg" hidden><i></i></div><p class="pt-msg" id="ptMsg"></p>
    <div class="pt-bar" style="margin:6px 0 0"><button class="pt-b" id="ptExp" type="button">Export library</button><label class="pt-b" style="position:relative">Import<input id="ptImp" type="file" accept=".json,application/json" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label></div></div>
   <div class="pt-card"><h3>Drawing settings</h3>
    <div class="pt-form"><label id="ptCntL" style="display:flex;flex-direction:row;align-items:center;gap:8px" hidden><input type="checkbox" id="ptCnt" checked> Count this page <span style="font-weight:400;color:var(--muted)">(untick for legend or cover sheets)</span></label><label>Pipe line weight<select id="ptW"><option>Open a drawing first</option></select></label>
     <label>Line number pattern (regular expression)<input type="text" id="ptPat" value="${esc(S.pattern)}" spellcheck="false"></label>
     <p style="margin:0">Matches line numbers like 6"-P-1001-A1. Change it to suit your project; drawings whose text is drawn as lines (SHX fonts) have no readable text, so use <b>Name a line</b>.</p></div></div>
  </aside>
 </div>
 <section class="pt-res" id="ptRes"></section>
 <section class="pt-help"><h2>How it works</h2><ol>
  <li><b>Open the P&amp;ID</b> as a PDF. Open the next sheet any time; your taught symbols stay. Vector PDFs exported from CAD work; scanned images do not, because the tool reads the drawn lines and text.</li>
  <li><b>Teach each symbol once.</b> Choose <i>Teach a symbol</i>, draw a box tightly around one gate valve, give it a name and type, and save. Repeat for each symbol type. The legend sheet is the quickest place to do this. The library stays on the page while you open more PDFs, and is cleared when you reload. Export it to keep it or share it with your team, and import it next time.</li>
  <li><b>Find</b> runs on every page. It finds each symbol in any of the four directions and mirrored. Click a marker to reject a wrong hit; click again to bring it back.</li>
  <li><b>Lines and counts.</b> The tool follows each pipe (the line weight you pick), joins the pipe across symbols, finds tees where lines meet, and gives each run the nearest line number. Runs without a number take the number of the run they continue straight on from. Lines continued on other sheets are added together by line number.</li>
  <li><b>Estimate</b> what a P&amp;ID cannot show: enter a rough length per line (from the plot plan), and the tool estimates elbows and spools with the factors you set. Flanges are counted as 2 per flanged item and 1 per equipment connection.</li></ol>
  <p style="font-size:13.5px;color:var(--muted);margin-top:10px">A first estimate for budgeting and early material requests. Check the result against the drawing before using it. PDF reading by <a href="https://mozilla.github.io/pdf.js/" rel="noopener">pdf.js</a> (Apache 2.0).</p></section>`;
 bind();teachCard();libList();results();}

/* ------------------------------------------------------------ loading */
async function lib(){if(pdfjs)return pdfjs;pdfjs=await import(`./pdfjs/pdf.min.mjs?v=${V}`);pdfjs.GlobalWorkerOptions.workerSrc=new URL(`./pdfjs/pdf.worker.min.mjs?v=${V}`,import.meta.url).href;return pdfjs;}
async function open(buf,name){msg('Reading the PDF…');try{const L=await lib();doc=await L.getDocument({data:buf}).promise;}catch(e){msg('This file could not be read as a PDF.','warn');return;}
 fileName=name;pages={};sel=null;pg=1;const ps=P.querySelector('#ptPage');ps.disabled=false;ps.innerHTML=Array.from({length:doc.numPages},(_,i)=>`<option value="${i+1}">Page ${i+1} of ${doc.numPages}</option>`).join('');
 P.querySelectorAll('#ptZo,#ptZi,#ptFit,#ptPan,#ptTeach,#ptLabel').forEach(b=>b.disabled=false);
 await showPage(1,true);const d=await pageData(1);const g=guessPipeW(d);fillWeights(g);
 if(!d.segs.length)msg('No drawn lines found on this page. It may be a scanned image; the tool needs a vector PDF.','warn');else if(!d.texts.length)msg('No readable text on this page. Use "Name a line" to give lines their numbers.','warn');else msg(`Opened ${esc(name)}: ${doc.numPages} page${doc.numPages>1?'s':''}.`);
 steps();results();teachCard();libList();
 if(S.lib.length&&!/^sample/.test(name))await findEverywhere();}
async function pageData(n){if(pages[n]&&pages[n].data)return pages[n].data;const L=await lib();const p=await doc.getPage(n);const d=await extract(p,L.OPS);pages[n]=Object.assign(pages[n]||{},{data:d,page:p,manual:(pages[n]&&pages[n].manual)||[]});return d;}
let pipeW=null;
function fillWeights(g){const s=P.querySelector('#ptW');if(!g.list.length){s.innerHTML='<option>No straight lines found</option>';return;}pipeW=g.best;
 s.innerHTML=g.list.slice(0,8).map(([w,l])=>`<option value="${w}"${w===g.best?' selected':''}>${w} pt${w===g.best?' (most likely pipe)':''} · ${Math.round(l)} long</option>`).join('');}

/* ------------------------------------------------------------ viewer */
let renderTask=null;
async function showPage(n,fit){pg=n;const v=P.querySelector('#ptView');const d=await pageData(n);v.classList.remove('empty');
 if(fit){z=Math.max(0.15,Math.min((v.clientWidth-34)/d.W,(Math.min(innerHeight*0.72,760)-34)/d.H));}
 v.innerHTML=`<div class="pt-pg" id="ptPg" style="width:${d.W*z}px;height:${d.H*z}px"><canvas id="ptCv"></canvas><svg class="ov" id="ptOv" viewBox="0 0 ${d.W} ${d.H}" preserveAspectRatio="none"></svg></div>`;
 await draw();overlay();bindView();P.querySelector('#ptPage').value=n;const cl=P.querySelector('#ptCntL');cl.hidden=false;P.querySelector('#ptCnt').checked=!pages[n].skip;}
async function draw(){const d=pages[pg].data,c=P.querySelector('#ptCv');if(!c)return;const dpr=Math.min(window.devicePixelRatio||1,2);let s=z*dpr;const maxW=8000;if(d.W*s>maxW)s=maxW/d.W;
 const vp=pages[pg].page.getViewport({scale:s});c.width=Math.floor(vp.width);c.height=Math.floor(vp.height);if(renderTask)try{renderTask.cancel()}catch(e){}
 renderTask=pages[pg].page.render({canvasContext:c.getContext('2d'),viewport:vp});try{await renderTask.promise;}catch(e){}}
let zt=0;function zoomTo(nz,cx,cy){const v=P.querySelector('#ptView'),pgEl=P.querySelector('#ptPg');if(!pgEl)return;const d=pages[pg].data;nz=Math.max(0.15,Math.min(8,nz));
 const r=v.getBoundingClientRect(),ax=cx??(r.left+v.clientWidth/2),ay=cy??(r.top+v.clientHeight/2);const px=(v.scrollLeft+ax-r.left-16)/z,py=(v.scrollTop+ay-r.top-16)/z;
 z=nz;pgEl.style.width=d.W*z+'px';pgEl.style.height=d.H*z+'px';v.scrollLeft=px*z-(ax-r.left-16);v.scrollTop=py*z-(ay-r.top-16);clearTimeout(zt);zt=setTimeout(draw,160);}
const svgPt=(e)=>{const o=P.querySelector('#ptOv');const p=o.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(o.getScreenCTM().inverse());return [q.x,q.y];};
function bindView(){const v=P.querySelector('#ptView'),o=P.querySelector('#ptOv');if(!o)return;
 v.onwheel=e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zoomTo(z*(e.deltaY<0?1.15:1/1.15),e.clientX,e.clientY);};
 let drag=null;
 o.onpointerdown=e=>{if(mode==='teach'){o.setPointerCapture(e.pointerId);const p=svgPt(e);drag={x0:p[0],y0:p[1]};teachBox=[p[0],p[1],p[0],p[1]];overlay();e.preventDefault();}
  else if(mode==='pan'&&e.pointerType==='mouse'){drag={sx:e.clientX,sy:e.clientY,l:v.scrollLeft,t:v.scrollTop,moved:false};o.setPointerCapture(e.pointerId);}};
 o.onpointermove=e=>{if(!drag)return;if(mode==='teach'){const p=svgPt(e);teachBox=[Math.min(drag.x0,p[0]),Math.min(drag.y0,p[1]),Math.max(drag.x0,p[0]),Math.max(drag.y0,p[1])];overlay();}
  else if(mode==='pan'&&drag.sx!=null){const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;v.scrollLeft=drag.l-dx;v.scrollTop=drag.t-dy;}};
 o.onpointerup=e=>{const d=drag;drag=null;if(mode==='teach'&&d){if(teachBox&&teachBox[2]-teachBox[0]>2&&teachBox[3]-teachBox[1]>2)teachCard(true);else{teachBox=null;overlay();}}
  else if(mode==='pan'&&(!d||!d.moved)){const t=e.target;if(t.classList&&t.classList.contains('mk')){toggleMatch(+t.dataset.i);}}
  else if(mode==='label'){pickLine(svgPt(e));}};}
function setMode(m){mode=m;const v=P.querySelector('#ptView');v.classList.toggle('teach',m==='teach');v.classList.toggle('label',m==='label');v.classList.toggle('pan',m==='pan');
 P.querySelector('#ptPan').setAttribute('aria-pressed',m==='pan');P.querySelector('#ptTeach').setAttribute('aria-pressed',m==='teach');P.querySelector('#ptLabel').setAttribute('aria-pressed',m==='label');
 if(m!=='teach'){teachBox=null;}if(m!=='label')labelPick=null;teachCard();overlay();}

/* ------------------------------------------------------------ overlay */
function overlay(){const o=P.querySelector('#ptOv');if(!o||!pages[pg])return;const st=pages[pg],d=st.data;let s='';
 if(sel&&st.tr){for(const ci of (st.tr.lines.find(l=>l.tag===sel)||{chains:[]}).chains){const ch=st.tr.chains[ci];for(const ei of ch.edges){const e=st.tr.edges[ei],A=st.tr.nodes[e.a],B=st.tr.nodes[e.b];s+=`<path class="hl" d="M${A.x} ${A.y}L${B.x} ${B.y}"/>`;}}}
 if(st.tr){st.tr.nodes.forEach(n=>{if(n.end)s+=`<circle class="end ${n.end}" cx="${n.x}" cy="${n.y}" r="2"/>`;if(n.e.length>=3)s+=`<circle class="tee" cx="${n.x}" cy="${n.y}" r="3.4"/>`;});}
 (st.matches||[]).forEach((m,i)=>{const t=S.lib[m.ti];if(!t)return;const c=COL[t.kind]||'#1849A9';
  s+=`<rect class="mk${m.off?' off':''}" data-i="${i}" x="${m.x-m.w/2-1.5}" y="${m.y-m.h/2-1.5}" width="${m.w+3}" height="${m.h+3}" rx="1.5" style="${m.off?'':`stroke:${c};fill:${c}22`}"><title>${esc(t.name)}${m.off?' (rejected)':''} · click to ${m.off?'restore':'reject'}</title></rect>`;});
 (st.manual||[]).forEach(mm=>{s+=`<text x="${mm.x+3}" y="${mm.y-3}">${esc(mm.tag)}</text>`;});
 if(labelPick)s+=`<circle cx="${labelPick.x}" cy="${labelPick.y}" r="4" fill="none" stroke="#E0B33A" stroke-width="1.5"/>`;
 if(teachBox)s+=`<rect class="tb" x="${teachBox[0]}" y="${teachBox[1]}" width="${teachBox[2]-teachBox[0]}" height="${teachBox[3]-teachBox[1]}"/>`;
 o.innerHTML=s;}

/* ------------------------------------------------------------ teaching */
let pending=null;
function tplSvg(t,w=44,h=30){if(!t)return '';const pad=2,sc=Math.min((w-2*pad)/Math.max(t.w,1),(h-2*pad)/Math.max(t.h,1));
 return `<svg class="th" viewBox="${-w/2} ${-h/2} ${w} ${h}" width="${w}" height="${h}">${t.segs.map(s=>`<line x1="${s[0]*sc}" y1="${s[1]*sc}" x2="${s[2]*sc}" y2="${s[3]*sc}" stroke="${s[4]?'#1F2937':'#334155'}" stroke-width="${s[4]?1.6:1}" stroke-linecap="round"/>`).join('')}</svg>`;}
function teachCard(fromBox){const c=P.querySelector('#ptTeachCard');if(!c)return;
 if(fromBox&&teachBox&&pages[pg]){pending=makeTemplate(pages[pg].data,teachBox,pipeW);}
 if(mode==='label'){c.innerHTML=`<h3>Name a line</h3><p>${labelPick?'Type the line number for the highlighted pipe:':'Click a pipe on the drawing that has no line number (or the wrong one).'}</p>${labelPick?`<div class="pt-form"><input type="text" id="ptLn" placeholder='e.g. 6"-P-1001-A1' value="${esc(labelPick.cur||'')}"><div class="row"><button class="pt-b pri" id="ptLnOk" type="button">Save</button><button class="pt-b" id="ptLnNo" type="button">Cancel</button></div></div>`:''}`;
  const ok=c.querySelector('#ptLnOk');if(ok){const inp=c.querySelector('#ptLn');inp.focus();const save=()=>{const v=inp.value.trim();if(v){pages[pg].manual.push({x:labelPick.x,y:labelPick.y,tag:v});}labelPick=null;teachCard();retrace();};ok.onclick=save;inp.onkeydown=e=>{if(e.key==='Enter')save();};c.querySelector('#ptLnNo').onclick=()=>{labelPick=null;teachCard();overlay();};}return;}
 if(mode!=='teach'){c.innerHTML=`<h3>Teach a symbol</h3><p>${doc?'Choose <b>Teach a symbol</b>, then draw a box around one symbol on the drawing.':'Open a P&amp;ID first.'}</p>`;return;}
 if(!teachBox||!pending){c.innerHTML=`<h3>Teach a symbol</h3><p>${teachBox&&!pending?'<span style="color:#9A6A08">Nothing to learn in that box. Draw it around the symbol itself (the pipe through it is ignored).</span>':'Draw a box tightly around one symbol. The pipe running through it is ignored.'}</p>`;return;}
 const guess=S.lib.length?'':'gate';
 c.innerHTML=`<h3>New symbol <small>${pending.segs.length} lines</small></h3><svg class="pt-prev" viewBox="${-pending.w*0.8} ${-pending.h*0.8} ${pending.w*1.6} ${pending.h*1.6}" preserveAspectRatio="xMidYMid meet">${pending.segs.map(s=>`<line x1="${s[0]}" y1="${s[1]}" x2="${s[2]}" y2="${s[3]}" stroke="#1F2937" stroke-width="${Math.max(pending.w,pending.h)/40}" stroke-linecap="round"/>`).join('')}</svg>
  <div class="pt-form" style="margin-top:8px"><label>Name<input type="text" id="ptNm" placeholder="e.g. Gate valve"></label><label>Type<select id="ptKd">${KINDS.map(([k,n])=>`<option value="${k}"${k===guess?' selected':''}>${n}</option>`).join('')}</select></label>
  <div class="row"><button class="pt-b pri" id="ptSave" type="button">Save symbol</button><button class="pt-b" id="ptCancel" type="button">Cancel</button></div></div>`;
 const nm=c.querySelector('#ptNm'),kd=c.querySelector('#ptKd');kd.onchange=()=>{if(!nm.value)nm.placeholder=KN[kd.value];};nm.focus();
 c.querySelector('#ptSave').onclick=()=>{S.lib.push({...pending,name:nm.value.trim()||KN[kd.value],kind:kd.value});pending=null;teachBox=null;teachCard();libList();overlay();msg(`Saved. ${S.lib.length} symbol${S.lib.length>1?'s':''} in the library. Teach the next one, or press Find.`);steps();};
 c.querySelector('#ptCancel').onclick=()=>{pending=null;teachBox=null;teachCard();overlay();};}
function libList(){const u=P.querySelector('#ptLib');if(!u)return;P.querySelector('#ptLibN').textContent=S.lib.length?`${S.lib.length} symbol${S.lib.length>1?'s':''}`:'';
 const cnt={};Object.values(pages).forEach(p=>!p.skip&&(p.matches||[]).forEach(m=>{if(!m.off)cnt[m.ti]=(cnt[m.ti]||0)+1;}));
 u.innerHTML=S.lib.length?S.lib.map((t,i)=>`<li>${tplSvg(t)}<span class="nm"><b>${esc(t.name)}</b>${t.name!==KN[t.kind]?`<small>${KN[t.kind]||t.kind}</small>`:''}</span><span class="ct" title="Found on all pages">${cnt[i]!=null?cnt[i]:''}</span><button class="pt-x" type="button" data-del="${i}" aria-label="Delete ${esc(t.name)}">×</button></li>`).join(''):'<li style="display:block;color:var(--muted);font-size:13px">No symbols yet. Teach one from the drawing.</li>';
 u.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const i=+b.dataset.del;S.lib.splice(i,1);Object.values(pages).forEach(p=>{p.matches=null;p.tr=null;});libList();overlay();results();steps();});
 P.querySelector('#ptFind').disabled=!(doc&&S.lib.length);}
function msg(t,cls){const m=P.querySelector('#ptMsg');if(m){m.className='pt-msg'+(cls?' '+cls:'');m.innerHTML=t;}}
function steps(){const li=P.querySelectorAll('#ptSteps li');if(!li.length)return;const found=Object.values(pages).some(p=>p.matches);const st=[!!doc,S.lib.length>0,found,found];const cur=st.indexOf(false);
 li.forEach((l,i)=>{l.classList.toggle('done',st[i]&&i!==cur);l.classList.toggle('on',i===(cur<0?3:cur));});}

/* ------------------------------------------------------------ find and trace */
async function findEverywhere(){if(busy||!doc||!S.lib.length)return;busy=true;const pr=P.querySelector('#ptProg');pr.hidden=false;const bar=pr.querySelector('i');
 try{for(let n=1;n<=doc.numPages;n++){msg(`Searching page ${n} of ${doc.numPages}…`);bar.style.width=`${(n-1)/doc.numPages*100}%`;await new Promise(r=>setTimeout(r,20));
   const d=await pageData(n);pages[n].matches=findAll(d,S.lib,pipeW);doTrace(n);}
  bar.style.width='100%';const tot=Object.values(pages).reduce((a,p)=>a+(p.skip?0:(p.matches||[]).length),0);msg(`Found ${tot} symbol${tot===1?'':'s'} on ${doc.numPages} page${doc.numPages>1?'s':''}. Click a marker to reject a wrong hit.`);}
 catch(e){console.error(e);msg('Something went wrong while searching this drawing.','warn');}
 busy=false;setTimeout(()=>pr.hidden=true,600);libList();overlay();results();steps();}
function doTrace(n){const st=pages[n];if(!st||!st.matches||!pipeW)return;let pat=S.pattern;try{new RegExp(pat,'g');}catch(e){pat='\\b\\B';}
 const data={...st.data,texts:(st.manual||[]).map(m=>({s:m.tag,cx:m.x,cy:m.y,pts:[[m.x,m.y]],manual:1})).concat(st.data.texts)};
 st.tr=trace(data,st.matches,S.lib,{pipeW,pattern:`${pat}${(st.manual||[]).length?'|'+st.manual.map(m=>m.tag.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'):''}`,labelDist:30});}
function retrace(){if(pages[pg]&&pages[pg].matches)doTrace(pg);overlay();results();}
function toggleMatch(i){const st=pages[pg];if(!st||!st.matches||!st.matches[i])return;st.matches[i].off=!st.matches[i].off;doTrace(pg);libList();overlay();results();}
function pickLine(p){const st=pages[pg];if(!st)return;if(!st.tr){if(st.matches==null){msg('Press Find first, so the pipes are traced.','warn');return;}}
 let best=null,bd=1e9;const tr=st.tr;tr.edges.forEach((e,ei)=>{if(e.sym)return;const A=tr.nodes[e.a],B=tr.nodes[e.b];const L=Math.hypot(B.x-A.x,B.y-A.y)||1;let t=((p[0]-A.x)*(B.x-A.x)+(p[1]-A.y)*(B.y-A.y))/(L*L);t=Math.max(0,Math.min(1,t));const d=Math.hypot(A.x+t*(B.x-A.x)-p[0],A.y+t*(B.y-A.y)-p[1]);if(d<bd){bd=d;best={x:A.x+t*(B.x-A.x),y:A.y+t*(B.y-A.y),ci:tr.chainOf[ei]};}});
 if(!best||bd>12){msg('No pipe there. Click right on a pipe line.','warn');return;}best.cur=tr.chains[best.ci].tag||'';labelPick=best;sel=best.cur||null;teachCard();overlay();}

/* ------------------------------------------------------------ results */
const npsOf=t=>{const m=/^(\d+(?:-\d+\/\d+|\/\d+)?)"/.exec(t);return m?m[1]:'';};
const NPSN=s=>String(s).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
function merged(){const M=new Map();
 Object.entries(pages).forEach(([n,p])=>{if(!p.tr||p.skip)return;p.tr.lines.forEach(l=>{const k=l.tag;if(!M.has(k))M.set(k,{tag:k,k:{},tee:0,cross:0,eq:0,open:0,pages:new Set()});const r=M.get(k);r.pages.add(+n);
  Object.entries(l.sym).forEach(([ti,c])=>{const kd=S.lib[ti]?S.lib[ti].kind:'other';r.k[kd]=(r.k[kd]||0)+c;});r.tee+=l.tee;r.cross+=l.cross;r.eq+=l.eq;r.open+=l.open;});});
 return [...M.values()].sort((a,b)=>(a.tag.startsWith('(')?1:0)-(b.tag.startsWith('(')?1:0)||a.tag.localeCompare(b.tag,undefined,{numeric:true}));}
function est(r){const nps=npsOf(r.tag),small=S.sw&&nps&&NPSN(nps)<=1.5;let fl=0,items=0;
 Object.entries(r.k).forEach(([k,c])=>{const f=small&&k!=='flange'&&k!=='blind'?0:(FLG[k]||0);fl+=f*c;if(f)items+=c;});fl+=r.eq;
 const L=+(S.len[r.tag]||0);const elb=L?Math.ceil(L/Math.max(1,+S.elb||6)):null;const sp=L?Math.ceil(L/Math.max(1,+S.spool||6))+items:null;return {nps,fl,elb,sp,L};}
function results(){const R=P.querySelector('#ptRes');if(!R)return;const rows=merged();
 if(!rows.length){R.innerHTML=doc&&S.lib.length?`<h2>Lines and counts</h2><p>Press <b>Find on all pages</b> to count the symbols and trace the lines.</p>`:'';return;}
 const kinds=KINDS.map(k=>k[0]).filter(k=>rows.some(r=>r.k[k]));
 const T={k:{},tee:0,eq:0,open:0,fl:0,elb:0,sp:0,L:0};
 const body=rows.map(r=>{const e=est(r);kinds.forEach(k=>T.k[k]=(T.k[k]||0)+(r.k[k]||0));T.tee+=r.tee+r.cross;T.eq+=r.eq;T.open+=r.open;T.fl+=e.fl;T.elb+=e.elb||0;T.sp+=e.sp||0;T.L+=e.L||0;
  return `<tr data-tag="${esc(r.tag)}"${sel===r.tag?' class="sel"':''}><td><b>${esc(r.tag)}</b>${r.pages.size>1?` <small style="color:var(--muted)">p.${[...r.pages].join(', ')}</small>`:''}</td>${kinds.map(k=>`<td>${r.k[k]||''}</td>`).join('')}<td>${r.tee+r.cross||''}</td><td>${r.eq||''}</td><td>${r.open||''}</td><td class="est">${e.fl||''}</td>
   <td><input type="number" min="0" step="1" data-len="${esc(r.tag)}" value="${S.len[r.tag]??''}" placeholder="m" aria-label="Estimated length for ${esc(r.tag)}"></td><td class="est">${e.elb??'–'}</td><td class="est">${e.sp??'–'}</td></tr>`;}).join('');
 R.innerHTML=`<h2>Lines and counts</h2><p>Counted from the drawing: symbols, tees and line ends. <span style="color:#7A5B0F">Brown figures are estimates.</span> Click a line to highlight it on the drawing.</p>
 <div class="pt-tw"><table class="pt-t"><thead><tr><th>Line</th>${kinds.map(k=>`<th title="${KN[k]}">${SH[k]}</th>`).join('')}<th>Tees</th><th title="Ends at equipment: nozzle connections">Equip. ends</th><th title="Open ends, caps or off-page connectors">Open ends</th><th>Flanges</th><th>Length, m</th><th>Elbows</th><th>Spools</th></tr></thead>
 <tbody>${body}</tbody><tfoot><tr><td>Total, ${rows.length} line${rows.length>1?'s':''}</td>${kinds.map(k=>`<td>${T.k[k]||''}</td>`).join('')}<td>${T.tee||''}</td><td>${T.eq||''}</td><td>${T.open||''}</td><td>${T.fl||''}</td><td>${T.L||''}</td><td>${T.elb||''}</td><td>${T.sp||''}</td></tr></tfoot></table></div>
 <div class="pt-legend"><span><i style="background:#147A4A"></i>Equipment end</span><span><i style="background:#C2412A"></i>Open end</span><span><i style="border:1.5px solid #7C3AED;border-radius:50%"></i>Tee</span><span><i style="background:#E0B33A"></i>Selected line</span></div>
 <div class="pt-set"><label>One elbow per (m)<input type="number" id="ptElb" min="1" step="0.5" value="${S.elb}"></label><label>Typical spool length (m)<input type="number" id="ptSp" min="1" step="0.5" value="${S.spool}"></label>
  <label>Class for MTO<select id="ptCls">${['150','300','600','900','1500','2500'].map(c=>`<option${c===S.cls?' selected':''}>${c}</option>`).join('')}</select></label><label>Schedule for MTO<select id="ptSch">${['10','20','40','STD','80','XS','160','XXS'].map(c=>`<option${c===S.sch?' selected':''}>${c}</option>`).join('')}</select></label>
  <label style="flex-direction:row;align-items:center;gap:8px;align-self:flex-end;height:36px"><input type="checkbox" id="ptSw"${S.sw?' checked':''}> Valves 1½" and smaller are socket welded (no flanges)</label></div>
 <p style="font-size:13px;color:var(--muted);margin:0 0 10px">Flanges: 2 per flanged item and 1 per equipment connection. Elbows: length ÷ the elbow spacing. Spools: length ÷ spool length, plus one per flanged item.</p>
 <div class="pt-bar"><button class="pt-b pri" id="ptMto" type="button">Send to MTO calculator</button><button class="pt-b" id="ptCsv" type="button">Download CSV</button></div><p class="pt-msg" id="ptMsg2"></p>`;
 R.querySelectorAll('tbody tr').forEach(tr=>tr.onclick=e=>{if(e.target.tagName==='INPUT')return;sel=sel===tr.dataset.tag?null:tr.dataset.tag;const pgs=merged().find(r=>r.tag===sel);if(pgs&&!pgs.pages.has(pg)){showPage([...pgs.pages][0]);}results();overlay();});
 R.querySelectorAll('[data-len]').forEach(i=>i.onchange=()=>{const v=i.value===''?undefined:+i.value;if(v==null)delete S.len[i.dataset.len];else S.len[i.dataset.len]=v;sv('pidto_len',S.len);results();});
 const on=(id,k,key,f=v=>v)=>{const e=R.querySelector('#'+id);e.onchange=()=>{S[k]=f(e.type==='checkbox'?e.checked:e.value);sv(key,S[k]);results();};};
 on('ptElb','elb','pidto_elb',Number);on('ptSp','spool','pidto_spool',Number);on('ptCls','cls','pidto_cls');on('ptSch','sch','pidto_sch');on('ptSw','sw','pidto_sw');
 R.querySelector('#ptCsv').onclick=()=>csv(rows,kinds);R.querySelector('#ptMto').onclick=()=>toMto(rows);}
function csv(rows,kinds){const h=['Line','NPS',...kinds.map(k=>KN[k]),'Tees','Equipment ends','Open ends','Flanges (est.)','Length m','Elbows (est.)','Spools (est.)','Pages'];
 const L=[`# P&ID take-off from ${fileName||'drawing'} (piperef.net). Estimates: elbows 1 per ${S.elb} m, spools ${S.spool} m.`,h.join(',')].concat(rows.map(r=>{const e=est(r);return [r.tag,e.nps,...kinds.map(k=>r.k[k]||0),r.tee+r.cross,r.eq,r.open,e.fl,e.L||'',e.elb??'',e.sp??'',[...r.pages].join(' ')].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',');}));
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+L.join('\n')],{type:'text/csv'}));a.download=(fileName.replace(/\.pdf$/i,'')||'pid')+'-takeoff.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);}
function toMto(rows){let st;try{st=JSON.parse(localStorage.getItem('piperef_mto')||'null')||{};}catch(e){st={};}if(!Array.isArray(st.lines))st.lines=[];
 let id=st.lines.reduce((m,l)=>Math.max(m,l.id||0),0);const ok=['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','3-1/2','4','5','6','8','10','12','14','16','18','20','24'];let n=0;
 for(const r of rows){if(r.tag.startsWith('('))continue;const e=est(r);const nps=ok.includes(e.nps)?e.nps:'6';const red=(r.k.reducer||0);
  st.lines.push({id:++id,tag:r.tag,nps,sch:S.sch,cls:S.cls,mat:'cs',len:e.L||'',e90:e.elb||'',e45:'',tee:(r.tee+r.cross)||'',rtee:'',br:'',crd:red||'',cr:'',erd:'',er:'',cap:'',wn:e.fl||'',bl:'',gate:r.k.gate||'',glob:r.k.globe||'',chk:r.k.check||'',ball:r.k.ball||'',noz:r.eq||''});n++;}
 try{localStorage.setItem('piperef_mto',JSON.stringify(st));}catch(e){}
 const m=P.querySelector('#ptMsg2');m.innerHTML=`Added ${n} line${n===1?'':'s'} to the MTO calculator. Set the reducer sizes there. <a href="mto.html">Open the MTO calculator</a>`;}

/* ------------------------------------------------------------ wiring */
function bind(){
 P.querySelector('#ptFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;const b=new Uint8Array(await f.arrayBuffer());await open(b,f.name);e.target.value='';};
 P.querySelector('#ptSample').onclick=async()=>{msg('Loading the sample…');const r=await fetch(`./assets/samples/sample-pid.pdf?v=${V}`).catch(()=>null)||await fetch(new URL(`./samples/sample-pid.pdf?v=${V}`,import.meta.url));if(!r||!r.ok){msg('The sample could not be loaded.','warn');return;}
  await open(new Uint8Array(await r.arrayBuffer()),'sample-pid.pdf');msg('Sample loaded: page 1 is the P&amp;ID, page 2 the legend. Go to page 2, untick <b>Count this page</b>, and teach each symbol, or <a href="#" id="ptAuto">use the sample legend for me</a>.');
  const a=P.querySelector('#ptAuto');if(a)a.onclick=async ev=>{ev.preventDefault();await autoSample();};};
 P.querySelector('#ptPage').onchange=e=>showPage(+e.target.value,true);
 P.querySelector('#ptZi').onclick=()=>zoomTo(z*1.3);P.querySelector('#ptZo').onclick=()=>zoomTo(z/1.3);P.querySelector('#ptFit').onclick=()=>showPage(pg,true);
 P.querySelector('#ptPan').onclick=()=>setMode('pan');P.querySelector('#ptTeach').onclick=()=>setMode(mode==='teach'?'pan':'teach');P.querySelector('#ptLabel').onclick=()=>setMode(mode==='label'?'pan':'label');
 P.querySelector('#ptFind').onclick=findEverywhere;
 P.querySelector('#ptCnt').onchange=e=>{if(pages[pg])pages[pg].skip=!e.target.checked;libList();results();};
 P.querySelector('#ptW').onchange=e=>{pipeW=+e.target.value;Object.keys(pages).forEach(n=>doTrace(+n));overlay();results();};
 P.querySelector('#ptPat').onchange=e=>{S.pattern=e.target.value;sv('pidto_pat',S.pattern);Object.keys(pages).forEach(n=>doTrace(+n));overlay();results();};
 P.querySelector('#ptExp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({app:'piperef-pid-takeoff',v:1,symbols:S.lib})],{type:'application/json'}));a.download='pid-symbol-library.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);};
 P.querySelector('#ptImp').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text());const arr=(j.symbols||j).filter(t=>t&&Array.isArray(t.segs));S.lib=S.lib.concat(arr);libList();steps();msg(`Imported ${arr.length} symbol${arr.length===1?'':'s'}.`);}catch(err){msg('That file is not a symbol library.','warn');}e.target.value='';};
 let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(doc&&!P.hidden)draw();},250);});}
/* the sample's legend: each symbol sits at a known place on page 2 */
async function autoSample(){const d=await pageData(2);pages[2].skip=true;const kinds=[['gate','Gate valve'],['globe','Globe valve'],['ball','Ball valve'],['check','Check valve'],['cv','Control valve'],['reducer','Reducer'],['strainer','Y-strainer'],['flange','Flanged joint']];
 const add=[];kinds.forEach(([k,n],i)=>{const y=d.H-(700-i*60);const t=makeTemplate(d,[104,y-17,136,y+14],pipeW);if(t)add.push({...t,name:n,kind:k});});
 S.lib=S.lib.filter(t=>!t.sample).concat(add.map(t=>({...t,sample:1})));libList();steps();await findEverywhere();if(pg!==1)await showPage(1,true);}
shell();
window.renderPIDTO=()=>{if(doc&&pages[pg])draw();};
