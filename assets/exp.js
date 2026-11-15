/* Expansion loop sizing: thermal growth between anchors and the leg length needed to absorb it, by the guided cantilever method.
   Globals from app.js: U, SEL, setSel, store, seg, bindSeg, DN, PIPEMAP, PIPE. */
(function(){
const P=document.getElementById('p-exp');if(!P)return;
if(!document.getElementById('exp-css')){const st=document.createElement('style');st.id='exp-css';st.textContent=`
#p-exp .ex-ctrl{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px 16px;margin:16px 0 14px;align-items:end}
#p-exp .ex-ctrl label{display:flex;flex-direction:column;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-exp .ex-ctrl label.wide{grid-column:span 2}
#p-exp .ex-ctrl select,#p-exp .ex-ctrl input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box;min-width:0}
#p-exp .ex-ctrl .seg{align-self:flex-start}
#p-exp .ex-box{border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet)}
#p-exp .ex-draw{background:#F7F9FC;background-image:linear-gradient(rgba(24,73,169,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,73,169,.05) 1px,transparent 1px);background-size:20px 20px;padding:10px 14px}
#p-exp .ex-draw svg{display:block;width:100%;height:auto;max-height:420px}
#p-exp .ex-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));border-top:1px solid var(--rule)}
#p-exp .ex-sum div{padding:12px 16px;border-right:1px solid var(--rule)}#p-exp .ex-sum div:last-child{border-right:0}
#p-exp .ex-sum span{display:block;font-size:12px;color:var(--muted)}#p-exp .ex-sum b{font-size:21px;font-variant-numeric:tabular-nums}
#p-exp .ex-out{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;margin-top:18px}
#p-exp .ex-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-exp .ex-card h3{font-size:16px;margin:0 0 8px}
#p-exp .ex-card p,#p-exp .ex-card li{font-size:13.5px;line-height:1.55;color:var(--ink-2)}
#p-exp .ex-card ul,#p-exp .ex-card ol{padding-left:18px;margin:6px 0 0}#p-exp .ex-card li+li{margin-top:4px}
#p-exp .ex-t{width:100%;border-collapse:collapse;font-size:13.5px}
#p-exp .ex-t td{padding:6px;border-bottom:1px solid var(--rule);vertical-align:top;white-space:normal}
#p-exp .ex-t td:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-exp .ex-t tr.tot td{font-weight:650}
#p-exp .ex-ok{color:#147A4A;font-weight:650}#p-exp .ex-bad{color:#B42318;font-weight:650}
#p-exp .ex-how{margin:14px 0 4px}#p-exp .ex-how summary{cursor:pointer;font-size:16px;font-weight:650}#p-exp .ex-how-g{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:8px}#p-exp .ex-how h4{margin:0 0 4px;font-size:14px}
@media (max-width:760px){#p-exp .ex-how-g{grid-template-columns:1fr}}
#p-exp .ex-warn{font-size:12.5px;color:#9A6A08;margin:8px 0 0}
[data-theme=dark] #p-exp .ex-ok{color:#7DD3A8}[data-theme=dark] #p-exp .ex-bad{color:#F4A39A}
@media (max-width:900px){#p-exp .ex-out{grid-template-columns:1fr}}
@media (max-width:520px){#p-exp .ex-ctrl{grid-template-columns:1fr 1fr}#p-exp .ex-ctrl label.wide{grid-column:1/-1}}
.exs .pp{stroke:#1F2937;stroke-width:9;fill:none;stroke-linecap:round;stroke-linejoin:round}
.exs .pi{stroke:#DCE6F8;stroke-width:5;fill:none;stroke-linecap:round;stroke-linejoin:round}
.exs .edge{stroke:#9AA6B6;stroke-width:1.2;stroke-dasharray:8 5}.exs .rk{stroke:#7D8A9A;stroke-width:2}.exs .rk2{stroke:#9AA6B6;stroke-width:1.4}.exs .ol{stroke:#B8C2CF;stroke-width:5;stroke-linecap:round}
.exs .cl{stroke:#8A97A8;stroke-width:.8;stroke-dasharray:10 3 2 3;fill:none}
.exs .dm{stroke:#1849A9;stroke-width:1.1;fill:none}.exs .ex{stroke:#1849A9;stroke-width:.6;stroke-dasharray:3 2}
.exs .gr{fill:#B42318}.exs .an{fill:#1F2937}.exs .gd{stroke:#147A4A;stroke-width:2.2}
.exs .mv{stroke:#B42318;stroke-width:2;fill:none}.exs .ghost{stroke:#B42318;stroke-width:1.2;stroke-dasharray:5 4;fill:none;opacity:.7}
.exs text{font-family:Geist,system-ui,sans-serif;font-size:13px;fill:#2B3A4E}.exs .dt{fill:#1849A9;font-weight:650}.exs .lb{font-size:11.5px;fill:#5B6B80}.exs .rd{fill:#B42318;font-weight:600;font-size:12px}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ data */
const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SZ=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=1);
/* total linear expansion from 70 °F, in/100 ft (ASME B31.3 Table C-1 style values) */
const TF=[0,32,50,70,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800];
const EXP={cs:[-0.55,-0.30,-0.14,0,0.23,0.61,0.99,1.40,1.82,2.26,2.70,3.16,3.62,4.11,4.60,5.11,5.63,6.16,6.70],
 ss:[-0.75,-0.41,-0.19,0,0.34,0.90,1.46,2.03,2.61,3.20,3.80,4.38,4.97,5.57,6.18,6.79,7.40,8.03,8.66]};
/* basic allowable stress, ksi, at °F (ASME B31.3 Table A-1 values) */
const SF=[100,200,300,400,500,600,650,700,750,800];
const MAT={cs:{n:'Carbon steel, A106 Gr B',e:'cs',E:203400,S:[20,20,20,20,18.9,17.3,17.0,16.5,13.0,10.8]},
 s316:{n:'Stainless, A312 TP316L',e:'ss',E:195100,S:[16.7,16.7,16.7,15.7,14.8,14.0,13.7,13.5,13.2,12.9]},
 s304:{n:'Stainless, A312 TP304',e:'ss',E:195100,S:[20,20,20,18.6,17.5,16.6,16.2,15.8,15.5,15.2]}};
const FCY=[['1','≤ 7,000 cycles (f = 1.0)'],['0.9','≤ 14,000 (f = 0.9)'],['0.8','≤ 22,000 (f = 0.8)'],['0.7','≤ 45,000 (f = 0.7)']];
const lerp=(xs,ys,x)=>{if(x<=xs[0])return ys[0]+(x-xs[0])*(ys[1]-ys[0])/(xs[1]-xs[0]);for(let i=1;i<xs.length;i++)if(x<=xs[i])return ys[i-1]+(x-xs[i-1])*(ys[i]-ys[i-1])/(xs[i]-xs[i-1]);return null;};
const C2F=c=>c*9/5+32,F2C=f=>(f-32)*5/9,up=(x,s)=>Math.ceil(x/s-1e-9)*s;
const ld=(k,d)=>{try{const v=store.get(k,d);return v==null?d:v;}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
const S={ty:ld('ex_ty','u'),sch:ld('ex_sch','40'),mat:ld('ex_m','cs'),top:+ld('ex_t',250),tam:+ld('ex_a',21),run:+ld('ex_l',60),f:ld('ex_f','1'),wr:ld('ex_w','0.5'),rv:+ld('ex_rv',1.5),rw:+ld('ex_rw',6)};
if(!MAT[S.mat])S.mat='cs';if(S.ty!=='l')S.ty='u';

/* ------------------------------------------------------------ calc (SI inside: mm, MPa, °C) */
function calc(n){
 const M=MAT[S.mat],sch=PIPEMAP[n][2][S.sch]!=null?S.sch:(PIPEMAP[n][2]['40']!=null?'40':Object.keys(PIPEMAP[n][2])[0]);
 const D=PIPEMAP[n][1]*25.4,t=PIPEMAP[n][2][sch]*25.4,d=D-2*t,I=Math.PI/64*(D**4-d**4);
 const tH=C2F(S.top),tA=C2F(S.tam);
 const eH=lerp(TF,EXP[M.e],tH),eA=lerp(TF,EXP[M.e],tA);
 const ok=tH>=tA&&tH<=800&&tA>=0&&eH!=null;
 const emm=(eH-eA)*25.4/30.48;                     /* mm per m of pipe */
 const Lm=Math.max(0,+S.run||0),dT=emm*Lm;          /* total growth, mm */
 const Sc=lerp(SF,M.S,Math.max(100,tA))*6.895,Sh=lerp(SF,M.S,Math.max(100,tH))*6.895,f=+S.f,SA=f*(1.25*Sc+0.25*Sh);
 const R3=false,leg=S.ty!=='l'?dT/2:dT;                       /* what one perpendicular leg has to take */
 const Lreq=Math.sqrt(3*M.E*D*leg/SA);              /* guided cantilever: L = sqrt(3 E D Δ / SA) */
 const bend=3*D;                                    /* two 1.5D elbows back to back */
 /* up-and-over: the riser V and the leg across the rack H are both square to the growth, so together they bend: H + V ≥ L */
 const V=R3?Math.max(0,+S.rv||0)*1000:0,room=R3?Math.max(0,+S.rw||0)*1000:0;
 const H=up(Math.max(Lreq-V,bend),100),W=S.ty!=='l'?up(Math.max(+S.wr*H,bend),100):0,Le=H+V;
 const sig=3*M.E*D*leg/(Le*Le),F=12*M.E*I*leg/(Le**3)/1000;   /* MPa, kN */
 const vFit=R3&&H>room?up(Lreq-room,100):0;   /* rise needed to keep H inside the rack */
 return {n,sch,D,t,I,M,tH,tA,ok,emm,Lm,dT,Sc,Sh,f,SA,leg,Lreq,H,W,V,room,vFit,Le,sig,F,bend,extra:S.ty==='l'?H:2*H+2*V};}

/* ------------------------------------------------------------ drawing (plan view, schematic) */
function drawU(r,fm){
 const y=270,x0=40,x1=760,lx=330,rx=470,ty=95;
 let g=`<defs><marker id="exA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" fill="#1849A9"/></marker><marker id="exR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L10 5L0 9z" fill="#B42318"/></marker></defs>`;
 const path=`M${x0} ${y}H${lx}V${ty}H${rx}V${y}H${x1}`;
 g+=`<path class="pp" d="${path}"/><path class="pi" d="${path}"/>`;
 /* deflected shape */
 g+=`<path class="ghost" d="M${lx+18} ${y-6}V${ty+10}M${rx-18} ${y-6}V${ty+10}"/>`;
 /* anchors and guides */
 [x0,x1].forEach(x=>g+=`<rect class="an" x="${x-9}" y="${y-16}" width="18" height="32"/><path d="M${x-9} ${y-16}l18 32M${x+9} ${y-16}l-18 32" stroke="#fff" stroke-width="1.6"/>`);
 [130,230,570,670].forEach(x=>g+=`<path class="gd" d="M${x-6} ${y-15}V${y+15}M${x+6} ${y-15}V${y+15}"/>`);
 /* growth arrows */
 g+=`<path class="mv" d="M${180} ${y+30}H${300}" marker-end="url(#exR)"/><path class="mv" d="M${620} ${y+30}H${500}" marker-end="url(#exR)"/>`;
 g+=`<text class="rd" x="240" y="${y+50}" text-anchor="middle">${fm(r.dT/2)} each side</text><text class="rd" x="560" y="${y+50}" text-anchor="middle">${fm(r.dT/2)} each side</text>`;
 /* dims */
 g+=`<line class="ex" x1="${rx}" y1="${ty}" x2="${rx+90}" y2="${ty}"/><line class="ex" x1="${rx}" y1="${y}" x2="${rx+90}" y2="${y}"/><line class="dm" x1="${rx+80}" y1="${ty}" x2="${rx+80}" y2="${y}" marker-start="url(#exA)" marker-end="url(#exA)"/><text class="dt" x="${rx+90}" y="${(ty+y)/2+5}">H = ${fm(r.H)}</text>`;
 g+=`<line class="ex" x1="${lx}" y1="${ty}" x2="${lx}" y2="${ty-40}"/><line class="ex" x1="${rx}" y1="${ty}" x2="${rx}" y2="${ty-40}"/><line class="dm" x1="${lx}" y1="${ty-32}" x2="${rx}" y2="${ty-32}" marker-start="url(#exA)" marker-end="url(#exA)"/><text class="dt" x="${(lx+rx)/2}" y="${ty-40}" text-anchor="middle">W = ${fm(r.W)}</text>`;
 g+=`<line class="dm" x1="${x0}" y1="${y+78}" x2="${x1}" y2="${y+78}" marker-start="url(#exA)" marker-end="url(#exA)"/><text class="dt" x="${(x0+x1)/2}" y="${y+72}" text-anchor="middle">Anchor to anchor ${fmL(r.Lm)}, growth ${fm(r.dT)}</text>`;
 g+=`<text class="lb" x="${x0}" y="${y-26}">Anchor</text><text class="lb" x="${x1}" y="${y-26}" text-anchor="end">Anchor</text><text class="lb" x="130" y="${y-22}" text-anchor="middle">Guide</text><text class="lb" x="${lx-14}" y="${ty+40}" text-anchor="end">Legs bend</text><text class="lb" x="${lx-14}" y="${ty+56}" text-anchor="end">like guided</text><text class="lb" x="${lx-14}" y="${ty+72}" text-anchor="end">cantilevers</text>`;
 return `<svg class="exs" viewBox="0 0 800 370" role="img" aria-label="Plan view of an expansion U-loop between two anchors, H ${fm(r.H)}, W ${fm(r.W)}">${g}</svg>`;}
function drawL(r,fm){
 const y=290,x0=60,cx=560,ty=80;
 let g=`<defs><marker id="exA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" fill="#1849A9"/></marker><marker id="exR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L10 5L0 9z" fill="#B42318"/></marker></defs>`;
 const path=`M${x0} ${y}H${cx}V${ty}`;
 g+=`<path class="pp" d="${path}"/><path class="pi" d="${path}"/><path class="ghost" d="M${x0+10} ${y-4}H${cx-30}Q${cx+22} ${y-4} ${cx+22} ${y-60}V${ty+8}"/>`;
 [[x0,y,0],[cx,ty,1]].forEach(([x,yy,v])=>g+=v?`<rect class="an" x="${x-16}" y="${yy-9}" width="32" height="18"/><path d="M${x-16} ${yy-9}l32 18M${x+16} ${yy-9}l-32 18" stroke="#fff" stroke-width="1.6"/>`:`<rect class="an" x="${x-9}" y="${yy-16}" width="18" height="32"/><path d="M${x-9} ${yy-16}l18 32M${x+9} ${yy-16}l-18 32" stroke="#fff" stroke-width="1.6"/>`);
 [200,340].forEach(x=>g+=`<path class="gd" d="M${x-6} ${y-15}V${y+15}M${x+6} ${y-15}V${y+15}"/>`);
 g+=`<path class="mv" d="M${400} ${y+30}H${520}" marker-end="url(#exR)"/><text class="rd" x="460" y="${y+50}" text-anchor="middle">${fm(r.dT)}</text>`;
 g+=`<line class="ex" x1="${cx}" y1="${ty}" x2="${cx+100}" y2="${ty}"/><line class="ex" x1="${cx}" y1="${y}" x2="${cx+100}" y2="${y}"/><line class="dm" x1="${cx+90}" y1="${ty}" x2="${cx+90}" y2="${y}" marker-start="url(#exA)" marker-end="url(#exA)"/><text class="dt" x="${cx+100}" y="${(ty+y)/2+5}">Short leg ≥ ${fm(r.H)}</text>`;
 g+=`<line class="dm" x1="${x0}" y1="${y+70}" x2="${cx}" y2="${y+70}" marker-start="url(#exA)" marker-end="url(#exA)"/><text class="dt" x="${(x0+cx)/2}" y="${y+64}" text-anchor="middle">Long leg ${fmL(r.Lm)}, growth ${fm(r.dT)}</text>`;
 g+=`<text class="lb" x="${x0}" y="${y-26}">Anchor</text><text class="lb" x="${cx+24}" y="${ty+4}">Anchor</text><text class="lb" x="200" y="${y-22}" text-anchor="middle">Guide</text>`;
 return `<svg class="exs" viewBox="0 0 800 370" role="img" aria-label="Plan view of an L-bend: long leg growth absorbed by the short leg of at least ${fm(r.H)}">${g}</svg>`;}


/* ------------------------------------------------------------ page */
const IN=()=>U!=='mm';
const fm=x=>{if(!IN())return `${Math.round(x).toLocaleString('en-US')} mm`;const i=x/25.4;if(i<24)return `${i.toFixed(i<10?2:1)}″`;const ft=Math.floor(i/12),r=Math.round(i-ft*12);return r===12?`${ft+1}′-0″`:`${ft}′-${r}″`;};
const fmL=m=>IN()?`${(m/0.3048).toFixed(0)} ft`:`${m} m`;
const tShow=c=>IN()?Math.round(C2F(c)):Math.round(c);
const tU=()=>IN()?'°F':'°C';
function render(){
 let n=SEL;if(!SZ.includes(n)){const v=NUM(SEL);n=SZ.find(x=>NUM(x)>=v)||'6';}
 const r=calc(n),M=r.M,schs=Object.keys(PIPEMAP[n][2]);
 const pct=r.sig/r.SA*100;
 const head=`<div class="phead"><div><h1>Expansion loop sizing</h1><p>How much a hot line grows between anchors, and how long the loop legs must be to take it, by the guided cantilever method. For early layout and rack planning; the stress analysis confirms it.</p></div></div><details class="ex-card ex-how" open><summary>How to use this in your layout work</summary>
  <div class="ex-how-g"><div><h4>When it helps</h4><ul>
   <li><b>Planning a pipe rack:</b> check the hot lines before the rack width and tiers are fixed, and keep a loop bay where the loops will go.</li>
   <li><b>Placing the loop bay:</b> compare loop heights of several hot lines to nest them, hottest or largest outermost, and see how much room the bay needs.</li>
   <li><b>Routing near equipment:</b> use the L-bend to check that a short leg off a pump or exchanger can take the growth of the long run.</li>
   <li><b>Model reviews:</b> answer "does this line need a loop, and how big?" in a minute instead of waiting for stress results.</li>
   <li><b>Checking stress comments:</b> a quick sense check of the loop size the stress engineer asks for.</li></ul></div>
  <div><h4>How to use it</h4><ol>
   <li>Take the line from the line list: size, schedule, material and design temperature.</li>
   <li>Enter the anchor-to-anchor length (agree anchor points with the stress engineer), or the long leg for an L-bend.</li>
   <li>Read the loop size (H × W) or the short leg needed, and the movement at the bends.</li>
   <li>Reserve that space in the model with some margin, nested with the other hot lines.</li>
   <li>Send the line to stress. Update the model to the loop size, guides and line stops on the stress-marked isometric.</li></ol>
   <p class="ex-warn" style="margin-top:6px">A preliminary space check, on the safe side. The stress analysis sets the final loop and supports.</p></div></div></details>`;
 const ctrl=`<div class="ex-ctrl">
  <label class="wide"><span>Arrangement</span>${seg('exTy',[['u','U-loop in the middle of a run'],['l','L-bend']],S.ty)}</label>
  <label>Size<select id="exN">${SZ.map(x=>`<option value="${x}"${x===n?' selected':''}>NPS ${x} (DN ${DN[x]})</option>`).join('')}</select></label>
  <label>Schedule<select id="exS">${schs.map(s=>`<option${s===r.sch?' selected':''}>${s}</option>`).join('')}</select></label>
  <label>Material<select id="exM">${Object.keys(MAT).map(k=>`<option value="${k}"${k===S.mat?' selected':''}>${MAT[k].n}</option>`).join('')}</select></label>
  <label>Design temperature, ${tU()}<input id="exT" type="number" step="5" value="${tShow(S.top)}"></label>
  <label>Installation temperature, ${tU()}<input id="exA" type="number" step="1" value="${tShow(S.tam)}"></label>
  <label>${S.ty!=='l'?'Anchor to anchor':'Long leg (anchor to bend)'}, ${IN()?'ft':'m'}<input id="exL" type="number" min="1" step="1" value="${IN()?Math.round(S.run/0.3048):S.run}"></label>
  <label>Thermal cycles<select id="exF">${FCY.map(([v,l])=>`<option value="${v}"${v===S.f?' selected':''}>${l}</option>`).join('')}</select></label>
  ${S.ty!=='l'?`<label><span>Loop width W</span>${seg('exW',[['0.5','H/2'],['1','= H']],S.wr)}</label>`:''}
 </div>`;
 if(!r.ok){P.innerHTML=head+ctrl+`<p class="ex-warn">Use a design temperature above installation and up to 427 °C (800 °F), with installation at −18 °C (0 °F) or warmer. Above 427 °C creep governs; use a full stress analysis.</p>`;bind();return;}
 const rows=a=>`<table class="ex-t"><tbody>${a.map(([k,v,c])=>`<tr${c?` class="${c}"`:''}><td>${k}</td><td>${v}</td></tr>`).join('')}</tbody></table>`;
 const mp=v=>IN()?`${(v/6.895).toFixed(1)} ksi`:`${Math.round(v)} MPa`;
 P.innerHTML=head+ctrl+`
 <div class="ex-box"><div class="ex-draw">${S.ty==='u'?drawU(r,fm):drawL(r,fm)}</div>
  <div class="ex-sum"><div><span>Thermal growth</span><b>${fm(r.dT)}</b></div><div><span>${S.ty==='u'?'Loop height H':'Short leg, minimum'}</span><b>${fm(r.H)}</b></div>${S.ty!=='l'?`<div><span>Loop width W</span><b>${fm(r.W)}</b></div>`:''}<div><span>Extra pipe</span><b>${fm(r.extra)}</b></div><div><span>Force on anchors, approx.</span><b>${IN()?Math.round(r.F*224.8).toLocaleString('en-US')+' lbf':r.F.toFixed(1)+' kN'}</b></div></div></div>
 <div class="ex-out">
  <div class="ex-card"><h3>Thermal growth</h3>${rows([
   [`Expansion of ${M.e==='cs'?'carbon steel':'austenitic stainless'} from ${tShow(S.tam)} to ${tShow(S.top)} ${tU()}`,IN()?`${(r.emm*30.48/25.4).toFixed(2)} in/100 ft`:`${r.emm.toFixed(2)} mm/m`],
   [`× ${S.ty!=='l'?'anchor-to-anchor length':'long leg'} ${fmL(r.Lm)}`,fm(r.dT),'tot'],
   ...(S.ty!=='l'?[['Each loop leg takes half, from its own side',fm(r.leg)]]:[['The short leg takes all of it',fm(r.leg)]])])}
   <p style="margin-top:8px">Expansion values interpolated from the ASME B31.3 Table C-1 table, measured from 21 °C (70 °F).</p></div>
  <div class="ex-card"><h3>Leg length, guided cantilever</h3>${rows([
   [`Allowable displacement stress S<sub>A</sub> = f (1.25 S<sub>c</sub> + 0.25 S<sub>h</sub>) = ${r.f} × (1.25 × ${mp(r.Sc)} + 0.25 × ${mp(r.Sh)})`,mp(r.SA)],
   [`L = √(3 E D Δ / S<sub>A</sub>), E ${IN()?(M.E/6895).toFixed(1)+' ×10⁶ psi':Math.round(M.E/1000)+' GPa'}, D ${fm(r.D)}, Δ ${fm(r.leg)}`,fm(r.Lreq)],
   [`Not less than two 1.5D elbows back to back (3D)`,fm(r.bend)],
   ...([[`<b>${S.ty==='u'?'Loop height H':'Short leg'}, rounded up to 100 mm</b>`,`<b>${fm(r.H)}</b>`]]),
   ...(S.ty!=='l'?[[`Loop width W = ${S.wr==='1'?'H':'H/2'}, rounded up`,fm(r.W)]]:[]),
   [`Bending stress at this ${S.ty==='u'?'H':'leg'}: 3 E D Δ / L²`,`<span class="${pct<=100?'ex-ok':'ex-bad'}">${mp(r.sig)} (${Math.round(pct)}% of S<sub>A</sub>)</span>`],
   [`Force at the anchors: 12 E I Δ / L³ (I for Sch ${r.sch})`,IN()?Math.round(r.F*224.8).toLocaleString('en-US')+' lbf':r.F.toFixed(1)+' kN']])}
  </div></div>
 <div class="ex-card" style="margin-top:18px"><h3>Laying out the loop</h3><ul>
  ${S.ty==='u'?`<li>Put the loop near the middle between the two anchors, so each side grows the same amount towards it.</li>
  <li>On a pipe rack, loops usually turn up or out at the rack edge and cross the other lines on top. Nest the loops of several lines, with the hottest or largest line outermost.</li>
  <li>Cold pull (cut short by half the growth) reduces the hot reaction but is not credited for stress range in B31.3; note it on the isometric if used.</li>`:`<li>The short leg must be free to move sideways by the full growth: no guide or line stop on it close to the bend.</li>`}
  <li>Guides keep the straight runs in line, but the guides nearest the loop must let the pipe slide; do not put a line stop or anchor inside the loop.</li>
  <li>Check clearance for the swing: the legs move by ${fm(r.leg)} at the bends; keep that much plus insulation clear of steel and other lines.</li>
  <li>This quick method ignores bend flexibility and friction and assumes free ends are guided. It is usually conservative for the leg length but not for loads on equipment nozzles. Hot lines on equipment, large bore lines and anything over about 60% of S<sub>A</sub> need a computer stress analysis (CAESAR II or similar).</li></ul></div>
 <div class="ex-card" style="margin-top:18px"><h3>References</h3><ul>
  <li>ASME B31.3: allowable displacement stress range (para. 302.3.5), thermal expansion (Table C-1), modulus of elasticity (Table C-6), basic allowable stress (Table A-1).</li>
  <li>Guided cantilever method: M.W. Kellogg, <i>Design of Piping Systems</i>; L = √(3 E D Δ / S<sub>A</sub>).</li>
  <li>Values are interpolated from the tables as published; check them against the edition your project uses.</li></ul></div>`;
 bind();}
function bind(){
 const y=()=>scrollY,keep=f=>{const s=y();f();render();scrollTo(0,s);};
 bindSeg('exTy',v=>keep(()=>{S.ty=v;sv('ex_ty',v);}));
 if(P.querySelector('#exW'))bindSeg('exW',v=>keep(()=>{S.wr=v;sv('ex_w',v);}));
 const on=(id,fn)=>{const e=P.querySelector('#'+id);if(e)e.addEventListener('change',()=>keep(()=>fn(e.value)));};
 on('exS',v=>{S.sch=v;sv('ex_sch',v);});on('exM',v=>{S.mat=v;sv('ex_m',v);});on('exF',v=>{S.f=v;sv('ex_f',v);});
 on('exT',v=>{const c=IN()?F2C(+v):+v;S.top=c;sv('ex_t',c);});on('exA',v=>{const c=IN()?F2C(+v):+v;S.tam=c;sv('ex_a',c);});
 on('exL',v=>{const m=IN()?+v*0.3048:+v;S.run=Math.max(1,Math.round(m*10)/10);sv('ex_l',S.run);});
 const s=P.querySelector('#exN');if(s)s.onchange=()=>{const t=scrollY;if(typeof setSel==='function')setSel(s.value);else render();scrollTo(0,t);};}
render();
window.renderExp=()=>{const t=scrollY;render();scrollTo(0,t);};
window.__exp={calc,S};
})();
