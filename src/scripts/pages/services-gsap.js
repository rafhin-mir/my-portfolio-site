(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.services-eyebrow',      { opacity: 0, y: 10, duration: 0.28, ease: 'power2.out' })
      .from('.services-title-italic', { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.1')
      .from('.services-title-bold',   { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.18');

    gsap.from('.svc-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.35, stagger: 0.07, ease: 'power2.out'
    });

    gsap.from('.acc-item', {
      scrollTrigger: { trigger: '.accordion', start: 'top 80%' },
      opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
