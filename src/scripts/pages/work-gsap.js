(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    gsap.from(['.work-header .section-label', '.work-header .section-title'], {
      scrollTrigger: { trigger: '.work-header', start: 'top 82%' },
      opacity: 0, y: 22, duration: 0.65, stagger: 0.1, ease: 'power3.out'
    });

    gsap.from('.filter-btn', {
      scrollTrigger: { trigger: '.work-filters', start: 'top 85%' },
      opacity: 0, y: 10, duration: 0.45, stagger: 0.06, ease: 'power2.out'
    });

    gsap.from('.work-item', {
      scrollTrigger: { trigger: '.work-grid', start: 'top 80%' },
      opacity: 0, y: 36, duration: 0.65, stagger: 0.1, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
