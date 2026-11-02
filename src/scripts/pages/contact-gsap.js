(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.contact-heading', { opacity: 0, y: 20, duration: 0.35, ease: 'power3.out' })
      .from('.field',           { opacity: 0, y: 18, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.12')
      .from('.form-submit-row', { opacity: 0, y: 18, duration: 0.3, ease: 'power2.out' }, '-=0.14')
      .from('.contact-divider-label', { opacity: 0, duration: 0.25, ease: 'power1.out' }, '-=0.1')
      .from('.contact-card',    { opacity: 0, y: 22, duration: 0.32, stagger: 0.08, ease: 'power2.out' }, '-=0.1');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
