const siteNav    = document.querySelector('.site-nav');
const navToggle  = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const overlayLinks = navOverlay.querySelectorAll('.nav-overlay-links li');
const overlayFocusable = navOverlay.querySelectorAll('a, button');

// Closed by default: removes the overlay's links from the tab order and
// accessibility tree entirely, instead of only hiding them visually.
navOverlay.inert = true;

function updateNavScrollState() {
  siteNav.classList.toggle('is-scrolled', window.scrollY > 80);
}
updateNavScrollState();
window.addEventListener('scroll', updateNavScrollState, { passive: true });

gsap.set(overlayLinks, { y: 30, opacity: 0 });

function openMenu() {
  navOverlay.inert = false;
  navOverlay.style.pointerEvents = 'all';
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  gsap.timeline()
    .to(navOverlay, { opacity: 1, duration: 0.45, ease: 'power2.out' })
    .to(overlayLinks, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.2');
}

function closeMenu() {
  navOverlay.inert = true;
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  gsap.timeline({ onComplete: () => { navOverlay.style.pointerEvents = 'none'; } })
    .to(overlayLinks, { y: -20, opacity: 0, duration: 0.25, stagger: 0.04, ease: 'power2.in' })
    .to(navOverlay, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '-=0.1');
  navToggle.focus();
}

navToggle.addEventListener('click', function () {
  if (navToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  } else {
    openMenu();
  }
});
navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', function (e) {
  if (navToggle.getAttribute('aria-expanded') !== 'true') return;

  if (e.key === 'Escape') {
    closeMenu();
    return;
  }

  if (e.key === 'Tab' && overlayFocusable.length) {
    var first = overlayFocusable[0];
    var last  = overlayFocusable[overlayFocusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
