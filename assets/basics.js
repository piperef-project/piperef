/* Piping fundamentals: a scroll-driven walk-through (story mode) with a plain reading view. Diagrams are drawn here as SVG. */
const P=document.getElementById('p-basics');
if(!document.getElementById('pb-css')){const st=document.createElement('style');st.id='pb-css';st.textContent=`
#p-basics{--pb-top:56px}
#p-basics .pb-bar{position:sticky;top:var(--pb-top);z-index:5;height:3px;margin:0 -32px;background:transparent}
#p-basics .pb-bar i{display:block;height:100%;width:0;background:var(--accent);transition:width .1s linear}
#p-basics[data-mode=read] .pb-bar{display:none}
#p-basics .pb-mode{display:inline-flex;padding:3px;border:1px solid var(--rule);border-radius:99px;background:var(--paper,var(--sheet));gap:2px}
#p-basics .pb-mode button{border:0;background:none;font:inherit;font-size:13.5px;font-weight:600;color:var(--muted);padding:7px 14px;border-radius:99px;cursor:pointer;display:flex;align-items:center;gap:6px}
#p-basics .pb-mode button[aria-pressed=true]{background:var(--sheet);color:var(--ink);box-shadow:0 1px 3px rgba(15,27,45,.14)}
#p-basics .pb-mode svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#p-basics .pb-toc{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 8px}
#p-basics .pb-toc a{font-size:13px;padding:5px 11px;border:1px solid var(--rule);border-radius:99px;color:var(--ink-2);text-decoration:none;background:var(--sheet)}
#p-basics .pb-toc a:hover{border-color:var(--accent);color:var(--accent)}
#p-basics .pb-toc a.on{border-color:var(--accent);color:var(--accent);background:var(--accent-soft,#EEF3FD)}
#p-basics .pb-part{margin:34px 0 6px;font-size:22px;letter-spacing:-.01em}
#p-basics .pb-part+p{margin:0 0 6px;color:var(--muted);font-size:14.5px;max-width:70ch}
/* story scenes */
#p-basics .pb-sc{position:relative;height:calc(var(--n)*58vh + 100vh);margin:0}
#p-basics .pb-stk{position:sticky;top:calc(var(--pb-top) + 3px);height:calc(100vh - var(--pb-top) - 3px);display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,1fr);gap:28px;align-items:center;padding:14px 0}
#p-basics .pb-fig{height:100%;min-height:0;display:flex;align-items:center;justify-content:center;border:1px solid var(--rule);border-radius:16px;background:var(--paper,#F7F9FC);padding:14px;position:relative;overflow:hidden}
#p-basics .pb-fig svg{width:100%;height:100%;max-height:100%;display:block}
#p-basics .pb-one{display:none;width:100%;height:100%}#p-basics .pb-one.on{display:block;animation:pbfade .35s ease}
#p-basics .pb-row2 .pb-fig{aspect-ratio:auto}#p-basics .pb-row2 .pb-fig svg{height:auto}#p-basics .pb-row2 p{font-size:15.5px}
#p-basics .pb-txt{min-width:0;max-height:100%;overflow:hidden;display:flex;flex-direction:column}
#p-basics .pb-txt h2{margin:0 0 4px;font-size:23px;line-height:1.2;letter-spacing:-.01em}
#p-basics .pb-txt>p{margin:0 0 14px;color:var(--muted);font-size:14px;line-height:1.5}
#p-basics .pb-steps{list-style:none;margin:0;padding:0;counter-reset:s}
#p-basics .pb-steps>li{border-left:2px solid var(--rule);padding:0 0 0 14px;position:relative}
#p-basics .pb-steps>li.on{border-left-color:var(--accent)}
#p-basics .pb-sh{display:block;width:100%;text-align:left;border:0;background:none;font:inherit;font-size:14.5px;font-weight:600;color:var(--muted);padding:6px 0;cursor:pointer;line-height:1.35}
#p-basics .pb-steps>li.on .pb-sh{color:var(--ink);font-size:17px}
#p-basics .pb-steps>li.done .pb-sh{color:var(--ink-2)}
#p-basics .pb-sb{display:none;padding:0 0 12px;font-size:15px;line-height:1.6;color:var(--ink)}
#p-basics .pb-steps>li.on .pb-sb{display:block;animation:pbin .35s ease}
#p-basics .pb-sb p{margin:0 0 8px}
#p-basics .pb-go{display:inline-block;font-size:13px;font-weight:600;color:var(--accent);text-decoration:none;margin-top:2px}
#p-basics .pb-go:hover{text-decoration:underline}
/* chapter points */
#p-basics .pb-pts{list-style:none;margin:0;padding:0}
#p-basics .pb-pts li{padding:8px 0 8px 14px;border-left:2px solid var(--rule);font-size:15px;line-height:1.55;color:var(--muted);transition:color .25s,border-color .25s;cursor:pointer}
#p-basics .pb-pts li.done{color:var(--ink-2)}
#p-basics .pb-pts li.on{color:var(--ink);border-left-color:var(--accent)}
#p-basics .pb-pts li b{color:inherit}
#p-basics .pb-links{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px 14px}
#p-basics .pb-cnt{display:none;font-size:12.5px;color:var(--muted);margin:6px 0 0;font-variant-numeric:tabular-nums}
@keyframes pbin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
/* read mode */
#p-basics .pb-rd{margin:26px 0 8px;padding-top:4px}
#p-basics .pb-rd h2{font-size:21px;margin:0 0 6px}
#p-basics .pb-rd>p{color:var(--muted);margin:0 0 12px;font-size:14.5px}
#p-basics .pb-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:22px;align-items:center;padding:16px 0;border-top:1px solid var(--rule)}
#p-basics .pb-row .pb-fig{height:auto;aspect-ratio:4/3.3;padding:10px}
#p-basics .pb-row h3{margin:0 0 6px;font-size:17px}
#p-basics .pb-row p{margin:0 0 8px;font-size:15px;line-height:1.6}
#p-basics .pb-rch{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:22px;align-items:start;border-top:1px solid var(--rule);padding-top:16px}
#p-basics .pb-rch .pb-fig{height:auto;aspect-ratio:4/3;position:sticky;top:calc(var(--pb-top) + 14px)}
#p-basics[data-mode=read] .pb-pts li{color:var(--ink);cursor:default;border-left-color:var(--rule)}
#p-basics .pb-end{margin:34px 0 10px;padding:18px 20px;border:1px solid var(--rule);border-radius:14px;background:var(--paper,#F7F9FC)}
#p-basics .pb-end h2{margin:0 0 6px;font-size:18px}#p-basics .pb-end p{margin:0 0 6px;font-size:14.5px}
/* svg drawing */
#p-basics svg text{font-family:var(--f-body,system-ui);fill:var(--ink-2)}
#p-basics .pb-iso .lay{opacity:0;transition:opacity .35s ease}
#p-basics .pb-iso .lay.on{opacity:1}
#p-basics .pb-fig svg,#p-basics .lay,#p-basics .fg{--c:#5E6B7C;--pf:#F2F5F9;--tk:#E9EEF4}
#p-basics .lay.now,#p-basics .hl{--c:var(--accent);--pf:#E3ECFC;--tk:#E3ECFC}
[data-theme=dark] #p-basics .pb-fig svg,[data-theme=dark] #p-basics .lay,[data-theme=dark] #p-basics .fg{--c:#9AABC2;--pf:#1C293D;--tk:#1F2D43}
[data-theme=dark] #p-basics .lay.now,[data-theme=dark] #p-basics .hl{--c:#7FA6F5;--pf:#22365A;--tk:#22365A}
#p-basics .po{stroke:var(--c);fill:none;stroke-linejoin:round}
#p-basics .pi{stroke:var(--pf);fill:none;stroke-linejoin:round}
#p-basics .sf{fill:var(--pf);stroke:var(--c);stroke-width:1.3;stroke-linejoin:round}
#p-basics .tk{fill:var(--tk);stroke:var(--c);stroke-width:1.4;stroke-linejoin:round}
#p-basics .ln{stroke:var(--c);fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#p-basics .lnt{stroke:var(--c);fill:none;stroke-width:1;stroke-linecap:round}
#p-basics .dk{fill:var(--c)}
#p-basics .grid{stroke:var(--rule);stroke-width:1;fill:none;opacity:.7}
#p-basics .lab line{stroke:var(--c);stroke-width:1}
#p-basics .lab circle{fill:var(--c)}
#p-basics .lab text{font-size:15px;font-weight:650;fill:var(--c)}
#p-basics .lab text.sub{font-weight:500;font-size:12.5px}
#p-basics svg.f2 text{font-size:17px}#p-basics svg.f2 .chipt{font-size:15px}
#p-basics .pb-iso .lay .lab{display:none}
#p-basics .pb-iso .lay.now .lab,#p-basics .pb-iso .lay .lab.keep{display:inline}
#p-basics .pb-iso .lay:not(.now) .lab.keep text{fill:var(--ink-2)}
#p-basics .lab circle.prob{fill:none;stroke:#C2412A;stroke-width:1.8;stroke-dasharray:5 4}
#p-basics .probt{fill:#C2412A!important;font-size:14px;font-weight:650}
#p-basics .ok{stroke:#147A4A!important}#p-basics .okt{fill:#147A4A!important}
#p-basics .bad{stroke:#C2412A!important}#p-basics .badt{fill:#C2412A!important}
#p-basics .zone{fill:rgba(194,65,42,.08);stroke:#C2412A;stroke-width:1;stroke-dasharray:4 3}
#p-basics .chipb{fill:var(--pf);stroke:var(--c);stroke-width:1.3}
#p-basics .chipt{font-size:12px;font-weight:600;fill:var(--ink)!important}
#p-basics .arr{fill:var(--c)}
#p-basics .okf{fill:#147A4A}
#p-basics svg text.tiny{font-size:11.5px}
#p-basics svg text.rowt{font-size:16px;font-weight:700;fill:var(--ink)}
#p-basics .pb-iso .base{--c:#5E6B7C;--pf:#F2F5F9}
[data-theme=dark] #p-basics .pb-iso .base{--c:#9AABC2;--pf:#1C293D}
#p-basics .pb-rch .pb-fig{aspect-ratio:auto}#p-basics .pb-rch .pb-fig svg{height:auto}
#p-basics .lay.now .dr{stroke-dasharray:1;stroke-dashoffset:1;animation:pbdraw .8s ease forwards}
#p-basics .lay.now .fi{animation:pbfade .6s ease}
@keyframes pbdraw{to{stroke-dashoffset:0}}@keyframes pbfade{from{opacity:0}to{opacity:1}}
#p-basics[data-mode=read] .dr,#p-basics[data-mode=read] .fi{animation:none!important;stroke-dasharray:none!important}
@media (prefers-reduced-motion:reduce){#p-basics .dr,#p-basics .fi,#p-basics .pb-sb{animation:none!important;stroke-dasharray:none!important}#p-basics .pb-iso .lay{transition:none}}
@media (max-width:900px){
 #p-basics .pb-bar{margin:0 -16px}
 #p-basics .pb-stk{grid-template-columns:1fr;grid-template-rows:56% 44%;gap:10px;align-items:stretch;padding:8px 0}
 #p-basics .pb-fig{padding:8px;border-radius:12px}
 #p-basics .pb-txt{justify-content:flex-start}
 #p-basics .pb-txt h2{font-size:19px}#p-basics .pb-txt>p{display:none}
 #p-basics .pb-steps>li:not(.on),#p-basics[data-mode=story] .pb-pts li:not(.on){display:none}
 #p-basics .pb-steps>li{border-left:0;padding:0}
 #p-basics .pb-steps>li.on .pb-sh{font-size:16px;padding-top:2px}
 #p-basics[data-mode=story] .pb-pts li{border-left:0;padding:2px 0;font-size:15.5px}
 #p-basics .pb-cnt{display:block}
 #p-basics .pb-row,#p-basics .pb-rch{grid-template-columns:1fr}
 #p-basics .pb-rch .pb-fig{position:static}
 #p-basics .pb-mode button{padding:7px 11px}
 #p-basics .pb-iso .lab text{font-size:25px}#p-basics .pb-iso .lab text.sub{display:none}#p-basics .pb-iso .probt{font-size:24px}
 #p-basics .pb-iso .lay:not(.now) .lab.keep{display:none}
 #p-basics svg.f2 text{font-size:18px}#p-basics svg.f2 .chipt{font-size:15.5px}#p-basics svg.f2 text.tiny{font-size:12px}#p-basics svg.f2 text.rowt{font-size:17px}
}
`;document.head.appendChild(st);}

/* ===================================================================== isometric drawing of the worked example */
const S=26,C30=.8660254;
let BB;const resetBB=()=>BB=[1e9,1e9,-1e9,-1e9];
const P2=(x,y,z,track=true)=>{const X=(x-y)*C30*S,Y=((x+y)*.5-z)*S;if(track){BB[0]=Math.min(BB[0],X);BB[1]=Math.min(BB[1],Y);BB[2]=Math.max(BB[2],X);BB[3]=Math.max(BB[3],Y);}return [X,Y];};
const pp=p=>P2(p[0],p[1],p[2]);
const add3=(a,b,k=1)=>[a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k],sub3=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const nrm=a=>{const l=Math.hypot(...a);return [a[0]/l,a[1]/l,a[2]/l];};
const f1=n=>Math.round(n*10)/10;
function basis(ax){const a=nrm(ax),u=nrm(cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),v=cross(a,u);return [a,u,v];}
function ring(c,ax,r,n=40){const [,u,v]=basis(ax),o=[];for(let i=0;i<n;i++){const t=i/n*Math.PI*2;o.push(add3(add3(c,u,r*Math.cos(t)),v,r*Math.sin(t)));}return o;}
function hull(p){p=p.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];
 for(const q of p){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q);}
 for(const q of p.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q);}return lo.slice(0,-1).concat(up.slice(0,-1));}
const pathOf=(pts,close=true)=>'M'+pts.map(q=>f1(q[0])+' '+f1(q[1])).join('L')+(close?'Z':'');
const VIEW=[1,1,1];
/* output buffers per layer */
let OUT;const o=(l,s)=>{(OUT[l]=OUT[l]||[]).push(s);};
function cyl(l,c0,c1,r,cls='sf',extra=[]){const ax=sub3(c1,c0),a=ring(c0,ax,r),b=ring(c1,ax,r);const h=hull(a.concat(b,extra).map(pp));o(l,`<path class="${cls} fi" d="${pathOf(h)}"/>`);
 const vis=dot(ax,VIEW)>0?b:a;o(l,`<path class="${cls==='tk'?'tk':'sf'} fi" d="${pathOf(vis.map(pp))}"/>`);}
function seam(l,c,ax,r){const rr=ring(c,ax,r,48).filter(q=>dot(sub3(q,c),VIEW)>-0.02);if(rr.length<2)return;
 const pts=rr.map(pp);const i0=pts.findIndex((q,i)=>i>0&&Math.hypot(q[0]-pts[i-1][0],q[1]-pts[i-1][1])>S*r*0.6);const seq=i0>0?pts.slice(i0).concat(pts.slice(0,i0)):pts;o(l,`<path class="lnt" d="${pathOf(seq,false)}"/>`);}
function pipe(l,a,b,r){const A=pp(a),B=pp(b),w=f1(2*r*S*1.08);const d=`M${f1(A[0])} ${f1(A[1])}L${f1(B[0])} ${f1(B[1])}`;
 o(l,`<path class="po dr" pathLength="1" style="stroke-width:${f1(+w+2.6)}" d="${d}"/><path class="pi dr" pathLength="1" style="stroke-width:${w}" d="${d}"/>`);}
function bend(l,pts,r){const q=pts.map(pp),w=f1(2*r*S*1.08),d=pathOf(q,false);o(l,`<path class="po" style="stroke-width:${f1(+w+2.6)};stroke-linecap:butt" d="${d}"/><path class="pi" style="stroke-width:${w}" d="${d}"/>`);}
function flange(l,c,ax,r){const a=nrm(ax);cyl(l,add3(c,a,-.05),add3(c,a,.05),r*2.05);}
function weldDot(l,p){const q=pp(p);o(l,`<circle class="dk" cx="${f1(q[0])}" cy="${f1(q[1])}" r="2.6"/>`);}
function box(l,c,s,cls='sf'){const pts=[];for(const dx of[-1,1])for(const dy of[-1,1])for(const dz of[-1,1])pts.push(pp([c[0]+dx*s[0]/2,c[1]+dy*s[1]/2,c[2]+dz*s[2]/2]));
 o(l,`<path class="${cls}" d="${pathOf(hull(pts))}"/>`);const t=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([dx,dy])=>pp([c[0]+dx*s[0]/2,c[1]+dy*s[1]/2,c[2]+s[2]/2]));o(l,`<path class="${cls}" d="${pathOf(t)}"/>`);}
function lab(l,p,dx,dy,t,sub,keep){const q=pp(p),x=q[0]+dx,y=q[1]+dy,anc=dx<0?'end':'start';
 o(l,`<g class="lab${keep?' keep':''}"><line x1="${f1(q[0])}" y1="${f1(q[1])}" x2="${f1(x)}" y2="${f1(y)}"/><circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="2.2"/><text x="${f1(x+(dx<0?-4:4))}" y="${f1(y+4)}" text-anchor="${anc}">${t}</text>${sub?`<text class="sub" x="${f1(x+(dx<0?-4:4))}" y="${f1(y+18)}" text-anchor="${anc}">${sub}</text>`:''}</g>`);P2(...p);BB[0]=Math.min(BB[0],x-(anc==='end'?110:0));BB[2]=Math.max(BB[2],x+(anc==='start'?110:0));BB[1]=Math.min(BB[1],y-8);BB[3]=Math.max(BB[3],y+20);}
function prob(l,p,dx,dy,t){const q=pp(p);o(l,`<g class="lab keepnow"><circle class="prob" cx="${f1(q[0])}" cy="${f1(q[1])}" r="20"/>${t?`<text class="probt" x="${f1(q[0]+dx)}" y="${f1(q[1]+dy)}" text-anchor="${dx<0?'end':'start'}">${t}</text>`:''}</g>`);if(t){const x=q[0]+dx;BB[0]=Math.min(BB[0],dx<0?x-150:x);BB[2]=Math.max(BB[2],dx<0?x:x+150);BB[3]=Math.max(BB[3],q[1]+dy+6);}}
function gate(l,c,dir,r,stem){const a=nrm(dir),s=nrm(stem);flange(l,add3(c,a,-.34),a,r);flange(l,add3(c,a,.34),a,r);cyl(l,add3(c,a,-.28),add3(c,a,.28),r*1.45);
 cyl(l,c,add3(c,s,.62),r*.85);const t0=pp(add3(c,s,.62)),t1=pp(add3(c,s,.98));o(l,`<path class="ln" d="M${f1(t0[0])} ${f1(t0[1])}L${f1(t1[0])} ${f1(t1[1])}"/>`);
 o(l,`<path class="ln" style="stroke-width:2.6" d="${pathOf(ring(add3(c,s,.95),s,.34,36).map(pp))}"/>`);}
function strainer(l,c,dir,r){const a=nrm(dir),leg=nrm([a[0]*.7,a[1]*.7,-.7]);flange(l,add3(c,a,-.4),a,r);
 /* leg first, so the body covers its root: no crossing outlines */
 const lr=r*.95,l0=add3(c,leg,.05),l1=add3(c,leg,.98);const h=hull(ring(l0,leg,lr).concat(ring(l1,leg,lr)).map(pp));o(l,`<path class="sf fi" d="${pathOf(h)}"/>`);
 const c0=add3(c,leg,.96),c1=add3(c,leg,1.1);o(l,`<path class="sf fi" d="${pathOf(hull(ring(c0,leg,r*1.25).concat(ring(c1,leg,r*1.25)).map(pp)))}"/>`);
 const b=hull(ring(add3(c,a,-.34),a,r*1.22).concat(ring(add3(c,a,.34),a,r*1.22)).map(pp));o(l,`<path class="sf fi" d="${pathOf(b)}"/>`);
 flange(l,add3(c,a,.4),a,r);}
function bellows(l,c,dir,r){const a=nrm(dir);flange(l,add3(c,a,-.45),a,r);flange(l,add3(c,a,.45),a,r);for(let i=-3;i<=3;i++){const q=add3(c,a,i*.11);cyl(l,add3(q,a,-.035),add3(q,a,.035),r*1.62);}}
function stanchion(l,x,y,ztop){cyl(l,[x,y,.12],[x,y,ztop],.12);box(l,[x,y,.06],[.62,.62,.12]);}
function grid(l){let s='';for(let x=-2;x<=22;x+=2){const a=P2(x,-8,0,false),b=P2(x,3,0,false);s+=`M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;}
 for(let y=-8;y<=3;y+=2){const a=P2(-2,y,0,false),b=P2(16,y,0,false);s+=`M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;}o(l,`<path class="grid" d="${s}"/>`);}

let ISO=null;
/* continuous pipe route with real bends (screen-space quadratic arcs) */
function routeD(pts,b){let d='';const q=pts.map(pp);d+=`M${f1(q[0][0])} ${f1(q[0][1])}`;
 for(let i=1;i<pts.length-1;i++){const din=nrm(sub3(pts[i],pts[i-1])),dout=nrm(sub3(pts[i+1],pts[i])),A=pp(add3(pts[i],din,-b)),B=pp(add3(pts[i],dout,b)),V=q[i];
  d+=`L${f1(A[0])} ${f1(A[1])}Q${f1(V[0])} ${f1(V[1])} ${f1(B[0])} ${f1(B[1])}`;}
 const e=q[q.length-1];return d+`L${f1(e[0])} ${f1(e[1])}`;}
function elbowPiece(l,p0,v,p1,r,b){const din=nrm(sub3(v,p0)),dout=nrm(sub3(p1,v));routeEl(l,[add3(v,din,-(b+.12)),v,add3(v,dout,b+.12)],r,b);
 weldDot(l,add3(v,din,-(b+.12)));weldDot(l,add3(v,dout,b+.12));}
function routeEl(l,pts,r,b,cls=''){const w=f1(2*r*S*1.08),d=routeD(pts,b);o(l,`<path class="po${cls} dr" pathLength="1" style="stroke-width:${f1(+w+2.6)}" d="${d}"/><path class="pi${cls} dr" pathLength="1" style="stroke-width:${w}" d="${d}"/>`);}
function lineP(l,a,b,cls='ln',w=''){const A=pp(a),B=pp(b);o(l,`<path class="${cls}" ${w?`style="stroke-width:${w}"`:''} d="M${f1(A[0])} ${f1(A[1])}L${f1(B[0])} ${f1(B[1])}"/>`);}
function vtank(l,c,r,z0,z1,dome=.55){cyl(l,[c[0],c[1],z0],[c[0],c[1],z1],r,'tk');const pts=[];for(let k=0;k<=5;k++){const rr=r*Math.cos(k/5*Math.PI/2),zz=z1+dome*Math.sin(k/5*Math.PI/2);pts.push(...ring([c[0],c[1],zz],[0,0,1],Math.max(rr,.01),32).map(pp));}
 o(l,`<path class="tk" d="${pathOf(hull(pts))}"/>`);seam(l,[c[0],c[1],z1],[0,0,1],r);}

function buildIso(){resetBB();OUT={};const R=.22,r=.16,Z=1.5,H=4.3,ZB=6.5,g=.45,bB=.42,bS=.36;
 const T2=[7.3,-6],XR=13.2,XD=18.4,T3x=17.3;
 grid('g');
 /* 0 · tanks */
 vtank(0,[0,0],1.45,0,5.2,.6);cyl(0,[1.25,0,Z],[1.7,0,Z],R);
 for(const [dx,dy] of [[-.95,-.95],[.95,-.95],[-.95,.95],[.95,.95]])lineP(0,[T2[0]+dx,T2[1]+dy,0],[T2[0]+dx,T2[1]+dy,4.1],'ln','3');
 vtank(0,T2,1.4,4,9,.55);cyl(0,[T2[0],-4.65,ZB],[T2[0],-4.42,ZB],r);
 box(0,[17.9,0,.55],[.5,1.9,1.1]);box(0,[20.9,0,.55],[.5,1.9,1.1]);
 {const pts=[];for(const xx of[16.9,21.9])pts.push(...ring([xx,0,1.6],[1,0,0],1.3).map(pp));for(let k=1;k<=5;k++){const rr=1.3*Math.cos(k/5*Math.PI/2),e=.5*Math.sin(k/5*Math.PI/2);pts.push(...ring([16.9-e,0,1.6],[1,0,0],Math.max(rr,.01),28).map(pp),...ring([21.9+e,0,1.6],[1,0,0],Math.max(rr,.01),28).map(pp));}
  o(0,`<path class="tk" d="${pathOf(hull(pts))}"/>`);seam(0,[21.9,0,1.6],[1,0,0],1.3);seam(0,[16.9,0,1.6],[1,0,0],1.3);}
 cyl(0,[XD,0,2.8],[XD,0,3.12],r);
 lab(0,[-.7,0,5.9],-30,-14,'Tank 1','Source',1);lab(0,[T2[0]-1.1,T2[1]+.7,8.4],-40,-22,'Tank 2','Gets part of the flow',1);lab(0,[21.4,0,2.7],24,-34,'Tank 3','Horizontal drum',1);

 /* 1 · straight pipe lengths, gaps left open */
 const seg=(a,b,rr)=>pipe(1,a,b,rr);
 seg([1.84,0,Z],[7.3-g,0,Z],R);seg([7.3+g,0,Z],[8.7,0,Z],R);
 seg([9.2,0,Z],[XR-g,0,Z],r);seg([XR,0,Z+g],[XR,0,H-g],r);seg([XR+g,0,H],[XD-g,0,H],r);seg([XD,0,H-g],[XD,0,3.24],r);
 seg([7.3,0,Z+g],[7.3,0,ZB-g],r);seg([7.3,-g,ZB],[7.3,-4.3,ZB],r);
 prob(1,[7.3,0,Z],-24,40,'Branch needed');prob(1,[8.95,0,Z],-14,58,'Size change');prob(1,[XR,0,Z],-14,56,'Bend needed');prob(1,[7.3,0,ZB],-24,-28,'Bend needed');
 prob(1,[XR,0,H]);prob(1,[XD,0,H]);

 /* 2 · fittings: the full line with bends, the fittings themselves highlighted */
 const big=[[1.84,0,Z],[8.7,0,Z]],small=[[9.2,0,Z],[XR,0,Z],[XR,0,H],[XD,0,H],[XD,0,3.24]],br=[[7.3,0,Z],[7.3,0,ZB],[7.3,-4.3,ZB]];
 {const w1=f1(2*R*S*1.08),w2=f1(2*r*S*1.08);const dB=routeD(big,bB),dS=routeD(small,bS),dR=routeD(br,bS);
  o(2,`<g class="base"><path class="po" style="stroke-width:${f1(+w1+2.6)}" d="${dB}"/><path class="po" style="stroke-width:${f1(+w2+2.6)}" d="${dS}"/><path class="po" style="stroke-width:${f1(+w2+2.6)}" d="${dR}"/><path class="pi" style="stroke-width:${w1}" d="${dB}"/><path class="pi" style="stroke-width:${w2}" d="${dS}"/><path class="pi" style="stroke-width:${w2}" d="${dR}"/></g>`);}
 elbowPiece(2,[XR-1,0,Z],[XR,0,Z],[XR,0,Z+1],r,bS);elbowPiece(2,[XR,0,H-1],[XR,0,H],[XR+1,0,H],r,bS);elbowPiece(2,[XD-1,0,H],[XD,0,H],[XD,0,H-1],r,bS);elbowPiece(2,[7.3,0,ZB-1],[7.3,0,ZB],[7.3,-1,ZB],r,bS);
 routeEl(2,[[7.3-.5,0,Z],[7.3+.5,0,Z]],R,0);routeEl(2,[[7.3,0,Z],[7.3,0,Z+.55]],r,0);
 {const a=ring([8.7,0,Z],[1,0,0],R).map(pp),b=ring([9.2,0,Z],[1,0,0],r).map(pp);o(2,`<path class="sf fi" d="${pathOf(hull(a.concat(b)))}"/><path class="sf fi" d="${pathOf(b)}"/>`);}
 lab(2,[7.3,0,Z-.1],-26,46,'Tee','Takes a branch off');lab(2,[8.95,0,Z-.1],-14,62,'Reducer','Joins two sizes');lab(2,[XR,0,Z-.15],-14,60,'Elbow','Changes direction');
 lab(2,[7.3,-.25,ZB+.15],-34,-26,'Elbow');lab(2,[XD+.2,0,H+.1],30,-26,'Elbow');

 /* 3 · end connections */
 flange(3,[1.72,0,Z],[1,0,0],R);flange(3,[1.84,0,Z],[1,0,0],R);flange(3,[7.3,-4.42,ZB],[0,1,0],r);flange(3,[7.3,-4.3,ZB],[0,1,0],r);flange(3,[XD,0,3.12],[0,0,1],r);flange(3,[XD,0,3.24],[0,0,1],r);
 for(const p of [[7.3-.5,0,Z],[7.3+.5,0,Z],[7.3,0,Z+.55],[8.7,0,Z],[9.2,0,Z]])weldDot(3,p);
 lab(3,[1.78,0,Z-.4],-24,58,'Flanged joint','Can be taken apart');lab(3,[7.3,-4.36,ZB+.4],28,-26,'Flanged joint');lab(3,[XD+.2,0,3.18],34,-26,'Flanged joint');lab(3,[9.2,0,Z],8,58,'Welded joint','Strong and leak-tight');

 /* 4 · valves */
 gate(4,[3.2,0,Z],[1,0,0],R,[0,0,1]);gate(4,[7.3,0,3.7],[0,0,1],r,[1,0,0]);gate(4,[16.6,0,H],[1,0,0],r,[0,0,1]);
 lab(4,[3.2,0,Z-.35],-14,52,'Gate valve','Isolates Tank 1');lab(4,[8.25,0,3.7],22,-14,'Valve','On the branch');lab(4,[16.6,0,H+1.3],16,-34,'Valve','Isolates Tank 3');
 /* 5 · strainer */
 strainer(5,[4.8,0,Z],[1,0,0],R);lab(5,[5.2,0,Z-.6],-30,56,'Y-strainer','Catches debris');
 /* 6 · expansion joint */
 bellows(6,[XR,0,2.9],[0,0,1],r);lab(6,[XR+.3,0,3.2],46,-82,'Expansion joint','Takes up movement');
 /* 7 · instruments */
 {const b=[6.1,0,Z+R],t=[6.1,0,Z+.9];lineP(7,b,t,'ln','2.4');const B=pp(t);o(7,`<circle class="sf fi" cx="${f1(B[0])}" cy="${f1(B[1]-10)}" r="11"/><path class="ln" d="M${f1(B[0])} ${f1(B[1]-10)}l6 -5"/>`);lab(7,[6.1,0,Z+1.5],-10,-44,'Pressure gauge');}
 flange(7,[10.83,0,Z],[1,0,0],r*.95);flange(7,[10.97,0,Z],[1,0,0],r*.95);lineP(7,[10.83,0,Z+.32],[10.83,0,Z+.98]);lineP(7,[10.97,0,Z+.32],[10.97,0,Z+.98]);box(7,[10.9,0,Z+1.2],[.5,.5,.45]);
 lab(7,[10.9,0,Z+1.45],12,-40,'Flow meter','Orifice and transmitter');
 /* 8 · supports */
 stanchion(8,8.1,0,Z-R);stanchion(8,12.0,0,Z-r);
 box(8,[7.3,-2.6,8.7],[3.2,.36,.4]);lineP(8,[7.3,-2.6,ZB+r],[7.3,-2.6,8.5],'ln','2.2');o(8,`<path class="ln" style="stroke-width:2.4" d="${pathOf(ring([7.3,-2.6,ZB],[0,1,0],r*1.35).map(pp))}"/>`);
 lab(8,[8.1,0,.5],-22,52,'Rest support','Carries the weight');lab(8,[12.0,0,.5],-12,58,'Rest support');lab(8,[5.9,-2.6,8.7],-30,22,'Rod hanger','From steel above');

 const pad=16,[x0,y0,x1,y1]=BB;const vb=`${f1(x0-pad)} ${f1(y0-pad)} ${f1(x1-x0+pad*2)} ${f1(y1-y0+pad*2)}`;
 let s=`<svg class="pb-iso" viewBox="${vb}" role="img" aria-label="Isometric sketch of the example piping system"><g class="fg">${(OUT.g||[]).join('')}</g>`;
 for(let l=0;l<=8;l++)s+=`<g class="lay" data-l="${l}">${(OUT[l]||[]).join('')}</g>`;
 return s+'</svg>';}
function isoSVG(){if(!ISO)ISO=buildIso();return ISO;}
function setIso(svg,k){svg.querySelectorAll('.lay').forEach(g=>{const l=+g.dataset.l;g.classList.toggle('on',l<=k);g.classList.toggle('now',l===k);});}

/* ===================================================================== small 2D figures for the chapters */
const T=(x,y,t,c='',a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" ${c?`class="${c}"`:''}>${t}</text>`;
const T2=(x,y,lines,c='',a='middle',lh=21)=>lines.map((t,i)=>T(x,y+i*lh,t,c,a)).join('');
const arrowHead=(x,y,ang,cls='arr')=>{const a=ang*Math.PI/180,p=(d,s)=>[x-Math.cos(a)*d+Math.cos(a+Math.PI/2)*s,y-Math.sin(a)*d+Math.sin(a+Math.PI/2)*s];const b=p(11,5.5),c=p(11,-5.5);return `<path class="${cls}" d="M${x} ${y}L${f1(b[0])} ${f1(b[1])}L${f1(c[0])} ${f1(c[1])}Z"/>`;};
const arr=(d,x,y,ang)=>`<path class="ln" d="${d}"/>${arrowHead(x,y,ang)}`;
const pth=(d,w=14)=>`<path class="po" style="stroke-width:${w+2.8}" d="${d}"/><path class="pi" style="stroke-width:${w}" d="${d}"/>`;
const G=(h,inner,cls='')=>`<g class="fg ${cls}"${h!==''?` data-h="${h}"`:''}>${inner}</g>`;
const ground=(y,x0,x1)=>{let s=`<path class="ln" d="M${x0} ${y}H${x1}"/>`;for(let x=x0+8;x<x1;x+=18)s+=`<path class="lnt" d="M${x} ${y+2}l-9 10"/>`;return s;};
/* gate valve on a horizontal pipe (bow-tie body, stem up, handwheel) */
const valveH=(x,y,s=1,up=1)=>{const w=16*s,h=11*s;return `<path class="sf" d="M${x-w} ${y-h}L${x+w} ${y+h}V${y-h}L${x-w} ${y+h}Z"/><path class="ln" d="M${x} ${y}V${y-up*30*s}"/><ellipse class="ln" style="stroke-width:2.6" cx="${x}" cy="${y-up*32*s}" rx="${15*s}" ry="${4.5*s}"/>`;};
const valveV=(x,y,s=1,side=-1)=>{const w=11*s,h=16*s;return `<path class="sf" d="M${x-w} ${y-h}L${x+w} ${y-h}L${x-w} ${y+h}L${x+w} ${y+h}Z"/><path class="ln" d="M${x} ${y}H${x+side*30*s}"/><ellipse class="ln" style="stroke-width:2.6" cx="${x+side*32*s}" cy="${y}" rx="${4.5*s}" ry="${15*s}"/>`;};
const person=(x,y,s=1)=>`<g class="fg"><circle class="sf" cx="${x}" cy="${y-112*s}" r="${11*s}"/><path class="ln" style="stroke-width:2.2" d="M${x} ${y-100*s}V${y-50*s}M${x} ${y-88*s}L${x-17*s} ${y-62*s}M${x} ${y-88*s}L${x+17*s} ${y-62*s}M${x} ${y-50*s}L${x-12*s} ${y}M${x} ${y-50*s}L${x+12*s} ${y}"/></g>`;
const card=(x,y,w,h,title,icon,hl)=>G(hl,`<rect class="chipb" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>${icon}${T(x+w/2,y+h-16,title,'chipt')}`);

const FIG={
 flow:()=>{let s=`<svg class="f2" viewBox="0 0 720 470">`;const W=196,Hh=170;
  const ic={
   a:(x,y)=>`<circle class="sf" cx="${x+48}" cy="${y+62}" r="17"/><circle class="sf" cx="${x+148}" cy="${y+40}" r="15"/><circle class="sf" cx="${x+148}" cy="${y+92}" r="15"/>${arr(`M${x+66} ${y+57}L${x+124} ${y+44}`,x+131,y+42,-13)}${arr(`M${x+66} ${y+67}L${x+124} ${y+87}`,x+131,y+89,18)}`,
   b:(x,y)=>`<rect class="sf" x="${x+30}" y="${y+24}" width="136" height="88" rx="4"/><path class="lnt" d="M${x+30} ${y+46}H${x+166}M${x+30} ${y+68}H${x+166}M${x+30} ${y+90}H${x+166}M${x+80} ${y+24}V${y+112}"/>${T(x+55,y+40,'Size','tiny')}${T(x+123,y+40,'6&quot;','tiny')}${T(x+55,y+62,'Class','tiny')}${T(x+123,y+62,'A1','tiny')}${T(x+55,y+84,'Fluid','tiny')}${T(x+123,y+84,'Water','tiny')}`,
   c:(x,y)=>`<rect class="sf" x="${x+26}" y="${y+22}" width="144" height="94" rx="4"/><path class="ln" d="M${x+40} ${y+80}H${x+80}M${x+104} ${y+80}H${x+152}"/><path class="sf" d="M${x+80} ${y+72}L${x+104} ${y+88}V${y+72}L${x+80} ${y+88}Z"/><circle class="sf" cx="${x+128}" cy="${y+50}" r="13"/><path class="lnt" d="M${x+128} ${y+63}V${y+80}"/>${T(x+128,y+54,'FI','tiny')}`,
   d:(x,y)=>`${pth(`M${x+36} ${y+100}L${x+86} ${y+72}L${x+86} ${y+38}L${x+150} ${y+2+36}`,10)}<path class="sf" d="M${x+120} ${y+98}l26 -15l26 15l-26 15z"/><path class="sf" d="M${x+120} ${y+98}v-30l26 -15v30zM${x+146} ${y+83}v-30l26 15v30z"/>`,
   e:(x,y)=>`<rect class="sf" x="${x+26}" y="${y+18}" width="144" height="100" rx="4"/><path class="ln" d="M${x+44} ${y+94}L${x+84} ${y+72}V${y+44}L${x+128} ${y+30}"/><path class="lnt" d="M${x+44} ${y+104}L${x+84} ${y+82}"/>${T(x+70,y+112,'2600','tiny')}<path class="lnt" d="M${x+140} ${y+70}H${x+162}M${x+140} ${y+80}H${x+162}M${x+140} ${y+90}H${x+162}"/>`};
  const P=[[16,40,'Flow scheme','a','0'],[262,40,'Line data','b','1'],[508,40,'P&amp;ID','c','2'],[508,270,'3D model','d','3'],[262,270,'Isometrics &amp; GAs','e','4']];
  for(const [x,y,t,k,h] of P)s+=card(x,y,W,Hh,t,ic[k](x,y),h);
  s+=G('',`${arr('M214 125H254',259,125,0)}${arr('M460 125H500',505,125,0)}${arr('M606 212V262',606,267,90)}${arr('M506 355H466',461,355,180)}`);
  s+=G('4',`${arr('M260 355H226',221,355,180)}<rect class="chipb" x="16" y="300" width="200" height="110" rx="12"/>${T2(116,346,['Fabrication','and erection'],'chipt')}`);
  return s+'</svg>';},

 route:()=>{let s=`<svg class="f2" viewBox="0 0 720 520">`;
  s+=G('2',`<rect class="sf" x="150" y="40" width="470" height="44" rx="4"/><path class="lnt" d="M150 52H620M150 62H620M150 72H620"/>${T(385,30,'Pipe rack: lines grouped at set elevations')}`);
  s+=G('1',`<rect class="zone" x="280" y="372" width="130" height="78"/>${T(345,440,'Removal space','badt')}<rect class="zone" x="470" y="270" width="54" height="200"/>${T(497,508,'Walkway','badt')}`);
  s+=G('',`<circle class="tk" cx="90" cy="290" r="56"/>${T(90,296,'Tank A')}<circle class="tk" cx="630" cy="160" r="56"/>${T(630,166,'Tank B')}<rect class="tk" x="280" y="300" width="130" height="72" rx="8"/>${T(345,342,'Pump')}`);
  s+=G('0',`<path class="ln ok" style="stroke-width:5" d="M105 236H630V222"/>${arrowHead(630,218,-90,'arr okf')}${T(390,226,'Preferred: short, one bend, clear of access','okt')}`,'hl');
  s+=G('0 1',`<path class="ln bad" style="stroke-width:3.2;stroke-dasharray:8 6" d="M90 346V410H440V256H482V486H660V214"/>${T(240,508,'Avoid: long, many bends, blocks access','badt')}`);
  return s+'</svg>';},

 access:()=>{let s=`<svg class="f2" viewBox="0 0 720 540">`;const gy=500;
  s+=G('',ground(gy,10,710));
  s+=G('0',`<rect x="40" y="395" width="300" height="63" style="fill:rgba(20,122,74,.08)"/>${T(110,384,'Easy reach','okt','start')}`);
  s+=person(66,gy);
  /* platform with handrail and ladder */
  s+=G('1',`<rect class="sf" x="420" y="185" width="240" height="9"/><path class="lnt" d="M424 185V108M542 185V108M656 185V108M424 108H656M424 146H656"/>${T(540,214,'Platform')}<path class="lnt" d="M672 185V${gy}M696 185V${gy}"/>${Array.from({length:17},(_,i)=>`<path class="lnt" d="M672 ${200+i*18}H696"/>`).join('')}`);
  s+=pth(`M120 444H320V122H720`,12);
  s+=`<rect class="sf" x="112" y="432" width="8" height="24"/>`;
  s+=G('0',valveH(168,444,1));
  s+=G('2',`<path class="sf" d="M228 432H262V456H228Z"/><path class="sf" d="M250 452l18 26l10 -6l-18 -26z"/>${T(286,484,'Horizontal lines only','','start')}`);
  s+=G('1',valveV(320,262,1,-1)+`<path class="lnt" style="stroke-dasharray:3 4" d="M285 278V460M281 278V460"/>${T2(272,232,['Too high from grade:','add a chain wheel or platform'],'badt','end')}`);
  s+=G('3',`<path class="ln" d="M326 352H352"/><circle class="sf" cx="360" cy="352" r="9"/>${T2(376,348,['Thermowell: check','the minimum line size'],'','start')}`);
  s+=G('1',valveH(560,122,1)+T(560,68,'Operated from the platform','okt'));
  return s+'</svg>';},

 straight:()=>{let s=`<svg class="f2" viewBox="0 0 720 380">`;const y=190;
  s+=pth(`M66 20V${y-40}Q66 ${y} 106 ${y}H700`,22);
  s+=G('0',`${T(110,40,'Elbow upstream','','start')}${[0,1,2,3].map(i=>`<path class="ln" d="M${130+i*0} ${y-14+i*9}h${[26,18,10,4][i]}"/>`).join('')}${T(150,y-28,'Disturbed flow','','start')}`);
  s+=G('0',`${[0,1,2,3].map(i=>`<path class="ln" d="M420 ${y-14+i*9}h${[14,24,24,14][i]}"/>`).join('')}${T(434,y-28,'Settled')}`);
  s+=G('',`<rect class="sf" x="470" y="${y-24}" width="8" height="48"/><rect class="sf" x="482" y="${y-24}" width="8" height="48"/><path class="ln" d="M480 ${y-24}V${y-48}"/>${T(480,y-56,'Orifice')}`,'hl');
  s+=G('',valveH(650,y,1.1)+T(650,y-64,'Valve'));
  s+=G('1 2',`<path class="lnt" d="M106 ${y+26}V${y+80}M476 ${y+26}V${y+80}M630 ${y+26}V${y+80}"/>${arr(`M114 ${y+64}H468`,470,y+64,0)}${arrowHead(110,y+64,180)}${T(290,y+98,'Upstream straight, e.g. 15 D or more')}${arr(`M484 ${y+64}H622`,624,y+64,0)}${arrowHead(480,y+64,180)}${T(556,y+98,'e.g. 5 D')}`);
  s+=G('',`<path class="lnt" d="M560 ${y-12}V${y+12}"/>${arrowHead(560,y-12,-90)}${arrowHead(560,y+12,90)}${T(570,y+5,'D','','start')}${arr(`M250 ${y-60}H330`,336,y-60,0)}${T(290,y-72,'Flow')}`);
  return s+'</svg>';},

 vent:()=>{let s=`<svg class="f2" viewBox="0 0 720 470">`;const gy=420;
  s+=G('',ground(gy,10,710)+`<rect class="sf" x="40" y="360" width="100" height="44" rx="8"/><rect class="sf" x="30" y="404" width="120" height="16"/>${T(90,388,'Pump')}<rect class="tk" x="590" y="120" width="110" height="270" rx="26"/><rect class="sf" x="610" y="390" width="70" height="30"/>${T(645,260,'Vessel')}`);
  s+=G('',`<rect class="zone" style="fill:rgba(94,107,124,.07);stroke:var(--rule)" x="190" y="330" width="260" height="90"/>${T(320,385,'Road')}`);
  s+=pth('M120 360V130H470V346L540 358V270H590',13);
  s+=G('0 3',`<path class="ln" d="M300 122V70"/><path class="sf" d="M290 100L310 100L290 80L310 80Z"/><path class="sf" d="M291 66h18v-6h-18z"/>${T(300,44,'Vent with valve at the high point')}`);
  s+=G('1 3',`<path class="ln" d="M540 366V408"/><path class="sf" d="M530 374L550 374L530 394L550 394Z"/><path class="sf" d="M531 408h18v6h-18z"/>${T(530,452,'Drain with valve at the low point','','end')}`);
  s+=G('2',`${T(505,330,'Slope','','middle')}`);
  s+=G('3',`${T(488,100,'Hydrotest: fill low, vent high','','start')}`);
  return s+'</svg>';},

 insul:()=>{
  const W=`<svg class="f2" viewBox="0 0 720 420">`,E='</svg>';
  /* end view of a pipe: rings from outside in */
  const ring=(cx,cy,r,fill,extra='')=>`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${fill};stroke:var(--c);stroke-width:1.4" ${extra}/>`;
  const PIPE='var(--pf)',INS='#F1DEAA',CLAD='#DDE3EA',HOT='#F6D5CC',COLD='#D6E6FA';
  const curved=(x1,y1,x2,y2,col)=>`<path d="M${x1} ${y1}Q${(x1+x2)/2+18} ${(y1+y2)/2-18} ${x2} ${y2}" style="fill:none;stroke:${col};stroke-width:2.4"/>`;
  const head=(x,y,ang,col)=>{const a=ang*Math.PI/180,b=[x-Math.cos(a)*11+Math.cos(a+1.57)*5.5,y-Math.sin(a)*11+Math.sin(a+1.57)*5.5],c=[x-Math.cos(a)*11-Math.cos(a+1.57)*5.5,y-Math.sin(a)*11-Math.sin(a+1.57)*5.5];return `<path d="M${x} ${y}L${f1(b[0])} ${f1(b[1])}L${f1(c[0])} ${f1(c[1])}Z" style="fill:${col}"/>`;};
  const lead=(x,y,tx,ty,t,a='start')=>`<path class="lnt" d="M${x} ${y}L${tx} ${ty}"/><circle class="dk" cx="${x}" cy="${y}" r="3"/>${T(tx+(a==='start'?6:-6),ty+5,t,'',a)}`;
  const f=[];
  /* 1 · hot insulation */
  f.push(W+G('',ring(250,210,150,CLAD)+ring(250,210,142,INS)+ring(250,210,62,HOT)+ring(250,210,52,'#FBEAE5')+T(250,215,'Hot fluid'))
   +`${[[-90],[30],[150]].map(([a])=>{const r=a*Math.PI/180,x1=250+Math.cos(r)*70,y1=210+Math.sin(r)*70,x2=250+Math.cos(r)*118,y2=210+Math.sin(r)*118;return `<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:#C2412A;stroke-width:2.6"/><path d="M${f1(x2+Math.cos(r)*4)} ${f1(y2+Math.sin(r)*4)}l${f1(-Math.sin(r)*10)} ${f1(Math.cos(r)*10)}M${f1(x2+Math.cos(r)*4)} ${f1(y2+Math.sin(r)*4)}l${f1(Math.sin(r)*10)} ${f1(-Math.cos(r)*10)}" style="stroke:#C2412A;stroke-width:3"/>`;}).join('')}`
   +lead(250+108,210-60,470,110,'Insulation')+lead(250+146*.7,210+146*.7,470,330,'Cladding')+lead(250+57*.6,210+57*.6,470,240,'Pipe')
   +T(560,40,'Heat is stopped at the insulation','badt','middle')+E);
  /* 2 · personnel protection */
  {let s=W+G('',ground(380,10,710));s+=person(70,380);s+=`<rect x="20" y="170" width="300" height="210" style="fill:rgba(194,65,42,.07)"/>${T(30,160,'Within reach','badt','start')}`;
   s+=pth('M120 300H700',26);
   s+=G('',`<rect class="ln" style="stroke-dasharray:3 3" x="140" y="262" width="170" height="76" rx="8"/><path class="lnt" d="M160 262V338M180 262V338M200 262V338M220 262V338M240 262V338M260 262V338M280 262V338M300 262V338"/>`,'hl');
   s+=T(225,240,'Guard (or insulation) where it can be touched')+T(520,352,'Out of reach: no guard needed')+E;f.push(s);}
  /* 3 · cold and anti-sweat */
  {let s=W;s+=ring(180,200,90,COLD)+ring(180,200,80,PIPE)+T(180,205,'Cold fluid');for(const [x,y] of [[118,276],[142,290],[180,296],[220,288],[244,272]])s+=`<path d="M${x} ${y}q-6 10 0 14q6 -4 0 -14z" style="fill:#5B8DEF"/>`;
   s+=T(180,350,'Bare: moisture condenses','badt');
   s+=ring(520,200,128,CLAD)+`<circle cx="520" cy="200" r="122" style="fill:none;stroke:var(--c);stroke-width:2;stroke-dasharray:5 4"/>`+ring(520,200,116,INS)+ring(520,200,56,COLD)+ring(520,200,48,PIPE)+T(520,205,'Cold fluid');
   s+=T(520,370,'Insulated: dry outside','okt')+lead(520+86,200-86,660,36,'Vapour barrier','end')+E;f.push(s);}
  /* 4 · tracing and acoustic */
  {let s=W;s+=ring(190,200,128,CLAD)+ring(190,200,120,INS)+ring(190,200,56,PIPE)+ring(190,270,12,'#F6D5CC')+lead(190,270,206,376,'Tracer under the insulation','start');s+=T(190,40,'Heat-traced line','rowt');
   s+=ring(540,200,140,CLAD)+ring(540,200,132,INS)+`<circle cx="540" cy="200" r="98" style="fill:#E5D3A0;stroke:var(--c);stroke-width:1.4"/>`+ring(540,200,90,INS)+ring(540,200,52,PIPE)+T(540,40,'Acoustic','rowt')+lead(540+70,200+66,660,384,'Extra dense layer','end');s+=E;f.push(s);}
  /* 5 · materials */
  {let s=W;s+=`<rect x="40" y="90" width="300" height="200" rx="10" style="fill:${INS};stroke:var(--c);stroke-width:1.4"/>`;
   for(let i=0;i<9;i++)s+=`<path d="M52 ${110+i*20}c40 -14 70 14 110 0s70 -14 110 0s50 10 56 4" style="fill:none;stroke:#B99A4E;stroke-width:1.6"/>`;
   s+=`<rect x="380" y="90" width="300" height="200" rx="10" style="fill:#EFE9DC;stroke:var(--c);stroke-width:1.4"/>`;
   for(let y=108;y<284;y+=26)for(let x=396+((y/26)%2)*13;x<670;x+=26)s+=`<circle cx="${x}" cy="${y}" r="10" style="fill:#fff;stroke:#B9AE95;stroke-width:1.4"/>`;
   s+=T(190,60,'Fibrous','rowt')+T(530,60,'Cellular','rowt')+T2(190,326,['Mineral wool, glass wool'],'')+T2(530,326,['Calcium silicate, cellular glass,','PUF, polystyrene'],'');s+=T(360,404,'Both work by trapping still air');f.push(s+E);}
  /* 6 · cladding */
  {let s=W;const cy=210;
   s+=pth(`M40 ${cy}H690`,60);
   s+=`<path d="M40 ${cy-92}H520V${cy+92}H40Z" style="fill:${INS};stroke:var(--c);stroke-width:1.4"/>`;
   s+=`<path d="M40 ${cy-102}H420V${cy+102}H40Z" style="fill:${CLAD};stroke:var(--c);stroke-width:1.4"/><path class="lnt" d="M230 ${cy-102}V${cy+102}M236 ${cy-102}V${cy+102}"/>`;
   s+=`<rect class="sf" x="120" y="${cy-108}" width="12" height="216"/><rect class="sf" x="330" y="${cy-108}" width="12" height="216"/>`;
   s+=lead(380,cy-102,380,50,'Metal cladding')+lead(126,cy-108,126,50,'Band')+lead(470,cy-92,520,90,'Insulation')+lead(620,cy-28,640,140,'Pipe','end')+lead(233,cy+102,233,370,'Overlap, sealed against rain');
   f.push(s+E);}
  return f;},
 calc:()=>{const rows=[['Fluid type','Temp &amp;|pressure','Design life','Pick by practice|&amp; cost','Listed in|the code?'],['Flow rate','Allowed|velocity','Area →|trial size','Pressure|drop','Within|budget?'],['Material|&amp; size','Design|P &amp; T','Corrosion|allowance','Code|thickness','Pick the|schedule']];
  const lb=['Material','Size','Thickness'],no=['No: next listed material','No: one size up'];
  let s=`<svg class="f2" viewBox="0 0 720 540">`;
  rows.forEach((r,i)=>{const y=44+i*170;let g=T(8,y-14,lb[i],'rowt','start');
   r.forEach((t,j)=>{const x=8+j*143;g+=`<rect class="chipb" x="${x}" y="${y}" width="128" height="62" rx="10"/>`+T2(x+64,y+(t.includes('|')?27:36),t.split('|'),'chipt','middle',17);if(j<4)g+=arr(`M${x+130} ${y+31}H${x+137}`,x+142,y+31,0);});
   if(i<2)g+=`<path class="ln" d="M${8+4*143+64} ${y+64}V${y+96}H${8+2*143+64}V${y+70}"/>${arrowHead(8+2*143+64,y+66,-90)}${T(8+3*143+64,y+116,no[i])}`;
   s+=G(String(i),g);});
  return s+'</svg>';},

 critical:()=>{let s=`<svg class="f2" viewBox="0 0 720 470">`;
  s+=G('',`<rect class="tk" x="30" y="60" width="150" height="340" rx="10"/>${T(105,240,'Boiler')}<path class="tk" d="M480 160L680 110V300L480 250Z"/>${T(590,210,'Turbine')}<rect class="tk" x="510" y="330" width="170" height="70" rx="8"/>${T(595,370,'Condenser')}<path class="ln" d="M600 280V330"/><circle class="sf" cx="345" cy="388" r="22"/><rect class="sf" x="318" y="410" width="54" height="12"/>${T(345,452,'Feed pump')}`);
  s+=pth('M510 390H367',8);
  s+=G('0 1 2',pth('M180 100H300V50H390V100H440V205H480',14)+T(240,88,'Main steam'),'hl');
  s+=G('3',`${T(345,36,'Expansion loop')}`);
  s+=G('0',pth('M323 388H250V330H180',12)+T(260,318,'HP feedwater','','start'));
  s+=G('4',`<circle class="ln" style="stroke-width:2.4" cx="480" cy="205" r="16"/>${T2(462,276,['Nozzle loads within','vendor limits'],'','end')}`);
  return s+'</svg>';},

 stress:()=>{let s=`<svg class="f2" viewBox="0 0 720 500">`;const bx=(x,y,t,h)=>G(h,`<rect class="chipb" x="${x}" y="${y}" width="196" height="76" rx="12"/>${T2(x+98,y+(t.length>1?34:43),t,'chipt','middle',18)}`);
  s+=bx(20,40,['Layout and','supports'],'0')+bx(262,40,['Stress model,','load cases'],'1')+bx(504,40,['Code check','of stresses'],'1')+bx(504,220,['Support and nozzle','loads, movements'],'2')+bx(262,220,['Change layout','or supports'],'3');
  s+=G('',arr('M218 78H254',259,78,0)+arr('M460 78H496',501,78,0)+arr('M640 118V212',640,217,90)+T(652,170,'Pass','okt','start'));
  s+=G('3',`<path class="ln bad" d="M560 118V166H360V212"/>${arrowHead(360,217,90)}${T(460,156,'Fail','badt')}<path class="ln bad" d="M262 258H118V124"/>${arrowHead(118,119,-90)}`);
  s+=G('4',`${T(20,350,'Inputs','rowt','start')}${T2(20,376,['Geometry, supports, size and wall, pressure, cold and hot','temperatures, weights of pipe, fluid and insulation, material','properties, wind, earthquake, snow, water hammer'],'','start',21)}`);
  s+=G('5',`${T(20,466,'Tools','rowt','start')}${T(80,466,'CAESAR II, AutoPIPE, ROHR2 and others','','start')}`);
  return s+'</svg>';},

 types:()=>{let s=`<svg class="f2" viewBox="0 0 720 440">`;
  /* rigid: pipe on a shoe on a beam (elevation) */
  s+=G('0',`<rect class="sf" x="30" y="300" width="180" height="14"/><rect class="sf" x="112" y="314" width="16" height="70"/><rect class="sf" x="30" y="384" width="180" height="14"/><rect class="sf" x="90" y="280" width="60" height="20"/><rect class="sf" x="116" y="252" width="8" height="28"/>${pth('M20 236H220',30)}${T(120,60,'Rigid','rowt')}${T2(120,90,['Holds the pipe','in place'],'')}`);
  /* spring hanger */
  s+=G('1',`<rect class="sf" x="270" y="140" width="180" height="14"/><path class="ln" d="M360 154V176"/><rect class="sf" x="334" y="176" width="52" height="96" rx="6"/><path class="lnt" d="M340 192l40 8M340 208l40 8M340 224l40 8M340 240l40 8M340 256l40 8"/><path class="ln" d="M360 272V300"/><path class="ln" d="M342 300H378"/>${pth('M260 324H460',30)}<path class="ln" d="M420 210V280"/>${arrowHead(420,206,-90)}${arrowHead(420,284,90)}${T(360,60,'Spring','rowt')}${T2(360,90,['Carries weight,','lets it move'],'')}`);
  /* snubber */
  s+=G('2',`<rect class="sf" x="680" y="150" width="20" height="250"/><circle class="sf" cx="560" cy="270" r="36"/><circle class="ln" style="stroke-width:3" cx="560" cy="270" r="42"/><path class="ln" d="M602 270H612"/><rect class="sf" x="612" y="258" width="50" height="24" rx="10"/><path class="ln" d="M662 270H680"/><circle class="sf" cx="606" cy="270" r="5"/><circle class="sf" cx="676" cy="270" r="5"/>${T(600,60,'Dynamic','rowt')}${T2(600,90,['Locks on sudden','loads (snubber)'],'')}`);
  return s+'</svg>';},

 buried:()=>{let s=`<svg class="f2" viewBox="0 0 720 470">`;const gy=200;
  s+=G('',ground(gy,10,450)+`<path class="ln" d="M450 ${gy}H710"/>${T(20,gy-12,'Grade','','start')}`);
  s+=G('1',`<path class="ln" style="stroke-dasharray:7 6" d="M10 270H460"/>${T(20,262,'Frost line','','start')}`);
  s+=G('0 2',pth('M20 340H420Q450 340 450 310V112',22));
  s+=G('2',`<path class="ln" style="stroke-width:3;stroke-dasharray:2 4" d="M24 324H418M24 356H420"/>${T2(160,392,['Coated and wrapped,','below the frost line'],'')}`);
  s+=G('2',`<rect class="sf" x="300" y="400" width="60" height="22" rx="8"/><path class="lnt" d="M330 400V352"/>${T(370,446,'Anode (cathodic protection)','','middle')}`);
  s+=G('0',`<rect class="sf" x="426" y="112" width="48" height="8"/><rect class="sf" x="426" y="122" width="48" height="8"/>${T2(484,150,['Flanges above','grade only'],'','start')}`);
  s+=pth('M450 112V96Q450 70 476 70H710',22);
  s+=G('3',`<rect class="ln" style="stroke-dasharray:5 4" x="490" y="44" width="220" height="52" rx="6"/><path class="ln" style="stroke-width:4" d="M490 84H710"/>${T(600,30,'Heat tracing under insulation')}`);
  return s+'</svg>';}
};

/* ===================================================================== content */
const STEPS=[
 ['Start with a plant','<p>A <b>pipe</b> is a hollow tube that carries anything that can flow: water, oil, gas, steam, even powders. It can be made of steel, plastic, glass or a lined metal.</p><p>Here we have three tanks. Our job: send liquid from Tank 1 to Tank 2 and Tank 3. We will build this one small system, piece by piece.</p>'],
 ['Lay the straight pipes','<p>Pipe is bought in straight pieces, usually 6 m or 12 m long. Put them between the tanks and you quickly hit three problems (circled in red):</p><p>the line needs to <b>turn a corner</b>, it needs to <b>split</b> to feed two tanks, and part of it can be a <b>smaller size</b>.</p>'],
 ['Fittings solve the shape','<p>Fittings are the shaped pieces that join pipes:</p><p>an <b>elbow</b> turns the line, a <b>tee</b> splits it into two, and a <b>reducer</b> joins a big pipe to a smaller one.</p><a class="pb-go" href="butt-weld-fittings.html">Butt-weld fitting dimensions</a>'],
 ['Join the pieces','<p>Pipes and fittings are mostly <b>welded</b> together (the dots). A weld is strong, does not leak and costs the least.</p><p>Where the pipe meets a tank, we use a <b>flanged joint</b>: two flat rings bolted together, so the pipe can be unbolted later for repairs.</p><a class="pb-go" href="flanges.html">Flange dimensions</a>'],
 ['Add valves','<p>So far nothing can stop the liquid. A <b>valve</b> lets the operator open, close or control the flow.</p><p>Gate and ball valves are for fully open or fully closed. Globe valves control the amount of flow. Check valves only let flow go one way.</p><a class="pb-go" href="valves.html">Valve types</a>'],
 ['Catch the dirt','<p>New pipes carry rust, weld bits and dirt. A <b>strainer</b> has a mesh screen inside that catches it before it can damage a pump, a meter or a control valve.</p><p>The angled leg of this Y-strainer holds the screen, and it comes out for cleaning.</p>'],
 ['Let it move','<p>Metal grows when it gets hot. A hot pipe gets longer and pushes on the tank nozzle at its end.</p><p>Normally the bends in the route give enough flex. Where they can\'t, an <b>expansion joint</b> (a flexible metal bellows) takes the movement.</p><a class="pb-go" href="expansion-loop.html">Expansion loop calculator</a>'],
 ['Measure the flow','<p><b>Instruments</b> tell the operator what is happening inside the pipe. Here a <b>pressure gauge</b> shows the pressure, and a <b>flow meter</b> (an orifice plate with a transmitter) measures how much is flowing.</p><p>Each instrument needs a correct position and a clear straight run of pipe.</p><a class="pb-go" href="straight-runs.html">Instrument straight runs</a>'],
 ['Support it','<p>A full pipe is heavy, and a hot one moves. <b>Supports</b> hold the weight and control the movement.</p><p>Here two <b>rest supports</b> carry the line from below, and a <b>rod hanger</b> holds it from the steel above. Other types guide the pipe, stop it, or fix it in place.</p><a class="pb-go" href="pipe-supports.html">Pipe supports in 3D</a>']
];
const CH=[
 {id:'workflow',t:'From idea to drawings',d:'On a real project the work happens in this order.',f:'flow',pts:[
  'First, the process team decides <b>what</b> flows, <b>from where</b> and <b>to where</b>. This is the flow scheme.',
  'Each line gets its basic data: size, material and the pressure and temperature it must handle. Valves and instruments are chosen too.',
  'All of this goes on the <b>P&amp;ID</b> (piping and instrument diagram), a drawing of every line, valve and instrument. Today it is "smart": click a line and it shows its data.',
  'Piping designers then draw every line in a <b>3D model</b> of the plant (in software such as S3D, E3D or PDMS), deciding exactly where each pipe goes.',
  'From the model come the <b>isometric drawings</b> used to make each pipe, the <b>GA drawings</b> used on site, and the list of materials to buy.'],links:[['pid-symbols.html','P&amp;ID symbols'],['isometric-symbols.html','Isometric symbols']]},
 {id:'routing',t:'Route it well',d:'A good route is short, simple and out of everyone\'s way.',f:'route',pts:[
  'Keep the pipe <b>short</b>, with as <b>few bends</b> as possible. Each extra bend costs money, adds welds and slows the flow.',
  'Keep walkways, escape routes and <b>maintenance space</b> clear. People must be able to walk through and lift equipment out.',
  'Run lines together on a <b>pipe rack</b> at set heights. It keeps the plant tidy and makes the pipes easy to support.'],links:[['pipe-rack.html','Pipe rack layout'],['pipe-spacing.html','Pipe spacing']]},
 {id:'access',t:'Access and orientation',d:'Anything someone has to operate or fix must be easy to reach.',f:'access',pts:[
  'Place valves, strainers and instruments where an operator can <b>reach them from the ground</b>, at about waist to chest height.',
  'If that isn\'t possible, add a <b>platform</b> to stand on, or a chain wheel to turn a high valve from below.',
  'Some items only work one way round. For example, many strainers and some valves must sit in a <b>horizontal</b> pipe.',
  'Instruments have their own rules. A temperature sensor (thermowell) needs a big enough pipe to fit in, often at least 3–4 in.'],links:[['valve-access.html','Valve access and heights']]},
 {id:'straight',t:'Straight lengths',d:'Flow meters only read correctly when the flow is calm.',f:'straight',pts:[
  'Elbows, valves and tees stir up the flow. A meter placed straight after them reads wrong.',
  'So we leave <b>straight pipe</b> before and after it. For an orifice meter, a typical example is <b>15 pipe diameters before and 5 after</b>. The exact number comes from the meter standard (ISO 5167).',
  'Plan these straight runs early. They often decide where everything else around the meter can go.'],links:[['straight-runs.html','Straight run calculator']]},
 {id:'vents',t:'Vents and drains',d:'Every liquid line has to be filled, emptied and tested.',f:'vent',pts:[
  'Air collects at the <b>highest point</b> of a line. Add a small <b>vent</b> with a valve there so the air can escape while filling.',
  'Liquid collects at the <b>lowest point</b>. Add a <b>drain</b> with a valve there so the line can be emptied.',
  'Some lines, such as condensate or drain lines, must <b>slope</b> all the way down to the low point.',
  'During the pressure test (hydrotest) the line is filled from the bottom and vented at the top. The same vents and drains are used.'],links:[]},
 {id:'insulation',t:'Insulation',d:'Pipes are covered for different reasons. Each picture shows one.',f:'insul',pts:[
  '<b>Hot insulation</b> keeps heat inside the pipe, so less energy is wasted.',
  '<b>Personnel protection</b> stops people burning themselves on a hot pipe they could touch. A simple guard can do the same job.',
  'On a cold pipe, insulation keeps the heat out. Without it, water from the air condenses and drips (<b>sweating</b>). A <b>vapour barrier</b> stops moisture getting into the insulation.',
  'Some pipes need extra layers: <b>heat-traced</b> lines have a small heating tube or cable under the insulation, and <b>acoustic</b> insulation adds a dense layer to cut noise.',
  'Insulation works by trapping still air. It is either <b>fibrous</b> (like mineral wool) or <b>cellular</b> (tiny closed bubbles, like PUF foam).',
  'Insulation is soft, so it is covered with thin <b>metal cladding</b> held by bands, with overlapping joints to keep rain out.'],links:[]},
 {id:'sizing',t:'Material, size and thickness',d:'Three questions are answered for every line.',f:'calc',pts:[
  '<b>Which material?</b> Look at the fluid, temperature, pressure and how long the plant must last. Choose a proven, affordable material, then check the design code allows it.',
  '<b>Which size?</b> From the flow rate and a sensible speed, work out a size. Check the pressure loss. If it is too high, go one size up.',
  '<b>How thick?</b> From the pressure, temperature and material, calculate the wall thickness with the code formula, add extra for corrosion, and pick the schedule.'],links:[['pipe.html','Pipe data'],['calculators.html','Calculators']]},
 {id:'critical',t:'Critical piping',d:'Some lines are so important they get special care from day one.',f:'critical',pts:[
  'In a power plant, the lines that carry steam from the boiler to the turbine, and water back to the boiler, are the <b>critical lines</b>.',
  'They run very hot and at high pressure, so the <b>material choice</b> matters most. Special alloy steels are common.',
  'They are routed <b>first</b>, before other lines take the space.',
  'Hot pipes grow. A loop or offset in the route gives the pipe <b>room to grow</b>.',
  'The force the pipe puts on the turbine and pumps must stay <b>within the maker\'s limits</b>. Power plant piping follows the ASME B31.1 code (in India also the IBR). Process plants use ASME B31.3.'],links:[]},
 {id:'stress',t:'Pipe stress analysis',d:'A check that the pipe will not crack, bend or overload anything.',f:'stress',pts:[
  'It starts from the pipe route and the planned supports.',
  'The line is modelled in stress software and loaded with pressure, weight, heat growth, wind and earthquake. The stresses are compared with what the code allows.',
  'The results give the forces on each support, the forces on equipment nozzles, and how far the pipe moves.',
  'If a check fails, the route or supports are changed and the analysis is run again until everything passes.',
  'It needs inputs such as the pipe route, sizes, temperatures, pressures, weights and material data.',
  'Common software: CAESAR II, AutoPIPE and ROHR2.'],links:[]},
 {id:'supports',t:'Types of supports',d:'Supports fall into three groups.',f:'types',pts:[
  '<b>Rigid</b> supports hold the pipe firmly in the direction they act. Examples: rest supports, guides, stops and anchors.',
  '<b>Spring</b> supports carry the weight but let a hot pipe move up and down. Variable springs change their push as the pipe moves; constant springs keep the same push.',
  '<b>Dynamic</b> supports such as snubbers let slow movement through, but lock instantly against sudden shocks like earthquakes.'],links:[['pipe-supports.html','Pipe supports in 3D'],['support-spans.html','Support spans']]},
 {id:'buried',t:'Buried lines and freezing',d:'Two special cases.',f:'buried',pts:[
  'Buried pipes are hard to inspect. So avoid very small sizes, keep flanges above ground, and avoid burying dangerous fluids, because a leak would go unnoticed.',
  'In cold countries, bury pipes below the <b>frost line</b> so they don\'t freeze.',
  'Protect buried pipes from rust with <b>coating and wrapping</b>, plus <b>cathodic protection</b> (an anode that corrodes instead of the pipe).',
  'Above-ground pipes can freeze when the plant stops. <b>Heat tracing</b>, an electric cable or small steam tube under the insulation, keeps them warm.'],links:[]}
];

/* ===================================================================== page */
const ld=(k,d)=>{try{return localStorage.getItem('piperef_'+k)||d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem('piperef_'+k,v)}catch(e){}};
let MODE=ld('basics_mode','story');
const IC_STORY='<svg viewBox="0 0 24 24"><path d="M12 3v14M6 11l6 6 6-6"/><path d="M5 21h14"/></svg>',IC_READ='<svg viewBox="0 0 24 24"><path d="M4 5h16M4 10h16M4 15h10M4 20h12"/></svg>';
function head(){return `<div class="phead"><div><h1>Piping fundamentals</h1><p>A first walk through piping for new engineers: what a piping system is made of, then how it's designed on a real job. Scroll through it as a story, or read it as a normal page.</p></div>
 <div class="pb-mode" role="group" aria-label="View"><button type="button" data-mode="story" aria-pressed="${MODE==='story'}">${IC_STORY}Scroll story</button><button type="button" data-mode="read" aria-pressed="${MODE==='read'}">${IC_READ}Read as page</button></div></div>
 <nav class="pb-toc" aria-label="Sections"><a href="#pb-build">Build a system</a>${CH.map(c=>`<a href="#pb-${c.id}">${c.t}</a>`).join('')}</nav>`;}
const linksHTML=ls=>ls&&ls.length?`<div class="pb-links">${ls.map(([h,t])=>`<a class="pb-go" href="${h}">${t}</a>`).join('')}</div>`:'';
function story(){let s=`<div class="pb-bar"><i></i></div>`+head();
 s+=`<h2 class="pb-part">Part 1: build a piping system</h2><p>Scroll to add each part to the sketch.</p>`;
 s+=`<section class="pb-sc" id="pb-build" data-n="${STEPS.length}" style="--n:${STEPS.length}"><div class="pb-stk"><div class="pb-fig">${isoSVG()}</div><div class="pb-txt"><ol class="pb-steps">${STEPS.map((x,i)=>`<li data-i="${i}"><button type="button" class="pb-sh">${x[0]}</button><div class="pb-sb">${x[1]}</div></li>`).join('')}</ol><p class="pb-cnt"></p></div></div></section>`;
 s+=`<h2 class="pb-part">Part 2: how it's done on a real job</h2><p>Each chapter steps through its points as you scroll.</p>`;
 for(const c of CH)s+=`<section class="pb-sc" id="pb-${c.id}" data-n="${c.pts.length}" style="--n:${c.pts.length}"><div class="pb-stk"><div class="pb-fig">${figHTML(c)}</div><div class="pb-txt"><h2>${c.t}</h2><p>${c.d}</p><ol class="pb-pts">${c.pts.map((p,i)=>`<li data-i="${i}">${p}</li>`).join('')}</ol><p class="pb-cnt"></p>${linksHTML(c.links)}</div></div></section>`;
 return s+end();}
function read(){let s=head();
 s+=`<section class="pb-rd" id="pb-build"><h2>Part 1: build a piping system</h2><p>One small system, built up a part at a time.</p>${STEPS.map((x,i)=>`<div class="pb-row"><div class="pb-fig" data-k="${i}">${isoSVG()}</div><div><h3>${i+1}. ${x[0]}</h3>${x[1]}</div></div>`).join('')}</section>`;
 s+=`<h2 class="pb-part">Part 2: how it's done on a real job</h2>`;
 for(const c of CH){const F=FIG[c.f]();s+=Array.isArray(F)?`<section class="pb-rd" id="pb-${c.id}"><h2>${c.t}</h2><p>${c.d}</p>${F.map((f,i)=>`<div class="pb-row pb-row2"><div class="pb-fig">${f}</div><div><p>${c.pts[i]}</p></div></div>`).join('')}${linksHTML(c.links)}</section>`
  :`<section class="pb-rd" id="pb-${c.id}"><h2>${c.t}</h2><p>${c.d}</p><div class="pb-rch"><div class="pb-fig">${F}</div><div><ol class="pb-pts">${c.pts.map(p=>`<li>${p}</li>`).join('')}</ol>${linksHTML(c.links)}</div></div></section>`;}
 return s+end();}
function figHTML(c){const F=FIG[c.f]();return Array.isArray(F)?F.map((f,i)=>`<div class="pb-one" data-i="${i}">${f}</div>`).join(''):F;}
function end(){return `<div class="pb-end"><h2>Keep going</h2><p>Test yourself with the <a href="interview-questions.html">interview questions</a>, look up terms in the <a href="glossary.html">glossary</a>, or read the <a href="knowledge-base.html">knowledge base</a>.</p></div>`;}

/* mobile: zoom the drawing onto the part being explained */
const small=()=>matchMedia('(max-width:700px)').matches;
function focusBox(svg,els,mapDesk){const vb=(svg.dataset.vb||svg.getAttribute('viewBox')).split(' ').map(Number);svg.dataset.vb=vb.join(' ');
 if((!small()&&!mapDesk)||!els.length)return vb;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
 els.forEach(e=>{try{const b=e.getBBox();if(!b.width&&!b.height)return;x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);}catch(_){}});
 if(x0>x1)return vb;const pad=40;x0-=pad;y0-=pad;x1+=pad;y1+=pad;
 const box=svg.parentElement.getBoundingClientRect(),ar=(box.width||1)/(box.height||1);const mf=small()?.5:.62;let w=Math.max(x1-x0,vb[2]*mf),h=Math.max(y1-y0,vb[3]*mf*.84);
 if(w/h<ar)w=h*ar;else h=w/ar;
 const cx=(x0+x1)/2,cy=(y0+y1)/2,fit=(c,size,o,full)=>size>=full?o+(full-size)/2:Math.min(Math.max(c-size/2,o),o+full-size);return [fit(cx,w,vb[0],vb[2]),fit(cy,h,vb[1],vb[3]),w,h];}
function animVB(svg,to){const from=(svg.getAttribute('viewBox')).split(' ').map(Number);if(svg._a)cancelAnimationFrame(svg._a);
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){svg.setAttribute('viewBox',to.map(f1).join(' '));return;}
 const t0=performance.now(),D=450;const step=t=>{const k=Math.min(1,(t-t0)/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;svg.setAttribute('viewBox',from.map((v,i)=>f1(v+(to[i]-v)*e)).join(' '));if(k<1)svg._a=requestAnimationFrame(step);};svg._a=requestAnimationFrame(step);}

let SC=[],raf=0;
function render(){P.dataset.mode=MODE;P.innerHTML=MODE==='story'?story():read();
 if(MODE==='read'){P.querySelectorAll('.pb-fig[data-k]').forEach(f=>{const svg=f.querySelector('svg'),k=+f.dataset.k;setIso(svg,k);if(small()&&k>0)requestAnimationFrame(()=>svg.setAttribute('viewBox',focusBox(svg,[...svg.querySelectorAll('.lay.now')]).map(f1).join(' ')));});P.querySelectorAll('.fg').forEach(g=>g.classList.remove('hl'));SC=[];return;}
 SC=[...P.querySelectorAll('.pb-sc')].map(sec=>({sec,n:+sec.dataset.n,i:-1,svg:sec.querySelector('svg'),iso:sec.id==='pb-build',items:[...sec.querySelectorAll('.pb-steps>li,.pb-pts>li')],cnt:sec.querySelector('.pb-cnt')}));
 SC.forEach(sc=>{sc.items.forEach((li,i)=>li.addEventListener('click',e=>{if(e.target.closest('a'))return;jump(sc,i);}));if(!sc.iso)sc.svg.querySelectorAll('.fg').forEach(g=>g.classList.remove('hl'));setStep(sc,0);});
 onScroll();}
function setStep(sc,i){if(sc.i===i)return;sc.i=i;sc.items.forEach((li,k)=>{li.classList.toggle('on',k===i);li.classList.toggle('done',k<i);});
 sc.sec.querySelectorAll('.pb-one').forEach(d=>d.classList.toggle('on',+d.dataset.i===i));if(sc.iso)setIso(sc.svg,i);else sc.svg.querySelectorAll('[data-h]').forEach(g=>g.classList.toggle('hl',g.dataset.h.split(' ').includes(String(i))));
 if(!sc.sec.querySelector('.pb-one')){const els=sc.iso?[...sc.svg.querySelectorAll('.lay.now')]:[...sc.svg.querySelectorAll('.hl')];animVB(sc.svg,focusBox(sc.svg,els,sc.iso&&i>0));}
 if(sc.cnt)sc.cnt.textContent=`${i+1} of ${sc.n} · keep scrolling`;}
function topH(){const t=document.querySelector('.top');return t?t.offsetHeight:56;}
function jump(sc,i){const r=sc.sec.getBoundingClientRect(),stk=sc.sec.querySelector('.pb-stk'),tot=sc.sec.offsetHeight-stk.offsetHeight;
 window.scrollTo({top:window.scrollY+r.top-topH()-3+tot*((i+.35)/sc.n),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}
function onScroll(){if(raf||MODE!=='story'||P.hidden)return;raf=requestAnimationFrame(()=>{raf=0;const th=topH()+3;let cur=null;
 for(const sc of SC){const r=sc.sec.getBoundingClientRect(),stk=sc.sec.querySelector('.pb-stk'),tot=sc.sec.offsetHeight-stk.offsetHeight;const p=Math.min(.9999,Math.max(0,(th-r.top)/Math.max(tot,1)));setStep(sc,Math.floor(p*sc.n));if(r.top<=th+40&&r.bottom>th+40)cur=sc.sec.id;}
 const pr=P.getBoundingClientRect(),bar=P.querySelector('.pb-bar i');if(bar)bar.style.width=Math.min(100,Math.max(0,(th-pr.top)/Math.max(pr.height-innerHeight,1)*100))+'%';
 P.querySelectorAll('.pb-toc a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));});}
addEventListener('scroll',onScroll,{passive:true});let rz=0;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{SC.forEach(sc=>{const i=sc.i;sc.i=-1;setStep(sc,i);});onScroll();},200);});
P.addEventListener('click',e=>{const b=e.target.closest('.pb-mode button');if(b&&b.dataset.mode!==MODE){const id=[...P.querySelectorAll('.pb-sc,.pb-rd')].find(s=>s.getBoundingClientRect().bottom>topH()+80)?.id;MODE=b.dataset.mode;sv('basics_mode',MODE);render();
  if(id){const el=document.getElementById(id);if(el)window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-topH()-10});}return;}
 const a=e.target.closest('.pb-toc a');if(a){e.preventDefault();const el=P.querySelector(a.getAttribute('href'));if(el)window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-topH()-(MODE==='story'?3:10),behavior:'smooth'});}});
P.style.setProperty('--pb-top',topH()+'px');
render();
window.renderBASICS=()=>{P.style.setProperty('--pb-top',topH()+'px');onScroll();};
