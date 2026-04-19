const navToggle  = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const navClose   = document.getElementById('navClose');
const overlayLinks = navOverlay.querySelectorAll('.nav-overlay-links li');

gsap.set(overlayLinks, { y: 30, opacity: 0 });

function openMenu() {
  navOverlay.style.pointerEvents = 'all';
  gsap.timeline()
    .to(navOverlay, { opacity: 1, duration: 0.45, ease: 'power2.out' })
    .to(overlayLinks, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.2');
}

function closeMenu() {
  gsap.timeline({ onComplete: () => { navOverlay.style.pointerEvents = 'none'; } })
    .to(overlayLinks, { y: -20, opacity: 0, duration: 0.25, stagger: 0.04, ease: 'power2.in' })
    .to(navOverlay, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '-=0.1');
}

navToggle.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
