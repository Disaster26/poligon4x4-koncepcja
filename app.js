// menu mobilne
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('otwarte');burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('otwarte');burger.setAttribute('aria-expanded',false);document.body.style.overflow=''}));

// aktywna pozycja menu przy przewijaniu
const linki=[...menu.querySelectorAll('a[href^="#"]')];
const io=new IntersectionObserver(w=>w.forEach(e=>{if(e.isIntersecting){linki.forEach(l=>l.toggleAttribute('aria-current',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
linki.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));if(s)io.observe(s)});

// taśmy: strzałki + przeciąganie myszą
document.querySelectorAll('.strzalki').forEach(s=>{const t=document.getElementById(s.dataset.dla);const [p,n]=s.querySelectorAll('button');const krok=()=>t.firstElementChild.offsetWidth+20;p.onclick=()=>t.scrollBy({left:-krok(),behavior:'smooth'});n.onclick=()=>t.scrollBy({left:krok(),behavior:'smooth'})});
document.querySelectorAll('.tasma').forEach(t=>{let x0=0,s0=0,ruch=false,przes=0;
  t.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;ruch=true;przes=0;x0=e.clientX;s0=t.scrollLeft;t.classList.add('ciagnie')});
  window.addEventListener('pointermove',e=>{if(!ruch)return;przes=e.clientX-x0;t.scrollLeft=s0-przes});
  window.addEventListener('pointerup',()=>{if(!ruch)return;ruch=false;t.classList.remove('ciagnie')});
  t.addEventListener('click',e=>{if(Math.abs(przes)>6){e.preventDefault();e.stopPropagation()}},true);
});

// mapa ładowana przy przewinięciu
const mapa=document.querySelector('.mapa');
new IntersectionObserver((w,o)=>{if(w[0].isIntersecting){const f=document.createElement('iframe');f.src=mapa.dataset.src;f.loading='lazy';f.title='Mapa dojazdu do Poligon 4x4';mapa.appendChild(f);o.disconnect()}},{rootMargin:'300px'}).observe(mapa);
