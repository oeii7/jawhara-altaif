/* منطق الموقع: البحث والأقسام وسلة الطلب وإرسال الطلب. بريد الاستقبال في السطر التالي (MAIL) */
const MAIL="jowarataltaif@gmail.com";
let cur=0;const $=id=>document.getElementById(id);
(function(){const n=14,p=["100% 0","100% 100%"];for(let k=n;k>=1;k--){p.push("30px "+(k/n*100)+"%");p.push("0 "+((k-.5)/n*100)+"%")}p.push("30px 0");document.documentElement.style.setProperty("--zz","polygon("+p.join(",")+")");
const t=$("tris");for(let i=0;i<9;i++){const e=document.createElement("i"),s=130-i*13;e.style.cssText="--s:"+s+"px;--x:"+(i*i*5+12)+"px;--c:"+(i%2?"rgba(255,255,255,.28)":"#26272A");t.appendChild(e)}})();
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2000)}
function cats(){const v=$("s").value.trim().toLowerCase(),g=$("cats");g.innerHTML="";
C.forEach((c,i)=>{if(v&&!(c[0]+c[1]).toLowerCase().includes(v)&&!(P[i]||[]).some(p=>(p[0]+p[1]).toLowerCase().includes(v)))return;
const b=document.createElement("button");b.className="row";b.setAttribute("aria-pressed",i===cur);b.innerHTML="<span>"+c[0]+"</span><em>"+c[1]+"</em>";b.onclick=()=>{cur=i;cats();prods();if(innerWidth<=820)document.getElementById("ct").scrollIntoView({behavior:"smooth",block:"start"})};g.appendChild(b)});
{const s=g.querySelector('[aria-pressed="true"]');if(s&&innerWidth<=820)g.scrollLeft=s.offsetLeft+s.offsetWidth/2-g.clientWidth/2}
if(!g.children.length)g.innerHTML='<p class="empty">لا نتائج لهذا البحث. جرّب كلمة أخرى أو امسح خانة البحث.</p>'}
function card(p,badge){const d=document.createElement("article");d.className="prod";d.innerHTML='<div class="ph"><img src="'+p[2]+'" alt="'+p[0]+'" loading="lazy" decoding="async" width="400" height="400">'+(badge?'<span class="ofb">'+badge+'</span>':'')+'</div><div class="t"><h3>'+p[0]+'</h3><small>'+p[1]+'</small><button class="btn">أضف إلى الطلب</button></div>';d.querySelector("button").onclick=()=>addItem(p);return d}
function prods(){const v=$("s").value.trim().toLowerCase(),g=$("prods");$("ct").textContent=C[cur][0];g.innerHTML="";
const l=(P[cur]||[]).filter(p=>!v||(p[0]+p[1]).toLowerCase().includes(v)||(C[cur][0]+C[cur][1]).toLowerCase().includes(v));
if(!l.length){g.innerHTML='<p class="empty">منتجات هذا القسم ستظهر هنا في النسخة الكاملة. سنضيف منتجاته في الدفعة القادمة.</p>';return}
l.forEach(p=>g.appendChild(card(p)))}
$("s").oninput=()=>{cats();prods()};
let CART=[];try{CART=JSON.parse(localStorage.getItem("jt_cart")||"[]")||[]}catch(_){CART=[]}
function saveCart(){try{localStorage.setItem("jt_cart",JSON.stringify(CART))}catch(_){}}
function code(k){const m=/(\d+)\.webp/.exec(k);return m?m[1]:""}
function addItem(p){const it=CART.find(x=>x.k===p[2]);if(it)it.q=Math.min(9999,it.q+1);else CART.push({k:p[2],n:p[0],e:p[1],q:1});saveCart();renderCart();toast("أُضيف إلى الطلب: "+p[0])}
function setQty(i,v){v=parseInt(v,10);if(!(v>=1))v=1;CART[i].q=Math.min(9999,v);saveCart();renderCart()}
function renderCart(){const c=$("cart"),cc=$("cc");c.innerHTML="";cc.hidden=!CART.length;cc.textContent=CART.length;
if(!CART.length){c.innerHTML='<p class="em">لم تضف أصنافًا بعد. اختر من الأقسام بزر «أضف إلى الطلب».</p>';return}
const hd=document.createElement("div");hd.className="hd";hd.innerHTML="<span>أصناف الطلب: "+CART.length+"</span>";
const cl=document.createElement("button");cl.type="button";cl.textContent="تفريغ السلة";cl.onclick=()=>{if(confirm("تفريغ كل الأصناف؟")){CART=[];saveCart();renderCart()}};hd.appendChild(cl);c.appendChild(hd);
CART.forEach((x,i)=>{const r=document.createElement("div");r.className="ci";
const nm=document.createElement("div");nm.className="nm";nm.textContent=x.n;const sm=document.createElement("small");sm.textContent=x.e;nm.appendChild(sm);
const rm=document.createElement("button");rm.type="button";rm.className="rm";rm.setAttribute("aria-label","حذف "+x.n);rm.textContent="×";rm.onclick=()=>{CART.splice(i,1);saveCart();renderCart()};
const qt=document.createElement("div");qt.className="qt";
const mi=document.createElement("button");mi.type="button";mi.textContent="−";mi.setAttribute("aria-label","إنقاص الكمية");mi.onclick=()=>setQty(i,x.q-1);
const inp=document.createElement("input");inp.type="number";inp.min="1";inp.max="9999";inp.inputMode="numeric";inp.value=x.q;inp.setAttribute("aria-label","الكمية: "+x.n);inp.onchange=()=>setQty(i,inp.value);
const pl=document.createElement("button");pl.type="button";pl.textContent="+";pl.setAttribute("aria-label","زيادة الكمية");pl.onclick=()=>setQty(i,x.q+1);
qt.append(pl,inp,mi);r.append(nm,rm,qt);c.appendChild(r)})}
function orderText(n,t,q){let s="طلب عرض سعر جديد\nالمنشأة: "+n+"\nرقم الجوال: "+t+"\n\nالأصناف ("+CART.length+"):\n"+items();if(q)s+="\nالملاحظات:\n"+q;return s}
function items(){return CART.map((x,i)=>(i+1)+". ["+code(x.k)+"] "+x.n+" — الكمية: "+x.q).join("\n")}
function check(){const n=$("n").value.trim(),t=$("t").value.trim(),q=$("q").value.trim();
if(!n){toast("اكتب اسم المنشأة أولًا");$("n").focus();return null}
if(t.replace(/\D/g,"").length<8){toast("اكتب رقم جوال صحيحًا للتواصل");$("t").focus();return null}
if(!CART.length&&!q){toast("أضف صنفًا واحدًا على الأقل");$("cart").scrollIntoView({block:"center"});return null}
return{n,t,q}}
function done(){$("f").reset();CART=[];saveCart();renderCart()}
function el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function openMd(nodes){const m=$("mb");m.innerHTML="";nodes.forEach(n=>m.appendChild(n));$("md").hidden=false;document.body.style.overflow="hidden"}
function closeMd(){$("md").hidden=true;document.body.style.overflow=""}
$("md").onclick=e=>{if(e.target===$("md"))closeMd()};document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("md").hidden)closeMd()});
function summary(d){const n=[];n.push(el("h3","","راجع طلبك قبل الإرسال"),el("p","sub","تأكد من الأصناف والكميات، ثم اضغط «تأكيد وإرسال»."));
const mt=el("div","meta");mt.append(el("b","","المنشأة"),el("span","",d.n),el("b","","الجوال"),el("span","",d.t));n.push(mt);
if(CART.length){const ol=el("ol");CART.forEach(x=>{const li=el("li");li.append(el("span","",x.n),el("span","","× "+x.q));ol.appendChild(li)});n.push(ol)}
if(d.q)n.push(el("div","nt",d.q));
const ac=el("div","ac"),ed=el("button","btn ghost","تعديل الطلب");ed.type="button";ed.onclick=closeMd;
const cf=el("button","btn","تأكيد وإرسال");cf.type="button";cf.onclick=()=>send(d,cf);ac.append(ed,cf);n.push(ac);return n}
async function send(d,cf){const subj="طلب عرض سعر جديد من "+d.n,body=orderText(d.n,d.t,d.q);
cf.disabled=true;cf.textContent="جارٍ الإرسال…";
try{
const data={"المنشأة":d.n,"رقم الجوال":d.t,"عدد الأصناف":String(CART.length),"الأصناف والكميات":CART.length?items():"—","الملاحظات":d.q||"—",_subject:subj,_template:"table",_captcha:"false"};
const r=await fetch("https://formsubmit.co/ajax/"+MAIL,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)});
const j=await r.json().catch(()=>({}));
const ok=r.ok&&(j.success===true||j.success==="true")&&!/activat/i.test(j.message||"");
if(!ok){console.warn("FormSubmit response:",r.status,j);throw 0}
done();const ac=el("div","ac"),cl=el("button","btn","إغلاق");cl.type="button";cl.onclick=closeMd;ac.appendChild(cl);
openMd([el("div","ok","✓"),el("h3","","تم استلام طلبك"),el("p","sub","وصل طلبك إلى فريق جوهرة الطيف فعليًا. سنراجعه ونتواصل معك على الرقم "+d.t+" بعرض السعر."),ac])
}catch(_){
const ac=el("div","ac"),ml=el("a","btn","إرسال الطلب عبر البريد");ml.href="mailto:"+MAIL+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
const wa=el("a","btn ghost","تواصل عبر واتساب");wa.href="https://wa.me/966573852018";wa.target="_blank";wa.rel="noopener";
const bk=el("button","btn ghost","رجوع");bk.type="button";bk.onclick=closeMd;ac.append(ml,wa,bk);
openMd([el("div","er","!"),el("h3","","لم يُرسل الطلب بعد"),el("p","sub","تعذّر الإرسال التلقائي، وأصنافك ما زالت محفوظة في السلة. أكمل الإرسال عبر بريدك أو تواصل معنا واتساب."),ac])}}
$("f").onsubmit=e=>{e.preventDefault();$("fs").textContent="";if($("h").value)return;const d=check();if(!d)return;openMd(summary(d))};
renderCart();
cats();prods();
