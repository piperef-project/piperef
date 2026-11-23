/* Flange joint assembly: section of two B16.5 weld neck RF flanges with gasket and stud, bolt length build-up,
   flange gap, target torque and the PCC-1 legacy tightening sequence. Globals from app.js: U, SEL, setSel, store, seg, bindSeg, tbl, DN, flRow, odmm, CLASSES, N20. */
(function(){
const P=document.getElementById('p-fj');if(!P)return;
if(!document.getElementById('fj-css')){const st=document.createElement('style');st.id='fj-css';st.textContent=`
#p-fj .fj-ctrl{display:flex;flex-wrap:wrap;gap:14px 18px;margin:16px 0 14px;align-items:flex-end}
#p-fj .fj-ctrl label{display:flex;flex-direction:column;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
#p-fj .fj-ctrl select,#p-fj .fj-ctrl input{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);min-width:110px}
#p-fj .fj-ctrl input{width:90px;min-width:0}
#p-fj .fj-box{border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet)}
#p-fj .fj-views{display:grid;grid-template-columns:1.55fr 1fr;background:#F7F9FC;background-image:linear-gradient(rgba(24,73,169,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,73,169,.05) 1px,transparent 1px);background-size:20px 20px}
#p-fj .fj-views figure{margin:0;padding:12px 14px 8px;min-width:0}
#p-fj .fj-views figure+figure{border-left:1px dashed #C9D3DF}
#p-fj .fj-views figcaption{font-size:12.5px;font-weight:600;color:#3A4A5E;margin:0 0 4px 4px}
#p-fj .fj-views svg{display:block;width:100%;height:auto}
#p-fj .fj-sum{display:flex;flex-wrap:wrap;gap:6px 22px;padding:12px 18px;border-top:1px solid var(--rule);font-size:14px}
#p-fj .fj-sum b{font-variant-numeric:tabular-nums}
#p-fj .fj-card{min-width:0}#p-fj .fj-out{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;margin-top:18px}
#p-fj .fj-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px}
#p-fj .fj-card h3{font-size:16px;margin:0 0 8px}
#p-fj .fj-card p,#p-fj .fj-card li{font-size:13.5px;line-height:1.55;color:var(--ink-2)}
#p-fj .fj-card ol,#p-fj .fj-card ul{padding-left:18px;margin:6px 0 0}#p-fj .fj-card li+li{margin-top:4px}
#p-fj .fj-seq{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0 4px}
#p-fj .fj-seq span{min-width:28px;height:26px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;background:rgba(24,73,169,.09);color:#1849A9;font-weight:650;font-size:13px;font-variant-numeric:tabular-nums}
#p-fj .fj-seq span.g{margin-left:8px}
#p-fj .fj-t{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:4px}#p-fj .fj-t th{font-size:12px;color:var(--muted);font-weight:600;text-align:right;padding:4px 6px;border-bottom:1px solid var(--rule)}#p-fj .fj-t th:first-child,#p-fj .fj-t th:nth-child(2){text-align:left}#p-fj .fj-t td,#p-fj .fj-t th{white-space:normal}#p-fj .fj-t td{padding:6px;border-bottom:1px solid var(--rule);text-align:right;font-variant-numeric:tabular-nums;vertical-align:top}#p-fj .fj-t td:first-child{text-align:left}
#p-fj .fj-dl{height:34px;padding:0 14px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13px;font-weight:600;cursor:pointer}#p-fj .fj-dl:hover{border-color:var(--accent);color:var(--accent)}
#p-fj .fj-big{font-size:26px;font-weight:650;font-variant-numeric:tabular-nums}
#p-fj .fj-warn{font-size:12.5px;color:#9A6A08;margin:8px 0 0}
#p-fj .fj-refs a{color:var(--ink-2)}
[data-theme=dark] #p-fj .fj-seq span{color:#9DB8F6;background:rgba(157,184,246,.12)}
@media (max-width:900px){#p-fj .fj-views{grid-template-columns:1fr}#p-fj .fj-views figure+figure{border-left:0;border-top:1px dashed #C9D3DF}#p-fj .fj-out{grid-template-columns:1fr}}
.fjs .st{fill:#E6EBF2;stroke:#2B3A4E;stroke-width:1.3}.fjs .cut{fill:url(#fjH);stroke:#2B3A4E;stroke-width:1.3}
.fjs .gk{fill:#F2B544;stroke:#7A5300;stroke-width:1}.fjs .bolt{fill:#C7CED8;stroke:#2B3A4E;stroke-width:1.1}.fjs .nut{fill:#9AA6B6;stroke:#2B3A4E;stroke-width:1.1}
.fjs .cl{stroke:#8A97A8;stroke-width:.8;stroke-dasharray:10 3 2 3;fill:none}.fjs .dm{stroke:#1849A9;stroke-width:1;fill:none}.fjs .ex{stroke:#1849A9;stroke-width:.6;stroke-dasharray:3 2;fill:none}
.fjs text{font-family:Geist,system-ui,sans-serif;font-size:12px;fill:#2B3A4E}.fjs .dt{fill:#1849A9;font-weight:650;font-size:12.5px}.fjs .lb{font-size:11px;fill:#5B6B80}
.fjs .hole{fill:#fff;stroke:#2B3A4E;stroke-width:1.1}.fjs .hn{font-size:11px;font-weight:700;fill:#1849A9}.fjs .first{fill:#1849A9}.fjs .first+text{fill:#fff}
.fjs .face{fill:#E6EBF2;stroke:#2B3A4E;stroke-width:1.3}.fjs .rf{fill:#D3DAE4;stroke:#2B3A4E;stroke-width:1}.fjs .bore{fill:#fff;stroke:#2B3A4E;stroke-width:1.1}
.fjs .xline{stroke:#1849A9;stroke-width:1.1;fill:none;opacity:.55}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ data */
const NUM=n=>String(n).split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const GK={sw:{n:'Spiral wound, B16.20 (4.5 mm)',t:4.5,c:3.3,std:'ASME B16.20'},km:{n:'Kammprofile, B16.20 (4 mm)',t:4.0,c:3.3,std:'ASME B16.20 (grooved metal with facings)'},s16:{n:'Sheet, B16.21 (1.6 mm)',t:1.6,c:1.5,std:'ASME B16.21'},s30:{n:'Sheet, B16.21 (3.0 mm)',t:3.0,c:2.8,std:'ASME B16.21'},rj:{n:'Ring joint (R), B16.20',ring:1,std:'ASME B16.20 ring joint'}};
/* ASME B16.5 ring joint: ring number by class and NPS; groove pitch dia P, depth E, width F (mm); approx. distance between flanges X (mm) */
const RJ300={'1/2':11,'3/4':13,'1':16,'1-1/4':18,'1-1/2':20,'2':23,'2-1/2':26,'3':31,'3-1/2':34,'4':37,'5':41,'6':45,'8':49,'10':53,'12':57,'14':61,'16':65,'18':69,'20':73,'24':77};
const RJ1500={'1/2':12,'3/4':14,'1':16,'1-1/4':18,'1-1/2':20,'2':24,'2-1/2':27,'3':35,'4':39,'5':44,'6':46,'8':50,'10':54,'12':58,'14':63,'16':67,'18':71,'20':75,'24':79};
const RJN={150:{'1':15,'1-1/4':17,'1-1/2':19,'2':22,'2-1/2':25,'3':29,'3-1/2':33,'4':36,'5':40,'6':43,'8':48,'10':52,'12':56,'14':59,'16':64,'18':68,'20':72,'24':76},300:RJ300,400:RJ300,600:RJ300,
 900:Object.assign({},...['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2'].map(k=>({[k]:RJ1500[k]})),{'3':31,'4':37,'5':41,'6':45,'8':49,'10':53,'12':57,'14':62,'16':66,'18':70,'20':74,'24':78}),1500:RJ1500,
 2500:{'1/2':13,'3/4':16,'1':18,'1-1/4':21,'1-1/2':23,'2':26,'2-1/2':28,'3':32,'4':38,'5':42,'6':47,'8':51,'10':55,'12':60}};
const RING={11:[34.14,5.54,7.14],12:[39.67,6.35,8.74],13:[42.88,6.35,8.74],14:[44.45,6.35,8.74],15:[47.63,6.35,8.74],16:[50.8,6.35,8.74],17:[57.15,6.35,8.74],18:[60.33,6.35,8.74],19:[65.07,6.35,8.74],20:[68.27,6.35,8.74],21:[72.23,7.92,11.91],22:[82.55,6.35,8.74],23:[82.55,7.92,11.91],24:[95.25,7.92,11.91],25:[101.6,6.35,8.74],26:[101.6,7.92,11.91],27:[107.95,7.92,11.91],28:[111.13,9.53,13.49],29:[114.3,6.35,8.74],30:[117.48,7.92,11.91],31:[123.83,7.92,11.91],32:[127,9.53,13.49],33:[131.78,6.35,8.74],34:[131.78,7.92,11.91],35:[136.53,7.92,11.91],36:[149.23,6.35,8.74],37:[149.23,7.92,11.91],38:[157.18,11.13,16.66],39:[161.93,7.92,11.91],40:[171.45,6.35,8.74],41:[180.98,7.92,11.91],42:[190.5,12.7,19.84],43:[193.68,6.35,8.74],44:[193.68,7.92,11.91],45:[211.12,7.92,11.91],46:[211.14,9.53,13.49],47:[228.6,12.7,19.84],48:[247.65,6.35,8.74],49:[269.88,7.92,11.91],50:[269.88,11.13,16.66],51:[279.4,14.27,23.01],52:[304.8,6.35,8.74],53:[323.85,7.92,11.91],54:[323.85,11.13,16.66],55:[342.9,17.48,30.18],56:[381,6.35,8.74],57:[381,7.92,11.91],58:[381,14.27,23.01],59:[396.88,6.35,8.74],60:[406.4,17.48,33.32],61:[419.1,7.92,11.91],62:[419.1,11.13,16.66],63:[419.1,15.88,26.97],64:[454.03,6.35,8.74],65:[469.9,7.92,11.91],66:[469.9,11.13,16.66],67:[469.9,17.48,30.18],68:[517.53,6.35,8.74],69:[533.4,7.92,11.91],70:[533.4,12.7,19.84],71:[533.4,17.48,30.18],72:[558.8,6.35,8.74],73:[584.2,9.53,13.49],74:[584.2,12.7,19.84],75:[584.2,17.48,33.32],76:[673.1,6.35,8.74],77:[692.15,11.13,16.66],78:[692.15,15.88,26.97],79:[692.15,20.62,36.53]};
const NPSL=['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','3-1/2','4','5','6','8','10','12','14','16','18','20','24'];
const XT={150:[0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3],300:[3,4,4,4,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],400:[3,4,4,4,4,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6],600:[3,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6],900:[4,4,4,4,4,3,3,4,0,4,4,4,4,4,4,4,4,5,5,6],1500:[4,4,4,4,4,3,3,3,0,3,3,3,4,4,5,6,8,8,10,11],2500:[4,4,4,3,3,3,3,3,0,4,4,4,5,6,8,0,0,0,0,0]};
const KT={150:[0,0,63.5,73,82.5,102,121,133,154,171,194,219,273,330,406,425,483,546,597,711],300:[51,63.5,70,79.5,90.5,108,127,146,159,175,210,241,302,356,413,457,508,575,635,749],1500:[60.5,66.5,71.5,81,92,124,137,168,0,194,229,248,318,371,438,489,546,613,673,794],2500:[65,73,82.5,102,114,133,149,168,0,203,241,279,340,425,495,0,0,0,0,0],900:[60.5,66.5,71.5,81,92,124,137,156,0,181,216,241,308,362,419,467,524,594,648,772]};
KT[400]=KT[300];KT[600]=KT[300];
function ring(c,n){const no=(RJN[c]||{})[n],i=NPSL.indexOf(n);if(!no||i<0)return null;const x=(XT[c]||[])[i],k=(KT[c]||[])[i];if(!x)return null;const [P,E,F]=RING[no];return {no,P,E,F,X:x,K:k};}
/* lubricant: typical nut factor K (use the value from the lubricant data sheet where known) */
const LUB={moly:['Moly (MoS₂) paste',0.12],cu:['Copper-based anti-seize',0.16],ni:['Nickel-based anti-seize',0.18],oil:['Machine oil',0.20],ptfe:['PTFE-coated studs',0.12],custom:['Other (enter K)',null]};
/* yield, ksi, by diameter (in) – ASTM A193 / A320 */
const BM={b7:{n:'A193 B7 / A194 2H',y:d=>d<=2.5?105:d<=4?95:75},b7m:{n:'A193 B7M / A194 2HM (sour)',y:()=>80},l7:{n:'A320 L7 / A194 Gr 7',y:d=>d<=2.5?105:95,max:2.5},l7m:{n:'A320 L7M / A194 7M (low temp, sour)',y:()=>80,max:2.5},b16:{n:'A193 B16 / A194 4',y:d=>d<=2.5?105:d<=4?95:85},
 b8c2:{n:'A193 B8 Cl 2 / A194 8',y:d=>d<=.75?100:d<=1?80:d<=1.25?65:50,max:1.5},b8m2:{n:'A193 B8M Cl 2 / A194 8M',y:d=>d<=.75?95:d<=1?80:d<=1.25?65:50,max:1.5},b8c1:{n:'A193 B8 Cl 1 / A194 8',y:()=>30},b8m1:{n:'A193 B8M Cl 1 / A194 8M',y:()=>30}};
const ld=(k,d)=>{try{return store.get(k,d)}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
const S={std:ld('fj_std','165'),cls:ld('fj_c','300'),gk:ld('fj_g','sw'),pr:ld('fj_p','3'),bm:ld('fj_b','b7'),pct:ld('fj_s','50'),k:ld('fj_k','0.16'),lub:ld('fj_l','cu'),n47:ld('fj_n47','36')};
const FR47={0.75:'5/8',0.88:'3/4',1:'7/8',1.12:'1',1.25:'1-1/8',1.38:'1-1/4',1.5:'1-3/8',1.62:'1-1/2',1.75:'1-5/8',1.88:'1-3/4',2:'1-7/8',2.12:'2',2.38:'2-1/4',2.62:'2-1/2',2.88:'2-3/4',3.12:'3',3.38:'3-1/4',3.62:'3-1/2',3.88:'3-3/4',4.12:'4'};
const CL47={A:['150','300','400','600','900'],B:['75','150','300','400','600','900']};
const is47=()=>S.std==='A'||S.std==='B';
const row47=(c,n)=>{const D=window.B1647;if(!D)return null;const r=(D[S.std][c]||[]).find(x=>x[0]===+n);if(!r)return null;const d=FR47[r[9]];return {O:r[1],tf:r[2],R:r[4],X:r[5],Y:r[6],BC:r[7],n:r[8],d,dv:NUM(d)};};
const getRow=(c,n)=>is47()?row47(c,n):flRow(c,n);
if(!GK[S.gk])S.gk='sw';if(!BM[S.bm])S.bm='b7';
const SZ=()=>is47()?((window.B1647&&window.B1647[S.std][S.cls])||[]).map(r=>String(r[0])):FL_NPS(S.cls);
const FL_NPS=c=>N20.filter(n=>flRow(c,n));
/* PCC-1 legacy cross pattern: groups of 4 opposite bolts; group starts spread round the flange */
const GO={1:[0],2:[0,1],3:[0,1,2],4:[0,2,1,3],5:[0,2,4,1,3],6:[0,3,1,4,2,5],7:[0,4,2,6,1,5,3],8:[0,4,2,6,1,5,3,7],9:[0,3,6,1,4,7,2,5,8]};
function seq(N){if(N%4)return Array.from({length:N},(_,i)=>i+1);const m=N/4,o=GO[m]||Array.from({length:m},(_,i)=>i);
 return o.flatMap(k=>[k,k+N/2,k+N/4,k+3*N/4].map(x=>x+1));}

/* ------------------------------------------------------------ calc */
function calc(n,c){
 const f=getRow(c,n);if(!f)return null;const rg=GK[S.gk].ring&&!is47()?ring(c,n):null;if(GK[S.gk].ring&&!rg)return calc2(n,c);
 const in2=25.4,d=f.dv,dm=d*in2,tpi=d<=1?{0.5:13,0.625:11,0.75:10,0.875:9,1:8}[d]:8,pitch=in2/tpi;
 const hi=+c>=400,tf=f.tf*in2,proj=(+S.pr||0)*pitch,nut=dm,code=is47()?'B16.47':'B16.5';let rfh=hi?6.4:1.6,tfb=hi?tf:tf-rfh,g=GK[S.gk];const parts=[];
 if(rg){rfh=rg.E;g={n:`Ring R${rg.no}`,t:rg.X,c:rg.X,std:GK.rj.std};
  parts.push([`Flange thickness without raised face × 2`,2*tfb],[`Raised portion for ring joint (= groove depth E ${rg.E} mm) × 2`,2*rg.E],[`Approximate distance between flanges with ring R${rg.no} (B16.5)`,rg.X]);}
 else{parts.push([`Flange thickness ${hi?'':'(incl. 1.6 mm raised face) '}× 2`,2*tf]);
  if(hi)parts.push([`Raised face 6.4 mm × 2 (not in ${code} thickness for Class 400 and up)`,2*rfh]);
  parts.push([`Gasket, uncompressed`,g.t]);}
 parts.push([`Heavy hex nut height (= d) × 2`,2*nut],[`Projection, ${S.pr} threads past each nut × 2`,2*proj]);
 const Lc=parts.reduce((a,p)=>a+p[1],0),L=Math.ceil(Lc/5-1e-9)*5;
 const As=0.7854*Math.pow(d-0.9743/tpi,2),Sy=BM[S.bm].y(d),Sb=Sy*(+S.pct||0)/100,F=Sb*1000*As,K=+S.k||0.16,T=K*F*d/12;
 const gapRF=g.c,gapRim=g.c+2*rfh,odp=is47()?+n*25.4:odmm(n);
 return {rg,code,f,n,c,dm,d,tpi,thr:`${f.d}"-${tpi} ${d<=1?'UNC':'8UN'}`,pitch,tf,tfb,rfh,hi,g,proj,nut,parts,Lc,L,As,Sy,Sb,F,K,T,gapRF,gapRim,N:f.n,
  O:f.O*in2,BC:f.BC*in2,R:rg?rg.K:f.R*in2,X:f.X*in2,Y:f.Y*in2,od:odp,hole:(d+(d<=.875?0.125:0.125))*in2};}

/* ring joint not listed for this size/class: fall back to spiral wound, flagged */
function calc2(n,c){const k=S.gk;S.gk='sw';const r=calc(n,c);S.gk=k;if(r)r.noRing=1;return r;}

/* ------------------------------------------------------------ drawings */
const F1=x=>+(+x).toFixed(1);
function section(r,fm){
 /* model mm: x along the pipe (0 = joint centre), y radial up from the pipe centreline; drawn to scale in px */
 const hg=r.gapRF/2,tfb=r.tfb,rf=r.rfh,hub=r.Y-r.tf,od=r.od/2,X=r.X/2,O=r.O/2,R=r.R/2,bc=r.BC/2,wall=Math.max(2.5,r.od*0.035),bore=od-wall;
 const xf=hg+rf,xb=xf+tfb,xh=xb+hub,Lh=r.L/2,nh=r.nut,af=1.5*r.dm+3.2,xp=Math.max(xh+Math.max(30,r.od*0.3),Lh+10);
 const gIn=bore+wall*0.3,gOut=S.gk==='sw'?bc-r.hole/2-1.5:R;
 const k=Math.min(470/(2*xp),300/O),cx=300,top=92,base=top+O*k,VW=760,VH=base+62;
 const X_=x=>F1(cx+x*k),Y_=y=>F1(base-y*k),pl=a=>a.map(p=>`${X_(p[0])},${Y_(p[1])}`).join(' ');
 let g=`<defs><pattern id="fjH" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#E6EBF2"/><line x1="0" y1="0" x2="0" y2="7" stroke="#9AA6B6" stroke-width="1.4"/></pattern>
 <marker id="fjA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" fill="#1849A9"/></marker></defs>`;
 [-1,1].forEach(sg=>{const S_=x=>sg*x;
  g+=`<polygon class="cut" points="${pl([[S_(xf),bore],[S_(xf),O],[S_(xb),O],[S_(xb),X],[S_(xh),od],[S_(xp),od],[S_(xp),bore]])}"/>`;
  g+=`<polygon class="cut" points="${pl([[S_(hg),bore],[S_(hg),R],[S_(xf),R],[S_(xf),bore]])}"/>`;});
 /* bolt hole through both flanges, gasket, stud and nuts */
 g+=`<rect x="${X_(-xb)}" y="${Y_(bc+r.hole/2)}" width="${F1(2*xb*k)}" height="${F1(r.hole*k)}" fill="#fff"/>`;
 if(r.rg){const pr=r.rg.P/2,hw=Math.max(hg+r.rg.E*.7,1),hh=r.rg.F*.42,c=hh*.45;g+=`<polygon class="gk" points="${pl([[-hw+c,pr+hh],[hw-c,pr+hh],[hw,pr+hh-c],[hw,pr-hh+c],[hw-c,pr-hh],[-hw+c,pr-hh],[-hw,pr-hh+c],[-hw,pr+hh-c]])}"/>`;}
 else g+=`<rect class="gk" x="${X_(-hg)}" y="${Y_(gOut)}" width="${F1(Math.max(2*hg*k,2))}" height="${F1((gOut-gIn)*k)}"/>`;
 g+=`<rect class="bolt" x="${X_(-Lh)}" y="${Y_(bc+r.dm/2)}" width="${F1(r.L*k)}" height="${F1(r.dm*k)}"/>`;
 for(let i=-Lh+2;i<Lh-1;i+=r.pitch)if(Math.abs(i)>xb+nh-1||Math.abs(i)<xb)g+=`<line x1="${X_(i)}" y1="${Y_(bc+r.dm/2)}" x2="${X_(i+r.pitch*.5)}" y2="${Y_(bc-r.dm/2)}" stroke="#8592A3" stroke-width=".5"/>`;
 [-1,1].forEach(sg=>{const x0=sg<0?-xb-nh:xb;g+=`<rect class="nut" x="${X_(x0)}" y="${Y_(bc+af/2)}" width="${F1(nh*k)}" height="${F1(af*k)}"/>`;});
 g+=`<line class="cl" x1="${X_(-xp)-14}" y1="${Y_(0)}" x2="${+X_(xp)+14}" y2="${Y_(0)}"/><line class="cl" x1="${X_(-Lh)-14}" y1="${Y_(bc)}" x2="${+X_(Lh)+14}" y2="${Y_(bc)}"/><line class="cl" x1="${X_(0)}" y1="${+Y_(0)+16}" x2="${X_(0)}" y2="${Y_(O)-14}"/>`;
 /* dimensions */
 const dh=(x1,x2,yp,lab,anch='middle',tx)=>`<line class="dm" x1="${X_(x1)}" y1="${yp}" x2="${X_(x2)}" y2="${yp}" marker-start="url(#fjA)" marker-end="url(#fjA)"/><text class="dt" x="${tx??F1(cx+(x1+x2)/2*k)}" y="${yp-6}" text-anchor="${anch}">${lab}</text>`;
 const ex=(x,y1p,y2p)=>`<line class="ex" x1="${X_(x)}" y1="${y1p}" x2="${X_(x)}" y2="${y2p}"/>`;
 const yL=top-58,yT=top-26;
 g+=ex(-Lh,Y_(bc),yL-5)+ex(Lh,Y_(bc),yL-5)+dh(-Lh,Lh,yL,`Stud length L = ${fm(r.L)}`);
 g+=ex(-xb,Y_(O),yT-5)+ex(-hg,Y_(R),yT-5)+dh(-xb,-hg,yT,`tf ${fm(r.tf)}`,'end',F1(cx-xb*k-14));
 /* gap at the raised faces, below the pipe centreline */
 const yG=+Y_(0)+30;
 g+=ex(-hg,Y_(gIn),yG+5)+ex(hg,Y_(gIn),yG+5);
 g+=`<line class="dm" x1="${+X_(-hg)-28}" y1="${yG}" x2="${X_(-hg)}" y2="${yG}" marker-end="url(#fjA)"/><line class="dm" x1="${+X_(hg)+28}" y1="${yG}" x2="${X_(hg)}" y2="${yG}" marker-end="url(#fjA)"/>`;
 g+=`<text class="dt" x="${+X_(hg)+34}" y="${yG+4}">${r.rg?`Gap between ring joint faces about ${fm(r.gapRF)}`:`Gap at raised faces ${fm(r.gapRF)} (gasket, compressed)`}</text>`;
 /* gap at the rim (OD) */
 g+=`<line class="dm" x1="${+X_(xb)+40}" y1="${+Y_(O)+7}" x2="${+X_(hg+rf)+1}" y2="${+Y_(O)+7}" marker-end="url(#fjA)"/><text class="dt" x="${+X_(xb)+44}" y="${+Y_(O)+11}">Gap at rim ${fm(r.gapRim)}</text>`;
 g+=`<text class="lb" x="${+X_(Lh)+10}" y="${+Y_(bc)+4}">nut ${fm(r.nut)} + ${S.pr} threads</text>`;
 g+=`<text class="lb" x="${X_(-xp)}" y="${+Y_(0)+16}">Pipe centreline</text>`;
 return `<svg class="fjs" viewBox="0 0 ${VW} ${F1(VH)}" role="img" aria-label="Section through the flange joint: stud length ${fm(r.L)}, gap at raised faces ${fm(r.gapRF)}">${g}</svg>`;}

function face(r){
 const N=r.N,sq=seq(N),ord={};sq.forEach((b,i)=>ord[b]=i+1);
 const O=r.O/2,k=180/O,cx=210,cy=205,P=v=>F1(v*k);
 let g=`<circle class="face" cx="${cx}" cy="${cy}" r="${P(O)}"/><circle class="rf" cx="${cx}" cy="${cy}" r="${P(r.R/2)}"/><circle class="bore" cx="${cx}" cy="${cy}" r="${P(r.od/2*0.94)}"/>`;
 const pos=i=>{const t=-Math.PI/2+2*Math.PI*i/N+Math.PI/N;return [cx+r.BC/2*k*Math.cos(t),cy+r.BC/2*k*Math.sin(t)];};
 /* lines for the first cross group */
 const f4=sq.slice(0,4).map(b=>pos(b-1));
 g+=`<path class="xline" d="M${F1(f4[0][0])} ${F1(f4[0][1])}L${F1(f4[1][0])} ${F1(f4[1][1])}M${F1(f4[2][0])} ${F1(f4[2][1])}L${F1(f4[3][0])} ${F1(f4[3][1])}"/>`;
 const hr=Math.max(9,Math.min(15,r.hole/2*k+3));
 for(let i=0;i<N;i++){const [x,y]=pos(i),b=i+1;g+=`<circle class="hole${ord[b]<=4?' first':''}" cx="${F1(x)}" cy="${F1(y)}" r="${F1(hr)}"/><text class="hn" x="${F1(x)}" y="${F1(y+3.8)}" text-anchor="middle">${b}</text>`;}
 g+=`<text class="lb" x="${cx}" y="${cy+4}" text-anchor="middle">${N} bolts · numbered clockwise</text>`;
 return `<svg class="fjs" viewBox="0 0 420 420" role="img" aria-label="Flange face with ${N} bolts numbered clockwise; first cross group highlighted">${g}</svg>`;}

/* ------------------------------------------------------------ page */
const tb=(h,rows)=>`<table class="fj-t"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
const fm=x=>U==='mm'?`${(Math.round(x*10)/10).toString()} mm`:`${(x/25.4).toFixed(2)}″`;
const nm=x=>Math.round(x);
function render(){
 if(is47()&&!window.B1647){P.innerHTML='<p class="note">Loading B16.47 data…</p>';import('./b1647.js?v=20261123a').then(render).catch(()=>{S.std='165';render();});return;}
 if(is47()&&!CL47[S.std].includes(S.cls))S.cls=CL47[S.std][0];
 if(is47()&&GK[S.gk].ring)S.gk='sw';
 if(!is47()&&!CLASSES.includes(S.cls))S.cls='300';
 const sz=SZ();let n=is47()?S.n47:SEL;if(!sz.includes(n)){const v=NUM(n);n=sz.find(x=>NUM(x)>=v)||sz[sz.length-1];}
 const r=calc(n,S.cls);
 const pass=[['1','Cross pattern','20–30%',.3],['2','Cross pattern','50–70%',.6],['3','Cross pattern','100%',1],['4','Clockwise, bolt to bolt, until nuts no longer turn','100%',1],['5','Clockwise check after at least 4 hours (optional)','100%',1]];
 const Tn=r.T*1.35582;
 const sq=seq(r.N);
 const grp=sq.map((b,i)=>`<span${i&&i%4===0?' class="g"':''}>${b}</span>`).join('');
 P.innerHTML=`<div class="phead"><div><h1>Flange joint assembly</h1><p>A weld neck flange joint to ASME B16.5 (NPS ½–24) or B16.47 (NPS 26–60) with gasket and stud bolts: stud length, gasket, flange gap, target torque and the tightening sequence. Pick the standard, size, class, gasket, bolting and lubricant. A full bolt table for the class is at the bottom.</p></div></div>
 <div class="fj-ctrl">
  <label>Standard<select id="fjStd">${[['165','B16.5 (NPS ½–24)'],['A','B16.47 Series A'],['B','B16.47 Series B']].map(([v,t])=>`<option value="${v}"${v===S.std?' selected':''}>${t}</option>`).join('')}</select></label>
  <label>Size<select id="fjN">${sz.map(x=>`<option value="${x}"${x===n?' selected':''}>NPS ${x} (DN ${is47()?+x*25:DN[x]})</option>`).join('')}</select></label>
  <label>Class<select id="fjC">${(is47()?CL47[S.std]:CLASSES).map(c=>`<option${c===S.cls?' selected':''}>${c}</option>`).join('')}</select></label>
  <label>Gasket<select id="fjG">${Object.keys(GK).filter(k=>!(GK[k].ring&&is47())).map(k=>`<option value="${k}"${k===S.gk?' selected':''}>${GK[k].n}</option>`).join('')}</select></label>
  <label>Threads past nut<select id="fjP">${['2','3'].map(v=>`<option${v===S.pr?' selected':''}>${v}</option>`).join('')}</select></label>
  <label>Bolting<select id="fjB">${Object.keys(BM).map(k=>`<option value="${k}"${k===S.bm?' selected':''}>${BM[k].n}</option>`).join('')}</select></label>
  <label>Target bolt stress, % of yield<input id="fjS" type="number" min="20" max="80" step="5" value="${S.pct}"></label>
  <label>Lubricant<select id="fjL">${Object.keys(LUB).map(k=>`<option value="${k}"${k===S.lub?' selected':''}>${LUB[k][0]}${LUB[k][1]?` (K ${LUB[k][1]})`:''}</option>`).join('')}</select></label>
  <label>Nut factor K<input id="fjK" type="number" min="0.08" max="0.3" step="0.01" value="${S.k}"></label>
 </div>
 <div class="fj-box"><div class="fj-views"><figure><figcaption>Section through the joint (upper half)</figcaption>${section(r,fm)}</figure><figure><figcaption>Flange face, bolt numbering</figcaption>${face(r)}</figure></div>
  <div class="fj-sum"><span>NPS ${n} · Class ${S.cls}</span><span>${r.N} × <b>${r.thr}</b> studs</span><span>Stud length <b>${fm(r.L)}</b></span><span>${r.rg?`Ring <b>R${r.rg.no}</b>, gap about ${fm(r.rg.X)}`:`Gasket <b>${fm(r.g.t)}</b> → about ${fm(r.g.c)} compressed`}</span><span>Target torque <b>${nm(Tn)} N·m</b> (${nm(r.T)} ft·lb)</span><button class="chat-b" id="fjChat" type="button">Copy for chat</button></div></div>
 <div class="fj-out">
  <div class="fj-card"><h3>Bolt length</h3>
   ${tb(['Part','Value'],[...r.parts.map(([t,v])=>`<tr><td style="text-align:left">${t}</td><td>${fm(v)}</td></tr>`),`<tr><td style="text-align:left"><b>Calculated</b></td><td><b>${fm(r.Lc)}</b></td></tr>`,`<tr><td style="text-align:left"><b>Stud length, rounded up to 5 mm</b></td><td><b>${fm(r.L)}</b></td></tr>`])}
   <p style="margin-top:8px">Order as: <b>${r.N} nos. stud bolt ${r.thr} × ${Math.round(r.L)} mm, ${BM[S.bm].n}, with 2 heavy hex nuts each</b> per joint. Thread pitch ${r.pitch.toFixed(2)} mm (${r.tpi} TPI).</p></div>
  <div class="fj-card"><h3>Gasket and flange gap</h3>
   ${r.rg?tb(['Item','Value'],[
    `<tr><td style="text-align:left">Ring and groove number (${r.rg.no<=79?'B16.5 / B16.20':''})</td><td>R${r.rg.no}</td></tr>`,
    `<tr><td style="text-align:left">Groove pitch diameter P</td><td>${fm(r.rg.P)}</td></tr>`,
    `<tr><td style="text-align:left">Groove depth E = height of raised portion</td><td>${fm(r.rg.E)}</td></tr>`,
    `<tr><td style="text-align:left">Groove width F</td><td>${fm(r.rg.F)}</td></tr>`,
    `<tr><td style="text-align:left">Approximate distance between flanges, made up</td><td>${fm(r.rg.X)}</td></tr>`])
    +`<p style="margin-top:8px">Metal-to-metal seal: the ring is softer than the groove and coins into it. Use a new ring every time, check the grooves for damage, and order flanges and ring in matching materials (ring marked with its number and material).</p>`
   :tb(['Item','Value'],[
    `<tr><td style="text-align:left">Gasket (${r.g.std}), as supplied</td><td>${fm(r.g.t)}</td></tr>`,
    `<tr><td style="text-align:left">Gasket after bolting, typical</td><td>${fm(r.g.c)}</td></tr>`,
    `<tr><td style="text-align:left">Gap between raised faces = compressed gasket</td><td>${fm(r.gapRF)}</td></tr>`,
    `<tr><td style="text-align:left">Raised face height, each flange</td><td>${fm(r.rfh)}</td></tr>`,
    `<tr><td style="text-align:left">Gap between flange rims (measure here) = gasket + 2 × RF</td><td>${fm(r.gapRim)}</td></tr>`])
    +`<p style="margin-top:8px">Check the rim gap with a feeler gauge or calliper at four points, 90° apart, before and after bolting. The gap should be even all round.</p>`}
   ${r.noRing?`<p class="fj-warn">B16.5 lists no ring joint for NPS ${n} Class ${S.cls}; values shown are for a spiral wound gasket.</p>`:''}
   ${S.gk==='km'?`<p class="fj-warn">Kammprofile thickness varies by maker (core 3–4 mm plus facings); check the data sheet.</p>`:''}</div>
  <div class="fj-card"><h3>Bolt tightening</h3>
   <p>Torque T = K × F × d, with F = target stress × stress area.</p>
   ${tb(['Item','Value'],[
    `<tr><td style="text-align:left">Stress area A<sub>s</sub></td><td>${U==='mm'?(r.As*645.16).toFixed(0)+' mm²':r.As.toFixed(3)+' in²'}</td></tr>`,
    `<tr><td style="text-align:left">Yield, ${BM[S.bm].n.split(' /')[0]}</td><td>${U==='mm'?Math.round(r.Sy*6.895)+' MPa':r.Sy+' ksi'}</td></tr>`,
    `<tr><td style="text-align:left">Target stress, ${S.pct}% of yield</td><td>${U==='mm'?Math.round(r.Sb*6.895)+' MPa':r.Sb.toFixed(1)+' ksi'}</td></tr>`,
    `<tr><td style="text-align:left">Load per bolt</td><td>${U==='mm'?(r.F*4.448/1000).toFixed(1)+' kN':Math.round(r.F).toLocaleString('en-US')+' lbf'}</td></tr>`,
    `<tr><td style="text-align:left"><b>Target torque</b> (K = ${r.K})</td><td><b>${nm(Tn)} N·m</b><br><small>${nm(r.T)} ft·lb</small></td></tr>`])}
   ${BM[S.bm].max&&r.d>BM[S.bm].max?`<p class="fj-warn">${BM[S.bm].n.split(' /')[0]} is normally limited to ${BM[S.bm].max}" diameter; this joint needs ${r.f.d}" studs. Check the bolting spec.</p>`:''}
   ${(S.bm==='b8m1'||S.bm==='b8c1')?'<p class="fj-warn">Class 1 stainless bolting has a low yield (30 ksi). It often cannot load a spiral wound gasket enough; check with the gasket maker.</p>':''}
   ${r.d>=1.5?'<p class="fj-warn">Studs of 1½" and larger are usually tightened with hydraulic tensioners rather than torque; the tensioning procedure then sets the pressures.</p>':''}
   <p class="fj-warn">An estimate for planning. The joint's assembly procedure, the gasket maker's stress limits and the lubricant actually used set the final torque.</p></div>
  <div class="fj-card"><h3>Assembly sequence, ASME PCC-1 legacy cross pattern</h3>
   <p>Tightening order for ${r.N} bolts (groups of four opposite bolts):</p><div class="fj-seq">${grp}</div>
   ${tb(['Pass','Pattern','Torque','N·m'],pass.map(([p,pt,pc,f])=>`<tr><td>${p}</td><td style="text-align:left">${pt}</td><td>${pc}</td><td>${nm(Tn*f)}</td></tr>`))}
  </div>
 </div>
 ${fullTable()}
 <div class="fj-card" style="margin-top:18px"><h3>Before and during assembly</h3><ol>
  <li>Clean the flange faces. No radial scratches across the raised face serrations; check the gasket is the right type, size and class, and new. Never reuse a gasket.</li>
  <li>Check alignment before inserting any bolts: rim gap even within about 0.8 mm at four points, and the flanges centred within about 1.5 mm. Do not pull flanges together with the bolts.</li>
  <li>Lubricate stud threads and the nut faces with the lubricant the nut factor assumes (K ${r.K}).</li>
  <li>Fit the gasket centred, insert all studs, run the nuts up by hand so the same number of threads stand out at each end.</li>
  <li>Number the bolts clockwise (1 to ${r.N}) with a paint marker, as in the face view.</li>
  <li>Tighten in the passes above. After pass 3, go round clockwise at 100% until no nut turns.</li>
  <li>Record the joint: tag, gasket, bolting, lubricant, tool and final torque.</li></ol></div>
 <div class="fj-card fj-refs" style="margin-top:18px"><h3>References</h3><ul>
  <li>ASME PCC-1, Guidelines for Pressure Boundary Bolted Flange Joint Assembly: alignment (Appendix E), legacy cross-pattern sequence and passes, target torque with a nut factor (Appendix K), bolt stress (Appendix O).</li>
  <li>ASME B16.5: flange thickness, bolt circle, bolt count and size; raised face 1.6 mm included in thickness for Class 150 and 300, 6.4 mm added for Class 400 and up. Ring joint facings: ring number, groove dimensions and approximate distance between flanges; the raised portion height equals the groove depth E.</li>
  <li>ASME B16.47 Series A and B: large flange dimensions, from the <a href="large-flanges.html">Large flanges page</a>.</li>
  <li>Nut factors for lubricants are typical values; use the figure from the lubricant data sheet when you have it.</li>
  <li>ASME B16.20 (spiral wound, grooved metal / kammprofile, ring joint) and B16.21 (non-metallic sheet) gaskets. ASME B1.1 thread stress area. ASTM A193 / A320 / A194 bolting.</li>
  <li>Same stud length build-up as the <a href="calculators.html">Bolt length calculator</a>; flange sizes from the <a href="flanges.html">Flanges page</a>.</li></ul></div>`;
 bind();
 const cb=P.querySelector('#fjChat');if(cb&&window.shareChat)cb.onclick=()=>window.shareChat({title:`Flange joint, ASME ${r.code} WN ${r.rg?'RTJ':'RF'}`,sub:`NPS ${n} · Class ${S.cls} · ${GK[S.gk].n}`,rows:[['Stud bolts',`${r.N} × ${r.thr} × ${Math.round(r.L)} mm, ${BM[S.bm].n}, 2 heavy hex nuts each`],['Gasket',`${fm(r.g.t)} as supplied, about ${fm(r.g.c)} compressed`],['Gap at raised faces',fm(r.gapRF)],['Gap at flange rims',fm(r.gapRim)],['Target torque',`${nm(Tn)} N·m (${nm(r.T)} ft·lb), K ${r.K}, ${S.pct}% of yield`],['Passes','30% → 60% → 100% cross pattern, then 100% clockwise until nuts stop'],['Tightening order',sq.join('-')]],note:'Torque is an estimate for planning; the joint procedure and gasket maker set the final value.'});}
function tableRows(){return SZ().map(x=>{const r=calc(x,S.cls);if(!r)return null;const Tn=r.T*1.35582;return {x,dn:is47()?+x*25:DN[x],b:`${r.N} × ${r.thr}`,L:r.L,Tn,T:r.T,ring:r.rg?'R'+r.rg.no:(r.noRing?'–':'')};}).filter(Boolean);}
function fullTable(){const R=tableRows(),ring=GK[S.gk].ring&&!is47();
 return `<div class="fj-card" style="margin-top:18px"><h3>Full bolt table, ${is47()?'B16.47 Series '+S.std:'B16.5'} Class ${S.cls}</h3>
  <p>${GK[S.gk].n} · ${BM[S.bm].n} · ${S.pct}% of yield · K ${S.k} · ${S.pr} threads past each nut. Stud lengths rounded up to 5 mm.</p>
  <div style="overflow-x:auto">${tb(['NPS','DN','Studs',...(ring?['Ring']:[]),'Stud length','Torque N·m','ft·lb'],R.map(o=>`<tr><td>${o.x}</td><td style="text-align:left">${o.dn}</td><td>${o.b}</td>${ring?`<td>${o.ring}</td>`:''}<td>${fm(o.L)}</td><td>${nm(o.Tn)}</td><td>${nm(o.T)}</td></tr>`))}</div>
  <div style="margin-top:10px"><button class="fj-dl" id="fjCsv" type="button">Download CSV</button></div></div>`;}
function csv(){const R=tableRows(),ring=GK[S.gk].ring&&!is47(),h=['NPS','DN','Studs',...(ring?['Ring']:[]),'Stud length mm','Torque N·m','Torque ft·lb'];
 const lines=[`# Flange joint bolt table, ${is47()?'ASME B16.47 Series '+S.std:'ASME B16.5'} Class ${S.cls}, ${GK[S.gk].n}, ${BM[S.bm].n}, ${S.pct}% yield, K ${S.k} (piperef.net)`,h.join(',')].concat(R.map(o=>[o.x,o.dn,o.b,...(ring?[o.ring]:[]),Math.round(o.L),nm(o.Tn),nm(o.T)].map(v=>`"${v}"`).join(',')));
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+lines.join('\n')],{type:'text/csv'}));a.download=`flange-bolts-${is47()?'B1647'+S.std:'B165'}-class${S.cls}.csv`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);}
function keep(f){const y=scrollY;f();render();scrollTo(0,y);}
function bind(){
 const on=(id,k,key)=>{const e=P.querySelector('#'+id);e.addEventListener(e.tagName==='SELECT'?'change':'change',()=>keep(()=>{S[k]=e.value;sv(key,e.value);}));};
 on('fjC','cls','fj_c');on('fjG','gk','fj_g');on('fjP','pr','fj_p');on('fjB','bm','fj_b');on('fjS','pct','fj_s');on('fjStd','std','fj_std');
 const kk=P.querySelector('#fjK');kk.addEventListener('change',()=>keep(()=>{S.k=kk.value;sv('fj_k',kk.value);S.lub='custom';sv('fj_l','custom');}));
 const lu=P.querySelector('#fjL');lu.addEventListener('change',()=>keep(()=>{S.lub=lu.value;sv('fj_l',lu.value);const k=LUB[lu.value][1];if(k){S.k=String(k);sv('fj_k',S.k);}}));
 const cv=P.querySelector('#fjCsv');if(cv)cv.onclick=csv;
 const s=P.querySelector('#fjN');s.onchange=()=>{const y=scrollY;if(is47()){S.n47=s.value;sv('fj_n47',s.value);render();}else if(typeof setSel==='function')setSel(s.value);else{SEL=s.value;render();}scrollTo(0,y);};}
render();
window.renderFJ=()=>{const y=scrollY;render();scrollTo(0,y);};
})();
