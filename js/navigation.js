/* ==========================================================================
   NAVIGATION.JS
   Sticky nav scroll state (on-dark / scrolled), mobile hamburger menu with
   a full-screen overlay, and body-scroll locking while the menu is open.
   ========================================================================== */

function initNavigation(){
  /* ============ NAV SCROLL STATE ============ */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let lockedScrollY = 0;

  function lockBodyScroll(){
    lockedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function unlockBodyScroll(){
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, lockedScrollY);
  }

  navToggle.addEventListener('click', ()=>{
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    if(isOpen){ lockBodyScroll(); } else { unlockBodyScroll(); }
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    unlockBodyScroll();
  }));

  function updateNavTheme(){
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 40);
    // Use the vertical centre of the nav bar itself as the reference point,
    // instead of a hardcoded "-100" fudge factor. That fudge factor made the
    // nav stay in "on-dark" (white text) mode even after it had already
    // scrolled onto a light/cream section, which is why the nav text
    // sometimes turned invisible (white on a light background).
    const navMid = scrollY + (nav.offsetHeight || 0) / 2;
    const heroEl = document.querySelector('.hero');
    const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
    const experienceEl = document.getElementById('experience');
    const eduexpTop = experienceEl.offsetTop;
    const eduexpBottom = eduexpTop + experienceEl.offsetHeight;
    const onDarkSection = (navMid < heroBottom) || (navMid > eduexpTop && navMid < eduexpBottom);
    nav.classList.toggle('on-dark', onDarkSection);
  }
  window.addEventListener('scroll', updateNavTheme);
  window.addEventListener('resize', updateNavTheme);
  updateNavTheme();
}
