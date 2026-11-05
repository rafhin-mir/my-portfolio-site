const loader      = document.getElementById('pageLoader');
const pageContent = document.getElementById('pageContent');

const loaderVariant = loader ? loader.dataset.variant : 'default';

// The full logo intro only plays once per session. Later same-session
// navigations rely on the cross-document view-transition blur instead.
// A manual refresh always replays it.
const navEntry = performance.getEntriesByType('navigation')[0];
const isReload = navEntry && navEntry.type === 'reload';
const introAlreadyPlayed = !isReload && loaderVariant === 'default' && sessionStorage.getItem('rv-intro-played');

if (loader && introAlreadyPlayed) {
  loader.remove();
} else {
  if (loader && loaderVariant === 'default') sessionStorage.setItem('rv-intro-played', '1');

  const loaderDelay = loaderVariant === 'contact' ? 1100 : 1000;

  setTimeout(() => {
    loader.classList.add('hidden');
  }, loaderDelay);

  setTimeout(() => loader.remove(), loaderDelay + 1000);
}

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    document.querySelectorAll('video').forEach(function (v) {
      if (v.paused) v.play().catch(function () {});
    });
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section, header, main, footer, .divider, .brands-section, .mission-section').forEach(el => {
  if (el.getBoundingClientRect().top > window.innerHeight) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  }
});
