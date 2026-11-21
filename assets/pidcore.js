/* P&ID take-off engine: vector extraction from a pdf.js page, symbol matching by example, pipe tracing and per-line counts.
   Pure functions; works in the browser and in Node (for tests). Coordinates: PDF units at scale 1, y down. */

const mul=(m,n)=>[m[0]*n[0]+m[2]*n[1],m[1]*n[0]+m[3]*n[1],m[0]*n[2]+m[2]*n[3],m[1]*n[2]+m[3]*n[3],m[0]*n[4]+m[2]*n[5]+m[4],m[1]*n[4]+m[3]*n[5]+m[5]];
const ap=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
const r2=v=>Math.round(v*100)/100;

/* ------------------------------------------------------------ extraction */
export async function extract(page,OPS){
 const vp=page.getViewport({scale:1}),base=vp.transform;
 const ol=await page.getOperatorList();
 const segs=[],paths=[];let st={m:base,w:1,d:false},stack=[],cur=[],curPath=null;
 const scaleW=m=>Math.sqrt(Math.abs(m[0]*m[3]-m[1]*m[2]));
 const flush=(stroke,fill)=>{if(!cur.length){return;}const pid=paths.length;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(const s of cur){x0=Math.min(x0,s[0],s[2]);y0=Math.min(y0,s[1],s[3]);x1=Math.max(x1,s[0],s[2]);y1=Math.max(y1,s[1],s[3]);}
  const kind=stroke?(fill?2:0):(fill?1:-1);if(kind<0){cur=[];return;}
  const fst=cur[0],lst=cur[cur.length-1],closed=cur.length>2&&Math.hypot(fst[0]-lst[2],fst[1]-lst[3])<0.3;
  paths.push({x0,y0,x1,y1,w:r2(st.w*scaleW(st.m)),dash:st.d,fill:kind>=1?1:0,stroke:kind!==1,closed});
  for(const s of cur){const L=Math.hypot(s[2]-s[0],s[3]-s[1]);if(L<0.05)continue;segs.push({x1:r2(s[0]),y1:r2(s[1]),x2:r2(s[2]),y2:r2(s[3]),L,w:paths[pid].w,dash:st.d,f:kind===1?1:0,p:pid});}
  cur=[];};
 const {fnArray:F,argsArray:A}=ol;
 for(let i=0;i<F.length;i++){const fn=F[i],a=A[i];
  if(fn===OPS.save)stack.push({...st});
  else if(fn===OPS.restore)st=stack.pop()||st;
  else if(fn===OPS.transform)st={...st,m:mul(st.m,a)};
  else if(fn===OPS.setLineWidth)st={...st,w:a[0]};
  else if(fn===OPS.setDash)st={...st,d:!!(a[0]&&a[0].length)};
  else if(fn===OPS.constructPath){const ops=a[0],c=a[1];let k=0,px=0,py=0,sx=0,sy=0;const m=st.m;
   const L=(x,y)=>{const p=ap(m,px,py),q=ap(m,x,y);cur.push([p[0],p[1],q[0],q[1]]);px=x;py=y;};
   const bez=(x1,y1,x2,y2,x3,y3)=>{const x0=px,y0=py,N=6;for(let j=1;j<=N;j++){const t=j/N,u=1-t;const x=u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3,y=u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3;L(x,y);}};
   for(const op of ops){
    if(op===OPS.moveTo){px=c[k++];py=c[k++];sx=px;sy=py;}
    else if(op===OPS.lineTo){L(c[k++],c[k++]);}
    else if(op===OPS.curveTo){bez(c[k],c[k+1],c[k+2],c[k+3],c[k+4],c[k+5]);k+=6;}
    else if(op===OPS.curveTo2){bez(px,py,c[k],c[k+1],c[k+2],c[k+3]);k+=4;}
    else if(op===OPS.curveTo3){bez(c[k],c[k+1],c[k+2],c[k+3],c[k+2],c[k+3]);k+=4;}
    else if(op===OPS.closePath){if(px!==sx||py!==sy)L(sx,sy);}
    else if(op===OPS.rectangle){const x=c[k++],y=c[k++],w=c[k++],h=c[k++];px=x;py=y;sx=x;sy=y;L(x+w,y);L(x+w,y+h);L(x,y+h);L(x,y);}
   }}
  else if(fn===OPS.stroke||fn===OPS.closeStroke)flush(1,0);
  else if(fn===OPS.fill||fn===OPS.eoFill)flush(0,1);
  else if(fn===OPS.fillStroke||fn===OPS.eoFillStroke||fn===OPS.closeFillStroke||fn===OPS.closeEOFillStroke)flush(1,1);
  else if(fn===OPS.endPath)cur=[];
 }
 const tc=await page.getTextContent();const texts=[];
 for(const it of tc.items){if(!it.str||!it.str.trim())continue;const m=mul(base,it.transform);const h=Math.hypot(m[2],m[3])||it.height||6;
  const x=m[4],y=m[5],ang=Math.atan2(m[1],m[0]);const w=it.width*(Math.hypot(m[0],m[1])/Math.hypot(it.transform[0],it.transform[1])||1);
  const ux=Math.cos(ang),uy=Math.sin(ang),hx=Math.sin(ang)*h/2,hy=-Math.cos(ang)*h/2;
  texts.push({s:it.str.trim(),x,y,w,h,ang,cx:x+ux*w/2+hx,cy:y+uy*w/2+hy,pts:[[x+hx,y+hy],[x+ux*w/2+hx,y+uy*w/2+hy],[x+ux*w+hx,y+uy*w+hy]]});}
 return {W:vp.width,H:vp.height,segs,paths,texts};}

/* ------------------------------------------------------------ spatial grid */
function grid(segs,cell=12){const g=new Map();const key=(i,j)=>i*100003+j;
 segs.forEach((s,idx)=>{const i0=Math.floor(Math.min(s.x1,s.x2)/cell),i1=Math.floor(Math.max(s.x1,s.x2)/cell),j0=Math.floor(Math.min(s.y1,s.y2)/cell),j1=Math.floor(Math.max(s.y1,s.y2)/cell);
  if((i1-i0+1)*(j1-j0+1)>400)return;for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const k=key(i,j);(g.get(k)||g.set(k,[]).get(k)).push(idx);}});
 return {near(x0,y0,x1,y1){const out=new Set();for(let i=Math.floor(x0/cell);i<=Math.floor(x1/cell);i++)for(let j=Math.floor(y0/cell);j<=Math.floor(y1/cell);j++){const a=g.get(key(i,j));if(a)a.forEach(v=>out.add(v));}return out;}};}

/* ------------------------------------------------------------ templates */
/* a template = the segments fully inside the user's box (pipe lines crossing the box are left out) */
export function makeTemplate(data,box,pipeW){
 const [bx0,by0,bx1,by1]=box,inside=s=>Math.min(s.x1,s.x2)>=bx0-0.3&&Math.max(s.x1,s.x2)<=bx1+0.3&&Math.min(s.y1,s.y2)>=by0-0.3&&Math.max(s.y1,s.y2)<=by1+0.3;
 const ss=data.segs.filter(s=>inside(s)&&!s.dash&&!(pipeW&&Math.abs(s.w-pipeW)<0.06&&s.L>6));
 if(ss.length<2)return null;
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;ss.forEach(s=>{x0=Math.min(x0,s.x1,s.x2);y0=Math.min(y0,s.y1,s.y2);x1=Math.max(x1,s.x1,s.x2);y1=Math.max(y1,s.y1,s.y2);});
 const cx=(x0+x1)/2,cy=(y0+y1)/2;
 return {segs:ss.map(s=>[r2(s.x1-cx),r2(s.y1-cy),r2(s.x2-cx),r2(s.y2-cy),s.f]),w:x1-x0,h:y1-y0};}

const VAR=[[1,0,0,1],[0,-1,1,0],[-1,0,0,-1],[0,1,-1,0],[-1,0,0,1],[0,1,1,0],[1,0,0,-1],[0,-1,-1,0]];/* 4 rotations x mirror */
/* find every place the template appears (any 90-degree rotation, mirrored, scale 0.8-1.25) */
export function findMatches(data,tpl,opt={}){
 const segs=data.segs,G=opt.grid||grid(segs);const T=tpl.segs;if(!T||!T.length)return [];
 const Ls=T.map(s=>Math.hypot(s[2]-s[0],s[3]-s[1]));let ai=0;Ls.forEach((v,i)=>{if(v>Ls[ai])ai=i;});
 const A=T[ai],La=Ls[ai],size=Math.max(tpl.w,tpl.h,1);const out=[];const tried=new Set();
 for(let si=0;si<segs.length;si++){const s=segs[si];if(s.dash||s.f!==A[4])continue;const r=s.L/La;if(r<0.8||r>1.25)continue;
  const sang=Math.atan2(s.y2-s.y1,s.x2-s.x1);
  for(const v of VAR){
   const tx=(x,y)=>[(v[0]*x+v[1]*y)*r,(v[2]*x+v[3]*y)*r];
   const a1=tx(A[0],A[1]),a2=tx(A[2],A[3]);const aang=Math.atan2(a2[1]-a1[1],a2[0]-a1[0]);
   let d=Math.abs(((sang-aang)%Math.PI+Math.PI)%Math.PI);d=Math.min(d,Math.PI-d);if(d>0.09)continue;
   /* two ways to pair the anchor ends with the segment ends */
   for(const flip of [0,1]){const p=flip?[s.x2,s.y2,s.x1,s.y1]:[s.x1,s.y1,s.x2,s.y2];
    if(Math.hypot((a2[0]-a1[0])-(p[2]-p[0]),(a2[1]-a1[1])-(p[3]-p[1]))>La*r*0.2)continue;
    const ox=p[0]-a1[0],oy=p[1]-a1[1];const kk=`${Math.round(ox)},${Math.round(oy)}`;if(tried.has(kk+'|'+v.join()))continue;tried.add(kk+'|'+v.join());
    const tol=Math.max(0.9,size*r*0.09);let hit=0;const used=new Set();
    for(const t of T){const q1=tx(t[0],t[1]),q2=tx(t[2],t[3]);const X1=q1[0]+ox,Y1=q1[1]+oy,X2=q2[0]+ox,Y2=q2[1]+oy;
     const cand=G.near(Math.min(X1,X2)-tol,Math.min(Y1,Y2)-tol,Math.max(X1,X2)+tol,Math.max(Y1,Y2)+tol);let best=-1,bd=1e9;
     for(const ci of cand){const c=segs[ci];if(c.f!==t[4])continue;
      const d1=Math.max(Math.hypot(c.x1-X1,c.y1-Y1),Math.hypot(c.x2-X2,c.y2-Y2)),d2=Math.max(Math.hypot(c.x1-X2,c.y1-Y2),Math.hypot(c.x2-X1,c.y2-Y1)),d=Math.min(d1,d2)+(used.has(ci)?tol:0);
      if(Math.min(d1,d2)<tol&&d<bd){bd=d;best=ci;}}
     if(best>=0){hit++;used.add(best);}}
    const sc=hit/T.length;if(sc<0.85)continue;
    /* extra lines inside the matched box lower the score: a globe valve is a gate valve plus a dot */
    const hw=tpl.w*r/2,hh=tpl.h*r/2;const vx=Math.abs(v[0])?hw:hh,vy=Math.abs(v[0])?hh:hw;
    const ccx=ox,ccy=oy,bx0=ccx-vx-0.6,bx1=ccx+vx+0.6,by0=ccy-vy-0.6,by1=ccy+vy+0.6;let extra=0;
    for(const ci of G.near(bx0,by0,bx1,by1)){if(used.has(ci))continue;const c=segs[ci];if(c.dash)continue;
     if(Math.min(c.x1,c.x2)>=bx0&&Math.max(c.x1,c.x2)<=bx1&&Math.min(c.y1,c.y2)>=by0&&Math.max(c.y1,c.y2)<=by1&&!(opt.pipeW&&Math.abs(c.w-opt.pipeW)<0.06&&c.L>4))extra++;}
    out.push({x:ccx,y:ccy,w:vx*2,h:vy*2,score:hit/(T.length+extra),hit,extra,rot:v});}}}
 /* keep the best match at each place */
 out.sort((a,b)=>b.score-a.score);const keep=[];
 for(const m of out){if(m.score<0.8)continue;if(keep.some(k=>Math.abs(k.x-m.x)<Math.max(k.w,k.h)*0.45&&Math.abs(k.y-m.y)<Math.max(k.w,k.h)*0.45))continue;keep.push(m);}
 return keep;}

/* run all templates; where two symbol types claim the same spot, the better score wins */
export function findAll(data,lib,pipeW){const G=grid(data.segs);let all=[];
 lib.forEach((t,ti)=>{findMatches(data,t,{grid:G,pipeW}).forEach(m=>all.push({...m,ti}));});
 all.sort((a,b)=>b.score-a.score||lib[b.ti].segs.length-lib[a.ti].segs.length);const keep=[];
 for(const m of all){if(keep.some(k=>Math.abs(k.x-m.x)<Math.max(k.w,k.h,m.w,m.h)*0.4&&Math.abs(k.y-m.y)<Math.max(k.w,k.h,m.w,m.h)*0.4))continue;keep.push(m);}
 return keep.map((m,i)=>({...m,id:i}));}

/* ------------------------------------------------------------ pipe weight guess: the stroke width with the most long straight lines */
export function guessPipeW(data){const c=new Map();
 data.segs.forEach(s=>{if(s.dash||s.f||s.L<12||data.paths[s.p].closed||s.L>Math.max(data.W,data.H)*0.5)return;const ax=Math.abs(s.x1-s.x2)<0.3||Math.abs(s.y1-s.y2)<0.3;if(!ax)return;c.set(s.w,(c.get(s.w)||0)+s.L);});
 const arr=[...c.entries()].sort((a,b)=>b[1]-a[1]);return {best:arr.length?arr[0][0]:null,list:arr};}

/* ------------------------------------------------------------ tracing */
export function trace(data,matches,lib,opt){
 const pw=opt.pipeW,tol=opt.tol||1.6,re=new RegExp(opt.pattern,'g');
 const pipe=data.segs.filter(s=>!s.dash&&!s.f&&Math.abs(s.w-pw)<0.06);
 /* nodes */
 const nodes=[],nodeAt=(x,y)=>{for(let i=0;i<nodes.length;i++)if(Math.hypot(nodes[i].x-x,nodes[i].y-y)<tol)return i;nodes.push({x,y,e:[]});return nodes.length-1;};
 let edges=pipe.map(s=>({a:nodeAt(s.x1,s.y1),b:nodeAt(s.x2,s.y2),s}));
 /* T-junctions: an end that lands on the middle of another pipe line splits it */
 for(let pass=0;pass<2;pass++){const add=[];
  for(const e of edges){if(e.dead)continue;const A=nodes[e.a],B=nodes[e.b],L=Math.hypot(B.x-A.x,B.y-A.y);if(L<2*tol)continue;
   nodes.forEach((n,ni)=>{if(ni===e.a||ni===e.b||e.dead)return;const t=((n.x-A.x)*(B.x-A.x)+(n.y-A.y)*(B.y-A.y))/(L*L);if(t<=0.02||t>=0.98)return;
    const px=A.x+t*(B.x-A.x),py=A.y+t*(B.y-A.y);if(Math.hypot(px-n.x,py-n.y)<tol){e.dead=1;add.push({a:e.a,b:ni,s:e.s},{a:ni,b:e.b,s:e.s});}});}
  edges=edges.filter(e=>!e.dead).concat(add);}
 /* symbols: connect the pipe ends that stop at a symbol */
 const deg=()=>{nodes.forEach(n=>n.e=[]);edges.forEach((e,i)=>{nodes[e.a].e.push(i);nodes[e.b].e.push(i);});};deg();
 const syms=matches.filter(m=>!m.off).map(m=>({...m,kind:lib[m.ti].kind,name:lib[m.ti].name}));
 for(const m of syms){const bx0=m.x-m.w/2-tol*1.5,bx1=m.x+m.w/2+tol*1.5,by0=m.y-m.h/2-tol*1.5,by1=m.y+m.h/2+tol*1.5;
  const ends=nodes.map((n,i)=>i).filter(i=>nodes[i].e.length===1&&nodes[i].x>=bx0&&nodes[i].x<=bx1&&nodes[i].y>=by0&&nodes[i].y<=by1);
  if(ends.length>=2){/* join the two ends that face each other across the symbol */
   let best=null;for(let i=0;i<ends.length;i++)for(let j=i+1;j<ends.length;j++){const d=Math.hypot(nodes[ends[i]].x-nodes[ends[j]].x,nodes[ends[i]].y-nodes[ends[j]].y);if(!best||d>best[2])best=[ends[i],ends[j],d];}
   edges.push({a:best[0],b:best[1],sym:m});m.edge=edges.length-1;}
  else{/* symbol drawn over a continuous pipe (flanges): attach to the nearest pipe line */
   let bi=-1,bd=1e9;edges.forEach((e,i)=>{if(e.sym)return;const A=nodes[e.a],B=nodes[e.b],L=Math.hypot(B.x-A.x,B.y-A.y)||1;let t=((m.x-A.x)*(B.x-A.x)+(m.y-A.y)*(B.y-A.y))/(L*L);t=Math.max(0,Math.min(1,t));const d=Math.hypot(A.x+t*(B.x-A.x)-m.x,A.y+t*(B.y-A.y)-m.y);if(d<bd){bd=d;bi=i;}});
   if(bi>=0&&bd<Math.max(m.w,m.h))m.edge=bi;}
  deg();}
 /* chains between junctions */
 const isJ=i=>nodes[i].e.length!==2;const chainOf=new Array(edges.length).fill(-1);const chains=[];
 edges.forEach((e,ei)=>{if(chainOf[ei]>=0)return;const ch={edges:[],ends:[]};const ci=chains.length;chains.push(ch);
  const walk=(start,from)=>{let n=start,prev=from;while(true){if(isJ(n)){ch.ends.push(n);return;}const nx=nodes[n].e.find(x=>x!==prev);if(nx==null||chainOf[nx]>=0){ch.ends.push(n);return;}chainOf[nx]=ci;ch.edges.push(nx);const E=edges[nx];prev=nx;n=E.a===n?E.b:E.a;}};
  chainOf[ei]=ci;ch.edges.push(ei);walk(e.a,ei);walk(e.b,ei);});
 /* labels: line numbers in the text, each given to the nearest chain */
 const labels=[];data.texts.forEach(t=>{re.lastIndex=0;let m;while((m=re.exec(t.s))){labels.push({tag:m[0],x:t.cx,y:t.cy,pts:t.pts||[[t.cx,t.cy]]});}});
 const segDist=(x,y,A,B)=>{const L=Math.hypot(B.x-A.x,B.y-A.y)||1;let t=((x-A.x)*(B.x-A.x)+(y-A.y)*(B.y-A.y))/(L*L);t=Math.max(0,Math.min(1,t));return Math.hypot(A.x+t*(B.x-A.x)-x,A.y+t*(B.y-A.y)-y);};
 chains.forEach(c=>c.tags=[]);
 for(const lb of labels){let bc=-1,bd=1e9;chains.forEach((c,ci)=>{for(const ei of c.edges){const e=edges[ei];const d=Math.min(...lb.pts.map(p=>segDist(p[0],p[1],nodes[e.a],nodes[e.b])));if(d<bd){bd=d;bc=ci;}}});if(bc>=0&&bd<(opt.labelDist||30))chains[bc].tags.push(lb.tag);}
 chains.forEach(c=>c.tag=c.tags[0]||null);
 /* unlabelled chains take the line number of the chain that runs straight on through the junction */
 const dirAt=(ci,n)=>{const c=chains[ci];for(const ei of c.edges){const e=edges[ei];if(e.a===n||e.b===n){const o=e.a===n?nodes[e.b]:nodes[e.a];const d=Math.hypot(o.x-nodes[n].x,o.y-nodes[n].y)||1;return [(o.x-nodes[n].x)/d,(o.y-nodes[n].y)/d];}}return null;};
 const chainsAt=n=>chains.map((c,i)=>i).filter(i=>chains[i].ends.includes(n));
 for(let it=0;it<20;it++){let ch=false;
  nodes.forEach((nd,n)=>{if(nd.e.length<3)return;const cs=chainsAt(n);for(const a of cs)for(const b of cs){if(a>=b)continue;const da=dirAt(a,n),db=dirAt(b,n);if(!da||!db)continue;if(da[0]*db[0]+da[1]*db[1]<-0.95){
   if(chains[a].tag&&!chains[b].tag){chains[b].tag=chains[a].tag;ch=true;}else if(chains[b].tag&&!chains[a].tag){chains[a].tag=chains[b].tag;ch=true;}}}});if(!ch)break;}
 /* counts per line */
 const res=new Map();const get=t=>{const k=t||'(no line number)';if(!res.has(k))res.set(k,{tag:k,sym:{},tee:0,cross:0,eq:0,open:0,chains:[]});return res.get(k);};
 chains.forEach((c,ci)=>get(c.tag).chains.push(ci));
 syms.forEach(m=>{if(m.edge==null)return;const c=chains[chainOf[m.edge]];if(!c)return;const r=get(c.tag);r.sym[m.ti]=(r.sym[m.ti]||0)+1;m.line=c.tag||null;});
 nodes.forEach((nd,n)=>{const d=nd.e.length;if(d<3)return;const cs=chainsAt(n);let owner=null;
  for(const a of cs)for(const b of cs){if(a>=b)continue;const da=dirAt(a,n),db=dirAt(b,n);if(da&&db&&da[0]*db[0]+da[1]*db[1]<-0.95){owner=chains[a].tag||chains[b].tag;}}
  if(owner==null&&cs.length)owner=chains[cs[0]].tag;const r=get(owner);if(d===3)r.tee++;else r.cross++;});
 /* open ends: next to a big drawn object (equipment) = nozzle, otherwise an open end, cap or off-page */
 const other=data.paths.map((p,i)=>i).filter(i=>{const p=data.paths[i];return !(Math.abs(p.w-pw)<0.06)&&!p.dash&&(p.x1-p.x0>=20||p.y1-p.y0>=20)&&!(p.x1-p.x0>data.W*0.6);});
 const G=grid(data.segs);
 nodes.forEach((nd,n)=>{if(nd.e.length!==1)return;const c=chains[chainOf[nd.e[0]]];if(!c)return;const r=get(c.tag);
  let eq=false;for(const si of G.near(nd.x-3,nd.y-3,nd.x+3,nd.y+3)){const s=data.segs[si];if(other.includes(s.p)&&segDist(nd.x,nd.y,{x:s.x1,y:s.y1},{x:s.x2,y:s.y2})<3){eq=true;break;}}
  if(eq)r.eq++;else r.open++;nd.end=eq?'eq':'open';});
 return {nodes,edges,chains,chainOf,labels,lines:[...res.values()].sort((a,b)=>a.tag.localeCompare(b.tag,undefined,{numeric:true})),syms};}
