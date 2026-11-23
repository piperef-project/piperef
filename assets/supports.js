/* Pipe supports tab: 3D support gallery. Loaded only on pipe-supports.html (see app.js). */

import * as THREE from './three/three.module.min.js';
import {OrbitControls} from './three/OrbitControls.js';
import {RoomEnvironment} from './three/RoomEnvironment.js';
const panel=document.getElementById('p-sup');
if(!document.getElementById('sp-css')){const st=document.createElement('style');st.id='sp-css';st.textContent='#p-sup{--sp-stage:radial-gradient(120% 90% at 50% 15%,#FFFFFF 0%,#EEF2F7 65%,#E2E8F0 100%)}\n:root[data-theme="dark"] #p-sup{--sp-stage:radial-gradient(120% 90% at 50% 15%,#22324D 0%,#152238 65%,#0E1828 100%)}\n#p-sup .sp-chips{display:flex;flex-wrap:wrap;gap:6px}\n#p-sup .sp-chips button{border:1px solid var(--rule);background:var(--sheet);border-radius:999px;padding:6px 12px;font-size:13px;color:var(--ink-2)}\n#p-sup .sp-chips button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent);font-weight:550}\n#p-sup .sp-viewer{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(300px,1fr);border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet)}\n#p-sup .sp-stage{position:relative;background:var(--sp-stage);min-height:460px;overflow:hidden}#p-sup .sp-viewer{min-width:0}#p-sup .sp-stage,#p-sup .sp-info{min-width:0}\n#p-sup .sp-poster{position:absolute;inset:8% 6%;width:88%;height:84%;object-fit:contain;pointer-events:none}\n#p-sup .sp-stage canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;cursor:grab;touch-action:none}\n#p-sup .sp-stage canvas:active{cursor:grabbing}\n#p-sup .sp-tools{position:absolute;left:12px;bottom:12px;display:flex;gap:6px;flex-wrap:wrap}\n#p-sup .sp-tools button{display:flex;align-items:center;gap:6px;height:32px;padding:0 11px;border:1px solid var(--rule);border-radius:8px;background:color-mix(in srgb,var(--sheet) 88%,transparent);backdrop-filter:blur(6px);font-size:12.5px;color:var(--ink-2)}\n#p-sup .sp-tools button[aria-pressed="true"]{color:var(--accent);border-color:var(--accent-line);background:var(--accent-soft)}\n#p-sup .sp-tools svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n#p-sup .sp-hint{position:absolute;right:14px;bottom:18px;font-size:12px;color:var(--muted);pointer-events:none}\n#p-sup .sp-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:1px solid var(--rule);background:color-mix(in srgb,var(--sheet) 85%,transparent);display:grid;place-items:center;z-index:2}\n#p-sup .sp-nav svg{width:18px;height:18px;fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n#p-sup .sp-nav.sp-prev{left:12px}\n#p-sup .sp-nav.sp-next{right:12px}\n#p-sup .sp-info{padding:24px 24px 22px;display:flex;flex-direction:column;gap:16px;border-left:1px solid var(--rule)}\n#p-sup .sp-kicker{font-size:12.5px;color:var(--muted)}\n#p-sup .sp-info h3{font-size:22px;line-height:1.2;margin-top:4px}\n#p-sup .sp-tag{display:inline-block;font-size:12px;font-weight:550;padding:3px 8px;border-radius:6px;background:var(--accent-soft);color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent-line)}\n#p-sup .sp-tag.sp-fab{background:var(--paper-2);color:var(--muted);box-shadow:inset 0 0 0 1px var(--rule)}\n#p-sup .sp-fn{font-size:15.5px;line-height:1.55;color:var(--ink-2)}\n#p-sup .sp-dirs{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n#p-sup .sp-dir{display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 4px 8px;border-radius:10px;border:1px solid var(--rule);font-size:12px;color:var(--muted);text-align:center}\n#p-sup .sp-dir svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n#p-sup .sp-dir b{font-weight:550;font-size:11.5px}\n#p-sup .sp-dir.R{background:var(--accent-soft);border-color:var(--accent-line);color:var(--accent)}\n#p-sup .sp-dir.P{color:var(--hi-ink);background:var(--hi);border-color:transparent}\n#p-sup .sp-key{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:7px}\n#p-sup .sp-key i{width:22px;height:3px;border-radius:2px;background:var(--accent)}\n#p-sup .sp-use{font-size:13.5px;color:var(--ink-2);padding-top:14px;border-top:1px solid var(--rule);margin-top:auto}\n#p-sup .sp-use b{color:var(--ink);font-weight:600}\n#p-sup .sp-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin-top:18px}\n#p-sup .sp-tile{display:flex;flex-direction:column;border:1px solid var(--rule);border-radius:12px;background:var(--sheet);overflow:hidden;text-align:left;padding:0;transition:border-color .15s,box-shadow .15s}\n#p-sup .sp-tile:hover{border-color:var(--accent-line)}\n#p-sup .sp-tile[aria-current="true"]{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-soft)}\n#p-sup .sp-tile .sp-th{aspect-ratio:4/3;background:var(--sp-stage);display:block}\n#p-sup .sp-tile img{width:100%;height:100%;object-fit:cover;display:block}\n#p-sup .sp-tile .sp-tx{padding:10px 12px 12px;display:grid;gap:2px}\n#p-sup .sp-tile b{font-size:13.5px;font-weight:600;color:var(--ink)}\n#p-sup .sp-tile small{font-size:12px;color:var(--muted)}\n#p-sup .sp-note{margin-top:22px;font-size:12.5px;color:var(--muted);max-width:80ch}\n#p-sup .sp-fallback{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;color:var(--muted)}\n@media (max-width:900px){#p-sup .sp-viewer{grid-template-columns:minmax(0,1fr)}#p-sup .sp-info{border-left:0;border-top:1px solid var(--rule)}#p-sup .sp-stage{min-height:0;height:340px}}\n@media (max-width:520px){#p-sup .sp-gal{grid-template-columns:repeat(2,1fr);gap:8px}#p-sup .sp-info{padding:18px 16px}#p-sup .sp-hint{display:none}#p-sup .sp-dir{padding:8px 2px}#p-sup .sp-tools button span{display:none}}\n@media (prefers-reduced-motion:reduce){#p-sup .sp-tile{transition:none}}';document.head.appendChild(st);}
panel.innerHTML=`<div class="phead"><div><h1>Pipe supports</h1><p>Common support types, what they look like and what they do. Drag a model to turn it.</p></div><div class="ctrls"><div class="sp-chips" id="sp-chips" role="group" aria-label="Filter supports"></div></div></div>
<section class="sp-viewer" aria-label="Support viewer">
    <div class="sp-stage" id="sp-stage">
      <button class="sp-nav sp-prev" id="sp-prev" aria-label="Previous support"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button class="sp-nav sp-next" id="sp-next" aria-label="Next support"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
      <div class="sp-tools">
        <button id="sp-tArrows" aria-pressed="true" aria-label="Show restraint arrows"><svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M21 12l-3-3M21 12l-3 3"/></svg><span>Restraints</span></button>
        <button id="sp-tSpin" aria-pressed="true" aria-label="Auto rotate"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg><span>Rotate</span></button>
        <button id="sp-tReset" aria-label="Reset view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg><span>Reset</span></button>
      </div>
      <div class="sp-hint">Drag to turn · scroll or pinch to zoom</div>
    </div>
    <div class="sp-info" id="sp-info"></div>
  </section>
  <div class="sp-gal" id="sp-gal"></div>
  <p class="sp-note">Models are simplified illustrations, not to scale. Sizes, clearances and details follow your project’s piping support standard. Type numbers refer to the MSS SP-58 support type chart; “Fabricated” items are made to the project standard.</p>`;

/* ============================================================ catalogue
   dof order: down, up, sideways, along, turning · R held · P slides with friction · F free */
const GROUPS={rest:'Rest',guide:'Guide & stop',anchor:'Anchor',hang:'Hanger',spring:'Spring',dyn:'Strut & snubber',ej:'Expansion joint'};
const SUP=[
 {id:'shoe',g:'rest',name:'Pipe shoe',type:null,dof:'RFPPF',fn:'A steel T welded under the pipe. It carries the weight and lifts insulated pipe clear of the beam so it can slide.',use:'Insulated lines on pipe racks and sleepers.'},
 {id:'clamped',g:'rest',name:'Clamped shoe',type:null,dof:'RFPPF',fn:'Does the same job as a shoe, but is bolted round the pipe instead of welded to it.',use:'Pipe that must not be welded: galvanised, lined or alloy pipe, or lines already in service.'},
 {id:'cold',g:'rest',name:'Cold shoe',type:null,dof:'RFPPF',fn:'A shoe with a load-bearing insulation block, so cold lines stay sealed and don’t sweat or ice up at the support.',use:'Chilled, refrigerant and cryogenic lines.'},
 {id:'ptfe',g:'rest',name:'Slide plate (PTFE)',type:35,dof:'RFPPF',fn:'A low-friction pad under the shoe lets the pipe slide with a much smaller friction force.',use:'Long hot lines and lines next to pumps and compressors.'},
 {id:'roll',g:'rest',name:'Pipe roll',type:44,dof:'RFRPF',fn:'A roller under the pipe turns as the pipe grows, giving long movement with very little friction.',use:'Long steam and hot oil lines.'},
 {id:'saddle',g:'rest',name:'Adjustable base support',type:38,dof:'RFPPF',fn:'A stanchion from the floor with a curved saddle on a screw, so the height can be set on site.',use:'Pump lines and lines close to grade.'},
 {id:'trunnion',g:'rest',name:'Elbow trunnion (dummy leg)',type:null,dof:'RFPPF',fn:'A pipe leg welded to the back of an elbow, in line with the vertical leg, reaching down to the steel. It carries the riser’s weight where there is no beam under the pipe.',use:'Elbows at the bottom of risers and at changes in elevation.'},
 {id:'trunnion_s',g:'rest',name:'Trunnion on straight pipe',type:null,dof:'RFPPF',fn:'A short pipe stub welded under a straight run, with a reinforcing pad, rests on the steel below. It lifts the line to the height needed or reaches steel that is lower than the pipe.',use:'Large or heavy lines, and straight runs that sit above the nearest steel.'},
 {id:'guide',g:'guide',name:'Guide',type:null,dof:'RFRPF',fn:'Angles each side of the shoe stop the pipe moving sideways but let it slide along its length.',use:'Straight runs and both sides of expansion loops.'},
 {id:'stop',g:'guide',name:'Line stop',type:null,dof:'RFFRF',fn:'Plates welded under the shoe straddle the beam flange, so the pipe cannot move along its axis.',use:'Splitting long runs and protecting equipment nozzles.'},
 {id:'ubolt',g:'guide',name:'U-bolt',type:24,dof:'RRRPF',fn:'A threaded U round the pipe, bolted through the beam. Holds the pipe down and sideways.',use:'Small, uninsulated utility lines.'},
 {id:'hold',g:'guide',name:'Hold-down',type:null,dof:'RRPPF',fn:'Z-shaped cleats welded to the beam lap over the shoe base plate, so the pipe cannot lift off but can still slide.',use:'Lines with uplift from heat, wind, surge or relief-valve thrust.'},
 {id:'anchor',g:'anchor',name:'Anchor',type:null,dof:'RRRRR',fn:'The shoe base plate is welded all round to the steel, fixing the pipe in every direction.',use:'Fixed points that split a system for stress analysis.'},
 {id:'clevis',g:'hang',name:'Clevis hanger',type:1,dof:'RFFFF',fn:'A U-shaped clevis on a threaded rod hangs the pipe from the steel above.',use:'Light lines under beams, slabs and racks.'},
 {id:'clamp',g:'hang',name:'Pipe clamp hanger',type:3,dof:'RFFFF',fn:'A bolted clamp round the pipe, hung on a rod. Stronger than a clevis and sits under the insulation.',use:'Heavier, hotter and insulated hanging lines.'},
 {id:'riser',g:'hang',name:'Riser clamp',type:42,dof:'RPRRF',fn:'Clamp bars on a vertical pipe rest on the steel; welded lugs above stop the pipe slipping through.',use:'Vertical lines through floors and platforms.'},
 {id:'var',g:'spring',name:'Variable spring hanger',type:51,dof:'RRFFF',fn:'A coil spring in a can carries the pipe while it moves up and down. The load changes a little with travel.',use:'Hot lines with vertical movement.'},
 {id:'vbase',g:'spring',name:'Variable spring support',type:52,dof:'RRPPF',fn:'The same spring can as a hanger, but standing on the steel below and pushing up. The pipe shoe sits on a load flange on top of the spring.',use:'Hot lines with vertical movement where there is no steel above, such as lines close to grade or on equipment platforms.'},
 {id:'const',g:'spring',name:'Constant spring hanger',type:54,dof:'RRFFF',fn:'A spring and lever keep the support force almost the same through the whole travel.',use:'Large vertical movement, or lines near turbines and compressors.'},
 {id:'strut',g:'dyn',name:'Rigid strut',type:null,tag:'Vendor item · sway strut',dof:'RRFFF',fn:'A stiff rod with a ball-joint eye at each end, pinned to a clamp on the pipe and a bracket on the steel. It holds the pipe in line with the strut, push or pull, and lets it swing a little the other ways.',use:'A frictionless restraint in one direction, for hot lines and lines near rotating equipment. Unlike a snubber it also holds slow thermal movement.'},
 {id:'snub',g:'dyn',name:'Snubber',type:47,dof:'FFRFF',fn:'Lets slow thermal movement through but locks against sudden shocks, like a car’s seat belt.',use:'Earthquake loads, water hammer and relief-valve discharge.'}
 ,{id:'bellow',g:'ej',name:'Expansion bellows',type:null,tag:'Vendor item · EJMA',dof:null,key:'Blue arrow shows the movement the bellows takes up.',fn:'A thin, corrugated metal bellows between two flanges flexes to take up thermal growth, so the line needs no expansion loop. Pressure thrust tries to push it open, so the pipe either side needs main anchors and close guides. The limit rods stop it over-stretching if an anchor fails.',use:'Tight layouts with no room for a loop: large hot lines, turbine and fan ducts. Avoid where a loop fits, since bellows are a weak point in the line.'}
];

/* ============================================================ renderer and scene */
const stage=document.getElementById('sp-stage');
let renderer=null,no3d=false;
const poster=document.createElement('img');poster.className='sp-poster';poster.alt='';poster.setAttribute('aria-hidden','true');stage.prepend(poster);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(32,1,0.1,200);
let controls;
const key=new THREE.DirectionalLight(0xffffff,1.7);key.position.set(6,12,8);key.castShadow=true;
key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-10,right:10,top:10,bottom:-10});key.shadow.bias=-0.0005;key.shadow.radius=5;
const fill=new THREE.HemisphereLight(0xffffff,0x7d8b9a,.5);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.15}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;
scene.add(key,fill,ground);
function setupRenderer(r){r.setPixelRatio(Math.min(devicePixelRatio,2));r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;}
function init3D(){if(renderer||no3d)return;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){no3d=true;stage.insertAdjacentHTML('beforeend','<div class="sp-fallback">3D view needs WebGL, which this browser has turned off.</div>');return;}
 setupRenderer(renderer);stage.prepend(renderer.domElement);
 const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;
 controls=new OrbitControls(camera,renderer.domElement);Object.assign(controls,{enableDamping:true,dampingFactor:.08,autoRotate:false,autoRotateSpeed:1.1,minDistance:4,maxDistance:60,maxPolarAngle:Math.PI*.9});
 startLoop();show(cur);poster.remove();}

/* ============================================================ materials */
const mat=(c,m=.3,r=.55,x={})=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,...x});
const M={pipe:mat(0x8f99a4,.7,.38),clad:mat(0xe4e9ee,.9,.16),steel:mat(0x45678a,.35,.5),steel2:mat(0x3a5672,.35,.55),
 galv:mat(0xb3bcc6,.85,.32),zinc:mat(0x9ba6b1,.8,.38),ptfe:mat(0xf6f3ec,0,.55),ss:mat(0xe2e7ec,.95,.15),
 spring:mat(0xd9741c,.25,.42),puf:mat(0xe8c43a,0,.8),concrete:mat(0xc1bcb2,0,.95),red:mat(0xc2412a,.2,.5),
 scale:mat(0xf7f6f0,0,.5),weld:mat(0x2e3a46,.5,.6),can:mat(0x2d6db0,.35,.42,{side:THREE.DoubleSide}),snub:mat(0xc9a43c,.55,.32)};
const AC=new THREE.MeshBasicMaterial({color:0x1d5bd6,transparent:true,opacity:.95,depthTest:false});

/* ============================================================ geometry helpers. Pipe axis X, up Y, rack beam along Z */
const R=1,V=(x,y,z)=>new THREE.Vector3(x,y,z);
const add=(g,m,o)=>{const x=new THREE.Mesh(g,m);x.castShadow=x.receiveShadow=true;o.add(x);return x;};
function along(geo,axis,len){geo.translate(0,0,-len/2);if(axis==='x')geo.rotateY(Math.PI/2);if(axis==='y')geo.rotateX(-Math.PI/2);return geo;}
const ext=(shape,len,axis)=>along(new THREE.ExtrudeGeometry(shape,{depth:len,bevelEnabled:false,curveSegments:56}),axis,len);
function ring(ro,ri){const s=new THREE.Shape();s.absarc(0,0,ro,0,Math.PI*2,false);const h=new THREE.Path();h.absarc(0,0,ri,0,Math.PI*2,true);s.holes.push(h);return s;}
function sector(ro,ri,a0,a1){const s=new THREE.Shape();s.absarc(0,0,ro,a0,a1,false);s.absarc(0,0,ri,a1,a0,true);s.closePath();return s;}
function pipe(o,len,{r=R,x=0,y=0,z=0,axis='x',t=.12}={}){const m=add(ext(ring(r,r-t),len,axis),M.pipe,o);m.position.set(x,y,z);return m;}
function insul(o,x0,x1,y,t=.42){const m=add(ext(ring(R+t,R+.01),x1-x0,'x'),M.clad,o);m.position.set((x0+x1)/2,y,0);
 for(const xx of [x0+.15,x1-.15]){const b=add(ext(ring(R+t+.018,R+t-.01),.06,'x'),M.galv,o);b.position.set(xx,y,0);}}
function box(o,w,h,d,m,x,y,z){const b=add(new THREE.BoxGeometry(w,h,d),m,o);b.position.set(x,y,z);return b;}
function cyl(o,r,h,m,x,y,z,axis='y',seg=40){const g=new THREE.CylinderGeometry(r,r,h,seg);if(axis==='z')g.rotateX(Math.PI/2);if(axis==='x')g.rotateZ(Math.PI/2);const c=add(g,m,o);c.position.set(x,y,z);return c;}
function ibeam(o,len,{h=1.1,b=1.0,tf=.12,tw=.08,y=0,x=0,z=0,axis='z'}={}){
 const s=new THREE.Shape(),hb=b/2,hh=h/2;
 [[-hb,-hh],[hb,-hh],[hb,-hh+tf],[tw/2,-hh+tf],[tw/2,hh-tf],[hb,hh-tf],[hb,hh],[-hb,hh],[-hb,hh-tf],[-tw/2,hh-tf],[-tw/2,-hh+tf],[-hb,-hh+tf]].forEach((p,i)=>i?s.lineTo(...p):s.moveTo(...p));s.closePath();
 const m=add(ext(s,len,axis),M.steel,o);m.position.set(x,y-hh,z);return m;}      /* y = top of top flange */
const nut=(o,x,y,z,r=.13,h=.1,axis='y')=>cyl(o,r,h,M.zinc,x,y,z,axis,6);
function bolt(o,x,y,z,len,axis='z',r=.055){cyl(o,r,len,M.zinc,x,y,z,axis,16);const d=len/2-.04,off=axis==='z'?[0,0,d]:axis==='x'?[d,0,0]:[0,d,0];
 nut(o,x+off[0],y+off[1],z+off[2],r*2.2,r*1.7,axis);nut(o,x-off[0],y-off[1],z-off[2],r*2.2,r*1.7,axis);}
const rod=(o,x,y0,y1,z=0,r=.075)=>cyl(o,r,Math.abs(y1-y0),M.galv,x,(y0+y1)/2,z,'y',20);
function helix(o,x,y0,y1,rad,turns,wire){const pts=[],n=turns*32;for(let i=0;i<=n;i++){const a=i/32*Math.PI*2;pts.push(V(x+Math.cos(a)*rad,y0+(y1-y0)*i/n,Math.sin(a)*rad));}
 return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),n,wire,12,false),M.spring,o);}
const band=(o,ro,ri,a0,a1,w,m,x,y,z=0,axis='x')=>{const b=add(ext(sector(ro,ri,a0,a1),w,axis),m,o);b.position.set(x,y,z);return b;};
function tShoe(o,{len=2.4,h=.62,base=1.1,y=0}={}){box(o,len,.1,base,M.steel2,0,y+.05,0);box(o,len,h-.16,.1,M.steel2,0,y+.1+(h-.16)/2,0);box(o,len,.06,.5,M.steel2,0,y+h-.03,0);return y+h;}
function insulatedPipe(o,yc,gap=1.45,len=6.4){pipe(o,len,{y:yc});insul(o,-len/2+.3,-gap,yc);insul(o,gap,len/2-.3,yc);}
function pipeClamp(o,x,yc,axis='x'){band(o,R+.12,R,-Math.PI/2,Math.PI/2,.34,M.steel,x,yc,0,axis);band(o,R+.12,R,Math.PI/2,Math.PI*1.5,.34,M.steel,x,yc,0,axis);
 for(const s of [-1,1])box(o,.34,.95,.1,M.steel,x,yc+R+.5,s*.12);bolt(o,x,yc+R+.78,0,.62,'z');bolt(o,x,yc+R+.28,0,.62,'z',.045);}
function clampedShoe(o){                     /* T-shoe welded to the lower halves of two bolted pipe clamps */
 box(o,2.2,.1,1.1,M.steel2,0,.05,0);box(o,2.2,.5,.1,M.steel2,0,.35,0);
 const yc=.6+.08+R;pipe(o,6.4,{y:yc});
 for(const x of [-.72,.72]){band(o,R+.08,R,Math.PI,2*Math.PI,.34,M.steel,x,yc);band(o,R+.08,R,0,Math.PI,.34,M.steel,x,yc);
  for(const s of [-1,1]){box(o,.34,.07,.36,M.steel,x,yc+.05,s*(R+.24));box(o,.34,.07,.36,M.steel,x,yc-.05,s*(R+.24));bolt(o,x,yc,s*(R+.27),.62,'y',.05);}}
 box(o,1.7,.08,.12,M.steel2,0,.62,0);
 return yc;}
function weldBead(o,x,y,z,len,axis='x'){cyl(o,.05,len,M.weld,x,y,z,axis,8);}

/* restraint arrows */
function arrow(o,from,to,both=true,r=.075){const dir=V().subVectors(to,from),L=dir.length();dir.normalize();const g=new THREE.Group();
 const head=.5,shaft=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L-(both?2:1)*head,12),AC);shaft.position.y=both?0:-head/2;g.add(shaft);
 const cone=()=>new THREE.Mesh(new THREE.ConeGeometry(r*3.2,head,20),AC);const c1=cone();c1.position.y=L/2-head/2;g.add(c1);
 if(both){const c2=cone();c2.position.y=-L/2+head/2;c2.rotation.z=Math.PI;g.add(c2);}
 g.position.copy(from).add(to).multiplyScalar(.5);g.quaternion.setFromUnitVectors(V(0,1,0),dir);g.traverse(m=>m.renderOrder=10);o.add(g);}
function rotArrow(o,c,rad){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(rad,.065,10,64,Math.PI*1.5),AC));
 const cone=new THREE.Mesh(new THREE.ConeGeometry(.21,.5,18),AC);cone.position.set(rad,-.2,0);g.add(cone);g.rotation.y=Math.PI/2;g.position.copy(c);g.traverse(m=>m.renderOrder=10);o.add(g);}

/* ============================================================ models: BUILD[id](parts group, arrows group) */
const BEAM=5.2;
const VIEW={stop:[V(1.0,.12,1.25),.72,-.45],hold:[V(1.0,.3,1.25),.75,-.35]};   /* direction, zoom, target height shift */   /* per-model camera direction where the default hides the detail */
const restArrow=(a,yc)=>arrow(a,V(0,yc+R+2.4,0),V(0,yc+R+.55,0),false);
const BUILD={
 shoe(o,a){ibeam(o,BEAM);const yc=tShoe(o)+R;insulatedPipe(o,yc);weldBead(o,0,yc-R+.01,.26,2.4);weldBead(o,0,yc-R+.01,-.26,2.4);restArrow(a,yc);},
 clamped(o,a){ibeam(o,BEAM);const yc=clampedShoe(o);restArrow(a,yc);},
 cold(o,a){ibeam(o,BEAM);box(o,2.6,.1,2.2,M.steel2,0,.05,0);const yc=.1+1.85;
  const blk=new THREE.Shape();blk.moveTo(-1.6,-1.85);blk.lineTo(1.6,-1.85);blk.lineTo(1.6,0);blk.absarc(0,0,1.6,0,Math.PI,false);blk.lineTo(-1.6,-1.85);
  const h=new THREE.Path();h.absarc(0,0,R+.01,0,Math.PI*2,true);blk.holes.push(h);add(ext(blk,2.2,'x'),M.puf,o).position.set(0,yc,0);
  const cr=new THREE.Shape();[[-1.68,-1.85],[1.68,-1.85],[1.68,-.3],[1.6,-.3],[1.6,-1.77],[-1.6,-1.77],[-1.6,-.3],[-1.68,-.3]].forEach((p,i)=>i?cr.lineTo(...p):cr.moveTo(...p));cr.closePath();
  add(ext(cr,2.0,'x'),M.steel2,o).position.set(0,yc,0);
  pipe(o,6.4,{y:yc});const L=6.4/2-1.1-.3;for(const s of [-1,1]){add(ext(ring(1.6,R+.01),L,'x'),M.clad,o).position.set(s*(1.1+L/2),yc,0);}
  for(const x of [-.65,.65])band(o,1.64,1.6,-.25,Math.PI+.25,.12,M.galv,x,yc);restArrow(a,yc+.6);},
 ptfe(o,a){ibeam(o,BEAM);box(o,1.7,.04,1.2,M.ss,0,.02,0);box(o,2.4,.07,1.1,M.ptfe,0,.075,0);const yc=tShoe(o,{y:.11})+R;insulatedPipe(o,yc);restArrow(a,yc);},
 roll(o,a){box(o,3.0,.12,2.3,M.steel2,0,.06,0);for(const s of [-1,1])box(o,1.0,1.3,.14,M.steel,0,.12+.65,s*1.0);
  const prof=[[.36,-.88],[.44,-.84],[.44,-.74],[.33,-.3],[.3,0],[.33,.3],[.44,.74],[.44,.84],[.36,.88]].map(p=>new THREE.Vector2(...p));
  const lg=new THREE.LatheGeometry(prof,48);lg.rotateX(Math.PI/2);add(lg,M.galv,o).position.set(0,1.0,0);bolt(o,0,1.0,0,2.35,'z',.07);
  const yc=1.0+.3+R;pipe(o,6.4,{y:yc});restArrow(a,yc);arrow(a,V(-.2,.9,-2.7),V(-.2,.9,2.7));},
 saddle(o,a){box(o,1.9,.5,1.9,M.concrete,0,.25,0);box(o,1.1,.06,1.1,M.steel2,0,.53,0);for(const [x,z] of [[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]])nut(o,x,.6,z,.08,.08);
  pipe(o,2.0,{axis:'y',r:.36,t:.05,y:1.56});cyl(o,.16,.8,M.galv,0,2.95,0,'y',24);
  for(let i=0;i<11;i++){const th=add(new THREE.TorusGeometry(.16,.02,6,24),M.zinc,o);th.rotation.x=Math.PI/2;th.position.set(0,2.62+i*.065,0);}
  nut(o,0,2.62,0,.3,.14);cyl(o,.46,.06,M.steel2,0,3.36,0);
  const yc=3.39+.3+R;band(o,R+.08,R,Math.PI*1.1,Math.PI*1.9,1.3,M.steel2,0,yc);
  for(const s of [-1,1])box(o,1.3,.36,.07,M.steel2,0,3.55,s*.32);pipe(o,6.4,{y:yc});restArrow(a,yc);},
 trunnion(o,a){const yc=3.3,br=1.55,lr=.7;ibeam(o,BEAM,{x:br});
  pipe(o,4.6,{x:-2.3,y:yc});const el=add(new THREE.TorusGeometry(br,R,28,56,Math.PI/2),M.pipe,o);el.rotation.z=-Math.PI/2;el.position.set(0,yc+br,0);
  pipe(o,3.0,{axis:'y',x:br,y:yc+br+1.5});
  const yTop=yc+br-Math.sqrt((br+R)**2-br**2)+.15;          /* leg runs in line with the riser and stops on the back of the elbow */
  pipe(o,yTop-.12,{axis:'y',x:br,y:(yTop+.12)/2,r:lr,t:.06});box(o,1.5,.12,1.5,M.steel2,br,.06,0);
  arrow(a,V(br,yc+br+3.6,2.2),V(br,1.2,2.2),false);},
 trunnion_s(o,a){const yc=3.0,lr=.6;ibeam(o,BEAM);pipe(o,6.4,{y:yc});
  band(o,R+.06,R,Math.PI*1.18,Math.PI*1.82,1.8,M.steel2,0,yc);
  pipe(o,yc-R-.05-.12,{axis:'y',y:(yc-R-.05+.12)/2,r:lr,t:.06});box(o,1.4,.12,1.4,M.steel2,0,.06,0);
  restArrow(a,yc);},
 guide(o,a){ibeam(o,BEAM);const yc=tShoe(o)+R;insulatedPipe(o,yc);
  for(const s of [-1,1]){box(o,1.6,.44,.07,M.steel,0,.22,s*(.55+.06));box(o,1.6,.07,.42,M.steel,0,.035,s*(.55+.06+.21));}
  restArrow(a,yc);arrow(a,V(0,.55,-2.7),V(0,.55,2.7));},
 stop(o,a){ibeam(o,BEAM);const yc=tShoe(o)+R;insulatedPipe(o,yc);
  /* stop plates welded under the shoe base, one each side of the beam flange (small gap) */
  for(const s of [-1,1]){box(o,.16,.62,1.0,M.galv,s*(.5+.03+.08),-.21,0);weldBead(o,s*(.5+.03+.12),.0,0,1.0,'z');}
  restArrow(a,yc);arrow(a,V(-2.4,yc,R+1.0),V(2.4,yc,R+1.0));},
 ubolt(o,a){ibeam(o,BEAM);const r=.7,yc=r,rr=r+.07;pipe(o,6.4,{y:yc,r,t:.08});
  const path=new THREE.CurvePath();path.add(new THREE.LineCurve3(V(0,-.5,-rr),V(0,yc,-rr)));
  const arc=new THREE.Curve();arc.getPoint=t=>{const an=Math.PI-t*Math.PI;return V(0,yc+Math.sin(an)*rr,Math.cos(an)*rr);};path.add(arc);
  path.add(new THREE.LineCurve3(V(0,yc,rr),V(0,-.5,rr)));add(new THREE.TubeGeometry(path,140,.06,14,false),M.galv,o);
  for(const s of [-1,1]){nut(o,0,.05,s*rr,.12,.1);nut(o,0,-.17,s*rr,.12,.1);}
  arrow(a,V(1.6,yc+2.4,0),V(1.6,yc-.2,0));arrow(a,V(1.6,.4,-2.2),V(1.6,.4,2.2));},
 hold(o,a){ibeam(o,BEAM);const yc=clampedShoe(o);
  /* Z-shaped hold-down cleats welded to the beam flange, lip over the shoe base plate with a small gap */
  for(const s of [-1,1]){const zf=s*.8,len=.55;
   box(o,len,.07,.34,M.steel,0,.035,s*.83);box(o,len,.24,.07,M.steel,0,.12,s*.63);box(o,len,.07,.24,M.steel,0,.205,s*.53);
   weldBead(o,0,.0,s*1.0,len);}
  arrow(a,V(0,yc+R+2.4,0),V(0,yc+R+.4,0));},
 anchor(o,a){ibeam(o,BEAM);const mh=0;
  const yc=tShoe(o,{base:1.3,y:mh})+R;insulatedPipe(o,yc);weldBead(o,0,yc-R+.01,.26,2.4);weldBead(o,0,yc-R+.01,-.26,2.4);
  for(const z of [-.66,.66])weldBead(o,0,.02,z,1.0);for(const x of [-.52,.52])weldBead(o,x,-.02,0,1.3,'z');
  restArrow(a,yc);arrow(a,V(-2.0,.5,-2.6),V(-2.0,.5,2.6));arrow(a,V(-3.8,.5,1.6),V(-.4,.5,1.6));rotArrow(a,V(3.2,yc,0),R+.35);},
 clevis(o,a){const top=5.3;ibeam(o,BEAM,{y:top+1.1});box(o,.5,.12,.5,M.steel,0,top+.06,0);nut(o,0,top-.05,0,.15,.12);
  const yc=1.4,cr=R+.03,t=.08;pipe(o,6.4,{y:yc});rod(o,0,yc+R+.9,top,0,.075);nut(o,0,yc+R+.95,0,.15,.12);
  const sh=new THREE.Shape();sh.moveTo(-cr-t,1.3);sh.lineTo(-cr-t,0);sh.absarc(0,0,cr+t,Math.PI,2*Math.PI,false);sh.lineTo(cr+t,1.3);sh.lineTo(cr,1.3);sh.lineTo(cr,0);sh.absarc(0,0,cr,0,-Math.PI,true);sh.lineTo(-cr,1.3);sh.closePath();
  add(ext(sh,.34,'x'),M.galv,o).position.set(0,yc,0);
  const yk=yc+1.3;const yo=new THREE.Shape();yo.moveTo(-cr-t,0);yo.lineTo(cr+t,0);yo.lineTo(cr+t,.12);yo.lineTo(.12,.55);yo.lineTo(-.12,.55);yo.lineTo(-cr-t,.12);yo.closePath();add(ext(yo,.34,'x'),M.galv,o).position.set(0,yk,0);
  bolt(o,0,yk-.18,0,2*cr+.5,'z',.05);arrow(a,V(0,yc-R-2.0,0),V(0,yc-R-.35,0),false);},
 clamp(o,a){const top=5.6;ibeam(o,BEAM,{y:top+1.1});box(o,.5,.12,.5,M.steel,0,top+.06,0);nut(o,0,top-.05,0,.15,.12);
  const yc=1.4;pipe(o,6.4,{y:yc});insul(o,-2.9,-.6,yc);insul(o,.6,2.9,yc);pipeClamp(o,0,yc);rod(o,0,yc+R+1.0,top,0,.08);nut(o,0,yc+R+1.02,0,.15,.12);
  arrow(a,V(0,yc-R-2.0,0),V(0,yc-R-.45,0),false);},
 riser(o,a){const yb=1.7;for(const s of [-1,1])ibeam(o,3.8,{y:yb,axis:'x',z:s*1.55});
  pipe(o,4.6,{axis:'y',y:yb+.8});
  for(const s of [-1,1])box(o,.24,.36,4.1,M.steel,s*(R+.14),yb+.18,0);
  for(const z of [-1.75,1.75])bolt(o,0,yb+.18,z,2*R+.8,'x',.06);
  for(let i=0;i<4;i++){const an=i*Math.PI/2;const l=box(o,.12,.5,.38,M.steel2,Math.cos(an)*(R+.06),yb+.62,Math.sin(an)*(R+.06));l.rotation.y=-an;}
  arrow(a,V(-2.6,yb+3.6,0),V(-2.6,yb+1.0,0),false);arrow(a,V(-2.3,yb+.4,-1.0),V(-2.3,yb+.4,2.2));},
 var(o,a){const top=7.7;ibeam(o,BEAM,{y:top+1.1});box(o,.5,.12,.5,M.steel,0,top+.06,0);rod(o,0,top-.75,top,0,.085);
  const c0=4.25,c1=top-.75;add(new THREE.CylinderGeometry(.86,.86,c1-c0,56,1,true,Math.PI*.3,Math.PI*1.4),M.can,o).position.set(0,(c0+c1)/2,0);
  cyl(o,.93,.12,M.steel2,0,c1,0,'y',56);cyl(o,.93,.12,M.steel2,0,c0,0,'y',56);cyl(o,.66,.08,M.steel2,0,c0+.55,0,'y',48);
  helix(o,0,c0+.6,c1-.1,.62,6,.1);
  const ang=-Math.PI*.42;const sc=box(o,.05,1.7,.34,M.scale,Math.cos(ang)*.88,(c0+c1)/2,Math.sin(ang)*.88);sc.rotation.y=-ang;
  const ind=box(o,.06,.06,.4,M.red,Math.cos(ang)*.9,(c0+c1)/2+.25,Math.sin(ang)*.9);ind.rotation.y=-ang;
  const yc=1.3;rod(o,0,yc+R+.95,c0,0,.08);nut(o,0,c0-.1,0,.15,.12);pipe(o,6.4,{y:yc});insul(o,-2.9,-.6,yc);insul(o,.6,2.9,yc);pipeClamp(o,0,yc);
  arrow(a,V(2.4,yc+2.8,0),V(2.4,yc-.8,0));},
 const(o,a){const top=7.4;ibeam(o,BEAM,{y:top+1.1});box(o,.5,.12,.5,M.steel,-.8,top+.06,0);rod(o,-.8,top-.12,top,0,.09);
  const fr=new THREE.Shape();[[-2.6,-.75],[1.0,-.75],[1.0,.75],[-2.6,.75]].forEach((p,i)=>i?fr.lineTo(...p):fr.moveTo(...p));fr.closePath();
  for(const s of [-1,1]){const pl=add(ext(fr,.08,'z'),M.can,o);pl.position.set(0,top-.9,s*.62);}
  box(o,3.6,.1,1.32,M.can,-.8,top-.12,0);
  const tub=add(new THREE.CylinderGeometry(.48,.48,2.7,40,1,true,0,Math.PI*1.3),M.can,o);tub.rotation.z=Math.PI/2;tub.position.set(-1.15,top-.85,0);
  const pts=[];const n=8*32;for(let i=0;i<=n;i++){const an=i/32*Math.PI*2;pts.push(V(-2.45+i/n*2.6,top-.85+Math.cos(an)*.36,Math.sin(an)*.36));}add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),n,.075,10),M.spring,o);
  cyl(o,.17,1.5,M.zinc,.6,top-1.3,0,'z',24);
  const lv=new THREE.Shape();[[0,-.14],[2.0,-.12],[2.0,.12],[0,.2]].forEach((p,i)=>i?lv.lineTo(...p):lv.moveTo(...p));lv.closePath();
  for(const s of [-1,1]){const l=add(ext(lv,.1,'z'),M.steel2,o);l.position.set(.6,top-1.3,s*.32);l.rotation.z=-.22;}
  const xr=.6+2.0*Math.cos(.22),yr=top-1.3-2.0*Math.sin(.22);bolt(o,xr,yr,0,.9,'z',.06);
  box(o,.06,.9,.5,M.scale,1.0,top-.9,.0).position.z=.67;box(o,.08,.05,.54,M.red,1.03,top-.75,.67);
  const yc=1.3;rod(o,xr,yc+R+.95,yr,0,.08);nut(o,xr,yc+R+.98,0,.15,.12);pipe(o,6.4,{y:yc,x:xr});pipeClamp(o,xr,yc);
  arrow(a,V(xr+2.2,yc+2.8,0),V(xr+2.2,yc-.8,0));},
 snub(o,a){box(o,.3,3.8,2.6,M.concrete,-4.3,1.9,0);box(o,.12,1.1,1.1,M.steel,-4.09,2.4,0);
  for(const s of [-1,1])box(o,.55,.7,.1,M.steel,-3.75,2.4,s*.24);bolt(o,-3.6,2.4,0,.75,'z',.05);
  cyl(o,.38,2.1,M.snub,-2.4,2.4,0,'x',36);cyl(o,.42,.18,M.zinc,-1.35,2.4,0,'x',36);cyl(o,.42,.18,M.zinc,-3.45,2.4,0,'x',36);
  cyl(o,.12,1.4,M.ss,-.55,2.4,0,'x',20);for(const s of [-1,1])box(o,.5,.7,.08,M.steel,.05,2.4,s*.2);bolt(o,.08,2.4,0,.65,'z',.05);
  const yc=2.4,px=.25+R+.95;pipe(o,6.4,{x:px,y:yc,axis:'z'});
  band(o,R+.12,R,Math.PI*.55,Math.PI*1.45,.34,M.steel,px,yc,0,'z');band(o,R+.12,R,-Math.PI*.45,Math.PI*.45,.34,M.steel,px,yc,0,'z');
  for(const s of [-1,1])box(o,.95,.1,.34,M.steel,px-R-.45,yc+s*.14,0);box(o,.5,.4,.34,M.steel,px-R-.05,yc,0);
  arrow(a,V(-1.6,yc+1.6,0),V(3.8,yc+1.6,0));},
 vbase(o,a){box(o,2.2,.1,2.2,M.steel2,0,.05,0);for(const [x,z] of [[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])nut(o,x,.14,z,.09,.08);
  const c0=.1,c1=2.7;add(new THREE.CylinderGeometry(.86,.86,c1-c0,56,1,true,Math.PI*.3,Math.PI*1.4),M.can,o).position.set(0,(c0+c1)/2,0);
  cyl(o,.93,.12,M.steel2,0,c1,0,'y',56);cyl(o,.93,.12,M.steel2,0,c0+.06,0,'y',56);cyl(o,.66,.08,M.steel2,0,c1-.55,0,'y',48);
  helix(o,0,c0+.2,c1-.6,.62,5,.1);
  const ang=-Math.PI*.42;const sc=box(o,.05,1.5,.34,M.scale,Math.cos(ang)*.88,(c0+c1)/2,Math.sin(ang)*.88);sc.rotation.y=-ang;
  const ind=box(o,.06,.06,.4,M.red,Math.cos(ang)*.9,(c0+c1)/2+.2,Math.sin(ang)*.9);ind.rotation.y=-ang;
  cyl(o,.3,.8,M.galv,0,c1+.4,0,'y',32);for(let i=0;i<9;i++){const th=add(new THREE.TorusGeometry(.3,.02,6,24),M.zinc,o);th.rotation.x=Math.PI/2;th.position.set(0,c1+.12+i*.07,0);}
  nut(o,0,c1+.12,0,.42,.14);cyl(o,.75,.1,M.steel2,0,c1+.85,0,'y',48);box(o,1.3,.05,1.1,M.ptfe,0,c1+.925,0);
  const yc=tShoe(o,{y:c1+.95})+R;insulatedPipe(o,yc);arrow(a,V(2.4,yc+2.8,0),V(2.4,yc-.8,0));},
 strut(o,a){const top=6.6;ibeam(o,BEAM,{y:top+1.1});
  box(o,.9,.1,.9,M.steel2,0,top-.05,0);for(const s of [-1,1]){const l=box(o,.1,.55,.6,M.steel,s*.17,top-.37,0);}bolt(o,0,top-.45,0,.6,'x',.06);
  const eye=(y)=>{const t=add(new THREE.TorusGeometry(.2,.08,12,28),M.zinc,o);t.rotation.y=Math.PI/2;t.position.set(0,y,0);const b=add(new THREE.SphereGeometry(.12,16,12),M.ss,o);b.position.set(0,y,0);};
  const yc=1.4,yb=yc+R+.75;eye(top-.45);eye(yb);
  cyl(o,.07,.45,M.galv,0,top-.9,0,'y',16);nut(o,0,top-1.16,0,.14,.12);cyl(o,.07,.45,M.galv,0,yb+.45,0,'y',16);nut(o,0,yb+.71,0,.14,.12);
  cyl(o,.22,top-1.22-(yb+.77),M.steel,0,(top-1.22+yb+.77)/2,0,'y',28);
  pipe(o,6.4,{y:yc});insul(o,-2.9,-.6,yc);insul(o,.6,2.9,yc);
  band(o,R+.12,R,-Math.PI/2,Math.PI/2,.4,M.steel,0,yc);band(o,R+.12,R,Math.PI/2,Math.PI*1.5,.4,M.steel,0,yc);
  for(const s of [-1,1])box(o,.4,.7,.1,M.steel,0,yc+R+.38,s*.17);bolt(o,0,yb,0,.6,'z',.06);bolt(o,0,yc+R+.2,0,.6,'z',.05);
  arrow(a,V(2.4,yc+2.8,0),V(2.4,yc-.8,0));},
 bellow(o,a){const yc=2.2,fr=2.05;
  for(const s of [-1,1]){pipe(o,2.0,{x:s*2.6,y:yc});cyl(o,fr,.16,M.steel,s*1.55,yc,0,'x',56);cyl(o,R+.12,.6,M.steel2,s*1.2,yc,0,'x',48);
   for(let i=0;i<3;i++){const an=Math.PI/2+i*Math.PI*2/3;const z=Math.cos(an)*1.8,y=yc+Math.sin(an)*1.8;box(o,.16,.5,.5,M.steel,s*1.55,y,z).rotation.x=an;}}
  for(let i=0;i<9;i++){const t=add(new THREE.TorusGeometry(R+.22,.13,14,56),M.ss,o);t.rotation.y=Math.PI/2;t.position.set(-.88+i*.22,yc,0);}
  pipe(o,1.9,{y:yc,r:R+.1,t:.05});
  for(let i=0;i<3;i++){const an=Math.PI/2+i*Math.PI*2/3;const z=Math.cos(an)*1.8,y=yc+Math.sin(an)*1.8;cyl(o,.07,4.2,M.galv,0,y,z,'x',16);
   for(const x of [-1.78,-1.35,1.35,1.78])nut(o,x,y,z,.14,.12,'x');}
  arrow(a,V(-2.2,yc+R+1.9,0),V(2.2,yc+R+1.9,0));}
};

/* ============================================================ display */
let cur=0,model=null,arrowsOn=true,spinOn=!matchMedia('(prefers-reduced-motion: reduce)').matches,filter='all';
function build(id){const o=new THREE.Group(),parts=new THREE.Group(),arr=new THREE.Group();arr.name='arrows';BUILD[id](parts,arr);o.add(parts,arr);
 const b=new THREE.Box3().setFromObject(parts),c=b.getCenter(V());o.position.set(-c.x,-b.min.y,-c.z);
 const ba=new THREE.Box3().setFromObject(o);o.userData={id,h:b.max.y-b.min.y,c:ba.getCenter(V()),r:ba.getBoundingSphere(new THREE.Sphere()).radius};return o;}
function frame(o,cam,ctl,k=1){const vw=VIEW[o.userData.id];if(vw){k*=vw[1];}const t=o.userData.c.clone().add(V(0,vw?vw[2]:0,0)),d=o.userData.r/Math.sin(THREE.MathUtils.degToRad(cam.fov/2))*1.0*k;
 const aspect=cam.aspect<1?1/cam.aspect:1;cam.position.copy(t).add((vw?vw[0]:V(1,.6,1.3)).clone().normalize().multiplyScalar(d*Math.min(aspect,1.5)));
 if(ctl){ctl.target.copy(t);ctl.update();}else cam.lookAt(t);}
function dispose(o){o.traverse(m=>m.geometry&&m.geometry.dispose());}
function show(i){cur=(i+SUP.length)%SUP.length;const s=SUP[cur];
 if(renderer){if(model){scene.remove(model);dispose(model);}model=build(s.id);model.getObjectByName('arrows').visible=arrowsOn;scene.add(model);frame(model,camera,controls);controls.autoRotate=spinOn&&awake;need=3;}
if(!renderer)poster.src='assets/img/sup/'+s.id+'.webp';
 renderInfo(s);document.querySelectorAll('#p-sup .sp-tile').forEach(t=>t.setAttribute('aria-current',String(t.dataset.id===s.id)));}
const ICON={Down:'<path d="M12 4v15M6 13l6 6 6-6"/>',Up:'<path d="M12 20V5M6 11l6-6 6 6"/>',Sideways:'<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>',Along:'<path d="M5 19L19 5M19 5h-6M19 5v6M5 19h6M5 19v-6"/>',Turning:'<path d="M20 12a8 8 0 1 1-3-6.2M20 4v4h-4"/>'};
const DN=['Down','Up','Sideways','Along','Turning'],ST={R:'Held',P:'Slides',F:'Free'};
function renderInfo(s){const vis=visible();
 document.getElementById('sp-info').innerHTML=`<div><div class="sp-kicker">${GROUPS[s.g]} · ${vis.indexOf(cur)+1} of ${vis.length}</div><h3>${s.name}</h3></div>
 <div>${s.type?`<span class="sp-tag">MSS SP-58 Type ${s.type}</span>`:`<span class="sp-tag sp-fab">${s.tag||'Fabricated · project standard'}</span>`}</div>
 <p class="sp-fn">${s.fn}</p>
 ${s.dof?`<div class="sp-dirs" role="list" aria-label="What it does in each direction">${[...s.dof].map((d,i)=>`<div class="sp-dir ${d}" role="listitem"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[DN[i]]}</svg><b>${DN[i]}</b><span>${ST[d]}</span></div>`).join('')}</div>`:''}
 <p class="sp-key"><i></i>${s.key||'Blue arrows on the model show the directions it holds.'}</p>
 <p class="sp-use"><b>Used for:</b> ${s.use}</p>`;}
let need=3,awake=false;
function resize(){if(!renderer)return;need=3;const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(model)frame(model,camera,controls);}
let nf=0;
function startLoop(){new ResizeObserver(resize).observe(stage);resize();
 let onScreen=true,slow=0;new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;need=3;}).observe(stage);
 const poke=()=>{need=3;};['click','keydown','pointermove'].forEach(t=>document.getElementById('p-sup').addEventListener(t,poke));
 let drag=false;controls.addEventListener('start',()=>{drag=true;});controls.addEventListener('end',()=>{drag=false;need=40;});
 let last=0;(function loop(now){requestAnimationFrame(loop);if(!onScreen||document.hidden){last=0;return;}controls.update();if(!controls.autoRotate&&!drag&&!need){last=0;return;}if(need)need--;
  renderer.render(scene,camera);
  if(controls.autoRotate&&nf<20){if(last){nf++;if(nf>4)slow+=now-last;if(nf===20&&slow/15>60){spinOn=false;controls.autoRotate=false;need=3;document.getElementById('sp-tSpin').setAttribute('aria-pressed','false');}}last=now;}})();
 controls.addEventListener('start',()=>{if(spinOn){spinOn=false;controls.autoRotate=false;document.getElementById('sp-tSpin').setAttribute('aria-pressed','false');}});}
/* the 3D view starts on the first interaction; until then a pre-rendered picture stands in */
const WAKE=['pointermove','pointerdown','touchstart','wheel','scroll','keydown'];
const wake=()=>{WAKE.forEach(t=>removeEventListener(t,wake,true));awake=true;init3D();if(controls&&spinOn&&nf<20){controls.autoRotate=true;need=3;}};
WAKE.forEach(t=>addEventListener(t,wake,{capture:true,passive:true}));

/* thumbnails: one offscreen renderer draws every model once */
let IMGS={};
const visible=()=>SUP.map((s,i)=>i).filter(i=>filter==='all'||SUP[i].g===filter);
function gallery(){document.getElementById('sp-gal').innerHTML=visible().map(i=>{const s=SUP[i];return `<button class="sp-tile" data-i="${i}" data-id="${s.id}" aria-current="${i===cur}"><span class="sp-th"><img alt="${s.name}, 3D model" src="assets/img/sup/${s.id}.webp" width="480" height="360" loading="lazy" decoding="async"></span><span class="sp-tx"><b>${s.name}</b><small>${s.type?'Type '+s.type:'Fabricated'} · ${GROUPS[s.g]}</small></span></button>`;}).join('');}
document.getElementById('sp-gal').onclick=e=>{const t=e.target.closest('.sp-tile');if(!t)return;show(+t.dataset.i);if(stage.getBoundingClientRect().top<0)stage.scrollIntoView({block:'start'});};
const chips=document.getElementById('sp-chips');
chips.innerHTML=[['all','All'],...Object.entries(GROUPS)].map(([k,v])=>`<button data-g="${k}" aria-pressed="${k==='all'}">${v}</button>`).join('');
chips.onclick=e=>{const b=e.target.closest('button');if(!b)return;filter=b.dataset.g;chips.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 const v=visible();gallery();show(v.includes(cur)?cur:v[0]);};
const step=d=>{const v=visible();show(v[(v.indexOf(cur)+d+v.length)%v.length]);};
document.getElementById('sp-prev').onclick=()=>step(-1);document.getElementById('sp-next').onclick=()=>step(1);
document.getElementById('sp-tArrows').onclick=e=>{arrowsOn=!arrowsOn;e.currentTarget.setAttribute('aria-pressed',String(arrowsOn));if(model)model.getObjectByName('arrows').visible=arrowsOn;};
document.getElementById('sp-tSpin').onclick=e=>{spinOn=!spinOn;if(controls)controls.autoRotate=spinOn;e.currentTarget.setAttribute('aria-pressed',String(spinOn));};
document.getElementById('sp-tReset').onclick=()=>{if(model)frame(model,camera,controls);};
document.getElementById('sp-tSpin').setAttribute('aria-pressed',String(spinOn));
addEventListener('keydown',e=>{if(e.target.closest&&e.target.closest('input,select,textarea,[contenteditable]')||document.getElementById('cmdk')&&!document.getElementById('cmdk').hidden)return;if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1);});
show(0);gallery();

import('./suploc.js?v=20261123c').catch(()=>{});
