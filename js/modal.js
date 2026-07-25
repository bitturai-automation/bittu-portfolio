/* ==========================================================================
   MODAL.JS
   All overlay/modal UI: the services detail modal (Behance embeds, webdev
   showcase, vibe-coded builds, graphic/brand galleries), its fullscreen
   image lightbox, and the hero project-orbit detail modal.
   ========================================================================== */

function initServiceModal(){
  const svcModal = document.getElementById('svcModal');
  const svcModalContent = document.getElementById('svcModalContent');
  let svcScrollTriggers = [];

  function openServiceModal(id){
    const svc = SERVICES.find(s=>s.id===id);
    svcModalContent.innerHTML = buildModalHTML(svc);
    renderIcons();
    svcModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if(window.gsap){
      gsap.fromTo(svcModalContent, {opacity:0, scale:.96, y:16}, {opacity:1, scale:1, y:0, duration:.5, ease:'power3.out'});
    }
    // stagger-reveal whatever cards this modal contains
    requestAnimationFrame(()=>{
      const items = svcModalContent.querySelectorAll('.svc-behance-card,.svc-showcase-card,.svc-vibe-card,.svc-gallery-item');
      items.forEach((el,i)=> setTimeout(()=> el.classList.add('show'), 70*i));
    });
    attachSvcMagnetic();
    attachGalleryLightbox();
  }
  function closeServiceModal(){
    svcModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(()=>{ svcModalContent.innerHTML=''; }, 300);
  }
  document.getElementById('svcModalClose').addEventListener('click', closeServiceModal);
  svcModal.addEventListener('click', e=>{ if(e.target===svcModal) closeServiceModal(); });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape'){
      if(svcLightbox.classList.contains('open')) closeLightbox();
      else if(svcModal.classList.contains('open')) closeServiceModal();
    }
  });

  function buildModalHTML(svc){
    const head = `
      <div class="svc-modal-eyebrow"><span class="line"></span>${svc.title}</div>
      <h3 class="svc-modal-title">${svc.title}</h3>
      <p class="svc-modal-desc">${svc.desc}</p>`;
    if(svc.modal==='behance'){
      return head + `<div class="svc-behance-grid">${
        BEHANCE_PROJECTS.map(url=>`
          <div class="svc-behance-card">
            <iframe src="${url}" allowfullscreen loading="lazy"></iframe>
          </div>`).join('')
      }</div>`;
    }
    if(svc.modal==='showcase'){
      return head + `<div class="svc-showcase-grid">${
        WEBDEV_PROJECTS.map(p=>`
          <div class="svc-showcase-card">
            <div class="svc-showcase-preview" style="background:${p.img?`url(${p.img}) center/cover no-repeat`:p.gradient}">
              ${p.live?`<div class="svc-live-badge"><span class="dot"></span>Live</div>`:''}
            </div>
            <div class="svc-showcase-body">
              <div class="svc-showcase-title">${p.name}</div>
              <p class="svc-showcase-desc">${p.desc}</p>
              <div class="svc-tech-row">${p.tech.map(t=>`<span class="svc-tech-tag">${t}</span>`).join('')}</div>
              <a href="${p.url}" target="_blank" rel="noopener" class="svc-visit-btn magnetic">Visit Website<span class="icon" data-icon="external-link"></span></a>
            </div>
          </div>`).join('')
      }</div>`;
    }
    if(svc.modal==='vibecards'){
      return head + `<div class="svc-vibe-grid">${
        VIBE_PROJECTS.map(p=>`
          <div class="svc-vibe-card">
            <div class="svc-vibe-preview" style="background:${p.img?`url(${p.img}) center/cover no-repeat`:p.gradient}"></div>
            <div class="svc-vibe-body">
              <div class="svc-vibe-title">${p.name}</div>
              <p class="svc-vibe-desc">${p.tagline} ${p.desc}</p>
              <a href="${p.url}" target="_blank" rel="noopener" class="svc-open-btn magnetic">Open Preview<span class="icon" data-icon="arrow-up-right"></span></a>
            </div>
          </div>`).join('')
      }</div>`;
    }
    if(svc.modal==='gallery'){
      const imgs = svc.id==='graphic' ? GRAPHIC_GALLERY : BRAND_GALLERY;
      return head + `<div class="svc-gallery">${
        imgs.map(src=>`
          <div class="svc-gallery-item" data-full="${src}">
            <img src="${src}" alt="${svc.title} sample" loading="lazy">
            <div class="svc-gallery-overlay"><span><span class="icon" data-icon="maximize" style="width:12px;height:12px;"></span>View</span></div>
          </div>`).join('')
      }</div>`;
    }
    return head;
  }

  /* ---- fullscreen image lightbox for galleries ---- */
  const svcLightbox = document.getElementById('svcLightbox');
  const svcLightboxImg = document.getElementById('svcLightboxImg');
  function attachGalleryLightbox(){
    svcModalContent.querySelectorAll('.svc-gallery-item').forEach(item=>{
      item.addEventListener('click', ()=>{
        svcLightboxImg.src = item.dataset.full;
        svcLightboxImg.classList.remove('show');
        svcLightbox.classList.add('open');
        requestAnimationFrame(()=> svcLightboxImg.classList.add('show'));
      });
    });
  }
  function closeLightbox(){ svcLightbox.classList.remove('open'); }
  document.getElementById('svcLightboxClose').addEventListener('click', closeLightbox);
  svcLightbox.addEventListener('click', e=>{ if(e.target===svcLightbox) closeLightbox(); });

  /* ---- magnetic effect for buttons rendered inside modals (created after the page-load magnetic hookup) ---- */
  function attachSvcMagnetic(){
    svcModalContent.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('mousemove', e=>{
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*0.24}px, ${y*0.3}px)`;
      });
      el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
    });
  }

  /* expose for animations.js (service-card click handler) */
  window.openServiceModal = openServiceModal;
}

function initOrbitModal(){
  const orbitModal = document.getElementById('orbitModal');
  const orbitModalCard = document.getElementById('orbitModalCard');

  function openOrbitProject(proj){
    orbitModalCard.innerHTML =
      '<button class="orbit-modal-close" id="orbitModalClose" aria-label="Close"><span class="icon" data-icon="x"></span></button>' +
      '<img class="orbit-modal-img" src="' + proj.img + '" alt="' + proj.title + '">' +
      '<div class="orbit-modal-tag">' + proj.category + ' &middot; ' + proj.year + '</div>' +
      '<div class="orbit-modal-title">' + proj.title + '</div>' +
      '<div class="orbit-modal-meta">' + proj.role + ' &middot; ' + proj.duration + ' &middot; ' + proj.tools + '</div>' +
      '<div class="orbit-modal-section"><h4>Problem</h4><p>' + proj.problem + '</p></div>' +
      '<div class="orbit-modal-section"><h4>Research</h4><p>' + proj.research + '</p></div>' +
      '<div class="orbit-modal-section"><h4>Final Outcome</h4><p>' + proj.final + '</p></div>';
    document.getElementById('orbitModalClose').addEventListener('click', closeOrbitProject);
    orbitModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(orbitModalCard, { opacity: 0, scale: .94, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'power3.out' });
  }
  function closeOrbitProject(){
    orbitModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  orbitModal.addEventListener('click', e => { if (e.target === orbitModal) closeOrbitProject(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && orbitModal.classList.contains('open')) closeOrbitProject(); });

  /* expose for animations.js (hero-orbit node click handler) */
  window.openOrbitProject = openOrbitProject;
}
