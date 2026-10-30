const KEY="so_tour_v3";
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
const defS=()=>({st:[],cur:0,su:{txt:"",size:6,ng:1,name:"Guruh",t:3,e:1}});
if(!S||!S.st)S=defS();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cl=(v,a,b)=>Math.max(a,Math.min(b,Math.floor(+v)||a));
function dlg(msg,ok){const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:99;padding:16px";
 o.innerHTML=`<div class="card" style="max-width:380px;margin:0"><div style="margin-bottom:12px">${esc(msg)}</div><div class="row" style="justify-content:flex-end">${ok?'<button data-x="0">Bekor qilish</button><button class="on" data-x="1">Ha</button>':'<button class="on" data-x="1">OK</button>'}</div></div>`;
 o.onclick=e=>{const x=e.target.dataset.x;if(x===undefined)return;o.remove();if(x=="1"&&ok)ok()};document.body.appendChild(o)}
const names=t=>t.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
const split=(f,ng)=>{const b=Math.floor(f.length/ng),r=f.length%ng,g=[];let k=0;for(let i=0;i<ng;i++){const z=b+(i<r?1:0);g.push(f.slice(k,k+z));k+=z}return g};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function fit(s){s.t=cl(s.t,1,10);s.e=cl(s.e,0,5);s.adv=cl(s.adv,0,50);
 s.g.forEach(g=>g.forEach(p=>{p.m.length=s.t*5;p.e.length=s.e*5;for(let i=0;i<s.t*5;i++)p.m[i]=p.m[i]||"";for(let i=0;i<s.e*5;i++)p.e[i]=p.e[i]||""}))}
const sc=a=>a.reduce((x,v,i)=>x+(v=="T"?1:v=="N"?-1:0)*(i%5+1)*10,0);
function calc(ps){const r=ps.map((p,i)=>{const cnt=[0,0,0,0,0];p.m.forEach((v,j)=>{if(v=="T")cnt[4-j%5]++});
 const act=p.m.some(v=>v=="T"||v=="N")?1:0;return{i,n:p.n,tot:sc(p.m),ex:sc(p.e),act,k:[act,sc(p.m),...cnt,sc(p.e)]}});
 const cmp=(a,b)=>{for(let i=0;i<a.k.length;i++)if(a.k[i]!=b.k[i])return b.k[i]-a.k[i];return 0};
 r.forEach(x=>{x.rank=1+r.filter(y=>cmp(y,x)<0).length;x.tie=x.act&&r.some(y=>y!==x&&cmp(y,x)==0)});
 r.sort((a,b)=>cmp(a,b)||a.i-b.i);r.cmp=cmp;return r}
const advList=s=>{const pl=[];s.g.forEach(ps=>calc(ps).filter(x=>x.act).slice(0,s.adv).forEach(x=>pl.push(x)));return pl.sort((a,b)=>a.rank-b.rank||b.tot-a.tot)};
const tabs=()=>'<div class="tabs">'+S.st.map((x,i)=>`<button class="${i==S.cur?"on":""}" data-tab="${i}">${x.draft?"✎ ":""}${esc(x.name)}</button>`).join("")+(S.st.length&&!S.st[S.st.length-1].draft?'<button data-add="1">+ Keyingi bosqich</button>':"")+'</div>';
function suInfo(){const u=S.su,n=names(u.txt).length;$("su_info").innerHTML=n<2?"Kamida 2 ta ishtirokchi kiriting.":`${n} kishi → <b>${u.ng}</b> ta guruh (har birida ${Math.floor(n/u.ng)}${n%u.ng?"–"+Math.ceil(n/u.ng):""} kishi).`;save()}
function drawSetup(){const u=S.su;$("app").innerHTML=`<div class="card"><h2>Turnirni boshlash</h2>
<label>Ishtirokchilar ro’yxati (har qatorda bitta ism; Excel’dan nusxalab qo’yish mumkin)<textarea id="su_txt" rows="10">${esc(u.txt)}</textarea></label>
<div class="set" style="margin:10px 0"><label>Bosqich nomi<input type="text" id="su_name" value="${esc(u.name)}"></label>
<label>Guruhda necha kishi<input type="number" id="su_size" min="1" value="${u.size}"></label>
<label>Guruhlar soni<input type="number" id="su_ng" min="1" value="${u.ng}"></label>
<label>Mavzular soni<input type="number" id="su_t" min="1" max="10" value="${u.t}"></label>
<label>Qo’shimcha mavzular<input type="number" id="su_e" min="0" max="5" value="${u.e}"></label></div>
<div class="mu" id="su_info" style="margin-bottom:10px"></div><button class="on" id="su_go">Tasodifiy taqsimlash va boshlash</button></div>`;suInfo()}
function drawDraft(s){const cnt=Array.from({length:s.ng},(_,i)=>s.pool.filter(p=>p.g==i+1).length),un=s.pool.filter(p=>!p.g).length;
 $("app").innerHTML=tabs()+`<div class="card"><h2>Bosqichni shakllantirish</h2><div class="set">
 <label>Bosqich nomi<input type="text" data-df="name" value="${esc(s.name)}"></label>
 <label>Guruhlar soni<input type="number" data-df="ng" min="1" max="50" value="${s.ng}"></label>
 <label>Mavzular soni<input type="number" data-df="t" min="1" max="10" value="${s.t}"></label>
 <label>Qo’shimcha mavzular<input type="number" data-df="e" min="0" max="5" value="${s.e}"></label>
 <button data-load="1">Oldingi bosqich o’tuvchilarini yuklash</button><button class="dg" data-del="1">Bekor qilish</button></div>
 <label style="margin-top:10px">Ishtirokchilar (har qatorda bitta ism)<textarea data-pt="1" rows="6">${esc(s.pool.map(p=>p.n).join("\n"))}</textarea></label>
 <div class="row" style="margin-top:10px"><button data-rand="1">Tasodifiy taqsimlash</button><button class="on" data-start="1">Bosqichni boshlash</button></div></div>
 <div class="card sc"><b>Guruhlarga joylashtirish</b> <span class="mu">— ${cnt.map((c,i)=>`${i+1}-guruh: ${c}`).join(" · ")}${un?` · <span class="tie">guruhsiz: ${un}</span>`:""}</span>
 <table style="margin-top:8px"><thead><tr><th>№</th><th>Ishtirokchi</th><th>Guruh</th></tr></thead><tbody>${s.pool.map((p,i)=>`<tr><td>${i+1}</td><td style="text-align:left">${esc(p.n)}</td><td><select data-as="${i}"><option value="0">—</option>${Array.from({length:s.ng},(_,k)=>`<option value="${k+1}"${p.g==k+1?" selected":""}>${k+1}-guruh</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>`}
function draw(){save();if(!S.st.length)return drawSetup();const s=S.st[S.cur];if(s.draft)return drawDraft(s);fit(s);
 const tot=advList(s).length;
 let h=tabs()+`<div class="card"><div class="set"><label>Bosqich nomi<input type="text" data-f="name" value="${esc(s.name)}"></label>
 <label>Mavzular soni<input type="number" data-f="t" min="1" max="10" value="${s.t}"></label>
 <label>Qo’shimcha mavzular<input type="number" data-f="e" min="0" max="5" value="${s.e}"></label>
 <label>Har guruhdan o’tadi<input type="number" data-f="adv" min="0" max="50" value="${s.adv}"></label>
 <button class="dg" data-del="1">Bosqichni o’chirish</button></div>
 <div class="mu" style="margin-top:8px">${s.g.reduce((a,g)=>a+g.length,0)} ishtirokchi, ${s.g.length} ta guruh. Keyingi bosqichga har guruhdan ${s.adv} tadan o’tadi (hozir aniq: ${tot} kishi). Keyingi bosqichni «+ Keyingi bosqich» tugmasi bilan shakllantiring.</div></div>`;
 s.g.forEach((ps,g)=>{h+=`<div class="card sc"><div class="gh"><b>${esc(s.name)} — ${g+1}-guruh</b> <span class="mu">(${ps.length} kishi)</span></div><table><thead><tr><th rowspan="2">№</th><th rowspan="2">Ishtirokchi</th>`;
  for(let t=0;t<s.t;t++)h+=`<th colspan="5" class="g${t%4}">${t+1}-mavzu</th>`;
  h+='<th rowspan="2">Jami</th><th rowspan="2">O’rin</th>';
  for(let t=0;t<s.e;t++)h+=`<th colspan="5" class="ex">Qo’shimcha ${t+1}</th>`;
  if(s.e)h+='<th rowspan="2">Qo’sh. ball</th>';
  h+='</tr><tr>';for(let t=0;t<s.t+s.e;t++)for(let q=1;q<=5;q++)h+=`<th class="${t<s.t?"g"+(t%4):"ex"}">${q*10}</th>`;
  h+='</tr></thead><tbody>';
  ps.forEach((p,i)=>{h+=`<tr id="row${g}_${i}"><td>${i+1}</td><td class="nm"><input type="text" data-nm="${i}" data-g="${g}" value="${esc(p.n)}"></td>`;
   p.m.forEach((v,j)=>h+=`<td class="c"><input maxlength="1" data-c="m" data-g="${g}" data-i="${i}" data-j="${j}" class="${v}" value="${v}"></td>`);
   h+=`<td class="tot" id="t${g}_${i}"></td><td class="tot" id="r${g}_${i}"></td>`;
   p.e.forEach((v,j)=>h+=`<td class="c"><input maxlength="1" data-c="e" data-g="${g}" data-i="${i}" data-j="${j}" class="${v}" value="${v}"></td>`);
   if(s.e)h+=`<td class="tot" id="x${g}_${i}"></td>`;h+='</tr>'});
  h+=`</tbody></table><div class="sm" id="sm${g}"></div></div>`});
 h+='<div class="row"><button class="dg" id="rs">Hammasini boshidan boshlash</button></div>';
 $("app").innerHTML=h;upd()}
function upd(){const s=S.st[S.cur];
 s.g.forEach((ps,g)=>{const r=calc(ps),any=r.some(x=>x.act),adv=r.filter(x=>x.act).slice(0,s.adv),ok=new Set(adv.map(x=>x.i));
  r.forEach(x=>{const k=g+"_"+x.i;$("t"+k).textContent=x.tot;const c=$("r"+k);c.textContent=any?x.rank+(ok.has(x.i)?" →":""):"";c.className="tot "+(any&&x.rank<4?"r"+x.rank:"");if(s.e)$("x"+k).textContent=x.ex;$("row"+k).className=ok.has(x.i)?"adv":""});
  let m=any?r.map(x=>`${x.rank}. ${esc(x.n)} (${x.tot})`).join(" · "):"Natijalar kiritilmagan.";
  const ties=r.filter(x=>x.tie).map(x=>esc(x.n));
  if(ties.length)m+=`<div class="tie">Mutlaq tenglik: ${ties.join(", ")} — qo’shimcha mavzuni o’ynang.</div>`;
  const a=r.filter(x=>x.act);if(s.adv&&a.length>s.adv&&r.cmp(a[s.adv-1],a[s.adv])==0)m+=`<div class="tie">Diqqat: o’tish chegarasida tenglik bor!</div>`;
  if(any&&r.some(x=>!x.act))m+=`<div class="mu">Javob bermaganlar eng oxirgi o’rinda.</div>`;
  $("sm"+g).innerHTML=m});save()}
const app=document.body;
app.addEventListener("click",e=>{const t=e.target,d=t.dataset,s=S.st[S.cur];
 if(t.id=="su_go"){const u=S.su,n=shuf(names(u.txt));if(n.length<2)return dlg("Kamida 2 ta ishtirokchi kiriting.");
  S.st=[{name:u.name||"Guruh",t:cl(u.t,1,10),e:cl(u.e,0,5),adv:3,g:split(n.map(x=>({n:x,m:[],e:[]})),cl(u.ng,1,n.length))}];S.cur=0;draw()}
 else if(t.id=="rs"){dlg("Barcha ma’lumotlar o’chiriladi. Davom etasizmi?",()=>{S=defS();draw()})}
 else if(d.tab!==undefined){S.cur=+d.tab;draw()}
 else if(d.add){const p=S.st[S.st.length-1],pool=advList(p).map(x=>({n:x.n,g:0})),gm=Math.max(...p.g.map(g=>g.length)),nm=["Nimchorak final","Chorak final","Yarim final","Final"][S.st.length-1]||"Yangi bosqich";
  S.st.push({draft:1,name:nm,t:p.t,e:p.e,ng:Math.max(1,Math.ceil(pool.length/Math.max(gm,1))),pool});S.cur=S.st.length-1;draw()}
 else if(d.del){dlg("Bu bosqich o’chirilsinmi?",()=>{S.st.splice(S.cur,1);S.cur=Math.max(0,S.cur-1);draw()})}
 else if(d.load){const p=S.st[S.cur-1];if(!p||!p.adv)return dlg("Oldingi bosqichda «Har guruhdan o’tadi» sonini kiriting.");
  s.pool=advList(p).map(x=>({n:x.n,g:0}));draw()}
 else if(d.rand){shuf(s.pool.map((_,i)=>i)).forEach((pi,k)=>s.pool[pi].g=k%s.ng+1);draw()}
 else if(d.start){if(s.pool.length<2)return dlg("Kamida 2 ta ishtirokchi kerak.");if(s.pool.some(p=>!p.g))return dlg("Barcha ishtirokchilarni guruhga joylashtiring.");
  const g=Array.from({length:s.ng},(_,i)=>s.pool.filter(p=>p.g==i+1).map(p=>({n:p.n,m:[],e:[]}))).filter(x=>x.length);
  S.st[S.cur]={name:s.name,t:cl(s.t,1,10),e:cl(s.e,0,5),adv:Math.min(3,Math.max(...g.map(x=>x.length))),g};draw()}});
app.addEventListener("change",e=>{const t=e.target,d=t.dataset,s=S.st[S.cur];
 if(d.f){s[d.f]=d.f=="name"?(t.value||"Bosqich"):t.value;draw()}
 else if(d.df){s[d.df]=d.df=="name"?(t.value||"Bosqich"):cl(t.value,1,50);draw()}
 else if(d.pt){const old=s.pool.slice();s.pool=names(t.value).map(n=>{const k=old.findIndex(o=>o.n==n);return k>=0?old.splice(k,1)[0]:{n,g:0}});draw()}
 else if(d.as!==undefined){s.pool[d.as].g=+t.value;draw()}});
app.addEventListener("input",e=>{const t=e.target,d=t.dataset,s=S.st[S.cur],u=S.su;
 if(t.id&&t.id.startsWith("su_")&&t.id!="su_go"){const n=names(u.txt=$("su_txt").value).length||1;u.name=$("su_name").value;u.t=$("su_t").value;u.e=$("su_e").value;
  if(t.id=="su_ng"){u.ng=cl(t.value,1,n);u.size=Math.ceil(n/u.ng);$("su_size").value=u.size}else{if(t.id=="su_size")u.size=cl(t.value,1,n);u.ng=Math.ceil(n/Math.max(1,u.size));$("su_ng").value=u.ng}suInfo()}
 else if(d.nm!==undefined){s.g[d.g][d.nm].n=t.value;upd()}
 else if(d.c){let v=t.value.trim().toUpperCase();if(v!="T"&&v!="N")v="";t.value=v;t.className=v;s.g[d.g][d.i][d.c][d.j]=v;upd()}});
app.addEventListener("focusin",e=>{if(e.target.dataset.c)e.target.select()});
draw();
