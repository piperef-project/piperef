/* Control valve assembly elevations (front view), shaded to look like the real hardware, with layout dimension letters.
   window.ACT_SVG(key) returns an <svg>; keys: pneu, posi, motor, esv. viewBox 0 0 440 400, pipe centreline y=280, stem x=220.
   Valve flange faces at x=92 and x=348. */
(function(){
const CL=280,X=220,FL=92,FR=348;
let VALS=null; // letter -> display value, set per drawing
const f=n=>Math.round(n*10)/10;

function defs(p){const lg=(id,dir,st)=>`<linearGradient id="${p}${id}" ${dir}>${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
 const V='x1="0" y1="0" x2="0" y2="1"',H='x1="0" y1="0" x2="1" y2="0"';
 return `<defs>
 ${lg('pipe',V,[[0,'#59636F'],[.18,'#C9D0D8'],[.42,'#9AA4AF'],[.8,'#5A646F'],[1,'#3B434C']])}
 ${lg('fl',V,[[0,'#4E5863'],[.2,'#B9C1CA'],[.5,'#8A949F'],[1,'#3E4650']])}
 <radialGradient id="${p}body" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#8FA2B6"/><stop offset=".45" stop-color="#5D7086"/><stop offset="1" stop-color="#2E3B4A"/></radialGradient>
 ${lg('cast',V,[[0,'#7B8DA1'],[.35,'#62758A'],[1,'#3A4757']])}
 ${lg('yoke',H,[[0,'#3E4B5B'],[.3,'#7A8CA0'],[.6,'#5B6D82'],[1,'#33404F']])}
 ${lg('chrome',H,[[0,'#7D8790'],[.35,'#F1F4F7'],[.6,'#B7C0C9'],[1,'#6B747D']])}
 ${lg('act',V,[[0,'#6E9BD1'],[.35,'#2F67A8'],[1,'#173D6B']])}
 ${lg('actl',V,[[0,'#2C5F9C'],[1,'#163A66']])}
 ${lg('alu',V,[[0,'#E9EDF1'],[.5,'#C3CBD3'],[1,'#8E98A3']])}
 ${lg('lid',V,[[0,'#4D86C6'],[1,'#1E4F8A']])}
 ${lg('mot',V,[[0,'#8C99A6'],[.25,'#D4DAE0'],[.55,'#9AA6B2'],[1,'#4F5A66']])}
 ${lg('motb',V,[[0,'#7F8C99'],[.3,'#C7CED6'],[1,'#56616D']])}
 ${lg('yel',V,[[0,'#F6D36B'],[.3,'#E8B42F'],[.75,'#B9861A'],[1,'#8A6312']])}
 ${lg('yeh',H,[[0,'#A97A16'],[.4,'#F2C951'],[1,'#A97A16']])}
 ${lg('nut',V,[[0,'#A7AFB8'],[1,'#4A525B']])}
 ${lg('cu',V,[[0,'#F1C27D'],[1,'#B9772E']])}
 <filter id="${p}sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0B1F3A" flood-opacity=".22"/></filter>
 </defs>`;}

/* ---- parts ---- */
const nut=(p,x,y,w=7,h=9)=>`<rect x="${f(x-w/2)}" y="${f(y-h/2)}" width="${w}" height="${h}" rx="1" fill="url(#${p}nut)" stroke="#2B323A" stroke-width=".7"/>`;
const stud=(x1,x2,y)=>`<path d="M${x1} ${y}H${x2}" stroke="#7E8892" stroke-width="3.4"/><path d="M${x1} ${y-1}H${x2}" stroke="#C5CCD3" stroke-width="1"/>`;

/* pipe + weld-neck flange + valve flange, both sides */
function ends(p,od=92){
 const h=od/2,y0=CL-h,ph=19,t=12,o=`fill="url(#${p}fl)" stroke="#2E3640" stroke-width=".9"`;
 const fl=(x)=>`<rect x="${x}" y="${y0}" width="${t}" height="${od}" rx="1.5" ${o}/>`;
 const bolts=(x1,x2)=>[CL-h+9,CL+h-9].map(y=>stud(x1-8,x2+8,y)+nut(p,x1-4,y)+nut(p,x2+4,y)).join('');
 return `<rect x="0" y="${CL-ph}" width="${FL-34}" height="${ph*2}" fill="url(#${p}pipe)"/>
 <rect x="${FR+34}" y="${CL-ph}" width="${440-FR-34}" height="${ph*2}" fill="url(#${p}pipe)"/>
 <path d="M${FL-34} ${CL-ph}L${FL-12} ${CL-h+14}V${CL+h-14}L${FL-34} ${CL+ph}Z" ${o}/>
 <path d="M${FR+34} ${CL-ph}L${FR+12} ${CL-h+14}V${CL+h-14}L${FR+34} ${CL+ph}Z" ${o}/>
 ${fl(FL-12)}${fl(FL)}${fl(FR-12)}${fl(FR)}
 <rect x="${FL-1.2}" y="${CL-h+10}" width="2.4" height="${od-20}" fill="#1E242B"/><rect x="${FR-1.2}" y="${CL-h+10}" width="2.4" height="${od-20}" fill="#1E242B"/>
 ${bolts(FL-12,FL+12)}${bolts(FR-12,FR+12)}`;
}

/* cast globe body with bolted bonnet, packing and yoke nut */
const GLOBE_TOP=CL-142;
function globe(p){return globeBody(p)+bonnet(p);}
function globeBody(p){
 return `<path filter="url(#${p}sh)" d="M104 ${CL-26}C118 ${CL-26} 124 ${CL-32} 132 ${CL-40}C150 ${CL-58} 180 ${CL-66} ${X} ${CL-66}S290 ${CL-58} 308 ${CL-40}C316 ${CL-32} 322 ${CL-26} 336 ${CL-26}V${CL+26}C322 ${CL+26} 316 ${CL+32} 308 ${CL+40}C290 ${CL+58} 260 ${CL+68} ${X} ${CL+68}S150 ${CL+58} 132 ${CL+40}C124 ${CL+32} 118 ${CL+26} 104 ${CL+26}Z" fill="url(#${p}body)" stroke="#1F2933" stroke-width="1.1"/>
 <path d="M150 ${CL-40}C170 ${CL-54} 195 ${CL-58} 214 ${CL-59}" fill="none" stroke="#C9D6E4" stroke-width="2" stroke-linecap="round" opacity=".55"/>`;}
function bonnet(p){
 return `<rect x="188" y="${CL-76}" width="64" height="16" rx="3" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>
 <rect x="176" y="${CL-88}" width="88" height="13" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>
 ${[184,198,242,256].map(x=>`<rect x="${x-2}" y="${CL-96}" width="4" height="9" fill="#8C959E"/>`+nut(p,x,CL-95,8,6)).join('')}
 <path d="M198 ${CL-88}L203 ${CL-114}H237L242 ${CL-88}Z" fill="url(#${p}yoke)" stroke="#1F2933" stroke-width="1"/>
 <rect x="194" y="${CL-124}" width="52" height="10" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>
 ${nut(p,201,CL-128,7,7)}${nut(p,239,CL-128,7,7)}
 <path d="M200 ${CL-132}h40l-3 -10h-34z" fill="url(#${p}nut)" stroke="#2B323A" stroke-width=".8"/>`;
}

/* yoke from the yoke nut up to the actuator mounting plate at y=top */
function yoke(p,top){
 const b=GLOBE_TOP,m=(b+top)/2;
 return `<path d="M196 ${b}L184 ${top+12}H256L244 ${b}Z" fill="url(#${p}yoke)" stroke="#1F2933" stroke-width="1"/>
 <path d="M205 ${b-6}Q203 ${m} 200 ${top+20}H240Q237 ${m} 235 ${b-6}Z" fill="#0F1C2C" opacity=".85"/>
 <rect x="216" y="${top+10}" width="8" height="${b-top-4}" fill="url(#${p}chrome)"/>
 <rect x="206" y="${f(m-4)}" width="28" height="14" rx="2" fill="url(#${p}alu)" stroke="#39434E" stroke-width=".8"/>
 ${nut(p,211,m+3,5,5)}${nut(p,229,m+3,5,5)}
 <rect x="237" y="${f(m-10)}" width="7" height="26" fill="#E9EDF1" stroke="#5A646F" stroke-width=".6"/>
 ${[0,6,12,18,24].map(d=>`<path d="M237 ${f(m-9+d)}h${d%12?3:5}" stroke="#2B323A" stroke-width=".7"/>`).join('')}
 <rect x="178" y="${top}" width="84" height="12" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>`;
}

/* spring-diaphragm actuator on the yoke plate at y=top; casing joint at top-28 */
function diaph(p,top){
 const j=top-28,t=j-44;
 return `<path d="M130 ${j}H310C307 ${j+18} 278 ${top} 252 ${top}H188C162 ${top} 133 ${j+18} 130 ${j}Z" fill="url(#${p}actl)" stroke="#0D2340" stroke-width="1"/>
 <path filter="url(#${p}sh)" d="M130 ${j}H310C307 ${j-26} 272 ${t} ${X} ${t}S133 ${j-26} 130 ${j}Z" fill="url(#${p}act)" stroke="#0D2340" stroke-width="1"/>
 <path d="M152 ${j-12}C170 ${j-30} 196 ${t+4} ${X} ${t+3}" fill="none" stroke="#B9D3F2" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
 <rect x="122" y="${j-4}" width="196" height="8" rx="2" fill="#24538D" stroke="#0D2340" stroke-width=".9"/>
 ${[136,160,186,212,228,254,280,304].map(x=>nut(p,x,j-6.5,6,5)+nut(p,x,j+6.5,6,5)).join('')}
 <path d="M${X-9} ${t+1}h18v-6h-18z" fill="url(#${p}nut)"/><circle cx="${X}" cy="${t-12}" r="7" fill="none" stroke="#5C6670" stroke-width="3.2"/>
 <rect x="268" y="${j+8}" width="10" height="7" rx="1" fill="url(#${p}nut)"/>`;
}
const DIAPH_TOP=top=>top-28-44-19; // top of the lifting eye

/* ---- side view parts (looking along the pipe) ---- */
function flangeEnd(p,od=92){const R=od/2;
 return `<circle cx="${X}" cy="${CL}" r="${R}" fill="url(#${p}fl)" stroke="#2E3640" stroke-width="1"/>
 <circle cx="${X}" cy="${CL}" r="${R-8}" fill="none" stroke="#2E3640" stroke-width=".6" opacity=".6"/>
 ${[0,1,2,3,4,5,6,7].map(i=>{const a=(i+.5)*Math.PI/4,x=X+(R-8)*Math.cos(a),y=CL+(R-8)*Math.sin(a);return nut(p,x,y,7,7);}).join('')}
 <circle cx="${X}" cy="${CL}" r="19" fill="url(#${p}pipe)" stroke="#2E3640" stroke-width=".8"/><circle cx="${X}" cy="${CL}" r="15" fill="#1A222B"/>`;}
function globeSide(p){return `<path filter="url(#${p}sh)" d="M160 ${CL-40}C166 ${CL-60} 190 ${CL-66} ${X} ${CL-66}S274 ${CL-60} 280 ${CL-40}V${CL+40}C274 ${CL+60} 250 ${CL+68} ${X} ${CL+68}S166 ${CL+60} 160 ${CL+40}Z" fill="url(#${p}body)" stroke="#1F2933" stroke-width="1.1"/>`+bonnet(p)+flangeEnd(p);}
function yokeSide(p,top){const b=GLOBE_TOP;
 return `<path d="M200 ${b}L194 ${top+12}H246L240 ${b}Z" fill="url(#${p}yoke)" stroke="#1F2933" stroke-width="1"/>
 <path d="M206 ${b-8}L203 ${top+20}" stroke="#C9D6E4" stroke-width="1.6" opacity=".35"/>
 <rect x="178" y="${top}" width="84" height="12" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>`;}

/* dimensions and labels (drawn on light paper) */
function dim(x1,y1,x2,y2,label,lx,ly,anchor='middle'){
 const a=Math.atan2(y2-y1,x2-x1),h=7,w=3.2;const hd=(x,y,s)=>{const bx=x-s*h*Math.cos(a),by=y-s*h*Math.sin(a);return `M${x} ${y}L${f(bx+w*Math.sin(a))} ${f(by-w*Math.cos(a))}L${f(bx-w*Math.sin(a))} ${f(by+w*Math.cos(a))}Z`;};
 const v=VALS&&(label in VALS)?VALS[label]:null;
 return `<path class="dl" d="M${x1} ${y1}L${x2} ${y2}"/><path class="dh" d="${hd(x2,y2,1)}${hd(x1,y1,-1)}"/><text class="dt" x="${lx}" y="${ly}" text-anchor="${anchor}">${label}${v!=null?`<tspan class="dv"> ${v}</tspan>`:''}</text>`;}
const ext=d=>`<path class="ex" d="${d}"/>`;
const note=(x,y,t,a='start')=>`<text class="nt" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
const lead=(x1,y1,x2,y2)=>`<path class="ld" d="M${x1} ${y1}L${x2} ${y2}"/><circle class="ldd" cx="${x1}" cy="${y1}" r="1.8"/>`;
const clines=top=>`<path class="cl" d="M6 ${CL}H434"/><text class="ct" x="8" y="${CL-24}">CL</text><path class="cl" d="M${X} ${top}V${CL+90}"/>`;
const LDIM=()=>ext(`M${FL} ${CL+50}V${CL+110}M${FR} ${CL+50}V${CL+110}`)+dim(FL,CL+104,FR,CL+104,'L',X,CL+98);

const S={};
S.pneu=p=>{const yt=104,tp=DIAPH_TOP(yt);return defs(p)+clines(tp-6)+ends(p)+globe(p)+yoke(p,yt)+diaph(p,yt)
 +ext(`M232 ${tp}H448M232 ${CL+68}H448`)+dim(440,tp,440,CL,'H1',434,(tp+CL)/2,'end')+dim(440,CL,440,CL+68,'H2',434,CL+38,'end')
 +ext(`M130 ${yt-28}V${tp-14}M310 ${yt-28}V${tp-14}`)+dim(130,tp-8,310,tp-8,'ØD',X,tp-13)+LDIM()
 +lead(296,yt-48,330,yt-48)+note(334,yt-44,'Diaphragm actuator')+lead(244,GLOBE_TOP-20,330,GLOBE_TOP-20)+note(334,GLOBE_TOP-16,'Yoke')
 +lead(300,CL+30,330,CL+54)+note(334,CL+58,'Globe body');};

S.posi=p=>{const yt=104,tp=DIAPH_TOP(yt),py=GLOBE_TOP-46;return defs(p)+clines(tp-6)+ends(p)+globe(p)+yoke(p,yt)+diaph(p,yt)
 +`<path d="M244 ${py+24}h20v10h-20z" fill="url(#${p}cast)" stroke="#1F2933" stroke-width=".8"/>
 <path d="M226 ${GLOBE_TOP-36}L270 ${py+30}" stroke="#39434E" stroke-width="3" stroke-linecap="round"/><circle cx="270" cy="${py+30}" r="3" fill="#39434E"/>
 <g filter="url(#${p}sh)"><rect x="262" y="${py}" width="74" height="58" rx="7" fill="url(#${p}alu)" stroke="#4A545F" stroke-width="1"/>
 <rect x="268" y="${py+6}" width="62" height="46" rx="5" fill="url(#${p}lid)" stroke="#173F70" stroke-width=".8"/></g>
 <rect x="276" y="${py+14}" width="32" height="14" rx="2" fill="#B9E3C6" stroke="#173F70" stroke-width=".8"/><text x="292" y="${py+24.5}" font-size="8.5" text-anchor="middle" fill="#163A2A">42.0 %</text>
 ${[0,1,2].map(i=>`<circle cx="${282+i*12}" cy="${py+40}" r="3.4" fill="#E9EDF1" stroke="#173F70" stroke-width=".7"/>`).join('')}
 <rect x="336" y="${py+8}" width="12" height="40" rx="2" fill="url(#${p}alu)" stroke="#4A545F" stroke-width=".8"/>
 ${[py+18,py+38].map(y=>`<circle cx="356" cy="${y}" r="7" fill="#F4F6F8" stroke="#4A545F" stroke-width="1.2"/><path d="M356 ${y}l3.5 -3.5" stroke="#B4261F" stroke-width="1.2"/>`).join('')}
 <rect x="282" y="${py+58}" width="10" height="8" fill="url(#${p}nut)"/><rect x="304" y="${py+58}" width="10" height="8" fill="url(#${p}nut)"/>
 <path d="M287 ${py+66}v12q0 6 -6 6h-14" fill="none" stroke="#2B2F36" stroke-width="2.6"/>
 <rect x="318" y="${py+76}" width="26" height="22" rx="3" fill="url(#${p}alu)" stroke="#4A545F" stroke-width=".9"/><circle cx="331" cy="${py+87}" r="6" fill="#F4F6F8" stroke="#4A545F" stroke-width="1"/>
 <path d="M322 ${py+98}h18l-3 18h-12z" fill="url(#${p}alu)" stroke="#4A545F" stroke-width=".9"/>
 <path d="M331 ${py+76}V${py+66}" stroke="url(#${p}cu)" stroke-width="3" fill="none"/>
 <path d="M342 ${py+28}H376V${yt-30}Q376 ${yt-36} 370 ${yt-36}H312" fill="none" stroke="#C88A3D" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
 +ext(`M232 ${tp}H456M232 ${CL+68}H456`)+dim(450,tp,450,CL,'H1',444,(tp+CL)/2+56,'end')+dim(450,CL,450,CL+68,'H2',444,CL+38,'end')
 +ext(`M363 ${py+10}V${tp-34}`)+dim(X,tp-28,363,tp-28,'W',300,tp-33)
 +ext(`M130 ${yt-28}V${tp-14}M310 ${yt-28}V${tp-14}`)+dim(130,tp-8,310,tp-8,'ØD',X,tp-13)+LDIM()
 +lead(268,py+50,252,py+94)+note(150,py+106,'E/P positioner')+lead(344,py+108,360,py+128)+note(300,py+142,'Filter regulator')+lead(376,yt-6,392,yt-6)+note(380,yt-14,'Tubing','start');};

S.motor=p=>{const yt=GLOBE_TOP-30,hb=yt-104;return defs(p)+clines(hb-14)+ends(p)+globe(p)
 +`<path d="M200 ${GLOBE_TOP}V${yt+10}h10V${GLOBE_TOP}zM230 ${GLOBE_TOP}V${yt+10}h10V${GLOBE_TOP}z" fill="url(#${p}chrome)" stroke="#3B444E" stroke-width=".7"/>
 <rect x="216" y="${yt+8}" width="8" height="${GLOBE_TOP-yt-4}" fill="url(#${p}chrome)"/>
 <rect x="184" y="${yt}" width="72" height="12" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>
 <g filter="url(#${p}sh)"><rect x="166" y="${yt-88}" width="108" height="90" rx="12" fill="url(#${p}mot)" stroke="#2E3640" stroke-width="1"/></g>
 <rect x="178" y="${yt-80}" width="84" height="12" rx="3" fill="#6F7B88" opacity=".3"/>
 <rect x="198" y="${yt-58}" width="44" height="26" rx="4" fill="#1F2A36" stroke="#2E3640"/><text x="220" y="${yt-41}" font-size="9" fill="#7CE0A8" text-anchor="middle">68 %</text>
 <g filter="url(#${p}sh)"><rect x="96" y="${yt-74}" width="72" height="58" rx="8" fill="url(#${p}motb)" stroke="#2E3640" stroke-width="1"/></g>
 ${[106,114,122,130,138,146,154].map(x=>`<path d="M${x} ${yt-70}v50" stroke="#4F5A66" stroke-width="2" opacity=".7"/>`).join('')}
 <rect x="88" y="${yt-66}" width="10" height="42" rx="3" fill="url(#${p}motb)" stroke="#2E3640" stroke-width=".9"/>
 <g filter="url(#${p}sh)"><rect x="274" y="${yt-80}" width="52" height="72" rx="10" fill="url(#${p}motb)" stroke="#2E3640" stroke-width="1"/></g>
 <circle cx="300" cy="${yt-50}" r="17" fill="url(#${p}mot)" stroke="#2E3640" stroke-width="1"/><circle cx="300" cy="${yt-50}" r="7" fill="#C2272D" stroke="#7A1418"/><path d="M300 ${yt-57}v14" stroke="#F4F6F8" stroke-width="2.4"/>
 <circle cx="290" cy="${yt-22}" r="3.5" fill="#2E3640"/><circle cx="310" cy="${yt-22}" r="3.5" fill="#2E3640"/>
 ${[286,300,314].map(x=>`<rect x="${x-4}" y="${yt-8}" width="8" height="10" rx="1" fill="#2B2F36"/>`).join('')}
 <rect x="216" y="${hb+4}" width="8" height="${yt-88-hb-4}" fill="url(#${p}chrome)"/>
 <path d="M168 ${hb+10}h104v-7q0-6 -6-6h-92q-6 0 -6 6z" fill="#2B2F36" stroke="#14181D" stroke-width=".8"/><rect x="208" y="${hb-6}" width="24" height="6" rx="2" fill="#2B2F36"/>`
 +ext(`M232 ${hb-6}H448M232 ${CL+68}H448`)+dim(440,hb-6,440,CL,'H1',434,(hb+CL)/2,'end')+dim(440,CL,440,CL+68,'H2',434,CL+38,'end')
 +ext(`M88 ${yt-24}V${yt+30}`)+dim(88,yt+24,X,yt+24,'W',150,yt+19)+LDIM()
 +lead(120,yt-74,104,yt-92)+note(60,yt-96,'Motor')+lead(250,hb+3,290,hb-6)+note(294,hb-2,'Handwheel')+lead(318,yt-30,342,yt-14)+note(334,yt-2,'Local controls')+note(96,yt+52,'Electric actuator');};

S.esv=p=>{const yc=GLOBE_TOP-30;return defs(p)+clines(yc-120)+ends(p,100)
 +`<path filter="url(#${p}sh)" d="M104 ${CL-30}H140C150 ${CL-66} 182 ${CL-82} ${X} ${CL-82}S290 ${CL-66} 300 ${CL-30}H336V${CL+30}H300C290 ${CL+66} 258 ${CL+82} ${X} ${CL+82}S150 ${CL+66} 140 ${CL+30}H104Z" fill="url(#${p}body)" stroke="#1F2933" stroke-width="1.1"/>
 <path d="M140 ${CL-30}V${CL+30}M300 ${CL-30}V${CL+30}" stroke="#1F2933" stroke-width="1" opacity=".6"/>
 ${[CL-22,CL+22].map(y=>nut(p,146,y,6,7)+nut(p,294,y,6,7)).join('')}
 <path d="M160 ${CL-46}C178 ${CL-68} 200 ${CL-74} 214 ${CL-75}" fill="none" stroke="#C9D6E4" stroke-width="2" stroke-linecap="round" opacity=".55"/>
 <rect x="200" y="${CL-104}" width="40" height="24" rx="3" fill="url(#${p}cast)" stroke="#1F2933"/>
 <rect x="190" y="${CL-112}" width="60" height="9" rx="2" fill="url(#${p}cast)" stroke="#1F2933"/>
 <path d="M196 ${CL-112}V${yc+38}h10V${CL-112}zM234 ${CL-112}V${yc+38}h10V${CL-112}z" fill="url(#${p}yoke)" stroke="#1F2933" stroke-width=".8"/>
 <rect x="214" y="${yc+36}" width="12" height="${CL-112-yc-36}" fill="url(#${p}chrome)"/>
 <rect x="186" y="${yc+30}" width="68" height="10" rx="2" fill="url(#${p}cast)" stroke="#1F2933"/>
 <g filter="url(#${p}sh)">
 <rect x="62" y="${yc-24}" width="118" height="46" rx="4" fill="url(#${p}yel)" stroke="#6E4E0E" stroke-width="1"/>
 <rect x="52" y="${yc-32}" width="14" height="62" rx="3" fill="url(#${p}yeh)" stroke="#6E4E0E"/>
 <rect x="256" y="${yc-34}" width="150" height="66" rx="6" fill="url(#${p}yel)" stroke="#6E4E0E" stroke-width="1"/>
 <rect x="402" y="${yc-40}" width="14" height="78" rx="3" fill="url(#${p}yeh)" stroke="#6E4E0E"/>
 <rect x="176" y="${yc-36}" width="88" height="68" rx="8" fill="url(#${p}yel)" stroke="#6E4E0E" stroke-width="1"/></g>
 ${[yc-18,yc+16].map(y=>`<path d="M66 ${y}H176" stroke="#7D5A10" stroke-width="1.6" opacity=".7"/>`).join('')}
 ${[yc-28,yc+26].map(y=>`<path d="M262 ${y}H402" stroke="#7D5A10" stroke-width="1.2" opacity=".5"/>`).join('')}
 ${[yc-24,yc-4,yc+16].map(y=>nut(p,59,y,5,6)+nut(p,409,y-2,5,6)).join('')}
 <path d="M190 ${yc-20}h60M190 ${yc+18}h60" stroke="#7D5A10" stroke-width="1" opacity=".5"/>
 <rect x="198" y="${yc-78}" width="44" height="40" rx="6" fill="url(#${p}alu)" stroke="#4A545F" stroke-width="1"/>
 <path d="M206 ${yc-78}a14 12 0 0 1 28 0z" fill="#E5F5EA" stroke="#4A545F"/><path d="M214 ${yc-80}h12" stroke="#2E9E5B" stroke-width="3"/>
 <rect x="204" y="${yc-62}" width="32" height="12" rx="2" fill="#E9EDF1" stroke="#4A545F" stroke-width=".7"/><text x="220" y="${yc-53}" font-size="7.5" text-anchor="middle" fill="#2B323A">OPEN</text>
 <rect x="242" y="${yc-66}" width="10" height="8" fill="#2B2F36"/>
 <rect x="112" y="${yc-48}" width="34" height="22" rx="2" fill="url(#${p}alu)" stroke="#4A545F"/><rect x="118" y="${yc-72}" width="22" height="24" rx="3" fill="#2B2F36" stroke="#14181D"/><rect x="140" y="${yc-66}" width="8" height="7" fill="#2B2F36"/>
 <path d="M146 ${yc-38}H166V${yc-24}" fill="none" stroke="#C88A3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
 +ext(`M232 ${yc-92}H456M232 ${CL+82}H456`)+dim(450,yc-92,450,CL,'H1',444,(yc+CL)/2+40,'end')+dim(450,CL,450,CL+82,'H2',444,CL+46,'end')
 +ext(`M52 ${yc-34}V${yc-114}M416 ${yc-42}V${yc-114}`)+dim(52,yc-108,X,yc-108,'A',136,yc-113)+dim(X,yc-108,416,yc-108,'B',318,yc-113)
 +LDIM()
 +lead(128,yc-68,104,yc-84)+note(46,yc-88,'Solenoid valve')+lead(244,yc-72,282,yc-84)+note(286,yc-80,'Limit switch box')+lead(330,yc+30,342,yc+50)+note(312,yc+64,'Spring module')+lead(110,yc+22,104,yc+50)+note(52,yc+64,'Power cylinder')+lead(252,CL+44,300,CL+70)+note(304,CL+74,'Ball valve');};

const SIDE={};
SIDE.pneu=p=>{const yt=104,tp=DIAPH_TOP(yt);return defs(p)+`<path class="cl" d="M${X} ${tp-6}V${CL+90}"/><path class="cl" d="M120 ${CL}H320"/>`+globeSide(p)+yokeSide(p,yt)+diaph(p,yt)
 +ext(`M232 ${tp}H448M232 ${CL+68}H448`)+dim(440,tp,440,CL,'H1',434,(tp+CL)/2,'end')+dim(440,CL,440,CL+68,'H2',434,CL+38,'end')
 +ext(`M130 ${yt-28}V${tp-14}M310 ${yt-28}V${tp-14}`)+dim(130,tp-8,310,tp-8,'ØD',X,tp-13)
 +ext(`M174 ${CL+40}V${CL+112}M266 ${CL+40}V${CL+112}`)+dim(174,CL+104,266,CL+104,'ØF',X,CL+98)
 +lead(250,CL+30,300,CL+60)+note(304,CL+64,'Pipe flange');};
SIDE.posi=p=>{const yt=104,tp=DIAPH_TOP(yt),py=GLOBE_TOP-46;return defs(p)+`<path class="cl" d="M${X} ${tp-6}V${CL+90}"/><path class="cl" d="M120 ${CL}H320"/>`+globeSide(p)+yokeSide(p,yt)+diaph(p,yt)
 +`<g filter="url(#${p}sh)"><rect x="190" y="${py}" width="60" height="58" rx="7" fill="url(#${p}alu)" stroke="#4A545F"/><rect x="196" y="${py+6}" width="48" height="46" rx="5" fill="url(#${p}lid)" stroke="#173F70" stroke-width=".8"/></g>
 <rect x="203" y="${py+14}" width="34" height="14" rx="2" fill="#B9E3C6" stroke="#173F70" stroke-width=".8"/>
 ${[0,1,2].map(i=>`<circle cx="${208+i*12}" cy="${py+40}" r="3.4" fill="#E9EDF1" stroke="#173F70" stroke-width=".7"/>`).join('')}
 <rect x="250" y="${py+10}" width="34" height="36" rx="3" fill="url(#${p}alu)" stroke="#4A545F"/>${[py+20,py+36].map(y=>`<circle cx="276" cy="${y}" r="6" fill="#F4F6F8" stroke="#4A545F"/>`).join('')}
 <rect x="208" y="${py+60}" width="24" height="22" rx="3" fill="url(#${p}alu)" stroke="#4A545F"/><circle cx="220" cy="${py+71}" r="6" fill="#F4F6F8" stroke="#4A545F"/><path d="M211 ${py+82}h18l-3 16h-12z" fill="url(#${p}alu)" stroke="#4A545F"/>`
 +ext(`M232 ${tp}H456M232 ${CL+68}H456`)+dim(450,tp,450,CL,'H1',444,(tp+CL)/2+56,'end')+dim(450,CL,450,CL+68,'H2',444,CL+38,'end')
 +ext(`M284 ${py+46}V${py+116}`)+dim(X,py+110,284,py+110,'P',262,py+105)
 +ext(`M130 ${yt-28}V${tp-14}M310 ${yt-28}V${tp-14}`)+dim(130,tp-8,310,tp-8,'ØD',X,tp-13)
 +ext(`M174 ${CL+40}V${CL+112}M266 ${CL+40}V${CL+112}`)+dim(174,CL+104,266,CL+104,'ØF',X,CL+98)
 +lead(244,py+20,330,py+4)+note(334,py+8,'Positioner (face)');};
SIDE.motor=p=>{const yt=GLOBE_TOP-30,hb=yt-104;return defs(p)+`<path class="cl" d="M${X} ${hb-14}V${CL+90}"/><path class="cl" d="M120 ${CL}H320"/>`+globeSide(p)
 +`<path d="M200 ${GLOBE_TOP}V${yt+10}h10V${GLOBE_TOP}zM230 ${GLOBE_TOP}V${yt+10}h10V${GLOBE_TOP}z" fill="url(#${p}chrome)" stroke="#3B444E" stroke-width=".7"/>
 <rect x="184" y="${yt}" width="72" height="12" rx="2" fill="url(#${p}cast)" stroke="#1F2933" stroke-width="1"/>
 <g filter="url(#${p}sh)"><rect x="174" y="${yt-88}" width="92" height="90" rx="12" fill="url(#${p}mot)" stroke="#2E3640" stroke-width="1"/></g>
 <rect x="186" y="${yt-80}" width="68" height="12" rx="3" fill="#6F7B88" opacity=".3"/>
 <rect x="196" y="${yt-58}" width="48" height="30" rx="6" fill="url(#${p}motb)" stroke="#2E3640"/>${[204,220,236].map(x=>`<circle cx="${x}" cy="${yt-43}" r="3" fill="#2E3640"/>`).join('')}
 <rect x="216" y="${hb+4}" width="8" height="${yt-88-hb-4}" fill="url(#${p}chrome)"/>
 <path d="M168 ${hb+10}h104v-7q0-6 -6-6h-92q-6 0 -6 6z" fill="#2B2F36" stroke="#14181D" stroke-width=".8"/><rect x="208" y="${hb-6}" width="24" height="6" rx="2" fill="#2B2F36"/>`
 +ext(`M232 ${hb-6}H448M232 ${CL+68}H448`)+dim(440,hb-6,440,CL,'H1',434,(hb+CL)/2,'end')+dim(440,CL,440,CL+68,'H2',434,CL+38,'end')
 +ext(`M168 ${hb}V${hb-30}M272 ${hb}V${hb-30}`)+dim(168,hb-24,272,hb-24,'ØHW',X,hb-29)
 +ext(`M174 ${yt-20}V${yt+34}M266 ${yt-20}V${yt+34}`)+dim(174,yt+28,266,yt+28,'E',X,yt+23)
 +ext(`M174 ${CL+40}V${CL+112}M266 ${CL+40}V${CL+112}`)+dim(174,CL+104,266,CL+104,'ØF',X,CL+98);};
SIDE.esv=p=>{const yc=GLOBE_TOP-30;return defs(p)+`<path class="cl" d="M${X} ${yc-100}V${CL+100}"/><path class="cl" d="M110 ${CL}H330"/>`
 +`<circle filter="url(#${p}sh)" cx="${X}" cy="${CL}" r="80" fill="url(#${p}body)" stroke="#1F2933" stroke-width="1.1"/>`+flangeEnd(p,100)
 +`<rect x="200" y="${CL-104}" width="40" height="24" rx="3" fill="url(#${p}cast)" stroke="#1F2933"/>
 <rect x="190" y="${CL-112}" width="60" height="9" rx="2" fill="url(#${p}cast)" stroke="#1F2933"/>
 <path d="M196 ${CL-112}V${yc+38}h10V${CL-112}zM234 ${CL-112}V${yc+38}h10V${CL-112}z" fill="url(#${p}yoke)" stroke="#1F2933" stroke-width=".8"/>
 <rect x="186" y="${yc+30}" width="68" height="10" rx="2" fill="url(#${p}cast)" stroke="#1F2933"/>
 <g filter="url(#${p}sh)"><rect x="180" y="${yc-36}" width="80" height="68" rx="8" fill="url(#${p}yel)" stroke="#6E4E0E"/>
 <circle cx="${X}" cy="${yc-2}" r="39" fill="url(#${p}yel)" stroke="#6E4E0E"/></g>
 <circle cx="${X}" cy="${yc-2}" r="30" fill="none" stroke="#7D5A10" stroke-width="1.2" opacity=".6"/>${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return nut(p,X+34*Math.cos(a),yc-2+34*Math.sin(a),5,5);}).join('')}
 <rect x="198" y="${yc-82}" width="44" height="40" rx="6" fill="url(#${p}alu)" stroke="#4A545F"/><path d="M206 ${yc-82}a14 12 0 0 1 28 0z" fill="#E5F5EA" stroke="#4A545F"/><path d="M214 ${yc-84}h12" stroke="#2E9E5B" stroke-width="3"/>`
 +ext(`M232 ${yc-96}H456M232 ${CL+80}H456`)+dim(450,yc-96,450,CL,'H1',444,(yc+CL)/2+40,'end')+dim(450,CL,450,CL+80,'H2',444,CL+46,'end')
 +ext(`M181 ${yc+10}V${yc-112}M259 ${yc+10}V${yc-112}`)+dim(181,yc-106,259,yc-106,'ØS',X,yc-111)
 +ext(`M170 ${CL+45}V${CL+114}M270 ${CL+45}V${CL+114}`)+dim(170,CL+108,270,CL+108,'ØF',X,CL+102)
 +lead(252,yc+20,320,yc+40)+note(324,yc+44,'Spring module end cap');};

let n=0;
window.ACT_SIDE=(k,v)=>{VALS=v||null;const p='s'+(n++)+'_';return `<svg class="act-svg" viewBox="0 -44 470 444" role="img" aria-label="Side view with layout dimensions">${SIDE[k](p)}</svg>`;};
window.ACT_SVG=(k,v)=>{VALS=v||null;const p='a'+(n++)+'_';return `<svg class="act-svg" viewBox="0 -44 470 444" role="img" aria-label="${({pneu:'Pneumatic control valve',posi:'Control valve with electro-pneumatic positioner',motor:'Motorised control valve',esv:'Emergency shutdown valve'})[k]}, front elevation with layout dimensions">${S[k](p)}</svg>`;};
window.ACT_CSS=`
.act-svg{display:block;width:100%;height:auto;font-family:inherit}
.act-svg text{font-family:inherit}
.act-svg .cl{stroke:#7A8797;stroke-width:.9;stroke-dasharray:16 4 2 4;fill:none}
.act-svg .ct{fill:#7A8797;font-size:10px}
.act-svg .ex{stroke:#1849A9;stroke-width:.7;fill:none;opacity:.55}
.act-svg .dl{stroke:#1849A9;stroke-width:1.1;fill:none}
.act-svg .dh{fill:#1849A9}
.act-svg .dt{fill:#1849A9;font-size:13.5px;font-weight:650;paint-order:stroke;stroke:#F7F9FC;stroke-width:5px}
.act-svg .dv{fill:#0B1F3A;font-weight:600}
.act-svg .nt{fill:#3A4A5E;font-size:10.5px;paint-order:stroke;stroke:#F7F9FC;stroke-width:4px}
.act-svg .ld{stroke:#7A8797;stroke-width:.8;fill:none}
.act-svg .ldd{fill:#3A4A5E}`;
})();
/* Control valves page: pick style, vendor, rating and size; the values print on the front and side drawings.
   Drawings: ACT_SVG / ACT_SIDE (act-draw section above). Globals from app.js: U, SEL, setSel, store, seg, bindSeg, tbl, DN, N20, VD. */
(function(){
const P=document.getElementById('p-cv');if(!P)return;
if(!document.getElementById('cv-css')){const st=document.createElement('style');st.id='cv-css';st.textContent=ACT_CSS+`
#p-cv .ctrls{margin:16px 0 14px}
#p-cv .ctrls select{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 30px 0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);min-width:120px}
#p-cv .cv-box{border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet)}
#p-cv .cv-views{display:grid;grid-template-columns:1fr 1fr;background:#F7F9FC;background-image:linear-gradient(rgba(24,73,169,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,73,169,.05) 1px,transparent 1px);background-size:20px 20px}
#p-cv .cv-views figure{margin:0;padding:12px 14px 6px;min-width:0}
#p-cv .cv-views figure+figure{border-left:1px dashed #C9D3DF}
#p-cv .cv-views figcaption{font-size:12.5px;font-weight:600;color:#3A4A5E;margin:0 0 2px 4px}
#p-cv .cv-sum{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline;padding:14px 20px;border-top:1px solid var(--rule);font-size:13.5px;color:var(--ink-2)}
#p-cv .cv-sum b{color:var(--ink);font-size:15px}
#p-cv .cv-out{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;margin-top:16px;align-items:start}
#p-cv .cv-out td.na{color:var(--faint)}
#p-cv .cv-out td:nth-child(2),#p-cv .cv-out th:nth-child(2){text-align:left;white-space:normal}
#p-cv .cv-side{border:1px solid var(--rule);border-radius:12px;background:var(--sheet);padding:16px 18px}
#p-cv .cv-side h3{font-size:14px;margin:0 0 6px}
#p-cv .cv-side p{margin:0 0 12px;font-size:13.5px;line-height:1.55;color:var(--ink-2)}
#p-cv .cv-side ul{margin:0 0 4px;padding-left:18px;font-size:13.5px;line-height:1.5;color:var(--ink-2)}
#p-cv .cv-side li+li{margin-top:4px}
#p-cv .cv-src{margin:4px 0 0;font-size:12.5px;color:var(--muted)}
#p-cv .cv-src a{color:var(--muted)}
#p-cv .cv-calc{margin-top:16px;border:1px solid var(--rule);border-radius:10px;padding:10px 14px;background:var(--sheet)}
#p-cv .cv-calc summary{cursor:pointer;font-weight:600;font-size:14px}
#p-cv .cv-calc table{width:100%;border-collapse:collapse;margin-top:8px;font-size:13px}
#p-cv .cv-calc th{text-align:left;vertical-align:top;padding:6px 10px 6px 0;white-space:nowrap;width:1%}
#p-cv .cv-calc td{padding:6px 0;border-top:1px solid var(--rule);line-height:1.45}
#p-cv .cv-calc tr:first-child td{border-top:0}
#p-cv .cv-calc p{margin:8px 0 0;font-size:12.5px;color:var(--muted)}
@media (max-width:900px){#p-cv .cv-out{grid-template-columns:minmax(0,1fr)}}
@media (max-width:640px){#p-cv .cv-views{grid-template-columns:1fr}#p-cv .cv-views figure+figure{border-left:0;border-top:1px dashed #C9D3DF}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ published data (checked Nov 2026) */
const NPS_SM=['1/2','3/4','1','1-1/2','2','2-1/2','3','4','6'];
const ISA_N=['1/2','3/4','1','1-1/2','2','2-1/2','3','4','6','8','10','12','14','16'];
const BIGN=['18','20','24','26','28','30','32','34','36','38','40','42','44','46','48'];
const G_N=[...ISA_N,...BIGN];
const ORD=n=>{const i=BWN.indexOf(n);return i<0?999:i;};
/* ASME B16.47 Series A flange OD (in) [150,300,600], NPS 26–48 */
const B47={'26':[34.25,38.25,40],'28':[36.5,40.75,42.25],'30':[38.75,43,44.5],'32':[41.75,45.25,47],'34':[43.75,47.25,49],'36':[46,50,51.75],
 '38':[48.75,46,50],'40':[50.75,48.75,52],'42':[53,50.75,55.25],'44':[55.25,53.25,57.25],'46':[57.25,55.75,59.5],'48':[59.5,57.75,62.75]};
/* ASME B16.10 ball valve long pattern, NPS 26–36 [150,300,600]; Class 150 has no listed value so the Class 300 length is used */
const BL={'26':[1245,1245,1448],'28':[1346,1346,1549],'30':[1397,1397,1651],'32':[1524,1524,1778],'34':[1626,1626,1930],'36':[1727,1727,2083]};
const ISA={'1/2':[184,190,203],'3/4':[184,194,206],'1':[184,197,210],'1-1/2':[222,235,251],'2':[254,267,286],'2-1/2':[276,292,311],'3':[298,318,337],'4':[352,368,394],'6':[451,473,508],'8':[543,568,610],'10':[673,708,752],'12':[737,775,819],'14':[889,927,972],'16':[1016,1057,1108]};
const S3241={'1/2':[222,44],'3/4':[222,44],'1':[222,44],'1-1/2':[223,72],'2':[223,72],'2-1/2':[262,98],'3':[262,98],'4':[354,118],'6':[390,175]};
const S3271={'120':[168,69,110,2.5],'175v2':[215,78,110,6],'350':[280,82,110,8],'350v2':[280,92,110,11.5],'355v2':[280,131,110,15],'750v2':[394,236,190,36]};
const F667={'30':[297,289,15],'34':[445,333,22],'40':[445,333,23],'45':[667,406,41],'46':[1006,473,55],'50':[677,406,43],'60':[1006,473,55],'70':[1419,536,115],'76':[1006,473,86],'87':[1419,536,118]};
const CVL={'CVL-500':[2224,38.1,16],'CVL-1000':[4448,50.8,24],'CVL-1500':[6672,50.8,24],'CVL-5000':[22241,114.3,53]};
const S3375={'4':[100,350,350,118],'5':[125,400,363,144],'6':[150,480,390,175]};
const BG={'G01':[1380,'219'],'G2':[1509,'273–281'],'G3':[1676,'324–331'],'G4':[1949,'404'],'G5':[2278,'508'],'G7':[2708,'680'],'G8':[3593,'680'],'G10':[4331,'680']};
const DOC={
 hb:['Emerson Control Valve Handbook (ISA-75.08.01 table)','https://d1-auth.emerson.com/documents/automation/control-valve-handbook-en-3661206.pdf'],
 t8012:['SAMSON T 8012','https://www.samsongroup.com/document/t80120en.pdf'],
 f667:['Fisher bulletin 61.1:657','https://s1-live.emerson.com/documents/automation/product-bulletin-fisher-657-667-diaphragm-actuators-en-122352.pdf'],
 dvc:['Fisher DVC6200 bulletin','https://www.bkwinstruments.co.uk/wp-content/uploads/2015/06/Fisher-FIELDVUE-DVC6200-Digital-Valve.pdf'],
 cvl:['Rotork PUB042-001','https://instrumentationdemo.yodify.com/Documentation/Document/lnAov/pub042-001-00-0215.pdf'],
 t5875:['SAMSON T 5875','https://sed.samsongroup.com/document/t58750en.pdf'],
 bg:['Bettis G-series dimensions (mm)','https://s1-live.emerson.com/documents/automation/data-sheets-dimensions-%E2%80%93-pneumatic-mm-g-gc-series-bettis-en-en-6026348.pdf'],
 b1610:['ASME B16.10 (Valves page)','valves.html'],
 b165:['ASME B16.5 (Flanges page)','flanges.html'],
 b1647:['ASME B16.47 Series A (Flanges page)','flanges.html'],
 safe:['Pipe Ref safe-side rules (below)','#cvRules']};
const CI=c=>['150','300','600'].indexOf(c);

/* ---- safe-side envelope: conservative allowances for early layout, any vendor ----
   Pneumatic actuator bands use the larger Masoneilan 87/88 (air-to-open) heights and casing diameters,
   and SAMSON 3271 2800 cm² diameter for NPS 8 and up. Class 600 moves one band up (bigger actuator for higher ΔP). */
const up=(x,s)=>Math.ceil(x/s)*s,q=x=>Math.round(x*10)/10;
const OD=(n,c)=>{if(B47[n])return Math.round(B47[n][CI(c)]*25.4*10)/10;const f=typeof flRow==='function'?flRow(c,n):null;return f?f.O*25.4:null;};
const NUM=n=>n.split('-').reduce((a,x)=>a+(x.includes('/')?x.split('/')[0]/x.split('/')[1]:+x),0);
const PB=[[445,302],[547,373],[782,476],[845,549],[1110,770],[1400,900],[1800,1050]]; // [actuator height incl. handwheel-free top, casing Ø] per band
const pband=(n,c)=>{const i=G_N.indexOf(n),x=NUM(n);let b=x>=30?6:x>=18?5:i<=2?0:i<=4?1:i<=7?2:i===8?3:4;if(c==='600')b=Math.min(6,b+1);return b;};
const FR=['G01','G2','G3','G4','G5','G7','G8','G10'],CYLMAX={G01:362,G2:413,G3:514,G4:737,G5:946,G7:946,G8:1048,G10:1048},SPR={G01:219,G2:281,G3:331,G4:404,G5:508,G7:680,G8:680,G10:680};
const eframe=(n,c)=>{const i=N20.indexOf(n),x=NUM(n);let f=x>=32?7:x>=26?6:i<=9?0:i<=12?1:i<=14?2:i<=16?3:i<=18?4:5;f+=c==='300'?1:c==='600'?2:0;return FR[Math.min(FR.length-1,f)];};
function safeGlobe(n,c,kind){
 const x=NUM(n),ext=!ISA[n],L=ext?up(x*ISA['16'][CI(c)]/16,10):ISA[n][CI(c)],od=OD(n,c),[ha,dd]=PB[pband(n,c)],hb=1.2*L;
 const h2=up(Math.max(0.55*od,(S3241[n]||[0,0])[1]),10),huge=x>=18,big=G_N.indexOf(n)>=9,mid=G_N.indexOf(n)>=6;
 const o={L:ext?[L,'safe',4]:[L,'hb'],H2:[h2,'safe',3]};
 if(kind==='motor'){o.H1=[up(hb+ha+100,50),'safe',3];o.W=[huge?800:big?650:mid?550:450,'safe',3];o.E=[huge?550:big?450:mid?400:350,'safe',3];o['ØHW']=[huge?600:big?500:mid?400:300,'safe',3];}
 else{o.H1=[up(hb+ha,50),'safe',3];o['ØD']=[up(dd,10),'safe',3];if(kind==='posi'){o.W=[mid?400:350,'safe',3];o.P=[250,'safe',3];}}
 o._w=[];o._x=[['Headroom to remove the actuator, above H1',huge?800:mid?600:400,'safe']];
 const b=pband(n,c),L16=ext?ISA['16'][CI(c)]:0,bd=S3241[n]?S3241[n][1]:null,bandTxt=`actuator size band ${b+1} of 7${c==='600'?' (one band up for Class 600)':''}`;
 o._c=[
  ['L',ext?`No standard above NPS 16. NPS × L(NPS 16) ÷ 16 = ${x} × ${L16} ÷ 16 = ${q(x*L16/16)} → <b>${L}</b> (up to 10)`:`ISA-75.08.01 table, Class ${c} = <b>${L}</b>`],
  ['H1',`Body + bonnet 1.2 × L = 1.2 × ${L} = ${q(hb)}; + actuator height ${ha} (${bandTxt})${kind==='motor'?' + 100 handwheel':''} = ${q(hb+ha+(kind==='motor'?100:0))} → <b>${o.H1[0]}</b> (up to 50)`],
  ['H2',`Larger of 0.55 × ØF = 0.55 × ${q(od)} = ${q(0.55*od)}${bd?` and SAMSON body depth ${bd}`:''} → <b>${h2}</b> (up to 10)`]];
 if(kind==='motor')o._c.push(['W, E, ØHW',`Fixed allowances for NPS ${n}: ${o.W[0]}, ${o.E[0]}, ${o['ØHW'][0]}`]);
 else{o._c.push(['ØD',`Casing diameter for ${bandTxt} = ${dd} → <b>${o['ØD'][0]}</b> (up to 10)`]);if(kind==='posi')o._c.push(['W, P',`Fixed allowances: ${o.W[0]}, ${o.P[0]}`]);}
 return o;}
function safeEsv(n,c){
 const x=NUM(n),fr=eframe(n,c),k=Math.max(1,x/36),ov=BG[fr][0]*k,od=OD(n,c);let L,lf=['b1610'];
 if(BL[n]){L=BL[n][CI(c)];if(c==='150')lf=['safe',5];}
 else if(x>36){L=up(BL['36'][CI(c)]+(x-36)*(c==='600'?75:55),10);lf=['safe',4];}
 else{const arr=VD[c]&&VD[c].ballL;L=arr?arr[N20.indexOf(n)]:null;}
 const cy=CYLMAX[fr],sp=SPR[fr],L36=BL['36'][CI(c)],per=c==='600'?75:55;
 const _c=[
  ['L',lf[1]===4?`Above NPS 36: L(NPS 36) + (NPS − 36) × ${per} = ${L36} + ${x-36} × ${per} = ${L36+(x-36)*per} → <b>${L}</b> (up to 10)`:lf[1]===5?`ASME B16.10 lists no Class 150 length; Class 300 length used = <b>${L}</b>`:`ASME B16.10 long pattern, Class ${c} = <b>${L}</b>`],
  ['Frame',`NPS ${n} → Bettis ${fr}${c!=='150'?` (Class ${c} steps up ${c==='300'?'one frame':'two frames'})`:''}; overall length ${BG[fr][0]}${k>1?` × size factor ${x}/36 = ${q(ov)}`:''}`],
  ['H1',`ØF + cylinder Ø + switch box = ${q(od)} + ${cy} + 250 = ${q(od+cy+250)} → <b>${up(od+cy+250,50)}</b> (up to 50)`],
  ['H2',`0.6 × ØF = 0.6 × ${q(od)} = ${q(0.6*od)} → <b>${up(0.6*od,10)}</b> (up to 10)`],
  ['A',`0.45 × frame length = 0.45 × ${q(ov)} = ${q(0.45*ov)} → <b>${up(0.45*ov,50)}</b> (up to 50)`],
  ['B',`0.65 × frame length = 0.65 × ${q(ov)} = ${q(0.65*ov)} → <b>${up(0.65*ov,50)}</b> (up to 50)`],
  ['ØS',`Frame spring Ø ${sp}${k>1?` × √${(x/36).toFixed(2)} = ${q(sp*Math.sqrt(k))}`:''} → <b>${up(sp*Math.sqrt(k),10)}</b> (up to 10)`]];
 return {_c,L:[L,...lf],H1:[up(od+CYLMAX[fr]+250,50),'safe',3],H2:[up(0.6*od,10),'safe',3],A:[up(0.45*ov,50),'safe',3],B:[up(0.65*ov,50),'safe',3],'ØS':[up(SPR[fr]*Math.sqrt(k),10),'safe',3],
  _w:[],_x:[['Reference actuator frame (Bettis G-series)',fr+(k>1?' (scaled up '+Math.round((k-1)*100)+'%)':''),'bg',1],['Clear length beyond B to pull the spring module',up(0.4*ov,50),'safe']]};}

/* each vendor: ratings, sizes, an optional extra choice, and get() → {letter:[mm, doc, flag]} plus weights (_w) and extras (_x) */
const V={
 pneu:[
  {id:'safe',n:'Safe-side envelope',cls:['150','300','600'],sizes:G_N,get:(n,c)=>safeGlobe(n,c,'pneu')},
  {id:'samson',n:'SAMSON 3241 + 3271',cls:['150','300'],sizes:NPS_SM,opt:{n:'Actuator area (cm²)',list:Object.keys(S3271),def:n=>NPS_SM.indexOf(n)<=4?'350':'750v2'},
   get:(n,c,o)=>{const a=S3271[o],b=S3241[n];return {L:[ISA[n][CI(c)],'hb'],H1:[b[0]+a[1],'t8012'],H2:[b[1],'t8012'],'ØD':[a[0],'t8012'],_w:[['Actuator weight',a[3],'t8012']],_x:[['Removal clearance above actuator',a[2],'t8012']]};}},
  {id:'fisher',n:'Fisher 667 actuator',cls:['150','300','600'],sizes:ISA_N,opt:{n:'Actuator size',list:Object.keys(F667),def:n=>ISA_N.indexOf(n)<=4?'40':ISA_N.indexOf(n)<=8?'60':'87'},
   get:(n,c,o)=>{const a=F667[o];return {L:[ISA[n][CI(c)],'hb'],H1:[null],H2:[null],'ØD':[a[1],'f667'],_w:[['Actuator weight',a[2],'f667']],_x:[['Effective area',a[0]+' cm²','f667',1]]};}}],
 posi:[
  {id:'safe',n:'Safe-side envelope',cls:['150','300','600'],sizes:G_N,get:(n,c)=>safeGlobe(n,c,'posi')},
  {id:'samson',n:'SAMSON 3241 + 3271 + 3730',cls:['150','300'],sizes:NPS_SM,opt:{n:'Actuator area (cm²)',list:Object.keys(S3271),def:n=>NPS_SM.indexOf(n)<=4?'350':'750v2'},
   get:(n,c,o)=>{const a=S3271[o],b=S3241[n];return {L:[ISA[n][CI(c)],'hb'],H1:[b[0]+a[1],'t8012'],H2:[b[1],'t8012'],'ØD':[a[0],'t8012'],W:[null],P:[null],_w:[['Actuator weight',a[3],'t8012']],_x:[]};}},
  {id:'fisher',n:'Fisher 667 + DVC6200',cls:['150','300','600'],sizes:ISA_N,opt:{n:'Actuator size',list:Object.keys(F667),def:n=>ISA_N.indexOf(n)<=4?'40':ISA_N.indexOf(n)<=8?'60':'87'},
   get:(n,c,o)=>{const a=F667[o];return {L:[ISA[n][CI(c)],'hb'],H1:[null],H2:[null],'ØD':[a[1],'f667'],W:[null],P:[null],_w:[['Actuator weight',a[2],'f667'],['DVC6200 weight (aluminium)',3.5,'dvc']],_x:[]};}}],
 motor:[
  {id:'safe',n:'Safe-side envelope',cls:['150','300','600'],sizes:G_N,get:(n,c)=>safeGlobe(n,c,'motor')},
  {id:'samson',n:'SAMSON 3241 + 3375',cls:['PN 40'],sizes:Object.keys(S3375),
   get:n=>{const r=S3375[n];return {L:[r[1],'t5875'],H1:[null],H2:[r[3],'t5875'],W:[null],E:[null],'ØHW':[null],_w:[],_x:[['Body: centreline to actuator mounting (H1 on SAMSON drawing)',r[2],'t5875']]};}},
  {id:'rotork',n:'Rotork CVL',cls:['150','300','600'],sizes:ISA_N,opt:{n:'Actuator model',list:Object.keys(CVL),def:n=>ISA_N.indexOf(n)<=3?'CVL-500':ISA_N.indexOf(n)<=6?'CVL-1500':'CVL-5000'},
   get:(n,c,o)=>{const a=CVL[o];return {L:[ISA[n][CI(c)],'hb'],H1:[null],H2:[null],W:[null],E:[null],'ØHW':[null],_w:[['Actuator weight',a[2],'cvl']],_x:[['Rated thrust',a[0].toLocaleString()+' N','cvl',1],['Max stroke',a[1],'cvl']]};}}],
 esv:[
  {id:'safe',n:'Safe-side envelope',cls:['150','300','600'],sizes:'esv',get:(n,c)=>safeEsv(n,c)},
  {id:'bettis',n:'Bettis G-series + B16.10 ball valve',cls:['150','300','600'],sizes:null,opt:{n:'Actuator frame',list:Object.keys(BG),def:n=>{const i=N20.indexOf(n);return i<=9?'G01':i<=12?'G2':i<=14?'G3':i<=16?'G4':'G5';}},
   get:(n,c,o)=>{const arr=VD[c]&&VD[c].ballL,L=arr?arr[N20.indexOf(n)]:null,a=BG[o];return {L:[L,'b1610'],H1:[null],H2:[null],A:[null],B:[null],'ØS':[a[1],'bg',2],_w:[],_x:[['Overall length A + B',a[0],'bg']]};}}]
};
const STY=[['pneu','Pneumatic'],['posi','With E/P positioner'],['motor','Motorised'],['esv','ESV']];
const DESC={
 pneu:['Globe valve with spring-diaphragm actuator. Air moves the stem; the spring drives it to the fail position.',['Leave headroom above H1 to lift the actuator off.','Actuator upright where possible.']],
 posi:['Pneumatic valve with an electro-pneumatic positioner and filter regulator on the yoke.',['Face the positioner and gauges to the access side.','Keep room under the positioner for the regulator, tubing and cable entry.']],
 motor:['Globe valve with an electric linear actuator and handwheel. No instrument air.',['Handwheel within reach from grade or a platform.','Room for cable glands and to open the control cover.']],
 esv:['Ball valve with a spring-return scotch-yoke actuator, solenoid valve and limit switch box. Fails closed on a trip.',['Keep the spring side (B) clear for spring module removal.','Solenoid valve and switch box on the access side.']]};
const RULES={
 globe:`<h3 id="cvRules" style="margin-top:14px">How the safe-side values are set</h3><ul>
  <li>L and ØF are the standard values (ISA-75.08.01, ASME B16.5).</li>
  <li>H1 = 1.2 × L for the body and bonnet, plus the tallest common spring-diaphragm actuator for the size (Masoneilan 87/88 air-to-open heights; NPS 8 and up use the 23L size). Class 600 takes the next actuator up. Rounded up to 50 mm.</li>
  <li>H2 = the larger of 0.55 × flange OD and SAMSON's body depth, rounded up to 10 mm.</li>
  <li>ØD = casing diameter of that actuator (SAMSON 2800 cm² for NPS 8 and up).</li>
  <li>Positioner W 350–400 mm and P 250 mm; motorised W, E and handwheel are fixed allowances by size band.</li>
  <li>Above NPS 16 there is no standard globe length, so L is scaled from NPS 16 by size and rounded up. NPS 18 and up use larger actuator allowances. Flange OD is ASME B16.47 Series A from NPS 26.</li></ul>`,
 esv:`<h3 id="cvRules" style="margin-top:14px">How the safe-side values are set</h3><ul>
  <li>L and ØF are the standard values (ASME B16.10 long pattern, ASME B16.5).</li>
  <li>A reference Bettis G-series frame is picked by size; Class 300 takes one frame up and Class 600 two.</li>
  <li>A = 0.45 and B = 0.65 of that frame's overall length, so A + B is 10% over it. ØS is its spring module diameter.</li>
  <li>H1 = flange OD + largest cylinder diameter of the frame + 250 mm for the switch box. H2 = 0.6 × flange OD.</li>
  <li>NPS 26–36 lengths are ASME B16.10 (Class 150 takes the Class 300 length, as none is listed). Above NPS 36, L is extended from NPS 36 and the actuator is scaled up by size over 36. Flange OD is ASME B16.47 Series A from NPS 26.</li></ul>`};
const WHAT_BY={motor:{H1:'Pipe centreline to top of handwheel',W:'Stem centreline to end of motor'},esv:{H1:'Pipe centreline to top of limit switch box'}};
const WHAT={L:'Face-to-face',H1:'Pipe centreline to top of actuator',H2:'Pipe centreline to bottom of body','ØD':'Diaphragm casing diameter',W:'Stem centreline to far side of positioner',P:'Stem centreline to edge of gauge block',E:'Actuator housing width','ØHW':'Handwheel diameter',A:'Stem centreline to end of power cylinder',B:'Stem centreline to end of spring module','ØS':'Spring module diameter','ØF':'Pipe flange outside diameter'};

/* ------------------------------------------------------------ state */
const ld=(k,d)=>{try{return store.get(k,d)}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
let ST=ld('cvst','pneu');if(!V[ST])ST='pneu';
let VID=ld('cvv_'+ST,V[ST][0].id),CLS=ld('cvc','150'),OPT=null;
const ven=()=>V[ST].find(v=>v.id===VID)||V[ST][0];
const sizes=v=>v.sizes==='esv'?[...N20.filter(n=>{const a=VD[CLS]&&VD[CLS].ballL;return a&&a[N20.indexOf(n)]!=null;}),...BIGN.filter(n=>NUM(n)>24)]:v.sizes||N20.filter(n=>{const a=VD[CLS]&&VD[CLS].ballL;return a&&a[N20.indexOf(n)]!=null;});

/* ------------------------------------------------------------ format */
const fmt=x=>x==null?null:typeof x==='string'?(U==='mm'?x:x.split('–').map(s=>(s/25.4).toFixed(2)).join('–')):U==='mm'?(Number.isInteger(x)?String(x):x.toFixed(1)):(x/25.4).toFixed(2);
const fkg=x=>U==='mm'?`${x} kg`:`${(x*2.2046).toFixed(x<10?1:0)} lb`;
const LU=()=>U==='mm'?'mm':'in';
const srcLink=k=>`<a href="${DOC[k][1]}"${DOC[k][1].startsWith('http')?' target="_blank" rel="noopener"':''}>${DOC[k][0]}</a>`;
const clsLbl=c=>/^\d/.test(c)?`Class ${c}`:c;

function render(){
 const v=ven();if(!v.cls.includes(CLS))CLS=v.cls[0];
 const sz=sizes(v),inRange=sz.includes(SEL);
 let n=SEL;if(!inRange){const i=sz.findIndex(x=>ORD(x)>=ORD(SEL));n=sz[i<0?sz.length-1:i];}
 const saved=ld(`cvo_${ST}_${v.id}`,'');OPT=v.opt?(v.opt.list.includes(saved)?saved:v.opt.def(n)):null;
 const d=v.get(n,CLS,OPT),vals={};
 if(/^\d/.test(CLS)){const f=OD(n,CLS);if(f)d['ØF']=[Math.round(f*10)/10,B47[n]?'b1647':'b165'];}
 Object.keys(WHAT).forEach(k=>{if(d[k])vals[k]=d[k][0]==null?'—':fmt(d[k][0]);});
 const rows=Object.keys(WHAT).filter(k=>d[k]).map(k=>{const [x,,flag]=d[k];
  const tag=flag===4?' <small style="color:#9A6A08">(extrapolated, no standard length at this size)</small>':flag===5?' <small style="color:#9A6A08">(safe-side: Class 300 length, Class 150 not listed)</small>':flag===3?' <small style="color:#9A6A08">(safe-side allowance)</small>':flag===1?' <small style="color:var(--muted)">(as printed on the vendor drawing)</small>':flag===2?' <small style="color:var(--muted)">(end cap, from the frame drawing)</small>':'';
  return `<tr><td><b>${k}</b></td><td>${(WHAT_BY[ST]||{})[k]||WHAT[k]}${tag}</td><td${x==null?' class="na"':''}>${x==null?'See vendor GA':`${fmt(x)} ${LU()}`}</td></tr>`;});
 const extra=[...d._x.map(([t,x,,raw])=>`<tr><td></td><td>${t}</td><td>${raw?x:`${fmt(x)} ${LU()}`}</td></tr>`),...d._w.map(([t,x])=>`<tr><td></td><td>${t}</td><td>${fkg(x)}</td></tr>`)];
 const used=[...new Set([...Object.values(d).filter(a=>Array.isArray(a)&&typeof a[1]==='string').map(a=>a[1]),...d._w.map(a=>a[2]),...d._x.map(a=>a[2])].filter(k=>DOC[k]))];
 P.innerHTML=`<div class="phead"><div><h1>Control valves</h1><p>Pick a valve style, rating and size. Safe-side values fill every dimension for early layout; vendor data is there when you know the maker. Values in ${LU()}.</p></div></div>
 <div class="ctrls">
  <label class="ctrl"><span class="lbl">Valve style</span>${seg('cvst',STY,ST)}</label>
  <label class="ctrl"><span class="lbl">Data basis</span>${seg('cvven',V[ST].map(x=>[x.id,x.n]),v.id)}</label>
  <label class="ctrl"><span class="lbl">Rating</span>${seg('cvcls',v.cls.map(c=>[c,clsLbl(c)]),CLS)}</label>
  <label class="ctrl"><span class="lbl">Valve size</span><select id="cvSize">${sz.map(x=>`<option value="${x}"${x===n?' selected':''}>NPS ${x} (DN ${DN[x]})</option>`).join('')}</select></label>
  ${v.opt?`<label class="ctrl"><span class="lbl">${v.opt.n}</span><select id="cvOpt">${v.opt.list.map(x=>`<option${x===OPT?' selected':''}>${x}</option>`).join('')}</select></label>`:''}
 </div>
 ${inRange?'':`<p class="note" style="margin:-4px 0 12px">NPS ${SEL} is outside the ${v.n} range here, so NPS ${n} is shown.</p>`}
 <div class="cv-box"><div class="cv-views"><figure><figcaption>Front view</figcaption>${ACT_SVG(ST,vals)}</figure><figure><figcaption>Side view, along the pipe</figcaption>${ACT_SIDE(ST,vals)}</figure></div>
  <div class="cv-sum"><b>${v.n}</b><span>NPS ${n} · ${clsLbl(CLS)}${OPT?` · ${v.opt.n.replace(/ \(.*\)/,'')} ${OPT}`:''} · values in ${LU()}</span></div></div>
 <div class="cv-out"><div>${tbl(['Dim.','What it is','Value'],[...rows,...extra])}
  <p class="cv-src">Sources: ${used.map(srcLink).join(' · ')}</p>
  ${d._c?`<details class="cv-calc" open><summary>How these values were worked out (NPS ${n}, ${clsLbl(CLS)}, in mm)</summary>
   <table><tbody>${d._c.map(([k,t])=>`<tr><th>${k}</th><td>${t}</td></tr>`).join('')}${d['ØF']?`<tr><th>ØF</th><td>${B47[n]?'ASME B16.47 Series A':'ASME B16.5'} flange OD, ${clsLbl(CLS)} = <b>${d['ØF'][0]}</b></td></tr>`:''}</tbody></table>
   <p>"Up to 50" means rounded up to the next 50 mm, so every value errs on the large side.</p></details>`:''}</div>
  <div class="cv-side"><h3>About this assembly</h3><p>${DESC[ST][0]}</p><h3>Layout points</h3><ul>${DESC[ST][1].map(x=>`<li>${x}</li>`).join('')}</ul>
  ${v.id==='safe'?RULES[ST==='esv'?'esv':'globe']:''}
  <p class="note" style="margin-top:12px">${v.id==='safe'?'Safe-side values are deliberately generous so a layout made with them still fits the final valve. Replace them with the vendor\'s certified GA drawing once the valve is bought.':'"See vendor GA" means the vendor does not publish that dimension in a table; take it from the vendor\'s GA drawing. Values are for early layout.'}${v.opt?' The actuator size comes from the vendor\'s sizing for your duty.':''}</p></div></div>`;
 bind(v);
}
function keep(f){const y=scrollY;f();render();scrollTo(0,y);}
function bind(v){
 bindSeg('cvst',x=>keep(()=>{ST=x;sv('cvst',x);VID=ld('cvv_'+x,V[x][0].id);}));
 bindSeg('cvven',x=>keep(()=>{VID=x;sv('cvv_'+ST,x);}));
 bindSeg('cvcls',x=>keep(()=>{CLS=x;sv('cvc',x);}));
 const s=P.querySelector('#cvSize');s.onchange=()=>{const y=scrollY;if(typeof setSel==='function')setSel(s.value);else{SEL=s.value;render();}scrollTo(0,y);};
 const o=P.querySelector('#cvOpt');if(o)o.onchange=()=>keep(()=>sv(`cvo_${ST}_${v.id}`,o.value));
}
render();
window.renderCV=()=>{const y=scrollY;render();scrollTo(0,y);};
})();
