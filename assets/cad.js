/* CAD commands page: search + category filter + print. */
(function(){
const P=document.getElementById('p-cad');if(!P)return;
const q=P.querySelector('#cdQ'),rows=[...P.querySelectorAll('#cdT tbody tr')],none=P.querySelector('#cdNone');let cat='all';
function apply(){const s=(q.value||'').trim().toLowerCase();let n=0;
  rows.forEach(r=>{const ok=(cat==='all'||r.dataset.c===cat)&&(!s||r.textContent.toLowerCase().includes(s));r.hidden=!ok;if(ok)n++;});
  none.hidden=n>0;}
q.addEventListener('input',apply);
function setCat(c){cat=c;P.querySelectorAll('.cd-chip').forEach(x=>x.classList.toggle('on',x.dataset.c===c));}
P.querySelectorAll('.cd-chip').forEach(b=>b.addEventListener('click',()=>{setCat(b.dataset.c);apply();}));
const pr=P.querySelector('#cdPrint');if(pr)pr.addEventListener('click',()=>{q.value='';setCat('all');apply();P.querySelectorAll('.cd-fix').forEach(d=>d.open=true);window.print();});
})();
