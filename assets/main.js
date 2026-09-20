/* ============================================================
   BITTU RAI — PORTFOLIO BEHAVIOUR
   ============================================================ */
(function(){
  "use strict";

  const D = SITE_DATA;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover:none)').matches || window.innerWidth < 861;
  let lenisInstance = null;

  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- RENDER: content from data.js ---------------- */

  function renderBio(){
    document.getElementById('bio-position').textContent = D.bio.positioning;
    const words = D.bio.body.split(' ');
    document.getElementById('bio-words').innerHTML = words.map(w=>`<span class="w">${w}</span>`).join(' ');
  }

  function renderServices(){
    const container = document.getElementById('services-list');

    const media = D.services.map((s,i)=> s.img
      ? `<div class="svc-media-item" data-i="${i}"><img src="${s.img}" alt="${s.title}" loading="lazy"></div>`
      : `<div class="svc-media-item svc-media-fallback" data-i="${i}"><span>${s.n}</span></div>`
    ).join('');

    const list = D.services.map((s,i)=>`
      <div class="svc-story-item" data-i="${i}">
        <div class="svc-story-row">
          <span class="svc-story-num">${s.n}</span>
          <h3 class="svc-story-title">${s.title}</h3>
        </div>
        <div class="svc-story-body"><p>${s.blurb||''}</p></div>
      </div>`).join('');

    container.innerHTML = `
      <div class="svc-pin-wrap" id="svc-pin-wrap">
        <div class="svc-stage">
          <div class="svc-story-media">${media}</div>
          <div class="svc-story-list">${list}</div>
        </div>
      </div>
      <div class="svc-mobile">
        ${D.services.map((s,i)=>`
          <div class="svc-m-item reveal">
            <div class="svc-m-media">${s.img ? `<img src="${s.img}" alt="${s.title}" loading="lazy">` : `<span>${s.n}</span>`}</div>
            <div class="svc-m-row"><span class="svc-story-num">${s.n}</span><h3 class="svc-story-title">${s.title}</h3></div>
            <p class="svc-m-blurb">${s.blurb||''}</p>
          </div>`).join('')}
      </div>`;
  }

  function renderWhoIHelp(){
    const list = document.getElementById('who-list');
    if (!list || !D.whoIHelp) return;
    list.innerHTML = D.whoIHelp.map((t,i)=>`
      <li class="who-item"><span class="who-n">${String(i+1).padStart(2,'0')}</span><span class="who-t">${t}</span></li>`).join('');
  }

  let activeMode = 'graphic';
  let activeCat = null;

  function renderCatNav(){
    const cats = activeMode === 'graphic' ? D.graphicCategories : D.uiuxCategories;
    if (!activeCat || !cats.includes(activeCat)) activeCat = cats[0];
    const nav = document.getElementById('cat-nav');
    nav.innerHTML = cats.map(c=>`<button class="cat-chip ${activeCat===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
    nav.querySelectorAll('.cat-chip').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        activeCat = btn.dataset.cat;
        renderCatNav();
        renderProjects();
      });
    });
    /* Re-rendering resets the scroll strip to its start, which would hide the
       chip the person just picked on phones — bring it back into view. */
    const activeChip = nav.querySelector('.cat-chip.active');
    if (activeChip) activeChip.scrollIntoView({ block:'nearest', inline:'center', behavior: reduced ? 'auto' : 'smooth' });
  }

  function truncate(text, max){
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function renderProjects(){
    const grid = document.getElementById('project-grid');
    let items = D.projects.filter(p=>p.category===activeMode);
    if (activeCat) items = items.filter(p=>p.subcategory===activeCat);

    if (!items.length){
      grid.innerHTML = `<div class="project-empty">
        <p>New ${activeMode === 'graphic' ? 'graphic' : 'UI/UX'} case studies are being prepared.</p>
        <small>Add entries to assets/data.js to populate this grid</small>
      </div>`;
      return;
    }

    grid.innerHTML = items.map((p,i)=>{
      const sizeClass = p.featured ? 'large' : (i % 5 === 2 ? 'small' : '');
      let media;
      if (p.images && p.images[0]) media = `<img src="${p.images[0]}" alt="${p.title}" loading="lazy">`;
      else if (p.video) media = `<div class="project-video-tile"><span>▶</span><small>${p.title}</small></div>`;
      else if (p.linkMode && p.link) media = `<div class="project-video-tile"><strong>${p.title}</strong><small>${p.tag || 'View case study ↗'}</small></div>`;
      else media = `<div class="project-video-tile"><small>${p.title}</small></div>`;

      const bio = truncate(p.description, 110);
      const caption = `
        <div class="project-caption">
          <div class="project-caption-title">${p.title||''}</div>
          ${bio ? `<div class="project-caption-bio">${bio}</div>` : ''}
          ${p.linkMode && p.link ? `<div class="project-caption-tag">View live ↗</div>` : ''}
          <div class="project-caption-cta" aria-hidden="true"><span>View Project</span><span class="arrow">↗</span></div>
        </div>`;
      return `<div class="project-card ${sizeClass}" data-index="${D.projects.indexOf(p)}" data-cursor="VIEW PROJECT" role="button" tabindex="0" aria-label="View project: ${(p.title||'').replace(/"/g,'&quot;')}">${media}${caption}</div>`;
    }).join('');

    grid.querySelectorAll('.project-card').forEach(card=>{
      const open = ()=> openProject(parseInt(card.dataset.index,10));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e=>{
        if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); }
      });
    });

    animateProjectCards();
  }

  /* ---------------- SELECTED WORK: scroll-revealed card grid ---------------- */
  let projectGridRevealed = false;
  function animateProjectCards(){
    const grid = document.getElementById('project-grid');
    const cards = grid.querySelectorAll('.project-card');
    if (!cards.length) return;
    if (!window.gsap || reduced){
      cards.forEach(c=> c.style.opacity = 1);
      return;
    }
    if (!projectGridRevealed && window.ScrollTrigger){
      projectGridRevealed = true;
      gsap.set(cards, { opacity:0, y:32, scale:.96 });
      ScrollTrigger.create({
        trigger:'#project-grid', start:'top 88%',
        onEnter:()=> gsap.to(grid.querySelectorAll('.project-card'), {
          opacity:1, y:0, scale:1, duration:.65, ease:'power3.out', stagger:.05
        }),
        once:true
      });
    } else {
      gsap.fromTo(cards,
        { opacity:0, y:24, scale:.97 },
        { opacity:1, y:0, scale:1, duration:.55, ease:'power3.out', stagger:.04 }
      );
    }
  }

  /* Project detail reads as a short case study:
     overview → challenge → approach → the design → outcome → facts.
     Sections without data are skipped, so nothing is invented or padded. */
  let lastFocus = null;

  function openProject(index){
    const p = D.projects[index];
    if (!p) return;
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    const images = p.images || [];
    const categoryLabel = p.category === 'uiux' ? 'UI/UX' : 'Graphic';
    const eyebrow = [categoryLabel, p.subcategory].filter(Boolean).join(' · ');

    let n = 0;
    const section = (label, inner, cls)=>{
      n++;
      return `<section class="cs-sec ${cls||''}">
        <h3 class="cs-label"><span class="cs-num">${String(n).padStart(2,'0')}</span>${label}</h3>
        <div class="cs-body">${inner}</div>
      </section>`;
    };
    const text = (t)=> `<p>${t}</p>`;

    let design = '';
    if (p.video){
      design = `<div class="cs-gallery is-single"><video src="${p.video}" controls playsinline></video></div>`;
    } else if (images.length){
      design = `<div class="cs-gallery ${images.length === 1 ? 'is-single' : ''}">${
        images.map((src,i)=>`<img src="${src}" alt="${(p.title||'Project')} — visual ${i+1}" loading="lazy" data-cursor="ZOOM">`).join('')
      }</div>`;
    }

    const facts = [
      ['Role', p.role], ['Tools', (p.tools||[]).join(' · ')], ['Client', p.client], ['Year', p.year]
    ].filter(r=>r[1]);

    content.innerHTML = `
      <article class="cs">
        <header class="cs-head">
          ${eyebrow ? `<p class="cs-eyebrow">${eyebrow}</p>` : ''}
          <h2 class="cs-title">${p.title||''}</h2>
        </header>
        ${p.description ? section('Project Overview', `<p class="cs-lead">${p.description}</p>`) : ''}
        ${p.challenge ? section('The Challenge', text(p.challenge)) : ''}
        ${p.approach ? section('The Approach', text(p.approach)) : ''}
        ${design ? section('The Design', design, 'cs-design') : ''}
        ${p.outcome ? section('The Outcome', text(p.outcome)) : ''}
        ${facts.length ? `<dl class="cs-facts">${facts.map(r=>`<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl>` : ''}
        ${p.link && !p.video ? `<p class="cs-linkrow"><a class="cs-link" href="${p.link}" target="_blank" rel="noopener">View live / full case study <span aria-hidden="true">↗</span></a></p>` : ''}
      </article>`;

    content.querySelectorAll('.cs-gallery img').forEach(img=>{
      img.addEventListener('click', ()=> openLightbox(img.src, p.title||''));
    });

    lastFocus = document.activeElement;
    content.scrollTop = 0;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (lenisInstance) lenisInstance.stop();
    /* the overlay is still visibility:hidden on this frame — focus once it's showing */
    setTimeout(()=>{ const c = document.getElementById('modal-close'); if (c && modal.classList.contains('open')) c.focus({ preventScroll:true }); }, 60);
  }

  function openLightbox(src, alt){
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
  }

  function closeLightbox(){
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
  }

  function closeProject(){
    const modal = document.getElementById('project-modal');
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll:true });
    lastFocus = null;
  }

  function renderBrands(){
    const el = document.getElementById('brands-content');
    if (!D.brands.length){
      el.innerHTML = `<div class="brands-empty"><p>Client logos will appear here — add them to assets/data.js.</p></div>`;
      return;
    }
    const isImg = typeof D.brands[0] === 'string' && /\.(png|jpe?g|svg|webp)$/i.test(D.brands[0]);
    const row = (arr)=> arr.map((b,i)=>{
      if (isImg) return `<span class="brand-logo" style="--i:${i}"><img src="${b}" alt="Client logo" loading="lazy"></span>`;
      return `<span class="brand-logo" style="--i:${i}">${b.name||b}</span>`;
    }).join('');
    el.innerHTML = `
      <div class="marquee-viewport">
        <div class="marquee-row" id="mq1">${row(D.brands)}${row(D.brands)}</div>
        <div class="marquee-row" id="mq2">${row(D.brands.slice().reverse())}${row(D.brands.slice().reverse())}</div>
      </div>`;
  }

  function renderProcess(){
    const track = document.getElementById('process-track');
    D.process.forEach(step=>{
      const div = document.createElement('div');
      div.className = 'process-step';
      div.innerHTML = `<div class="process-num">${step.n}</div><div class="process-title">${step.title}</div><div class="process-text">${step.text}</div>`;
      track.appendChild(div);
    });
  }

  function renderEducation(){
    const el = document.getElementById('education-timeline');
    el.innerHTML = `
      <svg class="journey-svg" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
        <line class="journey-track" x1="1" y1="0" x2="1" y2="100"/>
        <line class="journey-fill" x1="1" y1="0" x2="1" y2="100"/>
      </svg>
      ${D.education.map((e,i)=>`
        <div class="journey-node" style="--i:${i}">
          <span class="journey-dot"></span>
          <div class="journey-card">
            <span class="journey-period">${e.period}</span>
            <h3 class="journey-school">${e.school}</h3>
            <p class="journey-program">${e.program}</p>
          </div>
        </div>`).join('')}`;
  }

  function renderExperience(){
    const el = document.getElementById('experience-timeline');
    el.innerHTML = `
      <div class="exp-list" id="exp-list">
        <span class="exp-list-line"><span id="exp-list-fill"></span></span>
        ${D.experience.map((e,i)=>`
          <div class="exp-row" style="--i:${i}">
            <div class="exp-card">
              <span class="exp-year-badge">${e.year}</span>
              <h3 class="exp-org">${e.org}</h3>
              <span class="exp-role">${e.role}${e.note ? ' · '+e.note : ''}</span>
              <ul class="exp-bullets">${e.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
            </div>
          </div>`).join('')}
      </div>`;
  }

  function renderCerts(){
    document.getElementById('certs-row').innerHTML = D.certifications.map((c,i)=>`
      <div class="cert-flip" style="--i:${i}" tabindex="0" data-cursor="VIEW">
        <div class="cert-flip-inner">
          <div class="cert-face cert-front">
            <span class="cert-icon">✦</span>
            <b>${c.title}</b>
          </div>
          <div class="cert-face cert-back">
            <span class="cert-check">✓ Verified</span>
            <span>${c.org || 'Self-paced'}</span>
          </div>
        </div>
      </div>`).join('');
  }

  function renderStack(){
    const el = document.getElementById('stack-content');
    const tools = D.tools || [];
    if (!tools.length){
      el.innerHTML = `<div class="brands-empty"><p>Tool logos will appear here — add them to assets/data.js.</p></div>`;
      return;
    }
    const row = (arr)=> arr.map((t,i)=>`
      <span class="tool-logo" style="--i:${i}" title="${t.name}">
        <img src="${t.icon}" alt="${t.name}" loading="lazy">
        <em>${t.name}</em>
      </span>`).join('');
    el.innerHTML = `
      <div class="marquee-viewport">
        <div class="marquee-row" id="toolsmq">${row(tools)}${row(tools)}</div>
      </div>`;
  }

  function renderTestimonials(){
    const el = document.getElementById('testimonials-content');
    if (!D.testimonials.length){
      el.innerHTML = `<div class="testi-empty"><p>Client testimonials will be added here as projects wrap up.</p></div>`;
      return;
    }
    const initials = (name)=> (name||'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
    const cardHTML = D.testimonials.map((t,i)=>`
      <div class="t-card" style="--i:${i % 4}">
        <span class="t-quote-mark" aria-hidden="true">&ldquo;</span>
        <div class="t-stars" aria-hidden="true">★★★★★</div>
        <p class="t-quote">${t.quote}</p>
        <div class="t-foot">
          <div class="t-avatar">${initials(t.name)}</div>
          <div class="t-who">
            <div class="t-name">${t.name}</div>
            <div class="t-role">${t.role || ''}</div>
          </div>
        </div>
      </div>`).join('');
    /* Track is duplicated once so the auto-scroll marquee can loop seamlessly. */
    el.innerHTML = `
      <div class="t-marquee" id="tMarquee">
        <div class="t-track" id="tTrack">${cardHTML}${cardHTML}</div>
      </div>`;
  }

  function renderContact(){
    document.getElementById('btn-start').href = `mailto:${D.person.email}?subject=${encodeURIComponent('Project enquiry')}`;
    document.getElementById('btn-work').href = D.person.whatsapp;
    document.getElementById('contact-direct').innerHTML =
      `<a href="${D.person.phoneHref}">${D.person.phone}</a> &nbsp;·&nbsp; <a href="mailto:${D.person.email}">${D.person.email}</a> &nbsp;·&nbsp; <a href="https://${D.person.portfolio}" target="_blank" rel="noopener">${D.person.portfolio}</a>`;
  }

  function renderAvailability(){
    const el = document.getElementById('availmq');
    if (!el) return;
    const row = (arr)=> arr.map(loc=>`<span>${loc}</span><span class="avail-dot-sep" aria-hidden="true">•</span>`).join('');
    el.innerHTML = row(D.availability) + row(D.availability);
  }

  function renderStats(){
    const el = document.getElementById('stats-content');
    if (!el) return;
    el.innerHTML = D.stats.map((s,i)=>`
      <div class="stat-item reveal" data-i="${i}">
        <div class="stat-num"><span class="stat-count" data-target="${s.value}">0</span>${s.suffix||''}</div>
        <div class="stat-label">${s.label}</div>
        ${s.sub ? `<div class="stat-sub">${s.sub}</div>` : ''}
      </div>`).join('');
  }

  const SOCIAL_ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9z"/></svg>',
    behance: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.7 8.7c1.36 0 2.32.28 2.98.86.65.58.98 1.36.98 2.36 0 .6-.15 1.13-.44 1.6-.27.42-.62.75-1.06.99.6.22 1.07.58 1.4 1.08.34.5.5 1.14.5 1.9 0 .68-.13 1.27-.4 1.78a3.3 3.3 0 0 1-1.1 1.22c-.46.3-1 .53-1.6.66-.6.14-1.24.2-1.9.2H1.2V8.7h6.5zm-.44 4.86c.53 0 .96-.12 1.3-.37.32-.25.48-.63.48-1.14 0-.28-.05-.52-.16-.7a1.13 1.13 0 0 0-.42-.44 1.85 1.85 0 0 0-.62-.22 4.3 4.3 0 0 0-.75-.06H3.8v2.93h3.46zm.2 5.1c.3 0 .58-.03.85-.09.27-.06.5-.16.7-.3.2-.14.36-.33.48-.56.12-.24.18-.54.18-.9 0-.7-.2-1.2-.6-1.5-.4-.3-.93-.45-1.6-.45H3.8v3.8h3.66zM13.4 10.2h5.9v1.3h-5.9v-1.3zm6.44 8.34c-.4.4-.87.7-1.42.92-.55.22-1.17.33-1.87.33-.75 0-1.42-.12-2-.35a4.07 4.07 0 0 1-1.5-1c-.4-.44-.7-.96-.92-1.57a5.9 5.9 0 0 1-.32-2c0-.72.1-1.38.32-1.98a4.6 4.6 0 0 1 .93-1.56c.4-.43.9-.77 1.47-1a4.9 4.9 0 0 1 1.9-.36c.77 0 1.44.14 2 .43.56.28 1.02.67 1.37 1.15.35.48.6 1.03.75 1.66.14.62.2 1.28.16 1.98h-6.5c.03.86.27 1.5.72 1.94.44.42 1.05.63 1.82.63.55 0 1.02-.13 1.4-.4.4-.27.64-.55.73-.86h2.06c-.32 1-.83 1.7-1.5 2.14zm-1.52-6.52c-.36-.4-.9-.6-1.63-.6-.47 0-.87.08-1.2.25-.32.16-.58.36-.78.6-.2.24-.34.5-.42.77-.08.27-.13.5-.14.72h4.87c-.07-.78-.34-1.34-.7-1.74z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.34 1.11 2.91.85.09-.65.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"/></svg>',
  };
  const SOCIAL_LABELS = { linkedin:'LinkedIn', behance:'Behance', github:'GitHub' };
  const SOCIAL_ORDER = ['linkedin','behance','github'];

  function renderNavSocial(){
    const url = D.person.socials && D.person.socials.linkedin;
    if (!url) return;
    const navLink = document.getElementById('nav-linkedin');
    if (navLink){
      navLink.href = url;
      navLink.innerHTML = SOCIAL_ICONS.linkedin;
      navLink.hidden = false;
    }
    const mobileLink = document.getElementById('mobile-linkedin');
    if (mobileLink){
      mobileLink.href = url;
      mobileLink.hidden = false;
    }
  }

  function renderFooter(){
    const socialsEl = document.getElementById('footer-socials');
    const copyEl = document.getElementById('footer-copy');
    if (!socialsEl || !copyEl) return;
    const s = D.person.socials || {};
    socialsEl.innerHTML = SOCIAL_ORDER
      .filter(k => s[k])
      .map(k => `<a href="${s[k]}" target="_blank" rel="noopener" class="footer-social" aria-label="${SOCIAL_LABELS[k]}" data-cursor="${SOCIAL_LABELS[k].toUpperCase()}">${SOCIAL_ICONS[k]}<span>${SOCIAL_LABELS[k]}</span></a>`)
      .join('');
    copyEl.innerHTML = `© ${D.person.year} ${D.person.name}. All rights reserved. &nbsp;·&nbsp; <a href="mailto:${D.person.email}">${D.person.email}</a>`;
  }

  function renderAll(){
    renderBio(); renderServices(); renderWhoIHelp();
    renderCatNav(); renderProjects(); renderBrands();
    renderAvailability();
    renderStats();
    renderProcess();
    renderEducation();
    renderExperience();
    renderCerts(); renderStack(); renderTestimonials();
    renderContact();
    renderFooter();
    renderNavSocial();
  }

  /* ---------------- LOADER / SPLASH ----------------
     The three disciplines cycle in large type as the count runs to 100, then the
     panel lifts away. A visitor can skip it any time by clicking/tapping it or
     pressing a key — it's a first impression, not something to wait through. */
  const LOADER_WORDS = ['Graphic Design', 'UI / UX', 'Web'];

  function runLoader(done){
    const pctEl = document.getElementById('loader-pct');
    const barEl = document.getElementById('loader-bar-fill');
    const loader = document.getElementById('loader');
    const wordEl = document.getElementById('ld-word');
    let finished = false;
    let wordIdx = 0;
    const duration = reduced ? 200 : 1800;
    const start = performance.now();

    function setWord(i){
      if (i === wordIdx) return;
      wordIdx = i;
      if (!window.gsap || reduced){ wordEl.textContent = LOADER_WORDS[i]; return; }
      gsap.to(wordEl, { yPercent:-110, duration:.28, ease:'power2.in', overwrite:true, onComplete:()=>{
        wordEl.textContent = LOADER_WORDS[i];
        gsap.fromTo(wordEl, { yPercent:110 }, { yPercent:0, duration:.42, ease:'power3.out' });
      }});
    }

    function tick(now){
      if (finished) return;
      const t = Math.min(1, (now-start)/duration);
      const pct = Math.floor(t*100);
      pctEl.textContent = String(pct).padStart(2,'0');
      barEl.style.width = pct+'%';
      setWord(Math.min(LOADER_WORDS.length-1, Math.floor(t*LOADER_WORDS.length)));
      if (t < 1) requestAnimationFrame(tick);
      else finish();
    }

    function finish(instant){
      if (finished) return;
      finished = true;
      pctEl.textContent = '100'; barEl.style.width = '100%';
      const exit = ()=>{ loader.remove(); document.body.classList.remove('loading'); done(); };
      if (window.gsap && !reduced && !instant){
        gsap.timeline({ onComplete:exit })
          .to('.ld-center, .ld-top, .ld-bottom', { opacity:0, y:-24, duration:.35, ease:'power2.in' })
          .to(loader, { yPercent:-100, duration:.85, ease:'power4.inOut' }, '-=.05');
      } else {
        exit();
      }
    }

    const skip = () => finish(true);
    loader.addEventListener('click', skip, { once:true });
    window.addEventListener('keydown', skip, { once:true });
    requestAnimationFrame(tick);
  }

  /* ---------------- CUSTOM CURSOR ---------------- */
  function initCursor(){
    if (isTouch) return;
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursor-text');
    let mx=0,my=0,cx=0,cy=0;
    window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
    function loop(){
      cx += (mx-cx)*0.18; cy += (my-cy)*0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const targets = [
      { sel:'.project-card', text:'VIEW PROJECT' },
      { sel:'.cert-flip', text:'FLIP' },
      { sel:'img', text:'EXPLORE' },
      { sel:'.btn, button, .cat-chip, .toggle button', text:'MOVE' },
      { sel:'.big-btn', text:"LET'S TALK" },
      { sel:'a[target="_blank"]', text:'OPEN' },
    ];
    targets.forEach(({sel,text})=>{
      document.body.addEventListener('mouseover', e=>{
        if (e.target.closest(sel)){
          cursor.classList.add('big'); label.textContent = e.target.closest('[data-cursor]')?.dataset.cursor || text;
          cursor.classList.toggle('wide', label.textContent.length > 8);
        }
      });
    });
    document.body.addEventListener('mouseout', e=>{
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('[data-cursor], .project-card, .cert-flip, img, .btn, button, .big-btn')){
        cursor.classList.remove('big','wide'); label.textContent='';
      }
    });

    // magnetic buttons
    document.querySelectorAll('.btn:not(.magnetic), .big-btn').forEach(btn=>{
      btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width/2) * 0.25;
        const dy = (e.clientY - r.top - r.height/2) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
    });
  }

  /* ---------------- SCROLL SETUP (Lenis + GSAP) ---------------- */
  function initSmoothScroll(){
    if (reduced || !window.Lenis) return null;
    const lenis = new Lenis({ duration:1.1, smoothWheel:true });
    lenisInstance = lenis;
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger){
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time)=>{ lenis.raf(time*1000); });
      gsap.ticker.lagSmoothing(0);
    }
    return lenis;
  }

  /* ---------------- SCROLL PROGRESS ---------------- */
  function initProgress(){
    const bar = document.getElementById('scroll-progress');
    function update(){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      const vertical = window.innerWidth > 860;
      bar.style.transform = vertical ? `scaleY(${p})` : `scaleX(${p})`;
    }
    window.addEventListener('scroll', update, { passive:true });
    update();
  }

  /* ---------------- HERO: entrance sequence + scroll recede ----------------
     Order: kicker → headline (line by line) → supporting copy → CTAs →
     availability + resume → badge. Until this runs, CSS keeps every .hero-anim
     element hidden while body.loading is set, so nothing flashes behind the
     loader. Reduced-motion / no-GSAP: the hidden state is simply never applied
     after the loader, so everything is visible immediately. */
  function initHero(){
    const $ = (sel)=> document.querySelector(sel);
    const kicker = $('.hero-kicker');
    const lines = document.querySelectorAll('.hl-inner');
    const sub = $('.hero-sub');
    const cta = document.getElementById('hero-cta');
    const meta = $('.hero-meta');
    const badge = document.getElementById('heroBadge');
    const main = $('.hero-main');
    const shapes = document.querySelectorAll('.hero-shape');
    const fadeEls = [kicker, sub, cta, meta].filter(Boolean);
    const sides = document.querySelectorAll('.hero-side');
    const flank = $('.hero-flank');

    if (!window.gsap || reduced) return;

    gsap.set(lines, { yPercent:112 });
    gsap.set(fadeEls, { opacity:0, y:18 });
    gsap.set(badge, { opacity:0 });
    gsap.set(sides, { opacity:0, x:(i)=> i ? 18 : -18 });
    gsap.set(shapes, { opacity:0 });

    /* Badge + shapes get their scroll fade only once the entrance has finished,
       so the scrub tweens start from the settled values instead of mid-entrance. */
    const fadeOnScroll = ()=>{
      if (!window.ScrollTrigger) return;
      gsap.to(badge, {
        autoAlpha:0, ease:'none',
        scrollTrigger:{ trigger:'#hero', start:'top top', end:'45% top', scrub:0.6 }
      });
      gsap.to(shapes, {
        opacity:0, ease:'none',
        scrollTrigger:{ trigger:'#hero', start:'top top', end:'60% top', scrub:0.6 }
      });
    };

    gsap.timeline({ delay:.1, defaults:{ ease:'power3.out' }, onComplete:fadeOnScroll })
      .to(kicker, { opacity:1, y:0, duration:.7 }, 0)
      .to(lines,  { yPercent:0, duration:1.05, ease:'power4.out', stagger:.13 }, .2)
      .to(sub,    { opacity:1, y:0, duration:.8 }, .9)
      .to(cta,    { opacity:1, y:0, duration:.8 }, 1.05)
      .to(meta,   { opacity:1, y:0, duration:.8 }, 1.25)
      .to(shapes, { opacity:.35, duration:1.6, ease:'power2.out', stagger:.1 }, .6)
      .to(sides,  { opacity:1, x:0, duration:.9, stagger:.12 }, 1.3)
      .to(badge,  { opacity:1, duration:.9, ease:'power2.out' }, 1.4);

    if (!window.ScrollTrigger) return;

    /* Scroll recede: the copy eases up and fades as the hero scrolls away; the
       video keeps its own slow drift. Kept small — the type is the hero. */
    gsap.to([main, flank].filter(Boolean), {
      y:-48, opacity:0, ease:'none',
      scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:0.6 }
    });
    gsap.to('#hero-video', {
      scale:1.1, yPercent:5, ease:'none',
      scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:0.6 }
    });

    /* Failsafe: the primary CTA must never stay invisible if the timeline
       doesn't fire on some device/browser. */
    setTimeout(()=>{
      if (parseFloat(getComputedStyle(cta).opacity) < 1){
        gsap.set([...fadeEls, badge, ...lines, ...sides], { clearProps:'opacity,transform,visibility' });
      }
    }, 4000);
  }

  /* ---------------- HERO: mouse parallax + magnetic buttons ----------------
     Desktop, motion-safe only. The headline and the floating shapes
     drift a few px opposite the cursor via [data-depth]; the CTA buttons pull
     toward it slightly. A soft glow layer also tracks the cursor position. */
  function initHeroInteractions(){
    const hero = document.getElementById('hero');
    if (!hero || reduced || isTouch || !window.gsap) return;

    const glow = document.getElementById('heroGlow');
    const depthEls = Array.from(hero.querySelectorAll('[data-depth]')).map(el=>({
      el, depth:parseFloat(el.dataset.depth) || 0.02,
      setX: gsap.quickTo(el, 'x', { duration:.7, ease:'power3.out' }),
      setY: gsap.quickTo(el, 'y', { duration:.7, ease:'power3.out' })
    }));

    let hasMoved = false;
    hero.addEventListener('mousemove', (e)=>{
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;

      if (!hasMoved){ glow.classList.add('is-active'); hasMoved = true; }
      glow.style.setProperty('--mx', ((px+.5)*100).toFixed(1)+'%');
      glow.style.setProperty('--my', ((py+.5)*100).toFixed(1)+'%');

      depthEls.forEach(d=>{
        d.setX(px * d.depth * r.width);
        d.setY(py * d.depth * r.width);
      });
    });
    hero.addEventListener('mouseleave', ()=> glow.classList.remove('is-active'));

    /* Magnetic pull on the hero CTA buttons */
    hero.querySelectorAll('.magnetic').forEach(btn=>{
      const setX = gsap.quickTo(btn, 'x', { duration:.35, ease:'power3.out' });
      const setY = gsap.quickTo(btn, 'y', { duration:.35, ease:'power3.out' });
      btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        setX((e.clientX - r.left - r.width/2) * .35);
        setY((e.clientY - r.top - r.height/2) * .45);
      });
      btn.addEventListener('mouseleave', ()=>{ setX(0); setY(0); });
    });
  }

  /* ---------------- SHARED: reveal-on-scroll via native IntersectionObserver ----------------
     Uses the browser's built-in viewport-intersection API instead of GSAP ScrollTrigger for
     anything that must never stay permanently invisible. This has zero dependency on any
     CDN-loaded library, so content always appears even if GSAP is slow, blocked, or fails
     to load on the user's network. */
  function observeReveal(elements, opts){
    const els = (elements instanceof NodeList || Array.isArray(elements)) ? elements : document.querySelectorAll(elements);
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)){
      els.forEach(el=> el.classList.add('in'));
      return;
    }
    const stagger = (opts && opts.stagger) || 0;
    let i = 0;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          if (stagger) entry.target.style.transitionDelay = (i++ * stagger)+'s';
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
    els.forEach(el=> io.observe(el));
  }

  /* ---------------- GENERIC REVEALS ---------------- */
  function initReveals(){
    observeReveal('.reveal, .about-line span, .stat');
  }

  /* ---------------- BIO WORD REVEAL ---------------- */
  function initBioWords(){
    const words = document.querySelectorAll('#bio-words .w');
    if (!words.length) return;
    if (!window.ScrollTrigger || reduced){ words.forEach(w=>w.style.opacity=1); return; }
    ScrollTrigger.create({
      trigger: '#bio-words', start:'top 80%', end:'bottom 40%', scrub:0.5,
      onUpdate: self=>{
        const active = Math.floor(self.progress * words.length);
        words.forEach((w,i)=> w.style.opacity = i <= active ? 1 : 0.18);
      }
    });
  }

  /* ---------------- STATS COUNTER ---------------- */
  function initStats(){
    const wrap = document.getElementById('stats-content');
    const counts = document.querySelectorAll('.stat-count');
    if (!wrap || !counts.length) return;

    let played = false;
    function play(){
      if (played) return;
      played = true;
      counts.forEach(el=>{
        const target = parseInt(el.dataset.target, 10) || 0;
        if (reduced){ el.textContent = target; return; }
        const dur = 2200;
        const start = performance.now();
        function tick(now){
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.floor(eased * target);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      });
    }

    if (window.ScrollTrigger){
      ScrollTrigger.create({ trigger: wrap, start: 'top 80%', onEnter: play });
    } else {
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if (e.isIntersecting) play(); });
      }, { threshold: .3 });
      io.observe(wrap);
    }
  }

  /* ---------------- IN-PAGE LINKS: glide with Lenis instead of jumping ---------------- */
  function initAnchors(){
    if (!lenisInstance) return;
    document.addEventListener('click', e=>{
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenisInstance.scrollTo(target, { duration:1.2 });
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  function initBackToTop(){
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    const show = () => btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
    show();
    window.addEventListener('scroll', show, { passive: true });
    btn.addEventListener('click', () => {
      if (lenisInstance) lenisInstance.scrollTo(0, { duration: 1.1 });
      else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------------- PROCESS TIMELINE ---------------- */
  function initProcess(){
    const steps = document.querySelectorAll('.process-step');
    const fill = document.getElementById('process-line-fill');
    if (!window.ScrollTrigger || reduced){ steps.forEach(s=>s.classList.add('active')); return; }
    ScrollTrigger.create({
      trigger:'#process-track', start:'top 70%', end:'bottom 60%', scrub:0.5,
      onUpdate:self=>{
        const p = self.progress;
        const isVertical = window.innerWidth <= 860;
        if (isVertical) fill.style.height = (p*100)+'%'; else fill.style.width = (p*100)+'%';
        const activeIdx = Math.floor(p*steps.length);
        steps.forEach((s,i)=> s.classList.toggle('active', i <= activeIdx));
      }
    });
  }

  /* ---------------- SERVICES: sticky scroll storytelling ---------------- */
  function initServicesStory(){
    const pinWrap = document.getElementById('svc-pin-wrap');
    if (!pinWrap) return;
    const mediaItems = document.querySelectorAll('.svc-media-item');
    const listItems = document.querySelectorAll('.svc-story-item');
    const total = listItems.length;
    if (!total) return;

    const desktop = window.innerWidth > 860;

    if (!desktop || !window.gsap || !window.ScrollTrigger || reduced){
      // Mobile: cards are visible immediately (no scroll-triggered reveal)
      // so the section can never render blank regardless of JS/network timing.
      return;
    }

    // Desktop: pinned crossfade story driven directly by scroll (no
    // independent duration-tweens — everything is computed straight from
    // scroll progress every tick, so it never feels stepped or laggy).
    mediaItems.forEach((el,i)=> el.style.opacity = i===0 ? '1' : '0');
    listItems[0].classList.add('active');

    let currentActive = 0;
    const listEl = document.querySelector('.svc-story-list');

    const stepVh = window.innerHeight * 0.7;
    ScrollTrigger.create({
      trigger: pinWrap,
      start: 'top top',
      end: () => '+=' + (stepVh * (total - 1)),
      pin: '.svc-stage',
      scrub: true,
      onUpdate: self=>{
        const raw = self.progress * (total - 1);   // continuous 0..total-1
        const idx = Math.min(total - 2, Math.floor(raw));
        const frac = Math.min(1, Math.max(0, raw - idx));

        mediaItems.forEach((el,i)=>{
          let o = 0, s = 0.97;
          if (i === idx){ o = 1 - frac; s = 1 - frac*0.03; }
          else if (i === idx + 1){ o = frac; s = 0.97 + frac*0.03; }
          el.style.opacity = o;
          el.style.transform = `scale(${s})`;
        });

        const activeIdx = frac < 0.5 ? idx : Math.min(total - 1, idx + 1);
        if (activeIdx !== currentActive){
          listItems[currentActive].classList.remove('active');
          listItems[activeIdx].classList.add('active');
          currentActive = activeIdx;
        }
        if (listEl){
          const max = listEl.scrollHeight - listEl.clientHeight;
          if (max > 0) listEl.scrollTop = (self.progress) * max;
        }
      }
    });
  }

  /* ---------------- EDUCATION: drawn journey line ---------------- */
  function initJourney(){
    const nodes = document.querySelectorAll('.journey-node');
    const fill = document.querySelector('.journey-fill');
    if (!nodes.length) return;
    observeReveal(nodes);
    if (!fill) return;
    if (!window.gsap || !window.ScrollTrigger || reduced){ fill.style.strokeDashoffset = 0; return; }
    const len = fill.getTotalLength();
    fill.style.strokeDasharray = len;
    fill.style.strokeDashoffset = len;
    ScrollTrigger.create({
      trigger:'.journey', start:'top 75%', end:'bottom 85%', scrub:.6,
      onUpdate: self=> fill.style.strokeDashoffset = len * (1 - self.progress)
    });
  }

  /* ---------------- EXPERIENCE: scroll-revealed, reversible timeline rows ---------------- */
  function initExperience(){
    const list = document.getElementById('exp-list');
    const rows = document.querySelectorAll('.exp-row');
    const fill = document.getElementById('exp-list-fill');
    if (!list || !rows.length) return;
    observeReveal(rows);
    if (!fill) return;
    if (!window.gsap || !window.ScrollTrigger || reduced){ fill.style.height = '100%'; return; }
    ScrollTrigger.create({
      trigger:list, start:'top 75%', end:'bottom 70%', scrub:.6,
      onUpdate: self=> fill.style.height = (self.progress*100)+'%'
    });
  }

  /* ---------------- CERTIFICATIONS: flip badges ---------------- */
  function initCertFlip(){
    const cards = document.querySelectorAll('.cert-flip');
    if (!cards.length) return;
    observeReveal(cards, { stagger:0.05 });
    cards.forEach(c=>{
      c.addEventListener('click', ()=> c.classList.toggle('flipped'));
      c.addEventListener('keydown', e=>{
        if (e.key==='Enter' || e.key===' '){ e.preventDefault(); c.classList.toggle('flipped'); }
      });
    });
  }

  /* ---------------- TESTIMONIALS: reveal-in ---------------- */
  function initTestimonialsReveal(){
    observeReveal('.t-card', { stagger:0.08 });
  }

  /* ---------------- SITE-WIDE 3D TILT + GROW ---------------- */
  /* Cursor-tracked perspective tilt with a scale "grow" on hover — used on the
     Selected Work grid and the testimonial cards. Skips cards that already have
     their own bespoke hover (cert flip, journey/exp rows, tool logos). */
  function initTiltGrow(){
    if (reduced || matchMedia('(hover:hover)').matches === false) return;
    const els = document.querySelectorAll('.project-card, .t-card');
    els.forEach(el=>{
      el.classList.add('tilt-grow');
      let raf = null;
      const onMove = (e)=>{
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(()=>{
          el.style.transform = `perspective(1000px) rotateX(${(-py*9).toFixed(2)}deg) rotateY(${(px*11).toFixed(2)}deg) scale3d(1.035,1.035,1.035)`;
        });
      };
      const onLeave = ()=>{
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------------- MARQUEES: brands + tools, auto-scrolling rows ---------------- */
  /* ---------------- SECTION TRANSITIONS (subtle bg shift) ---------------- */
  function initSectionTint(){
    if (!window.ScrollTrigger || reduced) return;
    const accents = ['var(--green)','var(--orange)','var(--green-light)','var(--orange-dark)'];
    /* Hero shapes now carry [data-depth] and get their motion from the mouse
       parallax in initHeroInteractions() instead — animating x/y from both
       places would fight over the same transform. */
    document.querySelectorAll('.hero-shape:not([data-depth])').forEach((el,i)=>{
      gsap.to(el, {
        x: (i%2?1:-1)*40, y: (i%2?-1:1)*30, duration:6+i, repeat:-1, yoyo:true, ease:'sine.inOut'
      });
    });
  }

  /* ---------------- MARQUEE LOGOS: staggered pop-in before the row starts scrolling ---------------- */
  function initLogoStagger(){
    const viewports = document.querySelectorAll('.marquee-viewport');
    if (!viewports.length) return;
    if (reduced || !('IntersectionObserver' in window)){
      viewports.forEach(el=> el.classList.add('mq-in'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){ entry.target.classList.add('mq-in'); io.unobserve(entry.target); }
      });
    }, { threshold:0.15 });
    viewports.forEach(el=> io.observe(el));
  }

  /* ---------------- MOBILE MENU: burger + full-screen overlay ---------------- */
  function initMobileMenu(){
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    const links = menu.querySelectorAll('a');

    function setOpen(open){
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
      if (lenisInstance){ open ? lenisInstance.stop() : lenisInstance.start(); }
    }

    burger.addEventListener('click', ()=> setOpen(!menu.classList.contains('open')));
    links.forEach(a=> a.addEventListener('click', ()=> setOpen(false)));
    document.addEventListener('keydown', e=>{ if (e.key==='Escape') setOpen(false); });
    window.addEventListener('resize', ()=>{ if (window.innerWidth > 900) setOpen(false); });
  }

  /* ---------------- EVENTS ---------------- */
  function initEvents(){
    document.getElementById('work-toggle').addEventListener('click', e=>{
      const btn = e.target.closest('button'); if (!btn) return;
      document.querySelectorAll('#work-toggle button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeMode = btn.dataset.mode; activeCat = null;
      renderCatNav(); renderProjects();
    });
    document.getElementById('modal-close').addEventListener('click', closeProject);
    document.getElementById('modal-backdrop').addEventListener('click', closeProject);
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-img').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', e=>{
      if (e.target.id === 'lightbox') closeLightbox();
    });
    document.addEventListener('keydown', e=>{
      if (e.key !== 'Escape') return;
      const lb = document.getElementById('lightbox');
      if (lb && lb.classList.contains('open')) closeLightbox();
      else closeProject();
    });

    const resumeBtn = document.getElementById('resume-btn');
    resumeBtn.setAttribute('href', 'assets/resume/bittu-rai-resume.pdf');
    resumeBtn.setAttribute('download', 'Bittu-Rai-Resume.pdf');
  }

  /* ---------------- INIT ---------------- */
  function boot(){
    renderAll();
    initEvents();
    initMobileMenu();
    initCursor();
    initProgress();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    initHero();
    initHeroInteractions();
    initReveals();
    observeReveal('.who-item', { stagger:0.07 });
    initAnchors();
    initBioWords();
    initStats();
    initBackToTop();
    initProcess();
    initServicesStory();
    initJourney();
    initExperience();
    initCertFlip();
    initTestimonialsReveal();
    initTiltGrow();
    initLogoStagger();
    initSectionTint();

    /* ---------------- KEEP SCROLLTRIGGER POSITIONS IN SYNC ----------------
       Project photos (and other section images) are large, real, network-loaded
       images. If they finish loading AFTER ScrollTrigger has already measured the
       page (which happens above, right after the DOM is built), every pinned
       section below them — Services' sticky story included — ends up pinning at
       a stale, now-incorrect scroll position, because the page grew taller once
       those images arrived. That stale trigger point visually overlaps whatever
       section is actually at that old coordinate. Refreshing again once every
       image/font/video has actually loaded keeps every pin point correct. */
    if (window.ScrollTrigger){
      let refreshTimer = null;
      const scheduleRefresh = ()=>{
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(()=> ScrollTrigger.refresh(), 120);
      };
      window.addEventListener('load', scheduleRefresh);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleRefresh);
      // Belt-and-braces: also re-check a few times shortly after boot in case some
      // resource finishes loading without cleanly firing a load/error event we caught.
      [800, 1800, 3200].forEach(ms => setTimeout(()=> ScrollTrigger.refresh(), ms));
      document.querySelectorAll('img').forEach(img=>{
        if (!img.complete){
          img.addEventListener('load', scheduleRefresh, { once:true });
          img.addEventListener('error', scheduleRefresh, { once:true });
        }
      });
      // Project grid re-renders on filter clicks and adds new <img> elements —
      // watch for that so newly-inserted photos also trigger a refresh once loaded.
      const grid = document.getElementById('project-grid');
      if (grid && 'MutationObserver' in window){
        new MutationObserver(()=>{
          grid.querySelectorAll('img').forEach(img=>{
            if (!img.complete){
              img.addEventListener('load', scheduleRefresh, { once:true });
              img.addEventListener('error', scheduleRefresh, { once:true });
            }
          });
          scheduleRefresh();
        }).observe(grid, { childList:true, subtree:true });
      }
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initSmoothScroll();
    runLoader(boot);
  });

})();
