/* Pipe rack calculator: line list in, rack width, tiers and a cross-section out (SVG on the page, PDF or DXF to download).
   Globals from app.js: U, store, seg, bindSeg, tbl, DN, PIPE, odmm, flmm, CLASSES. Geometry is in mm, y up from grade. */
(function(){
const P=document.getElementById('p-rack');if(!P)return;
if(!document.getElementById('rack-css')){const st=document.createElement('style');st.id='rack-css';st.textContent=`
#p-rack .rk-sec{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:16px 18px;margin:0 0 16px}
#p-rack .rk-sec>h2{font-size:17px;margin:0 0 4px}
#p-rack .rk-sec>p.rk-sub{margin:0 0 12px;font-size:13.5px;color:var(--muted)}
#p-rack .rk-lt{width:100%;border-collapse:collapse;font-size:14px}
#p-rack .rk-lt th{font-size:12px;font-weight:600;color:var(--muted);text-align:left;padding:0 6px 6px}
#p-rack .rk-lt td{padding:4px 6px;border-top:1px solid var(--rule);vertical-align:middle}
#p-rack .rk-lt td.n{color:var(--muted);font-variant-numeric:tabular-nums;width:28px}
#p-rack .rk-lt input,#p-rack .rk-lt select,#p-rack .rk-opt input,#p-rack .rk-opt select,#p-rack .rk-paste textarea{height:34px;border:1px solid var(--rule-strong);border-radius:8px;padding:0 8px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box}
#p-rack .rk-lt td.nm{min-width:200px}
#p-rack .rk-lt td.sz{width:150px}#p-rack .rk-lt td.cl{width:90px}#p-rack .rk-lt td.in{width:90px}#p-rack .rk-lt td.ct{width:150px}
#p-rack .rk-lt select.c-P{border-color:#1849A9;color:#1849A9}#p-rack .rk-lt select.c-U{border-color:#147A4A;color:#147A4A}#p-rack .rk-lt select.c-F{border-color:#B42318;color:#B42318}
#p-rack .rk-x{border:0;background:none;color:var(--muted);font-size:18px;cursor:pointer;width:30px;height:30px;border-radius:6px}
#p-rack .rk-x:hover{background:var(--paper-2);color:var(--ink)}
#p-rack .rk-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}
#p-rack .rk-b{height:34px;padding:0 14px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13.5px;font-weight:550;cursor:pointer}
#p-rack .rk-b.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-rack .rk-b:hover{border-color:var(--accent)}
#p-rack .rk-cnt{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap}
#p-rack .rk-chip{font-size:12.5px;font-weight:600;padding:4px 10px;border-radius:99px;background:var(--paper-2)}
#p-rack .rk-chip.P{color:#1849A9;background:rgba(24,73,169,.09)}#p-rack .rk-chip.U{color:#147A4A;background:rgba(20,122,74,.1)}#p-rack .rk-chip.F{color:#B42318;background:rgba(180,35,24,.09)}
#p-rack .rk-paste{margin-top:10px}#p-rack .rk-paste textarea{height:120px;padding:8px;line-height:1.45;resize:vertical}
#p-rack .rk-paste p{font-size:12.5px;color:var(--muted);margin:4px 0 8px}
#p-rack .rk-opt{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px 18px}
#p-rack .rk-opt label{display:flex;flex-direction:column;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
#p-rack .rk-opt label small{font-weight:400;color:var(--muted)}
#p-rack .rk-opt .seg{align-self:flex-start}
#p-rack .rk-opt label.wide{grid-column:span 2}
@media (max-width:560px){#p-rack .rk-opt label.wide{grid-column:auto}#p-rack .rk-opt .seg{flex-wrap:wrap}}
[data-theme=dark] #p-rack .rk-chip.P,[data-theme=dark] #p-rack .rk-lt select.c-P{color:#9DB8F6;border-color:#5B7FD0}[data-theme=dark] #p-rack .rk-chip.U,[data-theme=dark] #p-rack .rk-lt select.c-U{color:#7DD3A8;border-color:#3E9A6D}[data-theme=dark] #p-rack .rk-chip.F,[data-theme=dark] #p-rack .rk-lt select.c-F{color:#F4A39A;border-color:#C2554A}
#p-rack .rk-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:0 0 12px}
#p-rack .rk-sum div{border:1px solid var(--rule);border-radius:10px;padding:10px 12px}
#p-rack .rk-sum span{display:block;font-size:12px;color:var(--muted)}#p-rack .rk-sum b{font-size:20px;font-variant-numeric:tabular-nums}
#p-rack .rk-draw{border:1px solid var(--rule);border-radius:10px;background:#F7F9FC;background-image:linear-gradient(rgba(24,73,169,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,73,169,.05) 1px,transparent 1px);background-size:20px 20px;padding:8px}
#p-rack .rk-draw svg{display:block;width:100%;height:auto;max-height:78vh}
#p-rack .rk-dl{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0 4px}
#p-rack .rk-dl small{color:var(--muted);font-size:12.5px}
#p-rack .rk-tiers{font-size:13.5px;margin:10px 0 0;padding-left:18px;color:var(--ink-2)}
#p-rack .rk-rules{font-size:13.5px;line-height:1.55;color:var(--ink-2);padding-left:18px;margin:6px 0 0}
#p-rack .rk-rules li+li{margin-top:4px}
#p-rack .rk-empty{padding:30px;text-align:center;color:var(--muted);font-size:14px}
@media (max-width:700px){#p-rack .rk-lt thead{display:none}#p-rack .rk-lt tr{display:grid;grid-template-columns:28px 1fr 1fr 34px;grid-template-areas:"n nm nm x" "sz sz cl cl" "in in ct ct";gap:6px;padding:10px 0;border-top:1px solid var(--rule)}#p-rack .rk-lt td{border:0;padding:0;width:auto!important;min-width:0!important}#p-rack .rk-lt td.n{grid-area:n;align-self:center}#p-rack .rk-lt td.nm{grid-area:nm}#p-rack .rk-lt td.sz{grid-area:sz}#p-rack .rk-lt td.cl{grid-area:cl}#p-rack .rk-lt td.in{grid-area:in}#p-rack .rk-lt td.ct{grid-area:ct}#p-rack .rk-lt td.x{grid-area:x}#p-rack .rk-lt td.rk-empty{grid-column:1/-1}#p-rack .rk-cnt{margin-left:0}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ data */
const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SZ=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=0.5);
/* ASME B16.47 Series A flange OD (in) [150,300,600], NPS 26–48 */
const B47={'26':[34.25,38.25,40],'28':[36.5,40.75,42.25],'30':[38.75,43,44.5],'32':[41.75,45.25,47],'34':[43.75,47.25,49],'36':[46,50,51.75],
 '38':[48.75,46,50],'40':[50.75,48.75,52],'42':[53,50.75,55.25],'44':[55.25,53.25,57.25],'46':[57.25,55.75,59.5],'48':[59.5,57.75,62.75]};
const flOD=(c,n)=>{if(NUM(n)>24){const r=B47[n],i=['150','300','600'].indexOf(c);return r&&i>=0?r[i]*25.4:null;}try{return flmm(c,n);}catch(e){return null;}};
const CAT={P:'Process',U:'Utility',F:'Fire water'};
/* name → category. Order matters: fire water, then clear process words, then utility words, then weaker process words; anything else is process */
const RX_F=/\bfire|\bf\.?w\b|hydrant|deluge|sprinkler|\bfoam|monitor/i;
const RX_PS=/sour|oily|waste|effluent|amine|acid gas|flare|relief|blow ?down|hydrocarbon|crude|naphtha|diesel|kero|\blpg\b|gasoline|petrol|slop|sulph|sulf|\bh2s\b|hydrogen|\bh2\b|gas oil|residue|bitumen|overhead|bottoms|\bprocess\b|\bhc\b/i;
const RX_U=/steam|\b(lps|mps|hps|vhps|ls|ms|hs|lls)\b|condensate|\bcond\b|cooling water|\bcw[sr]?\b|nitrogen|\bn2\b|instrument air|plant air|service air|utility|\b(ia|pa|ua|sa)\b|service water|\bsw\b|potable|drinking|demin|\bdmw?\b|boiler feed|\bbfw\b|raw water|fuel gas|\bfg\b|fuel oil|\bfo\b|hot oil|tempered|chilled|glycol|caustic|chemical|inhibitor|\bair\b|\bwater\b|oxygen|\bo2\b/i;
const RX_PW=/feed|product|reflux|recycle|drain|vapou?r|liquid|gas|oil|charge|draw|rundown|transfer|suction|discharge/i;
const autoCat=s=>!s||!s.trim()?'P':RX_F.test(s)?'F':RX_PS.test(s)?'P':RX_U.test(s)?'U':'P';
const isFlare=s=>/flare|relief|blow ?down/i.test(s||'');
const catOf=l=>l.cat&&l.cat!=='auto'?l.cat:autoCat(l.name);

const EX=[['Crude feed','12','300',50],['Product to storage','8','150',40],['Flare header','24','150',0],['Sour water','4','150',0],['Lean amine','6','300',0],['Slop oil','3','150',40],
 ['LP steam','10','150',75],['MP steam','6','300',75],['Steam condensate','4','150',40],['Cooling water supply','16','150',0],['Cooling water return','16','150',0],
 ['Instrument air','3','150',0],['Plant air','2','150',0],['Nitrogen','2','150',0],['Fuel gas','4','150',0],['Boiler feed water','4','600',40],['Fire water','12','150',0]];
const DEF={lines:[],fw:'rack',tray:'yes',nE:2,nI:1,tw:'600',fut:'25',futC:'',el1:6000,maxW:'10000',fins:'yes'};
let S;try{S=Object.assign({},DEF,JSON.parse(store.get('rack','null'))||{});}catch(e){S=Object.assign({},DEF);}
if(!Array.isArray(S.lines))S.lines=[];
let uid=S.lines.reduce((m,l)=>Math.max(m,l.id||0),0);
const save=()=>{try{store.set('rack',JSON.stringify(S));}catch(e){}};
const newLine=(name='',nps='4',cls='150',ins=0)=>({id:++uid,name,nps,cls,ins,cat:'auto'});
if(!S.lines.length&&store.get('rack',null)==null)S.lines=EX.map(e=>newLine(...e));

/* ------------------------------------------------------------ engineering rules */
const COL=300,EDGE=100,GAP=25,FGAP=25,TRAY_GAP=150,EI_SEP=300,BEAM=300,TIER_MIN=1500;
const up=(x,s)=>Math.ceil(x/s-1e-9)*s;
const shoeH=ins=>ins>0?Math.max(100,up(ins+25,50)):0;
function prep(l){const od=odmm(l.nps),ins=+l.ins||0,f=flOD(l.cls,l.nps)||0,fr=f?f/2+(S.fins==='yes'?ins:0):0;
 return Object.assign({},l,{od,ins,f,fr,env:Math.max(od/2+ins,fr),c:catOf(l),shoe:shoeH(ins)});}
/* centre-to-centre of two neighbours: pipe/insulation to pipe/insulation, or a flange to the other line's pipe/insulation (flanges staggered) */
/* fr = flange radius, plus the line's insulation when flanges are insulated or boxed */
const cc=(a,b)=>up(Math.max(a.od/2+a.ins+b.od/2+b.ins+GAP,a.fr?a.fr+b.od/2+b.ins+FGAP:0,b.fr?b.fr+a.od/2+a.ins+FGAP:0),10);
const futPct=()=>{const v=S.fut==='c'?+S.futC:+S.fut;return isFinite(v)&&v>=0?Math.min(v,200):0;};

/* split one tier's lines into the left and right column sides: forced edge lines first, then biggest lines to the lighter side */
function sides(ls){
 const L=ls.filter(l=>l._edge==='L'),R=ls.filter(l=>l._edge==='R');
 const sum=a=>a.reduce((s,l)=>s+2*l.env,0);
 ls.filter(l=>!l._edge).sort((a,b)=>b.env-a.env).forEach(l=>(sum(L)<=sum(R)?L:R).push(l));
 return {L,R};}
const run=a=>{let w=0;for(let i=1;i<a.length;i++)w+=cc(a[i-1],a[i]);return w;};
/* width a pipe tier needs, column centre to column centre, before and with future space */
function need(ls){
 if(!ls.length)return {base:0,F:0,w:0};
 const {L,R}=sides(ls),both=L.length&&R.length;
 const all=[...L,...R.slice().reverse()];
 let base=COL+2*EDGE+all[0].env+all[all.length-1].env+run(L)+run(R);
 base+=both?cc(L[L.length-1],R[R.length-1]):0;
 const F=up(base*futPct()/100,100);return {base,F,w:base+F};}
function trayNeed(){
 const nE=+S.nE||0,nI=+S.nI||0,tw=+S.tw,g=n=>n?n*tw+(n-1)*TRAY_GAP:0;
 const base=COL+2*EDGE+g(nE)+g(nI)+(nE&&nI?EI_SEP:0),F=up(base*futPct()/100,100);return {base,F,w:base+F};}

function solve(){
 const ls=S.lines.map(prep).filter(l=>l.od);
 const maxW=+S.maxW;
 const low=[],top=[],ug=[];
 ls.forEach(l=>{if(l.c==='F'){if(S.fw==='ug'){ug.push(l);return;}l._edge='L';low.push(l);}
  else if(isFlare(l.name)){l._edge='R';top.push(l);}
  else (l.c==='U'?top:low).push(l);});
 const pack=(grp,kind)=>{const T=[];
  const ord=[...grp.filter(l=>l._edge),...grp.filter(l=>!l._edge).sort((a,b)=>b.env-a.env)];
  ord.forEach(l=>{let t=T.find(t=>need([...t,l]).w<=maxW);if(!t){t=[];T.push(t);}t.push(l);});
  /* same number of tiers, but spread evenly: fire water on the lowest, flare on the highest, then biggest line to the emptiest tier */
  const k=T.length;if(k>1){const B=Array.from({length:k},()=>[]);let ok=true;
   ord.forEach(l=>{if(l._edge==='L'){B[0].push(l);return;}if(l._edge==='R'){B[k-1].push(l);return;}
    const c=B.map((t,i)=>({i,w:need([...t,l]).w})).filter(x=>x.w<=maxW).sort((x,y)=>need(B[x.i]).w-need(B[y.i]).w||x.i-y.i)[0];
    if(!c){ok=false;return;}B[c.i].push(l);});
   if(ok&&B.every(t=>t.length))return B.map(t=>({kind,lines:t}));}
  return T.map(t=>({kind,lines:t}));};
 const tiers=[...pack(low,'P'),...pack(top,'U')];
 if(S.tray==='yes'&&(+S.nE||+S.nI))tiers.push({kind:'T',lines:[]});
 tiers.forEach(t=>{t.n=t.kind==='T'?trayNeed():need(t.lines);});
 const W=tiers.length?up(Math.max(...tiers.map(t=>t.n.w)),500):0;
 /* elevations: tier spacing at least 1500, or the bigger line of the two tiers + 750 for branch turns, in 250 steps */
 const big=t=>t.kind==='T'?150:Math.max(0,...t.lines.map(l=>2*l.env+l.shoe));
 let el=+S.el1||6000;
 tiers.forEach((t,i)=>{if(i){const d=Math.max(TIER_MIN,up(Math.max(big(t),big(tiers[i-1]))+750,250));t.gap=d;el+=d;}t.el=el;});
 /* place lines: left side from the left column, right side from the right column; whatever is left in the middle is future space */
 tiers.forEach(t=>{
  if(t.kind==='T'){const nE=+S.nE||0,nI=+S.nI||0,tw=+S.tw;t.trays=[];let x=COL/2+EDGE;
   for(let i=0;i<nE;i++){t.trays.push({x,w:tw,k:'E',n:i+1});x+=tw+TRAY_GAP;}
   let xr=W-COL/2-EDGE;for(let i=0;i<nI;i++){xr-=tw;t.trays.push({x:xr,w:tw,k:'I',n:nI-i});xr-=TRAY_GAP;}
   const a=nE?COL/2+EDGE+nE*tw+(nE-1)*TRAY_GAP:COL/2,b=nI?W-COL/2-EDGE-nI*tw-(nI-1)*TRAY_GAP:W-COL/2;
   t.fut=[a+(nE?EI_SEP/2:EDGE),b-(nI?EI_SEP/2:EDGE)];return;}
  const {L,R}=sides(t.lines);let x=COL/2+EDGE;
  L.forEach((l,i)=>{x+=i?cc(L[i-1],l):l.env;l.x=x;});
  x=W-COL/2-EDGE;R.forEach((l,i)=>{x-=i?cc(R[i-1],l):l.env;l.x=x;});
  t.L=L;t.R=R;
  const a=L.length?L[L.length-1].x+L[L.length-1].env+GAP:COL/2+EDGE,b=R.length?R[R.length-1].x-R[R.length-1].env-GAP:W-COL/2-EDGE;
  t.fut=[a,b];
  t.lines.forEach(l=>{l.y=t.el+l.shoe+l.od/2;});});
 let no=0;const order=[];tiers.forEach((t,i)=>{t.i=i;t.lines.slice().sort((a,b)=>a.x-b.x).forEach(l=>{l.no=++no;l.tier=i;order.push(l);});});
 ug.forEach(l=>{l.no=++no;order.push(l);});
 return {W,tiers,ls,ug,order,maxW,pct:futPct()};}

/* ------------------------------------------------------------ geometry (mm, y up) shared by the SVG, PDF and DXF */
const tierName=t=>t.kind==='T'?'CABLE TRAYS':t.kind==='U'?'UTILITY':'PROCESS';
function hatch(x0,y0,x1,y1,s){const o=[];for(let c=x0-(y1-y0);c<x1;c+=s){let ax=c,ay=y0,bx=c+(y1-y0),by=y1;
 if(ax<x0){ay+=x0-ax;ax=x0;}if(bx>x1){by-=bx-x1;bx=x1;}if(ay<by)o.push([ax,ay,bx,by]);}return o;}
function section(R,o){
 const G=[],ln=(x1,y1,x2,y2,ly,st='thin')=>G.push({t:'l',x1,y1,x2,y2,ly,st}),
  ci=(cx,cy,r,ly,st='thin',fill)=>G.push({t:'c',cx,cy,r,ly,st,fill}),
  re=(x,y,w,h,ly,st='thin',fill)=>G.push({t:'r',x,y,w,h,ly,st,fill}),
  tx=(x,y,s,h,ly='TEXT',an='start',rot=0,b)=>G.push({t:'t',x,y,s,h,ly,an,rot,b});
 const {W,tiers}=R,th=o.th,top=tiers.length?tiers[tiers.length-1].el:0;
 /* grade, columns, beams */
 ln(-1600,0,W+1600,0,'STEEL','thick');hatch(-1600,-120,W+1600,0,120).forEach(s=>ln(...s,'STEEL'));
 /* steel as I-sections in elevation: dark flanges, light web. Columns: flanges at both faces; beams: flanges top and bottom, framing between column faces */
 const TF=16,BP=25;
 [0,W].forEach(x=>{re(x-COL/2,0,COL,top,'STEEL','thin','web');re(x-COL/2,0,TF,top,'STEEL','thin','flg');re(x+COL/2-TF,0,TF,top,'STEEL','thin','flg');
  re(x-COL/2-60,0,COL+120,BP,'STEEL','thin','flg');re(x-COL/2,top,COL,12,'STEEL','thin','flg');ln(x,-300,x,top+400,'CL','center');});
 tiers.forEach(t=>{const bx=COL/2,bw=W-COL;re(bx,t.el-BEAM,bw,BEAM,'STEEL','thin','web');re(bx,t.el-TF,bw,TF,'STEEL','thin','flg');re(bx,t.el-BEAM,bw,TF,'STEEL','thin','flg');
  /* stiffener plates in the column at the beam flanges */
  [0,W].forEach(x=>{ln(x-COL/2+TF,t.el-TF/2,x+COL/2-TF,t.el-TF/2,'STEEL');ln(x-COL/2+TF,t.el-BEAM+TF/2,x+COL/2-TF,t.el-BEAM+TF/2,'STEEL');});
  /* future zone */
  const [a,b]=t.fut,hh=t.kind==='T'?250:Math.max(500,...t.lines.map(l=>2*l.env+l.shoe));
  if(b-a>40){re(a,t.el,b-a,hh,'FUTURE','dash');hatch(a,t.el,b,t.el+hh,Math.max(150,th*2)).forEach(s=>ln(...s,'FUTURE','hair'));
   const s=`FUTURE ${Math.round(b-a)}`;tx((a+b)/2,t.el+hh+th*0.6,s,th*0.85,'FUTURE','middle');}
  /* elevation and tier name, left of the rack */
  tx(-COL/2-350,t.el-th*0.35,`TOS EL +${Math.round(t.el)}`,th,'TEXT','end',0,1);
  tx(-COL/2-350,t.el-th*1.75,tierName(t),th*0.8,'TEXT','end');
  if(t.kind==='T'){t.trays.forEach(r=>{re(r.x,t.el,r.w,100,'TRAY','thick');ln(r.x+20,t.el+100,r.x+20,t.el+20,'TRAY');ln(r.x+r.w-20,t.el+100,r.x+r.w-20,t.el+20,'TRAY');ln(r.x+20,t.el+20,r.x+r.w-20,t.el+20,'TRAY');
   tx(r.x+r.w/2,t.el+100+th*0.5,`${r.k}${r.n}`,th*0.85,'TEXT','middle',0,1);});return;}
  /* pipes, shoes, bubbles */
  const br=o.r,lv=[];
  t.lines.slice().sort((a,b)=>a.x-b.x).forEach(l=>{
   if(l.shoe)re(l.x-Math.min(l.od/2,120),t.el,2*Math.min(l.od/2,120),l.shoe,'PIPE');
   if(l.ins)ci(l.x,l.y,l.od/2+l.ins,'INSUL','dash');
   ci(l.x,l.y,l.od/2,'PIPE','thick','pipe-'+l.c);
   ln(l.x-l.od/2-60,l.y,l.x+l.od/2+60,l.y,'CL','center');ln(l.x,l.y-l.od/2-60,l.x,l.y+l.od/2+60,'CL','center');
   /* bubble level: lowest one clear of the previous bubbles */
   let k=0;while(lv[k]!=null&&l.x-lv[k]<2*br+30)k++;lv[k]=l.x;
   const yb=l.y+l.od/2+l.ins+br*1.6+k*br*2.3;ln(l.x,l.y+l.od/2+l.ins,l.x,yb-br,'TEXT','hair');
   ci(l.x,yb,br,'TEXT','thin','bub');tx(l.x,yb-br*0.36,String(l.no),br*1.0,'TEXT','middle',0,1);});});
 /* overall width dimension below grade */
 const yd=-700;ln(0,yd,W,yd,'DIM');[0,W].forEach(x=>{ln(x,-150,x,yd-150,'DIM');ln(x-90,yd-90,x+90,yd+90,'DIM','thick');});
 tx(W/2,yd+th*0.5,`RACK WIDTH ${W} (COLUMN C/C)`,th,'DIM','middle',0,1);
 tx(-COL/2-350,th*0.45,'GRADE EL +0',th,'TEXT','end',0,1);
 /* tier spacing dims on the right */
 const xd=W+COL/2+700;let prev=0;
 tiers.forEach(t=>{ln(W+COL/2+150,t.el,xd+150,t.el,'DIM');ln(xd-90,t.el-90,xd+90,t.el+90,'DIM','thick');
  const d=t.el-prev;tx(xd+120,(t.el+prev)/2-th*0.35,String(Math.round(d)),th*0.9,'DIM','start',0);prev=t.el;});
 ln(xd,0,xd,prev,'DIM');ln(xd-90,-90,xd+90,90,'DIM','thick');
 const ext={x0:-COL/2-350-th*9,x1:xd+th*4,y0:yd-th*2,y1:top+Math.max(800,...tiers.map(t=>t.kind==='T'?400:Math.max(...t.lines.map(l=>l.y-t.el+l.od/2+l.ins+o.r*6),600)))};
 return {G,ext};}

/* full drawing sheet for PDF / DXF: A3 frame, section, line schedule and title block, all in model mm at the chosen scale */
const SCALES=[10,20,25,30,40,50,75,100,125,150,200,250,300,400,500];
function sheet(R){
 let sc=50,sec;
 for(const s of SCALES){sc=s;sec=section(R,{th:2.5*s,r:2.4*s});const e=sec.ext;if((e.x1-e.x0)/s<=250&&(e.y1-e.y0)/s<=225)break;}
 const {G,ext}=sec,k=sc,tx=(x,y,s,h,an='start',b)=>G.push({t:'t',x,y,s,h:h*k,ly:'TEXT',an,rot:0,b}),
  ln=(x1,y1,x2,y2,ly='FRAME',st='thin')=>G.push({t:'l',x1,y1,x2,y2,ly,st});
 /* sheet origin so the section sits in the left area */
 const ox=ext.x0-10*k-(250*k-(ext.x1-ext.x0))/2,oy=ext.y0-52*k-(225*k-(ext.y1-ext.y0))/2;
 const X=v=>ox+v*k,Y=v=>oy+v*k,box=(a,b,c,d,st)=>{ln(X(a),Y(b),X(c),Y(b),'FRAME',st);ln(X(c),Y(b),X(c),Y(d),'FRAME',st);ln(X(c),Y(d),X(a),Y(d),'FRAME',st);ln(X(a),Y(d),X(a),Y(b),'FRAME',st);};
 box(0,0,420,297,'thin');box(10,10,410,287,'thick');
 /* line schedule, right column */
 const sx=275,cols=[0,8,56,68,82,96,114],hd=['NO','LINE','NPS','CLASS','INS','TYPE','TIER'];
 const rows=R.order,rh=Math.min(5.2,(287-62-12)/Math.max(rows.length+1,1)),fs=Math.min(2.5,rh*0.5);
 let y=287-8;tx(X(sx),Y(y),'LINE SCHEDULE',3.2,'start',1);y-=4;
 ln(X(sx),Y(y),X(405),Y(y));y-=rh;
 hd.forEach((h,i)=>tx(X(sx+cols[i]+1),Y(y+rh*0.3),h,fs,'start',1));ln(X(sx),Y(y),X(405),Y(y));
 rows.forEach(l=>{y-=rh;const nm=asc(l.name||'Line '+l.no);
  [String(l.no),nm.length>26?nm.slice(0,25)+'.':nm,l.nps,l.cls,l.ins?String(l.ins):'-',l.c==='F'?'FW':l.c==='U'?'UTIL':'PROC',l.tier!=null?String(l.tier+1):'UG']
   .forEach((v,i)=>tx(X(sx+cols[i]+1),Y(y+rh*0.3),v,fs));ln(X(sx),Y(y),X(405),Y(y),'FRAME','hair');});
 /* notes */
 let ny=45;const notes=[`1. DIMENSIONS IN MM. ELEVATIONS ARE TOP OF STEEL (TOS) FROM GRADE.`,`2. FUTURE SPACE ${R.pct}% OF THE WIDTH THE LINES NEED, ROUNDED TO THE NEXT 500 MM.`,
  `3. LINE C/C = OD/2 + INS + OD/2 + INS + 25, OR FLANGE OD/2 ${S.fins==='yes'?'+ INS ':''}+ OD/2 + INS + 25 (FLANGES STAGGERED).`,`4. PRELIMINARY. CHECK LOADS, STRESS AND PROJECT SPECIFICATION BEFORE ISSUE.`];
 if(R.tiers.some(t=>t.kind==='T'))notes.push(`5. CABLE TRAYS: E = ELECTRICAL, I = INSTRUMENT, ${S.tw} MM WIDE.`);
 notes.forEach(s=>{tx(X(15),Y(ny),s,1.9);ny-=3.2;});ny-=0;
 if(R.ug.length){tx(X(15),Y(ny),`FIRE WATER UNDERGROUND, NOT ON RACK: ${R.ug.map(l=>l.no).join(', ')}`,1.9);}
 /* title block */
 box(275,10,410,46,'thick');ln(X(275),Y(22),X(410),Y(22));ln(X(275),Y(34),X(410),Y(34));ln(X(350),Y(10),X(350),Y(22));
 tx(X(278),Y(38.5),'PIPE RACK - TYPICAL CROSS SECTION',3.6,'start',1);
 tx(X(278),Y(26.5),`WIDTH ${R.W} MM  |  ${R.tiers.length} TIER${R.tiers.length===1?'':'S'}  |  ${R.ls.length} LINES`,2.6);
 tx(X(278),Y(14.5),`SCALE 1:${sc} (A3)`,2.6);tx(X(353),Y(14.5),new Date().toISOString().slice(0,10),2.6);
 tx(X(278),Y(5),'Generated with Pipe Ref (piperef.net) - preliminary sizing',1.8);
 return {G,sc,ox,oy,W:420*k,H:297*k};}

/* ------------------------------------------------------------ renderers */
const asc=s=>String(s).replace(/[″”“]/g,'"').replace(/[–—]/g,'-').replace(/[^\x20-\x7E]/g,'');
const COLR={'pipe-P':'#DCE6F8','pipe-U':'#DDF1E6','pipe-F':'#FADCD8',steel:'#C9D1DB',web:'#D9DFE7',flg:'#7D8A9A',bub:'#FFFFFF'};
const STROKE={STEEL:'#556274',PIPE:'#1F2937',INSUL:'#6B7280',TRAY:'#8A5A00',FUTURE:'#9A6A08',DIM:'#1849A9',TEXT:'#1F2937',CL:'#9AA6B4',FRAME:'#1F2937'};
const SW={thick:2,thin:1.1,hair:.6,dash:1,center:.6};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function toSVG(R){
 const top=R.tiers[R.tiers.length-1].el,th=Math.max(120,Math.max(R.W*1.4,top)/62);const {G,ext}=section(R,{th,r:th*0.8});const pad=60;
 const vx=ext.x0-pad,vy=-(ext.y1+pad),vw=ext.x1-ext.x0+2*pad,vh=ext.y1-ext.y0+2*pad;
 const f=x=>+x.toFixed(1);
 const dash=st=>st==='dash'?' stroke-dasharray="6 4"':st==='center'?' stroke-dasharray="14 4 3 4"':'';
 const a=G.map(g=>{const st=`stroke="${STROKE[g.ly]}" stroke-width="${SW[g.st]||1}" vector-effect="non-scaling-stroke"${dash(g.st)}`;
  if(g.t==='l')return `<line x1="${f(g.x1)}" y1="${f(-g.y1)}" x2="${f(g.x2)}" y2="${f(-g.y2)}" ${st}/>`;
  if(g.t==='c')return `<circle cx="${f(g.cx)}" cy="${f(-g.cy)}" r="${f(g.r)}" fill="${g.fill?COLR[g.fill]:'none'}" ${st}/>`;
  if(g.t==='r')return `<rect x="${f(g.x)}" y="${f(-g.y-g.h)}" width="${f(g.w)}" height="${f(g.h)}" fill="${g.fill?COLR[g.fill]:'none'}" ${st}/>`;
  return `<text x="${f(g.x)}" y="${f(-g.y)}" font-size="${f(g.h)}" text-anchor="${g.an}" fill="${STROKE[g.ly]}"${g.b?' font-weight="600"':''} font-family="Geist,system-ui,sans-serif">${esc(g.s)}</text>`;});
 return `<svg viewBox="${f(vx)} ${f(vy)} ${f(vw)} ${f(vh)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipe rack cross-section, ${R.W} mm wide, ${R.tiers.length} tiers">${a.join('')}</svg>`;}

function toPDF(R){
 const {G,sc,ox,oy}=sheet(R),pt=v=>v*72/25.4,PX=x=>pt((x-ox)/sc),PY=y=>pt((y-oy)/sc),n=v=>(+v).toFixed(2);
 const rgb=h=>[1,3,5].map(i=>(parseInt(h.slice(i,i+2),16)/255).toFixed(3)).join(' ');
 const lw={thick:.7,thin:.35,hair:.18,dash:.3,center:.18};
 let c='1 J 1 j\n';
 const K=0.5523;
 G.forEach(g=>{
  const sw=`${STROKE[g.ly]?rgb(STROKE[g.ly]):'0 0 0'} RG ${lw[g.st]||.35} w ${g.st==='dash'?'[3 2] 0 d':g.st==='center'?'[6 1.5 1 1.5] 0 d':'[] 0 d'}\n`;
  if(g.t==='l'){c+=sw+`${n(PX(g.x1))} ${n(PY(g.y1))} m ${n(PX(g.x2))} ${n(PY(g.y2))} l S\n`;}
  else if(g.t==='r'){c+=sw+(g.fill?`${rgb(COLR[g.fill])} rg `:'')+`${n(PX(g.x))} ${n(PY(g.y))} ${n(pt(g.w/sc))} ${n(pt(g.h/sc))} re ${g.fill?'B':'S'}\n`;}
  else if(g.t==='c'){const x=PX(g.cx),y=PY(g.cy),r=pt(g.r/sc),k=r*K;
   c+=sw+(g.fill?`${rgb(COLR[g.fill])} rg `:'')+`${n(x+r)} ${n(y)} m ${n(x+r)} ${n(y+k)} ${n(x+k)} ${n(y+r)} ${n(x)} ${n(y+r)} c ${n(x-k)} ${n(y+r)} ${n(x-r)} ${n(y+k)} ${n(x-r)} ${n(y)} c ${n(x-r)} ${n(y-k)} ${n(x-k)} ${n(y-r)} ${n(x)} ${n(y-r)} c ${n(x+k)} ${n(y-r)} ${n(x+r)} ${n(y-k)} ${n(x+r)} ${n(y)} c ${g.fill?'B':'S'}\n`;}
  else{const s=asc(g.s),h=pt(g.h/sc),w=s.length*h*(g.b?0.56:0.52),x=PX(g.x)-(g.an==='middle'?w/2:g.an==='end'?w:0);
   c+=`${rgb(STROKE[g.ly]||'#000000')} rg BT /${g.b?'F2':'F1'} ${n(h)} Tf ${n(x)} ${n(PY(g.y))} Td (${s.replace(/[\\()]/g,m=>'\\'+m)}) Tj ET\n`;}});
 const objs=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${n(pt(420))} ${n(pt(297))}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
  `<< /Length ${c.length} >>\nstream\n${c}endstream`,'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'];
 let out='%PDF-1.4\n',xr=[];objs.forEach((o,i)=>{xr.push(out.length);out+=`${i+1} 0 obj\n${o}\nendobj\n`;});
 const xs=out.length;out+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n${xr.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${xs}\n%%EOF`;
 return new Blob([out],{type:'application/pdf'});}

function toDXF(R){
 const {G}=sheet(R),L=[];const p=(...a)=>{for(let i=0;i<a.length;i+=2)L.push(a[i],a[i+1]);};
 const LAY={STEEL:8,PIPE:7,INSUL:9,TRAY:30,FUTURE:40,DIM:5,TEXT:7,CL:252,FRAME:7};
 const lt=st=>st==='dash'?'DASHED':st==='center'?'CENTER':'CONTINUOUS',n=v=>(+v).toFixed(2);
 p(0,'SECTION',2,'HEADER',9,'$ACADVER',1,'AC1009',9,'$INSBASE',10,'0.0',20,'0.0',30,'0.0',0,'ENDSEC');
 p(0,'SECTION',2,'TABLES',0,'TABLE',2,'LTYPE',70,3);
 p(0,'LTYPE',2,'CONTINUOUS',70,0,3,'Solid line',72,65,73,0,40,'0.0');
 p(0,'LTYPE',2,'DASHED',70,0,3,'Dashed __ __ __',72,65,73,2,40,'150.0',49,'100.0',49,'-50.0');
 p(0,'LTYPE',2,'CENTER',70,0,3,'Center ____ _ ____',72,65,73,4,40,'500.0',49,'320.0',49,'-60.0',49,'60.0',49,'-60.0');
 p(0,'ENDTAB',0,'TABLE',2,'LAYER',70,Object.keys(LAY).length);
 Object.entries(LAY).forEach(([k,c])=>p(0,'LAYER',2,'RACK-'+k,70,0,62,c,6,k==='CL'?'CENTER':k==='INSUL'||k==='FUTURE'?'DASHED':'CONTINUOUS'));
 p(0,'ENDTAB',0,'TABLE',2,'STYLE',70,1,0,'STYLE',2,'STANDARD',70,0,40,'0.0',41,'1.0',50,'0.0',71,0,42,'2.5',3,'txt',4,'',0,'ENDTAB',0,'ENDSEC');
 p(0,'SECTION',2,'ENTITIES');
 G.forEach(g=>{const ly='RACK-'+g.ly,l=lt(g.st);
  if(g.t==='l')p(0,'LINE',8,ly,6,l,10,n(g.x1),20,n(g.y1),30,'0.0',11,n(g.x2),21,n(g.y2),31,'0.0');
  else if(g.t==='c')p(0,'CIRCLE',8,ly,6,l,10,n(g.cx),20,n(g.cy),30,'0.0',40,n(g.r));
  else if(g.t==='r'){const q=[[g.x,g.y],[g.x+g.w,g.y],[g.x+g.w,g.y+g.h],[g.x,g.y+g.h],[g.x,g.y]];
   for(let i=0;i<4;i++)p(0,'LINE',8,ly,6,l,10,n(q[i][0]),20,n(q[i][1]),30,'0.0',11,n(q[i+1][0]),21,n(q[i+1][1]),31,'0.0');}
  else{const h=g.an==='middle'?1:g.an==='end'?2:0;
   p(0,'TEXT',8,ly,10,n(g.x),20,n(g.y),30,'0.0',40,n(g.h),1,asc(g.s));if(h)p(72,h,11,n(g.x),21,n(g.y),31,'0.0');}});
 p(0,'ENDSEC',0,'EOF');
 return new Blob([L.join('\r\n')+'\r\n'],{type:'application/dxf'});}

const dl=(b,name)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},800);};

/* ------------------------------------------------------------ page */
const fm=x=>U==='mm'?Math.round(x).toLocaleString('en-US'):(x/25.4).toFixed(1);
const uL=()=>U==='mm'?'mm':'in';
const sizeOpts=cur=>SZ.map(n=>`<option value="${n}"${n===cur?' selected':''}>${n}″ (DN ${DN[n]})</option>`).join('');
const clsOpts=cur=>CLASSES.map(c=>`<option${c===cur?' selected':''}>${c}</option>`).join('');
const catOpts=l=>{const a=autoCat(l.name);return `<option value="auto"${l.cat==='auto'?' selected':''}>Auto: ${CAT[a]}</option>${['P','U','F'].map(k=>`<option value="${k}"${l.cat===k?' selected':''}>${CAT[k]}</option>`).join('')}`;};
const row=(l,i)=>`<tr data-id="${l.id}"><td class="n">${i+1}</td>
 <td class="nm"><input data-f="name" value="${esc(l.name).replace(/"/g,'&quot;')}" placeholder="e.g. Cooling water supply" aria-label="Line ${i+1} name or service" maxlength="60"></td>
 <td class="sz"><select data-f="nps" aria-label="Line ${i+1} size">${sizeOpts(l.nps)}</select></td>
 <td class="cl"><select data-f="cls" aria-label="Line ${i+1} flange class">${clsOpts(l.cls)}</select></td>
 <td class="in"><input data-f="ins" type="number" min="0" max="300" step="5" value="${l.ins||0}" aria-label="Line ${i+1} insulation thickness, mm"></td>
 <td class="ct"><select data-f="cat" class="c-${catOf(l)}" aria-label="Line ${i+1} type">${catOpts(l)}</select></td>
 <td class="x"><button class="rk-x" type="button" data-del="${l.id}" aria-label="Remove line ${i+1}">×</button></td></tr>`;

function shell(){
 P.innerHTML=`<div class="phead"><div><h1>Pipe rack calculator</h1><p>List the lines that run on the rack. Each line is sorted into process, utility or fire water from its name, and you can change it. Choose cable trays and future space, then download the cross-section as PDF or DXF.</p></div></div>
 <section class="rk-sec"><h2>1. Lines on the rack</h2><p class="rk-sub">Battery limit and unit lines. Type the service name; the type fills in by itself. Insulation in mm, 0 for bare pipe.</p>
  <div class="tw" style="overflow:visible"><table class="rk-lt"><thead><tr><th></th><th>Line name / service</th><th>Size</th><th>Class</th><th>Insulation</th><th>Type</th><th></th></tr></thead><tbody id="rkRows"></tbody></table></div>
  <div class="rk-btns"><button class="rk-b pri" type="button" id="rkAdd">Add line</button><button class="rk-b" type="button" id="rkPasteT">Paste a list</button><button class="rk-b" type="button" id="rkEx">Load example</button><button class="rk-b" type="button" id="rkClr">Clear all</button><div class="rk-cnt" id="rkCnt"></div></div>
  <div class="rk-paste" id="rkPaste" hidden><p>One line per row: name, size, class, insulation. Example: <code>LP steam, 10, 150, 75</code>. Copying rows from Excel works too.</p><textarea id="rkPasteTx" aria-label="Paste lines"></textarea><div class="rk-btns"><button class="rk-b pri" type="button" id="rkPasteGo">Add these lines</button></div></div>
 </section>
 <section class="rk-sec"><h2>2. Rack options</h2><p class="rk-sub">Cable trays, fire water and how much room to keep for future lines.</p><div class="rk-opt" id="rkOpt"></div></section>
 <section class="rk-sec" id="rkOut"></section>`;
 drawRows();drawOpt();drawOut();bindShell();}

function drawRows(){
 const tb=P.querySelector('#rkRows');tb.innerHTML=S.lines.map(row).join('')||`<tr><td colspan="7" class="rk-empty">No lines yet. Add a line, paste a list or load the example.</td></tr>`;
 counts();}
function counts(){const c={P:0,U:0,F:0};S.lines.forEach(l=>c[catOf(l)]++);
 P.querySelector('#rkCnt').innerHTML=Object.keys(c).map(k=>`<span class="rk-chip ${k}">${CAT[k]} ${c[k]}</span>`).join('');}
function drawOpt(){
 const o=P.querySelector('#rkOpt');
 o.innerHTML=`<label><span>Cable trays on the rack?</span>${seg('rkTray',[['yes','Yes'],['no','No']],S.tray)}</label>
 ${S.tray==='yes'?`<label>Electrical trays<input type="number" min="0" max="12" id="rkNE" value="${S.nE}"></label>
 <label>Instrument trays<input type="number" min="0" max="12" id="rkNI" value="${S.nI}"></label>
 <label>Tray width, mm<select id="rkTW">${[300,450,600,750,900].map(v=>`<option${String(v)===String(S.tw)?' selected':''}>${v}</option>`).join('')}</select></label>`:''}
 <label><span>Fire water</span>${seg('rkFw',[['rack','On the rack'],['ug','Underground']],S.fw)}</label>
 <label class="wide"><span>Future space <small>share of the width the lines need</small></span>${seg('rkFut',[['10','10%'],['20','20%'],['25','25%'],['30','30%'],['c','Other']],S.fut)}</label>
 ${S.fut==='c'?`<label>Future space, %<input type="number" min="0" max="200" step="5" id="rkFutC" value="${S.futC}" placeholder="e.g. 35"></label>`:''}
 <label>First tier elevation, mm <small>top of steel from grade</small><input type="number" min="2000" max="20000" step="100" id="rkEl" value="${S.el1}"></label>
 <label><span>Flanges on insulated lines <small>insulated or boxed flanges add the insulation to the flange OD</small></span>${seg('rkFins',[['yes','Insulated'],['no','Bare']],S.fins)}</label>
 <label>Widest rack allowed <small>more lines go to another tier</small><select id="rkMax">${[6000,8000,10000,12000,15000].map(v=>`<option value="${v}"${String(v)===String(S.maxW)?' selected':''}>${v/1000} m</option>`).join('')}</select></label>`;
 bindSeg('rkTray',v=>{S.tray=v;save();drawOpt();drawOut();});
 bindSeg('rkFw',v=>{S.fw=v;save();drawOpt();drawOut();});
 bindSeg('rkFins',v=>{S.fins=v;save();drawOpt();drawOut();});
 bindSeg('rkFut',v=>{S.fut=v;save();drawOpt();drawOut();});
 [['rkNE','nE'],['rkNI','nI'],['rkTW','tw'],['rkFutC','futC'],['rkEl','el1'],['rkMax','maxW']].forEach(([id,k])=>{const e=o.querySelector('#'+id);if(e)e.addEventListener(e.tagName==='SELECT'?'change':'input',()=>{S[k]=e.tagName==='SELECT'?e.value:(e.value===''?'':+e.value);save();drawOut();});});}

let LAST=null;
function drawOut(){
 const out=P.querySelector('#rkOut');
 if(!S.lines.length){out.innerHTML=`<h2>3. Rack</h2><p class="rk-empty">Add lines to size the rack.</p>`;LAST=null;return;}
 const R=solve();LAST=R;
 if(!R.tiers.length){out.innerHTML=`<h2>3. Rack</h2><p class="rk-empty">No lines on the rack (fire water is set to underground).</p>`;return;}
 const c={P:0,U:0,F:0};R.ls.forEach(l=>c[l.c]++);
 const tierLine=t=>`<li><b>Tier ${t.i+1}, TOS EL +${fm(t.el)} ${uL()}</b>: ${t.kind==='T'?`${+S.nE||0} electrical (E) + ${+S.nI||0} instrument (I) trays, ${S.tw} mm wide`:`${t.lines.length} ${t.kind==='U'?'utility':'process'} line${t.lines.length===1?'':'s'}${t.lines.some(l=>l.c==='F')?' incl. fire water at the left column':''}${t.lines.some(l=>isFlare(l.name))?' incl. flare / relief at the right column':''}`}; future space ${fm(Math.max(0,t.fut[1]-t.fut[0]))} ${uL()}${t.gap?`; ${fm(t.gap)} ${uL()} above the tier below`:''}</li>`;
 const rows=R.order.map(l=>`<tr><td>${l.no}</td><td style="text-align:left">${esc(l.name||'—')}</td><td>${l.nps}″</td><td>${l.cls}</td><td>${l.ins||'—'}</td><td style="text-align:left">${CAT[l.c]}</td><td>${l.tier!=null?l.tier+1:'Underground'}</td><td>${l.x!=null?fm(l.x):'—'}</td></tr>`);
 out.innerHTML=`<h2>3. Rack</h2><p class="rk-sub">Width is column centre to column centre, rounded up to 500 mm. Line numbers on the drawing match the schedule.</p>
 <div class="rk-sum"><div><span>Rack width</span><b>${fm(R.W)} ${uL()}</b></div><div><span>Tiers</span><b>${R.tiers.length}</b></div><div><span>Top tier, TOS</span><b>${fm(R.tiers[R.tiers.length-1].el)} ${uL()}</b></div><div><span>Lines</span><b>${c.P} P · ${c.U} U · ${c.F} FW</b></div><div><span>Future space</span><b>${R.pct}%</b></div></div>
 ${R.W>R.maxW?`<p class="note" style="margin:0 0 10px">One line is wider than the ${R.maxW/1000} m limit on its own, so the rack is wider than the limit. Consider a two-bay rack.</p>`:''}
 <div class="rk-draw">${toSVG(R)}</div>
 <div class="rk-dl"><span class="lbl" style="font-size:13px;font-weight:600">Download drawing</span>${seg('rkFmt',[['pdf','PDF'],['dxf','DXF for AutoCAD']],S.fmt||'pdf')}<button class="rk-b pri" type="button" id="rkDl">Download</button><button class="chat-b" type="button" id="rkChat">Copy for chat</button><small>${(S.fmt||'pdf')==='pdf'?'A3 sheet with line schedule and title block.':'Opens in AutoCAD, BricsCAD and others; use Save As to make a DWG. Model space in mm.'}</small></div>
 <ul class="rk-tiers">${R.tiers.map(tierLine).join('')}</ul>
 <h3 style="margin:18px 0 8px;font-size:16px">Line schedule</h3>
 ${tbl(['No.','Line','Size','Class','Ins. mm','Type','Tier',`From left column, ${uL()}`],rows)}
 <h3 style="margin:18px 0 6px;font-size:16px">How the rack is sized</h3>
 <ul class="rk-rules">
  <li>Process lines go on the lower tier(s), utility lines above them and cable trays on the top tier. Fire water sits on the lowest tier next to a column. Flare and relief lines go on the top pipe tier at the outside, so they can slope without pockets.</li>
  <li>Larger lines go next to the columns, smaller ones towards the middle. Future space is kept in the middle of each tier.</li>
  <li>Centre-to-centre of neighbours = the larger of pipe or insulation to pipe or insulation + ${GAP} mm, and flange OD/2 (+ the line's insulation when flanges are insulated) to the next pipe or insulation + ${FGAP} mm (flanges staggered). Flange OD from ASME B16.5, and B16.47 Series A above NPS 24.</li>
  <li>Outermost line: ${EDGE} mm from the column face to the outside of the insulation or the (insulated) flange, whichever sticks out more. Columns taken as ${COL} mm wide.</li>
  <li>Insulated lines sit on shoes: 100 mm, or the insulation + 25 mm rounded up to 50.</li>
  <li>Width a tier needs × (1 + future %), then the widest tier is rounded up to 500 mm. When a tier would be wider than the limit you chose, lines move to another tier.</li>
  <li>Tier spacing = 1500 mm, or the largest line of the two tiers + 750 mm for branch turns, whichever is more, in 250 mm steps.</li>
  <li>Electrical and instrument trays sit at opposite ends with ${EI_SEP} mm or more between them; ${TRAY_GAP} mm between trays.</li>
  <li>This is a preliminary width for layout. Confirm with the stress, civil and electrical disciplines and your project specification.</li></ul>`;
 bindSeg('rkFmt',v=>{S.fmt=v;save();drawOut();});
 const cb=out.querySelector('#rkChat');if(cb&&window.shareChat)cb.onclick=()=>window.shareChat({title:'Pipe rack, preliminary sizing',sub:`${R.ls.length} lines · ${c.P} process · ${c.U} utility · ${c.F} fire water · future ${R.pct}%`,rows:[['Rack width (column c/c)',`${fm(R.W)} ${uL()}`],...R.tiers.map(t=>[`Tier ${t.i+1}, TOS EL +${fm(t.el)} ${uL()}`,t.kind==='T'?`${+S.nE||0} electrical + ${+S.nI||0} instrument trays, ${S.tw} mm`:`${t.lines.length} ${t.kind==='U'?'utility':'process'} lines, future ${fm(Math.max(0,t.fut[1]-t.fut[0]))} ${uL()}`])],note:'Preliminary width for layout; confirm with stress, civil and electrical.'});
 out.querySelector('#rkDl').onclick=()=>{const f=S.fmt||'pdf';try{dl(f==='pdf'?toPDF(LAST):toDXF(LAST),`pipe-rack-section.${f}`);}catch(e){console.error(e);}};}

function bindShell(){
 const tb=P.querySelector('#rkRows');
 tb.addEventListener('input',e=>{const f=e.target.dataset.f,tr=e.target.closest('tr');if(!f||!tr)return;const l=S.lines.find(x=>x.id==tr.dataset.id);if(!l)return;
  l[f]=f==='ins'?(+e.target.value||0):e.target.value;
  if(f==='name'){const s=tr.querySelector('[data-f="cat"]');const v=s.value;s.innerHTML=catOpts(l);s.value=v;}
  if(f==='name'||f==='cat'){const s=tr.querySelector('[data-f="cat"]');s.className='c-'+catOf(l);counts();}
  save();clearTimeout(bindShell.t);bindShell.t=setTimeout(drawOut,f==='name'?250:0);});
 tb.addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;S.lines=S.lines.filter(l=>l.id!=b.dataset.del);save();drawRows();drawOut();});
 P.querySelector('#rkAdd').onclick=()=>{S.lines.push(newLine());save();drawRows();drawOut();const ins=tb.querySelectorAll('[data-f="name"]');if(ins.length)ins[ins.length-1].focus();};
 P.querySelector('#rkEx').onclick=()=>{S.lines=EX.map(e=>newLine(...e));save();drawRows();drawOut();};
 P.querySelector('#rkClr').onclick=()=>{S.lines=[];save();drawRows();drawOut();};
 P.querySelector('#rkPasteT').onclick=()=>{const p=P.querySelector('#rkPaste');p.hidden=!p.hidden;if(!p.hidden)P.querySelector('#rkPasteTx').focus();};
 P.querySelector('#rkPasteGo').onclick=()=>{const t=P.querySelector('#rkPasteTx');const add=parse(t.value);if(add.length){S.lines.push(...add);save();drawRows();drawOut();t.value='';P.querySelector('#rkPaste').hidden=true;}};}
/* paste: name, size, class, insulation — size as 6, 6", 1-1/2, 1.5 or DN150 */
const DNR=Object.fromEntries(Object.entries(DN).map(([k,v])=>[v,k]));
function size(s){s=String(s||'').trim().replace(/["″]|nps|in(ch)?/gi,'').trim();if(!s)return null;
 const dn=s.match(/^dn\s*(\d+)/i);if(dn)return DNR[+dn[1]]&&SZ.includes(DNR[+dn[1]])?DNR[+dn[1]]:null;
 s=s.replace(/\s+/g,'-');if(SZ.includes(s))return s;const v=parseFloat(s);if(!isFinite(v))return null;return SZ.find(n=>Math.abs(NUM(n)-v)<1e-6)||null;}
function parse(txt){return txt.split(/\r?\n/).map(r=>r.split(/\t|,|;/).map(x=>x.trim())).filter(c=>c[0]).map(c=>{
 const nps=size(c[1])||'4',cls=CLASSES.includes((c[2]||'').replace(/class|cl|#|lb/gi,'').trim())?(c[2]||'').replace(/class|cl|#|lb/gi,'').trim():'150';
 return newLine(c[0].slice(0,60),nps,cls,Math.max(0,parseFloat(c[3])||0));});}

shell();
window.renderRack=()=>{if(P.querySelector('#rkOut'))drawOut();};
window.__rack={solve,toPDF,toDXF,autoCat,S};
})();
