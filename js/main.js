/* ============================================================
   BITTU RAI — PORTFOLIO APP
   Renders PORTFOLIO_DATA / SITE_META into the editorial layout
   and wires up scroll, cursor and interaction behaviour.
   ============================================================ */
(function(){
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const STORAGE_KEY = "bittu_role_v2";
  let currentRole = localStorage.getItem(STORAGE_KEY) || "graphic";
  let activeCatIndex = 0;

  /* ---------------- Lenis smooth scroll + GSAP sync ---------------- */
  let lenis;
  if(!prefersReduced && window.Lenis){
    lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger && ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }

  /* ---------------- Loader ---------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const word = loader.querySelector("span");
    if(window.gsap){
      gsap.to(word, { y: 0, duration: .7, ease: "power3.out", delay: .15 });
      gsap.to(loader, { yPercent: -100, duration: .7, delay: .95, ease: "power3.inOut",
        onComplete: () => { loader.style.display = "none"; boot(); } });
    } else {
      loader.style.display = "none"; boot();
    }
  });

  function boot(){
    renderAll(currentRole);
    initScrollSpy();
    initReveals();
    initAnchorScroll();
    heroIntro();
    initHeroParallax();
    initHeroCardTilt();
    ScrollTrigger && ScrollTrigger.refresh();
  }

  /* ---------------- Render everything for a role ---------------- */
  function renderAll(role){
    currentRole = role;
    document.body.setAttribute("data-role", role);
    localStorage.setItem(STORAGE_KEY, role);
    const data = PORTFOLIO_DATA[role];

    document.querySelectorAll("#lens-toggle button, #lens-toggle-mobile button").forEach(b => b.classList.toggle("is-on", b.dataset.role === role));
    document.getElementById("hero-eyebrow-role").textContent = data.label;
    document.getElementById("hero-desc").textContent = data.intro;
    document.getElementById("hero-bg-word").textContent = data.shortLabel || data.label;
    document.getElementById("hero-card-index").textContent = "/ " + String(Math.min(data.heroTags.length,6)).padStart(2,"0");
    document.getElementById("about-intro").textContent = data.intro;
    document.querySelectorAll(".js-resume-link").forEach(a => a.setAttribute("href", data.resumeFile));
    document.getElementById("services-title").textContent = role === "product" ? "Where I add the most value" : "What I can do for you";
    document.getElementById("work-title").textContent = role === "product" ? "Product & UI/UX work" : "Recent design work";
    document.getElementById("about-statement").textContent = roleStatement(role);

    typedRoleWord(data.roleWords);
    renderHeroFacts(data.heroTags);
    renderStats(data.stats);
    renderSkills(data.skills);
    renderToolsMarquee(data.favoriteTools);
    renderServices(data.services);
    renderProcess();
    renderBrands();
    activeCatIndex = 0;
    renderWork(data.projectCategories);
    renderExperience(data.experience);
    renderTestimonials();
    renderFAQ();

    initScrollTextReveal();
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function roleStatement(role){
    return role === "product"
      ? "I take a rough idea to a shippable interface, then build the front end myself so nothing gets lost between Figma and the browser."
      : "I turn brand ideas into posters, packaging, social campaigns and pitch decks that get noticed — then keep them consistent everywhere they show up.";
  }

  /* ---------------- Hero role word (typewriter) ---------------- */
  let typedTimer;
  function typedRoleWord(words){
    clearTimeout(typedTimer);
    const el = document.getElementById("hero-role-word");
    if(prefersReduced){ el.textContent = words[0]; return; }
    let wIdx = 0, chIdx = 0, deleting = false;
    function tick(){
      const word = words[wIdx % words.length];
      chIdx += deleting ? -1 : 1;
      el.textContent = word.slice(0, chIdx) || "\u00A0";
      if(!deleting && chIdx === word.length){ deleting = true; typedTimer = setTimeout(tick, 1500); return; }
      if(deleting && chIdx === 0){ deleting = false; wIdx++; }
      typedTimer = setTimeout(tick, deleting ? 32 : 62);
    }
    tick();
  }

  /* ---------------- Hero facts list (metadata column, replaces the old
     portrait + floating tag pills) ---------------- */
  function renderHeroFacts(tags){
    const wrap = document.getElementById("hero-facts");
    wrap.innerHTML = "";
    tags.slice(0,6).forEach((tag,i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="fact-num">${String(i+1).padStart(2,"0")}</span><span class="fact-label">${tag}</span>`;
      wrap.appendChild(li);
    });
  }

  /* ---------------- Hero intro (typography-first text reveal) ----------------
     Masks the title lines and fades the metadata bar / lede / CTAs / facts /
     foot row in on load. Falls back to an instant visible state with no
     animation if GSAP didn't load or the user prefers reduced motion — the
     matching CSS safety net lives in the .js-anim-ready rules in style.css. */
  function heroIntro(){
    const titleSpans = document.querySelectorAll("#hero .hero-title .line span");
    const animEls = document.querySelectorAll("#hero .hero-anim");

    if(!window.gsap || prefersReduced){
      titleSpans.forEach(el => el.style.transform = "none");
      animEls.forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }

    document.documentElement.classList.add("js-anim-ready");
    const bar = document.querySelector('#hero [data-hero-anim="bar"]');
    const upEls = document.querySelectorAll('#hero [data-hero-anim="up"]');

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(bar, { opacity: 1, y: 0, duration: .6 }, 0)
      .to(titleSpans, { y: "0%", duration: 1.05, stagger: .1 }, .12)
      .to(upEls, { opacity: 1, y: 0, duration: .7, stagger: .06 }, .58);
  }

  /* ---------------- Hero card tilt (subtle mouse-follow, desktop only) ---------------- */
  function initHeroCardTilt(){
    const card = document.getElementById("hero-card");
    if(!card || isTouch || prefersReduced) return;
    let raf = null;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(700px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*8).toFixed(2)}deg)`;
      });
    });
    card.addEventListener("mouseleave", () => {
      if(raf) cancelAnimationFrame(raf);
      card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ---------------- Hero → next-section parallax ----------------
     As the hero scrolls out of view its type block drifts up and fades
     slightly, so the section reads as flowing into the tools strip below
     rather than cutting off abruptly. The oversized watermark word behind
     it drifts at a different rate for a touch of depth. */
  function initHeroParallax(){
    if(!window.gsap || !window.ScrollTrigger || prefersReduced) return;
    gsap.to(".hero-scroll-fade", {
      yPercent: -6,
      opacity: .55,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to("#hero-bg-word", {
      yPercent: -16,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------------- Scroll-scrubbed word reveal ----------------
     Splits a heading/paragraph into per-word spans, then ties their
     opacity + lift directly to scroll position between two trigger points
     (scrub) instead of a one-shot "enter viewport" fade. That means text
     reveals progressively as the page scrolls, settles wherever scrolling
     stops, and un-reveals smoothly on the way back up. Deliberately scoped
     to headings, project titles and a handful of supporting paragraphs —
     not every line of copy on the site — and skipped entirely for
     prefers-reduced-motion or if GSAP/ScrollTrigger didn't load. <br> tags
     (used in the contact heading) are preserved as real line breaks rather
     than being flattened by the split. */
  function splitWords(el){
    function walk(node){
      const frag = document.createDocumentFragment();
      node.childNodes.forEach(child => {
        if(child.nodeType === Node.TEXT_NODE){
          child.textContent.split(/(\s+)/).forEach(chunk => {
            if(chunk === "") return;
            if(chunk.trim() === ""){ frag.appendChild(document.createTextNode(chunk)); return; }
            const span = document.createElement("span");
            span.className = "rv-word";
            span.textContent = chunk;
            frag.appendChild(span);
          });
        } else {
          frag.appendChild(child.cloneNode(true));
        }
      });
      return frag;
    }
    const frag = walk(el);
    el.innerHTML = "";
    el.appendChild(frag);
  }

  function resetScrollReveal(el){
    if(window.ScrollTrigger) ScrollTrigger.getAll().forEach(st => { if(st.trigger === el) st.kill(); });
  }

  const SCROLL_TEXT_GROUPS = [
    { selector: ".display-2",                        start: "top 88%", end: "top 55%", y: 22, stagger: .028 },
    { selector: ".contact-title",                     start: "top 85%", end: "top 40%", y: 30, stagger: .02  },
    { selector: ".about-statement",                   start: "top 85%", end: "top 50%", y: 22, stagger: .02  },
    { selector: ".about-copy, .work-category-desc, .section-intro", start: "top 90%", end: "top 55%", y: 14, stagger: .015 },
    { selector: ".project-info h3",                   start: "top 92%", end: "top 72%", y: 18, stagger: .03  },
    { selector: ".service-title",                     start: "top 90%", end: "top 65%", y: 18, stagger: .03  }
  ];

  function initScrollTextReveal(){
    if(prefersReduced || !window.gsap || !window.ScrollTrigger) return;
    SCROLL_TEXT_GROUPS.forEach(g => {
      document.querySelectorAll(g.selector).forEach(el => {
        resetScrollReveal(el);
        el.classList.remove("reveal", "is-in");
        el.style.opacity = ""; el.style.transform = "";
        splitWords(el);
        const words = el.querySelectorAll(".rv-word");
        if(!words.length) return;
        gsap.set(words, { opacity: 0, y: g.y });
        gsap.timeline({
          scrollTrigger: { trigger: el, start: g.start, end: g.end, scrub: .6 }
        }).to(words, { opacity: 1, y: 0, stagger: g.stagger, ease: "none" });
      });
    });
  }

  /* ---------------- Scroll-linked media scale ----------------
     Project thumbnails/tiles settle from a slight zoom-in to their resting
     scale as they cross into view (independent of the clip-path wipe on
     .reveal-img and the hover zoom on the <img> itself — this one animates
     the container, so it never fights with either). */
  function initMediaScrollFx(){
    if(prefersReduced || !window.gsap || !window.ScrollTrigger) return;
    document.querySelectorAll(".project-thumb, .grid-tile").forEach(el => {
      resetScrollReveal(el);
      gsap.fromTo(el, { scale: 1.035 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 100%", end: "top 60%", scrub: .6 }
      });
    });
  }

  /* ---------------- Smooth anchor scrolling (nav, hero → Selected Work, etc.) ---------------- */
  function initAnchorScroll(){
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if(!link) return;
      const id = link.getAttribute("href");
      if(!id || id.length < 2) return;
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      if(lenis){ lenis.scrollTo(target, { offset: -80, duration: 1.15 }); }
      else target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    });
  }

  /* ---------------- Stats (count-up on scroll into view) ---------------- */
  function renderStats(stats){
    const wrap = document.getElementById("stat-list");
    wrap.innerHTML = "";
    stats.forEach(s => {
      const row = document.createElement("div");
      row.className = "stat-row reveal";
      row.innerHTML = `<span class="stat-num" data-value="${s.value}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</span><span class="stat-label">${s.label}</span>`;
      wrap.appendChild(row);
    });
    initStatsCountUp();
  }

  function initStatsCountUp(){
    const nums = document.querySelectorAll("#stat-list .stat-num");
    if(prefersReduced){
      nums.forEach(el => { el.textContent = el.dataset.value + el.dataset.suffix; });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:.5 });
    nums.forEach(el => obs.observe(el));
  }

  function animateCount(el){
    const target = parseFloat(el.dataset.value) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1300;
    const startTime = performance.now();
    function tick(now){
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Skills cloud ---------------- */
  function renderSkills(skills){
    const wrap = document.getElementById("skills-cloud");
    wrap.innerHTML = "";
    skills.forEach(s => {
      const chip = document.createElement("span");
      chip.className = "skill-chip";
      chip.textContent = s;
      wrap.appendChild(chip);
    });
  }

  /* ---------------- Tools marquee ---------------- */
  function renderToolsMarquee(tools){
    const row1 = document.getElementById("marquee-1");
    const row2 = document.getElementById("marquee-2");
    const build = (list) => list.map(t => `<span><img src="${t.img}" alt="" loading="lazy">${t.name}</span>`).join("");
    const html = build(tools) + build(tools);
    row1.innerHTML = html;
    row2.innerHTML = build([...tools].reverse()) + build([...tools].reverse());
    animateMarquee(row1, 1);
    animateMarquee(row2, -1);
  }

  function animateMarquee(el, dir){
    if(!window.gsap || prefersReduced) return;
    requestAnimationFrame(() => {
      const w = el.scrollWidth / 2;
      const tween = gsap.fromTo(el, { x: dir > 0 ? 0 : -w }, { x: dir > 0 ? -w : 0, duration: 26, ease: "none", repeat: -1 });
      // Pause the drift under the pointer so a hovered logo can actually be
      // looked at, instead of sliding away mid-hover.
      el.addEventListener("mouseenter", () => tween.timeScale(0.15));
      el.addEventListener("mouseleave", () => tween.timeScale(1));
    });
  }

  /* ---------------- Services ---------------- */
  function renderServices(services){
    const wrap = document.getElementById("services-list");
    wrap.innerHTML = "";
    services.forEach((s,i) => {
      const row = document.createElement("div");
      row.className = "service-row reveal";
      row.innerHTML = `
        <span class="service-num">${String(i+1).padStart(2,"0")}</span>
        <span class="service-title">${s.title}</span>
        <span class="service-desc">${s.desc}</span>
        <svg class="service-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"></path></svg>`;
      row.addEventListener("click", () => {
        const wasOpen = row.classList.contains("is-open");
        wrap.querySelectorAll(".service-row.is-open").forEach(r => r.classList.remove("is-open"));
        if(!wasOpen) row.classList.add("is-open");
      });
      wrap.appendChild(row);
    });
  }

  /* ---------------- Process ---------------- */
  function renderProcess(){
    const wrap = document.getElementById("process-list");
    wrap.innerHTML = "";
    SITE_META.process.forEach((p,i) => {
      const card = document.createElement("div");
      card.className = "process-card reveal";
      card.style.transitionDelay = (i * 0.07) + "s";
      card.innerHTML = `
        <span class="process-card-num">${String(i+1).padStart(2,"0")}</span>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>`;
      wrap.appendChild(card);
    });
  }

  /* ---------------- Brand marquee (big cards) ---------------- */
  function renderBrands(){
    const row1 = document.getElementById("brand-row-1");
    const row2 = document.getElementById("brand-row-2");
    if(row1.dataset.built) return;
    row1.dataset.built = "1";
    const imgs = Array.from({ length: 35 }, (_, i) => `img/brands/brand-${String(i + 1).padStart(2, "0")}.png`);
    const build = (list) => list.map(src => `<div class="brand-card"><img src="${src}" alt="Brand logo" loading="lazy"></div>`).join("");
    row1.innerHTML = build(imgs) + build(imgs);
    row2.innerHTML = build([...imgs].reverse()) + build([...imgs].reverse());
    animateMarquee(row1, 1);
    animateMarquee(row2, -1);
  }

  /* ---------------- Work / Projects ---------------- */
  function renderWork(categories){
    const filters = document.getElementById("work-filters");
    filters.innerHTML = "";
    categories.forEach((cat,i) => {
      const btn = document.createElement("button");
      btn.className = "work-filter" + (i===activeCatIndex ? " is-on" : "");
      btn.type = "button";
      btn.textContent = cat.name;
      btn.addEventListener("click", () => {
        activeCatIndex = i;
        filters.querySelectorAll(".work-filter").forEach(b => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        showCategory(categories, i);
      });
      filters.appendChild(btn);
    });
    showCategory(categories, activeCatIndex);
  }

  function showCategory(categories, idx){
    const cat = categories[idx];
    const body = document.getElementById("work-body");
    body.innerHTML = `<p class="work-category-desc reveal">${cat.desc || ""}</p>`;

    const caseCount = cat.projects.filter(p => p.overview).length;
    const useGrid = cat.projects.length > 5 && caseCount === 0 && cat.mode !== "link";

    if(useGrid){
      const grid = document.createElement("div");
      grid.className = "grid-mode";
      cat.projects.forEach(p => grid.appendChild(buildTile(p)));
      body.appendChild(grid);
    } else {
      cat.projects.forEach((p,i) => body.appendChild(buildRow(p, i, cat)));
    }
    initScrollTextReveal();
    initMediaScrollFx();
    initReveals();
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  }

  function buildTile(p){
    const tile = document.createElement("div");
    tile.className = "grid-tile reveal-img";
    tile.setAttribute("data-cursor", "VIEW");
    tile.innerHTML = `<img src="${p.img}" alt="${escapeAttr(p.title)}" loading="lazy"><div class="grid-tile-cap">${p.title}</div>`;
    tile.addEventListener("click", () => openPhoto(p));
    return tile;
  }

  function buildRow(p, i, cat){
    const row = document.createElement("div");
    row.className = "project-row reveal";
    const isLink = cat.mode === "link";
    const cursorWord = isLink ? "OPEN" : (p.overview ? "VIEW" : "VIEW");
    row.setAttribute("data-cursor", cursorWord);

    let thumbInner = "";
    if(p.embed){
      thumbInner = `<iframe src="${p.embed}" loading="lazy" style="width:100%;height:100%;border:0;" allowfullscreen title="${escapeAttr(p.title)}"></iframe>`;
    } else if(p.video){
      thumbInner = `<video src="${p.video}" muted loop playsinline autoplay></video>`;
    } else if(p.img){
      thumbInner = `<img src="${p.img}" alt="${escapeAttr(p.title)}" loading="lazy">`;
    } else {
      thumbInner = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:var(--f-mono);color:var(--ink-faint);">${escapeAttr(p.title)}</div>`;
    }

    row.innerHTML = `
      <span class="project-index">${String(i+1).padStart(2,"0")}</span>
      <div class="project-info">
        <div class="project-tag">${p.tag || ""}</div>
        <h3>${p.title}</h3>
        <p class="lede" style="margin-top:10px;max-width:44ch;font-size:14px;">${p.bio || ""}</p>
      </div>
      <div class="project-thumb reveal-img">${thumbInner}
        <svg class="project-link-ico" style="position:absolute;top:14px;right:14px;background:var(--paper);border-radius:50%;padding:6px;box-sizing:border-box;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"></path></svg>
      </div>`;

    row.addEventListener("click", (e) => {
      if(isLink && p.link){ window.open(p.link, "_blank", "noopener"); return; }
      if(p.overview || p.gallery){ openCase(p); return; }
      if(p.link){ window.open(p.link, "_blank", "noopener"); return; }
      openPhoto(p);
    });
    return row;
  }

  function escapeAttr(s){ return (s||"").replace(/"/g,"&quot;"); }

  /* ---------------- Case study modal ---------------- */
  const caseModal = document.getElementById("case-modal");
  function openCase(p){
    document.getElementById("modal-hero-img").src = p.img || (p.gallery && p.gallery[0] && p.gallery[0].src) || "";
    document.getElementById("modal-tag").textContent = p.tag || "";
    document.getElementById("modal-title").textContent = p.title;
    document.getElementById("modal-bio").textContent = p.bio || "";
    document.getElementById("modal-overview").textContent = p.overview || "";
    const meta = document.getElementById("modal-meta");
    meta.innerHTML = "";
    if(p.role) meta.innerHTML += `<div><b>Role</b>${p.role}</div>`;
    if(p.tools) meta.innerHTML += `<div><b>Tools</b>${p.tools.join(", ")}</div>`;
    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";
    (p.gallery||[]).forEach(g => {
      if(g.type === "image"){
        const img = document.createElement("img");
        img.src = g.src; img.loading = "lazy"; img.alt = p.title;
        gallery.appendChild(img);
      }
    });
    caseModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if(lenis) lenis.stop();
    if(window.gsap && !prefersReduced){
      const els = caseModal.querySelectorAll(".modal-hero, #modal-tag, #modal-title, #modal-bio, #modal-meta > *, #modal-overview, #modal-gallery img");
      gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: "power2.out", delay: .1 });
    }
  }
  document.getElementById("case-modal-close").addEventListener("click", closeCase);
  caseModal.addEventListener("click", (e) => { if(e.target === caseModal) closeCase(); });
  function closeCase(){
    caseModal.classList.remove("is-open");
    document.body.style.overflow = "";
    if(lenis) lenis.start();
  }

  /* ---------------- Photo modal ---------------- */
  const photoModal = document.getElementById("photo-modal");
  function openPhoto(p){
    document.getElementById("photo-modal-img").src = p.img || "";
    document.getElementById("photo-modal-tag").textContent = p.tag || "";
    document.getElementById("photo-modal-title").textContent = p.title || "";
    document.getElementById("photo-modal-caption").textContent = p.bio || "";
    photoModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if(lenis) lenis.stop();
    if(window.gsap && !prefersReduced){
      gsap.fromTo("#photo-modal .modal-card", { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .45, ease: "power2.out" });
    }
  }
  document.getElementById("photo-modal-close").addEventListener("click", closePhoto);
  photoModal.addEventListener("click", (e) => { if(e.target === photoModal) closePhoto(); });
  function closePhoto(){
    photoModal.classList.remove("is-open");
    document.body.style.overflow = "";
    if(lenis) lenis.start();
  }

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ closeCase(); closePhoto(); }
  });

  /* ---------------- Experience ---------------- */
  function renderExperience(exp){
    const wrap = document.getElementById("experience-timeline");
    wrap.innerHTML = "";
    exp.forEach(job => {
      const isCurrent = /ongoing/i.test(job.period || "");
      const item = document.createElement("div");
      item.className = "timeline-item reveal" + (isCurrent ? " is-current" : "");
      item.innerHTML = `
        <div class="timeline-period">${job.period}</div>
        <div>
          <h4>${job.role}</h4>
          <div class="timeline-company">${job.company}</div>
          <ul>${job.points.map(pt => `<li>${pt}</li>`).join("")}</ul>
        </div>`;
      wrap.appendChild(item);
    });
    initTimelineRails();
  }

  /* Draws the accent line down each timeline's rail in sync with scroll
     (rather than it just being static), then leaves it filled if reduced
     motion is requested or GSAP/ScrollTrigger isn't available. Re-run
     after every render since the Experience list gets rebuilt on lens
     toggle while the Education list is static — both are handled the
     same way, idempotently. */
  function initTimelineRails(){
    document.querySelectorAll(".timeline").forEach(tl => {
      let fill = tl.querySelector(".timeline-rail-fill");
      if(!fill){
        fill = document.createElement("div");
        fill.className = "timeline-rail-fill";
        tl.appendChild(fill);
      }
      if(prefersReduced || !window.gsap || !window.ScrollTrigger){
        fill.style.transform = "scaleY(1)";
        return;
      }
      resetScrollReveal(tl);
      gsap.fromTo(fill, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: tl, start: "top 80%", end: "bottom 65%", scrub: .6 }
      });
    });
  }

  /* ---------------- Testimonials (auto-moving strip, pauses on touch/hover) ---------------- */
  function renderTestimonials(){
    const wrap = document.getElementById("testi-track");
    if(wrap.dataset.built) return;
    wrap.dataset.built = "1";
    wrap.innerHTML = "";
    const card = (t, hidden) => `<div class="testi-card"${hidden ? ' aria-hidden="true" tabindex="-1"' : ""}><p class="testi-quote">"${t.quote}"</p><div><div class="testi-name">${t.name}</div><div class="testi-role">${t.company}</div></div></div>`;
    if(prefersReduced){
      // No motion: show the set once, laid out as a normal scrollable row.
      wrap.innerHTML = SITE_META.testimonials.map(t => card(t, false)).join("");
      return;
    }
    // Duplicate the set so the strip can loop seamlessly; the second copy is
    // aria-hidden so screen readers only ever see each quote once.
    wrap.innerHTML = SITE_META.testimonials.map(t => card(t, false)).join("")
      + SITE_META.testimonials.map(t => card(t, true)).join("");
    initTestimonialsMarquee(wrap);
  }

  function initTestimonialsMarquee(el){
    if(!window.gsap) return;
    requestAnimationFrame(() => {
      const w = el.scrollWidth / 2;
      if(!w) return;
      const tween = gsap.fromTo(el, { x: 0 }, { x: -w, duration: 46, ease: "none", repeat: -1 });
      const pause = () => tween.timeScale(0);
      const resume = () => tween.timeScale(1);
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
      el.addEventListener("touchstart", pause, { passive: true });
      el.addEventListener("touchend", resume, { passive: true });
    });
  }

  /* ---------------- FAQ ---------------- */
  function renderFAQ(){
    const wrap = document.getElementById("faq-list");
    if(wrap.dataset.built) return;
    wrap.dataset.built = "1";
    wrap.innerHTML = "";
    SITE_META.faqs.forEach(f => {
      const item = document.createElement("div");
      item.className = "faq-item reveal";
      item.innerHTML = `
        <button class="faq-q" type="button"><span>${f.q}</span><span class="faq-plus"></span></button>
        <div class="faq-a"><p>${f.a}</p></div>`;
      const btn = item.querySelector(".faq-q");
      const answer = item.querySelector(".faq-a");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        wrap.querySelectorAll(".faq-item").forEach(i => { i.classList.remove("is-open"); i.querySelector(".faq-a").style.maxHeight = null; });
        if(!isOpen){ item.classList.add("is-open"); answer.style.maxHeight = answer.scrollHeight + "px"; }
      });
      wrap.appendChild(item);
    });
  }

  /* ---------------- Reveal animations ----------------
     Elements carrying .reveal (fade+rise) or .reveal-img (clip-path wipe,
     used on project artwork) start hidden in CSS and pick up .is-in when
     they scroll into view. When GSAP's ScrollTrigger is available we batch
     nearby elements so a whole row/section cascades in together with a
     tight stagger; otherwise a plain IntersectionObserver still gets every
     element to its visible state (just without the batched stagger). */
  let revealObserver;
  function initReveals(){
    const selector = ".reveal:not(.is-in), .reveal-img:not(.is-in)";
    if(prefersReduced){
      document.querySelectorAll(".reveal, .reveal-img").forEach(el => el.classList.add("is-in"));
      return;
    }
    if(window.gsap && window.ScrollTrigger && ScrollTrigger.batch){
      ScrollTrigger.batch(selector, {
        start: "top 92%",
        onEnter: (batch) => batch.forEach((el, i) => {
          el.style.transitionDelay = (i * 0.06) + "s";
          el.classList.add("is-in");
        }),
        once: true
      });
      return;
    }
    if(!revealObserver){
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){ entry.target.classList.add("is-in"); revealObserver.unobserve(entry.target); }
        });
      }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
    }
    document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
  }

  /* ---------------- Custom cursor ----------------
     Dot (fast) + ring (slower ease, trails a beat behind) + a label bubble
     that fades in over both when hovering anything tagged [data-cursor].
     A quick expanding ripple fires on click for tactile feedback. Velocity
     gives the ring a very subtle directional stretch so it feels fluid
     rather than rigidly locked to the pointer. */
  if(!isTouch && !prefersReduced){
    document.body.classList.add("cursor-ready");
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const label = document.getElementById("cursor-label");
    let lastX = window.innerWidth / 2, lastY = window.innerHeight / 2, lastT = Date.now();
    window.addEventListener("mousemove", (e) => {
      if(window.gsap){
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: .12, ease: "power2.out" });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: .45, ease: "power3.out" });
        gsap.to(label, { x: e.clientX, y: e.clientY, duration: .16, ease: "power2.out" });

        const now = Date.now();
        const dt = Math.max(now - lastT, 1);
        const vx = (e.clientX - lastX) / dt, vy = (e.clientY - lastY) / dt;
        const speed = Math.min(Math.hypot(vx, vy), 1.4);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        gsap.to(ring, { rotate: angle, scaleX: 1 + speed * .35, scaleY: 1 - speed * .15, duration: .3, ease: "power2.out" });
        lastX = e.clientX; lastY = e.clientY; lastT = now;
      } else {
        dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
      }
    });
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("[data-cursor], a, button");
      if(!target) return;
      const word = target.getAttribute("data-cursor");
      dot.classList.add("is-big");
      ring.classList.add("is-big");
      if(word){ label.textContent = word; label.classList.add("is-on"); }
    });
    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest("[data-cursor], a, button");
      if(!target) return;
      dot.classList.remove("is-big");
      ring.classList.remove("is-big");
      label.classList.remove("is-on");
    });
    document.addEventListener("mousedown", (e) => {
      if(!window.gsap) return;
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      gsap.to(ripple, { scale: 2.6, opacity: 0, duration: .6, ease: "power2.out", onComplete: () => ripple.remove() });
      gsap.to(dot, { scale: .7, duration: .12, yoyo: true, repeat: 1 });
    });
  }

  /* ---------------- Magnetic buttons + social icons ---------------- */
  if(!isTouch && !prefersReduced && window.gsap){
    document.querySelectorAll(".btn, .social-row a").forEach(btn => {
      const pull = btn.classList.contains("btn") ? { x: .25, y: .5 } : { x: .4, y: .4 };
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width/2) * pull.x, y: (e.clientY - r.top - r.height/2) * pull.y, duration: .3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,0.4)" }));
    });
  }

  /* ---------------- Nav scroll state + active section ---------------- */
  const nav = document.getElementById("site-nav");
  const navSections = ["hero","about","services","work","experience","contact"];
  function initScrollSpy(){
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const progressBar = document.getElementById("scroll-progress");
  const hireFab = document.getElementById("hire-fab");
  const heroEl = document.getElementById("hero");
  const contactEl = document.getElementById("contact");
  function onScroll(){
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    const toTop = document.getElementById("to-top");
    let current = "";
    navSections.forEach(id => {
      const el = document.getElementById(id);
      if(el && el.getBoundingClientRect().top < window.innerHeight * .4) current = id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
    if(progressBar){
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      progressBar.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
    }
    // The floating "Hire me" button only makes sense once the hero (which
    // already has its own CTAs) has scrolled away, and hides again once
    // Contact — its own destination — is actually on screen.
    if(hireFab){
      const pastHero = heroEl ? heroEl.getBoundingClientRect().bottom < 0 : window.scrollY > 400;
      const atContact = contactEl ? contactEl.getBoundingClientRect().top < window.innerHeight * .85 : false;
      hireFab.classList.toggle("is-visible", pastHero && !atContact);
    }
  }

  /* ---------------- Lens toggle: curtain page-transition ---------------- */
  const lensCurtain = document.getElementById("lens-transition");
  const lensCurtainLabel = document.getElementById("lens-transition-label");
  function handleLensClick(e){
    const btn = e.target.closest("button[data-role]");
    if(!btn || btn.dataset.role === currentRole) return;
    const nextRole = btn.dataset.role;
    if(window.gsap && !prefersReduced){
      lensCurtainLabel.textContent = "Switching to " + (nextRole === "product" ? "Product" : "Graphic") + " view";
      gsap.timeline()
        .set(lensCurtain, { pointerEvents: "auto" })
        .to(lensCurtain, { y: "0%", duration: .55, ease: "power4.inOut" })
        .to(lensCurtainLabel, { opacity: 1, duration: .25 }, "-=.15")
        .call(() => { renderAll(nextRole); })
        .to(lensCurtainLabel, { opacity: 0, duration: .2 })
        .to(lensCurtain, { y: "-101%", duration: .55, ease: "power4.inOut" }, "+=.05")
        .set(lensCurtain, { y: "101%", pointerEvents: "none" });
    } else {
      renderAll(nextRole);
    }
    mobileMenu.classList.remove("is-open");
  }
  document.getElementById("lens-toggle").addEventListener("click", handleLensClick);
  document.getElementById("lens-toggle-mobile").addEventListener("click", handleLensClick);

  /* ---------------- Mobile menu ---------------- */
  const mobileMenu = document.getElementById("mobile-menu");
  document.getElementById("nav-burger").addEventListener("click", () => mobileMenu.classList.add("is-open"));
  document.getElementById("mobile-menu-close").addEventListener("click", () => mobileMenu.classList.remove("is-open"));
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("is-open")));

  /* ---------------- Back to top ---------------- */
  document.getElementById("to-top").addEventListener("click", () => {
    if(lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- Resize ---------------- */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if(window.ScrollTrigger) ScrollTrigger.refresh();
    }, 250);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

})();
