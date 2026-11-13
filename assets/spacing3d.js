/* Pipe spacing: 3D rack view of the two lines at the calculated centre-to-centre distance.
   Loaded on demand from app.js (spc3D). Units: 1 scene unit = 100 mm. */
import * as THREE from './three/three.module.min.js';
import {OrbitControls} from './three/OrbitControls.js';
import {RoomEnvironment} from './three/RoomEnvironment.js';

let renderer,scene,camera,controls,group,ro,raf,envTex;
const U=mm=>mm/100, V=(x,y,z)=>new THREE.Vector3(x,y,z);
const mat=(c,m=.3,r=.5,x={})=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,...x});
const M={pipe:mat(0x8f99a4,.7,.38),clad:mat(0xe4e9ee,.9,.16),steel:mat(0x45678a,.35,.5),steel2:mat(0x3a5672,.35,.55),
 flg:mat(0x9aa5b1,.75,.32),stud:mat(0x6f7a86,.6,.45),gask:mat(0x2c333b,.1,.8),
 hiA:mat(0x1d5bd6,.2,.4,{transparent:true,opacity:.22,depthWrite:false})};
const DIM=new THREE.MeshBasicMaterial({color:0x1d5bd6,depthTest:false,transparent:true});
const GAP=new THREE.MeshBasicMaterial({color:0x14804f,depthTest:false,transparent:true});

function init(){
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 scene=new THREE.Scene();envTex=new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(),0.04).texture;scene.environment=envTex;
 camera=new THREE.PerspectiveCamera(32,1,.1,500);
 controls=new OrbitControls(camera,renderer.domElement);Object.assign(controls,{enableDamping:true,dampingFactor:.08,maxPolarAngle:Math.PI*.9});
 const key=new THREE.DirectionalLight(0xffffff,1.7);key.position.set(8,16,10);key.castShadow=true;key.shadow.mapSize.set(2048,2048);
 Object.assign(key.shadow.camera,{left:-20,right:20,top:20,bottom:-20});key.shadow.radius=5;key.shadow.bias=-.0005;
 const g=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.15}));g.rotation.x=-Math.PI/2;g.receiveShadow=true;g.name='ground';
 scene.add(key,new THREE.HemisphereLight(0xffffff,0x7d8b9a,.5),g);
 const loop=()=>{raf=requestAnimationFrame(loop);controls.update();renderer.render(scene,camera);};loop();
}
const add=(geo,m,o,x=0,y=0,z=0)=>{const e=new THREE.Mesh(geo,m);e.castShadow=e.receiveShadow=true;e.position.set(x,y,z);o.add(e);return e;};
const cylZ=(r,len,seg=48)=>{const g=new THREE.CylinderGeometry(r,r,len,seg);g.rotateX(Math.PI/2);return g;};
function tube(ro,ri,len){const s=new THREE.Shape();s.absarc(0,0,ro,0,Math.PI*2,false);const h=new THREE.Path();h.absarc(0,0,ri,0,Math.PI*2,true);s.holes.push(h);
 const g=new THREE.ExtrudeGeometry(s,{depth:len,bevelEnabled:false,curveSegments:56});g.translate(0,0,-len/2);return g;}
function ibeam(o,len,h,b){const tf=h*.1,tw=h*.07,s=new THREE.Shape(),hb=b/2,hh=h/2;
 [[-hb,-hh],[hb,-hh],[hb,-hh+tf],[tw/2,-hh+tf],[tw/2,hh-tf],[hb,hh-tf],[hb,hh],[-hb,hh],[-hb,hh-tf],[-tw/2,hh-tf],[-tw/2,-hh+tf],[-hb,-hh+tf]].forEach((p,i)=>i?s.lineTo(...p):s.moveTo(...p));s.closePath();
 const g=new THREE.ExtrudeGeometry(s,{depth:len,bevelEnabled:false});g.translate(0,0,-len/2);g.rotateY(Math.PI/2);add(g,M.steel,o,0,-hh,0);}
function label(text,color,h){const c=document.createElement('canvas'),x=c.getContext('2d'),fs=44;x.font=`600 ${fs}px Geist, system-ui, sans-serif`;
 const w=Math.ceil(x.measureText(text).width)+40;c.width=w;c.height=fs+28;x.font=`600 ${fs}px Geist, system-ui, sans-serif`;
 x.fillStyle=color;const r=14;x.beginPath();x.roundRect(0,0,w,c.height,r);x.fill();x.fillStyle='#fff';x.textBaseline='middle';x.fillText(text,20,c.height/2+2);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true}));
 s.scale.set(h*w/c.height,h,1);s.renderOrder=20;return s;}
function dimLine(o,p,q,m,r){const d=V().subVectors(q,p),L=d.length();d.normalize();const g=new THREE.Group();
 const sh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L-r*12,10),m);g.add(sh);
 for(const s of [1,-1]){const c=new THREE.Mesh(new THREE.ConeGeometry(r*3,r*6,16),m);c.position.y=s*(L/2-r*3);if(s<0)c.rotation.z=Math.PI;g.add(c);}
 g.position.copy(p).add(q).multiplyScalar(.5);g.quaternion.setFromUnitVectors(V(0,1,0),d);g.traverse(e=>e.renderOrder=19);o.add(g);}

/* one line: pipe along Z at x, resting on the beam (on a shoe when insulated), flange pair at zf */
function line(o,x,L,d,zf,shoe){
 const r=U(d.od)/2,ins=U(d.ins),yc=shoe+r,fl=d.fl&&d.flg?d.fl:null;
 add(tube(r,r*.9,L),M.pipe,o,x,yc,0);
 if(shoe>0){const sw=U(150),sl=U(300);add(new THREE.BoxGeometry(sw,U(12),sl),M.steel2,o,x,U(6),0);add(new THREE.BoxGeometry(U(12),shoe,sl),M.steel2,o,x,shoe/2,0);}
 if(ins>0){const cut=[[-L/2,(fl?zf:L/2)-U(200)]];/* cladding, stopped short of the shoe and the flange */
  const segs=[];const stops=[[-U(250),U(250)]];if(fl)stops.push([zf-U(250),zf+U(250)]);stops.sort((a,b)=>a[0]-b[0]);
  let z0=-L/2;for(const [s0,s1] of stops){if(s0>z0)segs.push([z0,s0]);z0=Math.max(z0,s1);}if(z0<L/2)segs.push([z0,L/2]);
  for(const [a,b] of segs)add(tube(r+ins,r+U(1),b-a),M.clad,o,x,yc,(a+b)/2);}
 if(fl){const R=U(fl.O*25.4)/2,t=U(fl.tf*25.4),bc=U(fl.BC*25.4)/2,sr=U(fl.dv*25.4)/2,gk=U(3);
  for(const s of [-1,1])add(cylZ(R,t,64),M.flg,o,x,yc,zf+s*(t/2+gk/2));
  add(cylZ(R*.82,gk,48),M.gask,o,x,yc,zf);
  for(const s of [-1,1]){const hx=U(fl.X*25.4)/2;add(cylZ(hx,t*.9,48),M.flg,o,x,yc,zf+s*(t+gk/2+t*.45));}
  for(let i=0;i<fl.n;i++){const a=Math.PI*2*(i+.5)/fl.n,px=x+bc*Math.cos(a),py=yc+bc*Math.sin(a);add(cylZ(sr,2*t+gk+sr*3,12),M.stud,o,px,py,zf);
   for(const s of [-1,1]){const nt=new THREE.CylinderGeometry(sr*1.6,sr*1.6,sr*1.2,6);nt.rotateX(Math.PI/2);add(nt,M.stud,o,px,py,zf+s*(t+gk/2+sr*.6));}}}
 return {yc,r,ins,R:fl?U(fl.O*25.4)/2:0};}

function build(d){
 const o=new THREE.Group(),cc=U(d.cc);
 const ra=U(d.a.od)/2,rb=U(d.b.od)/2,shA=d.a.ins>0?U(d.a.ins+40):0,shB=d.b.ins>0?U(d.b.ins+40):0;
 const span=Math.max(ra,rb)*2+cc,L=Math.max(span*1.7,U(1400)),zA=L*.27,zB=-L*.27;
 const ea=Math.max(ra+U(d.a.ins),d.flg&&d.a.fl?U(d.a.fl.O*25.4)/2:0),eb=Math.max(rb+U(d.b.ins),d.flg&&d.b.fl?U(d.b.fl.O*25.4)/2:0);
 const beamLen=cc+ea+eb+U(500),bh=Math.max(U(200),Math.min(U(400),span*.35));
 const bm=new THREE.Group();ibeam(bm,beamLen,bh,bh*.75);bm.position.set((eb-ea)/2,0,0);o.add(bm);
 const A=line(o,-cc/2,L,{...d.a,flg:d.flg},zA,shA),B=line(o,cc/2,L,{...d.b,flg:d.flg},zB,shB);
 /* C–C dimension above the lines, on the beam */
 const top=Math.max(A.yc+Math.max(A.r+A.ins,A.R),B.yc+Math.max(B.r+B.ins,B.R)),yd=top+span*.18,rr=span*.006;
 dimLine(o,V(-cc/2,yd,0),V(cc/2,yd,0),DIM,rr);
 for(const x of [-cc/2,cc/2]){const ext=new THREE.Mesh(new THREE.CylinderGeometry(rr*.45,rr*.45,yd-Math.min(A.yc,B.yc)+rr*6,8),DIM);ext.position.set(x,(yd+Math.min(A.yc,B.yc))/2,0);ext.renderOrder=19;o.add(ext);}
 const lh=span*.11;const l1=label(`C–C ${d.fmt(d.cc)} ${d.unit}`,'#1849A9',lh);l1.position.set(0,yd+lh*.9,0);o.add(l1);
 /* governing gap, at the flange that governs or mid-way between flanges */
 let z=0,x0,x1,y=(A.yc+B.yc)/2;
 if(d.gov==='fa'){z=zA;x0=-cc/2+A.R;x1=cc/2-(rb+U(d.b.ins));y=A.yc;}
 else if(d.gov==='fb'){z=zB;x0=-cc/2+(ra+U(d.a.ins));x1=cc/2-B.R;y=B.yc;}
 else{x0=-cc/2+ra+U(d.a.ins);x1=cc/2-rb-U(d.b.ins);z=L*.42;}
 if(x1-x0>rr*8){dimLine(o,V(x0,y,z),V(x1,y,z),GAP,rr*.8);}
 const l2=label(`gap ${d.fmt((x1-x0)*100)} ${d.unit}`,'#14804F',lh*.85);l2.position.set((x0+x1)/2,y+Math.max(A.R,B.R,ra,rb)*0+lh*1.4,z);o.add(l2);
 o.userData={L,span};return o;}

export function show(el,d){
 if(!renderer)init();
 if(group){scene.remove(group);group.traverse(e=>{e.geometry&&e.geometry.dispose();e.material&&e.material.map&&e.material.map.dispose();});}
 group=build(d);scene.add(group);
 el.innerHTML='';el.appendChild(renderer.domElement);el.insertAdjacentHTML('beforeend','<span class="sx-3dlbl">Drag to turn · scroll or pinch to zoom · illustrative shoes and beam</span>');
 const fit=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
 if(ro)ro.disconnect();ro=new ResizeObserver(fit);ro.observe(el);fit();
 const b=new THREE.Box3().setFromObject(group),c=b.getCenter(V()),s=b.getBoundingSphere(new THREE.Sphere());
 const dist=s.radius/Math.sin(THREE.MathUtils.degToRad(camera.fov/2))*.7;
 controls.target.copy(c);camera.position.copy(c).add(V(.42,.5,1.0).normalize().multiplyScalar(dist));camera.near=dist/100;camera.far=dist*10;camera.updateProjectionMatrix();
 controls.minDistance=dist*.25;controls.maxDistance=dist*3;controls.update();
 scene.getObjectByName('ground').position.y=b.min.y-.001;
}
