/* ==========================================================================
   CURSOR.JS
   Custom dot + ring cursor that follows the pointer, magnetic hover pull
   for buttons/links, and the subtle mouse-parallax on the hero portrait.
   ========================================================================== */

function initCursor(){
  /* ============ CURSOR ============ */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  function ringLoop(){ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(ringLoop); }
  ringLoop();
  document.querySelectorAll('a,button,.g-card,.testi-dot,.logo-item,.svc-card,.svc-gallery-item').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
  });
}

function initMagneticButtons(){
  /* ============ MAGNETIC BUTTONS ============ */
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*0.28}px, ${y*0.35}px)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
  });
}

function initHeroParallax(){
  /* ============ PARALLAX HERO IMAGE ============ */
  const heroFrame = document.querySelector('.hero-media .frame');
  if(heroFrame){
    document.querySelector('.hero').addEventListener('mousemove', e=>{
      const r = document.querySelector('.hero').getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      heroFrame.style.transform = `translate(${x*14}px, ${y*14}px)`;
    });
  }
}
