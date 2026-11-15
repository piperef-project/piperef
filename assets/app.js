
/* ============================== DATA (inches) ============================== */
const fr=s=>{if(typeof s==='number')return s;s=String(s);if(s.includes('-')){const[w,f]=s.split('-');const[a,b]=f.split('/');return +w + a/b;}if(s.includes('/')){const[a,b]=s.split('/');return a/b;}return +s;};
const DN={'1/8':6,'1/4':8,'3/8':10,'1/2':15,'3/4':20,'1':25,'1-1/4':32,'1-1/2':40,'2':50,'2-1/2':65,'3':80,'3-1/2':90,'4':100,'5':125,'6':150,'8':200,'10':250,'12':300,'14':350,'16':400,'18':450,'20':500,'22':550,'24':600,'26':650,'28':700,'30':750,'32':800,'34':850,'36':900,'38':950,'40':1000,'42':1050,'44':1100,'46':1150,'48':1200};

const SCH=['5S','10S','10','20','30','STD','40','60','XS','80','100','120','140','160','XXS'];
const PIPE=[
['1/8',.405,{'10S':.049,STD:.068,'40':.068,XS:.095,'80':.095}],
['1/4',.540,{'10S':.065,STD:.088,'40':.088,XS:.119,'80':.119}],
['3/8',.675,{'10S':.065,STD:.091,'40':.091,XS:.126,'80':.126}],
['1/2',.840,{'5S':.065,'10S':.083,STD:.109,'40':.109,XS:.147,'80':.147,'160':.188,XXS:.294}],
['3/4',1.050,{'5S':.065,'10S':.083,STD:.113,'40':.113,XS:.154,'80':.154,'160':.219,XXS:.308}],
['1',1.315,{'5S':.065,'10S':.109,STD:.133,'40':.133,XS:.179,'80':.179,'160':.250,XXS:.358}],
['1-1/4',1.660,{'5S':.065,'10S':.109,STD:.140,'40':.140,XS:.191,'80':.191,'160':.250,XXS:.382}],
['1-1/2',1.900,{'5S':.065,'10S':.109,STD:.145,'40':.145,XS:.200,'80':.200,'160':.281,XXS:.400}],
['2',2.375,{'5S':.065,'10S':.109,STD:.154,'40':.154,XS:.218,'80':.218,'160':.344,XXS:.436}],
['2-1/2',2.875,{'5S':.083,'10S':.120,STD:.203,'40':.203,XS:.276,'80':.276,'160':.375,XXS:.552}],
['3',3.500,{'5S':.083,'10S':.120,STD:.216,'40':.216,XS:.300,'80':.300,'160':.438,XXS:.600}],
['3-1/2',4.000,{'5S':.083,'10S':.120,STD:.226,'40':.226,XS:.318,'80':.318}],
['4',4.500,{'5S':.083,'10S':.120,STD:.237,'40':.237,XS:.337,'80':.337,'120':.438,'160':.531,XXS:.674}],
['5',5.563,{'5S':.109,'10S':.134,STD:.258,'40':.258,XS:.375,'80':.375,'120':.500,'160':.625,XXS:.750}],
['6',6.625,{'5S':.109,'10S':.134,STD:.280,'40':.280,XS:.432,'80':.432,'120':.562,'160':.719,XXS:.864}],
['8',8.625,{'5S':.109,'10S':.148,'20':.250,'30':.277,STD:.322,'40':.322,'60':.406,XS:.500,'80':.500,'100':.594,'120':.719,'140':.812,'160':.906,XXS:.875}],
['10',10.750,{'5S':.134,'10S':.165,'20':.250,'30':.307,STD:.365,'40':.365,'60':.500,XS:.500,'80':.594,'100':.719,'120':.844,'140':1.000,'160':1.125,XXS:1.000}],
['12',12.750,{'5S':.156,'10S':.180,'20':.250,'30':.330,STD:.375,'40':.406,'60':.562,XS:.500,'80':.688,'100':.844,'120':1.000,'140':1.125,'160':1.312,XXS:1.000}],
['14',14,{'5S':.156,'10S':.188,'10':.250,'20':.312,'30':.375,STD:.375,'40':.438,'60':.594,XS:.500,'80':.750,'100':.938,'120':1.094,'140':1.250,'160':1.406}],
['16',16,{'5S':.165,'10S':.188,'10':.250,'20':.312,'30':.375,STD:.375,'40':.500,'60':.656,XS:.500,'80':.844,'100':1.031,'120':1.219,'140':1.438,'160':1.594}],
['18',18,{'5S':.165,'10S':.188,'10':.250,'20':.312,'30':.438,STD:.375,'40':.562,'60':.750,XS:.500,'80':.938,'100':1.156,'120':1.375,'140':1.562,'160':1.781}],
['20',20,{'5S':.188,'10S':.218,'10':.250,'20':.375,'30':.500,STD:.375,'40':.594,'60':.812,XS:.500,'80':1.031,'100':1.281,'120':1.500,'140':1.750,'160':1.969}],
['22',22,{'5S':.188,'10S':.218,'10':.250,'20':.375,'30':.500,STD:.375,'60':.875,XS:.500,'80':1.125,'100':1.375,'120':1.625,'140':1.875,'160':2.125}],
['24',24,{'5S':.218,'10S':.250,'10':.250,'20':.375,'30':.562,STD:.375,'40':.688,'60':.969,XS:.500,'80':1.219,'100':1.531,'120':1.812,'140':2.062,'160':2.344}],
['26',26,{'10':.312,'20':.500,STD:.375,XS:.500}],
['28',28,{'10':.312,'20':.500,'30':.625,STD:.375,XS:.500}],
['30',30,{'5S':.250,'10S':.312,'10':.312,'20':.500,'30':.625,STD:.375,XS:.500}],
['32',32,{'10':.312,'20':.500,'30':.625,'40':.688,STD:.375,XS:.500}],
['34',34,{'10':.312,'20':.500,'30':.625,'40':.688,STD:.375,XS:.500}],
['36',36,{'10':.312,'20':.500,'30':.625,'40':.750,STD:.375,XS:.500}],
['38',38,{STD:.375,XS:.500}],
['40',40,{STD:.375,XS:.500}],
['42',42,{STD:.375,XS:.500}],
['44',44,{STD:.375,XS:.500}],
['46',46,{STD:.375,XS:.500}],
['48',48,{STD:.375,XS:.500}]
];
const PIPEMAP=Object.fromEntries(PIPE.map(p=>[p[0],p]));

/* ASME B16.5 flanges */
const N20=['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','3-1/2','4','5','6','8','10','12','14','16','18','20','24'];
const N19=N20.filter(n=>n!=='3-1/2');
const N14=['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','4','5','6','8','10','12'];
const RF={'1/2':1.38,'3/4':1.69,'1':2.00,'1-1/4':2.50,'1-1/2':2.88,'2':3.62,'2-1/2':4.12,'3':5.00,'3-1/2':5.50,'4':6.19,'5':7.31,'6':8.50,'8':10.62,'10':12.75,'12':15.00,'14':16.25,'16':18.50,'18':21.00,'20':23.00,'24':27.25};
const FL={
'150':{nps:N20,
 O:[3.50,3.88,4.25,4.62,5.00,6.00,7.00,7.50,8.50,9.00,10.00,11.00,13.50,16.00,19.00,21.00,23.50,25.00,27.50,32.00],
 tf:[.38,.44,.50,.56,.62,.69,.81,.88,.88,.88,.88,.94,1.06,1.12,1.19,1.31,1.38,1.50,1.62,1.81],
 BC:[2.38,2.75,3.12,3.50,3.88,4.75,5.50,6.00,7.00,7.50,8.50,9.50,11.75,14.25,17.00,18.75,21.25,22.75,25.00,29.50],
 n:[4,4,4,4,4,4,4,4,8,8,8,8,8,12,12,12,16,16,20,20],
 d:['1/2','1/2','1/2','1/2','1/2','5/8','5/8','5/8','5/8','5/8','3/4','3/4','3/4','7/8','7/8','1','1','1-1/8','1-1/8','1-1/4'],
 X:[1.19,1.50,1.94,2.31,2.56,3.06,3.56,4.25,4.81,5.31,6.44,7.56,9.69,12.00,14.38,15.75,18.00,19.88,22.00,26.12],
 Y:[1.88,2.06,2.19,2.25,2.44,2.50,2.75,2.75,2.81,3.00,3.50,3.50,4.00,4.00,4.50,5.00,5.00,5.50,5.69,6.00]},
'300':{nps:N20,
 O:[3.75,4.62,4.88,5.25,6.12,6.50,7.50,8.25,9.00,10.00,11.00,12.50,15.00,17.50,20.50,23.00,25.50,28.00,30.50,36.00],
 tf:[.50,.56,.62,.69,.75,.81,.94,1.06,1.12,1.19,1.31,1.38,1.56,1.81,1.94,2.06,2.19,2.31,2.44,2.69],
 BC:[2.62,3.25,3.50,3.88,4.50,5.00,5.88,6.62,7.25,7.88,9.25,10.62,13.00,15.25,17.75,20.25,22.50,24.75,27.00,32.00],
 n:[4,4,4,4,4,8,8,8,8,8,8,12,12,16,16,20,20,24,24,24],
 d:['1/2','5/8','5/8','5/8','3/4','5/8','3/4','3/4','3/4','3/4','3/4','3/4','7/8','1','1-1/8','1-1/8','1-1/4','1-1/4','1-1/4','1-1/2'],
 X:[1.50,1.88,2.12,2.50,2.75,3.31,3.94,4.62,5.25,5.75,7.00,8.12,10.25,12.62,14.75,16.75,19.00,21.00,23.12,27.62],
 Y:[2.06,2.25,2.44,2.56,2.69,2.75,3.00,3.12,3.19,3.38,3.88,3.88,4.38,4.62,5.12,5.62,5.75,6.25,6.38,6.62]},
'600':{nps:N20,
 O:[3.75,4.62,4.88,5.25,6.12,6.50,7.50,8.25,9.00,10.75,13.00,14.00,16.50,20.00,22.00,23.75,27.00,29.25,32.00,37.00],
 tf:[.56,.62,.69,.81,.88,1.00,1.12,1.25,1.38,1.50,1.75,1.88,2.19,2.50,2.62,2.75,3.00,3.25,3.50,4.00],
 BC:[2.62,3.25,3.50,3.88,4.50,5.00,5.88,6.62,7.25,8.50,10.50,11.50,13.75,17.00,19.25,20.75,23.75,25.75,28.50,33.00],
 n:[4,4,4,4,4,8,8,8,8,8,8,12,12,16,20,20,20,20,24,24],
 d:['1/2','5/8','5/8','5/8','3/4','5/8','3/4','3/4','7/8','7/8','1','1','1-1/8','1-1/4','1-1/4','1-3/8','1-1/2','1-5/8','1-5/8','1-7/8'],
 X:[1.50,1.88,2.12,2.50,2.75,3.31,3.94,4.62,5.25,6.00,7.44,8.75,10.75,13.50,15.75,17.00,19.50,21.50,24.00,28.25],
 Y:[2.06,2.25,2.44,2.62,2.75,2.88,3.12,3.25,3.38,4.00,4.50,4.62,5.25,6.00,6.12,6.50,7.00,7.25,7.50,8.00]},
'900':{nps:N19,
 O:[4.75,5.12,5.88,6.25,7.00,8.50,9.62,9.50,11.50,13.75,15.00,18.50,21.50,24.00,25.25,27.75,31.00,33.75,41.00],
 tf:[.88,1.00,1.12,1.12,1.25,1.50,1.62,1.50,1.75,2.00,2.19,2.50,2.75,3.12,3.38,3.50,4.00,4.25,5.50],
 BC:[3.25,3.50,4.00,4.38,4.88,6.50,7.50,7.50,9.25,11.00,12.50,15.50,18.50,21.00,22.00,24.25,27.00,29.50,35.50],
 n:[4,4,4,4,4,8,8,8,8,8,12,12,16,20,20,20,20,20,20],
 d:['3/4','3/4','7/8','7/8','1','7/8','1','7/8','1-1/8','1-1/4','1-1/8','1-3/8','1-3/8','1-3/8','1-1/2','1-5/8','1-7/8','2','2-1/2'],
 X:[1.50,1.75,2.06,2.50,2.75,4.12,4.88,5.00,6.25,7.50,9.25,11.75,14.50,16.50,17.75,20.00,22.25,24.50,29.50],
 Y:[2.38,2.75,2.88,2.88,3.25,4.00,4.12,4.00,4.50,5.00,5.50,6.38,7.25,7.88,8.38,8.50,9.00,9.75,11.50]},
'1500':{nps:N19,
 O:[4.75,5.12,5.88,6.25,7.00,8.50,9.62,10.50,12.25,14.75,15.50,19.00,23.00,26.50,29.50,32.50,36.00,38.75,46.00],
 tf:[.88,1.00,1.12,1.12,1.25,1.50,1.62,1.88,2.12,2.88,3.25,3.62,4.25,4.88,5.25,5.75,6.38,7.00,8.00],
 BC:[3.25,3.50,4.00,4.38,4.88,6.50,7.50,8.00,9.50,11.50,12.50,15.50,19.00,22.50,25.00,27.75,30.50,32.75,39.00],
 n:[4,4,4,4,4,8,8,8,8,8,12,12,12,16,16,16,16,16,16],
 d:['3/4','3/4','7/8','7/8','1','7/8','1','1-1/8','1-1/4','1-1/2','1-3/8','1-5/8','1-7/8','2','2-1/4','2-1/2','2-3/4','3','3-1/2'],
 X:[1.50,1.75,2.06,2.50,2.75,4.12,4.88,5.25,6.38,7.75,9.00,11.50,14.50,17.75,19.50,21.75,23.50,25.25,30.00],
 Y:[2.38,2.75,2.88,2.88,3.25,4.00,4.12,4.62,4.88,6.12,6.75,8.38,10.00,11.12,11.75,12.25,12.88,14.00,16.00]},
'2500':{nps:N14,
 O:[5.25,5.50,6.25,7.25,8.00,9.25,10.50,12.00,14.00,16.50,19.00,21.75,26.50,30.00],
 tf:[1.19,1.25,1.38,1.50,1.75,2.00,2.25,2.62,3.00,3.62,4.25,5.00,6.50,7.25],
 BC:[3.50,3.75,4.25,5.12,5.75,6.75,7.75,9.00,10.75,12.75,14.50,17.25,21.25,24.38],
 n:[4,4,4,4,4,8,8,8,8,8,8,12,12,12],
 d:['3/4','3/4','7/8','1','1-1/8','1','1-1/8','1-1/4','1-1/2','1-3/4','2','2','2-1/2','2-3/4'],
 X:[1.69,2.00,2.25,2.88,3.12,3.75,4.50,5.25,6.50,8.00,9.25,12.00,14.75,17.38],
 Y:[2.88,3.12,3.50,3.75,4.38,5.00,5.62,6.62,7.50,9.00,10.75,12.50,16.50,18.25]}
};
/* Class 400, B16.5: NPS 1/2–3-1/2 use the Class 600 dimensions; NPS 4–24 below (raised face 0.25 in, not included in tf and Y) */
(()=>{const s=FL['600'],k=9,t={
 O:[10.00,11.00,12.50,15.00,17.50,20.50,23.00,25.50,28.00,30.50,36.00],
 tf:[1.38,1.50,1.62,1.88,2.12,2.25,2.38,2.50,2.62,2.75,3.00],
 BC:[7.88,9.25,10.62,13.00,15.25,17.75,20.25,22.50,24.75,27.00,32.00],
 n:[8,8,12,12,16,16,20,20,24,24,24],
 d:['7/8','7/8','7/8','1','1-1/8','1-1/4','1-1/4','1-3/8','1-3/8','1-1/2','1-3/4'],
 X:[5.75,7.00,8.12,10.25,12.62,14.75,16.75,19.00,21.00,23.12,27.62],
 Y:[3.50,4.00,4.06,4.62,4.88,5.38,5.88,6.00,6.50,6.62,6.88]};
 const o={nps:N20};for(const f in t)o[f]=s[f].slice(0,k).concat(t[f]);FL['400']=o;})();
const CLASSES=Object.keys(FL);
/* ASME B16.5 slip-on / threaded / socket-weld data (inch), aligned with FL[cls].nps.
   Y_SO: length through hub. Class 150 and 300 include the 0.06 in raised face, like FL Y; Class 900 NPS 1/2–2-1/2 use Class 1500
   dimensions. Class 2500 has no slip-on or socket-weld flange in B16.5.
   B: slip-on / socket bore (min), same for all classes. D: socket depth, NPS 1/2–3. */
const FLSO={
 '150':[.62,.62,.69,.81,.88,1.00,1.12,1.19,1.25,1.31,1.44,1.56,1.75,1.94,2.19,2.25,2.50,2.69,2.88,3.25],
 '300':[.88,1.00,1.06,1.06,1.19,1.31,1.50,1.69,1.75,1.88,2.00,2.06,2.44,2.62,2.88,3.00,3.25,3.50,3.75,4.19],
 '400':[.88,1.00,1.06,1.12,1.25,1.44,1.62,1.81,1.94,2.00,2.12,2.25,2.69,2.88,3.12,3.31,3.69,3.88,4.00,4.50],
 '600':[.88,1.00,1.06,1.12,1.25,1.44,1.62,1.81,1.94,2.12,2.38,2.62,3.00,3.38,3.62,3.69,4.19,4.62,5.00,5.50],
 '900':[1.25,1.38,1.62,1.62,1.75,2.25,2.50,2.12,2.75,3.12,3.38,4.00,4.25,4.62,5.12,5.25,6.00,6.25,8.00],
 '1500':[1.25,1.38,1.62,1.62,1.75,2.25,2.50,2.88,3.56,4.12,4.69,5.62,6.25,7.12,null,null,null,null,null]};
/* Threaded flanges: length through hub = FLSO (Class 2500: FLTHY); T = minimum thread length (B1.20.1 NPT). null = not in B16.5 */
const FLTHY={'2500':[1.56,1.69,1.88,2.06,2.38,2.75,3.12,3.62,4.25,5.12,6.00,7.00,9.00,10.00]};
const FLT={
 '150':[.62,.62,.69,.81,.88,1.00,1.12,1.19,1.25,1.31,1.44,1.56,1.75,1.94,2.19,2.25,2.50,2.69,2.88,3.25],
 '300':[.62,.62,.69,.81,.88,1.12,1.25,1.25,1.44,1.44,1.69,1.81,2.00,2.19,2.38,2.50,2.69,2.75,2.88,3.25],
 '400':[.62,.62,.69,.81,.88,1.12,1.25,1.38,1.56,1.44,1.69,1.81,2.00,2.19,2.38,2.50,2.69,2.75,2.88,3.25],
 '600':[.62,.62,.69,.81,.88,1.12,1.25,1.38,1.56,1.62,1.88,2.00,2.25,2.56,2.75,2.88,3.06,3.12,3.25,3.62],
 '900':[.88,1.00,1.12,1.19,1.25,1.50,1.88,1.62,1.88,2.12,2.25,2.50,2.81,3.00,3.25,3.38,3.50,3.62,4.00],
 '1500':[.88,1.00,1.12,1.19,1.25,1.50,1.88,2.00,2.25,2.50,2.75,3.00,3.31,3.63,null,null,null,null,null],
 '2500':[1.12,1.25,1.38,1.50,1.75,2.00,2.25,2.50,2.75,3.00,3.25,3.75,4.25,4.75]};
/* Lap-joint flanges: Y3 length through hub; bore B3 (mm, same for all classes); r = corner radius of bore at the face */
const FLLJ={
 '150':[.62,.62,.69,.81,.88,1.00,1.12,1.19,1.25,1.31,1.44,1.56,1.75,1.94,2.19,3.12,3.44,3.81,4.06,4.38],
 '300':[.88,1.00,1.06,1.06,1.19,1.31,1.50,1.69,1.75,1.88,2.00,2.06,2.44,3.75,4.00,4.38,4.75,5.12,5.50,6.00],
 '400':[.88,1.00,1.06,1.12,1.25,1.44,1.62,1.81,1.94,2.00,2.12,2.25,2.69,4.00,4.25,4.62,5.00,5.38,5.75,6.62],
 '600':[.88,1.00,1.06,1.12,1.25,1.44,1.62,1.81,1.94,2.12,2.38,2.62,3.00,4.38,4.62,5.00,5.50,6.00,6.50,7.25],
 '900':[1.25,1.38,1.62,1.62,1.75,2.25,2.50,2.12,2.75,3.12,3.38,4.50,5.00,5.62,6.12,6.50,7.50,8.25,10.50],
 '1500':[1.25,1.38,1.62,1.62,1.75,2.25,2.50,2.88,3.56,4.12,4.69,5.62,7.00,8.62,9.50,10.25,10.88,11.50,13.00],
 '2500':[1.56,1.69,1.88,2.06,2.38,2.75,3.12,3.62,4.25,5.12,6.00,7.00,9.00,10.00]};
const LJB_MM={'1/2':22.9,'3/4':28.2,'1':34.9,'1-1/4':43.7,'1-1/2':50.0,'2':62.5,'2-1/2':75.4,'3':91.4,'3-1/2':104.1,'4':116.8,'5':144.4,'6':171.4,'8':222.2,'10':277.4,'12':328.2,'14':360.2,'16':411.2,'18':462.3,'20':514.4,'24':616.0};
const ljR=n=>{const v=fr(n);return v<=1?.12:v<=1.25?.19:v<=1.5?.25:v<=2.5?.31:v<=3.5?.38:v<=5?.44:.50;};
const FLB={'1/2':.88,'3/4':1.09,'1':1.36,'1-1/4':1.70,'1-1/2':1.95,'2':2.44,'2-1/2':2.94,'3':3.57,'3-1/2':4.07,'4':4.57,'5':5.66,'6':6.72,'8':8.72,'10':10.88,'12':12.88,'14':14.14,'16':16.16,'18':18.18,'20':20.20,'24':24.25};
const FLD={'1/2':.38,'3/4':.44,'1':.50,'1-1/4':.56,'1-1/2':.62,'2':.69,'2-1/2':.75,'3':.81};
const SW_MAX={'150':'3','300':'3','400':'3','600':'3','900':'2-1/2','1500':'2-1/2'};
const FLTYPES=[['wn','Weld neck'],['so','Slip-on'],['sw','Socket weld'],['th','Threaded'],['lj','Lap joint'],['bl','Blind']];
/* type-specific row; null when B16.5 does not cover that type, class and size */
function flTypeRow(type,cls,nps){const r=flRow(cls,nps);if(!r)return null;if(type==='wn'||type==='bl')return r;
 const i=FL[cls].nps.indexOf(nps);
 if(type==='th'){const y=(FLSO[cls]||FLTHY[cls]||[])[i],t=(FLT[cls]||[])[i];if(y==null||t==null)return null;return {...r,Yso:y,T:t};}
 if(type==='lj'){const y=(FLLJ[cls]||[])[i];if(y==null)return null;return {...r,Yso:y,B:LJB_MM[nps]/25.4,rc:ljR(nps)};}
 const y=FLSO[cls]?FLSO[cls][i]:null;if(y==null)return null;
 if(type==='sw'){const mx=SW_MAX[cls];if(!mx||fr(nps)>fr(mx))return null;return {...r,Yso:y,B:FLB[nps],D:FLD[nps]};}
 return {...r,Yso:y,B:FLB[nps]};}
function flRow(cls,nps){const f=FL[cls];const i=f.nps.indexOf(nps);if(i<0)return null;return{O:f.O[i],tf:f.tf[i],BC:f.BC[i],n:f.n[i],d:f.d[i],dv:fr(f.d[i]),X:f.X[i],Y:f.Y[i],R:RF[nps]};}

/* ASME B16.9 butt-weld fittings */
const BWN=['1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','3-1/2','4','5','6','8','10','12','14','16','18','20','22','24','26','28','30','32','34','36','38','40','42','44','46','48'];
const BW={
 lr90:[1.50,1.50,1.50,1.88,2.25,3.00,3.75,4.50,5.25,6.00,7.50,9.00,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72],
 lr45:[.62,.75,.88,1.00,1.12,1.38,1.75,2.00,2.25,2.50,3.12,3.75,5.00,6.25,7.50,8.75,10.00,11.25,12.50,13.50,15.00,16.00,17.25,18.50,19.75,21.00,22.25,23.62,24.88,26.00,27.38,28.62,29.88],
 sr90:[null,null,1,1.25,1.5,2,2.5,3,3.5,4,5,6,8,10,12,14,16,18,20,22,24,null,null,null,null,null,null,null,null,null,null,null,null],
 d390:[null,2.25,3,3.75,4.5,6,7.5,9,10.5,12,15,18,24,30,36,42,48,54,60,66,72,null,null,null,null,null,null,null,null,null,null,null,null],
 r180K:[null,null,2.19,2.75,3.25,4.19,5.19,6.25,7.25,8.25,10.31,12.31,16.31,20.38,24.38,28.00,32.00,36.00,40.00,44.00,48.00,null,null,null,null,null,null,null,null,null,null,null,null],
 tee:[1.00,1.12,1.50,1.88,2.25,2.50,3.00,3.38,3.75,4.12,4.88,5.62,7.00,8.50,10.00,11.00,12.00,13.50,15.00,16.50,17.00,19.5,20.5,22,23.5,25,26.5,28,29.5,30,32,33.5,35],
 red:[null,1.50,2.00,2.00,2.50,3.00,3.50,3.50,4.00,4.00,5.00,5.50,6.00,7.00,8.00,13.00,14.00,15.00,20.00,20.00,20.00,24,24,24,24,24,24,null,null,null,null,null,null],
 cap:[1.00,1.00,1.50,1.50,1.50,1.50,1.50,2.00,2.50,2.50,3.00,3.50,4.00,5.00,6.00,6.50,7.00,8.00,9.00,10.00,10.50,10.5,10.5,10.5,10.5,10.5,10.5,12,12,12,13.5,13.5,13.5]
};
/* tee outlet M: equals C except NPS 42–48 */
BW.teeM=BW.tee.map((c,i)=>({'42':28,'44':30,'46':31.5,'48':33})[BWN[i]]??c);
function bwRow(nps){const i=BWN.indexOf(nps);if(i<0)return null;const o={};for(const k in BW)o[k]=BW[k][i];o.r180O=o.r180K!=null||fr(nps)<1?o.lr90*2:null;return o;}

/* ASME B16.11 socket weld + ASME B1.20.1 NPT */
const SWN=['1/8','1/4','3/8','1/2','3/4','1','1-1/4','1-1/2','2','2-1/2','3','4'];
const SW={
 Bmin:[.420,.555,.690,.855,1.065,1.330,1.675,1.915,2.406,2.906,3.535,4.545],
 Bmax:[.440,.575,.710,.875,1.085,1.350,1.695,1.935,2.426,2.936,3.565,4.575],
 J:[.38,.38,.38,.38,.50,.50,.50,.50,.62,.62,.62,.75],
 A3000:[.44,.44,.56,.62,.75,.88,1.06,1.25,1.50,1.62,2.25,2.62],
 A6000:[.44,.56,.62,.75,.88,1.06,1.25,1.50,1.62,2.25,2.62,null],
 C3000:[.31,.31,.31,.44,.50,.56,.69,.81,.88,1.12,1.25,1.62],
 C6000:[.31,.31,.44,.50,.56,.69,.81,.88,1.12,1.25,1.62,null],
 tpi:[27,18,18,14,14,11.5,11.5,11.5,11.5,8,8,8],
 L1:[.180,.200,.240,.320,.339,.400,.420,.420,.436,.682,.766,.844],
 L2:[.2639,.4018,.4078,.5337,.5457,.6828,.7068,.7235,.7565,1.1375,1.2000,1.3000]
};

/* ASME B16.20 spiral wound gaskets for B16.5 RF flanges (mm). d1 inner ring ID, d2 winding ID, d3 winding OD (= centering ring ID), d4 centering ring OD.
   Sizes NPS 1/2–24 without 3-1/2 (Class 2500 to NPS 12). Class 900 NPS 1/2–2-1/2 use the Class 1500 rings. */
const SWG={
 '150':{d1:[14.2,20.6,26.9,38.1,44.5,55.6,66.5,81,106.4,131.8,157.2,215.9,268.2,317.5,349.3,400.1,449.3,500.1,603.3],d2:[19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,127,155.7,182.6,233.4,287.3,339.9,371.6,422.4,474.7,525.5,628.7],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,263.7,317.5,374.7,406.4,463.6,527.1,577.9,685.8],d4:[47.8,57.2,66.8,76.2,85.9,104.9,124,136.7,174.8,196.9,222.3,279.4,339.9,409.7,450.9,514.4,549.4,606.6,717.6]},
 '300':{d1:[14.2,20.6,26.9,38.1,44.5,55.6,66.5,81,106.4,131.8,157.2,215.9,268.2,317.5,349.3,400.1,449.3,500.1,603.3],d2:[19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,127,155.7,182.6,233.4,287.3,339.9,371.6,422.4,474.7,525.6,628.7],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,263.7,317.5,374.7,406.4,463.6,527.1,577.9,685.8],d4:[54.1,66.8,73.2,82.6,95.3,111.3,130.3,149.4,181.1,215.9,251,308.1,362,422.4,485.9,539.8,596.9,654.1,774.7]},
 '400':{d1:[14.2,20.6,26.9,38.1,44.5,55.6,66.5,81,102.6,128.3,154.9,205.7,255.3,307.3,342.9,389.9,438.2,489,590.6],d2:[19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,120.7,147.6,174.8,225.6,274.6,327.2,362,412.8,469.9,520.7,628.7],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,263.7,317.5,374.7,406.4,463.6,527.1,577.9,685.8],d4:[54.1,66.8,73.2,82.6,95.3,111.3,130.3,149.4,177.8,212.9,247.7,304.8,358.9,419.1,482.6,536.7,593.9,647.7,768.4]},
 '600':{d1:[14.2,20.6,26.9,38.1,44.5,55.6,66.5,78.7,102.6,128.3,154.9,205.7,255.3,307.3,342.9,389.9,438.2,489,590.6],d2:[19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,120.7,147.6,174.8,225.6,274.6,327.2,362,412.8,469.9,520.7,628.7],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,263.7,317.5,374.7,406.4,463.6,527.1,577.9,685.8],d4:[54.1,66.8,73.2,82.6,95.3,111.3,130.3,149.4,193.8,241.3,266.7,320.8,400.1,457.2,492.3,565.2,612.9,682.8,790.7]},
 '900':{d1:[14.2,20.6,26.9,33.3,41.4,52.3,63.5,78.7,102.6,128.3,154.9,196.9,246.1,292.1,320.8,374.7,425.5,482.6,590.6],d2:[19.1,25.4,31.8,39.6,47.8,58.7,69.9,95.3,120.7,147.6,174.8,222.3,276.4,323.9,355.6,412.8,463.6,520.7,628.7],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,257.3,311.2,368.3,400.1,457.2,520.7,571.5,679.5],d4:[63.5,69.9,79.5,88.9,98.6,143,165.1,168.4,206.5,247.7,289.1,358.9,435.1,498.6,520.7,574.8,638.3,698.5,838.2]},
 '1500':{d1:[14.2,20.6,26.9,33.3,41.4,52.3,63.5,78.7,97.8,124.5,147.3,196.9,246.1,292.1,320.8,374.7,425.5,476.3,577.9],d2:[19.1,25.4,31.8,39.6,47.8,58.7,69.9,92.2,117.6,143,171.5,215.9,266.7,323.9,362,406.4,463.6,514.4,616],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,257.3,311.2,368.3,400.1,457.2,520.7,571.5,679.5],d4:[63.5,69.9,79.5,88.9,98.6,143,165.1,174.8,209.6,254,282.7,352.6,435.1,520.7,577.9,641.4,704.9,755.7,901.7]},
 '2500':{d1:[14.2,20.6,26.9,33.3,41.4,52.3,63.5,78.7,97.8,124.5,147.3,196.9,246.1,292.1],d2:[19.1,25.4,31.8,39.6,47.8,58.7,69.9,92.2,117.6,143,171.5,215.9,270,317.5],d3:[31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,257.3,311.2,368.3],d4:[69.9,76.2,85.9,104.9,117.6,146,168.4,196.9,235,279.4,317.5,387.4,476.3,549.4]}};
const gL=mm=>mm==null||isNaN(mm)?NA:U==='mm'?(+mm).toFixed(1):(mm/25.4).toFixed(2);
const SWG_N=c=>c==='2500'?N14:N19;
function swg(cls,n){const g=SWG[cls];if(!g)return null;const i=SWG_N(cls).indexOf(n);if(i<0)return null;return {d1:g.d1[i],d2:g.d2[i],d3:g.d3[i],d4:g.d4[i]};}
/* inner ring mandatory: Class 900 NPS ≥ 24, 1500 NPS ≥ 12, 2500 NPS ≥ 4, and every PTFE-filled gasket */
const swgInner=(cls,n)=>{const v=fr(n);return (cls==='900'&&v>=24)||(cls==='1500'&&v>=12)||(cls==='2500'&&v>=4);};

/* ASME B16.5 Table 2-1.1, Material Group 1.1 ONLY (carbon steel) — bar(g) vs °C */
const PT_T=[38,50,100,150,200,250,300,325,350,375,400,425,450,475,500,538];
const PT={
 '150':[19.6,19.2,17.7,15.8,13.8,12.1,10.2,9.3,8.4,7.4,6.5,5.5,4.6,3.7,2.8,1.4],
 '300':[51.1,50.1,46.6,45.1,43.8,41.9,39.8,38.7,37.6,36.4,34.7,28.8,23.0,17.4,11.8,5.9],
 '400':[68.1,66.8,62.1,60.1,58.4,55.9,53.1,51.6,50.1,48.5,46.3,38.4,30.7,23.2,15.7,7.9],
 '600':[102.1,100.2,93.2,90.2,87.6,83.9,79.6,77.4,75.1,72.7,69.4,57.5,46.0,34.9,23.5,11.8],
 '900':[153.2,150.4,139.8,135.2,131.4,125.8,119.5,116.1,112.7,109.1,104.2,86.3,69.0,52.3,35.3,17.7],
 '1500':[255.3,250.6,233.0,225.4,219.0,209.7,199.1,193.6,187.8,181.8,173.6,143.8,115.0,87.2,58.8,29.5],
 '2500':[425.5,417.7,388.3,375.6,365.0,349.5,331.8,322.6,313.0,303.1,289.3,239.7,191.7,145.3,97.9,49.2]
};
const PT_TF=[100,200,300,400,500,600,650,700,750,800,850,900,950,1000];
const PTF={
 '150':[285,260,230,200,170,140,125,110,95,80,65,50,35,20],
 '300':[740,680,655,635,605,570,550,530,505,410,320,230,135,85],
 '400':[985,905,870,845,805,755,730,710,675,550,425,305,185,115],
 '600':[1480,1360,1310,1265,1205,1135,1100,1060,1015,825,640,460,275,170],
 '900':[2220,2035,1965,1900,1810,1705,1650,1590,1520,1235,955,690,410,255],
 '1500':[3705,3395,3270,3170,3015,2840,2745,2655,2535,2055,1595,1150,685,430],
 '2500':[6170,5655,5450,5280,5025,4730,4575,4425,4230,3430,2655,1915,1145,715]
};
function ptAt(cls,T){const t=PT_T,v=PT[cls];if(T<-29||T>538)return null;if(T<=38)return v[0];for(let i=1;i<t.length;i++){if(T<=t[i]){const f=(T-t[i-1])/(t[i]-t[i-1]);return v[i-1]+f*(v[i]-v[i-1]);}}return null;}

/* Material groups. psig / °F tables: ASME B16.5-2025. Group 1.1 also has the B16.5 metric table (bar / °C) above.
   Groups 2.1 and 2.2 have no metric table here: bar values are conversions of the psig table (1 psi = 0.0689476 bar). */
const PT_TF2=[100,200,300,400,500,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500];
const PTG={
 '1.1':{lbl:'1.1 · Carbon steel',mats:'A105 forgings; A350 LF2, LF6 Cl 1; A216 WCB castings; A515 Gr 70, A516 Gr 70, A537 Cl 1 plate',TF:PT_TF,F:PTF,TC:PT_T,C:PT,tmax:'538 °C (1000 °F)',
  notes:['Upon prolonged exposure above 425 °C (800 °F) the carbide phase of carbon steel may convert to graphite: permissible, but not recommended for prolonged use above 425 °C.','A516 Gr 70: not to be used over 455 °C (850 °F). A537 Cl 1: not over 370 °C (700 °F). A350 LF6 Cl 1: not over 260 °C (500 °F).']},
 '2.1':{lbl:'2.1 · Type 304',mats:'A182 F304, F304H; A351 CF3, CF8; A240 304, 304H plate',TF:PT_TF2,F:{'150':[275,230,205,190,170,140,125,110,95,80,65,50,35,20,null,null,null,null,null,null,null,null,null,null],'300':[720,600,540,495,465,440,430,420,415,405,395,390,380,355,325,255,205,165,135,115,95,80,60,50],'400':[960,800,715,660,620,590,575,565,550,540,530,520,510,475,435,345,275,220,180,150,125,105,80,65],'600':[1440,1200,1075,990,925,885,860,845,825,810,790,780,765,715,650,515,410,330,265,225,185,160,125,95],'900':[2160,1800,1615,1485,1390,1325,1290,1265,1240,1215,1190,1165,1145,1070,975,770,615,495,400,340,280,235,185,145],'1500':[3600,3000,2690,2470,2315,2210,2150,2110,2065,2030,1980,1945,1910,1785,1630,1285,1030,825,670,565,465,395,310,245],'2500':[6000,5000,4480,4120,3860,3680,3580,3520,3440,3380,3300,3240,3180,2970,2715,2145,1715,1370,1115,945,770,655,515,400]},tmax:'816 °C (1500 °F); Class 150 to 538 °C (1000 °F)',
  notes:['At temperatures over 538 °C (1000 °F), use only when the carbon content is 0.04 % or higher.']},
 '2.2':{lbl:'2.2 · Type 316 / 317',mats:'A182 F316, F316H, F317; A351 CF3M, CF8M, CG8M; A240 316, 316H, 317 plate',TF:PT_TF2,F:{'150':[275,235,215,195,170,140,125,110,95,80,65,50,35,20,null,null,null,null,null,null,null,null,null,null],'300':[720,620,560,515,480,450,440,435,425,420,420,415,410,385,385,305,235,185,145,115,95,80,60,45],'400':[960,825,745,685,635,600,590,580,570,565,555,550,545,515,510,405,315,245,195,155,130,105,80,60],'600':[1440,1240,1120,1025,955,900,885,870,855,845,835,825,815,775,770,610,475,370,295,235,190,160,115,90],'900':[2160,1860,1680,1540,1435,1355,1325,1305,1280,1265,1255,1240,1225,1160,1150,915,710,555,440,350,290,235,175,135],'1500':[3600,3095,2795,2570,2390,2255,2210,2170,2135,2110,2090,2065,2040,1935,1920,1525,1185,925,735,585,480,395,290,225],'2500':[6000,5160,4660,4280,3980,3760,3680,3620,3560,3520,3480,3440,3400,3230,3200,2545,1970,1545,1230,970,800,655,485,370]},tmax:'816 °C (1500 °F); Class 150 to 538 °C (1000 °F)',
  notes:['At temperatures over 538 °C (1000 °F), use only when the carbon content is 0.04 % or higher.']}};
const PSI2BAR=0.0689476;
/* rating in bar(g) at T °C for a group: Group 1.1 uses the metric table, others interpolate the °F table */
function ptRate(grp,cls,T){const g=PTG[grp];if(g.C)return ptAt(cls,T);const F=T*9/5+32,t=g.TF,v=g.F[cls];if(!v||T<-29||F>t[t.length-1])return null;
 if(F<=t[0])return v[0]*PSI2BAR;for(let i=1;i<t.length;i++){if(F<=t[i]){if(v[i]==null||v[i-1]==null)return null;const f=(F-t[i-1])/(t[i]-t[i-1]);return (v[i-1]+f*(v[i]-v[i-1]))*PSI2BAR;}}return null;}

/* ASME B31.1 Table 121.5 suggested support spacing (std wall, straight pipe) */
const SPAN={nps:['1','2','3','4','6','8','12','16','20','24'],wft:[7,10,12,14,17,19,23,27,30,32],wm:[2.1,3.0,3.7,4.3,5.2,5.8,7.0,8.2,9.1,9.8],sft:[9,13,15,17,21,24,30,35,39,42],sm:[2.7,4.0,4.6,5.2,6.4,7.3,9.1,10.7,11.9,12.8]};

/* ============================== STATE & HELPERS ============================== */
const store={get(k,d){try{return localStorage.getItem('piperef_'+k)??d}catch(e){return d}},set(k,v){try{localStorage.setItem('piperef_'+k,v)}catch(e){}}};
document.documentElement.dataset.theme=store.get('theme','light');
let U=store.get('u','mm'), SEL=store.get('nps','2'), FLC=store.get('flc','150'), SWC='3000', PV=store.get('pv','wall'), GKC='150';
const $=s=>document.querySelector(s);
const NA='<span class="na">—</span>';
const ul=()=>U==='mm'?'mm':'in';
function L(inch,kind){if(inch==null||isNaN(inch))return NA;if(U==='mm'){const v=inch*25.4;return v.toFixed(kind==='w'?2:kind==='fit'?0:1);}return inch.toFixed(kind==='w'||kind==='od'?3:2);}
function wt(D,t){return U==='mm'?0.0246615*(D-t)*t*25.4*25.4:10.69*(D-t)*t;} /* kg/m or lb/ft, carbon steel */
function waterW(D,t){const id=D-2*t;return U==='mm'?Math.PI/4*Math.pow(id*0.0254,2)*1000:Math.PI/4*id*id/144*62.4;}
const wu=()=>U==='mm'?'kg/m':'lb/ft';
const npsLbl=n=>n+'″';
const rowCls=n=>n===SEL?' class="hi"':'';
function tbl(head,rows){return `<div class="tw"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;}
function tr(nps,cells){return `<tr data-nps="${nps}"${rowCls(nps)}><td>${npsLbl(nps)}</td>${cells.map(c=>`<td>${c}</td>`).join('')}</tr>`;}
function seg(id,opts,cur){return `<div class="seg" id="${id}">${opts.map(o=>{const[v,l]=Array.isArray(o)?o:[o,o];return `<button data-v="${v}" aria-pressed="${v===cur}">${l}</button>`}).join('')}</div>`;}
function bindSeg(id,fn){const el=document.getElementById(id);if(!el)return;el.addEventListener('click',e=>{const b=e.target.closest('button');if(b)fn(b.dataset.v);});}

/* ============================== TABS ============================== */
const TABS=[['home','Home'],['size','Size sheet'],['pipe','Pipe'],['flange','Flanges'],['fj','Flange joint'],['bw','Butt-weld fittings'],['sw','Socket weld & NPT'],['gasket','Gaskets'],['blind','Figure-8 & paddle'],['pt','P–T ratings'],['span','Support spans'],['sup','Pipe supports'],['spc','Pipe spacing'],['vdim','Valves'],['cv','Control valves'],['valve','Valve access'],['rack','Pipe rack'],['exp','Expansion loops'],['acc','Access & maintenance'],['shoe','Shoe spool length'],['eqck','Equipment data check'],['calc','Calculators'],['iso','Iso compare'],['contact','Contact us']];
const PAGE={"home": "index.html", "size": "size-sheet.html", "pipe": "pipe.html", "flange": "flanges.html", "fj": "flange-joint.html", "bw": "butt-weld-fittings.html", "sw": "socket-weld-npt.html", "gasket": "gaskets.html", "blind": "line-blinds.html", "pt": "pt-ratings.html", "span": "support-spans.html", "sup": "pipe-supports.html", "spc": "pipe-spacing.html", "vdim": "valves.html", "cv": "control-valves.html", "rack": "pipe-rack.html", "exp": "expansion-loop.html", "valve": "valve-access.html", "acc": "access-maintenance.html", "shoe": "shoe-spool-length.html", "eqck": "equipment-data-check.html", "calc": "calculators.html", "iso": "iso-compare.html", "contact": "contact.html"};
let TAB=document.body.dataset.page||'home';if(!TABS.some(t=>t[0]===TAB))TAB='home';
let PREV_TAB=null;
/* Sidebar groups: every tab appears exactly once */
const NAV_GROUPS=[['Overview',['home','size']],['Pipe',['pipe','span','sup','spc']],['Fittings & flanges',['flange','fj','pt','bw','sw','gasket','blind']],['Valves',['vdim','cv','valve']],['Layout & checks',['rack','exp','shoe','acc','eqck','calc','iso']]];
const TAB_STD={size:'All tables',pipe:'B36.10M / B36.19M',flange:'B16.5',pt:'B16.5 Gr 1.1 / 2.1 / 2.2',bw:'B16.9',sw:'B16.11 / B1.20.1',gasket:'B16.20',blind:'B16.48',span:'B31.1',sup:'MSS SP-58',spc:'B16.5 / B36.10M',vdim:'B16.10 / API 609',cv:'Vendor datasheets',rack:'Typical practice',exp:'B31.3 / guided cantilever',fj:'B16.5 / PCC-1',valve:'ASTM F1166',shoe:'B16.5',calc:'B31.3 / B16.5',eqck:'ASME VIII / API',acc:'OSHA / PIP',iso:'PDF / PCF',contact:''};
const TAB_LBL=Object.fromEntries(TABS);
function tabGroup(k){const g=NAV_GROUPS.find(g=>g[1].includes(k));return g?g[0]:'';}
function renderTabs(){
 const link=k=>`<a class="navbtn" href="${PAGE[k]}" data-t="${k}" aria-selected="${k===TAB}"${k===TAB?' aria-current="page"':''}>${(typeof TAB_ICON!=='undefined'&&TAB_ICON[k])||''}<span>${TAB_LBL[k]}</span></a>`;
 $('#tabs').innerHTML=NAV_GROUPS.map(([g,ks])=>`<div class="navgrp"><p class="navh">${g}</p>${ks.map(link).join('')}</div>`).join('');
 const sc=document.getElementById('sideContact');if(sc)sc.setAttribute('aria-current',TAB==='contact'?'page':'false');
 document.querySelectorAll('.panel').forEach(p=>{p.hidden=p.dataset.tab!==TAB;if(!p.hidden&&PREV_TAB&&PREV_TAB!==TAB){p.classList.remove('enter');void p.offsetWidth;p.classList.add('enter');}});
 document.querySelectorAll('.refs').forEach(r=>r.hidden=r.dataset.for!==TAB);
 PREV_TAB=TAB;if(TAB==='iso')loadIso();if(TAB==='cv'&&!window.__cvLoaded){window.__cvLoaded=1;import('./cv.js?v=20261115j').catch(()=>{const p=document.getElementById('p-cv');if(p)p.insertAdjacentHTML('beforeend','<p class="note">This page could not load in this browser.</p>');});}if(TAB==='contact'&&!window.__corrLoaded){window.__corrLoaded=1;import('./corr.js?v=20261115j').catch(()=>{});}if(TAB==='exp'&&!window.__expLoaded){window.__expLoaded=1;import('./exp.js?v=20261115j').catch(()=>{const p=document.getElementById('p-exp');if(p)p.insertAdjacentHTML('beforeend','<p class="note">This page could not load in this browser.</p>');});}if(TAB==='fj'&&!window.__fjLoaded){window.__fjLoaded=1;import('./fj.js?v=20261115j').catch(()=>{const p=document.getElementById('p-fj');if(p)p.insertAdjacentHTML('beforeend','<p class="note">This page could not load in this browser.</p>');});}if(TAB==='rack'&&!window.__rackLoaded){window.__rackLoaded=1;import('./rack.js?v=20261115j').catch(()=>{const p=document.getElementById('p-rack');if(p)p.insertAdjacentHTML('beforeend','<p class="note">This page could not load in this browser.</p>');});}if(TAB==='sup'&&!window.__supLoaded){window.__supLoaded=1;import('./supports.js?v=20261115j').catch(()=>{const p=document.getElementById('p-sup');if(p)p.innerHTML='<div class="phead"><div><h1>Pipe supports</h1><p>The 3D viewer could not load in this browser.</p></div></div>';});}if(typeof M3!=='undefined')M3.redrawAll();}
function loadIso(){const f=document.getElementById('isoFrame');if(!f||f.getAttribute('src'))return;f.src=f.dataset.src;}
$('#tabs').addEventListener('click',e=>{const a=e.target.closest('a[data-t]');if(!a)return;if(a.dataset.t===TAB){e.preventDefault();window.scrollTo({top:0});}});

/* ============================== SIZE SHEET ============================== */
let SZ_S=store.get('szs','STD'), SZ_C=FLC;
function kv(pairs){return `<dl class="kv">${pairs.map(([k,v,u])=>`<dt>${k}</dt><dd>${v}${u?`<u>${u}</u>`:''}</dd>`).join('')}</dl>`;}
function renderSize(){
 const p=PIPEMAP[SEL];const schs=SCH.filter(s=>p[2][s]!=null);if(!schs.includes(SZ_S))SZ_S=schs.includes('STD')?'STD':schs[0];
 const D=p[1],t=p[2][SZ_S],id=D-2*t;
 let h=`<div class="phead"><div><h1><span class="sr">Pipe size sheet: </span>NPS ${npsLbl(SEL)} &nbsp;/&nbsp; DN ${DN[SEL]}</h1><p>Everything for one line size on one sheet. Change the size in the header or here.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><select class="sel" id="szN">${PIPE.map(x=>`<option${x[0]===SEL?' selected':''}>${x[0]}</option>`).join('')}</select></label>
 <label class="ctrl"><span class="lbl">Schedule</span><select class="sel" id="szS">${schs.map(s=>`<option${s===SZ_S?' selected':''}>${s}</option>`).join('')}</select></label>
 <label class="ctrl"><span class="lbl">Flange class</span><select class="sel" id="szC">${CLASSES.map(c=>`<option${c===SZ_C?' selected':''}>${c}</option>`).join('')}</select></label></div></div><div class="sheets">`;
 const surf=U==='mm'?(Math.PI*D*0.0254).toFixed(3):(Math.PI*D/12).toFixed(3);
 const area=U==='mm'?(Math.PI/4*Math.pow(id*25.4,2)/100).toFixed(1):(Math.PI/4*id*id).toFixed(3);
 h+=`<div class="sh"><h3>Pipe <small>B36.10M / 19M · Sch ${SZ_S}</small></h3>${kv([
  ['Outside diameter',L(D,'od'),ul()],['Wall thickness',L(t,'w'),ul()],['Inside diameter',L(id,'od'),ul()],
  ['Weight, empty',wt(D,t).toFixed(2),wu()],['Weight, water-filled',(wt(D,t)+waterW(D,t)).toFixed(2),wu()],
  ['Flow area',area,U==='mm'?'cm²':'in²'],['Outside surface',surf,U==='mm'?'m²/m':'ft²/ft'],
  ['Wall less 12.5% mill tol.',L(t*0.875,'w'),ul()]])}</div>`;
 const f=flRow(SZ_C,SEL);
 h+=`<div class="sh"><h3>Flange <small>B16.5 · Class ${SZ_C} RF</small></h3>${f?kv([
  ['Flange OD (O)',L(f.O),ul()],['Thickness (tf)',L(f.tf),ul()],['Raised face Ø (R)',L(f.R),ul()],
  ['Bolt circle (BC)',L(f.BC),ul()],['Bolting',`${f.n} × ${f.d}″`,''],['Bolt hole Ø',L(f.dv+0.125),ul()],
  ['Hub Ø at base (X)',L(f.X),ul()],['WN length thru hub (Y)',L(f.Y),ul()],
  ['RF height',+SZ_C<=300?'1.6 incl.':'6.4 excl.',U==='mm'?'mm':'']]):'<p class="note" style="padding:0 12px 12px">Not listed in B16.5 for this class.</p>'}</div>`;
 const b=bwRow(SEL);
 h+=`<div class="sh"><h3>Butt-weld fittings <small>B16.9</small></h3>${b?kv([
  ['90° LR elbow (A)',L(b.lr90,'fit'),ul()],['45° LR elbow (B)',L(b.lr45,'fit'),ul()],['90° SR elbow',L(b.sr90,'fit'),ul()],
  ['90° 3D elbow',L(b.d390,'fit'),ul()],['180° LR return c-c (O)',L(b.r180O,'fit'),ul()],['Tee c-e (C)',L(b.tee,'fit'),ul()],...(b.teeM!==b.tee?[['Tee outlet (M)',L(b.teeM,'fit'),ul()]]:[]),
  ['Reducer length (H)',L(b.red,'fit'),ul()],['Cap length (E)',L(b.cap,'fit'),ul()]]):'<p class="note" style="padding:0 12px 12px">Size not covered by this table.</p>'}</div>`;
 const si=SWN.indexOf(SEL);
 if(si>=0){h+=`<div class="sh"><h3>Socket weld / NPT <small>B16.11 · B1.20.1</small></h3>${kv([
  ['Socket bore Ø (B)',`${L(SW.Bmin[si],'w')}–${L(SW.Bmax[si],'w')}`,ul()],['Socket depth min (J)',L(SW.J[si]),ul()],
  ['90°/tee ctr–socket, 3000',L(SW.A3000[si]),ul()],['90°/tee ctr–socket, 6000',L(SW.A6000[si]),ul()],
  ['45° ctr–socket, 3000',L(SW.C3000[si]),ul()],['Threads per inch',SW.tpi[si],'TPI'],['Hand-tight engagement L1',L(SW.L1[si],'w'),ul()],['Effective thread L2',L(SW.L2[si],'w'),ul()]])}</div>`;}
 const g=swg(SZ_C,SEL);
 if(g){h+=`<div class="sh"><h3>Spiral wound gasket <small>B16.20 · Cl ${SZ_C}</small></h3>${kv([
  ['Inner ring ID (d1)',gL(g.d1),ul()],['Winding ID / OD (d2 / d3)',`${gL(g.d2)} / ${gL(g.d3)}`,ul()],['Centering ring OD (d4)',gL(g.d4),ul()],
  ['Winding / ring thickness',U==='mm'?'4.45 / 2.97–3.33':'0.175 / 0.117–0.131',ul()],['Inner ring',swgInner(SZ_C,SEL)?'Required':'Required with PTFE filler','']])}</div>`;}
 const pi=SPAN.nps.indexOf(SEL);
 const ptr=[];for(const c of CLASSES)ptr.push([`Class ${c} @ 38 / 200 °C`,`${PT[c][0]} / ${PT[c][4]}`,'bar']);
 h+=`<div class="sh"><h3>Ratings & supports <small>B16.5 Group 1.1 only (A105 / WCB) · B31.1</small></h3>${kv([...ptr.slice(0,4),
  ...(pi>=0?[['Support span, water',U==='mm'?SPAN.wm[pi]:SPAN.wft[pi],U==='mm'?'m':'ft'],['Support span, steam/gas',U==='mm'?SPAN.sm[pi]:SPAN.sft[pi],U==='mm'?'m':'ft']]:[])])}</div>`;
 h+='</div>';
 $('#p-size').innerHTML=h;
 $('#szN').onchange=e=>setSel(e.target.value);
 $('#szS').onchange=e=>{SZ_S=e.target.value;store.set('szs',SZ_S);renderSize();};
 $('#szC').onchange=e=>{SZ_C=e.target.value;renderSize();};
}

/* ============================== PIPE ============================== */
/* Weight options for the Pipe tab. Steel weight per B36.10M formula; contents and insulation from user inputs.
   B31.3 301.6 / B31.1 121.2 say which loads count (contents, test fluid, insulation); densities come from the project. */
let PW=(()=>{try{return Object.assign({type:'empty',mat:'cs',sg:1.0,ssg:1.4,rho:10,insT:0,insR:130},JSON.parse(store.get('pw','{}')))}catch(e){return {type:'empty',mat:'cs',sg:1.0,ssg:1.4,rho:10,insT:0,insR:130};}})();
const savePW=()=>store.set('pw',JSON.stringify(PW));
const PW_TYPES=[['empty','Empty pipe'],['water','Water-filled (hydrotest)'],['liquid','Liquid (SG)'],['slurry','Slurry (SG)'],['gas','Gas / steam (density)']];
function pwDensity(){return PW.type==='water'?1000:PW.type==='liquid'?(+PW.sg||0)*1000:PW.type==='slurry'?(+PW.ssg||0)*1000:PW.type==='gas'?(+PW.rho||0):0;}
function pwKgm(D,t){/* D,t in inch -> kg/m */const Dm=D*0.0254,tm=t*0.0254,id=Dm-2*tm;
 const steel=0.0246615*(D-t)*t*25.4*25.4*(PW.mat==='ss'?1.015:1),cont=pwDensity()*Math.PI/4*id*id,
 T=(+PW.insT||0)/1000,ins=T>0?(+PW.insR||0)*Math.PI/4*((Dm+2*T)**2-Dm*Dm):0;return steel+cont+ins;}
function pwVal(D,t){const k=pwKgm(D,t);return U==='mm'?k:k*0.671969;}
/* ---------- Pipe cross-section viewer ---------- */
let PS=store.get('pss','STD'), PV_OPEN=store.get('pvopen','1')==='1';
/* Clickable dimensions for the pv drawings, same behaviour as the mp panels (Figure-8 etc.):
   PDG wraps one dimension's lines and label in a .dimg group and adds wide invisible hit lines;
   pvDimList is the matching list. ui.js links the two (click either one). */
function PDG(k,inner){const hits=[];inner.replace(/<line class="pv-dim[^"]*" x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"/g,(m,a,b,c,d)=>{hits.push(`<line class="hit" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`);return m;});
 inner.replace(/<polyline class="pv-ext pv-lead" points="([^"]+)"/g,(m,pts)=>{hits.push(`<polyline class="hit" points="${pts}"/>`);return m;});
 return `<g class="dimg" data-k="${k}" role="button" tabindex="-1" aria-label="Dimension ${k}">${inner}${hits.join('')}</g>`;}
function pvDimList(title,rows){return `<div class="mp-list pv-dims" role="group" aria-label="${title}"><div class="pv-lh">${title}<span>Click a dimension in the list or on the drawing</span></div>${rows.map(r=>`<button type="button" data-k="${r[0]}" aria-pressed="false"><b>${r[0]}</b><span>${r[1]}</span><i>${r[2]}</i></button>`).join('')}</div>`;}
function pipeViewer(){
 const p=PIPEMAP[SEL];const schs=SCH.filter(s=>p[2][s]!=null);
 if(!schs.includes(PS))PS=schs.includes('STD')?'STD':schs.includes('40')?'40':schs[0];
 const D=p[1],t=p[2][PS],id=D-2*t,mm=U==='mm';
 const same=schs.filter(s=>s!==PS&&p[2][s]===t);
 /* geometry */
 const cx=200,cy=190,R=128;let rIn=R*id/D;const exag=(R-rIn)<5;if(exag)rIn=R-5;
 const v=x=>L(x,'od'), vw=x=>L(x,'w');
 const ang=-3*Math.PI/4, rm=(R+rIn)/2;
 const wx=cx+rm*Math.cos(ang), wy=cy+rm*Math.sin(ang);
 const svg=`<svg class="pv-svg" viewBox="0 0 400 400" role="img" aria-label="Pipe cross-section NPS ${SEL} schedule ${PS}: OD ${v(D)} ${ul()}, wall ${vw(t)} ${ul()}, ID ${v(id)} ${ul()}">
 <defs>
  <linearGradient id="pvMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f5f6"/><stop offset=".35" stop-color="#b9bec2"/><stop offset=".55" stop-color="#e3e6e8"/><stop offset=".8" stop-color="#9ea4a9"/><stop offset="1" stop-color="#d4d8db"/></linearGradient>
  <linearGradient id="pvBevel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5d6368"/><stop offset=".3" stop-color="#f7f8f9"/><stop offset=".55" stop-color="#7c8287"/><stop offset=".8" stop-color="#eef0f1"/><stop offset="1" stop-color="#666c71"/></linearGradient>
  <radialGradient id="pvBore" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#2a3138"/><stop offset="1" stop-color="#0b0e11"/></radialGradient>
  <pattern id="pvHatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="9" stroke="#59606a" stroke-width="1.1" opacity=".55"/></pattern>
  <mask id="pvRing"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="${rIn}" fill="#000"/></mask>
  <marker id="pvArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
 </defs>
 <circle cx="${cx}" cy="${cy}" r="${R+3}" fill="none" class="pv-shadow"/>
 <g mask="url(#pvRing)"><rect x="0" y="0" width="400" height="400" fill="url(#pvMetal)"/><rect x="0" y="0" width="400" height="400" fill="url(#pvHatch)"/></g>
 <circle cx="${cx}" cy="${cy}" r="${R-.8}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".9"/>
 <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#4b5157" stroke-width="1"/>
 <circle cx="${cx}" cy="${cy}" r="${rIn}" fill="url(#pvBore)"/>
 <circle cx="${cx}" cy="${cy}" r="${rIn+Math.min(4,(R-rIn)/3)/2}" fill="none" stroke="url(#pvBevel)" stroke-width="${Math.min(4,(R-rIn)/3)}"/>
 <line class="pv-cl" x1="${cx-R-14}" y1="${cy}" x2="${cx+R+14}" y2="${cy}"/><line class="pv-cl" x1="${cx}" y1="${cy-R-14}" x2="${cx}" y2="${cy+R+14}"/>
 ${PDG('ID',`<line class="pv-dim pv-dimi" x1="${cx-rIn+2}" y1="${cy-22}" x2="${cx+rIn-2}" y2="${cy-22}" marker-start="url(#pvArr)" marker-end="url(#pvArr)"/>
 <text class="pv-ti" x="${cx}" y="${cy-30}" text-anchor="middle">ID ${v(id)}</text>`)}
 ${PDG('OD',`<line class="pv-ext" x1="${cx-R}" y1="${cy+6}" x2="${cx-R}" y2="${cy+R+34}"/><line class="pv-ext" x1="${cx+R}" y1="${cy+6}" x2="${cx+R}" y2="${cy+R+34}"/>
 <line class="pv-dim" x1="${cx-R}" y1="${cy+R+28}" x2="${cx+R}" y2="${cy+R+28}" marker-start="url(#pvArr)" marker-end="url(#pvArr)"/>
 <rect class="pv-lblbg" x="${cx-62}" y="${cy+R+19}" width="124" height="18" rx="3"/>
 <text class="pv-t" x="${cx}" y="${cy+R+32}" text-anchor="middle">OD ${v(D)} ${ul()}</text>`)}
 ${PDG('T',`<circle cx="${wx}" cy="${wy}" r="2.6" class="pv-dot"/>
 <polyline class="pv-ext pv-lead" points="${wx},${wy} ${cx-R*0.78},${cy-R-16} ${cx-R*0.78-60},${cy-R-16}"/>
 <rect class="pv-lblbg" x="${cx-R*0.78-62}" y="${cy-R-35}" width="${(vw(t)+' '+ul()).length*7.8+26}" height="18" rx="3"/>
 <text class="pv-t" x="${cx-R*0.78-60}" y="${cy-R-21}">T ${vw(t)} ${ul()}</text>`)}
 ${exag?`<text class="pv-tm" x="388" y="16" text-anchor="end">wall drawn thicker than scale for clarity</text>`:`<text class="pv-tm" x="388" y="16" text-anchor="end">drawn to scale · NPS ${SEL}″ Sch ${PS}</text>`}
 </svg>`;
 const area=mm?Math.PI/4*Math.pow(id*25.4,2)/100:Math.PI/4*id*id;
 const vol=mm?Math.PI/4*Math.pow(id*0.0254,2)*1000:Math.PI/4*id*id/144*7.4805;
 const surf=mm?Math.PI*D*0.0254:Math.PI*D/12;
 const st=(k,val,u,cls)=>`<div class="pv-stat ${cls||''}"><span>${k}</span><b>${val}<u>${u}</u></b></div>`;
 const card=`<div class="pv-data">
  ${pvDimList(`Dimensions · NPS ${SEL}″ Sch ${PS}`,[['OD','Outside diameter',`${v(D)} ${ul()}`],['T',`Wall thickness, Sch ${PS}`,`${vw(t)} ${ul()}`],['ID','Inside diameter, OD − 2T',`${v(id)} ${ul()}`]])}
  ${kv([['DN / NPS',`DN ${DN[SEL]} · ${SEL}″`,''],['Schedule',PS+(same.length?` <span class="pv-eq">= ${same.join(', ')}</span>`:''),''],
   ['Weight, empty (CS)',wt(D,t).toFixed(2),wu()],['Weight, water-filled',(wt(D,t)+waterW(D,t)).toFixed(2),wu()],
   ['Flow area',area.toFixed(mm?1:3),mm?'cm²':'in²'],['Internal volume',vol.toFixed(mm?2:3),mm?'L/m':'gal/ft'],
   ['Outside surface',surf.toFixed(3),mm?'m²/m':'ft²/ft'],['Wall less 12.5% mill tol.',L(t*0.875,'w'),ul()],['D / t ratio',(D/t).toFixed(1),'']])}
 </div>`;
 const chips=`<div class="pv-chips" role="group" aria-label="Schedule">${schs.map(s=>`<button data-ps="${s}" aria-pressed="${s===PS}"><b>${s}</b><small>${vw(p[2][s])}</small></button>`).join('')}</div>`;
 const i=PIPE.findIndex(x=>x[0]===SEL);
 return `<div class="phead"><div><h1>Pipe dimensions & weights</h1><p>Pick a size and schedule; the section and values update instantly. ASME B36.10M / B36.19M, all lengths in ${ul()}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><span class="pv-step"><button class="pv-nav" data-d="-1" aria-label="Smaller size" ${i<=0?'disabled':''}>‹</button><select class="sel" id="pvN">${PIPE.map(x=>`<option value="${x[0]}"${x[0]===SEL?' selected':''}>${x[0]}″ · DN ${DN[x[0]]}</option>`).join('')}</select><button class="pv-nav" data-d="1" aria-label="Larger size" ${i>=PIPE.length-1?'disabled':''}>›</button></span></label>
 <label class="ctrl"><span class="lbl">Schedule</span><select class="sel" id="pvS">${schs.map(s=>`<option${s===PS?' selected':''}>${s}</option>`).join('')}</select></label></div></div>
 <div class="pv-grid"><div class="pv-fig">${svg}${chips}</div>${card}</div>`;
}
function bindPipeViewer(){
 const P=$('#p-pipe');
 $('#pvN').onchange=e=>setSel(e.target.value);
 $('#pvS').onchange=e=>{PS=e.target.value;store.set('pss',PS);renderPipe();};
 P.querySelectorAll('.pv-chips button').forEach(b=>b.onclick=()=>{PS=b.dataset.ps;store.set('pss',PS);renderPipe();});
 P.querySelectorAll('.pv-nav').forEach(b=>b.onclick=()=>{const i=PIPE.findIndex(x=>x[0]===SEL)+ +b.dataset.d;if(PIPE[i])setSel(PIPE[i][0]);});
 const d=P.querySelector('details.pv-all');if(d)d.addEventListener('toggle',()=>{PV_OPEN=d.open;store.set('pvopen',d.open?'1':'0');});
}
function renderPipe(){
 const cols=SCH.filter(s=>PIPE.some(p=>p[2][s]!=null)),isW=PV==='kg';
 const wlabel=PW_TYPES.find(x=>x[0]===PW.type)[1];
 const unitTxt=isW?wu():ul();
 const head=['NPS','DN',`OD<small>${ul()}</small>`,...cols.map(s=>`${s}<small>${unitTxt}</small>`)];
 const rows=PIPE.map(([n,D,w])=>tr(n,[`<span class="dn">${DN[n]}</span>`,L(D,'od'),...cols.map(s=>{const t=w[s];if(t==null)return NA;if(PV==='wall')return L(t,'w');if(PV==='id')return L(D-2*t,'od');return pwVal(D,t).toFixed(2);})]));
 const inp=(k,lbl,step)=>`<label>${lbl}<input class="inp" data-pw="${k}" type="number" step="${step}" min="0" value="${PW[k]}"></label>`;
 const wctl=isW?`<div class="calc" style="margin-bottom:12px"><h3>Weight shown: ${wlabel}</h3>
   <div class="ctrls" style="gap:12px 18px">${seg('pwt',PW_TYPES,PW.type)}${seg('pwm',[['cs','Carbon steel'],['ss','Stainless']],PW.mat)}</div>
   <div class="fg">${PW.type==='liquid'?inp('sg','Liquid SG (process datasheet)','0.01'):''}${PW.type==='slurry'?inp('ssg','Slurry SG (process datasheet)','0.01'):''}${PW.type==='gas'?inp('rho','Gas / steam density, kg/m³ (at operating P & T)','0.1'):''}
    ${inp('insT','Insulation thickness, mm (0 = none)','5')}${+PW.insT>0?inp('insR','Insulation density, kg/m³ (insulation spec)','5'):''}</div>
   <p style="margin:0">Each cell = steel${PW.type!=='empty'?` + contents (${f2(pwDensity(),pwDensity()<100?1:0)} kg/m³ × bore area)`:''}${+PW.insT>0?` + insulation (${PW.insT} mm at ${PW.insR} kg/m³)`:''}, per metre of straight pipe, in ${wu()}.${PW.type==='gas'?' Gas or steam lines are often supported for the water-filled (hydrotest) case unless pneumatically tested: check that case too.':''}</p></div>`:'';
 $('#p-pipe').innerHTML=pipeViewer()+`<details class="pv-all"${PV_OPEN?' open':''}><summary>All sizes &amp; schedules table</summary><div class="phead" style="margin-top:10px"><div><p>Full B36.10M / B36.19M table. Tap a row to select that size.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Show</span>${seg('pv',[['wall','Wall'],['id','Bore (ID)'],['kg','Weight']],PV)}</label></div></div>
 ${wctl}${tbl(head,rows)}
 <p class="note"><b>Notes.</b> NPS ½–48 per ASME B36.10M. For NPS 38–48 only STD (9.53 mm) and XS (12.70 mm) carry a schedule designation; B36.10M lists further walls for these sizes by thickness only. For NPS ≤ 12, Sch 40S = STD and Sch 80S = XS. Sch 5S/10S are B36.19M stainless walls. Wall tolerance on seamless pipe is −12.5%.${isW?` Steel weight: <span class="mono">kg/m = 0.0246615 × (OD − t) × t</span> (B36.10M, carbon steel 7850 kg/m³; × 1.015 for stainless). Contents: <span class="mono">density × π/4 × ID²</span>. Insulation: <span class="mono">density × π/4 × ((OD + 2T)² − OD²)</span>; cladding, valves, flanges and fittings are not included. ASME B31.3 para. 301.6 and B31.1 para. 121.2 require the weight of contents, test fluid and insulation to be considered; densities come from your process datasheet and insulation specification.`:''}</p>
 ${isW?`<div class="eq-custom" style="margin-top:12px"><b>Preliminary values until confirmed by stress analysis.</b> These weights are for straight pipe per metre only, for early layout and support checks. Final support loads, including valves, flanges, fittings, concentrated loads, test and occasional cases, must be confirmed by the pipe stress engineer.</div>`:''}</details>`;
 bindPipeViewer();
 bindSeg('pv',v=>{PV=v;store.set('pv',v);renderPipe();});
 if(isW){bindSeg('pwt',v=>{PW.type=v;savePW();renderPipe();});bindSeg('pwm',v=>{PW.mat=v;savePW();renderPipe();});
  $('#p-pipe').querySelectorAll('[data-pw]').forEach(el=>el.addEventListener('change',()=>{const v=parseFloat(el.value);PW[el.dataset.pw]=isFinite(v)&&v>=0?v:0;savePW();renderPipe();}));}
}

/* ============================== FLANGES ============================== */
function flangeSVG(){return `<svg viewBox="0 0 340 220" role="img" aria-label="Weld neck flange half section with dimension labels">
 <line class="s-cl" x1="20" y1="185" x2="330" y2="185"/>
 <polygon class="s-fill" points="40,145 40,112 48,112 48,22 84,22 84,96 180,128 214,128 214,145"/>
 <rect x="49" y="40" width="34" height="16" fill="var(--sheet)" stroke="none"/>
 <line class="s-ink" x1="48" y1="40" x2="84" y2="40" stroke-width="1"/><line class="s-ink" x1="48" y1="56" x2="84" y2="56" stroke-width="1"/>
 <line class="s-cl" x1="34" y1="48" x2="96" y2="48"/>
 <line class="s-dim" x1="18" y1="22" x2="18" y2="185"/><text class="t-dim" x="22" y="100">½O</text>
 <line class="s-dim" x1="104" y1="48" x2="104" y2="185"/><text class="t-dim" x="108" y="78">½BC</text>
 <line class="s-dim" x1="30" y1="112" x2="30" y2="185"/><text class="t-dim" x="28" y="207" text-anchor="middle">½R</text>
 <line class="s-dim" x1="140" y1="114" x2="140" y2="185"/><text class="t-dim" x="144" y="170">½X</text>
 <line class="s-dim" x1="48" y1="12" x2="84" y2="12"/><text class="t-dim" x="66" y="9" text-anchor="middle">tf</text>
 <line class="s-dim" x1="40" y1="200" x2="214" y2="200"/><text class="t-dim" x="150" y="214" text-anchor="middle">Y (length thru hub)</text>
 <line class="s-ink" x1="40" y1="186" x2="40" y2="204" stroke-width=".6"/><line class="s-ink" x1="214" y1="146" x2="214" y2="204" stroke-width=".6"/>
 <text class="t-dim" x="226" y="140">weld bevel</text></svg>`;}
/* ---------- Flange face viewer ---------- */
let FV_OPEN=store.get('fvopen','1')==='1', FL3D=false;
/* Half-section elevation of a B16.5 flange, drawn to scale: upper half cut (hatched), lower half outside view.
   Face (raised face) on the left, pipe to the right. Every dimension is a clickable PDG group whose key matches the list. */
function flangeSection(type,cls,N,r,p,bs){
 const LJ=type==='lj',TH=type==='th';
 const rf=LJ?0:+cls<=300?1/16:0.25, inT=+cls<=300;      /* raised face height; included in tf and Y for 150/300. Lap-joint flanges have a flat face */
 const O=r.O,R=r.R,BC=r.BC,X=r.X,tf=r.tf,hd=r.dv+0.125,A=p[1],ID=p[1]-2*p[2][bs];
 const lt=LJ?Math.max((A-ID)/2,.12):0, rc=LJ?r.rc:0;   /* stub-end lap thickness (≈ pipe wall), bore corner radius */
 const xb=inT?tf:rf+tf;                                   /* back face of flange, from the RF face */
 const Yv=type==='wn'?r.Y:type==='bl'?tf:r.Yso, xe=type==='bl'?xb:(inT?Yv:rf+Yv);  /* hub end */
 const B=type==='so'||type==='sw'||LJ?r.B:TH?A:ID;       /* bore at the hub end (threaded: thread major Ø ≈ pipe OD) */
 const D=type==='sw'?r.D:0, gap=1/16, xs=xe-D;            /* socket bottom */
 const stub=type==='bl'?0:Math.max(O*.22,A*.6,1.2);
 const VW=480,VH=410,ml=96,mr=type==='bl'?40:(type==='sw'?118:96),mt=type==='sw'?104:(type==='bl'?52:78),mb=50;
 const k=Math.min((VW-ml-mr)/(xe+stub+lt),(VH-mt-mb)/O);
 const x0=ml+lt*k+((VW-ml-mr)-(xe+stub+lt)*k)/2, cy=mt+((VH-mt-mb)-O*k)/2+O/2*k;
 const Xp=x=>+(x0+x*k).toFixed(2), Yp=y=>+(cy-y*k).toFixed(2);
 const v=x=>L(x),u=ul();
 /* profile of the upper half (y >= 0), traced from the RF face at the bore round to the hub end */
 const ribs=[];const P=(x,y)=>ribs.push([x,y]);
 const borePt=type==='bl'?0:(type==='sw'?ID/2:B/2);
 if(type==='bl'){P(0,0);P(0,R/2);P(rf,R/2);P(rf,O/2);P(xb,O/2);P(xb,0);}
 else if(LJ){P(0,B/2+rc);P(0,O/2);P(xb,O/2);P(xb,X/2);P(xe,X/2*.985);P(xe,B/2);P(rc,B/2);
  for(let a=1;a<6;a++){const t_=-Math.PI/2-a*Math.PI/12;P(rc+rc*Math.cos(t_),B/2+rc+rc*Math.sin(t_));}}
 else{
  P(0,borePt);P(0,R/2);P(rf,R/2);P(rf,O/2);P(xb,O/2);P(xb,X/2);
  if(type==='wn'){const xt=xe-Math.min((xe-xb)*.18,A*.25);P(xt,A/2);P(xe,A/2);}
  else P(xe,X/2*.985);
  if(type==='sw'){P(xe,B/2);P(xs,B/2);P(xs,ID/2);}else P(xe,B/2);
 }
 const poly=(pts,sy=1)=>pts.map(([x,y])=>`${Xp(x)},${Yp(sy*y)}`).join(' ');
 /* bolt hole: cut out of the section at the bolt circle */
 const hy0=BC/2-hd/2, hy1=BC/2+hd/2;
 const holeCut=`<rect x="${Xp(rf)}" y="${Yp(hy1)}" width="${((xb-rf)*k).toFixed(2)}" height="${(hd*k).toFixed(2)}" fill="var(--fs-bg)"/>`;
 /* pipe */
 let pipe='';const t=(A-ID)/2;
 if(type==='wn')pipe=`<rect class="fs-pipe" x="${Xp(xe)}" y="${Yp(A/2)}" width="${(stub*k).toFixed(2)}" height="${(A*k).toFixed(2)}"/><rect class="fs-pipein" x="${Xp(xe)}" y="${Yp(ID/2)}" width="${(stub*k).toFixed(2)}" height="${(ID*k).toFixed(2)}"/>`;
 if(type==='so'){const xp=Math.min(t+0.06,xb*.5);pipe=`<rect class="fs-pipe" x="${Xp(xp)}" y="${Yp(A/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(A*k).toFixed(2)}"/><rect class="fs-pipein" x="${Xp(xp)}" y="${Yp(ID/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(ID*k).toFixed(2)}"/>`;}
 if(type==='sw'){const xp=xs+gap;pipe=`<rect class="fs-pipe" x="${Xp(xp)}" y="${Yp(A/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(A*k).toFixed(2)}"/><rect class="fs-pipein" x="${Xp(xp)}" y="${Yp(ID/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(ID*k).toFixed(2)}"/>`;}
 if(TH){const xp=Math.max(xe-r.T,0);pipe=`<rect class="fs-pipe" x="${Xp(xp)}" y="${Yp(A/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(A*k).toFixed(2)}"/><rect class="fs-pipein" x="${Xp(xp)}" y="${Yp(ID/2)}" width="${((xe+stub-xp)*k).toFixed(2)}" height="${(ID*k).toFixed(2)}"/>`;}
 if(LJ)pipe=`<rect class="fs-pipe" x="${Xp(0)}" y="${Yp(A/2)}" width="${((xe+stub)*k).toFixed(2)}" height="${(A*k).toFixed(2)}"/><rect class="fs-pipe fs-lap" x="${Xp(-lt)}" y="${Yp(R/2)}" width="${(lt*k).toFixed(2)}" height="${(R*k).toFixed(2)}"/><rect class="fs-pipein" x="${Xp(-lt)}" y="${Yp(ID/2)}" width="${((xe+stub+lt)*k).toFixed(2)}" height="${(ID*k).toFixed(2)}"/>`;
 const brk=type==='bl'?'':`<path class="fs-brk" d="M${Xp(xe+stub)} ${Yp(A/2)+2} q6 ${(A/4*k).toFixed(1)} 0 ${(A/2*k).toFixed(1)} t0 ${(A/2*k).toFixed(1)}"/>`;
 /* welds */
 let weld='';const wl=Math.max(t*1.1,0.12)*k;
 if(type==='wn')weld=`<path class="fs-weld" d="M${Xp(xe)-wl*.6} ${Yp(A/2)} L${Xp(xe)} ${Yp(A/2)-wl*.7} L${Xp(xe)+wl*.6} ${Yp(A/2)} Z"/><path class="fs-weld" d="M${Xp(xe)-wl*.6} ${Yp(-A/2)} L${Xp(xe)} ${Yp(-A/2)+wl*.7} L${Xp(xe)+wl*.6} ${Yp(-A/2)} Z"/>`;
 if(type==='so'||type==='sw'){const fw=Math.max(t*1.2,.1)*k;weld=[1,-1].map(sg=>`<path class="fs-weld" d="M${Xp(xe)} ${Yp(sg*X/2*.985)} L${Xp(xe)} ${Yp(sg*A/2)} L${Xp(xe)+fw} ${Yp(sg*A/2)} Z"/>`).join('');
  if(type==='so'){const xp=Math.min(t+0.06,xb*.5),iw=Math.max(t,.08)*k;weld+=`<path class="fs-weld" d="M${Xp(0)} ${Yp(B/2)} L${Xp(xp)} ${Yp(B/2)} L${Xp(xp)} ${Yp(B/2)+iw*.9} Z"/>`;}}
 if(LJ){const xw=xe+stub*.55;weld=[1,-1].map(sg=>`<path class="fs-weld" d="M${Xp(xw)-wl*.6} ${Yp(sg*A/2)} L${Xp(xw)} ${Yp(sg*A/2)-sg*wl*.7} L${Xp(xw)+wl*.6} ${Yp(sg*A/2)} Z"/>`).join('');}
 let thd='';if(TH){const x1=Math.max(xe-r.T,0),n_=Math.max(6,Math.round((xe-x1)*k/5)),dx=(xe-x1)/n_,h_=Math.min(.06,A*.02);
  let d_=`M${Xp(x1)} ${Yp(A/2)}`;for(let i=0;i<n_;i++)d_+=` L${Xp(x1+dx*(i+.5))} ${Yp(A/2+h_)} L${Xp(x1+dx*(i+1))} ${Yp(A/2)}`;thd=`<path class="fs-thd" d="${d_}"/>`;}
 /* section (upper) and outside view (lower) */
 const section=`<polygon class="fs-cut" points="${poly(ribs)}"/>`;
 /* outside view: silhouette from the face round the outside to the hub end, bore hidden */
 const out=type==='bl'?[[0,0],[0,R/2],[rf,R/2],[rf,O/2],[xb,O/2],[xb,0]]:LJ?[[0,0],[0,O/2],[xb,O/2],[xb,X/2],[xe,X/2*.985],[xe,0]]:[[0,borePt*0],[0,R/2],[rf,R/2],[rf,O/2],[xb,O/2],[xb,X/2],...(type==='wn'?[[xe-Math.min((xe-xb)*.18,A*.25),A/2],[xe,A/2]]:[[xe,X/2*.985]]),[xe,0]];
 const outside=`<polygon class="fs-out" points="${poly(out,-1)}"/>`;
 const hidden=type==='bl'?'':`<line class="fs-hid" x1="${Xp(type==='sw'?xs:0)}" y1="${Yp(-B/2)}" x2="${Xp(xe)}" y2="${Yp(-B/2)}"/>`+(type==='sw'?`<line class="fs-hid" x1="${Xp(0)}" y1="${Yp(-ID/2)}" x2="${Xp(xs)}" y2="${Yp(-ID/2)}"/><line class="fs-hid" x1="${Xp(xs)}" y1="${Yp(-ID/2)}" x2="${Xp(xs)}" y2="${Yp(-B/2)}"/>`:'')+(type==='wn'?'':'');
 const holeHid=`<line class="fs-hid" x1="${Xp(rf)}" y1="${Yp(-hy0)}" x2="${Xp(xb)}" y2="${Yp(-hy0)}"/><line class="fs-hid" x1="${Xp(rf)}" y1="${Yp(-hy1)}" x2="${Xp(xb)}" y2="${Yp(-hy1)}"/>`;
 const cls_=`<line class="s-cl fs-cl" x1="${Xp(-lt)-14}" y1="${Yp(0)}" x2="${Xp(xe+stub)+10}" y2="${Yp(0)}"/>`+[1,-1].map(sg=>`<line class="s-cl fs-cl" x1="${Xp(rf)-8}" y1="${Yp(sg*BC/2)}" x2="${Xp(xb)+8}" y2="${Yp(sg*BC/2)}"/>`).join('');
 /* ---- dimension helpers (px) ---- */
 const tw=s=>String(s).length*6.9+10;
 const hlab=(x,y,s)=>`<rect class="pv-lblbg" x="${(x-tw(s)/2).toFixed(1)}" y="${(y-12).toFixed(1)}" width="${tw(s).toFixed(1)}" height="17" rx="3"/><text class="pv-t" x="${x.toFixed(1)}" y="${(y+1).toFixed(1)}" text-anchor="middle">${s}</text>`;
 const vlab=(x,y,s)=>`<g transform="rotate(-90 ${x.toFixed(1)} ${y.toFixed(1)})">${hlab(x,y+4.5,s)}</g>`;
 const H=(key,xa,xb_,yy,lab,yFrom)=>{const span=Xp(xb_)-Xp(xa),w=tw(lab),out=w>span-6||type==='sw',lx=out?Xp(xa)-w/2-8:(Xp(xa)+Xp(xb_))/2,ly=out?yy+5:yy-6;
  return PDG(key,`<line class="pv-ext" x1="${Xp(xa)}" y1="${yFrom[0]}" x2="${Xp(xa)}" y2="${yy-5}"/><line class="pv-ext" x1="${Xp(xb_)}" y1="${yFrom[1]}" x2="${Xp(xb_)}" y2="${yy-5}"/><line class="pv-dim" x1="${Xp(xa)}" y1="${yy}" x2="${Xp(xb_)}" y2="${yy}" marker-start="url(#fsA)" marker-end="url(#fsA)"/>${out?`<line class="pv-ext" x1="${Xp(xa)-8}" y1="${yy}" x2="${Xp(xa)}" y2="${yy}"/>`:''}${hlab(lx,ly,lab)}`);};
 const Vd=(key,ya,yb_,xx,lab,xFrom)=>PDG(key,`<line class="pv-ext" x1="${xFrom}" y1="${Yp(ya)}" x2="${xx+(xx<xFrom?-5:5)}" y2="${Yp(ya)}"/><line class="pv-ext" x1="${xFrom}" y1="${Yp(yb_)}" x2="${xx+(xx<xFrom?-5:5)}" y2="${Yp(yb_)}"/><line class="pv-dim" x1="${xx}" y1="${Yp(ya)}" x2="${xx}" y2="${Yp(yb_)}" marker-start="url(#fsA)" marker-end="url(#fsA)"/>${vlab(xx,(Yp(ya)+Yp(yb_))/2,lab)}`);
 const lead=(key,px,py,tx,ty,lab,anchor='start')=>{const w=tw(lab),bx=anchor==='end'?tx-w+2:tx-4;return PDG(key,`<circle cx="${px}" cy="${py}" r="2.4" class="pv-dot"/><polyline class="pv-ext pv-lead" points="${px},${py} ${tx},${ty+4} ${anchor==='end'?tx+6:tx-6},${ty+4}"/><rect class="pv-lblbg" x="${bx.toFixed(1)}" y="${(ty-8).toFixed(1)}" width="${w.toFixed(1)}" height="17" rx="3"/><text class="pv-t" x="${anchor==='end'?tx:tx+1}" y="${ty+5}" text-anchor="${anchor}">${lab}</text>`);};
 /* ---- dimensions ---- */
 let dims='';
 const yTop=Yp(O/2);
 /* left: O, BC, R (diameters, full height) */
 const xL=Xp(-lt);
 dims+=Vd('O',O/2,-O/2,xL-64,`O ${v(O)}`,Xp(rf)-3);
 dims+=Vd('BC',BC/2,-BC/2,xL-42,`BC ${v(BC)}`,Xp(rf)-3);
 if(!LJ)dims+=Vd('R',R/2,-R/2,xL-20,`R ${v(R)}`,Xp(0)-3);
 /* top: tf, Y (and socket items) */
 const fromFace=inT?0:rf;
 const tfY=yTop-16;
 dims+=H('tf',fromFace,xb,tfY,`tf ${v(tf)}`,[Yp(R/2)-3,yTop-3]);
 if(type!=='bl'){const yY=tfY-22;dims+=H('Y',fromFace,xe,yY,`Y ${v(Yv)}`,[Yp(R/2)-3,Yp(type==='wn'?A/2:X/2)-3]);
  if(type==='sw'){const yD=yY-22;dims+=H('D',xs,xe,yD,`D ${v(D)}`,[Yp(B/2)-3,Yp(X/2)-3]);
   const yE=yD-22;dims+=H('E',fromFace,xs+gap,yE,`E ${v(xs+gap-fromFace)}`,[Yp(R/2)-3,Yp(A/2)-3]);}
  if(TH){const yT=yY-22;dims+=H('T',Math.max(xe-r.T,0),xe,yT,`T ${v(r.T)}`,[Yp(A/2)-3,Yp(X/2)-3]);}}
 /* right: X, A (WN), bore */
 if(type!=='bl'){const xr=Xp(xe+stub);
  dims+=Vd('X',X/2,-X/2,xr+22,`X ${v(X)}`,Xp(xb)+3);
  if(type==='wn')dims+=Vd('A',A/2,-A/2,xr+44,`A ${v(A)}`,Xp(xe)+3);
  if(type==='wn')dims+=Vd('Bore',ID/2,-ID/2,xr+66,`Bore ${v(ID)}`,Xp(xe)+3);
  if(type==='so'||LJ)dims+=Vd('B',B/2,-B/2,xr+44,`B ${v(B)}`,Xp(xe)+3);
  if(TH)dims+=Vd('A',A/2,-A/2,xr+44,`A ${v(A)}`,Xp(xe)+3);
  if(type==='sw'){dims+=Vd('B',B/2,-B/2,xr+44,`B ${v(B)}`,Xp(xe)+3);dims+=Vd('B2',ID/2,-ID/2,xr+66,`B2 ${v(ID)}`,Xp(xs)+3);}}
 /* leaders: bolt holes, RF height, bevel, gap */
 dims+=lead('Holes',Xp((rf+xb)/2),Yp(BC/2),Xp(xb)+16,Yp((O/2+BC/2)/2)-2,`${r.n} × Ø${v(hd)}`);
 if(!LJ)dims+=lead('h',Xp(rf/2),Yp(-R/2*.8),Xp(0)-8,Yp(-O/2)+16,`h ${v(rf)}`,'end');
 if(LJ)dims+=lead('r',Xp(rc*.3),Yp(B/2+rc*.3),Xp(xe)+16,Yp(A/2)-24,`r ${v(rc)}`);
 if(LJ)dims+=`<text class="pv-tm" x="${Xp(xe)+6}" y="${Yp(-A/2)+16}">stub end</text>`;
 if(TH)dims+=lead('Thd',Xp(xe-r.T*.4),Yp(A/2),Xp(xe)+16,Yp(A/2)-24,'NPT · B1.20.1');
 if(type==='wn')dims+=lead('Bev',Xp(xe)-1,Yp(A/2)+2,Xp(xe)+18,Yp(A/2)-20,'37.5° bevel');
 if(type==='sw')dims+=lead('G',Xp(xs+gap/2),Yp((ID/2+B/2)/2),Xp(xe)+16,Yp(A/2)-20,`G ${U==='mm'?'1.6':'0.06'}`);
 const title=`${FLTYPES.find(x=>x[0]===type)[1]} · Class ${cls} · NPS ${N}″ · half section, drawn to scale`;
 return `<svg class="pv-svg fs" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="ASME B16.5 ${title}; click a dimension">
 <defs>
  <pattern id="fsHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="fs-hbg"/><line x1="0" y1="0" x2="0" y2="6" class="fs-hl"/></pattern>
  <linearGradient id="fsMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D3DA"/><stop offset=".35" stop-color="#EEF2F5"/><stop offset=".7" stop-color="#AAB6BF"/><stop offset="1" stop-color="#8795A0"/></linearGradient>
  <linearGradient id="fsPipe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDE4E9"/><stop offset=".5" stop-color="#F5F7F9"/><stop offset="1" stop-color="#BAC5CD"/></linearGradient>
  <marker id="fsA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
 </defs>
 ${pipe}${outside}${section}${holeCut}${thd}${hidden}${holeHid}${weld}${brk}${cls_}
 ${dims}
 <text class="pv-tm" x="10" y="${VH-6}">${title}</text>
 </svg>`;
}

function flDimRows(type,cls,N,rt,p,bs){const v=x=>L(x),u=ul(),inT=+cls<=300,rf=inT?1/16:.25,ID=p[1]-2*p[2][bs],hd=rt.dv+.125,gap=1/16;
 const rows=[['O','Flange outside diameter',`${v(rt.O)} ${u}`],...(type==='lj'?[]:[['R','Raised face diameter',`${v(rt.R)} ${u}`],['h',`Raised face height (${inT?'included in tf and Y':'not included in tf and Y'})`,`${v(rf)} ${u}`]]),
  ['BC','Bolt circle diameter',`${v(rt.BC)} ${u}`],['Holes','Bolt holes, number × Ø',`${rt.n} × ${v(hd)} ${u}`],['tf',type==='bl'?'Blind thickness':'Flange thickness',`${v(rt.tf)} ${u}`]];
 if(type==='wn')rows.push(['Y','Face to weld end (length through hub)',`${v(rt.Y)} ${u}`],['X','Hub Ø at base',`${v(rt.X)} ${u}`],['A','Hub Ø at weld bevel (= pipe OD)',`${v(p[1])} ${u}`],['Bore',`Bore = pipe ID, Sch ${bs}`,`${v(ID)} ${u}`],['Bev','Weld bevel (B16.25)','37.5° ± 2.5°']);
 if(type==='so')rows.push(['Y','Face to back of hub (length through hub)',`${v(rt.Yso)} ${u}`],['X','Hub Ø',`${v(rt.X)} ${u}`],['B','Bore, slip-on (min.)',`${v(rt.B)} ${u}`]);
 if(type==='sw')rows.push(['Y','Face to back of hub (length through hub)',`${v(rt.Yso)} ${u}`],['X','Hub Ø',`${v(rt.X)} ${u}`],['B','Socket bore (min.)',`${v(rt.B)} ${u}`],['D','Socket depth',`${v(rt.D)} ${u}`],
  ['B2',`Bore below socket = pipe ID, Sch ${bs}`,`${v(ID)} ${u}`],['G','Gap at socket bottom before welding',`${v(gap)} ${u}`],['E','Face to pipe end (Y − D + G)',`${v(rt.Yso-rt.D+gap)} ${u}`]);
 if(type==='th')rows.push(['Y','Face to back of hub (length through hub)',`${v(rt.Yso)} ${u}`],['X','Hub Ø',`${v(rt.X)} ${u}`],['T','Thread length (min.)',`${v(rt.T)} ${u}`],['A','Thread size = pipe OD',`${v(p[1])} ${u}`],['Thd','Thread form','NPT, ASME B1.20.1']);
 if(type==='lj')rows.push(['Y','Face to back of hub (length through hub)',`${v(rt.Yso)} ${u}`],['X','Hub Ø',`${v(rt.X)} ${u}`],['B','Bore, lap joint (min.)',`${v(rt.B)} ${u}`],['r','Bore corner radius at the face',`${v(rt.rc)} ${u}`]);
 return rows;}
let FLK=store.get('flk','wn');if(!FLTYPES.some(t=>t[0]===FLK))FLK='wn';
let FLV=store.get('flv','sec');
function flangeViewer(){
 const f=FL[FLC];let N=SEL,miss=false;
 if(!f.nps.includes(N)){miss=true;const order=PIPE.map(x=>x[0]),i=order.indexOf(SEL);N=f.nps.reduce((b,n)=>Math.abs(order.indexOf(n)-i)<Math.abs(order.indexOf(b)-i)?n:b,f.nps[0]);}
 const r=flRow(FLC,N),p=PIPEMAP[N];const bs=p[2][PS]!=null?PS:(p[2].STD!=null?'STD':Object.keys(p[2])[0]);const bore=p[1]-2*p[2][bs];
 const rt=flTypeRow(FLK,FLC,N),TN=FLTYPES.find(t=>t[0]===FLK)[1];
 const fBore=(FLK==='so'||FLK==='lj')&&rt?rt.B:FLK==='th'?p[1]:FLK==='bl'?0:bore,fKey=FLK==='so'||FLK==='lj'?'B':FLK==='sw'?'B2':FLK==='th'?'A':'Bore';
 const cx=200,cy=205,Ro=140,k=Ro/(r.O/2);
 const rb=r.BC/2*k,rR=r.R/2*k,rB=fBore/2*k,rh=(r.dv+0.125)/2*k,rP=p[1]/2*k;
 const v=x=>L(x);const hd=r.dv+0.125;
 const a0=Math.PI/r.n; /* holes straddle centrelines */
 const holes=[...Array(r.n)].map((_,i)=>{const a=-Math.PI/2+a0+i*2*Math.PI/r.n;return [cx+rb*Math.cos(a),cy+rb*Math.sin(a)];});
 /* hole for the leader: the one nearest upper-left */
 const hl=holes.reduce((b,h)=>(h[0]+h[1]<b[0]+b[1]?h:b),holes[0]);
 const svg=`<svg class="pv-svg" viewBox="0 0 400 400" role="img" aria-label="ASME B16.5 Class ${FLC} NPS ${N} flange face: OD ${v(r.O)}, bolt circle ${v(r.BC)}, raised face ${v(r.R)}, ${r.n} holes ${v(hd)} ${ul()}">
 <defs>
  <linearGradient id="fvMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef0f1"/><stop offset=".3" stop-color="#b3b8bc"/><stop offset=".5" stop-color="#e6e8ea"/><stop offset=".72" stop-color="#a2a8ad"/><stop offset="1" stop-color="#d9dcdf"/></linearGradient>
  <linearGradient id="fvRF" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f4f5"/><stop offset=".4" stop-color="#a9afb4"/><stop offset=".65" stop-color="#e9ebed"/><stop offset="1" stop-color="#9aa0a5"/></linearGradient>
  <linearGradient id="fvBev" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5d6368"/><stop offset=".3" stop-color="#f7f8f9"/><stop offset=".55" stop-color="#7c8287"/><stop offset=".8" stop-color="#eef0f1"/><stop offset="1" stop-color="#666c71"/></linearGradient>
  <linearGradient id="fvHole" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c5257"/><stop offset="1" stop-color="#f2f3f4"/></linearGradient>
  <radialGradient id="fvBore" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#2a3138"/><stop offset="1" stop-color="#0b0e11"/></radialGradient>
  <pattern id="fvBrush" width="400" height="3" patternUnits="userSpaceOnUse"><line x1="0" y1="1" x2="400" y2="1" stroke="#fff" stroke-width=".5" opacity=".18"/></pattern>
  <marker id="fvArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
  <marker id="fvArrI" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" fill="#9fd3ff"/></marker>
 </defs>
 <circle cx="${cx}" cy="${cy}" r="${Ro+3}" fill="none" class="pv-shadow"/>
 <circle cx="${cx}" cy="${cy}" r="${Ro}" fill="url(#fvMetal)" stroke="#4b5157" stroke-width="1"/>
 <circle cx="${cx}" cy="${cy}" r="${Ro}" fill="url(#fvBrush)"/>
 <circle cx="${cx}" cy="${cy}" r="${Ro-1}" fill="none" stroke="#fff" stroke-width="1.4" opacity=".85"/>
 <circle cx="${cx}" cy="${cy}" r="${rb}" fill="none" class="pv-cl"/>
 ${holes.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${rh}" fill="var(--sheet)"/><circle cx="${x}" cy="${y}" r="${rh-1}" fill="none" stroke="url(#fvHole)" stroke-width="2"/>`).join('')}
 ${FLK==='lj'?'':`<circle cx="${cx}" cy="${cy}" r="${rR}" fill="url(#fvRF)" stroke="#5a6065" stroke-width="1.2"/>
 <circle cx="${cx}" cy="${cy}" r="${rR-1.2}" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>`}
 ${FLK==='bl'?'':`<circle cx="${cx}" cy="${cy}" r="${rB}" fill="url(#fvBore)"/>
 <circle cx="${cx}" cy="${cy}" r="${rB+2}" fill="none" stroke="url(#fvBev)" stroke-width="4"/>`}
 <line class="pv-cl" x1="${cx-Ro-14}" y1="${cy}" x2="${cx+Ro+14}" y2="${cy}"/><line class="pv-cl" x1="${cx}" y1="${cy-Ro-8}" x2="${cx}" y2="${cy+Ro+14}"/>
 ${PDG('BC',`<line class="pv-ext" x1="${cx-rb}" y1="${cy-4}" x2="${cx-rb}" y2="${cy-Ro-26}"/><line class="pv-ext" x1="${cx+rb}" y1="${cy-4}" x2="${cx+rb}" y2="${cy-Ro-26}"/>
 <line class="pv-dim" x1="${cx-rb}" y1="${cy-Ro-20}" x2="${cx+rb}" y2="${cy-Ro-20}" marker-start="url(#fvArr)" marker-end="url(#fvArr)"/>
 <rect class="pv-lblbg" x="${cx-64}" y="${cy-Ro-29}" width="128" height="18" rx="3"/>
 <text class="pv-t" x="${cx}" y="${cy-Ro-16}" text-anchor="middle">BC ${v(r.BC)} ${ul()}</text>`)}
 ${FLK==='lj'?'':PDG('R',`<line class="pv-dim" x1="${cx-rR}" y1="${cy-16}" x2="${cx+rR}" y2="${cy-16}" marker-start="url(#fvArr)" marker-end="url(#fvArr)"/>
 <rect class="pv-ibg" x="${cx-46}" y="${cy-34}" width="92" height="15" rx="3"/>
 <text class="pv-ti" x="${cx}" y="${cy-22.5}" text-anchor="middle">R ${v(r.R)}</text>`)}
 ${FLK==='bl'?'':PDG(fKey,`<line class="pv-dim pv-dimi" x1="${cx-rB+1}" y1="${cy+16}" x2="${cx+rB-1}" y2="${cy+16}" marker-start="url(#fvArrI)" marker-end="url(#fvArrI)"/>
 <rect class="pv-ibg" x="${cx-46}" y="${cy+20}" width="92" height="15" rx="3"/>
 <text class="pv-ti" x="${cx}" y="${cy+31.5}" text-anchor="middle">${fKey} ${v(fBore)}</text>`)}
 ${PDG('O',`<line class="pv-ext" x1="${cx-Ro}" y1="${cy+6}" x2="${cx-Ro}" y2="${cy+Ro+30}"/><line class="pv-ext" x1="${cx+Ro}" y1="${cy+6}" x2="${cx+Ro}" y2="${cy+Ro+30}"/>
 <line class="pv-dim" x1="${cx-Ro}" y1="${cy+Ro+24}" x2="${cx+Ro}" y2="${cy+Ro+24}" marker-start="url(#fvArr)" marker-end="url(#fvArr)"/>
 <rect class="pv-lblbg" x="${cx-62}" y="${cy+Ro+15}" width="124" height="18" rx="3"/>
 <text class="pv-t" x="${cx}" y="${cy+Ro+28}" text-anchor="middle">O ${v(r.O)} ${ul()}</text>`)}
 ${PDG('Holes',`<circle cx="${hl[0]}" cy="${hl[1]}" r="2.4" class="pv-dot"/>
 <polyline class="pv-ext pv-lead" points="${hl[0]},${hl[1]} 40,${cy-Ro+8} 10,${cy-Ro+8}"/>
 <rect class="pv-lblbg" x="8" y="${cy-Ro-12}" width="${(r.n+' × Ø'+v(hd)).length*7.8+8}" height="18" rx="3"/>
 <text class="pv-t" x="10" y="${cy-Ro+2}">${r.n} × Ø${v(hd)}</text>`)}
 <text class="pv-tm" x="10" y="16">${TN} · face view, drawn to scale · Class ${FLC} · NPS ${N}″</text>
 </svg>`;
 const naMsg=`<svg class="pv-svg" viewBox="0 0 480 300" role="img" aria-label="Not covered by B16.5"><text class="pv-t" x="240" y="130" text-anchor="middle">B16.5 has no ${TN.toLowerCase()} flange for NPS ${N}″ Class ${FLC}.</text><text class="pv-tm" x="240" y="156" text-anchor="middle">${{sw:'Socket weld: NPS ½–3 in Class 150–600, NPS ½–2½ in Class 900–1500; none in Class 2500.',so:'Slip-on: none in Class 2500; Class 1500 only to NPS 12.',th:'Threaded: Class 1500 and 2500 only to NPS 12.'}[FLK]||''}</text><text class="pv-tm" x="240" y="176" text-anchor="middle">Pick weld neck, or another size or class.</text></svg>`;
 const drawing=!rt?naMsg:FLV==='sec'?flangeSection(FLK,FLC,N,rt,p,bs):svg;
 const stud=null;
 const st=(k,val,u)=>`<div class="pv-stat"><span>${k}</span><b>${val}<u>${u}</u></b></div>`;
 const card=`<div class="pv-data">
  ${rt?pvDimList(`${TN} · NPS ${N}″ Class ${FLC}`,flDimRows(FLK,FLC,N,rt,p,bs)):''}
  ${kv([['NPS / DN · Class',`${N}″ · DN ${DN[N]} · ${FLC}#`,''],['Bolting',`${r.n} × ${r.d}″ studs`,''],
   ...(FLK==='wn'?[['Weld prep, B16.25','37.5°, root face 1.6 mm','']]:FLK==='so'?[['Welds, B31.3 328.5.2B','Fillet, hub and face','']]:FLK==='sw'?[['Welds, B31.3 328.5.2C','Fillet at hub, 1.6 mm gap','']]:FLK==='th'?[['Joint','NPT taper thread; seal weld optional','']]:FLK==='lj'?[['Stub end','Separate part: B16.9 / MSS SP-43','']]:[]),
   ...(()=>{const g=swg(FLC,N);return g?[['Spiral wound gasket, B16.20',`ring OD ${gL(g.d4)} · winding ${gL(g.d2)}–${gL(g.d3)}`,ul()]]:[];})()])}
 </div>`;
 const chips=`<div class="pv-chips" role="group" aria-label="Pressure class">${CLASSES.map(c=>{const rr=flRow(c,N);return `<button data-fc="${c}" aria-pressed="${c===FLC}" ${rr?'':'disabled'}><b>${c}#</b><small>${rr?v(rr.O):'—'}</small></button>`;}).join('')}</div>`;
 const i=f.nps.indexOf(N);
 return `<div class="phead"><div><h1>ASME B16.5 flanges</h1><p>Pick a type, size and class. Click any dimension in the list or on the drawing. Raised face (lap joint: flat face); all lengths in ${ul()}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><span class="pv-step"><button class="pv-nav" data-fd="-1" aria-label="Smaller size" ${i<=0?'disabled':''}>‹</button><select class="sel" id="fvN">${f.nps.map(n=>`<option value="${n}"${n===N?' selected':''}>${n}″ · DN ${DN[n]}</option>`).join('')}</select><button class="pv-nav" data-fd="1" aria-label="Larger size" ${i>=f.nps.length-1?'disabled':''}>›</button></span></label>
 <label class="ctrl"><span class="lbl">Type</span><span class="seg" id="fvT" role="group" aria-label="Flange type">${FLTYPES.map(([k2,n2])=>`<button type="button" data-ft="${k2}" aria-pressed="${k2===FLK}">${n2}</button>`).join('')}</span></label>
 <label class="ctrl"><span class="lbl">Class</span><select class="sel" id="fvC">${CLASSES.map(c=>`<option${c===FLC?' selected':''}>${c}</option>`).join('')}</select></label></div></div>
 ${miss?`<p class="note" style="margin:-4px 0 10px">NPS ${SEL}″ is not listed for Class ${FLC} in B16.5; showing NPS ${N}″.</p>`:''}
 <div class="pv-grid"><div class="pv-fig" style="position:relative"><div class="fv-views seg" role="group" aria-label="Drawing view"><button type="button" data-fv="sec" aria-pressed="${FLV==='sec'}">Section</button><button type="button" data-fv="face" aria-pressed="${FLV==='face'}">Face</button></div><button class="pv-3d" id="fv3d" aria-pressed="${FL3D}" title="${FL3D?'Hide':'Show'} 3D view of the weld neck flange">${FL3D?'✕ Hide 3D':FLK==='wn'?'3D view':'3D (weld neck)'}</button>${drawing}${chips}</div>${card}</div>`;
}
function bindFlangeViewer(){
 $('#fv3d').onclick=()=>{FL3D=!FL3D;renderFlange();if(FL3D){const m=document.getElementById('mp-fl');if(m)m.scrollIntoView({behavior:'smooth',block:'nearest'});}};
 const P=$('#p-flange');
 const setC=c=>{FLC=c;store.set('flc',c);renderFlange();renderHome();};
 $('#fvN').onchange=e=>setSel(e.target.value);
 $('#fvC').onchange=e=>setC(e.target.value);
 P.querySelectorAll('[data-fc]').forEach(b=>b.onclick=()=>setC(b.dataset.fc));
 P.querySelectorAll('[data-ft]').forEach(b=>b.onclick=()=>{FLK=b.dataset.ft;store.set('flk',FLK);renderFlange();});
 P.querySelectorAll('[data-fv]').forEach(b=>b.onclick=()=>{FLV=b.dataset.fv;store.set('flv',FLV);renderFlange();});
 P.querySelectorAll('[data-fd]').forEach(b=>b.onclick=()=>{const l=FL[FLC].nps,i=l.indexOf($('#fvN').value)+ +b.dataset.fd;if(l[i])setSel(l[i]);});
 const d=P.querySelector('details.pv-all');if(d)d.addEventListener('toggle',()=>{FV_OPEN=d.open;store.set('fvopen',d.open?'1':'0');});
}
/* What B16.5 covers, worked out from the data so it cannot drift from the tables */
function flCoverage(){
 const rng=(t,c)=>{const l=FL[c].nps.filter(n=>flTypeRow(t,c,n));const fx=n=>n.replace(/^(\d+)-1\/2$/,'$1½').replace(/^1\/2$/,'½').replace(/^3\/4$/,'¾');return l.length?`${fx(l[0])}–${fx(l[l.length-1])}″`:'—';};
 const head=['Type',...CLASSES.map(c=>`Class ${c}`)];
 const rows=FLTYPES.map(([t,n])=>`<tr><td>${n}</td>${CLASSES.map(c=>{const r=rng(t,c);return `<td>${r==='—'?NA:r}</td>`;}).join('')}</tr>`);
 const other=[['Stub ends for lap-joint flanges','ASME B16.9 (long pattern) or MSS SP-43 (short pattern)'],['Flanges NPS 26–60','ASME B16.47 Series A (MSS SP-44 based) or Series B (API 605 based)'],
  ['Orifice flanges','ASME B16.36'],['Line blanks, spacers, figure-8 blinds','ASME B16.48'],['NPT threads','ASME B1.20.1'],['Weld-end bevel (weld neck)','ASME B16.25'],
  ['Gaskets','ASME B16.20 (spiral wound, ring joint), B16.21 (non-metallic flat)'],['Studs and nuts','ASME B18.2.1 / B18.2.2, materials to ASTM A193 / A194 / A320'],
  ['Long weld neck, nozzle and other special flanges','Not dimensioned in B16.5: manufacturer or purchaser specification'],['Metric (EN) flanges','EN 1092-1 – not interchangeable with B16.5']];
 return `<details class="pv-all" open><summary>What ASME B16.5 covers</summary>
 <p class="note" style="margin:10px 0">Size range each flange type has in B16.5 for each class (NPS ½–24). “—” means B16.5 does not include that type and class.</p>
 ${tbl(head,rows)}
 <p class="note" style="margin:14px 0 6px"><b>Needs another standard</b></p>
 ${kv(other.map(([a,b])=>[a,b,'']))}</details>`;}
function renderFlange(){
 const f=FL[FLC];
 const head=['NPS','DN',`O<small>flange OD</small>`,`tf<small>thickness</small>`,`R<small>RF Ø</small>`,`BC<small>bolt circle</small>`,`Bolts<small>no. × Ø in</small>`,`Hole Ø<small>${ul()}</small>`,`X<small>hub Ø</small>`,`Y<small>WN length</small>`,`Y<small>SO / SW length</small>`,`B<small>SO / SW bore</small>`,`D<small>socket depth</small>`,`Y<small>threaded length</small>`,`T<small>thread length</small>`,`Y<small>LJ length</small>`,`B<small>LJ bore</small>`,`r<small>LJ radius</small>`];
 const rows=f.nps.map(n=>{const r=flRow(FLC,n);return tr(n,[`<span class="dn">${DN[n]}</span>`,L(r.O),L(r.tf),L(r.R),L(r.BC),`${r.n} × ${r.d}″`,L(r.dv+0.125),L(r.X),L(r.Y),(t=>t?L(t.Yso):NA)(flTypeRow('so',FLC,n)),(t=>t?L(t.B):NA)(flTypeRow('so',FLC,n)),(t=>t?L(t.D):NA)(flTypeRow('sw',FLC,n)),...(t=>t?[L(t.Yso),L(t.T)]:[NA,NA])(flTypeRow('th',FLC,n)),...(t=>t?[L(t.Yso),L(t.B),L(t.rc)]:[NA,NA,NA])(flTypeRow('lj',FLC,n))]);});
 $('#p-flange').innerHTML=flangeViewer()+`${FL3D?(MPS.fl.mode='3d',mpHTML('fl')):''}<details class="pv-all"${FV_OPEN?' open':''}><summary>All sizes table · Class ${FLC}</summary><div class="phead" style="margin-top:10px"><div><p>O, tf, R, BC and bolting also apply to slip-on, blind and lap-joint flanges of the same class. Tap a row to select that size.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Pressure class</span>${seg('flc',CLASSES,FLC)}</label></div></div>
 <div class="diag"><p class="legend"><b>RF height:</b> Class 150 and 300 have a 1.6 mm (0.06″) raised face <b>included</b> in tf and Y. Class 400 and above have a 6.4 mm (0.25″) raised face <b>not included</b>, so add it for face-to-face and stud lengths.<br><br><b>Bolting</b> is ASME B18.2.1 stud bolts with B18.2.2 heavy hex nuts (UNC to 1″, 8-UN above). Bolt holes are bolt Ø + 3.2 mm (⅛″). Class ${FLC} covers NPS ${f.nps[0]}″ to ${f.nps[f.nps.length-1]}″ in this table.</p></div>
 ${tbl(head,rows)}
 <p class="note"><b>Notes.</b> mm values are exact conversions of the B16.5 inch table; the B16.5 metric annex rounds them (e.g. Class 150 NPS 2 OD 152.4 → 150). Class 400 NPS ½–3½ uses the Class 600 dimensions, as B16.5 directs. Threaded flanges are tapped NPT (ASME B1.20.1); T is the minimum thread length. Lap-joint flanges have a flat face and bear on a stub end; Y and the bore B apply to the flange only. Gasket dimensions are on the Gaskets page. For NPS 26 and above use ASME B16.47 Series A or B.</p></details>
 ${flCoverage()}`;
 bindFlangeViewer();
 if(FL3D)mpInit('fl');
 bindSeg('flc',v=>{FLC=v;store.set('flc',v);renderFlange();renderHome();});
}

/* ============================== BUTT-WELD ============================== */
const BW_IMG="assets/img/bw-key.webp";
/* ---------- Butt-weld fitting viewer ---------- */
let BWK=store.get('bwk','lr90'), BW_OPEN=store.get('bwopen','1')==='1', BW3D=false, BWE='conc', BWS=null;
const BWKINDS=[['lr90','90° LR elbow','lr90'],['sr90','90° SR elbow','sr90'],['d390','90° 3D elbow','d390'],['lr45','45° LR elbow','lr45'],['r180','180° LR return','r180O'],['tee','Equal tee','tee'],['red','Reducer','red'],['cap','Cap','cap']];
const BW3MAP={lr90:'e90',sr90:'e90',d390:'e90',r180:'e90',lr45:'e45',tee:'tee',red:'red',cap:'cap'};
function bwViewer(){
 let N=SEL,miss=false;if(!BWN.includes(N)){miss=true;const o=PIPE.map(x=>x[0]),i=o.indexOf(SEL);N=BWN.reduce((b,n)=>Math.abs(o.indexOf(n)-i)<Math.abs(o.indexOf(b)-i)?n:b,BWN[0]);}
 const b=bwRow(N),p=PIPEMAP[N],D=p[1],r=D/2,tw=p[2].STD??p[2]['40']??Object.values(p[2])[0];
 const avail=k=>b[BWKINDS.find(x=>x[0]===k)[2]]!=null;
 if(!avail(BWK))BWK='lr90';
 const K=BWK, f=x=>L(x,'fit'), u=ul();
 const smalls=BWN.slice(0,BWN.indexOf(N));if(K==='red'&&(!BWS||!smalls.includes(BWS)))BWS=smalls[Math.max(0,smalls.length-2)];
 /* --- model geometry (inches, y up) --- */
 let shape='',cl='',dims=[],bb;
 const A={lr90:b.lr90,sr90:b.sr90,d390:b.d390}[K];
 const arcPt=(R,a)=>[R*Math.cos(a),R*Math.sin(a)];
 if(A){const Ro=A+r,Ri=A-r;bb=[-0.15*A-r*0.3,-0.25*A,A+r,A+r];
  shape=`M${A+r} 0 A${Ro} ${Ro} 0 0 1 0 ${A+r} L0 ${A-r} A${Ri} ${Ri} 0 0 0 ${A-r} 0 Z`;cl=`M${A} 0 A${A} ${A} 0 0 1 0 ${A}`;
  dims=[{t:'h',a:[0,A-r],b:[A,0],y:-0.18*A-0.15*r,lab:`A ${f(A)}`},{t:'v',a:[A+r,0],b:[0,A],x:A+r+0.22*A,lab:`A ${f(A)}`},{t:'h',a:[A-r,0],b:[A+r,0],y:-0.08*A,lab:`OD ${L(D,'od')}`,small:1}];
  bb=[-0.05*A,-0.3*A-0.3*r,A+r+0.3*A,A+r];}
 else if(K==='lr45'){const R=b.lr90,B=b.lr45,a=Math.PI/4,[ox,oy]=arcPt(R+r,a),[ix,iy]=arcPt(R-r,a),[cx2,cy2]=arcPt(R,a);
  shape=`M${R+r} 0 A${R+r} ${R+r} 0 0 1 ${ox} ${oy} L${ix} ${iy} A${R-r} ${R-r} 0 0 0 ${R-r} 0 Z`;cl=`M${R} 0 A${R} ${R} 0 0 1 ${cx2} ${cy2}`;
  const P=[R,B];cl+=` M${R} 0 L${R} ${B} L${cx2} ${cy2}`;
  dims=[{t:'v',a:[R+r,0],b:[R,B],x:R+r+0.35*r+0.12*R,lab:`B ${f(B)}`},{t:'h',a:[R-r,0],b:[R+r,0],y:-0.12*R,lab:`OD ${L(D,'od')}`,small:1}];
  bb=[ix-0.1*R,-0.2*R,R+r+0.45*R,oy+0.05*R];}
 else if(K==='r180'){const R=b.lr90,O=2*R,Kb=b.r180K;
  shape=`M${R+r} 0 A${R+r} ${R+r} 0 0 1 ${-R-r} 0 L${-R+r} 0 A${R-r} ${R-r} 0 0 0 ${R-r} 0 Z`;cl=`M${R} 0 A${R} ${R} 0 0 1 ${-R} 0`;
  dims=[{t:'h',a:[-R,0],b:[R,0],y:-0.35*R,lab:`O ${f(O)}`},{t:'v',a:[R+r,0],b:[0,R+r],x:R+r+0.3*R,lab:`K ${f(Kb)}`,ext2:'h'},{t:'h',a:[-R-r,0],b:[-R+r,0],y:-0.12*R,lab:`OD ${L(D,'od')}`,small:1}];
  bb=[-R-r-0.1*R,-0.5*R,R+r+0.45*R,R+r+0.05*R];}
 else if(K==='tee'){const C=b.tee,M=b.teeM;
  shape=`M${-C} ${-r} L${C} ${-r} L${C} ${r} L${r} ${r} L${r} ${M} L${-r} ${M} L${-r} ${r} L${-C} ${r} Z`;cl=`M${-C} 0 L${C} 0 M0 0 L0 ${M}`;
  dims=[{t:'h',a:[0,-r],b:[C,-r],y:-r-0.35*C,lab:`C ${f(C)}`},{t:'v',a:[r,0],b:[r,M],x:C+0.25*C,lab:`M ${f(M)}`,ext1:[C,0]},{t:'h',a:[-r,M],b:[r,M],y:M+0.3*C,lab:`OD ${L(D,'od')}`,small:1}];
  bb=[-C-0.1*C,-r-0.55*C,C+0.5*C,M+0.45*C];}
 else if(K==='red'){const H=b.red,d=PIPEMAP[BWS][1]/2,l1=0.18*H,l2=0.82*H,ecc=BWE==='ecc',dy=ecc?r-d:0;
  shape=`M0 ${-r} L${l1} ${-r} L${l2} ${dy-d} L${H} ${dy-d} L${H} ${dy+d} L${l2} ${dy+d} L${l1} ${r} L0 ${r} Z`;
  cl=ecc?`M0 0 L${l1} 0 L${l2} ${dy} L${H} ${dy}`:`M0 0 L${H} 0`;
  /* ecc: flat on bottom -> mirror so flat is at -r */
  if(ecc){shape=`M0 ${-r} L${H} ${-r} L${H} ${-r+2*d} L${l2} ${-r+2*d} L${l1} ${r} L0 ${r} Z`;cl=`M0 0 L${l1} 0 L${l2} ${-r+d} L${H} ${-r+d}`;}
  const sy=ecc?-r+d:0;
  dims=[{t:'h',a:[0,-r],b:[H,-r],y:-r-0.3*Math.max(H,2*r),lab:`H ${f(H)}`},{t:'v',a:[0,-r],b:[0,r],x:-0.35*Math.max(H,2*r),lab:`D1 ${L(D,'od')}`},{t:'v',a:[H,sy-d],b:[H,sy+d],x:H+0.3*Math.max(H,2*r),lab:`D2 ${L(2*d,'od')}`}];
  const m=Math.max(H,2*r);bb=[-0.6*m,-r-0.45*m,H+0.6*m,r+0.1*m];}
 else if(K==='cap'){const E=b.cap,h=Math.min(D/4,E*0.7),s=E-h;
  shape=`M${-r} 0 L${-r} ${s} A${r} ${h} 0 0 0 ${r} ${s} L${r} 0 Z`;cl=`M0 0 L0 ${E}`;
  dims=[{t:'v',a:[r,0],b:[0,E],x:r+0.45*Math.max(E,r),lab:`E ${f(E)}`},{t:'h',a:[-r,0],b:[r,0],y:-0.3*Math.max(E,r),lab:`OD ${L(D,'od')}`}];
  const m=Math.max(E,r);bb=[-r-0.15*m,-0.5*m,r+0.85*m,E+0.1*m];}
 /* --- fit to view --- */
 const W=400,Hh=340,pad=46,sx=(W-2*pad)/(bb[2]-bb[0]),sy2=(Hh-2*pad)/(bb[3]-bb[1]),s=Math.min(sx,sy2);
 const ox=pad+((W-2*pad)-(bb[2]-bb[0])*s)/2-bb[0]*s, oy=Hh-pad-((Hh-2*pad)-(bb[3]-bb[1])*s)/2+bb[1]*s;
 const X=x=>ox+x*s, Y=y=>oy-y*s;
 const tf=`transform="matrix(${s} 0 0 ${-s} ${ox} ${oy})"`;
 const lab=(x,y,t,sm)=>{const w=t.length*(sm?6.6:7.8)+12;return `<rect class="pv-lblbg" x="${x-w/2}" y="${y-10}" width="${w}" height="18" rx="3"/><text class="pv-t" x="${x}" y="${y+3.5}" text-anchor="middle" ${sm?'style="font-size:11px"':''}>${t}</text>`;};
 const dimsSvg=dims.map(d=>PDG(d.lab.split(' ')[0],(()=>{if(d.t==='h'){const y=Y(d.y),x1=X(d.a[0]),x2=X(d.b[0]);
   return `<line class="pv-ext" x1="${x1}" y1="${Y(d.a[1])}" x2="${x1}" y2="${y+(y>Y(d.a[1])?6:-6)}"/><line class="pv-ext" x1="${x2}" y1="${Y(d.b[1])}" x2="${x2}" y2="${y+(y>Y(d.b[1])?6:-6)}"/><line class="pv-dim" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" marker-start="url(#bwArr)" marker-end="url(#bwArr)"/>${lab((x1+x2)/2,y,d.lab,d.small)}`;}
  const x=X(d.x),y1=Y(d.a[1]),y2=Y(d.b[1]),xa=X(d.a[0]),xb=X(d.ext1?d.ext1[0]:d.b[0]);
  return `<line class="pv-ext" x1="${xa}" y1="${y1}" x2="${x+(x>xa?6:-6)}" y2="${y1}"/><line class="pv-ext" x1="${xb}" y1="${y2}" x2="${x+(x>xb?6:-6)}" y2="${y2}"/><line class="pv-dim" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" marker-start="url(#bwArr)" marker-end="url(#bwArr)"/>${lab(x,(y1+y2)/2,d.lab,d.small)}`;})())).join('');
 const nm=BWKINDS.find(x=>x[0]===K)[1]+(K==='red'?` ${npsLbl(N)} × ${npsLbl(BWS)} ${BWE==='ecc'?'eccentric (FOB)':'concentric'}`:'');
 const svg=`<svg class="pv-svg" viewBox="0 0 400 ${Hh}" role="img" aria-label="${nm}, NPS ${N}: ${dims.map(d=>d.lab).join(', ')} ${u}">
 <defs>
  <linearGradient id="bwMetal" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="${Hh}"><stop offset="0" stop-color="#f1f3f4"/><stop offset=".3" stop-color="#b3b8bc"/><stop offset=".5" stop-color="#e6e8ea"/><stop offset=".75" stop-color="#9ea4a9"/><stop offset="1" stop-color="#d9dcdf"/></linearGradient>
  <pattern id="bwBrush" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="5" stroke="#fff" stroke-width=".6" opacity=".22"/></pattern>
  <marker id="bwArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
 </defs>
 <path d="${shape}" ${tf} fill="url(#bwMetal)" stroke="#4b5157" stroke-width="1.3" vector-effect="non-scaling-stroke"/>
 <path d="${shape}" ${tf} fill="url(#bwBrush)"/>
 <path d="${cl}" ${tf} class="pv-cl" fill="none" vector-effect="non-scaling-stroke"/>
 ${dimsSvg}
 <text class="pv-tm" x="10" y="16">drawn to scale · ${nm} · NPS ${N}″</text>
 </svg>`;
 /* --- controls, card --- */
 const kindChips=`<div class="pv-chips" role="group" aria-label="Fitting">${BWKINDS.map(([k,l,c])=>`<button data-bk="${k}" aria-pressed="${k===K}" ${b[c]!=null?'':'disabled'}><b>${l}</b><small>${b[c]!=null?f(b[c]):'—'}</small></button>`).join('')}</div>`;
 const redCtl=K==='red'?`<div class="pv-chips" style="margin-top:6px"><label class="ctrl"><span class="lbl">Small end</span><select class="sel" id="bwS">${smalls.map(n=>`<option value="${n}"${n===BWS?' selected':''}>${n}″</option>`).join('')}</select></label><label class="ctrl"><span class="lbl">Type</span>${seg('bwe',[['conc','Concentric'],['ecc','Eccentric FOB']],BWE)}</label></div>`:'';
 const st=(k,val,uu)=>`<div class="pv-stat"><span>${k}</span><b>${val}<u>${uu}</u></b></div>`;
 const main={lr90:[['Centre–end A',f(b.lr90)],['Bend radius',f(b.lr90)]],sr90:[['Centre–end A',f(b.sr90)],['Bend radius',f(b.sr90)]],d390:[['Centre–end A',f(b.d390)],['Bend radius',f(b.d390)]],
  lr45:[['Centre–end B',f(b.lr45)],['Bend radius',f(b.lr90)]],r180:[['Centre–centre O',f(b.r180O)],['Back–face K',f(b.r180K)]],tee:[['Run C',f(b.tee)],['Branch M',f(b.teeM)]],
  red:[['End–end H',f(b.red)],['Small end OD',L(PIPEMAP[BWS||N][1],'od')]],cap:[['Height E',f(b.cap)],['Wall (≤ XS)',L(tw,'w')]]}[K];
 const all=BWKINDS.map(([k,l,c])=>`<button data-bk="${k}" class="${k===K?'on':''}" ${b[c]!=null?'':'disabled'}><span>${l}</span><b>${b[c]!=null?f(b[c]):'—'}<u>${b[c]!=null?u:''}</u></b></button>`).join('');
 const BWD={A:'Centre to end',OD:'Pipe outside diameter',B:'Centre to end, 45°',O:'Centre to centre',K:'Back to face',C:'Centre to end, run',M:'Centre to end, outlet',H:'End to end',E:'Back of cap to end',D1:'Large end OD',D2:'Small end OD'};
 const dimRows=[];dims.forEach(d=>{const k=d.lab.split(' ')[0];if(!dimRows.some(x=>x[0]===k))dimRows.push([k,BWD[k]||k,d.lab.slice(k.length+1)+' '+u]);});
 const card=`<div class="pv-data">${pvDimList(`Dimensions · ${nm}, NPS ${N}″`,dimRows)}
  <div class="pv-list"><div class="pv-lh">All B16.9 centre-to-end at NPS ${N}″<span>Click to switch fitting</span></div>${all}</div></div>`;
 const i=BWN.indexOf(N);
 return `<div class="phead"><div><h1>ASME B16.9 butt-weld fittings</h1><p>Pick a size and fitting; the drawing and dimensions update instantly. LR radius 1.5 × NPS, SR 1.0 × NPS, 3D 3 × NPS. NPS ½–48. All lengths in ${u}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><span class="pv-step"><button class="pv-nav" data-bd="-1" aria-label="Smaller size" ${i<=0?'disabled':''}>‹</button><select class="sel" id="bwN">${BWN.map(n=>`<option value="${n}"${n===N?' selected':''}>${n}″ · DN ${DN[n]}</option>`).join('')}</select><button class="pv-nav" data-bd="1" aria-label="Larger size" ${i>=BWN.length-1?'disabled':''}>›</button></span></label></div></div>
 ${miss?`<p class="note" style="margin:-4px 0 10px">NPS ${SEL}″ is not in the B16.9 table here; showing NPS ${N}″.</p>`:''}
 <div class="pv-grid"><div class="pv-fig" style="position:relative"><button class="pv-3d" id="bw3d" aria-pressed="${BW3D}" title="${BW3D?'Hide':'Show'} 3D view">${BW3D?'✕ Hide 3D':'3D view'}</button>${svg}${kindChips}${redCtl}</div>${card}</div>`;
}
function bindBwViewer(){
 const P=$('#p-bw');
 const setK=k=>{BWK=k;store.set('bwk',k);renderBW();};
 $('#bwN').onchange=e=>setSel(e.target.value);
 P.querySelectorAll('[data-bk]').forEach(x=>x.onclick=()=>setK(x.dataset.bk));
 P.querySelectorAll('[data-bd]').forEach(x=>x.onclick=()=>{const i=BWN.indexOf($('#bwN').value)+ +x.dataset.bd;if(BWN[i])setSel(BWN[i]);});
 const s=$('#bwS');if(s)s.onchange=e=>{BWS=e.target.value;renderBW();};
 bindSeg('bwe',v=>{BWE=v;renderBW();});
 $('#bw3d').onclick=()=>{BW3D=!BW3D;renderBW();if(BW3D){const m=document.getElementById('mp-bw');if(m)m.scrollIntoView({behavior:'smooth',block:'nearest'});}};
 const d=P.querySelector('details.pv-all');if(d)d.addEventListener('toggle',()=>{BW_OPEN=d.open;store.set('bwopen',d.open?'1':'0');});
}
function renderBW(){
 const head=['NPS','DN',`90° LR<small>A</small>`,`45° LR<small>B</small>`,`90° SR<small>A</small>`,`90° 3D<small>A</small>`,`180° LR<small>c–c O</small>`,`180° LR<small>back K</small>`,`Tee<small>run C</small>`,`Tee<small>outlet M</small>`,`Reducer<small>H</small>`,`Cap<small>E</small>`];
 const rows=BWN.map(n=>{const b=bwRow(n);return tr(n,[`<span class="dn">${DN[n]}</span>`,L(b.lr90,'fit'),L(b.lr45,'fit'),L(b.sr90,'fit'),L(b.d390,'fit'),L(b.r180O,'fit'),L(b.r180K,'fit'),L(b.tee,'fit'),L(b.teeM,'fit'),L(b.red,'fit'),L(b.cap,'fit')]);});
 $('#p-bw').innerHTML=bwViewer()+`${BW3D?(MPS.bw.mode='3d',MPS.bw.kind=BW3MAP[BWK],mpHTML('bw')):''}<details class="pv-all"${BW_OPEN?' open':''}><summary>All sizes table &amp; dimension key</summary>
 <details style="margin:12px 0 14px"><summary style="cursor:pointer;color:var(--muted);font-size:13px">Show the full B16.9 dimension key drawing</summary><div class="fig" id="bwfig" style="margin-top:8px"><img loading="lazy" decoding="async" width="1536" height="657" src="${BW_IMG}" alt="Butt-weld fitting dimension key: 90° and 45° LR elbows (A, B), 90° SR and 3D elbows (A), 180° return bend (O centre-to-centre, K back-to-face), equal and reducing tees (C, M), concentric and eccentric reducers (H) and cap (E)"></div></details>
 ${tbl(head,rows)}
 <p class="note"><b>Notes.</b> Tee C is the run centre-to-end; for a straight tee the outlet M equals C, except NPS 42–48 where B16.9 gives a shorter M. For NPS 26 and larger, B16.9 lists LR 90° and 45° elbows, tees, caps and reducers (large end to NPS 36) only: SR and 3D elbows, 180° returns and crosses are not tabulated (shown as —), and the NPS 26 cap length is subject to agreement with the purchaser. Reducing tees keep the run C and use a shorter M from the B16.9 reducing table. Reducer H is the same for concentric and eccentric reducers and is set by the large end. Cap E applies up to and including XS wall; heavier walls use the longer E1. NPS ¾ elbows are 38 mm (A) and 19 mm (B); B16.9 lets the manufacturer supply 29 mm and 11 mm instead (and 55 / 43 mm for the ¾ return), so check the vendor drawing at that size. mm values are rounded to whole millimetres, as in B16.9.</p></details>`;
 const bf=$('#bwfig');bf.querySelector('img').addEventListener('click',()=>bf.classList.toggle('zoom'));bindBwViewer();if(BW3D)mpInit('bw');
}

/* ============================== SOCKET WELD ============================== */
/* ---------- Socket weld & NPT viewer ---------- */
let SWK=store.get('swk','e90'), SW_OPEN=store.get('swopen','1')==='1';
const SWKINDS=[['e90','90° SW elbow'],['e45','45° SW elbow'],['tee','SW tee'],['npt','NPT thread']];
function swViewer(){
 let N=SEL,miss=false;if(!SWN.includes(N)){miss=true;const o=PIPE.map(x=>x[0]),i=o.indexOf(SEL);N=SWN.reduce((b,n)=>Math.abs(o.indexOf(n)-i)<Math.abs(o.indexOf(b)-i)?n:b,SWN[0]);}
 const i=SWN.indexOf(N);let cls=SWC;if(cls==='6000'&&SW.A6000[i]==null)cls='3000';
 const A=(cls==='3000'?SW.A3000:SW.A6000)[i],C=(cls==='3000'?SW.C3000:SW.C6000)[i],J=SW.J[i],Bn=SW.Bmin[i],Bx=SW.Bmax[i],B=(Bn+Bx)/2;
 const p=PIPEMAP[N],D=p[1],sch=cls==='3000'?'80':(p[2]['160']!=null?'160':'XS'),pt=p[2][sch]??p[2].XS,pid=D-2*pt;
 const tpi=SW.tpi[i],pitch=1/tpi,L1=SW.L1[i],L2=SW.L2[i],g=1/16;
 const K=SWK,u=ul(),v=x=>L(x),vw=x=>L(x,'w');
 const W=400,Hh=340;let body='',dims=[],call=[],bbPts=[],title='';
 const leaders=[];
 if(K!=='npt'){
  const cA=K==='e45'?C:A, h=B/2+Math.max(0.12,0.22*B), legs=K==='e90'?[[180,-1],[270,1]]:K==='e45'?[[180,-1],[315,1]]:[[180,-1],[0,0],[90,-1]], P=0.55*(cA+J)+0.3*D;
  const rot=(x,y,d)=>{const a=d*Math.PI/180;return [x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];};
  const leg=d=>`<g transform="rotate(${d})">`;
  const outline=legs.map(([d])=>`${leg(d)}<rect x="0" y="${-h}" width="${cA+J}" height="${2*h}"/></g>`).join('')+`<circle r="${h}"/>`;
  body=`<g class="sw-edge">${outline}</g><g fill="url(#swMetal)">${outline}</g><g fill="url(#swBrush)">${outline}</g>
   <g fill="#0b0e11">${legs.map(([d])=>`${leg(d)}<rect x="${cA}" y="${-B/2}" width="${J}" height="${B}"/><rect x="0" y="${-pid/2}" width="${cA}" height="${pid}"/></g>`).join('')}<circle r="${pid/2}"/></g>
   ${legs.map(([d])=>`${leg(d)}<rect x="${cA+g}" y="${-D/2}" width="${J-g+P}" height="${D}" fill="url(#swPipe)" stroke="#3f454a" stroke-width="${0.006*(cA+J)}"/><rect x="${cA+g}" y="${-pid/2}" width="${J-g+P}" height="${pid}" fill="#0b0e11"/>
     <path d="M${cA+J} ${h} L${cA+J+1.1*pt+0.06} ${D/2} L${cA+J} ${D/2} Z M${cA+J} ${-h} L${cA+J+1.1*pt+0.06} ${-D/2} L${cA+J} ${-D/2} Z" fill="#c9884a" opacity=".95"/>
     <line x1="${-h*1.2}" y1="0" x2="${cA+J+P+0.1}" y2="0" class="pv-cl" vector-effect="non-scaling-stroke"/></g>`).join('')}`;
  legs.forEach(([d])=>{for(const x of [-h,cA+J+P])for(const y of [-h,h])bbPts.push(rot(x,y,d));});
  const off=h+0.32*(cA+J);
  legs.forEach(([d,side],k)=>{if(!side)return;const n=side,ln=cA===A?'A':'C';
   const off2=off+0.42*(cA+J);
  if(!(K==='e45'&&d===315))dims.push({p1:rot(cA+J,n*h,d),p2:rot(cA,n*h,d),q1:rot(cA+J,n*off2,d),q2:rot(cA,n*off2,d),lab:`J ${v(J)}`,sm:1});
   dims.push({p1:rot(cA,n*h,d),p2:rot(0,n*h,d),q1:rot(cA,n*off,d),q2:rot(0,n*off,d),lab:`${ln} ${v(cA)}`});
   bbPts.push(rot(cA+J,n*(off+0.6*(cA+J)),d),rot(0,n*(off+0.6*(cA+J)),d));});
  leaders.push({k:'B',pt:rot(cA+J*0.5,B/2,180),lab:`B ${vw(Bn)}–${vw(Bx)}`,pos:'bl2'});
  leaders.push({k:'G',pt:rot(cA+g/2,-D*0.25,180),lab:`G ≈ ${U==='mm'?'1.6':'0.06'}`,pos:'bl'});
  title=SWKINDS.find(x=>x[0]===K)[1]+` · Class ${cls}`;
 } else {
  /* pipe end with tapered NPT thread, end at x=0, pipe extends to -Lp */
  const Lp=Math.max(3*L2,2.2*D),th=0.8*pitch,taper=1/32;
  const rr=x=>D/2+x*taper; /* radius grows going back (x negative -> larger? taper: diameter decreases toward end) */
  const rad=x=>D/2-(L2+x<0?0:0)+( x<-L2?0:(x+L2)*-taper); /* at x=-L2 full OD, smaller toward end */
  let top=`M${-Lp} ${D/2} L${-L2} ${D/2}`;let x=-L2,up=true;
  while(x<0){const nx=Math.min(0,x+pitch/2);top+=` L${nx} ${rad(nx)-(up?th:0)}`;x=nx;up=!up;}
  top+=` L0 ${-rad(0)}`;
  let bot='';x=0;up=false;const pts=[];let xx=-L2,uu=true;while(xx<0){const nx=Math.min(0,xx+pitch/2);pts.push([nx,-(rad(nx)-(uu?th:0))]);xx=nx;uu=!uu;}
  bot=pts.reverse().map(q=>` L${q[0]} ${q[1]}`).join('')+` L${-L2} ${-D/2} L${-Lp} ${-D/2} Z`;
  const path=top+bot;
  body=`<path d="${path}" class="sw-edge2"/><path d="${path}" fill="url(#swPipe)"/><path d="${path}" fill="url(#swBrush)"/>
   <line x1="${-Lp-0.1}" y1="0" x2="0.15" y2="0" class="pv-cl" vector-effect="non-scaling-stroke"/>
   <line x1="${-L1}" y1="${-D/2-0.12*D}" x2="${-L1}" y2="${D/2+0.12*D}" stroke="#F2B33D" stroke-dasharray="${D*0.04} ${D*0.03}" stroke-width="${D*0.012}"/>`;
  bbPts.push([-Lp,-D/2],[1.9*D,D/2],[-Lp,-D/2-0.75*D],[0.35*D,D/2+0.75*D]);
  dims.push({p1:[-L2,D/2],p2:[0,rad(0)],q1:[-L2,D/2+0.45*D],q2:[0,D/2+0.45*D],lab:`L2 ${vw(L2)}`});
  dims.push({p1:[-L1,-D/2-0.12*D],p2:[0,-rad(0)],q1:[-L1,-D/2-0.45*D],q2:[0,-D/2-0.45*D],lab:`L1 hand-tight ${vw(L1)}`});
  dims.push({p1:[-Lp*0.8,-D/2],p2:[-Lp*0.8,D/2],q1:[-Lp*0.8,-D/2],q2:[-Lp*0.8,D/2],lab:`OD ${L(D,'od')}`,inside:1});
  leaders.push({k:'P',pt:[-pitch*1.2,rad(-pitch*1.2)-th*0.5],lab:`${tpi} TPI`,lab2:`pitch ${U==='mm'?(25.4/tpi).toFixed(3):pitch.toFixed(4)}`,pos:'r',x2:0.25*D});
  title=`NPT thread · taper 1:16 on dia.`;
 }
 /* fit */
 const xs=bbPts.map(q=>q[0]),ys=bbPts.map(q=>q[1]),bb=[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];
 const pad=34,xb=K!=='npt'?34:0,avH=Hh-2*pad-24-xb,s=Math.min((W-2*pad)/(bb[2]-bb[0]),avH/(bb[3]-bb[1]));
 const ox=pad+((W-2*pad)-(bb[2]-bb[0])*s)/2-bb[0]*s, oy=Hh-pad-xb-(avH-(bb[3]-bb[1])*s)/2+bb[1]*s;
 const S=q=>[ox+q[0]*s,oy-q[1]*s];
 const lw=(t,sm)=>t.length*(sm?6.1:6.9)+8;
 const lab=(x,y,t,sm)=>{const w=lw(t,sm);return `<rect class="pv-lblbg" x="${x-w/2}" y="${y-8}" width="${w}" height="15" rx="3"/><text class="pv-t" x="${x}" y="${y+3.5}" text-anchor="middle" style="font-size:${sm?10:11.5}px">${t}</text>`;};
 const dimSvg=dims.map(d=>PDG(d.lab.split(' ')[0],(()=>{const [a1,b1]=S(d.p1),[a2,b2]=S(d.p2),[c1,e1]=S(d.q1),[c2,e2]=S(d.q2);
  const ex=(px,py,qx,qy)=>{const L0=Math.hypot(qx-px,qy-py)||1;return `<line class="pv-ext" x1="${px}" y1="${py}" x2="${qx+(qx-px)/L0*6}" y2="${qy+(qy-py)/L0*6}"/>`;};
  return (d.inside?'':ex(a1,b1,c1,e1)+ex(a2,b2,c2,e2))+(()=>{const ln=Math.hypot(c2-c1,e2-e1)||1,ux=(c2-c1)/ln,uy=(e2-e1)/ln;
   if(ln>=30)return `<line class="pv-dim" x1="${c1}" y1="${e1}" x2="${c2}" y2="${e2}" marker-start="url(#swArr)" marker-end="url(#swArr)"/>`;
   /* short dimension: arrows placed outside, pointing in (drafting convention) */
   return `<line class="pv-dim" x1="${c1}" y1="${e1}" x2="${c2}" y2="${e2}"/><line class="pv-dim" x1="${c1-ux*16}" y1="${e1-uy*16}" x2="${c1}" y2="${e1}" marker-end="url(#swArrS)"/><line class="pv-dim" x1="${c2+ux*16}" y1="${e2+uy*16}" x2="${c2}" y2="${e2}" marker-end="url(#swArrS)"/>`;})()+(()=>{let mx=(c1+c2)/2,my=(e1+e2)/2;const len=Math.hypot(c2-c1,e2-e1),w=lw(d.lab,d.sm);
   if(!d.inside){/* label always sits on the outer side of the dimension line, clear of the arrows */let nx=c1-a1,ny=e1-b1;const nl=Math.hypot(nx,ny)||1;nx/=nl;ny/=nl;const push=Math.abs(nx)*(w/2+6)+Math.abs(ny)*10;mx+=nx*push;my+=ny*push;}
   return lab(mx,my,d.lab,d.sm);})();})())).join('');
 const ldr=leaders.map(l=>PDG(l.k,(()=>{if(l.pos==='r'){const [x,y]=S(l.pt),[ex]=S([l.x2,0]);return `<circle cx="${x}" cy="${y}" r="2.4" class="pv-dot"/><polyline class="pv-ext pv-lead" points="${x},${y} ${ex},${y-18} ${ex+86},${y-18}"/><text class="pv-t" x="${ex+2}" y="${y-23}">${l.lab}</text><text class="pv-t" x="${ex+2}" y="${y-2}" style="font-size:11px">${l.lab2}</text>`;}
  const [x,y]=S(l.pt),ty=l.pos==='tl'?40:l.pos==='bl2'?Hh-34:Hh-12,w=l.lab.length*8.2+4,lx=leaders.filter(q=>q.pos!=='r').map(q=>S(q.pt)[0]),xl=Math.min(...lx),xr=Math.max(...lx),tx=xl-w-8>=8?xl-w-8:Math.min(xr+8,W-w-8);
  return `<circle cx="${x}" cy="${y}" r="2.4" class="pv-dot"/><polyline class="pv-ext pv-lead" points="${x},${y} ${x},${ty-5} ${tx},${ty-5}"/><text class="pv-t" x="${tx}" y="${ty-9}">${l.lab}</text>`;})())).join('');
 const svg=`<svg class="pv-svg" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${title}, NPS ${N}: ${dims.map(d=>d.lab).join(', ')} ${u}">
 <defs>
  <linearGradient id="swMetal" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="${Hh}"><stop offset="0" stop-color="#eef0f1"/><stop offset=".3" stop-color="#aeb3b8"/><stop offset=".5" stop-color="#e4e7e9"/><stop offset=".75" stop-color="#9aa0a5"/><stop offset="1" stop-color="#d6d9dc"/></linearGradient>
  <linearGradient id="swPipe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d97a0"/><stop offset=".3" stop-color="#e2e6ea"/><stop offset=".55" stop-color="#b4bcc3"/><stop offset="1" stop-color="#6f7881"/></linearGradient>
  <pattern id="swBrush" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="5" stroke="#fff" stroke-width=".6" opacity=".2"/></pattern>
  <marker id="swArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
  <marker id="swArrS" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker>
 </defs>
 <g transform="matrix(${s} 0 0 ${-s} ${ox} ${oy})" style="--sw:${2.4/s}">${body}</g>
 ${dimSvg}${ldr}
 <text class="pv-tm" x="10" y="16">${K==='npt'?'drawn to scale':'half section, to scale'} · ${title} · NPS ${N}″</text>
 </svg>`;
 const st=(k,val,uu)=>`<div class="pv-stat"><span>${k}</span><b>${val}<u>${uu}</u></b></div>`;
 const stats=K==='npt'?[['Threads / inch',tpi,'TPI'],['Hand-tight L1',vw(L1),u],['Effective L2',vw(L2),u]]
  :[['Socket bore B',`${vw(Bn)}–${vw(Bx)}`,u],['Socket depth J',v(J),u],[K==='e45'?'Ctr–bottom C':'Ctr–bottom A',v(K==='e45'?C:A),u]];
 const swRows=K==='npt'?[['L1','Hand-tight engagement',`${vw(L1)} ${u}`],['L2','Effective thread length',`${vw(L2)} ${u}`],['OD','Pipe outside diameter',`${L(D,'od')} ${u}`],['P',`Thread pitch, ${tpi} TPI`,`${U==='mm'?(25.4/tpi).toFixed(3):pitch.toFixed(4)} ${u}`]]
  :[[K==='e45'?'C':'A',K==='e45'?'Centre to socket bottom, 45°':'Centre to socket bottom',`${v(K==='e45'?C:A)} ${u}`],['J','Socket depth (min)',`${v(J)} ${u}`],['B','Socket bore diameter',`${vw(Bn)}–${vw(Bx)} ${u}`],['G','Gap before welding (approx.)',`${U==='mm'?'1.6':'0.06'} ${u}`]];
 const card=`<div class="pv-data">${pvDimList(`Dimensions · ${title}, NPS ${N}″`,swRows)}
  ${kv([['NPS / DN · Class',`${N}″ · DN ${DN[N]} · ${cls}`,''],['Matching pipe',`Sch ${sch} · OD ${L(D,'od')} · t ${vw(pt)}`,''],['90° / tee ctr–bottom A',v(A),u],['45° ctr–bottom C',v(C),u],['Socket depth J (min)',v(J),u],
   ['Pipe insertion ≈ J − 1.6',U==='mm'?L(J-g):L(J-g,'w'),u],['Fillet weld leg (min) ≈ 1.25 t',vw(1.25*pt),u],['NPT pitch',U==='mm'?(25.4/tpi).toFixed(3):pitch.toFixed(4),u],['Wrench make-up ≈ L1 + 3 turns',vw(L1+3*pitch),u]])}</div>`;
 const kchips=`<div class="pv-chips" role="group" aria-label="Item">${SWKINDS.map(([k,l])=>`<button data-sk="${k}" aria-pressed="${k===K}"><b>${l}</b><small>${k==='npt'?tpi+' TPI':v(k==='e45'?C:A)}</small></button>`).join('')}</div>`;
 const cchips=`<div class="pv-chips" role="group" aria-label="Class">${[['3000','Sch 80'],['6000','Sch 160']].map(([c,l])=>`<button data-sc="${c}" aria-pressed="${c===cls}" ${(c==='6000'&&SW.A6000[i]==null)?'disabled':''}><b>Class ${c}</b><small>${l}</small></button>`).join('')}</div>`;
 return `<div class="phead"><div><h1>Socket weld & threaded</h1><p>Pick a size, item and class; the drawing and dimensions update instantly. ASME B16.11 forged fittings and ASME B1.20.1 NPT threads. Lengths in ${u}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><span class="pv-step"><button class="pv-nav" data-sd="-1" aria-label="Smaller size" ${i<=0?'disabled':''}>‹</button><select class="sel" id="swN">${SWN.map(n=>`<option value="${n}"${n===N?' selected':''}>${n}″ · DN ${DN[n]}</option>`).join('')}</select><button class="pv-nav" data-sd="1" aria-label="Larger size" ${i>=SWN.length-1?'disabled':''}>›</button></span></label></div></div>
 ${miss?`<p class="note" style="margin:-4px 0 10px">NPS ${SEL}″ is outside the B16.11 range here (⅛″ to 4″); showing NPS ${N}″.</p>`:''}${cls!==SWC?`<p class="note" style="margin:-4px 0 10px">Class 6000 is not listed for NPS ${N}″; showing Class 3000.</p>`:''}
 <div class="pv-grid"><div class="pv-fig">${svg}${kchips}${cchips}</div>${card}</div>`;
}
function bindSwViewer(){
 const P=$('#p-sw');
 $('#swN').onchange=e=>setSel(e.target.value);
 P.querySelectorAll('[data-sk]').forEach(x=>x.onclick=()=>{SWK=x.dataset.sk;store.set('swk',SWK);renderSW();});
 P.querySelectorAll('[data-sc]').forEach(x=>x.onclick=()=>{SWC=x.dataset.sc;renderSW();});
 P.querySelectorAll('[data-sd]').forEach(x=>x.onclick=()=>{const i=SWN.indexOf($('#swN').value)+ +x.dataset.sd;if(SWN[i])setSel(SWN[i]);});
 const d=P.querySelector('details.pv-all');if(d)d.addEventListener('toggle',()=>{SW_OPEN=d.open;store.set('swopen',d.open?'1':'0');});
}
function renderSW(){
 const A=SWC==='3000'?SW.A3000:SW.A6000, C=SWC==='3000'?SW.C3000:SW.C6000;
 const head=['NPS','DN',`Socket bore B<small>min – max</small>`,`Depth J<small>min</small>`,`90° / tee / cross<small>ctr–bottom A</small>`,`45° elbow<small>ctr–bottom C</small>`,`Thread<small>TPI</small>`,`L1<small>hand-tight</small>`,`L2<small>effective</small>`];
 const rows=SWN.map((n,i)=>tr(n,[`<span class="dn">${DN[n]}</span>`,`${L(SW.Bmin[i],'w')} – ${L(SW.Bmax[i],'w')}`,L(SW.J[i]),L(A[i]),L(C[i]),SW.tpi[i],L(SW.L1[i],'w'),L(SW.L2[i],'w')]));
 $('#p-sw').innerHTML=swViewer()+`<details class="pv-all"${SW_OPEN?' open':''}><summary>All sizes table · Class ${SWC}</summary><div class="phead" style="margin-top:10px"><div><p>Tap a row to select that size.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Fitting class</span>${seg('swc',[['3000','3000 (Sch 80)'],['6000','6000 (Sch 160)']],SWC)}</label></div></div>
 ${tbl(head,rows)}
 <p class="note"><b>Notes.</b> Pull the pipe back about 1.6 mm (1/16″) from the socket bottom before welding to leave an expansion gap. Pipe insertion = J − 1.6 mm. Class 3000 suits Sch 80 / XS pipe, Class 6000 suits Sch 160, Class 9000 suits XXS. NPT make-up: wrench-tight engagement is roughly L1 + 3 turns.</p></details>`;
 bindSwViewer();
 bindSeg('swc',v=>{SWC=v;renderSW();});
}

/* ============================== GASKETS ============================== */
let GK_OPEN=store.get('gkopen','1')==='1';
function gasketSVG(cls,N,g){
 const VW=480,VH=268,cx=VW/2,k=(VW-2*92)/g.d4,yc=64,hw=14,hr=10;
 const X=r=>+(cx+r*k).toFixed(2),inner=swgInner(cls,N);
 const tw=s=>String(s).length*6.9+10;
 const lab=(x,y,t)=>`<rect class="pv-lblbg" x="${(x-tw(t)/2).toFixed(1)}" y="${y-12}" width="${tw(t).toFixed(1)}" height="17" rx="3"/><text class="pv-t" x="${x.toFixed(1)}" y="${y+1}" text-anchor="middle">${t}</text>`;
 /* section: both sides of the centreline */
 const band=(r0,r1,h,c,extra='')=>[1,-1].map(sg=>{const xa=X(sg*r0),xb=X(sg*r1);return `<rect class="${c}" x="${Math.min(xa,xb)}" y="${yc-h}" width="${Math.abs(xb-xa).toFixed(2)}" height="${2*h}" ${extra}/>`;}).join('');
 const chev=[1,-1].map(sg=>{const x0=Math.min(X(sg*g.d2/2),X(sg*g.d3/2)),x1=Math.max(X(sg*g.d2/2),X(sg*g.d3/2));let d='';for(let x=x0+1.5;x<x1-1;x+=3.2)d+=`M${x.toFixed(1)} ${yc-hw+1}L${(x+2.2).toFixed(1)} ${yc}L${x.toFixed(1)} ${yc+hw-1}`;return `<path class="gk-chev" d="${d}"/>`;}).join('');
 const H=(key,r,y,t)=>PDG(key,`<line class="pv-ext" x1="${X(-r)}" y1="${yc+hw+3}" x2="${X(-r)}" y2="${y+5}"/><line class="pv-ext" x1="${X(r)}" y1="${yc+hw+3}" x2="${X(r)}" y2="${y+5}"/><line class="pv-dim" x1="${X(-r)}" y1="${y}" x2="${X(r)}" y2="${y}" marker-start="url(#gkA)" marker-end="url(#gkA)"/>${lab(cx,y-4,t)}`);
 const V=(key,x,h,xFrom,t,side)=>PDG(key,`<line class="pv-ext" x1="${xFrom}" y1="${yc-h}" x2="${x+side*5}" y2="${yc-h}"/><line class="pv-ext" x1="${xFrom}" y1="${yc+h}" x2="${x+side*5}" y2="${yc+h}"/><line class="pv-dim" x1="${x}" y1="${yc-h-14}" x2="${x}" y2="${yc-h}" marker-end="url(#gkA)"/><line class="pv-dim" x1="${x}" y1="${yc+h+14}" x2="${x}" y2="${yc+h}" marker-end="url(#gkA)"/>${lab(x,yc-h-22,t)}`);
 const dims=H('d1',g.d1/2,128,`d1 ${gL(g.d1)}`)+H('d2',g.d2/2,162,`d2 ${gL(g.d2)}`)+H('d3',g.d3/2,196,`d3 ${gL(g.d3)}`)+H('d4',g.d4/2,230,`d4 ${gL(g.d4)}`)
  +V('tw',X(g.d4/2)+24,hw,X(g.d3/2)+2,`tw ${U==='mm'?'4.45':'0.175'}`,1)+V('tr',X(-g.d4/2)-24,hr,X(-g.d4/2)-2,`tr ${U==='mm'?'2.97–3.33':'0.117–0.131'}`,-1);
 return `<svg class="pv-svg gk" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Spiral wound gasket, Class ${cls} NPS ${N}: section with inner ring, winding and centering ring; click a dimension">
 <defs><marker id="gkA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="pv-ah"/></marker></defs>
 <line class="s-cl fs-cl" x1="${cx}" y1="${yc-hw-14}" x2="${cx}" y2="${VH-22}"/>
 ${band(g.d3/2,g.d4/2,hr,'gk-cr')}${band(g.d1/2,g.d2/2,hr,'gk-ir'+(inner?'':' gk-opt'))}${band(g.d2/2,g.d3/2,hw,'gk-fill')}${chev}
 ${dims}
 <text class="pv-tm" x="10" y="${VH-6}">Class ${cls} · NPS ${N}″ · section, diameters to scale, thickness enlarged</text>
 </svg>`;}
function renderGasket(){if(!$('#p-gasket'))return;
 const list=SWG_N(GKC);let N=SEL,miss=false;
 if(!list.includes(N)){miss=true;const o=PIPE.map(x=>x[0]),i=o.indexOf(SEL);N=list.reduce((b,n)=>Math.abs(o.indexOf(n)-i)<Math.abs(o.indexOf(b)-i)?n:b,list[0]);}
 const g=swg(GKC,N),inner=swgInner(GKC,N),u=ul(),i=list.indexOf(N),r=flRow(GKC,N);
 const tw_=U==='mm'?'4.45':'0.175',tr_=U==='mm'?'2.97–3.33':'0.117–0.131';
 const rows=[['d1','Inner ring ID',`${gL(g.d1)} ${u}`],['d2','Winding ID (sealing element)',`${gL(g.d2)} ${u}`],['d3','Winding OD = centering ring ID',`${gL(g.d3)} ${u}`],['d4','Centering ring OD (locates on the bolts)',`${gL(g.d4)} ${u}`],
  ['tw','Winding thickness, uncompressed',`${tw_} ${u}`],['tr','Inner and centering ring thickness',`${tr_} ${u}`]];
 const head=['NPS','DN',`d1<small>inner ring ID</small>`,`d2<small>winding ID</small>`,`d3<small>winding OD = ring ID</small>`,`d4<small>centering ring OD</small>`,`Inner ring<small>B16.20</small>`];
 const trows=list.map(n=>{const x=swg(GKC,n);return tr(n,[`<span class="dn">${DN[n]}</span>`,gL(x.d1),gL(x.d2),gL(x.d3),gL(x.d4),swgInner(GKC,n)?'<b>Required</b>':'With PTFE']);});
 $('#p-gasket').innerHTML=`<div class="phead"><div><h1>Spiral wound gaskets</h1><p>ASME B16.20 spiral wound gaskets for ASME B16.5 raised-face flanges, NPS ½–24. Click any dimension in the list or on the drawing. Lengths in ${u}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">NPS</span><span class="pv-step"><button class="pv-nav" data-gd="-1" aria-label="Smaller size" ${i<=0?'disabled':''}>‹</button><select class="sel" id="gkN">${list.map(n=>`<option value="${n}"${n===N?' selected':''}>${n}″ · DN ${DN[n]}</option>`).join('')}</select><button class="pv-nav" data-gd="1" aria-label="Larger size" ${i>=list.length-1?'disabled':''}>›</button></span></label>
 <label class="ctrl"><span class="lbl">Flange class</span>${seg('gkc',CLASSES,GKC)}</label></div></div>
 ${miss?`<p class="note" style="margin:-4px 0 10px">NPS ${SEL}″ has no B16.20 Class ${GKC} spiral wound gasket; showing NPS ${N}″.</p>`:''}
 <div class="pv-grid"><div class="pv-fig">${gasketSVG(GKC,N,g)}</div>
 <div class="pv-data">${pvDimList(`Spiral wound · NPS ${N}″ Class ${GKC}`,rows)}
 ${kv([['Inner ring',inner?'Required here':'Optional; required with PTFE',''],['Build','Wound V-strip and filler',''],
  ['Winding','304 SS standard; 316L, alloys to order',''],['Filler','Flexible graphite or PTFE',''],['Centering ring','Carbon steel',''],['Inner ring metal','Stainless, as winding',''],
  ['Mating flange',`Class ${GKC} RF · R ${L(r?r.R:null)} ${u}`,'']])}</div></div>
 <details class="pv-all"${GK_OPEN?' open':''}><summary>All sizes table · Class ${GKC}</summary>
 ${tbl(head,trows)}
 <p class="note"><b>Notes.</b> Dimensions are ASME B16.20 values for spiral wound gaskets on B16.5 flanges, in mm; inch values are conversions. Class 900 NPS ½–2½ use the Class 1500 gasket; Class 2500 is listed to NPS 12; B16.20 does not list NPS 3½. Inner rings are mandatory for Class 900 NPS 24, Class 1500 NPS 12 and larger, Class 2500 NPS 4 and larger, and for all PTFE-filled gaskets, and are good practice in vacuum, corrosive and stainless service. Materials shown are the usual standard construction; state winding metal, filler and ring materials on the order. For NPS 26 and larger (B16.47 flanges) take the gasket from B16.20 for the flange series.</p></details>`;
 bindSeg('gkc',v=>{GKC=v;renderGasket();});
 const P=$('#p-gasket');$('#gkN').onchange=e=>setSel(e.target.value);
 P.querySelectorAll('[data-gd]').forEach(b=>b.onclick=()=>{const j=list.indexOf($('#gkN').value)+ +b.dataset.gd;if(list[j])setSel(list[j]);});
 const d=P.querySelector('details.pv-all');if(d)d.addEventListener('toggle',()=>{GK_OPEN=d.open;store.set('gkopen',d.open?'1':'0');});
}

/* ============================== LINE BLINDS: figure-8, paddle blank, paddle spacer (ASME B16.48) ============================== */
/* All values mm. RF row: [NPS, A outside Ø, B spacer bore, C figure-8 centre-to-centre, t, W web width, Cp paddle centre-to-handle-end, Wp handle width].
   Class 150 NPS 16 C = 540 (one public table misprints 460). */
const BL={"150":[["1/2",45,16,60,3,38,126,32],["3/4",54,21,70,3,38,131,32],["1",64,27,80,3,38,136,32],["1-1/4",73,42,90,6.4,38,145,32],["1-1/2",83,48,100,6.4,38,145,32],["2",102,61,120,6.4,51,155,32],["2-1/2",107,73,140,6.4,51,170,32],["3",133,89,150,6.4,64,170,32],["3-1/2",159,102,175,9.7,64,202,38],["4",172,114,190,9.7,64,202,38],["5",194,141,215,9.7,76,225,38],["6",219,168,240,12.7,76,225,38],["8",276,219,300,12.7,76,267,38],["10",337,273,360,15.7,102,322,44],["12",406,324,430,19.1,102,357,44],["14",448,356,475,19.1,108,378,44],["16",511,406,540,22.4,108,410,44],["18",546,457,580,25.4,114,427,51],["20",603,508,635,28.4,121,455,51],["24",714,610,750,31.8,140,512,51]],"300":[["1/2",51,16,65,6.4,38,129,32],["3/4",64,21,80,6.4,38,136,32],["1",70,27,90,6.4,38,139,32],["1-1/4",79,42,100,6.4,38,150,32],["1-1/2",92,48,115,6.4,38,150,32],["2",108,61,125,9.7,51,158,32],["2-1/2",127,73,150,9.7,51,177,32],["3",146,89,170,9.7,64,177,32],["3-1/2",162,102,185,12.7,64,205,38],["4",178,114,200,12.7,64,205,38],["5",213,141,235,15.7,76,240,38],["6",248,168,270,15.7,76,240,38],["8",305,219,330,22.4,76,281,38],["10",359,273,385,25.4,102,333,44],["12",419,324,450,28.4,102,363,44],["14",483,356,515,31.8,108,395,44],["16",536,406,570,38.1,108,422,44],["18",594,457,630,41.1,114,450,51],["20",651,508,685,44.5,121,480,51],["24",772,610,810,50.8,140,540,51]],"600":[["1/2",51,16,65,6.4,38,129,32],["3/4",64,21,80,6.4,38,136,32],["1",70,27,90,6.4,57,139,32],["1-1/4",79,37,100,9.7,57,150,32],["1-1/2",92,43,115,9.7,67,150,32],["2",108,55,125,9.7,57,158,32],["2-1/2",127,67,150,12.7,67,177,32],["3",146,83,170,12.7,67,177,32],["3-1/2",159,96,185,15.7,76,211,38],["4",191,108,215,15.7,76,211,38],["5",238,135,265,19.1,86,248,38],["6",264,162,290,22.4,86,248,38],["8",318,212,350,28.4,95,288,38],["10",397,265,430,35.1,105,352,44],["12",454,315,490,41.1,105,381,44],["14",489,346,525,44.5,114,398,44],["16",562,397,605,50.8,124,435,44],["18",610,448,655,53.8,133,459,51],["20",679,497,725,63.5,133,493,51],["24",787,597,840,73.2,152,547,51]],"900":[["1/2",60,16,80,6.4,38,134,32],["3/4",67,21,90,6.4,41,137,32],["1",76,27,100,6.4,57,142,32],["1-1/4",86,37,110,9.7,57,151,32],["1-1/2",95,43,125,9.7,67,151,32],["2",140,55,165,12.7,57,174,32],["2-1/2",162,67,190,12.7,67,186,32],["3",165,83,190,15.7,67,186,32],["4",203,108,235,19.1,76,217,38],["5",244,135,280,22.4,86,259,38],["6",286,162,320,25.4,86,259,38],["8",356,212,395,35.1,95,307,38],["10",432,265,470,41.1,105,370,44],["12",495,315,535,47.8,105,401,44],["14",518,346,560,53.8,114,412,44],["16",572,397,615,60.5,124,440,44],["18",635,448,685,66.5,133,471,51],["20",696,497,750,73.2,133,501,51],["24",835,597,900,88.9,152,571,51]],"1500":[["1/2",61,16,80,6.4,38,135,32],["3/4",67,21,90,9.7,41,137,32],["1",76,27,100,9.7,64,142,32],["1-1/4",86,35,110,9.7,64,151,32],["1-1/2",95,41,125,12.7,70,151,32],["2",140,53,165,12.7,70,174,32],["2-1/2",162,63,190,15.7,76,190,32],["3",172,78,205,19.1,76,190,32],["4",206,102,240,22.4,89,219,38],["5",251,128,290,28.4,89,256,38],["6",279,154,320,35.1,89,256,38],["8",349,203,395,41.1,102,303,38],["10",432,255,480,50.8,114,370,44],["12",518,303,570,60.5,114,412,44],["14",575,333,635,66.5,127,442,44],["16",638,381,705,76.2,133,472,44],["18",702,429,775,85.9,146,504,51],["20",752,478,830,95.3,152,530,51],["24",899,575,990,111.3,178,603,51]],"2500":[["1/2",67,16,90,9.7,38,137,32],["3/4",73,21,95,9.7,41,140,32],["1",83,27,110,9.7,64,145,32],["1-1/4",102,35,130,12.7,64,161,32],["1-1/2",114,41,145,15.7,70,161,32],["2",143,53,170,15.7,70,175,32],["2-1/2",165,63,195,19.1,76,201,32],["3",194,78,230,22.4,76,201,32],["4",232,102,275,28.4,89,232,38],["5",276,128,325,35.1,89,273,38],["6",314,154,370,41.1,89,273,38],["8",384,198,440,53.8,102,321,38],["10",473,248,540,66.5,114,390,44],["12",546,289,620,79.2,114,427,44]]};
/* RTJ (ring groove both faces, two R-rings) row, converted from a published B16.48 RTJ line-blank table (USA Industries spec, inch):
   [NPS, ring no., P groove pitch Ø, A OD, B bore, t, C centre-to-centre (= bolt circle), L paddle handle length beyond OD, W1 handle width, W2 web width, bolt hole]. */
const BLJ={"150":[["1","R-15",47.6,63.5,33.5,19,79.2,101.6,25.4,50.8,15.9],["1-1/4","R-17",57.1,73.2,42.2,19,88.9,101.6,25.4,50.8,15.9],["1-1/2","R-19",65.1,82.5,48.3,19,98.6,101.6,25.4,57.1,15.9],["2","R-22",82.5,101.6,60.5,19,120.6,101.6,25.4,57.1,19],["2-1/2","R-25",101.6,120.6,73.2,22.4,139.7,101.6,25.4,57.1,19],["3","R-29",114.3,133.3,88.9,22.4,152.4,101.6,25.4,57.1,19],["3-1/2","R-33",131.8,153.9,101.6,22.4,177.8,101.6,25.4,63.5,19],["4","R-36",149.2,171.4,114.3,22.4,190.5,101.6,25.4,63.5,19],["5","R-40",171.4,193.5,141.2,25.4,215.9,127,25.4,69.8,22.2],["6","R-43",193.7,218.9,168.1,25.4,241.3,127,25.4,82.5,22.2],["8","R-48",247.6,273.1,218.9,28.4,298.4,127,25.4,95.2,22.2],["10","R-52",304.8,330.2,273.1,31.8,361.9,127,25.4,101.6,25.4],["12","R-56",381,406.4,323.8,35.1,431.8,152.4,38.1,120.6,25.4],["14","R-59",396.9,425.4,355.6,35.1,476.2,152.4,38.1,127,28.6],["16","R-64",454,482.6,406.4,38.1,539.8,152.4,38.1,127,28.6],["18","R-68",517.5,546.1,457.2,41.1,577.9,152.4,38.1,127,31.8],["20","R-72",558.8,596.9,508,41.1,635,177.8,38.1,127,31.8],["24","R-76",673.1,711.2,609.6,47.8,749.3,177.8,38.1,152.4,35.1]],"300":[["1/2","R-11",34.1,50.8,21.3,15.7,66.5,101.6,25.4,38.1,15.9],["3/4","R-13",42.9,63.5,26.7,19,82.5,101.6,25.4,44.4,19],["1","R-16",50.8,69.8,33.5,19,88.9,101.6,25.4,50.8,19],["1-1/4","R-18",60.3,79.2,42.2,22.4,98.6,101.6,25.4,50.8,19],["1-1/2","R-20",68.3,90.4,48.3,22.4,114.3,101.6,25.4,57.1,22.2],["2","R-23",82.5,107.9,60.5,25.4,127,101.6,25.4,57.1,19],["2-1/2","R-26",101.6,127,73.2,28.4,149.4,101.6,25.4,57.1,22.2],["3","R-31",123.8,146,88.9,28.6,168.1,101.6,25.4,57.1,22.2],["3-1/2","R-34",131.8,158.8,101.6,28.4,184.1,101.6,25.4,63.5,22.2],["4","R-37",149.2,174.8,114.3,31.8,200.2,127,25.4,63.5,22.2],["5","R-41",181,209.5,141.2,35.1,234.9,127,25.4,69.8,22.2],["6","R-45",211.1,241.3,168.1,35.1,269.7,127,25.4,82.5,22.2],["8","R-49",269.9,301.8,218.9,41.1,330.2,127,25.4,95.2,25.4],["10","R-53",323.8,355.6,273.1,44.4,387.3,127,25.4,101.6,28.6],["12","R-57",381,412.8,323.8,50.8,450.8,152.4,38.1,120.6,31.8],["14","R-61",419.1,457.2,355.6,53.8,514.4,152.4,38.1,127,31.8],["16","R-65",469.9,508,406.4,57.1,571.5,152.4,38.1,127,34.9],["18","R-69",533.4,574.5,457.2,60.5,628.6,177.8,38.1,127,34.9],["20","R-73",584.2,635,508,69.8,685.8,177.8,38.1,127,34.9],["24","R-77",692.1,749.3,609.6,79.2,812.8,177.8,38.1,152.4,41.3]],"600":[["1/2","R-11",34.1,50.8,21.3,19,66.5,101.6,25.4,38.1,15.9],["3/4","R-13",42.9,63.5,26.7,22.4,82.5,101.6,25.4,44.4,19],["1","R-16",50.8,69.8,33.5,22.4,88.9,101.6,25.4,50.8,19],["1-1/4","R-18",60.3,79.2,42.2,22.4,98.6,101.6,25.4,50.8,19],["1-1/2","R-20",68.3,90.4,48.3,22.4,114.3,101.6,25.4,57.1,22.2],["2","R-23",82.5,107.9,60.5,28.4,127,101.6,25.4,57.1,19],["2-1/2","R-26",101.6,127,73.2,31.8,149.4,101.6,25.4,57.1,22.2],["3","R-31",123.8,146,88.9,31.8,168.1,101.6,25.4,57.1,22.2],["3-1/2","R-34",131.8,158.8,101.6,35.1,184.1,101.6,25.4,63.5,25.4],["4","R-37",149.2,174.8,114.3,35.1,215.9,127,25.4,63.5,25.4],["5","R-41",181,209.5,141.2,38.1,266.7,127,25.4,69.8,28.6],["6","R-45",211.1,241.3,168.1,44.4,292.1,127,25.4,82.5,28.6],["8","R-49",269.9,301.8,218.9,50.8,349.2,152.4,25.4,95.2,31.8],["10","R-53",323.8,355.6,273.1,57.1,431.8,152.4,25.4,101.6,34.9],["12","R-57",381,412.8,323.8,63.5,488.9,152.4,38.1,120.6,34.9],["14","R-61",419.1,457.2,355.6,66.5,527,152.4,38.1,127,38.1],["16","R-65",469.9,508,406.4,73.2,603.2,177.8,38.1,127,41.3],["18","R-69",533.4,574.5,457.2,79.2,654,177.8,38.1,127,44.4],["20","R-73",584.2,635,508,88.9,723.9,177.8,38.1,127,44.4],["24","R-77",692.1,749.3,609.6,104.6,838.2,203.2,38.1,152.4,50.8]],"900":[["1/2","R-12",39.7,60.5,21.3,22.4,82.5,127,25.4,38.1,22.2],["3/4","R-14",44.4,66.5,26.7,22.4,88.9,127,25.4,44.4,22.2],["1","R-16",50.8,71.4,33.5,22.4,101.6,127,25.4,50.8,25.4],["1-1/4","R-18",60.3,81,42.2,25.4,111.3,127,25.4,50.8,25.4],["1-1/2","R-20",68.3,91.9,48.3,25.4,124,127,25.4,63.5,28.6],["2","R-24",95.2,124,60.5,31.8,165.1,127,25.4,50.8,25.4],["2-1/2","R-27",107.9,136.7,73.2,35.1,190.5,152.4,25.4,66.5,28.6],["3","R-31",123.8,155.4,88.9,35.1,190.5,152.4,25.4,66.5,25.4],["4","R-37",149.2,180.8,114.3,41.1,234.9,152.4,25.4,73.2,31.8],["5","R-41",181,215.9,141.2,44.4,279.4,152.4,25.4,73.2,34.9],["6","R-45",211.1,241.3,168.1,47.8,317.5,152.4,25.4,73.2,31.8],["8","R-49",269.9,307.8,218.9,57.1,393.7,177.8,25.4,79.2,38.1],["10","R-53",323.8,361.9,273.1,63.5,469.9,177.8,25.4,120.6,38.1],["12","R-57",381,419.1,323.8,73.2,533.4,177.8,38.1,120.6,38.1],["14","R-62",419.1,466.9,355.6,82.5,558.8,177.8,38.1,120.6,41.3],["16","R-66",469.9,523.7,406.4,91.9,615.9,177.8,38.1,127,44.4],["18","R-70",533.4,593.9,457.2,101.6,685.8,203.2,38.1,133.3,50.8],["20","R-74",584.2,647.7,508,111.3,749.3,203.2,38.1,127,54],["24","R-78",692.1,771.7,609.6,133.3,901.7,203.2,38.1,139.7,66.7]],"1500":[["1/2","R-12",39.7,60.5,21.3,22.4,82.5,127,25.4,38.1,22.2],["3/4","R-14",44.4,66.5,26.7,25.4,88.9,127,25.4,44.4,22.2],["1","R-16",50.8,71.4,33.5,25.4,101.6,127,25.4,50.8,25.4],["1-1/4","R-18",60.3,81,42.2,25.4,111.3,127,25.4,53.8,25.4],["1-1/2","R-20",68.3,91.9,48.3,28.4,124,127,25.4,57.1,28.6],["2","R-24",95.2,124,60.5,35.1,165.1,127,25.4,53.8,25.4],["2-1/2","R-27",107.9,136.7,73.2,38.1,190.5,152.4,25.4,57.1,28.6],["3","R-35",136.5,168.1,88.9,44.4,203.2,152.4,25.4,73.2,31.8],["4","R-39",161.9,193.5,114.3,47.8,241.3,152.4,25.4,76.2,34.9],["5","R-44",193.7,228.6,141.2,53.8,292.1,152.4,25.4,76.2,41.3],["6","R-46",211.1,247.6,168.1,60.5,317.5,152.4,25.4,79.2,38.1],["8","R-50",269.9,317.5,218.9,73.2,393.7,177.8,25.4,85.9,44.4],["10","R-54",323.8,371.3,273.1,82.5,482.6,203.2,25.4,133.3,50.8],["12","R-58",381,438.1,323.8,101.6,571.5,203.2,38.1,133.3,54],["14","R-63",419.1,488.9,355.6,111.3,635,228.6,38.1,139.7,60.3],["16","R-67",469.9,546.1,406.4,124,704.8,228.6,38.1,146,66.7],["18","R-71",533.4,612.6,457.2,133.3,774.7,254,38.1,152.4,73],["20","R-75",584.2,673.1,508,142.7,831.8,254,38.1,165.1,79.4],["24","R-79",692.1,793.8,609.6,168.1,990.6,254,38.1,177.8,92.1]],"2500":[["1/2","R-13",42.9,65,21.3,25.4,88.9,127,25.4,38.1,22.2],["3/4","R-16",50.8,73.2,26.7,28.4,95.2,127,25.4,44.4,22.2],["1","R-18",60.3,82.5,33.5,28.4,107.9,127,25.4,53.8,25.4],["1-1/4","R-21",72.2,101.6,42.2,35.1,130,127,25.4,53.8,28.6],["1-1/2","R-23",82.5,114.3,48.3,38.4,146,127,25.4,60.5,31.8],["2","R-26",101.6,133.3,60.5,41.1,171.4,127,25.4,57.1,28.6],["2-1/2","R-28",111.1,149.4,73.2,47.8,196.8,152.4,25.4,60.5,31.8],["3","R-32",127,168.1,88.9,50.8,228.6,152.4,25.4,76.2,34.9],["4","R-38",157.2,203.2,114.3,63.5,273.1,177.8,25.4,82.5,41.3],["5","R-42",190.5,241.3,141.2,73.2,323.8,177.8,25.4,88.9,47.6],["6","R-47",228.6,279.4,168.1,82.5,368.3,203.2,25.4,95.2,54],["8","R-51",279.4,339.9,218.9,98.6,438.1,203.2,25.4,95.2,54],["10","R-55",342.9,425.4,273.1,117.3,539.8,228.6,38.1,90.9,66.7],["12","R-60",406.4,495.3,323.8,133.3,619.3,228.6,38.1,152.4,73]]};
const BLFACE=[['RF','Raised face'],['FF','Flat face'],['RTJ','Ring joint']];
const BLKIND=[['fig8','Figure-8'],['blank','Paddle blank'],['spacer','Paddle spacer']];
let BLC=store.get('blc','150'),BLF=store.get('blf','RF'),BLOPEN={f8:false,pd:false};
try{Object.assign(BLOPEN,JSON.parse(store.get('blopen','{}')));}catch(e){}
const BLRHO=7.85e-6;
const blFaces=c=>+c<=300?['RF','FF','RTJ']:['RF','RTJ'];
function blRow(cls,n,face){const r=(BL[cls]||[]).find(x=>x[0]===n);if(!r)return null;const f=flRow(cls,n);
 const o={n,A:r[1],B:r[2],C:r[3],t:r[4],W:r[5],Cp:r[6],Wp:r[7],hole:f?(f.dv+0.125)*25.4:null,nb:f?f.n:null,BC:f?f.BC*25.4:null,O:f?f.O*25.4:null,face};
 if(face==='FF'){if(!f)return null;o.A=o.O;}
 if(face==='RTJ'){const j=(BLJ[cls]||[]).find(x=>x[0]===n);if(!j)return null;[,o.ring,o.P,o.A,o.B,o.t,o.C]=j;o.Cp=j[3]/2+j[7];o.Wp=j[8];o.W=j[9];o.hole=j[10];}
 const disc=d=>Math.PI/4*d*d,holes=face==='FF'&&o.hole?o.nb*disc(o.hole):0,ht=o.t;
 o.wFig=((disc(o.A)-holes)*2-disc(o.B)+o.W*Math.max(o.C-o.A,0))*o.t*BLRHO;
 const han=o.Wp*Math.max(o.Cp-o.A/2,0)*ht*BLRHO;o.wBlank=(disc(o.A)-holes)*o.t*BLRHO+han;o.wSpacer=(disc(o.A)-holes-disc(o.B))*o.t*BLRHO+han;
 return o;}
const blL=(mm,k)=>mm==null||isNaN(mm)?NA:U==='mm'?(k==='t'||k==='h'?mm.toFixed(1):Math.round(mm).toString()):(mm/25.4).toFixed(2);
const blWt=kg=>{const v=U==='mm'?kg:kg*2.2046;return v<10?v.toFixed(1):Math.round(v).toString();};
const blWu=()=>U==='mm'?'kg':'lb';

/* ---------- 2D drawings (front view + edge view; click a dimension) ---------- */
function svgBlind(kind,face,on){
 const ff=face==='FF',rj=face==='RTJ',r=ff?70:58,cy=120;
 const boltRing=(cx)=>ff?Array.from({length:8},(_,i)=>{const a=(i+.5)/8*2*Math.PI;return `<circle cx="${(cx+r*.8*Math.cos(a)).toFixed(1)}" cy="${(cy+r*.8*Math.sin(a)).toFixed(1)}" r="5" fill="var(--sheet)" class="s-ink"/>`;}).join(''):'';
 const groove=(cx)=>rj?`<circle cx="${cx}" cy="${cy}" r="${r*.78}" fill="none" stroke="var(--muted)" stroke-width="5" opacity=".55"/>`:'';
 const lbl=(x,t)=>`<text x="${x}" y="${cy+r+16}" text-anchor="middle" fill="var(--muted)" font-family="var(--f-mono)" font-size="9">${t}</text>`;
 const edge=(x,top,bot)=>`<rect class="s-fill" x="${x}" y="${top}" width="10" height="${bot-top}"/>`+DG('t',`<line class="hit" x1="${x}" y1="${top-14}" x2="${x+10}" y2="${top-14}"/><line class="s-dim" x1="${x}" y1="${top-14}" x2="${x+10}" y2="${top-14}"/><line class="s-dim" x1="${x}" y1="${top-19}" x2="${x}" y2="${top-6}"/><line class="s-dim" x1="${x+10}" y1="${top-19}" x2="${x+10}" y2="${top-6}"/><text class="t-dim" x="${x+5}" y="${top-23}" text-anchor="middle">t</text>`,on)+`<text x="${x+5}" y="${bot+14}" text-anchor="middle" fill="var(--muted)" font-family="var(--f-mono)" font-size="9">EDGE</text>`;
 const dA=(cx)=>DG('A',`<line class="hit" x1="${cx-r}" y1="${cy-r-14}" x2="${cx+r}" y2="${cy-r-14}"/><line class="s-dim" x1="${cx-r}" y1="${cy-r-14}" x2="${cx+r}" y2="${cy-r-14}"/><line class="s-dim" x1="${cx-r}" y1="${cy-r-19}" x2="${cx-r}" y2="${cy-4}"/><line class="s-dim" x1="${cx+r}" y1="${cy-r-19}" x2="${cx+r}" y2="${cy-r+20}"/><text class="t-dim" x="${cx}" y="${cy-r-19}" text-anchor="middle">A</text>`,on);
 const dB=(cx,rb,left)=>DG('B',`<line class="hit" x1="${cx-rb}" y1="${cy-10}" x2="${cx+rb}" y2="${cy-10}"/><line class="s-dim" x1="${cx-rb}" y1="${cy-10}" x2="${cx+rb}" y2="${cy-10}"/>`+(left
  ?`<line class="s-dim" x1="${cx-rb}" y1="${cy-10}" x2="${cx-r-8}" y2="${cy-10}" stroke-dasharray="2 2"/><text class="t-dim" x="${cx-r-10}" y="${cy-14}" text-anchor="end">B</text>`
  :`<line class="s-dim" x1="${cx}" y1="${cy-10}" x2="${cx}" y2="${cy-r-1}"/><text class="t-dim" x="${cx}" y="${cy-r-4}" text-anchor="middle">B</text>`),on);
 const dP=(cx)=>rj?DG('P',`<line class="hit" x1="${cx}" y1="${cy}" x2="${cx+r*.78*.707}" y2="${cy-r*.78*.707}"/><line class="s-dim" x1="${cx}" y1="${cy}" x2="${(cx+r*.78*.707).toFixed(1)}" y2="${(cy-r*.78*.707).toFixed(1)}"/><text class="t-dim" x="${cx}" y="${cy+22}" text-anchor="middle">½P ring</text>`,on):'';
 const dBC=(cx)=>ff?DG('BC',`<line class="hit" x1="${cx}" y1="${cy}" x2="${(cx-r*.8*.92).toFixed(1)}" y2="${(cy+r*.8*.38).toFixed(1)}"/><line class="s-dim" x1="${cx}" y1="${cy}" x2="${(cx-r*.8*.92).toFixed(1)}" y2="${(cy+r*.8*.38).toFixed(1)}"/><text class="t-dim" x="${cx-r*.3}" y="${cy+r*.3+16}" text-anchor="middle">½BC</text>`,on):'';
 if(kind==='fig8'){const x1=r+34,x2=x1+2*r+60,wx=(x1+x2)/2,rb=r*.62,top=cy-r,bot=cy+r,W=r*.55;
  return `<svg viewBox="0 0 ${x2+r+60} ${cy+r+46}" role="img" aria-label="Figure-8 blind, ${face}; click a dimension">
  <line class="s-cl" x1="12" y1="${cy}" x2="${x2+r+16}" y2="${cy}"/>
  <path class="s-fill" fill-rule="evenodd" d="M${x1} ${cy-r}a${r} ${r} 0 1 0 0.01 0z M${x1+r-4} ${cy-W/2}h${x2-x1-2*r+8}v${W}h-${x2-x1-2*r+8}z M${x2} ${cy-r}a${r} ${r} 0 1 0 0.01 0z M${x2} ${cy-rb}a${rb} ${rb} 0 1 0 0.01 0z"/>
  ${groove(x1)}${groove(x2)}${boltRing(x1)}${boltRing(x2)}
  <line class="s-cl" x1="${x1}" y1="${cy-r-6}" x2="${x1}" y2="${cy+r+30}"/><line class="s-cl" x1="${x2}" y1="${cy-r-6}" x2="${x2}" y2="${cy+r+30}"/>
  ${DG('D',`<circle cx="${wx}" cy="${cy}" r="7" fill="var(--sheet)" class="s-ink"/><line class="hit" x1="${wx+5}" y1="${cy-5}" x2="${wx+10}" y2="${cy-r+6}"/><line class="s-dim" x1="${wx+5}" y1="${cy-5}" x2="${wx+10}" y2="${cy-r+6}"/><text class="t-dim" x="${wx+10}" y="${cy-r+2}" text-anchor="middle">D</text>`,on)}
  ${dA(x1)}${dB(x2,rb)}${dP(x1)}${dBC(x1)}
  ${DG('C',`<line class="hit" x1="${x1}" y1="${cy+r+26}" x2="${x2}" y2="${cy+r+26}"/><line class="s-dim" x1="${x1}" y1="${cy+r+26}" x2="${x2}" y2="${cy+r+26}"/><text class="t-dim" x="${wx}" y="${cy+r+40}" text-anchor="middle">C centre to centre</text>`,on)}
  ${DG('W',`<line class="hit" x1="${wx-14}" y1="${cy-W/2}" x2="${wx-14}" y2="${cy+W/2}"/><line class="s-dim" x1="${wx-14}" y1="${cy-W/2}" x2="${wx-14}" y2="${cy+W/2}"/><text class="t-dim" x="${wx}" y="${cy+W/2+13}" text-anchor="middle">W</text>`,on)}
  ${lbl(x1,'BLANK')}${lbl(x2,'SPACER')}${edge(x2+r+30,top,bot)}</svg>`;}
 const sp=kind==='spacer',cx=r+34,hx=cx+r*2.05,rb=r*.62,Wh=r*.36,top=cy-r,bot=cy+r,vw=4*r+154;
 return `<svg viewBox="${-(vw-hx-60)/2} 0 ${vw} ${cy+r+46}" role="img" aria-label="Paddle ${sp?'spacer':'blank'}, ${face}; click a dimension">
 <line class="s-cl" x1="12" y1="${cy}" x2="${hx+14}" y2="${cy}"/>
 <path class="s-fill" fill-rule="evenodd" d="M${cx} ${cy-r}a${r} ${r} 0 1 0 0.01 0z M${cx+r-4} ${cy-Wh/2}H${hx}v${Wh}H${cx+r-4}z${sp?` M${cx} ${cy-rb}a${rb} ${rb} 0 1 0 0.01 0z M${hx-12} ${cy-5}a5 5 0 1 0 0.01 0z`:''}"/>
 ${groove(cx)}${boltRing(cx)}
 <line class="s-cl" x1="${cx}" y1="${cy-r-6}" x2="${cx}" y2="${cy+r+30}"/>
 ${dA(cx)}${sp?dB(cx,rb,true):''}${dP(cx)}${dBC(cx)}
 ${DG('C',`<line class="hit" x1="${cx}" y1="${cy+r+26}" x2="${hx}" y2="${cy+r+26}"/><line class="s-dim" x1="${cx}" y1="${cy+r+26}" x2="${hx}" y2="${cy+r+26}"/><line class="s-dim" x1="${hx}" y1="${cy+Wh/2+2}" x2="${hx}" y2="${cy+r+31}"/><text class="t-dim" x="${(cx+hx)/2}" y="${cy+r+40}" text-anchor="middle">C centre to handle end</text>`,on)}
 ${DG('W',`<line class="hit" x1="${hx-30}" y1="${cy-Wh/2}" x2="${hx-30}" y2="${cy+Wh/2}"/><line class="s-dim" x1="${hx-30}" y1="${cy-Wh/2}" x2="${hx-30}" y2="${cy+Wh/2}"/><text class="t-dim" x="${hx-18}" y="${cy-Wh/2-6}" text-anchor="middle">W</text>`,on)}
 ${sp?DG('ID',`<line class="hit" x1="${hx-12}" y1="${cy+5}" x2="${hx-12}" y2="${cy+38}"/><line class="s-dim" x1="${hx-12}" y1="${cy+5}" x2="${hx-12}" y2="${cy+38}"/><text class="t-dim" data-fixed="1" x="${hx-5}" y="${cy+50}" text-anchor="end">ID Ø12 min.</text>`,on):`<text x="${(cx+r+hx)/2}" y="${cy+Wh/2+14}" text-anchor="middle" fill="var(--muted)" font-family="var(--f-mono)" font-size="9">SOLID</text>`}
 ${edge(hx+30,top,bot)}</svg>`;}

/* ---------- 3D model (true scale, mm) ---------- */
function buildBlind3D(kind,cls,n,face){const o=blRow(cls,n,face);if(!o)return {faces:[]};const C=M3.colors(),col=C.steel,dk=C.dark,t=o.t;
 const gw=Math.max(6,o.A*.035);
 const disc=(x,ri)=>{if(face!=='RTJ'||!o.P)return M3.revolve([[ri,0],[o.A/2,0],[o.A/2,t],[ri,t]],col,'z',64,true,[x,0,0]);
  const g0=o.P/2-gw/2,g1=o.P/2+gw/2,R=(p,c)=>M3.revolve(p,c,'z',64,false,[x,0,0]);
  return [].concat(R([[ri,0],[g0,0]],col),R([[g0,0],[g1,0]],dk),R([[g1,0],[o.A/2,0],[o.A/2,t],[g1,t]],col),R([[g1,t],[g0,t]],dk),R([[g0,t],[ri,t]],col),ri>0?R([[ri,t],[ri,0]],col):[]);};
 const marks=(x)=>{let F=[];const dot=(px,py,rr,c2)=>{F=F.concat(M3.revolve([[0,-.5],[rr,-.5]],c2,'z',18,false,[px,py,0]),M3.revolve([[0,t+.5],[rr,t+.5]],c2,'z',18,false,[px,py,0]));};
  if(face==='FF'&&o.hole)for(let i=0;i<o.nb;i++){const a=(i+.5)/o.nb*2*Math.PI;dot(x+o.BC/2*Math.cos(a),o.BC/2*Math.sin(a),o.hole/2,dk);}
  return {F};};
 let F=[];
 if(kind==='fig8'){F=F.concat(disc(0,0),disc(o.C,o.B/2),M3.box(o.A/2*.92,-o.W/2,0,o.C-o.A/2*.92,o.W/2,t,col),marks(0).F,marks(o.C).F);
  if(o.hole)F=F.concat(M3.revolve([[0,-.5],[o.hole/2,-.5]],dk,'z',18,false,[o.C/2,0,0]),M3.revolve([[0,t+.5],[o.hole/2,t+.5]],dk,'z',18,false,[o.C/2,0,0]));}
 else{const sp=kind==='spacer';F=F.concat(disc(0,sp?o.B/2:0),M3.box(o.A/2*.92,-o.Wp/2,0,o.Cp,o.Wp/2,t,col),marks(0).F);
  if(sp)F=F.concat(M3.revolve([[0,-.5],[6,-.5]],dk,'z',18,false,[o.Cp-12,0,0]),M3.revolve([[0,t+.5],[6,t+.5]],dk,'z',18,false,[o.Cp-12,0,0]));}
 return {faces:F};}

function renderBlind(){if(!$('#p-blind'))return;
 if(!blFaces(BLC).includes(BLF))BLF='RF';
 const cls=BLC,face=BLF,rowsAll=BL[cls].map(r=>blRow(cls,r[0],face)).filter(Boolean);
 const has=n=>rowsAll.some(o=>o.n===n),n=has(SEL)?SEL:(has('6')?'6':rowsAll[rowsAll.length-1].n);
 const fName=BLFACE.find(f=>f[0]===face)[1];
 const ctl=`<div class="ctrls">
  <label class="ctrl"><span class="lbl">Size (NPS)</span><select class="sel" id="blN">${rowsAll.map(o=>`<option value="${o.n}"${o.n===n?' selected':''}>${o.n}″ (DN ${DN[o.n]})</option>`).join('')}</select></label>
  <label class="ctrl"><span class="lbl">Pressure class</span>${seg('blc',Object.keys(BL),cls)}</label>
  <label class="ctrl"><span class="lbl">Face type</span>${seg('blf',BLFACE.filter(f=>blFaces(cls).includes(f[0])),face)}</label></div>`;
 const isRJ=face==='RTJ',isFF=face==='FF',wu=blWu();
 const h1=['NPS','DN',`A<small>${isFF?'OD = flange OD':'outside Ø'}</small>`,...(isRJ?[`Ring<small>R no.</small>`,`P<small>groove pitch Ø</small>`]:[]),`B<small>spacer bore</small>`,`C<small>centre–centre</small>`,`t<small>thickness</small>`,`W<small>web width</small>`,`D<small>web hole</small>`,...(isFF?[`Bolt holes<small>no. × Ø</small>`]:[]),`Weight<small>≈ ${wu}, CS</small>`];
 const r1=rowsAll.map(o=>tr(o.n,[`<span class="dn">${DN[o.n]}</span>`,blL(o.A),...(isRJ?[o.ring,blL(o.P,'h')]:[]),blL(o.B),blL(o.C),blL(o.t,'t'),blL(o.W),blL(o.hole,'h'),...(isFF?[`${o.nb} × ${blL(o.hole,'h')}`]:[]),blWt(o.wFig)]));
 const h2=['NPS','DN',`A<small>outside Ø</small>`,...(isRJ?[`Ring<small>R no.</small>`,`P<small>groove pitch Ø</small>`]:[]),`B<small>spacer bore</small>`,`C<small>centre–handle end</small>`,`t<small>thickness</small>`,`W<small>handle width</small>`,`Blank<small>≈ ${wu}, CS</small>`,`Spacer<small>≈ ${wu}, CS</small>`];
 const r2=rowsAll.map(o=>tr(o.n,[`<span class="dn">${DN[o.n]}</span>`,blL(o.A),...(isRJ?[o.ring,blL(o.P,'h')]:[]),blL(o.B),blL(o.Cp),blL(o.t,'t'),blL(o.Wp),blWt(o.wBlank),blWt(o.wSpacer)]));
 const sub=`<small style="font-family:var(--f-mono);font-size:12px;color:var(--muted);font-weight:400;margin-left:6px">B16.48 · Class ${cls} · ${face}</small>`;
 const faceNote={RF:'The blind sits on the flange raised face inside the bolts, with a gasket each side.',
  FF:'Class 150 and 300 only. A full-face blind with OD = flange OD and all the bolt holes, for flat-faced flanges such as cast iron or non-metallic mating equipment. t, B, C and W are taken from the B16.48 RF table; confirm with your piping class.',
  RTJ:'The blind carries a ring groove on each face at pitch Ø P for the R-ring of the flange, so A and t are larger than RF. Ring numbers are the B16.5 / B16.20 R-rings for that size and class. RTJ values are from a published B16.48 female (grooved both faces) table; paddle C is A/2 plus that table’s handle length.'}[face];
 $('#p-blind').innerHTML=`<div class="phead"><div><h1>Figure-8 & paddle blinds</h1><p>ASME B16.48 line blanks for ASME B16.5 flanges: figure-8 (spectacle) blinds, paddle blanks and paddle spacers. Pick the size, class and face type; the drawing, values and tables update. Lengths in ${ul()}.</p></div>${ctl}</div>
 ${mpHTML('bl')}
 <p class="note" style="margin:0 0 12px"><b>${fName}.</b> ${faceNote}</p>
 <details class="pv-all bl-tbl" data-k="f8" style="margin-top:16px"${BLOPEN.f8?' open':''}><summary>Figure-8 (spectacle) blinds: all sizes${sub}</summary><div style="margin-top:10px">${tbl(h1,r1)}</div></details>
 <details class="pv-all bl-tbl" data-k="pd" style="margin-top:16px"${BLOPEN.pd?' open':''}><summary>Paddle blanks & paddle spacers: all sizes${sub}</summary><div style="margin-top:10px">${tbl(h2,r2)}</div></details>
 <p class="note"><b>Notes.</b> The figure-8 web crosses the bolt circle, so D takes one flange bolt and the blind swings on it; D is the B16.5 flange bolt hole (bolt Ø + 3.2 mm). Web and handle thickness is 6 mm min. (or t if t is less). The paddle spacer handle has one Ø12 mm min. indicator hole near its end; the paddle blank handle is solid, so an open line can be told from a blanked one at a glance. Weights are estimates for carbon steel with the web or handle at full thickness t, so they are slightly high: use them for handling and davit checks, not for MTO. B16.48 covers NPS ½ to 24 (Class 2500 to NPS 12); for larger sizes size the blank to ASME B31.3 para. 304.5.3, t = d<sub>g</sub>·√(3P / 16SEW) + c. Values are compiled from public B16.48 tables: verify against the current edition of ASME B16.48 and your piping class before issue.</p>`;
 bindSeg('blc',v=>{BLC=v;store.set('blc',v);renderBlind();});
 bindSeg('blf',v=>{BLF=v;store.set('blf',v);renderBlind();});
 document.querySelectorAll('#p-blind details.bl-tbl').forEach(d=>d.addEventListener('toggle',()=>{BLOPEN[d.dataset.k]=d.open;store.set('blopen',JSON.stringify(BLOPEN));}));
 const ns=$('#blN');if(ns)ns.onchange=e=>setSel(e.target.value);
 mpInit('bl');
}

function mpDataBl(){const K=MPS.bl.kind||'fig8',face=BLF,cls=BLC;const ok=n=>!!blRow(cls,n,face);
 const list=BL[cls].map(r=>r[0]).filter(ok),n=list.includes(SEL)?SEL:(list.includes('6')?'6':list[list.length-1]),o=blRow(cls,n,face),u=' '+ul();
 const v=(x,k)=>blL(x,k)+u,rj=face==='RTJ',ff=face==='FF';let rows=[['A',ff?'Outside diameter (= flange OD)':'Outside diameter',v(o.A)]];
 if(rj)rows.push(['P','Ring groove pitch diameter, ring '+o.ring,v(o.P,'h')]);
 if(K==='fig8')rows=rows.concat([['B','Spacer end bore',v(o.B)],['C','Centre to centre',v(o.C)],['t','Thickness',v(o.t,'t')],['W','Web width',v(o.W)],['D','Web bolt hole (pivot bolt)',v(o.hole,'h')]]);
 else rows=rows.concat(K==='spacer'?[['B','Bore',v(o.B)]]:[]).concat([['C','Centre to handle end',v(o.Cp)],['t','Thickness',v(o.t,'t')],['W','Handle width',v(o.Wp)]]).concat(K==='spacer'?[['ID','Indicator hole in handle','12 mm min.']]:[]);
 if(ff)rows.push(['BC',`Bolt circle, ${o.nb} holes × ${blL(o.hole,'h')}${u}`,v(o.BC)]);
 rows.push(['Wt','Weight, carbon steel (approx.)',blWt(K==='fig8'?o.wFig:K==='blank'?o.wBlank:o.wSpacer)+' '+blWu()]);
 const nm={fig8:'Figure-8 (spectacle) blind',blank:'Paddle blank',spacer:'Paddle spacer'}[K];
 return {title:nm,ctx:`NPS ${npsLbl(n)} · Class ${cls} · ${face}`,kinds:BLKIND,svg:on=>svgBlind(K,face,on),build:()=>buildBlind3D(K,cls,n,face),rows,
  note:'Click a dimension in the list or on the drawing. Size follows the size picker, Highlight NPS (top bar) or a clicked table row. 3D: drawn to scale from the B16.48 table; drag to rotate, scroll to zoom, double-click to reset.'};}

/* ============================== P-T ============================== */
let PTU='bar', PTGRP=store.get('ptg','1.1');if(!PTG[PTGRP])PTGRP='1.1';
function renderPT(){if(!$('#p-pt'))return;
 const g=PTG[PTGRP];let head,rows,conv=false;
 const cell=x=>x==null?NA:x;
 if(PTU==='bar'&&g.C){head=['Temp °C',...CLASSES.map(c=>`Class ${c}<small>bar(g)</small>`)];rows=g.TC.map((t,i)=>`<tr><td>${i===0?'−29 to 38':t}</td>${CLASSES.map(c=>`<td>${g.C[c][i].toFixed(1)}</td>`).join('')}</tr>`);}
 else if(PTU==='bar'){conv=true;head=['Temp °F (°C)',...CLASSES.map(c=>`Class ${c}<small>bar(g), converted</small>`)];rows=g.TF.map((t,i)=>`<tr><td>${i===0?'−20 to 100 (−29 to 38)':`${t} (${Math.round((t-32)*5/9)})`}</td>${CLASSES.map(c=>`<td>${cell(g.F[c][i]==null?null:(g.F[c][i]*PSI2BAR).toFixed(1))}</td>`).join('')}</tr>`);}
 else{head=['Temp °F',...CLASSES.map(c=>`Class ${c}<small>psig</small>`)];rows=g.TF.map((t,i)=>`<tr><td>${i===0?'−20 to 100':t}</td>${CLASSES.map(c=>`<td>${cell(g.F[c][i])}</td>`).join('')}</tr>`);}
 const ed=g.C?(PTU==='bar'?'ASME B16.5 metric Table 2-1.1 (bar, °C)':'ASME B16.5-2025, US customary table (psig, °F)'):PTU==='bar'?'ASME B16.5-2025 US customary table (psig, °F), converted to bar':'ASME B16.5-2025, US customary table (psig, °F)';
 $('#p-pt').innerHTML=`<div class="phead"><div><h1>Pressure–temperature ratings · Group ${PTGRP}</h1><p>ASME B16.5 ratings depend on the flange material group. The values below apply <b>only</b> to Material Group ${PTGRP}: ${g.mats}. Pick the group that matches your flange material.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Material group</span>${seg('ptg',Object.keys(PTG).map(k=>[k,PTG[k].lbl]),PTGRP)}</label><label class="ctrl"><span class="lbl">Units</span>${seg('ptu',[['bar','bar / °C'],['psi','psig / °F']],PTU)}</label></div></div>
 <div class="diag"><p class="legend"><b>Source:</b> ${ed}.<br><b>Temperature range:</b> from the material’s minimum (first row, up to 38 °C / 100 °F) to ${g.tmax}. The lowest permitted temperature is set by the material specification and the piping code, not by this table.${conv?'<br><b>Conversion:</b> B16.5-2025 psig values × 0.0689476, at the °F rows of that table (°C shown rounded). B16.5 also has a metric table for this group with °C rows; expect differences of about 0.1 bar.':''}</p></div>
 ${tbl(head,rows)}
 <p class="note"><b>Group ${PTGRP} notes.</b> ${g.notes.join(' ')} Linear interpolation between listed temperatures is permitted; “—” means no rating at that temperature.</p>
 <p class="note"><b>Other materials.</b> Group 2.3 (304L, 316L), the low-alloy groups 1.2–1.18 (e.g. F11, F22, F91), and the duplex and nickel-alloy groups have their own, generally different, ratings and are not tabulated here. Take them from ASME B16.5 Table 2 in the edition your project specifies.</p>`;
 bindSeg('ptu',v=>{PTU=v;renderPT();});
 bindSeg('ptg',v=>{PTGRP=v;store.set('ptg',v);renderPT();});
 document.querySelectorAll('#p-pt tbody tr').forEach(r=>r.style.cursor='default');
}

/* ============================== SPANS ============================== */
function renderSpan(){
 const m=U==='mm';
 const head=['NPS','DN',`Water service<small>${m?'m':'ft'}</small>`,`Steam, gas, air<small>${m?'m':'ft'}</small>`,`OD<small>${ul()}</small>`];
 const rows=SPAN.nps.map((n,i)=>tr(n,[`<span class="dn">${DN[n]}</span>`,m?SPAN.wm[i].toFixed(1):SPAN.wft[i],m?SPAN.sm[i].toFixed(1):SPAN.sft[i],L(PIPEMAP[n][1],'od')]));
 $('#p-span').innerHTML=`<div class="phead"><div><h1>Suggested support spacing</h1><p>ASME B31.1 Table 121.5 for straight, standard-wall steel pipe at up to 400 °C (750 °F).</p></div></div>
 ${tbl(head,rows)}
 <p class="note"><b>Notes.</b> Reduce spans where there are concentrated loads (valves, flanges, vertical runs), at changes of direction, and for insulated or thin-wall lines. These spans limit sag to about 2.5 mm and stress to about 16 MPa; confirm with stress analysis where the line is critical.</p>`;
}



/* ============================== PIPE SPACING ============================== */
const SPN=N19; /* NPS 1/2 – 24 with B16.5 flanges */
let SP={a:'6',b:'4',ca:'300',cb:'150',ina:true,inb:false,ta:50,tb:40,clr:25,fclr:25,flg:true,rnd:5,
        mflg:true,mcls:'150',mins:0,mrnd:5};
try{Object.assign(SP,JSON.parse(store.get('sp','{}')))}catch(e){}
const saveSP=()=>store.set('sp',JSON.stringify(SP));
const odmm=n=>PIPEMAP[n][1]*25.4;
const flmm=(c,n)=>{const r=flRow(c,n);return r?r.O*25.4:null;};
const rup=(x,r)=>r>0?Math.ceil(x/r-1e-9)*r:x;
const Lmm=(mm,d)=>U==='mm'?mm.toFixed(d??0):(mm/25.4).toFixed(2);
/* returns {cc, gov, parts} in mm */
function spacing(a,b,ca,cb,ia,ib,flg,clr,fclr){
 const oa=odmm(a),ob=odmm(b);
 const opts=[{cc:oa/2+ia+ob/2+ib+clr,gov:ia||ib?'Pipe/insulation vs pipe/insulation':'Pipe OD vs pipe OD'}];
 if(flg){const fa=flmm(ca,a),fb=flmm(cb,b);if(fa==null||fb==null)return null;
  opts.push({cc:fa/2+ob/2+ib+fclr,gov:`Flange A vs ${ib?'insulated ':''}pipe B`});
  opts.push({cc:fb/2+oa/2+ia+fclr,gov:`Flange B vs ${ia?'insulated ':''}pipe A`});}
 return opts.reduce((m,o)=>o.cc>m.cc?o:m);
}
/* every clearance case for the pair, so the page can show which one governs */
function spCands(a,b,ca,cb,ia,ib,flg,clr,fclr){
 const oa=odmm(a),ob=odmm(b);
 const o=[{k:'pp',cc:oa/2+ia+ob/2+ib+clr,gap:clr,lbl:ia||ib?'Pipe or insulation, A to B':'Pipe OD, A to B'}];
 if(flg){const fa=flmm(ca,a),fb=flmm(cb,b);if(fa==null||fb==null)return o;
  o.push({k:'fa',cc:fa/2+ob/2+ib+fclr,gap:fclr,lbl:`Flange A to ${ib?'insulated ':''}pipe B`});
  o.push({k:'fb',cc:fb/2+oa/2+ia+fclr,gap:fclr,lbl:`Flange B to ${ia?'insulated ':''}pipe A`});}
 return o;}
/* section at the closest point: both lines to scale, governing surfaces and gap highlighted */
function spSVG(a,b,ca,cb,ia,ib,flg,cc,gov){
 const ra=odmm(a)/2,rb=odmm(b)/2,Ra=flRow(ca,a),Rb=flRow(cb,b);
 const fa=flg&&Ra?Ra.O*12.7:0,fb=flg&&Rb?Rb.O*12.7:0;
 const ea=Math.max(ra+ia,fa),eb=Math.max(rb+ib,fb);
 const sm=innerWidth<700,VW=sm?560:960,VH=sm?380:430,padX=sm?30:70,top=84,bot=78;
 const k=Math.min((VW-2*padX)/(cc+ea+eb),(VH-top-bot)/(2*Math.max(ea,eb)));
 const x1=VW/2-(cc+eb-ea)*k/2-0, cx1=(VW-(cc+ea+eb)*k)/2+ea*k, cx2=cx1+cc*k, cy=top+(VH-top-bot)/2;
 const P=v=>+(v).toFixed(1);
 const wall=n=>{const w=PIPEMAP[n][2];return ((w.STD??w['40']??Object.values(w)[0])*25.4);};
 const bolts=(cx,R,cls)=>{if(!R)return '';const r=R.BC*12.7*k,h=(R.dv+.125)*12.7*k;let s='';for(let i=0;i<R.n;i++){const t=Math.PI*2*(i+.5)/R.n;s+=`<circle cx="${P(cx+r*Math.cos(t))}" cy="${P(cy+r*Math.sin(t))}" r="${P(Math.max(h,1.4))}" class="sx-hole"/>`;}return s;};
 const line=(cx,r,ins,f,R,n,id)=>`
  ${f?`<g class="sx-flg${gov==='f'+id?' gov':''}"><circle cx="${P(cx)}" cy="${cy}" r="${P(f*k)}"/>${bolts(cx,R)}</g>`:''}
  ${ins?`<circle cx="${P(cx)}" cy="${cy}" r="${P((r+ins)*k)}" class="sx-ins${gov==='pp'||gov===(id==='a'?'fb':'fa')?' gov':''}"/>`:''}
  <circle cx="${P(cx)}" cy="${cy}" r="${P(r*k)}" class="sx-pipe${!ins&&(gov==='pp'||gov===(id==='a'?'fb':'fa'))?' gov':''}"/>
  <circle cx="${P(cx)}" cy="${cy}" r="${P(Math.max((r-wall(n))*k,1))}" class="sx-bore"/>
  <path d="M${P(cx-8)} ${cy}h16M${P(cx)} ${cy-8}v16" class="sx-cl"/>`;
 /* governing surfaces */
 const ga=gov==='fa'?fa:ra+ia, gb=gov==='fb'?fb:rb+ib;
 const gx1=cx1+ga*k, gx2=cx2-gb*k;
 const tw=t=>t.length*7.4+18;
 const tag=(x,y,t,cls='')=>`<rect x="${P(x-tw(t)/2)}" y="${y-13}" width="${P(tw(t))}" height="22" rx="5" class="sx-tag ${cls}"/><text x="${P(x)}" y="${y+2}" text-anchor="middle" class="sx-tt ${cls}">${t}</text>`;
 const yT=top-38, yB=VH-bot+34;
 const ccTxt=`C–C ${Lmm(cc)} ${ul()}`, gapMm=(cc-ga-gb);
 return `<svg class="sxsvg" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Section through both lines at the closest point, centre-to-centre ${Lmm(cc)} ${ul()}">
 <defs><marker id="sxA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="sx-ah"/></marker></defs>
 <rect x="${P(gx1)}" y="${top-6}" width="${P(Math.max(gx2-gx1,0))}" height="${VH-top-bot+12}" class="sx-gap"/>
 ${line(cx1,ra,ia,fa,Ra,a,'a')}${line(cx2,rb,ib,fb,Rb,b,'b')}
 <line x1="${P(cx1)}" y1="${yT-8}" x2="${P(cx1)}" y2="${cy}" class="sx-ext"/><line x1="${P(cx2)}" y1="${yT-8}" x2="${P(cx2)}" y2="${cy}" class="sx-ext"/>
 <line x1="${P(cx1)}" y1="${yT}" x2="${P(cx2)}" y2="${yT}" class="sx-dim" marker-start="url(#sxA)" marker-end="url(#sxA)"/>
 ${tag((cx1+cx2)/2,yT-1,ccTxt,'acc')}
 <line x1="${P(gx1)}" y1="${cy}" x2="${P(gx2)}" y2="${cy}" class="sx-dim sx-gd" marker-start="url(#sxA)" marker-end="url(#sxA)"/>
 ${tag((gx1+gx2)/2,cy+30,`gap ${Lmm(gapMm)} (min ${Lmm(gov==='pp'?+SP.clr:+SP.fclr)})`,'ok')}
 ${tag(cx1,yB,`A · ${a}″ Cl ${ca}${ia?` · ins ${ia}`:''}`)}${tag(cx2,yB,`B · ${b}″ Cl ${cb}${ib?` · ins ${ib}`:''}`)}
 </svg>`;}
function renderSpacing(){
 const ia=SP.ina?+SP.ta||0:0, ib=SP.inb?+SP.tb||0:0;
 const r=spacing(SP.a,SP.b,SP.ca,SP.cb,ia,ib,SP.flg,+SP.clr,+SP.fclr);
 const lineCtl=(k,lbl)=>{const n=SP[k],c=SP['c'+k],on=SP['in'+k],t=SP['t'+k];
  return `<div class="spline"><h3>Line ${lbl}</h3>
   <label>NPS<select class="sel" data-k="${k}">${SPN.map(x=>`<option value="${x}"${x===n?' selected':''}>${x}″ (DN ${DN[x]})</option>`).join('')}</select></label>
   <label>Flange class<select class="sel" data-k="c${k}">${CLASSES.map(x=>`<option${x===c?' selected':''}>${x}</option>`).join('')}</select></label>
   <label>Insulation<select class="sel" data-k="in${k}"><option value="0"${!on?' selected':''}>None</option><option value="1"${on?' selected':''}>Insulated</option></select></label>
   <label>Thickness, mm<input class="inp" type="number" min="0" step="5" data-k="t${k}" value="${t}"${on?'':' disabled'}></label></div>`;};
 const cases=[[false,false],[true,false],[false,true],[true,true]].map(([fl,ins])=>{
  const x=spacing(SP.a,SP.b,SP.ca,SP.cb,ins?ia:0,ins?ib:0,fl,+SP.clr,+SP.fclr);
  const mine=fl===SP.flg&&ins===true;
  return `<tr${(fl===SP.flg&&(ins?(ia||ib):!(ia||ib)))?' class="best"':''}><td>${x?Lmm(rup(x.cc,+SP.rnd)):'—'}</td><td>${fl?'With flanges':'No flanges'}</td><td>${ins?(ia||ib?`Insulated (A ${ia||0} / B ${ib||0} mm)`:'Insulated (none set)'):'Bare pipe'}</td><td>${x?Lmm(x.cc,1):'—'}</td><td style="text-align:left">${x?x.gov:'Size not in class'}</td></tr>`;}).join('');
 const cands=r?spCands(SP.a,SP.b,SP.ca,SP.cb,ia,ib,SP.flg,+SP.clr,+SP.fclr):[];const govK=r?cands.reduce((m,c)=>c.cc>m.cc?c:m).k:'';const maxC=r?Math.max(...cands.map(c=>c.cc)):1;
 const sbs=flmm(SP.ca,SP.a)!=null&&flmm(SP.cb,SP.b)!=null?flmm(SP.ca,SP.a)/2+flmm(SP.cb,SP.b)/2+(+SP.fclr):null;

 /* matrix */
 const mi=+SP.mins||0;
 const mrows=SPN.map(ra=>`<tr><td class="${ra===SP.a?'rowon':''}">${ra}″</td>${SPN.map(cb=>{const x=spacing(ra,cb,SP.mcls,SP.mcls,mi,mi,SP.mflg,+SP.clr,+SP.fclr);const on=ra===SP.a&&cb===SP.b;return `<td data-a="${ra}" data-b="${cb}" class="${on?'on':ra===cb?'dg':''}">${x?Lmm(rup(x.cc,+SP.mrnd)):NA}</td>`;}).join('')}</tr>`).join('');

 $('#p-spc').innerHTML=`<div class="phead"><div><h1>Pipe spacing</h1><p>Minimum centre-to-centre distance between two parallel lines on a rack or in a trench, using pipe OD, ASME B16.5 flange OD and insulation thickness. Flanges are assumed not staggered, so a flange on one line sits next to the plain or insulated pipe of the other.</p></div></div>
 <div class="spgrid">
  <div class="calc">
   ${lineCtl('a','A')}${lineCtl('b','B')}
   <div class="spline"><h3>Clearances & options</h3>
    <label>Pipe gap, mm<input class="inp" type="number" min="0" step="5" data-k="clr" value="${SP.clr}"></label>
    <label>Flange gap, mm<input class="inp" type="number" min="0" step="5" data-k="fclr" value="${SP.fclr}"></label>
    <label>Flanges<select class="sel" data-k="flg"><option value="1"${SP.flg?' selected':''}>With flanges</option><option value="0"${!SP.flg?' selected':''}>No flanges</option></select></label>
    <label>Round up to, mm<select class="sel" data-k="rnd">${[1,5,10,25,50].map(v=>`<option${v==SP.rnd?' selected':''}>${v}</option>`).join('')}</select></label></div>
  </div>
  <div class="calc sx-res">
   <span class="lbl">Minimum C–C, line A to line B</span>
   <div class="sx-big">${r?`${Lmm(rup(r.cc,+SP.rnd))}<small>${ul()}</small>`:'—'}</div>
   ${r?`<p class="sx-sub">Exact ${Lmm(r.cc,1)} ${ul()}, rounded up to ${SP.rnd} mm.</p>`:'<p class="sx-sub">Size not available in that flange class.</p>'}
   ${r?`<ul class="sx-cands">${cands.map(c=>`<li class="${c.k===govK?'gov':''}"><span class="sx-cl-l">${c.lbl}${c.k===govK?' <b>governs</b>':''}</span><span class="sx-bar"><i style="width:${(c.cc/maxC*100).toFixed(1)}%"></i></span><span class="sx-v">${Lmm(c.cc,0)}</span></li>`).join('')}</ul>`:''}
  </div>
 </div>
 ${r?`<section class="sx-card">
  <div class="sx-head"><div><h3>Section at the closest point</h3><p>Both lines to scale. The governing surfaces are outlined in blue and the clearance between them is shaded.</p></div></div>
  <div class="sx-stage" id="sxStage">${spSVG(SP.a,SP.b,SP.ca,SP.cb,ia,ib,SP.flg,rup(r.cc,+SP.rnd),govK)}</div>
  <div class="sx-key"><span><i class="k-pipe"></i>Pipe</span>${ia||ib?'<span><i class="k-ins"></i>Insulation</span>':''}${SP.flg?'<span><i class="k-flg"></i>Flange with bolt holes</span>':''}<span><i class="k-gap"></i>Clearance</span><span><i class="k-gov"></i>Governing surface</span></div>
 </section>`:''}
 <h3 style="margin:20px 0 8px;font-size:20px">Same pair, every case</h3>
 <div class="tw"><table class="cases"><thead><tr><th>Min C–C<small>${ul()}, rounded</small></th><th style="text-align:left">Flanges</th><th style="text-align:left">Insulation</th><th>Exact<small>${ul()}</small></th><th style="text-align:left">Governed by</th></tr></thead><tbody>${cases}</tbody></table></div>
 ${sbs!=null?`<p class="note"><b>Flanges side by side</b> (not recommended, avoid by staggering): ${Lmm(rup(sbs,+SP.rnd))} ${ul()} C–C, flange OD to flange OD plus the flange gap.</p>`:''}

 <div class="mxc"><h3>Spacing matrix, all sizes</h3>
  <label>Flanges<select class="sel" data-k="mflg"><option value="1"${SP.mflg?' selected':''}>With flanges</option><option value="0"${!SP.mflg?' selected':''}>No flanges</option></select></label>
  <label>Flange class, both lines<select class="sel" data-k="mcls">${CLASSES.map(x=>`<option${x===SP.mcls?' selected':''}>${x}</option>`).join('')}</select></label>
  <label>Insulation, both lines, mm<input class="inp" type="number" min="0" step="5" data-k="mins" value="${SP.mins}" style="width:110px"></label>
  <label>Round up to, mm<select class="sel" data-k="mrnd">${[1,5,10,25,50].map(v=>`<option${v==SP.mrnd?' selected':''}>${v}</option>`).join('')}</select></label>
 </div>
 <div class="tw"><table class="mx"><thead><tr><th>A ↓ / B →</th>${SPN.map(c=>`<th class="colh${c===SP.b?' colon':''}">${c}″</th>`).join('')}</tr></thead><tbody>${mrows}</tbody></table></div>
 <p class="note"><b>Notes.</b> Values in ${ul()}, centre to centre. Uses the gaps set above (${SP.clr} mm pipe, ${SP.fclr} mm flange). Insulation 0 means bare pipe. Tap a cell to load that pair into the calculator. Flanges are taken as uninsulated; if flanges are boxed or insulated, add the box size to the flange OD. Add allowance for pipe shoes, guides, thermal movement and future lines per your project spec. NPS 26 and above use B16.47 flanges, which are not included here.</p>`;

 const pane=$('#p-spc');
 pane.querySelectorAll('[data-k]').forEach(el=>el.addEventListener('change',()=>{
  const k=el.dataset.k;let v=el.value;
  if(['ina','inb','flg','mflg'].includes(k))v=v==='1';
  SP[k]=v;saveSP();renderSpacing();}));
 pane.querySelector('.mx').addEventListener('click',e=>{const td=e.target.closest('td[data-a]');if(!td)return;SP.a=td.dataset.a;SP.b=td.dataset.b;saveSP();renderSpacing();pane.scrollIntoView({behavior:'smooth',block:'start'});});
}


/* ============================== VALVE DIMENSIONS ============================== */
/* ASME B16.10 face-to-face (RF) in mm, indexed on N20; null = not listed.
   Butterfly: API 609 Category A / Category B (lug & wafer) face-to-face in inches. */
const VD={
'150':{gate:[108,117,127,140,165,178,190,203,null,229,254,267,292,330,356,381,406,432,457,508],
 globe:[108,117,127,140,165,203,216,241,null,292,356,406,495,622,698,787,914,978,978,1295],
 swing:[108,117,127,140,165,203,216,241,null,292,330,356,495,622,698,787,864,978,978,1295],
 ballS:[108,117,127,140,165,178,190,203,null,229,null,267,292,330,356,381,406,null,null,null],
 ballL:[108,117,127,140,165,178,190,203,null,229,null,394,457,533,610,686,762,864,914,1067],
 plugS:[null,null,140,null,165,178,190,203,null,229,254,267,292,330,356,null,null,null,null,null],
 plugR:[null,null,null,null,null,null,null,null,null,305,381,394,457,533,610,686,762,864,914,1067]},
'300':{gate:[140,152,165,178,190,216,241,282,null,305,381,403,419,457,502,762,838,914,991,1143],
 globe:[152,178,203,216,229,267,292,318,null,356,400,444,559,622,711,null,null,null,null,null],
 swing:[null,null,216,229,241,267,292,318,null,356,400,444,533,622,711,838,864,978,1016,1346],
 ballS:[140,152,165,178,190,216,241,282,null,305,null,403,419,457,502,572,610,660,711,813],
 ballL:[140,152,165,178,190,216,241,282,null,305,null,403,502,568,648,762,838,914,991,1143],
 plugS:[null,null,159,null,190,216,241,282,null,305,null,403,419,457,502,762,838,914,991,1143],
 plugR:[null,null,null,null,null,null,null,null,null,null,null,403,502,568,711,762,838,914,991,1143]},
'600':(()=>{const a=[165,190,216,229,241,292,330,356,null,432,508,559,660,787,838,889,991,1092,1194,1397];
 const b=a.map((v,i)=>i===10?null:v), pr=b.map((v,i)=>i<2?null:v);
 return {gate:a,globe:a,swing:a,ballS:null,ballL:b,plugS:null,plugR:pr};})(),
'900':{gate:[null,null,254,279,305,368,419,381,null,457,559,610,737,838,965,1029,1130,1219,1321,1549],
 globe:[null,229,254,279,305,368,419,381,null,457,559,610,737,838,965,1029,1130,1219,1321,1549],
 swing:[null,229,254,279,305,368,419,381,null,457,559,610,737,838,965,1029,1130,1219,1321,1549],
 ballS:null,
 ballL:[null,null,254,279,305,368,419,381,null,457,null,610,737,838,965,1029,1130,1219,1321,1549],
 plugS:null,
 plugR:[null,null,254,279,305,368,419,381,null,457,null,610,737,838,965,null,1130,null,1321,null]},
'1500':{gate:[null,null,254,279,305,368,419,470,null,546,673,705,832,991,1130,1257,1384,1537,1664,1943],
 globe:[216,229,254,279,305,368,419,470,null,546,673,705,832,991,1130,1257,1384,1537,1664,1943],
 swing:[216,229,254,279,305,368,419,470,null,546,673,705,832,991,1130,1257,1384,1537,1664,1943],
 ballS:null,
 ballL:[null,null,null,null,null,368,419,470,null,546,null,705,832,991,1130,1257,1384,null,null,null],
 plugS:null,
 plugR:[null,null,254,279,305,368,419,470,null,546,null,705,832,991,1130,null,1384,null,null,null]}
};
const BFY_A={'2':1.69,'2-1/2':1.81,'3':1.81,'4':2.06,'5':2.19,'6':2.19,'8':2.38,'10':2.69,'12':3.06,'14':3.06,'16':4.00,'18':4.50,'20':5.00,'24':6.06};
const BFY_B={'150':{'3':1.88,'4':2.12,'6':2.25,'8':2.50,'10':2.81,'12':3.19,'14':3.62,'16':4.00,'18':4.50,'20':5.00,'24':6.06},
 '300':{'3':1.88,'4':2.12,'6':2.31,'8':2.88,'10':3.25,'12':3.62,'14':4.62,'16':5.25,'18':5.88,'20':6.25,'24':7.12}};
const VD_COLS=[['gate','Gate<small>wedge / double disc</small>'],['globe','Globe<small>& lift check</small>'],['swing','Swing check'],
 ['ballS','Ball<small>short pattern</small>'],['ballL','Ball<small>long pattern</small>'],['plugS','Plug<small>short pattern</small>'],['plugR','Plug<small>regular pattern</small>']];
let VDC=store.get('vdc','150'); if(!VD[VDC])VDC='150';
const VD_TYPES=[['all','All'],['gate','Gate'],['globe','Globe'],['swing','Swing check'],['ball','Ball'],['plug','Plug'],['bfy','Butterfly']];
const VD_GROUP={all:['gate','globe','swing','ballS','ballL','plugS','plugR'],gate:['gate'],globe:['globe'],swing:['swing'],ball:['ballS','ballL'],plug:['plugS','plugR'],bfy:[]};
const VD_GUIDE={gate:['Gate'],globe:['Globe','Lift check'],swing:['Swing check'],ball:['Ball'],plug:['Plug'],bfy:['Butterfly']};
let VDT=store.get('vdt','all'); if(!VD_GROUP[VDT])VDT='all';
function renderVdim(){
 const d=VD[VDC], cols=VD_COLS.filter(([k])=>d[k]&&VD_GROUP[VDT].includes(k)), showB=VDT==='all'||VDT==='bfy', bTab=BFY_B[VDC]||{}, showBc=VDT==='bfy'||(VDT==='all'&&!!BFY_B[VDC]);
 const f=v=>v==null?NA:(U==='mm'?String(v):(Math.round(v/25.4*8)/8).toFixed(2)); /* B16.10 inch values are 1/8 in steps */
 const head=['NPS','DN',...cols.map(c=>c[1]),...(showBc?[`Butterfly<small>API 609 cat. B</small>`]:[])];
 const rows=N20.map((n,i)=>{const b=bTab[n];
   if(VDT!=='all'&&!cols.some(([k])=>d[k][i]!=null)&&!(showBc&&b))return '';
   return tr(n,[`<span class="dn">${DN[n]}</span>`,...cols.map(([k])=>f(d[k][i])),...(showBc?[b?L(b,'fit'):NA]:[])]);}).filter(Boolean);
 const noData=VDT!=='all'&&!rows.length;
 const rowsA=N20.filter(n=>BFY_A[n]).map(n=>tr(n,[`<span class="dn">${DN[n]}</span>`,L(BFY_A[n],'fit')]));
 const guide=[
  ['Gate','Isolation (fully open / closed)','Very low','Not for throttling; seat and disc erode when part-open. Needs stem clearance above.'],
  ['Globe','Throttling, flow regulation, bypass','High','Install with flow under the seat unless the vendor says otherwise. Longer than gate.'],
  ['Swing check','Non-return','Low','Horizontal, or vertical with upward flow only. Allow straight run upstream; avoid pulsating flow.'],
  ['Lift check','Non-return, small bore','High','Usually horizontal only (check vendor). Same body length as globe.'],
  ['Ball','Quarter-turn isolation','Very low (full bore)','Full bore for pigging. Not for throttling unless V-port. Lever swing needs clearance.'],
  ['Plug','Quarter-turn isolation','Low','Lubricated or sleeved. Common in fuel gas, slurries, and where tight shut-off is needed.'],
  ['Butterfly','Isolation and throttling, large bore','Low to medium','Compact. The disc swings past the faces: check clearance to adjacent fittings, spool ID and lining.']
 ].filter(r=>VDT==='all'||VD_GUIDE[VDT].includes(r[0])).map(r=>`<tr><td style="text-align:left;font-family:var(--f-body)"><b>${r[0]}</b></td>${r.slice(1).map(c=>`<td style="text-align:left;font-family:var(--f-body);white-space:normal;min-width:110px">${c}</td>`).join('')}</tr>`).join('');
 $('#p-vdim').innerHTML=`<div class="phead"><div><h1>Valve dimensions: ASME B16.10</h1><p>Face-to-face lengths of flanged steel valves, raised face, for layout and spool sizing. Butterfly valves per API 609. All lengths in ${ul()}.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Valve type</span>${seg('vdt',VD_TYPES,VDT)}</label><label class="ctrl"><span class="lbl">Pressure class</span>${seg('vdc',['150','300','600','900','1500'],VDC)}</label></div></div>
 <p class="note" style="margin:0 0 12px"><b>Face-to-face</b> is measured between the raised-face gasket surfaces. For gate, globe and check valves, B16.10 generally gives the same <b>end-to-end</b> length for butt-weld ends in Class 150–600; confirm ball and plug valves and all <b>RTJ</b> ends on the vendor drawing.<br><br><b>Class 600, 900 and 1500</b> values include the 6.4 mm (0.25″) raised face. In these classes, gate, globe, check, long-pattern ball and regular plug share one length where listed; short-pattern ball and plug are not listed. Class 900 and 1500 share the same lengths up to NPS 2½. In Class 900, NPS 3 (381) is genuinely shorter than NPS 2½ (419) in B16.10.</p>
 ${mpHTML('vd')}
 ${noData?`<p class="note" style="font-size:14px"><b>No ${VD_TYPES.find(t=>t[0]===VDT)[1].toLowerCase()} lengths for Class ${VDC} in this table.</b> ${VDT==='bfy'?'Category B butterfly data here covers Class 150 and 300 only; for higher classes use the vendor drawing (Category A is low-pressure only).':'Check the vendor GA drawing.'}</p>`:tbl(head,rows)}
 ${vdOpTable()}
 <div class="vd-two" style="display:grid;gap:16px;margin-top:18px;align-items:start${showB?'':';grid-template-columns:1fr'}">
  ${showB?`<div><h3>Butterfly · API 609 category A</h3><p class="note" style="margin:2px 0 8px">Concentric, resilient-seated, lug and wafer. One length for all classes it covers.</p>${tbl(['NPS','DN','Face-to-face'],rowsA)}</div>`:''}
  <div><h3>Valve selection guide</h3><p class="note" style="margin:2px 0 8px">Where each valve type fits in layout.</p><div class="tw"><table><thead><tr><th style="text-align:left">Type</th><th style="text-align:left">Function</th><th style="text-align:left">Pressure drop</th><th style="text-align:left">Layout notes</th></tr></thead><tbody>${guide}</tbody></table></div></div>
 </div>
 <p class="note"><b>Notes.</b> — means the size is not listed in B16.10 for that valve and class (NPS 3½ is not a standard valve size). Ball short pattern in Class 150 matches the gate length. Category B butterfly (high-performance, offset disc) lengths are lug and wafer; double-flanged butterfly valves follow different tables. Many vendors also sell compact or non-standard patterns, so always confirm against the purchased valve's GA drawing before you fix spool lengths.</p>`;
 bindSeg('vdc',v=>{VDC=v;store.set('vdc',v);renderVdim();});
 bindSeg('vdt',v=>{VDT=v;store.set('vdt',v);if(v!=='all'){MPS.vd.kind=v;MPS.vd.on='L';saveMPS();}renderVdim();});
 mpInit('vd');
}


/* Stem height (valve open) and handwheel diameter: TYPICAL manufacturer values, not a standard.
   Gate: Orion / ESE API 600 catalogue ("D-open", "ø E"; G = bevel gear operated).
   Globe: Vastas E300 API 623 / BS 1873 catalogue ("H (Open)", "ØW"; gearbox preferred above 150 N·m). */
const VOP_SZ=['2','2-1/2','3','4','6','8','10','12','14','16','18','20','24'];
const VOP={
 gate:{src:'Orion (ESE) API 600 gate valve catalogue',
  H:{'150':[417,490,530,671,877,1082,1290,1498,1676,1850,2069,2271,2680],
     '300':[430,510,530,671,877,1110,1339,1580,1685,1890,2069,2287,2729],
     '600':[431,528,620,720,1003,1138,1400,1644,1781,1998,2138,2253,2771],
     '900':[575,615,618,780,1040,1305,1440,1607,1746,1901,2160,2370,2830],
     '1500':[575,615,636,845,1085,1263,1515,1604,1760,1925,2158,2540,2860]},
  W:{'150':[204,204,254,305,356,406,457,502,610,610,'G','G','G'],
     '300':[204,204,254,305,406,457,457,'G','G','G','G','G','G'],
     '600':[204,254,305,356,502,'G','G','G','G','G','G','G','G'],
     '900':[305,356,356,406,'G','G','G','G','G','G','G','G','G'],
     '1500':[305,356,406,457,'G','G','G','G','G','G','G','G','G']}},
 globe:{src:'Vastas E300 globe valve catalogue (API 623 / BS 1873)',
  H:{'150':[350,null,425,435,530,640,897,930,1250,1480,1120,1288,1330],
     '300':[358,null,418,476,630,900,982,1070,1130,1310,1460,1632,1820],
     '600':[490,null,585,650,820,990,1295,1370,1453,1619,1784,1950,2280],
     '900':[550,null,620,730,800,920,1200,1600,null,null,null,null,null],
     '1500':[560,null,640,750,850,1100,1200,1280,null,null,null,null,null]},
  W:{'150':[210,null,265,310,360,410,455,605,605,700,900,900,1000],
     '300':[210,null,265,310,410,605,700,900,1000,1000,1000,1000,1000],
     '600':[230,null,310,360,730,900,900,1000,1000,1000,1000,1000,1000],
     '900':[265,null,410,605,700,1000,1000,1000,null,null,null,null,null],
     '1500':[310,null,455,730,900,1000,1000,1000,null,null,null,null,null]},
  gearFrom:{'150':'8','300':'6','600':'4','900':'3','1500':'3'}}
};
function vdOpTable(){
 const showG=VDT==='all'||VDT==='gate', showL=VDT==='all'||VDT==='globe';
 const head=`<h3 style="margin-top:22px">Stem height (valve open) &amp; handwheel diameter · Class ${VDC}</h3>`;
 if(!showG&&!showL)return head+`<p class="note" style="margin:4px 0 0">Not applicable to ${VD_TYPES.find(t=>t[0]===VDT)[1].toLowerCase()} valves: ${VDT==='swing'?'check valves have no stem or handwheel.':'they are lever or gear operated; take lever length / gear handwheel and its orientation from the vendor drawing.'} Stem height and handwheel data are given for gate and globe valves.</p>`;
 const f=v=>v==null?NA:v==='G'?'<span class="chip ok" title="Bevel gear operated">gear</span>':(U==='mm'?String(v):(v/25.4).toFixed(1));
 const gi=VOP_SZ.indexOf(VOP.globe.gearFrom[VDC]);
 const fW=(v,i)=>v==null?NA:f(v)+(i>=gi?' <span class="chip" style="background:var(--hi);color:var(--hi-ink)" title="Gearbox preferred above 150 N·m">gear pref.</span>':'');
 const cols=[...(showG?[`Gate<small>height, open</small>`,`Gate<small>handwheel Ø</small>`]:[]),...(showL?[`Globe<small>height, open</small>`,`Globe<small>handwheel Ø</small>`]:[])];
 const rows=VOP_SZ.map((n,i)=>tr(n,[`<span class="dn">${DN[n]}</span>`,
  ...(showG?[f(VOP.gate.H[VDC][i]),f(VOP.gate.W[VDC][i])]:[]),
  ...(showL?[f(VOP.globe.H[VDC][i]),fW(VOP.globe.W[VDC][i],i)]:[])]));
 return head+`<p class="note" style="margin:2px 0 8px"><b>Typical values from one manufacturer, not a code dimension.</b> Every vendor differs, so use these for early layout (valve access, handwheel clearance, headroom) and replace them with the purchased valve's GA drawing. Height is the catalogue's open-valve height (rising stem fully up); the catalogues do not state the datum, which is normally the pipe centreline. All in ${ul()}.</p>`+
  tbl(['NPS','DN',...cols],rows)+
  `<p class="note"><b>Sources.</b> ${showG?`Gate: ${VOP.gate.src}; <b>gear</b> = bevel-gear operated (catalogue gives no handwheel Ø for these). `:''}${showL?`Globe: ${VOP.globe.src}; <b>gear pref.</b> = manufacturer recommends a gearbox (operating torque above 150 N·m) from NPS ${VOP.globe.gearFrom[VDC]}; Ø is the manual handwheel. `:''}Valves below NPS 2 are usually forged (API 602) with much smaller heights; see the vendor catalogue.</p>`;
}
/* ============================== VALVE ACCESS ============================== */
const VALVE_IMG="assets/img/valve-access.webp";
function renderValve(){
 $('#p-valve').innerHTML=`<div class="phead"><div><h1>Valve access: mounting elevations & clearance</h1><p>Preferred and acceptable handwheel heights above the standing surface for horizontal, vertical and angled valve stems, with horizontal reach from the operator's shoulder.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">View</span>${seg('vz',[['fit','Fit to width'],['full','Full size']],'fit')}</label></div></div>
 <div class="fig" id="vfig"><img loading="lazy" decoding="async" width="2874" height="1472" src="${VALVE_IMG}" alt="Figures 1 to 3: mounting heights for handwheel valves with horizontal, vertical and angled stems, showing preferred, acceptable and not recommended zones above deck level"></div>
 <p class="note"><b>How to use.</b> Measure handwheel height from the operator's standing surface (grade, deck or platform), not from the pipe centreline. Keep at least 610 mm (24") between a wall and the handwheel rim. Valves outside the preferred zone need a platform, chain wheel or extension spindle. Tap the image to zoom in.</p>`;
 const fig=$('#vfig'),setZ=z=>{fig.classList.toggle('zoom',z);document.querySelectorAll('#vz button').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.v==='full')===z));};
 fig.querySelector('img').addEventListener('click',()=>setZ(!fig.classList.contains('zoom')));
 bindSeg('vz',v=>setZ(v==='full'));
}

/* ============================== CALCULATORS ============================== */
const sizeOpts=(list,cur)=>list.map(n=>`<option${n===cur?' selected':''}>${n}</option>`).join('');
function renderCalc(){
 $('#p-calc').innerHTML=`<div class="phead"><div><h1>Design calculators</h1><p>Quick checks for everyday layout work. Inputs are in mm, bar and °C; results show both unit systems where useful.</p></div></div>
 <div class="calcs">
  <div class="calc" id="c-wall"><h3>Pipe wall thickness · B31.3</h3><p>Straight pipe under internal pressure, Eq. (3a): t = PD / 2(SEW + PY).</p>
   <div class="eq-custom" style="margin:0;font-size:12.5px"><b>Enter S, E, W and Y from your governing B31.3 edition.</b> Allowable stress depends on the exact material specification, grade, product form and design temperature (Table A-1M / A-1). E comes from Table A-1B, W from para. 302.3.5, Y from Table 304.1.1. This tool supplies no allowable stresses; the result is a check on the values you enter.</div>
   <div class="fg">
    <label>NPS<select class="sel" id="w-n">${sizeOpts(PIPE.map(p=>p[0]).filter(n=>n!=='1/8'),SEL)}</select></label>
    <label>Design pressure, bar(g)<input class="inp" id="w-p" type="number" step="0.1" value="40"></label>
    <label>Pipe standard (schedules)<select class="sel" id="w-std"><option value="cs">Carbon / alloy steel · B36.10M</option><option value="ss">Stainless steel · B36.19M</option></select></label>
    <label>Material spec, grade, form<input class="inp" id="w-m" type="text" placeholder="e.g. A106 Gr B seamless"></label>
    <label>Design temperature, °C<input class="inp" id="w-temp" type="number" step="1" placeholder="required"></label>
    <label>Allowable S, MPa (Table A-1M)<input class="inp" id="w-s" type="number" step="0.1" min="0" placeholder="from code table"></label>
    <label>Quality factor E (Table A-1B)<select class="sel" id="w-e"><option value="">Select from Table A-1B…</option><option value="1">1.00 (typically seamless)</option><option value="0.85">0.85 (typically ERW)</option><option value="0.8">0.80 (typically EFW, single butt)</option><option value="0.9">0.90</option><option value="0.95">0.95</option></select></label>
    <label>Weld strength factor W (302.3.5)<input class="inp" id="w-w" type="number" step="0.01" min="0" max="1" value="1.0"></label>
    <label>Coefficient Y (Table 304.1.1)<input class="inp" id="w-y" type="number" step="0.1" value="0.4"></label>
    <label>Corrosion + thread allow., mm<input class="inp" id="w-c" type="number" step="0.1" value="1.5"></label>
    <label>Mill tolerance, %<input class="inp" id="w-t" type="number" step="0.5" value="12.5"></label>
   </div><div class="out" id="w-out"></div></div>

  <div class="calc" id="c-pt"><h3>Flange class selection · B16.5</h3><p>Interpolates the rating of the material group you pick at your design temperature.</p>
   <div class="fg"><label>Material group<select class="sel" id="pt-g">${Object.keys(PTG).map(k=>`<option value="${k}"${k===PTGRP?' selected':''}>${PTG[k].lbl}</option>`).join('')}</select></label><label>Design temperature, °C<input class="inp" id="pt-t" type="number" value="250"></label><label>Design pressure, bar(g)<input class="inp" id="pt-p" type="number" step="0.1" value="40"></label></div>
   <div class="out" id="pt-out"></div></div>

  <div class="calc" id="c-elb"><h3>Elbow take-off</h3><p>Centre-to-end for any bend angle: A = R × tan(θ/2). Use it for cut elbows and odd-angle routing.</p>
   <div class="fg"><label>NPS<select class="sel" id="e-n">${sizeOpts(BWN,BWN.includes(SEL)?SEL:'4')}</select></label>
    <label>Angle θ, degrees<input class="inp" id="e-a" type="number" step="1" value="60"></label>
    <label>Radius<select class="sel" id="e-r"><option value="lr">LR (1.5D)</option><option value="sr">SR (1D)</option><option value="3d">3D</option><option value="5d">5D</option></select></label></div>
   <div class="out" id="e-out"></div></div>

  <div class="calc" id="c-off"><h3>Rolling offset</h3><p>Travel and run for an offset that rises and rolls at the same time, using fittings of angle θ.</p>
   <div class="fg"><label>Set (vertical), mm<input class="inp" id="o-s" type="number" value="600"></label><label>Roll (horizontal), mm<input class="inp" id="o-r" type="number" value="450"></label>
    <label>Fitting angle θ<select class="sel" id="o-a"><option>45</option><option>60</option><option>30</option><option>22.5</option><option>90</option></select></label>
    <label>NPS (LR elbows)<select class="sel" id="o-n">${sizeOpts(BWN,BWN.includes(SEL)?SEL:'4')}</select></label></div>
   <div class="out" id="o-out"></div></div>

  <div class="calc" id="c-slope"><h3>Pipe slope</h3><p>Solve for drop, slope or run length. Elevations and lengths in mm; enter slope in any unit and get all the others.</p>
   <div class="fg">
    <label>Solve for<select class="sel" id="sl-m"><option value="drop">Drop &amp; end EL</option><option value="slope">Slope</option><option value="len">Horizontal length</option></select></label>
    <label>Horizontal length L, mm<input class="inp" id="sl-l" type="number" step="any" value="12000"></label>
    <label>Slope<input class="inp" id="sl-s" type="number" step="any" value="100"></label>
    <label>Slope unit<select class="sel" id="sl-u"><option value="ratio">1 : N</option><option value="pct">% (percent)</option><option value="mmm">mm per m</option><option value="deg">degrees</option></select></label>
    <label>Start EL, mm<input class="inp" id="sl-e1" type="number" step="any" value="105000"></label>
    <label>End EL, mm<input class="inp" id="sl-e2" type="number" step="any" value="104880"></label>
   </div><div class="out" id="sl-out"></div></div>

  <div class="calc" id="c-bolt"><h3>Bolt length · B16.5 flanges</h3><p>Stud or machine bolt length for a raised-face flange joint. Flange data comes from the B16.5 table; edit gasket and extras to suit the joint.</p>
   <div class="fg">
    <label>Bolt type<select class="sel" id="b-t">
     <option value="stud">Stud bolt, 2 heavy hex nuts</option>
     <option value="mach">Machine bolt (hex head + 1 nut)</option>
     <option value="tap">Tap-end stud (one tapped flange / equipment)</option>
     <option value="wafer">Stud thru wafer valve / blind / orifice</option>
     <option value="hyd">Stud for hydraulic tensioning</option></select></label>
    <label>NPS<select class="sel" id="b-n">${sizeOpts(N20,'4')}</select></label>
    <label>Flange class<select class="sel" id="b-c">${sizeOpts(CLASSES,'300')}</select></label>
    <label>Gasket<select class="sel" id="b-g"><option value="4.5">Spiral wound · 4.5 mm</option><option value="3">Sheet / CNAF · 3.0 mm</option><option value="1.5">Sheet · 1.5 mm</option><option value="3.2">Kammprofile · 3.2 mm</option></select></label>
    <label>Gasket thickness, mm<input class="inp" id="b-gt" type="number" step="0.1" value="4.5"></label>
    <label>No. of gaskets<select class="sel" id="b-gn"><option>1</option><option>2</option></select></label>
    <label>Item between flanges, mm<input class="inp" id="b-w" type="number" step="1" value="0"></label>
    <label>Thread engagement in tapped hole<select class="sel" id="b-e"><option value="1">1.0 × d (steel)</option><option value="1.5">1.5 × d (cast iron / soft)</option></select></label>
    <label>Projection past nut, threads<input class="inp" id="b-p" type="number" step="1" value="3"></label>
    <label>Round up to<select class="sel" id="b-r"><option value="5">5 mm</option><option value="10">10 mm</option><option value="6.35">¼ inch</option></select></label>
   </div><div class="out" id="b-out"></div></div>

  <div class="calc" id="c-sp"><h3>Line spacing on a rack</h3><p>Centre-to-centre of two adjacent lines, assuming flanges are not staggered. Clearance is kept between the flange of one line and the insulated OD of the other.</p>
   <div class="fg"><label>Line A NPS<select class="sel" id="s-na">${sizeOpts(N20,'6')}</select></label><label>Line A class<select class="sel" id="s-ca">${sizeOpts(CLASSES,'300')}</select></label><label>Line A insulation, mm<input class="inp" id="s-ia" type="number" value="50"></label>
    <label>Line B NPS<select class="sel" id="s-nb">${sizeOpts(N20,'4')}</select></label><label>Line B class<select class="sel" id="s-cb">${sizeOpts(CLASSES,'150')}</select></label><label>Line B insulation, mm<input class="inp" id="s-ib" type="number" value="0"></label>
    <label>Clearance, mm<input class="inp" id="s-cl" type="number" value="25"></label></div>
   <div class="out" id="s-out"></div></div>

  <div class="calc" id="c-cv"><h3>Unit converter</h3><p>Length, pressure and temperature.</p>
   <div class="fg"><label>Value<input class="inp" id="v-x" type="number" step="any" value="1"></label>
    <label>From<select class="sel" id="v-u"><option value="in">inch</option><option value="mm">mm</option><option value="ft">ft</option><option value="m">m</option><option value="bar">bar</option><option value="psi">psi</option><option value="MPa">MPa</option><option value="kgcm">kg/cm²</option><option value="C">°C</option><option value="F">°F</option></select></label></div>
   <div class="out" id="v-out"></div></div>
 </div>`;
 document.querySelectorAll('#p-calc input, #p-calc select').forEach(el=>el.addEventListener('input',runCalcs));
 $('#b-g').addEventListener('change',e=>{$('#b-gt').value=e.target.value;runCalcs();});
 $('#b-t').addEventListener('change',e=>{$('#b-gn').value=e.target.value==='wafer'?'2':'1';runCalcs();});
 
 runCalcs();
}
const num=id=>parseFloat($(id).value);
const f2=(x,d=1)=>isFinite(x)?x.toFixed(d):'—';
function both(mm,d=1){return `${f2(mm,d)} mm <span style="color:var(--muted)">/ ${f2(mm/25.4,d+1)} in</span>`;}
function runCalcs(){
 /* wall */
 {const n=$('#w-n').value,p=PIPEMAP[n],D=p[1]*25.4,P=num('#w-p')/10,S=num('#w-s'),E=parseFloat($('#w-e').value),W=num('#w-w'),Y=num('#w-y'),c=num('#w-c'),mt=num('#w-t')/100,T=num('#w-temp'),mat=$('#w-m').value.trim();
  const miss=[];if(!(T>-273))miss.push('design temperature');if(!(S>0))miss.push('allowable stress S from B31.3 Table A-1M for your material and temperature');if(!(E>0))miss.push('quality factor E from Table A-1B');if(!(W>0&&W<=1))miss.push('weld strength reduction factor W (0–1)');if(!(Y>=0&&Y<1))miss.push('coefficient Y');if(!(P>0))miss.push('design pressure');
  if(miss.length){$('#w-out').innerHTML=`<p style="margin:4px 0"><b>Enter:</b> ${miss.join('; ')}.</p><p style="margin:0">No allowable stress is assumed. Take each value from the governing code edition for the exact specification, grade, product form and design temperature.</p>`;}
  else{
  const t=P*D/(2*(S*E*W+P*Y)),tm=t+c,tn=tm/(1-mt);
  const std=$('#w-std').value,small=fr(n)<=12;
  const schs=(std==='ss'
   ? [['5S',p[2]['5S']],['10S',p[2]['10S']],...(small?[['40S',p[2]['STD']],['80S',p[2]['XS']]]:[])]
   : SCH.filter(s=>s!=='5S'&&s!=='10S').map(s=>[s,p[2][s]])
  ).filter(([s,w])=>w!=null).map(([s,w])=>[s,w*25.4]).sort((a,b)=>a[1]-b[1]);
  const seen=new Set();const uniq=schs.filter(([s,w])=>{const k=w.toFixed(2);if(seen.has(k)){return false}seen.add(k);return true});
  const best=uniq.find(([s,w])=>w>=tn);
  const lbl=w=>schs.filter(x=>x[1].toFixed(2)===w.toFixed(2)).map(x=>x[0]).join(' / ');
  let h=`<div class="big">${best?'Sch '+lbl(best[1]):'No listed schedule'}</div><p style="margin:2px 0 8px">Pressure design t = ${f2(t,2)} mm · with allowance tm = ${f2(tm,2)} mm · min nominal = ${f2(tn,2)} mm${t>=D/6?' · <span class="chip bad">t ≥ D/6: Eq. 3a not valid</span>':''}</p>`;
  h+=`<div class="tw"><table><thead><tr><th>Schedule</th><th>Wall mm</th><th>Check</th></tr></thead><tbody>${uniq.map(([s,w])=>`<tr${best&&best[0]===s?' class="best"':''}><td>${lbl(w)}</td><td>${w.toFixed(2)}</td><td>${w>=tn?'<span class="chip ok">OK</span>':'<span class="chip bad">thin</span>'}</td></tr>`).join('')}</tbody></table></div>`;
  h=h.replace('</p>',`</p><p style="margin:0 0 8px;font-size:12px">Based on user-entered values: ${mat?eqEsc(mat)+', ':''}${f2(T,0)} °C · S = ${f2(S,1)} MPa · E = ${E.toFixed(2)} · W = ${W.toFixed(2)} · Y = ${f2(Y,2)}. Schedules shown: ${std==='ss'?'B36.19M stainless (5S, 10S'+(small?', 40S, 80S':'')+')':'B36.10M carbon / alloy steel'}. Verify each against the governing B31.3 edition before use.${std==='ss'&&!small?' <span class="chip bad">Above NPS 12 only 5S / 10S are listed here; heavier stainless walls per your piping class</span>':''}${T>482?' <span class="chip bad">Above 482 °C: check Y and W for this material</span>':''}</p>`);
  $('#w-out').innerHTML=h;}}
 /* PT */
 {const T=num('#pt-t'),P=num('#pt-p'),G=$('#pt-g').value,gg=PTG[G];let first=null;
  const rows=CLASSES.map(c=>{const r=ptRate(G,c,T);const ok=r!=null&&r>=P;if(ok&&!first)first=c;return `<tr${ok&&first===c?' class="best"':''}><td>Class ${c}</td><td>${r==null?'—':r.toFixed(1)}</td><td>${r==null?'—':(r*14.5038).toFixed(0)}</td><td>${r==null?'<span class="chip bad">out of range</span>':ok?'<span class="chip ok">OK</span>':'<span class="chip bad">low</span>'}</td></tr>`;});
  $('#pt-out').innerHTML=`<div class="big">${first?'Class '+first:(rows.every(x=>x.includes('out of range'))?'Temperature outside table':'Above Class 2500')}</div><p style="margin:2px 0 8px">Material Group ${G} only (${gg.mats}). Rating at ${f2(T,0)} °C (${f2(T*9/5+32,0)} °F)${gg.C?'':', interpolated in the B16.5-2025 °F table and converted to bar'}.</p><div class="tw"><table><thead><tr><th>Class</th><th>bar(g)</th><th>psig</th><th>Check</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;}
 /* elbow */
 {const n=$('#e-n').value,b=bwRow(n),a=num('#e-a'),r=$('#e-r').value,nv=fr(n);
  const R=(r==='lr'?b.lr90:r==='sr'?b.sr90:r==='3d'?b.d390:5*nv);
  if(R==null||!(a>0&&a<=180)){$('#e-out').innerHTML='<p>Not available for this size or angle.</p>';}
  else{const Rm=R*25.4,A=Rm*Math.tan(a*Math.PI/360),arc=Rm*a*Math.PI/180,od=PIPEMAP[n][1]*25.4;
   const outer=(Rm+od/2)*a*Math.PI/180,inner=(Rm-od/2)*a*Math.PI/180;
   $('#e-out').innerHTML=`<div class="big">${both(A)}</div><dl class="kv" style="margin-top:6px"><dt>Bend radius R</dt><dd>${both(Rm)}</dd><dt>Centreline arc length</dt><dd>${both(arc)}</dd><dt>Cut from 90° elbow: outer arc</dt><dd>${both(outer)}</dd><dt>Cut from 90° elbow: inner arc</dt><dd>${both(inner)}</dd></dl>`;}}
 /* rolling offset */
 {const s=num('#o-s'),r=num('#o-r'),a=+$('#o-a').value,n=$('#o-n').value,b=bwRow(n);
  const off=Math.hypot(s,r),th=a*Math.PI/180;
  if(a===90){$('#o-out').innerHTML=`<div class="big">${both(off)}</div><p>True offset; with 90° fittings the run is zero.</p>`;}
  else{const travel=off/Math.sin(th),run=off/Math.tan(th),R=b.lr90*25.4,to=R*Math.tan(th/2),cut=travel-2*to,roll=Math.atan2(r,s)*180/Math.PI;
   $('#o-out').innerHTML=`<div class="big">Travel ${both(travel)}</div><dl class="kv" style="margin-top:6px"><dt>True offset √(set² + roll²)</dt><dd>${both(off)}</dd><dt>Run (advance)</dt><dd>${both(run)}</dd><dt>Roll angle from vertical</dt><dd>${f2(roll,1)}°</dd><dt>Elbow take-off, each (LR ${a}°)</dt><dd>${both(to)}</dd><dt>Pipe cut length (no gaps)</dt><dd>${cut>0?both(cut):'<span class="chip bad">too short</span>'}</dd></dl>`;}}
 /* slope */
 {const m=$('#sl-m').value,u=$('#sl-u').value,L=num('#sl-l'),sv=num('#sl-s'),e1=num('#sl-e1'),e2=num('#sl-e2');
  $('#sl-l').disabled=m==='len';$('#sl-s').disabled=m==='slope';$('#sl-u').disabled=m==='slope';$('#sl-e2').disabled=m==='drop';
  const toS=v=>u==='ratio'?1/v:u==='pct'?v/100:u==='mmm'?v/1000:Math.tan(v*Math.PI/180);
  let S,H,Lx;
  if(m==='drop'){S=toS(sv);Lx=L;H=Lx*S;}
  else if(m==='slope'){Lx=L;H=e1-e2;S=H/Lx;}
  else{S=toS(sv);H=e1-e2;Lx=H/S;}
  const ok=isFinite(S)&&isFinite(H)&&isFinite(Lx)&&Lx>0&&S!==0;
  if(!ok){$('#sl-out').innerHTML='<p>Check the inputs: length and slope must be non-zero, and the two elevations must differ.</p>';}
  else{const E2=e1-H, N=1/Math.abs(S), dir=H>=0?'falls':'rises';
   const big=m==='drop'?`Drop ${f2(Math.abs(H),1)} mm · End EL ${f2(E2,1)}`:m==='slope'?`1 : ${f2(N,N>=100?0:1)}  (${f2(Math.abs(S)*100,2)} %)`:`L = ${f2(Lx,0)} mm`;
   if(m!=='drop')$('#sl-e2').value=$('#sl-e2').value; else $('#sl-e2').value=+E2.toFixed(1);
   $('#sl-out').innerHTML=`<div class="big">${big}</div><p style="margin:2px 0 6px">Line ${dir} ${f2(Math.abs(H),1)} mm over ${f2(Lx,0)} mm horizontal.</p><dl class="kv">
    <dt>Slope, ratio</dt><dd>1 : ${f2(N,N>=100?0:1)}</dd><dt>Slope, percent</dt><dd>${f2(Math.abs(S)*100,3)} %</dd><dt>Slope, mm per m</dt><dd>${f2(Math.abs(S)*1000,2)}</dd>
    <dt>Slope angle</dt><dd>${f2(Math.atan(Math.abs(S))*180/Math.PI,3)}°</dd><dt>Drop H</dt><dd>${f2(Math.abs(H),1)} mm</dd><dt>Horizontal length L</dt><dd>${f2(Lx,0)} mm</dd>
    <dt>End EL</dt><dd>${f2(E2,1)}</dd><dt>True (sloped) length</dt><dd>${f2(Math.hypot(Lx,H),1)} mm</dd></dl>`;}}
 /* bolt length */
 {const t=$('#b-t').value,n=$('#b-n').value,c=$('#b-c').value,f=flRow(c,n);
  $('#b-w').disabled=t!=='wafer';$('#b-gn').disabled=t!=='wafer';$('#b-e').disabled=t!=='tap';
  if(!f){$('#b-out').innerHTML='<p>NPS '+n+'″ is not listed for Class '+c+' in B16.5.</p>';}
  else{
   const d=f.dv*25.4, tpi=f.dv<=1?{0.5:13,0.625:11,0.75:10,0.875:9,1:8}[f.dv]:8, pitch=25.4/tpi;
   const thr=f.dv<=1?'UNC':'8UN', tf=f.tf*25.4, rf=+c>=400?6.4:0, nutH=d;
   const gt=num('#b-gt')||0, gn=t==='wafer'?+$('#b-gn').value:1, w=t==='wafer'?(num('#b-w')||0):0;
   const proj=(num('#b-p')||0)*pitch, eng=+$('#b-e').value*d, R=+$('#b-r').value;
   const parts=[];
   const flanges=t==='tap'?1:2;
   parts.push([`Flange thickness tf × ${flanges}`,tf*flanges]);
   if(rf)parts.push([`Raised face 6.4 mm × ${flanges}`,rf*flanges]);
   parts.push([`Gasket ${gt} mm × ${gn}`,gt*gn]);
   if(w)parts.push(['Wafer valve / blind / orifice',w]);
   if(t==='stud'||t==='wafer'||t==='hyd'){parts.push(['Heavy hex nut height (= d) × 2',nutH*2]);parts.push([`Projection ${num('#b-p')} threads × 2 ends`,proj*2]);}
   if(t==='mach'){parts.push(['Heavy hex nut height (= d) × 1',nutH]);parts.push([`Projection ${num('#b-p')} threads, nut end`,proj]);}
   if(t==='tap'){parts.push(['Heavy hex nut height (= d) × 1',nutH]);parts.push([`Projection ${num('#b-p')} threads, nut end`,proj]);parts.push([`Engagement in tapped hole ${$('#b-e').value} × d`,eng]);}
   if(t==='hyd')parts.push(['Tensioner allowance 1 × d, one end',d]);
   const Lc=parts.reduce((a,p)=>a+p[1],0), L=Math.ceil(Lc/R-1e-9)*R;
   const Lin=L/25.4;
   const names={stud:'Stud bolt',mach:'Machine bolt',tap:'Tap-end stud',wafer:'Stud bolt',hyd:'Stud bolt (tensioning)'};
   const nuts=t==='stud'||t==='wafer'||t==='hyd'?2:1;
   const qty=f.n;
   const desc=`${qty} nos. ${names[t]} ${f.d}″-${tpi} ${thr} × ${R===6.35?Lin.toFixed(2)+'″':L.toFixed(0)+' mm'}, with ${nuts} heavy hex nut${nuts>1?'s':''} each`;
   $('#b-out').innerHTML=`<div class="big">${f.n} × ${f.d}″ × ${R===6.35?Lin.toFixed(2)+'″':L.toFixed(0)+' mm'}</div>
    <p style="margin:2px 0 6px">${desc}. Calculated ${f2(Lc,1)} mm (${f2(Lc/25.4,2)}″), rounded up.${t==='mach'?' Length is under the head; head not included.':''}${t==='tap'?' One flange is tapped, so per stud: 1 nut, and hole depth must exceed the engagement.':''}</p>
    <div class="tw"><table class="cases"><thead><tr><th style="text-align:left">Length build-up</th><th>mm</th></tr></thead><tbody>${parts.map(p=>`<tr><td style="text-align:left">${p[0]}</td><td>${f2(p[1],1)}</td></tr>`).join('')}<tr class="best"><td style="text-align:left">Total, before rounding</td><td>${f2(Lc,1)}</td></tr></tbody></table></div>
    <dl class="kv" style="margin-top:6px"><dt>Bolt diameter d / pitch</dt><dd>${f2(d,1)} mm / ${f2(pitch,2)} mm (${tpi} TPI)</dd><dt>Bolt hole Ø</dt><dd>${f2(d+3.2,1)} mm</dd><dt>Bolts per flange</dt><dd>${f.n}</dd><dt>Bolts per joint, set</dt><dd>${f.n} studs + ${f.n*nuts} nuts</dd></dl>
    <p style="margin-top:6px">Typical material: ASTM A193 B7 stud with A194 2H nuts; A320 L7 / A194 Gr 7 for low temperature; A193 B8M / A194 8M for stainless. Machine bolts are normally limited to Class 150 non-critical service. Check your piping class.</p>`;}}
 /* spacing */
 {const na=$('#s-na').value,nb=$('#s-nb').value,ca=$('#s-ca').value,cb=$('#s-cb').value;
  const fa=flRow(ca,na),fb=flRow(cb,nb),oa=PIPEMAP[na][1]*25.4,ob=PIPEMAP[nb][1]*25.4,ia=num('#s-ia'),ib=num('#s-ib'),cl=num('#s-cl');
  if(!fa||!fb){$('#s-out').innerHTML='<p>Size not available in that class.</p>';}
  else{const FA=fa.O*25.4,FB=fb.O*25.4;
   const c1=FA/2+ob/2+ib+cl,c2=FB/2+oa/2+ia+cl,c3=oa/2+ia+ob/2+ib+cl,cc=Math.max(c1,c2,c3);
   const ctl=cc===c1?'flange A vs line B':cc===c2?'flange B vs line A':'insulation vs insulation';
   $('#s-out').innerHTML=`<div class="big">${both(cc,0)}</div><p style="margin:2px 0 6px">Governed by ${ctl}. Round up to your project's rack module (often 25 or 50 mm).</p><dl class="kv"><dt>Flange A OD / pipe A OD</dt><dd>${f2(FA,1)} / ${f2(oa,1)} mm</dd><dt>Flange B OD / pipe B OD</dt><dd>${f2(FB,1)} / ${f2(ob,1)} mm</dd></dl>`;}}
 /* converter */
 {const x=num('#v-x'),u=$('#v-u').value;let o=[];
  const len={in:25.4,mm:1,ft:304.8,m:1000},pr={bar:1,psi:1/14.5038,MPa:10,kgcm:0.980665};
  if(u in len){const mm=x*len[u];o=[['mm',mm,3],['inch',mm/25.4,4],['ft',mm/304.8,4],['m',mm/1000,4]];}
  else if(u in pr){const b=x*pr[u];o=[['bar',b,3],['psi',b*14.5038,2],['MPa',b/10,4],['kg/cm²',b/0.980665,3],['kPa',b*100,1]];}
  else if(u==='C'){o=[['°C',x,1],['°F',x*9/5+32,1],['K',x+273.15,2]];}
  else{const c=(x-32)*5/9;o=[['°F',x,1],['°C',c,1],['K',c+273.15,2]];}
  $('#v-out').innerHTML=`<dl class="kv">${o.map(([k,v,d])=>`<dt>${k}</dt><dd>${f2(v,d)}</dd>`).join('')}</dl>`;}
}


/* ============================== SHOE SPOOL LENGTH ============================== */
/* PRELIMINARY layout estimate (approx., assumed values) of spool length to fit a pipe shoe between a flange and another flange / butt weld.
   Flange tf, Y and bolt data come from the FL (B16.5) table; stud length uses the same
   build-up as the Bolt length calculator (2 nuts, gasket, 3-thread projection, rounded to 5 mm). */
let SH_CASE=store.get('shcase','FF');
function renderShoe(){
 const cls=store.get('shcls','150'), nps=store.get('shnps','6');
 $('#p-shoe').innerHTML=`<div class="phead"><div><h1>Shoe support: approx. spool length <span class="chip" style="background:var(--hi);color:var(--hi-ink);font-family:var(--f-mono);font-size:12px;vertical-align:middle">PRELIMINARY</span></h1><p>Approximate straight spool length needed to fit a pipe shoe while keeping the shoe attachment weld clear of butt welds and leaving room to withdraw the flange stud bolts. Two spool cases: flanged both ends, or flanged one end and butt-welded the other.</p></div></div>
 <div class="eq-custom" style="margin-bottom:14px"><b>Preliminary layout check only: approximate values based on assumed data.</b> This is an estimate, not a guaranteed minimum. Stud length, flange geometry, bolt withdrawal direction, weld clearance and allowances are assumed. The real length depends on the mating component, the bolt extraction path, actual shoe dimensions, the weld procedure and your project rules. Confirm against the pipe support standard, vendor data and isometric checking before fixing the spool.</div>
 <div class="shoe-grid">
  <div class="calc"><h3>Inputs</h3>
   <div class="fg">
    <label>NPS<select class="sel" id="sh-n"></select></label>
    <label>Flange class<select class="sel" id="sh-c">${sizeOpts(CLASSES,cls)}</select></label>
    <label>Shoe length, mm<input class="inp" id="sh-l" type="number" step="10" min="0" value="${store.get('shlen','300')}"></label>
   </div>
   <div><span class="lbl" style="display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)">Spool case</span>${seg('sh-case',[['FF','Case 1 · Flange × Flange'],['FW','Case 2 · Flange × Weld']],SH_CASE)}</div>
   <h3 style="font-size:16px;margin-top:4px">Clearances (set to project spec)</h3>
   <div class="fg">
    <label>Weld clearance, mm<input class="inp" id="sh-cw" type="number" step="5" min="0" value="50"></label>
    <label>Bolt handling allowance, mm<input class="inp" id="sh-cb" type="number" step="5" min="0" value="25"></label>
    <label>Gasket thickness, mm<input class="inp" id="sh-gt" type="number" step="0.1" min="0" value="4.5"></label>
    <label>Stud length override, mm<input class="inp" id="sh-so" type="number" step="5" min="0" placeholder="auto"></label>
    <label>Round result up to<select class="sel" id="sh-r"><option value="1">No rounding</option><option value="5">5 mm</option><option value="10" selected>10 mm</option><option value="25">25 mm</option><option value="50">50 mm</option></select></label>
    <label>Field-weld allowance, mm<input class="inp" id="sh-fa" type="number" step="10" min="0" value="100"></label>
    <label class="chk"><input type="checkbox" id="sh-fw"> Weld end is a field weld (Case 2)</label>
   </div>
  </div>
  <div class="calc"><h3>Result</h3><div id="sh-out"></div></div>
 </div>
 <p class="note"><b>Clearance A</b> (RF face to shoe end) is the larger of <b>bolt removal</b> = flange thickness (incl. RF) + stud length + handling allowance, and <b>weld clearance</b> = hub length Y (incl. RF) + weld clearance. Case 1 = A + shoe + A. Case 2 = A + shoe + weld clearance (+ field-weld allowance). Spool length is measured from the RF gasket face to the other RF face or the bevel end.</p>
 <p class="note"><b>Assumed values (approx.):</b></p><ul class="note" style="margin-top:4px;padding-left:20px">
  <li>Studs are withdrawn towards the spool side. If they can come out from the mating side (valve, nozzle), the spool can be shorter; if the mating side blocks extraction differently, it can be longer.</li>
  <li>Stud length is estimated with the same build-up as the Bolt length calculator (2 heavy nuts, gasket, 3-thread projection). Actual purchased stud length may differ.</li>
  <li>Flange thickness and hub length are B16.5 weld neck RF values; slip-on, lap-joint, RTJ or vendor flanges differ.</li>
  <li>Weld clearance, bolt handling and field-weld allowances are typical defaults, not code values. Shoe length is taken as entered; actual shoe and attachment weld size come from the support standard.</li>
  <li>Use the result as a preliminary layout check. The project pipe support standard, weld procedure and piping class govern.</li></ul>`;
 const fillN=()=>{const c=$('#sh-c').value,cur=store.get('shnps','6'),list=FL[c].nps;$('#sh-n').innerHTML=sizeOpts(list,list.includes(cur)?cur:list[0]);};
 fillN();
 $('#sh-c').addEventListener('change',()=>{store.set('shcls',$('#sh-c').value);fillN();runShoe();});
 $('#sh-n').addEventListener('change',()=>{store.set('shnps',$('#sh-n').value);runShoe();});
 $('#sh-l').addEventListener('input',()=>{store.set('shlen',$('#sh-l').value);runShoe();});
 bindSeg('sh-case',v=>{SH_CASE=v;store.set('shcase',v);document.querySelectorAll('#sh-case button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));runShoe();});
 document.querySelectorAll('#p-shoe .fg input, #p-shoe .fg select').forEach(el=>{if(!['sh-n','sh-c','sh-l'].includes(el.id)){el.addEventListener('input',runShoe);el.addEventListener('change',runShoe);}});
 runShoe();
}
function shoeStud(f,cls,gt){ /* same build-up as the Bolt length calculator, rounded up to 5 mm */
 const d=f.dv*25.4, tpi=f.dv<=1?{0.5:13,0.625:11,0.75:10,0.875:9,1:8}[f.dv]:8, pitch=25.4/tpi, rf=+cls>=400?6.4:0;
 const Lc=2*f.tf*25.4+2*rf+gt+2*d+2*3*pitch;
 return Math.ceil(Lc/5-1e-9)*5;
}
function runShoe(){
 const c=$('#sh-c').value,n=$('#sh-n').value,f=flRow(c,n),out=$('#sh-out');
 if(!f){out.innerHTML='<p>NPS '+n+'″ is not listed for Class '+c+' in B16.5.</p>';return;}
 const v=(id,d)=>{const x=num(id);return isFinite(x)&&x>=0?x:d;};
 const Ls=v('#sh-l',300),Cw=v('#sh-cw',50),Cb=v('#sh-cb',25),gt=v('#sh-gt',4.5),R=+$('#sh-r').value;
 const so=num('#sh-so'),override=isFinite(so)&&so>0;
 const rf=+c>=400?6.4:0, tf=f.tf*25.4+rf, Y=f.Y*25.4+rf;
 const stud=override?so:shoeStud(f,c,gt);
 const fw=$('#sh-fw').checked&&SH_CASE==='FW', FA=fw?v('#sh-fa',100):0;
 $('#sh-fw').disabled=SH_CASE!=='FW';$('#sh-fa').disabled=SH_CASE!=='FW'||!$('#sh-fw').checked;
 const byBolt=tf+stud+Cb, byWeld=Y+Cw, A=Math.max(byBolt,byWeld), gov=byBolt>=byWeld?'bolt removal':'weld clearance';
 const B=SH_CASE==='FF'?A:Cw+FA;
 const raw=A+Ls+B, L=Math.ceil(raw/R-1e-9)*R;
 const pos=A+Ls/2, cut=SH_CASE==='FF'?L-2*Y:L-Y;
 const parts=[[`Clearance A, flange end (${gov})`,A],['Shoe length',Ls]];
 if(SH_CASE==='FF')parts.push([`Clearance A, second flange end (${gov})`,A]);
 else{parts.push(['Weld clearance at butt-weld end',Cw]);if(fw)parts.push(['Field-weld fit-up allowance',FA]);}
 out.innerHTML=`<div class="big">${both(L,0)}</div>
  <p style="margin:2px 0 8px"><b>Approx. spool length (preliminary)</b>, ${SH_CASE==='FF'?'RF face to RF face':'RF face to bevel end'}. Calculated ${f2(raw,1)} mm${R>1?`, rounded up to ${R} mm`:''}, using the assumed values below.</p>
  <div class="shoe-kpi"><div><span class="lbl">Shoe CL from RF face (approx.)</span><span class="val mono">${f2(pos,0)} mm</span></div><div><span class="lbl">Pipe cut length (approx.)</span><span class="val mono">${f2(cut,0)} mm</span></div><div><span class="lbl">Clearance A governed by</span><span class="val">${gov}</span></div></div>
  ${shoeSVG(SH_CASE,A,Ls,B,L,fw)}
  <div class="tw"><table class="cases"><thead><tr><th style="text-align:left">Length build-up</th><th>mm</th></tr></thead><tbody>${parts.map(p=>`<tr><td style="text-align:left">${p[0]}</td><td>${f2(p[1],1)}</td></tr>`).join('')}<tr class="best"><td style="text-align:left">Approx. spool length${R>1?' (rounded)':''}</td><td>${f2(L,0)}</td></tr></tbody></table></div>
  <dl class="kv" style="margin-top:6px"><dt>Flange thickness incl. RF (B16.5 Cl.${c}, ${npsLbl(n)})</dt><dd>${f2(tf,1)} mm</dd><dt>Hub length Y incl. RF</dt><dd>${f2(Y,1)} mm</dd><dt>Stud bolt ${override?'(user override)':`${f.n} × ${f.d}″ (assumed, calc.)`}</dt><dd>${f2(stud,0)} mm</dd><dt>Bolt removal: tf + stud + ${f2(Cb,0)}</dt><dd>${f2(byBolt,1)} mm</dd><dt>Weld clearance: Y + ${f2(Cw,0)}</dt><dd>${f2(byWeld,1)} mm</dd></dl>
  ${Ls<100?'<p style="color:var(--bad);margin-top:6px">Shoe length looks short. Check against your support standard.</p>':''}`;
}
function shoeSVG(cs,A,Ls,B,L,fw){
 const x0=50,x1=590,cy=78,r=22,k=(x1-x0)/(A+Ls+B),xs=x0+A*k,xe=xs+Ls*k;
 const flg=(x,dir)=>{const a=dir>0?x:x-12,h1=dir>0?x+12:x-12,h2=dir>0?x+34:x-34;
  return `<rect x="${a}" y="${cy-42}" width="12" height="84" fill="var(--rule-strong)" stroke="var(--ink)"/>
   <polygon points="${h1},${cy-32} ${h2},${cy-r} ${h2},${cy+r} ${h1},${cy+32}" fill="var(--rule-strong)" stroke="var(--ink)"/>
   ${[-34,34].map(o=>`<line x1="${dir>0?x-18:x+18}" y1="${cy+o}" x2="${dir>0?x+26:x-26}" y2="${cy+o}" stroke="var(--ink)" stroke-width="3"/>`).join('')}`;};
 const dim=(a,b,y,t)=>`<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="var(--accent)" marker-start="url(#sh-ar)" marker-end="url(#sh-ar)"/>
  <line x1="${a}" y1="${y-7}" x2="${a}" y2="${y+7}" stroke="var(--accent)"/><line x1="${b}" y1="${y-7}" x2="${b}" y2="${y+7}" stroke="var(--accent)"/>
  <text x="${(a+b)/2}" y="${y-5}" text-anchor="middle" font-size="12" font-family="var(--f-mono)" fill="var(--ink)">${t}</text>`;
 const pipeEnd=cs==='FF'?x1-34:x1;
 const right=cs==='FF'?flg(x1,-1):`<line x1="${x1}" y1="${cy-r-6}" x2="${x1}" y2="${cy+r+6}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/><text x="${x1+5}" y="${cy-r-8}" font-size="11" fill="var(--muted)">${fw?'FW':'BW'}</text>`;
 return `<svg class="shoe-svg" viewBox="0 0 640 210" role="img" aria-label="Spool schematic with shoe position" style="margin:10px 0">
  <defs><marker id="sh-ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,2 L10,5 L0,8 z" fill="var(--accent)"/></marker></defs>
  <rect x="${x0+34}" y="${cy-r}" width="${pipeEnd-(x0+34)}" height="${2*r}" fill="var(--accent-soft)" stroke="var(--ink)"/>
  <line x1="${x0-20}" y1="${cy}" x2="${x1+20}" y2="${cy}" stroke="var(--muted)" stroke-dasharray="10 4 2 4"/>
  ${flg(x0,1)}${right}
  <rect x="${xs}" y="${cy+r}" width="${xe-xs}" height="20" fill="var(--hi)" stroke="var(--ink)"/>
  <text x="${(xs+xe)/2}" y="${cy+r+14}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--hi-ink)">SHOE</text>
  <line x1="${xs-26}" y1="${cy+r+20}" x2="${xe+26}" y2="${cy+r+20}" stroke="var(--ink)" stroke-width="2"/>
  ${dim(x0,xs,cy+r+44,'A '+f2(A,0))}${dim(xs,xe,cy+r+44,'Shoe '+f2(Ls,0))}${dim(xe,x1,cy+r+44,(cs==='FF'?'A ':'')+f2(B,0))}
  ${dim(x0,x1,cy+r+80,'Approx. spool length '+f2(L,0)+' mm (preliminary)')}
  <text x="${x0}" y="18" font-size="11" fill="var(--muted)">RF face</text>
  <text x="${x1}" y="18" font-size="11" fill="var(--muted)" text-anchor="end">${cs==='FF'?'RF face':'Bevel end'}</text></svg>`;
}


/* ============================== EQUIPMENT DATA VERIFICATION ============================== */
/* Teaching checklist: what data a piping engineer verifies on a vendor's mechanical datasheet
   and GA / nozzle orientation drawing, what to verify it against, and why it matters.
   Item: [id, data to verify, verify against, why it matters] */
/* Checklist items live in the <script id="eq-data"> JSON block near the top of this file.
   Edit them with Export / Import Excel on the tab, then Save updated equipment-data-check.html. */
const EQD_BUILTIN=JSON.parse(document.getElementById('eq-data').textContent);
let EQD=EQD_BUILTIN, EQD_CUSTOM=null;
try{const o=JSON.parse(store.get('eqdata','null'));
 if(o&&o.D&&o.D.mds&&o.D.dwg){if(JSON.stringify(o.D)===JSON.stringify(EQD_BUILTIN))store.set('eqdata','');else{EQD=o.D;EQD_CUSTOM=o;}}}catch(e){}
const EQ_TYPES=[['ves','Vessels & columns'],['hex','Heat exchangers'],['rot','Rotating'],['tnk','Tanks'],['htr','Fired heaters'],['pkg','Packages']];
const EQ_DOCS=[['mds','Mechanical datasheet'],['dwg','Vendor drawing']];
const EQ_HEAD=[['tag','Equipment tag'],['doc','Document no.'],['rev','Revision'],['vendor','Vendor'],['by','Checked by'],['date','Date']];
let EQ=(()=>{try{return JSON.parse(store.get('eq2','{}'))||{}}catch(e){return {}}})();
EQ.t=EQ.t||'ves';EQ.d=EQ.d||'mds';EQ.st=EQ.st||{};EQ.rm=EQ.rm||{};EQ.h=EQ.h||{};if(EQ.why==null)EQ.why=true;
const saveEQ=()=>store.set('eq2',JSON.stringify(EQ));
const eqEsc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function eqSections(){const D=EQD[EQ.d];return [...(D.gen||[]).map(([n,items])=>({n,items,gen:true})),...((D.type||{})[EQ.t]||[]).map(([n,items])=>({n,items,gen:false}))];}
function renderEq(){
 const secs=eqSections();let no=0;
 const row=([id,da,ag,wy])=>{no++;const st=EQ.st[id]||'';
  return `<div class="eq-row${st?' s-'+st:''}" data-id="${id}"><span class="no">${String(no).padStart(2,'0')}</span>
   <div class="da">${eqEsc(da)}</div><div class="ag">${eqEsc(ag||'')}</div><div class="wy">${eqEsc(wy||'')}</div>
   <div class="eq-ck"><label class="ok"><input type="checkbox" data-s="ok"${st==='ok'?' checked':''}>OK</label><label class="nok"><input type="checkbox" data-s="nok"${st==='nok'?' checked':''}>Not OK</label></div>
   <input class="inp rm" placeholder="What is wrong? (optional)" value="${eqEsc(EQ.rm[id]||'')}"></div>`;};
 const pane=$('#p-eqck');pane.classList.toggle('nowhy',!EQ.why);
 pane.innerHTML=`<div class="phead"><div><h1>Equipment data verification</h1><p>What data to verify when checking a vendor's mechanical datasheet or equipment drawing, which document to verify it against, and why it matters to piping. Tick <b>OK</b> when the data agrees, <b>Not OK</b> when it does not.</p></div>
 <div class="ctrls"><label class="ctrl"><span class="lbl">Document</span>${seg('eqD',EQ_DOCS,EQ.d)}</label><label class="ctrl"><span class="lbl">Equipment type</span>${seg('eqT',EQ_TYPES,EQ.t)}</label></div></div>
 <div class="eq-head">${EQ_HEAD.map(([k,l])=>`<label>${l}<input class="inp" data-h="${k}" ${k==='date'?'type="date"':''} value="${eqEsc(EQ.h[k]||'')}"></label>`).join('')}<label>Checking<span style="font-size:13px;color:var(--ink);margin-top:6px;text-transform:none;letter-spacing:0">${EQD[EQ.d].name} · ${EQ_TYPES.find(x=>x[0]===EQ.t)[1]}</span></label></div>
 ${EQD_CUSTOM?`<div class="eq-custom eq-hide-print"><b>Custom list from Excel is active in this browser</b> (${EQD_CUSTOM.n} items, imported ${eqEsc(EQD_CUSTOM.at||'')}). It is not in the file yet: use <b>Save updated equipment-data-check.html</b> to make it permanent.</div>`:''}
 <details class="eq-xl eq-hide-print"${EQD_CUSTOM?' open':''}><summary>Edit the checklist in Excel</summary>
  <ol>
   <li><button class="eq-btn" id="eqXlOut">Export list to Excel</button> <span>Downloads every item (all documents and equipment types) as an .xlsx file.</span></li>
   <li><span>In Excel, add, edit or delete rows on the <b>Checklist</b> sheet and save it as .xlsx. Leave <b>Code</b> blank for new rows.</span></li>
   <li><label class="eq-btn" for="eqXlIn">Import from Excel</label><input type="file" id="eqXlIn" accept=".xlsx" hidden> <span>The tab updates in this browser straight away.</span></li>
   <li><button class="eq-btn" id="eqXlSave"${EQD_CUSTOM?'':' disabled'}>Save updated equipment-data-check.html</button> <span>Writes the imported list into equipment-data-check.html. You will be asked to pick your current index.html; the updated copy downloads. Replace the old file (or upload it to GitHub).</span></li>
  </ol>
  <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="eq-btn" id="eqXlReset"${EQD_CUSTOM?'':' disabled'}>Restore built-in list</button><span class="eq-xlmsg" id="eqXlMsg"></span></div>
  <input type="file" id="eqHtmlIn" accept=".html,.htm" hidden>
 </details>
 <div class="eq-bar"><div class="eq-prog" id="eqProg"></div>
  <div style="display:flex;gap:10px 14px;flex-wrap:wrap;align-items:center"><label class="eq-tog"><input type="checkbox" id="eqWhy"${EQ.why?' checked':''}> Show why it matters</label><button class="eq-btn" id="eqCopy">Copy Not OK list</button><button class="eq-btn" id="eqPrint">Print / PDF</button><button class="eq-btn" id="eqReset">Clear ticks</button></div></div>
 ${secs.map((sc,i)=>`<div class="eq-sec${sc.gen?' gen':''}" data-sec="${i}"><h3>${sc.gen?'':'◆ '}${eqEsc(sc.n)}<small></small></h3>
  <div class="eq-cols"><span>#</span><span>Data to verify</span><span>Verify against</span><span class="h-wy">Why it matters</span><span style="text-align:right">Result</span></div>
  ${sc.items.map(row).join('')}</div>`).join('')}
 <p class="note eq-hide-print"><b>Tip.</b> Check the mechanical datasheet first, then the drawing against the datasheet. Ticks are saved in this browser only; use Clear ticks before the next document. Adapt the list to your project specifications.</p>`;
 eqProgress();
 bindSeg('eqD',v=>{EQ.d=v;saveEQ();renderEq();});
 bindSeg('eqT',v=>{EQ.t=v;saveEQ();renderEq();});
 pane.querySelectorAll('[data-h]').forEach(el=>el.addEventListener('input',()=>{EQ.h[el.dataset.h]=el.value;saveEQ();}));
 $('#eqWhy').addEventListener('change',e=>{EQ.why=e.target.checked;saveEQ();pane.classList.toggle('nowhy',!EQ.why);});
 pane.querySelectorAll('.eq-row').forEach(r=>{const id=r.dataset.id,rm=r.querySelector('.rm');
  r.querySelectorAll('.eq-ck input').forEach(cb=>cb.addEventListener('change',()=>{
   const v=cb.checked?cb.dataset.s:'';
   r.querySelectorAll('.eq-ck input').forEach(o=>{if(o!==cb)o.checked=false;});
   if(v)EQ.st[id]=v;else delete EQ.st[id];saveEQ();
   r.className='eq-row'+(v?' s-'+v:'');if(v==='nok')rm.focus();eqProgress();}));
  rm.addEventListener('input',()=>{if(rm.value)EQ.rm[id]=rm.value;else delete EQ.rm[id];saveEQ();});});
 $('#eqCopy').addEventListener('click',eqCopy);
 $('#eqPrint').addEventListener('click',()=>window.print());
 $('#eqXlOut').addEventListener('click',eqExportXlsx);
 $('#eqXlIn').addEventListener('change',e=>{const f=e.target.files[0];e.target.value='';if(f)eqImportXlsx(f);});
 $('#eqXlSave').addEventListener('click',eqSaveHtml);
 $('#eqXlReset').addEventListener('click',()=>{store.set('eqdata','');EQD=EQD_BUILTIN;EQD_CUSTOM=null;renderEq();$('.eq-xl').open=true;eqMsg('Built-in list restored.','ok');});
 const rb=$('#eqReset');rb.addEventListener('click',()=>{
  if(!rb.classList.contains('warn')){rb.classList.add('warn');rb.textContent='Click again to clear';setTimeout(()=>{if(rb.isConnected){rb.classList.remove('warn');rb.textContent='Clear ticks';}},3000);return;}
  EQ.st={};EQ.rm={};EQ.h={};saveEQ();renderEq();});
}
function eqProgress(){
 const secs=eqSections(),ids=secs.flatMap(sc=>sc.items.map(i=>i[0]));
 const ok=ids.filter(id=>EQ.st[id]==='ok').length,nok=ids.filter(id=>EQ.st[id]==='nok').length,pct=ids.length?Math.round((ok+nok)/ids.length*100):0;
 $('#eqProg').innerHTML=`Verified <b>${ok+nok}</b> / ${ids.length} · OK <b>${ok}</b> · Not OK <b class="bad">${nok}</b><span class="eq-meter"><i style="width:${pct}%"></i></span>`;
 secs.forEach((sc,i)=>{const el=document.querySelector(`#p-eqck [data-sec="${i}"] h3 small`);if(!el)return;
  const d=sc.items.filter(x=>EQ.st[x[0]]).length,n=sc.items.filter(x=>EQ.st[x[0]]==='nok').length;el.textContent=`${d}/${sc.items.length}${n?` · ${n} not OK`:''}`;});
}
function eqCopy(){
 const secs=eqSections(),h=EQ.h,L=[];let n=0,no=0;
 L.push(`${EQD[EQ.d].name} review — ${h.tag||'(tag)'} · ${EQ_TYPES.find(x=>x[0]===EQ.t)[1]}`);
 L.push(`Doc ${h.doc||'—'} Rev ${h.rev||'—'} · Vendor ${h.vendor||'—'} · Checked by ${h.by||'—'}${h.date?' · '+h.date:''}`);L.push('');
 secs.forEach(sc=>sc.items.forEach(([id,da,ag])=>{no++;if(EQ.st[id]==='nok'){n++;L.push(`${n}. ${da} (item ${no}; verified against ${ag})${EQ.rm[id]?`\n   ${EQ.rm[id]}`:''}`);}}));
 if(!n)L.push('No items marked Not OK.');
 const txt=L.join('\n'),b=$('#eqCopy');window.__eqLastCopy=txt;
 const done=()=>{b.textContent=`Copied ${n} item${n===1?'':'s'}`;setTimeout(()=>{if(b.isConnected)b.textContent='Copy Not OK list';},2000);};
 const fb=()=>{const a=document.createElement('textarea');a.value=txt;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');}catch(e){}a.remove();done();};
 try{navigator.clipboard.writeText(txt).then(done,fb);}catch(e){fb();}
}


/* ---------- Excel round trip (self-contained .xlsx writer / reader, no library) ---------- */
const EQ_TYPE_LBL={gen:'General (all equipment)',ves:'Vessels & columns',hex:'Heat exchangers',rot:'Rotating',tnk:'Tanks',htr:'Fired heaters',pkg:'Packages'};
const EQ_DOC_LBL={mds:'Mechanical datasheet',dwg:'Vendor drawing'};
const EQ_XL_HEAD=['Document','Equipment type','Section','Code','Data to verify','Verify against','Why it matters'];
function eqMsg(html,cls){const m=$('#eqXlMsg');if(m){m.className='eq-xlmsg'+(cls?' '+cls:'');m.innerHTML=html;}}
function eqRows(D){const rows=[];
 for(const d of ['mds','dwg']){(D[d].gen||[]).forEach(([sec,items])=>items.forEach(i=>rows.push([EQ_DOC_LBL[d],EQ_TYPE_LBL.gen,sec,i[0],i[1],i[2]||'',i[3]||''])));
  for(const t of Object.keys(EQ_TYPE_LBL)){if(t==='gen')continue;((D[d].type||{})[t]||[]).forEach(([sec,items])=>items.forEach(i=>rows.push([EQ_DOC_LBL[d],EQ_TYPE_LBL[t],sec,i[0],i[1],i[2]||'',i[3]||''])));}}
 return rows;}
const XCRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
function xCrc(u){let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=XCRC[(c^u[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function xZip(files){const enc=new TextEncoder(),parts=[],cd=[];let off=0;
 for(const [name,str] of files){const nm=enc.encode(name),d=enc.encode(str),crc=xCrc(d);
  const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(12,0x21,true);h.setUint32(14,crc,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  parts.push(new Uint8Array(h.buffer),nm,d);
  const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(14,0x21,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  cd.push(new Uint8Array(c.buffer),nm);off+=30+nm.length+d.length;}
 const cl=cd.reduce((a,b)=>a+b.length,0),e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cl,true);e.setUint32(16,off,true);
 return new Blob([...parts,...cd,new Uint8Array(e.buffer)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});}
const xEsc=t=>String(t??'').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const xCol=i=>{let s='';i++;while(i){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26);}return s;};
const xColIdx=ref=>{const m=/^[A-Z]+/.exec(ref);let n=0;for(const ch of m?m[0]:'A')n=n*26+ch.charCodeAt(0)-64;return n-1;};
function xSheet(rows,widths,opt={}){
 const data=rows.map((r,ri)=>`<row r="${ri+1}">${r.map((v,ci)=>`<c r="${xCol(ci)}${ri+1}" t="inlineStr" s="${ri===0&&opt.head?1:2}"><is><t xml:space="preserve">${xEsc(v)}</t></is></c>`).join('')}</row>`).join('');
 const last=xCol(Math.max(0,(rows[0]||[]).length-1));
 return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`+
  (opt.head?`<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`:'')+
  `<cols>${widths.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${data}</sheetData>`+
  (opt.head?`<autoFilter ref="A1:${last}${rows.length}"/>`:'')+
  (opt.lists?`<dataValidations count="${opt.lists.length}">${opt.lists.map(([col,vals])=>`<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="${col}2:${col}5000"><formula1>"${xEsc(vals.join(','))}"</formula1></dataValidation>`).join('')}</dataValidations>`:'')+
  `</worksheet>`;}
function eqExportXlsx(){
 const rows=[EQ_XL_HEAD,...eqRows(EQD)];
 const help=[['How to edit this checklist'],
  ['1. Work on the "Checklist" sheet. One row = one item. Rows show in the tab in the same order.'],
  ['2. Document: Mechanical datasheet or Vendor drawing (pick from the drop-down).'],
  ['3. Equipment type: General (all equipment) shows for every type; otherwise Vessels & columns, Heat exchangers, Rotating, Tanks, Fired heaters or Packages.'],
  ['4. Section: heading the item is grouped under. Rows with the same section name are grouped together.'],
  ['5. Code: leave blank for new rows (one is made automatically). Do not change codes of existing rows, so saved ticks stay with them.'],
  ['6. Data to verify is required. Verify against and Why it matters are optional but help new engineers.'],
  ['7. To delete an item, delete its row. Keep the header row (row 1) as it is.'],
  ['8. Save as .xlsx, then on the tab use Import from Excel, check the list, and Save updated equipment-data-check.html.']];
 const files=[
  ['[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
  ['_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
  ['xl/workbook.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Checklist" sheetId="1" r:id="rId1"/><sheet name="How to use" sheetId="2" r:id="rId2"/></sheets><definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">Checklist!$A$1:$G$'+rows.length+'</definedName></definedNames></workbook>'],
  ['xl/_rels/workbook.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
  ['xl/styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'],
  ['xl/worksheets/sheet1.xml',xSheet(rows,[22,24,28,9,50,32,60],{head:true,lists:[['A',Object.values(EQ_DOC_LBL)],['B',Object.values(EQ_TYPE_LBL)]]})],
  ['xl/worksheets/sheet2.xml',xSheet(help,[120])]];
 const a=document.createElement('a');a.href=URL.createObjectURL(xZip(files));a.download='equipment-data-checklist.xlsx';document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
 eqMsg(`Exported ${rows.length-1} items to equipment-data-checklist.xlsx.`,'ok');}
async function xUnzip(buf){const u=new Uint8Array(buf),v=new DataView(buf),dec=new TextDecoder();let e=-1;
 for(let i=u.length-22;i>=Math.max(0,u.length-65558);i--)if(v.getUint32(i,true)===0x06054b50){e=i;break;}
 if(e<0)throw new Error('This is not an .xlsx file. In Excel use File > Save As > Excel Workbook (*.xlsx).');
 const n=v.getUint16(e+10,true),files={};let p=v.getUint32(e+16,true);
 for(let k=0;k<n;k++){const meth=v.getUint16(p+10,true),cs=v.getUint32(p+20,true),nl=v.getUint16(p+28,true),el=v.getUint16(p+30,true),cl=v.getUint16(p+32,true),lo=v.getUint32(p+42,true);
  const name=dec.decode(u.subarray(p+46,p+46+nl)),st=lo+30+v.getUint16(lo+26,true)+v.getUint16(lo+28,true);
  files[name]={meth,data:u.subarray(st,st+cs)};p+=46+nl+el+cl;}
 return async name=>{const f=files[name];if(!f)return null;let d=f.data;
  if(f.meth===8){if(typeof DecompressionStream==='undefined')throw new Error('This browser cannot read compressed .xlsx files. Use a current Chrome, Edge or Firefox.');
   d=new Uint8Array(await new Response(new Blob([d]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());}
  else if(f.meth!==0)throw new Error('Unsupported compression in the .xlsx file.');
  return dec.decode(d);};}
async function xReadSheet(file){
 const get=await xUnzip(await file.arrayBuffer()),P=t=>new DOMParser().parseFromString(t,'application/xml'),T=(el,tag)=>[...el.getElementsByTagNameNS('*',tag)];
 const wbx=await get('xl/workbook.xml');if(!wbx)throw new Error('This file is not an Excel workbook.');
 const sheets=T(P(wbx),'sheet').map(s=>({name:s.getAttribute('name'),rid:([...s.attributes].find(a=>a.localName==='id'&&a.name!=='sheetId')||{}).value}));
 const sh=sheets.find(s=>/checklist/i.test(s.name||''))||sheets[0];
 const rel=T(P(await get('xl/_rels/workbook.xml.rels')),'Relationship').find(r=>r.getAttribute('Id')===sh.rid);
 let tg=rel.getAttribute('Target');tg=tg.startsWith('/')?tg.slice(1):'xl/'+tg.replace(/^\.\//,'');
 const ssx=await get('xl/sharedStrings.xml');
 const ss=ssx?T(P(ssx),'si').map(si=>T(si,'t').filter(t=>t.parentNode.localName!=='rPh').map(t=>t.textContent).join('')):[];
 const rows=[];
 for(const r of T(P(await get(tg)),'row')){const cells=[];
  for(const c of T(r,'c')){const ref=c.getAttribute('r'),ci=ref?xColIdx(ref):cells.length,t=c.getAttribute('t');let val='';
   if(t==='inlineStr')val=T(c,'t').map(x=>x.textContent).join('');
   else{const ve=T(c,'v')[0];val=ve?ve.textContent:'';if(t==='s')val=ss[+val]??'';}
   cells[ci]=val;}
  rows.push({n:+r.getAttribute('r')||rows.length+1,cells});}
 return rows;}
const eqHash=t=>{let h=2166136261;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36);};
function eqMatchDoc(v){v=v.toLowerCase();return /datasheet|data sheet|mds/.test(v)?'mds':/drawing|\bga\b|dwg/.test(v)?'dwg':null;}
function eqMatchType(v){v=v.toLowerCase().trim();if(!v)return null;
 for(const [k,l] of Object.entries(EQ_TYPE_LBL))if(v===l.toLowerCase())return k;
 return /general|^all/.test(v)?'gen':/vessel|column|drum|tower/.test(v)?'ves':/exchanger|cooler/.test(v)?'hex':/rotat|pump|compressor/.test(v)?'rot':/tank/.test(v)?'tnk':/heater|furnace/.test(v)?'htr':/package|skid/.test(v)?'pkg':null;}
function eqParse(rows){
 const hi=rows.findIndex(r=>r.cells.some(v=>/data to verify/i.test(v||'')));
 if(hi<0)return {errs:['Header row not found. Keep row 1 with the column names (Document, Equipment type, Section, Code, Data to verify, Verify against, Why it matters).']};
 const H=rows[hi].cells.map(v=>String(v||'').toLowerCase().trim()),col=k=>H.findIndex(h=>h&&h.includes(k));
 const ci={doc:col('document'),type:col('equipment'),sec:col('section'),code:col('code'),da:col('data to verify'),ag:col('verify against'),wy:col('why')};
 if(ci.doc<0||ci.type<0)return {errs:['Columns "Document" and "Equipment type" are missing from the header row.']};
 const D={mds:{name:EQD_BUILTIN.mds.name,gen:[],type:{}},dwg:{name:EQD_BUILTIN.dwg.name,gen:[],type:{}}},used=new Set(),errs=[];let n=0;
 for(const r of rows.slice(hi+1)){const g=k=>ci[k]<0?'':String(r.cells[ci[k]]??'').trim();
  if(!Object.keys(ci).some(k=>g(k)))continue;
  const da=g('da'),d=eqMatchDoc(g('doc')),t=eqMatchType(g('type'));
  if(!da){errs.push(`Row ${r.n}: "Data to verify" is empty.`);continue;}
  if(!d){errs.push(`Row ${r.n}: Document "${g('doc')}" not recognised. Use Mechanical datasheet or Vendor drawing.`);continue;}
  if(!t){errs.push(`Row ${r.n}: Equipment type "${g('type')}" not recognised. Use one from the drop-down list.`);continue;}
  let id=g('code').replace(/[^\w-]/g,'')||('x'+eqHash(d+'|'+t+'|'+da));const base=id;let k=2;while(used.has(id))id=base+'_'+k++;used.add(id);
  const sec=g('sec')||(t==='gen'?'General':EQ_TYPE_LBL[t]),list=t==='gen'?D[d].gen:(D[d].type[t]=D[d].type[t]||[]);
  let S=list.find(x=>x[0]===sec);if(!S){S=[sec,[]];list.push(S);}
  S[1].push([id,da,g('ag'),g('wy')]);n++;}
 if(!n&&!errs.length)errs.push('No items found below the header row.');
 return {D,errs,n};}
async function eqImportXlsx(file){
 try{eqMsg('Reading '+eqEsc(file.name)+'…');
  const {D,errs,n}=eqParse(await xReadSheet(file));
  if(errs.length){eqMsg(`<b>Nothing imported.</b> Fix these rows in Excel and import again:<ul>${errs.slice(0,12).map(e=>`<li>${eqEsc(e)}</li>`).join('')}${errs.length>12?`<li>…and ${errs.length-12} more</li>`:''}</ul>`,'err');return;}
  const before=new Set(eqRows(EQD).map(r=>r[3])),added=eqRows(D).filter(r=>!before.has(r[3])).length;
  EQD=D;EQD_CUSTOM={D,n,at:new Date().toISOString().slice(0,10)};store.set('eqdata',JSON.stringify(EQD_CUSTOM));
  renderEq();eqMsg(`Imported ${n} items (${added} new). Check the list, then Save updated equipment-data-check.html.`,'ok');
 }catch(e){eqMsg(eqEsc(e.message||String(e)),'err');}}
function eqPickHtml(){return new Promise(res=>{const inp=$('#eqHtmlIn');inp.value='';inp.onchange=()=>{const f=inp.files[0];if(!f)return res(null);f.text().then(res);};inp.click();});}
async function eqSaveHtml(){
 try{let src=null;
  if(/^https?:/.test(location.protocol)){try{const r=await fetch(location.href,{cache:'no-store'});if(r.ok)src=await r.text();}catch(e){}}
  if(!src||!src.includes('id="eq-data"')){eqMsg('Pick your current equipment-data-check.html (this same file) so the new list can be written into it…');src=await eqPickHtml();}
  if(!src){eqMsg('Cancelled.');return;}
  const re=/(<script type="application\/json" id="eq-data">)[\s\S]*?(<\/script>)/;
  if(!re.test(src)){eqMsg('That file does not contain the checklist data block. Pick the equipment-data-check.html of this tool.','err');return;}
  const json=JSON.stringify(EQD).replace(/</g,'\\u003c');
  const out=src.replace(re,(m,a,b)=>a+json+b);
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([out],{type:'text/html'}));a.download='equipment-data-check.html';document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
  eqMsg('Downloaded the updated <b>equipment-data-check.html</b>. Replace your old equipment-data-check.html with it (or upload it to GitHub). After that, the list is part of the file for everyone.','ok');
 }catch(e){eqMsg(eqEsc(e.message||String(e)),'err');}}


/* ============================== REFERENCES (bottom of every tab) ============================== */
/* [kind, title, url, note]; kind: std = the governing standard (official page, paid document),
   free = free public table for cross-checking, vendor = manufacturer catalogue. */
const REF={
 b3610:['std','ASME B36.10M – Welded and seamless wrought steel pipe','https://www.asme.org/codes-standards/find-codes-standards/b36-10m-welded-and-seamless-wrought-steel-pipe'],
 b3619:['std','ASME B36.19M – Stainless steel pipe','https://www.asme.org/codes-standards/find-codes-standards/b36-19m-stainless-steel-pipe'],
 b165:['std','ASME B16.5 – Pipe flanges and flanged fittings, NPS ½ through NPS 24','https://asme.org/codes-standards/find-codes-standards/b16-5-pipe-flanges-flanged-fittings-nps-1-2-nps-24-metric-inch-standard'],
 b169:['std','ASME B16.9 – Factory-made wrought buttwelding fittings','https://www.asme.org/codes-standards/find-codes-standards/b16-9-factory-made-wrought-buttwelding-fittings'],
 b1611:['std','ASME B16.11 – Forged fittings, socket-welding and threaded','https://www.asme.org/codes-standards/find-codes-standards/b16-11-forged-fittings-socket-welding-threaded'],
 b1201:['std','ASME B1.20.1 – Pipe threads, general purpose (inch)','https://www.asme.org/codes-standards/find-codes-standards/b1201-pipe-threads-general-purpose-inch'],
 b1620:['std','ASME B16.20 – Metallic gaskets for pipe flanges','https://www.asme.org/products/codes-standards/b1620-2017-metallic-gaskets-pipe-flanges'],
 b1648:['std','ASME B16.48 – Line blanks','https://www.asme.org/codes-standards/find-codes-standards/b16-48-line-blanks'],
 wmSpec:['free','Wermac – Spectacle blind dimensions (B16.48, RF)','https://wermac.org/flanges/dimensions_spectacle-blind-flanges.html'],
 wmPad:['free','Wermac – Spades and ring spacers (paddle blank / spacer) dimensions (RF)','https://www.wermac.org/flanges/dimensions_spades_ring-spacer_paddle-blind_paddle-spacer.html'],
 hheSpec:['free','Hardhat Engineer – Spectacle blind dimensions and weights','https://hardhatengineer.com/spectacle-blind-dimensions/','Class 150 and 300 tables include web thickness, hole Ø and weights; confirms Class 150 NPS 16 C = 540 mm.'],
 usaRtj:['vendor','USA Industries – ASME B16.48 Class 150–2500 male / female RTJ line blank specifications','https://usaindustries.com/wp-content/uploads/2025/03/ASME-B16.48-ANSI-150-2500-Male-Female-RTJ-Specs-v.2.0.1.pdf','RTJ values on this tab: female (grooved both faces) table, converted from inch.'],
 b1610:['std','ASME B16.10 – Face-to-face and end-to-end dimensions of valves','https://www.asme.org/codes-standards/find-codes-standards/b16-10-face-face-end-end-dimensions-valves'],
 b311:['std','ASME B31.1 – Power piping (Table 121.5, suggested support spacing)','https://www.asme.org/codes-standards/find-codes-standards/b31-1-power-piping/2022'],
 b313:['std','ASME B31.3 – Process piping (para. 304.1.2, pressure design of straight pipe)','https://www.asme.org/codes-standards/b31-3-process-piping'],
 api609:['std','API 609 – Butterfly valves: double-flanged, lug- and wafer-type','https://standards.globalspec.com/std/10153645/api-std-609'],
 f1166:['std','ASTM F1166 – Human engineering design for marine systems, equipment and facilities (valve handwheel mounting heights)','https://store.astm.org/f1166-07.html'],
 bpvc:['std','ASME BPVC Section VIII Division 1 – Rules for construction of pressure vessels','https://www.csagroup.org/store/product/ASME_BPVC.VIII.1-2023/'],
 tema:['std','TEMA Standards – Tubular Exchanger Manufacturers Association','https://tema.org/standards/'],
 api610:['std','API 610 – Centrifugal pumps for petroleum, petrochemical and natural gas industries','https://standards.globalspec.com/std/32677/api-std-610'],
 api650:['std','API 650 – Welded tanks for oil storage','https://standards.globalspec.com/std/1016155/api-std-650'],
 api560:['std','API 560 – Fired heaters for general refinery service','https://standards.globalspec.com/std/797311/api-std-560'],
 pmPipe:['free','ProjectMaterials – Pipe size charts (B36.10 / B36.19)','https://blog.projectmaterials.com/pipes/pipe-tube-sizes/asme-b36-10-19-pipe-sizes-charts'],
 pmWt:['free','ProjectMaterials – How to calculate pipe weight per metre','https://blog.projectmaterials.com/quick-answers/pipes/how-to-calculate-pipe-weight/'],
 pmWN:['free','ProjectMaterials – B16.5 weld neck flange dimensions','https://blog.projectmaterials.com/flanges/flange-dimensions/asme-b16-5-welding-neck-flange-sizes'],
 etbFl:['free','Engineering ToolBox – B16.5 flange and bolt dimensions, Class 150 to 2500','https://www.engineeringtoolbox.com/amp/flanges-bolts-dimensions-d_464.html'],
 pmStud:['free','ProjectMaterials – Stud bolt length chart (B16.5)','https://blog.projectmaterials.com/charts/stud-bolt-length-chart/'],
 pmRate:['free','ProjectMaterials – Flange pressure ratings, Class 150 to 2500','https://blog.projectmaterials.com/flanges/asme-flange-rating'],
 pmBW:['free','ProjectMaterials – B16.9 butt-weld fittings dimensions','https://blog.projectmaterials.com/pipe-fittings/buttweld-fittings/asme-b16-9-bw-fittings-sizes'],
 pmFF:['free','ProjectMaterials – B16.11 forged fittings','https://blog.projectmaterials.com/pipe-fittings/forged-branch-fittings/asme-b16-11-forged-fittings'],
 pmSWF:['free','ProjectMaterials – Socket weld flange dimensions (B16.5)','https://blog.projectmaterials.com/flanges/socket-weld-flange-dimension-asme-ansi'],
 etbNPT:['free','Engineering ToolBox – NPT pipe threads, taps and drill sizes','https://www.engineeringtoolbox.com/amp/briggs-standard-pipe-taps-d_1125.html'],
 pmGsk:['free','ProjectMaterials – Spiral wound gasket dimensions','https://blog.projectmaterials.com/charts/gasket-dimensions-spiral-wound/'],
 wmGsk:['free','Wermac – Spiral wound gasket dimensions (B16.20)','https://wermac.org/gaskets/dim_gaskets_sw.html'],
 wmSpan:['free','Wermac – Pipe support spacing','https://wermac.org/steel/pipesupports_spacing.html'],
 pmSpan:['free','ProjectMaterials – Pipe support span chart','https://blog.projectmaterials.com/quick-answers/epc/pipe-support-span-chart/'],
 wipSpc:['free','WhatIsPiping – Pipe spacing chart','https://whatispiping.com/pipe-spacing-chart/'],
 pmB1610:['free','ProjectMaterials – ASME B16.10 valve face-to-face dimensions','https://blog.projectmaterials.com/valves/asme-b16-10-valve-face-to-face','Used for the gate, globe, check, ball and plug face-to-face lengths.'],
 api609x:['free','API 609 excerpt – Category A and B face-to-face tables (Energy Steel)','https://energy-steel.com/wp-content/uploads/2024/12/API-609.pdf','Used for the butterfly valve lengths.'],
 milw:['vendor','Milwaukee Valve – High performance butterfly valves','https://www.milwaukeevalve.com/wp-content/uploads/literature-newsletters/HighPerformanceButterflyValve.pdf','Second check of Category B butterfly lengths.'],
 orion:['vendor','Orion Valves (ESE) – API 600 gate valve catalogue','https://www.orionvalves.com/sites/54d33a1bd7fbc5dbbd00002c/content_entry54d33baed7fbc5dbbd000055/555f063ed7fbc546bc00001a/files/150506_ESECatalogo_BASSA_NoRubr_GateValves_Copertina_v.10.pdf?1452271466=','Gate valve open height ("D-open") and handwheel ø ("ø E"); BG = bevel gear.'],
 isa750801:['std','ANSI/ISA-75.08.01 – Face-to-face, integral flanged globe-style control valve bodies (Class 125–600)','https://www.isa.org/products/ansi-isa-75-08-01-2016-r2025-face-to-face-dimensio',''],
 isa750802:['std','ANSI/ISA-75.08.02 – Face-to-face, flanged and flangeless rotary control valves (Class 150–600)','https://www.isa.org/products/ansi-isa-75-08-02-2003-r2025-face-to-face-dimensio',''],
 iec605343:['std','IEC 60534-3-1 – Face-to-face (globe) and centre-to-face (angle) dimensions','https://shop.standards.ie/en-ie/standards/iec-60534-3-1-2019-564794_saig_iec_iec_2706633/','Includes the angle-valve centre-to-face table (ISA-75.08.08 equivalent).'],
 cvhb:['free','Emerson – Control Valve Handbook, Chapter 5 (face-to-face tables, seat leakage)','https://d1-auth.emerson.com/documents/automation/control-valve-handbook-en-3661206.pdf','Source of the ISA-75.08 and MSS SP-67 / SP-68 lengths shown.'],
 fci702:['free','ANSI/FCI 70-2 seat leakage classifications (Control Engineering, data from Fisher)','https://www.controleng.com/?p=78077','Class definitions and the Class VI table up to 8″; larger seats per FCI 70-2-2013.'],
 vastas:['vendor','Vastas – E300 globe valve catalogue (API 623 / BS 1873)','https://vastas.com/wp-content/uploads/TechnicalCatalogues/E300_Globe_Valves.pdf','Globe valve open height ("H (Open)") and handwheel ø ("ØW").']
};
const REFS={
 size:{use:'Combines the tables of the other tabs for one line size.',k:['b3610','b3619','b165','b169','b1611','b1620','pmPipe','etbFl','pmBW']},
 pipe:{use:'Outside diameters, wall thicknesses and weights. Steel weight follows the B36.10M formula; B31.3 para. 301.6 and B31.1 para. 121.2 define which weights (contents, test fluid, insulation) must be considered.',k:['b3610','b3619','b313','b311','pmPipe','pmWt']},
 flange:{use:'Flange OD, thickness, raised face, bolt circle, bolting, hub dimensions.',k:['b165','pmWN','etbFl','pmStud']},
 bw:{use:'Centre-to-end dimensions of elbows, tees, reducers and caps.',k:['b169','pmBW']},
 sw:{use:'Socket and threaded fitting dimensions; NPT thread data.',k:['b1611','b1201','pmFF','pmSWF','etbNPT']},
 gasket:{use:'Spiral wound gasket ring dimensions for B16.5 flanges.',k:['b1620','b165','pmGsk','wmGsk']},
 blind:{use:'Figure-8 (spectacle) blind, paddle blank and paddle spacer dimensions for RF, FF and RTJ flanges; bolt holes and flat-face OD from the B16.5 flange table; blank thickness formula for sizes outside B16.48.',k:['b1648','b165','b313','wmSpec','wmPad','hheSpec','usaRtj']},
 pt:{use:'Pressure–temperature ratings for Material Groups 1.1, 2.1 and 2.2.',k:['b165','pmRate']},
 span:{use:'Suggested maximum support spans.',k:['b311','wmSpan','pmSpan']},
 spc:{use:'Pipe OD and flange OD used in the spacing calculation.',k:['b165','b3610','wipSpc']},
 vdim:{use:'Valve face-to-face lengths, butterfly lengths, stem heights and handwheel sizes.',k:['b1610','api609','pmB1610','api609x','milw','orion','vastas']},
 cv:{use:'Face-to-face lengths and seat leakage limits for control valves. Type descriptions and ratings are typical practice; vendor links are listed on the page.',k:['isa750801','isa750802','iec605343','cvhb','fci702']},
 valve:{use:'Handwheel mounting heights and reach. Cross-check the figure against the human-engineering standard below or your project’s valve operability specification.',k:['f1166']},
 shoe:{use:'Flange thickness, hub length and stud bolt length used in the approximate (preliminary) spool estimate. Weld and handling clearances are assumed typical values; your project pipe support standard governs.',k:['b165','etbFl','pmStud']},
 eqck:{use:'Standards named in the checklist points. The checklist itself is engineering practice, not taken from one standard.',k:['bpvc','tema','api610','api650','api560','b313','b165']},
 calc:{use:'Wall thickness formula, flange ratings, elbow dimensions and bolt lengths used by the calculators.',k:['b313','b165','pmRate','b169','pmStud']}
};
function renderRefs(){
 const KL={std:'Standard',free:'Free table',vendor:'Catalogue'};
 document.querySelectorAll('section.panel').forEach(sec=>{
  const t=sec.dataset.tab,R=REFS[t];if(!R)return;
  let el=document.querySelector(`.refs[data-for="${t}"]`);
  if(!el){el=document.createElement('aside');el.className='refs';el.dataset.for=t;sec.after(el);}
  el.hidden=t!==TAB;
  el.innerHTML=`<h3>References</h3><p>${R.use} <b>Standard</b> links go to the publisher’s page (the standard is a paid document and governs). <b>Free table</b> and <b>Catalogue</b> links are public pages you can open to cross-check the numbers.</p>
  <ol>${R.k.map(k=>{const [kind,title,url,note]=REF[k];return `<li><span class="k ${kind}">${KL[kind]}</span><a href="${url}" target="_blank" rel="noopener">${title}</a>${note?`<small>${note}</small>`:''}</li>`;}).join('')}</ol>`;});
}


/* ============================== NEW UI: icons, home, effects, model panels, 3D ============================== */
const REDUCED=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
const IC=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const TAB_ICON={
 sup:IC('<circle cx="12" cy="8" r="4.5"/><path d="M12 12.5V16M7 16h10M4 20h16"/>'),
 home:IC('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
 size:IC('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
 pipe:IC('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5"/>'),
 flange:IC('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="5.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/>'),
 bw:IC('<path d="M4 20V13a9 9 0 0 1 9-9h7"/><path d="M9 20v-7a4 4 0 0 1 4-4h7"/>'),
 sw:IC('<path d="M4 9h9v6H4z"/><path d="M13 7h7v10h-7"/><path d="M15 7v10M17 7v10"/>'),
 gasket:IC('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6.5" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="4"/>'),
 blind:IC('<circle cx="6.5" cy="12" r="4.5"/><circle cx="17.5" cy="12" r="4.5"/><circle cx="17.5" cy="12" r="2"/><path d="M11 11h2M11 13h2"/>'),
 pt:IC('<path d="M5 18a8 8 0 1 1 14 0"/><path d="M12 13l4-4"/><circle cx="12" cy="13" r="1.2"/>'),
 span:IC('<path d="M2 8h20"/><path d="M5 8v10M12 8v10M19 8v10"/><path d="M3 18h4M10 18h4M17 18h4"/>'),
 spc:IC('<path d="M3 7h18M3 17h18"/><path d="M12 9v6"/><path d="M10 10l2-1.5 2 1.5M10 14l2 1.5 2-1.5"/>'),
 exp:IC('<path d="M3 17h5V7h8v10h5"/><path d="M5 20l-2-3 2-3M19 20l2-3-2-3"/>'),
 fj:IC('<path d="M8 4v16M16 4v16"/><path d="M5 4h3M5 20h3M16 4h3M16 20h3"/><path d="M11.5 6v12M12.5 6v12"/><path d="M3 9h18M3 15h18"/>'),
 rack:IC('<path d="M4 3v18M20 3v18M4 8h16M4 15h16"/><circle cx="9" cy="5.6" r="1.6"/><circle cx="14.5" cy="5.6" r="1.6"/><circle cx="10" cy="12.6" r="1.6"/><path d="M14 13.5h4"/>'),
 cv:IC('<path d="M3 14v7l9-3.5zM21 14v7l-9-3.5z"/><path d="M12 17.5V10"/><path d="M6.5 10h11a5.5 5.5 0 0 0-11 0z"/>'),
 vdim:IC('<path d="M3 8v8l9-4z"/><path d="M21 8v8l-9-4z"/><path d="M12 12V4"/><path d="M8.5 4h7"/>'),
 valve:IC('<circle cx="12" cy="8" r="5"/><path d="M12 3v10M7 8h10"/><path d="M12 13v8M8 21h8"/>'),
 shoe:IC('<circle cx="12" cy="9" r="5"/><path d="M8 14h8l1 4H7z"/><path d="M5 21h14"/>'),
 eqck:IC('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 11l2 2 4-4M8.5 17h7"/>'),
 acc:IC('<path d="M3 21h18"/><path d="M5 21V9h6v12"/><path d="M14 21v-6h5v6"/><path d="M7 9V5h2v4"/><path d="M15 15l2-5 2 5"/>'),
 contact:IC('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>'),
 iso:IC('<path d="M3 17l6-3.5 6 3.5 6-3.5"/><path d="M9 13.5V6l6 3.5v7.5" stroke-dasharray="2 2"/><path d="M15 9.5L21 6"/>'),
 calc:IC('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>')
};
const HOME_DESC={exp:'Thermal growth and U-loop or L-bend leg length',fj:'Stud length, flange gap, torque and tightening sequence',rack:'Rack width, tiers and section drawing from your line list',cv:'Actuator styles and layout dimensions',sup:'Support types in 3D: shoes, guides, stops, hangers, springs',size:'Everything for one line size on one sheet',pipe:'OD, wall, ID and weight by schedule',flange:'B16.5 dimensions and bolting, with 3D view',bw:'Elbows, tees, reducers and caps, with 3D view',sw:'Socket weld fittings and NPT threads',gasket:'Spiral wound gasket rings',blind:'Spectacle blinds, paddle blanks and spacers: RF, FF, RTJ',pt:'Pressure–temperature ratings',span:'Suggested support spacing',spc:'Centre-to-centre spacing on racks',vdim:'Face-to-face, stem height and handwheel, with 3D view',valve:'Handwheel heights and reach',shoe:'Preliminary spool length for shoes',eqck:'What to verify on vendor drawings and datasheets',calc:'Wall thickness, flange class, offsets, bolts',acc:'Escape and access routes, roads, crane and lift space',iso:'IFC vs latest isometric: PDF overlay and PCF change list',contact:'Feedback, corrections and ideas: contact.piperef@gmail.com'};
document.getElementById('ctCopy').addEventListener('click',e=>{const b=e.currentTarget,a='contact.piperef@gmail.com',done=()=>{b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy address',1600);};
 try{navigator.clipboard.writeText(a).then(done,()=>{fallbackCopy(a);done();});}catch(err){fallbackCopy(a);done();}});
function fallbackCopy(a){const t=document.createElement('textarea');t.value=a;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');}catch(e){}t.remove();}
function goTab(t){if(PAGE[t])location.href=PAGE[t];}

/* ---------- theme ---------- */
function applyTheme(t){document.documentElement.dataset.theme=t;store.set('theme',t);
 const b=document.getElementById('thBtn');if(b)b.innerHTML=t==='dark'?IC('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>')+'<span class="sr">Switch to light theme</span>':IC('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>')+'<span class="sr">Switch to dark theme</span>';if(b)b.title=t==='dark'?'Switch to light theme':'Switch to dark theme';
 M3.redrawAll();}

/* ---------- click ripple + animated result numbers ---------- */
/* click ripple removed in the redesign: motion only answers actions that change data */
const BIG_LAST=new Map();
function animateBig(el){if(REDUCED||!el.isConnected)return;const host=el.closest('[id]');const key=(host?host.id:'')+'|'+[...(host||document).querySelectorAll('.big')].indexOf(el);
 const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){const m=/-?\d[\d,]*\.?\d*/.exec(n.nodeValue);if(!m)continue;
  const txt=m[0],to=parseFloat(txt.replace(/,/g,'')),dec=(txt.split('.')[1]||'').length,from=BIG_LAST.get(key);BIG_LAST.set(key,to);
  if(from==null||from===to||!isFinite(from))return;const pre=n.nodeValue.slice(0,m.index),post=n.nodeValue.slice(m.index+txt.length),t0=performance.now(),node=n;
  const step=t=>{const k=Math.min(1,(t-t0)/380),e=1-Math.pow(1-k,3),v=from+(to-from)*e;node.nodeValue=pre+(dec?v.toFixed(dec):Math.round(v).toString())+post;if(k<1)requestAnimationFrame(step);else node.nodeValue=pre+txt+post;};
  requestAnimationFrame(step);return;}}
let BIG_Q=false;new MutationObserver(()=>{if(BIG_Q)return;BIG_Q=true;requestAnimationFrame(()=>{BIG_Q=false;document.querySelectorAll('.panel:not([hidden]) .big').forEach(animateBig);});}).observe(document.body,{childList:true,subtree:true});

/* ============================== 3D renderer (no library) ============================== */
const M3={views:new Map(),
 V:{add:(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub:(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],mul:(a,k)=>[a[0]*k,a[1]*k,a[2]*k],
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
  norm:a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return [a[0]/l,a[1]/l,a[2]/l];}},
 /* revolve a (r,a) profile about an axis; axis 'x' | 'y' | 'z' */
 revolve(prof,col,axis='z',seg=56,close=true,off=[0,0,0]){const F=[],n=prof.length,P=(r,a,t)=>{const c=r*Math.cos(t),s=r*Math.sin(t);
   const p=axis==='z'?[c,s,a]:axis==='x'?[a,c,s]:[c,a,s];return [p[0]+off[0],p[1]+off[1],p[2]+off[2]];};
  for(let i=0;i<(close?n:n-1);i++){const A=prof[i],B=prof[(i+1)%n];if(A[0]===0&&B[0]===0)continue;
   for(let j=0;j<seg;j++){const t0=j/seg*2*Math.PI,t1=(j+1)/seg*2*Math.PI;F.push({p:[P(A[0],A[1],t0),P(B[0],B[1],t0),P(B[0],B[1],t1),P(A[0],A[1],t1)],c:col});}}
  return F;},
 /* sweep a circle of radius r along a path f(u)->[point,tangent] */
 sweep(f,r,col,segU=28,segV=22){const F=[],V=M3.V,ring=u=>{const [c,t]=f(u),T=V.norm(t);let a=Math.abs(T[1])<.9?[0,1,0]:[1,0,0];
   const N=V.norm(V.cross(T,a)),B=V.cross(T,N);return Array.from({length:segV},(_,k)=>{const q=k/segV*2*Math.PI;return V.add(c,V.add(V.mul(N,r*Math.cos(q)),V.mul(B,r*Math.sin(q))));});};
  let prev=ring(0);for(let i=1;i<=segU;i++){const cur=ring(i/segU);for(let k=0;k<segV;k++){const k2=(k+1)%segV;F.push({p:[prev[k],cur[k],cur[k2],prev[k2]],c:col});}prev=cur;}return F;},
 ring(c,nrm,ri,ro,col,seg=40){const V=M3.V,T=V.norm(nrm);let a=Math.abs(T[1])<.9?[0,1,0]:[1,0,0];const N=V.norm(V.cross(T,a)),B=V.cross(T,N),F=[];
  const P=(r,q)=>V.add(c,V.add(V.mul(N,r*Math.cos(q)),V.mul(B,r*Math.sin(q))));
  for(let j=0;j<seg;j++){const q0=j/seg*2*Math.PI,q1=(j+1)/seg*2*Math.PI;F.push({p:[P(ri,q0),P(ro,q0),P(ro,q1),P(ri,q1)],c:col});}return F;},
 box(x0,y0,z0,x1,y1,z1,col){const v=[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]];
  return [[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]].map(f=>({p:f.map(i=>v[i]),c:col}));},
 colors(){const cs=getComputedStyle(document.documentElement),g=k=>cs.getPropertyValue(k).trim();
  const dark=document.documentElement.dataset.theme==='dark';return {steel:dark?[178,201,214]:[156,178,191],dark:dark?[72,94,108]:[104,120,130],bolt:dark?[214,190,140]:[170,145,95],accent:dark?[122,167,255]:[24,73,169],paint:dark?[128,172,194]:[118,158,178],body:dark?[150,186,204]:[134,166,184],bg:dark?[12,26,46]:[246,248,251]};},
 /* mount a view on a canvas; build() returns {faces, note} in mm */
 mount(key,canvas,build){const st=M3.views.get(key)||{yaw:-.75,pitch:.42,zoom:1,last:0};M3.views.set(key,st);st.canvas=canvas;st.build=build;st.model=null;st.dirty=true;
  let drag=null;canvas.onpointerdown=e=>{drag=[e.clientX,e.clientY];st.last=performance.now();canvas.setPointerCapture(e.pointerId);};
  canvas.onpointermove=e=>{if(!drag)return;st.yaw+=(e.clientX-drag[0])*.01;st.pitch=Math.max(-1.4,Math.min(1.4,st.pitch+(e.clientY-drag[1])*.01));drag=[e.clientX,e.clientY];st.last=performance.now();M3.draw(st);};
  canvas.onpointerup=canvas.onpointercancel=()=>{drag=null;st.last=performance.now();};
  canvas.onwheel=e=>{e.preventDefault();st.zoom=Math.max(.5,Math.min(3,st.zoom*(e.deltaY<0?1.1:.9)));M3.draw(st);};
  canvas.ondblclick=()=>{st.yaw=-.75;st.pitch=.42;st.zoom=1;M3.draw(st);};
  M3.draw(st);M3.loop();},
 draw(st){const cv=st.canvas;if(!cv||!cv.isConnected||!cv.offsetParent)return;
  if(!st.model){const m=st.build();if(!m||!m.faces.length){st.model={faces:[]};}else{
    let mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];m.faces.forEach(f=>f.p.forEach(p=>{for(let i=0;i<3;i++){mn[i]=Math.min(mn[i],p[i]);mx[i]=Math.max(mx[i],p[i]);}}));
    const c=[(mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2];let R=0;m.faces.forEach(f=>f.p.forEach(p=>{R=Math.max(R,Math.hypot(p[0]-c[0],p[1]-c[1],p[2]-c[2]));}));
    st.model={faces:m.faces,c,R};}}
  const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
  const M=st.model;if(!M.faces.length){g.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted');g.font='14px sans-serif';g.textAlign='center';g.fillText('No data for this size and class',W/2,H/2);return;}
  const cy=Math.cos(st.yaw),sy=Math.sin(st.yaw),cp=Math.cos(st.pitch),sp=Math.sin(st.pitch),D=M.R*4.2,sc=Math.min(W,H)*.43/M.R*st.zoom,L=M3.V.norm([-.45,.65,.62]);
  const tf=p=>{let x=p[0]-M.c[0],y=p[1]-M.c[1],z=p[2]-M.c[2];[x,z]=[x*cy+z*sy,-x*sy+z*cy];[y,z]=[y*cp-z*sp,y*sp+z*cp];return [x,y,z];};
  const list=M.faces.map(f=>{const q=f.p.map(tf);const n=M3.V.norm(M3.V.cross(M3.V.sub(q[1],q[0]),M3.V.sub(q[2],q[0])));
   const z=q.reduce((a,b)=>a+b[2],0)/q.length;return {q,n,z,c:f.c};}).sort((a,b)=>b.z-a.z);
  const BG=M3.colors().bg,H2=M3.V.norm([L[0],L[1],L[2]+1]);
  {const cx=W/2,cyS=H/2+M.R*sc*.86,rx=M.R*sc*.95,ry=Math.max(6,M.R*sc*.16),gr=g.createRadialGradient(cx,cyS,0,cx,cyS,rx);
   gr.addColorStop(0,'rgba(0,0,0,.28)');gr.addColorStop(1,'rgba(0,0,0,0)');g.save();g.translate(cx,cyS);g.scale(1,ry/rx);g.translate(-cx,-cyS);g.fillStyle=gr;g.beginPath();g.arc(cx,cyS,rx,0,2*Math.PI);g.fill();g.restore();}
  for(const f of list){const d=Math.abs(M3.V.dot(f.n,L)),hs=Math.abs(M3.V.dot(f.n,H2)),li=.6+.4*(.5+.5*d)*d+.0,sp=Math.pow(hs,28)*.22,
    t=Math.max(0,Math.min(1,(f.z/M.R+1)/2))*.16,
    col=`rgb(${f.c.map((v,i)=>Math.round(Math.min(255,(v*li+255*sp)*(1-t)+BG[i]*t))).join(',')})`;
   g.beginPath();f.q.forEach((p,i)=>{const k=D/(D+p[2]),x=W/2+p[0]*sc*k,y=H/2-p[1]*sc*k;i?g.lineTo(x,y):g.moveTo(x,y);});g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=col;g.lineWidth=.8;g.lineJoin='round';g.stroke();}},
 running:false,
 loop(){if(M3.running)return;M3.running=true;const tick=t=>{let any=false;
   M3.views.forEach(st=>{if(!st.canvas||!st.canvas.isConnected||!st.canvas.offsetParent)return;any=true;
    if(!REDUCED&&t-st.last>3500&&document.visibilityState==='visible'){st.yaw+=.004;M3.draw(st);}});
   if(any)requestAnimationFrame(tick);else M3.running=false;};requestAnimationFrame(tick);},
 redrawAll(){M3.views.forEach(st=>{st.model=null;M3.draw(st);});M3.loop();}
};
window.addEventListener('resize',()=>M3.views.forEach(st=>M3.draw(st)));

/* ---------- 3D model builders (all mm, true scale from the tables) ---------- */
function pipeOf(n){const p=PIPEMAP[n];if(!p)return null;const OD=p[1]*25.4,t=(p[2].STD??p[2]['40']??p[2].XS??Object.values(p[2])[0])*25.4;return {OD,ri:OD/2-t,t};}
function flangeFaces(cls,n,{off=0,dir=1,axis='z',col,stub=true,bolts=true}={}){const f=flRow(cls,n),pp=pipeOf(n);if(!f||!pp)return [];const C=M3.colors();col=col||C.steel;
 const O=f.O*25.4,tf=f.tf*25.4,R=f.R*25.4,X=f.X*25.4,Y=f.Y*25.4,rf=+cls>=400?6.4:1.6,zb=+cls<400?tf:rf+tf,zy=+cls<400?Y:rf+Y,ri=pp.ri,ro=pp.OD/2;
 const z=a=>off+dir*a;
 let F=M3.revolve([[ri,z(0)],[R/2,z(0)],[R/2,z(rf)],[O/2,z(rf)],[O/2,z(zb)],[X/2,z(zb)],[ro,z(zy)],[ri,z(zy)]],col,axis,48);
 if(stub){const L2=Math.max(pp.OD*.9,120);F=F.concat(M3.revolve([[ri,z(zy)],[ro,z(zy)],[ro,z(zy+L2)],[ri,z(zy+L2)]],col.map(v=>v*.92),axis,40));}
 if(bolts){const hr=(f.dv*25.4+3.2)/2,BC=f.BC*25.4;for(let i=0;i<f.n;i++){const a=(i+.5)/f.n*2*Math.PI,x=BC/2*Math.cos(a),y=BC/2*Math.sin(a);
   const o=axis==='z'?[x,y,0]:axis==='x'?[0,x,y]:[x,0,y];F=F.concat(M3.revolve([[0,z(rf-.4)],[hr,z(rf-.4)]],C.dark,axis,14,false,o),M3.revolve([[0,z(zb+.4)],[hr,z(zb+.4)]],C.dark,axis,14,false,o));}}
 return F;}
function buildFlange3D(cls,n){const F=flangeFaces(cls,n);return {faces:F};}
function buildFitting3D(kind,n){const pp=pipeOf(n),b=bwRow(n),C=M3.colors();if(!pp||!b)return {faces:[]};const ro=pp.OD/2,ri=pp.ri,col=C.steel,inn=C.dark;let F=[];
 const elbow=(R,ang)=>{const path=r=>u=>{const p=u*ang;return [[R*Math.sin(p),R-R*Math.cos(p),0],[Math.cos(p),Math.sin(p),0]];};
  F=F.concat(M3.sweep(path(),ro,col,Math.max(12,Math.round(28*ang/1.57)),26),
   M3.ring([0,0,0],[1,0,0],ri,ro,col),M3.ring([R*Math.sin(ang),R-R*Math.cos(ang),0],[Math.cos(ang),Math.sin(ang),0],ri,ro,col));};
 if(kind==='e90'){const A=(b.lr90)*25.4;if(!A)return {faces:[]};elbow(A,Math.PI/2);}
 else if(kind==='e45'){const R=(b.lr90)*25.4;if(!R)return {faces:[]};elbow(R,Math.PI/4);}
 else if(kind==='tee'){const Cc=b.tee*25.4;F=F.concat(M3.revolve([[ri,-Cc],[ro,-Cc],[ro,Cc],[ri,Cc]],col,'x',40),M3.revolve([[ri,0],[ro,0],[ro,b.teeM*25.4],[ri,b.teeM*25.4]],col,'y',40));}
 else if(kind==='red'){if(b.red==null)return {faces:[]};const H=b.red*25.4,i=BWN.indexOf(n),ps=pipeOf(BWN[Math.max(0,i-2)])||pp,rs=ps.OD/2,ris=ps.ri;
  F=M3.revolve([[ri,0],[ro,0],[ro,.15*H],[rs,.85*H],[rs,H],[ris,H],[ris,.85*H],[ri,.15*H]],col,'y',44);}
 else if(kind==='cap'){const E=b.cap*25.4,h=Math.min(E*.8,pp.OD/4),s=E-h,prof=[[ri,0],[ro,0],[ro,s]];for(let k=1;k<=10;k++){const a=k/10*Math.PI/2;prof.push([ro*Math.cos(a),s+h*Math.sin(a)]);}
  const hi=Math.max(1,h-pp.t);for(let k=10;k>=0;k--){const a=k/10*Math.PI/2;prof.push([ri*Math.cos(a),s+hi*Math.sin(a)]);}F=M3.revolve(prof,col,'y',44);}
 return {faces:F};}
const VK=[['gate','Gate'],['globe','Globe'],['swing','Swing check'],['lift','Lift check'],['ball','Ball'],['plug','Plug'],['bfy','Butterfly']];
const VK_NAME={gate:'Gate valve',globe:'Globe valve',swing:'Swing check valve',lift:'Lift check valve',ball:'Ball valve',plug:'Plug valve',bfy:'Butterfly valve'};
function rotYF(F,a){const c=Math.cos(a),s2=Math.sin(a);return F.map(f=>({c:f.c,p:f.p.map(([x,y,z])=>[x*c+z*s2,y,-x*s2+z*c])}));}
/* face-to-face L (mm) for a kind, class and size; returns {L, basis} */
function valveL(kind,cls,n){const i=N20.indexOf(n),d=VD[cls]||{};const g=k=>d[k]&&i>=0?d[k][i]:null;
 if(kind==='gate')return {L:g('gate'),basis:'B16.10 gate'};
 if(kind==='globe'||kind==='lift')return {L:g('globe'),basis:'B16.10 globe / lift check'};
 if(kind==='swing')return {L:g('swing'),basis:'B16.10 swing check'};
 if(kind==='ball'){const l=g('ballL');return l?{L:l,basis:'B16.10 ball, long pattern'}:{L:g('ballS'),basis:'B16.10 ball, short pattern'};}
 if(kind==='plug'){const l=g('plugR');return l?{L:l,basis:'B16.10 plug, regular pattern'}:{L:g('plugS'),basis:'B16.10 plug, short pattern'};}
 if(kind==='bfy'){const b=(BFY_B[cls]||{})[n];if(b)return {L:b*25.4,basis:'API 609 category B (lug / wafer)'};
  if(+cls<=150&&BFY_A[n])return {L:BFY_A[n]*25.4,basis:'API 609 category A'};return {L:null,basis:'API 609 (no data for this class)'};}
 return {L:null,basis:''};}
/* 3D fasteners: hex nut (6-sided revolve) and plain stud, along an axis, offset to the bolt position */
function hexNut3D(axis,a0,a1,af,off,col){const r=af/2/Math.cos(Math.PI/6);return M3.revolve([[0,a0],[r,a0],[r,a1],[0,a1]],col,axis,6,true,off);}
function stud3D(axis,a0,a1,d,off,col){return M3.revolve([[0,a0],[d/2,a0],[d/2,a1],[0,a1]],col,axis,10,true,off);}
/* nuts and stud ends on the back face (xb) of a flange whose axis is x; dir = +1 when the back face looks to +x */
function flangeNuts3D(f,xb,dir){const C=M3.colors(),BC=f.BC*25.4,d=fr(f.d)*25.4,af=d*1.6,h=d*.95;let F=[];
 for(let i=0;i<f.n;i++){const a=(i+.5)/f.n*2*Math.PI,o=[0,BC/2*Math.cos(a),BC/2*Math.sin(a)];
  F=F.concat(hexNut3D('x',xb,xb+dir*h,af,o,C.dark),stud3D('x',xb+dir*h,xb+dir*(h+d*.55),d*.92,o,C.steel));}
 return F;}
/* ring of nuts on a horizontal face at height y (axis y), e.g. a bonnet or cover flange */
function ringNuts3D(n,R,y,d,col){const C=M3.colors();let F=[];for(let i=0;i<n;i++){const a=(i+.5)/n*2*Math.PI,o=[R*Math.cos(a),0,R*Math.sin(a)];
 F=F.concat(hexNut3D('y',y,y+d*.95,d*1.6,o,col||C.dark),stud3D('y',y+d*.95,y+d*1.5,d*.92,o,C.steel));}return F;}
function buildValve3D(kind,cls,n){const {L:Lf}=valveL(kind,cls,n),fcls=kind==='bfy'&&+cls>300?'300':cls,f=flRow(fcls,n),pp=pipeOf(n);
 if(!Lf||!f||!pp)return {faces:[]};
 const C=M3.colors(),col=C.paint,st=C.steel,O=f.O*25.4,tf=f.tf*25.4+(+cls>=400?6.4:0),ro=pp.OD/2,ri=pp.ri,L2=Lf/2,bR=Math.max(ro*1.45,O*.36);let F=[];
 /* butterfly: wafer body clamped between two mating WN flanges */
 if(kind==='bfy'){const rb=Math.max(ro*1.15,f.BC*25.4/2-f.dv*25.4);
  F=F.concat(flangeFaces(fcls,n,{axis:'x',off:-L2,dir:-1,col:st}),flangeFaces(fcls,n,{axis:'x',off:L2,dir:1,col:st}));
  F=F.concat(M3.revolve([[ri,-L2],[rb,-L2],[rb,L2],[ri,L2]],col,'x',56));
  const tD=Math.max(4,ri*.14);F=F.concat(rotYF(M3.revolve([[0,-tD/2],[ri*.96,-tD/2],[ri*.96,tD/2],[0,tD/2]],C.body,'x',40),1.0));
  const top=rb+Math.max(60,ri*.9),sr=Math.max(6,ro*.09);F=F.concat(M3.revolve([[0,rb-2],[sr*2,rb-2],[sr*2,rb+30],[sr,rb+30],[sr,top],[0,top]],col,'y',24));
  const ll=Math.max(160,ri*2.2),lw=Math.max(8,sr*1.4);F=F.concat(M3.box(-lw*1.6,top,-lw*.6,ll*.62,top+lw,lw*.6,st),M3.box(ll*.62,top-lw*.1,-lw*.75,ll,top+lw*1.1,lw*.75,C.accent));
  const zb=(+fcls<400?f.tf*25.4:6.4+f.tf*25.4),d=fr(f.d)*25.4,BC=f.BC*25.4;
  for(let i=0;i<f.n;i++){const a=(i+.5)/f.n*2*Math.PI,o=[0,BC/2*Math.cos(a),BC/2*Math.sin(a)];
   F=F.concat(stud3D('x',-L2-zb-d*1.5,L2+zb+d*1.5,d*.92,o,st),hexNut3D('x',-L2-zb,-L2-zb-d*.95,d*1.6,o,C.dark),hexNut3D('x',L2+zb,L2+zb+d*.95,d*1.6,o,C.dark));}
  return {faces:F};}
 /* end flanges with short necks */
 const neck=Math.max(tf*.6,12),nr=ro*1.2;
 F=F.concat(M3.revolve([[ri,-L2],[O/2,-L2],[O/2,-L2+tf],[nr,-L2+tf],[nr,-L2+tf+neck],[ri,-L2+tf+neck]],col,'x',56),
            M3.revolve([[ri,L2-tf-neck],[nr,L2-tf-neck],[nr,L2-tf],[O/2,L2-tf],[O/2,L2],[ri,L2]],col,'x',56));
 F=F.concat(flangeNuts3D(f,-L2+tf,1),flangeNuts3D(f,L2-tf,-1));
 const bd=fr(f.d)*25.4;
 const xi=-L2+tf+neck,xo=L2-tf-neck,span=xo-xi;
 const sphere=(r,yc=0)=>{const p=[];for(let k=0;k<=16;k++){const a=-Math.PI/2+k/16*Math.PI;p.push([r*Math.cos(a),yc+r*Math.sin(a)]);}return M3.revolve(p,col,'y',44,false);};
 const tube=(r)=>M3.revolve([[ri,xi],[r,xi],[r,xo],[ri,xo]],col,'x',56);
 const lever=(y0,len)=>{const lw=Math.max(8,ro*.12);return M3.box(-lw*1.6,y0,-lw*.6,len*.62,y0+lw,lw*.6,st).concat(M3.box(len*.62,y0-lw*.1,-lw*.75,len,y0+lw*1.1,lw*.75,C.accent),hexNut3D('y',y0+lw,y0+lw*1.6,lw*1.8,[0,0,0],C.dark));};
 if(kind==='gate'||kind==='globe'){
  if(kind==='globe')F=F.concat(tube(nr),sphere(bR*1.05));else F=F.concat(tube(nr),M3.revolve([[0,-bR*.85],[bR*.8,-bR*.85],[bR*.8,bR*.8],[0,bR*.8]],col,'y',44));
  const j=VOP_SZ.indexOf(n),src=VOP[kind],Hh=j>=0?src.H[cls][j]:null,Ww=j>=0?src.W[cls][j]:null;
  const top=Hh||Math.max(bR*3.2,Lf*1.4),bon=bR*.8+Math.max(40,(top-bR)*.38);
  F=F.concat(M3.revolve([[0,bR*.75],[bR*.55,bR*.75],[bR*.45,bon],[0,bon]],col,'y',36));
  const bft=Math.max(12,tf*.6);F=F.concat(M3.revolve([[0,bR*.72],[bR*.7,bR*.72],[bR*.7,bR*.72+bft],[0,bR*.72+bft]],col,'y',48),ringNuts3D(8,bR*.6,bR*.72+bft,Math.max(12,bd*.85)));
  const gl=Math.max(10,bR*.1);F=F.concat(M3.revolve([[0,bon],[bR*.3,bon],[bR*.3,bon+gl],[0,bon+gl]],st,'y',28),ringNuts3D(2,bR*.22,bon+gl,Math.max(10,bd*.7)));
  const yt=Math.max(6,bR*.07);F=F.concat(M3.box(-bR*.38-yt,bon,-yt,-bR*.38+yt,top*.86,yt,col),M3.box(bR*.38-yt,bon,-yt,bR*.38+yt,top*.86,yt,col),M3.box(-bR*.45,top*.86-yt*2,-yt*1.6,bR*.45,top*.86,yt*1.6,col));
  const sr=Math.max(4,ro*.08);F=F.concat(M3.revolve([[sr,bon],[sr,top],[0,top]],st,'y',18,false));
  if(Ww&&Ww!=='G'){const R=Ww/2,tr=Math.max(5,Ww*.022),yh=Math.min(top-tr*2,top*.86+Math.max(20,tr*3));
   F=F.concat(M3.sweep(u=>{const a=u*2*Math.PI;return [[R*Math.cos(a),yh,R*Math.sin(a)],[-Math.sin(a),0,Math.cos(a)]];},tr,C.accent,56,14));
   for(let k=0;k<5;k++){const a=k/5*2*Math.PI;F=F.concat(M3.sweep(u=>[[R*u*Math.cos(a),yh,R*u*Math.sin(a)],[Math.cos(a),0,Math.sin(a)]],tr*.55,C.accent,4,10));}
   F=F.concat(M3.revolve([[0,yh-tr*1.6],[tr*2.6,yh-tr*1.6],[tr*2.6,yh+tr*1.6],[0,yh+tr*1.6]],C.accent,'y',20),hexNut3D('y',yh+tr*1.6,yh+tr*2.8,tr*3.2,[0,0,0],C.dark));}
  else if(Ww==='G'){const gb=bR*.9;F=F.concat(M3.box(-gb,top*.86,-gb*.7,gb,top*.86+gb*.9,gb*.7,C.dark));const R=gb*.8;
   F=F.concat(M3.sweep(u=>{const a=u*2*Math.PI;return [[gb+20,top*.86+gb*.45+R*Math.cos(a),R*Math.sin(a)],[0,-Math.sin(a),Math.cos(a)]];},Math.max(5,R*.06),C.accent,48,12));}
  return {faces:F};}
 if(kind==='lift'){F=F.concat(tube(nr),sphere(bR*1.05));const ct=Math.max(14,bR*.22);
  F=F.concat(M3.revolve([[0,bR*.9],[bR*.62,bR*.9],[bR*.62,bR*.9+ct],[0,bR*.9+ct]],col,'y',44));
  for(let k=0;k<6;k++){const a=k/6*2*Math.PI;F=F.concat(M3.revolve([[0,bR*.9+ct],[Math.max(4,ct*.28),bR*.9+ct],[Math.max(4,ct*.28),bR*.9+ct*1.6],[0,bR*.9+ct*1.6]],C.dark,'y',8,true,[bR*.5*Math.cos(a),0,bR*.5*Math.sin(a)]));}
  return {faces:F};}
 if(kind==='swing'){const rB=Math.max(nr*1.15,bR*.82);
  F=F.concat(M3.revolve([[ri,xi],[nr,xi],[rB,xi+span*.2],[rB,xo-span*.2],[nr,xo],[ri,xo]],col,'x',56));
  const cw=span*.3,ct=Math.max(14,rB*.18),y0=rB*.97;
  F=F.concat(M3.revolve([[0,rB*.6],[cw*.9,rB*.6],[cw*.9,y0+1],[0,y0+1]],col,'y',36));
  F=F.concat(M3.box(-cw,y0,-rB*.62,cw,y0+ct,rB*.62,col));
  for(let k=0;k<4;k++){const sx=k<2?-1:1,sz=k%2?-1:1;F=F.concat(M3.revolve([[0,y0+ct],[Math.max(4,ct*.3),y0+ct],[Math.max(4,ct*.3),y0+ct*1.6],[0,y0+ct*1.6]],C.dark,'y',8,true,[sx*cw*.8,0,sz*rB*.48]));}
  F=F.concat(M3.revolve([[0,-rB*.7],[Math.max(6,rB*.12),-rB*.7],[Math.max(6,rB*.12),rB*.7],[0,rB*.7]],C.dark,'z',16,true,[-span*.12,rB*.55,0]));
  F=F.concat(hexNut3D('z',rB*.7,rB*.7+Math.max(6,rB*.08),Math.max(14,rB*.22),[-span*.12,rB*.55,0],C.dark));
  return {faces:F};}
 if(kind==='ball'){F=F.concat(tube(nr));const p=[];for(let k=0;k<=16;k++){const a=-Math.PI/2+k/16*Math.PI;p.push([bR*1.0*Math.cos(a),bR*.9*Math.sin(a)]);}
  F=F.concat(rotYF(M3.revolve(p.map(([r,y])=>[r,y]),col,'x',44,false),0).map(f=>({c:f.c,p:f.p.map(([x,y,z])=>[x*Math.min(1,span/(2*bR)),y,z])})));
  const sr=Math.max(6,ro*.1),top=bR*.9+Math.max(40,bR*.45);F=F.concat(M3.revolve([[0,bR*.7],[sr*2.2,bR*.7],[sr*2.2,bR*.95],[sr,bR*.95],[sr,top],[0,top]],st,'y',24));
  /* two-piece body joint: bolted ring flange */
  const sx=Math.min(1,span/(2*bR)),xj=bR*.42*sx,jt=Math.max(10,tf*.5),jr=bR*.86;F=F.concat(M3.revolve([[nr,xj],[jr,xj],[jr,xj+jt],[nr,xj+jt]],col,'x',48));
  for(let i=0;i<8;i++){const a=(i+.5)/8*2*Math.PI,o=[0,jr*.84*Math.cos(a),jr*.84*Math.sin(a)];F=F.concat(hexNut3D('x',xj+jt,xj+jt+bd*.8,bd*1.4,o,C.dark));}
  F=F.concat(lever(top,Math.max(Lf*.9,ro*4)));return {faces:F};}
 if(kind==='plug'){F=F.concat(tube(nr));F=F.concat(M3.revolve([[0,-bR*.9],[bR*.62,-bR*.9],[bR*.78,bR*.85],[0,bR*.85]],col,'y',44));
  const ct=Math.max(10,tf*.55);F=F.concat(M3.revolve([[0,bR*.85],[bR*.84,bR*.85],[bR*.84,bR*.85+ct],[0,bR*.85+ct]],col,'y',48),ringNuts3D(6,bR*.72,bR*.85+ct,Math.max(12,bd*.8)));
  const sr=Math.max(6,ro*.1),top=bR*.85+ct+Math.max(30,bR*.35);F=F.concat(M3.revolve([[sr,bR*.85+ct],[sr,top],[0,top]],st,'y',18,false),lever(top,Math.max(Lf*.8,ro*4)));return {faces:F};}
 return {faces:F};}

/* ---------- 2D clickable drawings ---------- */
const DG=(k,inner,on)=>`<g class="dimg${on===k?' on':''}" data-k="${k}">${inner}</g>`;
function svgFlange(on){return `<svg viewBox="0 0 360 230" role="img" aria-label="Weld neck flange half section; click a dimension">
 <line class="s-cl" x1="20" y1="190" x2="345" y2="190"/>
 <polygon class="s-fill" points="40,150 40,116 48,116 48,26 84,26 84,100 180,132 214,132 214,150"/>
 <line class="s-ink" x1="48" y1="44" x2="84" y2="44" stroke-width="1"/><line class="s-ink" x1="48" y1="60" x2="84" y2="60" stroke-width="1"/><line class="s-cl" x1="34" y1="52" x2="96" y2="52"/>
 ${DG('O','<line class="hit" x1="18" y1="26" x2="18" y2="190"/><line class="s-dim" x1="18" y1="26" x2="18" y2="190"/><text class="t-dim" x="22" y="104">½O</text>',on)}
 ${DG('BC','<line class="hit" x1="104" y1="52" x2="104" y2="190"/><line class="s-dim" x1="104" y1="52" x2="104" y2="190"/><text class="t-dim" x="108" y="82">½BC</text>',on)}
 ${DG('R','<line class="hit" x1="30" y1="116" x2="30" y2="190"/><line class="s-dim" x1="30" y1="116" x2="30" y2="190"/><text class="t-dim" x="28" y="212" text-anchor="middle">½R</text>',on)}
 ${DG('X','<line class="hit" x1="140" y1="118" x2="140" y2="190"/><line class="s-dim" x1="140" y1="118" x2="140" y2="190"/><text class="t-dim" x="144" y="174">½X</text>',on)}
 ${DG('tf','<line class="hit" x1="48" y1="14" x2="84" y2="14"/><line class="s-dim" x1="48" y1="14" x2="84" y2="14"/><text class="t-dim" x="66" y="10" text-anchor="middle">tf</text>',on)}
 ${DG('Y','<line class="hit" x1="40" y1="205" x2="214" y2="205"/><line class="s-dim" x1="40" y1="205" x2="214" y2="205"/><text class="t-dim" x="150" y="222" text-anchor="middle">Y (length thru hub)</text>',on)}
 <line class="s-ink" x1="40" y1="191" x2="40" y2="209" stroke-width=".6"/><line class="s-ink" x1="214" y1="151" x2="214" y2="209" stroke-width=".6"/></svg>`;}
function svgFitting(kind,on){
 if(kind==='e90'||kind==='e45'){const k=kind==='e90'?'A':'B',big=kind==='e90';return `<svg viewBox="0 0 360 240" role="img" aria-label="Elbow; click a dimension">
  <path class="s-fill" d="${big?'M60 210 A150 150 0 0 1 210 60 L210 98 A112 112 0 0 0 98 210 Z':'M60 210 A150 150 0 0 1 104 104 L131 131 A112 112 0 0 0 98 210 Z'}"/>
  <path class="s-cl" d="${big?'M79 210 A131 131 0 0 1 210 79':'M79 210 A131 131 0 0 1 117.4 117.4'}" fill="none"/>
  <line class="s-cl" x1="79" y1="${big?79:117}" x2="79" y2="226"/><line class="s-cl" x1="${big?66:66}" y1="79" x2="${big?226:140}" y2="79"/>
  ${DG(k,big?'<line class="hit" x1="79" y1="40" x2="210" y2="40"/><line class="s-dim" x1="79" y1="40" x2="210" y2="40"/><text class="t-dim" x="144" y="34" text-anchor="middle">A</text><line class="hit" x1="40" y1="79" x2="40" y2="210"/><line class="s-dim" x1="40" y1="79" x2="40" y2="210"/><text class="t-dim" x="34" y="148" text-anchor="end">A</text>':'<line class="hit" x1="40" y1="117" x2="40" y2="210"/><line class="s-dim" x1="40" y1="117" x2="40" y2="210"/><text class="t-dim" x="34" y="166" text-anchor="end">B</text>',on)}
  ${DG('OD',`<line class="hit" x1="60" y1="226" x2="98" y2="226"/><line class="s-dim" x1="60" y1="226" x2="98" y2="226"/><text class="t-dim" x="79" y="238" text-anchor="middle">OD</text>`,on)}</svg>`;}
 if(kind==='tee')return `<svg viewBox="0 0 360 230" role="img" aria-label="Equal tee; click a dimension">
  <path class="s-fill" d="M40 120 H150 V40 H210 V120 H320 V180 H40 Z"/><line class="s-cl" x1="24" y1="150" x2="336" y2="150"/><line class="s-cl" x1="180" y1="24" x2="180" y2="196"/>
  ${DG('C','<line class="hit" x1="180" y1="206" x2="320" y2="206"/><line class="s-dim" x1="180" y1="206" x2="320" y2="206"/><text class="t-dim" x="250" y="222" text-anchor="middle">C (run)</text>',on)}
  ${DG('M','<line class="hit" x1="240" y1="40" x2="240" y2="150"/><line class="s-dim" x1="240" y1="40" x2="240" y2="150"/><text class="t-dim" x="246" y="98">M (branch)</text>',on)}
  ${DG('OD','<line class="hit" x1="24" y1="120" x2="24" y2="180"/><line class="s-dim" x1="24" y1="120" x2="24" y2="180"/><text class="t-dim" x="20" y="154" text-anchor="end">OD</text>',on)}</svg>`;
 if(kind==='red')return `<svg viewBox="0 0 360 220" role="img" aria-label="Concentric reducer; click a dimension">
  <path class="s-fill" d="M70 40 H110 L250 80 H290 V140 H250 L110 180 H70 Z"/><line class="s-cl" x1="50" y1="110" x2="310" y2="110"/>
  ${DG('H','<line class="hit" x1="70" y1="200" x2="290" y2="200"/><line class="s-dim" x1="70" y1="200" x2="290" y2="200"/><text class="t-dim" x="180" y="215" text-anchor="middle">H (end to end)</text>',on)}
  ${DG('OD','<line class="hit" x1="50" y1="40" x2="50" y2="180"/><line class="s-dim" x1="50" y1="40" x2="50" y2="180"/><text class="t-dim" x="46" y="114" text-anchor="end">OD</text>',on)}</svg>`;
 return `<svg viewBox="0 0 360 220" role="img" aria-label="Cap; click a dimension">
  <path class="s-fill" d="M120 190 V110 Q120 40 180 40 Q240 40 240 110 V190 H220 V110 Q220 62 180 62 Q140 62 140 110 V190 Z"/><line class="s-cl" x1="180" y1="24" x2="180" y2="206"/>
  ${DG('E','<line class="hit" x1="270" y1="40" x2="270" y2="190"/><line class="s-dim" x1="270" y1="40" x2="270" y2="190"/><text class="t-dim" x="276" y="118">E</text>',on)}
  ${DG('OD','<line class="hit" x1="120" y1="206" x2="240" y2="206"/><line class="s-dim" x1="120" y1="206" x2="240" y2="206"/><text class="t-dim" x="180" y="218" text-anchor="middle">OD</text>',on)}</svg>`;}
/* Realistic side elevation of a flanged valve, drawn to scale from the tables on this page:
   L (face to face, B16.10 / API 609), the B16.5 end flanges (OD, thickness, bolt circle, bolting) and,
   for gate and globe valves, the typical open height H and handwheel W. Body castings, bonnet, yoke and
   operators are representative shapes; L, H, W and the flanges are to scale. */
function svgValve(on,kind='gate'){
 const n=N20.includes(SEL)?SEL:'6',cls=VDC,hw=kind==='gate'||kind==='globe',bfy=kind==='bfy';
 const {L:Lf}=valveL(kind,cls,n),fcls=bfy&&+cls>300?'300':cls,f=flRow(fcls,n),pp=pipeOf(n);
 if(!Lf||!f||!pp)return `<svg viewBox="0 0 400 320" role="img" aria-label="${VK_NAME[kind]}: not listed for this size and class"><text class="t-dim" x="200" y="160" text-anchor="middle">Not listed for NPS ${npsLbl(n)} Class ${cls}</text></svg>`;
 const j=VOP_SZ.indexOf(n),src=hw?VOP[kind]:null,Hd=src&&j>=0?(src.H[cls]||[])[j]:null,Wd=src&&j>=0?(src.W[cls]||[])[j]:null;
 /* --- geometry in mm, origin on the pipe centreline at mid-length, y up --- */
 const O=f.O*25.4,tf=f.tf*25.4+(+cls>=400?6.4:0),R=f.R*25.4,BC=f.BC*25.4,bd=fr(f.d)*25.4,X=f.X*25.4,Yh=f.Y*25.4;
 const ro=pp.OD/2,ri=pp.ri,L2=Lf/2,nr=ro*1.18,bR=Math.max(ro*1.45,O*.36);
 const nutAF=bd*1.6,nutH=bd*.95,stud=bd*.55;
 const bx=Math.max(nr,L2-tf-Math.max(tf*.5,10));               /* half-length available for the body */
 const stroke=ri*2*1.02;
 const H=hw?(Hd||Math.max(bR*3.2,Lf*1.4)):null, W=hw&&Wd&&Wd!=='G'?Wd:null, gear=hw&&Wd==='G';
 /* operator / top heights used for the fit */
 let top=O/2,xmin=-L2,xmax=L2;
 if(hw)top=H+(W?W*.06:0);
 const leverL=Math.max(Lf*.9,ro*4);
 if(kind==='ball'||kind==='plug'){top=bR*1.0+Math.max(40,bR*.5);xmax=Math.max(L2,leverL*.95);}
 if(kind==='swing'||kind==='lift')top=Math.max(O/2,bR*1.25+nutH*2);
 let mate=0;if(bfy){const hub=Math.max(Yh-tf,tf*.8);mate=tf+hub+Math.max(ro*.8,40);xmin=-L2-mate;xmax=L2+mate;top=Math.max(BC/2+bd*2,ro*1.15)+Math.max(70,ri*1.0)+20;}
 if(W){xmin=Math.min(xmin,-W/2);xmax=Math.max(xmax,W/2);}
 if(gear){xmax=Math.max(xmax,bR*1.6);}
 const VW=400,VH=320,ml=34,mr=hw?58:34,mt=hw?30:22,mb=56;
 const k=Math.min((VW-ml-mr)/(xmax-xmin),(VH-mt-mb)/(top+O/2));
 const cx=ml+((VW-ml-mr)-(xmax-xmin)*k)/2-xmin*k, cy=mt+((VH-mt-mb)-(top+O/2)*k)/2+top*k;
 const Xp=x=>+(cx+x*k).toFixed(2), Yp=y=>+(cy-y*k).toFixed(2);
 const rect=(x0,y0,x1,y1,fill,cl='vv-o',ex='')=>`<rect class="${cl}" x="${Xp(Math.min(x0,x1))}" y="${Yp(Math.max(y0,y1))}" width="${(Math.abs(x1-x0)*k).toFixed(2)}" height="${(Math.abs(y1-y0)*k).toFixed(2)}" fill="${fill}" ${ex}/>`;
 const path=(d,fill,cl='vv-o')=>`<path class="${cl}" d="${d}" fill="${fill}"/>`;
 const M=(x,y)=>`M${Xp(x)} ${Yp(y)}`,Lt=(x,y)=>`L${Xp(x)} ${Yp(y)}`,Q=(x1,y1,x,y)=>`Q${Xp(x1)} ${Yp(y1)} ${Xp(x)} ${Yp(y)}`,C3=(a,b,c,d,x,y)=>`C${Xp(a)} ${Yp(b)} ${Xp(c)} ${Yp(d)} ${Xp(x)} ${Yp(y)}`;
 /* hex nut seen side-on: three visible flats */
 const nutH_=(x,y,dir,w=nutH,af=nutAF)=>{const x0=dir>0?x:x-w,x1=dir>0?x+w:x;return rect(x0,y-af/2,x1,y+af/2,'url(#vvNut)')+`<line class="vv-l" x1="${Xp(x0)}" y1="${Yp(y+af/4)}" x2="${Xp(x1)}" y2="${Yp(y+af/4)}"/><line class="vv-l" x1="${Xp(x0)}" y1="${Yp(y-af/4)}" x2="${Xp(x1)}" y2="${Yp(y-af/4)}"/>`;};
 const nutV=(x,y,w=nutAF,h=nutH)=>rect(x-w/2,y,x+w/2,y+h,'url(#vvNutV)')+`<line class="vv-l" x1="${Xp(x-w/4)}" y1="${Yp(y)}" x2="${Xp(x-w/4)}" y2="${Yp(y+h)}"/><line class="vv-l" x1="${Xp(x+w/4)}" y1="${Yp(y)}" x2="${Xp(x+w/4)}" y2="${Yp(y+h)}"/>`+rect(x-stud/2,y+h,x+stud/2,y+h+stud*.9,'url(#vvStem)');
 /* bolt projections seen from the side: y = BC/2·cos(a); far-side bolts drawn first */
 const boltYs=[...Array(f.n)].map((_,i)=>{const a=(i+.5)/f.n*2*Math.PI;return {y:BC/2*Math.cos(a),z:Math.sin(a)};}).sort((a,b)=>a.z-b.z);
 const seen=[];const bolts=boltYs.filter(b=>{if(seen.some(s=>Math.abs(s-b.y)<nutAF*.35))return false;seen.push(b.y);return true;});
 /* one end flange: face at xf, body side towards dir (+1 = to the right) */
 const endFlange=(xf,dir,fill='url(#vvFlange)')=>{const xb=xf+dir*tf,rf=+cls>=400?6.4:1.6;
  return rect(xf+dir*rf,-O/2,xb,O/2,fill)+rect(xf,-R/2,xf+dir*rf,R/2,'url(#vvMach)')
   +bolts.map(b=>nutH_(xb,b.y,dir)+rect(xb+dir*nutH,b.y-stud/2,xb+dir*(nutH+stud*.9),b.y+stud/2,'url(#vvStem)')).join('');};
 /* necks between flange and body casting */
 const neck=(x0,x1,r)=>rect(x0,-r,x1,r,'url(#vvBody)');
 const flowArrow=(x,y,len)=>{const a=len*.28;return `<path class="vv-arrow" d="${M(x-len/2,y)}${Lt(x+len/2-a,y)}${Lt(x+len/2-a,y+a*.55)}${Lt(x+len/2,y)}${Lt(x+len/2-a,y-a*.55)}${Lt(x+len/2-a,y)}Z"/>`;};
 const castLine=(d)=>`<path class="vv-hl" d="${d}"/>`;
 let g='';
 /* ---------------- bodies ---------------- */
 const xi=-L2+tf,xo=L2-tf;
 if(kind==='gate'){
  const bw=Math.min(bx*.92,Math.max(ro*1.2,O*.30)),yb=-Math.min(bR*.92,O*.44),yt=Math.min(bR*.9,O*.44),bft=Math.max(tf*.7,12);
  g+=neck(xi,xo,nr);
  g+=path(`${M(-bw,yt)}${Lt(-bw,yb+bw*.5)}${Q(-bw,yb,-bw*.5,yb)}${Lt(bw*.5,yb)}${Q(bw,yb,bw,yb+bw*.5)}${Lt(bw,yt)}Z`,'url(#vvBody)');
  g+=castLine(`${M(-bw*.72,yb+bw*.35)}${Lt(-bw*.72,yt-4/k)}`);
  /* bonnet flange + bolting */
  const yBf=yt+bft,yBn=yBf+Math.max(bR*.9,(H-yBf)*.24),gw=bw*.5,yG=yBn+Math.max(10,bR*.12);
  g+=[-.92,-.5,.5,.92].map(t=>nutV(t*bw*1.06,yBf)).join('');
  g+=rect(-bw*1.14,yt,bw*1.14,yBf,'url(#vvFlange)');
  g+=path(`${M(-bw*.82,yBf)}${Q(-bw*.78,(yBf+yBn)/2,-bw*.46,yBn)}${Lt(bw*.46,yBn)}${Q(bw*.78,(yBf+yBn)/2,bw*.82,yBf)}Z`,'url(#vvBody)');
  /* gland + gland studs */
  g+=rect(-gw*.95,yBn,gw*.95,yG,'url(#vvMach)')+[-1,1].map(s=>rect(s*gw*.75-stud/2,yG,s*gw*.75+stud/2,yG+nutH*1.6,'url(#vvStem)')+nutV(s*gw*.75,yG,nutAF*.8,nutH*.8)).join('');
  /* yoke, stem, handwheel */
  const hwY=Math.min(H-stroke*.9,H-Math.max(20,H*.1)),yY=hwY-Math.max(10,(W||bR)*.06),sr=Math.max(3.5,ro*.075),ya=Math.max(14,bR*.2,H*.022);
  g+=path(`${M(-bw*.46,yBn)}${C3(-bw*.62,yBn+(yY-yBn)*.45,-bw*.36,yY-ya*1.2,-bw*.2,yY-ya)}${Lt(-bw*.2+ya*.6,yY-ya)}${C3(-bw*.25,yY-ya*1.5,-bw*.48,yBn+(yY-yBn)*.45,-bw*.46+ya,yBn+ya*.3)}Z`,'url(#vvBody)')
     +path(`${M(bw*.46,yBn)}${C3(bw*.62,yBn+(yY-yBn)*.45,bw*.36,yY-ya*1.2,bw*.2,yY-ya)}${Lt(bw*.2-ya*.6,yY-ya)}${C3(bw*.25,yY-ya*1.5,bw*.48,yBn+(yY-yBn)*.45,bw*.46-ya,yBn+ya*.3)}Z`,'url(#vvBody)');
  g+=rect(-bw*.28,yY-ya,bw*.28,yY,'url(#vvBody)');
  g+=rect(-sr,yG,sr,H,'url(#vvStem)')+threads(sr,yY,H);
  g+=hw?handwheel(hwY,W,gear,bw):'';
 }
 if(kind==='globe'||kind==='lift'){
  const rx=Math.min(bx*.98,Math.max(ro*1.7,O*.44)),ry=bR*1.02;
  g+=neck(xi,-rx*.7,nr)+neck(rx*.7,xo,nr);
  g+=`<ellipse class="vv-o" cx="${Xp(0)}" cy="${Yp(0)}" rx="${(rx*k).toFixed(2)}" ry="${(ry*k).toFixed(2)}" fill="url(#vvSphere)"/>`;
  g+=castLine(`${M(-rx*.62,-ry*.55)}${Q(0,-ry*1.05,rx*.62,-ry*.55)}`);
  g+=flowArrow(0,-ry*.42,rx*.75);
  const yt=ry*.86,bw=rx*.62,bft=Math.max(tf*.65,11),yBf=yt+bft;
  if(kind==='globe'){
   const yBn=yBf+Math.max(bR*.75,(H-yBf)*.22),gw=bw*.55,yG=yBn+Math.max(10,bR*.12);
   g+=[-.9,-.45,.45,.9].map(t=>nutV(t*bw*1.05,yBf)).join('')+rect(-bw*1.12,yt,bw*1.12,yBf,'url(#vvFlange)');
   g+=path(`${M(-bw*.8,yBf)}${Q(-bw*.75,(yBf+yBn)/2,-bw*.45,yBn)}${Lt(bw*.45,yBn)}${Q(bw*.75,(yBf+yBn)/2,bw*.8,yBf)}Z`,'url(#vvBody)');
   g+=rect(-gw*.9,yBn,gw*.9,yG,'url(#vvMach)')+[-1,1].map(s=>rect(s*gw*.7-stud/2,yG,s*gw*.7+stud/2,yG+nutH*1.6,'url(#vvStem)')+nutV(s*gw*.7,yG,nutAF*.8,nutH*.8)).join('');
   const hwY=H-Math.max(stroke*.3,H*.07),yY=hwY-Math.max(10,(W||bR)*.06),sr=Math.max(3.5,ro*.075),ya=Math.max(14,bR*.2,H*.022);
   g+=path(`${M(-bw*.45,yBn)}${C3(-bw*.6,yBn+(yY-yBn)*.5,-bw*.32,yY-ya*1.2,-bw*.18,yY-ya)}${Lt(-bw*.18+ya*.6,yY-ya)}${C3(-bw*.22,yY-ya*1.5,-bw*.46,yBn+(yY-yBn)*.5,-bw*.45+ya,yBn+ya*.3)}Z`,'url(#vvBody)')
      +path(`${M(bw*.45,yBn)}${C3(bw*.6,yBn+(yY-yBn)*.5,bw*.32,yY-ya*1.2,bw*.18,yY-ya)}${Lt(bw*.18-ya*.6,yY-ya)}${C3(bw*.22,yY-ya*1.5,bw*.46,yBn+(yY-yBn)*.5,bw*.45-ya,yBn+ya*.3)}Z`,'url(#vvBody)');
   g+=rect(-bw*.26,yY-ya,bw*.26,yY,'url(#vvBody)')+rect(-sr,yG,sr,H,'url(#vvStem)')+threads(sr,yY,H)+handwheel(hwY,W,gear,bw);
  } else {
   /* lift check: bolted cover, no stem */
   const ct=Math.max(tf*.9,14);
   g+=[-.88,-.44,0,.44,.88].map(t=>nutV(t*bw*1.05,yt+ct)).join('');
   g+=rect(-bw*1.12,yt,bw*1.12,yt+ct,'url(#vvFlange)')+rect(-bw*.4,yt+ct,bw*.4,yt+ct+Math.max(4,ct*.25),'url(#vvMach)');
  }
 }
 if(kind==='swing'){
  const bw=Math.min(bx*.95,Math.max(ro*1.9,O*.5)),yb=-nr*1.05,yt=bR*1.05,ct=Math.max(tf*.85,14);
  g+=neck(xi,xo,nr);
  g+=path(`${M(-bw,-nr)}${Q(-bw*1.02,yt*.2,-bw*.86,yt)}${Lt(bw*.86,yt)}${Q(bw*1.02,yt*.2,bw,-nr)}${Q(bw*.7,yb*1.25,0,yb*1.25)}${Q(-bw*.7,yb*1.25,-bw,-nr)}Z`,'url(#vvBody)');
  g+=castLine(`${M(-bw*.7,yt*.15)}${Q(0,yt*.32,bw*.7,yt*.15)}`);
  g+=flowArrow(0,-nr*.55,bw*.8);
  /* hinge pin plug on the upstream side */
  const hx=-bw*.58,hy=yt*.62,hr=Math.max(6,ro*.16);
  g+=`<circle class="vv-o" cx="${Xp(hx)}" cy="${Yp(hy)}" r="${(hr*k).toFixed(2)}" fill="url(#vvMach)"/><polygon class="vv-o" fill="url(#vvNutV)" points="${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return `${Xp(hx+hr*.62*Math.cos(a))},${Yp(hy+hr*.62*Math.sin(a))}`;}).join(' ')}"/>`;
  g+=[-.9,-.45,0,.45,.9].map(t=>nutV(t*bw*.86,yt+ct)).join('');
  g+=rect(-bw*.95,yt,bw*.95,yt+ct,'url(#vvFlange)');
 }
 if(kind==='ball'||kind==='plug'){
  const bw=Math.min(bx*.95,bR*1.05);
  g+=neck(xi,xo,nr);
  let yt;
  if(kind==='ball'){const ry=bR*.98;yt=ry*.93;
   g+=`<ellipse class="vv-o" cx="${Xp(0)}" cy="${Yp(0)}" rx="${(bw*k).toFixed(2)}" ry="${(ry*k).toFixed(2)}" fill="url(#vvSphere)"/>`;
   /* two-piece body joint with studs */
   const jx=bw*.42,jt=Math.max(tf*.55,10),jr=ry*.98;
   g+=rect(jx,-jr,jx+jt,jr,'url(#vvFlange)')+[-1,1].map(s=>nutH_(jx+jt,s*jr*.78,1,nutH*.8,nutAF*.8)).join('');
   g+=castLine(`${M(-bw*.6,-ry*.6)}${Q(-bw*.15,-ry*.95,jx,-ry*.7)}`);
  } else {
   yt=bR*.85;
   g+=path(`${M(-bw,yt)}${Lt(-bw*.62,-bR*.9)}${Lt(bw*.62,-bR*.9)}${Lt(bw,yt)}Z`,'url(#vvBody)');
   g+=castLine(`${M(-bw*.7,yt*.7)}${Lt(-bw*.48,-bR*.75)}`);
   const ct=Math.max(tf*.6,10);g+=[-.85,-.3,.3,.85].map(t=>nutV(t*bw*.95,yt+ct,nutAF*.85,nutH*.85)).join('')+rect(-bw*1.04,yt,bw*1.04,yt+ct,'url(#vvFlange)');yt+=ct;
  }
  /* neck, gland, stem and lever */
  const sr=Math.max(5,ro*.1),nw=Math.max(sr*2.6,bw*.32),yN=yt+Math.max(16,bR*.25),yL=yN+Math.max(10,bR*.14);
  g+=rect(-nw,yt-2,nw,yN,'url(#vvBody)')+rect(-nw*.75,yN,nw*.75,yN+Math.max(6,bR*.07),'url(#vvMach)')+rect(-sr,yN,sr,yL+sr,'url(#vvStem)');
  const lt=Math.max(7,ro*.13),Ll=leverL*.92;
  g+=path(`${M(-sr*2.2,yL)}${Lt(Ll*.18,yL)}${Lt(Ll,yL+lt*1.4)}${Lt(Ll,yL+lt*2.4)}${Lt(Ll*.18,yL+lt)}${Lt(-sr*2.2,yL+lt)}Z`,'url(#vvSteelPlate)');
  g+=path(`${M(Ll*.62,yL+lt*.95+(Ll*.62-Ll*.18)/(Ll*.82)*lt*.4)}${Lt(Ll,yL+lt*1.4)}${Lt(Ll,yL+lt*2.4)}${Lt(Ll*.62,yL+lt*1.95+(Ll*.62-Ll*.18)/(Ll*.82)*lt*.4)}Z`,'url(#vvGrip)');
  g+=nutV(0,yL+lt,sr*2.6,Math.max(5,sr*.9));
 }
 /* end flanges go on top of the body casting so they always read */
 if(!bfy)g+=endFlange(-L2,1)+endFlange(L2,-1);
 if(bfy){
  const rb=Math.max(ro*1.15,BC/2-f.dv*25.4),hub=Math.max(Yh-tf,tf*.8),stub=mate-tf-hub,xn=X/2;
  /* mating WN flanges and pipe stubs (lighter, they are not part of the valve) */
  for(const s of [-1,1]){const xf=s*L2,xb=xf+s*tf,xh=xb+s*hub,xe=xh+s*stub;
   g+=`<g class="vv-mate">`+rect(xh,-ro,xe,ro,'url(#vvPipe)')+path(`${M(xb,xn)}${Lt(xh,ro)}${Lt(xh,-ro)}${Lt(xb,-xn)}Z`,'url(#vvFlange)')+rect(xf,-O/2,xb,O/2,'url(#vvFlange)')+`</g>`;}
  /* through-bolts across both flanges, nuts on the outside */
  g+=bolts.map(b=>rect(-L2-tf-nutH,b.y-stud/2,L2+tf+nutH,b.y+stud/2,'url(#vvStem)')+nutH_(-L2-tf,b.y,-1)+nutH_(L2+tf,b.y,1)).join('');
  /* wafer body, neck, top plate, stem, lever with notch plate */
  g+=rect(-L2,-rb,L2,rb,'url(#vvBody)')+castLine(`${M(-L2*.55,-rb*.85)}${Lt(-L2*.55,rb*.85)}`);
  const nw=Math.max(L2*.55,ro*.22),yN=rb+Math.max(50,ri*.75),tp=Math.max(6,ri*.08),sr=Math.max(4,ro*.07);
  g+=path(`${M(-L2*.85,rb-1)}${Lt(-nw,rb+(yN-rb)*.35)}${Lt(-nw,yN)}${Lt(nw,yN)}${Lt(nw,rb+(yN-rb)*.35)}${Lt(L2*.85,rb-1)}Z`,'url(#vvBody)');
  const pw=Math.max(nw*2.2,ro*.5);g+=rect(-pw,yN,pw,yN+tp,'url(#vvFlange)');
  g+=path(`${M(-pw*.2,yN+tp)}${Q(0,yN+tp+pw*.55,pw*1.4,yN+tp+pw*.25)}${Lt(pw*1.4,yN+tp)}Z`,'url(#vvMach)');
  const yL=yN+tp+Math.max(8,sr*2),lt=Math.max(6,ro*.09),Ll=Math.max(160,ri*2.2);
  g+=rect(-sr,yN,sr,yL+lt,'url(#vvStem)')+path(`${M(-sr*2,yL)}${Lt(Ll,yL+lt*.4)}${Lt(Ll,yL+lt*1.4)}${Lt(-sr*2,yL+lt)}Z`,'url(#vvSteelPlate)')+rect(Ll*.65,yL+lt*.3,Ll,yL+lt*1.5,'url(#vvGrip)');
 }
 function threads(sr,y0,y1){let t='';const p=Math.max(3/k,sr*.55);for(let y=y0;y<y1-p;y+=p)t+=`<line class="vv-th" x1="${Xp(-sr)}" y1="${Yp(y)}" x2="${Xp(sr)}" y2="${Yp(y+p*.6)}"/>`;return t;}
 function handwheel(y,Wd,gear,bw){
  if(gear){const gb=Math.max(bw*.55,40),gy=y-gb*.3,R=gb*.8;
   return rect(-gb,gy,gb,gy+gb*.9,'url(#vvGear)')+rect(gb,gy+gb*.35,gb+gb*.35,gy+gb*.55,'url(#vvStem)')
    +`<ellipse class="vv-hw" cx="${Xp(gb+gb*.4)}" cy="${Yp(gy+gb*.45)}" rx="${(R*.16*k).toFixed(2)}" ry="${(R*k).toFixed(2)}" fill="none"/>`;}
  if(!Wd)return '';
  const Rw=Wd/2,ry=Rw*.13,tr=Math.max(3,Wd*.022);
  const sp=[-.62,0,.62].map(t=>`<line class="vv-sp" x1="${Xp(0)}" y1="${Yp(y)}" x2="${Xp(t*Rw)}" y2="${Yp(y-ry*Math.sqrt(1-t*t))}"/>`).join('');
  return `<ellipse class="vv-hwb" cx="${Xp(0)}" cy="${Yp(y)}" rx="${(Rw*k).toFixed(2)}" ry="${(ry*k).toFixed(2)}" fill="none" stroke-width="${(tr*2*k).toFixed(2)}"/>`
   +sp+rect(-tr*2.2,y-tr*1.4,tr*2.2,y+tr*1.4,'url(#vvHub)')
   +`<path class="vv-hwf" d="M${Xp(-Rw)} ${Yp(y)} A${(Rw*k).toFixed(2)} ${(ry*k).toFixed(2)} 0 0 0 ${Xp(Rw)} ${Yp(y)}" fill="none" stroke-width="${(tr*2*k).toFixed(2)}"/>`;}
 /* ---------------- dimensions (same keys as the list) ---------------- */
 const yLd=Yp(-O/2)+20,lxa=Xp(-L2),lxb=Xp(L2);
 let dims=DG('L',`<line class="hit" x1="${lxa}" y1="${yLd}" x2="${lxb}" y2="${yLd}"/><line class="s-ink vv-ext" x1="${lxa}" y1="${Yp(-O/2)+3}" x2="${lxa}" y2="${yLd+5}"/><line class="s-ink vv-ext" x1="${lxb}" y1="${Yp(-O/2)+3}" x2="${lxb}" y2="${yLd+5}"/><line class="s-dim" x1="${lxa}" y1="${yLd}" x2="${lxb}" y2="${yLd}" marker-start="url(#vvA)" marker-end="url(#vvA)"/><text class="t-dim" x="${(lxa+lxb)/2}" y="${yLd+14}" text-anchor="middle">L face to face</text>`,on);
 if(hw){const hx=Math.min(VW-20,Math.max(Xp(L2),Xp(W?W/2:0),Xp(gear?bR*1.6:0))+22);
  dims+=DG('H',`<line class="hit" x1="${hx}" y1="${Yp(H)}" x2="${hx}" y2="${Yp(0)}"/><line class="s-ink vv-ext" x1="${Xp(0)+4}" y1="${Yp(H)}" x2="${hx+5}" y2="${Yp(H)}"/><line class="s-ink vv-ext" x1="${Xp(L2)+3}" y1="${Yp(0)}" x2="${hx+5}" y2="${Yp(0)}"/><line class="s-dim" x1="${hx}" y1="${Yp(H)}" x2="${hx}" y2="${Yp(0)}" marker-start="url(#vvA)" marker-end="url(#vvA)"/><text class="t-dim" data-rot="1" x="${hx-6}" y="${(Yp(H)+Yp(0))/2}" transform="rotate(-90 ${hx-6} ${(Yp(H)+Yp(0))/2})" text-anchor="middle">H open</text>`,on);
  if(W){const yw=Yp(H)-12,wa=Xp(-W/2),wb=Xp(W/2);dims+=DG('W',`<line class="hit" x1="${wa}" y1="${yw}" x2="${wb}" y2="${yw}"/><line class="s-dim" x1="${wa}" y1="${yw}" x2="${wb}" y2="${yw}" marker-start="url(#vvA)" marker-end="url(#vvA)"/><text class="t-dim" x="${(wa+wb)/2}" y="${yw-4}" text-anchor="middle">W handwheel</text>`,on);}
  else if(gear)dims+=DG('W',`<text class="t-dim" data-fixed="1" x="${Xp(bR*1.2)}" y="${Yp(H)-6}" text-anchor="middle">W: gear operated</text>`,on);}
 const defs=`<defs>
  <linearGradient id="vvBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FBFD0"/><stop offset=".28" stop-color="#C9DCE6"/><stop offset=".55" stop-color="#7EA2B7"/><stop offset="1" stop-color="#4C7086"/></linearGradient>
  <radialGradient id="vvSphere" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#D7E6EE"/><stop offset=".45" stop-color="#8FB0C3"/><stop offset="1" stop-color="#456A80"/></radialGradient>
  <linearGradient id="vvFlange" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7E9DB0"/><stop offset=".25" stop-color="#D3E2EA"/><stop offset=".5" stop-color="#93B2C4"/><stop offset="1" stop-color="#557A8F"/></linearGradient>
  <linearGradient id="vvMach" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F7F9"/><stop offset=".5" stop-color="#C5CED6"/><stop offset="1" stop-color="#8A97A3"/></linearGradient>
  <linearGradient id="vvStem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E9AA5"/><stop offset=".35" stop-color="#F2F5F7"/><stop offset="1" stop-color="#7D8994"/></linearGradient>
  <linearGradient id="vvPipe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AA6B0"/><stop offset=".3" stop-color="#E4E9ED"/><stop offset="1" stop-color="#7A8792"/></linearGradient>
  <linearGradient id="vvNut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B6873"/><stop offset=".3" stop-color="#9AA6B0"/><stop offset=".55" stop-color="#4B5761"/><stop offset="1" stop-color="#2E3740"/></linearGradient>
  <linearGradient id="vvNutV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4B5761"/><stop offset=".35" stop-color="#A3AEB7"/><stop offset=".7" stop-color="#55626C"/><stop offset="1" stop-color="#2E3740"/></linearGradient>
  <linearGradient id="vvHub" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#173C86"/><stop offset=".4" stop-color="#5C8BE0"/><stop offset="1" stop-color="#123275"/></linearGradient>
  <linearGradient id="vvGrip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5C8BE0"/><stop offset=".5" stop-color="#1F4FB3"/><stop offset="1" stop-color="#123275"/></linearGradient>
  <linearGradient id="vvSteelPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6ECF0"/><stop offset="1" stop-color="#8996A1"/></linearGradient>
  <linearGradient id="vvGear" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5D7F94"/><stop offset=".4" stop-color="#9BB9CA"/><stop offset="1" stop-color="#3C5C70"/></linearGradient>
  <marker id="vvA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="vv-ah"/></marker>
 </defs>`;
 const cl=`<line class="s-cl" x1="${Xp(xmin)-14}" y1="${Yp(0)}" x2="${Xp(xmax)+14}" y2="${Yp(0)}"/>`+(hw||kind==='ball'||kind==='plug'||bfy?`<line class="s-cl" x1="${Xp(0)}" y1="${Yp(-O/2)-6}" x2="${Xp(0)}" y2="${Yp(Math.min(top,O/2+20))}"/>`:'');
 return `<svg class="vv" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${VK_NAME[kind]}, NPS ${npsLbl(n)} Class ${cls}, side elevation drawn to scale; click a dimension">${defs}
 <g class="vv-shadow"><ellipse cx="${Xp((xmin+xmax)/2)}" cy="${Yp(-O/2)+4}" rx="${((xmax-xmin)/2*k*.85).toFixed(1)}" ry="4"/></g>
 ${g}${cl}${dims}
 <text class="vv-cap" x="10" y="${VH-5}">${kind==='bfy'?'Wafer body, mating flanges shown light':'Flanged ends to ASME B16.5'} · L${hw?', H, W':''} and flanges to scale · NPS ${npsLbl(n)} · Class ${cls}</text>
 </svg>`;
}


/* ---------- model panel (Dimensions | 3D) ---------- */
const MPS={bl:{mode:'2d',on:'A',kind:'fig8'},fl:{mode:'2d',on:'O'},bw:{mode:'2d',on:'A',kind:'e90'},vd:{mode:'2d',on:'L',kind:'gate'},home:{}};
try{const s=JSON.parse(store.get('mps','{}'));for(const k in s)Object.assign(MPS[k]||{},s[k]);}catch(e){}
const saveMPS=()=>store.set('mps',JSON.stringify({bl:{mode:MPS.bl.mode,kind:MPS.bl.kind},fl:{mode:MPS.fl.mode},bw:{mode:MPS.bw.mode,kind:MPS.bw.kind},vd:{mode:MPS.vd.mode,kind:MPS.vd.kind}}));
const mm2=v=>v==null?'—':(U==='mm'?Math.round(v)+' mm':(v/25.4).toFixed(2)+'″');
function mpData(key){
 if(key==='bl')return mpDataBl();
 if(key==='fl'){let n=FL[FLC].nps.includes(SEL)?SEL:FL[FLC].nps[FL[FLC].nps.length-1];const f=flRow(FLC,n);
  return {title:'Weld neck flange',ctx:`NPS ${npsLbl(n)} · Class ${FLC}`,svg:on=>svgFlange(on),build:()=>buildFlange3D(FLC,n),
   rows:[['O','Flange outside diameter',L(f.O)],['tf','Flange thickness'+(+FLC<400?' (incl. 1.6 RF)':''),L(f.tf)],['R','Raised face diameter',L(f.R)],['BC','Bolt circle diameter',L(f.BC)],['X','Hub diameter at base',L(f.X)],['Y','Length through hub',L(f.Y)],['n×d','Bolts',`${f.n} × ${f.d}″`]].map(r=>[r[0],r[1],r[2]+(r[0]==='n×d'?'':' '+ul())]),
   note:`Size follows Highlight NPS (top bar) or a table row you click. 3D: drawn to scale from this table; drag to rotate, scroll to zoom, double-click to reset.`};}
 if(key==='bw'){const n=BWN.includes(SEL)?SEL:'4',b=bwRow(n),pp=pipeOf(n),K=MPS.bw.kind,od=pp?pp.OD/25.4:null;
  const R={e90:[['A','90° LR centre to end',b.lr90],['A (SR)','90° SR centre to end',b.sr90],['A (3D)','90° 3D centre to end',b.d390],['OD','Pipe outside diameter',od]],
   e45:[['B','45° LR centre to end',b.lr45],['OD','Pipe outside diameter',od]],tee:[['C','Run centre to end',b.tee],['M','Branch centre to end (equal tee)',b.teeM],['OD','Pipe outside diameter',od]],
   red:[['H','End to end (set by large end)',b.red],['OD','Large end OD',od]],cap:[['E','Height',b.cap],['OD','Pipe outside diameter',od]]}[K];
  const small=K==='red'?BWN[Math.max(0,BWN.indexOf(n)-2)]:null;
  return {title:'Butt-weld fitting',ctx:`NPS ${npsLbl(n)}${small?' × '+npsLbl(small)+' (3D shows this reduction)':''}`,kinds:[['e90','90° elbow'],['e45','45° elbow'],['tee','Tee'],['red','Reducer'],['cap','Cap']],
   svg:on=>svgFitting(K,on),build:()=>buildFitting3D(K,n),rows:R.map(r=>[r[0],r[1],r[2]==null?'—':L(r[2],'fit')+' '+ul()]),
   note:'3D shows the LR elbow and an equal tee, to scale with standard wall. Size follows Highlight NPS or a clicked table row.'};}
 if(key==='vd'){const n=N20.includes(SEL)?SEL:'6',K=MPS.vd.kind||'gate',{L:Lf,basis}=valveL(K,VDC,n),hw=K==='gate'||K==='globe';
  const j=VOP_SZ.indexOf(n),src=hw?VOP[K]:null,H=src&&j>=0?src.H[VDC][j]:null,W=src&&j>=0?src.W[VDC][j]:null;
  const opr={swing:'None: check valve, no stem',lift:'None: check valve, no stem',ball:'Lever (gear on large sizes); length per vendor',plug:'Lever or wrench; length per vendor',bfy:'Lever or gearbox per vendor'}[K];
  const rows=[['L','Face to face, '+basis,mm2(Lf)]].concat(hw?[['H','Height, valve open (typical)',mm2(H)],['W','Handwheel diameter (typical)',W==='G'?'gear operated':mm2(W)]]:[['Op.','Operator',opr]]);
  return {title:VK_NAME[K],ctx:`NPS ${npsLbl(n)} · Class ${VDC}`,kinds:VK,svg:on=>svgValve(on,K),build:()=>buildValve3D(K,VDC,n),rows,
   note:`L is ${K==='bfy'?'from API 609':'from ASME B16.10'}${Lf?'':' — not listed for this size and class, so no model is drawn'}. ${hw?'H and W are typical catalogue values (see References), not code values. ':''}In the 3D view the body shape${hw?' is':', lever, cover and hinge are'} schematic; L${hw?', H and W':''} ${hw?'are':'is'} to scale.${K==='bfy'?' Shown clamped between two weld neck flanges.':''} The valve type filter above also switches this view.`};}
}
function mpHTML(key){const st=MPS[key],d=mpData(key);
 return `<div class="mp" id="mp-${key}"><div class="mp-head"><div><h3>${d.title}</h3><div class="ctx">${d.ctx}</div></div>
  <div class="ctrls">${d.kinds?seg('mpk-'+key,d.kinds,st.kind):''}${seg('mpm-'+key,[['2d','Dimensions'],['3d','3D view']],st.mode)}</div></div>
  <div class="mp-body"><div class="mp-stage">${st.mode==='3d'?'<canvas aria-label="3D model, drag to rotate"></canvas><div class="mp-tip">Drag to rotate · scroll to zoom · double-click to reset</div>':d.svg(st.on)}</div>
  <div class="mp-list">${d.rows.map(r=>`<button data-k="${r[0]}" class="${r[0]===st.on?'on':''}"><b>${r[0]}</b><span>${r[1]}</span><i>${r[2]}</i></button>`).join('')}</div></div>
  <p class="mp-note">${d.note}</p></div>`;}
function mpInit(key){const el=document.getElementById('mp-'+key);if(!el)return;const st=MPS[key],d=mpData(key);
 const svg=el.querySelector('.mp-stage svg');
 /* show each dimension's value on the drawing, at its label */
 if(svg)svg.querySelectorAll('.dimg').forEach(g=>{const r=d.rows.find(x=>x[0]===g.dataset.k);if(!r||/—|<|^\s*$/.test(String(r[2])))return;g.querySelectorAll('text').forEach(t=>{if(t.dataset.fixed)return;t.textContent=r[0]+' = '+String(r[2]).trim();});});
 /* keep the longer labels inside the drawing (room left for the larger bold 'selected' style) */
 if(svg&&svg.viewBox&&svg.viewBox.baseVal){const vb=svg.viewBox.baseVal;svg.querySelectorAll('.dimg text').forEach(t=>{if(t.dataset.rot)return;let b;try{b=t.getBBox();}catch(e){return;}if(!b||!b.width)return;
  const m=b.width*.15+3;let dx=0,dy=0;if(b.x+b.width+m>vb.x+vb.width)dx=vb.x+vb.width-(b.x+b.width+m);if(b.x-m+dx<vb.x)dx=vb.x-(b.x-m);
  if(dx||dy)t.setAttribute('transform',`translate(${dx.toFixed(1)},${dy.toFixed(1)})`);});}if(svg)svg.classList.toggle('has-on',!!st.on);
 const apply=()=>{el.querySelectorAll('.mp-list button').forEach(b=>b.classList.toggle('on',b.dataset.k===st.on));
  if(svg){svg.classList.toggle('has-on',!!st.on);svg.querySelectorAll('.dimg').forEach(g=>g.classList.toggle('on',!!st.on&&(g.dataset.k===st.on||st.on.startsWith(g.dataset.k+' '))));}};
 const setOn=k=>{st.on=st.on===k?null:k;apply();};
 el.querySelectorAll('.mp-list button').forEach(b=>b.addEventListener('click',()=>setOn(b.dataset.k)));
 if(svg)svg.querySelectorAll('.dimg').forEach(g=>g.addEventListener('click',()=>setOn(g.dataset.k)));apply();
 bindSeg('mpm-'+key,v=>{st.mode=v;saveMPS();el.outerHTML=mpHTML(key);mpInit(key);});
 if(d.kinds)bindSeg('mpk-'+key,v=>{st.kind=v;st.on=key==='vd'?'L':null;saveMPS();el.outerHTML=mpHTML(key);mpInit(key);});
 const cv=el.querySelector('canvas');if(cv)M3.mount(key,cv,d.build);}

/* ---------- home ---------- */
function renderHome(){const n=FL[FLC].nps.includes(SEL)?SEL:'6',f=flRow(FLC,n),pp=PIPEMAP[n],t=pp[2].STD??pp[2]['40']??Object.values(pp[2])[0];
 const rd=(k,v,u)=>`<div><dt>${k}</dt><dd data-copy>${v}<u>${u}</u></dd></div>`;
 const dir=NAV_GROUPS.map(([g,ks])=>{ks=ks.filter(k=>k!=='home');return `<section class="dir-grp"><h3>${g}</h3><ul>${ks.map(k=>`<li><a href="${PAGE[k]}">${TAB_ICON[k]||''}<span><b>${TAB_LBL[k]}</b><small>${HOME_DESC[k]||''}</small></span>${TAB_STD[k]&&TAB_STD[k]!=='All tables'?`<em>${TAB_STD[k]}</em>`:''}</a></li>`).join('')}</ul></section>`;}).join('');
 $('#p-home').innerHTML=`<div class="hero">
  <div class="hero-copy">
   <h1>Piping reference data for layout and checking</h1>
   <p>Pipe, flange, fitting and valve dimensions from the ASME standards, with ratings, support spans and layout calculators. Search a size to get its values directly.</p>
   <button class="hero-search" type="button" data-cmdk><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><span>Search a size, fitting or tool</span><kbd>/</kbd></button>
   <div class="hero-try"><span>Try</span>${['6 sch 40','4 cl300 flange','8 elbow','DN 150 tee','bolt length'].map(q=>`<button type="button" data-q="${q}">${q}</button>`).join('')}</div>
  </div>
  <figure class="hero-model">
   <div class="stage mp-stage"><canvas aria-label="3D weld neck flange NPS ${npsLbl(n)} Class ${FLC}, drag to rotate"></canvas></div>
   <figcaption>
    <div class="hm-head"><b>WN flange · NPS ${npsLbl(n)} · Class ${FLC}</b><span>Drawn to scale from B16.5. Drag to rotate.</span></div>
    <dl class="hm-read">${f?rd('Flange OD',L(f.O),ul())+rd('Thickness tf',L(f.tf),ul())+rd('Bolt circle',L(f.BC),ul())+rd('Bolting',`${f.n} × ${f.d}″`,''):''}${rd('Pipe OD',L(pp[1],'od'),ul())+rd('Wall, STD',L(t,'w'),ul())}</dl>
   </figcaption>
  </figure>
 </div>
 <div class="dir-head"><h2>Reference library</h2><p>${NAV_GROUPS.flatMap(g=>g[1]).length-1} tools in five groups. Units, NPS and theme in the top bar apply to every page.</p></div>
 <div class="dir">${dir}</div>`;
 const cv=$('#p-home canvas');M3.mount('home',cv,()=>buildFlange3D(FLC,n));}


/* ============================== ACCESS & MAINTENANCE SPACE ============================== */
/* Typical clear widths / heights from published guides; machine sizes from one manufacturer each.
   All values in mm. Project layout specification, local regulations and the actual equipment govern. */
const ACC_SRC={
 osha:['OSHA 29 CFR 1910.36(g) – exit routes','https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.36'],
 bn:['Plant layout general requirements (BN-DG-C01A, Red-Bag)','https://www.red-bag.com/design-guides/207-bn-dg-c01a-plant-layout-general-requirements.html'],
 pd:['Piping layout guidelines, Section 8A (PipingDesigners)','https://pipingdesigners.com/wp/2014/01/01/section-8a-general-guidelines-for-equipment-and-piping-location-spacing-distances-and-clearances/'],
 epc:['EPCLand – plant clearances and access requirements','https://epcland.com/plant-clearances-and-access-requirements/'],
 hyd:['Escorts Hydra 14 specifications (TractorJunction)','https://infra.tractorjunction.com/en/escorts-construction-equipments/hydra-14/specifications'],
 ace:['ACE 14XW pick-and-carry crane (ACE)','https://www.ace-cranes.com/equipment/mobile-cranes/pick-and-carry-cranes/14xw'],
 ltm:['Liebherr LTM 1050-3.1 data (trucks-cranes.nl)','https://trucks-cranes.nl/english/cranes/liebherr/heijkoop1050.html'],
 ltm2:['Liebherr LTM 1050-3.1 specs (LECTURA)','https://www.lectura-specs.com/en/model/cranes/all-terrain-cranes-liebherr/ltm-1050-3-1-11748605'],
 gen:['Genie GS-1930 specifications (rental catalogue)','https://www.lepporents.adpearance.com/catalog/access-equipment/scissor-lifts/gs-1930/print'],
 gen2:['Genie GS-1930 specifications (RitchieSpecs)','https://www.ritchiespecs.com/model/genie-gs1930-scissor-lift'],
 pip:['PIP PNE00003 Process unit and offsites layout guide (sample)','https://www.normsplash.com/Samples/PIP/919837299/PIP-PNE00003-2013-en.pdf']
};
const ACC_CAT=[['all','All'],['per','Personnel routes'],['mnt','Maintenance access'],['road','Roads'],['mach','Machines']];
const ACC=[
 {id:'esc',cat:'per',name:'Escape route (exit access)',w:711,h:2286,extra:'Projections ≥ 2.0 m above floor; many projects use 1.0–1.2 m width',src:['osha'],shape:'person',note:'Legal minimum for exit access. Width must also suit the number of people served.'},
 {id:'walk',cat:'per',name:'Main walkway / access route (two people pass)',w:1200,h:2100,extra:'',src:['epc'],shape:'person2',note:'Best practice for high-traffic routes so two operators can pass.'},
 {id:'aisle',cat:'per',name:'Operating aisle at grade',w:800,h:2100,extra:'',src:['pd'],shape:'person',note:'Minimum clear aisle for operators at grade.'},
 {id:'plat',cat:'per',name:'Working platform',w:1000,h:2100,extra:'Ladder-to-ladder travel 800 mm',src:['bn','pd'],shape:'platform',note:'Clear width on platforms; headroom also applies above stair treads.'},
 {id:'mh',cat:'per',name:'Clear space at a manhole face',w:1000,h:2100,extra:'Manhole centreline ≈ 0.9–1.0 m above platform',src:['bn'],shape:'manhole',note:'Room to enter, rig and remove the cover.'},
 {id:'port',cat:'mnt',name:'Portable manual equipment (carts, A-frames)',w:1000,h:2500,extra:'',src:['pd'],shape:'cart',note:'Hand-moved equipment at grade, such as a small scissor lift or pump cart.'},
 {id:'fork',cat:'mnt',name:'Forklift access',w:2000,h:2500,extra:'Guide basis: 5,000 lb forklift',src:['pd'],shape:'forklift',note:'Clear lane for a small forklift to reach equipment.'},
 {id:'crn12',cat:'mnt',name:'Mobile crane access (12 t class) / hydra lane',w:3000,h:3500,extra:'Hydra 14 is 2.55 m wide, 3.25 m high',src:['pd','hyd'],shape:'hydra',note:'Lane for a small mobile or pick-and-carry (hydra / "elephant") crane.'},
 {id:'rmin',cat:'road',name:'Minor access road',w:3600,h:5100,extra:'Road edge to equipment ≥ 1.5 m',src:['bn'],shape:'truck',note:'Single-lane access inside the unit.'},
 {id:'rsec',cat:'road',name:'Secondary road',w:4800,h:5100,extra:'Inside corner radius 4.5 m',src:['bn'],shape:'truck',note:'Two-way light traffic.'},
 {id:'rpri',cat:'road',name:'Primary road (major equipment)',w:6000,h:6000,extra:'Inside corner radius 10.5 m; some guides use 6.5 m headroom',src:['bn','pd'],shape:'truck',note:'Carries heavy and oversized loads.'},
 {id:'hydra',cat:'mach',name:'Hydra / "elephant" crane (14 t pick-and-carry)',w:2550,h:3250,extra:'Turning radius 7 m; lift height ≈ 15 m; overall length per make',src:['hyd','ace'],shape:'hydra',plan:'hydra',access:3000,accessH:3500,note:'Travel width and height. Plan the 3.0 × 3.5 m lane plus the 7 m turning radius at corners.'},
 {id:'ltm',cat:'mach',name:'Mobile crane, 50 t all-terrain (LTM 1050-3.1)',w:2550,h:3800,extra:'Travel length 12.4 m; outriggers 7.15 × 6.4 m; tail swing 3.53 m',src:['ltm','ltm2'],shape:'mcrane',plan:'ltm',note:'Hardstand must take the full outrigger base; keep the tail-swing circle clear and barricaded.'},
 {id:'sci',cat:'mach',name:'Scissor lift, narrow slab (GS-1930)',w:760,h:2000,extra:'Length 1.83 m; platform 5.79 m; working height 7.79 m; zero inside turning radius',src:['gen','gen2'],shape:'scissor',plan:'sci',note:'Stowed size for moving; it passes a 1.0 m aisle. Check headroom for the raised platform.'}
];
let ACC_SEL=store.get('accsel','esc'),ACC_CF=store.get('acccat','all'),ACC_VIEW=store.get('accview','sec');
function accLen(mm){if(mm==null)return '—';if(U==='mm')return mm>=1000?parseFloat((mm/1000).toFixed(2))+' m':Math.round(mm)+' mm';
 let i=mm/25.4,ft=Math.floor(i/12),inch=Math.round(i-ft*12);if(inch===12){ft++;inch=0;}return `${ft}′-${inch}″`;}
/* realistic front-elevation figures, drawn in mm (x from item centre, y up from ground) */
function accDefs(){return `<defs>
 <linearGradient id="acNavy" x1="0" x2="1"><stop offset="0" stop-color="#22395a"/><stop offset=".45" stop-color="#3a5a86"/><stop offset="1" stop-color="#1c3050"/></linearGradient>
 <linearGradient id="acVest" x1="0" x2="1"><stop offset="0" stop-color="#d9661a"/><stop offset=".45" stop-color="#ff9a3c"/><stop offset="1" stop-color="#c85a14"/></linearGradient>
 <linearGradient id="acVest2" x1="0" x2="1"><stop offset="0" stop-color="#a9b81a"/><stop offset=".45" stop-color="#dcef3a"/><stop offset="1" stop-color="#97a514"/></linearGradient>
 <radialGradient id="acSkin" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#e2b48c"/><stop offset="1" stop-color="#a87650"/></radialGradient>
 <linearGradient id="acHat" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e0a800"/><stop offset=".6" stop-color="#ffd23f"/><stop offset="1" stop-color="#fff2b0"/></linearGradient>
 <linearGradient id="acTire" x1="0" x2="1"><stop offset="0" stop-color="#121519"/><stop offset=".5" stop-color="#3a4047"/><stop offset="1" stop-color="#121519"/></linearGradient>
 <radialGradient id="acTireS" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#3a4047"/><stop offset=".62" stop-color="#16191d"/><stop offset="1" stop-color="#0d0f12"/></radialGradient>
 <linearGradient id="acGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fd0ee"/><stop offset=".45" stop-color="#3f6f91"/><stop offset=".5" stop-color="#7fb2d4"/><stop offset="1" stop-color="#22425c"/></linearGradient>
 <linearGradient id="acYel" x1="0" x2="1"><stop offset="0" stop-color="#d79a06"/><stop offset=".4" stop-color="#ffc629"/><stop offset="1" stop-color="#c48a00"/></linearGradient>
 <linearGradient id="acWht" x1="0" x2="1"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#b3bcc4"/></linearGradient>
 <linearGradient id="acSteel" x1="0" x2="1"><stop offset="0" stop-color="#6d7780"/><stop offset=".45" stop-color="#c3cbd2"/><stop offset="1" stop-color="#5d666f"/></linearGradient>
 <linearGradient id="acShell" x1="0" x2="1"><stop offset="0" stop-color="#9aa4ad"/><stop offset=".35" stop-color="#e3e8ec"/><stop offset="1" stop-color="#7c868f"/></linearGradient>
 <linearGradient id="acOrg" x1="0" x2="1"><stop offset="0" stop-color="#c8561a"/><stop offset=".45" stop-color="#f47b2e"/><stop offset="1" stop-color="#b44a12"/></linearGradient>
 <linearGradient id="acBlue" x1="0" x2="1"><stop offset="0" stop-color="#1d4f8c"/><stop offset=".45" stop-color="#3b78c2"/><stop offset="1" stop-color="#173f72"/></linearGradient>
 <pattern id="acGrate" width="60" height="200" patternUnits="userSpaceOnUse"><rect width="60" height="200" fill="#5c656d"/><rect x="0" width="14" height="200" fill="#9aa3ab"/></pattern>
 <pattern id="acSlat" width="100" height="90" patternUnits="userSpaceOnUse"><rect width="100" height="90" fill="#1b2026"/><rect y="0" width="100" height="40" fill="#3b434b"/></pattern>
</defs>`;}
function accShape(shape,cx,P,col,ghost){
 const s=+P.l(1000)/1000, T=`matrix(${s} 0 0 ${-s} ${+P.x(cx)} ${+P.y(0)})`;
 const ol=`stroke="#141b22" stroke-width=".8" vector-effect="non-scaling-stroke" stroke-linejoin="round"`;
 const R=(x,y,w,h,f,ex='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${ex}/>`;
 const person=(x,vest='url(#acVest)',hh=1750)=>{const k=hh/1750;return `<g transform="translate(${x} 0) scale(${k})">
   <path d="M-175 0 h135 v95 h-150 q0-60 15-95Z M40 0 h135 q15 35 15 95 h-150Z" fill="#2a2420" ${ol}/>
   <path d="M-170 95 L-185 880 L185 880 L170 95 L40 95 L15 600 L-15 600 L-40 95Z" fill="url(#acNavy)" ${ol}/>
   <path d="M-205 860 L-190 1440 Q0 1490 190 1440 L205 860Z" fill="url(#acNavy)" ${ol}/>
   <path d="M-180 900 L-170 1430 Q-80 1460 -40 1450 L-40 900Z M180 900 L170 1430 Q80 1460 40 1450 L40 900Z" fill="${vest}" ${ol}/>
   ${R(-180,1050,140,55,'#e8edf1')}${R(40,1050,140,55,'#e8edf1')}${R(-178,1190,138,55,'#e8edf1')}${R(40,1190,138,55,'#e8edf1')}
   <path d="M-190 1430 Q-275 1400 -265 1250 L-255 900 L-200 900 L-195 1250Z M190 1430 Q275 1400 265 1250 L255 900 L200 900 L195 1250Z" fill="url(#acNavy)" ${ol}/>
   <circle cx="-228" cy="860" r="45" fill="url(#acSkin)"/><circle cx="228" cy="860" r="45" fill="url(#acSkin)"/>
   ${R(-45,1440,90,70,'url(#acSkin)')}
   <ellipse cx="0" cy="1575" rx="98" ry="112" fill="url(#acSkin)" ${ol}/>
   <path d="M-150 1610 Q-150 1640 -110 1645 Q-115 1760 0 1765 Q115 1760 110 1645 Q150 1640 150 1610Z" fill="url(#acHat)" ${ol}/>
   <path d="M0 1765 L0 1650" stroke="#c99400" stroke-width="18"/></g>`;};
 let g='';
 switch(shape){
  case 'person':g=person(0);break;
  case 'person2':g=person(-300)+person(300,'url(#acVest2)');break;
  case 'platform':g=R(-950,-200,1900,200,'url(#acGrate)',ol)+R(-950,0,1900,100,'#c9a227',ol)
   +[-920,920].map(x=>R(x-25,0,50,1100,'#e2b021',ol)).join('')+R(-950,1075,1900,50,'#f2c23a',ol)+R(-950,530,1900,40,'#e2b021',ol)+person(-120);break;
  case 'manhole':g=`<path d="M640 -100 Q900 1000 640 2700 L2600 2700 L2600 -100Z" fill="url(#acShell)" ${ol}/>
   ${R(430,620,260,760,'url(#acSteel)',ol)}${R(330,560,110,880,'url(#acSteel)',ol)}${R(260,580,70,840,'#8a939b',ol)}
   ${[700,820,940,1060,1180,1300].map(y=>`<circle cx="385" cy="${y}" r="22" fill="#2a2f35"/>`).join('')}
   ${R(560,1440,60,900,'url(#acSteel)',ol)}${R(290,2280,330,55,'url(#acSteel)',ol)}<path d="M300 2280 L300 1440" stroke="#555" stroke-width="10"/>
   ${R(0,-120,2600,120,'#4a535b')}`+person(-200);break;
  case 'cart':g=person(-30,'url(#acVest)').replace('<g ','<g opacity=".55" ')
   +`<path d="M-420 1150 L-420 1250 L420 1250 L420 1150Z" fill="#3a4047" ${ol}/>${R(-380,280,760,140,'#3a4047',ol)}
   ${R(-330,420,660,620,'url(#acBlue)',ol)}${[0,1,2,3,4].map(i=>R(-330,480+i*110,660,30,'rgba(0,0,0,.25)')).join('')}${R(-120,1040,240,110,'#2c3238',ol)}
   <circle cx="-250" cy="130" r="130" fill="url(#acTireS)" ${ol}/><circle cx="250" cy="130" r="130" fill="url(#acTireS)" ${ol}/>
   <circle cx="-250" cy="130" r="45" fill="#aab3bb"/><circle cx="250" cy="130" r="45" fill="#aab3bb"/>`;break;
  case 'forklift':g=`${R(-600,40,190,560,'url(#acTire)',ol)}${R(410,40,190,560,'url(#acTire)',ol)}
   <path d="M-560 380 L560 380 L560 1300 L-560 1300Z" fill="url(#acYel)" ${ol}/>
   ${R(-470,1300,90,780,'url(#acYel)',ol)}${R(380,1300,90,780,'url(#acYel)',ol)}${R(-640,2040,1280,100,'#2b3036',ol)}
   ${R(-420,1300,840,740,'rgba(160,200,225,.25)',ol)}<circle cx="0" cy="1550" r="160" fill="none" stroke="#1b1f24" stroke-width="40"/>
   ${R(-300,1200,600,200,'#1b1f24',ol)}
   ${R(-150,120,70,1500,'url(#acSteel)',ol)}${R(80,120,70,1500,'url(#acSteel)',ol)}${R(-470,380,940,260,'#30363c',ol)}
   ${R(-400,80,110,60,'#5a636b',ol)}${R(290,80,110,60,'#5a636b',ol)}${R(-560,640,1120,70,'#1b1f24')}`;break;
  case 'truck':g=`${R(-1250,0,340,1050,'url(#acTire)',ol)}${R(910,0,340,1050,'url(#acTire)',ol)}
   <path d="M-1230 520 L-1230 3200 Q-1230 3400 -1030 3400 L1030 3400 Q1230 3400 1230 3200 L1230 520Z" fill="url(#acWht)" ${ol}/>
   <path d="M-1080 2050 L1080 2050 L1030 3050 L-1030 3050Z" fill="url(#acGlass)" ${ol}/>${R(-30,2050,60,1000,'#1b2026')}
   ${R(-800,950,1600,900,'url(#acSlat)',ol)}${R(-1200,1150,330,230,'#fff7d6',ol)}${R(870,1150,330,230,'#fff7d6',ol)}
   ${R(-1250,480,2500,330,'#2a3038',ol)}${R(-1150,3270,2300,90,'#e8a317')}
   ${R(-1480,2350,90,600,'#1b2026',ol)}${R(1390,2350,90,600,'#1b2026',ol)}<path d="M-1390 2700 L-1230 2700 M1390 2700 L1230 2700" stroke="#1b2026" stroke-width="40"/>`;break;
  case 'hydra':g=`${R(-1275,0,460,1150,'url(#acTire)',ol)}${R(815,0,460,1150,'url(#acTire)',ol)}
   <path d="M-1200 550 L1200 550 L1200 2050 L-1200 2050Z" fill="url(#acYel)" ${ol}/>${R(-1200,1300,2400,90,'#1b1f24')}${R(-1050,700,500,350,'url(#acSlat)',ol)}
   <path d="M-750 2050 L150 2050 L150 3150 Q150 3250 50 3250 L-650 3250 Q-750 3250 -750 3150Z" fill="url(#acYel)" ${ol}/>
   ${R(-640,2250,680,850,'url(#acGlass)',ol)}${R(-350,2250,30,850,'#1b2026')}
   ${R(260,2050,420,1100,'url(#acYel)',ol)}${R(400,2100,140,900,'url(#acSteel)',ol)}<circle cx="470" cy="3150" r="150" fill="url(#acSteel)" ${ol}/>
   <path d="M470 3000 L470 2350" stroke="#2a2f35" stroke-width="22"/>${R(400,2150,140,220,'#e8742a',ol)}`;break;
  case 'mcrane':g=`${R(-1275,0,420,1200,'url(#acTire)',ol)}${R(855,0,420,1200,'url(#acTire)',ol)}
   <path d="M-1240 600 L1240 600 L1240 2300 L-1240 2300Z" fill="url(#acYel)" ${ol}/>${R(-1240,800,2480,200,'#2a3038',ol)}${R(-1240,1500,2480,90,'#1b1f24')}
   ${R(-900,1150,400,200,'#fff7d6',ol)}${R(500,1150,400,200,'#fff7d6',ol)}
   <path d="M-1150 2300 L300 2300 L300 3450 Q300 3550 200 3550 L-1050 3550 Q-1150 3550 -1150 3450Z" fill="url(#acWht)" ${ol}/>
   ${R(-1050,2600,1250,800,'url(#acGlass)',ol)}
   <path d="M400 2300 L1150 2300 L1150 3700 L400 3800Z" fill="url(#acYel)" ${ol}/>${R(520,2400,500,1250,'rgba(0,0,0,.12)')}<circle cx="775" cy="3600" r="120" fill="url(#acSteel)" ${ol}/>`;break;
  case 'scissor':{const deck=(y,dash)=>{const d=dash?`stroke="#F2B33D" stroke-width="1.2" stroke-dasharray="4 3" vector-effect="non-scaling-stroke" fill="none"`:'';
     return (dash?`<rect x="-380" y="${y}" width="760" height="120" ${d}/>`:R(-380,y,760,120,'url(#acOrg)',ol))
     +[-370,-10,350].map(x=>dash?`<path d="M${x+10} ${y+120} L${x+10} ${y+1220}" ${d}/>`:R(x,y+120,25,1100,'#d9661a',ol)).join('')
     +(dash?`<path d="M-380 ${y+1220} L380 ${y+1220} M-380 ${y+650} L380 ${y+650}" ${d}/>`:R(-380,y+1200,760,40,'#e8742a',ol)+R(-380,y+640,760,30,'#e8742a',ol));};
   const arms=(y0,y1,dash)=>{const n=4,hh=(y1-y0)/n;let a='';for(let i=0;i<n;i++){const ya=y0+i*hh,yb=ya+hh;a+=`<path d="M-330 ${ya} L330 ${yb} M330 ${ya} L-330 ${yb}" stroke="${dash?'#F2B33D':'#4a535b'}" stroke-width="${dash?1.2:70}" ${dash?'stroke-dasharray="4 3" vector-effect="non-scaling-stroke"':'stroke-linecap="round"'} fill="none"/>`;}return a;};
   g=`${R(-380,100,760,450,'url(#acOrg)',ol)}${R(-380,450,760,60,'#1b1f24')}<circle cx="-260" cy="110" r="110" fill="url(#acTireS)" ${ol}/><circle cx="260" cy="110" r="110" fill="url(#acTireS)" ${ol}/>
    ${arms(560,1690,false)}`+deck(1700,false)
    +(ghost?'':arms(1700,5790,true)+deck(5790,true)+`<g opacity=".85" transform="translate(0 5910)">${person(0)}</g>`);}break;
 }
 return `<g transform="${T}">${g}</g>`;}
const accDim=(x1,y1,x2,y2,t,anchor='middle',dx=0,dy=-6)=>`<line class="s-dim" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><line class="s-dim" x1="${x1-(y1===y2?0:6)}" y1="${y1-(y1===y2?6:0)}" x2="${x1+(y1===y2?0:6)}" y2="${y1+(y1===y2?6:0)}"/><line class="s-dim" x1="${x2-(y1===y2?0:6)}" y1="${y2-(y1===y2?6:0)}" x2="${x2+(y1===y2?0:6)}" y2="${y2+(y1===y2?6:0)}"/><text class="t-dim" x="${(x1+x2)/2+dx}" y="${(y1+y2)/2+dy}" text-anchor="${anchor}">${t}</text>`;
function accSection(it){const W=520,H=330,m=56;const envW=it.access||it.w,envH=it.accessH||it.h,topH=it.shape==='scissor'?7790:Math.max(envH,1800);
 const s=Math.min((W-2*m)/Math.max(envW*1.25,2000),(H-2*m)/(topH*1.08)),gx=W/2,gy=H-m+6;
 const P={x:x=>(gx+(x)*s).toFixed(1),y:y=>(gy-y*s).toFixed(1),l:v=>(v*s).toFixed(1)};
 const col='var(--steel)';
 let g=`<line x1="10" y1="${gy}" x2="${W-10}" y2="${gy}" stroke="var(--muted)" stroke-width="1.5"/>`;
 for(let x=14;x<W-10;x+=14)g+=`<line x1="${x}" y1="${gy}" x2="${x-8}" y2="${gy+8}" stroke="var(--rule-strong)"/>`;
 const ex=gx-envW*s/2,ew=envW*s,eh=envH*s;
 g+=`<rect x="${ex}" y="${gy-eh}" width="${ew}" height="${eh}" fill="color-mix(in srgb,var(--accent) 10%,transparent)" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="7 4"/>`;
 g+=accShape(it.shape,0,P,col);
 g+=accDim(ex,gy+24,ex+ew,gy+24,'clear width '+accLen(envW),'middle',0,16);
 g+=it.shape==='manhole'?accDim(ex-22,gy,ex-22,gy-eh,'clear height '+accLen(envH),'end',-8,4):accDim(ex+ew+22,gy,ex+ew+22,gy-eh,'clear height '+accLen(envH),'start',8,4);
 if(it.access){const mw=it.w*s;g+=accDim(gx-mw/2,gy-eh-14,gx+mw/2,gy-eh-14,'machine '+accLen(it.w));}
 if(it.shape==='scissor')g+=`<text class="t-dim" x="${P.x(500)}" y="${P.y(5790)}" text-anchor="start">platform raised ${accLen(5790)}</text><text class="t-dim" x="${P.x(500)}" y="${P.y(7790)}" text-anchor="start">working height ${accLen(7790)}</text>`;
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${it.name}: section to scale">${accDefs()}${g}</svg>`;}
function accPlan(it){const W=520,H=330,m=40;let body='',dims='';
 const mk=(spanX,spanY)=>{const s=Math.min((W-2*m)/spanX,(H-2*m)/spanY);return {s,x:v=>(W/2+v*s).toFixed(1),y:v=>(H/2+v*s).toFixed(1),l:v=>(v*s).toFixed(1)};};
 if(it.plan==='ltm'){const P=mk(15500,9500);const L=12400,Wd=2550,oL=7151,oW=6400,ts=3530,cx=-1200;
  body+=`<rect x="${P.x(cx-oL/2)}" y="${P.y(-oW/2)}" width="${P.l(oL)}" height="${P.l(oW)}" fill="color-mix(in srgb,var(--accent) 10%,transparent)" stroke="var(--accent)" stroke-dasharray="7 4" stroke-width="1.6"/>`;
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{body+=`<rect x="${P.x(cx+a*oL/2-120)}" y="${P.y(Math.min(b*oW/2,b*Wd/2))}" width="${P.l(240)}" height="${P.l(Math.abs(oW/2-Wd/2))}" fill="url(#acSteel)" stroke="#141b22" stroke-width=".8"/><rect x="${P.x(cx+a*oL/2-350)}" y="${P.y(b*oW/2-350)}" width="${P.l(700)}" height="${P.l(700)}" rx="${P.l(60)}" fill="#3d454d" stroke="#141b22" stroke-width=".8"/><circle cx="${P.x(cx+a*oL/2)}" cy="${P.y(b*oW/2)}" r="${P.l(220)}" fill="url(#acSteel)"/>`;});
  [-4600,-3050,-1500,1500,3050,4600].forEach(x=>[-1,1].forEach(b=>{body+=`<rect x="${P.x(x-560)}" y="${P.y(b>0?Wd/2-520:-Wd/2)}" width="${P.l(1120)}" height="${P.l(520)}" rx="${P.l(120)}" fill="#16191d"/>`;}));
  body+=`<rect x="${P.x(-L/2)}" y="${P.y(-Wd/2+150)}" width="${P.l(L)}" height="${P.l(Wd-300)}" rx="${P.l(250)}" fill="url(#acYel)" stroke="#141b22" stroke-width=".8"/>`
   +`<rect x="${P.x(L/2-1800)}" y="${P.y(Wd/2-1250)}" width="${P.l(1650)}" height="${P.l(1050)}" rx="${P.l(120)}" fill="url(#acGlass)" stroke="#141b22" stroke-width=".8"/>`
   +`<rect x="${P.x(cx-2200)}" y="${P.y(-1050)}" width="${P.l(3600)}" height="${P.l(2100)}" rx="${P.l(200)}" fill="url(#acWht)" stroke="#141b22" stroke-width=".8"/>`
   +`<rect x="${P.x(cx-1500)}" y="${P.y(-300)}" width="${P.l(1100)}" height="${P.l(800)}" rx="${P.l(100)}" fill="url(#acGlass)" stroke="#141b22" stroke-width=".8"/>`
   +`<path d="M${P.x(cx+200)} ${P.y(500)} L${P.x(L/2+400)} ${P.y(420)} L${P.x(L/2+400)} ${P.y(-420)} L${P.x(cx+200)} ${P.y(-500)}Z" fill="url(#acYel)" stroke="#141b22" stroke-width=".8"/>`
   +`<path d="M${P.x(cx+600)} ${P.y(0)} L${P.x(L/2+300)} ${P.y(0)}" stroke="#8a6a00" stroke-width="1" stroke-dasharray="4 3"/>`;
  body+=`<circle cx="${P.x(cx)}" cy="${P.y(0)}" r="${P.l(ts)}" fill="none" stroke="var(--bad)" stroke-width="2" stroke-dasharray="6 4"/>`;
  dims+=accDim(+P.x(cx-oL/2),+P.y(oW/2)+40,+P.x(cx+oL/2),+P.y(oW/2)+40,'outriggers '+accLen(oL),'middle',0,15)+accDim(+P.x(-L/2)-18,+P.y(-oW/2),+P.x(-L/2)-18,+P.y(oW/2),accLen(oW),'end',-6,4)
   +accDim(+P.x(-L/2),+P.y(-oW/2)-16,+P.x(L/2),+P.y(-oW/2)-16,'travel length '+accLen(L))+`<line x1="${P.x(cx)}" y1="${P.y(0)}" x2="${P.x(cx)}" y2="${P.y(ts)}" stroke="var(--bad)" stroke-width="1.4"/><text class="t-dim" x="${+P.x(cx)+8}" y="${+P.y(ts)+13}" text-anchor="start" style="fill:var(--bad)">tail swing R ${accLen(ts)}</text>`;}
 else if(it.plan==='hydra'){const P=mk(15500,15500);const R=7000,Wd=2550;
  body+=`<circle cx="${P.x(0)}" cy="${P.y(0)}" r="${P.l(R)}" fill="color-mix(in srgb,var(--accent) 8%,transparent)" stroke="var(--accent)" stroke-dasharray="7 4" stroke-width="1.6"/>`;
  body+=`<rect x="${P.x(-Wd/2)}" y="${P.y(-R*.45)}" width="${P.l(Wd)}" height="${P.l(R*.9)}" fill="none" stroke="var(--steel)" stroke-width="1.5" stroke-dasharray="5 3"/>`;
  const hl=R*.62,y0=-hl/2;
  [[-1,y0+700],[1,y0+700],[-1,y0+hl-900],[1,y0+hl-900]].forEach(([b,y])=>{body+=`<rect x="${P.x(b<0?-Wd/2:Wd/2-460)}" y="${P.y(y-600)}" width="${P.l(460)}" height="${P.l(1200)}" rx="${P.l(100)}" fill="#16191d"/>`;});
  body+=`<rect x="${P.x(-Wd/2+380)}" y="${P.y(y0)}" width="${P.l(Wd-760)}" height="${P.l(hl)}" rx="${P.l(150)}" fill="url(#acYel)" stroke="#141b22" stroke-width=".8"/>`
   +`<rect x="${P.x(-Wd/2+380)}" y="${P.y(y0+hl*.32)}" width="${P.l(900)}" height="${P.l(1100)}" rx="${P.l(100)}" fill="url(#acGlass)" stroke="#141b22" stroke-width=".8"/>`
   +`<path d="M${P.x(250)} ${P.y(y0+hl*.25)} L${P.x(650)} ${P.y(y0+hl*.25)} L${P.x(600)} ${P.y(y0-1400)} L${P.x(300)} ${P.y(y0-1400)}Z" fill="url(#acYel)" stroke="#141b22" stroke-width=".8"/><circle cx="${P.x(450)}" cy="${P.y(y0-1400)}" r="${P.l(200)}" fill="url(#acSteel)" stroke="#141b22" stroke-width=".8"/>`;
  dims+=accDim(+P.x(0),+P.y(0),+P.x(R),+P.y(0),'turning R '+accLen(R),'middle',0,-6)+accDim(+P.x(-Wd/2),+P.y(-R*.45)-12,+P.x(Wd/2),+P.y(-R*.45)-12,accLen(Wd))+`<text class="t-dim" x="${P.x(0)}" y="${+P.y(R*.45)+16}" text-anchor="middle">length per make</text>`;}
 else if(it.plan==='sci'){const P=mk(4200,4200);const L=1830,Wd=760,R=1550;
  body+=`<circle cx="${P.x(-L/2+150)}" cy="${P.y(Wd/2)}" r="${P.l(R)}" fill="color-mix(in srgb,var(--accent) 8%,transparent)" stroke="var(--accent)" stroke-dasharray="7 4" stroke-width="1.6"/>`;
  [[-L/2+250,-1],[-L/2+250,1],[L/2-250,-1],[L/2-250,1]].forEach(([x,b])=>{body+=`<rect x="${P.x(x-160)}" y="${P.y(b>0?Wd/2-40:-Wd/2-70)}" width="${P.l(320)}" height="${P.l(110)}" rx="${P.l(30)}" fill="#16191d"/>`;});
  body+=`<rect x="${P.x(-L/2)}" y="${P.y(-Wd/2)}" width="${P.l(L)}" height="${P.l(Wd)}" fill="url(#acOrg)" rx="${P.l(40)}" stroke="#141b22" stroke-width=".8"/><rect x="${P.x(-L/2+60)}" y="${P.y(-Wd/2+60)}" width="${P.l(L-120)}" height="${P.l(Wd-120)}" fill="url(#acGrate)" stroke="#e8742a" stroke-width="${Math.max(2,+P.l(50))}"/><rect x="${P.x(L/2-420)}" y="${P.y(-150)}" width="${P.l(260)}" height="${P.l(300)}" fill="#2a2f35" rx="${P.l(30)}"/>`;
  dims+=accDim(+P.x(-L/2),+P.y(-Wd/2)-14,+P.x(L/2),+P.y(-Wd/2)-14,accLen(L))+accDim(+P.x(L/2)+14,+P.y(-Wd/2),+P.x(L/2)+14,+P.y(Wd/2),accLen(Wd),'start',6,4)+`<text class="t-dim" x="${P.x(-L/2+150)}" y="${+P.y(Wd/2)+P.l(R)-8}" text-anchor="middle">outside turning R ≈ ${accLen(R)}</text>`;}
 else return '';
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${it.name}: plan to scale">${accDefs()}${body}${dims}</svg>`;}
function accCompare(list){const W=1000,H=360,m=40,gap=26;const sumW=list.reduce((a,it)=>a+(it.access||it.w),0);const maxH=Math.max(...list.map(it=>it.accessH||it.h));
 const s=Math.min((W-2*m-gap*(list.length-1))/sumW,(H-90)/maxH),gy=H-46;let x=m,g=`<line x1="10" y1="${gy}" x2="${W-10}" y2="${gy}" stroke="var(--muted)" stroke-width="1.5"/>`;
 list.forEach(it=>{const w=(it.access||it.w)*s,h=(it.accessH||it.h)*s,cx=x+w/2;const P={x:v=>(cx+v*s).toFixed(1),y:v=>(gy-v*s).toFixed(1),l:v=>(v*s).toFixed(1)};
  g+=`<g class="acc-cmp${it.id===ACC_SEL?' on':''}" data-id="${it.id}"><rect x="${x}" y="${gy-h}" width="${w}" height="${h}" fill="color-mix(in srgb,var(--accent) 10%,transparent)" stroke="var(--accent)" stroke-dasharray="5 3"/>${accShape(it.shape,0,P,'var(--steel)',true)}
   ${w>=34?`<text x="${cx}" y="${gy+16}" text-anchor="middle" class="t-dim" style="font-size:10px">${accLen(it.access||it.w)}</text>`:''}<text x="${cx}" y="${gy-h-6}" text-anchor="middle" class="t-dim" style="font-size:10px">${w>=34?accLen(it.accessH||it.h):''}</text>
   ${w>=62?`<text x="${cx}" y="${gy+30}" text-anchor="middle" style="font-size:10px;fill:var(--muted)">${it.name.split(/[(/]/)[0].trim().slice(0,Math.max(6,Math.floor(w/5.6)))}</text>`:''}<title>${it.name}: ${accLen(it.access||it.w)} × ${accLen(it.accessH||it.h)}</title></g>`;x+=w+gap;});
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Clear spaces compared to one scale">${accDefs()}${g}</svg>`;}
function renderAcc(){
 const list=ACC.filter(it=>ACC_CF==='all'||it.cat===ACC_CF);if(!list.some(it=>it.id===ACC_SEL))ACC_SEL=list[0].id;const it=ACC.find(x=>x.id===ACC_SEL);
 const srcs=k=>k.map(s=>`<a href="${ACC_SRC[s][1]}" target="_blank" rel="noopener">${ACC_SRC[s][0].split(' (')[0].split(' – ')[0]}</a>`).join(', ');
 const rows=list.map(r=>`<tr class="acc-row${r.id===ACC_SEL?' best':''}" data-id="${r.id}" tabindex="0"><td style="text-align:left;font-family:var(--f-body);white-space:normal">${r.name}</td><td>${accLen(r.access||r.w)}</td><td>${accLen(r.accessH||r.h)}</td><td style="text-align:left;font-family:var(--f-body);white-space:normal;font-size:12px">${r.access?'Machine '+accLen(r.w)+' × '+accLen(r.h)+'. ':''}${r.extra}</td><td style="text-align:left;font-family:var(--f-body);white-space:normal;font-size:12px">${srcs(r.src)}</td></tr>`).join('');
 $('#p-acc').innerHTML=`<div class="phead"><div><h1>Plant access & maintenance space</h1><p>Typical clear widths and heights for escape and access routes, maintenance lanes and roads, and the space taken by cranes and lifts. Click a row to see it drawn to scale. Lengths in ${U==='mm'?'mm / m':'ft-in'}.</p></div>
  <div class="ctrls"><label class="ctrl"><span class="lbl">Show</span>${seg('accc',ACC_CAT,ACC_CF)}</label></div></div>
  <div class="mp" id="acc-mp"><div class="mp-head"><div><h3>${it.name}</h3><div class="ctx">${it.note}</div></div><div class="ctrls">${seg('accv',[['sec','Section'],...(it.plan?[['plan','Plan']]:[]),['cmp','Compare all']],ACC_VIEW==='plan'&&!it.plan?'sec':ACC_VIEW)}</div></div>
   <div class="mp-stage acc-stage">${ACC_VIEW==='cmp'?accCompare(list):ACC_VIEW==='plan'&&it.plan?accPlan(it):accSection(it)}</div>
   <p class="mp-note">${ACC_VIEW==='cmp'?'All items in this filter at one scale (clear space dashed). Click one to select it; hover for its name and size. Narrow items are easier to read with a filter, e.g. Personnel routes.':'Dashed outline = clear space to keep free. People, vehicles and machines are drawn to scale from the values in the table; their details are illustrative.'}${it.id==='ltm'&&ACC_VIEW==='plan'?' Red circle = tail-swing zone: keep clear and barricade while slewing.':''}</p></div>
  <div class="tw"><table><thead><tr><th style="text-align:left">Item</th><th>Clear width</th><th>Clear height</th><th style="text-align:left">Notes</th><th style="text-align:left">Basis</th></tr></thead><tbody>${rows}</tbody></table></div>
  <div class="eq-custom" style="margin-top:12px"><b>Typical values for preliminary layout.</b> Widths and headroom come from published guides and differ between companies; machine sizes are from one manufacturer per type. Your project plot plan and layout specification, local regulations (factory, fire and egress rules) and the actual crane or lift hired govern. Confirm crane hardstand, outrigger loads and lift plans with the lifting engineer.</div>`;
 bindSeg('accc',v=>{ACC_CF=v;store.set('acccat',v);renderAcc();});
 bindSeg('accv',v=>{ACC_VIEW=v;store.set('accview',v);renderAcc();});
 const pick=id=>{ACC_SEL=id;store.set('accsel',id);if(ACC_VIEW==='plan'&&!ACC.find(x=>x.id===id).plan)ACC_VIEW='sec';renderAcc();};
 $('#p-acc').querySelectorAll('.acc-row').forEach(r=>{r.addEventListener('click',()=>pick(r.dataset.id));r.addEventListener('keydown',e=>{if(e.key==='Enter')pick(r.dataset.id);});});
 $('#p-acc').querySelectorAll('.acc-cmp').forEach(g=>g.addEventListener('click',()=>pick(g.dataset.id)));
}

Object.assign(REF,{accOsha:['std','OSHA 29 CFR 1910.36(g) – exit route width and height',ACC_SRC.osha[1]],accPip:['std','PIP PNE00003 – Process unit and offsites layout guide (sample)',ACC_SRC.pip[1]],
 accBn:['free','Plant layout general requirements, BN-DG-C01A (Red-Bag)',ACC_SRC.bn[1],'Roads, walkways, platforms, manholes.'],accPd:['free','Piping layout guidelines, Section 8A (PipingDesigners)',ACC_SRC.pd[1],'Aisles and maintenance access at grade (portable equipment, forklift, 12 t crane).'],
 accEpc:['free','EPCLand – plant clearances and access requirements',ACC_SRC.epc[1],'Main walkway width.'],accHyd:['vendor','Escorts Hydra 14 specifications (TractorJunction)',ACC_SRC.hyd[1],'Hydra width 2.55 m, height 3.25 m, turning radius 7 m.'],
 accAce:['vendor','ACE 14XW pick-and-carry crane',ACC_SRC.ace[1],'14 t capacity, lift height.'],accLtm:['vendor','Liebherr LTM 1050-3.1 data (trucks-cranes.nl)',ACC_SRC.ltm[1],'Travel size, outrigger base 7.151 × 6.4 m, tail swing 3.53 m.'],
 accLtm2:['vendor','Liebherr LTM 1050-3.1 specs (LECTURA)',ACC_SRC.ltm2[1],'Outrigger span cross-check.'],accGen:['vendor','Genie GS-1930 specifications (rental catalogue)',ACC_SRC.gen[1],'0.76 × 1.83 m, working height 7.79 m.'],
 accGen2:['vendor','Genie GS-1930 specifications (RitchieSpecs)',ACC_SRC.gen2[1],'Stowed height, platform height, turning radius.']});
REFS.acc={use:'Clear widths and heights for routes, maintenance access and roads, and manufacturer sizes for the cranes and lift shown.',k:['accOsha','accPip','accBn','accPd','accEpc','accHyd','accAce','accLtm','accLtm2','accGen','accGen2']};

/* ============================== GLOBAL ============================== */
function setSel(n){SEL=n;store.set('nps',n);$('#npsSel').value=n;renderData();}
function renderData(){if(window.renderCV&&TAB==='cv')window.renderCV();if(window.renderRack&&TAB==='rack')window.renderRack();if(window.renderFJ&&TAB==='fj')window.renderFJ();if(window.renderExp&&TAB==='exp')window.renderExp();renderSize();renderPipe();renderFlange();renderBW();renderSW();renderGasket();renderBlind();renderPT();renderSpan();renderSpacing();renderVdim();renderHome();renderAcc();}
function renderUnits(){document.querySelectorAll('#unitSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.u===U));}
$('#unitSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;U=b.dataset.u;store.set('u',U);renderUnits();renderData();});
$('#npsSel').innerHTML=PIPE.map(p=>`<option value="${p[0]}">${p[0]}″  (DN ${DN[p[0]]})</option>`).join('');
$('#npsSel').value=SEL;$('#npsSel').onchange=e=>setSel(e.target.value);
document.addEventListener('click',e=>{const r=e.target.closest('tbody tr[data-nps]');if(r&&!r.closest('#p-calc'))setSel(r.dataset.nps);});
renderTabs();renderUnits();renderData();renderValve();renderShoe();renderEq();renderCalc();/* reference blocks removed from all tabs */
$('#thBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));applyTheme(document.documentElement.dataset.theme||'light');renderTabs();

/* ---------- correction / contact form (Web3Forms → contact.piperef@gmail.com) ---------- */
(()=>{
  const WEB3FORMS_KEY='99b731d0-1652-4a8a-95ea-851ce9e4f168'; // free key from web3forms.com, made for contact.piperef@gmail.com
  const f=document.getElementById('cfForm'); if(!f) return;
  const msg=document.getElementById('cfMsg'), btn=document.getElementById('cfSend'), page=document.getElementById('cfPage');
  try{const r=document.referrer&&new URL(document.referrer); if(r&&r.origin===location.origin&&!/contact/.test(r.pathname)){
    const n=r.pathname.replace(/^\/|\.html$/g,'')||'home'; page.value=n.replace(/-/g,' ').replace(/^./,c=>c.toUpperCase());}}catch(e){}
  const setType=()=>f.classList.toggle('no-corr',f.type.value!=='Correction');
  f.addEventListener('change',e=>{if(e.target.name==='type')setType();}); setType();
  const say=(t,c)=>{msg.textContent=t;msg.className='cf-msg '+(c||'');};
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!f.message.value.trim()){say('Please write a message.','err');f.message.focus();return;}
    if(f.email.value&&!f.email.checkValidity()){say('That email address looks incomplete.','err');f.email.focus();return;}
    if(f.botcheck.checked) return;
    const type=f.type.value, pg=f.page.value.trim(), cx=window.__corr?window.__corr.fields(type):{};
    const data={access_key:WEB3FORMS_KEY,from_name:'Pipe Ref website',
      subject:`Pipe Ref ${type.toLowerCase()}${cx.reference_no?' '+cx.reference_no:''}${type==='Correction'&&pg?': '+pg:''}${cx.data_version?' (data '+cx.data_version.split(' ')[0]+')':''}`,
      ...cx,
      type, name:f.name.value.trim()||'(not given)', email:f.email.value.trim()||'(not given)',
      ...(type==='Correction'?{page:pg||'(not given)',reference:f.reference.value.trim()||'(not given)'}:{}),
      message:f.message.value.trim(), sent_from:location.href};
    if(f.email.value) data.replyto=f.email.value.trim();
    btn.disabled=true; say('Sending…');
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)});
      const j=await r.json().catch(()=>({}));
      if(r.ok&&j.success){const ref=window.__corr?window.__corr.sent(type):'';f.reset();setType();say(ref?`Sent. Your reference is ${ref}. Keep it to track this ${type==='Correction'?'correction':'message'} below.`:'Thanks — your message has been sent.','ok');}
      else throw new Error(j.message||r.status);
    }catch(err){say('Could not send right now. Please email contact.piperef@gmail.com instead.','err');}
    finally{btn.disabled=false;}
  });
})();
