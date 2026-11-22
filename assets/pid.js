/* P&ID symbols legend: lines, valves, fittings, instruments, equipment, ISA letter codes, abbreviations and line numbers.
   Symbols are drawn here in the common style of ISA-5.1 and typical EPC legend sheets. Globals from app.js: store. */
(function(){
const P=document.getElementById('p-pid');if(!P)return;
if(!document.getElementById('pid-css')){const st=document.createElement('style');st.id='pid-css';st.textContent=`
/* CAD and SVG downloads hidden for now (re-enable by removing this rule) */
#p-pid [data-a="dxf"],#p-pid [data-a="dl"],#p-pid [data-a="cp"],#p-pid [data-x="dxf"],#p-pid .pd-dl small{display:none!important}
#p-pid .pd-dl{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 14px;padding:10px 12px;border:1px solid var(--rule);border-radius:10px;background:var(--sheet)}#p-pid .pd-dl small{flex-basis:100%;color:var(--muted);font-size:12px}#p-pid .pd-dl span{font-size:13px}
#p-pid .pd-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:16px 0 14px}
#p-pid .pd-chip{border:1px solid var(--rule-strong);background:var(--sheet);color:var(--ink-2);border-radius:99px;padding:6px 13px;font:inherit;font-size:13px;font-weight:550;cursor:pointer}
#p-pid .pd-chip[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-pid .pd-chip small{opacity:.7;font-weight:500}
#p-pid .pd-q{flex:1 1 220px;min-width:180px;height:36px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 12px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink)}
#p-pid .pd-sec{margin:22px 0 0}#p-pid .pd-sec>h2{font-size:17px;margin:0 0 2px}#p-pid .pd-sec>p{margin:0 0 12px;font-size:13.5px;color:var(--muted)}
#p-pid .pd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:10px}
#p-pid .pd-card{display:flex;flex-direction:column;align-items:stretch;gap:6px;border:1px solid var(--rule);border-radius:12px;background:var(--sheet);padding:10px 10px 9px;cursor:pointer;text-align:left;font:inherit;color:var(--ink)}
#p-pid .pd-card:hover,#p-pid .pd-card:focus-visible{border-color:var(--accent);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 15%,transparent)}
#p-pid .pd-sym{height:74px;display:flex;align-items:center;justify-content:center;background:#FAFBFD;border-radius:8px;color:#1F2937}
#p-pid .pd-sym svg{max-width:100%;max-height:66px;width:auto;height:66px}
#p-pid .pd-card b{font-size:13.5px;line-height:1.3}#p-pid .pd-card span{font-size:12px;color:var(--muted);line-height:1.35}
#p-pid svg.sy{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#p-pid svg.sy .f{fill:currentColor}#p-pid svg.sy .w{fill:#fff}#p-pid svg.sy .t{fill:currentColor;stroke:none;font:600 13px Geist,system-ui,sans-serif}#p-pid svg.sy .ts{fill:currentColor;stroke:none;font:600 10px Geist,system-ui,sans-serif}
#p-pid svg.sy .th{stroke-width:3.4}#p-pid svg.sy .tn{stroke-width:1.2}#p-pid svg.sy .dsh{stroke-dasharray:6 4}#p-pid svg.sy .dl{stroke-dasharray:14 5}
#p-pid .pd-dlg{position:fixed;inset:0;z-index:80;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:16px}
#p-pid .pd-box{background:var(--sheet);border-radius:16px;max-width:560px;width:100%;padding:18px 20px;box-shadow:0 20px 50px rgba(0,0,0,.25);max-height:90vh;overflow:auto}
#p-pid .pd-box .pd-sym{height:200px;margin:8px 0 12px}#p-pid .pd-box .pd-sym svg{height:180px;max-height:180px}
#p-pid .pd-box h3{margin:0;font-size:18px}#p-pid .pd-box p{font-size:14px;line-height:1.55;color:var(--ink-2);margin:6px 0 0}
#p-pid .pd-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
#p-pid .pd-btn{height:34px;padding:0 13px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
#p-pid .pd-btn.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-pid .pd-x{float:right;border:0;background:none;font-size:22px;line-height:1;color:var(--muted);cursor:pointer}
#p-pid .pd-t{width:100%;border-collapse:collapse;font-size:13.5px}#p-pid .pd-t th{text-align:left;font-size:12px;color:var(--muted);font-weight:600;padding:6px 8px;border-bottom:1px solid var(--rule)}
#p-pid .pd-t td{padding:7px 8px;border-bottom:1px solid var(--rule);vertical-align:top;text-align:left!important;white-space:normal}#p-pid .pd-t td:first-child{font-weight:700;white-space:nowrap;font-family:var(--mono,ui-monospace,monospace)}
#p-pid .pd-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
#p-pid .pd-box2{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-pid .pd-ln{display:flex;flex-wrap:wrap;gap:4px;font:700 20px var(--mono,ui-monospace,monospace);margin:6px 0 12px}
#p-pid .pd-ln span{padding:4px 8px;border-radius:6px;background:rgba(24,73,169,.09);color:#1849A9}
#p-pid .pd-note{font-size:12.5px;color:var(--muted);margin:14px 0 0;line-height:1.5}
#p-pid .pd-empty{padding:24px;text-align:center;color:var(--muted);border:1px dashed var(--rule);border-radius:12px}
[data-theme=dark] #p-pid .pd-sym{background:#EEF2F7}[data-theme=dark] #p-pid .pd-ln span{color:#9DB8F6;background:rgba(157,184,246,.12)}
@media (max-width:760px){#p-pid .pd-cols{grid-template-columns:1fr}#p-pid .pd-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}
`;document.head.appendChild(st);}

/* ------------------------------------------------------------ drawing helpers (valves: viewBox 0 0 100 64, pipe at y 44) */
const Y=44,stub=`M4 ${Y}H34M66 ${Y}H96`;
const bow=(fill='')=>`<path d="M34 ${Y-11}L50 ${Y}L34 ${Y+11}Z"${fill==='L'?' class="f"':''}/><path d="M66 ${Y-11}L50 ${Y}L66 ${Y+11}Z"${fill==='R'?' class="f"':''}/>`;
const stem=(top=22)=>`<path d="M50 ${Y}V${top}"/>`;
const V=inner=>`<path d="${stub}"/>${inner}`;
const BALL=`<path d="M34 ${Y-8}L50 ${Y}L34 ${Y+8}Z"/><path d="M66 ${Y-8}L50 ${Y}L66 ${Y+8}Z"/><circle class="w" cx="50" cy="${Y}" r="8"/>`;
const CHK=`<path d="M4 ${Y}H36M64 ${Y}H96M36 ${Y-10}V${Y+10}M64 ${Y-10}V${Y+10}"/><path d="M36 ${Y-10}L59.9 ${Y+7.1}"/><path class="f" d="M64 ${Y+10}L55.4 ${Y+8.3}L59.6 ${Y+2.4}Z" stroke="none"/><circle class="f" cx="36" cy="${Y-10}" r="2.6" stroke="none"/>`;

const dome=`<path d="M37 20A13 12 0 0 1 63 20Z"/>`+stem(20);
const box=t=>stem(26)+`<rect x="40" y="8" width="20" height="18"/><text class="t" x="50" y="22" text-anchor="middle">${t}</text>`;
const LN=(inner,vb='0 0 120 40')=>({vb,s:inner});
const vb64='0 0 100 64',eq='0 0 100 100';
/* instrument bubble */
const bub=(t1,t2,extra='',cx=50,cy=50,r=30)=>`<circle cx="${cx}" cy="${cy}" r="${r}"/>${extra}<text class="t" x="${cx}" y="${cy-3}" text-anchor="middle">${t1}</text><text class="ts" x="${cx}" y="${cy+12}" text-anchor="middle">${t2}</text>`;

/* ------------------------------------------------------------ symbol library */
const CAT=[['lines','Lines'],['valves','Valves'],['act','Actuated & safety valves'],['fit','Fittings & specials'],['inst','Instruments'],['flow','Flow & level elements'],['equip','Equipment']];
const S=[
/* lines */
{c:'lines',n:'Main process line',d:'Major process flow, drawn heavier than other lines.',...LN('<path class="th" d="M6 20H114"/><path class="f" d="M64 14L76 20L64 26Z" stroke="none"/>')},
{c:'lines',n:'Secondary / utility line',d:'Utility and minor process lines, drawn thinner than main process lines.',...LN('<path d="M6 20H114"/><path class="f" d="M64 15L74 20L64 25Z" stroke="none"/>')},
{c:'lines',n:'Future line',d:'Line planned for a later phase; not part of the current scope.',...LN('<path class="dl" d="M6 20H114"/>')},
{c:'lines',n:'Jacketed line',d:'Core pipe inside a jacket carrying a heating medium (steam or hot oil), for example sulphur service. Jacket shown as a second outline.',...LN('<path d="M6 13H114M6 27H114"/><path class="th" d="M6 20H114"/>')},
{c:'lines',n:'Steam traced line',d:'Process line with a steam tracer alongside. Usually tagged ST with the tracer size.',...LN('<path class="th" d="M6 16H114"/><path class="dsh tn" d="M6 25H114"/><text class="ts" x="60" y="38" text-anchor="middle">ST</text>')},
{c:'lines',n:'Electric traced line',d:'Process line with electric heat tracing. Usually tagged ET.',...LN('<path class="th" d="M6 16H114"/><path class="tn" stroke-dasharray="10 3 2 3" d="M6 25H114"/><text class="ts" x="60" y="38" text-anchor="middle">ET</text>')},
{c:'lines',n:'Instrument process connection',d:'Impulse line or process connection from the pipe or vessel to an instrument. Thin solid line.',...LN('<path class="tn" d="M6 20H114"/>')},
{c:'lines',n:'Pneumatic signal',d:'Instrument air signal (for example 0.2–1 bar g). ISA-5.1: line with double slashes.',...LN('<path class="tn" d="M6 20H114"/>'+[24,54,84].map(x=>`<path class="tn" d="M${x} 27L${x+6} 13M${x+6} 27L${x+12} 13"/>`).join(''))},
{c:'lines',n:'Electric signal',d:'Analogue or discrete electric signal (for example 4–20 mA). ISA-5.1: dashed line.',...LN('<path class="tn dsh" d="M6 20H114"/>')},
{c:'lines',n:'Data link / software',d:'Communication between systems inside DCS, PLC or fieldbus. ISA-5.1: line with small circles.',...LN('<path class="tn" d="M6 20H114"/>'+[22,42,62,82,102].map(x=>`<circle class="w tn" cx="${x}" cy="20" r="3.5"/>`).join(''))},
{c:'lines',n:'Capillary tube',d:'Filled system, for example a remote seal or a filled thermal system. ISA-5.1: line with crosses.',...LN('<path class="tn" d="M6 20H114"/>'+[26,56,86].map(x=>`<path class="tn" d="M${x-5} 14L${x+5} 26M${x+5} 14L${x-5} 26"/>`).join(''))},
{c:'lines',n:'Hydraulic signal',d:'Signal carried by hydraulic fluid. ISA-5.1: line with L-shaped marks.',...LN('<path class="tn" d="M6 20H114"/>'+[26,56,86].map(x=>`<path class="tn" d="M${x} 20V10H${x+8}"/>`).join(''))},
{c:'lines',n:'Wireless signal',d:'Wireless instrument signal. ISA-5.1: wavy line.',...LN('<path class="tn" d="M6 20q7.5-12 15 0t15 0 15 0 15 0 15 0 15 0 15 0"/>')},
{c:'lines',n:'Line crossing (no connection)',d:'Two lines crossing without joining: one line is broken (or hooped) at the crossing.',...LN('<path d="M6 20H52M68 20H114M60 2V38"/>','0 0 120 40')},
{c:'lines',n:'Line junction',d:'Lines joined at a tee. Some legends add a dot at the junction.',...LN('<path d="M6 20H114M60 20V38"/><circle class="f" cx="60" cy="20" r="3"/>')},
{c:'lines',n:'Battery limit / tie-in',d:'Boundary between units or contractors (BL). Tie-in points are numbered, for example TP-01.',...LN('<path d="M6 20H114"/><path class="dl tn" d="M60 2V38"/><text class="ts" x="64" y="12">BL</text>')},

/* manual valves */
{c:'valves',n:'Gate valve',d:'On/off isolation, full bore, low pressure drop. Not for throttling.',vb:vb64,s:V(bow())},
{c:'valves',n:'Globe valve',d:'Throttling and flow regulation; higher pressure drop. Often used for bypasses and drains.',vb:vb64,s:V(bow()+`<circle class="f" cx="50" cy="${Y}" r="5"/>`)},
{c:'valves',n:'Ball valve',d:'Quarter-turn on/off valve, tight shut-off.',vb:vb64,s:V(BALL)},
{c:'valves',n:'Plug valve',d:'Quarter-turn valve with a tapered or cylindrical plug; on/off and diverting service.',vb:vb64,s:V(bow()+`<rect class="f" x="46" y="${Y-8}" width="8" height="16"/>`)},
{c:'valves',n:'Butterfly valve',d:'Quarter-turn disc valve for large sizes, low pressure; on/off or coarse throttling.',vb:vb64,s:`<path d="M4 ${Y}H38M62 ${Y}H96M38 ${Y-14}V${Y+14}M62 ${Y-14}V${Y+14}M42 ${Y+11}L58 ${Y-11}"/><circle class="f" cx="50" cy="${Y}" r="2.6"/>`},
{c:'valves',n:'Check valve',d:'Non-return (swing check) valve; lets flow pass one way only. The disc hinges at the dot and the arrow shows the allowed flow direction.',vb:vb64,s:CHK},
{c:'valves',n:'Needle valve',d:'Fine flow control on small lines, instrument and sample connections.',vb:vb64,s:V(bow())+`<path d="M50 ${Y}V20M42 20H58"/><path class="f" d="M46 ${Y-9}L54 ${Y-9}L50 ${Y-2}Z" stroke="none"/>`},
{c:'valves',n:'Diaphragm valve',d:'Flexible diaphragm closes on a weir; corrosive, slurry or clean service.',vb:vb64,s:V(bow())+`<path d="M38 ${Y-14}Q50 ${Y-26} 62 ${Y-14}"/>`},
{c:'valves',n:'Angle valve',d:'Globe-type valve with inlet and outlet at 90°.',vb:'0 0 100 80',s:`<path d="M4 34H34M50 50V76"/><path d="M34 23L50 34L34 45Z"/><path d="M39 50L50 34L61 50Z"/>`},
{c:'valves',n:'Three-way valve',d:'Diverting or mixing valve with three ports.',vb:'0 0 100 80',s:`<path d="${stub.replace(/44/g,'34')}M50 50V76"/><path d="M34 23L50 34L34 45Z"/><path d="M66 23L50 34L66 45Z"/><path d="M39 50L50 34L61 50Z"/>`},
{c:'valves',n:'Four-way valve',d:'Four-port switching valve.',vb:'0 0 100 100',s:`<path d="M4 50H34M66 50H96M50 4V34M50 66V96"/><path d="M34 39L50 50L34 61Z"/><path d="M66 39L50 50L66 61Z"/><path d="M39 34L50 50L61 34Z"/><path d="M39 66L50 50L61 66Z"/>`},
{c:'valves',n:'Knife gate valve',d:'Thin gate that cuts through slurries and solids-laden flow.',vb:vb64,s:V(bow())+`<path class="th" d="M50 ${Y-14}V${Y+14}"/>`},
{c:'valves',n:'Pinch valve',d:'Flexible sleeve squeezed shut; slurries and powders.',vb:vb64,s:V(`<path d="M34 ${Y-11}Q50 ${Y} 66 ${Y-11}M34 ${Y+11}Q50 ${Y} 66 ${Y+11}M34 ${Y-11}V${Y+11}M66 ${Y-11}V${Y+11}"/>`)},
{c:'valves',n:'Valve normally closed (NC)',d:'Valve shown filled is closed in normal operation (also written NC). Drains and vents are often NC.',vb:vb64,s:V(`<path class="f" d="M34 ${Y-11}L50 ${Y}L34 ${Y+11}Z"/><path class="f" d="M66 ${Y-11}L50 ${Y}L66 ${Y+11}Z"/>`)+`<text class="ts" x="50" y="22" text-anchor="middle">NC</text>`},
{c:'valves',n:'Locked / car-sealed open',d:'Valve locked (LO) or car-sealed open (CSO), for example under a relief valve. LC / CSC for closed.',vb:vb64,s:V(bow())+`<text class="ts" x="50" y="24" text-anchor="middle">LO / CSO</text>`},

/* actuated and safety */
{c:'act',n:'Control valve, diaphragm actuator',d:'Pneumatic control valve with spring-diaphragm actuator. Tagged with the loop, for example FV-101 or TV-205.',vb:vb64,s:V(bow())+dome},
{c:'act',n:'Control valve with positioner',d:'Control valve with a positioner (often electro-pneumatic, I/P) mounted on the actuator.',vb:'0 0 120 64',s:`<path d="M4 ${Y}H34M66 ${Y}H116"/>`+bow()+dome+`<rect x="68" y="6" width="22" height="16"/><text class="ts" x="79" y="18" text-anchor="middle">I/P</text><path class="tn" d="M63 14H68"/>`},
{c:'act',n:'Piston-actuated valve',d:'Pneumatic or hydraulic cylinder actuator; often on/off valves (XV, SDV).',vb:vb64,s:V(bow())+stem(24)+`<rect x="40" y="6" width="20" height="18"/><path d="M40 15H60"/>`},
{c:'act',n:'Motor-operated valve',d:'Electric motor actuator (MOV). Used for remote isolation of large valves.',vb:vb64,s:V(bow())+box('M')},
{c:'act',n:'Solenoid valve',d:'Solenoid-operated valve, small sizes; or a solenoid on an actuator air supply.',vb:vb64,s:V(bow())+box('S')},
{c:'act',n:'Hand-operated valve (handwheel shown)',d:'Manual valve where the handwheel or gear operator is shown, for example on large or high-mounted valves.',vb:vb64,s:V(bow())+stem(18)+`<path d="M38 18H62"/>`},
{c:'act',n:'Fail open (FO)',d:'Valve opens on loss of air or power. Written FO, or shown with an arrow pointing up from the stem.',vb:vb64,s:V(bow())+dome+`<path class="tn" d="M70 ${Y+8}V${Y-10}"/><path class="f" d="M66 ${Y-8}L70 ${Y-16}L74 ${Y-8}Z" stroke="none"/><text class="ts" x="78" y="${Y+12}">FO</text>`},
{c:'act',n:'Fail closed (FC)',d:'Valve closes on loss of air or power. Written FC, or with an arrow pointing down.',vb:vb64,s:V(bow())+dome+`<path class="tn" d="M70 ${Y-16}V${Y+2}"/><path class="f" d="M66 ${Y}L70 ${Y+8}L74 ${Y}Z" stroke="none"/><text class="ts" x="78" y="${Y+12}">FC</text>`},
{c:'act',n:'Pressure relief / safety valve',d:'Spring-loaded relief (PSV): opens at set pressure to protect equipment. Inlet from below, outlet to the side.',vb:'0 0 100 90',s:`<path d="M50 88V64M66 46H96"/><path d="M39 64L50 46L61 64Z"/><path d="M66 35L50 46L66 57Z"/><path d="M50 46V10"/><path class="tn" d="M43 40L57 35L43 30L57 25L43 20L57 15"/><path d="M42 10H58"/>`},
{c:'act',n:'Pressure regulator (self-acting)',d:'Pressure-reducing valve with its own diaphragm, sensing downstream pressure. No external signal.',vb:'0 0 120 64',s:`<path d="M4 ${Y}H34M66 ${Y}H116"/>`+bow()+dome+`<path class="tn dsh" d="M63 14H96V${Y}"/>`},
{c:'act',n:'Rupture disc',d:'Bursting disc that breaks at a set pressure; one-time protection, often below a PSV.',vb:'0 0 100 64',s:`<path d="M4 32H40M60 32H96M40 16V48M60 16V48"/><path d="M40 16Q56 32 40 48"/>`},
{c:'act',n:'Vacuum breaker / PVRV',d:'Pressure-vacuum relief valve on tanks; breathes out on pressure and in on vacuum.',vb:'0 0 100 80',s:`<path d="M50 78V56M34 56H66V24H34Z"/><path class="tn" d="M44 48V32M40 36L44 30L48 36M56 32V48M52 44L56 50L60 44"/>`},

/* fittings */
{c:'fit',n:'Flanged joint',d:'Pair of flanges; marks a break point for maintenance or a spec break.',vb:'0 0 100 64',s:`<path d="M4 32H96M46 16V48M54 16V48"/>`},
{c:'fit',n:'Blind flange',d:'Flange closing a line end or a future connection.',vb:'0 0 100 64',s:`<path d="M4 32H46M46 16V48"/><path class="th" d="M53 14V50"/>`},
{c:'fit',n:'Spectacle blind (open)',d:'Figure-8 blind turned to the open ring: flow passes. Swing to the solid side for positive isolation.',vb:'0 0 100 80',s:`<path d="M4 40H40M60 40H96"/><circle cx="50" cy="40" r="10"/><path d="M50 50V60"/><circle class="f" cx="50" cy="68" r="8"/>`},
{c:'fit',n:'Spectacle blind (closed)',d:'Figure-8 blind turned to the solid plate: line positively isolated.',vb:'0 0 100 80',s:`<path d="M4 40H40M60 40H96"/><circle class="f" cx="50" cy="40" r="10"/><path d="M50 50V60"/><circle cx="50" cy="68" r="8"/>`},
{c:'fit',n:'Spade / spacer',d:'Separate blind (spade) or ring spacer used where a figure-8 is too heavy.',vb:'0 0 100 64',s:`<path d="M4 32H44M56 32H96"/><path class="th" d="M50 12V52"/><path d="M50 12H64"/>`},
{c:'fit',n:'Concentric reducer',d:'Size change on the pipe centreline; usual in vertical lines.',vb:'0 0 100 64',s:`<path d="M4 32H36M64 32H96M36 16L64 24V40L36 48Z"/>`},
{c:'fit',n:'Eccentric reducer',d:'Size change with one side flat: flat on top (FOT) at pump suctions, flat on bottom (FOB) on racks.',vb:'0 0 100 64',s:`<path d="M4 32H36M64 40H96M36 16L64 30V48H36Z"/><text class="ts" x="50" y="60" text-anchor="middle">FOB</text>`},
{c:'fit',n:'Union',d:'Screwed union for small-bore lines that need to be taken apart.',vb:'0 0 100 64',s:`<path d="M4 32H96M42 20V44M50 20V44M58 20V44"/>`},
{c:'fit',n:'Cap / plug',d:'Line end closed with a cap (welded or screwed) or a threaded plug.',vb:'0 0 100 64',s:`<path d="M4 32H56M56 18A14 14 0 0 1 56 46Z"/>`},
{c:'fit',n:'Y-strainer',d:'Removes debris before pumps, traps and control valves. Screen in an angled leg.',vb:'0 0 100 64',s:`<path d="M4 24H96M38 24L60 50"/><path class="tn dsh" d="M44 30L56 44"/><path d="M58 50H66"/>`},
{c:'fit',n:'Basket strainer',d:'Larger strainer with a removable basket; can be duplex for on-line cleaning.',vb:'0 0 100 70',s:`<path d="M4 24H34M66 24H96M34 10H66V58H34Z"/><path class="tn dsh" d="M40 18V48H60V18"/>`},
{c:'fit',n:'Temporary (cone) strainer',d:'Start-up strainer between flanges at pump suctions; removed after commissioning.',vb:'0 0 100 64',s:`<path d="M4 32H96M42 16V48M58 16V48"/><path class="tn dsh" d="M44 20L56 32L44 44"/><text class="ts" x="50" y="60" text-anchor="middle">TS</text>`},
{c:'fit',n:'Steam trap',d:'Drains condensate and holds back steam. Usually with isolation valves, strainer and a test or bypass.',vb:'0 0 100 64',s:`<path d="M4 32H36M64 32H96"/><circle cx="50" cy="32" r="14"/><text class="t" x="50" y="37" text-anchor="middle">T</text>`},
{c:'fit',n:'Flexible hose',d:'Hose connection, for example at utility stations or loading points.',vb:'0 0 100 64',s:`<path d="M4 32H26M74 32H96M26 32q6-10 12 0t12 0 12 0 12 0"/>`},
{c:'fit',n:'Expansion joint / bellows',d:'Bellows absorbing thermal movement or vibration.',vb:'0 0 100 64',s:`<path d="M4 32H30M70 32H96M30 18V46M70 18V46M30 18L36 46L42 18L48 46L54 18L60 46L66 18L70 30"/>`},
{c:'fit',n:'Sight glass',d:'Window to see flow in a line.',vb:'0 0 100 64',s:`<path d="M4 32H34M66 32H96M34 18H66V46H34Z"/><circle cx="50" cy="32" r="7"/>`},
{c:'fit',n:'Restriction orifice',d:'Fixed orifice plate limiting flow or dropping pressure (RO).',vb:'0 0 100 64',s:`<path d="M4 32H46M54 32H96M46 14V26M46 38V50M54 14V26M54 38V50"/><text class="ts" x="50" y="10" text-anchor="middle">RO</text>`},
{c:'fit',n:'Flame arrester',d:'Stops a flame front passing into a line or tank vent.',vb:'0 0 100 64',s:`<path d="M4 32H34M66 32H96M34 16H66V48H34Z"/><path class="tn" d="M34 16L66 48M66 16L34 48"/>`},
{c:'fit',n:'Silencer',d:'Reduces noise at vents and relief outlets.',vb:'0 0 100 70',s:`<path d="M50 68V52M38 52H62V10H38Z"/><path class="tn" d="M38 22H62M38 32H62M38 42H62"/>`},
{c:'fit',n:'Vent to atmosphere',d:'Open vent; often with a goose-neck or to a safe location.',vb:'0 0 100 70',s:`<path d="M50 68V16Q50 6 60 6Q70 6 70 16"/>`},
{c:'fit',n:'Drain to funnel / sewer',d:'Drain point to an open funnel, oily-water sewer or closed drain (CD).',vb:'0 0 100 70',s:`<path d="M50 4V34M36 42L64 42L54 58H46Z"/>`},
{c:'fit',n:'Sample connection',d:'Sample point with isolation, often a closed-loop sample cooler (SC).',vb:'0 0 100 80',s:`<path d="M4 14H96M50 14V26M50 50V60"/><path d="M39 26L61 26L50 38Z"/><path d="M39 50L61 50L50 38Z"/><circle cx="50" cy="68" r="7"/><text class="ts" x="62" y="72">SC</text>`},

/* instruments */
{c:'inst',n:'Field-mounted instrument',d:'Instrument mounted in the field, for example a local pressure gauge PI-101.',vb:eq,s:bub('PI','101')},
{c:'inst',n:'Control-room instrument',d:'Primary location, normally accessible to the operator (panel front). Line through the bubble.',vb:eq,s:bub('PIC','101','<path d="M20 50H80"/>')},
{c:'inst',n:'Behind panel / not accessible',d:'Primary location, not normally accessible (behind the panel). Dashed line through the bubble.',vb:eq,s:bub('PY','101','<path class="dsh" d="M20 50H80"/>')},
{c:'inst',n:'Local panel instrument',d:'Auxiliary location such as a local control panel. Double line through the bubble.',vb:eq,s:bub('PI','101','<path d="M20 47H80M20 53H80"/>')},
{c:'inst',n:'DCS function (shared display)',d:'Function in the distributed control system, shown on a shared display. Circle in a square.',vb:eq,s:`<rect x="18" y="18" width="64" height="64"/>`+bub('FIC','101','<path d="M18 50H82"/>',50,50,32)},
{c:'inst',n:'PLC function',d:'Logic in a programmable controller. Diamond in a square.',vb:eq,s:`<rect x="18" y="18" width="64" height="64"/><path d="M50 18L82 50L50 82L18 50Z"/><path d="M18 50H82"/><text class="t" x="50" y="45" text-anchor="middle">XS</text><text class="ts" x="50" y="64" text-anchor="middle">101</text>`},
{c:'inst',n:'Computer / software function',d:'Function in a computer or software system, for example an advanced control calculation. Hexagon.',vb:eq,s:`<path d="M18 50L33 22H67L82 50L67 78H33Z"/><path d="M18 50H82"/><text class="t" x="50" y="45" text-anchor="middle">FY</text><text class="ts" x="50" y="64" text-anchor="middle">101</text>`},
{c:'inst',n:'Interlock / logic',d:'Interlock or trip logic, numbered and described in the cause and effect chart.',vb:eq,s:`<path d="M50 16L84 50L50 84L16 50Z"/><text class="t" x="50" y="48" text-anchor="middle">I</text><text class="ts" x="50" y="64" text-anchor="middle">101</text>`},
{c:'inst',n:'Safety instrumented function (SIS)',d:'Function in the safety system (ESD / SIS). Often a diamond or hexagon with SIL marking, per project.',vb:eq,s:`<rect x="18" y="18" width="64" height="64"/><path d="M50 18L82 50L50 82L18 50Z"/><path d="M18 50H82"/><text class="t" x="50" y="45" text-anchor="middle">ESD</text><text class="ts" x="50" y="64" text-anchor="middle">SIL2</text>`},
{c:'inst',n:'Transmitter on a line',d:'Pressure transmitter connected to the line, sending 4–20 mA to the DCS.',vb:'0 0 120 100',s:`<path class="th" d="M4 86H116"/><path class="tn" d="M40 86V72"/>`+bub('PT','101','',40,50,22)+`<path class="tn dsh" d="M62 50H116"/>`},
{c:'inst',n:'Thermowell with temperature element',d:'Thermowell (TW) in the pipe with a temperature element (TE) and transmitter (TT).',vb:'0 0 100 100',s:`<path class="th" d="M4 86H96"/><path d="M50 86V72"/><path class="tn" d="M44 92H56"/>`+bub('TE','101','',50,50,22)},
{c:'inst',n:'Limit switch (open / closed)',d:'Position switches on a valve: ZSO open, ZSC closed. Used for on/off valve feedback.',vb:'0 0 120 100',s:`<path d="M4 80H40M72 80H116"/><path d="M40 69L56 80L40 91Z"/><path d="M72 69L56 80L72 91Z"/><path d="M56 80V58M44 58H68V46H44Z"/>`+`<circle cx="94" cy="40" r="18"/><text class="ts" x="94" y="38" text-anchor="middle">ZSO</text><text class="ts" x="94" y="50" text-anchor="middle">101</text><path class="tn dsh" d="M68 52H76"/>`},
{c:'inst',n:'Pressure gauge',d:'Local pressure indicator (PI), usually with a gauge valve or root valve.',vb:'0 0 100 100',s:`<path class="th" d="M4 88H96"/><path d="M50 88V72"/>`+bub('PI','102','',50,50,22)},

/* flow and level */
{c:'flow',n:'Orifice plate',d:'Differential-pressure flow element (FE) between orifice flanges, with taps to a DP transmitter.',vb:'0 0 120 84',s:`<path class="th" d="M4 64H116"/><path class="tn" d="M53 50V78M67 50V78"/><path class="th" d="M60 48V80"/><path class="tn" d="M60 48V34"/><circle cx="60" cy="18" r="15"/><text class="t" x="60" y="23" text-anchor="middle">FE</text>`},
{c:'flow',n:'Venturi / flow nozzle',d:'Venturi tube or flow nozzle; lower permanent pressure loss than an orifice.',vb:'0 0 120 64',s:`<path d="M4 20H40L54 28H66L80 20H116M4 44H40L54 36H66L80 44H116"/>`},
{c:'flow',n:'Magnetic flowmeter',d:'Electromagnetic flowmeter for conductive liquids. Full bore, no pressure loss.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><rect x="40" y="16" width="40" height="32"/><text class="t" x="60" y="37" text-anchor="middle">M</text>`},
{c:'flow',n:'Turbine / positive-displacement meter',d:'Mechanical flowmeter, for example for custody transfer and fuel metering.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><rect x="40" y="16" width="40" height="32"/><path class="tn" d="M48 24L72 40M48 40L72 24"/>`},
{c:'flow',n:'Vortex flowmeter',d:'Counts vortices shed from a bluff body; steam, gas and liquid.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><rect x="40" y="16" width="40" height="32"/><path class="tn" d="M50 32q5-8 10 0t10 0"/>`},
{c:'flow',n:'Rotameter (variable area)',d:'Float in a tapered tube; local flow indication, often on purge and small utility lines.',vb:'0 0 100 100',s:`<path d="M50 96V82M50 18V4M40 18H60L56 82H44Z"/><path class="f" d="M45 46H55L50 54Z" stroke="none"/>`},
{c:'flow',n:'Level gauge (glass)',d:'Local level indication on a vessel (LG), between two nozzles with isolation valves.',vb:'0 0 120 100',s:`<path d="M10 10V90M10 26H40M10 74H40"/><rect x="40" y="18" width="14" height="64"/><path class="tn" d="M47 22V78"/><circle cx="90" cy="50" r="18"/><text class="ts" x="90" y="48" text-anchor="middle">LG</text><text class="ts" x="90" y="60" text-anchor="middle">101</text><path class="tn" d="M54 50H72"/>`},
{c:'flow',n:'Level transmitter (DP / guided wave)',d:'Level transmitter on a vessel (LT) sending a signal to level control (LIC).',vb:'0 0 120 100',s:`<path d="M10 10V90M10 30H44M10 70H44"/><path class="tn" d="M44 30V70"/><circle cx="74" cy="50" r="20"/><text class="ts" x="74" y="48" text-anchor="middle">LT</text><text class="ts" x="74" y="60" text-anchor="middle">101</text><path class="tn" d="M44 50H54"/>`},

/* equipment */
{c:'equip',n:'Centrifugal pump',d:'Most common pump. Suction at the centre, discharge from the top.',vb:eq,s:`<circle cx="46" cy="54" r="24"/><path d="M46 30H82V40M4 54H22"/><path d="M30 76L22 92H70L62 76"/>`},
{c:'equip',n:'Positive-displacement pump',d:'Gear, screw or reciprocating pump; high pressure, viscous fluids, dosing. Needs relief protection.',vb:eq,s:`<circle cx="50" cy="50" r="26"/><circle cx="41" cy="50" r="8"/><circle cx="59" cy="50" r="8"/><path d="M4 50H24M76 50H96"/>`},
{c:'equip',n:'Centrifugal compressor',d:'Gas compressor; outline narrows towards the discharge.',vb:eq,s:`<path d="M24 22L76 36V64L24 78Z"/><path d="M4 50H24M76 50H96"/>`},
{c:'equip',n:'Fan / blower',d:'Moves air or gas at low pressure rise.',vb:eq,s:`<circle cx="50" cy="50" r="28"/><path d="M50 50L50 26Q62 34 50 50L74 50Q66 62 50 50L50 74Q38 66 50 50L26 50Q34 38 50 50"/>`},
{c:'equip',n:'Electric motor / steam turbine driver',d:'Driver for pumps and compressors: M for motor, T for steam turbine.',vb:eq,s:`<circle cx="50" cy="50" r="22"/><text class="t" x="50" y="55" text-anchor="middle">M</text><path d="M72 50H96"/>`},
{c:'equip',n:'Vertical vessel / drum',d:'Separator, knock-out drum or accumulator. Dished heads top and bottom.',vb:eq,s:`<path d="M30 22Q30 8 50 8Q70 8 70 22V78Q70 92 50 92Q30 92 30 78Z"/>`},
{c:'equip',n:'Horizontal drum',d:'Horizontal vessel on saddles, for example a reflux drum or three-phase separator.',vb:eq,s:`<path d="M20 34Q8 34 8 50Q8 66 20 66H80Q92 66 92 50Q92 34 80 34Z"/><path d="M26 66L22 78H38L34 66M66 66L62 78H78L74 66"/>`},
{c:'equip',n:'Column / tower with trays',d:'Distillation or absorption column; dashed lines show trays.',vb:'0 0 100 120',s:`<path d="M36 18Q36 6 50 6Q64 6 64 18V102Q64 114 50 114Q36 114 36 102Z"/><path class="tn dsh" d="M36 34H58M42 48H64M36 62H58M42 76H64M36 90H58"/>`},
{c:'equip',n:'Packed column',d:'Column with packing beds (shown crossed) instead of trays.',vb:'0 0 100 120',s:`<path d="M36 18Q36 6 50 6Q64 6 64 18V102Q64 114 50 114Q36 114 36 102Z"/><path class="tn" d="M36 34H64M36 74H64M36 34L64 74M64 34L36 74"/>`},
{c:'equip',n:'Cone-roof tank',d:'Atmospheric storage tank with a fixed cone roof.',vb:eq,s:`<path d="M14 36L50 20L86 36V86H14Z"/>`},
{c:'equip',n:'Floating-roof tank',d:'Storage tank with a roof floating on the liquid, for volatile products.',vb:eq,s:`<path d="M14 24V86H86V24"/><path d="M18 46H82"/><path class="tn" d="M22 46V40M78 46V40"/>`},
{c:'equip',n:'Sphere',d:'Pressurised storage, for example LPG.',vb:eq,s:`<circle cx="50" cy="44" r="32"/><path d="M28 68V92M72 68V92M40 74V92M60 74V92"/>`},
{c:'equip',n:'Shell and tube exchanger',d:'Heat exchanger with tube bundle in a shell (TEMA types). Shell side and tube side nozzles shown.',vb:'0 0 120 80',s:`<path d="M24 22H96Q108 22 108 40Q108 58 96 58H24Z"/><path d="M12 22V58M24 22V58M12 22H24M12 58H24"/><path class="tn" d="M24 34H96M24 46H96"/><path d="M40 22V8M84 58V72"/>`},
{c:'equip',n:'Heat exchanger (general)',d:'General exchanger symbol: circle with the flow path through it.',vb:eq,s:`<circle cx="50" cy="50" r="28"/><path d="M4 50H26L36 36L46 64L56 36L66 64L74 50H96"/>`},
{c:'equip',n:'Air cooler (fin-fan)',d:'Air-cooled exchanger: tube bundle with fans below or above.',vb:'0 0 120 90',s:`<rect x="10" y="20" width="100" height="22"/><path class="tn" d="M10 31H110"/>`+[36,84].map(x=>`<circle cx="${x}" cy="64" r="14"/><path class="tn" d="M${x-12} 64H${x+12}M${x} 52V76"/>`).join('')},
{c:'equip',n:'Plate heat exchanger',d:'Compact exchanger with gasketed or welded plates.',vb:eq,s:`<rect x="28" y="16" width="44" height="68"/><path class="tn" d="M36 16V84M44 16V84M52 16V84M60 16V84M68 16V84"/>`},
{c:'equip',n:'Kettle reboiler',d:'Reboiler with an enlarged shell for vapour disengagement.',vb:'0 0 120 80',s:`<path d="M14 36H36Q40 14 64 14H96Q108 14 108 40Q108 66 96 66H64Q40 66 36 44H14Z"/><path class="tn" d="M36 40H100"/>`},
{c:'equip',n:'Fired heater / furnace',d:'Fired heater with radiant box, convection section and stack.',vb:'0 0 100 120',s:`<path d="M18 112V60L34 44H66L82 60V112Z"/><path d="M40 44V20H60V44M44 20V6H56V20"/><path class="tn" d="M34 100q6-12 12 0M54 100q6-12 12 0"/>`},
{c:'equip',n:'Filter / coalescer',d:'Vessel with filter elements or coalescing media.',vb:eq,s:`<path d="M30 22Q30 8 50 8Q70 8 70 22V78Q70 92 50 92Q30 92 30 78Z"/><path class="tn dsh" d="M30 38H70M30 62H70"/><path class="tn" d="M30 38L70 62M70 38L30 62"/>`},
{c:'equip',n:'Cyclone',d:'Separates solids or liquid droplets from gas by swirl.',vb:eq,s:`<path d="M28 10H72V46L56 88H44L28 46Z"/><path d="M4 22H28M50 10V2"/>`},
{c:'equip',n:'Agitated vessel / mixer',d:'Tank or reactor with an agitator driven by a motor.',vb:eq,s:`<path d="M24 26V84H76V26"/><circle cx="50" cy="12" r="9"/><text class="ts" x="50" y="16" text-anchor="middle">M</text><path d="M50 21V70M38 66L62 74M38 74L62 66"/>`},
{c:'equip',n:'Ejector / eductor',d:'Motive steam or liquid creates suction; vacuum systems and mixing.',vb:'0 0 120 64',s:`<path d="M4 32H24M24 22L50 28L64 26L116 18M24 42L50 36L64 38L116 46M56 4V28"/>`}
];
/* ---- additional symbols, cross-checked against published P&ID legend lists ---- */
const VV=(n,d,inner,vb=vb64,c='valves')=>({c,n,d,vb,s:inner});
const vvert=(cx,cy)=>`<path d="M${cx-11} ${cy-16}L${cx+11} ${cy-16}L${cx} ${cy}Z"/><path d="M${cx-11} ${cy+16}L${cx+11} ${cy+16}L${cx} ${cy}Z"/>`;
const vess=(x,y,w,h)=>`<path d="M${x} ${y+w/2}Q${x} ${y} ${x+w/2} ${y}Q${x+w} ${y} ${x+w} ${y+w/2}V${y+h-w/2}Q${x+w} ${y+h} ${x+w/2} ${y+h}Q${x} ${y+h} ${x} ${y+h-w/2}Z"/>`;
S.push(
/* more valves */
VV('Stop-check valve','Globe-type valve that acts as a check valve but can also be closed manually; boiler feed and steam lines.',V(bow('R'))+stem(20)+`<path d="M40 20H60"/>`),
VV('Lift / piston check valve','Check valve with a disc or piston lifting off the seat; small bore, high pressure.',V(bow('R'))+`<circle class="f" cx="50" cy="${Y}" r="4"/><path d="M36 20H62"/><path class="f" d="M60 15L69 20L60 25Z" stroke="none"/>`),
VV('Dual-plate (wafer) check valve','Compact wafer check valve with two spring-loaded half discs, between flanges.',`<path d="M4 ${Y}H38M62 ${Y}H96M38 ${Y-14}V${Y+14}M62 ${Y-14}V${Y+14}"/><path d="M44 ${Y-10}L56 ${Y}L44 ${Y+10}Z" class="f"/><path d="M36 20H62"/><path class="f" d="M60 15L69 20L60 25Z" stroke="none"/>`),
VV('Ball check valve','Check valve with a free ball as the closing element; viscous and slurry service.',V(bow())+`<circle class="f" cx="58" cy="${Y}" r="5"/><path d="M36 20H62"/><path class="f" d="M60 15L69 20L60 25Z" stroke="none"/>`),
VV('Foot valve','Check valve with a strainer at the bottom of a pump suction line in a sump or tank.',`<path d="M50 4V24"/><path d="M39 24H61L50 40Z"/><path class="f" d="M39 56H61L50 40Z"/><path class="tn dsh" d="M38 58H62V66H38Z"/>`,'0 0 100 70'),
VV('Y-pattern globe valve','Globe valve with an inclined stem; lower pressure drop than a standard globe.',V(bow()+`<circle class="f" cx="50" cy="${Y}" r="5"/>`)+`<path d="M50 ${Y}L64 22M58 18L70 26"/>`),
VV('Double block and bleed valve','Two seats with a bleed between them in one body (DBB); positive isolation for instruments and maintenance.',`<path d="M4 ${Y}H20M80 ${Y}H96"/><path d="M20 ${Y-10}L32 ${Y}L20 ${Y+10}Z"/><path d="M44 ${Y-10}L32 ${Y}L44 ${Y+10}Z"/><path d="M56 ${Y-10}L68 ${Y}L56 ${Y+10}Z"/><path d="M80 ${Y-10}L68 ${Y}L80 ${Y+10}Z"/><path d="M44 ${Y}H56M50 ${Y}V${Y+16}"/><path d="M44 ${Y+16}H56"/>`),
VV('Excess flow valve','Closes automatically if flow exceeds a set value, for example on a line break at a vessel outlet.',V(bow())+`<text class="ts" x="50" y="22" text-anchor="middle">EFV</text>`),
VV('Float-operated valve','Valve opened and closed by a float, for example on tank and cooling tower make-up.',V(bow())+stem(26)+`<path d="M50 26H74V40"/><circle cx="74" cy="48" r="8"/>`),
VV('Automatic recirculation valve','Check valve with a built-in minimum-flow bypass that protects a centrifugal pump (ARC valve).',`<path d="M4 ${Y}H34M66 ${Y}H96M50 ${Y+11}V62"/>`+bow('R')+`<text class="ts" x="50" y="22" text-anchor="middle">ARC</text>`,'0 0 100 66'),
VV('Rotary valve / rotary feeder','Rotating star valve that feeds or locks solids, for example under a hopper.',`<path d="M50 4V22M50 78V96"/><circle cx="50" cy="50" r="24"/><path class="tn" d="M50 50L50 28M50 50L69 61M50 50L31 61M50 50L69 39M50 50L31 39M50 50V72"/>`,eq),
VV('Slide valve','Flat gate sliding across the line; solids and catalyst service.',V(`<rect x="38" y="${Y-12}" width="24" height="24"/>`)+`<path d="M50 ${Y-12}V22M42 22H58"/>`),
VV('Hose valve / hose connection','Valve with a hose coupling at a utility station (water, steam, air, nitrogen).',`<path d="M4 ${Y}H34"/>`+bow()+`<path d="M66 ${Y}H78M78 ${Y-8}V${Y+8}M84 ${Y-8}V${Y+8}"/>`),
/* more actuated / regulating / relief */
VV('Back-pressure regulator','Self-acting regulator holding the upstream pressure (BPR). Sensing line to the upstream side.',`<path d="M4 ${Y}H34M66 ${Y}H116"/>`+bow()+dome+`<path class="tn dsh" d="M37 14H14V${Y}"/>`,'0 0 120 64','act'),
VV('Temperature regulator (self-acting)','Self-acting valve driven by a filled thermal system with a bulb in the process.',V(bow())+dome+`<path class="tn" d="M63 14H80V${Y-2}"/><path class="tn" d="M76 ${Y-2}H84V${Y+14}H76Z"/>`,'0 0 100 64','act'),
VV('Pilot-operated relief valve','Relief valve opened by a pilot that senses system pressure; tight seating close to set pressure.',`<path d="M50 88V64M66 46H96"/><path d="M39 64L50 46L61 64Z"/><path d="M66 35L50 46L66 57Z"/><path d="M50 46V24"/><rect x="38" y="8" width="24" height="16"/><text class="ts" x="50" y="20" text-anchor="middle">P</text><path class="tn dsh" d="M62 16H82V76H50"/>`,'0 0 100 90','act'),
VV('Vacuum relief valve','Opens to admit air or gas when vacuum exceeds the set value; tanks and vessels.',`<path d="M50 88V64M66 46H96"/><path d="M39 64L50 46L61 64Z"/><path d="M66 35L50 46L66 57Z"/><path d="M50 46V14"/><path class="tn" d="M43 40L57 35L43 30L57 25L43 20"/><text class="ts" x="62" y="22">VAC</text>`,'0 0 100 90','act'),
VV('Rupture disc with relief valve','Bursting disc under a relief valve to isolate the PSV from corrosive process; a pressure gauge or tell-tale is fitted between them.',`<path d="M50 96V84M40 84H60M40 78H60"/><path d="M40 84Q50 74 60 84"/><path d="M50 78V64M66 46H96"/><path d="M39 64L50 46L61 64Z"/><path d="M66 35L50 46L66 57Z"/><path d="M50 46V14"/><path class="tn" d="M43 40L57 35L43 30L57 25L43 20"/>`,'0 0 100 100','act'),
VV('Electro-hydraulic actuator','Electric pump and hydraulic cylinder in one unit (EH); large or fast-acting valves.',V(bow())+box('EH'),vb64,'act'),
VV('Gear-operated valve','Manual valve with a gearbox and handwheel for large sizes or high torque.',V(bow())+stem(28)+`<rect x="42" y="16" width="16" height="12"/><path d="M58 22H72M72 14V30"/>`,vb64,'act'),
VV('Lever-operated valve','Quarter-turn valve with a lever, for example small ball and plug valves.',V(BALL)+`<path d="M50 ${Y-7}V26L74 20"/>`,vb64,'act'),
VV('Solenoid with manual reset','Solenoid that must be reset by hand after a trip (R); ESD actuators.',V(bow())+box('S')+`<text class="ts" x="66" y="16">R</text>`,vb64,'act'),
VV('Actuator with 3-way solenoid','On/off valve whose actuator air is switched by a 3-way solenoid; vents the actuator to fail-safe.',V(bow())+stem(24)+`<rect x="40" y="6" width="20" height="18"/><path d="M40 15H60"/><path class="tn" d="M60 15H72"/><rect x="72" y="7" width="16" height="16"/><text class="ts" x="80" y="19" text-anchor="middle">S</text>`,vb64,'act'),
VV('Fail last / fail locked (FL)','Valve stays in its last position on loss of air or power.',V(bow())+dome+`<path class="tn" d="M68 ${Y-14}V${Y+6}"/><text class="ts" x="74" y="${Y+12}">FL</text>`,vb64,'act'),
VV('Damper / louver','Flow control in ducts and stacks (air, flue gas).',`<path d="M4 32H24M76 32H96"/><rect x="24" y="12" width="52" height="40"/><path class="tn" d="M30 24L46 20M30 36L46 32M30 48L46 44M54 24L70 20M54 36L70 32M54 48L70 44"/>`,'0 0 100 64','act'),
/* more fittings and specials */
{c:'fit',n:'Duplex strainer',d:'Two baskets with a change-over valve so one can be cleaned while the other runs.',vb:'0 0 120 70',s:`<path d="M4 24H24M96 24H116M24 10H52V58H24ZM68 10H96V58H68ZM52 24H68"/><path class="tn dsh" d="M30 18V48H46V18M74 18V48H90V18"/>`},
{c:'fit',n:'T-type strainer',d:'Strainer in a tee body with the screen in the branch; larger lines.',vb:'0 0 100 70',s:`<path d="M4 20H96M50 20V56M40 56H60"/><path class="tn dsh" d="M44 24V52H56V24"/>`},
{c:'fit',n:'Bleed ring',d:'Ring between flanges with a tapped hole for venting, draining or an instrument.',vb:'0 0 100 70',s:`<path d="M4 30H44M56 30H96M44 12V48M56 12V48M50 48V64"/><path class="tn" d="M44 12H56M44 48H56"/>`},
{c:'fit',n:'Insulating flange kit',d:'Insulating gasket, sleeves and washers that electrically separate two flanges, for example at cathodic protection breaks.',vb:'0 0 100 64',s:`<path d="M4 32H44M56 32H96M44 14V50M56 14V50"/><path class="th" d="M50 18V46"/><text class="ts" x="50" y="62" text-anchor="middle">IK</text>`},
{c:'fit',n:'Removable spool',d:'Short flanged spool taken out for maintenance or to fit a blind.',vb:'0 0 100 64',s:`<path d="M4 32H26M74 32H96M26 16V48M32 16V48M68 16V48M74 16V48M32 32H68"/><text class="ts" x="50" y="24" text-anchor="middle">RS</text>`},
{c:'fit',n:'Coupling / threaded connection',d:'Screwed or socket-weld coupling on small bore lines.',vb:'0 0 100 64',s:`<path d="M4 32H40M60 32H96M40 22H60V42H40Z"/>`},
{c:'fit',n:'Bell mouth',d:'Flared pipe entry, for example on pump suctions in open pits.',vb:'0 0 100 64',s:`<path d="M96 32H50Q34 32 30 14M50 32Q34 32 30 50"/>`},
{c:'fit',n:'In-line (static) mixer',d:'Fixed mixing elements in the pipe; blending and chemical injection.',vb:'0 0 100 64',s:`<path d="M4 32H26M74 32H96M26 18H74V46H26Z"/><path class="tn" d="M30 42L40 22L50 42L60 22L70 42"/>`},
{c:'fit',n:'Pulsation dampener',d:'Vessel or bladder that smooths flow pulses from reciprocating or metering pumps.',vb:'0 0 100 80',s:`<path d="M4 70H96M50 70V56"/>`+vess(36,10,28,46)},
{c:'fit',n:'Injection quill',d:'Nozzle that injects chemical into the middle of the flow.',vb:'0 0 100 70',s:`<path d="M4 50H96M50 10V44"/><path class="f" d="M45 40L55 40L50 48Z" stroke="none"/><path d="M42 10H58"/>`},
{c:'fit',n:'Desuperheater',d:'Sprays water into superheated steam to bring it close to saturation.',vb:'0 0 120 70',s:`<path class="th" d="M4 46H116"/><path d="M50 10V40"/><path class="tn" d="M50 40L42 52M50 40L50 54M50 40L58 52"/><text class="ts" x="58" y="18">DSH</text>`},
{c:'fit',n:'Detonation arrester',d:'Flame arrester rated to stop a detonation in a long line.',vb:'0 0 100 64',s:`<path d="M4 32H30M70 32H96M30 14H70V50H30Z"/><path class="tn" d="M30 14L70 50M70 14L30 50M50 14V50"/><text class="ts" x="50" y="62" text-anchor="middle">DET</text>`},
{c:'fit',n:'Swivel / rotary joint',d:'Joint that allows rotation, for example on loading arms and drums.',vb:'0 0 100 64',s:`<path d="M4 32H38M62 32H96"/><circle cx="50" cy="32" r="12"/><path class="tn" d="M44 26A8 8 0 1 1 44 38"/><path class="f" d="M41 34L47 40L41 42Z" stroke="none"/>`},
{c:'fit',n:'Corrosion coupon / probe',d:'Access fitting holding a corrosion coupon or probe (CC / CP).',vb:'0 0 100 70',s:`<path d="M4 54H96M50 54V30"/><rect x="42" y="16" width="16" height="14"/><text class="ts" x="64" y="26">CC</text>`},
{c:'fit',n:'Purge connection',d:'Connection for nitrogen or steam purging before start-up or maintenance.',vb:'0 0 100 70',s:`<path d="M4 54H96M50 54V26"/><path d="M39 26L61 26L50 38Z"/><path d="M42 14H58M50 14V26"/><text class="ts" x="62" y="18">N₂</text>`},
{c:'fit',n:'Utility station / hose reel',d:'Group of utility hose connections (water, steam, air, nitrogen) for plant maintenance (US).',vb:eq,s:`<circle cx="50" cy="50" r="30"/><text class="t" x="50" y="55" text-anchor="middle">US</text><path d="M4 50H20"/>`},
{c:'fit',n:'Vortex breaker',d:'Baffle at a vessel outlet nozzle that stops vortexing and gas entrainment at pump suctions.',vb:'0 0 100 70',s:`<path d="M10 10V40H90V10M50 40V66"/><path class="tn" d="M38 30H62M50 22V38"/><text class="ts" x="58" y="58">VB</text>`},
{c:'fit',n:'Insulated line',d:'Line with insulation, shown by short marks or by the insulation code in the line number (H, C, P).',vb:'0 0 120 40',s:`<path d="M6 20H114"/>`+[20,44,68,92].map(x=>`<path class="tn" d="M${x} 26L${x+8} 14"/>`).join('')},
{c:'fit',n:'Sloped line',d:'Line laid to a fall towards the low point, for example flare and drain headers. Slope given as a ratio.',vb:'0 0 120 40',s:`<path d="M6 20H114"/><path class="tn" d="M40 32H80L40 24Z"/><text class="ts" x="86" y="34">1:200</text>`},
{c:'fit',n:'Underground line',d:'Buried line, often shown dashed with UG; changes at the AG/UG point.',vb:'0 0 120 40',s:`<path class="dsh" d="M6 20H114"/><text class="ts" x="60" y="12" text-anchor="middle">UG</text>`},
/* more instruments */
{c:'inst',n:'Analyser',d:'Analyser element and transmitter (AE / AT) for composition, pH, O₂, H₂S and so on. Analysed component noted beside it.',vb:eq,s:bub('AT','101')+`<text class="ts" x="84" y="22">H₂S</text>`},
{c:'inst',n:'Thermometer (dial)',d:'Local temperature indicator (TI) in a thermowell.',vb:'0 0 100 100',s:`<path class="th" d="M4 88H96"/><path d="M50 88V80"/>`+bub('TI','101')},
{c:'inst',n:'Pressure switch',d:'Switch acting at a set pressure (PSH high, PSL low), for example for alarms or trips.',vb:eq,s:bub('PSH','101')},
{c:'inst',n:'Level switch',d:'Switch at a set level (LSH, LSL, LSHH); float, vibrating fork or displacer.',vb:'0 0 120 100',s:`<path d="M10 10V90M10 50H40"/>`+bub('LSHH','101','',70,50,28)},
{c:'inst',n:'Hand switch / push button',d:'Operator switch (HS), for example local start/stop or ESD push button.',vb:eq,s:bub('HS','101')},
{c:'inst',n:'Instrument air supply',d:'Air supply to an actuator or positioner, often marked IA with the pressure.',vb:'0 0 120 50',s:`<path class="tn" d="M6 26H90"/><path class="f" d="M84 21L94 26L84 31Z" stroke="none"/><text class="ts" x="6" y="16">IA</text>`},
{c:'inst',n:'Signal converter (I/P)',d:'Converts a current signal to a pneumatic one (PY, FY, ...). Converter function noted beside the bubble.',vb:eq,s:bub('FY','101')+`<text class="ts" x="80" y="22">I/P</text>`},
{c:'inst',n:'Restriction / test point',d:'Pressure test point (PP) or sampling point for portable instruments.',vb:'0 0 100 70',s:`<path d="M4 54H96M50 54V36"/><circle class="w" cx="50" cy="28" r="8"/><text class="ts" x="62" y="32">PP</text>`},
/* more flow elements */
{c:'flow',n:'Coriolis flowmeter',d:'Mass flowmeter measuring the twist of vibrating tubes; also gives density.',vb:'0 0 120 64',s:`<path class="th" d="M4 40H34M86 40H116"/><path d="M34 40Q34 8 60 8Q86 8 86 40"/><path d="M42 40Q42 18 60 18Q78 18 78 40"/><text class="ts" x="60" y="56" text-anchor="middle">CORIOLIS</text>`},
{c:'flow',n:'Ultrasonic flowmeter',d:'Transit-time or Doppler meter; can be clamp-on.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H116"/><path class="tn" d="M44 14L76 50"/><rect x="38" y="6" width="12" height="10"/><rect x="70" y="48" width="12" height="10"/>`},
{c:'flow',n:'Averaging pitot tube',d:'Multi-port pitot (annubar) across the pipe; low pressure loss on large lines.',vb:'0 0 120 64',s:`<path class="th" d="M4 40H116"/><path d="M60 10V58"/>`+[24,34,46,58].map(y=>`<circle class="f" cx="60" cy="${y+10}" r="2"/>`).join('')},
{c:'flow',n:'Thermal mass flowmeter',d:'Measures gas mass flow from heat carried away from a heated sensor.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><rect x="40" y="16" width="40" height="32"/><text class="ts" x="60" y="36" text-anchor="middle">TMF</text>`},
{c:'flow',n:'Wedge / target meter',d:'Differential-pressure meter with a wedge or a target; dirty and viscous fluids.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H116"/><path class="f" d="M52 20H68L60 30Z" stroke="none"/><path class="tn" d="M50 20H70"/>`},
{c:'flow',n:'Flow straightener / conditioner',d:'Vanes or perforated plate upstream of a meter that remove swirl.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><rect x="40" y="18" width="40" height="28"/><path class="tn" d="M40 25H80M40 32H80M40 39H80"/>`},
{c:'flow',n:'Sight flow indicator',d:'Window with a flapper or rotor showing that liquid is flowing.',vb:'0 0 120 64',s:`<path class="th" d="M4 32H40M80 32H116"/><circle cx="60" cy="32" r="16"/><path class="tn" d="M60 18V30L68 40"/>`},
{c:'flow',n:'Weir / flume',d:'Open-channel flow measurement, for example in effluent and cooling water.',vb:'0 0 120 64',s:`<path d="M4 20H50V46H70V20H116"/><path class="tn dsh" d="M4 30H116"/>`},
/* more equipment */
{c:'equip',n:'Reciprocating pump',d:'Positive-displacement piston or plunger pump; high pressure, low flow.',vb:eq,s:`<rect x="20" y="36" width="44" height="28"/><path d="M64 50H86M4 44H20M4 56H20"/><circle cx="86" cy="50" r="6"/><path class="tn" d="M30 42V58"/>`},
{c:'equip',n:'Metering (dosing) pump',d:'Diaphragm or plunger pump with adjustable stroke for chemical injection.',vb:eq,s:`<circle cx="50" cy="50" r="26"/><path d="M50 24V76"/><path class="tn" d="M38 40L50 30L62 40"/><path d="M4 50H24M76 50H96"/><path class="f" d="M62 16L72 16L67 24Z" stroke="none"/>`},
{c:'equip',n:'Vertical in-line pump',d:'Centrifugal pump mounted in the line with a vertical motor.',vb:eq,s:`<circle cx="50" cy="64" r="16"/><path d="M4 64H34M66 64H96M50 48V36"/><rect x="38" y="10" width="24" height="26"/><text class="ts" x="50" y="27" text-anchor="middle">M</text>`},
{c:'equip',n:'Vertical can / sump pump',d:'Vertical turbine pump in a can or sump; long shaft, suction below grade.',vb:'0 0 100 110',s:`<rect x="38" y="6" width="24" height="18"/><text class="ts" x="50" y="19" text-anchor="middle">M</text><path d="M50 24V34M30 34H70M50 34V94M40 94H60V104H40ZM70 44H94"/><path class="tn dsh" d="M10 60H90"/>`},
{c:'equip',n:'Screw / progressive cavity pump',d:'Rotary positive-displacement pump for viscous fluids and slurries.',vb:eq,s:`<rect x="16" y="36" width="68" height="28" rx="14"/><path class="tn" d="M24 50q6-10 12 0t12 0 12 0 12 0"/><path d="M4 50H16M84 50H96"/>`},
{c:'equip',n:'Liquid ring vacuum pump',d:'Rotary pump with a liquid ring seal; vacuum service and wet gases.',vb:eq,s:`<circle cx="50" cy="50" r="28"/><circle cx="44" cy="50" r="16"/><path class="tn" d="M44 34V66M28 50H60"/><path d="M4 50H22M78 50H96"/>`},
{c:'equip',n:'Reciprocating compressor',d:'Piston compressor; high pressure ratios. Pulsation dampeners usually on suction and discharge.',vb:eq,s:`<rect x="18" y="30" width="44" height="40"/><path d="M62 50H80"/><circle cx="86" cy="50" r="6"/><path d="M30 30V14M50 70V86"/><path class="tn" d="M26 40H54V60H26Z"/>`},
{c:'equip',n:'Screw compressor',d:'Rotary screw compressor; refrigeration, instrument air and fuel gas boosting.',vb:eq,s:`<path d="M24 26L76 36V64L24 74Z"/><path class="tn" d="M30 40q8-8 16 0t16 0M30 58q8-8 16 0t16 0"/><path d="M4 50H24M76 50H96"/>`},
{c:'equip',n:'Steam turbine',d:'Steam-driven turbine driving a pump, compressor or generator.',vb:eq,s:`<path d="M24 32L76 22V78L24 68Z"/><text class="ts" x="50" y="54" text-anchor="middle">ST</text><path d="M50 22V8M50 78V92"/>`},
{c:'equip',n:'Diesel engine / gas engine',d:'Engine driver, for example on fire water pumps and emergency generators.',vb:eq,s:`<rect x="18" y="30" width="56" height="40"/><text class="ts" x="46" y="54" text-anchor="middle">D</text><path d="M74 50H96"/>`},
{c:'equip',n:'Vertical vessel on skirt',d:'Tall vessel supported on a skirt, for example columns and large drums.',vb:'0 0 100 120',s:vess(30,6,40,84)+`<path d="M34 90L30 114H70L66 90"/>`},
{c:'equip',n:'Vertical vessel on legs',d:'Small vertical vessel standing on legs.',vb:'0 0 100 110',s:vess(30,6,40,70)+`<path d="M34 70V102M66 70V102"/>`},
{c:'equip',n:'Horizontal vessel with boot',d:'Horizontal separator with a boot collecting the heavy liquid (water).',vb:eq,s:`<path d="M20 30Q8 30 8 46Q8 62 20 62H80Q92 62 92 46Q92 30 80 30Z"/><path d="M62 62V80Q62 86 68 86Q74 86 74 80V62"/>`},
{c:'equip',n:'Reactor (fixed bed)',d:'Vessel with catalyst beds, for example hydrotreating or Claus converters.',vb:'0 0 100 120',s:vess(26,6,48,108)+`<path class="tn" d="M26 40H74M26 74H74"/><path class="tn dsh" d="M26 40L74 74M74 40L26 74"/>`},
{c:'equip',n:'Dome-roof tank',d:'Storage tank with a fixed dome roof.',vb:eq,s:`<path d="M14 40Q50 14 86 40V86H14Z"/>`},
{c:'equip',n:'Pit / sump',d:'Below-grade pit or sump collecting drains, often with a sump pump.',vb:eq,s:`<path d="M4 34H18V80H82V34H96"/><path class="tn dsh" d="M18 52H82"/>`},
{c:'equip',n:'Flare stack',d:'Elevated flare burning relief and blowdown gases.',vb:'0 0 100 120',s:`<path d="M44 116V30H56V116M36 116H64"/><path d="M50 26Q38 16 46 4Q50 14 56 8Q62 18 50 26Z"/>`},
{c:'equip',n:'Vent stack',d:'Stack discharging non-flammable or dispersed vents to a safe height.',vb:'0 0 100 120',s:`<path d="M44 116V12H56V116M36 116H64M40 12H60"/>`},
{c:'equip',n:'Boiler / steam generator',d:'Fired or waste-heat boiler producing steam.',vb:eq,s:`<rect x="16" y="30" width="68" height="56"/><path d="M28 30V18Q28 10 40 10H60Q72 10 72 18V30"/><path class="tn" d="M28 72q6-12 12 0M52 72q6-12 12 0"/>`},
{c:'equip',n:'Electric heater',d:'Electric process heater or immersion heater.',vb:eq,s:`<rect x="16" y="32" width="68" height="36"/><path class="tn" d="M24 50l6-10 6 20 6-20 6 20 6-20 6 20 6-10"/><path d="M4 50H16M84 50H96"/>`},
{c:'equip',n:'Double-pipe / hairpin exchanger',d:'Pipe inside a pipe bent in a U; small duties and high pressure.',vb:'0 0 120 80',s:`<path d="M10 20H92Q108 20 108 40Q108 60 92 60H10"/><path class="tn" d="M10 28H92Q100 28 100 40Q100 52 92 52H10"/>`},
{c:'equip',n:'Spiral heat exchanger',d:'Two spiral channels; fouling and slurry duties.',vb:eq,s:`<circle cx="50" cy="50" r="30"/><path class="tn" d="M50 50m0-4a4 4 0 1 1 -4 4a10 10 0 0 1 10-10a16 16 0 0 1 16 16a22 22 0 0 1-22 22"/>`},
{c:'equip',n:'Hopper / bin',d:'Storage for solids with a conical outlet.',vb:eq,s:`<path d="M20 10H80V50L58 80H42L20 50Z"/>`},
{c:'equip',n:'Belt conveyor',d:'Moves bulk solids on a belt.',vb:'0 0 120 60',s:`<circle cx="20" cy="34" r="12"/><circle cx="100" cy="34" r="12"/><path d="M20 22H100M20 46H100"/>`},
{c:'equip',n:'Screw conveyor',d:'Moves solids along a trough with a rotating screw.',vb:'0 0 120 60',s:`<rect x="8" y="18" width="104" height="26"/><path class="tn" d="M14 44L24 18M26 44L36 18M38 44L48 18M50 44L60 18M62 44L72 18M74 44L84 18M86 44L96 18M98 44L108 18"/>`},
{c:'equip',n:'Centrifuge',d:'Separates solids or liquids by spinning.',vb:eq,s:`<path d="M20 30H80L70 76H30Z"/><path d="M50 30V12M50 76V90M40 90H60"/><path class="tn" d="M34 46H66M38 62H62"/>`},
{c:'equip',n:'Dryer',d:'Removes moisture from gas or solids, for example an instrument air dryer or a rotary dryer.',vb:'0 0 120 80',s:`<rect x="14" y="20" width="92" height="40" rx="6"/><path class="tn dsh" d="M20 30L100 50M20 50L100 30"/>`},
{c:'equip',n:'Gas cylinder / bottle',d:'Gas bottle, for example nitrogen backup or calibration gas.',vb:'0 0 100 110',s:vess(36,14,28,90)+`<path d="M46 14V6H54V14"/>`},
{c:'equip',n:'Package boundary',d:'Dash-dot outline around vendor-supplied package equipment (skid).',vb:'0 0 120 80',s:`<rect class="tn" x="8" y="10" width="104" height="60" stroke-dasharray="12 4 2 4"/><text class="ts" x="60" y="44" text-anchor="middle">PACKAGE</text>`},
/* fire and safety */
{c:'fire',n:'Fire hydrant',d:'Hydrant on the fire water ring main.',vb:eq,s:`<path d="M50 96V70M30 70H70V30Q70 14 50 14Q30 14 30 30Z"/><path d="M30 46H16M70 46H84"/>`},
{c:'fire',n:'Fire water monitor',d:'Fixed water or foam monitor (cannon) for cooling and fire fighting.',vb:eq,s:`<path d="M50 96V58"/><circle cx="50" cy="50" r="8"/><path d="M56 44L82 22M74 18L86 30"/>`},
{c:'fire',n:'Hose reel / hose station',d:'Fire hose reel or hose station.',vb:eq,s:`<circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="8"/><path d="M4 50H24"/><path class="tn" d="M58 50H76"/>`},
{c:'fire',n:'Deluge valve',d:'Automatic valve that floods a deluge or spray system on fire detection.',vb:vb64,s:V(bow())+`<text class="ts" x="50" y="22" text-anchor="middle">DV</text>`},
{c:'fire',n:'Sprinkler / spray nozzle',d:'Water spray or sprinkler head on a deluge or water spray system.',vb:'0 0 100 70',s:`<path d="M4 16H96M50 16V36"/><path d="M42 36H58L50 46Z"/><path class="tn" d="M50 50V66M44 50L34 64M56 50L66 64"/>`},
{c:'fire',n:'Foam chamber',d:'Foam maker on a tank shell, fed from the foam system.',vb:eq,s:`<path d="M60 10V90"/><path d="M60 40H36V60H60"/><path d="M4 50H36"/><text class="ts" x="66" y="54">FOAM</text>`},
{c:'fire',n:'Safety shower and eye wash',d:'Combined emergency shower and eye wash near chemical handling.',vb:eq,s:`<path d="M30 92V14H62"/><path d="M56 14H70L64 24H62Z"/><path class="tn" d="M60 28V36M64 28V38M68 28V36"/><path d="M30 60H52"/><path d="M48 54H58V60H48Z"/>`},
/* drawing connectors and notes */
{c:'draw',n:'Off-page connector',d:'Continuation to another P&ID; shows the drawing number and the destination or source.',vb:'0 0 120 50',s:`<path d="M10 10H90L110 25L90 40H10Z"/><text class="ts" x="50" y="22" text-anchor="middle">TO P&amp;ID</text><text class="ts" x="50" y="34" text-anchor="middle">-1002</text>`},
{c:'draw',n:'Off-page connector (incoming)',d:'Line arriving from another P&ID.',vb:'0 0 120 50',s:`<path d="M30 10H110V40H30L10 25Z"/><text class="ts" x="70" y="22" text-anchor="middle">FROM P&amp;ID</text><text class="ts" x="70" y="34" text-anchor="middle">-1003</text>`},
{c:'draw',n:'Utility connector',d:'Utility line coming from or going to the utility distribution P&ID.',vb:'0 0 120 50',s:`<path d="M10 25H40"/><path d="M40 12H96L108 25L96 38H40Z"/><text class="ts" x="72" y="29" text-anchor="middle">LPS</text>`},
{c:'draw',n:'Equipment nozzle tag',d:'Nozzle number on equipment, for example N1, N2.',vb:eq,s:`<path d="M10 50H44"/><circle cx="62" cy="50" r="18"/><text class="ts" x="62" y="54" text-anchor="middle">N1</text>`},
{c:'draw',n:'Note tag',d:'Reference to a note on the P&ID, for example "see note 3".',vb:eq,s:`<path d="M50 20L80 72H20Z"/><text class="t" x="50" y="64" text-anchor="middle">3</text>`},
{c:'draw',n:'Hold cloud',d:'Area with information still to be confirmed (HOLD).',vb:'0 0 120 70',s:`<path d="M20 50Q8 50 10 38Q8 26 22 26Q24 12 40 14Q48 4 62 12Q78 6 84 20Q100 18 102 32Q114 38 104 50Q104 62 88 60Q78 68 64 60Q50 68 40 60Q26 64 20 50Z"/><text class="ts" x="58" y="42" text-anchor="middle">HOLD</text>`},
{c:'draw',n:'Revision triangle',d:'Marks a change made in a revision, with the revision number.',vb:eq,s:`<path d="M50 18L84 78H16Z"/><text class="t" x="50" y="68" text-anchor="middle">B</text>`},
{c:'draw',n:'Flow arrow',d:'Direction of flow on a line.',vb:'0 0 120 40',s:`<path d="M6 20H114"/><path class="f" d="M54 12L70 20L54 28Z" stroke="none"/>`}
);
CAT.push(['fire','Fire & safety'],['draw','Drawing connectors & notes']);

/* ISA-5.1 identification letters */
const FIRST=[['A','Analysis','composition, pH, O₂, H₂S'],['B','Burner, combustion','flame'],['C','User\'s choice','often conductivity'],['D','User\'s choice','often density'],['E','Voltage',''],['F','Flow rate','FD = flow difference, FF = ratio, FQ = total'],['G','User\'s choice','often gauging / position'],['H','Hand','manually initiated'],['I','Current','electrical'],['J','Power',''],['K','Time, schedule',''],['L','Level',''],['M','User\'s choice','often moisture'],['P','Pressure','PD = differential pressure'],['Q','Quantity',''],['R','Radiation',''],['S','Speed, frequency',''],['T','Temperature','TD = temperature difference'],['U','Multivariable',''],['V','Vibration, machine analysis',''],['W','Weight, force',''],['X','Unclassified','used with a description, e.g. XV on/off valve'],['Y','Event, state, presence',''],['Z','Position, dimension','ZS = position switch']];
const NEXT=[['A','Alarm','with H / L / HH / LL, e.g. LAHH'],['C','Control','PIC, LIC'],['E','Sensor, primary element','TE, FE'],['G','Glass, gauge, viewing device','LG'],['H','High','PAH, LSHH'],['I','Indicate','PI, TI'],['K','Control station','HK'],['L','Low; light','PAL; XL'],['O','Orifice, restriction','FO, RO'],['P','Point (test connection)','PP'],['Q','Integrate, totalize','FQ'],['R','Record','TR'],['S','Switch; safety (as modifier)','PSH; PSV'],['T','Transmit','PT, LT'],['V','Valve, damper, louver','FV, PSV, XV'],['W','Well, probe','TW thermowell'],['Y','Relay, compute, convert','FY, PY (I/P)'],['Z','Driver, actuator, final element','HZ']];
const TAGS=[['PT','Pressure transmitter'],['PI','Pressure gauge'],['PIC','Pressure indicating controller'],['PSV','Pressure safety valve'],['PDT','Differential pressure transmitter'],['TE / TW','Temperature element / thermowell'],['TIC','Temperature indicating controller'],['FE / FT','Flow element / transmitter'],['FIC → FV','Flow controller → flow control valve'],['LG','Level gauge'],['LIC','Level indicating controller'],['LAHH / LALL','Level alarm high-high / low-low (trip)'],['XV / SDV','On/off valve / shutdown valve'],['BDV','Blowdown valve'],['HS','Hand switch'],['ZSO / ZSC','Limit switch open / closed'],['AT','Analyser transmitter'],['FQI','Flow totaliser']];
const ABBR=[['NO / NC','Normally open / normally closed'],['LO / LC','Locked open / locked closed'],['CSO / CSC','Car-sealed open / car-sealed closed'],['FO / FC / FL','Fail open / fail closed / fail last (fail locked)'],['TSO','Tight shut-off'],['NNF','Normally no flow'],['BL','Battery limit'],['TP','Tie-in point'],['HP / LP','High / low point (vent and drain points); also high / low pressure'],['FOT / FOB','Flat on top / flat on bottom (eccentric reducer)'],['ST / ET','Steam traced / electric traced'],['SC','Sample connection, sample cooler'],['RO','Restriction orifice'],['DCS / PLC','Distributed control system / programmable logic controller'],['SIS / ESD','Safety instrumented system / emergency shutdown'],['SIL','Safety integrity level'],['MOV','Motor-operated valve'],['IA / PA / N₂','Instrument air / plant air / nitrogen'],['LPS / MPS / HPS','Low / medium / high pressure steam'],['CWS / CWR','Cooling water supply / return'],['BFW / CD','Boiler feed water / condensate'],['FG / FW','Fuel gas / fire water'],['CD / OWS','Closed drain / oily water sewer'],['HOLD','Information still to be confirmed'],['TYP.','Typical (applies to similar items)']];

/* ------------------------------------------------------------ page */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const svgOf=(o,cls='sy')=>`<svg class="${cls}" viewBox="${o.vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.n)} symbol">${o.s}</svg>`;
const standalone=o=>{const [,, w, h]=o.vb.split(' ').map(Number);return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb}" width="${w*2}" height="${h*2}"><title>${esc(o.n)}</title><style>*{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.f{fill:#000}.w{fill:#fff}.t{fill:#000;stroke:none;font:600 13px Arial,sans-serif}.ts{fill:#000;stroke:none;font:600 10px Arial,sans-serif}.th{stroke-width:3.4}.tn{stroke-width:1.2}.dsh{stroke-dasharray:6 4}.dl{stroke-dasharray:14 5}</style>${o.s}</svg>`;};
/* ---- export: PNG and DXF (DXF opens in AutoCAD, BricsCAD, MicroStation; save as DWG there) ---- */
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const save=(blob,name)=>{const u=URL.createObjectURL(blob),l=document.createElement('a');l.href=u;l.download=name;document.body.appendChild(l);l.click();setTimeout(()=>{URL.revokeObjectURL(u);l.remove();},800);};
const CSS='*{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.f{fill:#000}.w{fill:#fff}.t{fill:#000;stroke:none;font:600 13px Arial,sans-serif}.ts{fill:#000;stroke:none;font:600 10px Arial,sans-serif}.th{stroke-width:3.4}.tn{stroke-width:1.2}.dsh{stroke-dasharray:6 4}.dl{stroke-dasharray:14 5}.lbl{fill:#000;stroke:none;font:600 15px Arial,sans-serif}.lbs{fill:#555;stroke:none;font:500 12px Arial,sans-serif}.cell{stroke:#ccc;stroke-width:1}';
function svgPng(svg,w,h,name){return new Promise(res=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);c.toBlob(b=>{save(b,name);res();},'image/png');};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});}
const pngOne=o=>{const [,,w,h]=o.vb.split(' ').map(Number),sc=6;return svgPng(standalone(o),w*sc,h*sc,`pid-${slug(o.n)}.png`);};
const wrap=(t,n)=>{const out=[];let cur='';t.split(' ').forEach(wd=>{if((cur+' '+wd).trim().length>n&&cur){out.push(cur);cur=wd;}else cur=(cur+' '+wd).trim();});if(cur)out.push(cur);return out.slice(0,3);};
function sheetSvg(list,title){
 const cols=6,cw=210,ch=170,pad=24,head=60,rows=Math.ceil(list.length/cols),W=cols*cw+pad*2,H=head+rows*ch+pad*2;
 const cells=list.map((o,i)=>{const [,,vw,vh]=o.vb.split(' ').map(Number),sc=Math.min(150/vw,80/vh),x=pad+(i%cols)*cw,y=head+pad+Math.floor(i/cols)*ch;
  return `<rect class="cell" x="${x}" y="${y}" width="${cw}" height="${ch}"/><g transform="translate(${x+(cw-vw*sc)/2} ${y+12+(80-vh*sc)/2}) scale(${sc})">${o.s}</g>`+wrap(o.n,26).map((l,k)=>`<text class="lbl" x="${x+cw/2}" y="${y+118+k*17}" text-anchor="middle">${esc(l)}</text>`).join('');}).join('');
 return {W,H,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><style>${CSS}</style><rect x="0" y="0" width="${W}" height="${H}" fill="#fff" stroke="none"/><text class="lbl" x="${pad}" y="${pad+20}" style="font-size:22px">${esc(title)}</text><text class="lbs" x="${pad}" y="${pad+40}">piperef.net · ${list.length} symbols · project legend sheet governs</text>${cells}</svg>`};}
const pngSheet=(list,title)=>{const {W,H,svg}=sheetSvg(list,title);return svgPng(svg,W*2,H*2,`pid-legend-${slug(title)||'all'}.png`);};

/* SVG geometry -> polylines / circles / texts */
function flatten(o){
 const doc=new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${o.s}</svg>`,'image/svg+xml'),out=[];
 const cls=e=>' '+(e.getAttribute('class')||'')+' ',fillOf=e=>cls(e).includes(' f ')||(e.getAttribute('fill')&&e.getAttribute('fill')!=='none'&&e.getAttribute('fill')!=='#fff'),dashOf=e=>/ dsh | dl /.test(cls(e))||!!e.getAttribute('stroke-dasharray');
 const strokeOf=e=>e.getAttribute('stroke')!=='none';
 doc.querySelectorAll('path,circle,rect,text').forEach(e=>{const t=e.tagName.toLowerCase(),A=k=>+e.getAttribute(k)||0;
  if(t==='circle')out.push({k:'c',x:A('cx'),y:A('cy'),r:A('r'),fill:fillOf(e),dash:dashOf(e)});
  else if(t==='rect'){const x=A('x'),y=A('y'),w=A('width'),h=A('height');out.push({k:'p',pts:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],closed:1,fill:fillOf(e),dash:dashOf(e)});}
  else if(t==='text'){const sm=cls(e).includes(' ts ');let sz=sm?10:13;const st=e.getAttribute('style')||'',m=st.match(/font-size:\s*([\d.]+)/);if(m)sz=+m[1];out.push({k:'t',x:A('x'),y:A('y'),h:sz*.72,s:e.textContent,a:e.getAttribute('text-anchor')==='middle'?1:e.getAttribute('text-anchor')==='end'?2:0});}
  else pathPolys(e.getAttribute('d')||'').forEach(p=>out.push({k:'p',pts:p.pts,closed:p.closed,fill:fillOf(e)&&p.closed,dash:dashOf(e),nostroke:!strokeOf(e)}));});
 return out;}
function pathPolys(d){
 const tk=d.match(/[a-zA-Z]|-?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/g)||[];let i=0,cmd='',x=0,y=0,sx=0,sy=0,cx=0,cy=0,qx=0,qy=0,prev='';
 const polys=[];let cur=null;const num=()=>+tk[i++];const isNum=()=>i<tk.length&&!/[a-zA-Z]/.test(tk[i]);
 const start=(nx,ny)=>{if(cur&&cur.pts.length>1)polys.push(cur);cur={pts:[[nx,ny]],closed:0};sx=nx;sy=ny;};
 const to=(nx,ny)=>{if(!cur)start(x,y);cur.pts.push([nx,ny]);};
 const N=12;
 while(i<tk.length){if(/[a-zA-Z]/.test(tk[i]))cmd=tk[i++];const rel=cmd===cmd.toLowerCase(),C=cmd.toUpperCase();
  if(C==='Z'){if(cur){cur.closed=1;polys.push(cur);cur=null;}x=sx;y=sy;prev='Z';continue;}
  if(!isNum())break;
  if(C==='M'){let nx=num(),ny=num();if(rel){nx+=x;ny+=y;}x=nx;y=ny;start(x,y);cmd=rel?'l':'L';prev='M';continue;}
  if(C==='L'){let nx=num(),ny=num();if(rel){nx+=x;ny+=y;}to(nx,ny);x=nx;y=ny;}
  else if(C==='H'){let nx=num();if(rel)nx+=x;to(nx,y);x=nx;}
  else if(C==='V'){let ny=num();if(rel)ny+=y;to(x,ny);y=ny;}
  else if(C==='Q'||C==='T'){let x1,y1;if(C==='Q'){x1=num();y1=num();if(rel){x1+=x;y1+=y;}}else{x1=/[QT]/.test(prev)?2*x-qx:x;y1=/[QT]/.test(prev)?2*y-qy:y;}
   let nx=num(),ny=num();if(rel){nx+=x;ny+=y;}for(let k=1;k<=N;k++){const s=k/N,u=1-s;to(u*u*x+2*u*s*x1+s*s*nx,u*u*y+2*u*s*y1+s*s*ny);}qx=x1;qy=y1;x=nx;y=ny;}
  else if(C==='C'||C==='S'){let x1,y1;if(C==='C'){x1=num();y1=num();if(rel){x1+=x;y1+=y;}}else{x1=/[CS]/.test(prev)?2*x-cx:x;y1=/[CS]/.test(prev)?2*y-cy:y;}
   let x2=num(),y2=num(),nx=num(),ny=num();if(rel){x2+=x;y2+=y;nx+=x;ny+=y;}
   for(let k=1;k<=N;k++){const s=k/N,u=1-s;to(u*u*u*x+3*u*u*s*x1+3*u*s*s*x2+s*s*s*nx,u*u*u*y+3*u*u*s*y1+3*u*s*s*y2+s*s*s*ny);}cx=x2;cy=y2;x=nx;y=ny;}
  else if(C==='A'){let rx=Math.abs(num()),ry=Math.abs(num());const rot=num()*Math.PI/180,la=num(),sw=num();let nx=num(),ny=num();if(rel){nx+=x;ny+=y;}
   arc(x,y,rx,ry,rot,la,sw,nx,ny).forEach(p=>to(p[0],p[1]));x=nx;y=ny;}
  else{i++;continue;}
  prev=C;}
 if(cur&&cur.pts.length>1)polys.push(cur);return polys;}
function arc(x1,y1,rx,ry,phi,fa,fs,x2,y2){
 if(!rx||!ry)return [[x2,y2]];const c=Math.cos(phi),s=Math.sin(phi),dx=(x1-x2)/2,dy=(y1-y2)/2,xp=c*dx+s*dy,yp=-s*dx+c*dy;
 let L=xp*xp/(rx*rx)+yp*yp/(ry*ry);if(L>1){rx*=Math.sqrt(L);ry*=Math.sqrt(L);}
 let num=rx*rx*ry*ry-rx*rx*yp*yp-ry*ry*xp*xp,den=rx*rx*yp*yp+ry*ry*xp*xp,co=Math.sqrt(Math.max(0,num/den))*(fa===fs?-1:1);
 const cxp=co*rx*yp/ry,cyp=-co*ry*xp/rx,cx=c*cxp-s*cyp+(x1+x2)/2,cy=s*cxp+c*cyp+(y1+y2)/2;
 const ang=(ux,uy,vx,vy)=>{const a=Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy);return a;};
 const t1=ang(1,0,(xp-cxp)/rx,(yp-cyp)/ry);let dt=ang((xp-cxp)/rx,(yp-cyp)/ry,(-xp-cxp)/rx,(-yp-cyp)/ry);
 if(!fs&&dt>0)dt-=2*Math.PI;if(fs&&dt<0)dt+=2*Math.PI;const n=Math.max(4,Math.ceil(Math.abs(dt)/(Math.PI/12))),pts=[];
 for(let k=1;k<=n;k++){const t=t1+dt*k/n;pts.push([cx+rx*Math.cos(t)*c-ry*Math.sin(t)*s,cy+rx*Math.cos(t)*s+ry*Math.sin(t)*c]);}return pts;}

/* DXF (AutoCAD R12 ASCII, units mm). 10 symbol units = 1 mm, so a valve is about 9 mm long. */
const K=.1;
const dxfTxt=s=>String(s).replace(/[^\x20-\x7e]/g,ch=>'\\U+'+ch.codePointAt(0).toString(16).toUpperCase().padStart(4,'0'));
const blockName=(o,used)=>{let b='PID_'+o.n.toUpperCase().replace(/[^A-Z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,40),n=b,k=2;while(used.has(n))n=b+'_'+k++;used.add(n);return n;};
function ents(o,lay){
 const [,,w,h]=o.vb.split(' ').map(Number),X=v=>((v-w/2)*K).toFixed(4),Yy=v=>((h/2-v)*K).toFixed(4),g=[];
 const pl=(pts,closed,dash)=>{g.push('0','POLYLINE','8',lay,...(dash?['6','DASHED']:[]),'66','1','70',closed?'1':'0','10','0','20','0','30','0');pts.forEach(p=>g.push('0','VERTEX','8',lay,'10',X(p[0]),'20',Yy(p[1]),'30','0'));g.push('0','SEQEND','8',lay);};
 const solid=(a,b,c)=>g.push('0','SOLID','8',lay,'10',X(a[0]),'20',Yy(a[1]),'30','0','11',X(b[0]),'21',Yy(b[1]),'31','0','12',X(c[0]),'22',Yy(c[1]),'32','0','13',X(c[0]),'23',Yy(c[1]),'33','0');
 const fan=pts=>{for(let k=1;k<pts.length-1;k++)solid(pts[0],pts[k],pts[k+1]);};
 flatten(o).forEach(e=>{
  if(e.k==='p'){if(!e.nostroke)pl(e.pts,e.closed,e.dash);if(e.fill)fan(e.pts);}
  else if(e.k==='c'){g.push('0','CIRCLE','8',lay,...(e.dash?['6','DASHED']:[]),'10',X(e.x),'20',Yy(e.y),'30','0','40',(e.r*K).toFixed(4));if(e.fill){const pts=[];for(let k=0;k<24;k++)pts.push([e.x+e.r*Math.cos(k*Math.PI/12),e.y+e.r*Math.sin(k*Math.PI/12)]);fan(pts);}}
  else if(e.k==='t'){g.push('0','TEXT','8',lay,'10',X(e.x),'20',Yy(e.y),'30','0','40',(e.h*K).toFixed(4),'1',dxfTxt(e.s));if(e.a)g.push('72',String(e.a),'11',X(e.x),'21',Yy(e.y),'31','0');}});
 return g;}
function dxf(list){
 const used=new Set(),names=list.map(o=>blockName(o,used)),L=[];
 L.push('0','SECTION','2','HEADER','9','$ACADVER','1','AC1009','9','$INSBASE','10','0','20','0','30','0','9','$LTSCALE','40','1','0','ENDSEC');
 L.push('0','SECTION','2','TABLES',
  '0','TABLE','2','LTYPE','70','2','0','LTYPE','2','CONTINUOUS','70','0','3','Solid line','72','65','73','0','40','0',
  '0','LTYPE','2','DASHED','70','0','3','Dashed __ __ __','72','65','73','2','40','1.0','49','0.6','49','-0.4','0','ENDTAB',
  '0','TABLE','2','LAYER','70','3','0','LAYER','2','0','70','0','62','7','6','CONTINUOUS','0','LAYER','2','PID-SYMBOL','70','0','62','7','6','CONTINUOUS','0','LAYER','2','PID-LABEL','70','0','62','8','6','CONTINUOUS','0','ENDTAB',
  '0','TABLE','2','STYLE','70','1','0','STYLE','2','STANDARD','70','0','40','0','41','1','50','0','71','0','42','2.5','3','txt','4','','0','ENDTAB','0','ENDSEC');
 L.push('0','SECTION','2','BLOCKS');
 list.forEach((o,i)=>{L.push('0','BLOCK','8','0','2',names[i],'70','0','10','0','20','0','30','0','3',names[i],...ents(o,'0'),'0','ENDBLK','8','0');});
 L.push('0','ENDSEC','0','SECTION','2','ENTITIES');
 const cols=list.length===1?1:8,cw=25,ch=22;
 list.forEach((o,i)=>{const x=(i%cols)*cw,y=-Math.floor(i/cols)*ch;
  L.push('0','INSERT','8','PID-SYMBOL','2',names[i],'10',x.toFixed(3),'20',y.toFixed(3),'30','0');
  if(list.length>1)wrap(o.n,24).forEach((t,k)=>L.push('0','TEXT','8','PID-LABEL','10',x.toFixed(3),'20',(y-7.5-k*1.9).toFixed(3),'30','0','40','1.2','1',dxfTxt(t),'72','1','11',x.toFixed(3),'21',(y-7.5-k*1.9).toFixed(3),'31','0'));});
 L.push('0','ENDSEC','0','EOF');
 return L.join('\r\n')+'\r\n';}
const dxfSave=(list,name)=>save(new Blob([dxf(list)],{type:'application/dxf'}),name);
window.__pid={S,dxf,flatten,sheetSvg};
let CUR=(()=>{try{return store.get('pid_c','all')||'all'}catch(e){return 'all'}})(),Q='';
const visible=()=>{const q=Q.trim().toLowerCase(),ord=k=>CAT.findIndex(c=>c[0]===k);return S.map((o,i)=>({...o,i})).filter(o=>(CUR==='all'||o.c===CUR)&&(!q||(o.n+' '+o.d+' '+o.c).toLowerCase().includes(q))).sort((a,b)=>ord(a.c)-ord(b.c)||a.i-b.i);};
const setTitle=()=>{const t=P.querySelector('#pdDlN');if(t)t.textContent=visible().length;};
function grid(){
 const list=visible();
 const secs=CAT.filter(c=>list.some(o=>o.c===c[0]));
 return secs.length?secs.map(([k,l])=>`<section class="pd-sec"><h2>${l}</h2><div class="pd-grid">${list.filter(o=>o.c===k).map(o=>`<button class="pd-card" type="button" data-i="${o.i}"><div class="pd-sym">${svgOf(o)}</div><b>${esc(o.n)}</b><span>${esc(o.d.split('. ')[0].replace(/\.$/,''))}.</span></button>`).join('')}</div></section>`).join('')
  :`<p class="pd-empty">No symbol matches “${esc(Q)}”. Try a shorter word, like “valve” or “pump”.</p>`;}
function render(){
 const count=k=>k==='all'?S.length:S.filter(o=>o.c===k).length;
 P.innerHTML=`<div class="phead"><div><h1>P&amp;ID symbols</h1><p>Over 200 common P&amp;ID legend symbols for lines, valves, fittings, instruments, equipment and fire &amp; safety, with ISA-5.1 tag letters, abbreviations and the line number format. Click a symbol for details or to download it as a PNG image.</p></div></div>
 <div class="pd-bar" role="toolbar" aria-label="Symbol groups">${[['all','All'],...CAT].map(([k,l])=>`<button class="pd-chip" type="button" data-c="${k}" aria-pressed="${CUR===k}">${l} <small>${count(k)}</small></button>`).join('')}
  <input class="pd-q" id="pdQ" type="search" placeholder="Search symbols, e.g. check valve, PSV, pump" aria-label="Search symbols" value="${esc(Q)}"></div>
 <div class="pd-dl" role="group" aria-label="Download symbols"><span>Download the <b id="pdDlN">${visible().length}</b> symbols shown:</span><button class="pd-btn pri" type="button" data-x="dxf">DXF block library (AutoCAD)</button><button class="pd-btn" type="button" data-x="png">PNG legend sheet</button><small>DXF opens in AutoCAD, BricsCAD and MicroStation; each symbol is a named block. Use Save As there to get a DWG.</small></div>
 <div id="pdGrid">${grid()}</div>
 <section class="pd-sec"><h2>Instrument tag letters (ISA-5.1)</h2><p>A tag is the measured variable (first letter), optional modifier, then the functions. Example: <b>LAHH</b> = level, alarm, high-high.</p>
  <div class="pd-cols"><div class="pd-box2"><h3 style="margin:0 0 6px;font-size:14px">First letter: measured variable</h3><table class="pd-t"><tbody>${FIRST.map(([a,b,c])=>`<tr><td>${a}</td><td>${b}${c?`<br><small style="color:var(--muted)">${esc(c)}</small>`:''}</td></tr>`).join('')}</tbody></table></div>
  <div class="pd-box2"><h3 style="margin:0 0 6px;font-size:14px">Succeeding letters: function</h3><table class="pd-t"><tbody>${NEXT.map(([a,b,c])=>`<tr><td>${a}</td><td>${b}${c?`<br><small style="color:var(--muted)">${esc(c)}</small>`:''}</td></tr>`).join('')}</tbody></table>
   <h3 style="margin:14px 0 6px;font-size:14px">Common tags</h3><table class="pd-t"><tbody>${TAGS.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div></div></section>
 <section class="pd-sec"><h2>Line number format</h2><p>A typical line number. Each project's format is set in its piping and P&amp;ID specification.</p>
  <div class="pd-box2"><div class="pd-ln"><span>6"</span>-<span>P</span>-<span>1001</span>-<span>A1A</span>-<span>H50</span></div>
  <table class="pd-t"><tbody><tr><td>6"</td><td>Nominal pipe size (NPS 6 / DN 150)</td></tr><tr><td>P</td><td>Service or fluid code, e.g. P process, LPS low pressure steam, CWS cooling water supply</td></tr><tr><td>1001</td><td>Line sequence number, often starting with the unit number</td></tr><tr><td>A1A</td><td>Piping class (material, rating, corrosion allowance)</td></tr><tr><td>H50</td><td>Insulation type and thickness: H hot, C cold, P personnel protection, ST / ET tracing</td></tr></tbody></table></div></section>
 <section class="pd-sec"><h2>Abbreviations</h2><p>Abbreviations seen on most P&amp;IDs and legend sheets.</p>
  <div class="pd-box2"><table class="pd-t"><tbody>${ABBR.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div>
  <p class="pd-note">Symbols follow the common style of ANSI/ISA-5.1 (instrumentation) and typical EPC legend sheets; details differ between companies and projects. The project's own P&amp;ID legend sheet always governs.</p></section>`;
 bind();}
function show(i){const o=S[i];if(!o)return;
 const d=document.createElement('div');d.className='pd-dlg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label',o.n);
 d.innerHTML=`<div class="pd-box"><button class="pd-x" type="button" aria-label="Close">×</button><h3>${esc(o.n)}</h3><small style="color:var(--muted)">${esc((CAT.find(c=>c[0]===o.c)||[])[1]||'')}</small><div class="pd-sym">${svgOf(o)}</div><p>${esc(o.d)}</p>
 <div class="pd-acts"><button class="pd-btn pri" type="button" data-a="dxf">DXF (AutoCAD)</button><button class="pd-btn" type="button" data-a="png">PNG</button><button class="pd-btn" type="button" data-a="dl">SVG</button><button class="pd-btn" type="button" data-a="cp">Copy SVG code</button>${window.shareChat?'<button class="pd-btn" type="button" data-a="chat">Copy for chat</button>':''}</div></div>`;
 P.appendChild(d);const prev=document.activeElement;d.querySelector('.pd-x').focus();
 const close=()=>{d.remove();if(prev&&prev.focus)prev.focus();};
 d.addEventListener('click',e=>{if(e.target===d||e.target.closest('.pd-x'))close();const a=e.target.closest('[data-a]');if(!a)return;
  if(a.dataset.a==='dl'){const b=new Blob([standalone(o)],{type:'image/svg+xml'}),u=URL.createObjectURL(b),l=document.createElement('a');l.href=u;l.download=`pid-${o.n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}.svg`;document.body.appendChild(l);l.click();setTimeout(()=>{URL.revokeObjectURL(u);l.remove();},500);}
  if(a.dataset.a==='png')pngOne(o);
  if(a.dataset.a==='dxf')dxfSave([o],`pid-${slug(o.n)}.dxf`);
  if(a.dataset.a==='cp'){navigator.clipboard&&navigator.clipboard.writeText(standalone(o)).then(()=>{a.textContent='Copied';setTimeout(()=>a.textContent='Copy SVG code',1500);});}
  if(a.dataset.a==='chat')window.shareChat({title:'P&ID symbol: '+o.n,sub:(CAT.find(c=>c[0]===o.c)||[])[1],rows:[['Meaning',o.d]],note:'The project P&ID legend sheet governs.'});});
 d.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
function bind(){
 P.querySelector('.pd-bar').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;CUR=b.dataset.c;try{store.set('pid_c',CUR)}catch(err){}
  P.querySelectorAll('.pd-chip').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.c===CUR)));P.querySelector('#pdGrid').innerHTML=grid();setTitle();});
 P.querySelector('#pdQ').addEventListener('input',e=>{Q=e.target.value;P.querySelector('#pdGrid').innerHTML=grid();setTitle();});
 P.querySelector('.pd-dl').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const list=visible();if(!list.length)return;
  const lbl=Q.trim()?('search '+Q.trim()):CUR==='all'?'All symbols':((CAT.find(c=>c[0]===CUR)||[])[1]||CUR);
  if(b.dataset.x==='dxf')dxfSave(list,`pid-symbols-${slug(lbl)}.dxf`);else{b.disabled=true;pngSheet(list,'P&ID legend: '+lbl).then(()=>b.disabled=false);}});
 P.querySelector('#pdGrid').addEventListener('click',e=>{const c=e.target.closest('.pd-card');if(c)show(+c.dataset.i);});}
render();
window.renderPID=()=>{};
})();
