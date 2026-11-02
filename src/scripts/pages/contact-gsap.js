(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.contact-heading', { opacity: 0, y: 20, duration: 0.35, ease: 'power3.out' })
      .from(['.field', '.form-submit-row', '.contact-divider-label', '.contact-card'],
        { opacity: 0, y: 18, duration: 0.32, ease: 'power2.out' }, '-=0.12');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
