(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    // Hero entrance
    gsap.from('.abt-intro', { opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.85 });

    var tl = gsap.timeline({ delay: 1.1 });
    tl.from('.abt-eyebrow',          { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' })
      .from('.abt-stripe',           { scaleX: 0, transformOrigin: 'left center', duration: 0.35, ease: 'power3.out' }, '-=0.1')
      .from('.abt-heading-italic',   { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.15')
      .from('.abt-heading-bold',     { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.2')
      .from('.abt-bio',              { opacity: 0, y: 12, duration: 0.35, ease: 'power2.out' }, '-=0.1')
      .from('.abt-photo-wrap',       { opacity: 0, x: -30, duration: 0.45, ease: 'power2.out' }, '-=0.55');

    // Location
    gsap.from(['.abt-location .abt-eyebrow', '.abt-location-city'], {
      scrollTrigger: { trigger: '.abt-location', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.38, stagger: 0.1, ease: 'power3.out'
    });

    // CTA
    gsap.from('.abt-cta-content', {
      scrollTrigger: { trigger: '.abt-cta', start: 'top 80%' },
      opacity: 0, y: 24, duration: 0.4, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
