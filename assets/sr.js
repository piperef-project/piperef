/* Instrument straight runs: orifice plate straight lengths (ISO 5167-2:2003 Table 3 values), typical flowmeter and control valve straight runs,
   layout rules. Globals: PIPE, PIPEMAP, store. */
(function(){
const P=document.getElementById('p-sr');if(!P)return;
if(!document.getElementById('sr-css')){const st=document.createElement('style');st.id='sr-css';st.textContent=`
#p-sr .sr-g{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);gap:18px;align-items:start}
#p-sr .sr-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-sr .sr-card h2{font-size:17px;margin:0 0 4px}#p-sr .sr-card>p.sub{margin:0 0 12px;font-size:13px;color:var(--muted)}
#p-sr .sr-f{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px 12px}
#p-sr .sr-f label{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-sr .sr-f .w2{grid-column:1/-1}
#p-sr .sr-f select,#p-sr .sr-f input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,8px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box}
#p-sr .sr-kpi{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:14px 0 8px}
#p-sr .sr-kpi div{padding:12px 14px}#p-sr .sr-kpi div+div{border-left:1px solid var(--rule)}
#p-sr .sr-kpi span{display:block;font-size:12px;color:var(--muted)}#p-sr .sr-kpi b{font-size:26px;color:var(--accent);font-variant-numeric:tabular-nums}
#p-sr .sr-kpi i{display:block;font-style:normal;font-size:13.5px;color:var(--ink-2);font-variant-numeric:tabular-nums}
#p-sr .sr-fig{display:block;width:100%;height:auto;border:1px solid var(--rule);border-radius:10px;background:#FAFBFD;color:#1F2937}
#p-sr .sr-fig text{font:600 12px Geist,system-ui,sans-serif;fill:#1F2937;stroke:none}#p-sr .sr-fig .d{fill:#1849A9}#p-sr .sr-fig .m{fill:#5B6B80;font-weight:500}
[data-theme=dark] #p-sr .sr-fig{background:#EEF2F7}
#p-sr .sr-note{font-size:12.5px;color:var(--muted);line-height:1.5;margin:8px 0 0}
#p-sr .sr-warn{padding:10px 12px;border-radius:10px;background:rgba(183,121,31,.1);color:#8A5A12;font-size:13px;line-height:1.5;margin-top:10px}
[data-theme=dark] #p-sr .sr-warn{color:#F2C46D;background:rgba(242,196,109,.1)}
#p-sr .sr-sec{margin-top:24px}#p-sr .sr-sec>h2{font-size:18px;margin:0 0 4px}#p-sr .sr-sec>p{margin:0 0 12px;font-size:13.5px;color:var(--muted);max-width:860px}
#p-sr .sr-tw{overflow-x:auto;border:1px solid var(--rule);border-radius:12px;background:var(--sheet)}
#p-sr .sr-t{width:100%;border-collapse:collapse;font-size:13px;min-width:760px}
#p-sr .sr-t th,#p-sr .sr-t td{padding:8px 9px;border-bottom:1px solid var(--rule);text-align:left;vertical-align:top;white-space:normal;line-height:1.4}
#p-sr .sr-t th{font-size:12px;color:var(--muted);font-weight:600;background:var(--sheet)}
#p-sr .sr-t td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-sr .sr-t tr.on td{background:rgba(24,73,169,.08);font-weight:650}
#p-sr .sr-t td:first-child{min-width:220px}
#p-sr .sr-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
#p-sr .sr-cards h3{margin:0 0 6px;font-size:14.5px}#p-sr .sr-cards ul{margin:0;padding-left:18px;font-size:13.5px;line-height:1.55;color:var(--ink-2)}#p-sr .sr-cards li+li{margin-top:3px}
#p-sr .sr-stage{position:relative;height:470px;border:1px solid var(--rule);border-radius:12px;overflow:hidden;background:radial-gradient(120% 90% at 50% 15%,#FFFFFF 0%,#EEF2F7 65%,#E2E8F0 100%)}
[data-theme=dark] #p-sr .sr-stage{background:radial-gradient(120% 90% at 50% 15%,#22324D 0%,#152238 65%,#0E1828 100%)}
#p-sr .sr-stage canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;cursor:grab;touch-action:none}
#p-sr .sr-tools{position:absolute;left:10px;top:10px;display:flex;gap:6px;z-index:2}
#p-sr .sr-tools button{height:30px;padding:0 11px;border:1px solid var(--rule);border-radius:8px;background:color-mix(in srgb,var(--sheet) 88%,transparent);font:inherit;font-size:12.5px;font-weight:600;color:var(--ink-2);cursor:pointer}
#p-sr .sr-tools button[aria-pressed=true]{color:var(--accent);border-color:var(--accent)}
#p-sr .sr-hint{position:absolute;right:12px;bottom:10px;font-size:11.5px;color:var(--muted);pointer-events:none;z-index:2}
#p-sr .sr-load{position:absolute;inset:0;display:grid;place-items:center;font-size:13px;color:var(--muted)}
@media (max-width:900px){#p-sr .sr-g{grid-template-columns:1fr}#p-sr .sr-stage{height:340px}}
`;document.head.appendChild(st);}

/* ISO 5167-2:2003 Table 3, orifice plates without flow conditioners. Values are multiples of D: [A, B]; B null = no Column B data.
   Rows by β: ≤0.20, 0.40, 0.50, 0.60, 0.67, 0.75 */
const BETA=[0.20,0.40,0.50,0.60,0.67,0.75];
const FT=[
 ['b1','Single 90° bend, or two 90° bends in any plane with S > 30D',[[6,3],[16,3],[22,9],[42,13],[44,20],[44,20]]],
 ['s1','Two 90° bends, same plane, S-configuration, 30D ≥ S > 10D',[[10,null],[10,null],[18,10],[30,18],[44,18],[44,18]]],
 ['s2','Two 90° bends, same plane, S-configuration, S ≤ 10D',[[10,null],[10,null],[22,10],[42,18],[44,18],[44,22]]],
 ['p1','Two 90° bends, perpendicular planes, 30D ≥ S ≥ 5D',[[19,18],[44,18],[44,18],[44,18],[44,20],[44,20]]],
 ['p2','Two 90° bends, perpendicular planes, S < 5D',[[34,17],[50,25],[75,34],[65,25],[60,18],[75,18]]],
 ['tee','Single 90° tee (with or without extension) or mitre 90° bend',[[3,null],[9,3],[19,9],[29,18],[36,18],[44,18]]],
 ['b45','Single 45° bend, or two 45° bends in the same plane (S ≥ 2D)',[[7,null],[30,9],[30,18],[30,18],[44,18],[44,18]]],
 ['red','Concentric reducer, 2D to D over 1.5D to 3D',[[5,null],[5,null],[8,5],[9,5],[12,6],[13,8]]],
 ['exp','Concentric expander, 0.5D to D over D to 2D',[[6,null],[12,8],[20,9],[26,11],[28,14],[36,18]]],
 ['vlv','Full bore ball or gate valve, fully open',[[12,6],[12,6],[12,6],[14,7],[18,9],[24,12]]],
 ['abr','Abrupt symmetrical reduction',[[30,15],[30,15],[30,15],[30,15],[30,15],[30,15]]],
 ['tw','Thermowell, diameter ≤ 0.03D',[[5,3],[5,3],[5,3],[5,3],[5,3],[5,3]]]];
const DOWN=[[4,2],[6,3],[6,3],[7,3.5],[7,3.5],[8,4]];   /* downstream, fittings in the upstream columns */

/* ISO 5167-4:2003 Table 1, classical Venturi tubes: rows β 0.30,0.40,0.50,0.60,0.70,0.75; [A,B] */
const VBETA=[0.30,0.40,0.50,0.60,0.70,0.75];
const VFT=[
 ['b1','Single 90° bend',[[8,3],[8,3],[9,3],[10,3],[14,3],[16,8]]],
 ['b2','Two or more 90° bends (same or different planes)',[[8,3],[8,3],[10,3],[10,3],[18,3],[22,8]]],
 ['r133','Reducer 1.33D to D over 2.3D',[[4,null],[4,null],[4,null],[4,null],[4,null],[4,null]]],
 ['e067','Expander 0.67D to D over 2.5D',[[4,null],[4,null],[5,4],[6,4],[7,5],[7,6]]],
 ['r3','Reducer 3D to D over 3.5D',[[2.5,null],[2.5,null],[5.5,2.5],[8.5,2.5],[10.5,2.5],[11.5,3.5]]],
 ['e075','Expander 0.75D to D over D',[[2.5,null],[2.5,null],[2.5,null],[3.5,2.5],[5.5,3.5],[6.5,4.5]]],
 ['vlv','Full bore ball or gate valve, fully open',[[2.5,null],[2.5,null],[3.5,2.5],[4.5,2.5],[5.5,3.5],[5.5,3.5]]]];
/* other instruments: typical manufacturer guidance, multiples of D. Disturbances: */
const DIST=[['red','Concentric reducer'],['exp','Concentric expander'],['b1','Single 90° bend or tee'],['b2s','Two 90° bends, same plane'],['b2p','Two 90° bends, different planes'],['vlv','Full bore valve, fully open'],['cv','Control valve or partly open valve'],['pump','Pump discharge']];
const INST={
 mag:{n:'Electromagnetic (mag) flowmeter',up:{red:5,exp:5,b1:5,b2s:5,b2p:5,vlv:5,cv:10,pump:10},dn:2,note:'Most makes ask for 5D upstream and 2D downstream from any fitting; keep control valves downstream. Pipe must run full.'},
 vortex:{n:'Vortex flowmeter',up:{red:15,exp:20,b1:20,b2s:25,b2p:40,vlv:20,cv:50,pump:25},dn:5,note:'Very sensitive to swirl and to control valves. Some makes allow shorter runs with a flow conditioner or with correction factors.'},
 turbine:{n:'Turbine flowmeter',up:{red:20,exp:20,b1:20,b2s:20,b2p:25,vlv:20,cv:30,pump:25},dn:5,note:'Without a flow conditioner. With a conditioner (straightening vanes), about 10D upstream is common (e.g. AGA 7 for gas).'},
 usclamp:{n:'Ultrasonic, clamp-on',up:{red:10,exp:20,b1:10,b2s:15,b2p:25,vlv:20,cv:20,pump:30},dn:5,note:'Needs a full, clean pipe and an accurate wall thickness. Mount on the side of horizontal pipes.'},
 usinline:{n:'Ultrasonic, in-line multipath',up:{red:10,exp:10,b1:10,b2s:10,b2p:10,vlv:10,cv:20,pump:10},dn:3,note:'With a flow conditioner, as typical for gas custody transfer (AGA 9 / vendor). Without a conditioner, vendors ask for about 20D or more.'},
 thermal:{n:'Thermal mass flowmeter (gas)',up:{red:15,exp:30,b1:15,b2s:20,b2p:40,vlv:20,cv:40,pump:20},dn:5,note:'Insertion types are especially sensitive to the velocity profile.'},
 pitot:{n:'Averaging pitot tube (e.g. Annubar type)',up:{red:8,exp:18,b1:10,b2s:11,b2p:16,vlv:10,cv:24,pump:16},dn:4,note:'Values vary with sensor orientation relative to the bend plane; check the vendor table.'},
 coriolis:{n:'Coriolis flowmeter',up:{red:0,exp:0,b1:0,b2s:0,b2p:0,vlv:0,cv:0,pump:0},dn:0,note:'No straight run normally needed. Support the pipe on both sides, keep it free of stress and vibration, and orient for the fluid (liquid: tubes down; gas: tubes up).'},
 pd:{n:'Positive displacement meter',up:{red:0,exp:0,b1:0,b2s:0,b2p:0,vlv:0,cv:0,pump:0},dn:0,note:'No straight run normally needed. Fit a strainer upstream, and an air eliminator for liquids.'},
 ro:{n:'Restriction orifice (RO)',up:{red:2,exp:2,b1:2,b2s:2,b2p:2,vlv:2,cv:5,pump:2},dn:5,note:'A restriction orifice limits flow or drops pressure; it is not a meter, so ISO 5167 straight lengths do not apply. Common practice: at least 2D upstream and 5D downstream, and 10D or more downstream for gas, flashing or two-phase flow and for multi-stage ROs, so the high-velocity jet settles before the next bend, valve or instrument. Check noise, erosion and vibration, and follow the RO vendor sizing sheet.'},
 cv:{n:'Control valve',up:{red:2,exp:2,b1:2,b2s:2,b2p:2,vlv:2,cv:2,pump:2},dn:6,note:'2D upstream and 6D downstream is the capacity test section of IEC 60534-2-3 / ANSI/ISA-75.02; many project specifications use it as the minimum. No code makes it mandatory. Reducers directly at the valve are allowed if sizing includes Fp.'}};
const ITYPES=[['orifice','Orifice plate (ISO 5167-2)'],['venturi','Classical Venturi tube (ISO 5167-4)'],...Object.entries(INST).map(([k,v])=>[k,v.n])];
const METERS=[
 ['Orifice plate','See calculator (ISO 5167-2)','4–8D','Lengths grow with β. Many companies limit β to about 0.6–0.7. Control valves go downstream.'],
 ['Venturi tube','Shorter than orifice (ISO 5167-4)','About 4D','Lower pressure loss; check ISO 5167-4 table for the fitting and β.'],
 ['Electromagnetic (mag) meter','About 5D (10D after a control valve)','About 2D','Must run full of conductive liquid. Earthing rings for lined or plastic pipe. Vertical upflow preferred for slurries.'],
 ['Vortex meter','About 20D after one bend; 40D after two bends in different planes; 50D after a control valve','About 5D','Very sensitive to swirl; reducers before the meter are common. Keep control valves downstream.'],
 ['Turbine meter','About 20D without a flow conditioner, 10D with one','About 5D','Strainer upstream. AGA 7 for gas turbine meters.'],
 ['Ultrasonic (in-line, multipath)','About 10D (often with a flow conditioner)','About 3–5D','Per vendor and AGA 9 for gas custody transfer.'],
 ['Ultrasonic clamp-on','About 10D','About 5D','Needs clean, full pipe and known wall thickness.'],
 ['Coriolis meter','None normally required','None','Mount free of stress and vibration; orientation per service (liquid: tubes down; gas: tubes up).'],
 ['Thermal mass (gas)','About 15–20D','About 5D','Insertion types especially sensitive to profile.'],
 ['Positive displacement','None normally required','None','Strainer upstream; air eliminator for liquids.'],
 ['Restriction orifice (RO)','At least 2D (not a meter)','At least 5D; 10D or more for gas, flashing or multi-stage','Keeps the jet away from bends, valves and instruments; vendor sizing governs.']];

const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SIZES=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=0.5&&NUM(n)<=48);
const ld=(k,d)=>{try{const v=store.get(k,d);return v==null?d:v}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
const S=Object.assign({t:'orifice',n:'6',sch:'',beta:'0.6',f:'b1',vf:'b1',d:'b1',col:'A'},JSON.parse(ld('sr','{}')||'{}'));
const save=()=>sv('sr',JSON.stringify(S));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const row=b=>{let i=BETA.findIndex(x=>b<=x+1e-9);return i<0?-1:i;};   /* next larger tabulated β (conservative) */
function pipeID(){const p=PIPEMAP[S.n],sc=Object.keys(p[2]);if(!sc.includes(S.sch))S.sch=sc.includes('STD')?'STD':sc.includes('40')?'40':sc[0];const od=p[1]*25.4,wt=p[2][S.sch]*25.4;return {od,wt,id:od-2*wt,sc};}
function calc(){
 const pid=pipeID(),t=S.t,b=+S.beta;
 if(t==='orifice'){const i=row(b),f=FT.find(x=>x[0]===S.f)||FT[0];
  if(!(b>0)||i<0)return {err:'β must be between 0.10 and 0.75 for ISO 5167-2 orifice plates.',pid,f,t};
  const [A,B]=f[2][i],[dA,dB]=DOWN[i],useB=S.col==='B'&&B!=null;
  return {t,pid,f,i,bt:BETA[i],up:useB?B:A,dn:useB?dB:dA,noB:S.col==='B'&&B==null,dA,dB,label:f[1],src:'ISO 5167-2:2003, Table 3'};}
 if(t==='venturi'){const i=VBETA.findIndex(x=>b<=x+1e-9),f=VFT.find(x=>x[0]===S.vf)||VFT[0];
  if(!(b>=0.3)||i<0)return {err:'β must be between 0.30 and 0.75 for classical Venturi tubes (ISO 5167-4).',pid,f,t};
  const [A,B]=f[2][i],useB=S.col==='B'&&B!=null,dn=+(4*b).toFixed(1);
  return {t,pid,f,i,bt:VBETA[i],up:useB?B:A,dn,noB:S.col==='B'&&B==null,label:f[1],src:'ISO 5167-4:2003, Table 1',vdn:true};}
 const m=INST[t],dk=DIST.find(x=>x[0]===S.d)||DIST[2];
 return {t,pid,m,up:m.up[dk[0]],dn:m.dn,label:dk[1],src:'Typical manufacturer guidance',typ:true};}
const mm=x=>Math.round(x).toLocaleString('en-US');
let VIEW='all',M3D=null;
const FITMAP={orifice:{red:['red',2],exp:['exp',.5]},venturi:{b2:['b2s'],r133:['red',1.33],e067:['exp',.67],r3:['red',3],e075:['exp',.75]},other:{red:['red',2],exp:['exp',.5]}};
function show3d(r){const st=P.querySelector('#srStage');if(!st||r.err)return;
 const key=r.t==='orifice'?S.f:r.t==='venturi'?S.vf:S.d,map=(FITMAP[r.t]||FITMAP.other)[key]||[key],
  p={t:r.t,fit:map[0],ratio:map[1],up:r.up,dn:r.dn,beta:+S.beta,upmm:mm(r.up*r.pid.id)+' mm',dnmm:mm(r.dn*r.pid.id)+' mm'};
 const go=m=>{M3D=m;const ld=st.querySelector('.sr-load');if(!m.mount(st)){if(ld)ld.outerHTML=fig(r);return;}if(ld)ld.remove();m.update(p);if(VIEW==='inst')m.view('inst');};
 if(M3D)go(M3D);else import('./sr3d.js?v=20261123c').then(go).catch(()=>{const ld=st.querySelector('.sr-load');if(ld)ld.outerHTML=fig(r);});}

function fig(r){
 const D=r.pid.id,up=r.up||0,dn=r.dn||0,tot=up+dn,W=760,x0=150,x1=W-60,sc=(x1-x0)/Math.max(tot,1),xo=x0+up*sc,y=80;
 return `<svg class="sr-fig" viewBox="0 0 ${W} 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Straight run sketch">
 <path d="M40 ${y-40}Q40 ${y} 80 ${y}H${x1+30}" fill="none" stroke="#1F2937" stroke-width="3"/>
 <text x="44" y="${y-48}" class="m">${esc(r.label.split(',')[0].split(' (')[0])}</text>
 <path d="M${xo} ${y-22}V${y+22}" stroke="#1849A9" stroke-width="4"/><text x="${xo}" y="${y-28}" text-anchor="middle" class="d">${esc((ITYPES.find(x=>x[0]===S.t)||['',''])[1].split(' (')[0])}${S.t==='orifice'||S.t==='venturi'?' β '+(+S.beta).toFixed(2):''}</text>
 <path d="M${xo-10} ${y}V${y-14}M${xo+10} ${y}V${y-14}" stroke="#1F2937" stroke-width="1.4"/>
 <path d="M${x0} ${y+40}H${xo}M${xo} ${y+40}H${x1}" stroke="#1849A9" stroke-width="1.2"/><path d="M${x0} ${y+32}V${y+48}M${xo} ${y+32}V${y+48}M${x1} ${y+32}V${y+48}" stroke="#1849A9"/>
 <text x="${(x0+xo)/2}" y="${y+64}" text-anchor="middle" class="d">Upstream ${up}D = ${mm(up*D)} mm</text>
 <text x="${(xo+x1)/2}" y="${y+64}" text-anchor="middle" class="d">Downstream ${dn}D = ${mm(dn*D)} mm</text>
 <path d="M${x1} ${y-14}V${y+14}" stroke="#1F2937" stroke-width="2"/><text x="${x1}" y="${y+86}" text-anchor="middle" class="m">next fitting</text>
 <text x="${x0}" y="${y+86}" text-anchor="middle" class="m">end of bend</text></svg>`;}

function render(){
 const r=calc(),pid=r.pid;
 P.innerHTML=`<div class="phead"><div><h1>Instrument straight runs</h1><p>Upstream and downstream straight lengths for orifice plates and Venturi tubes (ISO 5167), flowmeters (magnetic, vortex, turbine, ultrasonic, thermal, averaging pitot, Coriolis), restriction orifices and control valves, and layout rules for flow elements. Plan the space early: straight runs are one of the most common causes of late rework in instrument piping.</p></div></div>
 <div class="sr-g">
  <div class="sr-card"><h2>Straight run calculator</h2><p class="sub">${r.src}${r.typ?' (the vendor data sheet governs)':''}.</p>
   <div class="sr-f">
    <label class="w2">Instrument<select data-k="t">${ITYPES.map(x=>`<option value="${x[0]}"${x[0]===S.t?' selected':''}>${esc(x[1])}</option>`).join('')}</select></label>
    <label>Line size<select data-k="n">${SIZES.map(n=>`<option value="${n}"${n===S.n?' selected':''}>NPS ${n}</option>`).join('')}</select></label>
    <label>Schedule<select data-k="sch">${pid.sc.map(s=>`<option${s===S.sch?' selected':''}>${s}</option>`).join('')}</select></label>
    ${r.t==='orifice'||r.t==='venturi'?`<label>Diameter ratio β (d/D)<input data-k="beta" type="number" min="0.1" max="0.75" step="0.01" value="${esc(S.beta)}"></label>
    <label>Accuracy<select data-k="col"><option value="A"${S.col==='A'?' selected':''}>A: no added uncertainty</option><option value="B"${S.col==='B'?' selected':''}>B: +0.5% uncertainty</option></select></label>`:''}
    <label class="w2">Nearest upstream fitting${r.t==='orifice'?`<select data-k="f">${FT.map(f=>`<option value="${f[0]}"${f[0]===S.f?' selected':''}>${esc(f[1])}</option>`).join('')}</select>`
     :r.t==='venturi'?`<select data-k="vf">${VFT.map(f=>`<option value="${f[0]}"${f[0]===S.vf?' selected':''}>${esc(f[1])}</option>`).join('')}</select>`
     :`<select data-k="d">${DIST.map(f=>`<option value="${f[0]}"${f[0]===S.d?' selected':''}>${esc(f[1])}</option>`).join('')}</select>`}</label>
   </div>
   ${r.err?`<p class="sr-warn">${r.err}</p>`:`
   <div class="sr-kpi"><div><span>Upstream</span><b>${r.up?r.up+'D':'None'}</b><i>${r.up?mm(r.up*pid.id)+' mm':'no straight run needed'}</i></div><div><span>Downstream</span><b>${r.dn?r.dn+'D':'None'}</b><i>${r.dn?mm(r.dn*pid.id)+' mm':'no straight run needed'}${r.vdn?' (4 throat diameters)':''}</i></div></div>
   ${r.noB?'<p class="sr-warn">The standard gives no Column B value for this fitting at this β, so Column A is shown.</p>':''}
   ${r.bt&&+S.beta!==r.bt?`<p class="sr-note">β ${(+S.beta).toFixed(2)} is between table rows, so the next larger row (β ${r.bt.toFixed(2)}) is used. That's the conservative choice.</p>`:''}
   ${r.typ?`<p class="sr-note">${esc(r.m.note)}</p>`:''}
   ${r.vdn?'<p class="sr-note">Venturi downstream: fittings at least 4 throat diameters downstream of the throat tapping plane do not affect accuracy (ISO 5167-4). Shown here as 4β·D, measured from the throat tapping.</p>':''}
   <p class="sr-note">D = pipe inside diameter, ${mm(pid.id)} mm for NPS ${S.n} Sch ${S.sch}. Measure upstream length from the downstream end of the curved part of the nearest bend (or of the reducer or expander).${r.t==='orifice'&&S.f==='p2'&&r.i===3?' For β 0.60 with S < 2D, ISO requires 95D if Re<sub>D</sub> > 2×10⁶.':''}</p>`}
  </div>
  <div class="sr-card"><h2>3D view</h2><p class="sub">Straight lengths drawn to scale. Drag to rotate, scroll or pinch to zoom.</p>
   <div class="sr-stage" id="srStage">${r.err?'':`<div class="sr-tools"><button type="button" data-view="all" aria-pressed="${VIEW==='all'}">Whole run</button><button type="button" data-view="inst" aria-pressed="${VIEW==='inst'}">Instrument close-up</button></div><div class="sr-hint">Drag to rotate · scroll to zoom</div>`}<div class="sr-load">${r.err?'':'Loading 3D view…'}</div></div>
   ${r.t==='orifice'?`<div class="sr-warn">Two fittings in a row: check the length between them too. For the fitting further upstream, ISO 5167-2 asks for half of its own tabulated length (taken at β 0.67) between the two fittings, measured as in the table. When in doubt, use a flow conditioner or move the meter.</div>`:''}</div>
 </div>

 ${r.t!=='orifice'?'':`<section class="sr-sec"><h2>Orifice plates: all fittings at β ${r.err?'—':r.bt.toFixed(2)}</h2><p>Multiples of D. Column A gives no added uncertainty; Column B adds 0.5% to the discharge coefficient uncertainty. Below Column B, the standard can't predict the error. Click a row to select it.</p>
  <div class="sr-tw"><table class="sr-t"><thead><tr><th>Upstream fitting</th><th style="text-align:right">Upstream A</th><th style="text-align:right">Upstream B</th><th style="text-align:right">In mm (A)</th></tr></thead><tbody>
  ${r.err?'':FT.map(f=>{const [a,b]=f[2][r.i];return `<tr data-f="${f[0]}" class="${f[0]===S.f?'on':''}" style="cursor:pointer"><td>${esc(f[1])}</td><td class="n">${a}D</td><td class="n">${b==null?'—':b+'D'}</td><td class="n">${mm(a*pid.id)}</td></tr>`;}).join('')}
  ${r.err?'':`<tr><td><b>Downstream</b> (any of the fittings above)</td><td class="n">${r.dA}D</td><td class="n">${r.dB}D</td><td class="n">${mm(r.dA*pid.id)}</td></tr>`}
  </tbody></table></div>
  <p class="sr-note">A thermowell upstream of diameter 0.03D to 0.13D is allowed only with 20D (A) and 10D (B), and is not recommended: put the temperature element downstream. Values from ISO 5167-2:2003 Table 3; flow conditioners (Table 4 onwards) allow shorter lengths but need their own installation rules. Always check the current edition and the instrument data sheet.</p>
 </section>`}
 ${r.t==='orifice'||r.t==='venturi'?'':`<section class="sr-sec"><h2>${esc(r.m.n)}: by upstream fitting</h2><p>Typical upstream lengths, multiples of D. Click a row to select it.</p><div class="sr-tw"><table class="sr-t"><thead><tr><th>Upstream fitting</th><th style="text-align:right">Upstream</th><th style="text-align:right">In mm</th></tr></thead><tbody>${DIST.map(d=>`<tr data-d="${d[0]}" class="${d[0]===S.d?'on':''}" style="cursor:pointer"><td>${d[1]}</td><td class="n">${r.m.up[d[0]]}D</td><td class="n">${mm(r.m.up[d[0]]*pid.id)}</td></tr>`).join('')}<tr><td><b>Downstream</b></td><td class="n">${r.m.dn}D</td><td class="n">${mm(r.m.dn*pid.id)}</td></tr></tbody></table></div></section>`}

 <section class="sr-sec"><h2>Flowmeters: typical straight runs</h2><p>Typical values from manufacturers' installation guides. They vary by make, model and upstream disturbance, so the vendor data sheet always governs. Use them to reserve space early in layout.</p>
  <div class="sr-tw"><table class="sr-t"><thead><tr><th>Meter</th><th>Upstream</th><th>Downstream</th><th>Notes</th></tr></thead><tbody>
  ${METERS.map(m=>`<tr>${m.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>

 <section class="sr-sec"><h2>Control valves</h2>
  <div class="sr-cards">
   <div class="sr-card"><h3>Straight runs</h3><ul><li>No code sets a mandatory straight run for control valves.</li><li>Valve capacity (Cv/Kv) is tested with straight pipe of <b>2D upstream and 6D downstream</b> (IEC 60534-2-3 / ANSI/ISA-75.02 test section). Many project specifications use this as the minimum around the valve.</li><li>Reducers fitted directly at the valve are allowed, but sizing must include the piping geometry factor (F<sub>p</sub>).</li><li>Rotary valves (butterfly, ball) and noise-critical valves often need longer straight runs: check the vendor.</li></ul></div>
   <div class="sr-card"><h3>Position relative to meters</h3><ul><li>Put the control valve <b>downstream</b> of the flow element so its disturbance doesn't reach the meter.</li><li>Keep the flow element out of a control valve's high-velocity jet; if the valve must be upstream, add the extra straight run the meter vendor asks for.</li><li>Block valves, bypass and drains around the control valve are not counted as straight run.</li></ul></div>
  </div></section>

 <section class="sr-sec"><h2>Layout rules for flow elements</h2>
  <div class="sr-cards">
   <div class="sr-card"><h3>Orifice runs</h3><ul><li>Lay orifice runs horizontally where possible, at a height where the tapping valves can be reached from grade or a platform.</li><li>Liquid: taps on the side (or up to 45° below horizontal) so gas can't collect. Gas: taps on top (or up to 45° above). Steam: taps on the side.</li><li>Leave space for orifice flange jack screws and for removing the plate.</li><li>Reserve straight lengths in the 3D model as blocks at the 30% stage.</li></ul></div>
   <div class="sr-card"><h3>Common mistakes</h3><ul><li>Measuring straight run from the elbow's weld instead of the end of its curve.</li><li>Ignoring a tee or reducer that sits inside the straight run.</li><li>Putting a thermowell or vent inside the upstream run.</li><li>Placing a control valve directly upstream of a vortex or orifice meter.</li><li>Using pipe ID from the wrong schedule to work out mm lengths.</li></ul></div>
  </div>
  <p class="sr-note">Orifice values: ISO 5167-2:2003, Table 3. Control valve test section: IEC 60534-2-3 / ANSI/ISA-75.02. Flowmeter values are typical manufacturer guidance, not a standard. The instrument data sheet and project instrument installation standard govern.</p>
 </section>`;
 bind();show3d(r);}
function bind(){
 P.querySelectorAll('[data-k]').forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',()=>{S[el.dataset.k]=el.value;save();
  if(el.tagName==='INPUT'){clearTimeout(bind.t);bind.t=setTimeout(()=>{const pos=el.selectionStart;render();const n=P.querySelector('[data-k="beta"]');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}},400);}else render();}));
 P.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{VIEW=b.dataset.view;P.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(M3D)M3D.view(VIEW);}));
 P.querySelectorAll('tr[data-f],tr[data-d]').forEach(t=>t.addEventListener('click',()=>{if(t.dataset.f)S.f=t.dataset.f;else S.d=t.dataset.d;save();render();P.querySelector('.sr-g').scrollIntoView({behavior:'smooth',block:'start'});}));}
render();
window.renderSR=()=>{};
})();
