/* Pipe supports page: "Where to support" – typical support arrangements around equipment and on racks.
   General layout practice written for Pipe Ref; drawings are schematic, not to scale. */
const P=document.getElementById('p-sup');
if(!document.getElementById('sl-css')){const st=document.createElement('style');st.id='sl-css';st.textContent=`
#p-sup .sl{margin-top:34px}
#p-sup .sl-h{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:12px}
#p-sup .sl-h h2{font-size:22px;margin:0 0 4px}#p-sup .sl-h p{margin:0;color:var(--muted);font-size:14px;max-width:62ch;line-height:1.5}
#p-sup .sl-wrap{display:grid;grid-template-columns:220px minmax(0,1fr);gap:0;border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:var(--sheet)}
#p-sup .sl-list{border-right:1px solid var(--rule);padding:8px;display:flex;flex-direction:column;gap:2px;background:var(--paper,#F7F9FC)}
#p-sup .sl-list button{all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;font-size:14px;color:var(--ink-2)}
#p-sup .sl-list button svg{width:20px;height:20px;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
#p-sup .sl-list button:hover{background:var(--sheet)}#p-sup .sl-list button:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
#p-sup .sl-list button[aria-selected=true]{background:var(--sheet);color:var(--accent);font-weight:600;box-shadow:inset 3px 0 0 var(--accent)}
#p-sup .sl-body{display:grid;grid-template-columns:minmax(0,1fr);min-width:0}
#p-sup .sl-fig{padding:14px 18px 8px;border-bottom:1px solid var(--rule);min-width:0}#p-sup .sl-fig svg{max-height:430px}
#p-sup .sl-fig svg{width:100%;height:auto;display:block}
#p-sup .sl-key{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:var(--muted);padding:6px 4px 2px}
#p-sup .sl-key span{display:inline-flex;align-items:center;gap:5px}
#p-sup .sl-key b{display:inline-grid;place-items:center;min-width:17px;height:17px;padding:0 3px;border-radius:3px;background:#FACC15;color:#1F2937;box-shadow:inset 0 0 0 1px #C99A06;font-size:10px;font-weight:700}
#p-sup .sl-txt{padding:18px 20px;min-width:0}
#p-sup .sl-txt h3{font-size:18px;margin:0 0 4px}#p-sup .sl-txt .sl-sub{color:var(--muted);font-size:13.5px;margin:0 0 12px;line-height:1.5}
#p-sup .sl-txt ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 22px}
#p-sup .sl-txt li{display:grid;grid-template-columns:24px minmax(0,1fr);gap:10px;font-size:14px;line-height:1.55;color:var(--ink-2);padding:6px 8px;margin:0 -8px;border-radius:8px;cursor:default}
#p-sup .sl-txt li i{font-style:normal;width:22px;height:22px;border-radius:50%;background:#1849A9;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:700;margin-top:1px}
#p-sup .sl-txt li.on{background:var(--accent-soft,#E8EFFD)}
#p-sup .sl-fig .mk circle{fill:#1849A9;stroke:#fff;stroke-width:2}#p-sup .sl-fig .mk text{fill:#fff;font:700 12px Geist,system-ui,sans-serif;text-anchor:middle;dominant-baseline:central}
#p-sup .sl-fig .mk{cursor:pointer;transition:transform .15s;transform-box:fill-box;transform-origin:center}#p-sup .sl-fig .mk.on{transform:scale(1.25)}#p-sup .sl-fig .mk.on circle{fill:#0B2F75;stroke:#93B4F5;stroke-width:3}
#p-sup .sl-note{font-size:12.5px;color:var(--muted);margin:10px 0 0}
[data-theme=dark] #p-sup .sl-fig svg{--eq:#22324D;--eqs:#8A9BB5;--ink3:#D8E0EC;--gnd:#6B7C96;--lbl:#A9B6C9}
@media (max-width:1100px){#p-sup .sl-txt ol{grid-template-columns:1fr}}
@media (max-width:760px){#p-sup .sl-wrap{grid-template-columns:1fr}#p-sup .sl-list{flex-direction:row;overflow-x:auto;border-right:0;border-bottom:1px solid var(--rule);scrollbar-width:none}
 #p-sup .sl-list button{white-space:nowrap;padding:8px 12px}#p-sup .sl-list button[aria-selected=true]{box-shadow:inset 0 -3px 0 var(--accent)}#p-sup .sl-list button svg{display:none}
 #p-sup .sl-fig{padding:8px}#p-sup .sl-txt{padding:14px 16px}}
`;document.head.appendChild(st);}

/* ---------- drawing helpers (viewBox 600 x 380) ---------- */
const PC='var(--ink3,#2B3A55)',EQ='var(--eq,#E9EEF6)',EQS='var(--eqs,#6B7C96)',SC='#C99A06',SF='#FACC15',ST='#1F2937',LB='var(--lbl,#4A5A72)';
const ln=(d,w=7,c=PC,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${x}/>`;
const pp=d=>ln(d,7);                                   /* process pipe */
const sb=d=>ln(d,3.5);                                 /* small bore */
const rect=(x,y,w,h,r=4,ex='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${EQ}" stroke="${EQS}" stroke-width="1.6"${ex}/>`;
const tx=(x,y,s,a='start',sz=13,w=500)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${sz}" font-weight="${w}" fill="${LB}" font-family="Geist,system-ui,sans-serif">${s}</text>`;
const gnd=(x0,x1,y=340)=>{let s=`<path d="M${x0} ${y}H${x1}" stroke="var(--gnd,#8796AD)" stroke-width="1.6"/>`;for(let x=x0+6;x<x1;x+=12)s+=`<path d="M${x} ${y+1}l-7 8" stroke="var(--gnd,#8796AD)" stroke-width="1"/>`;return s;};
const beam=(x0,x1,y)=>`<rect x="${x0}" y="${y-4}" width="${x1-x0}" height="8" fill="var(--gnd,#8796AD)" opacity=".55"/><path d="M${x0} ${y-6}H${x1}M${x0} ${y+6}H${x1}" stroke="var(--gnd,#8796AD)" stroke-width="2"/>`;
/* support tag: square with letter touching the pipe; side = below/above/left/right; to = coordinate of ground/steel for the post */
function sup(x,y,L,side='below',to=null,half=3.5){const w=L.length>1?22:16,h=16,off=half+h/2+1;let cx=x,cy=y;
 if(side==='below')cy=y+off;else if(side==='above')cy=y-off;else if(side==='left')cx=x-off-(w-h)/2;else cx=x+off+(w-h)/2;
 let post='';if(to!=null){if(side==='below')post=`<path d="M${cx} ${cy+h/2}V${to}" stroke="${SC}" stroke-width="2"/><path d="M${cx-8} ${to}h16" stroke="${SC}" stroke-width="3"/>`;
  if(side==='above')post=`<path d="M${cx} ${cy-h/2}V${to}" stroke="${SC}" stroke-width="2"/>`;
  if(side==='left')post=`<path d="M${cx-w/2} ${cy}H${to}" stroke="${SC}" stroke-width="2"/>`;if(side==='right')post=`<path d="M${cx+w/2} ${cy}H${to}" stroke="${SC}" stroke-width="2"/>`;}
 return post+`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="3" fill="${SF}" stroke="${SC}" stroke-width="1"/><text x="${cx}" y="${cy+.5}" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-weight="700" fill="${ST}" font-family="Geist,system-ui,sans-serif">${L}</text>`;}
/* plan-view tag sitting on the pipe */
const tag=(x,y,L)=>{const w=L.length>1?22:16;return `<rect x="${x-w/2}" y="${y-8}" width="${w}" height="16" rx="3" fill="${SF}" stroke="${SC}" stroke-width="1"/><text x="${x}" y="${y+.5}" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-weight="700" fill="${ST}" font-family="Geist,system-ui,sans-serif">${L}</text>`;};
const gate=(x,y,v=false,s=12)=>v?`<path d="M${x-s*.8} ${y-s}L${x+s*.8} ${y-s}L${x-s*.8} ${y+s}L${x+s*.8} ${y+s}Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2" stroke-linejoin="round"/>`
 :`<path d="M${x-s} ${y-s*.8}L${x-s} ${y+s*.8}L${x+s} ${y-s*.8}L${x+s} ${y+s*.8}Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2" stroke-linejoin="round"/>`;
const globe=(x,y,v=false,s=12)=>gate(x,y,v,s)+`<circle cx="${x}" cy="${y}" r="3.6" fill="${PC}"/>`;
const check=(x,y,s=12)=>`<path d="M${x-s*.8} ${y+s}L${x+s*.8} ${y+s}L${x-s*.8} ${y-s}L${x+s*.8} ${y-s}Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2" stroke-linejoin="round"/><path d="M${x-s*.8} ${y-s}L${x+s*.8} ${y+s}" stroke="${PC}" stroke-width="2.2"/>`;
const flg=(x,y,v=false)=>v?`<path d="M${x-10} ${y}h20" stroke="${PC}" stroke-width="3"/>`:`<path d="M${x} ${y-10}v20" stroke="${PC}" stroke-width="3"/>`;
const arr=(x1,y1,x2,y2,c='#1849A9',w=2)=>{const a=Math.atan2(y2-y1,x2-x1),h=8;return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}"/><path d="M${x2} ${y2}L${x2-h*Math.cos(a-.45)} ${y2-h*Math.sin(a-.45)}L${x2-h*Math.cos(a+.45)} ${y2-h*Math.sin(a+.45)}Z" fill="${c}"/>`;};
const mk=(n,x,y)=>`<g class="mk" data-n="${n}"><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y}">${n}</text></g>`;
const bracket=(x0,x1,y,lab)=>`<path d="M${x0} ${y+6}V${y}H${x1}V${y+6}" fill="none" stroke="${LB}" stroke-width="1.3"/>`+tx((x0+x1)/2,y-5,lab,'middle',11);
const svg=b=>`<svg viewBox="0 0 600 380" role="img">${b}</svg>`;

/* ---------- the arrangements ---------- */
const T=[
{id:'pump',name:'Pump suction & discharge',ic:'<circle cx="9" cy="13" r="5"/><path d="M14 10h7v6h-7M2 13h2M9 8V3"/>',
 sub:'Centrifugal pump, end suction and top discharge. Elevation.',
 key:'AD R H',
 fig:()=>svg(gnd(30,580)+
  rect(290,292,240,9,1)+rect(300,301,220,39,2)+                                   /* baseplate + plinth */
  `<circle cx="350" cy="250" r="38" fill="${EQ}" stroke="${EQS}" stroke-width="1.6"/>`+rect(330,286,40,7,1)+
  rect(392,242,28,16,2)+rect(420,222,100,60,6)+tx(470,256,'Motor','middle',13.5,600)+tx(350,254,'Pump','middle',13.5,600)+
  pp('M40 250H270')+`<path d="M270 243L292 247V253L270 257Z" fill="${EQ}" stroke="${PC}" stroke-width="2"/>`+pp('M292 250H312')+flg(296,250)+
  gate(190,250)+flg(176,250)+flg(204,250)+bracket(212,312,222,'Removable spool')+
  pp('M350 212V82Q350 70 338 70H40')+check(350,168)+gate(350,120,true)+
  beam(150,300,22)+sup(200,70,'H','above',26)+
  sup(240,250,'AD','below',340)+sup(100,250,'R','below',340)+
  tx(44,240,'From tank')+tx(44,60,'To header')+
  mk(1,262,300)+mk(2,262,196)+mk(3,224,44)+mk(4,388,198)),
 pts:['Put an adjustable support close to the suction and discharge nozzles. It takes the pipe weight off the nozzle and lets the fitter line the pipe up to the nozzle without forcing it.',
  'Leave a short flanged spool between the nozzle and the first valve, for the start-up strainer and so the pump can come out. The supports must stay in place when the spool is removed.',
  'Carry the vertical discharge run, with its check and isolation valves, from a support at the top elbow. Then the valve weight sits on steel, not on the pump.',
  'Do not support pipes from the pump casing or baseplate unless the vendor allows it. Nozzle loads must stay within the pump standard (API 610 for process pumps); the stress engineer checks them.']},

{id:'hx',name:'Shell & tube exchanger',ic:'<rect x="5" y="8" width="15" height="8" rx="4"/><path d="M5 8v8M2 12h3M9 8V5M17 8V5"/>',
 sub:'Horizontal exchanger on a fixed and a sliding saddle. Elevation.',
 key:'R H',
 fig:()=>svg(gnd(30,580)+
  `<rect x="40" y="150" width="96" height="120" rx="6" fill="none" stroke="#1849A9" stroke-width="1.5" stroke-dasharray="6 5"/>`+tx(88,205,'Bundle','middle',13.5,600)+tx(88,221,'pull area','middle',13.5,600)+tx(88,237,'keep clear','middle',12.5)+
  rect(200,170,270,80,40)+rect(152,160,48,100,4)+rect(141,156,11,108,2)+tx(335,214,'Shell','middle',13.5,600)+tx(176,214,'Ch.','middle',12.5,600)+
  `<path d="M232 250h36l8 50h-52Z" fill="${EQ}" stroke="${EQS}" stroke-width="1.6"/><path d="M402 250h36l8 50h-52Z" fill="${EQ}" stroke="${EQS}" stroke-width="1.6"/>`+
  rect(222,300,56,40,2)+rect(392,300,56,40,2)+tx(250,358,'Fixed','middle',12.5)+tx(420,358,'Sliding','middle',12.5)+
  pp('M176 160V92Q176 80 164 80H40')+flg(176,144,true)+flg(176,112,true)+
  pp('M176 260V288Q176 300 164 300H40')+
  pp('M440 170V92Q440 80 452 80H580')+
  beam(100,180,22)+sup(140,80,'H','above',26)+sup(100,300,'R','below',340)+sup(540,80,'R','below',340)+
  arr(452,212,500,212,'#1849A9',2)+tx(506,216,'Shell grows','start',12.5)+
  tx(44,70,'Tube side in')+tx(44,290,'Tube side out')+tx(576,70,'Shell side in','end')+
  mk(1,128,166)+mk(2,200,128)+mk(3,420,276)+mk(4,562,150)),
 pts:['Keep the tube bundle pull area in front of the channel clear of pipes, supports and platform steel. Allow room for a bundle extractor or crane.',
  'Use flanged spools at the channel nozzles so the channel and its cover can come off without cutting pipe.',
  'The shell grows away from the fixed saddle. Lines on the sliding end must be able to follow that movement; hot exchangers get a stress check.',
  'Support the lines from grade or structure near the nozzle elbows, not from the shell. Clips on the shell need the vendor\'s agreement.']},

{id:'col',name:'Column (tall vessel)',ic:'<rect x="8" y="2" width="8" height="20" rx="4"/><path d="M8 6H4v14"/>',
 sub:'Overhead line running down the side of a column. Elevation.',
 key:'R G S',
 fig:()=>svg(gnd(30,580)+
  `<path d="M330 340V56Q330 20 370 20Q410 20 410 56V340" fill="${EQ}" stroke="${EQS}" stroke-width="1.6"/>`+tx(370,200,'Column','middle',13.5,600)+
  pp('M330 60H302Q290 60 290 72V288Q290 300 278 300H40')+flg(316,60)+
  sup(290,96,'R','right',330)+sup(290,170,'G','right',330)+sup(290,240,'G','right',330)+
  sup(190,300,'S','below',340)+sup(80,300,'R','below',340)+
  arr(436,300,436,70,'#1849A9',2)+tx(446,180,'Column','start',12.5)+tx(446,195,'grows up','start',12.5)+tx(446,210,'when hot','start',12.5)+
  tx(44,290,'To condenser')+
  mk(1,264,96)+mk(2,264,205)+mk(3,214,272)+mk(4,370,112)),
 pts:['One support near the top nozzle carries the weight of the vertical line. It is a clip on the column, so it moves up with the column as it heats.',
  'Below it, use guides only, spaced to the guide spacing table, so the pipe can slide as the column and the pipe grow by different amounts.',
  'At the bottom elbow the column and pipe have grown differently. A spring support, or enough leg length, stops the first support lifting off or pushing on the nozzle.',
  'The vessel fabricator welds the clips. Send their positions and loads early, before the vessel drawings are frozen.']},

{id:'psv',name:'Relief valve (PSV)',ic:'<path d="M12 22v-8M12 14h8M9 4h6v6H9zM12 10v4"/>',
 sub:'PSV on a vessel top, discharging to a closed flare header. Elevation.',
 key:'A R',
 fig:()=>svg(gnd(30,580)+
  rect(60,170,180,180,4)+tx(150,268,'Vessel','middle',13.5,600)+
  pp('M150 170V122')+flg(150,124,true)+
  `<path d="M138 120L162 120L150 100Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2" stroke-linejoin="round"/><path d="M150 100L170 88V112Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2" stroke-linejoin="round"/>`+
  `<rect x="142" y="58" width="16" height="36" rx="3" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2"/>`+tx(122,72,'PSV','end',13.5,600)+
  pp('M172 100L380 112Q392 113 397 123L446 252')+flg(176,100)+
  pp('M380 260H580')+tx(576,250,'Flare header','end')+
  sup(268,106,'A','below',340)+sup(520,260,'R','below',340)+
  arr(196,82,160,82,'#C2412A',2.2)+tx(200,80,'Reaction','start',12.5)+
  tx(300,92,'slope ↘','middle',12.5)+
  mk(1,124,146)+mk(2,330,72)+mk(3,296,160)+mk(4,476,222)+mk(5,110,36)),
 pts:['Keep the inlet line short and straight off the top of the vessel or line, so the pressure loss stays small (API 520 Part 2 asks for under 3% of set pressure).',
  'Run the outlet with a continuous fall towards the header. No pockets, so liquid drains away.',
  'When the valve opens, the flow out pushes back on the outlet (the reaction force). Put a strong support or anchor near the outlet so the force goes into steel, not into the valve or the inlet nozzle.',
  'Enter the header from the top, at 45° or square. Never from below.',
  'Plan the supports so the valve can be lifted out for testing without taking them off.']},

{id:'rack',name:'Pipe rack line with loop',ic:'<path d="M3 6v14M9 6v14M15 6v14M21 6v14M2 12h20"/>',
 sub:'Two lines on a pipe rack, one with an expansion loop. Plan view.',
 key:'R G A',
 fig:()=>{let s='';const B=[60,140,220,300,380,460,540];
  B.forEach(x=>s+=`<path d="M${x} 70V310" stroke="var(--gnd,#8796AD)" stroke-width="5" opacity=".45"/>`);
  s+=tx(300,350,'Rack beams (plan)','middle',11);
  s+=pp('M30 130H298Q310 130 310 118V52Q310 40 322 40H358Q370 40 370 52V118Q370 130 382 130H580');
  s+=tag(60,130,'A')+tag(140,130,'R')+tag(220,130,'G')+tag(300,130,'R')+tag(380,130,'R')+tag(460,130,'G')+tag(540,130,'A');
  s+=pp('M30 240H580')+pp('M420 240V330')+gate(420,296,true)+gate(92,240);
  s+=`<path d="M114 200V280" stroke="var(--gnd,#8796AD)" stroke-width="3" stroke-dasharray="5 4"/>`;
  s+=tag(60,240,'R')+tag(114,240,'R')+tag(140,240,'R')+tag(220,240,'G')+tag(300,240,'R')+tag(380,240,'R')+tag(460,240,'R')+tag(540,240,'G');
  s+=tx(340,30,'Loop','middle',12.5)+tx(34,156,'Line 1')+tx(34,266,'Line 2');
  s+=mk(1,140,272)+mk(2,220,100)+mk(3,60,100)+mk(4,446,280)+mk(5,88,206);
  /* fix overlap: guide tag at 220 sits next to secondary support at 200 */
  return svg(s);},
 pts:['Rest the line on every rack beam. Check the span against the support span table for the size and contents.',
  'Guide each side of the loop, a few beams away, so the line grows into the loop and does not walk sideways off the rack.',
  'Anchors fix where growth starts. With two loops, put an anchor between them so each loop takes its own share.',
  'A branch moves with its header. Give it some flexibility at the take-off, and do not put a guide or stop right at the branch.',
  'A heavy valve needs a support close by. If it falls mid-span, add secondary steel between the beams.']},

{id:'cv',name:'Control valve station',ic:'<path d="M2 16h20M7 16V8h10v8M12 16v-5"/><circle cx="12" cy="9" r="2"/>',
 sub:'Control valve with block valves and a bypass. Elevation.',
 key:'AD H',
 fig:()=>svg(gnd(30,580)+
  pp('M40 260H560')+pp('M100 260V122Q100 110 112 110H488Q500 110 500 122V260')+
  gate(150,260)+gate(450,260)+globe(300,260)+`<path d="M300 248V214" stroke="${PC}" stroke-width="2.5"/><path d="M276 214Q300 186 324 214Z" fill="var(--sheet,#fff)" stroke="${PC}" stroke-width="2.2"/>`+
  globe(300,110)+tx(300,180,'CV','middle',12.5,600)+
  sup(70,260,'AD','below',340)+sup(530,260,'AD','below',340)+
  beam(150,250,26)+sup(200,110,'H','above',30)+
  tx(300,90,'Bypass','middle',12.5)+
  mk(1,96,306)+mk(2,150,228)+mk(3,226,64)+mk(4,350,206)),
 pts:['Support the station on both sides, close to the block valves, with adjustable supports. Then any valve can be removed without the pipe dropping.',
  'Size those supports for the valves plus the line full of water, for the hydrotest.',
  'Support the bypass on its own, so its globe valve does not hang off the tees.',
  'Leave room around the control valve for the actuator, the handwheel and removal, at a height that can be reached from grade or a platform.']},

{id:'tank',name:'Storage tank nozzle',ic:'<path d="M10 4h11v16H10zM10 16H5V9H2"/>',
 sub:'Bottom outlet nozzle of a flat-bottom tank. Elevation.',
 key:'S R',
 fig:()=>svg(gnd(30,580)+
  rect(360,60,240,280,0)+`<path d="M360 60H600" stroke="${EQS}" stroke-width="1.6"/>`+tx(480,180,'Tank','middle',13.5,600)+
  pp('M360 290H272Q260 290 260 278V212Q260 200 248 200H40')+flg(346,290)+gate(318,290)+flg(304,290)+flg(332,290)+
  sup(318,290,'S','below',340)+sup(120,200,'R','below',340)+
  arr(480,292,480,330,'#C2412A',2.2)+tx(492,316,'Settles','start',12.5)+
  tx(44,190,'To pumps')+
  mk(1,456,268)+mk(2,286,322)+mk(3,236,246)+mk(4,146,232)),
 pts:['A tank settles as it fills, and over the years. The shell near a bottom nozzle also rotates under the liquid head. The nozzle moves, so the pipe must follow it.',
  'Under a heavy valve at the nozzle, use a spring or a support the stress engineer approves, not a rigid rest that stops the nozzle moving down.',
  'Give the line an L or Z bend before the first fixed support, so it bends instead of loading the nozzle. Some projects use a bellows or hose where the spec calls for one.',
  'The first rigid support comes after the bend, on its own foundation.']},

{id:'sbc',name:'Small-bore branches',ic:'<path d="M2 16h20M8 16V7M5 7h6M16 16V9"/>',
 sub:'Vents and drains on a pump discharge line. Elevation.',
 key:'B',
 fig:()=>svg(gnd(30,580)+
  ln('M40 250H560',11)+
  sb('M150 245V140')+gate(150,184,true,9)+`<path d="M142 140h16" stroke="${PC}" stroke-width="3"/>`+
  `<path d="M150 200L204 244" stroke="${SC}" stroke-width="3"/><path d="M150 214L96 244" stroke="${SC}" stroke-width="3"/>`+
  `<rect x="198" y="208" width="16" height="16" rx="3" fill="${SF}" stroke="${SC}" stroke-width="1"/><text x="206" y="216.5" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-weight="700" fill="${ST}" font-family="Geist,system-ui,sans-serif">B</text>`+
  tx(150,124,'Braced vent','middle',12.5,600)+
  sb('M300 255V306')+gate(300,284,true,9)+`<path d="M292 306h16" stroke="${PC}" stroke-width="3"/>`+tx(318,300,'Short drain','start',12.5,600)+
  sb('M460 245V120')+gate(460,148,true,11)+`<path d="M450 120h20" stroke="${PC}" stroke-width="3"/>`+
  `<path d="M452 238l8-6-6-6 8-6" fill="none" stroke="#C2412A" stroke-width="2.4"/>`+tx(472,208,'Long, heavy,','start',12.5,600)+tx(472,223,'unbraced:','start',12.5,600)+tx(472,238,'cracks here','start',12.5,600)+
  arr(410,160,440,160,'#C2412A',1.8)+arr(510,160,480,160,'#C2412A',1.8)+tx(460,100,'Vibration','middle',12.5)+
  tx(556,276,'Pump discharge','end'),
  ),
 fig2:true,
 pts:['A small branch with a valve on it is a weight on a stick. With pump or flow vibration it can crack at the weld to the header.',
  'Brace the branch back to its own header in two directions, so the branch and the header move as one. Do not brace it to separate steel.',
  'Keep small branches short with the valve close to the header. On vibrating lines, use the heavier branch fittings your piping class allows.'],
 mks:[[1,428,200],[2,236,214],[3,274,300]]},

{id:'spr',name:'Hot nozzle & spring support',ic:'<path d="M4 4v16M4 8h10v10"/><path d="M11 3l3 2-3 2 3 2"/>',
 sub:'Hot line leaving a vessel nozzle that rises when the vessel heats. Elevation.',
 key:'S R',
 fig:()=>svg(gnd(30,580)+
  rect(60,60,100,280,8)+tx(110,220,'Hot','middle',13.5,600)+tx(110,236,'vessel','middle',13.5,600)+
  pp('M160 110H288Q300 110 300 122V278Q300 290 312 290H580')+flg(170,110)+
  beam(200,320,40)+sup(250,110,'S','above',44)+
  sup(450,290,'R','below',340)+
  arr(182,140,182,86,'#C2412A',2.2)+tx(190,150,'Nozzle rises','start',12.5)+
  tx(576,280,'To rack','end')+
  mk(1,214,126)+mk(2,476,322)+mk(3,276,74)+mk(4,224,74)),
 pts:['When the vessel heats, the nozzle rises. A rigid rest under the pipe would lift off and drop the pipe weight onto the nozzle. A variable spring keeps carrying the weight as the pipe moves.',
  'Further along, where the vertical movement has died out, ordinary rigid rests are fine.',
  'Choose the spring from the hot load and the movement. Keep the change in load between cold and hot small, often 25% or less.',
  'Springs are delivered with their travel stops locked for the hydrotest. Remove the stops before start-up and check the cold setting.']},
];
/* small-bore figure markers are added here so the figure stays readable */
T.find(t=>t.id==='sbc').fig=(f=>()=>f().replace('</svg>',T.find(t=>t.id==='sbc').mks.map(m=>mk(...m)).join('')+'</svg>'))(T.find(t=>t.id==='sbc').fig);

const KEY={R:'Rest',G:'Guide',A:'Anchor or stop',AD:'Adjustable',H:'Hanger',S:'Spring',B:'Brace'};
let cur=0;
const host=document.createElement('section');host.className='sl';host.id='where-to-support';
host.innerHTML=`<div class="sl-h"><div><h2>Where to support</h2><p>Typical support arrangements around equipment and on racks. Pick a case, then tap a number on the drawing or in the list.</p></div></div>
<div class="sl-wrap"><div class="sl-list" role="tablist" aria-label="Arrangements">${T.map((t,i)=>`<button role="tab" id="sl-t${i}" aria-selected="${i===0}" aria-controls="sl-panel" data-i="${i}"><svg viewBox="0 0 24 24" aria-hidden="true">${t.ic}</svg>${t.name}</button>`).join('')}</div>
<div class="sl-body" id="sl-panel" role="tabpanel"><div class="sl-fig"><div id="sl-svg"></div><div class="sl-key" id="sl-key"></div></div><div class="sl-txt" id="sl-txt"></div></div></div>
<p class="sl-note">Schematic and not to scale. Final support types, positions and loads come from your project's stress analysis and support standards.</p>`;
P.appendChild(host);
function render(){const t=T[cur];host.querySelectorAll('.sl-list button').forEach((b,i)=>{b.setAttribute('aria-selected',i===cur);b.tabIndex=i===cur?0:-1;});
 host.querySelector('#sl-panel').setAttribute('aria-labelledby','sl-t'+cur);
 host.querySelector('#sl-svg').innerHTML=t.fig();const sv=host.querySelector('#sl-svg svg');sv.setAttribute('aria-label',t.name+': '+t.sub);try{const b=sv.getBBox(),p=10;sv.setAttribute('viewBox',`${Math.max(0,b.x-p)} ${Math.max(0,b.y-p)} ${Math.min(600,b.width+2*p)} ${Math.min(380,b.height+2*p)}`);}catch(e){}
 host.querySelector('#sl-key').innerHTML=t.key.split(' ').map(k=>`<span><b>${k}</b>${KEY[k]}</span>`).join('')+'<span><b style="background:#1849A9;color:#fff;box-shadow:none;border-radius:50%">1</b>Point in the list</span>';
 host.querySelector('#sl-txt').innerHTML=`<h3>${t.name}</h3><p class="sl-sub">${t.sub}</p><ol>${t.pts.map((p,i)=>`<li data-n="${i+1}"><i>${i+1}</i><span>${p}</span></li>`).join('')}</ol>`;
 const hi=n=>{host.querySelectorAll('.mk').forEach(m=>m.classList.toggle('on',m.dataset.n==n));host.querySelectorAll('.sl-txt li').forEach(l=>l.classList.toggle('on',l.dataset.n==n));};
 host.querySelectorAll('.mk').forEach(m=>{m.onmouseenter=()=>hi(m.dataset.n);m.onclick=()=>{hi(m.dataset.n);const l=host.querySelector(`.sl-txt li[data-n="${m.dataset.n}"]`);if(l&&innerWidth<760)l.scrollIntoView({block:'nearest',behavior:'smooth'});};});
 host.querySelectorAll('.sl-txt li').forEach(l=>{l.onmouseenter=()=>hi(l.dataset.n);l.onclick=()=>hi(l.dataset.n);});
 host.querySelector('.sl-wrap').onmouseleave=()=>hi(0);}
host.querySelector('.sl-list').onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=+b.dataset.i;render();};
host.querySelector('.sl-list').onkeydown=e=>{if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();e.stopPropagation();cur=(cur+(e.key==='ArrowDown'||e.key==='ArrowRight'?1:-1)+T.length)%T.length;render();host.querySelector('#sl-t'+cur).focus();};
render();
if(location.hash==='#where-to-support')setTimeout(()=>host.scrollIntoView({block:'start'}),300);
