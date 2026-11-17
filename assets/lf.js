/* ASME B16.47 large-diameter flanges (NPS 26-60), Series A (ex MSS SP-44) and Series B (ex API 605).
   Weld neck and blind dimensions in inches, cross-checked between published B16.47 inch and metric tables. Globals: store, U. */
(function(){
const P=document.getElementById('p-lf');if(!P)return;
if(!document.getElementById('lf-css')){const st=document.createElement('style');st.id='lf-css';st.textContent=`
#p-lf .lf-bar{display:flex;flex-wrap:wrap;gap:14px 22px;align-items:flex-end;margin:14px 0 16px}
#p-lf .lf-grp{display:flex;flex-direction:column;gap:6px}#p-lf .lf-grp>span{font-size:12.5px;font-weight:600;color:var(--ink-2)}
#p-lf .lf-seg{display:flex;flex-wrap:wrap;gap:6px}
#p-lf .lf-chip{border:1px solid var(--rule-strong);background:var(--sheet);color:var(--ink-2);border-radius:99px;padding:6px 13px;font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;min-width:44px}
#p-lf .lf-chip[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent,#fff)}
#p-lf .lf-chip:disabled{opacity:.35;cursor:not-allowed}
#p-lf select{height:36px;border:1px solid var(--rule-strong);border-radius:var(--r,8px);padding:0 10px;font:inherit;font-size:14px;background:var(--sheet);color:var(--ink);min-width:110px}
#p-lf .lf-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:18px;align-items:start}
#p-lf .lf-card{border:1px solid var(--rule);border-radius:14px;background:var(--sheet);padding:14px 16px;min-width:0}
#p-lf .lf-card h2{font-size:17px;margin:0 0 4px}#p-lf .lf-card>p{margin:0 0 10px;font-size:13px;color:var(--muted)}
#p-lf .lf-kv{width:100%;border-collapse:collapse;font-size:14px}
#p-lf .lf-kv td{padding:7px 4px;border-bottom:1px solid var(--rule);border-left:0!important;border-right:0!important;white-space:normal;text-align:left!important}
#p-lf .lf-kv td:first-child{width:62%}#p-lf .lf-kv td:last-child{text-align:right!important;font-variant-numeric:tabular-nums;font-weight:650;white-space:nowrap}
#p-lf .lf-kv td small{color:var(--muted);font-weight:500;margin-left:4px}
#p-lf .lf-kv tr.hd td{text-align:left!important;background:none;font-weight:700;font-size:12.5px;color:var(--muted);padding-top:12px}
#p-lf .lf-fig{display:block;width:100%;height:auto;border:1px solid var(--rule);border-radius:10px;background:#FAFBFD;color:#1F2937}
#p-lf .lf-fig text{font:600 12px Geist,system-ui,sans-serif;fill:#1F2937;stroke:none}#p-lf .lf-fig .dim{fill:#1849A9}
[data-theme=dark] #p-lf .lf-fig{background:#EEF2F7}
#p-lf .lf-warn{display:flex;gap:10px;padding:11px 13px;border-radius:12px;background:rgba(183,121,31,.1);color:#8A5A12;font-size:13.5px;line-height:1.5;margin:12px 0 0}
[data-theme=dark] #p-lf .lf-warn{color:#F2C46D;background:rgba(242,196,109,.1)}
#p-lf .lf-cmp{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:8px}
#p-lf .lf-cmp th,#p-lf .lf-cmp td{padding:7px 8px;border-bottom:1px solid var(--rule);text-align:right;white-space:nowrap}
#p-lf .lf-cmp th:first-child,#p-lf .lf-cmp td:first-child{text-align:left;white-space:normal}
#p-lf .lf-cmp th{font-size:12px;color:var(--muted);font-weight:600}
#p-lf .lf-cmp td.diff{color:#B42318;font-weight:700}[data-theme=dark] #p-lf .lf-cmp td.diff{color:#F4A39A}
#p-lf .lf-sec{margin-top:22px}#p-lf .lf-sec>h2{font-size:17px;margin:0 0 2px}#p-lf .lf-sec>p{margin:0 0 10px;font-size:13.5px;color:var(--muted)}
#p-lf .lf-tw{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--rule);border-radius:12px;background:var(--sheet)}
#p-lf .lf-t{width:100%;border-collapse:collapse;font-size:13px;min-width:820px}
#p-lf .lf-t th{position:sticky;top:0;background:var(--sheet);font-size:11.5px;color:var(--muted);font-weight:600;padding:8px 7px;border-bottom:1px solid var(--rule-strong);text-align:right;white-space:normal;vertical-align:bottom;line-height:1.25}
#p-lf .lf-t td{padding:6px 7px;border-bottom:1px solid var(--rule);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#p-lf .lf-t th:first-child,#p-lf .lf-t td:first-child{text-align:left;font-weight:700}
#p-lf .lf-t tr{cursor:pointer}#p-lf .lf-t tbody tr:hover td{background:rgba(24,73,169,.04)}
#p-lf .lf-t tr.on td{background:rgba(24,73,169,.1)}[data-theme=dark] #p-lf .lf-t tr.on td{background:rgba(96,150,255,.16)}
#p-lf .lf-t tr.same td{color:var(--muted)}
#p-lf .lf-notes{margin:10px 0 0;padding-left:18px;font-size:13px;color:var(--ink-2);line-height:1.55}#p-lf .lf-notes li+li{margin-top:4px}
#p-lf .lf-acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
#p-lf .lf-btn{height:34px;padding:0 13px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--sheet);color:var(--ink);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
@media (max-width:860px){#p-lf .lf-g{grid-template-columns:1fr}}
`;document.head.appendChild(st);}

/* rows: [NPS, O, tf WN, tf blind, R raised face dia, X hub dia at base, Y length through hub, BC, no. of bolts, hole dia, stud length (RF), WN weight lb, blind weight lb] */
const D={
A:{
150:[[26,34.25,2.69,2.69,29.50,26.62,4.75,31.75,24,1.38,8.75,300,702],[28,36.50,2.81,2.81,31.50,28.62,4.94,34.00,28,1.38,9.00,345,833],[30,38.75,2.94,2.94,33.75,30.75,5.38,36.00,28,1.38,9.25,400,982],[32,41.75,3.19,3.19,36.00,32.75,5.69,38.50,28,1.62,10.50,505,1238],[34,43.75,3.25,3.25,38.00,34.75,5.88,40.50,32,1.62,10.50,540,1384],[36,46.00,3.56,3.56,40.25,36.75,6.19,42.75,32,1.62,11.00,640,1676],[38,48.75,3.44,3.44,42.25,39.00,6.19,45.25,32,1.62,11.00,720,1819],[40,50.75,3.56,3.56,44.25,41.00,6.44,47.25,36,1.62,11.00,775,2040],[42,53.00,3.81,3.81,47.00,43.00,6.75,49.50,36,1.62,11.50,890,2380],[44,55.25,4.00,4.00,49.00,45.00,7.00,51.75,40,1.62,12.00,990,2715],[46,57.25,4.06,4.06,51.00,47.12,7.31,53.75,40,1.62,12.00,1060,2961],[48,59.50,4.25,4.25,53.50,49.12,7.56,56.00,44,1.62,12.50,1185,3350],[50,61.75,4.38,4.38,55.50,51.25,8.00,58.25,44,1.88,13.25,null,3716],[52,64.00,4.56,4.56,57.50,53.25,8.25,60.50,44,1.88,13.75,1410,4156],[54,66.25,4.75,4.75,59.50,55.25,8.50,62.75,44,1.88,14.00,1585,4636],[56,68.75,4.88,4.88,62.00,57.38,9.00,65.00,48,1.88,14.25,1760,5130],[58,71.00,5.06,5.06,64.00,59.38,9.25,67.25,48,1.88,14.75,1915,5675],[60,73.00,5.19,5.19,66.00,61.38,9.44,69.25,52,1.88,15.00,2045,6155]],
300:[[26,38.25,3.12,3.31,29.50,28.38,7.25,34.50,28,1.75,10.75,605,1078],[28,40.75,3.38,3.56,31.50,30.50,7.75,37.00,28,1.75,11.25,745,1315],[30,43.00,3.62,3.75,33.75,32.56,8.25,39.25,28,1.88,12.00,870,1543],[32,45.25,3.88,3.94,36.00,34.69,8.75,41.50,28,2.00,12.50,1005,1795],[34,47.50,4.00,4.12,38.00,36.88,9.12,43.50,28,2.00,13.00,1145,2068],[36,50.00,4.12,4.38,40.25,39.00,9.50,46.00,32,2.12,13.50,1275,2436],[38,46.00,4.25,4.25,40.50,39.12,7.12,43.00,32,1.62,12.50,695,2001],[40,48.75,4.50,4.50,42.75,41.25,7.62,45.50,32,1.75,13.25,840,2380],[42,50.75,4.69,4.69,44.75,43.25,7.88,47.50,32,1.75,13.75,950,2688],[44,53.25,4.88,4.88,47.00,45.25,8.12,49.75,32,1.88,14.25,1055,3079],[46,55.75,5.06,5.06,49.00,47.38,8.50,52.00,28,2.00,15.00,1235,3499],[48,57.75,5.25,5.25,51.25,49.38,8.81,54.00,32,2.00,15.25,1380,3896],[50,60.25,5.50,5.50,53.50,51.38,9.12,56.25,32,2.12,16.00,1530,4442],[52,62.25,5.69,5.69,55.50,53.38,9.38,58.25,32,2.12,16.50,1660,4906],[54,65.25,6.00,6.00,57.75,55.50,9.94,61.00,28,2.38,17.50,2050,5684],[56,67.25,6.06,6.06,59.75,57.62,10.25,63.00,28,2.38,17.75,2155,6098],[58,69.25,6.25,6.25,62.00,59.62,10.50,65.00,32,2.38,18.00,2270,6669],[60,71.25,6.44,6.44,64.00,61.62,10.75,67.00,32,2.38,18.50,2470,7274]],
400:[[26,38.25,3.50,3.88,29.50,28.62,7.62,34.50,28,1.88,12.50,650,1263],[28,40.75,3.75,4.12,31.50,30.81,8.12,37.00,28,2.00,13.25,785,1520],[30,43.00,4.00,4.38,33.75,32.94,8.62,39.25,28,2.12,14.00,905,1802],[32,45.25,4.25,4.56,36.00,35.00,9.12,41.50,28,2.12,14.25,1065,2075],[34,47.50,4.38,4.81,38.00,37.19,9.50,43.50,28,2.12,14.75,1200,2415],[36,50.00,4.50,5.06,40.25,39.38,9.88,46.00,32,2.12,15.00,1340,2815]],
600:[[26,40.00,4.25,4.94,29.50,29.44,8.75,36.00,28,2.00,14.50,940,1759],[28,42.25,4.38,5.19,31.50,31.62,9.25,38.00,28,2.12,15.00,1060,2061],[30,44.50,4.50,5.50,33.75,33.94,9.75,40.25,28,2.12,15.50,1210,2423],[32,47.00,4.62,5.81,36.00,36.12,10.25,42.50,28,2.38,16.50,1375,2856],[34,49.00,4.75,6.06,38.00,38.31,10.62,44.50,28,2.38,16.75,1540,3237],[36,51.75,4.88,6.38,40.25,40.62,11.12,47.00,28,2.62,17.75,1705,3802]],
900:[[26,42.75,5.50,6.31,29.50,30.50,11.25,37.50,20,2.88,18.75,1525,2566],[28,46.00,5.62,6.75,31.50,32.75,11.75,40.25,20,3.12,19.75,1810,3178],[30,48.50,5.88,7.19,33.75,35.00,12.25,42.75,20,3.12,20.50,2120,3758],[32,51.75,6.25,7.62,36.00,37.25,13.00,45.50,20,3.38,22.00,2545,4541],[34,55.00,6.50,8.06,38.00,39.62,13.75,48.25,20,3.62,23.00,2970,5425],[36,57.50,6.75,8.44,40.25,41.88,14.25,50.75,20,3.62,23.75,3395,6209]]},
B:{
75:[[26,30.00,1.25,1.25,27.75,26.62,2.25,28.50,36,0.75,4.50,80,255],[28,32.00,1.25,1.25,29.75,28.62,2.38,30.50,40,0.75,4.50,85,290],[30,34.00,1.25,1.25,31.75,30.62,2.50,32.50,44,0.75,4.50,90,330],[32,36.00,1.32,1.38,33.75,32.62,2.69,34.50,48,0.75,4.75,105,390],[34,38.00,1.32,1.44,35.75,34.62,2.82,36.50,52,0.75,4.75,110,430],[36,40.69,1.38,1.61,38.00,36.81,3.32,39.06,40,0.88,5.25,145,518],[38,42.69,1.44,1.69,40.00,38.81,3.44,41.06,40,0.88,5.50,160,595],[40,44.69,1.44,1.69,42.00,40.81,3.57,43.06,44,0.88,5.50,170,760],[42,46.69,1.50,1.82,44.00,42.81,3.69,45.06,48,0.88,5.50,185,895],[44,49.25,1.63,1.88,46.25,44.88,4.07,47.38,36,1.00,6.00,230,1065],[46,51.25,1.69,1.94,48.25,46.88,4.19,49.38,40,1.00,6.25,245,1185],[48,53.25,1.75,2.07,50.25,48.88,4.32,51.38,44,1.00,6.50,270,1315],[50,55.25,1.82,2.13,52.25,50.94,4.50,53.38,44,1.00,6.50,290,1505],[52,57.38,1.82,2.19,54.25,52.94,4.69,55.50,48,1.00,6.75,310,1665],[54,59.38,1.88,2.32,56.25,55.00,4.88,57.50,48,1.00,6.75,340,1840],[56,62.00,1.94,2.38,58.50,57.12,5.25,59.88,40,1.12,7.25,400,2110],[58,64.00,2.00,2.44,60.50,59.12,5.38,61.88,44,1.12,7.25,430,2300],[60,66.00,2.13,2.57,62.50,61.12,5.63,63.88,44,1.12,7.75,475,2500]],
150:[[26,30.94,1.57,1.69,28.00,26.94,3.44,29.31,36,0.88,5.50,120,373],[28,32.94,1.69,1.82,30.00,28.94,3.69,31.31,40,0.88,5.75,140,454],[30,34.94,1.69,1.94,32.00,31.00,3.88,33.31,44,0.88,6.00,150,543],[32,37.06,1.75,2.07,34.00,33.06,4.19,35.44,48,0.88,6.25,170,648],[34,39.56,1.88,2.19,36.25,35.12,4.28,37.69,40,1.00,6.75,210,783],[36,41.62,2.00,2.25,38.25,37.19,4.57,39.75,44,1.00,6.75,240,890],[38,44.25,2.07,2.44,40.25,39.25,4.82,42.12,40,1.12,7.50,290,1089],[40,46.25,2.13,2.57,42.50,41.31,5.00,44.12,44,1.12,7.75,310,1247],[42,48.25,2.25,2.63,44.50,43.38,5.19,46.12,48,1.12,7.75,345,1393],[44,50.25,2.32,2.75,46.50,45.38,5.32,48.12,52,1.12,8.00,370,1579],[46,52.81,2.38,2.88,48.62,47.44,5.63,50.56,40,1.25,8.50,435,1824],[48,54.81,2.50,3.00,50.75,49.50,5.82,52.56,44,1.25,8.75,480,2045],[50,56.81,2.63,3.13,52.75,51.50,6.00,54.56,48,1.25,9.00,520,2284],[52,58.81,2.69,3.25,54.75,53.56,6.13,56.56,52,1.25,9.25,550,2547],[54,61.00,2.75,3.38,56.75,55.62,6.32,58.75,56,1.25,9.50,620,2848],[56,63.00,2.82,3.50,58.75,57.69,6.50,60.75,60,1.25,9.75,650,3144],[58,65.94,2.88,3.62,60.75,59.69,6.82,63.44,48,1.38,10.00,780,3560],[60,67.94,2.94,3.75,63.00,61.81,7.00,65.44,52,1.38,10.25,850,3913]],
300:[[26,34.12,3.44,3.44,29.00,27.62,5.63,31.62,32,1.38,10.50,400,907],[28,36.25,3.44,3.44,31.00,29.75,5.81,33.75,36,1.38,10.50,450,1023],[30,39.00,3.63,3.63,33.25,32.00,6.16,36.25,36,1.50,11.25,550,1249],[32,41.50,4.00,4.00,35.50,34.00,6.56,38.50,32,1.62,12.00,685,1556],[34,43.62,4.00,4.00,37.50,36.12,6.75,40.62,36,1.62,12.00,750,1719],[36,46.12,4.00,4.00,39.75,38.00,7.06,42.88,32,1.75,12.50,840,1921],[38,48.12,4.31,4.31,41.75,40.00,7.50,44.88,36,1.75,13.00,915,2257],[40,50.12,4.50,4.50,43.88,42.00,7.75,46.88,40,1.75,13.50,990,2549],[42,52.50,4.63,4.63,46.00,44.00,8.00,49.00,36,1.88,14.00,1135,2876],[44,54.50,4.94,4.94,48.00,46.19,8.38,51.00,40,1.88,14.50,1235,3304],[46,57.50,5.00,5.06,50.00,48.38,8.69,53.75,36,2.00,15.00,1470,3766],[48,59.50,5.00,5.25,52.25,50.31,8.75,55.75,40,2.00,15.25,1575,4183],[50,61.50,5.38,5.44,54.25,52.38,9.19,57.75,44,2.00,15.75,1710,4629],[52,63.50,5.56,5.61,56.25,54.44,9.50,59.75,48,2.00,16.00,1840,5096],[54,65.88,5.32,5.81,58.25,56.50,9.38,62.12,48,2.00,16.00,1980,5678],[56,69.50,6.00,6.12,60.50,58.81,10.50,65.00,36,2.38,17.75,2595,6642],[58,71.94,6.00,6.31,62.75,60.94,10.75,67.44,40,2.38,18.00,2770,7347],[60,73.94,5.88,6.50,65.00,62.94,10.63,69.44,40,2.38,18.00,2870,7980]],
400:[[26,33.50,3.50,3.50,28.00,27.12,5.88,30.75,28,1.50,11.25,360,874],[28,36.00,3.75,3.75,30.00,29.12,6.25,33.00,24,1.62,12.00,450,1081],[30,38.25,4.00,4.00,32.25,31.25,6.69,35.25,28,1.62,12.50,530,1302],[32,40.75,4.25,4.25,34.38,33.25,7.06,37.50,28,1.75,13.25,635,1570],[34,42.75,4.38,4.38,36.50,35.38,7.38,39.50,32,1.75,13.50,690,1781],[36,45.50,4.69,4.69,38.62,37.50,7.88,42.00,28,1.88,14.50,855,2160]],
600:[[26,35.00,4.38,4.38,28.62,27.50,7.12,31.75,28,1.75,13.50,550,1194],[28,37.50,4.56,4.56,30.88,29.62,7.50,34.00,28,1.88,14.25,650,1427],[30,40.25,4.94,5.00,33.12,31.75,8.06,36.50,28,2.00,15.25,810,1802],[32,42.75,5.12,5.31,35.25,33.88,8.50,38.75,28,2.12,16.00,950,2159],[34,45.75,5.56,5.68,37.50,36.00,9.19,41.50,24,2.38,17.25,1205,2645],[36,47.75,5.75,5.94,39.75,38.12,9.56,43.50,28,2.38,17.75,1340,3013]],
900:[[26,40.25,5.31,6.06,30.00,29.25,10.19,35.50,20,2.62,17.75,1050,2184],[28,43.50,5.81,6.56,32.25,31.38,10.88,38.25,20,2.88,19.50,1520,2762],[30,46.50,6.12,6.93,34.50,33.50,11.38,40.75,20,3.12,20.50,1820,3334],[32,48.75,6.31,7.31,36.50,35.75,11.94,43.00,20,3.12,21.00,2065,3865],[34,51.75,6.75,7.68,39.00,37.88,12.56,45.50,20,3.38,22.50,2450,4576],[36,53.00,6.81,7.94,40.50,40.00,12.81,47.25,24,3.12,22.25,2520,4963]]}};
/* Classes 400, 600 and 900, NPS 38 and larger: one set of dimensions in B16.47, used by both series */
const BIG={
400:[[38,47.50,4.88,4.88,40.75,39.50,8.12,44.00,32,1.88,14.75,935,2450],[40,50.00,5.12,5.12,43.00,41.50,8.50,46.25,32,2.00,15.50,1090,2848],[42,52.00,5.25,5.25,45.00,43.62,8.81,48.25,32,2.00,15.75,1190,3159],[44,54.50,5.50,5.50,47.25,45.62,9.19,50.50,32,2.12,16.50,1375,3635],[46,56.75,5.75,5.75,49.50,47.75,9.62,52.75,36,2.12,17.00,1525,4120],[48,59.50,6.00,6.00,51.50,49.88,10.12,55.25,28,2.38,18.00,1790,4726],[50,61.75,6.19,6.25,53.62,52.00,10.56,57.50,32,2.38,18.50,1950,5303],[52,63.75,6.38,6.44,55.62,54.00,10.88,59.50,32,2.38,18.75,2125,5823],[54,67.00,6.69,6.75,57.88,56.12,11.38,62.25,28,2.62,20.00,2565,6742],[56,69.00,6.88,6.94,60.12,58.25,11.75,64.25,32,2.62,20.25,2710,7352],[58,71.00,7.00,7.12,62.12,60.25,12.06,66.25,32,2.62,20.50,3230,7986],[60,74.25,7.31,7.44,64.38,62.38,12.56,69.00,32,2.88,21.75,3820,9126]],
600:[[38,50.00,6.00,6.12,41.50,40.25,10.00,45.75,28,2.38,18.25,1470,3404],[40,52.00,6.25,6.38,43.75,42.25,10.38,47.75,32,2.38,18.75,1630,3838],[42,55.25,6.62,6.75,46.00,44.38,11.00,50.50,28,2.62,19.75,2030,4585],[44,57.25,6.81,7.00,48.25,46.50,11.38,52.50,32,2.62,20.25,2160,5105],[46,59.50,7.06,7.31,50.25,48.62,11.81,54.75,32,2.62,20.75,2410,5758],[48,62.75,7.44,7.69,52.50,50.75,12.44,57.50,32,2.88,22.25,2855,6737],[50,65.75,7.75,8.00,54.50,52.88,12.94,60.00,28,3.12,23.25,3330,7695],[52,67.75,8.00,8.25,56.50,54.88,13.25,62.00,32,3.12,23.75,3560,8426],[54,70.00,8.25,8.56,58.75,57.00,13.75,64.25,32,3.12,24.25,3920,9333],[56,73.00,8.56,8.88,60.75,59.12,14.25,66.75,32,3.38,25.50,4280,10529],[58,75.00,8.75,9.12,63.00,61.12,14.56,68.75,32,3.38,26.00,4640,11414],[60,78.50,9.19,9.56,65.25,63.38,15.31,71.75,28,3.62,27.25,5000,13108]],
900:[[38,57.50,7.50,8.50,43.25,42.25,13.88,50.75,20,3.62,24.50,3385,6253],[40,59.50,7.75,8.81,45.75,44.38,14.31,52.75,24,3.62,25.00,3620,6940],[42,61.50,8.12,9.12,47.75,46.31,14.62,54.75,24,3.62,25.75,3960,7675],[44,64.88,8.44,9.56,50.00,48.62,15.38,57.62,24,3.88,27.00,4300,8954],[46,68.25,8.88,10.06,52.50,50.88,16.19,60.50,24,4.12,28.50,4640,10426],[48,70.25,9.19,10.38,54.50,52.88,16.50,62.50,24,4.12,29.00,4980,11398]]};
for(const c of [400,600,900]){D.A[c]=D.A[c].concat(BIG[c].map(r=>r.concat('same')));D.B[c]=D.B[c].concat(BIG[c].map(r=>r.concat('same')));}
const CLS={A:[150,300,400,600,900],B:[75,150,300,400,600,900]};
const FR={0.75:'5/8',0.88:'3/4',1:'7/8',1.12:'1',1.25:'1-1/8',1.38:'1-1/4',1.5:'1-3/8',1.62:'1-1/2',1.75:'1-5/8',1.88:'1-3/4',2:'1-7/8',2.12:'2',2.38:'2-1/4',2.62:'2-1/2',2.88:'2-3/4',3.12:'3',3.38:'3-1/4',3.62:'3-1/2',3.88:'3-3/4',4.12:'4'};
const bolt=h=>FR[h]||'?';
const st=(k,d)=>{try{return store.get(k,d)}catch(e){return d}},sv=(k,v)=>{try{store.set(k,v)}catch(e){}};
let SER=st('lf_s','A'),CL=+st('lf_c','150'),NPS=+st('lf_n','36'),UN=(typeof U!=='undefined'&&U==='mm')?'mm':(typeof U!=='undefined'?'in':'mm');
const rows=()=>D[SER][CL]||[];
const fix=()=>{if(!CLS[SER].includes(CL))CL=SER==='A'?150:150;const r=rows();if(!r.some(x=>x[0]===NPS))NPS=r[r.length-1][0];};
const row=(s=SER,c=CL,n=NPS)=>(D[s][c]||[]).find(x=>x[0]===n);
const v=(x,dp)=>x==null?'–':UN==='mm'?(x*25.4).toFixed(dp==null?0:dp):x.toFixed(2);
const u=()=>UN==='mm'?'mm':'in';
const kg=lb=>lb==null?'–':UN==='mm'?Math.round(lb*0.4536).toLocaleString()+' kg':lb.toLocaleString()+' lb';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const DN=n=>({26:650,28:700,30:750,32:800,34:850,36:900,38:950,40:1000,42:1050,44:1100,46:1150,48:1200,50:1250,52:1300,54:1350,56:1400,58:1450,60:1500})[n];

function fig(r){
 const [n,O,tf,,R,X,Y,BC,nb,h]=r,W=620,H=320,cy=160,s=Math.min(250/O,1e9);
 /* face view */
 const fx=150,Ro=O/2*s,Rb=BC/2*s,Rr=R/2*s,Rp=n/2*s,hr=Math.max(h/2*s,1.6);
 let g=`<circle cx="${fx}" cy="${cy}" r="${Ro}" fill="#fff" stroke="#1F2937" stroke-width="2"/><circle cx="${fx}" cy="${cy}" r="${Rr}" fill="none" stroke="#1F2937" stroke-width="1"/><circle cx="${fx}" cy="${cy}" r="${Rp}" fill="#E9EEF5" stroke="#1F2937" stroke-width="1.4"/><circle cx="${fx}" cy="${cy}" r="${Rb}" fill="none" stroke="#1849A9" stroke-width="1" stroke-dasharray="8 3 2 3"/>`;
 for(let i=0;i<nb;i++){const a=2*Math.PI*(i+.5)/nb-Math.PI/2;g+=`<circle cx="${(fx+Rb*Math.cos(a)).toFixed(1)}" cy="${(cy+Rb*Math.sin(a)).toFixed(1)}" r="${hr.toFixed(1)}" fill="#fff" stroke="#1F2937" stroke-width="1.1"/>`;}
 g+=`<text x="${fx}" y="${cy+4}" text-anchor="middle">${nb} holes</text><text x="${fx}" y="${cy+20}" text-anchor="middle" class="dim">BC ${v(BC)}</text>`;
 /* half section: schematic proportions, real values in the labels */
 const xF=350,xT=410,xH=540,yO=34,yR=62,yB=86,yX=150,yA=186,yI=204,yC=252;
 g+=`<path d="M${xF} ${yI}V${yR}H${xF+4}V${yO}H${xT}V${yX}L${xH-14} ${yA}H${xH}V${yI}Z" fill="#E9EEF5" stroke="#1F2937" stroke-width="1.6"/>`;
 g+=`<path d="M${xF} ${yR}V${yI}" stroke="#1F2937" stroke-width="3"/>`;
 g+=`<path d="M${xF-8} ${yB}H${xT+8}" stroke="#1849A9" stroke-width="1" stroke-dasharray="6 3"/><rect x="${xF+4}" y="${yB-7}" width="${xT-xF-4}" height="14" fill="#fff" stroke="#1F2937" stroke-width="1" stroke-dasharray="3 2"/>`;
 g+=`<path d="M${xF-30} ${yC}H${xH+24}" stroke="#1F2937" stroke-width="1" stroke-dasharray="12 4 2 4"/><text x="${xH+28}" y="${yC+4}">CL</text>`;
 g+=`<path d="M${xF+6} ${yI+16}H${xH-6}" stroke="#1F2937" stroke-width="1" stroke-dasharray="4 3"/><text x="${(xF+xH)/2}" y="${yI+34}" text-anchor="middle" style="font-weight:500;fill:#5B6B80">bore to suit pipe</text>`;
 const dl=(x1,y1,x2,y2,t,tx,ty,anc='middle')=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#1849A9" stroke-width="1"/><circle cx="${x1}" cy="${y1}" r="2" fill="#1849A9"/><circle cx="${x2}" cy="${y2}" r="2" fill="#1849A9"/><text class="dim" x="${tx}" y="${ty}" text-anchor="${anc}">${t}</text>`;
 g+=`<path d="M${xF} ${yO-4}V${yO-22}M${xT} ${yO-4}V${yO-22}" stroke="#1849A9" stroke-width=".8"/>`+dl(xF,yO-16,xT,yO-16,'tf '+v(tf,1),(xF+xT)/2,yO-21);
 g+=`<path d="M${xH} ${yI+4}V${yC+22}" stroke="#1849A9" stroke-width=".8"/>`+dl(xF,yC+16,xH,yC+16,'Y '+v(Y),(xF+xH)/2,yC+32);
 const lab=(y,t,x0)=>`<path d="M${x0} ${y}H${xH+18}" stroke="#1849A9" stroke-width=".8" stroke-dasharray="2 2"/><text class="dim" x="${xH+22}" y="${y+4}">${t}</text>`;
 g+=lab(yO,'O '+v(O),xT+2)+lab(yB,'BC '+v(BC,1),xT+10)+lab(yX,'X '+v(X),xT+2);
 g+=`<path d="M${xF-4} ${yR}H${xF-24}" stroke="#1849A9" stroke-width=".8" stroke-dasharray="2 2"/><text class="dim" x="${xF-28}" y="${yR+4}" text-anchor="end">R ${v(R)}</text>`;
 g+=`<text x="${xF-30}" y="${H-6}" style="font-weight:500;fill:#5B6B80">Half section, not to scale</text>`;
 return `<svg class="lf-fig" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flange face view and half section">${g}</svg>`;}

function compare(){
 const a=row('A',CL,NPS),b=row('B',CL,NPS);if(!a||!b)return '';
 if(a[13]==='same')return `<p class="lf-warn" style="background:rgba(20,122,74,.09);color:#147A4A">At NPS ${NPS} Class ${CL}, B16.47 gives one set of dimensions for both series, so Series A and Series B flanges are the same here.</p>`;
 const L=[['Flange OD',1],['Bolt circle',7],['Bolts',8],['Hole diameter',9],['WN thickness',2],['Hub length Y',6]];
 return `<div class="lf-sec" style="margin-top:14px"><h2 style="font-size:15px">Series A and Series B at NPS ${NPS}, Class ${CL}</h2><table class="lf-cmp"><thead><tr><th></th><th>Series A</th><th>Series B</th></tr></thead><tbody>${L.map(([l,i])=>{const d=a[i]!==b[i];const f=x=>i===8?x:v(x);return `<tr><td>${l}</td><td class="${d?'diff':''}">${f(a[i])}</td><td class="${d?'diff':''}">${f(b[i])}</td></tr>`;}).join('')}</tbody></table><p class="lf-warn">⚠ Different bolt circle and drilling: a Series A flange will not bolt to a Series B flange. Check the series on the vendor nozzle, valve and mating flange before ordering.</p></div>`;}

function render(){
 fix();const r=row(),[n,O,tf,tfb,R,X,Y,BC,nb,h,sl,ww,wb,same]=r;
 const opts=rows().map(x=>`<option value="${x[0]}"${x[0]===NPS?' selected':''}>NPS ${x[0]} (DN ${DN(x[0])})</option>`).join('');
 const rf=CL>=400?'Class 400 and above: thickness and hub length exclude the 6.4 mm (0.25 in) raised face.':'Class 75–300: thickness and hub length include the 1.6 mm (0.06 in) raised face.';
 P.innerHTML=`<div class="phead"><div><h1>Large flanges, ASME B16.47</h1><p>Weld neck and blind flange dimensions for NPS 26 to 60, Series A (formerly MSS SP-44) and Series B (formerly API 605): OD, thickness, raised face, hub, bolt circle, bolting, stud length and weight.</p></div></div>
 <div class="lf-bar">
  <div class="lf-grp"><span>Series</span><div class="lf-seg" data-g="s">${['A','B'].map(s=>`<button class="lf-chip" type="button" data-v="${s}" aria-pressed="${SER===s}">Series ${s}</button>`).join('')}</div></div>
  <div class="lf-grp"><span>Class</span><div class="lf-seg" data-g="c">${[75,150,300,400,600,900].map(c=>`<button class="lf-chip" type="button" data-v="${c}" aria-pressed="${CL===c}"${CLS[SER].includes(c)?'':' disabled title="Class 75 is Series B only"'}>${c}</button>`).join('')}</div></div>
  <div class="lf-grp"><span>Size</span><select id="lfN" aria-label="Nominal pipe size">${opts}</select></div>
  <div class="lf-grp"><span>Units</span><div class="lf-seg" data-g="u">${[['mm','mm'],['in','inch']].map(([k,l])=>`<button class="lf-chip" type="button" data-v="${k}" aria-pressed="${UN===k}">${l}</button>`).join('')}</div></div>
 </div>
 <div class="lf-g">
  <div class="lf-card"><h2>NPS ${n} Class ${CL}, Series ${SER}</h2><p>DN ${DN(n)} · weld neck and blind · raised face${same?' · same dimensions in both series':''}</p>
   <table class="lf-kv"><tbody>
    <tr class="hd"><td colspan="2">Flange</td></tr>
    <tr><td>Outside diameter, O</td><td>${v(O)} <small>${u()}</small></td></tr>
    <tr><td>Thickness, weld neck, tf</td><td>${v(tf,1)} <small>${u()}</small></td></tr>
    <tr><td>Thickness, blind</td><td>${v(tfb,1)} <small>${u()}</small></td></tr>
    <tr><td>Raised face diameter, R</td><td>${v(R)} <small>${u()}</small></td></tr>
    <tr><td>Hub diameter at base, X</td><td>${v(X)} <small>${u()}</small></td></tr>
    <tr><td>Length through hub, Y</td><td>${v(Y)} <small>${u()}</small></td></tr>
    <tr><td>Bore / hub end</td><td style="font-weight:500">To suit pipe</td></tr>
    <tr class="hd"><td colspan="2">Bolting</td></tr>
    <tr><td>Bolt circle</td><td>${v(BC,1)} <small>${u()}</small></td></tr>
    <tr><td>Number of bolts</td><td>${nb}</td></tr>
    <tr><td>Bolt hole diameter</td><td>${v(h,1)} <small>${u()}</small></td></tr>
    <tr><td>Stud bolt size</td><td>${bolt(h)}" UNC/8UN</td></tr>
    <tr><td>Stud length, RF (approx.)</td><td>${v(sl)} <small>${u()}</small></td></tr>
    <tr class="hd"><td colspan="2">Weight, approx.</td></tr>
    <tr><td>Weld neck</td><td>${kg(ww)}</td></tr>
    <tr><td>Blind</td><td>${kg(wb)}</td></tr>
   </tbody></table>
   <div class="lf-acts">${window.shareChat?'<button class="lf-btn" type="button" data-a="chat">Copy for chat</button>':''}</div>
  </div>
  <div class="lf-card"><h2>Drawing</h2><p>Face view drawn to scale. The half section is a schematic labelled with the real values.</p>${fig(r)}${compare()}</div>
 </div>
 <section class="lf-sec"><h2>Series ${SER}, Class ${CL}: all sizes</h2><p>Dimensions in ${UN==='mm'?'mm':'inches'}; weights in ${UN==='mm'?'kg':'lb'}. Click a row to select it.${CL>=400?' Grey rows (NPS 38 and up) are the same in Series A and B.':''}</p>
  <div class="lf-tw"><table class="lf-t"><thead><tr><th>NPS</th><th>DN</th><th>OD<br>O</th><th>Thk WN<br>tf</th><th>Thk blind</th><th>RF dia<br>R</th><th>Hub dia<br>X</th><th>Hub length<br>Y</th><th>Bolt circle</th><th>Bolts</th><th>Hole dia</th><th>Stud size<br>in</th><th>Stud length</th><th>WN wt</th><th>Blind wt</th></tr></thead>
  <tbody>${rows().map(x=>`<tr data-n="${x[0]}" class="${x[0]===NPS?'on':''}${x[13]==='same'?' same':''}"><td>${x[0]}</td><td>${DN(x[0])}</td><td>${v(x[1])}</td><td>${v(x[2],1)}</td><td>${v(x[3],1)}</td><td>${v(x[4])}</td><td>${v(x[5])}</td><td>${v(x[6])}</td><td>${v(x[7],1)}</td><td>${x[8]}</td><td>${v(x[9],1)}</td><td>${bolt(x[9])}</td><td>${v(x[10])}</td><td>${kg(x[11]).replace(/ (kg|lb)$/,'')}</td><td>${kg(x[12]).replace(/ (kg|lb)$/,'')}</td></tr>`).join('')}</tbody></table></div>
  <ul class="lf-notes">
   <li>${rf}</li>
   <li>Series A covers Classes 150 to 900; Series B covers Classes 75 to 900. Class 900 stops at NPS 48 in both series.</li>
   <li>For Classes 400, 600 and 900 at NPS 38 and larger, B16.47 lists one set of dimensions that applies to both series.</li>
   <li>Values come from the B16.47 inch tables; mm values are converted from inches. The metric tables in B16.47 round some values (OD to 5 mm), so they can differ by 1–2 mm.</li>
   <li>Stud lengths are for raised face joints with a standard gasket and include no allowance for points. Weights are approximate, for carbon steel; NPS 50 Class 150 Series A weld neck weight is not listed.</li>
   <li>Pressure–temperature ratings are the same as ASME B16.5 for the same class and material group. Ring joint (RTJ) dimensions and gaskets are not shown here.</li>
   <li>Always check against the current edition of ASME B16.47 and the vendor drawing before fabrication or ordering.</li>
  </ul></section>`;
 bind();}
function bind(){
 P.querySelectorAll('.lf-seg').forEach(sg=>sg.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b||b.disabled)return;const g=sg.dataset.g,val=b.dataset.v;
  if(g==='s'){SER=val;sv('lf_s',SER);}else if(g==='c'){CL=+val;sv('lf_c',String(CL));}else{UN=val;}render();}));
 P.querySelector('#lfN').addEventListener('change',e=>{NPS=+e.target.value;sv('lf_n',String(NPS));render();});
 P.querySelector('.lf-t tbody').addEventListener('click',e=>{const tr=e.target.closest('tr[data-n]');if(!tr)return;NPS=+tr.dataset.n;sv('lf_n',String(NPS));render();P.querySelector('.lf-g').scrollIntoView({behavior:'smooth',block:'start'});});
 const c=P.querySelector('[data-a="chat"]');if(c)c.addEventListener('click',()=>{const r=row();window.shareChat({title:`B16.47 Series ${SER} flange, NPS ${NPS} Class ${CL}`,sub:'Weld neck / blind, raised face',rows:[['OD',v(r[1])+' '+u()],['Thickness WN / blind',v(r[2],1)+' / '+v(r[3],1)+' '+u()],['Bolt circle',v(r[7],1)+' '+u()],['Bolting',r[8]+' × '+bolt(r[9])+'"'],['Stud length',v(r[10])+' '+u()],['Hub length Y',v(r[6])+' '+u()]],note:'Check against ASME B16.47 and the vendor drawing.'});});}
render();
window.renderLF=()=>{const nu=(typeof U!=='undefined'&&U==='mm')?'mm':'in';if(nu!==UN){UN=nu;}if(!P.hidden)render();};
})();
