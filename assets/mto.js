/* MTO calculator: enter lines with pipe length and component counts; get a bill of material with pipe in random lengths,
   fittings, flanges, valves, gaskets and stud bolts. Globals from app.js: U, store, seg, bindSeg, tbl, DN, PIPE, PIPEMAP, flRow, CLASSES. */
(function(){
const P=document.getElementById('p-mto');if(!P)return;
if(!document.getElementById('mto-css')){const st=document.createElement('style');st.id='mto-css';st.textContent=`
#p-mto .mt-line{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;margin:0 0 12px}
#p-mto .mt-head{display:grid;grid-template-columns:1.3fr .9fr .7fr .7fr 1.3fr .7fr auto;gap:10px;align-items:end}
#p-mto .mt-line label,#p-mto .mt-opt label{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:600;color:var(--ink-2);min-width:0}
#p-mto .mt-line input,#p-mto .mt-line select,#p-mto .mt-opt input{height:34px;border:1px solid var(--rule-strong);border-radius:8px;padding:0 8px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box;min-width:0}
#p-mto .mt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px 12px;margin-top:12px;padding-top:12px;border-top:1px dashed var(--rule)}
#p-mto .mt-grid .pair{display:grid;grid-template-columns:64px 1fr;gap:6px}
#p-mto .mt-grid h4{grid-column:1/-1;margin:4px 0 -2px;font-size:12.5px;color:var(--muted);font-weight:600}
#p-mto .mt-act{display:flex;gap:6px}
#p-mto .mt-b{height:34px;padding:0 12px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13.5px;font-weight:550;cursor:pointer;white-space:nowrap}
#p-mto .mt-b.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-mto .mt-b:hover{border-color:var(--accent)}
#p-mto .mt-btns{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}
#p-mto .mt-opt{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px 16px;border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;margin:0 0 18px}
#p-mto .mt-opt .seg{align-self:flex-start}
#p-mto h2{font-size:17px;margin:0 0 4px}#p-mto .mt-sub{margin:0 0 12px;font-size:13.5px;color:var(--muted)}
#p-mto .mt-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:0 0 12px}
#p-mto .mt-sum div{border:1px solid var(--rule);border-radius:10px;padding:10px 12px;background:var(--sheet)}
#p-mto .mt-sum span{display:block;font-size:12px;color:var(--muted)}#p-mto .mt-sum b{font-size:20px;font-variant-numeric:tabular-nums}
#p-mto th:nth-child(2){text-align:left}
#p-mto tr.mt-grp td{background:var(--paper-2);font-weight:650;text-align:left!important}
#p-mto td.mt-d{text-align:left!important;white-space:normal;min-width:300px}
#p-mto .mt-jt{font-size:13px;color:var(--ink-2);margin:10px 0 0;padding-left:18px}
#p-mto .mt-rules{font-size:13.5px;line-height:1.55;color:var(--ink-2);padding-left:18px;margin:6px 0 0}#p-mto .mt-rules li+li{margin-top:4px}
#p-mto .mt-note{font-size:12.5px;color:#9A6A08;margin-top:8px}
@media (max-width:900px){#p-mto .mt-head{grid-template-columns:1fr 1fr 1fr}#p-mto .mt-act{grid-column:1/-1}}
@media (max-width:520px){#p-mto .mt-head{grid-template-columns:1fr 1fr}#p-mto .mt-grid{grid-template-columns:1fr 1fr}#p-mto td.mt-d{min-width:220px}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ data */
const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SZ=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=0.5);
const SB=n=>NUM(n)<=1.5;                       /* small bore: socket weld fittings, forged valves */
const schs=n=>Object.keys(PIPEMAP[n][2]);
const defSch=n=>{const k=schs(n);return k.includes('40')?'40':k.includes('STD')?'STD':k[0];};
const fitSch=(n,s)=>schs(n).includes(s)?s:defSch(n);
const MAT={
 cs:{n:'Carbon steel',pipe:'ASTM A106 Gr B, SMLS',bw:'ASTM A234 WPB',fg:'ASTM A105',vb:'ASTM A216 WCB',vf:'ASTM A105',bolt:'ASTM A193 B7',nut:'ASTM A194 2H',ring:'CS',winding:'316 SS'},
 lt:{n:'Low-temp carbon steel',pipe:'ASTM A333 Gr 6, SMLS',bw:'ASTM A420 WPL6',fg:'ASTM A350 LF2 Cl 1',vb:'ASTM A352 LCC',vf:'ASTM A350 LF2',bolt:'ASTM A320 L7',nut:'ASTM A194 Gr 7',ring:'CS',winding:'316 SS'},
 ss:{n:'Stainless 316L',pipe:'ASTM A312 TP316L',bw:'ASTM A403 WP316L',fg:'ASTM A182 F316L',vb:'ASTM A351 CF3M',vf:'ASTM A182 F316L',bolt:'ASTM A193 B8M Cl 2',nut:'ASTM A194 8M',ring:'316 SS',winding:'316L SS'}};
const VALV={gate:['GATE VALVE','API 600','API 602'],glob:['GLOBE VALVE','BS 1873','API 602'],chk:['CHECK VALVE, SWING','BS 1868 / API 594','API 602 (PISTON)'],ball:['BALL VALVE, FLOATING / TRUNNION','API 608 / API 6D','ISO 17292']};
const CNT=[['e90','90° elbows'],['e45','45° elbows'],['tee','Equal tees'],['rtee','Reducing tees','br'],['crd','Conc. reducers','cr'],['erd','Ecc. reducers','er'],['cap','Caps'],
 ['wn','Flanges'],['bl','Blind flanges'],['gate','Gate valves'],['glob','Globe valves'],['chk','Check valves'],['ball','Ball valves'],['noz','Joints to equipment nozzles']];
const smaller=n=>SZ.filter(x=>NUM(x)<NUM(n));
let uid=0;
const newLine=(o={})=>Object.assign({id:++uid,tag:'',nps:'6',sch:'40',cls:'300',mat:'cs',len:''},Object.fromEntries(CNT.map(c=>[c[0],''])),{br:'',cr:'',er:''},o);
const EX=[newLine({tag:'P-1001-6"-A1',nps:'6',sch:'40',cls:'300',len:48,e90:6,e45:2,tee:1,rtee:1,br:'4',crd:1,cr:'4',wn:9,bl:1,gate:2,chk:1,noz:2}),
 newLine({tag:'P-1002-4"-A1',nps:'4',sch:'40',cls:'300',len:32,e90:5,tee:1,erd:1,er:'3',wn:3,glob:1,noz:1}),
 newLine({tag:'P-1003-1"-A1',nps:'1',sch:'80',cls:'300',len:12,e90:4,tee:1,wn:1,noz:1,gate:2,cap:1})];
const DEF={lines:[],rl:'6',pa:'5',fa:'0',ga:'10',ba:'10',gk:'auto'};
let S;try{S=Object.assign({},DEF,JSON.parse(store.get('mto','null'))||{});}catch(e){S=Object.assign({},DEF);}
if(!Array.isArray(S.lines))S.lines=[];
uid=S.lines.reduce((m,l)=>Math.max(m,l.id||0),0);
if(!S.lines.length&&store.get('mto',null)==null){S.lines=EX.map(l=>Object.assign(l,{id:++uid}));}
const save=()=>{try{store.set('mto',JSON.stringify(S));}catch(e){}};
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const q=v=>Math.max(0,Math.floor(+v||0));

/* stud length for a raised-face joint, same build-up as the Calculators page:
   2 × flange thickness (+ 2 × 6.4 RF for Class 400+) + gasket + 2 nuts (= d) + 3 threads past each nut, rounded up to 5 mm */
function stud(c,n,gt){const f=flRow(c,n);if(!f)return null;
 const d=f.dv*25.4,tpi=f.dv<=1?{0.5:13,0.625:11,0.75:10,0.875:9,1:8}[f.dv]:8,p=25.4/tpi,rf=+c>=400?6.4:0;
 const L=Math.ceil((2*f.tf*25.4+2*rf+gt+2*d+6*p)/5-1e-9)*5;
 return {n:f.n,d:f.d,L,thr:`${f.d}"-${tpi} ${f.dv<=1?'UNC':'8UN'}`};}
const gkType=c=>S.gk==='sw'?'sw':S.gk==='sh'?'sh':(+c<=150?'sh':'sw');

/* ------------------------------------------------------------ BOM */
function build(){
 const B=new Map(),add=(grp,key,desc,size,qty,unit,ord)=>{if(!qty)return;const k=grp+'|'+key;const e=B.get(k);if(e)e.qty+=qty;else B.set(k,{grp,desc,size,qty,unit,ord});};
 const joints=[],pipeLen=new Map();let warn=[];
 S.lines.forEach(l=>{
  const n=l.nps,M=MAT[l.mat]||MAT.cs,c=l.cls,sch=fitSch(n,l.sch),sb=SB(n),sz=`${n}"`;
  const len=Math.max(0,+l.len||0);
  if(len){const k=`${n}|${sch}|${l.mat}`;const e=pipeLen.get(k)||{n,sch,M,len:0};e.len+=len;pipeLen.set(k,e);}
  const end=sb?'SW, ASME B16.11, CL 3000':`BW, ASME B16.9, SCH ${sch}`,fm=sb?'ASTM A105':M.bw;
  const fmat=sb?M.fg:M.bw;
  add('Fittings',`e90${n}${sch}${l.mat}`,`ELBOW 90°${sb?'':' LR'}, ${end}, ${fmat}`,sz,q(l.e90),'nos',1);
  add('Fittings',`e45${n}${sch}${l.mat}`,`ELBOW 45°${sb?'':' LR'}, ${end}, ${fmat}`,sz,q(l.e45),'nos',2);
  add('Fittings',`tee${n}${sch}${l.mat}`,`TEE EQUAL, ${end}, ${fmat}`,sz,q(l.tee),'nos',3);
  if(q(l.rtee)){const b=l.br&&NUM(l.br)<NUM(n)?l.br:null;if(!b)warn.push(`${l.tag||'Line'}: pick the branch size for the reducing tee.`);
   else add('Fittings',`rt${n}${b}${sch}${l.mat}`,`TEE REDUCING, ${sb?end:`BW, ASME B16.9, SCH ${sch} x SCH ${fitSch(b,l.sch)}`}, ${fmat}`,`${n}" x ${b}"`,q(l.rtee),'nos',4);}
  [['crd','cr','CONC'],['erd','er','ECC']].forEach(([k,s,t],i)=>{if(!q(l[k]))return;const b=l[s]&&NUM(l[s])<NUM(n)?l[s]:null;
   if(!b){warn.push(`${l.tag||'Line'}: pick the small-end size for the ${t.toLowerCase()} reducer.`);return;}
   add('Fittings',`${k}${n}${b}${sch}${l.mat}`,sb?`REDUCER ${t === 'CONC'?'INSERT / SWAGE CONC':'SWAGE ECC'}, MSS SP-95, ${M.fg}`:`REDUCER ${t}, BW, ASME B16.9, SCH ${sch} x SCH ${fitSch(b,l.sch)}, ${fmat}`,`${n}" x ${b}"`,q(l[k]),'nos',5+i);});
  add('Fittings',`cap${n}${sch}${l.mat}`,`CAP, ${end}, ${fmat}`,sz,q(l.cap),'nos',7);
  /* flanges */
  const big=NUM(n)>24,fstd=big?'ASME B16.47 SERIES A':'ASME B16.5';
  add('Flanges',`wn${n}${c}${sch}${l.mat}`,`FLANGE ${sb?'SW':'WN'} RF, ${fstd}, CL ${c}, ${sb?`BORE SCH ${sch}`:`BORE SCH ${sch}`}, ${M.fg}`,sz,q(l.wn),'nos',1);
  add('Flanges',`bl${n}${c}${l.mat}`,`FLANGE BLIND RF, ${fstd}, CL ${c}, ${M.fg}`,sz,q(l.bl),'nos',2);
  /* valves: flanged RF for NPS 2 and up, socket weld forged Class 800 for small bore */
  let vEnds=0;
  Object.keys(VALV).forEach((k,i)=>{const v=q(l[k]);if(!v)return;const [nm,stdB,stdS]=VALV[k];
   if(sb)add('Valves',`${k}${n}${l.mat}sb`,`${nm}, SW ENDS, CL 800, ${stdS}, BODY ${M.vf}`,sz,v,'nos',i);
   else{add('Valves',`${k}${n}${c}${l.mat}`,`${nm}, FLANGED RF, CL ${c}, ${stdB}, BODY ${M.vb}`,sz,v,'nos',i);vEnds+=2*v;}});
  /* flange joints: every flanged face pairs with one other face */
  const faces=q(l.wn)+q(l.bl)+vEnds+q(l.noz);
  if(faces){const j=Math.ceil(faces/2);joints.push({l,n,c,M,j,faces,odd:faces%2===1,vEnds});}});
 /* gaskets and bolts from joints, with spare */
 const ga=(+S.ga||0)/100,ba=(+S.ba||0)/100,jt=new Map();
 joints.forEach(o=>{const k=`${o.n}|${o.c}|${o.l.mat}`;const e=jt.get(k)||{n:o.n,c:o.c,M:o.M,j:0};e.j+=o.j;jt.set(k,e);});
 let studs=0;
 jt.forEach(e=>{const g=gkType(e.c),gq=Math.ceil(e.j*(1+ga)-1e-9),big=NUM(e.n)>24;
  add('Gaskets',`g${e.n}${e.c}${g}${e.M.ring}`,g==='sw'?`GASKET SPIRAL WOUND, ASME B16.20, CL ${e.c}, ${e.M.winding} WINDING, FLEXIBLE GRAPHITE FILLER, ${e.M.ring} OUTER RING${e.M===MAT.ss||+e.c>=900?`, ${e.M.winding} INNER RING`:''}, 4.5 MM`:`GASKET FLAT RING, ASME B16.21, NON-ASBESTOS, 3 MM, CL ${e.c}`,`${e.n}"`,gq,'nos',1);
  const s=big?null:stud(e.c,e.n,g==='sw'?4.5:3);
  if(s){const bq=Math.ceil(e.j*s.n*(1+ba)-1e-9);studs+=bq;
   add('Bolting',`s${s.thr}${s.L}${e.M.bolt}`,`STUD BOLT, ${s.thr}, ${e.M.bolt}, WITH 2 HEAVY HEX NUTS ${e.M.nut}, ASME B18.2.1 / B18.2.2`,`${s.d}" x ${s.L} mm`,bq,'nos',1);}
  else add('Bolting',`s${e.n}${e.c}`,`STUD BOLTS FOR ${e.n}" CL ${e.c} ${big?'B16.47 SERIES A ':''}JOINT, ${e.M.bolt} / ${e.M.nut} (SIZE AND QTY PER FLANGE STANDARD)`,`${e.n}"`,e.j,'sets',2);});
 /* pipe in random lengths */
 const rl=+S.rl,pa=(+S.pa||0)/100;let pipeM=0;
 pipeLen.forEach(e=>{const tot=e.len*(1+pa),nl=Math.ceil(tot/rl-1e-9);pipeM+=tot;
  add('Pipe',`p${e.n}${e.sch}${e.M.pipe}`,`PIPE, ${e.M.pipe}, ${SB(e.n)?'PE':'BE'}, SCH ${e.sch}, ${rl} M ${rl===6?'SRL':'DRL'} — ${e.len.toFixed(1)} m + ${S.pa}% = ${tot.toFixed(1)} m`,`${e.n}"`,nl,`× ${rl} m`,0);});
 /* fitting allowance */
 const fa=(+S.fa||0)/100;if(fa)B.forEach(e=>{if(e.grp==='Fittings'||e.grp==='Flanges')e.qty=Math.ceil(e.qty*(1+fa)-1e-9);});
 const G=['Pipe','Fittings','Flanges','Valves','Gaskets','Bolting'];
 const items=[...B.values()].sort((a,b)=>G.indexOf(a.grp)-G.indexOf(b.grp)||a.ord-b.ord||NUM(String(b.size).split('"')[0])-NUM(String(a.size).split('"')[0]));
 return {items,joints,pipeM,studs,warn,G};}

/* ------------------------------------------------------------ page */
const opts=(list,cur,lab=x=>x)=>list.map(x=>`<option value="${x}"${String(x)===String(cur)?' selected':''}>${lab(x)}</option>`).join('');
const nLab=n=>`${n}″ (DN ${DN[n]})`;
function card(l,i){
 const sm=smaller(l.nps),pick=(k)=>`<select data-f="${k}" aria-label="size"><option value="">size…</option>${opts(sm,l[k],x=>x+'″')}</select>`;
 const cell=([k,lab,sub])=>sub?`<label>${lab}<span class="pair"><input type="number" min="0" step="1" data-f="${k}" value="${esc(l[k])}" placeholder="0">${pick(sub)}</span></label>`
  :`<label>${lab}<input type="number" min="0" step="1" data-f="${k}" value="${esc(l[k])}" placeholder="0"></label>`;
 return `<div class="mt-line" data-id="${l.id}">
 <div class="mt-head">
  <label>Line no.<input data-f="tag" value="${esc(l.tag)}" placeholder="Line ${i+1}" maxlength="40"></label>
  <label>Size<select data-f="nps">${opts(SZ,l.nps,nLab)}</select></label>
  <label>Schedule<select data-f="sch">${opts(schs(l.nps),fitSch(l.nps,l.sch))}</select></label>
  <label>Class<select data-f="cls">${opts(CLASSES,l.cls)}</select></label>
  <label>Material<select data-f="mat">${Object.keys(MAT).map(k=>`<option value="${k}"${k===l.mat?' selected':''}>${MAT[k].n}</option>`).join('')}</select></label>
  <label>Pipe length, m<input type="number" min="0" step="0.1" data-f="len" value="${esc(l.len)}" placeholder="0"></label>
  <div class="mt-act"><button class="mt-b" type="button" data-dup>Copy</button><button class="mt-b" type="button" data-del aria-label="Remove line ${i+1}">Remove</button></div>
 </div>
 <div class="mt-grid"><h4>Fittings${SB(l.nps)?' (socket weld, Class 3000)':''}</h4>${CNT.slice(0,7).map(cell).join('')}
  <h4>Flanges and valves${SB(l.nps)?' (small-bore valves are socket weld, no flanged joints)':''}</h4>${CNT.slice(7).map(cell).join('')}</div></div>`;}

function shell(){
 P.innerHTML=`<div class="phead"><div><h1>MTO calculator</h1><p>Enter each line's size, class, pipe length and the fittings, flanges and valves on it. The bill of material groups everything by size and adds pipe random lengths, gaskets and stud bolts for every flanged joint.</p></div></div>
 <h2>1. Lines</h2><p class="mt-sub">One card per line or per size. For a different size on the same line (a branch, the reduced side), add another card.</p>
 <div id="mtLines"></div>
 <div class="mt-btns"><button class="mt-b pri" type="button" id="mtAdd">Add line</button><button class="mt-b" type="button" id="mtEx">Load example</button><button class="mt-b" type="button" id="mtClr">Clear all</button></div>
 <h2>2. Allowances</h2><p class="mt-sub">Pipe comes in random lengths; spares for gaskets and bolts are common for site losses and commissioning.</p>
 <div class="mt-opt">
  <label>Pipe random length${seg('mtRl',[['6','6 m SRL'],['12','12 m DRL']],S.rl)}</label>
  <label>Pipe allowance, %<input type="number" min="0" max="50" step="1" id="mtPa" value="${S.pa}"></label>
  <label>Fittings and flanges spare, %<input type="number" min="0" max="50" step="1" id="mtFa" value="${S.fa}"></label>
  <label>Gasket spare, %<input type="number" min="0" max="200" step="5" id="mtGa" value="${S.ga}"></label>
  <label>Stud bolt spare, %<input type="number" min="0" max="100" step="5" id="mtBa" value="${S.ba}"></label>
  <label>Gasket type${seg('mtGk',[['auto','Auto'],['sw','Spiral wound'],['sh','Sheet']],S.gk)}<small style="font-weight:400;color:var(--muted)">Auto: sheet for Class 150, spiral wound above</small></label>
 </div>
 <div id="mtOut"></div>`;
 drawLines();drawOut();bind();}
function drawLines(){P.querySelector('#mtLines').innerHTML=S.lines.length?S.lines.map(card).join(''):`<p class="mt-sub" style="padding:18px 0">No lines yet. Add a line or load the example.</p>`;}
function drawOut(){
 const R=build(),o=P.querySelector('#mtOut');
 if(!R.items.length){o.innerHTML=`<h2>3. Bill of material</h2><p class="mt-sub">Enter a pipe length or some items to see the bill of material.</p>`;return;}
 const rows=[];R.G.forEach(g=>{const it=R.items.filter(x=>x.grp===g);if(!it.length)return;rows.push(`<tr class="mt-grp"><td colspan="5">${g}</td></tr>`);
  it.forEach((x,i)=>rows.push(`<tr><td>${rows.length}</td><td class="mt-d">${esc(x.desc)}</td><td>${esc(x.size)}</td><td><b>${x.qty}</b></td><td>${x.unit}</td></tr>`));});
 let k=0;const rws=rows.map(r=>r.includes('mt-grp')?r:r.replace(/<td>\d+<\/td>/,()=>`<td>${++k}</td>`));
 const jt=R.joints.map(o=>`<li><b>${esc(o.l.tag||'Line')}</b> (${o.n}″ Cl ${o.c}): ${q(o.l.wn)} flange${q(o.l.wn)===1?'':'s'} + ${q(o.l.bl)} blind + ${o.vEnds} valve end${o.vEnds===1?'':'s'} + ${q(o.l.noz)} nozzle${q(o.l.noz)===1?'':'s'} = ${o.faces} face${o.faces===1?'':'s'} → <b>${o.j} joint${o.j===1?'':'s'}</b>${o.odd?' <span style="color:#9A6A08">(odd count: one face is taken to meet a flange not in this list)</span>':''}</li>`).join('');
 const nJ=R.joints.reduce((a,o)=>a+o.j,0);
 o.innerHTML=`<h2>3. Bill of material</h2><p class="mt-sub">Grouped by item, size and rating across all lines. Use Copy table to paste into Excel.</p>
 <div class="mt-sum"><div><span>Pipe incl. allowance</span><b>${R.pipeM.toFixed(1)} m</b></div><div><span>BOM items</span><b>${R.items.length}</b></div><div><span>Flanged joints</span><b>${nJ}</b></div><div><span>Stud bolts</span><b>${R.studs}</b></div></div>
 ${R.warn.length?`<p class="mt-note">${R.warn.map(esc).join('<br>')}</p>`:''}
 ${tbl(['No.','Description','Size','Qty','Unit'],rws)}
 ${jt?`<h3 style="margin:16px 0 4px;font-size:15px">How the flanged joints were counted</h3><ul class="mt-jt">${jt}</ul>`:''}
 <h3 style="margin:18px 0 6px;font-size:15px">Rules used</h3><ul class="mt-rules">
  <li>Pipe: total length per size, schedule and material + allowance, divided by the random length and rounded up. 6 m single random (SRL) or 12 m double random (DRL).</li>
  <li>NPS 2 and up: butt-weld fittings to ASME B16.9, weld neck flanges, flanged valves in the line class. NPS 1½ and below: socket weld fittings Class 3000 (ASME B16.11), socket weld flanges and forged Class 800 valves with socket weld ends.</li>
  <li>Flanged joints: every flange, blind, flanged valve end and equipment nozzle is a face; two faces make a joint. One gasket and one set of stud bolts per joint.</li>
  <li>Stud length = 2 × flange thickness (+ raised face for Class 400 and up) + gasket + 2 nut heights + 3 threads past each nut, rounded up to 5 mm. Bolt count and size from ASME B16.5.</li>
  <li>Materials by group: carbon steel A106 B / A234 WPB / A105 with B7 / 2H bolting; low-temp A333 Gr 6 / A420 WPL6 / LF2 with L7 / Gr 7; stainless 316L with B8M / 8M.</li>
  <li>This is a quick MTO for estimates and early ordering. The project piping class decides the final descriptions, ends and materials.</li></ul>`;}

function bind(){
 const L=P.querySelector('#mtLines');
 const upd=e=>{const f=e.target.dataset.f,c=e.target.closest('.mt-line');if(!f||!c)return;const l=S.lines.find(x=>x.id==c.dataset.id);if(!l)return;
  l[f]=e.target.value;
  if(f==='nps'){l.sch=fitSch(l.nps,l.sch);['br','cr','er'].forEach(k=>{if(l[k]&&NUM(l[k])>=NUM(l.nps))l[k]='';});const i=S.lines.indexOf(l);c.outerHTML=card(l,i);}
  save();clearTimeout(upd.t);upd.t=setTimeout(drawOut,e.type==='input'?200:0);};
 L.addEventListener('input',upd);
 L.addEventListener('click',e=>{const c=e.target.closest('.mt-line');if(!c)return;const i=S.lines.findIndex(x=>x.id==c.dataset.id);
  if(e.target.closest('[data-del]')){S.lines.splice(i,1);}
  else if(e.target.closest('[data-dup]')){S.lines.splice(i+1,0,Object.assign({},S.lines[i],{id:++uid,tag:''}));}else return;
  save();drawLines();drawOut();});
 P.querySelector('#mtAdd').onclick=()=>{S.lines.push(newLine());save();drawLines();drawOut();const t=L.querySelectorAll('[data-f="tag"]');if(t.length)t[t.length-1].focus();};
 P.querySelector('#mtEx').onclick=()=>{S.lines=EX.map(l=>Object.assign({},l,{id:++uid}));save();drawLines();drawOut();};
 P.querySelector('#mtClr').onclick=()=>{S.lines=[];save();drawLines();drawOut();};
 bindSeg('mtRl',v=>{S.rl=v;save();setSeg('mtRl',v);drawOut();});
 bindSeg('mtGk',v=>{S.gk=v;save();setSeg('mtGk',v);drawOut();});
 [['mtPa','pa'],['mtFa','fa'],['mtGa','ga'],['mtBa','ba']].forEach(([id,k])=>{const e=P.querySelector('#'+id);e.addEventListener('input',()=>{S[k]=e.value;save();drawOut();});});}
const setSeg=(id,v)=>P.querySelectorAll(`#${id} button`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===v)));

shell();
window.renderMTO=()=>{if(P.querySelector('#mtOut'))drawOut();};
window.__mto={build,S};
})();
