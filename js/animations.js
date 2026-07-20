/* ==========================================================================
   ANIMATIONS.JS
   Non-scroll-triggered visual behaviour: rendering + interaction for the
   trusted-by marquee, testimonials carousel, service cards (3D tilt +
   spotlight + "world" background switch), the process timeline, the
   floating hero/backdrop particles, and the hero project-orbit nodes.
   ========================================================================== */

/* ============ TRUSTED-BY MARQUEE ============ */
function initMarquee(){
  /* ---- render trusted-by marquee ---- */
  function renderMarquee(){
    const set = LOGOS.concat(LOGOS); // duplicate for seamless loop
    const row1 = document.getElementById('marqueeRow1');
    const row2 = document.getElementById('marqueeRow2');
    const makeLogo = (src)=>{
      const s = document.createElement('span');
      s.className = 'logo-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Client logo';
      img.loading = 'lazy';
      s.appendChild(img);
      return s;
    };
    set.forEach(src=> row1.appendChild(makeLogo(src)) );
    set.slice().reverse().forEach(src=> row2.appendChild(makeLogo(src)) );
  }
  renderMarquee();
}

/* ============ TESTIMONIALS CAROUSEL ============ */
function initTestimonials(){
  /* ---- render testimonials carousel ---- */
  function renderTestimonials(){
    const track = document.getElementById('testiTrack');
    const dotsEl = document.getElementById('testiDots');
    TESTIMONIALS.forEach((t,i)=>{
      const initials = t.name.split(' ').map(w=>w[0]).join('').slice(0,2);
      const card = document.createElement('div');
      card.className = 'testi-card glass';
      card.innerHTML = `
        <div class="testi-quote-mark">"</div>
        <div class="testi-stars">${'<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(t.rating)}</div>
        <p class="testi-text">${t.text}</p>
        <div class="testi-person">
          <div class="testi-avatar">${initials}</div>
          <div style="flex:1;">
            <div class="testi-name-row"><span class="testi-name">${t.name}</span><span class="icon" data-icon="linkedin" style="width:14px;height:14px;color:var(--gold);"></span></div>
            <div class="testi-role">${t.role}${t.company ? ' · '+t.company : ''}</div>
          </div>
        </div>`;
      track.appendChild(card);
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i===0?' active':'');
      dot.addEventListener('click', ()=>goToTesti(i));
      dotsEl.appendChild(dot);
    });
    renderIcons();
  }
  renderTestimonials();

  let testiIndex = 0, testiTimer;
  function testiCardWidth(){
    const card = document.querySelector('.testi-card');
    if(!card) return 460;
    const style = getComputedStyle(document.getElementById('testiTrack'));
    return card.getBoundingClientRect().width + parseFloat(style.gap || 26);
  }
  function goToTesti(i){
    testiIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    const track = document.getElementById('testiTrack');
    track.style.transform = `translateX(-${testiIndex * testiCardWidth()}px)`;
    document.querySelectorAll('.testi-dot').forEach((d,idx)=> d.classList.toggle('active', idx===testiIndex));
  }
  function startTestiAuto(){ testiTimer = setInterval(()=> goToTesti(testiIndex+1), 4500); }
  function stopTestiAuto(){ clearInterval(testiTimer); }
  document.getElementById('testiNext').addEventListener('click', ()=>{ goToTesti(testiIndex+1); stopTestiAuto(); startTestiAuto(); });
  document.getElementById('testiPrev').addEventListener('click', ()=>{ goToTesti(testiIndex-1); stopTestiAuto(); startTestiAuto(); });
  document.querySelector('.testimonials').addEventListener('mouseenter', stopTestiAuto);
  document.querySelector('.testimonials').addEventListener('mouseleave', startTestiAuto);
  window.addEventListener('resize', ()=> goToTesti(testiIndex));
  startTestiAuto();
}

/* ============ SERVICE CARDS (render + 3D tilt + spotlight + world switch) ============ */
function initServiceCards(){

  /* ---- render service cards ---- */
  const servicesGrid = document.getElementById('servicesGrid');
  SERVICES.forEach((s,i)=>{
    const card = document.createElement('div');
    card.className = 'svc-card';
    card.dataset.world = s.world;
    card.innerHTML = `
      <div class="svc-card-inner">
        <div class="svc-spot"></div>
        <div class="svc-eyebrow">${String(i+1).padStart(2,'0')} &middot; Service</div>
        <div class="svc-icon-wrap"><span class="icon" data-icon="${s.icon}"></span></div>
        <h3 class="svc-title">${s.title}</h3>
        <p class="svc-desc">${s.desc}</p>
        <div class="svc-divider"></div>
        <div class="svc-foot">
          <span class="svc-count">${s.count}</span>
          <span class="svc-arrow"><span class="icon" data-icon="arrow-up-right"></span></span>
        </div>
      </div>`;
    card.addEventListener('click', ()=> openServiceModal(s.id));
    card.addEventListener('mouseenter', ()=> setActiveWorld(s.world));
    card.addEventListener('mousemove', e=> tiltCard(card, e));
    card.addEventListener('mouseleave', ()=> resetTilt(card));
    servicesGrid.appendChild(card);
  });
  renderIcons();

  /* ---- 3D tilt + mouse-follow spotlight ---- */
  function tiltCard(card, e){
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const px = (x / r.width) * 100, py = (y / r.height) * 100;
    const inner = card.querySelector('.svc-card-inner');
    const rx = ((y / r.height) - 0.5) * -8;
    const ry = ((x / r.width) - 0.5) * 8;
    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.querySelector('.svc-spot').style.setProperty('--mx', px+'%');
    card.querySelector('.svc-spot').style.setProperty('--my', py+'%');
  }
  function resetTilt(card){
    const inner = card.querySelector('.svc-card-inner');
    inner.style.transform = 'rotateX(0) rotateY(0)';
  }

  /* ---- background "world" switching on hover ---- */
  function setActiveWorld(world){
    document.querySelectorAll('.world-layer').forEach(l=> l.classList.toggle('active', l.dataset.world===world));
  }
  document.getElementById('work').addEventListener('mouseleave', ()=>{
    document.querySelectorAll('.world-layer').forEach(l=> l.classList.remove('active'));
  });

}

/* ============ PROCESS TIMELINE (render) ============ */
function initProcessSteps(){
  /* ============ PROCESS TIMELINE ============ */
  const pSteps = document.getElementById('pSteps');
  PROCESS.forEach((step,i)=>{
    const el = document.createElement('div');
    el.className = 'p-step';
    el.innerHTML = `
      <div class="p-step-inner">
        <div class="p-icon-wrap"><span class="icon" data-icon="${step.icon}"></span><span class="p-num">0${i+1}</span></div>
        <div class="p-name">${step.name}</div>
        <div class="p-desc">${step.desc}</div>
      </div>
      <div class="p-connector"></div>`;
    pSteps.appendChild(el);
  });
  renderIcons();
}

/* ============ HERO + BACKDROP PARTICLES ============ */
function initHeroParticles(){
  /* ============ HERO TECH PARTICLES (lightweight, CSS-driven) ============ */
  const heroParticlesEl = document.getElementById('heroParticles');
  if(heroParticlesEl){
    const COUNT = 16;
    for(let i=0;i<COUNT;i++){
      const p = document.createElement('span');
      p.className = 'hero-particle';
      const size = 2 + Math.random()*3;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.left = (Math.random()*100)+'%';
      p.style.top = (30 + Math.random()*60)+'%';
      p.style.animationDuration = (6 + Math.random()*8)+'s';
      p.style.animationDelay = (Math.random()*8)+'s';
      heroParticlesEl.appendChild(p);
    }
  }
}

function initBackdropParticles(){
  /* ============ SAME BACKDROP ANIMATION ON OTHER GREEN SECTIONS ============ */
  ['eduexpParticles','testiParticles'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    const COUNT = 14;
    for(let i=0;i<COUNT;i++){
      const p = document.createElement('span');
      p.className = 'hero-particle';
      const size = 2 + Math.random()*3;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.left = (Math.random()*100)+'%';
      p.style.top = (20 + Math.random()*65)+'%';
      p.style.animationDuration = (6 + Math.random()*8)+'s';
      p.style.animationDelay = (Math.random()*8)+'s';
      el.appendChild(p);
    }
  });
  if(window.gsap){
    gsap.utils.toArray('.eduexp .sec-glow, .testimonials .sec-glow').forEach(el=>{
      gsap.to(el, { x:18, y:-14, duration:9, ease:'sine.inOut', yoyo:true, repeat:-1 });
    });
  }
}

/* ============ HERO PROJECT ORBIT (floating clickable thumbnails) ============ */
function initHeroOrbit(){
  const orbitEl = document.getElementById('heroOrbit');
  if(!orbitEl || typeof PROJECTS === 'undefined') return;

  /* Real Graphic Design portfolio thumbnails — pulled directly from your
     Graphic Designing work section (GRAPHIC_GALLERY holds your actual
     project images already used there). Falls back to GRAPHIC_THUMBS_OVERRIDE
     if you want to hand-pick different images. */
  const GRAPHIC_THUMBS_OVERRIDE = [
    // e.g. 'images/graphic-design/smitam-01.jpg', 'images/graphic-design/creative-canvas-01.jpg'
  ];
  const graphicProjects = PROJECTS.filter(p => p.category === 'Graphic Design');
  if(!graphicProjects.length) return;
  const graphicThumbs = GRAPHIC_THUMBS_OVERRIDE.length
    ? GRAPHIC_THUMBS_OVERRIDE
    : (typeof GRAPHIC_GALLERY !== 'undefined' && GRAPHIC_GALLERY.length ? GRAPHIC_GALLERY : null);

  /* Positions mapped directly from the red marks on the reference screenshot
     (percentages of the full hero box, so they line up wherever they were drawn) */
  const NODES = [
    { top:34.2, left:33.2, size:'clamp(56px,6.4vw,92px)' },
    { top:72.6, left:73.5, size:'clamp(50px,5.6vw,80px)' },
    { top:55.8, left:41.5, size:'clamp(50px,5.6vw,80px)' },
    { top:55.9, left:66.5, size:'clamp(48px,5.4vw,78px)' },
    { top:30.9, left:62.6, size:'clamp(48px,5.4vw,78px)' },
    { top:71.5, left:24.1, size:'clamp(46px,5.2vw,76px)' },
    { top:20.4, left:39.8, size:'clamp(46px,5.2vw,76px)' },
    { top:86.6, left:11.6, size:'clamp(44px,5vw,74px)'   },
    { top:13.2, left:49.9, size:'clamp(44px,5vw,74px)'   },
    { top:77.1, left:86.9, size:'clamp(44px,5vw,74px)'   },
    { top:57.9, left:14.6, size:'clamp(42px,4.8vw,72px)' },
    { top:65.8, left:96.1, size:'clamp(40px,4.6vw,68px)' },
    { top:39.2, left:71.2, size:'clamp(38px,4.4vw,64px)' },
    { top:72.0, left:8.6,  size:'clamp(36px,4.2vw,60px)' },
    { top:36.4, left:40.8, size:'clamp(34px,4vw,56px)'   }
  ];
  const ROTATIONS = [-4, 3, -5, 4, -3, 5];

  const nodes = NODES.map((cfg, i) => {
    const proj = graphicProjects[i % graphicProjects.length];
    const thumb = graphicThumbs
      ? graphicThumbs[i % graphicThumbs.length]
      : proj.img;
    const el = document.createElement('div');
    el.className = 'hero-orbit-node';
    el.style.top = cfg.top + '%';
    el.style.left = cfg.left + '%';
    el.style.width = cfg.size;
    el.style.height = cfg.size;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'View project: ' + proj.title);
    el.innerHTML = '<img src="' + thumb + '" alt="' + proj.title + '" loading="lazy">' +
      '<span class="hero-orbit-tip">' + proj.title + '</span>';
    orbitEl.appendChild(el);

    const openThis = () => window.openOrbitProject(proj);
    el.addEventListener('click', openThis);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThis(); }
    });

    return { el, rot: ROTATIONS[i % ROTATIONS.length] };
  });

  function startFloat(){
    nodes.forEach(n => {
      gsap.to(n.el, {
        x: () => gsap.utils.random(-8, 8),
        y: () => gsap.utils.random(-10, 10),
        rotate: n.rot + gsap.utils.random(-3, 3),
        duration: gsap.utils.random(4, 7),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 1.5)
      });
    });
  }

  function playIntro(){
    if (typeof gsap === 'undefined') {
      nodes.forEach(n => { n.el.style.opacity = '.3'; });
      return;
    }
    nodes.forEach(n => {
      gsap.set(n.el, { xPercent: -50, yPercent: -50, y: 100, opacity: 0, scale: .75, rotate: 0, filter: 'blur(8px)' });
    });
    const tl = gsap.timeline({ delay: .6, onComplete: startFloat });
    nodes.forEach((n, i) => {
      tl.to(n.el, {
        y: 0, opacity: .85, scale: 1, filter: 'blur(0.5px)', rotate: n.rot,
        duration: .9, ease: 'power3.out'
      }, i * 0.25);
    });
  }

  nodes.forEach(n => {
    n.el.addEventListener('mouseenter', () => gsap.to(n.el, { opacity: 1, scale: 1.14, filter: 'blur(0px)', duration: .35, ease: 'power2.out', overwrite: 'auto' }));
    n.el.addEventListener('mouseleave', () => gsap.to(n.el, { opacity: .85, scale: 1, filter: 'blur(0.5px)', duration: .4, ease: 'power2.out', overwrite: 'auto' }));
    n.el.addEventListener('focus', () => gsap.to(n.el, { opacity: 1, scale: 1.14, filter: 'blur(0px)', duration: .35, overwrite: 'auto' }));
    n.el.addEventListener('blur', () => gsap.to(n.el, { opacity: .85, scale: 1, filter: 'blur(0.5px)', duration: .4, overwrite: 'auto' }));
  });

  playIntro();
}
