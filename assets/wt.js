/* Pipe weight and support load: weight per metre (pipe, contents, insulation, cladding), load on each support,
   sag and bending stress for the span, and a dummy leg check. Globals from app.js: PIPEMAP, PIPE, SEL, setSel, store, DN, SPAN, SCH. */
(function(){
const P=document.getElementById('p-wt');if(!P)return;
if(!document.getElementById('wt-css')){const st=document.createElement('style');st.id='wt-css';st.textContent=`
#p-wt .wt-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start}
#p-wt .wt-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-wt .wt-card h2{font-size:17px;margin:0 0 10px}#p-wt .wt-card h3{font-size:14px;margin:14px 0 6px}
#p-wt .wt-f{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px 12px}
#p-wt .wt-f label{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-wt .wt-f select,#p-wt .wt-f input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,8px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box}
#p-wt .wt-f input:disabled{opacity:.5}
#p-wt .wt-t{width:100%;border-collapse:collapse;font-size:14px;margin-top:4px}
#p-wt .wt-t td{padding:7px 6px;border-bottom:1px solid var(--rule);vertical-align:top;white-space:normal;min-width:0}#p-wt .wt-t{min-width:0!important;max-width:100%}
#p-wt .wt-t td:not(:first-child){text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-wt .wt-t tr.tot td{font-weight:700;border-top:2px solid var(--rule-strong)}
#p-wt .wt-t td small{display:block;color:var(--muted);font-size:12px;font-weight:400}
#p-wt .wt-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0;border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:4px 0 6px}
#p-wt .wt-kpi div{padding:10px 14px;border-right:1px solid var(--rule)}#p-wt .wt-kpi div:last-child{border-right:0}
#p-wt .wt-kpi span{display:block;font-size:12px;color:var(--muted)}#p-wt .wt-kpi b{font-size:21px;font-variant-numeric:tabular-nums}#p-wt .wt-kpi i{font-style:normal;font-size:12.5px;color:var(--muted);margin-left:4px}
#p-wt .ok{color:#147A4A;font-weight:650}#p-wt .bad{color:#B42318;font-weight:650}#p-wt .warn{color:#9A6A08;font-weight:650}
[data-theme=dark] #p-wt .ok{color:#7DD3A8}[data-theme=dark] #p-wt .bad{color:#F4A39A}[data-theme=dark] #p-wt .warn{color:#F2C46B}
#p-wt .wt-note{font-size:13px;color:var(--muted);line-height:1.5;margin:8px 0 0}
#p-wt .wt-svg{display:block;width:100%;height:auto;max-height:230px;margin:6px 0}
#p-wt .wt-svg text{font:12px Geist,system-ui,sans-serif;fill:var(--ink-2)}#p-wt .wt-svg .d{fill:var(--accent);font-weight:650}
@media (max-width:900px){#p-wt .wt-g{grid-template-columns:1fr}}
`;document.head.appendChild(st);}

const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const MAT={cs:{n:'Carbon steel (A106 B)',rho:7850,E:203400},lt:{n:'Low-temp CS (A333 Gr 6)',rho:7850,E:203400},cr:{n:'Cr-Mo (A335 P11 / P22)',rho:7850,E:203400},
 ss:{n:'Stainless (A312 304L / 316L)',rho:7930,E:195100},dx:{n:'Duplex (A790 S31803)',rho:7800,E:200000}};
const CON={empty:['Empty (gas, vapour)',0],water:['Water',1000],hc:['Light hydrocarbon (SG 0.75)',750],crude:['Crude oil (SG 0.88)',880],custom:['Other: enter density',null]};
const INS={none:['No insulation',0],mw:['Mineral wool (128 kg/m³)',128],cs:['Calcium silicate (240 kg/m³)',240],cg:['Cellular glass (120 kg/m³)',120],pir:['PIR / PUR foam (40 kg/m³)',40],aer:['Aerogel blanket (150 kg/m³)',150],custom:['Other: enter density',null]};
const CLAD={al:['Aluminium 0.7 mm',2700,0.7],al1:['Aluminium 1.0 mm',2700,1.0],ss:['Stainless 0.5 mm',8000,0.5],gi:['Galvanised steel 0.5 mm',7850,0.5],none:['No cladding',0,0]};
const ld=(k,d)=>{try{const v=store.get(k,d);return v==null?d:v;}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
const S=Object.assign({sch:'STD',mat:'cs',con:'water',rc:'1000',ins:'none',ti:'50',ri:'128',clad:'al',span:'',ends:'int',pt:'0',
 dn:'',dsch:'STD',dl:'500',mu:'0.3',sa:'137.9'},JSON.parse(ld('wt','{}')||'{}'));
const save=()=>sv('wt',JSON.stringify(S));
const SIZES=PIPE.map(p=>p[0]).filter(n=>NUM(n)>=0.5);
const g=9.80665,f1=(x,d=1)=>isFinite(x)?(+x).toFixed(d):'—',fk=x=>isFinite(x)?Math.round(x).toLocaleString('en-US'):'—';
const pipe=(n,sch)=>{const p=PIPEMAP[n];if(!p)return null;const s=p[2][sch]!=null?sch:(p[2].STD!=null?'STD':p[2]['40']!=null?'40':Object.keys(p[2])[0]);
 const D=p[1]*25.4,t=p[2][s]*25.4,d=D-2*t;return {n,sch:s,D,t,d,A:Math.PI/4*(D*D-d*d),I:Math.PI/64*(D**4-d**4),Z:Math.PI/32*(D**4-d**4)/D};};
const spanTable=n=>{const i=SPAN.nps.indexOf(n);return i<0?null:{w:SPAN.wm[i],s:SPAN.sm[i]};};

function calc(n){
 const p=pipe(n,S.sch),M=MAT[S.mat];if(!p)return null;
 const m2=x=>x/1e6; /* mm² to m² */
 const wP=M.rho*m2(p.A);
 const rc=S.con==='custom'?(+S.rc||0):CON[S.con][1],wC=rc*m2(Math.PI/4*p.d*p.d);
 const ti=S.ins==='none'?0:Math.max(0,+S.ti||0),ri=S.ins==='custom'?(+S.ri||0):INS[S.ins][1],Do=p.D+2*ti;
 const wI=ti?ri*m2(Math.PI/4*(Do*Do-p.D*p.D)):0;
 const cl=CLAD[S.clad],wK=ti&&cl[1]?cl[1]*m2(Math.PI*Do*cl[2]):0;
 const wW=1000*m2(Math.PI/4*p.d*p.d);
 const wOp=wP+wC+wI+wK,wT=wP+wW;
 const tab=spanTable(n),Ls=+S.span>0?+S.span:(tab?(rc>0?tab.w:tab.s):Math.max(2,Math.round(p.D/30)/1)),L=Ls*1000;
 const w=wOp*g/1000; /* N/mm */
 const Pc=Math.max(0,+S.pt||0)*g; /* N, concentrated (valve) at mid-span */
 const share=S.ends==='int'?1:0.5;
 const R=wOp*g*Ls*share+Pc/2,RT=wT*g*Ls*share+Pc/2;
 const dSS=5*w*L**4/(384*M.E*p.I)+Pc*L**3/(48*M.E*p.I),dFx=w*L**4/(384*M.E*p.I)+Pc*L**3/(192*M.E*p.I);
 const Mb=S.ends==='int'?w*L*L/10+Pc*L/8:w*L*L/8+Pc*L/4,sig=Mb/p.Z;
 return {p,M,rc,ti,ri,Do,cl,wP,wC,wI,wK,wW,wOp,wT,tab,Ls,L,R,RT,dSS,dFx,Mb,sig,share,Pc};}

function dummy(r){
 const big=NUM(r.p.n),dn=S.dn&&NUM(S.dn)<big&&PIPEMAP[S.dn]?S.dn:(SIZES.filter(x=>NUM(x)<big).slice(-1)[0]||r.p.n);
 const q=pipe(dn,S.dsch),Ld=Math.max(0,+S.dl||0),mu=Math.max(0,+S.mu||0),Sa=+S.sa||137.9,Pv=r.R; /* N */
 const sa=Pv/q.A,M=mu*Pv*Ld,sb=M/q.Z,tot=sa+sb;
 return {dn,q,Ld,mu,Sa,Pv,sa,M,sb,tot,ratio:tot/Sa};}

function svg(r){
 const W=760,H=200,x0=60,x1=700,y=92,s=r.share===1;
 const sup=x=>`<path d="M${x} ${y+16}l-12 22h24z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M${x-18} ${y+38}h36" stroke="currentColor" stroke-width="1.6"/>`;
 let a='';for(let i=0;i<=16;i++){const x=x0+(x1-x0)*i/16;a+=`<path d="M${x} ${y-44}v26" stroke="var(--accent)" stroke-width="1.2" marker-end="url(#wtA)"/>`;}
 return `<svg class="wt-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Span with uniform load and supports" style="color:var(--ink-2)"><defs><marker id="wtA" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L5 9L9 1" fill="none" stroke="var(--accent)" stroke-width="1.5"/></marker></defs>
 ${s?`<path d="M${x0-50} ${y}H${x0}" stroke="currentColor" stroke-width="10" stroke-dasharray="6 5" opacity=".35"/><path d="M${x1} ${y}H${x1+50}" stroke="currentColor" stroke-width="10" stroke-dasharray="6 5" opacity=".35"/>`:''}
 <path d="M${x0} ${y}Q${(x0+x1)/2} ${y+18} ${x1} ${y}" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/>${a}${sup(x0)}${sup(x1)}
 ${r.Pc>0?`<path d="M${(x0+x1)/2} ${y-70}v44" stroke="#B42318" stroke-width="2.4"/><text x="${(x0+x1)/2+8}" y="${y-60}" style="fill:#B42318">valve ${fk(r.Pc/g)} kg</text>`:''}
 <text x="${(x0+x1)/2}" y="${y-52}" text-anchor="middle" class="d">w = ${f1(r.wOp)} kg/m</text>
 <path d="M${x0} ${y+56}H${x1}" stroke="currentColor" stroke-width=".8"/><path d="M${x0} ${y+50}v12M${x1} ${y+50}v12" stroke="currentColor"/><text x="${(x0+x1)/2}" y="${y+74}" text-anchor="middle">span L = ${f1(r.Ls,2)} m</text>
 <text x="${x0}" y="${y+96}" text-anchor="middle" class="d">${fk(r.R/g)} kg</text><text x="${x1}" y="${y+96}" text-anchor="middle" class="d">${fk(r.R/g)} kg</text>
 <text x="${W/2}" y="${H-4}" text-anchor="middle">${s?'Interior support of a continuous run: each support carries one span length':'Single span or end support: each support carries half a span'}</text></svg>`;}

function render(){
 const n=SIZES.includes(SEL)?SEL:'6';
 const r=calc(n),dd=dummy(r),p=r.p,pct=Math.round(dd.ratio*100);
 const opt=(o,cur)=>Object.entries(o).map(([k,v])=>`<option value="${k}"${k===cur?' selected':''}>${Array.isArray(v)?v[0]:v.n}</option>`).join('');
 const schs=Object.keys(PIPEMAP[n][2]).sort((a,b)=>PIPEMAP[n][2][a]-PIPEMAP[n][2][b]);
 const dsz=SIZES.filter(x=>NUM(x)<NUM(n));const dsch=Object.keys(PIPEMAP[dd.dn][2]).sort((a,b)=>PIPEMAP[dd.dn][2][a]-PIPEMAP[dd.dn][2][b]);
 const lb=x=>f1(x*0.671969,1); /* kg/m to lb/ft */
 const sagLim=r.dSS<=2.5?'ok':r.dSS<=5?'warn':'bad';
 P.innerHTML=`<div class="phead"><div><h1>Pipe weight and support load</h1><p>Weight per metre of pipe, contents, insulation and cladding, the load on each support for a given span, sag and bending stress of the span, and a quick dummy leg check. For layout and support sizing; stress analysis governs critical lines.</p></div></div>
 <div class="wt-g">
  <div class="wt-card"><h2>1. Line</h2><div class="wt-f">
   <label>Size<select data-k="n">${SIZES.map(x=>`<option value="${x}"${x===n?' selected':''}>NPS ${x} (DN ${DN[x]})</option>`).join('')}</select></label>
   <label>Schedule<select data-k="sch">${schs.map(x=>`<option${x===p.sch?' selected':''}>${x}</option>`).join('')}</select></label>
   <label>Material<select data-k="mat">${opt(MAT,S.mat)}</select></label>
   <label>Contents<select data-k="con">${opt(CON,S.con)}</select></label>
   <label>Density, kg/m³<input type="number" min="0" step="10" data-k="rc" value="${S.con==='custom'?S.rc:r.rc}"${S.con==='custom'?'':' disabled'}></label>
   <label>Insulation<select data-k="ins">${opt(INS,S.ins)}</select></label>
   <label>Insulation thickness, mm<input type="number" min="0" step="5" data-k="ti" value="${S.ti}"${S.ins==='none'?' disabled':''}></label>
   <label>Insulation density, kg/m³<input type="number" min="0" step="5" data-k="ri" value="${S.ins==='custom'?S.ri:r.ri}"${S.ins==='custom'?'':' disabled'}></label>
   <label>Cladding<select data-k="clad"${S.ins==='none'?' disabled':''}>${opt(CLAD,S.clad)}</select></label>
  </div>
  <h3>Weight per metre</h3>
  <table class="wt-t"><tbody>
   <tr><td>Pipe, ${p.sch} (OD ${f1(p.D)} × ${f1(p.t,2)} mm)</td><td>${f1(r.wP,2)} kg/m<small>${lb(r.wP)} lb/ft</small></td></tr>
   <tr><td>Contents, ${S.con==='custom'?'density '+r.rc+' kg/m³':CON[S.con][0].toLowerCase()} (ID ${f1(p.d)} mm)</td><td>${f1(r.wC,2)} kg/m</td></tr>
   <tr><td>Insulation${r.ti?`, ${r.ti} mm at ${r.ri} kg/m³`:''}</td><td>${f1(r.wI,2)} kg/m</td></tr>
   <tr><td>Cladding${r.ti&&r.cl[1]?`, ${r.cl[0].toLowerCase()} on OD ${f1(r.Do)} mm`:''}</td><td>${f1(r.wK,2)} kg/m</td></tr>
   <tr class="tot"><td>Operating weight</td><td>${f1(r.wOp,2)} kg/m<small>${lb(r.wOp)} lb/ft</small></td></tr>
   <tr><td>Hydrotest weight (pipe full of water, before insulation)</td><td>${f1(r.wT,2)} kg/m<small>${lb(r.wT)} lb/ft</small></td></tr>
  </tbody></table></div>
  <div class="wt-card"><h2>2. Span and support load</h2><div class="wt-f">
   <label>Span between supports, m<input type="number" min="0.5" step="0.1" data-k="span" value="${S.span||r.Ls}" placeholder="${r.Ls}"></label>
   <label>Support position<select data-k="ends"><option value="int"${S.ends==='int'?' selected':''}>Interior of a continuous run</option><option value="end"${S.ends==='end'?' selected':''}>Single span / end support</option></select></label>
   <label>Valve or other load at mid-span, kg<input type="number" min="0" step="5" data-k="pt" value="${S.pt}"></label>
  </div>
  ${r.tab?`<p class="wt-note">ASME B31.1 Table 121.5 suggests up to ${r.tab.w} m (water service) / ${r.tab.s} m (steam, gas, air) for NPS ${n} standard wall.${S.span?'':' Used as the default span.'}</p>`:''}
  ${svg(r)}
  <div class="wt-kpi"><div><span>Load per support, operating</span><b>${fk(r.R/g)}</b><i>kg</i><br><small style="color:var(--muted)">${f1(r.R/1000,2)} kN</small></div><div><span>Load per support, hydrotest</span><b>${fk(r.RT/g)}</b><i>kg</i><br><small style="color:var(--muted)">${f1(r.RT/1000,2)} kN</small></div></div>
  <table class="wt-t"><tbody>
   <tr><td>Sag at mid-span, simply supported (upper bound)<small>5 w L⁴ / 384 E I</small></td><td><span class="${sagLim}">${f1(r.dSS,1)} mm</span></td></tr>
   <tr><td>Sag, ends fixed (lower bound)<small>w L⁴ / 384 E I; a real continuous run lies between</small></td><td>${f1(r.dFx,1)} mm</td></tr>
   <tr><td>Bending stress from weight<small>M = ${S.ends==='int'?'w L² / 10':'w L² / 8'}${r.Pc?' + valve load':''}, σ = M / Z</small></td><td>${f1(r.sig,1)} MPa</td></tr>
  </tbody></table>
  <p class="wt-note">B31.1 table spans are set to keep sag to about 2.5 mm and weight stress to about 16 MPa. Sag above 2.5 mm is shown amber, above 5 mm red.</p></div>
 </div>
 <div class="wt-card" style="margin-top:18px"><h2>3. Dummy leg check</h2>
  <p class="wt-note" style="margin:0 0 10px">A dummy leg welded to the elbow carries the support load down to the steel. The thermal movement drags the leg across the support, so friction bends it like a cantilever.</p>
  <div class="wt-f">
   <label>Dummy leg size<select data-k="dn">${dsz.map(x=>`<option value="${x}"${x===dd.dn?' selected':''}>NPS ${x} (DN ${DN[x]})</option>`).join('')||`<option>${dd.dn}</option>`}</select></label>
   <label>Dummy leg schedule<select data-k="dsch">${dsch.map(x=>`<option${x===dd.q.sch?' selected':''}>${x}</option>`).join('')}</select></label>
   <label>Leg length, elbow CL to support, mm<input type="number" min="0" step="10" data-k="dl" value="${S.dl}"></label>
   <label>Friction coefficient μ<select data-k="mu"><option value="0.3"${S.mu==='0.3'?' selected':''}>0.3 steel on steel</option><option value="0.1"${S.mu==='0.1'?' selected':''}>0.1 PTFE slide plate</option><option value="0"${S.mu==='0'?' selected':''}>0 no movement</option></select></label>
   <label>Allowable stress S, MPa<input type="number" min="1" step="0.1" data-k="sa" value="${S.sa}"></label>
  </div>
  <table class="wt-t" style="margin-top:10px"><tbody>
   <tr><td>Vertical load on the leg (operating support load)</td><td>${f1(dd.Pv/1000,2)} kN</td></tr>
   <tr><td>Axial stress P / A<small>A = ${f1(dd.q.A,0)} mm² (NPS ${dd.dn} ${dd.q.sch})</small></td><td>${f1(dd.sa,1)} MPa</td></tr>
   <tr><td>Friction moment M = μ P L</td><td>${f1(dd.M/1e6,2)} kN·m</td></tr>
   <tr><td>Bending stress M / Z<small>Z = ${f1(dd.q.Z/1000,1)} cm³</small></td><td>${f1(dd.sb,1)} MPa</td></tr>
   <tr class="tot"><td>Combined, against S = ${f1(dd.Sa,1)} MPa</td><td><span class="${pct<=80?'ok':pct<=100?'warn':'bad'}">${f1(dd.tot,1)} MPa (${pct}%)</span></td></tr>
  </tbody></table>
  <p class="wt-note">Default S = 137.9 MPa (20 ksi) is the B31.3 Table A-1 value for A106 Gr B up to 204 °C; enter the value for your material and temperature. This checks the leg only; local stress in the elbow wall at the dummy leg weld needs a stress engineer's check (e.g. WRC 107 / 537 or FE) on hot or large lines. Provide a weep or vent hole in the leg.</p></div>`;
 P.querySelectorAll('[data-k]').forEach(el=>el.addEventListener('change',()=>{const k=el.dataset.k;S[k]=el.value;
  if(k==='n'){S.span='';S.dn='';delete S.n;save();if(typeof setSel==='function'){setSel(el.value);render();return;}}
  if(k==='con'&&el.value==='custom'&&!S.rc)S.rc='1000';if(k==='ins'&&el.value==='custom'&&!S.ri)S.ri='128';
  save();render();}));}
window.renderWT=()=>{if(document.getElementById('p-wt')&&!document.getElementById('p-wt').hidden)render();};
render();
})();
