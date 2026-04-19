(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    gsap.from('.contact-heading', {
      scrollTrigger: { trigger: '.contact-main', start: 'top 82%' },
      opacity: 0, y: 28, duration: 0.7, ease: 'power3.out'
    });

    gsap.from('.contact-card', {
      scrollTrigger: { trigger: '.contact-cards', start: 'top 80%' },
      opacity: 0, y: 32, duration: 0.6, stagger: 0.12, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
