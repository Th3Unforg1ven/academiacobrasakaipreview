(() => {
 const reel=document.querySelector('.hero-reel'); if(!reel)return;
 const slides=[...reel.querySelectorAll('.reel-slide')], choices=[...reel.querySelectorAll('[data-slide]')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let current=0,paused=motion.matches,visible=true,timer;
 function schedule(){clearTimeout(timer);if(!paused&&visible&&!document.hidden)timer=setTimeout(()=>show((current+1)%slides.length),4000)}
 function show(index){current=index;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.inert=i!==index;slide.setAttribute('aria-hidden',String(i!==index))});choices.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));schedule()}
 choices.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
 reel.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show((current+(event.key==='ArrowRight'?1:-1)+slides.length)%slides.length)}});
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{paused=motion.matches;schedule()});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(reel);schedule();
})();

(() => {
 const dialog=document.querySelector('.p-lightbox');if(!dialog)return;
 document.querySelectorAll('.p-history-photo figure>img,.p-community-record figure>img').forEach(img=>{const a=document.createElement('a');a.href=img.src;a.className='archive-enlarge';a.dataset.caption=img.alt;a.setAttribute('aria-label','Ampliar: '+img.alt);img.replaceWith(a);a.append(img)});
 document.querySelectorAll('.archive-enlarge').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();dialog.querySelector('img').src=link.href;dialog.querySelector('img').alt=link.dataset.caption;dialog.querySelector('p').textContent=link.dataset.caption;dialog.showModal();document.documentElement.classList.add('photo-is-open')}));
 dialog.addEventListener('close',()=>document.documentElement.classList.remove('photo-is-open'));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
})();
