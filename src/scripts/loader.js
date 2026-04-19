const loader      = document.getElementById('pageLoader');
const pageContent = document.getElementById('pageContent');

setTimeout(() => {
  loader.classList.add('hidden');
  pageContent.style.opacity = '1';
}, 900);

setTimeout(() => loader.remove(), 2100);

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
