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

    gsap.from('.story-photo', {
      scrollTrigger: { trigger: '.story-section', start: 'top 80%' },
      opacity: 0, x: -30, duration: 0.6, ease: 'power2.out'
    });
    gsap.from(['.story-eyebrow', '.story-italic', '.story-heading', '.story-body', '.story-content .btn-ghost'], {
      scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
      opacity: 0, y: 18, duration: 0.45, stagger: 0.06, ease: 'power2.out'
    });

    gsap.from('.brands-eyebrow', {
      scrollTrigger: { trigger: '.brands-section', start: 'top 82%' },
      opacity: 0, y: 10, duration: 0.3, ease: 'power2.out'
    });
    gsap.from('.brand-item', {
      scrollTrigger: { trigger: '.brands-grid', start: 'top 80%' },
      opacity: 0, y: 8, duration: 0.3, stagger: { each: 0.03, from: 'start' }, ease: 'power1.out'
    });

    gsap.from(['.exp-eyebrow', '.exp-italic-heading', '.exp-bold-heading'], {
      scrollTrigger: { trigger: '.exp-header', start: 'top 82%' },
      opacity: 0, y: 14, duration: 0.35, stagger: 0.07, ease: 'power2.out'
    });
    gsap.fromTo('.exp-item',
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.exp-grid', start: 'top 80%' } }
    );

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

  function initShowcaseRail(railId, initialIndex) {
    var rail = document.getElementById(railId);
    if (!rail) return;
    var items = Array.from(rail.querySelectorAll('.showcase-item'));
    var videos = items.map(function (item) { return item.querySelector('.showcase-video'); });
    var activeIndex = initialIndex || 0;
    var hoverTimer = null;
    var loaded = false;

    function playVideo(v) {
      if (!v) return;
      if (v.readyState >= 3) {
        v.play().catch(function () {});
      } else {
        v.addEventListener('canplay', function () { v.play().catch(function () {}); }, { once: true });
      }
    }

    function loadOthers() {
      videos.forEach(function (v, i) {
        if (!v || i === activeIndex) return;
        if (v.getAttribute('preload') === 'none') {
          v.setAttribute('preload', 'metadata');
          v.load();
        }
      });
    }

    function loadActive() {
      if (loaded) return;
      loaded = true;
      var av = videos[activeIndex];
      if (!av) return;
      av.setAttribute('preload', 'auto');
      av.load();
      playVideo(av);
      // Load other panels' metadata once active starts playing
      av.addEventListener('playing', loadOthers, { once: true });
      setTimeout(loadOthers, 2500); // fallback if playing never fires
    }

    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { loadActive(); io.disconnect(); }
      }, { rootMargin: '0px 0px 1000px 0px' });
      io.observe(rail);
    } else {
      loadActive();
    }

    function changeItem(index) {
      if (index === activeIndex) return;
      loadActive();
      videos[activeIndex].pause();
      items[activeIndex].classList.remove('is-active');
      activeIndex = index;
      items[activeIndex].classList.add('is-active');
      var nv = videos[activeIndex];
      if (nv) {
        if (nv.getAttribute('preload') !== 'auto') {
          nv.setAttribute('preload', 'auto');
          nv.load();
        }
        playVideo(nv);
      }
    }

    items.forEach(function (item, i) {
      item.addEventListener('pointerenter', function () {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { changeItem(i); }, 50);
      });
      item.addEventListener('click', function () { changeItem(i); });
    });
  }

  function initClientShowcaseInfinite() {
    if (window.innerWidth > 768) return;
    var rail = document.getElementById('clientShowcaseRail');
    if (!rail) return;

    // Build a track element and move items into it
    var track = document.createElement('div');
    track.className = 'showcase-rail--vert-track';

    var origItems = Array.from(rail.querySelectorAll('.showcase-item'));
    origItems.forEach(function (item) { track.appendChild(item); });
    origItems.forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    rail.appendChild(track);

    var SPEED = 0.3;
    var offset = 0;
    var loopW = 0;
    var isPaused = false;
    var resumeTimer = null;
    var touchLastX = 0;

    function setOffset(x) {
      offset = ((x % loopW) + loopW) % loopW;
      track.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    function tick() {
      if (!isPaused) setOffset(offset + SPEED);
      requestAnimationFrame(tick);
    }

    function start() {
      loopW = track.scrollWidth / 2;
      requestAnimationFrame(tick);
    }

    rail.addEventListener('touchstart', function (e) {
      isPaused = true;
      clearTimeout(resumeTimer);
      touchLastX = e.touches[0].clientX;
    }, { passive: true });

    rail.addEventListener('touchmove', function (e) {
      var dx = touchLastX - e.touches[0].clientX;
      touchLastX = e.touches[0].clientX;
      setOffset(offset + dx);
    }, { passive: true });

    rail.addEventListener('touchend', function () {
      resumeTimer = setTimeout(function () { isPaused = false; }, 2000);
    }, { passive: true });

    rail.addEventListener('touchcancel', function () {
      resumeTimer = setTimeout(function () { isPaused = false; }, 2000);
    }, { passive: true });

    // Start after layout is painted
    setTimeout(start, 100);
  }

  function initShowcase() {
    initShowcaseRail('showcaseRail', 2);
    initShowcaseRail('clientShowcaseRail', 0);
    initClientShowcaseInfinite();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initCarouselHover(); initShowcase(); });
  } else {
    init();
    initCarouselHover();
    initShowcase();
  }
})();
