/* Refinery units for piping engineers: scroll-driven walk-through plus reading view. All diagrams drawn here as SVG. */
const P=document.getElementById('p-refinery');
if(!document.getElementById('rf-css')){const st=document.createElement('style');st.id='rf-css';st.textContent=`
#p-refinery{--pb-top:56px}
#p-refinery .pb-bar{position:sticky;top:var(--pb-top);z-index:5;height:3px;margin:0 -32px;background:transparent}
#p-refinery .pb-bar i{display:block;height:100%;width:0;background:var(--accent);transition:width .1s linear}
#p-refinery[data-mode=read] .pb-bar{display:none}
#p-refinery .pb-mode{display:inline-flex;padding:3px;border:1px solid var(--rule);border-radius:99px;background:var(--paper,var(--sheet));gap:2px}
#p-refinery .pb-mode button{border:0;background:none;font:inherit;font-size:13.5px;font-weight:600;color:var(--muted);padding:7px 14px;border-radius:99px;cursor:pointer;display:flex;align-items:center;gap:6px}
#p-refinery .pb-mode button[aria-pressed=true]{background:var(--sheet);color:var(--ink);box-shadow:0 1px 3px rgba(15,27,45,.14)}
#p-refinery .pb-mode svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#p-refinery .pb-toc{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 8px}
#p-refinery .pb-toc a{font-size:13px;padding:5px 11px;border:1px solid var(--rule);border-radius:99px;color:var(--ink-2);text-decoration:none;background:var(--sheet)}
#p-refinery .pb-toc a:hover{border-color:var(--accent);color:var(--accent)}
#p-refinery .pb-toc a.on{border-color:var(--accent);color:var(--accent);background:var(--accent-soft,#EEF3FD)}
#p-refinery .pb-part{margin:34px 0 6px;font-size:22px;letter-spacing:-.01em}
#p-refinery .pb-part+p{margin:0 0 6px;color:var(--muted);font-size:14.5px;max-width:70ch}
/* story scenes */
#p-refinery .pb-sc{position:relative;height:calc(var(--n)*58vh + 100vh);margin:0}
#p-refinery .pb-stk{position:sticky;top:calc(var(--pb-top) + 3px);height:calc(100vh - var(--pb-top) - 3px);display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,1fr);gap:28px;align-items:center;padding:14px 0}
#p-refinery .pb-fig{height:100%;min-height:0;display:flex;align-items:center;justify-content:center;border:1px solid var(--rule);border-radius:16px;background:var(--paper,#F7F9FC);padding:14px;position:relative;overflow:hidden}
#p-refinery .pb-fig svg{width:100%;height:100%;max-height:100%;display:block}
#p-refinery .pb-one{display:none;width:100%;height:100%}#p-refinery .pb-one.on{display:block;animation:pbfade .35s ease}
#p-refinery .pb-row2 .pb-fig{aspect-ratio:auto}#p-refinery .pb-row2 .pb-fig svg{height:auto}#p-refinery .pb-row2 p{font-size:15.5px}
#p-refinery .pb-txt{min-width:0;max-height:100%;overflow:hidden;display:flex;flex-direction:column}
#p-refinery .pb-txt h2{margin:0 0 4px;font-size:23px;line-height:1.2;letter-spacing:-.01em}
#p-refinery .pb-txt>p{margin:0 0 14px;color:var(--muted);font-size:14px;line-height:1.5}
#p-refinery .pb-steps{list-style:none;margin:0;padding:0;counter-reset:s}
#p-refinery .pb-steps>li{border-left:2px solid var(--rule);padding:0 0 0 14px;position:relative}
#p-refinery .pb-steps>li.on{border-left-color:var(--accent)}
#p-refinery .pb-sh{display:block;width:100%;text-align:left;border:0;background:none;font:inherit;font-size:14.5px;font-weight:600;color:var(--muted);padding:6px 0;cursor:pointer;line-height:1.35}
#p-refinery .pb-steps>li.on .pb-sh{color:var(--ink);font-size:17px}
#p-refinery .pb-steps>li.done .pb-sh{color:var(--ink-2)}
#p-refinery .pb-sb{display:none;padding:0 0 12px;font-size:15px;line-height:1.6;color:var(--ink)}
#p-refinery .pb-steps>li.on .pb-sb{display:block;animation:pbin .35s ease}
#p-refinery .pb-sb p{margin:0 0 8px}
#p-refinery .pb-go{display:inline-block;font-size:13px;font-weight:600;color:var(--accent);text-decoration:none;margin-top:2px}
#p-refinery .pb-go:hover{text-decoration:underline}
/* chapter points */
#p-refinery .pb-pts{list-style:none;margin:0;padding:0}
#p-refinery .pb-pts li{padding:8px 0 8px 14px;border-left:2px solid var(--rule);font-size:15px;line-height:1.55;color:var(--muted);transition:color .25s,border-color .25s;cursor:pointer}
#p-refinery .pb-pts li.done{color:var(--ink-2)}
#p-refinery .pb-pts li.on{color:var(--ink);border-left-color:var(--accent)}
#p-refinery .pb-pts li b{color:inherit}
#p-refinery .pb-links{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px 14px}
#p-refinery .pb-cnt{display:none;font-size:12.5px;color:var(--muted);margin:6px 0 0;font-variant-numeric:tabular-nums}
@keyframes pbin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
/* read mode */
#p-refinery .pb-rd{margin:26px 0 8px;padding-top:4px}
#p-refinery .pb-rd h2{font-size:21px;margin:0 0 6px}
#p-refinery .pb-rd>p{color:var(--muted);margin:0 0 12px;font-size:14.5px}
#p-refinery .pb-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:22px;align-items:center;padding:16px 0;border-top:1px solid var(--rule)}
#p-refinery .pb-row .pb-fig{height:auto;aspect-ratio:4/3.3;padding:10px}
#p-refinery .pb-row h3{margin:0 0 6px;font-size:17px}
#p-refinery .pb-row p{margin:0 0 8px;font-size:15px;line-height:1.6}
#p-refinery .pb-rch{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:22px;align-items:start;border-top:1px solid var(--rule);padding-top:16px}
#p-refinery .pb-rch .pb-fig{height:auto;aspect-ratio:4/3;position:sticky;top:calc(var(--pb-top) + 14px)}
#p-refinery[data-mode=read] .pb-pts li{color:var(--ink);cursor:default;border-left-color:var(--rule)}
#p-refinery .pb-end{margin:34px 0 10px;padding:18px 20px;border:1px solid var(--rule);border-radius:14px;background:var(--paper,#F7F9FC)}
#p-refinery .pb-end h2{margin:0 0 6px;font-size:18px}#p-refinery .pb-end p{margin:0 0 6px;font-size:14.5px}
/* svg drawing */
#p-refinery svg text{font-family:var(--f-body,system-ui);fill:var(--ink-2)}
#p-refinery .pb-iso .lay{opacity:0;transition:opacity .35s ease}
#p-refinery .pb-iso .lay.on{opacity:1}
#p-refinery .pb-fig svg,#p-refinery .lay,#p-refinery .fg{--c:#5E6B7C;--pf:#F2F5F9;--tk:#E9EEF4}
#p-refinery .lay.now,#p-refinery .hl{--c:var(--accent);--pf:#E3ECFC;--tk:#E3ECFC}
[data-theme=dark] #p-refinery .pb-fig svg,[data-theme=dark] #p-refinery .lay,[data-theme=dark] #p-refinery .fg{--c:#9AABC2;--pf:#1C293D;--tk:#1F2D43}
[data-theme=dark] #p-refinery .lay.now,[data-theme=dark] #p-refinery .hl{--c:#7FA6F5;--pf:#22365A;--tk:#22365A}
#p-refinery .po{stroke:var(--c);fill:none;stroke-linejoin:round}
#p-refinery .pi{stroke:var(--pf);fill:none;stroke-linejoin:round}
#p-refinery .sf{fill:var(--pf);stroke:var(--c);stroke-width:1.3;stroke-linejoin:round}
#p-refinery .tk{fill:var(--tk);stroke:var(--c);stroke-width:1.4;stroke-linejoin:round}
#p-refinery .ln{stroke:var(--c);fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#p-refinery .lnt{stroke:var(--c);fill:none;stroke-width:1;stroke-linecap:round}
#p-refinery .dk{fill:var(--c)}
#p-refinery .grid{stroke:var(--rule);stroke-width:1;fill:none;opacity:.7}
#p-refinery .lab line{stroke:var(--c);stroke-width:1}
#p-refinery .lab circle{fill:var(--c)}
#p-refinery .lab text{font-size:15px;font-weight:650;fill:var(--c)}
#p-refinery .lab text.sub{font-weight:500;font-size:12.5px}
#p-refinery svg.f2 text{font-size:17px}#p-refinery svg.f2 .chipt{font-size:15px}
#p-refinery .pb-iso .lay .lab{display:none}
#p-refinery .pb-iso .lay.now .lab,#p-refinery .pb-iso .lay .lab.keep{display:inline}
#p-refinery .pb-iso .lay:not(.now) .lab.keep text{fill:var(--ink-2)}
#p-refinery .lab circle.prob{fill:none;stroke:#C2412A;stroke-width:1.8;stroke-dasharray:5 4}
#p-refinery .probt{fill:#C2412A!important;font-size:14px;font-weight:650}
#p-refinery .ok{stroke:#147A4A!important}#p-refinery .okt{fill:#147A4A!important}
#p-refinery .bad{stroke:#C2412A!important}#p-refinery .badt{fill:#C2412A!important}
#p-refinery .zone{fill:rgba(194,65,42,.08);stroke:#C2412A;stroke-width:1;stroke-dasharray:4 3}
#p-refinery .chipb{fill:var(--pf);stroke:var(--c);stroke-width:1.3}
#p-refinery .chipt{font-size:12px;font-weight:600;fill:var(--ink)!important}
#p-refinery .arr{fill:var(--c)}
#p-refinery .okf{fill:#147A4A}
#p-refinery svg text.tiny{font-size:11.5px}
#p-refinery svg text.rowt{font-size:16px;font-weight:700;fill:var(--ink)}
#p-refinery .pb-iso .base{--c:#5E6B7C;--pf:#F2F5F9}
[data-theme=dark] #p-refinery .pb-iso .base{--c:#9AABC2;--pf:#1C293D}
#p-refinery .pb-rch .pb-fig{aspect-ratio:auto}#p-refinery .pb-rch .pb-fig svg{height:auto}
#p-refinery .lay.now .dr{stroke-dasharray:1;stroke-dashoffset:1;animation:pbdraw .8s ease forwards}
#p-refinery .lay.now .fi{animation:pbfade .6s ease}
@keyframes pbdraw{to{stroke-dashoffset:0}}@keyframes pbfade{from{opacity:0}to{opacity:1}}
#p-refinery[data-mode=read] .dr,#p-refinery[data-mode=read] .fi{animation:none!important;stroke-dasharray:none!important}
@media (prefers-reduced-motion:reduce){#p-refinery .dr,#p-refinery .fi,#p-refinery .pb-sb{animation:none!important;stroke-dasharray:none!important}#p-refinery .pb-iso .lay{transition:none}}
@media (max-width:900px){
 #p-refinery .pb-bar{margin:0 -16px}
 #p-refinery .pb-stk{grid-template-columns:1fr;grid-template-rows:46% 54%;gap:10px;align-items:stretch;padding:8px 0}
 #p-refinery .pb-fig{padding:8px;border-radius:12px}
 #p-refinery .pb-txt{justify-content:flex-start}
 #p-refinery .pb-txt h2{font-size:19px}#p-refinery .pb-txt>p{display:none}
 #p-refinery .pb-steps>li:not(.on),#p-refinery[data-mode=story] .pb-pts li:not(.on){display:none}
 #p-refinery .pb-steps>li{border-left:0;padding:0}
 #p-refinery .pb-steps>li.on .pb-sh{font-size:16px;padding-top:2px}
 #p-refinery[data-mode=story] .pb-pts li{border-left:0;padding:2px 0;font-size:15.5px}
 #p-refinery .pb-cnt{display:block}
 #p-refinery .pb-row,#p-refinery .pb-rch{grid-template-columns:1fr}
 #p-refinery .pb-rch .pb-fig{position:static}
 #p-refinery .pb-mode button{padding:7px 11px}
 #p-refinery .pb-iso .lab text{font-size:25px}#p-refinery .pb-iso .lab text.sub{display:none}#p-refinery .pb-iso .probt{font-size:24px}
 #p-refinery .pb-iso .lay:not(.now) .lab.keep{display:none}
 #p-refinery svg.f2 text{font-size:18px}#p-refinery svg.f2 .chipt{font-size:15.5px}#p-refinery svg.f2 text.tiny{font-size:12px}#p-refinery svg.f2 text.rowt{font-size:17px}
}

#p-refinery svg text{font-family:var(--f-body,system-ui)}
#p-refinery .pb-fig svg,#p-refinery .lay{--c:#5E6B7C;--pf:#F2F5F9;--bx:#FFFFFF}
#p-refinery .lay.now,#p-refinery .hl{--c:var(--accent);--pf:#E3ECFC;--bx:#E8EFFD}
[data-theme=dark] #p-refinery .pb-fig svg,[data-theme=dark] #p-refinery .lay{--c:#9AABC2;--pf:#1C293D;--bx:#16233A}
[data-theme=dark] #p-refinery .lay.now,[data-theme=dark] #p-refinery .hl{--c:#7FA6F5;--pf:#22365A;--bx:#22365A}
#p-refinery .st{stroke:var(--c);fill:none;stroke-width:2.2;stroke-linejoin:round}
#p-refinery .st.big{stroke-width:5}#p-refinery .st.huge{stroke-width:9}#p-refinery .st.thin{stroke-width:1.5;stroke-dasharray:5 4}#p-refinery .st.h2{stroke-dasharray:7 5}
#p-refinery .st.jk{stroke:#E0B33A;stroke-width:10;opacity:.45}
#p-refinery .trace{stroke:#C2412A;stroke-width:1.6;stroke-dasharray:4 4;fill:none}
#p-refinery .ah{fill:var(--c)}
#p-refinery .eq{fill:var(--pf);stroke:var(--c);stroke-width:1.6;stroke-linejoin:round}
#p-refinery .tray{stroke:var(--c);stroke-width:1.2;fill:none}
#p-refinery .bed{fill:var(--c);opacity:.16}
#p-refinery .box{fill:var(--bx);stroke:var(--c);stroke-width:1.6}
#p-refinery .box.pool{fill:var(--pf)}
#p-refinery .bt{font-size:16px;font-weight:650;fill:var(--ink)}
#p-refinery .bs{font-size:13px;fill:var(--muted)}
#p-refinery .sl{font-size:13.5px;fill:var(--ink-2)}
#p-refinery .eqt{font-size:15px;fill:var(--ink-2);font-weight:550}
#p-refinery .mk{fill:var(--sheet);stroke:var(--c);stroke-width:2}
#p-refinery .mkt{font-size:15px;font-weight:700;fill:var(--c)}
#p-refinery .hl .mk{fill:var(--accent);stroke:var(--accent)}#p-refinery .hl .mkt{fill:#fff}
#p-refinery .zone{fill:rgba(194,65,42,.06);stroke:#C2412A;stroke-width:1.2;stroke-dasharray:5 4}
#p-refinery .badt{fill:#C2412A;font-size:13.5px}
#p-refinery .rf-bfd .lay{opacity:0;transition:opacity .35s ease}#p-refinery .rf-bfd .lay.on{opacity:1}
#p-refinery .rf-bfd .lay.now .bt{fill:var(--accent)}
#p-refinery .rf-cond{display:inline-block;padding:6px 10px;border-radius:8px;background:var(--accent-soft,#EEF3FD);color:var(--ink);font-size:14px;line-height:1.45}
#p-refinery .pb-pts li.wo{position:relative;padding-left:44px}
#p-refinery .rf-n{position:absolute;left:12px;top:9px;width:22px;height:22px;border-radius:50%;border:2px solid currentColor;display:grid;place-items:center;font-size:12px;font-weight:700}
#p-refinery .pb-pts li.on .rf-n{background:var(--accent);border-color:var(--accent);color:#fff}
#p-refinery .rf-note{font-size:13px!important;color:var(--muted)}
#p-refinery[data-mode=read] .pb-pts li{padding-top:10px;padding-bottom:10px}
#p-refinery #rf-map .pb-stk{grid-template-columns:minmax(0,2fr) minmax(280px,1fr)}
@media (max-width:900px){#p-refinery #rf-map .pb-stk,#p-refinery .pb-stk{grid-template-columns:1fr;grid-template-rows:56% 44%}#p-refinery[data-mode=story] .pb-pts li.wo{padding-left:34px}#p-refinery .rf-n{left:0;top:4px}}
`;document.head.appendChild(st);}
/* ===================================================================== drawing helpers (2D, svg units) */
const f1=n=>Math.round(n*10)/10;
const esc=s=>String(s);
const T=(x,y,t,c='',a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}"${c?` class="${c}"`:''}>${t}</text>`;
const TL=(x,y,lines,c='',a='middle',lh=20)=>lines.map((t,i)=>T(x,y+i*lh,t,c,a)).join('');
const AH=(x,y,ang)=>{const a=ang*Math.PI/180,p=(d,s)=>[x-Math.cos(a)*d+Math.cos(a+Math.PI/2)*s,y-Math.sin(a)*d+Math.sin(a+Math.PI/2)*s];const b=p(11,5.5),c=p(11,-5.5);return `<path class="ah" d="M${x} ${y}L${f1(b[0])} ${f1(b[1])}L${f1(c[0])} ${f1(c[1])}Z"/>`;};
/* orthogonal stream from points, arrow at the end */
const S=(pts,cls='st')=>{const d='M'+pts.map(p=>p.join(' ')).join('L');const [a,b]=[pts[pts.length-2],pts[pts.length-1]];const ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;return `<path class="${cls}" d="${d}"/>${AH(b[0],b[1],ang)}`;};
const G=(h,inner,extra='')=>`<g class="fg"${h!==''?` data-h="${h}"`:''}${extra}>${inner}</g>`;
const M=(n,x,y,h)=>G(h,`<circle class="mk" cx="${x}" cy="${y}" r="15"/>${T(x,y+5.5,n,'mkt')}`);
/* equipment symbols */
const col=(x,y,w,h,label)=>`<rect class="eq" x="${x}" y="${y}" width="${w}" height="${h}" rx="${w/2}"/>${Array.from({length:Math.max(2,Math.floor((h-w)/26))},(_,i)=>`<path class="tray" d="M${x+6} ${y+w/2+14+i*26}H${x+w-6}"/>`).join('')}${label?T(x+w/2,y+h+22,label,'eqt'):''}`;
const vess=(x,y,w,h,label,ly)=>`<rect class="eq" x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w,h)/2}"/>${label?T(x+w/2,ly??(y+h/2+5),label,'eqt'):''}`;
const furn=(x,y,w,h,label)=>`<path class="eq" d="M${x} ${y+h}V${y+24}L${x+w/2-14} ${y}H${x+w/2+14}L${x+w} ${y+24}V${y+h}Z"/><rect class="eq" x="${x+w/2-10}" y="${y-38}" width="20" height="38"/><path class="tray" d="M${x+14} ${y+h-16}${Array.from({length:5},(_,i)=>`L${x+14+(i%2?w-28:0)} ${y+h-16-(i+1)*((h-44)/5)}`).join('')}"/>${label?T(x+w/2,y+h+22,label,'eqt'):''}`;
const hx=(x,y,r=17)=>`<circle class="eq" cx="${x}" cy="${y}" r="${r}"/><path class="tray" d="M${x-r} ${y}l${r*.5} ${-r*.5}l${r*.5} ${r}l${r*.5} ${-r}l${r*.5} ${r*.5}"/>`;
const pump=(x,y,r=16)=>`<circle class="eq" cx="${x}" cy="${y}" r="${r}"/><path class="st" d="M${x} ${y-r}H${x+r+10}"/><path class="eq" d="M${x-r+2} ${y+r+8}L${x} ${y+r-2}L${x+r-2} ${y+r+8}Z"/>`;
const acool=(x,y,w)=>`<rect class="eq" x="${x}" y="${y}" width="${w}" height="26" rx="3"/>${[1,2].map(i=>`<ellipse class="tray" cx="${x+w*i/3}" cy="${y+38}" rx="${w/7}" ry="5"/>`).join('')}`;
const comp=(x,y)=>`<path class="eq" d="M${x-22} ${y-22}L${x+22} ${y-12}V${y+12}L${x-22} ${y+22}Z"/>`;
const bed=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="bed"/>`;
const tank=(x,y,w,h,label)=>`<path class="eq" d="M${x} ${y+12}Q${x+w/2} ${y-8} ${x+w} ${y+12}V${y+h}H${x}Z"/>${label?T(x+w/2,y+h+22,label,'eqt'):''}`;
const ground=(y,x0,x1)=>`<path class="tray" d="M${x0} ${y}H${x1}"/>`;

/* ===================================================================== block flow diagram, built a step at a time */
function BFD(){
 const B=(l,h,x,y,w,ht,lines,sub)=>`<g class="lay" data-l="${l}"><g class="u"${h?` data-u="${h}"`:''}><rect class="box" x="${x}" y="${y}" width="${w}" height="${ht}" rx="10"/>${TL(x+w/2,y+ht/2+(lines.length>1?-4:6),lines,'bt','middle',19)}${sub?T(x+w/2,y+ht-9,sub,'bs'):''}</g></g>`;
 const L=(l,inner)=>`<g class="lay" data-l="${l}">${inner}</g>`;
 const lab=(x,y,t,a='middle')=>T(x,y,t,'sl',a);
 let s=`<svg class="rf-bfd" viewBox="0 0 1100 800" role="img" aria-label="Block flow diagram of a refinery">`;
 /* 0 crude and desalter */
 s+=B(0,'',20,355,110,54,['Crude oil'])+B(0,'',165,355,105,54,['Desalter'])+L(0,S([[130,382],[163,382]])+S([[270,382],[300,382]]));
 /* 1 atmospheric column and its cuts */
 s+=`<g class="lay" data-l="1"><g class="u"><rect class="box" x="300" y="80" width="74" height="540" rx="37"/><text class="bt" transform="translate(343 350) rotate(-90)" text-anchor="middle">Atmospheric distillation</text></g>`;
 s+=S([[374,110],[438,110]])+lab(406,100,'Gas')+S([[374,220],[438,220]])+lab(406,210,'Naphtha')+S([[374,300],[438,300]])+lab(406,290,'Kerosene')+S([[374,380],[438,380]])+lab(406,370,'Diesel')+`<path class="st" d="M337 620V680H360"/>`+lab(337,700,'Atmospheric residue')+'</g>';
 /* 2 vacuum column */
 s+=L(2,S([[360,680],[438,680]]))+`<g class="lay" data-l="2"><g class="u"><rect class="box" x="440" y="470" width="74" height="230" rx="37"/><text class="bt" transform="translate(483 585) rotate(-90)" text-anchor="middle">Vacuum</text></g>`;
 s+=S([[514,500],[618,500]])+lab(566,490,'Vacuum gas oil')+S([[514,577],[618,577]])+lab(566,567,'Vacuum gas oil')+S([[514,660],[618,660]])+lab(566,650,'Vacuum residue')+'</g>';
 /* 3 hydrotreaters */
 s+=B(3,'',440,198,150,46,['Naphtha','hydrotreater'])+B(3,'',440,278,150,46,['Kerosene','treater'])+B(3,'',440,358,150,46,['Diesel','hydrotreater']);
 s+=L(3,S([[590,301],[948,301]])+lab(770,291,'Jet fuel')+S([[590,381],[948,381]])+lab(770,371,'Diesel'));
 /* 4 light ends: gas plant, isomerization, reformer */
 s+=B(4,'',440,88,150,44,['Gas plant'])+L(4,S([[590,110],[948,110]])+lab(770,100,'LPG'));
 s+=L(4,S([[590,212],[606,212],[606,163],[620,163]])+S([[590,232],[620,232]]));
 s+=B(4,'',622,141,150,44,['Isomerization'])+B(4,'',622,210,150,44,['Reformer']);
 s+=L(4,S([[772,163],[948,163]])+S([[772,232],[948,232]])+lab(860,153,'Gasoline')+lab(860,222,'Gasoline + H₂'));
 /* 5 conversion: hydrocracker, FCC, alkylation */
 s+=B(5,'',620,478,150,44,['Hydrocracker'])+L(5,S([[770,500],[948,500]])+lab(860,490,'Diesel, jet, naphtha'));
 s+=B(5,'',620,555,150,44,['FCC'])+L(5,S([[770,566],[800,566]])+S([[770,590],[948,590]])+lab(876,608,'Gasoline, cycle oil'));
 s+=B(5,'',802,544,120,40,['Alkylation'])+L(5,S([[922,564],[948,564]]));
 /* 6 bottom of the barrel */
 s+=B(6,'',620,638,150,44,['Delayed coker'])+L(6,S([[770,660],[948,660]])+lab(860,650,'Coke, gas oil'));
 s+=L(6,T(695,700,'or visbreaker / deasphalter','bs'));
 /* 7 hydrogen plant */
 s+=B(7,'',30,700,170,48,['Hydrogen plant'])+L(7,`<path class="st h2" d="M200 724H262"/>${AH(268,724,0)}${T(276,729,'H₂ to treaters','sl','start')}`);
 /* 8 sulphur chain */
 s+=L(8,`<path class="st h2" d="M412 740H436"/>${AH(440,740,0)}${T(408,745,'H₂S','sl','end')}`)+B(8,'',442,716,150,48,['Amine &','sour water'])+L(8,S([[592,740],[658,740]]))+B(8,'',660,716,160,48,['Sulphur recovery'])+L(8,S([[820,740],[948,740]])+lab(884,730,'Sulphur'));
 /* 9 blending and storage */
 s+=`<g class="lay" data-l="9"><g class="u"><rect class="box pool" x="950" y="80" width="130" height="690" rx="12"/><text class="bt" transform="translate(1022 425) rotate(-90)" text-anchor="middle">Blending, storage and shipping</text></g></g>`;
 s+=L(9,T(20,790,'Utilities, flare and tank farm serve every unit','bs','start'));
 return s+'</svg>';}

/* ===================================================================== chapter figures: each returns svg; markers 1-3 are piping watch-outs */
const W=(inner,vb='0 0 760 500')=>`<svg class="rf-fig" viewBox="${vb}">${inner}</svg>`;
const P_=(d,cls='st')=>`<path class="${cls}" d="${d}"/>`;
const FIG={
 desalter:()=>W(
  G('0',tank(30,230,110,120,'Crude tank'))
  +S([[140,330],[182,330]])+G('3',pump(200,330))
  +S([[226,314],[280,314]])+G('0 2',`${hx(300,314,18)}${hx(380,314,18)}${T(340,282,'Preheat exchangers','eqt')}`)
  +S([[318,314],[360,314]])+S([[398,314],[438,314]])
  +G('0 4',`<rect class="eq" x="440" y="290" width="22" height="48" rx="4"/>${T(451,362,'Mixing valve','eqt')}`)+S([[451,222],[451,288]])+T(451,208,'Wash water','sl')
  +S([[462,314],[518,314]])+G('0',vess(520,264,200,100,'Desalter',320))
  +S([[620,364],[620,410],[704,410]])+T(700,432,'Brine','sl','end')
  +S([[720,314],[744,314],[744,180],[604,180]])+T(672,166,'To the furnace','sl')
  +M(1,340,246,'2')+M(2,200,388,'3')+M(3,451,398,'4'),'0 0 760 440'),

 cdu:()=>W(
  G('0',furn(40,260,140,170,'Furnace'))
  +G('0 2',P_('M180 300H240V340H300','st big')+AH(306,340,0))
  +G('0',col(306,60,70,420,''))+T(296,462,'Atmospheric','eqt','end')+T(296,482,'column','eqt','end')
  +G('0 3',P_('M341 60V36H428')+AH(432,36,0)+acool(432,24,130)+T(497,96,'Air cooler','eqt'))
  +S([[562,37],[598,37]])+G('0',vess(600,14,140,46,'Reflux drum'))
  +G('0 4',col(470,130,46,140,'')+col(470,300,46,140,'')+P_('M376 150H466')+AH(470,150,0)+P_('M376 320H466')+AH(470,320,0))
  +S([[516,240],[700,240]])+T(700,228,'Kerosene','sl','end')+S([[516,410],[700,410]])+T(700,398,'Diesel','sl','end')
  +P_('M341 480V500H440')+AH(446,500,0)+T(454,505,'Residue to vacuum unit','sl','start')
  +M(1,210,268,'2')+M(2,590,100,'3')+M(3,430,240,'4'),'0 0 760 520'),

 vdu:()=>W(
  G('0',furn(40,270,140,170,'Furnace'))
  +G('0 2',P_('M180 320H280','st huge')+AH(290,320,0))
  +G('0',`<path class="eq" d="M290 470V230Q290 200 330 190V90Q330 60 360 60Q390 60 390 90V190Q430 200 430 230V470Z"/>`)+T(360,496,'Vacuum column','eqt')
  +G('0 4',P_('M360 60V40H522')+AH(528,40,0)+`<rect class="eq" x="528" y="28" width="90" height="24" rx="12"/>`+T(573,20,'Steam ejectors','eqt')+P_('M618 40H660V108')+hx(660,130,20)+P_('M660 150V398')+vess(620,400,80,40,'')+T(660,462,'Hotwell','eqt'))
  +S([[430,260],[540,260]])+T(548,265,'Light VGO','sl','start')+S([[430,350],[540,350]])+T(548,355,'Heavy VGO','sl','start')+S([[430,440],[540,440]])+T(548,445,'Residue','sl','start')
  +M(1,230,290,'2')+M(2,300,140,'3')+M(3,708,280,'4'),'0 0 760 520'),

 hdt:()=>W(
  G('',pump(50,380))+T(50,426,'Feed','eqt')
  +S([[76,364],[131,364]])+G('0',hx(150,364))+S([[167,364],[208,364]])
  +G('0',furn(210,240,110,150,'Heater'))
  +G('0 2',P_('M320 280H345V60H420V86')+AH(420,90,90)+vess(380,90,80,250,'')+bed(388,140,64,58)+bed(388,234,64,58)+T(420,222,'Reactor','eqt'))
  +G('3',P_('M420 340V440H470V133H486')+AH(490,133,0)+acool(490,120,130)+T(555,108,'Air cooler','eqt'))
  +S([[620,133],[655,133],[655,196]])+G('0',vess(610,200,90,140,'')+TL(655,262,['HP','separator'],'eqt'))
  +G('2',P_('M700 230H732V30H150V343')+AH(150,347,90)+comp(732,120)+T(440,22,'Recycle hydrogen','sl'))
  +S([[655,340],[655,420],[745,420]])+T(745,442,'To stripper','sl','end')
  +M(1,296,120,'2')+M(2,555,196,'3')+M(3,512,300,'4'),'0 0 760 470'),

 reformer:()=>{let s='';const X=[40,230,420];
  s+=G('0',X.map((x,i)=>`<rect class="eq" x="${x}" y="330" width="140" height="110" rx="4"/><rect class="eq" x="${x+62}" y="304" width="16" height="26"/><path class="tray" d="M${x+16} 424L${x+124} 404L${x+16} 384L${x+124} 364L${x+16} 344"/>`).join('')+T(300,470,'Heater cells (one before each reactor)','eqt'));
  s+=G('0 3',X.map((x,i)=>vess(x+40,100,60,170,'R'+(i+1),190)).join(''));
  s+=G('0 2',X.map(x=>P_(`M${x+70} 330V276`,'st big')+AH(x+70,272,-90)).join('')+P_('M110 100V60H205V400H226','st big')+AH(230,400,0)+P_('M300 100V60H395V400H416','st big')+AH(420,400,0)+P_('M490 100V60H596','st big')+AH(604,60,0));
  s+=T(612,65,'To separator','sl','start')+S([[10,400],[38,400]])+T(12,388,'Feed','sl','start');
  s+=G('4',`<rect class="eq" x="620" y="170" width="110" height="90" rx="8"/>${TL(675,208,['Catalyst','regenerator'],'eqt')}`+P_('M520 250H616','st thin')+AH(620,250,0)+P_('M675 170V30H95V94','st thin')+AH(95,98,90)+T(380,22,'Catalyst lift (CCR units)','sl'));
  s+=M(1,240,200,'2')+M(2,362,200,'3')+M(3,675,300,'4');return W(s,'0 0 760 500');},

 fcc:()=>W(
  G('0',vess(300,60,100,190,'Reactor',160)+`<rect class="eq" x="330" y="250" width="40" height="190"/>`+T(380,410,'Riser','eqt','start'))
  +G('0',vess(470,200,170,230,'Regenerator',320))
  +G('0 2',P_('M400 230H440V280H466','st big')+AH(470,280,0)+`<rect class="eq" x="428" y="243" width="24" height="22" rx="3"/>`+P_('M555 430V470H350V446','st big')+AH(350,442,-90)+`<rect class="eq" x="438" y="459" width="24" height="22" rx="3"/>`+T(450,505,'Slide valves on the catalyst lines','sl'))
  +S([[250,420],[328,420]])+T(252,408,'Feed','sl','start')
  +G('0',P_('M350 60V30H160V94','st big')+AH(160,100,90)+col(120,100,80,280,'')+T(212,300,'Main','eqt','start')+T(212,320,'fractionator','eqt','start'))
  +G('4',P_('M160 380V460H66')+AH(60,460,180)+T(62,484,'Slurry oil','sl','start'))
  +G('3',P_('M555 200V60H738','st huge')+AH(752,60,0)+T(650,44,'Flue gas','sl'))
  +M(1,420,340,'2')+M(2,600,110,'3')+M(3,108,428,'4'),'0 0 760 520'),

 hcu:()=>W(
  G('0',furn(40,270,110,140,'Heater'))
  +G('0 2',P_('M150 300H180V40H260V56')+AH(260,60,90)+vess(220,60,80,360,'')+bed(228,110,64,60)+bed(228,214,64,60)+bed(228,318,64,60)+T(260,200,'Reactor','eqt'))
  +G('3',P_('M340 130V350','st thin')+P_('M340 192H306','st thin')+AH(302,192,180)+P_('M340 296H306','st thin')+AH(302,296,180)+T(352,240,'Quench','sl','start')+T(352,260,'hydrogen','sl','start'))
  +S([[260,420],[260,460],[485,460],[485,384]])
  +G('0',vess(440,240,90,140,'')+TL(485,302,['HP','separator'],'eqt'))
  +G('4',P_('M530 330H558')+`<rect class="eq" x="560" y="318" width="34" height="24" rx="3"/>`+P_('M594 330H648')+AH(654,330,0)+T(577,304,'Letdown valve','sl'))
  +G('0',col(656,200,60,240,''))+T(686,464,'Fractionator','eqt')
  +M(1,120,40,'2')+M(2,398,160,'3')+M(3,577,374,'4'),'0 0 760 500'),

 gasalky:()=>W(
  G('0',col(40,100,56,290,'')+col(150,130,56,260,'')+col(260,150,56,240,'')+T(178,414,'Gas plant columns','eqt'))
  +S([[96,330],[148,330]])+S([[206,330],[258,330]])+S([[68,100],[68,60],[150,60]])+T(158,65,'Fuel gas','sl','start')
  +G('0 2',P_('M288 150V110H392')+AH(398,110,0)+tank(398,70,100,80,'')+T(448,172,'LPG storage','eqt'))
  +G('0',vess(440,260,150,80,'Acid reactor',305)+vess(620,250,100,120,'Settler',315))
  +S([[316,300],[438,300]])+T(378,290,'Butanes','sl')+S([[590,300],[618,300]])
  +S([[670,370],[670,430],[745,430]])+T(745,452,'Alkylate','sl','end')
  +G('3',`<rect class="zone" x="425" y="232" width="310" height="156" rx="10"/>`+T(580,224,'Acid area','badt'))
  +G('4',P_('M515 340V438','st thin')+`<rect class="eq" x="500" y="440" width="30" height="22" rx="3"/>`+T(540,457,'Closed drain','sl','start'))
  +M(1,532,110,'2')+M(2,398,232,'3')+M(3,470,452,'4'),'0 0 760 500'),

 coker:()=>W(
  G('0',furn(30,280,140,150,'Heater'))
  +G('0 3',P_('M170 320H220V453')+`<rect class="eq" x="206" y="455" width="28" height="28" rx="4"/>`+P_('M234 469H505')+P_('M335 469V446')+AH(335,442,-90)+P_('M505 469V446')+AH(505,442,-90)+T(220,498,'Switch valve','sl'))
  +G('0 2',vess(290,90,90,350,'Drum A',270)+vess(460,90,90,350,'Drum B',270))
  +G('2',P_('M335 90V60H618')+P_('M505 90V60')+AH(624,60,0)+col(626,50,60,260,'')+T(656,334,'Fractionator','eqt'))
  +G('4',`<rect class="zone" x="270" y="20" width="300" height="64" rx="8"/>`+T(420,42,'Cutting deck: keep clear','badt'))
  +M(1,420,200,'2')+M(2,176,469,'3')+M(3,598,112,'4'),'0 0 760 510'),

 h2:()=>W(
  G('0',`<rect class="eq" x="40" y="120" width="300" height="250" rx="6"/>${[0,1,2,3,4,5].map(i=>`<path class="tray" d="M${70+i*48} 150V350M${70+i*48} 90V120"/>`).join('')}${T(190,142,'Reformer furnace','eqt')}`+P_('M20 90H330')+T(180,78,'Feed gas + steam','sl'))
  +G('2',[0,1,2,3,4,5].map(i=>P_(`M${70+i*48} 370V398`,'st thin')).join('')+P_('M60 400H340','st big')+T(200,428,'Outlet pigtails and header','sl'))
  +G('0 3',P_('M340 400H400V300H430','st big')+AH(436,300,0))
  +G('0',`<rect class="eq" x="438" y="270" width="110" height="60" rx="30"/>`+T(493,354,'Waste heat boiler','eqt'))
  +S([[548,300],[578,300]])+G('0',vess(582,240,60,120,'')+T(612,382,'Shift','eqt'))+S([[642,300],[668,300]])
  +G('0',`<rect class="eq" x="672" y="250" width="70" height="100" rx="6"/>`+T(707,374,'PSA','eqt'))
  +G('4',S([[707,250],[707,192]])+T(707,178,'Hydrogen','sl'))
  +M(1,200,462,'2')+M(2,370,262,'3')+M(3,707,135,'4'),'0 0 760 500'),

 sru:()=>W(
  G('0',vess(30,160,170,70,'Thermal reactor',201))+P_('M60 120V154')+AH(60,158,90)+T(20,108,'Acid gas + air','sl','start')
  +P_('M200 195H212')+G('0',vess(212,160,100,70,'Boiler',201))
  +S([[312,195],[336,195]])+G('0',hx(360,195,22))+T(360,154,'Condenser','eqt')
  +S([[382,195],[418,195]])+G('0',vess(420,130,80,130,'')+bed(428,170,64,50)+T(460,284,'Converter','eqt'))
  +S([[500,195],[536,195]])+G('0',hx(560,195,22))+S([[582,195],[700,195]])+T(700,180,'Tail gas','sl','end')
  +G('2 3',P_('M360 217V330H640V356','st jk')+P_('M560 217V330','st jk')+P_('M640 400V440H676','st jk')+P_('M360 217V330H640V356')+P_('M560 217V330')+P_('M640 400V440H676')+AH(680,440,0))
  +G('3',`<rect class="eq" x="615" y="358" width="50" height="42" rx="4"/>`+T(672,384,'Seal leg','sl','start'))
  +G('0',`<rect class="eq" x="682" y="416" width="58" height="56" rx="4"/>`+T(711,496,'Sulphur pit','eqt'))
  +G('2',T(470,356,'Steam-jacketed liquid sulphur','sl'))
  +G('4',`<path class="trace" d="M312 182H336M382 182H418M500 182H536"/>`+T(460,108,'Process gas lines kept hot','sl'))
  +M(1,300,358,'2')+M(2,596,440,'3')+M(3,300,108,'4'),'0 0 760 510'),

 offsites:()=>W(
  G('0 2',tank(30,270,140,130,'Storage tank'))+S([[170,385],[212,385]])+G('0',pump(230,385))
  +P_('M230 369H256')+P_('M256 369H300V108')+AH(300,104,-90)
  +G('0',`<rect class="eq" x="280" y="60" width="280" height="40" rx="4"/>`+T(420,86,'Pipe rack','eqt'))
  +G('3',P_('M330 130L594 170','st big')+AH(600,171,8.6)+vess(600,150,130,60,'')+T(665,234,'Flare knock-out drum','eqt')+P_('M700 150V46')+AH(700,40,-90)+T(708,50,'To flare','sl','start')+T(462,128,'Slopes to the drum, no pockets','sl'))
  +G('4',P_('M330 300H720')+T(520,290,'Steam header','sl')+P_('M500 300V340')+`<rect class="eq" x="488" y="340" width="24" height="30" rx="4"/>`+T(500,392,'Drip leg + trap','sl')+P_('M640 300V276H700')+T(662,266,'Branch from top','sl'))
  +M(1,100,240,'2')+M(2,430,196,'3')+M(3,420,340,'4'),'0 0 760 440')
};

/* ===================================================================== content */
const STEPS=[
 ['Crude comes in',`<p>Crude oil arrives by pipeline or ship and is stored in large tanks. It is a mixture of thousands of hydrocarbons, plus salt, water and dirt.</p><p>The <b>desalter</b> washes the crude with water and separates it again, so the salt does not corrode or block the units downstream.</p>`],
 ['Split by boiling point',`<p>The heated crude goes into the <b>atmospheric distillation column</b>. Light parts rise and are drawn off high up, heavy parts stay low.</p><p>Top to bottom: gas, naphtha, kerosene, diesel and a heavy <b>residue</b> that does not boil.</p>`],
 ['Distil the heavy residue',`<p>Heating the residue further would crack it. So it goes to the <b>vacuum column</b>, where low pressure lets it boil at a lower temperature.</p><p>Out come <b>vacuum gas oils</b> (VGO), feed for the conversion units, and a very heavy <b>vacuum residue</b>.</p>`],
 ['Remove the sulphur',`<p>Straight-run cuts contain sulphur and nitrogen. <b>Hydrotreaters</b> react them with hydrogen over a catalyst, turning the sulphur into H₂S gas.</p><p>The result is clean naphtha, jet fuel and ultra-low-sulphur diesel.</p>`],
 ['Make better gasoline',`<p>The <b>gas plant</b> recovers LPG. <b>Isomerization</b> and the <b>reformer</b> rebuild naphtha molecules into high-octane gasoline.</p><p>The reformer also produces hydrogen, which the hydrotreaters use.</p>`],
 ['Crack the heavy oils',`<p>Vacuum gas oil is too heavy to sell as it is. The <b>FCC</b> (fluid catalytic cracker) breaks it into gasoline and LPG; <b>alkylation</b> joins the LPG back into high-octane gasoline.</p><p>The <b>hydrocracker</b> does the same job with hydrogen and makes mostly diesel and jet fuel.</p>`],
 ['Use the bottom of the barrel',`<p>The vacuum residue is the heaviest part. A <b>delayed coker</b> cracks it with heat into gas, naphtha and gas oil, leaving solid petroleum coke.</p><p>Other routes are a <b>visbreaker</b> (mild cracking to fuel oil) or a <b>deasphalter</b> (makes bitumen).</p>`],
 ['Make hydrogen',`<p>Hydrotreaters and the hydrocracker use more hydrogen than the reformer makes. A <b>hydrogen plant</b> makes the rest from natural gas and steam.</p>`],
 ['Recover the sulphur',`<p>All the H₂S from the treaters is washed out with <b>amine</b>, and sour water is stripped. The <b>sulphur recovery unit</b> (Claus) turns the H₂S into liquid sulphur, which is sold.</p><p>This keeps sulphur out of the air.</p>`],
 ['Blend, store and ship',`<p>The products from all units are <b>blended</b> to specification, stored in the tank farm and shipped.</p><p>Behind everything are the <b>utilities</b> (steam, power, cooling water, air), the <b>flare</b> for safe relief, and pipe racks connecting it all.</p>`]
];
const BOX=(t)=>`<span class="rf-cond">${t}</span>`;
const CH=[
 {id:'desalter',t:'Desalter and preheat train',f:'desalter',d:'Where the crude is washed and warmed before distillation.',pts:[
  'Crude is pumped from the tanks through a train of <b>heat exchangers</b>, heated by hot products leaving the column. Wash water is mixed in and the <b>desalter</b> separates the salty water out.',
  `${BOX('Typical: about 120–150 °C in the desalter, at a pressure high enough to keep the crude liquid')}`,
  '<b>Exchangers:</b> route the piping so the tube bundles can be pulled for cleaning and the nozzle loads stay low. Stacked exchangers need flexible piping between them.',
  '<b>Crude pumps:</b> keep the suction line short and simple to give enough NPSH. Use an eccentric reducer, flat on top.',
  '<b>Mixing valve and wash water:</b> place the injection point with enough straight pipe after it, and use materials that resist the salty water.']},
 {id:'cdu',t:'Crude distillation unit',f:'cdu',d:'The first and biggest unit in the refinery.',pts:[
  'The crude is heated in a <b>furnace</b> and enters the <b>atmospheric column</b>, partly vaporised. Side cuts go to small <b>strippers</b>; the overhead vapour is condensed in air coolers and collected in the reflux drum.',
  `${BOX('Typical: furnace outlet about 350–370 °C; column top only slightly above atmospheric pressure')}`,
  '<b>Transfer line</b> (furnace to column): large, hot and carrying liquid and vapour together. Keep it short and flexible; it is one of the most stress-critical lines in the unit.',
  '<b>Overhead system:</b> salts and acids cause corrosion here. Plan injection points for wash water and neutraliser, and make the air-cooler inlet piping symmetrical so every bay gets equal flow.',
  '<b>Side draws:</b> they flow by gravity to the strippers and pumps, so the elevations decide whether the pumps have enough NPSH. Avoid pockets.']},
 {id:'vdu',t:'Vacuum distillation unit',f:'vdu',d:'Distils the residue at low pressure so it does not crack.',pts:[
  'The atmospheric residue is heated again and enters a wide <b>vacuum column</b>. <b>Steam ejectors</b> pull the vacuum; their condensate drains to a <b>hotwell</b>.',
  `${BOX('Typical: furnace outlet about 390–420 °C; column top pressure only a few tens of mbar absolute')}`,
  '<b>Transfer line:</b> very large diameter, hot and at low pressure. It grows a lot with heat, so supports (often springs) and the column nozzle loads need careful study.',
  '<b>Vacuum service:</b> design the lines for outside (external) pressure and keep flanges to a minimum, because every joint can leak air in.',
  '<b>Ejector and condensate legs:</b> the drain legs to the hotwell are long vertical pipes with a liquid seal. They set the height of the ejector structure.']},
 {id:'hdt',t:'Hydrotreaters',f:'hdt',d:'Remove sulphur and nitrogen using hydrogen.',pts:[
  'Feed is mixed with <b>hydrogen</b>, heated and passed down through catalyst beds in the <b>reactor</b>. The effluent is cooled in an <b>air cooler</b> and the <b>HP separator</b> recovers hydrogen for the recycle compressor.',
  `${BOX('Typical: about 300–400 °C and 30–100 bar, depending on the feed')}`,
  '<b>High pressure and hot hydrogen:</b> expect high flange classes, ring-type joints and alloy steels chosen with the Nelson curves (API 941). Many joints need post-weld heat treatment.',
  '<b>Reactor effluent air cooler:</b> ammonium salts can corrode it. The inlet and outlet piping must be symmetrical so every bundle gets the same flow, with a wash-water injection point upstream.',
  '<b>Reactor piping:</b> hot, heavy lines on a tall reactor. Spring supports and a careful stress study keep the reactor nozzle loads within limits.']},
 {id:'reformer',t:'Catalytic reformer and isomerization',f:'reformer',d:'Turn naphtha into high-octane gasoline and hydrogen.',pts:[
  'Naphtha passes through <b>three reactors in a row</b>, reheated in a furnace cell before each one. In a continuous unit (CCR), catalyst moves slowly through the reactors to a regenerator. <b>Isomerization</b> upgrades the light naphtha in a simpler, cooler unit.',
  `${BOX('Typical reformer: about 500–530 °C at low pressure (a few bar in CCR units)')}`,
  '<b>Furnace-to-reactor lines:</b> large, very hot and at low pressure, so they grow a lot. Route them short and flexible; they decide much of the plot layout.',
  '<b>Reactor inlet and outlet piping:</b> keep it symmetrical, and check the reactor nozzle loads, because the reactors stand side by side and move with heat.',
  '<b>Catalyst lift lines:</b> catalyst travels through these pipes, so they need smooth, long-radius bends and no sudden changes of direction.']},
 {id:'fcc',t:'Fluid catalytic cracker (FCC)',f:'fcc',d:'The refinery\'s main gasoline maker.',pts:[
  'Hot catalyst meets the feed at the bottom of the <b>riser</b> and cracks it in seconds. The used catalyst is burned clean in the <b>regenerator</b> and flows back. The cracked vapour goes to the <b>main fractionator</b>.',
  `${BOX('Typical: reactor about 500–540 °C, regenerator about 680–730 °C, at around 1.5–2.5 bar')}`,
  '<b>Catalyst standpipes and slide valves:</b> the catalyst is abrasive and very hot. These lines are refractory-lined and their supports must follow large movements.',
  '<b>Flue gas and reactor vapour lines:</b> very large and hot. Thermal growth is big, so expansion joints and refractory lining are common.',
  '<b>Slurry oil:</b> it carries catalyst fines that erode the pipe. Use long-radius bends, extra wall thickness and no dead legs.']},
 {id:'hcu',t:'Hydrocracker',f:'hcu',d:'Cracks heavy oil with hydrogen into diesel and jet fuel.',pts:[
  'Like a hydrotreater but much more severe. Several catalyst beds are cooled by <b>quench hydrogen</b> between them. After the HP separator, a <b>letdown valve</b> drops the pressure and the fractionator splits the products.',
  `${BOX('Typical: about 350–430 °C and 100–200 bar')}`,
  '<b>Very high pressure:</b> heavy-wall pipe, 1500 or 2500 class flanges and stainless steels (such as 321 or 347) in hot hydrogen. Every joint must be leak-tight.',
  '<b>Quench lines:</b> many small lines feed the reactor beds. They need flexibility for reactor growth and valves that operators can reach.',
  '<b>Letdown valve:</b> the large pressure drop causes erosion and vibration. Give the downstream piping strong supports and allow for the noise.']},
 {id:'gasalky',t:'Gas plant and alkylation',f:'gasalky',d:'Recover LPG and turn light gases into gasoline.',pts:[
  'The <b>gas plant</b> uses a row of columns to split gas into fuel gas, propane and butane. <b>Alkylation</b> joins butanes and light olefins from the FCC into alkylate, a clean high-octane gasoline, using a strong acid as catalyst.',
  `${BOX('Typical alkylation: low temperature, about 5–40 °C depending on the acid used')}`,
  '<b>LPG lines:</b> LPG boils easily. Liquid trapped between closed valves can build huge pressure as it warms, so thermal relief valves are needed.',
  '<b>Acid areas:</b> alkylation uses hydrofluoric or sulphuric acid. Expect special materials, flange guards and a separate area with controlled access.',
  '<b>Drains:</b> hydrocarbon and acid drains go to closed systems, never open to the atmosphere.']},
 {id:'coker',t:'Delayed coker',f:'coker',d:'Turns the heaviest residue into lighter products and coke.',pts:[
  'Residue is heated quickly in a furnace and sent to one of two <b>coke drums</b>. It cracks there slowly, leaving solid coke. When a drum is full, the <b>switch valve</b> moves the feed to the other drum, and the full one is steamed, cooled and cut out with water jets.',
  `${BOX('Typical: furnace outlet about 490–500 °C; drums at low pressure; one drum fills in about 12–24 hours')}`,
  '<b>Cyclic heating and cooling:</b> the drums grow and shrink every cycle. The overhead and feed piping must be flexible enough to take this fatigue, usually with spring supports.',
  '<b>Feed lines and switch valve:</b> the residue cokes up if it stands still. Avoid dead legs and provide steam purges and insulation.',
  '<b>Drum top:</b> keep the unheading and cutting deck clear of piping, so the drums can be opened and the coke cut safely.']},
 {id:'h2',t:'Hydrogen plant',f:'h2',d:'Makes hydrogen from natural gas and steam.',pts:[
  'Gas and steam react inside catalyst-filled tubes in the <b>reformer furnace</b>. The hot gas is cooled in a <b>waste heat boiler</b>, more hydrogen is made in the <b>shift</b> reactor, and the <b>PSA</b> unit purifies it.',
  `${BOX('Typical: reformer outlet about 850–900 °C, at about 20–30 bar')}`,
  '<b>Outlet pigtails and headers:</b> these thin tubes connect each reformer tube to the header. They are high-alloy and must take large thermal growth, so their supports need special care.',
  '<b>Hot transfer line:</b> refractory-lined pipe carries the gas to the boiler. Check its growth and the nozzle loads on the boiler.',
  '<b>Hydrogen service:</b> hydrogen leaks easily and burns invisibly. Keep flanges to a minimum and use reliable gaskets.']},
 {id:'sru',t:'Sulphur recovery unit',f:'sru',d:'Turns H₂S into liquid sulphur (the Claus process).',pts:[
  'Part of the H₂S burns in the <b>thermal reactor</b>. Then the gas is cooled, sulphur is condensed, and <b>catalytic converters</b> make more sulphur. Liquid sulphur drains through <b>seal legs</b> to the <b>sulphur pit</b>; the tail gas goes to further treatment.',
  `${BOX('Typical: thermal reactor about 1000–1300 °C; converters about 200–350 °C; liquid sulphur kept about 125–155 °C')}`,
  '<b>Liquid sulphur lines:</b> sulphur freezes at about 115–120 °C and becomes thick above about 160 °C. So the lines, valves and flanges are steam-jacketed to hold it in between.',
  '<b>Sulphur rundown:</b> lines slope all the way to the pit through the seal legs, with no pockets. Each jacket section needs its own steam supply and condensate return.',
  '<b>Process gas lines:</b> keep them hot (insulated and traced) so sulphur does not condense inside. H₂S is toxic, so every joint must be leak-tight.']},
 {id:'offsites',t:'Offsites and utilities',f:'offsites',d:'The tanks, racks and systems that connect every unit.',pts:[
  'Products are pumped to <b>storage tanks</b> and blended. <b>Pipe racks</b> carry process lines, steam, cooling water, air, nitrogen and the <b>flare</b> headers between all the units.',
  `${BOX('Offsites cover a large part of the plot area, and often a large share of the piping')}`,
  '<b>Tank connections:</b> tanks settle and their walls bulge when filled. The first piping at each tank nozzle must be flexible enough to take this movement.',
  '<b>Flare headers:</b> large lines that must slope continuously to the knock-out drum, with no pockets, so any liquid drains away.',
  '<b>Steam headers:</b> take branches from the top of the header, and fit drip legs with steam traps at every low point and at the end of the header.']}
];
/* ===================================================================== page engine */
const ld=(k,d)=>{try{return localStorage.getItem('piperef_'+k)||d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem('piperef_'+k,v)}catch(e){}};
let MODE=ld('refinery_mode','story');
const IC_STORY='<svg viewBox="0 0 24 24"><path d="M12 3v14M6 11l6 6 6-6"/><path d="M5 21h14"/></svg>',IC_READ='<svg viewBox="0 0 24 24"><path d="M4 5h16M4 10h16M4 15h10M4 20h12"/></svg>';
function head(){return `<div class="phead"><div><h1>Refinery units for piping engineers</h1><p>How an oil refinery works, unit by unit, and what each unit means for the piping: temperatures, pressures, materials and the lines that need special care. Scroll through it as a story, or read it as a normal page.</p></div>
 <div class="pb-mode" role="group" aria-label="View"><button type="button" data-mode="story" aria-pressed="${MODE==='story'}">${IC_STORY}Scroll story</button><button type="button" data-mode="read" aria-pressed="${MODE==='read'}">${IC_READ}Read as page</button></div></div>
 <nav class="pb-toc" aria-label="Sections"><a href="#rf-map">The whole refinery</a>${CH.map(c=>`<a href="#rf-${c.id}">${c.t}</a>`).join('')}</nav>`;}
const ptsHTML=(c,read)=>c.pts.map((p,i)=>`<li data-i="${i}"${i>=2?' class="wo"':''}>${i>=2?`<span class="rf-n">${i-1}</span>`:''}${p}</li>`).join('');
function story(){let s=`<div class="pb-bar"><i></i></div>`+head();
 s+=`<h2 class="pb-part">Part 1: follow a barrel of crude</h2><p>Scroll to add each unit to the refinery map.</p>`;
 s+=`<section class="pb-sc" id="rf-map" data-n="${STEPS.length}" style="--n:${STEPS.length}"><div class="pb-stk"><div class="pb-fig">${BFD()}</div><div class="pb-txt"><ol class="pb-steps">${STEPS.map((x,i)=>`<li data-i="${i}"><button type="button" class="pb-sh">${x[0]}</button><div class="pb-sb">${x[1]}</div></li>`).join('')}</ol><p class="pb-cnt"></p></div></div></section>`;
 s+=`<h2 class="pb-part">Part 2: unit by unit</h2><p>For each unit: what it does, typical conditions, and the piping watch-outs (numbered on the sketch).</p>`;
 for(const c of CH)s+=`<section class="pb-sc" id="rf-${c.id}" data-n="${c.pts.length}" style="--n:${c.pts.length}"><div class="pb-stk"><div class="pb-fig">${FIG[c.f]()}</div><div class="pb-txt"><h2>${c.t}</h2><p>${c.d}</p><ol class="pb-pts">${ptsHTML(c)}</ol><p class="pb-cnt"></p></div></div></section>`;
 return s+end();}
function read(){let s=head();
 s+=`<section class="pb-rd" id="rf-map"><h2>Part 1: follow a barrel of crude</h2><p>The refinery map, built up one unit at a time.</p>${STEPS.map((x,i)=>`<div class="pb-row"><div class="pb-fig" data-k="${i}">${BFD()}</div><div><h3>${i+1}. ${x[0]}</h3>${x[1]}</div></div>`).join('')}</section>`;
 s+=`<h2 class="pb-part">Part 2: unit by unit</h2>`;
 for(const c of CH)s+=`<section class="pb-rd" id="rf-${c.id}"><h2>${c.t}</h2><p>${c.d}</p><div class="pb-rch"><div class="pb-fig">${FIG[c.f]()}</div><div><ol class="pb-pts">${ptsHTML(c,1)}</ol></div></div></section>`;
 return s+end();}
function end(){return `<div class="pb-end"><h2>Keep going</h2><p>New to piping? Start with <a href="piping-basics.html">Piping fundamentals</a>. Look up terms in the <a href="glossary.html">glossary</a>, or see the <a href="pipe-supports.html">pipe supports in 3D</a>.</p><p class="rf-note">Conditions are typical values for orientation only. Real units vary by licensor, feed and design; always follow the project documents.</p></div>`;}
function setBFD(svg,k){svg.querySelectorAll('.lay').forEach(g=>{const l=+g.dataset.l;g.classList.toggle('on',l<=k);g.classList.toggle('now',l===k);});}

/* mobile: zoom the drawing onto the part being explained */
const small=()=>matchMedia('(max-width:700px)').matches;
function focusBox(svg,els,mapDesk){const vb=(svg.dataset.vb||svg.getAttribute('viewBox')).split(' ').map(Number);svg.dataset.vb=vb.join(' ');
 if((!small()&&!mapDesk)||!els.length)return vb;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
 els.forEach(e=>{try{const b=e.getBBox();if(!b.width&&!b.height)return;x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);}catch(_){}});
 if(x0>x1)return vb;const pad=40;x0-=pad;y0-=pad;x1+=pad;y1+=pad;
 const box=svg.parentElement.getBoundingClientRect(),ar=(box.width||1)/(box.height||1);const mf=small()?.5:.62;let w=Math.max(x1-x0,vb[2]*mf),h=Math.max(y1-y0,vb[3]*mf*.84);
 if(w/h<ar)w=h*ar;else h=w/ar;if(w>vb[2]){w=vb[2];h=Math.min(vb[3],w/ar);}if(h>vb[3]){h=vb[3];w=Math.min(vb[2],h*ar);}
 const cx=(x0+x1)/2,cy=(y0+y1)/2;let nx=Math.min(Math.max(cx-w/2,vb[0]),vb[0]+vb[2]-w),ny=Math.min(Math.max(cy-h/2,vb[1]),vb[1]+vb[3]-h);return [nx,ny,w,h];}
function animVB(svg,to){const from=(svg.getAttribute('viewBox')).split(' ').map(Number);if(svg._a)cancelAnimationFrame(svg._a);
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){svg.setAttribute('viewBox',to.map(f1).join(' '));return;}
 const t0=performance.now(),D=450;const step=t=>{const k=Math.min(1,(t-t0)/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;svg.setAttribute('viewBox',from.map((v,i)=>f1(v+(to[i]-v)*e)).join(' '));if(k<1)svg._a=requestAnimationFrame(step);};svg._a=requestAnimationFrame(step);}

let SC=[],raf=0;
function render(){P.dataset.mode=MODE;P.innerHTML=MODE==='story'?story():read();
 if(MODE==='read'){P.querySelectorAll('.pb-fig[data-k]').forEach(f=>{const svg=f.querySelector('svg'),k=+f.dataset.k;setBFD(svg,k);if(small()){requestAnimationFrame(()=>{const u=[...svg.querySelectorAll('.lay.now .u')];svg.setAttribute('viewBox',focusBox(svg,u.length?u:[...svg.querySelectorAll('.lay.now')]).map(f1).join(' '));});}});SC=[];return;}
 SC=[...P.querySelectorAll('.pb-sc')].map(sec=>({sec,n:+sec.dataset.n,i:-1,svg:sec.querySelector('svg'),map:sec.id==='rf-map',items:[...sec.querySelectorAll('.pb-steps>li,.pb-pts>li')],cnt:sec.querySelector('.pb-cnt')}));
 SC.forEach(sc=>{sc.items.forEach((li,i)=>li.addEventListener('click',e=>{if(e.target.closest('a'))return;jump(sc,i);}));setStep(sc,0);});
 onScroll();}
function setStep(sc,i){if(sc.i===i)return;sc.i=i;sc.items.forEach((li,k)=>{li.classList.toggle('on',k===i);li.classList.toggle('done',k<i);});
 let els;if(sc.map){setBFD(sc.svg,i);els=[...sc.svg.querySelectorAll('.lay.now .u')];if(!els.length)els=[...sc.svg.querySelectorAll('.lay.now')];}
 else{sc.svg.querySelectorAll('[data-h]').forEach(g=>g.classList.toggle('hl',g.dataset.h.split(' ').includes(String(i))));els=[...sc.svg.querySelectorAll('.hl')];}
 animVB(sc.svg,focusBox(sc.svg,els,sc.map&&i<sc.n-1));
 if(sc.cnt)sc.cnt.textContent=`${i+1} of ${sc.n} · keep scrolling`;}
function topH(){const t=document.querySelector('.top');return t?t.offsetHeight:56;}
function jump(sc,i){const r=sc.sec.getBoundingClientRect(),stk=sc.sec.querySelector('.pb-stk'),tot=sc.sec.offsetHeight-stk.offsetHeight;
 window.scrollTo({top:window.scrollY+r.top-topH()-3+tot*((i+.35)/sc.n),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}
function onScroll(){if(raf||MODE!=='story'||P.hidden)return;raf=requestAnimationFrame(()=>{raf=0;const th=topH()+3;let cur=null;
 for(const sc of SC){const r=sc.sec.getBoundingClientRect(),stk=sc.sec.querySelector('.pb-stk'),tot=sc.sec.offsetHeight-stk.offsetHeight;const p=Math.min(.9999,Math.max(0,(th-r.top)/Math.max(tot,1)));setStep(sc,Math.floor(p*sc.n));if(r.top<=th+40&&r.bottom>th+40)cur=sc.sec.id;}
 const pr=P.getBoundingClientRect(),bar=P.querySelector('.pb-bar i');if(bar)bar.style.width=Math.min(100,Math.max(0,(th-pr.top)/Math.max(pr.height-innerHeight,1)*100))+'%';
 P.querySelectorAll('.pb-toc a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));});}
addEventListener('scroll',onScroll,{passive:true});
let rz=0;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{SC.forEach(sc=>{const i=sc.i;sc.i=-1;setStep(sc,i);});onScroll();},200);});
P.addEventListener('click',e=>{const b=e.target.closest('.pb-mode button');if(b&&b.dataset.mode!==MODE){const id=[...P.querySelectorAll('.pb-sc,.pb-rd')].find(s=>s.getBoundingClientRect().bottom>topH()+80)?.id;MODE=b.dataset.mode;sv('refinery_mode',MODE);render();
  if(id){const el=document.getElementById(id);if(el)window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-topH()-10});}return;}
 const a=e.target.closest('.pb-toc a');if(a){e.preventDefault();const el=P.querySelector(a.getAttribute('href'));if(el)window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-topH()-(MODE==='story'?3:10),behavior:'smooth'});}});
P.style.setProperty('--pb-top',topH()+'px');
render();
window.renderREFINERY=()=>{P.style.setProperty('--pb-top',topH()+'px');onScroll();};
