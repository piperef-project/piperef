/* Instrument tag decoder. Reads the letter tables from #tg-data (written by tools/tag.py). */
(function(){
const P=document.getElementById('p-tag');if(!P)return;
const dEl=document.getElementById('tg-data');if(!dEl)return;
const D=JSON.parse(dEl.textContent);
const q=P.querySelector('#tgQ'),out=P.querySelector('#tgOut');if(!q||!out)return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

function parse(raw){
  const s=raw.toUpperCase().replace(/[‐-―]/g,'-').trim().replace(/\s+/g,'-');
  if(!s)return null;
  const m=s.match(/^(?:(\d+[A-Z]?)[-_\/.]+)?([A-Z]{1,6})(?:[-_.]*(\d+))?(?:[-_.]?([A-Z]{1,2}))?(?:\/([A-Z]{1,2}))?$/);
  if(!m)return {bad:true,s};
  return {s,unit:m[1]||'',letters:m[2],loop:m[3]||'',suf:m[4]||'',alt:m[5]||''};
}

// ISA letter-by-letter decode
function decode(L){
  const parts=[],errs=[];const F=D.first[L[0]];
  if(!F){return {errs:[`"${L[0]}" is not a first letter.`],parts};}
  parts.push({l:L[0],role:'Measured variable',m:F[0],d:F[1]});
  let i=1,mod=null;
  const n=L.length,c=L[1];
  if(n>1){
    if(c==='D'||c==='J'||c==='Q')mod=c;
    else if(c==='F'&&n>2)mod='F';
    else if(c==='K'&&n>2&&'IRTAC'.includes(L[2]))mod='K';
    else if(c==='S'&&n===3&&'VE'.includes(L[2]))mod='S';
    else if(L[0]==='V'&&'XYZ'.includes(c))mod=c;
  }
  if(mod){parts.push({l:mod,role:'Modifier',m:D.mod[mod][0],d:D.mod[mod][1]});i=2;}
  const fns=[];
  for(;i<n;i++){
    const ch=L[i],prev=fns[fns.length-1];
    if(prev&&'AS'.includes(prev.l)&&D.fmod[ch]){prev.mods.push(ch);parts.push({l:ch,role:'Function modifier',m:D.fmod[ch],d:'Applies to the '+D.func[prev.l][0].toLowerCase()});continue;}
    const f=D.func[ch];
    if(!f){errs.push(`"${ch}" is not used as a following letter in the ISA scheme.`);parts.push({l:ch,role:'Not recognised',m:'—',d:'Check the project legend'});continue;}
    fns.push({l:ch,mods:[]});parts.push({l:ch,role:'Function',m:f[0],d:f[2]});
  }
  // name
  let v=F[0].toLowerCase();
  if(F[0]==="User's choice")v=`"${L[0]}" (user's choice)`;
  if(mod){const mm={D:'differential '+v,F:v+' ratio',J:v+' scanning',K:v+' rate-of-change',Q:v+' totalising',S:v+' safety',X:v+' X-axis',Y:v+' Y-axis',Z:v+' Z-axis'}[mod];v=mm;}
  const words=[v];
  fns.forEach((f,k)=>{const fx=D.func[f.l];words.push((k===fns.length-1?fx[0]:fx[1]).toLowerCase());
    if(f.mods.length){const w=f.mods.map(x=>D.fmod[x].toLowerCase());words.push(f.mods.length===2&&f.mods[0]===f.mods[1]?w[0]+'-'+w[1]:w.join(' and '));}});
  const seen={};let rep=false;fns.forEach(f=>{if(seen[f.l])rep=true;seen[f.l]=1;});
  const bad=parts.some(x=>x.role==='Not recognised');
  if(rep||fns.length>3)errs.push('This is an unusual letter combination.');
  if(!fns.length){errs.push('No function letter after the variable, so this tag is incomplete.');if(mod==='Q')words.splice(0,1,v.replace('totalising','totaliser'));}
  return {name:bad||rep||fns.length>3?'Not a standard ISA tag':cap(words.join(' ')),parts,errs,fns:fns.map(f=>f.l),mod,first:L[0]};
}

function pipingNotes(L,r){
  const n=[],f=r?r.fns||[]:[],has=x=>f.includes(x),v=L[0];
  const valveConv=['SDV','ESDV','BDV','MOV','ROV','SOV'].includes(L);
  if(L==='PSV'||L==='PRV'||L==='TSV'||(r&&r.mod==='S'&&has('V')))n.push('Keep the inlet pressure loss low (a common limit is 3% of set pressure), slope the outlet to drain, and support the outlet line for the reaction force when it opens.');
  else if(L==='PSE'||(r&&r.mod==='S'&&has('E')))n.push('A rupture disc sits between flanges in its own holder: allow for the holder in the spool length and for access to replace it.');
  else if(valveConv||(has('V')&&L!=='HV')||L==='XV')n.push(has('C')||L==='PCV'?'Control valve station: block valves either side, a bypass if the process needs one, drains, reducers to the valve size and clear access to remove the valve and actuator.':
      'Automated valve: allow for the actuator size, the limit switches and access for maintenance. Check whether the valve must be close to the equipment it isolates.');
  else if(L==='HV')n.push('Allow access so the valve can be operated, and room for any actuator if it is remote-operated.');
  if((v==='F'&&has('E'))||L==='FE')n.push('Flow elements need straight pipe before and after them. Take the number of diameters from the meter datasheet; elbows, reducers and control valves upstream need the most.');
  if(has('O')||L==='RO')n.push('Restriction orifice: a plate held between two flanges. Allow for the plate and gaskets in the spool length, and for noise or vibration downstream on large pressure drops.');
  if(has('W')||(v==='T'&&(has('E')||has('I')||has('T'))&&!has('V')))n.push('Temperature: the element sits in a thermowell. Check the line is big enough for the insertion length; small lines are often enlarged locally at the thermowell.');
  if(v==='L'&&(has('G')||L==='LG'))n.push('Gauge glass: the vessel nozzle elevations set the visible range. Leave room to read it and to drain it, often on a level bridle.');
  else if(v==='L'&&(has('T')||has('E')))n.push('Level instruments: the nozzle elevations on the vessel or bridle set the range, so agree them with the instrument engineer before nozzle orientation is frozen.');
  if(v==='P'&&!has('V')&&!has('E')&&(has('I')||has('T')||has('S')||L==='PG'))n.push('Pressure tapping: a root valve at the pipe. Take gas taps from the top and liquid taps from the side, and keep the gauge or transmitter readable from grade or a platform.');
  if(v==='A'&&(has('T')||has('E')))n.push('Analysers often need a sample probe or sample point with a short, fast sample line. Check the analyser hook-up and the shelter location.');
  if(L==='SP')n.push('Sample point: put it where the operator can reach it safely, with a drain for flushing, and close to the process line.');
  if(v==='Z'&&(has('S')||L==='ZSO'||L==='ZSC'))n.push('Limit switches mount on the valve actuator: no extra piping, but keep access around the actuator.');
  if(!n.length&&'PTFL'.includes(v)&&f.some(x=>'AS'.includes(x)))n.push('Mostly a control-system item. If it is a separate field switch it still needs a tapping point, like any other instrument.');
  return n;
}

function render(){
  const p=parse(q.value);
  if(!p){out.innerHTML='';return;}
  if(p.bad){out.innerHTML=`<div class="tg-res"><p class="tg-err">That does not look like an instrument tag. Use letters then a number, e.g. <b>FIC-101</b> or <b>10-PT-2001A</b>.</p></div>`;return;}
  const L=p.letters,conv=D.conv[L],sp=D.special[L];
  const r=conv?null:decode(L);
  const name=conv?conv[0]:sp?sp[0]:r.name;
  const meta=[];
  if(p.loop)meta.push(`<span><b>Loop ${esc(p.loop)}</b> shared by every item in this loop</span>`);
  if(p.unit)meta.push(`<span><b>Unit ${esc(p.unit)}</b> plant area or unit prefix</span>`);
  if(p.suf)meta.push(`<span><b>Suffix ${esc(p.suf)}${p.alt?' / '+esc(p.alt):''}</b> one of identical items${p.alt?' (both listed)':''}</span>`);
  let h=`<div class="tg-res"><div class="tg-top"><span class="tg-big">${esc(p.s)}</span><b class="tg-name">${esc(name)}</b>`;
  if(conv)h+=`<span class="tg-badge">Project tag</span>`;
  h+=`</div>`;
  if(meta.length)h+=`<div class="tg-meta">${meta.join('')}</div>`;
  if(conv)h+=`<p class="tg-note">${esc(conv[1])}</p>`;
  else{
    h+=`<div class="tg-tw"><table class="tg-t tg-bd"><thead><tr><th>Letter</th><th>Position</th><th>Means</th><th>Notes</th></tr></thead><tbody>`+
      r.parts.map(x=>`<tr${x.role==='Not recognised'?' class="tg-x"':''}><td><b>${esc(x.l)}</b></td><td>${esc(x.role)}</td><td>${esc(x.m)}</td><td>${esc(x.d)}</td></tr>`).join('')+`</tbody></table></div>`;
    if(sp)h+=`<p class="tg-note">${esc(sp[1])}</p>`;
    r.errs.forEach(e=>h+=`<p class="tg-err">${esc(e)} Your project legend may define it.</p>`);
  }
  if(!p.loop)h+=`<p class="tg-hint">Add the loop number too, e.g. ${esc(L)}-101.</p>`;
  const pn=r&&r.name==='Not a standard ISA tag'?[]:pipingNotes(L,r);
  if(pn.length)h+=`<div class="tg-pip"><b>For the piping designer</b><ul>${pn.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  out.innerHTML=h+'</div>';
}
q.addEventListener('input',render);
P.addEventListener('click',e=>{const b=e.target.closest('.tg-ex');if(!b)return;q.value=b.dataset.tag;render();q.scrollIntoView({block:'nearest',behavior:'smooth'});});
render();
window.__tag={parse,decode,pipingNotes};
})();
