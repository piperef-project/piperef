/* Home page hero: a realistic weld neck flange (ASME B16.5 dimensions) rendered with three.js.
   Machined raised face with spiral serrations, chamfers, hub fillet, bolt holes, butt weld to a pipe stub, and the forging mark on the rim.
   Falls back to the built-in canvas drawing if WebGL is not available. */
import * as THREE from './three/three.module.min.js';
import {OrbitControls} from './three/OrbitControls.js';
import {RoomEnvironment} from './three/RoomEnvironment.js';

let R=null; /* renderer state, kept across re-renders of the home panel */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

function canvasTex(w,h,draw,srgb=false){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);
 const t=new THREE.CanvasTexture(c);if(srgb)t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}

/* concentric (phonographic) serration on the gasket face: bump map in planar ring UVs */
function serration(rIn,rOut){return canvasTex(1024,1024,(g,w)=>{g.fillStyle='#808080';g.fillRect(0,0,w,w);const c=w/2,k=c/rOut,pitch=0.8*k; /* ~0.8 mm pitch, drawn coarser for visibility */
 for(let r=rIn*k;r<c;r+=Math.max(2.2,pitch*2.2)){g.beginPath();g.arc(c,c,r,0,Math.PI*2);g.lineWidth=1.1;g.strokeStyle='#ffffff';g.stroke();g.beginPath();g.arc(c,c,r+0.9,0,Math.PI*2);g.lineWidth=0.9;g.strokeStyle='#3a3a3a';g.stroke();}});}
/* fine turning marks for the back face and hub */
function turning(){return canvasTex(512,512,(g,w)=>{g.fillStyle='#808080';g.fillRect(0,0,w,w);for(let y=0;y<w;y+=2){g.fillStyle=`rgba(${Math.random()>.5?255:0},${Math.random()>.5?255:0},${Math.random()>.5?255:0},.05)`;g.fillRect(0,y,w,1);}
 for(let i=0;i<2500;i++){g.fillStyle=`rgba(0,0,0,${Math.random()*.08})`;g.fillRect(Math.random()*w,Math.random()*w,1.5,1.5);}});}
/* forging mark on the flange rim */
function marking(txt,circ,h){const W=2048,H=Math.max(64,Math.round(W*h/circ));return canvasTex(W,H,(g,w,hh)=>{g.clearRect(0,0,w,hh);
 g.font=`700 ${Math.round(hh*.42)}px "Arial Narrow",Arial,sans-serif`;g.textBaseline='middle';g.fillStyle='rgba(40,44,50,.75)';
 const tw=g.measureText(txt).width;g.save();g.translate(w*.08,hh/2);g.scale(Math.min(1,(w*.5)/tw),1);g.fillText(txt,0,0);g.restore();},false);}

function build(cls,n){
 const f=flRow(cls,n),p=PIPEMAP[n];if(!f||!p)return null;
 const t=(p[2].STD??p[2]['40']??p[2].XS??Object.values(p[2])[0])*25.4,OD=p[1]*25.4,ro=OD/2,ri=ro-t;
 const O=f.O*25.4,tf=f.tf*25.4,Rr=f.R*25.4/2,X=f.X*25.4/2,Y=f.Y*25.4,hi=+cls>=400,rf=hi?6.4:1.6,zb=hi?rf+tf:tf,zy=hi?rf+Y:Y,BC=f.BC*25.4/2,hr=(f.dv*25.4+3.2)/2;
 const ch=Math.min(2,(zb-rf)*.12),fil=Math.min(8,Math.max(3,(X-ro)*.35));
 const G=new THREE.Group();
 const steel=new THREE.MeshPhysicalMaterial({color:0xa8b0b8,metalness:1,roughness:.38,clearcoat:.15,clearcoatRoughness:.5,bumpMap:turning(),bumpScale:.6,side:THREE.DoubleSide});
 const face=new THREE.MeshPhysicalMaterial({color:0xc3c9cf,metalness:1,roughness:.24,bumpMap:serration(ri,Rr),bumpScale:2.2,side:THREE.DoubleSide});
 const pipeM=new THREE.MeshPhysicalMaterial({color:0x7c848c,metalness:.85,roughness:.55,bumpMap:turning(),bumpScale:.8,side:THREE.DoubleSide});
 const weldM=new THREE.MeshPhysicalMaterial({color:0x6c6f72,metalness:.8,roughness:.6,side:THREE.DoubleSide});
 const lathe=(pts,mat,seg=128)=>{const g=new THREE.LatheGeometry(pts.map(([r,z])=>new THREE.Vector2(r,z)),seg);const m=new THREE.Mesh(g,mat);m.castShadow=m.receiveShadow=true;G.add(m);return m;};
 /* raised face: serrated annulus + its edge */
 const rfG=new THREE.RingGeometry(ri,Rr,160,8);rfG.rotateX(Math.PI/2);const rfM=new THREE.Mesh(rfG,face);rfM.castShadow=true;G.add(rfM); /* at y=0, facing -y */
 lathe([[Rr,0],[Rr,rf]],face);
 /* flange disc with bolt holes and chamfered edges */
 const sh=new THREE.Shape();sh.absarc(0,0,O/2-ch,0,Math.PI*2,false);
 const bore=new THREE.Path();bore.absarc(0,0,ri,0,Math.PI*2,true);sh.holes.push(bore);
 for(let i=0;i<f.n;i++){const a=(i+.5)/f.n*Math.PI*2,h=new THREE.Path();h.absarc(BC*Math.cos(a),BC*Math.sin(a),hr,0,Math.PI*2,true);sh.holes.push(h);}
 const dg=new THREE.ExtrudeGeometry(sh,{depth:zb-rf-2*ch,bevelEnabled:true,bevelThickness:ch,bevelSize:ch,bevelSegments:2,curveSegments:96});
 dg.rotateX(-Math.PI/2);dg.translate(0,rf+ch,0); /* extrude along +y from rf to zb */
 const disc=new THREE.Mesh(dg,steel);disc.castShadow=disc.receiveShadow=true;G.add(disc);
 /* hub with fillet, tapering to the pipe OD, with the weld bevel */
 const hub=[[ri,zb],[X+fil,zb]];for(let k=1;k<=8;k++){const q=k/8*Math.PI/2;hub.push([X+fil-fil*Math.sin(q),zb+fil-fil*Math.cos(q)]);}
 hub.push([ro+.3,zy-1.5],[ro,zy],[ri,zy]);lathe(hub,steel);
 /* butt weld and pipe stub */
 const L=Math.max(OD*.85,70),wc=Math.max(2.2,t*.55);
 lathe([[ro,zy-.4],[ro+wc*.55,zy+wc*.25],[ro+wc*.7,zy+wc*.9],[ro+wc*.55,zy+wc*1.6],[ro,zy+wc*2]],weldM,96);
 lathe([[ri,zy],[ro,zy],[ro,zy+L],[ri,zy+L],[ri,zy]],pipeM);
 /* forging mark on the rim */
 const hgt=zb-rf-2*ch;
 if(hgt>6){const circ=2*Math.PI*(O/2);const mk=new THREE.Mesh(new THREE.CylinderGeometry(O/2+.15,O/2+.15,hgt*.8,160,1,true),
  new THREE.MeshStandardMaterial({map:marking(`A105N   ${n}" CL${cls} WN RF   SCH STD   B16.5   HT 24A117`,circ,hgt*.8),transparent:true,metalness:.6,roughness:.6,depthWrite:false}));
  mk.position.y=rf+ch+hgt/2;mk.rotation.y=Math.PI*.55;G.add(mk);}
 /* orient: axis along x, face towards the viewer-left */
 G.rotation.z=Math.PI/2;
 const outer=new THREE.Group();outer.add(G);
 const box=new THREE.Box3().setFromObject(outer),c=box.getCenter(new THREE.Vector3());outer.position.sub(c);
 const wrap=new THREE.Group();wrap.add(outer);wrap.userData.size=box.getSize(new THREE.Vector3()).length();
 return wrap;}

function init(){
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const scene=new THREE.Scene();const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new RoomEnvironment(),.04).texture;
 const cam=new THREE.PerspectiveCamera(32,1,1,10000);
 const key=new THREE.DirectionalLight(0xffffff,1.6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.radius=6;scene.add(key);
 scene.add(new THREE.HemisphereLight(0xdfe8f5,0x30343a,.35));
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.ShadowMaterial({opacity:.16}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
 const ctl=new OrbitControls(cam,renderer.domElement);ctl.enableDamping=true;ctl.dampingFactor=.08;ctl.enablePan=false;ctl.enableZoom=false;ctl.autoRotate=!reduce;ctl.autoRotateSpeed=.9;ctl.minPolarAngle=.35;ctl.maxPolarAngle=1.45;
 renderer.domElement.className='h3d';renderer.domElement.setAttribute('aria-hidden','true');
 let vis=true,obj=null,keyStr='',stage=null,raf=0,idle=0;
 const fit=()=>{if(!stage)return;const w=stage.clientWidth,h=stage.clientHeight||360;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();};
 const ro=new ResizeObserver(fit);
 const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)loop();});
 const loop=()=>{cancelAnimationFrame(raf);if(!vis||document.hidden||!stage||!stage.isConnected)return;ctl.update();renderer.render(scene,cam);raf=requestAnimationFrame(loop);};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)loop();});
 ctl.addEventListener('start',()=>{ctl.autoRotate=false;clearTimeout(idle);});
 ctl.addEventListener('end',()=>{clearTimeout(idle);if(!reduce)idle=setTimeout(()=>ctl.autoRotate=true,4000);});
 R={renderer,scene,cam,ctl,ground,key,
  mount(st,cls,n){
   if(stage!==st){if(stage){ro.unobserve(stage);io.unobserve(stage);}stage=st;st.appendChild(renderer.domElement);st.classList.add('h3d-on');ro.observe(st);io.observe(st);fit();}
   const k=cls+'|'+n;if(k!==keyStr){keyStr=k;if(obj){scene.remove(obj);obj.traverse(o=>{if(o.geometry)o.geometry.dispose();});}
    obj=build(cls,n);if(!obj)return;scene.add(obj);const s=obj.userData.size;
    cam.position.set(s*.92,s*.42,s*1.08);ctl.target.set(0,0,0);cam.near=s/50;cam.far=s*20;cam.updateProjectionMatrix();
    const b=new THREE.Box3().setFromObject(obj);ground.position.y=b.min.y-.5;ground.scale.set(s*4,s*4,1);
    key.position.set(s*.6,s*1.6,s*.9);key.shadow.camera.left=key.shadow.camera.bottom=-s;key.shadow.camera.right=key.shadow.camera.top=s;key.shadow.camera.far=s*5;key.shadow.camera.updateProjectionMatrix();ctl.update();}
   loop();}};
 return R;}

export function mount(stage,cls,n){
 try{if(!R)init();R.mount(stage,cls,n);return true;}catch(e){console.error(e);return false;}}
