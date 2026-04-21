(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var sections = document.querySelectorAll('.production-section');

    var firstHeading = sections[0] && sections[0].querySelector('.section-heading-group');
    if (firstHeading) {
      var tl = gsap.timeline({ delay: 1.0 });
      tl.from(firstHeading.querySelectorAll('.section-label, .section-title'), {
        opacity: 0, y: 16, duration: 0.35, stagger: 0.08, ease: 'power3.out'
      });
    }

    Array.from(sections).slice(1).forEach(function (section) {
      var header = section.querySelector('.section-heading-group');
      if (header) {
        gsap.from(header.querySelectorAll('.section-label, .section-title'), {
          scrollTrigger: { trigger: header, start: 'top 82%' },
          opacity: 0, y: 16, duration: 0.35, stagger: 0.08, ease: 'power3.out'
        });
      }
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
