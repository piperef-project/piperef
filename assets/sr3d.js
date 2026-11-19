/* 3D view for instrument straight runs. Units: pipe inside diameter D = 1. Flow along +X, pipe centreline at y = YC. */
import * as THREE from './three/three.module.min.js';
import {OrbitControls} from './three/OrbitControls.js';
import {RoomEnvironment} from './three/RoomEnvironment.js';

const YC=3.4,RP=.54;                       /* centreline height, pipe outside radius (D=1 inside) */
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const mat=(c,m=.3,r=.55,x={})=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,...x});
const M={pipe:mat(0x9aa4ae,.7,.36),flange:mat(0x7d8894,.75,.34),bolt:mat(0x5b6570,.6,.4),inst:mat(0x2f6fb5,.3,.42),inst2:mat(0x24527f,.3,.45),
 grey:mat(0xd5dbe2,.2,.5),dark:mat(0x2b333c,.4,.5),ss:mat(0xe2e7ec,.95,.15),yellow:mat(0xe0b33a,.3,.45),green:mat(0x3f8f5a,.3,.5),
 red:mat(0xc2412a,.2,.5),glass:mat(0x9fc3e6,.1,.15,{transparent:true,opacity:.55}),plate:mat(0xc7cdd3,.9,.22)};
const AC=new THREE.MeshBasicMaterial({color:0x1849a9,depthTest:false,transparent:true});
const AC2=new THREE.MeshBasicMaterial({color:0xc2412a,depthTest:false,transparent:true});

let renderer=null,scene,camera,controls,root,stageEl=null,no3d=false,raf=0,ro=null,lastBox=null,focusBox=null;
const add=(g,m,o)=>{const x=new THREE.Mesh(g,m);x.castShadow=x.receiveShadow=true;o.add(x);return x;};
function cylX(o,r,len,m,x0,y=YC,z=0,seg=48,open=false){const g=new THREE.CylinderGeometry(r,r,len,seg,1,open);g.rotateZ(Math.PI/2);const c=add(g,m,o);c.position.set(x0+len/2,y,z);return c;}
function cylY(o,r,h,m,x,y0,z=0,seg=40){const c=add(new THREE.CylinderGeometry(r,r,h,seg),m,o);c.position.set(x,y0+h/2,z);return c;}
function cylZ(o,r,h,m,x,y,z0,seg=40){const g=new THREE.CylinderGeometry(r,r,h,seg);g.rotateX(Math.PI/2);const c=add(g,m,o);c.position.set(x,y,z0+h/2);return c;}
function coneX(o,r0,r1,len,m,x0,y=YC){const g=new THREE.CylinderGeometry(r1,r0,len,48);g.rotateZ(-Math.PI/2);const c=add(g,m,o);c.position.set(x0+len/2,y,0);return c;}
function box(o,w,h,d,m,x,y,z){const b=add(new THREE.BoxGeometry(w,h,d),m,o);b.position.set(x,y,z);return b;}
const pipe=(o,x0,x1,y=YC,z=0,r=RP)=>x1>x0+1e-4&&cylX(o,r,x1-x0,M.pipe,x0,y,z);
function tube(o,pts,r=RP,m=M.pipe,seg=64){const c=new THREE.CatmullRomCurve3(pts);return add(new THREE.TubeGeometry(c,seg,r,32,false),m,o);}
function arc(c,rad,a0,a1,plane='xy',n=24){const p=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n,ca=Math.cos(a)*rad,sa=Math.sin(a)*rad;
 p.push(plane==='xy'?V(c.x+ca,c.y+sa,c.z):plane==='zy'?V(c.x,c.y+sa,c.z+ca):V(c.x+ca,c.y,c.z+sa));}return p;}
/* flange pair (or single) at x, facing along X; ratio of flange OD to D ~ 1.8 */
function flange(o,x,dir=1,{r=.92,t=.16,hub=true,nb=8}={}){
 cylX(o,r,t,M.flange,dir>0?x:x-t);if(hub)coneX(o,dir>0?RP+.12:RP,dir>0?RP:RP+.12,.32,M.flange,dir>0?x+t:x-t-.32);
 for(let i=0;i<nb;i++){const a=(i+.5)/nb*Math.PI*2,y=YC+Math.cos(a)*r*.82,z=Math.sin(a)*r*.82;cylX(o,.045,t+.16,M.bolt,(dir>0?x:x-t)-.08,y,z,12);}}
function flangePair(o,x,opt={}){flange(o,x,-1,opt);flange(o,x+.03,1,opt);cylX(o,(opt.r||.92)*.62,.03,M.dark,x);}   /* gasket */
function valveBody(o,x,len=1.6,{wheel=true,col=M.inst2}={}){                     /* gate valve between flanges, x = inlet face */
 flange(o,x,1,{hub:false});flange(o,x+len,-1,{hub:false});cylX(o,.7,len-.32,col,x+.16);
 const xm=x+len/2;cylY(o,.42,.7,col,xm,YC+.55);cylY(o,.5,.12,col,xm,YC+1.2);cylY(o,.07,1.4,M.ss,xm,YC+1.3);
 if(wheel){const w=add(new THREE.TorusGeometry(.55,.05,10,40),M.red,o);w.rotation.x=Math.PI/2;w.position.set(xm,YC+2.55,0);
  for(let i=0;i<3;i++){const s=box(o,1.05,.05,.05,M.red,xm,YC+2.55,0);s.rotation.y=i*Math.PI/3;}}}
function ctrlValve(o,x,len=2){                                                     /* globe control valve with diaphragm actuator, x = inlet face */
 flange(o,x,1,{hub:false});flange(o,x+len,-1,{hub:false});cylX(o,.5,.35,M.inst2,x+.16);cylX(o,.5,.35,M.inst2,x+len-.51);
 const xm=x+len/2,g=add(new THREE.SphereGeometry(.78,40,28),M.inst2,o);g.position.set(xm,YC,0);
 cylY(o,.42,.5,M.inst2,xm,YC+.6);cylY(o,.55,.1,M.inst2,xm,YC+1.08);
 for(const s of[-1,1])box(o,.08,1.2,.08,M.dark,xm+s*.32,YC+1.78,0);cylY(o,.04,1.2,M.ss,xm,YC+1.18);
 cylY(o,.6,.1,M.dark,xm,YC+2.38);const d1=add(new THREE.CylinderGeometry(1.0,.62,.36,48),M.yellow,o);d1.position.set(xm,YC+2.66,0);
 const d2=add(new THREE.CylinderGeometry(.62,1.0,.36,48),M.yellow,o);d2.position.set(xm,YC+3.02,0);box(o,.4,.5,.3,M.grey,xm+.55,YC+1.8,.3);}
function pump(o,x){                                                                /* end-suction pump discharging into the run at x */
 const v=add(new THREE.CylinderGeometry(1.25,1.25,.9,48),M.green,o);v.rotation.x=Math.PI/2;v.position.set(x-1.7,YC-.6,0);
 cylX(o,RP+.08,1.1,M.green,x-1.1,YC);flange(o,x,-1,{hub:false});cylZ(o,.6,.9,M.green,x-1.7,YC-.6,-1.6);
 box(o,1.5,1.5,2.4,M.green,x-1.7,YC-.6,-3.05);box(o,4.2,.25,4.4,M.dark,x-1.7,YC-2.0,-1.6);}

/* ---------- upstream disturbance, ending at x = xs (start of straight run) */
function upstream(o,kind,xs,ratio){
 const B=1.5;           /* long-radius bend radius = 1.5D */
 if(kind==='b1'||kind==='tee0'){tube(o,arc(V(xs,YC+B,0),B,Math.PI,1.5*Math.PI));cylY(o,RP,3.2,M.pipe,xs-B,YC+B);return;}
 if(kind==='b45'){const c=V(xs,YC+B,0);tube(o,arc(c,B,1.25*Math.PI,1.5*Math.PI));const p=V(xs-B*Math.sin(Math.PI/4),YC+B-B*Math.cos(Math.PI/4),0),d=V(-1,1,0).normalize();
  tube(o,[p,p.clone().addScaledVector(d,1.5),p.clone().addScaledVector(d,3.5)]);return;}
 if(kind==='s1'||kind==='s2'||kind==='b2s'){const S=kind==='s1'?12:kind==='s2'?5:6;    /* S-configuration: two bends in the same plane */
  tube(o,arc(V(xs,YC+B,0),B,Math.PI,1.5*Math.PI));cylY(o,RP,S,M.pipe,xs-B,YC+B);
  tube(o,arc(V(xs-2*B,YC+B+S,0),B,0,.5*Math.PI));pipe(o,xs-2*B-3.5,xs-2*B,YC+2*B+S);
  dimV(o,xs-B-1.4,YC+B,YC+B+S,`S = ${S}D`);return;}
 if(kind==='p1'||kind==='p2'||kind==='b2p'){const S=kind==='p1'?8:kind==='p2'?2:4;     /* two bends in perpendicular planes */
  tube(o,arc(V(xs,YC+B,0),B,Math.PI,1.5*Math.PI));cylY(o,RP,S,M.pipe,xs-B,YC+B);
  const top=YC+B+S;tube(o,arc(V(xs-B,top,-B),B,0,.5*Math.PI,'zy'));
  const g=new THREE.CylinderGeometry(RP,RP,3.5,40);g.rotateX(Math.PI/2);const m=add(g,M.pipe,o);m.position.set(xs-B,top+B,-B-1.75);
  dimV(o,xs-B-1.4,YC+B,top,`S = ${S}D`);return;}
 if(kind==='tee'){const g=new THREE.CylinderGeometry(RP+.04,RP+.04,4,40);g.rotateX(Math.PI/2);const m=add(g,M.pipe,o);m.position.set(xs-RP,YC,0);
  const s=add(new THREE.SphereGeometry(RP+.08,30,20),M.pipe,o);s.position.set(xs-RP,YC,0);return;}
 if(kind==='red'){const r=RP*(ratio||2);coneX(o,r,RP,2,M.pipe,xs-2);pipe(o,xs-6,xs-2,YC,0,r);return;}
 if(kind==='exp'){const r=RP*(ratio||.5);coneX(o,r,RP,1.5,M.pipe,xs-1.5);pipe(o,xs-5,xs-1.5,YC,0,r);return;}
 if(kind==='abr'){const r=RP*2;cylX(o,r,.06,M.pipe,xs-.06);pipe(o,xs-4,xs-.06,YC,0,r);return;}
 if(kind==='vlv'){valveBody(o,xs-1.6,1.6);pipe(o,xs-4.5,xs-1.6-.48);return;}
 if(kind==='cv'){ctrlValve(o,xs-2,2);pipe(o,xs-4.6,xs-2-.48);return;}
 if(kind==='pump'){pump(o,xs);return;}
 if(kind==='tw'){pipe(o,xs-3,xs);cylY(o,.1,.9,M.ss,xs,YC-.2);cylY(o,.2,.3,M.ss,xs,YC+RP);cylY(o,.28,.35,M.dark,xs,YC+RP+.55);return;}
 pipe(o,xs-3,xs);}

/* ---------- instruments: build from x = 0, return length along the pipe */
const INST={
 orifice(o,p){const t=.16;flange(o,0,-1,{nb:8});flange(o,.05,1,{nb:8});
  cylX(o,.66,.05,M.plate,0);box(o,.05,1.0,.45,M.plate,.025,YC+.66+.5,0);                 /* plate and handle (tab) */
  for(const x of[-.08,.13]){const c=cylZ(o,.06,.6,M.ss,x,YC,.9);const v=box(o,.18,.18,.24,M.ss,x,YC,1.6);cylY(o,.03,.25,M.red,x,YC+.09,1.6);}
  return .05;},
 venturi(o,p){const b=Math.max(.3,Math.min(.75,p.beta||.6)),rt=RP*b+.04,c=(RP-rt)/Math.tan(10.5*Math.PI/180),d=(RP-rt)/Math.tan(7.5*Math.PI/180);
  flange(o,0,1,{hub:false});cylX(o,RP+.03,1,M.inst,0);coneX(o,RP+.03,rt,c,M.inst,1);cylX(o,rt,b,M.inst,1+c);coneX(o,rt,RP+.03,d,M.inst,1+c+b);
  const L=1+c+b+d;flange(o,L,-1,{hub:false});
  for(const x of[.5,1+c+b/2]){const r=x<1?RP+.1:rt+.08;add(new THREE.TorusGeometry(r,.05,10,40),M.ss,o).rotation.y=Math.PI/2;o.children[o.children.length-1].position.set(x,YC,0);
   cylY(o,.05,(x<1?.8:1.1),M.ss,x,YC+r-.05);}
  return L;},
 mag(o){const L=1.6;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});
  box(o,L-.36,1.35,1.25,M.inst,L/2,YC,0);cylX(o,.62,L-.36,M.inst,.18);cylY(o,.12,.35,M.grey,L/2,YC+.67);
  box(o,.75,.6,.6,M.grey,L/2,YC+1.3,0);const d=cylZ(o,.22,.05,M.glass,L/2,YC+1.3,.3);return L;},
 vortex(o){const L=1.0;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});cylX(o,.66,L-.32,M.ss,.16);
  cylY(o,.16,1.25,M.ss,L/2,YC+.6);const h=cylX(o,.38,.8,M.inst,L/2-.4,YC+2.05);cylZ(o,.33,.06,M.glass,L/2,YC+2.05,.38);return L;},
 turbine(o){const L=2.0;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});cylX(o,.64,L-.32,M.ss,.16);
  cylY(o,.1,.5,M.ss,L/2,YC+.6);box(o,.5,.4,.4,M.inst,L/2,YC+1.25,0);return L;},
 usclamp(o){const L=1.6;for(const x of[.15,L-.15]){const b=add(new THREE.TorusGeometry(RP+.02,.035,8,48),M.ss,o);b.rotation.y=Math.PI/2;b.position.set(x,YC,0);}
  box(o,1.6,.32,.32,M.dark,L/2,YC,RP+.16);for(const x of[.35,L-.35])box(o,.42,.38,.36,M.inst,x,YC,RP+.22);
  cylZ(o,.03,1.2,M.dark,.35,YC,RP+.4);return L;},
 usinline(o){const L=3.0;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});cylX(o,.68,L-.32,M.ss,.16);
  for(const [x,y,z] of[[1,.55,.55],[2,-.55,.55],[1,.55,-.55],[2,-.55,-.55]]){const c=add(new THREE.CylinderGeometry(.11,.11,.5,20),M.inst,o);
   c.position.set(x,YC+y*.95,z*.95);c.lookAt(x+(x<1.5?1:-1),YC,0);c.rotateX(Math.PI/2);}
  box(o,.7,.55,.4,M.inst,L/2,YC+1.25,0);cylY(o,.06,.6,M.dark,L/2,YC+.6);return L;},
 thermal(o){const L=.4;pipe(o,0,L);cylY(o,.22,.35,M.ss,L/2,YC+RP-.05);cylY(o,.3,.12,M.ss,L/2,YC+RP+.3);cylY(o,.05,1.0,M.ss,L/2,YC-.4);
  cylY(o,.06,.7,M.ss,L/2,YC+RP+.42);const h=cylX(o,.35,.75,M.inst,L/2-.37,YC+RP+1.45);cylZ(o,.3,.05,M.glass,L/2,YC+RP+1.45,.36);return L;},
 pitot(o){const L=.4;pipe(o,0,L);box(o,.12,1.0,.16,M.ss,L/2,YC,0);cylY(o,.24,.3,M.ss,L/2,YC+RP-.05);cylY(o,.36,.1,M.ss,L/2,YC+RP+.25);
  box(o,.5,.35,.7,M.ss,L/2,YC+RP+.6,0);for(const z of[-.25,0,.25])cylY(o,.05,.25,M.red,L/2,YC+RP+.78,z);box(o,.55,.45,.45,M.inst,L/2,YC+RP+1.2,0);return L;},
 coriolis(o){const L=3.0;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});cylX(o,RP+.12,L-.32,M.ss,.16);
  const sh=new THREE.Shape();sh.moveTo(-.7,0);sh.lineTo(.7,0);sh.lineTo(1.1,-2.3);sh.quadraticCurveTo(0,-2.9,-1.1,-2.3);sh.closePath();
  const g=new THREE.ExtrudeGeometry(sh,{depth:.6,bevelEnabled:true,bevelSize:.06,bevelThickness:.06,curveSegments:20});g.translate(0,0,-.3);const m=add(g,M.ss,o);m.position.set(L/2,YC-RP+.05,0);
  cylY(o,.12,.4,M.ss,L/2,YC+RP);box(o,.8,.55,.55,M.inst,L/2,YC+RP+.65,0);return L;},
 pd(o){const L=2.0;flange(o,0,1,{hub:false});flange(o,L,-1,{hub:false});box(o,L-.36,1.6,1.4,M.inst,L/2,YC,0);
  cylY(o,.35,.3,M.grey,L/2,YC+.8);box(o,.7,.35,.5,M.grey,L/2,YC+1.25,0);return L;},
 ro(o){flange(o,0,-1,{nb:8});flange(o,.05,1,{nb:8});cylX(o,.66,.05,M.red,0);box(o,.05,.9,.4,M.red,.025,YC+.66+.45,0);
  return .05;},
 cv(o){ctrlValve(o,0,2);return 2;}};

/* ---------- dimension lines and labels */
function label(text,sub,col='#1849A9'){const c=document.createElement('canvas'),g=c.getContext('2d'),f=56,fs=40;g.font=`700 ${f}px Geist,system-ui,sans-serif`;
 const w=Math.max(g.measureText(text).width,sub?(g.font=`500 ${fs}px Geist,system-ui,sans-serif`,g.measureText(sub).width):0)+60,h=sub?f+fs+44:f+36;c.width=w;c.height=h;
 g.fillStyle='rgba(255,255,255,.94)';g.strokeStyle=col;g.lineWidth=4;const r=18;g.beginPath();if(g.roundRect)g.roundRect(2,2,w-4,h-4,r);else g.rect(2,2,w-4,h-4);g.fill();g.stroke();
 g.fillStyle=col;g.font=`700 ${f}px Geist,system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';g.fillText(text,w/2,16);
 if(sub){g.fillStyle='#3B4A5E';g.font=`500 ${fs}px Geist,system-ui,sans-serif`;g.fillText(sub,w/2,f+24);}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true}));
 s.renderOrder=20;s.userData={w,h};return s;}
function dimX(o,x0,x1,y,text,sub,m=AC){if(x1-x0<.05)return;const L=x1-x0,g=new THREE.CylinderGeometry(.035,.035,L,8);g.rotateZ(Math.PI/2);const l=new THREE.Mesh(g,m);l.position.set(x0+L/2,y,0);l.renderOrder=15;o.add(l);
 for(const [x,d] of[[x0,1],[x1,-1]]){const cn=new THREE.Mesh(new THREE.ConeGeometry(.12,.38,16),m);cn.rotation.z=d>0?Math.PI/2:-Math.PI/2;cn.position.set(x+d*.19,y,0);cn.renderOrder=15;o.add(cn);
  const t=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,y-YC,6),m);t.position.set(x,(y+YC)/2,0);t.renderOrder=15;o.add(t);}
 const s=label(text,sub,m===AC?'#1849A9':'#C2412A');o.add(s);s.position.set(x0+L/2,y+.75,0);s.userData.k=1;}
function dimV(o,x,y0,y1,text){const g=new THREE.CylinderGeometry(.03,.03,y1-y0,8),l=new THREE.Mesh(g,AC);l.position.set(x,(y0+y1)/2,0);l.renderOrder=15;o.add(l);
 const s=label(text);o.add(s);s.position.set(x-.9,(y0+y1)/2,0);s.userData.k=.7;}

/* ---------- scene */
function init(){
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){no3d=true;return false;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(30,1,.1,800);
 const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new RoomEnvironment(),.04).texture;
 const key=new THREE.DirectionalLight(0xffffff,1.6);key.position.set(10,30,18);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.bias=-.0005;key.shadow.radius=4;
 scene.add(key,key.target,new THREE.HemisphereLight(0xffffff,0x7d8b9a,.5));scene.userData.key=key;
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.ShadowMaterial({opacity:.13}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;scene.add(gr);
 controls=new OrbitControls(camera,renderer.domElement);Object.assign(controls,{enableDamping:true,dampingFactor:.08,maxPolarAngle:Math.PI*.49,screenSpacePanning:true});
 const loop=()=>{raf=requestAnimationFrame(loop);if(!stageEl||!stageEl.isConnected)return;controls.update();scaleLabels();renderer.render(scene,camera);};loop();
 return true;}
function scaleLabels(){if(!root)return;const h=renderer.domElement.clientHeight||400,f=Math.min(1,(renderer.domElement.clientWidth||700)/700)*.85+.15;root.traverse(s=>{if(!s.isSprite)return;
 const d=camera.position.distanceTo(s.position),px=s.userData.h*.24*f*(s.userData.k||1),hh=px/h*2*d*Math.tan(camera.fov*Math.PI/360);s.scale.set(hh*s.userData.w/s.userData.h,hh,1);});}
function resize(){if(!renderer||!stageEl)return;const w=stageEl.clientWidth,h=stageEl.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
function frame(b,dir=V(.16,.3,1)){const c=b.getCenter(V()),sz=b.getSize(V()),dv=dir.clone().normalize();
 const vf=camera.fov*Math.PI/360,hf=Math.atan(Math.tan(vf)*camera.aspect);
 const w=Math.hypot(sz.x*Math.abs(dv.z),sz.z*Math.abs(dv.x))+1.5,h=sz.y+Math.abs(dv.y)*Math.max(sz.x,sz.z)*.35+1.5;
 const d=Math.max(w/2/Math.tan(hf),h/2/Math.tan(vf))*1.08+Math.max(sz.z,2)/2;
 camera.position.copy(c).addScaledVector(dv,d);camera.near=Math.max(d/200,.05);camera.far=d*20;camera.updateProjectionMatrix();controls.target.copy(c);controls.update();}
export function mount(el){stageEl=el;if(no3d)return false;if(!renderer&&!init())return false;el.prepend(renderer.domElement);
 if(ro)ro.disconnect();ro=new ResizeObserver(resize);ro.observe(el);resize();return true;}
export function update(p){if(!renderer)return;
 if(root){scene.remove(root);root.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material&&m.material.map)m.material.map.dispose();});}
 root=new THREE.Group();scene.add(root);const parts=new THREE.Group(),dims=new THREE.Group();root.add(parts,dims);
 const up=Math.max(p.up||0,0),dn=Math.max(p.dn||0,0),xs=-up;
 upstream(parts,p.fit,xs,p.ratio);pipe(parts,xs,0);
 const L=(INST[p.t]||INST.orifice)(parts,p);
 pipe(parts,L,L+dn);
 /* downstream fitting: 90° LR elbow turning down */
 const xe=L+dn;tube(parts,arc(V(xe,YC-1.5,0),1.5,.5*Math.PI,0));cylY(parts,RP,YC-1.5,M.pipe,xe+1.5,0);
 /* supports (simple stands) every ~10D */
 const sp=[],stp=Math.max(5,(xe-xs)/7);for(let x=xs+2.5;x<xe-1.5;x+=stp)if(x<-1.2||x>L+1.2)sp.push(x);
 for(const x of sp){box(parts,.5,YC-RP,.5,M.dark,x,(YC-RP)/2,0);box(parts,.9,.08,.9,M.dark,x,YC-RP+.04,0);}
 const yd=YC+RP+(p.t==='cv'?3.6:p.t==='vortex'||p.t==='thermal'||p.t==='pitot'||p.t==='usinline'||p.t==='mag'?2.6:1.7);
 if(up>0)dimX(dims,xs,0,yd,`Upstream ${p.up}D`,p.upmm);
 if(dn>0)dimX(dims,L,L+dn,yd,`Downstream ${p.dn}D`,p.dnmm);
 if(!up&&!dn){const s=label('No straight run needed');dims.add(s);s.position.set(L/2,yd,0);}
 const bx=new THREE.Box3().setFromObject(parts);bx.expandByPoint(V(bx.min.x,yd+1.6,0));bx.min.x-=2.5;bx.max.x+=2.5;lastBox=bx;
 const fb=new THREE.Box3(V(-3,0,-2),V(L+3,YC+4,2));focusBox=fb;
 const key=scene.userData.key,c=bx.getCenter(V()),s=bx.getSize(V()),e=Math.max(s.x,s.z)*.6+4;
 Object.assign(key.shadow.camera,{left:-e,right:e,top:e,bottom:-e,near:1,far:200});key.shadow.camera.updateProjectionMatrix();key.position.set(c.x+10,30,18);key.target.position.copy(c);
 frame(bx);}
export function view(which){if(!renderer)return;if(which==='inst'&&focusBox)frame(focusBox,V(.75,.45,1));else if(lastBox)frame(lastBox);}
