(function () {
  gsap.registerPlugin(ScrollTrigger);

  // Let loader.js handle #pageContent fade-in, then run our animations
  function init() {
    // ── Hero entrance (fires after loader fades in ~900ms)
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.hero-stripe',    { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.out' })
      .from('.hero-italic',    { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' }, '-=0.2')
      .from('.hero-bold-main', { opacity: 0, y: 22, duration: 0.6,  ease: 'power3.out' }, '-=0.3')
      .from('.hero-carousel',  { opacity: 0, x: 40, duration: 0.75, ease: 'power2.out' }, '-=0.4')
      .from('.scroll-hint',    { opacity: 0, duration: 0.5, ease: 'power1.out' }, '-=0.1');

    // ── Mission
    gsap.from('.mission-text', {
      scrollTrigger: { trigger: '.mission-section', start: 'top 80%' },
      opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
    });
    gsap.from('.mission-section .btn-ghost', {
      scrollTrigger: { trigger: '.mission-section', start: 'top 75%' },
      opacity: 0, y: 16, duration: 0.6, delay: 0.25, ease: 'power2.out'
    });

    // ── Creations header
    gsap.from('.creations-eyebrow', {
      scrollTrigger: { trigger: '.creations-header', start: 'top 82%' },
      opacity: 0, y: 14, duration: 0.5, ease: 'power2.out'
    });
    gsap.from(['.creations-italic', '.creations-title'], {
      scrollTrigger: { trigger: '.creations-header', start: 'top 80%' },
      opacity: 0, y: 22, duration: 0.65, stagger: 0.08, ease: 'power3.out'
    });

    // ── Creation cards stagger
    gsap.from('.creation-card', {
      scrollTrigger: { trigger: '.creations-stack', start: 'top 78%' },
      opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power2.out'
    });

    // ── Brands
    gsap.from('.brands-eyebrow', {
      scrollTrigger: { trigger: '.brands-section', start: 'top 82%' },
      opacity: 0, y: 14, duration: 0.5, ease: 'power2.out'
    });
    gsap.from('.brand-item', {
      scrollTrigger: { trigger: '.brands-grid', start: 'top 80%' },
      opacity: 0, y: 10, duration: 0.5, stagger: { each: 0.04, from: 'start' }, ease: 'power1.out'
    });

    // ── Expertise
    gsap.from(['.exp-italic-heading', '.exp-bold-heading'], {
      scrollTrigger: { trigger: '.exp-header', start: 'top 82%' },
      opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: 'power2.out'
    });
    gsap.from('.exp-photo', {
      scrollTrigger: { trigger: '.exp-layout', start: 'top 78%' },
      opacity: 0, x: -40, duration: 0.8, ease: 'power2.out'
    });
    gsap.from('.exp-list-item', {
      scrollTrigger: { trigger: '.exp-layout', start: 'top 75%' },
      opacity: 0, x: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out'
    });

    // ── CTA parallax
    gsap.to('.cta-bg-img img', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: 40,
      ease: 'none'
    });
    gsap.from('.cta-inner', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      opacity: 0, y: 28, duration: 0.75, ease: 'power2.out'
    });
  }

  // ── Carousel card hover (rect-based for reliable 3D hit-testing)
  function initCarouselHover() {
    var cards = Array.from(document.querySelectorAll('.carousel-card'));
    var carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    carousel.addEventListener('mousemove', function (e) {
      var mx = e.clientX, my = e.clientY;
      var best = null, bestArea = 0;
      cards.forEach(function (card) {
        var r = card.getBoundingClientRect();
        if (mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom) {
          var area = r.width * r.height;
          if (area > bestArea) { bestArea = area; best = card; }
        }
      });
      cards.forEach(function (card) {
        card.classList.toggle('is-hovered', card === best);
      });
    });

    carousel.addEventListener('mouseleave', function () {
      cards.forEach(function (card) { card.classList.remove('is-hovered'); });
    });
  }

  // Wait for loader to finish before registering ScrollTrigger animations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initCarouselHover(); });
  } else {
    init();
    initCarouselHover();
  }
})();
