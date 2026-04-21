(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.hero-stripe',    { scaleX: 0, transformOrigin: 'left center', duration: 0.35, ease: 'power3.out' })
      .from('.hero-italic',    { opacity: 0, y: 12, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      .from('.hero-bold-main', { opacity: 0, y: 16, duration: 0.32, ease: 'power3.out' }, '-=0.18')
      .from('.hero-carousel',  { opacity: 0, x: 30, duration: 0.4, ease: 'power2.out' }, '-=0.22')
      .from('.scroll-hint',    { opacity: 0, duration: 0.3, ease: 'power1.out' }, '-=0.05');

    var tiltEl = document.querySelector('.carousel-tilt');
    if (tiltEl) {
      gsap.fromTo(tiltEl,
        { rotateX: 35, rotateY: -75, rotateZ: -40 },
        {
          rotateX: 15, rotateY: -8, rotateZ: -8,
          duration: 2.2,
          ease: 'power3.out',
          delay: 1.2,
          onComplete: function () {
            gsap.set(tiltEl, { clearProps: 'transform' });
            tiltEl.style.animationPlayState = 'running';
          }
        }
      );
    }

    gsap.from('.mission-text', {
      scrollTrigger: { trigger: '.mission-section', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.45, ease: 'power2.out'
    });
    gsap.from('.mission-section .btn-ghost', {
      scrollTrigger: { trigger: '.mission-section', start: 'top 75%' },
      opacity: 0, y: 12, duration: 0.35, delay: 0.15, ease: 'power2.out'
    });

    gsap.from('.creations-eyebrow', {
      scrollTrigger: { trigger: '.creations-header', start: 'top 82%' },
      opacity: 0, y: 10, duration: 0.3, ease: 'power2.out'
    });
    gsap.from(['.creations-italic', '.creations-title'], {
      scrollTrigger: { trigger: '.creations-header', start: 'top 80%' },
      opacity: 0, y: 16, duration: 0.38, stagger: 0.07, ease: 'power3.out'
    });

    gsap.from('.creation-card', {
      scrollTrigger: { trigger: '.creations-stack', start: 'top 78%' },
      opacity: 0, y: 28, duration: 0.4, stagger: 0.08, ease: 'power2.out'
    });

    gsap.from('.brands-eyebrow', {
      scrollTrigger: { trigger: '.brands-section', start: 'top 82%' },
      opacity: 0, y: 10, duration: 0.3, ease: 'power2.out'
    });
    gsap.from('.brand-item', {
      scrollTrigger: { trigger: '.brands-grid', start: 'top 80%' },
      opacity: 0, y: 8, duration: 0.3, stagger: { each: 0.03, from: 'start' }, ease: 'power1.out'
    });

    gsap.from(['.exp-italic-heading', '.exp-bold-heading'], {
      scrollTrigger: { trigger: '.exp-header', start: 'top 82%' },
      opacity: 0, y: 14, duration: 0.35, stagger: 0.07, ease: 'power2.out'
    });
    gsap.from('.exp-photo', {
      scrollTrigger: { trigger: '.exp-layout', start: 'top 78%' },
      opacity: 0, x: -30, duration: 0.45, ease: 'power2.out'
    });
    gsap.from('.exp-list-item', {
      scrollTrigger: { trigger: '.exp-layout', start: 'top 75%' },
      opacity: 0, x: 20, duration: 0.35, stagger: 0.07, ease: 'power2.out'
    });

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
      opacity: 0, y: 20, duration: 0.4, ease: 'power2.out'
    });
  }

  function initCarouselHover() {
    var cards = Array.from(document.querySelectorAll('.carousel-card'));
    var carousel = document.querySelector('.hero-carousel');
    if (!carousel || !cards.length) return;

    var active = null;

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
      if (best === active) return;
      if (active) active.classList.remove('is-hovered');
      active = best;
      if (active) active.classList.add('is-hovered');
    });

    carousel.addEventListener('mouseleave', function () {
      if (active) { active.classList.remove('is-hovered'); active = null; }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initCarouselHover(); });
  } else {
    init();
    initCarouselHover();
  }
})();
