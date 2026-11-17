/* Isometric symbols and conventions: legend symbols, drafting conventions and an annotated sample iso. Globals from app.js: store. */
(function(){
const P=document.getElementById('p-isy');if(!P)return;
if(!document.getElementById('isy-css')){const st=document.createElement('style');st.id='isy-css';st.textContent=`
#p-isy .pd-dl{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 14px;padding:10px 12px;border:1px solid var(--rule);border-radius:10px;background:var(--sheet)}#p-isy .pd-dl small{flex-basis:100%;color:var(--muted);font-size:12px}#p-isy .pd-dl span{font-size:13px}
#p-isy .pd-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:16px 0 14px}
#p-isy .pd-chip{border:1px solid var(--rule-strong);background:var(--sheet);color:var(--ink-2);border-radius:99px;padding:6px 13px;font:inherit;font-size:13px;font-weight:550;cursor:pointer}
#p-isy .pd-chip[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-isy .pd-chip small{opacity:.7;font-weight:500}
#p-isy .pd-q{flex:1 1 220px;min-width:180px;height:36px;border:1px solid var(--rule-strong);border-radius:var(--r);padding:0 12px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink)}
#p-isy .pd-sec{margin:22px 0 0}#p-isy .pd-sec>h2{font-size:17px;margin:0 0 2px}#p-isy .pd-sec>p{margin:0 0 12px;font-size:13.5px;color:var(--muted)}
#p-isy .pd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:10px}
#p-isy .pd-card{display:flex;flex-direction:column;align-items:stretch;gap:6px;border:1px solid var(--rule);border-radius:12px;background:var(--sheet);padding:10px 10px 9px;cursor:pointer;text-align:left;font:inherit;color:var(--ink)}
#p-isy .pd-card:hover,#p-isy .pd-card:focus-visible{border-color:var(--accent);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 15%,transparent)}
#p-isy .pd-sym{height:74px;display:flex;align-items:center;justify-content:center;background:#FAFBFD;border-radius:8px;color:#1F2937}
#p-isy .pd-sym svg{max-width:100%;max-height:66px;width:auto;height:66px}
#p-isy .pd-card b{font-size:13.5px;line-height:1.3}#p-isy .pd-card span{font-size:12px;color:var(--muted);line-height:1.35}
#p-isy svg.sy{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#p-isy svg.sy .f{fill:currentColor}#p-isy svg.sy .w{fill:#fff}#p-isy svg.sy .t{fill:currentColor;stroke:none;font:600 13px Geist,system-ui,sans-serif}#p-isy svg.sy .ts{fill:currentColor;stroke:none;font:600 10px Geist,system-ui,sans-serif}
#p-isy svg.sy .th{stroke-width:3.4}#p-isy svg.sy .tn{stroke-width:1.2}#p-isy svg.sy .dsh{stroke-dasharray:6 4}#p-isy svg.sy .dl{stroke-dasharray:14 5}
#p-isy .pd-dlg{position:fixed;inset:0;z-index:80;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:16px}
#p-isy .pd-box{background:var(--sheet);border-radius:16px;max-width:560px;width:100%;padding:18px 20px;box-shadow:0 20px 50px rgba(0,0,0,.25);max-height:90vh;overflow:auto}
#p-isy .pd-box .pd-sym{height:200px;margin:8px 0 12px}#p-isy .pd-box .pd-sym svg{height:180px;max-height:180px}
#p-isy .pd-box h3{margin:0;font-size:18px}#p-isy .pd-box p{font-size:14px;line-height:1.55;color:var(--ink-2);margin:6px 0 0}
#p-isy .pd-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
#p-isy .pd-btn{height:34px;padding:0 13px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
#p-isy .pd-btn.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-isy .pd-x{float:right;border:0;background:none;font-size:22px;line-height:1;color:var(--muted);cursor:pointer}
#p-isy .pd-t{width:100%;border-collapse:collapse;font-size:13.5px}#p-isy .pd-t th{text-align:left;font-size:12px;color:var(--muted);font-weight:600;padding:6px 8px;border-bottom:1px solid var(--rule)}
#p-isy .pd-t td{padding:7px 8px;border-bottom:1px solid var(--rule);vertical-align:top;text-align:left!important;white-space:normal}#p-isy .pd-t td:first-child{font-weight:700;white-space:nowrap;font-family:var(--mono,ui-monospace,monospace)}
#p-isy .pd-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
#p-isy .pd-box2{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-isy .pd-ln{display:flex;flex-wrap:wrap;gap:4px;font:700 20px var(--mono,ui-monospace,monospace);margin:6px 0 12px}
#p-isy .pd-ln span{padding:4px 8px;border-radius:6px;background:rgba(24,73,169,.09);color:#1849A9}
#p-isy .pd-note{font-size:12.5px;color:var(--muted);margin:14px 0 0;line-height:1.5}
#p-isy .pd-empty{padding:24px;text-align:center;color:var(--muted);border:1px dashed var(--rule);border-radius:12px}
[data-theme=dark] #p-isy .pd-sym{background:#EEF2F7}[data-theme=dark] #p-isy .pd-ln span{color:#9DB8F6;background:rgba(157,184,246,.12)}
@media (max-width:760px){#p-isy .pd-cols{grid-template-columns:1fr}#p-isy .pd-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}

#p-isy .iy-sample{border:1px solid var(--rule);border-radius:14px;background:#FAFBFD;color:#1F2937;padding:10px;overflow-x:auto}
#p-isy .iy-sample svg{display:block;min-width:640px;width:100%;height:auto}
#p-isy .iy-sample svg .tn{stroke-width:1}#p-isy .iy-sample svg .lab{fill:#1849A9;stroke:none;font:600 11px Geist,system-ui,sans-serif}
#p-isy .iy-sample svg .call{stroke:#1849A9;stroke-width:1;stroke-dasharray:3 3}
#p-isy .iy-conv{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
#p-isy .iy-conv h3{margin:0 0 6px;font-size:14.5px}#p-isy .iy-conv ul{margin:0;padding-left:18px;font-size:13.5px;line-height:1.55;color:var(--ink-2)}
#p-isy .iy-conv li+li{margin-top:3px}
[data-theme=dark] #p-isy .iy-sample{background:#EEF2F7}
`;document.head.appendChild(st);}
/* ------------------------------------------------------------ isometric symbol library (viewBox 0 0 120 64, pipe on y 40) */
const PY=40,PIPE=(a=6,b=114)=>`<path class="th" d="M${a} ${PY}H${b}"/>`;
const dot=(x,y=PY)=>`<circle class="f" cx="${x}" cy="${y}" r="3.2"/>`;
const flg=(x,h=14)=>`<path class="th" d="M${x} ${PY-h}V${PY+h}"/>`;
const bowI=(cx=60,w=13,h=10,fill='')=>`<path d="M${cx-w} ${PY-h}L${cx} ${PY}L${cx-w} ${PY+h}Z"${fill==='L'?' class="f"':''}/><path d="M${cx+w} ${PY-h}L${cx} ${PY}L${cx+w} ${PY+h}Z"${fill==='R'?' class="f"':''}/>`;
const VI=(inner,stem=true)=>PIPE(6,30)+PIPE(90,114)+flg(30)+flg(34)+flg(86)+flg(90)+`<path class="th" d="M34 ${PY}H${47}M73 ${PY}H86"/>`+inner+(stem?`<path d="M60 ${PY}V18M50 18H70"/>`:'');
const tag=(x,y,t,w=30)=>`<rect class="w" x="${x-w/2}" y="${y-9}" width="${w}" height="18" rx="3"/><text class="ts" x="${x}" y="${y+4}" text-anchor="middle">${t}</text>`;
const ISO_C=0.866,ISO_S=0.5;
const CAT=[['lines','Lines, welds & joints'],['fit','Fittings'],['valves','Flanges & valves'],['sup','Supports'],['spec','Vents, drains & specials'],['ann','Dimensions & annotations']];
const S=[
/* lines and welds */
{c:'lines',n:'Pipe (centreline)',d:'Every line on an isometric is drawn as a single thick line along its centreline, whatever the pipe size. Size, class and line number go in the title block and line labels.',vb:'0 0 120 64',s:PIPE()},
{c:'lines',n:'Shop weld',d:'Butt weld made in the fabrication shop. Shown as a dot on the line, usually with a weld number.',vb:'0 0 120 64',s:PIPE()+dot(60)},
{c:'lines',n:'Field weld (FW)',d:'Weld made on site during erection. Shown with a distinct field weld mark (often a dot with a flag or cross) and labelled FW.',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M54 ${PY-6}L66 ${PY+6}M54 ${PY+6}L66 ${PY-6}"/><path class="tn" d="M60 ${PY-8}V14"/><path class="f" d="M60 14H76L60 22Z" stroke="none"/><text class="ts" x="62" y="58">FW</text>`},
{c:'lines',n:'Field fit weld (FFW)',d:'Field weld where the pipe is supplied with extra length (typically 100–150 mm) so it can be cut to fit on site. Common at tie-ins and equipment connections.',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M54 ${PY-6}L66 ${PY+6}M54 ${PY+6}L66 ${PY-6}"/><path class="tn" d="M60 ${PY-8}V14"/><path class="f" d="M60 14H76L60 22Z" stroke="none"/><text class="ts" x="56" y="58">FFW +100</text>`},
{c:'lines',n:'Socket weld joint',d:'Pipe inserted into a socket fitting and fillet welded. Remember the 1.6 mm gap at the socket bottom.',vb:'0 0 120 64',s:PIPE(6,54)+`<path class="th" d="M54 ${PY-8}H72V${PY+8}H54"/><path class="th" d="M72 ${PY}H114"/>`+dot(54,PY-8)+dot(54,PY+8)},
{c:'lines',n:'Threaded (screwed) joint',d:'Threaded connection, usually NPT. Shown as a short cross line; limited to small-bore utilities in most piping classes.',vb:'0 0 120 64',s:PIPE()+`<path d="M56 ${PY-9}V${PY+9}M62 ${PY-9}V${PY+9}"/><text class="ts" x="49" y="22">NPT</text>`},
{c:'lines',n:'Flanged joint',d:'Pair of flanges with gasket and bolts. The two short lines are the flange faces; bolt and gasket items appear in the BOM.',vb:'0 0 120 64',s:PIPE(6,54)+PIPE(66,114)+flg(54)+flg(66)+dot(46)+dot(74)},
{c:'lines',n:'Weld number',d:'Each weld gets a unique number, used in the weld map, NDE records and PWHT records.',vb:'0 0 120 64',s:PIPE()+dot(60)+`<path class="tn" d="M60 ${PY}L76 18"/><circle class="w" cx="86" cy="14" r="11"/><text class="ts" x="86" y="18" text-anchor="middle">W7</text>`},
{c:'lines',n:'Spool number',d:'Shop-fabricated piece between field welds or flanges, marked with its spool number for fabrication, painting and erection tracking.',vb:'0 0 120 64',s:PIPE()+tag(60,18,'SP-03',40)},
{c:'lines',n:'Spec break',d:'Point where the piping class changes. Both classes are shown either side of the mark.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY-14}V${PY+14}" class="th"/><text class="ts" x="54" y="22" text-anchor="end">A1A</text><text class="ts" x="66" y="22">B1A</text>`},
{c:'lines',n:'Insulation',d:'Insulated portion of the line, shown by short marks or a note with the insulation code and thickness (e.g. H50). Limits are dimensioned where insulation stops.',vb:'0 0 120 64',s:PIPE()+[20,40,60,80,100].map(x=>`<path class="tn" d="M${x-5} ${PY+8}L${x+5} ${PY-8}"/>`).join('')+`<text class="ts" x="60" y="20" text-anchor="middle">H50</text>`},
{c:'lines',n:'Heat tracing',d:'Steam (ST) or electric (ET) tracing alongside the pipe, shown as a dashed line with its code.',vb:'0 0 120 64',s:PIPE()+`<path class="dsh tn" d="M6 ${PY-8}H114"/><text class="ts" x="60" y="22" text-anchor="middle">ST</text>`},
{c:'lines',n:'Continuation to another iso',d:'The line continues on another isometric sheet; the note gives that drawing number and the match point.',vb:'0 0 120 64',s:PIPE(6,70)+`<path class="f" d="M70 ${PY-7}L84 ${PY}L70 ${PY+7}Z" stroke="none"/><text class="ts" x="6" y="20">CONT. ON</text><text class="ts" x="6" y="58">ISO 1001-02</text>`},
{c:'lines',n:'Pipe break',d:'Long straight run shortened on the drawing. Dimensions still give the true length.',vb:'0 0 120 64',s:PIPE(6,52)+PIPE(68,114)+`<path d="M50 ${PY+10}L55 ${PY-10}M65 ${PY+10}L70 ${PY-10}"/>`},
/* fittings */
{c:'fit',n:'90° elbow',d:'Change of direction. On isos the elbow is drawn as a sharp corner with weld dots at both ends; LR (1.5D) unless noted SR.',vb:'0 0 120 64',s:`<path class="th" d="M10 52H60V8"/>`+dot(42,52)+dot(60,34)+`<path class="tn" d="M48 52A12 12 0 0 0 60 40"/>`},
{c:'fit',n:'45° elbow',d:'45° change of direction, dimensioned with the offset triangle (see Skew offset).',vb:'0 0 120 64',s:`<path class="th" d="M8 52H54L88 18"/>`+dot(40,52)+dot(66,40)},
{c:'fit',n:'Pipe bend',d:'Induction or cold bend (e.g. 3D, 5D): a smooth curve with no welds at the bend, tangent lengths at each end.',vb:'0 0 120 64',s:`<path class="th" d="M8 54H40Q72 54 72 22V6"/>`},
{c:'fit',n:'Equal tee',d:'Butt-weld tee with three weld dots. A reducing tee is labelled with both sizes, e.g. 6"×4".',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M60 ${PY}V8"/>`+dot(44)+dot(76)+dot(60,24)},
{c:'fit',n:'Reducing tee',d:'Tee with a smaller branch; the BOM gives run × branch sizes.',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M60 ${PY}V10" style="stroke-width:2.2"/>`+dot(44)+dot(76)+dot(60,26)+`<text class="ts" x="66" y="16">6"×3"</text>`},
{c:'fit',n:'Weldolet / sockolet',d:'Integrally reinforced branch outlet welded on the header (MSS SP-97). The branch is drawn from a small saddle on the run.',vb:'0 0 120 64',s:PIPE()+`<path d="M52 ${PY-2}L56 ${PY-10}H64L68 ${PY-2}"/><path class="th" d="M60 ${PY-10}V8"/>`+dot(60,PY-10)},
{c:'fit',n:'Concentric reducer',d:'Size change on the same centreline. Labelled with both sizes.',vb:'0 0 120 64',s:PIPE(6,44)+PIPE(76,114)+`<path d="M44 ${PY-12}L76 ${PY-6}V${PY+6}L44 ${PY+12}Z"/>`+dot(44)+dot(76)},
{c:'fit',n:'Eccentric reducer FOT',d:'Flat on top: keeps the top of pipe level, used at pump suctions so no vapour pocket forms. FOT / FOB must be marked.',vb:'0 0 120 64',s:PIPE(6,44)+`<path class="th" d="M76 ${PY-6}H114"/><path d="M44 ${PY-12}H76V${PY}L44 ${PY+12}Z"/><text class="ts" x="60" y="20" text-anchor="middle">FOT</text>`+dot(44)},
{c:'fit',n:'Eccentric reducer FOB',d:'Flat on bottom: keeps the bottom of pipe level, used on racks and sleepers so supports stay at one elevation.',vb:'0 0 120 64',s:PIPE(6,44)+`<path class="th" d="M76 ${PY+6}H114"/><path d="M44 ${PY-12}L76 ${PY}V${PY+12}H44Z"/><text class="ts" x="60" y="62" text-anchor="middle">FOB</text>`+dot(44)},
{c:'fit',n:'Cap',d:'Butt-weld cap closing the end of a line.',vb:'0 0 120 64',s:PIPE(6,80)+`<path d="M80 ${PY-12}A12 12 0 0 1 80 ${PY+12}Z"/>`+dot(80)},
{c:'fit',n:'Coupling / half coupling',d:'Forged socket-weld or threaded coupling (B16.11), for small-bore joints and branch connections.',vb:'0 0 120 64',s:PIPE(6,50)+PIPE(70,114)+`<rect x="50" y="${PY-9}" width="20" height="18"/>`},
{c:'fit',n:'Union',d:'Threaded or socket-weld union allowing small-bore piping to be broken without cutting.',vb:'0 0 120 64',s:PIPE(6,52)+PIPE(68,114)+`<path d="M52 ${PY-10}V${PY+10}M68 ${PY-10}V${PY+10}M56 ${PY-7}V${PY+7}M64 ${PY-7}V${PY+7}"/>`},
{c:'fit',n:'Swage nipple',d:'Forged reducer for small bore (MSS SP-95), end types noted, e.g. LBE × TSE.',vb:'0 0 120 64',s:PIPE(6,46)+PIPE(74,114)+`<path d="M46 ${PY-10}L56 ${PY-10}L74 ${PY-5}V${PY+5}L56 ${PY+10}H46Z"/>`},
{c:'fit',n:'Stub end with lap-joint flange',d:'Stub end welded to the pipe, with a loose backing flange that turns freely.',vb:'0 0 120 64',s:PIPE(6,58)+`<path class="th" d="M58 ${PY-12}V${PY+12}"/><path d="M62 ${PY-16}V${PY+16}M66 ${PY-16}V${PY+16}"/><path class="th" d="M66 ${PY}H114"/>`+dot(48)},
{c:'fit',n:'Cross',d:'Four-way fitting; rare in process piping, more common in fire water and utilities.',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M60 6V60"/>`+dot(46)+dot(74)+dot(60,26)},
/* flanges and valves */
{c:'valves',n:'Weld neck flange',d:'Flange with a tapered hub butt-welded to the pipe. The weld dot is at the end of the hub.',vb:'0 0 120 64',s:PIPE(6,60)+`<path d="M60 ${PY-6}L70 ${PY-14}V${PY+14}L60 ${PY+6}"/>`+flg(70)+dot(60)},
{c:'valves',n:'Slip-on flange',d:'Flange slipped over the pipe and fillet welded inside and outside.',vb:'0 0 120 64',s:PIPE(6,74)+`<path d="M62 ${PY-14}H70V${PY+14}H62Z"/>`+dot(60,PY-7)+dot(60,PY+7)},
{c:'valves',n:'Blind flange',d:'Solid flange closing a flanged end or nozzle.',vb:'0 0 120 64',s:PIPE(6,60)+flg(60)+`<path class="th" d="M66 ${PY-14}V${PY+14}"/><path class="tn" d="M66 ${PY-14}L72 ${PY-8}M66 ${PY-4}L72 ${PY+2}M66 ${PY+6}L72 ${PY+12}"/>`},
{c:'valves',n:'Spectacle blind',d:'Figure-8 blind between flanges; shown in its normal position (open or closed) with the note NO / NC.',vb:'0 0 120 64',s:PIPE(6,54)+PIPE(66,114)+flg(54)+flg(66)+`<circle cx="60" cy="16" r="7"/><circle class="f" cx="60" cy="${PY}" r="6"/><path d="M60 23V${PY-6}"/><text class="ts" x="72" y="20">NC</text>`},
{c:'valves',n:'Orifice flange pair',d:'Flanges with pressure taps for an orifice plate; taps orientation is shown and straight lengths are dimensioned.',vb:'0 0 120 64',s:PIPE(6,54)+PIPE(66,114)+flg(54)+flg(66)+`<path class="th" d="M60 ${PY-16}V${PY+16}"/><path d="M50 ${PY-14}V12M70 ${PY-14}V12"/><text class="ts" x="60" y="10" text-anchor="middle">FE</text>`},
{c:'valves',n:'Gate valve',d:'Flanged gate valve. The stem line shows the handwheel orientation, which must be checked for access.',vb:'0 0 120 64',s:VI(bowI())},
{c:'valves',n:'Globe valve',d:'Globe valve; flow direction arrow is shown where the valve must be installed one way.',vb:'0 0 120 64',s:VI(bowI()+`<circle class="f" cx="60" cy="${PY}" r="4"/>`)+`<path class="f" d="M96 ${PY-12}L106 ${PY-8}L96 ${PY-4}Z" stroke="none"/>`},
{c:'valves',n:'Ball valve',d:'Quarter-turn valve; the lever or gear operator direction is shown.',vb:'0 0 120 64',s:VI(bowI()+`<circle class="w" cx="60" cy="${PY}" r="6"/>`,false)+`<path d="M60 ${PY-6}V22L80 16"/>`},
{c:'valves',n:'Check valve',d:'Non-return valve with its flow arrow. Swing checks must be in horizontal or upward-flow vertical lines.',vb:'0 0 120 64',s:VI(bowI(60,13,10,'R'),false)+`<path d="M44 16H74"/><path class="f" d="M72 11L82 16L72 21Z" stroke="none"/>`},
{c:'valves',n:'Butterfly valve',d:'Wafer or lug butterfly valve between flanges.',vb:'0 0 120 64',s:PIPE(6,52)+PIPE(68,114)+flg(52)+flg(68)+`<path d="M60 ${PY-14}V${PY+14}"/><circle class="f" cx="60" cy="${PY}" r="4"/><path d="M60 ${PY-14}V18M52 18H68"/>`},
{c:'valves',n:'Control valve',d:'Control valve with actuator, shown with its tag. Removal space and block/bypass valves are checked in the model.',vb:'0 0 120 64',s:VI(bowI(),false)+`<path d="M60 ${PY}V22"/><path d="M48 22A12 10 0 0 1 72 22Z"/><text class="ts" x="80" y="16">FV-101</text>`},
{c:'valves',n:'Relief valve (PSV)',d:'Angle-body relief valve: inlet from below, outlet to the side towards flare or atmosphere.',vb:'0 0 120 64',s:`<path class="th" d="M60 62V46"/><path d="M50 46L60 34L70 46Z"/><path d="M72 24L60 34L72 44Z"/><path class="th" d="M72 34H112"/><path d="M60 34V10"/><path class="tn" d="M54 28L66 24L54 20L66 16"/><text class="ts" x="76" y="20">PSV</text>`},
/* supports */
{c:'sup',n:'Resting support',d:'Pipe rests on steel; carries weight only. Shown with the support symbol and its tag.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY+2}L52 ${PY+14}H68Z"/>`+tag(60,14,'PS-101',42)},
{c:'sup',n:'Guide',d:'Restrains sideways movement; the pipe slides axially.',vb:'0 0 120 64',s:PIPE()+`<path d="M50 ${PY-12}V${PY+12}M70 ${PY-12}V${PY+12}"/><path d="M46 ${PY+14}H74"/><text class="ts" x="60" y="16" text-anchor="middle">G</text>`},
{c:'sup',n:'Line stop',d:'Stops axial movement in one or both directions.',vb:'0 0 120 64',s:PIPE()+`<path class="th" d="M60 ${PY-14}V${PY+14}"/><path d="M50 ${PY-10}H56M70 ${PY-10}H64"/><path class="f" d="M56 ${PY-13}L60 ${PY-10}L56 ${PY-7}Z" stroke="none"/><path class="f" d="M64 ${PY-13}L60 ${PY-10}L64 ${PY-7}Z" stroke="none"/><text class="ts" x="60" y="16" text-anchor="middle">LS</text>`},
{c:'sup',n:'Anchor',d:'Fixes the pipe in all directions; the hatched mark shows a fixed point.',vb:'0 0 120 64',s:PIPE()+`<path d="M52 ${PY-8}L68 ${PY+8}M52 ${PY+8}L68 ${PY-8}"/><rect x="50" y="${PY-10}" width="20" height="20"/><text class="ts" x="60" y="16" text-anchor="middle">A</text>`},
{c:'sup',n:'Hanger (rod)',d:'Pipe hung from steel above by a rod.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY-6}V10M50 10H70"/><path class="tn" d="M52 10L48 4M58 10L54 4M64 10L60 4M70 10L66 4"/><path d="M54 ${PY-6}H66"/>`},
{c:'sup',n:'Spring support',d:'Variable or constant spring for lines that move vertically; installed and operating loads in the support schedule.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY-4}V30L54 27L66 22L54 17L66 12L60 9V4M50 4H70"/><text class="ts" x="72" y="16">SPR</text>`},
{c:'sup',n:'Shoe',d:'Welded or clamped shoe lifting the pipe off the steel to clear insulation.',vb:'0 0 120 64',s:PIPE()+`<path d="M48 ${PY+4}H72V${PY+14}H48Z"/><path d="M42 ${PY+16}H78"/>`},
{c:'sup',n:'Dummy leg',d:'Pipe stub welded to an elbow to carry the line down to a support. Check the elbow stress and add a weep hole.',vb:'0 0 120 64',s:`<path class="th" d="M10 30H60V6"/><path d="M60 30L76 46V62M66 62H86"/><path d="M60 30L64 34" class="th"/>`+dot(60,30)+`<text class="ts" x="80" y="40">DL</text>`},
{c:'sup',n:'Trunnion',d:'Pipe or plate piece welded to a pipe or elbow to transfer load to a support.',vb:'0 0 120 64',s:PIPE()+`<path d="M54 ${PY+4}V58M66 ${PY+4}V58M48 60H72"/><text class="ts" x="76" y="56">TRN</text>`},
/* vents, drains, specials */
{c:'spec',n:'Vent (high point)',d:'High-point vent with valve and plug or blind, as the piping class requires.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY}V28"/>`+`<path d="M53 28L67 28L60 20Z" class="f"/><path d="M53 12L67 12L60 20Z"/><path d="M60 12V6M54 6H66"/><text class="ts" x="72" y="16">HPV</text>`},
{c:'spec',n:'Drain (low point)',d:'Low-point drain with valve and plug or blind.',vb:'0 0 120 64',s:PIPE(6,114)+`<path d="M60 ${PY}V48"/><path d="M53 48H67L60 56Z" class="f"/><path d="M60 56V62M54 62H66"/><text class="ts" x="72" y="60">LPD</text>`},
{c:'spec',n:'Instrument connection',d:'Tapping for a pressure or temperature instrument, with the instrument tag in a bubble.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY}V26"/><circle cx="60" cy="16" r="11"/><text class="ts" x="60" y="20" text-anchor="middle">PI</text>`},
{c:'spec',n:'Thermowell',d:'Thermowell connection (TW) on the line, with orientation and insertion length noted.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY+8}V24"/><rect x="55" y="16" width="10" height="8"/><text class="ts" x="70" y="22">TW</text>`},
{c:'spec',n:'Y-strainer',d:'Y-type strainer with its screen leg; drawn with the cap facing down so it can be cleaned.',vb:'0 0 120 64',s:PIPE(6,46)+PIPE(74,114)+flg(46)+flg(74)+`<path class="th" d="M46 ${PY}H74"/><path d="M58 ${PY}L72 58"/><path d="M68 60L76 54"/>`},
{c:'spec',n:'Temporary strainer',d:'Cone strainer fitted between flanges for start-up; removed after commissioning, so a spool may be needed.',vb:'0 0 120 64',s:PIPE(6,52)+PIPE(68,114)+flg(52)+flg(68)+`<path class="tn dsh" d="M54 ${PY-10}L66 ${PY}L54 ${PY+10}"/><text class="ts" x="60" y="18" text-anchor="middle">TS</text>`},
{c:'spec',n:'Flexible hose',d:'Flexible hose connection, e.g. at loading points or to vibrating equipment.',vb:'0 0 120 64',s:PIPE(6,30)+PIPE(90,114)+flg(30)+flg(90)+`<path d="M30 ${PY}C45 ${PY-16} 50 ${PY+16} 60 ${PY}S80 ${PY-16} 90 ${PY}"/>`},
{c:'spec',n:'Steam trap',d:'Steam trap station with its tag; isolation and test valves per the trap standard.',vb:'0 0 120 64',s:PIPE(6,48)+PIPE(72,114)+`<circle cx="60" cy="${PY}" r="12"/><text class="ts" x="60" y="${PY+4}" text-anchor="middle">T</text>`},
{c:'spec',n:'Sample connection',d:'Sample point with valve, often to a sample cooler.',vb:'0 0 120 64',s:PIPE()+`<path d="M60 ${PY}V30"/><path d="M53 30H67L60 22Z"/><path d="M53 14H67L60 22Z"/><path d="M60 14V8"/><text class="ts" x="72" y="16">SC</text>`},
{c:'spec',n:'Equipment nozzle',d:'Connection to equipment, labelled with the equipment tag and nozzle number; the face is the dimension reference.',vb:'0 0 120 64',s:`<rect x="76" y="10" width="38" height="50" class="tn"/>`+PIPE(6,68)+flg(64)+flg(70)+`<text class="ts" x="95" y="34" text-anchor="middle">P-101</text><text class="ts" x="95" y="48" text-anchor="middle">N1</text>`},
{c:'spec',n:'Floor or wall penetration',d:'Line passing through a floor, platform or wall, with the sleeve noted.',vb:'0 0 120 64',s:`<path class="th" d="M60 6V60"/><path class="tn" d="M16 34H104"/><path class="tn" d="M16 40H104"/><path d="M52 30V44M68 30V44"/>`},
/* dimensions and annotations */
{c:'ann',n:'North arrow (iso)',d:'Every iso has a north arrow, usually pointing up-right (or up-left) at 30°. All directions on the sheet are read from it.',vb:'0 0 120 64',s:`<path class="th" d="M30 54L82 24"/><path class="f" d="M84 23L72 24L78 33Z" stroke="none"/><text class="t" x="88" y="22">N</text>`},
{c:'ann',n:'Isometric axes',d:'East–west and north–south lines are drawn at 30° to the horizontal; vertical lines stay vertical. Lines not on these axes are offsets.',vb:'0 0 120 64',s:`<path d="M60 40L104 15M60 40L16 15M60 40V4"/><text class="ts" x="106" y="14">N</text><text class="ts" x="6" y="14">W</text><text class="ts" x="64" y="10">UP</text>`},
{c:'ann',n:'Dimension',d:'Dimensions run parallel to the pipe in the same iso plane, from centreline to centreline, face of flange or end of pipe, with extension lines.',vb:'0 0 120 64',s:PIPE(14,106)+`<path class="tn" d="M14 ${PY-6}V16M106 ${PY-6}V16M14 20H106"/><path class="f" d="M14 20L22 17V23Z M106 20L98 17V23Z" stroke="none"/><text class="ts" x="60" y="15" text-anchor="middle">2450</text>`},
{c:'ann',n:'Elevation',d:'Elevation of the pipe, normally to centreline (EL) or bottom of pipe (BOP), marked on horizontal runs and at changes of level.',vb:'0 0 120 64',s:PIPE()+`<path class="tn" d="M50 ${PY}L58 18H114"/><text class="ts" x="58" y="14">EL +105 250</text>`},
{c:'ann',n:'Coordinates',d:'Plant coordinates (N, E) at key points: equipment nozzles, tie-ins, changes of direction.',vb:'0 0 120 64',s:PIPE()+dot(60)+`<path class="tn" d="M40 ${PY}L52 20H116"/><text class="ts" x="54" y="12">N 1250.000</text><text class="ts" x="54" y="31">E 980.500</text>`},
{c:'ann',n:'Skew offset (2D)',d:'A line not on an iso axis is shown with a hatched triangle in the plane of the offset, with both legs dimensioned (or the angle).',vb:'0 0 120 64',s:`<path class="th" d="M10 56L100 10"/><path class="tn" d="M10 56H100V10"/>`+[20,32,44,56,68,80,92].map(x=>`<path class="tn" d="M${x} 56V${56-((x-10)/90)*46}"/>`).join('')+`<text class="ts" x="55" y="63" text-anchor="middle">600</text><text class="ts" x="101" y="36">450</text>`},
{c:'ann',n:'Rolling offset (3D)',d:'Offset in two planes at once. Shown with a hatched box (or two triangles) so the set, roll and run are clear.',vb:'0 0 120 64',s:`<path class="th" d="M8 58L104 6"/><path class="tn" d="M8 58H62L104 34V6M62 58V30L104 6M8 58V30H62"/>`+[18,30,42,54].map(x=>`<path class="tn" d="M${x} 58V${30+ (x-8)*0}"/>`).join('')},
{c:'ann',n:'Slope',d:'Line laid to a fall: arrow in the downhill direction with the slope ratio, e.g. 1:200.',vb:'0 0 120 64',s:PIPE()+`<path class="tn" d="M30 20H82"/><path class="f" d="M82 15L92 20L82 25Z" stroke="none"/><text class="ts" x="60" y="14" text-anchor="middle">1:200 FALL</text>`},
{c:'ann',n:'BOM item number',d:'Each component is tagged with its bill-of-materials item number; the BOM on the sheet lists size, description and quantity.',vb:'0 0 120 64',s:PIPE()+dot(40)+dot(80)+`<path class="tn" d="M60 ${PY}L76 18"/><circle class="w" cx="86" cy="14" r="10"/><text class="ts" x="86" y="18" text-anchor="middle">4</text>`},
{c:'ann',n:'Cut piece number',d:'Each straight pipe piece has a cut number linked to the cut-length list.',vb:'0 0 120 64',s:PIPE()+`<path class="tn" d="M60 ${PY}L72 20"/><rect class="w" x="70" y="8" width="24" height="16" rx="2"/><text class="ts" x="82" y="20" text-anchor="middle">&lt;3&gt;</text>`},
{c:'ann',n:'Revision cloud',d:'Changes in a revision are clouded and tagged with the revision number.',vb:'0 0 120 64',s:PIPE(20,100)+`<path class="tn" d="M30 30Q30 18 42 20Q46 10 58 14Q66 8 76 14Q90 12 90 26Q100 34 90 44Q88 56 74 54Q64 62 52 56Q38 60 34 50Q22 46 30 30Z"/><path d="M96 14L106 30H86Z"/><text class="ts" x="96" y="28" text-anchor="middle">B</text>`},
{c:'ann',n:'Hold',d:'Information not yet confirmed (e.g. vendor nozzle). Held items are not fabricated.',vb:'0 0 120 64',s:PIPE()+tag(60,16,'HOLD',44)}
];

const CONV=[
['Isometric axes and north',['East–west and north–south runs are drawn at 30° to the horizontal; vertical runs stay vertical.','The north arrow (usually up-right) fixes every direction on the sheet. Plant north, not true north.','One isometric normally shows one line (or part of one) between clear end points: equipment nozzles, tie-ins or continuation points.']],
['Not to scale',['Isometrics are never to scale. A 300 mm run and a 12 m run can look the same; only the dimensions count.','Keep components in the right order and on the right side of each joint, even when lengths are compressed.']],
['Dimensions',['Dimension from centreline to centreline at changes of direction, and to the face of flange at flanged items and equipment nozzles.','Dimension lines run parallel to the pipe in the same iso plane, with extension lines; text is usually in mm.','Valves and flanged items are dimensioned face to face; give enough dimensions to fix every component, but do not dimension the same length twice.']],
['Offsets',['A line that is not on an iso axis is an offset. Show a hatched triangle in the plane of the offset.','Dimension both legs of the triangle (or one leg and the angle). A rolling offset (two planes at once) gets a hatched box.']],
['Elevations and coordinates',['Mark elevations on horizontal runs and at every change in level: EL to centreline, or BOP (bottom of pipe) on racks.','Give N and E coordinates at end points, tie-ins and key changes of direction so the line can be located in the plant.']],
['Welds and joints',['A dot is a shop weld; field welds (FW) and field fit welds (FFW) have their own mark and label.','Every weld is numbered for the weld map, NDE and PWHT records.','FFW pieces are supplied long (typically +100 to +150 mm) to be cut on site.']],
['Spools and cut list',['The line is split into shop spools at field welds and flanges; each spool gets a number and must fit transport limits.','Straight pipe pieces get cut numbers, listed with their lengths in the cut-length table.']],
['Bill of materials',['Each item is tagged with its BOM number. The BOM lists size, description, rating, schedule, material standard and quantity.','The BOM is split into shop (fabrication) and field (erection) materials. Bolts and gaskets are listed with their flanged joint.']],
['Supports',['Every support is shown with its symbol and support tag; details come from the support standard or special support drawing.','Spring supports list the installed and operating loads in the support schedule.']],
['Title block data',['Line number, size, piping class, fluid, design and operating pressure and temperature.','Insulation type and thickness, tracing, painting system, test medium and pressure, PWHT and NDE percentage.','Continuation sheet numbers and the P&ID reference.']],
['Revisions and holds',['Changed items are clouded and tagged with the revision triangle; the revision table explains what changed.','HOLD items are not fabricated until released.']]
];

/* annotated sample isometric */
function sample(){
 const s=46,cx=118,cy=300,ox=e=>e,P3=(e,n,u)=>[cx+(n+e)*.866*s,cy+(-n+e)*.5*s-u*s];
 const L=(a,b,c='th')=>{const p=P3(...a),q=P3(...b);return `<path class="${c}" d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}"/>`;};
 const D=(a,k=4.2)=>{const p=P3(...a);return `<circle class="f" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${k}"/>`;};
 const T=(a,t,dx=0,dy=0,cls='ts',anc='middle')=>{const p=P3(...a);return `<text class="${cls}" x="${(p[0]+dx).toFixed(1)}" y="${(p[1]+dy).toFixed(1)}" text-anchor="${anc}">${t}</text>`;};
 const lerp=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
 /* route: nozzle A -> north -> up -> east (valve) -> north (support) -> continuation */
 const A=[0,0,0],B=[0,4,0],C=[0,4,3],Dd=[5,4,3],E=[5,8,3];
 let g='';
 /* equipment nozzle */
 const a0=P3(0,-.9,0);g+=`<rect class="tn" x="${a0[0]-44}" y="${a0[1]-26}" width="56" height="52" rx="4"/><text class="ts" x="${a0[0]-16}" y="${a0[1]+4}" text-anchor="middle">P-101</text>`;
 g+=L([0,-.35,0],[0,-.1,0],'th')+L(A,B);
 /* nozzle flange pair, short marks perpendicular (use vertical ticks) */
 const fl=(pt)=>{const p=P3(...pt);return `<path class="th" d="M${p[0]} ${p[1]-10}V${p[1]+10}"/>`;};
 g+=fl([0,-.1,0])+fl([0,.08,0]);
 g+=D([0,.45,0])+D([0,3.55,0])+D([0,4,.45]);
 g+=L(B,C)+L(C,Dd)+L(Dd,E,'th');
 g+=D([0,4,2.55])+D([.45,4,3])+D([5-.45,4,3])+D([5,4.45,3]);
 /* gate valve on C-D at e=2.5 */
 const v0=P3(2.5,4,3),u=[.866*s*.28,.5*s*.28];
 g+=`<path class="w" d="M${v0[0]-u[0]} ${v0[1]-u[1]-11}L${v0[0]} ${v0[1]}L${v0[0]-u[0]} ${v0[1]-u[1]+11}Z"/><path class="w" d="M${v0[0]+u[0]} ${v0[1]+u[1]-11}L${v0[0]} ${v0[1]}L${v0[0]+u[0]} ${v0[1]+u[1]+11}Z"/><path d="M${v0[0]} ${v0[1]}V${v0[1]-30}M${v0[0]-9} ${v0[1]-30}H${v0[0]+9}"/>`;
 g+=fl([2.5-.42,4,3])+fl([2.5+.42,4,3]);
 /* field weld + FFW at end */
 const fw=P3(5,6.6,3);g+=`<path class="th" d="M${fw[0]-6} ${fw[1]-6}L${fw[0]+6} ${fw[1]+6}M${fw[0]-6} ${fw[1]+6}L${fw[0]+6} ${fw[1]-6}"/><path class="tn" d="M${fw[0]} ${fw[1]-8}V${fw[1]-30}"/><path class="f" d="M${fw[0]} ${fw[1]-30}H${fw[0]-15}L${fw[0]} ${fw[1]-23}Z" stroke="none"/><text class="ts" x="${fw[0]-18}" y="${fw[1]-22}" text-anchor="end">FFW +100</text>`;
 /* continuation arrow */
 const e1=P3(...E),e0=P3(5,7.7,3);g+=`<path class="f" d="M${e1[0]} ${e1[1]}L${e0[0]-8} ${e0[1]-2}L${e0[0]+2} ${e0[1]+9}Z" stroke="none"/>`+T(E,'CONT. ON',10,-4,'ts','start')+T(E,'ISO 1001-02',10,9,'ts','start');
 /* support on D-E */
 const sp=P3(5,5.6,3);g+=`<path d="M${sp[0]} ${sp[1]+2}L${sp[0]-9} ${sp[1]+16}H${sp[0]+9}Z"/><text class="ts" x="${sp[0]+12}" y="${sp[1]+22}">PS-101</text>`;
 /* dimensions with offset along -e for vertical/n runs */
 const dim=(a,b,off,t)=>{const a2=a.map((v,i)=>v+off[i]),b2=b.map((v,i)=>v+off[i]);const p=P3(...a2),q=P3(...b2),m=[(p[0]+q[0])/2,(p[1]+q[1])/2];
  return L(a,a2,'tn')+L(b,b2,'tn')+L(a2,b2,'tn')+`<circle class="f" cx="${p[0]}" cy="${p[1]}" r="2"/><circle class="f" cx="${q[0]}" cy="${q[1]}" r="2"/><text class="ts" x="${m[0]}" y="${m[1]-5}" text-anchor="middle" style="paint-order:stroke;stroke:#FAFBFD;stroke-width:4px">${t}</text>`;};
 g+=dim([0,-.1,0],B,[-1,0,0],'1850');
 g+=dim(B,C,[-1,0,0],'1200');
 g+=dim(C,Dd,[0,1.1,0],'2600');
 g+=dim([2.08,4,3],[2.92,4,3],[0,0,-.75],'292');
 g+=dim(Dd,E,[.9,0,0],'1950');
 /* elevations */
 g+=T(lerp(A,B,.55),'EL +100 600',12,26,'ts','start')+T(lerp(Dd,E,.25),'EL +103 800',10,22,'ts','start');
 /* BOM callouts */
 const bub=(pt,n,dx,dy)=>{const p=P3(...pt);return `<path class="call" d="M${p[0]} ${p[1]}L${p[0]+dx} ${p[1]+dy}"/><circle class="w" cx="${p[0]+dx}" cy="${p[1]+dy}" r="10" style="stroke:#1849A9;stroke-width:1.2"/><text class="lab" x="${p[0]+dx}" y="${p[1]+dy+4}" text-anchor="middle">${n}</text>`;};
 g+=bub(lerp(A,B,.3),1,-34,-30)+bub(B,2,-38,10)+bub([2.5,4,3],3,-34,-44)+bub(C,2,-40,-12)+bub([2.08,4,3],4,-46,14);
 /* weld numbers */
 const wn=(pt,t,dx,dy)=>{const p=P3(...pt);return `<text class="lab" x="${p[0]+dx}" y="${p[1]+dy}">${t}</text>`;};
 g+=wn([0,.45,0],'W1',8,16)+wn([0,3.55,0],'W2',8,16)+wn([0,4,.45],'W3',8,0)+wn([.45,4,3],'W4',-6,-12);
 /* spool tag */
 const st=P3(0,1.2,0);g+=`<rect class="w" x="${st[0]+24}" y="${st[1]+24}" width="40" height="17" rx="3"/><text class="ts" x="${st[0]+44}" y="${st[1]+36}" text-anchor="middle">SP-01</text>`;
 /* north arrow */
 g+=`<g transform="translate(40 40)"><path class="th" d="M0 40L48 12"/><path class="f" d="M52 10L38 11L45 23Z" stroke="none"/><text class="t" x="56" y="10">N</text></g>`;
 /* bom mini table */
 const rows=[['1','Pipe, 6", SCH 40, A106 Gr B'],['2','Elbow 90° LR, 6", A234 WPB'],['3','Gate valve, 6", Class 150, RF'],['4','WN flange, 6", Class 150, RF'],['5','Gasket and stud bolts (per joint)']];
 g+=`<g transform="translate(490 340)"><rect class="w tn" x="0" y="0" width="250" height="${22+rows.length*18}"/><text class="ts" x="8" y="15">BOM (shop materials)</text>${rows.map((r,i)=>`<text class="lab" x="10" y="${34+i*18}">${r[0]}</text><text class="ts" x="28" y="${34+i*18}">${r[1]}</text>`).join('')}</g>`;
 return `<svg class="sy" viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Annotated sample isometric">${g}</svg>`;}

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const svgOf=(o,cls='sy')=>`<svg class="${cls}" viewBox="${o.vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.n)} symbol">${o.s}</svg>`;
const CSS='*{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.f{fill:#000}.w{fill:#fff}.t{fill:#000;stroke:none;font:600 13px Arial,sans-serif}.ts{fill:#000;stroke:none;font:600 10px Arial,sans-serif}.th{stroke-width:3.4}.tn{stroke-width:1.2}.dsh{stroke-dasharray:6 4}.lbl{fill:#000;stroke:none;font:600 15px Arial,sans-serif}.lbs{fill:#555;stroke:none;font:500 12px Arial,sans-serif}.cell{stroke:#ccc;stroke-width:1}';
const standalone=o=>{const [,,w,h]=o.vb.split(' ').map(Number);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb}" width="${w*2}" height="${h*2}"><style>${CSS}</style>${o.s}</svg>`;};
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const save=(blob,name)=>{const u=URL.createObjectURL(blob),l=document.createElement('a');l.href=u;l.download=name;document.body.appendChild(l);l.click();setTimeout(()=>{URL.revokeObjectURL(u);l.remove();},800);};
function svgPng(svg,w,h,name){return new Promise(res=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);c.toBlob(b=>{save(b,name);res();},'image/png');};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});}
const pngOne=o=>{const [,,w,h]=o.vb.split(' ').map(Number);return svgPng(standalone(o),w*6,h*6,`iso-${slug(o.n)}.png`);};
const wrap=(t,n)=>{const out=[];let cur='';t.split(' ').forEach(wd=>{if((cur+' '+wd).trim().length>n&&cur){out.push(cur);cur=wd;}else cur=(cur+' '+wd).trim();});if(cur)out.push(cur);return out.slice(0,3);};
function sheetSvg(list,title){
 const cols=6,cw=210,ch=170,pad=24,head=60,rows=Math.ceil(list.length/cols),W=cols*cw+pad*2,H=head+rows*ch+pad*2;
 const cells=list.map((o,i)=>{const [,,vw,vh]=o.vb.split(' ').map(Number),sc=Math.min(150/vw,80/vh),x=pad+(i%cols)*cw,y=head+pad+Math.floor(i/cols)*ch;
  return `<rect class="cell" x="${x}" y="${y}" width="${cw}" height="${ch}"/><g transform="translate(${x+(cw-vw*sc)/2} ${y+12+(80-vh*sc)/2}) scale(${sc})">${o.s}</g>`+wrap(o.n,26).map((l,k)=>`<text class="lbl" x="${x+cw/2}" y="${y+118+k*17}" text-anchor="middle">${esc(l)}</text>`).join('');}).join('');
 return {W,H,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><style>${CSS}</style><rect x="0" y="0" width="${W}" height="${H}" fill="#fff" stroke="none"/><text class="lbl" x="${pad}" y="${pad+20}" style="font-size:22px">${esc(title)}</text><text class="lbs" x="${pad}" y="${pad+40}">piperef.net · ${list.length} symbols · project iso legend governs</text>${cells}</svg>`};}
const pngSheet=(list,title)=>{const {W,H,svg}=sheetSvg(list,title);return svgPng(svg,W*2,H*2,`iso-legend-${slug(title)||'all'}.png`);};
let CUR=(()=>{try{return store.get('isy_c','all')||'all'}catch(e){return 'all'}})(),Q='';
const visible=()=>{const q=Q.trim().toLowerCase(),ord=k=>CAT.findIndex(c=>c[0]===k);return S.map((o,i)=>({...o,i})).filter(o=>(CUR==='all'||o.c===CUR)&&(!q||(o.n+' '+o.d+' '+o.c).toLowerCase().includes(q))).sort((a,b)=>ord(a.c)-ord(b.c)||a.i-b.i);};
const setN=()=>{const t=P.querySelector('#iyN');if(t)t.textContent=visible().length;};
function grid(){
 const list=visible(),secs=CAT.filter(c=>list.some(o=>o.c===c[0]));
 return secs.length?secs.map(([k,l])=>`<section class="pd-sec"><h2>${l}</h2><div class="pd-grid">${list.filter(o=>o.c===k).map(o=>`<button class="pd-card" type="button" data-i="${o.i}"><div class="pd-sym">${svgOf(o)}</div><b>${esc(o.n)}</b><span>${esc(o.d.split('. ')[0].replace(/\.$/,''))}.</span></button>`).join('')}</div></section>`).join('')
  :`<p class="pd-empty">No symbol matches “${esc(Q)}”. Try a shorter word, like “weld” or “support”.</p>`;}
function render(){
 const count=k=>k==='all'?S.length:S.filter(o=>o.c===k).length;
 P.innerHTML=`<div class="phead"><div><h1>Isometric symbols and conventions</h1><p>Symbols used on piping isometric drawings (welds, fittings, valves, supports, dimensions and annotations), how an iso is dimensioned and read, and an annotated sample. Click a symbol for details or a PNG.</p></div></div>
 <section class="pd-sec" style="margin-top:6px"><h2>Reading a sample isometric</h2><p>A small line from a pump nozzle: up, through a gate valve, then north to the next sheet. Blue tags are BOM item numbers and weld numbers.</p><div class="iy-sample">${sample()}</div></section>
 <div class="pd-bar" role="toolbar" aria-label="Symbol groups">${[['all','All'],...CAT].map(([k,l])=>`<button class="pd-chip" type="button" data-c="${k}" aria-pressed="${CUR===k}">${l} <small>${count(k)}</small></button>`).join('')}
  <input class="pd-q" id="iyQ" type="search" placeholder="Search, e.g. field weld, FOT, spring" aria-label="Search symbols" value="${esc(Q)}"></div>
 <div class="pd-dl" role="group" aria-label="Download symbols"><span>Download the <b id="iyN">${visible().length}</b> symbols shown:</span><button class="pd-btn" type="button" data-x="png">PNG legend sheet</button></div>
 <div id="iyGrid">${grid()}</div>
 <section class="pd-sec"><h2>Conventions</h2><p>How isometrics are drawn and read on most EPC projects.</p><div class="iy-conv">${CONV.map(([h,l])=>`<div class="pd-box2"><h3>${h}</h3><ul>${l.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
 <p class="pd-note">Symbols follow the common style of Isogen / SmartPlant isometric legends and typical EPC drafting standards; details differ between companies and projects. The project's isometric legend and drafting procedure always govern.</p></section>`;
 bind();}
function show(i){const o=S[i];if(!o)return;
 const d=document.createElement('div');d.className='pd-dlg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label',o.n);
 d.innerHTML=`<div class="pd-box"><button class="pd-x" type="button" aria-label="Close">×</button><h3>${esc(o.n)}</h3><small style="color:var(--muted)">${esc((CAT.find(c=>c[0]===o.c)||[])[1]||'')}</small><div class="pd-sym">${svgOf(o)}</div><p>${esc(o.d)}</p>
 <div class="pd-acts"><button class="pd-btn pri" type="button" data-a="png">PNG</button>${window.shareChat?'<button class="pd-btn" type="button" data-a="chat">Copy for chat</button>':''}</div></div>`;
 P.appendChild(d);const prev=document.activeElement;d.querySelector('.pd-x').focus();
 const close=()=>{d.remove();if(prev&&prev.focus)prev.focus();};
 d.addEventListener('click',e=>{if(e.target===d||e.target.closest('.pd-x'))close();const a=e.target.closest('[data-a]');if(!a)return;
  if(a.dataset.a==='png')pngOne(o);
  if(a.dataset.a==='chat')window.shareChat({title:'Isometric symbol: '+o.n,sub:(CAT.find(c=>c[0]===o.c)||[])[1],rows:[['Meaning',o.d]],note:'The project isometric legend governs.'});});
 d.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
function bind(){
 P.querySelector('.pd-bar').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;CUR=b.dataset.c;try{store.set('isy_c',CUR)}catch(err){}
  P.querySelectorAll('.pd-chip').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.c===CUR)));P.querySelector('#iyGrid').innerHTML=grid();setN();});
 P.querySelector('#iyQ').addEventListener('input',e=>{Q=e.target.value;P.querySelector('#iyGrid').innerHTML=grid();setN();});
 P.querySelector('.pd-dl').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const list=visible();if(!list.length)return;
  const lbl=Q.trim()?('search '+Q.trim()):CUR==='all'?'All symbols':((CAT.find(c=>c[0]===CUR)||[])[1]||CUR);
  b.disabled=true;pngSheet(list,'Isometric legend: '+lbl).then(()=>b.disabled=false);});
 P.querySelector('#iyGrid').addEventListener('click',e=>{const c=e.target.closest('.pd-card');if(c)show(+c.dataset.i);});}
render();
window.renderISY=()=>{};
})();
