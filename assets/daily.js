/* Daily piping challenge on the homepage. Same question for everyone on a given date; streak kept in this browser only. */
import {START,Q} from './challenges.js?v=20261127a';
const N=Q.length,KEY='piperef-daily';
const [y0,m0,d0]=START.split('-').map(Number);
const t=new Date(),dayN=Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())-Date.UTC(y0,m0-1,d0))/864e5);
const qi=n=>((n%N)+N)%N;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
function streakNow(s){return (s.last===dayN||s.last===dayN-1)?(s.streak||0):0}
export function mount(root){
  const card=root.querySelector('#dcCard'),stats=root.querySelector('#dcStats');
  let open=false;
  if(!card)return;
  const q=Q[qi(dayN)];
  function render(){
    const s=load(),pick=(s.ans||{})[dayN];const done=pick!==undefined;
    const hero=card.closest('.dc-hero');if(hero)hero.classList.toggle('dc-collapsed',done&&!open);card.classList.toggle('dc-min',done&&!open);
    if(done&&!open){const ok=pick===q.a;
      card.innerHTML=`<button type="button" class="dc-fold" aria-expanded="false"><span class="dc-mark ${ok?'ok':'no'}">${ok?'✓':'✗'}</span><span class="dc-ft"><small>Today’s challenge · ${ok?'answered right':'answered'}</small><b>${esc(q.q)}</b></span><span class="dc-more">Show</span></button>`;}
    else card.innerHTML=`${done?'<button type="button" class="dc-hide" aria-expanded="true">Hide ▲</button>':''}<div class="dc-top"><span class="dc-tag">Today’s challenge · ${esc(q.t)}</span><span class="dc-num">#${q.n}</span></div>
     <h2 class="dc-q">${esc(q.q)}</h2>
     <div class="dc-opts">${q.o.map((o,i)=>{let c='';if(done){if(i===q.a)c=' ok';else if(i===pick)c=' no';}
       return `<button type="button" class="dc-opt${c}" data-i="${i}" ${done?'disabled':''}><span>${esc(o)}</span>${done&&i===q.a?'<em>Correct</em>':done&&i===pick?'<em>Not this one</em>':''}</button>`;}).join('')}</div>
     ${done?`<div class="dc-ans"><b class="${pick===q.a?'ok':'no'}">${pick===q.a?'Right!':'Not quite.'} The answer is: ${esc(q.o[q.a])}.</b><p>${esc(q.e)}</p>
       <div class="dc-links">${q.g?`<a class="dc-btn" href="${q.g}">Read the guide</a>`:''}<a class="dc-btn alt" href="${q.k}">Open the tool</a></div>
       <p class="dc-next">Come back tomorrow for the next one.</p></div>`:'<p class="dc-hint">Pick an answer. No sign-up needed.</p>'}`;
    const st=streakNow(s);
    if(stats)stats.innerHTML=`<div class="dc-stat"><span>Your streak</span><b>${st} ${st===1?'day':'days'}</b></div><div class="dc-stat"><span>Answered right</span><b>${s.correct||0} of ${s.played||0}</b></div>`;
  }
  card.addEventListener('click',e=>{if(e.target.closest('.dc-fold')){open=true;render();return;}if(e.target.closest('.dc-hide')){open=false;render();return;}const b=e.target.closest('.dc-opt');if(!b||b.disabled)return;
    const s=load();s.ans=s.ans||{};if(s.ans[dayN]!==undefined)return;
    const i=+b.dataset.i;s.streak=(s.last===dayN-1)?(s.streak||0)+1:1;s.last=dayN;s.played=(s.played||0)+1;if(i===q.a)s.correct=(s.correct||0)+1;
    s.ans[dayN]=i;const ks=Object.keys(s.ans).map(Number).sort((a,b)=>b-a);ks.slice(14).forEach(k=>delete s.ans[k]);save(s);open=true;render();});
  render();
}
