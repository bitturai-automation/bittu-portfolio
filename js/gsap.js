/* ==========================================================================
   GSAP.JS
   GSAP-powered motion: the hero entrance timeline and every ScrollTrigger-
   driven reveal (section reveals, stat counters, the process progress bar,
   staggered card/list entrances). Falls back to fully-visible static state
   if GSAP/ScrollTrigger aren't available.
   ========================================================================== */

/* ============ HERO ENTRANCE TIMELINE ============ */
function initHeroTimeline(){
  /* ============ HERO ENTRANCE TIMELINE ============ */
  if(window.gsap){
    gsap.timeline({ defaults:{ ease:'power3.out' } })
      .from('.hero', { opacity:0, duration:.6 })
      .from('.hero-bigname', { opacity:0, y:40, duration:1.1 }, '-=.3')
      .from('.hero-photo', { opacity:0, y:50, scale:.96, duration:1, ease:'power4.out' }, '-=.8')
      .from('.hero-heading-v2', { opacity:0, y:26, duration:.8 }, '-=.55')
      .from('.hero-badge-pill', { opacity:0, y:16, duration:.6 }, '-=.4')
      .from('.hero-right-v2', { opacity:0, y:16, duration:.7 }, '-=.5')
      .from('.hero-cta', { opacity:0, y:12, scale:.94, duration:.6 }, '-=.35');

    /* gentle continuous float on the glow + grid for an "alive" backdrop */
    gsap.to('.hero-glow', { x:18, y:-14, duration:9, ease:'sine.inOut', yoyo:true, repeat:-1 });
  }
}

/* ============ SCROLLTRIGGER REVEALS ============ */
function initScrollReveals(){
  /* ============ GSAP SCROLL REVEALS ============ */
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el=>{
      gsap.to(el,{
        opacity:1, y:0, scale:1, duration:1.1, ease:'power3.out',
        scrollTrigger:{ trigger:el, start:'top 85%' }
      });
    });
    /* Trust-stats count-up on scroll */
    document.querySelectorAll('.stat-num .counter').forEach(el=>{
      const target = parseInt(el.getAttribute('data-target'),10) || 0;
      const counterObj = { val:0 };
      ScrollTrigger.create({
        trigger: el,
        start:'top 88%',
        once:true,
        onEnter:()=>{
          gsap.to(counterObj,{
            val: target, duration:1.8, ease:'power2.out',
            onUpdate:()=>{ el.textContent = Math.round(counterObj.val); },
            onComplete:()=>{ el.textContent = target; }
          });
        }
      });
    });

    gsap.to('#pFill',{
      width:'100%', ease:'none',
      scrollTrigger:{ trigger:'.process', start:'top 70%', end:'bottom 60%', scrub:true,
        onUpdate: self=>{
          const idx = Math.min(PROCESS.length-1, Math.floor(self.progress*PROCESS.length));
          document.querySelectorAll('.p-step').forEach((s,i)=> s.classList.toggle('on', i<=idx));
        }
      }
    });
    gsap.to('.hero-bigname',{ y:-40, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });

    /* Stagger-in the process/how-i-work cards with a growing pop */
    gsap.fromTo('.p-step',
      { opacity:0, y:30, scale:.9 },
      { opacity:1, y:0, scale:1, duration:.8, ease:'back.out(1.5)', stagger:.12,
        scrollTrigger:{ trigger:'.p-steps', start:'top 88%' }
      }
    );

    /* Stagger-in the work gallery cards on scroll, with growing pop */
    ScrollTrigger.batch('.g-card', {
      start:'top 92%',
      onEnter: batch => gsap.fromTo(batch,
        { opacity:0, y:36, scale:.92 },
        { opacity:1, y:0, scale:1, duration:.75, ease:'back.out(1.4)', stagger:.08, overwrite:true }
      )
    });

    /* Gentle fade+scale entrance for client logos */
    gsap.utils.toArray('.logo-item').forEach((el,i)=>{
      gsap.from(el,{
        opacity:0, scale:.8, duration:.6, ease:'back.out(1.6)', delay:(i%14)*.04,
        scrollTrigger:{ trigger:'.trusted', start:'top 85%' }
      });
    });

    /* Stagger-in the service cards on scroll, with growing pop */
    ScrollTrigger.batch('.svc-card', {
      start:'top 90%',
      onEnter: batch => gsap.fromTo(batch,
        { opacity:0, y:36, scale:.92 },
        { opacity:1, y:0, scale:1, duration:.75, ease:'back.out(1.4)', stagger:.1, overwrite:true }
      )
    });

    /* ---- Granular "growing" stagger reveals for smaller elements across every section ---- */
    const growGroups = [
      '.tl-item',        /* education & experience timeline rows */
      '.proj-item',       /* things I've built cards */
      '.cert-list li',    /* courses & certifications */
      '.skill-cat',       /* skills categories block */
      '.act-item',        /* leadership items */
      '.lang-row',        /* language rows */
      '.tag',              /* #SystemsFirst etc pills */
      '.pill',              /* about-media floating pills */
      '.skill-chip',        /* about-media floating skill chips */
      '.hero-badge'         /* hero floating badges */
    ];
    growGroups.forEach(sel=>{
      const items = gsap.utils.toArray(sel);
      if(!items.length) return;
      ScrollTrigger.batch(items, {
        start:'top 92%',
        onEnter: batch => gsap.fromTo(batch,
          { opacity:0, y:20, scale:.85 },
          { opacity:1, y:0, scale:1, duration:.65, ease:'back.out(1.6)', stagger:.07, overwrite:true }
        )
      });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
    document.querySelectorAll('.p-step').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
    document.querySelectorAll('.svc-card').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
    document.querySelectorAll('.tl-item,.proj-item,.cert-list li,.skill-cat,.act-item,.lang-row,.tag,.pill,.skill-chip,.hero-badge').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
    document.querySelectorAll('.stat-num .counter').forEach(el=>{ el.textContent = el.getAttribute('data-target') || '0'; });
  }
}
