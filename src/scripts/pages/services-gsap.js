(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    document.querySelectorAll('.production-section').forEach(function (section) {
      var header = section.querySelector('.section-heading-group');
      if (header) {
        gsap.from(header.querySelectorAll('.section-label, .section-title'), {
          scrollTrigger: { trigger: header, start: 'top 82%' },
          opacity: 0, y: 22, duration: 0.65, stagger: 0.1, ease: 'power3.out'
        });
      }
    });

    gsap.from('.acc-item', {
      scrollTrigger: { trigger: '.accordion', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.55, stagger: 0.08, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
