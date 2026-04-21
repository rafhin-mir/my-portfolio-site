(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.work-title', { opacity: 0, y: 20, duration: 0.35, ease: 'power3.out' })
      .from('.filter-btn', { opacity: 0, y: 10, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.1');

    gsap.from('.work-item', {
      scrollTrigger: { trigger: '.work-grid', start: 'top 80%' },
      opacity: 0, y: 28, duration: 0.38, stagger: 0.08, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
