/* Branch connection and reinforcement: typical branch fitting for a header/branch pair, and the ASME B31.3 para. 304.3.3
   area-replacement check for a welded branch (stub-in) with an optional reinforcing pad. Globals: PIPEMAP, PIPE, SEL, DN, store. */
(function(){
const P=document.getElementById('p-br');if(!P)return;
if(!document.getElementById('br-css')){const st=document.createElement('style');st.id='br-css';st.textContent=`
#p-br .br-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start}
#p-br .br-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-br .br-card h2{font-size:17px;margin:0 0 10px}#p-br .br-card h3{font-size:14px;margin:14px 0 6px}
#p-br .br-f{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px 12px}
#p-br .br-f label{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-br .br-f select,#p-br .br-f input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,8px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box}
#p-br .br-f input:disabled,#p-br .br-f select:disabled{opacity:.5}
#p-br .br-t{width:100%;border-collapse:collapse;font-size:14px;margin-top:4px;min-width:0!important}
#p-br .br-t td{padding:7px 6px;border-bottom:1px solid var(--rule);vertical-align:top;white-space:normal}
#p-br .br-t td:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-br .br-t td small{display:block;color:var(--muted);font-size:12px;font-weight:400}
#p-br .br-t tr.tot td{font-weight:700;border-top:2px solid var(--rule-strong)}
#p-br .br-type{display:flex;gap:14px;align-items:center;padding:12px 14px;border-radius:12px;background:rgba(24,73,169,.06);margin:10px 0 6px}
[data-theme=dark] #p-br .br-type{background:rgba(96,150,255,.1)}
#p-br .br-type b{font-size:18px;display:block}#p-br .br-type span{font-size:13px;color:var(--muted)}
#p-br .br-verdict{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;padding:12px 14px;border-radius:12px;margin:10px 0}
#p-br .br-verdict[hidden]{display:none}#p-br .br-verdict b{font-size:18px}#p-br .v-ok{background:rgba(20,122,74,.1);color:#147A4A}#p-br .v-bad{background:rgba(180,35,24,.1);color:#B42318}
[data-theme=dark] #p-br .v-ok{color:#7DD3A8}[data-theme=dark] #p-br .v-bad{color:#F4A39A}
#p-br .br-sw{overflow-x:auto;-webkit-overflow-scrolling:touch}#p-br .br-sw .br-svg{min-width:640px;max-width:980px;margin-left:auto;margin-right:auto}
#p-br .br-bal{display:block;width:100%;max-width:760px;min-width:560px;height:auto;margin:6px 0 4px}#p-br .br-bal text{font:13.5px Geist,system-ui,sans-serif;fill:var(--ink)}
#p-br .br-steps{margin:8px 0 6px;padding-left:22px;font-size:14px;line-height:1.55}#p-br .br-steps li+li{margin-top:4px}
#p-br .br-how{margin-top:18px}
#p-br .br-calc{margin-top:10px;border:1px solid var(--rule);border-radius:10px;padding:0 12px}#p-br .br-calc>summary{cursor:pointer;padding:10px 0;font-weight:650;font-size:14px;color:var(--accent)}
#p-br .br-note{font-size:13px;color:var(--muted);line-height:1.5;margin:8px 0 0}
#p-br .br-svg{display:block;width:100%;height:auto;margin:6px 0 2px;border:1px solid var(--rule);border-radius:10px;background:var(--paper,transparent)}
#p-br .br-svg text{font:13px Geist,system-ui,sans-serif;fill:var(--ink-2)}
@media (max-width:900px){#p-br .br-g{grid-template-columns:1fr}}
`;document.head.appendChild(st);}

const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SIZES=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=0.5&&NUM(n)<=48);
const ld=(k,d)=>{try{const v=store.get(k,d);return v==null?d:v;}catch(e){return d}};
const S=Object.assign({h:'8',hs:'40',b:'6',bs:'40',ang:'90',p:'40',s:'137.9',sb:'',e:'1',w:'1',y:'0.4',c:'1.5',mt:'12.5',pad:'auto',tr:'',dp:'',sr:'1',leg:'0',svc:'normal'},JSON.parse(ld('br','{}')||'{}'));
const save=()=>{try{store.set('br',JSON.stringify(S))}catch(e){}};
const f1=(x,d=1)=>isFinite(x)?(+x).toFixed(d):'—',f0=x=>isFinite(x)?Math.round(x).toLocaleString('en-US'):'—';
const pipe=(n,sch)=>{const p=PIPEMAP[n];if(!p)return null;const s=p[2][sch]!=null?sch:(p[2].STD!=null?'STD':p[2]['40']!=null?'40':Object.keys(p[2])[0]);return {n,sch:s,D:p[1]*25.4,T:p[2][s]*25.4};};
const schOf=n=>Object.keys(PIPEMAP[n][2]).sort((a,b)=>PIPEMAP[n][2][a]-PIPEMAP[n][2][b]);

/* typical branch fitting (generic branch table; the project PMS governs) */
function fitting(h,b,svc,ang){
 const H=NUM(h),B=NUM(b);
 if(B>H)return {k:'—',t:'Branch larger than header',d:'Swap the sizes: the header must be the larger line.'};
 if(+ang<90){
  if(B>=H/2)return {k:'LT',t:+ang===45?'Lateral tee (45°)':`Fabricated lateral (${ang}°)`,d:(+ang===45?'Laterals are not listed in ASME B16.9; they come to the maker\'s standard and rating, or are fabricated. ':'')+'A fabricated lateral is a branch pipe welded in at the angle: check it with the area replacement below (β = '+ang+'°). Laterals are weak in the crotch, so large or high-pressure laterals often need a pad, a heavier wall or a wrap-around reinforcement.'};
  if(+ang===45)return {k:'LO',t:'Latrolet (45° outlet)',d:'Integrally reinforced 45° outlet to MSS SP-97 (butt-weld, socket-weld or threaded). Made for 45° only, and mostly for small branches; check the maker\'s size range.'};
  return {k:'SI',t:`Fabricated branch at ${ang}° (stub-in)`,d:'Latrolets are made for 45° only, so other angles are fabricated: branch pipe welded to the header, checked with the area replacement below.'};}
 if(B===H)return {k:'T',t:'Equal tee',d:'ASME B16.9 butt-weld equal tee (B16.11 forged tee for NPS 1½ and below).'};
 if(B<=2&&H<=1.5)return {k:'RT',t:'Reducing tee (forged)',d:'ASME B16.11 Class 3000 socket-weld or threaded reducing tee, or a tee with swage.'};
 if(B>=H/2&&H>=2)return {k:'RT',t:'Reducing tee',d:'ASME B16.9 butt-weld reducing tee; B16.9 lists reducing outlets down to about half the run size.'};
 if(B<=1.5)return {k:svc==='severe'?'W':'S',t:svc==='severe'?'Weldolet (butt-weld outlet)':'Sockolet (socket-weld outlet)',d:svc==='severe'?'Integrally reinforced butt-weld outlet, MSS SP-97. Socket welds are often not allowed in cyclic, sour or corrosive service.':'Integrally reinforced socket-weld outlet, MSS SP-97 (threadolet for threaded service where allowed).'};
 if(svc==='low')return {k:'SI',t:'Stub-in (check reinforcement below)',d:'Branch pipe welded directly to the header. Allowed in many classes for low-severity service; reinforcement per B31.3 304.3.3.'};
 return {k:'W',t:'Weldolet (butt-weld outlet)',d:'Integrally reinforced outlet, MSS SP-97. Common for branches below half the header size; some classes use a reinforced stub-in instead.'};}

function calc(){
 const h=pipe(S.h,S.hs),b=pipe(S.b,S.bs);
 const beta=Math.min(90,Math.max(45,+S.ang||90))*Math.PI/180,sn=Math.sin(beta);
 const Pm=(+S.p||0)/10,Sh=+S.s||137.9,Sb=+S.sb||Sh,E=+S.e||1,W=+S.w||1,Y=+S.y||0.4,c=Math.max(0,+S.c||0),mt=Math.max(0,+S.mt||0)/100;
 const th=Pm*h.D/(2*(Sh*E*W+Pm*Y)),tb=Pm*b.D/(2*(Sb*E*W+Pm*Y));
 const Thb=h.T*(1-mt),Tbb=b.T*(1-mt); /* minimum (mill) thickness, T-bar */
 const d1=(b.D-2*(Tbb-c))/sn;
 const d2=Math.min(h.D,Math.max(d1,(Tbb-c)+(Thb-c)+d1/2));
 const A1=th*d1*(2-sn);
 const A2=Math.max(0,(2*d2-d1)*(Thb-th-c));
 const fr=Math.min(1,Sb/Sh);
 const area=(Tr,Dp)=>{const L4=Math.min(2.5*(Thb-c),2.5*(Tbb-c)+Tr);const A3=Math.max(0,2*L4*(Tbb-tb-c)/sn)*fr;
  const pw=Tr>0?Math.max(0,Math.min(Dp,2*d2)-b.D/sn):0;const A4p=pw*Tr*Math.min(1,+S.sr||1);
  const leg=Math.max(0,+S.leg||0);const A4w=leg?(Tr>0?2:1)*2*0.5*leg*leg:0;return {L4,A3,A4p,A4w,A4:A4p+A4w,pw};};
 let Tr=0,Dp=0,auto=false;
 if(S.pad==='yes'){Tr=+S.tr||Thb;Dp=+S.dp||Math.min(2*d2,b.D/sn+2*Math.max(25,d1/2));}
 let a=area(Tr,Dp),sum=A2+a.A3+a.A4;
 let need=null;
 if(sum<A1){ /* smallest pad (OD = full zone 2·d2) that works, in 1 mm steps */
  /* practical pad: standard plate (min 6 mm), narrowest OD in 10 mm steps from (branch + 2 × 25 mm) up to the full zone 2·d₂ */
  const lo=b.D/sn+50,hi=2*d2;
  outer:for(const t of [6,8,10,12,14,16,20,25,30,35,40,50]){for(let Dp0=Math.ceil(lo/10)*10;Dp0<=hi+1e-6;Dp0+=10){const z=area(t,Math.min(Dp0,hi));if(A2+z.A3+z.A4>=A1){const D2=Math.min(Dp0,hi);need={Tr:t,Dp:D2,w:(D2-b.D/sn)/2};break outer;}}}
  if(S.pad==='auto'&&need){auto=true;Tr=need.Tr;Dp=need.Dp;a=area(Tr,Dp);sum=A2+a.A3+a.A4;}}
 const z0=area(0,0),okNoPad=(A2+z0.A3+z0.A4)>=A1,A3n=z0.A3+z0.A4;
 return {h,b,beta,sn,Pm,Sh,Sb,E,W,Y,c,mt,th,tb,Thb,Tbb,d1,d2,A1,A2,...a,sum,Tr,Dp,need,auto,okNoPad,A3n,ok:sum>=A1&&Thb-c>=th&&Tbb-c>=tb,hdrBad:Thb-c<th,brBad:Tbb-c<tb,ratio:sum/A1,r:NUM(S.b)/NUM(S.h),valid:th<h.D/6&&tb<b.D/6};}

function svg(r){
 /* section through header and branch axes. Lengths along the header are to scale; wall, pad and L4 thicknesses are enlarged so they stay readable */
 const b=r.beta,sb=Math.sin(b),cb=Math.cos(b),C={a1:'#C2410C',a2:'#15803D',a3:'#1D4ED8',a4:'#B7791F'};
 const W=760,legW=0,Lbv=150,M=Math.max(r.d2,r.Dp/2,(r.b.D/2)/sb)*1.12;
 const k=(W-440-Lbv*cb*.6)/(2*M),ex=Math.max(1,18/(r.h.T*k)),tk=v=>v*k*ex;
 const X0=220+M*k,Y0=34+Lbv*sb,tw=tk(r.h.T),bore=30,H=Math.round(Y0+tw+bore+76);
 const d1=r.d1*k,d2=r.d2*k,L4=tk(r.L4),Tr=tk(r.Tr),Dp=r.Dp*k,th=Math.max(2.5,tk(r.th)),tbw=r.b.T*k*Math.min(ex,1.4);
 const oi=d1*sb/2,oo=oi+tbw,xr=oo/sb; /* inner wall meets the opening edge; outer wall half-width */
 const pt=(o,y)=>{const s2=(Y0+o*cb-y)/sb;return [X0+o*sb+s2*cb,y];};
 const poly=(o1,o2,y1,y2)=>[pt(o1,y1),pt(o1,y2),pt(o2,y2),pt(o2,y1)].map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' ');
 const yT=Y0-Lbv*sb,hx0=X0-M*k-26,hx1=X0+M*k+26+Lbv*cb*.6;
 const zig=x=>{let d=`M${x} ${Y0-3}`;const n=7,h=(tw+bore+6)/n;for(let q=1;q<=n;q++)d+=` L${x+(q%2?5:-5)} ${Y0-3+h*q}`;return d;};
 const ar=Math.min(42,oo*.9);
 const lab=(x,y,t,st='',a='start')=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${a}"${st?` style="${st}"`:''}>${t}</text>`;
 return `<svg class="br-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Section through the branch connection with the reinforcement zone and areas A1 to A4" style="color:var(--ink-2)">
 <defs><pattern id="brH" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V5" stroke="currentColor" stroke-width="1" opacity=".5"/></pattern>
 <pattern id="brA1" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><path d="M0 0V5" stroke="${C.a1}" stroke-width="1.5"/></pattern>
 <marker id="brM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1L9 5L0 9" fill="none" stroke="context-stroke" stroke-width="1.6"/></marker></defs>
 <rect x="${hx0}" y="${Y0+tw}" width="${hx1-hx0}" height="${bore}" fill="currentColor" opacity=".05"/>
 <path d="${zig(hx0)}" stroke="currentColor" fill="none" opacity=".7"/><path d="${zig(hx1)}" stroke="currentColor" fill="none" opacity=".7"/>
 ${lab(hx0+12,Y0+tw+19,`Header NPS ${r.h.n} Sch ${r.h.sch}`,'opacity:.8')}
 <rect x="${hx0}" y="${Y0}" width="${X0-d1/2-hx0}" height="${tw}" fill="url(#brH)" stroke="currentColor" stroke-width="1.3"/>
 <rect x="${X0+d1/2}" y="${Y0}" width="${hx1-X0-d1/2}" height="${tw}" fill="url(#brH)" stroke="currentColor" stroke-width="1.3"/>
 <rect x="${X0-d2}" y="${Y0}" width="${d2-d1/2}" height="${tw}" fill="${C.a2}" opacity=".35"/><rect x="${X0+d1/2}" y="${Y0}" width="${d2-d1/2}" height="${tw}" fill="${C.a2}" opacity=".35"/>
 <rect x="${X0-d1/2}" y="${Y0}" width="${d1}" height="${th}" fill="url(#brA1)" stroke="${C.a1}" stroke-width="1.2" stroke-dasharray="4 3"/>
 ${r.Tr?`<rect x="${X0-Dp/2}" y="${Y0-Tr}" width="${Dp/2-xr}" height="${Tr}" fill="${C.a4}" opacity=".6" stroke="${C.a4}"/><rect x="${X0+xr}" y="${Y0-Tr}" width="${Dp/2-xr}" height="${Tr}" fill="${C.a4}" opacity=".6" stroke="${C.a4}"/>`:''}
 <polygon points="${poly(-oo,-oi,Y0-Tr,yT)}" fill="url(#brH)" stroke="currentColor" stroke-width="1.3"/><polygon points="${poly(oi,oo,Y0-Tr,yT)}" fill="url(#brH)" stroke="currentColor" stroke-width="1.3"/>
 <polygon points="${poly(-oo,-oi,Y0,Y0-L4)}" fill="${C.a3}" opacity=".4"/><polygon points="${poly(oi,oo,Y0,Y0-L4)}" fill="${C.a3}" opacity=".4"/>
 <path d="M${pt(0,Y0+tw+bore)[0]} ${Y0+tw+bore}L${pt(0,yT-14)[0]} ${yT-14}" stroke="currentColor" stroke-dasharray="12 4 2 4" opacity=".45"/>
 <path d="M${hx0} ${Y0+tw+bore}H${hx1}" stroke="currentColor" stroke-dasharray="12 4 2 4" opacity=".35"/>
 <rect x="${X0-d2}" y="${Y0-L4}" width="${2*d2}" height="${L4+tw}" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="7 4"/>
 ${b<Math.PI/2-1e-6?`<path d="M${X0+ar} ${Y0}A${ar} ${ar} 0 0 0 ${X0+ar*cb} ${Y0-ar*sb}" fill="none" stroke="currentColor" stroke-width="1.2"/>${lab(X0+ar*Math.cos(b/2)+5,Y0-ar*Math.sin(b/2),`β = ${Math.round(b*180/Math.PI)}°`)}`:lab(pt(oo,Y0-L4-8)[0]+8,Y0-L4-26,'β = 90°')}
 ${lab(pt(oo,yT)[0]+8,yT+12,`Branch NPS ${r.b.n} Sch ${r.b.sch}`)}
 ${(()=>{const L=(x1,y1,x2,y2,t,col,anchor='start')=>`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${col}" stroke-width="1.2"/><circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="2.6" fill="${col}"/>`+lab(anchor==='middle'?x2:x2+(anchor==='end'?-4:4),anchor==='middle'?y2+16:y2+4,t,`fill:${col};font-weight:600`,anchor);
  const bx=Y0+tw+bore+8,rx=X0+d2+(W-legW-(X0+d2))*.15;
  return L(X0+d1/6,Y0+th/2,X0+d1/6,bx+4,'Hole cut in the header (metal lost)',C.a1,'middle')
   +L(X0+d1/2+(d2-d1/2)/2,Y0+tw*.6,X0+d2+30,bx+20,'Extra header wall that helps',C.a2)
   +L(pt(oo,Y0-L4*.5)[0]-tbw*.5,Y0-L4*.5,Math.max(pt(oo,Y0-L4*.5)[0]+40,X0+d2+30),Y0-L4-40,'Extra branch wall that helps',C.a3)
   +(r.Tr?L(X0-Dp/2+(Dp/2-xr)/2,Y0-Tr/2,X0-d2-10,Y0-L4-46,'Reinforcing pad',C.a4,'end'):'')
   +L(X0-d2,Y0-L4,X0-d2-10,Y0-L4-18,'Only metal inside this zone counts','var(--accent)','end');})()}
 ${lab(W/2,H-8,`Cut through the middle of the branch. Wall and pad thickness drawn ×${f1(ex,1)} larger so they can be seen.`,'opacity:.7;font-size:11.5px','middle')}</svg>`;}

function balance(r){
 const C={a1:'#C2410C',a2:'#15803D',a3:'#1D4ED8',a4:'#B7791F'},W=640,x0=0,max=Math.max(r.A1,r.sum)*1.08,sc=(W-x0)/max,h=34;
 let x=x0;const seg=(v,col,t)=>{if(v<=0)return '';const w=v*sc,o=`<rect x="${x.toFixed(1)}" y="${h+42}" width="${w.toFixed(1)}" height="${h}" fill="${col}" opacity=".85"/>`+(w>90?`<text x="${(x+w/2).toFixed(1)}" y="${h+42+h/2+5}" text-anchor="middle" style="fill:#fff;font-weight:650">${t} ${f0(v)}</text>`:`<text x="${(x+w/2).toFixed(1)}" y="${2*h+42+15}" text-anchor="middle" style="fill:${col};font-weight:650;font-size:12px">${t} ${f0(v)}</text>`);x+=w;return o;};
 const a1x=x0+r.A1*sc;
 return `<svg class="br-bal" viewBox="0 -18 ${W} ${2*h+104}" role="img" aria-label="Metal removed compared with metal available">
  <text x="0" y="-4" style="font-weight:650">Metal removed by the hole: must be replaced</text>
  <rect x="${x0}" y="4" width="${(r.A1*sc).toFixed(1)}" height="${h}" fill="${C.a1}" opacity=".85"/><text x="${(x0+r.A1*sc/2).toFixed(1)}" y="${4+h/2+5}" text-anchor="middle" style="fill:#fff;font-weight:650">A₁ ${f0(r.A1)} mm²</text>
  <text x="0" y="${h+34}" style="font-weight:650">Metal available close to the hole</text>
  ${seg(r.A2,C.a2,'header')}${seg(r.A3,C.a3,'branch')}${seg(r.A4,C.a4,r.Tr?'pad':'welds')}
  <path d="M${a1x.toFixed(1)} 0V${2*h+48}" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="0" y="${2*h+78}" style="font-weight:650;fill:${r.ok?C.a2:'#B42318'}">${r.ok?`Enough: the available metal (${f0(r.sum)} mm²) reaches past the dashed line`:`Not enough: the available metal (${f0(r.sum)} mm²) stops short of the dashed line`}</text></svg>`;}
function steps(r){
 const base=r.A2+r.A3n;
 return `<ol class="br-steps">
  <li><b>The hole removes ${f0(r.A1)} mm²</b> of header wall that was carrying pressure.</li>
  <li><b>The header</b> has ${f0(r.A2)} mm² of wall it does not need for pressure, close to the hole.</li>
  <li><b>The branch</b> adds ${f0(r.A3n)} mm² of spare wall near the joint.</li>
  <li>${base>=r.A1?`Together that is ${f0(base)} mm², which is ≥ ${f0(r.A1)} mm², so <b>no pad is needed</b>.`:`Together that is only ${f0(base)} mm², short by ${f0(r.A1-base)} mm², so <b>a pad is needed</b>.${r.Tr?` A ${f1(r.Tr,0)} mm × Ø${f0(r.Dp)} mm pad adds ${f0(r.A4p)} mm²${r.A3>r.A3n?' and lets more of the branch count':''}: total ${f0(r.sum)} mm² ${r.ok?'is enough':'is still not enough'}.`:''}`}</li></ol>`;}
function render(){
 const r=calc(),ft=fitting(S.h,S.b,S.svc,S.ang);
 const opt=(arr,cur,lab=x=>x)=>arr.map(x=>`<option value="${x}"${String(x)===String(cur)?' selected':''}>${lab(x)}</option>`).join('');
 const sz=x=>`NPS ${x} (DN ${DN[x]})`;
 P.innerHTML=`<div class="phead"><div><h1>Branch connection and reinforcement</h1><p>Pick a header and branch to see the typical branch fitting, then check a welded branch (stub-in) for pressure reinforcement by the ASME B31.3 area-replacement method, with the reinforcing pad it needs.</p></div></div>
 <div class="br-g">
  <div class="br-card"><h2>1. Header and branch</h2><div class="br-f">
   <label>Header size<select data-k="h">${opt(SIZES,S.h,sz)}</select></label>
   <label>Header schedule<select data-k="hs">${opt(schOf(S.h),r.h.sch)}</select></label>
   <label>Branch size<select data-k="b">${opt(SIZES.filter(x=>NUM(x)<=NUM(S.h)),S.b,sz)}</select></label>
   <label>Branch schedule<select data-k="bs">${opt(schOf(S.b),r.b.sch)}</select></label>
   <label>Branch angle β<select data-k="ang">${opt(['90','75','60','45'],S.ang,x=>x+'°')}</select></label>
   <label>Service<select data-k="svc">${opt(['normal','severe','low'],S.svc,x=>({normal:'Normal process',severe:'Cyclic, sour or corrosive',low:'Low severity (utilities, Cat. D)'}[x]))}</select></label>
  </div>
  <div class="br-type"><div><span>Typical branch fitting</span><b>${ft.t}</b><span>${ft.d}</span></div></div>
  <p class="br-note">This follows a typical piping-class branch table. Your project's piping material specification has its own branch table, and that table governs.</p>
  <h3>Design data</h3><div class="br-f">
   <label>Design pressure, bar(g)<input type="number" min="0" step="0.5" data-k="p" value="${S.p}"></label>
   <label>Allowable S header, MPa<input type="number" min="1" step="0.1" data-k="s" value="${S.s}"></label>
   <label>Allowable S branch, MPa<input type="number" min="1" step="0.1" data-k="sb" value="${S.sb}" placeholder="${S.s}"></label>
   <label>Quality factor E<input type="number" min="0.6" max="1" step="0.05" data-k="e" value="${S.e}"></label>
   <label>Weld strength factor W<input type="number" min="0.5" max="1" step="0.05" data-k="w" value="${S.w}"></label>
   <label>Coefficient Y<input type="number" min="0" max="0.7" step="0.1" data-k="y" value="${S.y}"></label>
   <label>Corrosion allowance c, mm<input type="number" min="0" step="0.5" data-k="c" value="${S.c}"></label>
   <label>Mill under-tolerance, %<input type="number" min="0" step="0.5" data-k="mt" value="${S.mt}"></label>
  </div>
  <h3>Reinforcing pad</h3><div class="br-f">
   <label>Pad<select data-k="pad">${opt(['auto','no','yes'],S.pad,x=>({auto:'Size it for me if needed',no:'No pad',yes:'My pad (enter size)'}[x]))}</select></label>
   <label>Pad thickness Tr, mm<input type="number" min="0" step="1" data-k="tr" value="${S.pad==='yes'?(S.tr||f1(r.Tr,1)):f1(r.Tr,0)}"${S.pad==='yes'?'':' disabled'}></label>
   <label>Pad OD, mm<input type="number" min="0" step="5" data-k="dp" value="${S.pad==='yes'?(S.dp||f0(r.Dp)):f0(r.Dp)}"${S.pad==='yes'?'':' disabled'}></label>
   <label>Pad / header stress ratio<input type="number" min="0.1" max="1" step="0.05" data-k="sr" value="${S.sr}"${S.pad==='no'?' disabled':''}></label>
   <label>Fillet weld leg in zone, mm<input type="number" min="0" step="1" data-k="leg" value="${S.leg}"></label>
  </div></div>
  <div class="br-card"><h2>2. B31.3 area replacement (para. 304.3.3)</h2>
   ${r.hdrBad||r.brBad?`<div class="br-verdict v-bad"><b>${r.hdrBad?'Header':'Branch'} wall too thin for this pressure</b><span>${r.hdrBad?`T̄h − c = ${f1(r.Thb-r.c,2)} mm < th = ${f1(r.th,2)} mm`:`T̄b − c = ${f1(r.Tbb-r.c,2)} mm < tb = ${f1(r.tb,2)} mm`}. Choose a heavier schedule, then check again.</span></div>`:''}<div class="br-verdict ${r.ok?'v-ok':'v-bad'}"${r.hdrBad||r.brBad?' hidden':''}><b>${r.ok?(r.Tr?`OK with pad ${f1(r.Tr,0)} mm × Ø${f0(r.Dp)} mm`:'OK without a pad'):'Not enough reinforcement'}</b><span>available ${f0(r.sum)} mm² vs required ${f0(r.A1)} mm² (${Math.round(r.ratio*100)}%)</span></div>
   ${!r.ok&&r.need&&!r.hdrBad&&!r.brBad?`<p class="br-note">A pad ${r.need.Tr} mm thick with OD ${f0(r.need.Dp)} mm (${f0(r.need.w)} mm wide each side) would be enough.</p>`:''}
   ${!r.ok&&!r.need&&!r.hdrBad&&!r.brBad?'<p class="br-note">No practical pad within the reinforcement zone is enough. Use a heavier header or branch, a reinforced fitting (tee or weldolet), or a detailed analysis.</p>':''}
   ${r.auto?'<p class="br-note">A stub-in alone is not enough, so a pad was sized: the thinnest standard plate (6 mm minimum), then the narrowest OD in 10 mm steps that works, never wider than the zone (2·d₂).</p>':''}
   ${r.hdrBad||r.brBad?'':steps(r)}
   <details class="br-calc"><summary>Show the full calculation</summary>
   <table class="br-t"><tbody>
    <tr><td>Header: D = ${f1(r.h.D)}, T = ${f1(r.h.T,2)}, T̄h = ${f1(r.Thb,2)} mm<small>T̄ = nominal × (1 − mill tolerance)</small></td><td>th = ${f1(r.th,2)} mm</td></tr>
    <tr><td>Branch: D = ${f1(r.b.D)}, T = ${f1(r.b.T,2)}, T̄b = ${f1(r.Tbb,2)} mm<small>t = P D / 2(S E W + P Y)</small></td><td>tb = ${f1(r.tb,2)} mm</td></tr>
    <tr><td>d₁ = [Db − 2(T̄b − c)] / sin β</td><td>${f1(r.d1)} mm</td></tr>
    <tr><td>d₂ = max(d₁, (T̄b − c) + (T̄h − c) + d₁/2), ≤ Dh</td><td>${f1(r.d2)} mm</td></tr>
    <tr><td>L₄ = min(2.5(T̄h − c), 2.5(T̄b − c) + Tr)</td><td>${f1(r.L4)} mm</td></tr>
    <tr class="tot"><td>Required A₁ = th · d₁ · (2 − sin β)</td><td>${f0(r.A1)} mm²</td></tr>
    <tr><td>A₂, excess header wall = (2d₂ − d₁)(T̄h − th − c)</td><td>${f0(r.A2)} mm²</td></tr>
    <tr><td>A₃, excess branch wall = 2 L₄ (T̄b − tb − c) / sin β${r.Sb<r.Sh?' × Sb/Sh':''}</td><td>${f0(r.A3)} mm²</td></tr>
    <tr><td>A₄, pad${r.A4w?' and fillet welds':''}<small>pad: (OD − Db/sin β) × Tr within the zone${r.A4w?'; welds: ½ leg² each side':''}</small></td><td>${f0(r.A4)} mm²</td></tr>
    <tr class="tot"><td>Available A₂ + A₃ + A₄</td><td>${f0(r.sum)} mm²</td></tr>
   </tbody></table></details>
   ${r.r>0.5?'<p class="br-note"><b>Large branch:</b> branch/header above 0.5. B31.3 area replacement still applies to pressure, but a tee or reinforced fitting is usually preferred, and external loads need a closer check.</p>':''}
   ${!r.valid?'<p class="br-note"><b>Thick wall:</b> t ≥ D/6, so B31.3 304.1.2(b) needs special consideration.</p>':''}
   ${+S.ang<90?`<p class="br-note"><b>Angled branch (β = ${S.ang}°):</b> d₁ grows by 1/sin β and A₁ by (2 − sin β), so a lateral needs more reinforcement than a 90° branch of the same size. B31.3 304.3.3 applies down to 45°; below 45° it does not.</p>`:''}<p class="br-note">Internal pressure only. Branch fittings to listed standards (B16.9 tees, MSS SP-97 outlets) are already reinforced. B31.3 304.3.2 also exempts couplings and half-couplings up to NPS 2 and no more than ¼ of the run size, in suitable service.</p>
  </div></div>
 ${r.hdrBad||r.brBad?'':`<div class="br-card br-how"><h2>3. How the reinforcement works</h2>
  <p class="br-note" style="margin:0 0 6px">Cutting a hole for the branch removes header wall that was carrying pressure. B31.3 asks for the same amount of metal to be put back close to the hole: spare thickness in the header and branch walls, and a pad if those are not enough.</p>
  <div class="br-sw">${balance(r)}</div>
  <h3>Where that metal is</h3>
  <div class="br-sw">${svg(r)}</div></div>`}`;
 P.querySelectorAll('[data-k]').forEach(el=>el.addEventListener('change',()=>{const k=el.dataset.k;S[k]=el.value;
  if(k==='h'&&NUM(S.b)>NUM(S.h))S.b=S.h;if(k==='pad'&&el.value==='yes'){S.tr=S.tr||'';S.dp=S.dp||'';}
  save();render();}));}
window.renderBR=()=>{if(document.getElementById('p-br')&&!document.getElementById('p-br').hidden)render();};
render();
})();
