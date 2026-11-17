/* Pipe cut length: centre-to-centre (or to face of flange) minus fitting take-outs and weld gaps, with a cut list.
   Globals from app.js: BW, BWN, SW, SWN, FL, CLASSES, PIPEMAP, store. Fitting dimensions: ASME B16.9, B16.11, B16.5. */
(function(){
const P=document.getElementById('p-cut');if(!P)return;
if(!document.getElementById('cut-css')){const st=document.createElement('style');st.id='cut-css';st.textContent=`
#p-cut .cl-g{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:18px;align-items:start}
#p-cut .cl-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-cut .cl-card h2{font-size:17px;margin:0 0 4px}#p-cut .cl-card>p.sub{margin:0 0 12px;font-size:13px;color:var(--muted)}
#p-cut .cl-f{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px 12px}
#p-cut .cl-f label{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:600;color:var(--ink-2);min-width:0}
#p-cut .cl-f select,#p-cut .cl-f input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,8px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);width:100%;box-sizing:border-box}
#p-cut .cl-f .w2{grid-column:span 2}
#p-cut .cl-end{border:1px solid var(--rule);border-radius:12px;padding:10px 12px;margin-top:12px}
#p-cut .cl-end>b{display:block;font-size:13px;margin-bottom:8px}
#p-cut .cl-seg{display:inline-flex;border:1px solid var(--rule-strong);border-radius:8px;overflow:hidden}
#p-cut .cl-seg button{border:0;background:var(--sheet);color:var(--ink-2);font:inherit;font-size:13px;font-weight:600;padding:7px 12px;cursor:pointer}
#p-cut .cl-seg button[aria-pressed=true]{background:var(--accent);color:#fff}
#p-cut .cl-res{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:12px;background:rgba(24,73,169,.07);margin:14px 0 10px}
#p-cut .cl-res span{font-size:13px;color:var(--muted);width:100%}
#p-cut .cl-res b{font-size:32px;color:var(--accent);font-variant-numeric:tabular-nums;line-height:1.1}
#p-cut .cl-res i{font-style:normal;font-size:15px;color:var(--ink-2);font-variant-numeric:tabular-nums}
#p-cut .cl-res.bad{background:rgba(180,35,24,.08)}#p-cut .cl-res.bad b{color:#B42318}
#p-cut .cl-t{width:100%;border-collapse:collapse;font-size:13.5px;min-width:0!important}
#p-cut .cl-t td{padding:6px 6px;border-bottom:1px solid var(--rule);white-space:normal;text-align:left}
#p-cut .cl-t td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-cut .cl-t tr.tot td{font-weight:700;border-top:2px solid var(--rule-strong)}
#p-cut .cl-fig{display:block;width:100%;height:auto;border:1px solid var(--rule);border-radius:10px;background:#FAFBFD;color:#1F2937;margin-bottom:10px}
#p-cut .cl-fig text{font:600 12px Geist,system-ui,sans-serif;fill:#1F2937;stroke:none}#p-cut .cl-fig .d{fill:#1849A9}#p-cut .cl-fig .m{fill:#5B6B80;font-weight:500}
[data-theme=dark] #p-cut .cl-fig{background:#EEF2F7}
#p-cut .cl-note{font-size:12.5px;color:var(--muted);line-height:1.5;margin:8px 0 0}
#p-cut .cl-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
#p-cut .cl-btn{height:36px;padding:0 14px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13.5px;font-weight:600;cursor:pointer}
#p-cut .cl-btn.pri{background:var(--accent);border-color:var(--accent);color:#fff}
#p-cut .cl-list{margin-top:18px}
#p-cut .cl-lw{overflow-x:auto;border:1px solid var(--rule);border-radius:12px;background:var(--sheet)}
#p-cut .cl-lt{width:100%;border-collapse:collapse;font-size:13.5px;min-width:640px}
#p-cut .cl-lt th,#p-cut .cl-lt td{padding:8px 10px;border-bottom:1px solid var(--rule);text-align:left;white-space:nowrap}
#p-cut .cl-lt th{font-size:12px;color:var(--muted);font-weight:600}
#p-cut .cl-lt td.n{text-align:right;font-variant-numeric:tabular-nums}
#p-cut .cl-lt td.x button{border:0;background:none;color:var(--muted);font-size:17px;cursor:pointer}
#p-cut .cl-empty{padding:16px;font-size:13.5px;color:var(--muted)}
@media (max-width:900px){#p-cut .cl-g{grid-template-columns:1fr}}
@media print{#p-cut .cl-g>.cl-card:first-child,#p-cut .cl-btns,#p-cut .cl-lt td.x,#p-cut .phead p{display:none}}
`;document.head.appendChild(st);}

const IN=25.4;
const FIT=[
 ['none','Plain end (no fitting)'],
 ['lr90','90° LR elbow (B16.9)'],['sr90','90° SR elbow (B16.9)'],['d390','90° 3D elbow'],['lr45','45° LR elbow (B16.9)'],['tee','Tee, run or branch (equal)'],
 ['wn','Weld neck flange, to face (B16.5)'],
 ['sw90','90° SW elbow (B16.11)'],['sw45','45° SW elbow (B16.11)'],['swtee','SW tee (B16.11)'],
 ['cus','Other: enter take-out']];
const ld=(k,d)=>{try{const v=store.get(k,d);return v==null?d:v}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
const S=Object.assign({n:'6',u:'mm',cc:'2000',a:'lr90',b:'lr90',cls:'150',rat:'3000',gap:'3',bo:'1.6',ca:'0',cb:'0',wa:'1',wb:'1',ffw:'0',lbl:''},JSON.parse(ld('cut','{}')||'{}'));
let LIST=[];try{LIST=JSON.parse(ld('cut_list','[]'))||[]}catch(e){LIST=[]}
const save=()=>{sv('cut',JSON.stringify(S));sv('cut_list',JSON.stringify(LIST));};
const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const SIZES=BWN.filter(n=>NUM(n)>=0.5&&PIPEMAP[n]);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const frac=inch=>{if(!isFinite(inch))return '—';const neg=inch<0;let x=Math.round(Math.abs(inch)*16);const w=Math.floor(x/16);let f=x%16,d=16;while(f&&f%2===0){f/=2;d/=2;}
 const ft=Math.floor(w/12),i=w%12;const s=(ft?ft+"′ ":'')+(i||!ft||f?i:'')+(f?(i||ft?' ':'')+f+'/'+d:'')+'″';return (neg?'−':'')+s.replace(/^0 (\d)/,'$1');};
const mm1=x=>isFinite(x)?(Math.round(x*10)/10).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:1}):'—';

/* take-out of one end, in mm: {to, gap, txt, ok} */
function end(kind,custom,weld){
 const n=S.n,gap=+S.gap||0,bo=+S.bo||0,i=BWN.indexOf(n);
 if(kind==='none')return {to:0,gap:0,txt:'Plain end',ok:true};
 if(kind==='cus')return {to:+custom||0,gap:weld==='1'?gap:0,txt:'Take-out entered'+(weld==='1'?', butt weld':''),ok:true};
 if(['lr90','sr90','d390','lr45','tee'].includes(kind)){const v=BW[kind][i];if(v==null)return {ok:false,txt:'Not made in NPS '+n};
  const lab={lr90:'A (centre to end)',sr90:'A (centre to end)',d390:'centre to end',lr45:'B (centre to end)',tee:'C (centre to end)'}[kind];return {to:v*IN,gap,txt:`${lab} ${mm1(v*IN)} mm`,ok:true};}
 if(kind==='wn'){const f=FL[S.cls],j=f&&f.nps.indexOf(n);if(!f||j<0)return {ok:false,txt:`No B16.5 Class ${S.cls} flange in NPS ${n}`};
  const y=f.Y[j],rf=(+S.cls>=400)?0.25:0;return {to:(y+rf)*IN,gap,txt:`Y ${mm1(y*IN)} mm${rf?' + 6.4 mm raised face':''} (to face)`,ok:true};}
 if(kind.startsWith('sw')){const k=SWN.indexOf(n);if(k<0||NUM(n)>4)return {ok:false,txt:'Socket weld fittings go up to NPS 4 (B16.11)'};
  const key=(kind==='sw45'?'C':'A')+S.rat,v=SW[key][k];if(v==null)return {ok:false,txt:`Not listed for Class ${S.rat} in NPS ${n}`};
  return {to:v*IN+bo,gap:0,txt:`${kind==='sw45'?'C':'A'} ${mm1(v*IN)} mm to socket bottom + ${bo} mm gap`,ok:true,sw:true};}
 return {ok:false,txt:''};}

function calc(){
 const cc=(+S.cc||0)*(S.u==='in'?IN:1),A=end(S.a,S.ca,S.wa),B=end(S.b,S.cb,S.wb),ffw=+S.ffw||0;
 if(!A.ok||!B.ok)return {cc,A,B,err:(!A.ok?'End A: '+A.txt:'End B: '+B.txt)};
 const cut=cc-A.to-B.to-A.gap-B.gap+ffw;return {cc,A,B,ffw,cut};}

function fig(r){
 const lab=k=>(FIT.find(f=>f[0]===k)||['',''])[1].replace(/ \(.*\)/,'');
 const sym=(x,k,side)=>{const s=side;if(k==='none')return `<path d="M${x} 64V96" stroke="#1F2937" stroke-width="1.5"/>`;
  if(k==='wn')return `<path d="M${x+s*0} 50V110" stroke="#1F2937" stroke-width="5"/><path d="M${x+s*0} 70L${x+s*18} 76V84L${x} 90" fill="#E9EEF5" stroke="#1F2937" stroke-width="1.5"/>`;
  if(k==='tee'||k==='swtee')return `<path d="M${x-s*40} 64H${x+s*0}M${x-s*40} 96H${x}" stroke="#1F2937" stroke-width="2"/><path d="M${x-s*30} 64V30M${x-s*10} 64V30" stroke="#1F2937" stroke-width="2"/>`;
  return `<path d="M${x} 64Q${x-s*40} 64 ${x-s*40} 24M${x} 96Q${x-s*72} 96 ${x-s*72} 24" fill="none" stroke="#1F2937" stroke-width="2"/>`;};
 const xa=150,xb=610,ga=r.A.gap?6:0,gb=r.B.gap?6:0;
 const ca=S.a==='wn'?xa-18:xa-54,cb=S.b==='wn'?xb+18:xb+54;
 return `<svg class="cl-fig" viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cut length sketch">
 ${sym(xa,S.a,1)}${sym(xb,S.b,-1)}
 <rect x="${xa+ga}" y="64" width="${xb-xa-ga-gb}" height="32" fill="#E9EEF5" stroke="#1849A9" stroke-width="2"/>
 <text x="${(xa+xb)/2}" y="85" text-anchor="middle" class="d">Cut length ${r.err?'—':mm1(r.cut)+' mm'}</text>
 <path d="M${ca} 140H${cb}" stroke="#1F2937" stroke-width="1"/><path d="M${ca} 128V150M${cb} 128V150" stroke="#1F2937" stroke-width="1"/>
 <text x="${(ca+cb)/2}" y="134" text-anchor="middle">${S.a==='wn'||S.b==='wn'?'Dimension':'Centre to centre'} ${mm1(r.cc)} mm</text>
 <path d="M${ca} 165H${xa}" stroke="#1849A9"/><text x="${(ca+xa)/2}" y="182" text-anchor="middle" class="d" style="font-size:11px">${r.A.ok?mm1(r.A.to):'—'}</text>
 <path d="M${xb} 165H${cb}" stroke="#1849A9"/><text x="${(xb+cb)/2}" y="182" text-anchor="middle" class="d" style="font-size:11px">${r.B.ok?mm1(r.B.to):'—'}</text>
 <path d="M${ca} 158V172M${xa} 158V172M${xb} 158V172M${cb} 158V172" stroke="#1849A9" stroke-width=".8"/>
 <text x="20" y="20" class="m">End A: ${esc(lab(S.a))}</text><text x="740" y="20" text-anchor="end" class="m">End B: ${esc(lab(S.b))}</text></svg>`;}

function endBox(e,key,cus,weld){
 return `<div class="cl-end"><b>End ${e}</b><div class="cl-f"><label class="w2">Fitting<select data-k="${key}">${FIT.map(f=>`<option value="${f[0]}"${S[key]===f[0]?' selected':''}>${f[1]}</option>`).join('')}</select></label>
 ${S[key]==='cus'?`<label>Take-out, mm<input data-k="${cus}" type="number" step="0.1" value="${esc(S[cus])}"></label><label>Butt weld at this end<select data-k="${weld}"><option value="1"${S[weld]==='1'?' selected':''}>Yes, add root gap</option><option value="0"${S[weld]==='0'?' selected':''}>No</option></select></label>`:''}</div></div>`;}

function render(){
 const r=calc(),ok=!r.err&&r.cut>0;
 const needCls=S.a==='wn'||S.b==='wn',needRat=S.a.startsWith('sw')||S.b.startsWith('sw');
 const tot=LIST.reduce((a,x)=>a+x.cut,0);
 P.innerHTML=`<div class="phead"><div><h1>Pipe cut length calculator</h1><p>Enter the dimension from the isometric and the fitting at each end. It subtracts the fitting take-outs (ASME B16.9, B16.11, B16.5) and the weld gaps, and builds a cut list you can copy or print.</p></div></div>
 <div class="cl-g">
  <div class="cl-card"><h2>Piece</h2><p class="sub">Dimension is centre to centre for elbows and tees, and to the flange face for weld neck flanges.</p>
   <div class="cl-f">
    <label>Pipe size<select data-k="n">${SIZES.map(n=>`<option value="${n}"${n===S.n?' selected':''}>NPS ${n}</option>`).join('')}</select></label>
    <label>Dimension on iso<input data-k="cc" type="number" min="0" step="any" value="${esc(S.cc)}"></label>
    <label>Units<span class="cl-seg" data-g="u"><button type="button" data-v="mm" aria-pressed="${S.u==='mm'}">mm</button><button type="button" data-v="in" aria-pressed="${S.u==='in'}">inch</button></span></label>
    <label>Butt weld root gap, mm<input data-k="gap" type="number" min="0" max="6" step="0.1" value="${esc(S.gap)}"></label>
    ${needCls?`<label>Flange class<select data-k="cls">${CLASSES.map(c=>`<option${c===S.cls?' selected':''}>${c}</option>`).join('')}</select></label>`:''}
    ${needRat?`<label>SW fitting class<select data-k="rat"><option${S.rat==='3000'?' selected':''}>3000</option><option${S.rat==='6000'?' selected':''}>6000</option></select></label><label>Socket gap, mm<input data-k="bo" type="number" min="0" max="3" step="0.1" value="${esc(S.bo)}"></label>`:''}
    <label>Extra length (field fit), mm<input data-k="ffw" type="number" min="0" step="10" value="${esc(S.ffw)}"></label>
   </div>
   ${endBox('A','a','ca','wa')}${endBox('B','b','cb','wb')}
  </div>
  <div class="cl-card"><h2>Result</h2>
   <div class="cl-res${ok?'':' bad'}"><span>Cut length</span>${r.err?`<b style="font-size:18px">${esc(r.err)}</b>`:`<b>${mm1(r.cut)} mm</b><i>${frac(r.cut/IN)} · ${(r.cut/IN).toFixed(2)} in</i>`}</div>
   ${!r.err&&r.cut<=0?'<p class="cl-note" style="color:#B42318">The fittings take up more than the dimension. Check the dimension, or the fittings are fitting-to-fitting with no pipe.</p>':''}
   ${fig(r)}
   <table class="cl-t"><tbody>
    <tr><td>Dimension</td><td class="n">${mm1(r.cc)} mm</td></tr>
    <tr><td>End A take-out<br><small style="color:var(--muted)">${esc(r.A.txt||'')}</small></td><td class="n">− ${r.A.ok?mm1(r.A.to):'—'}</td></tr>
    <tr><td>End B take-out<br><small style="color:var(--muted)">${esc(r.B.txt||'')}</small></td><td class="n">− ${r.B.ok?mm1(r.B.to):'—'}</td></tr>
    <tr><td>Weld gaps (${(r.A.gap?1:0)+(r.B.gap?1:0)} butt weld${(r.A.gap?1:0)+(r.B.gap?1:0)===1?'':'s'} × ${S.gap} mm)</td><td class="n">− ${mm1((r.A.gap||0)+(r.B.gap||0))}</td></tr>
    ${+S.ffw?`<tr><td>Field fit extra length</td><td class="n">+ ${mm1(+S.ffw)}</td></tr>`:''}
    <tr class="tot"><td>Cut length</td><td class="n">${r.err?'—':mm1(r.cut)+' mm'}</td></tr>
   </tbody></table>
   <div class="cl-f" style="margin-top:12px"><label class="w2">Piece mark (optional)<input data-k="lbl" maxlength="30" placeholder="e.g. SP-01 / P3" value="${esc(S.lbl)}"></label></div>
   <div class="cl-btns"><button class="cl-btn pri" type="button" data-a="add"${ok?'':' disabled'}>Add to cut list</button>${window.shareChat&&ok?'<button class="cl-btn" type="button" data-a="chat">Copy for chat</button>':''}</div>
   <p class="cl-note">Weld neck take-out is the length through hub Y to the raised face (Class 400 and above add the 6.4 mm raised face). Socket weld: pipe stops the gap short of the socket bottom. Check root gap and any shrinkage allowance against your WPS and fabrication procedure.</p>
  </div>
 </div>
 <section class="cl-list"><div class="cl-card"><h2>Cut list <span style="font-weight:500;color:var(--muted);font-size:14px">${LIST.length} piece${LIST.length===1?'':'s'}${LIST.length?` · total ${mm1(tot)} mm (${(tot/1000).toFixed(2)} m)`:''}</span></h2>
  ${LIST.length?`<div class="cl-lw"><table class="cl-lt"><thead><tr><th>#</th><th>Mark</th><th>NPS</th><th>End A</th><th>End B</th><th style="text-align:right">Dimension, mm</th><th style="text-align:right">Cut, mm</th><th style="text-align:right">Cut, in</th><th></th></tr></thead><tbody>
  ${LIST.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.lbl||'')}</td><td>${esc(x.n)}</td><td>${esc(x.a)}</td><td>${esc(x.b)}</td><td class="n">${mm1(x.cc)}</td><td class="n"><b>${mm1(x.cut)}</b></td><td class="n">${frac(x.cut/IN)}</td><td class="x"><button type="button" data-del="${i}" aria-label="Remove piece ${i+1}">×</button></td></tr>`).join('')}
  </tbody></table></div>
  <div class="cl-btns"><button class="cl-btn" type="button" data-a="csv">Download CSV</button><button class="cl-btn" type="button" data-a="copy">Copy table</button><button class="cl-btn" type="button" data-a="print">Print</button><button class="cl-btn" type="button" data-a="clear">Clear list</button></div>`
  :`<p class="cl-empty">Pieces you add appear here, with totals per size. The list stays in this browser only.</p>`}
 </div></section>`;
 bind();}

const lab=k=>(FIT.find(f=>f[0]===k)||['',''])[1].replace(/ \(.*\)/,'').replace(', to face','');
function rows(){return [['#','Mark','NPS','End A','End B','Dimension mm','Cut mm','Cut in']].concat(LIST.map((x,i)=>[i+1,x.lbl||'',x.n,x.a,x.b,mm1(x.cc).replace(/,/g,''),mm1(x.cut).replace(/,/g,''),frac(x.cut/IN)]));}
function bind(){
 P.querySelectorAll('[data-k]').forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',()=>{S[el.dataset.k]=el.value;save();
  if(el.tagName==='INPUT'){clearTimeout(bind.t);bind.t=setTimeout(()=>{const k=el.dataset.k,pos=el.selectionStart;render();const n=P.querySelector(`[data-k="${k}"]`);if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}}},350);}else render();}));
 P.querySelectorAll('.cl-seg').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;
  if(g.dataset.g==='u'&&b.dataset.v!==S.u){const v=+S.cc;if(isFinite(v)&&v)S.cc=String(S.u==='mm'?+(v/IN).toFixed(3):+(v*IN).toFixed(1));S.u=b.dataset.v;}save();render();}));
 P.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{LIST.splice(+b.dataset.del,1);save();render();}));
 P.querySelectorAll('[data-a]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.a,r=calc();
  if(a==='add'&&!r.err&&r.cut>0){LIST.push({lbl:S.lbl,n:S.n,a:lab(S.a)+(S.a==='cus'?' '+S.ca+' mm':''),b:lab(S.b)+(S.b==='cus'?' '+S.cb+' mm':''),cc:r.cc,cut:r.cut});S.lbl='';save();render();}
  if(a==='chat'&&window.shareChat)window.shareChat({title:`Pipe cut length, NPS ${S.n}`,sub:`${lab(S.a)} to ${lab(S.b)}`,rows:[['Dimension',mm1(r.cc)+' mm'],['Take-outs',mm1(r.A.to)+' + '+mm1(r.B.to)+' mm'],['Weld gaps',mm1(r.A.gap+r.B.gap)+' mm'],['Cut length',mm1(r.cut)+' mm ('+frac(r.cut/IN)+')']],note:'ASME B16.9 / B16.11 / B16.5 take-outs. Check against your fabrication procedure.'});
  if(a==='csv'){const csv=rows().map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');const u=URL.createObjectURL(new Blob([csv],{type:'text/csv'})),l=document.createElement('a');l.href=u;l.download='cut-list.csv';document.body.appendChild(l);l.click();setTimeout(()=>{URL.revokeObjectURL(u);l.remove();},500);}
  if(a==='copy'){const t=rows().map(r=>r.join('\t')).join('\n');navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy table',1500);});}
  if(a==='print')window.print();
  if(a==='clear'&&confirmClear(b)){LIST=[];save();render();}}));}
function confirmClear(b){if(b.dataset.sure)return true;b.dataset.sure=1;b.textContent='Tap again to clear';setTimeout(()=>{if(b.isConnected){delete b.dataset.sure;b.textContent='Clear list';}},2500);return false;}
render();
window.renderCUT=()=>{};
})();
