/* Hydrotest pressure: ASME B31.3 345.4 (hydrostatic), 345.5 (pneumatic) and B31.1 137.4.
   Test pressure at the high point, static head at the low point, hoop stress against yield, B16.5 flange limit and water volume.
   Globals from app.js: PIPE, PIPEMAP, PTG, SEL, setSel, store. */
(function(){
const P=document.getElementById('p-hydro');if(!P)return;
if(!document.getElementById('hy-css')){const st=document.createElement('style');st.id='hy-css';st.textContent=`
#p-hydro .hy-ctrl{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px 16px;margin:16px 0 6px;align-items:end}
#p-hydro .hy-ctrl label{display:flex;flex-direction:column;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-hydro .hy-ctrl label small{font-weight:400;color:var(--muted)}
#p-hydro .hy-ctrl select,#p-hydro .hy-ctrl input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,9px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box;min-width:0}
#p-hydro .hy-ctrl input.req{border-color:#B7791F}
#p-hydro h2.hy-h{font-size:16px;margin:22px 0 0}
#p-hydro .hy-box{border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet);margin-top:18px}
#p-hydro .hy-top{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr)}
#p-hydro .hy-draw{background:#F7F9FC;background-image:linear-gradient(rgba(24,73,169,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,73,169,.05) 1px,transparent 1px);background-size:20px 20px;padding:10px 14px;border-right:1px solid var(--rule)}
#p-hydro .hy-draw svg{display:block;width:100%;height:auto;max-height:330px}
#p-hydro .hy-big{padding:18px 20px;display:flex;flex-direction:column;gap:12px;justify-content:center}
#p-hydro .hy-big .k{font-size:12.5px;color:var(--muted)}#p-hydro .hy-big .v{font-size:30px;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
#p-hydro .hy-big .v small{font-size:14px;font-weight:500;color:var(--muted);margin-left:6px}
#p-hydro .hy-big .s{font-size:13.5px;color:var(--ink-2)}
#p-hydro .hy-chk{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));border-top:1px solid var(--rule)}
#p-hydro .hy-chk div{padding:12px 16px;border-right:1px solid var(--rule);border-top:1px solid var(--rule);margin-top:-1px}
#p-hydro .hy-chk span{display:block;font-size:12px;color:var(--muted)}#p-hydro .hy-chk b{font-size:18px;font-variant-numeric:tabular-nums}
#p-hydro .hy-chk em{display:block;font-style:normal;font-size:12.5px;margin-top:3px}
#p-hydro .ok{color:#147A4A}#p-hydro .bad{color:#B42318}#p-hydro .warn{color:#9A6A08}
#p-hydro .hy-msg{margin:14px 0 0;padding:10px 14px;border-radius:10px;font-size:13.5px;line-height:1.5}
#p-hydro .hy-msg.bad{background:#FEF3F2;border:1px solid #FDA29B;color:#7A271A}#p-hydro .hy-msg.warn{background:#FFFAEB;border:1px solid #FEDF89;color:#7A4D05}
#p-hydro .hy-msg.info{background:#EFF4FF;border:1px solid #B2CCFF;color:#1D3A8A}
#p-hydro .hy-out{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;margin-top:18px}
#p-hydro .hy-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-hydro .hy-card h3{font-size:16px;margin:0 0 8px}
#p-hydro .hy-card li,#p-hydro .hy-card p{font-size:13.5px;line-height:1.55;color:var(--ink-2)}
#p-hydro .hy-card ol,#p-hydro .hy-card ul{padding-left:18px;margin:6px 0 0}#p-hydro .hy-card li+li{margin-top:4px}
#p-hydro .hy-t{width:100%;border-collapse:collapse;font-size:13.5px}#p-hydro .hy-t td{padding:6px;border-bottom:1px solid var(--rule);vertical-align:top}
#p-hydro .hy-t td:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
[data-theme=dark] #p-hydro .hy-draw{background-color:#0F1A2B}
[data-theme=dark] #p-hydro .hy-msg.bad{background:#2B1210;color:#FDA29B}[data-theme=dark] #p-hydro .hy-msg.warn{background:#2A2108;color:#FEDF89}[data-theme=dark] #p-hydro .hy-msg.info{background:#101C38;color:#B2CCFF}
@media (max-width:900px){#p-hydro .hy-top,#p-hydro .hy-out{grid-template-columns:1fr}#p-hydro .hy-draw{border-right:0;border-bottom:1px solid var(--rule)}}
`;document.head.appendChild(st);}

const ld=(k,d)=>{try{const v=localStorage.getItem('piperef_hy_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem('piperef_hy_'+k,JSON.stringify(v))}catch(e){}};
const S={code:ld('code','b313'),p:ld('p',40),t:ld('t',200),st:ld('st',''),s:ld('s',''),sy:ld('sy',''),sch:ld('sch','40'),mt:ld('mt',12.5),g:ld('g','1.1'),cls:ld('cls','300'),dh:ld('dh',10),len:ld('len',100)};
const SZ=PIPE.map(p=>p[0]).filter(n=>n!=='1/8');
const num=v=>v===''||v==null||isNaN(+v)?null:+v;
const f1=x=>(Math.round(x*10)/10).toLocaleString('en',{maximumFractionDigits:1,minimumFractionDigits:1});
const f0=x=>Math.round(x).toLocaleString('en');
const psi=b=>f0(b*14.5038);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const CODES={b313:'B31.3 hydrostatic',b313p:'B31.3 pneumatic',b311:'B31.1 hydrostatic'};

function calc(n){
 const row=PIPEMAP[n],D=row[1]*25.4,schs=row[2];let sch=S.sch in schs?S.sch:(schs['40']?'40':schs.STD?'STD':Object.keys(schs)[0]);
 const tn=schs[sch]*25.4,t=tn*(1-(+S.mt||0)/100),ID=D-2*tn;
 const P=+S.p||0,ST=num(S.st),Sd=num(S.s),SY=num(S.sy);
 let ratio=null,ratioUsed=null,PT=0,basis='';
 if(S.code==='b313'){
  if(ST&&Sd){ratio=ST/Sd;ratioUsed=Math.min(ratio,6.5);}else ratioUsed=null;
  PT=1.5*P*(ratioUsed??1);basis=ratioUsed==null?'1.5 × P (enter S values to apply the S<sub>T</sub>/S ratio)':`1.5 × P × S<sub>T</sub>/S = 1.5 × ${f1(P)} × ${ratioUsed.toFixed(3)}`;
 }else if(S.code==='b313p'){PT=1.1*P;basis=`1.1 × P = 1.1 × ${f1(P)}`;}
 else{PT=1.5*P;basis=`1.5 × P = 1.5 × ${f1(P)}`;}
 const head=S.code==='b313p'?0:0.0981*(+S.dh||0);           /* bar per metre of water, 1000 kg/m3 */
 const PL=PT+head;
 const hoop=PL/10*D/(2*t);                                     /* MPa, Barlow on minimum wall at the low point */
 const Pyield=SY?2*SY*t/D*10:null;                             /* bar that brings hoop stress to yield */
 const gr=PTG[S.g]||PTG['1.1'];const r38=(gr.C&&gr.C[S.cls])?gr.C[S.cls][0]:null;
 const flim=r38!=null?Math.ceil(1.5*r38):null;                 /* B16.5 2.6: 1.5 × 38 °C rating, rounded up to the next 1 bar */
 const A=Math.PI/4*(ID/1000)**2,L=+S.len||0,V=A*L;
 return {n,sch,D,tn,t,ID,P,ST,Sd,SY,ratio,ratioUsed,PT,basis,head,PL,hoop,Pyield,r38,flim,V,W:V*1000,gr};
}

function draw(r){
 const hi=S.code!=='b313p'&&+S.dh>0;
 return `<svg viewBox="0 0 530 300" role="img" aria-label="Test arrangement: test pump at the low point, vent and gauge at the high point">
 <g font-family="Geist,system-ui,sans-serif">
 <path d="M70 250H250V80H450V250" fill="none" stroke="var(--ink3,#2B3A55)" stroke-width="8" stroke-linejoin="round"/>
 <path d="M440 250h20" stroke="var(--ink3,#2B3A55)" stroke-width="5"/><path d="M462 236v28" stroke="var(--ink3,#2B3A55)" stroke-width="4"/>
 <text x="462" y="284" text-anchor="middle" font-size="12" fill="var(--muted)">Blind</text>
 <path d="M350 80V50" stroke="var(--ink3,#2B3A55)" stroke-width="3"/><path d="M342 58l16-8M342 50l16 8" stroke="var(--ink3,#2B3A55)" stroke-width="2"/>
 <text x="350" y="36" text-anchor="middle" font-size="12" fill="var(--muted)">Vent (high point)</text>
 <circle cx="300" cy="58" r="13" fill="var(--sheet,#fff)" stroke="#1849A9" stroke-width="2"/><path d="M300 58l6-6" stroke="#1849A9" stroke-width="2"/><path d="M300 71v9" stroke="#1849A9" stroke-width="2"/>
 <text x="282" y="62" text-anchor="end" font-size="13" font-weight="700" fill="#1849A9">${f1(r.PT)} bar</text>
 <rect x="22" y="232" width="48" height="36" rx="5" fill="var(--eq,#E9EEF6)" stroke="var(--eqs,#6B7C96)" stroke-width="1.6"/><text x="46" y="254" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink-2)">Pump</text>
 <circle cx="130" cy="222" r="13" fill="var(--sheet,#fff)" stroke="${hi?'#B42318':'#1849A9'}" stroke-width="2"/><path d="M130 222l6-6" stroke="${hi?'#B42318':'#1849A9'}" stroke-width="2"/><path d="M130 235v15" stroke="${hi?'#B42318':'#1849A9'}" stroke-width="2"/>
 <text x="150" y="215" font-size="13" font-weight="700" fill="${hi?'#B42318':'#1849A9'}">${f1(r.PL)} bar</text><text x="150" y="230" font-size="11" fill="var(--muted)">low point</text>
 ${hi?`<path d="M500 80V250" stroke="var(--muted)" stroke-width="1.2"/><path d="M494 80h12M494 250h12" stroke="var(--muted)" stroke-width="1.2"/>
 <text x="514" y="170" font-size="12" fill="var(--muted)" transform="rotate(-90 514 170)" text-anchor="middle">${f1(+S.dh)} m</text>`:''}
 <text x="350" y="160" text-anchor="middle" font-size="12" fill="var(--muted)">${esc(r.n)}" Sch ${esc(r.sch)}</text>
 </g></svg>`;}

function render(){
 let n=SEL;if(!SZ.includes(n))n='6';
 const r=calc(n);const schs=Object.keys(PIPEMAP[n][2]);
 const needS=S.code==='b313'&&(num(S.st)==null||num(S.s)==null);
 const yOk=r.SY?r.hoop<=r.SY:null;
 const fOk=r.flim!=null?r.PL<=r.flim:null;
 const msgs=[];
 if(needS)msgs.push(['info','Enter the allowable stress at test temperature (S<sub>T</sub>) and at design temperature (S) from B31.3 Table A-1M to apply the temperature ratio. Until then the result is 1.5 × P, which is correct only when S<sub>T</sub> = S.']);
 if(S.code==='b313'&&r.ratio!=null&&r.ratio>6.5)msgs.push(['warn',`S<sub>T</sub>/S is ${r.ratio.toFixed(2)}; B31.3 caps it at 6.5, so 6.5 is used.`]);
 if(yOk===false)msgs.push(['bad',`At the low point the hoop stress (${f0(r.hoop)} MPa) is above the yield strength you entered (${f0(r.SY)} MPa). B31.3 345.4.2(c) lets you reduce the test pressure to the highest that does not exceed yield: about ${f1(r.Pyield-r.head)} bar at the high point.`]);
 if(fOk===false)msgs.push(['bad',`The test pressure at the low point is above the B16.5 limit for Class ${S.cls} flanges (${r.flim} bar). Isolate or remove those flanged items, or test them separately.`]);
 if(S.code==='b313p')msgs.push(['warn','Pneumatic testing stores a lot of energy in the gas. B31.3 345.5 requires the owner\'s approval and precautions, a pressure relief device, and a preliminary check at the lower of 1.7 bar (25 psi) or 25% of the test pressure. Use it only where a hydrotest is not practical.']);
 if(S.code==='b313'&&!r.SY)msgs.push(['info','Enter the yield strength at test temperature to check that the test does not overstress the pipe.']);
 P.innerHTML=`<div class="phead"><div><h1>Hydrotest pressure calculator</h1><p>Test pressure for process and power piping to ASME B31.3 and B31.1, with the extra static head at low points, a hoop stress check against yield, the B16.5 flange limit and the water you will need.</p></div></div>
 <div class="hy-ctrl">
  <label>Code and test<select id="hyC">${Object.entries(CODES).map(([k,v])=>`<option value="${k}"${k===S.code?' selected':''}>${v}</option>`).join('')}</select></label>
  <label>Design pressure, bar(g)<input id="hyP" type="number" step="0.1" min="0" value="${S.p}"></label>
  <label>Design temperature, °C<input id="hyT" type="number" step="1" value="${S.t}"></label>
  <label>NPS<select id="hyN">${SZ.map(x=>`<option${x===n?' selected':''}>${x}</option>`).join('')}</select></label>
  <label>Schedule<select id="hyS">${schs.map(x=>`<option${x===r.sch?' selected':''}>${x}</option>`).join('')}</select></label>
  <label>Mill under-tolerance, %<input id="hyM" type="number" step="0.5" min="0" max="20" value="${S.mt}"></label>
 </div>
 <h2 class="hy-h">From your code tables</h2>
 <div class="hy-ctrl" style="margin-top:8px">
  ${S.code==='b313'?`<label><span>S<sub>T</sub> at test temp., MPa <small>Table A-1M</small></span><input id="hyST" class="${num(S.st)==null?'req':''}" type="number" step="0.1" min="0" value="${S.st}" placeholder="e.g. 138"></label>
  <label><span>S at design temp., MPa <small>Table A-1M</small></span><input id="hyS2" class="${num(S.s)==null?'req':''}" type="number" step="0.1" min="0" value="${S.s}" placeholder="e.g. 138"></label>`:''}
  <label><span>Yield at test temp., MPa <small>material spec</small></span><input id="hyY" type="number" step="1" min="0" value="${S.sy}" placeholder="e.g. 241 (A106 B)"></label>
  <label>Flange material group<select id="hyG">${Object.keys(PTG).map(k=>`<option value="${k}"${k===S.g?' selected':''}>${PTG[k].lbl}</option>`).join('')}</select></label>
  <label>Flange class<select id="hyF">${['150','300','600','900','1500','2500'].map(c=>`<option${c===S.cls?' selected':''}>${c}</option>`).join('')}</select></label>
  <label>High point above low point, m<input id="hyH" type="number" step="0.5" min="0" value="${S.dh}"></label>
  <label>Line length to fill, m<input id="hyL" type="number" step="1" min="0" value="${S.len}"></label>
 </div>
 <div class="hy-box"><div class="hy-top"><div class="hy-draw">${draw(r)}</div>
  <div class="hy-big"><div><div class="k">Test pressure at the high point</div><div class="v">${f1(r.PT)} bar(g)<small>${psi(r.PT)} psig</small></div><div class="s">${r.basis}</div></div>
   ${S.code!=='b313p'?`<div><div class="k">At the low point, with ${f1(+S.dh||0)} m of water above it</div><div class="v" style="font-size:24px">${f1(r.PL)} bar(g)<small>${psi(r.PL)} psig</small></div></div>`:''}</div></div>
  <div class="hy-chk">
   <div><span>Hoop stress at the low point</span><b>${f0(r.hoop)} MPa</b><em class="${yOk==null?'':yOk?'ok':'bad'}">${yOk==null?'Enter yield to check':yOk?`Below yield (${f0(r.hoop/r.SY*100)}% of ${f0(r.SY)} MPa)`:'Above yield'}</em></div>
   <div><span>B16.5 flange limit, Class ${esc(S.cls)}</span><b>${r.flim!=null?r.flim+' bar':'–'}</b><em class="${fOk==null?'':fOk?'ok':'bad'}">${r.r38!=null?`1.5 × ${f1(r.r38)} bar (38 °C rating), rounded up`:''}${fOk===false?' · exceeded':''}</em></div>
   <div><span>Water to fill ${f0(+S.len||0)} m</span><b>${(r.V).toFixed(2)} m³</b><em>${f0(r.W)} kg, ID ${f1(r.ID)} mm</em></div>
   <div><span>Wall used</span><b>${f1(r.t)} mm</b><em>${f1(r.tn)} mm nominal less ${S.mt}%</em></div>
  </div></div>
 ${msgs.map(([c,t])=>`<p class="hy-msg ${c}">${t}</p>`).join('')}
 <div class="hy-out">
  <div class="hy-card"><h3>How the test pressure is set</h3><ol>
   <li><b>B31.3 hydrostatic:</b> P<sub>T</sub> = 1.5 × P × S<sub>T</sub>/S, at every point in the system. S<sub>T</sub>/S is the ratio of allowable stress at test and design temperature, and may not be taken above 6.5.</li>
   <li><b>Yield limit:</b> if P<sub>T</sub> would stress the pipe above yield at test temperature, the test pressure may be reduced to the highest that does not.</li>
   <li><b>Static head:</b> the test pressure is the minimum at the highest point; lower points see more, about 0.098 bar per metre of water.</li>
   <li><b>B31.3 pneumatic:</b> P<sub>T</sub> = 1.1 × P. <b>B31.1 hydrostatic:</b> P<sub>T</sub> = 1.5 × P.</li>
   <li><b>Flanged joints</b> to B16.5 may see a system test of up to 1.5 × their 38 °C rating, rounded up to the next 1 bar.</li></ol></div>
  <div class="hy-card"><h3>Before you test</h3><ul>
   <li>Vent at every high point and drain at every low point; fill slowly from the bottom so no air is trapped.</li>
   <li>Check supports and spring hangers: lock springs with their travel stops, and add temporary supports where the line full of water is heavier than the supports were designed for (gas and steam lines).</li>
   <li>Remove or isolate items that cannot take the test: control valves, relief valves, instruments, expansion joints and equipment with a lower test pressure.</li>
   <li>Hold the pressure long enough to inspect every joint (B31.3 asks for at least 10 minutes).</li>
   <li>Use water of suitable quality; for stainless steel keep chlorides low, and drain and dry afterwards.</li></ul></div>
 </div>`;
 bind();}

function bind(){
 const on=(id,k,f=v=>v)=>{const e=P.querySelector('#'+id);if(!e)return;e.onchange=()=>{S[k]=f(e.value);sv(k,S[k]);const y=scrollY;render();scrollTo(0,y);};};
 on('hyC','code');on('hyP','p',Number);on('hyT','t',Number);on('hyS','sch');on('hyM','mt',Number);on('hyST','st');on('hyS2','s');on('hyY','sy');
 on('hyG','g');on('hyF','cls');on('hyH','dh',Number);on('hyL','len',Number);
 const s=P.querySelector('#hyN');if(s)s.onchange=()=>{const t=scrollY;if(typeof setSel==='function')setSel(s.value);else render();scrollTo(0,t);};}
render();
window.renderHydro=()=>{const t=scrollY;render();scrollTo(0,t);};
window.__hydro={calc,S};
})();
