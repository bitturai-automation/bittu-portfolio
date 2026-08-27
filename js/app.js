/* ============================================================
   BITTU RAI — PORTFOLIO APP
   ============================================================ */
(function(){
  "use strict";

  const STORAGE_KEY = "bittu_role";
  let currentRole = localStorage.getItem(STORAGE_KEY);

  /* ---------------- Loader ---------------- */
  window.addEventListener("load", () => {
    const fill = document.getElementById("loader-fill");
    gsap.to(fill, { width: "100%", duration: .6, ease: "power2.out" });
    gsap.to("#loader", {
      opacity: 0, duration: .4, delay: .6, ease: "power2.out",
      onComplete: () => { document.getElementById("loader").style.display = "none"; initAfterLoad(); }
    });
  });

  function initAfterLoad(){
    gsap.registerPlugin(ScrollTrigger);
    // Always show the role picker on load — it no longer auto-skips based on a
    // previously remembered choice, so it reliably opens every time.
    document.getElementById("role-popup").style.display = "flex";
    renderAll(currentRole || "graphic");
    animateBlobsOnce();
  }

  /* ---------------- Role popup ---------------- */
  document.querySelectorAll(".role-card").forEach(card => {
    card.addEventListener("click", () => {
      const role = card.dataset.role;
      localStorage.setItem(STORAGE_KEY, role);
      currentRole = role;
      hidePopup(false);
      renderAll(role);
    });
  });

  function hidePopup(instant){
    const popup = document.getElementById("role-popup");
    if(instant){ popup.style.display = "none"; return; }
    gsap.to(popup, { opacity: 0, duration: .5, onComplete: () => popup.style.display = "none" });
  }

  const popupSkip = document.getElementById("popup-skip");
  if(popupSkip){
    popupSkip.addEventListener("click", () => {
      hidePopup(false);
      renderAll(currentRole || "graphic");
    });
  }

  /* ---------------- Mode toggle (nav) ---------------- */
  const modeToggle = document.getElementById("mode-toggle");
  modeToggle.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-role]");
    if(!btn) return;
    switchRole(btn.dataset.role);
  });

  function switchRole(role){
    if(role === currentRole) return;
    currentRole = role;
    localStorage.setItem(STORAGE_KEY, role);
    const main = document.querySelector("main");
    gsap.to(main, { opacity: 0, y: 14, duration: .35, ease: "power2.in", onComplete: () => {
      renderAll(role);
      gsap.fromTo(main, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, ease: "power2.out" });
    }});
  }

  /* ---------------- Theme (night-mode toggle removed, always light) ---------------- */
  document.documentElement.setAttribute("data-theme", "light");

  /* ---------------- Render everything for a role ---------------- */
  function renderAll(role){
    document.body.setAttribute("data-role", role);
    const data = PORTFOLIO_DATA[role];
    document.querySelectorAll("[data-role]").forEach(el => {
      if(el.closest("#mode-toggle")) el.classList.toggle("is-on", el.dataset.role === role);
    });

    typedRoleWords(data.roleWords);
    document.getElementById("hero-desc").textContent = data.intro;
    document.getElementById("about-intro").textContent = data.intro;
    document.getElementById("download-resume").setAttribute("href", data.resumeFile);

    renderFloatingTags(data.heroTags);
    renderStats(data.stats);
    renderToolsMarquee(data);
    renderServices(data);
    renderFavoriteTools(data);
    renderProjects(data);
    renderExperience(data);
    renderTestimonials();
    renderFAQ();
    renderProcess();

    runRevealAnimations();
    ScrollTrigger.refresh();
  }

  /* ---------------- Typed hero role ---------------- */
  let typedTimer;
  function typedRoleWords(words){
    clearTimeout(typedTimer);
    const el = document.getElementById("hero-role");
    let wIdx = 0, chIdx = 0, deleting = false;
    el.innerHTML = '<span id="typed-text"></span><span class="cursor-blink">&nbsp;</span>';
    const textEl = () => document.getElementById("typed-text");

    function tick(){
      const word = words[wIdx % words.length];
      if(!deleting){
        chIdx++;
        if(textEl()) textEl().textContent = word.slice(0, chIdx);
        if(chIdx === word.length){ deleting = true; typedTimer = setTimeout(tick, 1400); return; }
      } else {
        chIdx--;
        if(textEl()) textEl().textContent = word.slice(0, chIdx);
        if(chIdx === 0){ deleting = false; wIdx++; }
      }
      typedTimer = setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------------- Floating tags around portrait ---------------- */
  function renderFloatingTags(tags){
    const wrap = document.getElementById("floating-tags");
    wrap.innerHTML = "";
    const isNarrow = window.innerWidth <= 640;
    const positions = isNarrow ? [
      {top:"3%", left:"1%"}, {top:"16%", right:"0%"}, {top:"40%", left:"0%"},
      {top:"58%", right:"1%"}, {top:"78%", left:"3%"}, {bottom:"3%", right:"12%"},
      {top:"3%", right:"18%"}, {bottom:"14%", left:"22%"}
    ] : [
      {top:"4%", left:"-8%"}, {top:"18%", right:"-14%"}, {top:"42%", left:"-16%"},
      {top:"58%", right:"-10%"}, {top:"78%", left:"-6%"}, {bottom:"2%", right:"6%"},
      {top:"2%", right:"22%"}, {bottom:"14%", left:"18%"}
    ];
    tags.forEach((tag, i) => {
      const pos = positions[i % positions.length];
      const span = document.createElement("span");
      span.className = "floating-tag";
      span.textContent = tag;
      Object.entries(pos).forEach(([k,v]) => span.style[k] = v);
      wrap.appendChild(span);
      gsap.to(span, {
        y: (i % 2 === 0 ? -14 : 14), duration: 2.4 + (i % 3), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.15
      });
    });
  }

  /* ---------------- Stats with counter animation ---------------- */
  const STAT_ICONS = [
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.6 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2c2.9.3 5 2.4 5 5.8"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M5 4h11l-2.5 3.5L16 11H5"/></svg>'
  ];
  const STAT_STYLES = [
    { bg: "var(--purple)", fg: "#fff" },
    { bg: "var(--lime)", fg: "#111" },
    { bg: "var(--black)", fg: "var(--white)" },
    { bg: "#FF5C7A", fg: "#fff" }
  ];
  function renderStats(stats){
    const grid = document.getElementById("stat-grid");
    grid.innerHTML = "";
    stats.forEach((s, i) => {
      const style = STAT_STYLES[i % STAT_STYLES.length];
      const card = document.createElement("div");
      card.className = "stat-card reveal";
      card.innerHTML = `
        <div class="stat-icon" style="background:${style.bg};color:${style.fg}">${STAT_ICONS[i % STAT_ICONS.length]}</div>
        <div class="stat-num" data-target="${s.value}">0${s.suffix}</div>
        <div class="stat-label">${s.label}</div>`;
      grid.appendChild(card);
    });
    ScrollTrigger.batch(".stat-num", {
      start: "top 88%",
      once: true,
      onEnter: (els) => els.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.textContent.replace(/^0/, "").replace(/\d/g, "");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.4, ease: "power2.out",
          onUpdate: () => el.textContent = Math.round(counter.val) + suffix
        });
      })
    });
  }

  /* ---------------- Tools marquee ---------------- */
  function renderToolsMarquee(data){
    const rowHTML = data.skills.map(s => `<span class="marquee-item">${s}</span>`).join("");
    // Duplicate content in each track so the CSS animation loops seamlessly.
    document.getElementById("marquee-track-1").innerHTML = rowHTML + rowHTML;
    document.getElementById("marquee-track-2").innerHTML = rowHTML + rowHTML;
  }

  /* ---------------- Favourite tools (logo only, name on hover) ---------------- */
  function renderFavoriteTools(data){
    document.getElementById("favtools-title").textContent = "My favourite tools";
    const grid = document.getElementById("favtools-grid");
    grid.innerHTML = "";
    data.favoriteTools.forEach(t => {
      const card = document.createElement("div");
      card.className = "favtool-card reveal";
      card.title = t.name;
      const logoInner = t.img
        ? `<img src="${t.img}" alt="${t.name} logo">`
        : `<div class="favtool-logo" style="background:linear-gradient(135deg, ${t.color}, ${t.color2 || t.color})">${t.abbr}</div>`;
      card.innerHTML = t.img ? `<div class="favtool-logo favtool-logo--img">${logoInner}</div>` : logoInner;
      grid.appendChild(card);
    });
  }

  /* ---------------- My Process ---------------- */
  function renderProcess(){
    const grid = document.getElementById("process-grid");
    if(!grid || grid.children.length) return;
    SITE_META.process.forEach((step, i) => {
      const card = document.createElement("div");
      card.className = "process-card reveal";
      card.innerHTML = `
        <div class="process-num">${String(i + 1).padStart(2, "0")}</div>
        <h4 class="process-title">${step.title}</h4>
        <p class="process-desc">${step.desc}</p>`;
      grid.appendChild(card);
    });
  }

  /* ---------------- FAQ ---------------- */
  function renderFAQ(){
    const list = document.getElementById("faq-list");
    if(list.children.length) return;
    SITE_META.faqs.forEach((f, i) => {
      const item = document.createElement("div");
      item.className = "faq-item reveal" + (i === 0 ? " is-open" : "");
      item.innerHTML = `
        <button class="faq-q">
          <span>${f.q}</span>
          <svg class="faq-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>`;
      item.querySelector(".faq-q").addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");
        list.querySelectorAll(".faq-item").forEach(el => el.classList.remove("is-open"));
        if(!wasOpen) item.classList.add("is-open");
      });
      list.appendChild(item);
    });
  }

  /* ---------------- Services ---------------- */
  function renderServices(data){
    document.getElementById("services-title").textContent =
      data.key === "graphic" ? "What I can design for you" : "What I can build for you";
    const grid = document.getElementById("services-grid");
    grid.innerHTML = "";
    data.services.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "service-card reveal";
      card.innerHTML = `<div class="service-num">0${i+1}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
      grid.appendChild(card);
    });
  }

  /* ---------------- Projects (one section per service) ---------------- */
  function renderProjects(data){
    document.getElementById("projects-title").textContent =
      data.key === "graphic" ? "Design work" : "Product work";
    const wrap = document.getElementById("projects-by-category");
    wrap.innerHTML = "";
    data.projectCategories.forEach((cat, i) => {
      const isLink = cat.mode === "link";
      const block = document.createElement("div");
      // Every category (graphic or product) rotates through a 4-theme playful
      // palette instead of a plain binary — cycles automatically as more
      // categories get added later.
      const palette = ["cat-noir", "cat-lavender", "cat-citrus", "cat-violet"];
      const theme = palette[i % palette.length];
      block.className = `project-category reveal ${theme}`.trim();
      block.innerHTML = `
        <div class="project-category-head">
          <h3>${cat.name}</h3>
          ${cat.desc ? `<p>${cat.desc}</p>` : ""}
        </div>
        <div class="project-grid"></div>`;
      const grid = block.querySelector(".project-grid");
      // In the "Product work" section, hide every card's title/tag/bio text —
      // hover (or tap) should reveal just the "View Project" button, same as
      // the minimal "simple" cards.
      const forceMinimal = data.key === "product";
      cat.projects.forEach(p => {
        const card = document.createElement("div");
        card.className = `project-card${p.big ? " project-card--big" : ""}`;
        const hasMedia = !!(p.embed || p.video || p.img);
        const thumbInner = p.embed
          ? `<iframe src="${p.embed}" loading="lazy" frameborder="0" allow="clipboard-write" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`
          : p.video
          ? `<video src="${p.video}" muted loop autoplay playsinline preload="metadata"></video>`
          : p.img
          ? `<img src="${p.img}" alt="${p.title}" loading="lazy">`
          : `<span class="thumb-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="2"></rect><line x1="3" y1="8.5" x2="21" y2="8.5"></line><circle cx="6.2" cy="6.5" r=".55" fill="currentColor" stroke="none"></circle><circle cx="8.6" cy="6.5" r=".55" fill="currentColor" stroke="none"></circle></svg>
            </span>`;
        // Simple cards (banners/posters where the title is already baked
        // into the image itself) skip the title/tag text on hover so it
        // doesn't visually double up with text already inside the artwork —
        // just a quiet darken + a button.
        card.innerHTML = (p.simple || forceMinimal)
          ? `
          <div class="project-thumb${hasMedia ? "" : " is-placeholder"}">${thumbInner}</div>
          <div class="project-body project-body--minimal">
            <button type="button" class="btn project-card-btn ${isLink ? "btn-outline" : "btn-primary"}">
              View Project
            </button>
          </div>`
          : `
          <div class="project-thumb${hasMedia ? "" : " is-placeholder"}">${thumbInner}</div>
          <div class="project-body">
            <h4>${p.title}</h4>
            <span class="project-tag">${p.tag}</span>
            ${p.bio ? `<p class="project-bio">${p.bio}</p>` : ""}
            <button type="button" class="btn project-card-btn ${isLink ? "btn-outline" : "btn-primary"}">
              View Project
            </button>
          </div>`;
        const go = () => isLink ? openProjectLink(p) : (p.simple && p.img ? openPhotoViewer(p) : openLightbox(p));
        // Desktop/mouse: hover already reveals the overlay (CSS), so a click
        // anywhere on the card can go straight to the project.
        // Touch devices have no hover, so the first tap only reveals the
        // overlay; a second tap (or the button itself) opens the project.
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        card.addEventListener("click", (e) => {
          if(canHover){ go(); return; }
          if(card.classList.contains("is-revealed")){ go(); }
          else{
            document.querySelectorAll(".project-card.is-revealed").forEach(c => { if(c !== card) c.classList.remove("is-revealed"); });
            card.classList.add("is-revealed");
          }
        });
        card.querySelector(".project-card-btn").addEventListener("click", (e) => { e.stopPropagation(); go(); });
        grid.appendChild(card);
      });
      wrap.appendChild(block);
    });
    gsap.fromTo(wrap.querySelectorAll(".project-card"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .04, ease: "power2.out" });
  }

  function openProjectLink(p){
    const url = p.link && p.link !== "#" ? p.link : null;
    if(url){ window.open(url, "_blank", "noopener"); }
    else{ window.open("#projects", "_self"); }
  }

  function openLightbox(p){
    document.getElementById("lightbox-title").textContent = p.title;
    document.getElementById("lightbox-thumb-mark").textContent = p.title.slice(0,2).toUpperCase();

    const lbThumb = document.getElementById("lightbox-thumb");
    const existingImg = lbThumb.querySelector("img.lightbox-thumb-img");
    if(existingImg) existingImg.remove();
    const existingVid = lbThumb.querySelector("video.lightbox-thumb-vid");
    if(existingVid) existingVid.remove();
    if(p.img){
      const img = document.createElement("img");
      img.className = "lightbox-thumb-img";
      img.src = p.img;
      img.alt = p.title;
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openPhotoViewer({ img: p.img, title: p.title }));
      lbThumb.appendChild(img);
      document.getElementById("lightbox-thumb-mark").style.display = "none";
    } else if(p.video){
      const vid = document.createElement("video");
      vid.className = "lightbox-thumb-vid";
      vid.src = p.video;
      vid.controls = true;
      vid.playsInline = true;
      vid.preload = "metadata";
      lbThumb.appendChild(vid);
      document.getElementById("lightbox-thumb-mark").style.display = "none";
    } else {
      document.getElementById("lightbox-thumb-mark").style.display = "";
    }

    // "simple" projects show only the image + name in the popup — no tag,
    // bio, role, overview, tools or gallery.
    const tagEl = document.getElementById("lightbox-tag");
    const bioEl = document.getElementById("lightbox-bio");
    const roleWrap = document.getElementById("lightbox-role-wrap");
    const roleEl = document.getElementById("lightbox-role");
    const overviewEl = document.getElementById("lightbox-overview");
    const toolsWrap = document.getElementById("lightbox-tools");
    const galleryWrap = document.getElementById("lightbox-gallery");

    if(p.simple){
      tagEl.textContent = ""; tagEl.style.display = "none";
      bioEl.textContent = ""; bioEl.style.display = "none";
      roleWrap.style.display = "none";
      overviewEl.textContent = ""; overviewEl.style.display = "none";
      toolsWrap.innerHTML = ""; toolsWrap.style.display = "none";
      galleryWrap.innerHTML = ""; galleryWrap.classList.remove("has-items");
    } else {
      tagEl.style.display = ""; tagEl.textContent = p.tag;
      bioEl.style.display = ""; bioEl.textContent = p.bio || "";

      if(p.role){ roleEl.textContent = p.role; roleWrap.style.display = "flex"; }
      else { roleWrap.style.display = "none"; }

      overviewEl.style.display = "";
      overviewEl.textContent =
        p.overview || "This is a placeholder case study slot — drop in the real process, visuals and outcomes here.";

      toolsWrap.style.display = "";
      toolsWrap.innerHTML = "";
      (p.tools || []).forEach(t => {
        const chip = document.createElement("span");
        chip.className = "lightbox-tool-chip";
        chip.textContent = t;
        toolsWrap.appendChild(chip);
      });

      galleryWrap.innerHTML = "";
      if(p.gallery && p.gallery.length){
        p.gallery.forEach(g => {
          const item = document.createElement("div");
          item.className = "lightbox-gallery-item" + (g.type === "video" ? " is-video" : "");
          item.innerHTML = g.type === "video"
            ? `<video src="${g.src}" controls playsinline preload="metadata"></video>`
            : `<img src="${g.src}" alt="${p.title}" loading="lazy">`;
          // Clicking a gallery image opens it full-size in the photo viewer.
          // Videos already have native controls, so they're left as-is.
          if(g.type !== "video"){
            item.style.cursor = "zoom-in";
            item.addEventListener("click", () => openPhotoViewer({ img: g.src, title: p.title }));
          }
          galleryWrap.appendChild(item);
        });
        galleryWrap.classList.add("has-items");
      } else {
        galleryWrap.classList.remove("has-items");
      }
    }

    document.getElementById("project-lightbox").classList.add("is-open");
  }
  function closeLightbox(){
    document.getElementById("project-lightbox").classList.remove("is-open");
    document.querySelectorAll("#lightbox-gallery video, #lightbox-thumb video").forEach(v => v.pause());
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("project-lightbox").addEventListener("click", (e) => {
    if(e.target.id === "project-lightbox") closeLightbox();
  });

  /* ---------------- Photo viewer (simple cards: image + optional brief caption) ---------------- */
  function openPhotoViewer(p){
    const img = document.getElementById("photo-viewer-img");
    img.src = p.img;
    img.alt = p.title || "";
    const caption = document.getElementById("photo-viewer-caption");
    if(p.bio){
      caption.innerHTML = `${p.title ? `<span class="photo-viewer-caption-title">${p.title}</span>` : ""}<span class="photo-viewer-caption-text">${p.bio}</span>`;
      caption.classList.add("has-text");
    } else {
      caption.innerHTML = "";
      caption.classList.remove("has-text");
    }
    document.getElementById("photo-viewer").classList.add("is-open");
  }
  function closePhotoViewer(){
    document.getElementById("photo-viewer").classList.remove("is-open");
    document.getElementById("photo-viewer-img").src = "";
  }
  document.getElementById("photo-viewer-close").addEventListener("click", closePhotoViewer);
  document.getElementById("photo-viewer").addEventListener("click", (e) => {
    if(e.target.id === "photo-viewer") closePhotoViewer();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closePhotoViewer();
  });

  /* ---------------- Experience ---------------- */
  function renderExperience(data){
    const tl = document.getElementById("experience-timeline");
    tl.innerHTML = "";
    data.experience.forEach(job => {
      const item = document.createElement("div");
      item.className = "timeline-item timeline-exp reveal";
      item.innerHTML = `
        <span class="timeline-marker" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><path d="M2 13h20"></path></svg>
        </span>
        <div class="timeline-body">
          <h4>${job.role} — ${job.company}</h4>
          <div class="tl-meta">${job.period}</div>
          <p>${job.points.join(" ")}</p>
        </div>`;
      tl.appendChild(item);
    });
  }

  /* ---------------- Testimonials ---------------- */
  function initials(name){
    return name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  }
  function renderTestimonials(){
    const track = document.getElementById("testi-track");
    if(track.children.length) return;
    const STARS = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.6 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>'.repeat(5);
    const cardHTML = (t, i) => {
      const style = STAT_STYLES[i % STAT_STYLES.length];
      return `
        <div class="testi-card">
          <span class="testi-quote-mark">&ldquo;</span>
          <div class="testi-stars">${STARS}</div>
          <p class="quote">${t.quote}</p>
          <div class="testi-person">
            <div class="testi-avatar" style="background:${style.bg};color:${style.fg}">${initials(t.name)}</div>
            <div>
              <div class="testi-name">${t.name}</div>
              <div class="testi-role">${t.company}</div>
            </div>
          </div>
        </div>`;
    };
    // Render the set twice back-to-back so the CSS scroll animation loops seamlessly.
    const set = SITE_META.testimonials.map(cardHTML).join("");
    track.innerHTML = set + set;
  }

  /* ---------------- Reveal-on-scroll ---------------- */
  function runRevealAnimations(){
    // Kill any triggers left over from a previous render pass (role switch)
    // so we don't stack duplicate ScrollTriggers on re-used or new elements.
    ScrollTrigger.getAll().forEach(t => {
      if(t.vars && t.vars.trigger && t.vars.trigger.classList && t.vars.trigger.classList.contains("reveal")){
        t.kill();
      }
    });
    document.querySelectorAll(".reveal").forEach(el => {
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, y: 28 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true }
      });
    });
  }

  function animateBlobsOnce(){
    gsap.to(".blob-1", { y: 40, x: 20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob-2", { y: -30, x: -20, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  /* ---------------- Parallax on mouse ---------------- */
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - .5) * 24;
    const y = (e.clientY / window.innerHeight - .5) * 24;
    gsap.to("#tilt-portrait", { x: x * .6, y: y * .6, duration: .6, ease: "power2.out" });
    gsap.to(".blob-1", { x: x * -.4, duration: .8, ease: "power2.out" });
    gsap.to(".blob-2", { x: x * .4, duration: .8, ease: "power2.out" });
  });

  /* ---------------- Custom cursor ---------------- */
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  window.addEventListener("mousemove", (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: .05 });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: .18, ease: "power2.out" });
  });
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });

  /* ---------------- Ripple buttons ---------------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size/2) + "px";
    ripple.style.top = (e.clientY - rect.top - size/2) + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  /* ---------------- Magnetic buttons ---------------- */
  document.querySelectorAll(".btn-primary, .btn-lime").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width/2;
      const relY = e.clientY - r.top - r.height/2;
      gsap.to(btn, { x: relX * .25, y: relY * .4, duration: .3, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: .4, ease: "elastic.out(1,0.4)" }));
  });

  /* ---------------- Nav: active link + scroll progress + to-top ---------------- */
  const sections = ["tools","services","about","brands","favorite-tools","projects","experience","contact","testimonials","faq"];
  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    document.getElementById("scroll-progress").style.width = pct + "%";

    const toTop = document.getElementById("to-top");
    toTop.classList.toggle("is-visible", doc.scrollTop > 500);
    const circle = toTop.querySelector("circle");
    if(circle) circle.style.strokeDashoffset = 126 - (126 * pct / 100);

    let current = "";
    sections.forEach(id => {
      const el = document.getElementById(id);
      if(el && el.getBoundingClientRect().top < window.innerHeight * .4) current = id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
  document.getElementById("to-top").addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  /* ---------------- Contact form removed — WhatsApp / Email CTAs used instead ---------------- */

  /* ---------------- Command palette (Ctrl/Cmd + K) ---------------- */
  const cmdk = document.getElementById("cmdk");
  const cmdkList = document.getElementById("cmdk-list");
  const cmdkInput = document.getElementById("cmdk-input");
  const cmdItems = [
    {label:"Tools", href:"#tools"}, {label:"Services", href:"#services"}, {label:"About", href:"#about"},
    {label:"My Process", href:"#process"},
    {label:"Brands", href:"#brands"},
    {label:"Favourite Tools", href:"#favorite-tools"}, {label:"Projects", href:"#projects"},
    {label:"Experience", href:"#experience"},
    {label:"Testimonials", href:"#testimonials"}, {label:"FAQ", href:"#faq"}, {label:"Contact", href:"#contact"},
    {label:"Switch to Graphic Designer", action: () => switchRole("graphic")},
    {label:"Switch to Product Designer", action: () => switchRole("product")},
    {label:"Toggle dark mode", action: () => themeBtn.click()}
  ];
  function renderCmdk(filter=""){
    cmdkList.innerHTML = "";
    cmdItems.filter(i => i.label.toLowerCase().includes(filter.toLowerCase())).forEach(item => {
      const row = document.createElement("div");
      row.className = "cmdk-item";
      row.innerHTML = `<span>${item.label}</span><span class="cmdk-enter"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 5v6a2 2 0 0 1-2 2H6M10 9l-4 4 4 4"></path></svg></span>`;
      row.addEventListener("click", () => {
        if(item.href) window.location.hash = item.href;
        if(item.action) item.action();
        closeCmdk();
      });
      cmdkList.appendChild(row);
    });
  }
  function openCmdk(){ cmdk.classList.add("is-open"); cmdkInput.value=""; renderCmdk(); cmdkInput.focus(); }
  function closeCmdk(){ cmdk.classList.remove("is-open"); }
  document.addEventListener("keydown", (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"){ e.preventDefault(); openCmdk(); }
    if(e.key === "Escape") closeCmdk();
  });
  cmdkInput.addEventListener("input", (e) => renderCmdk(e.target.value));
  const navCmdkHint = document.getElementById("nav-cmdk-hint");
  if(navCmdkHint){ navCmdkHint.addEventListener("click", openCmdk); }
  cmdk.addEventListener("click", (e) => { if(e.target.id === "cmdk") closeCmdk(); });

  /* ---------------- Easter egg: type "bittu" ---------------- */
  let typedBuffer = "";
  document.addEventListener("keydown", (e) => {
    if(e.metaKey || e.ctrlKey) return;
    typedBuffer = (typedBuffer + e.key).slice(-5).toLowerCase();
    if(typedBuffer === "bittu"){
      gsap.fromTo("body", { filter: "hue-rotate(0deg)" }, {
        filter: "hue-rotate(360deg)", duration: 1.2, ease: "power2.inOut",
        onComplete: () => document.body.style.filter = ""
      });
      const sparkleSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"></path></svg>';
      const burst = document.createElement("div");
      burst.innerHTML = `${sparkleSvg}<span>Hey, that's me!</span>${sparkleSvg}`;
      burst.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;font-family:'Space Grotesk';font-size:28px;font-weight:700;color:var(--purple);background:var(--white);padding:20px 32px;border-radius:99px;box-shadow:0 20px 50px rgba(0,0,0,0.2);display:flex;align-items:center;gap:12px;";
      document.body.appendChild(burst);
      gsap.fromTo(burst, {opacity:0, scale:.6}, {opacity:1, scale:1, duration:.4, ease:"back.out(2)"});
      setTimeout(() => gsap.to(burst, {opacity:0, scale:.6, duration:.4, onComplete:() => burst.remove()}), 1800);
    }
  });

  /* ---------------- Mobile nav burger ---------------- */
  const navLinksEl = document.querySelector(".nav-links");
  const navBurgerEl = document.getElementById("nav-burger");
  navBurgerEl.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinksEl.classList.toggle("is-mobile-open");
  });
  navLinksEl.addEventListener("click", (e) => {
    if(e.target.tagName === "A") navLinksEl.classList.remove("is-mobile-open");
  });
  document.addEventListener("click", (e) => {
    if(navLinksEl.classList.contains("is-mobile-open") &&
       !navLinksEl.contains(e.target) && e.target !== navBurgerEl && !navBurgerEl.contains(e.target)){
      navLinksEl.classList.remove("is-mobile-open");
    }
  });
  window.addEventListener("resize", () => {
    if(window.innerWidth > 980) navLinksEl.classList.remove("is-mobile-open");
  });
  let heroTagsResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(heroTagsResizeTimer);
    heroTagsResizeTimer = setTimeout(() => {
      const data = PORTFOLIO_DATA[currentRole || "graphic"];
      if(data && data.heroTags) renderFloatingTags(data.heroTags);
    }, 250);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

})();
