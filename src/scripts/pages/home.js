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

  function initHeroVideos() {
    var videos = Array.from(document.querySelectorAll('.carousel-card video'));
    if (!videos.length) return;

    // All 10 play at once - that's the intended effect for the 3D carousel. They're
    // expensive to keep decoding once the hero is scrolled out of view though, so
    // pause/resume the whole set based on visibility instead.
    var heroVisible = true;
    var heroSection = document.querySelector('.hero');
    if (heroSection && window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible) {
          videos.forEach(function (v) { if (v.getAttribute('preload') === 'auto') v.play().catch(function () {}); });
        } else {
          videos.forEach(function (v) { v.pause(); });
        }
      }, { threshold: 0 });
      io.observe(heroSection);
    }

    videos.forEach(function (v, i) {
      setTimeout(function () {
        v.setAttribute('preload', 'auto');
        v.load();
        if (heroVisible) v.play().catch(function () {});
      }, i * 180);
    });
  }

  function initCarouselHover() {
    var cards = Array.from(document.querySelectorAll('.carousel-card'));
    var carousel = document.querySelector('.hero-carousel');
    if (!carousel || !cards.length) return;

    var active = null;
    var pendingX = 0;
    var pendingY = 0;
    var rafScheduled = false;

    // The cards are constantly moving (3D spin), so their rects can't be cached -
    // but mousemove can fire far more often than the screen redraws, so without
    // throttling this reflows 10 elements on every single event instead of once
    // per frame.
    function updateHover() {
      rafScheduled = false;
      var best = null, bestArea = 0;
      cards.forEach(function (card) {
        var r = card.getBoundingClientRect();
        if (pendingX >= r.left && pendingX <= r.right && pendingY >= r.top && pendingY <= r.bottom) {
          var area = r.width * r.height;
          if (area > bestArea) { bestArea = area; best = card; }
        }
      });
      if (best === active) return;
      if (active) active.classList.remove('is-hovered');
      active = best;
      if (active) active.classList.add('is-hovered');
    }

    carousel.addEventListener('mousemove', function (e) {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(updateHover);
      }
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
      }, { rootMargin: '0px 0px 400px 0px' });
      io.observe(rail);

      // Once loaded, the active video would otherwise keep decoding forever even after
      // the rail scrolls off-screen — pause it while out of view, resume when it's back.
      var visibilityIO = new IntersectionObserver(function (entries) {
        var av = videos[activeIndex];
        if (!av) return;
        if (entries[0].isIntersecting) {
          if (loaded) playVideo(av);
        } else {
          av.pause();
        }
      }, { threshold: 0 });
      visibilityIO.observe(rail);
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
    var rail = document.getElementById('clientShowcaseRail');
    if (!rail) return;

    // This used to check window.innerWidth once, at load. If the page loaded
    // at desktop width and the viewport was only resized afterward (narrowing
    // the window, rotating a tablet, toggling DevTools device mode without a
    // refresh), the mobile marquee would never initialize - the rail would
    // just sit there as the hover-only accordion with nothing to hover.
    // Re-check on resize instead, and only build the marquee once.
    var started = false;
    function trySetup() {
      if (started || window.innerWidth > 768) return;
      started = true;
      setup();
    }
    trySetup();
    window.addEventListener('resize', trySetup);

    function setup() {
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

      // Smooothy-style drag: real momentum that carries past the finger lifting
      // off and decays smoothly back into the ambient auto-scroll, instead of
      // a hard 1:1 follow that abruptly resumes a constant speed after a pause.
      var AMBIENT_SPEED = 0.3;   // px/frame once settled
      var MAX_FLICK_SPEED = 6;   // px/frame cap so a hard flick doesn't blow past neighbours
      var DECAY = 0.95;          // momentum falloff per frame
      var SETTLE_LERP = 0.06;    // how quickly speed eases back to ambient after momentum dies out
      var MIN_MOMENTUM = 0.02;   // px/frame below which momentum is considered done

      var offset = 0;
      var loopW = 0;
      var speed = AMBIENT_SPEED; // current effective px/frame, signed
      var mode = 'auto';         // 'auto' | 'drag' | 'momentum'
      var touchLastX = 0;
      var touchLastT = 0;
      var velocity = 0;          // smoothed px/ms while dragging

      function setOffset(x) {
        offset = ((x % loopW) + loopW) % loopW;
        track.style.transform = 'translateX(' + (-offset) + 'px)';
      }

      function tick() {
        if (mode === 'auto') {
          speed += (AMBIENT_SPEED - speed) * SETTLE_LERP;
          setOffset(offset + speed);
        } else if (mode === 'momentum') {
          speed *= DECAY;
          setOffset(offset + speed);
          if (Math.abs(speed) < MIN_MOMENTUM) mode = 'auto';
        }
        // 'drag' mode: offset is driven directly by touchmove below, not here
        requestAnimationFrame(tick);
      }

      function start() {
        loopW = track.scrollWidth / 2;
        requestAnimationFrame(tick);
      }

      rail.addEventListener('touchstart', function (e) {
        mode = 'drag';
        velocity = 0;
        touchLastX = e.touches[0].clientX;
        touchLastT = performance.now();
      }, { passive: true });

      rail.addEventListener('touchmove', function (e) {
        var x = e.touches[0].clientX;
        var t = performance.now();
        var dx = touchLastX - x;
        var dt = Math.max(t - touchLastT, 1);
        velocity = velocity * 0.75 + (dx / dt) * 0.25; // low-pass so one noisy sample can't dominate
        touchLastX = x;
        touchLastT = t;
        setOffset(offset + dx);
      }, { passive: true });

      function startMomentum() {
        if (mode !== 'drag') return;
        mode = 'momentum';
        speed = Math.max(-MAX_FLICK_SPEED, Math.min(MAX_FLICK_SPEED, velocity * 16.67));
      }

      rail.addEventListener('touchend', startMomentum, { passive: true });
      rail.addEventListener('touchcancel', startMomentum, { passive: true });

      // Start after layout is painted
      setTimeout(start, 100);
    }
  }

  function initShowcase() {
    initShowcaseRail('showcaseRail', 2);
    initShowcaseRail('clientShowcaseRail', 0);
    initClientShowcaseInfinite();
  }

  // Grab-and-drag the hero 3D carousel: horizontal drag spins the ring with
  // momentum on release (same lerp/decay technique as the brand marquee),
  // vertical drag tilts it within a clamped range and eases back to center
  // when let go. Works for mouse and touch alike via Pointer Events.
  function initCarouselDrag() {
    var wrap = document.getElementById('heroCarousel');
    var track = document.querySelector('.carousel-track');
    var dragLayer = document.querySelector('.carousel-drag');
    if (!wrap || !track || !dragLayer || !window.PointerEvent) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hand the ring's rotation off from the CSS keyframe to JS so dragging can
    // take over seamlessly - same 70s-per-revolution rate, so there's no jump.
    track.style.animation = 'none';

    var AMBIENT_DEG = reduceMotion ? 0 : 360 / 70 / 60; // deg/frame, matches the old CSS rate
    var MAX_FLICK_DEG = 7;       // deg/frame cap so a hard flick doesn't go flying
    var DECAY = 0.97;            // momentum falloff per frame - closer to 1 = keeps coasting longer, like it has mass
    var MIN_MOMENTUM = 0.01;     // deg/frame below which momentum is considered done
    var DRAG_SENSITIVITY = 0.12; // deg of spin per px of horizontal drag - low on purpose, a small nudge shouldn't spin it far
    var TILT_SENSITIVITY = 0.05; // deg of tilt per px of vertical drag
    var TILT_MAX = 16;           // deg, clamp on the vertical tilt
    // Every value below is a *target* - the actual render always eases toward
    // it every frame (Smooothy's lerp/damp technique) instead of snapping to
    // wherever the last pointer event landed, which is what made drag feel
    // steppy: pointermove doesn't fire every frame, so without this the ring
    // only "catches up" in visible jumps. A lower lerp factor also means the
    // render lags further behind the target, which reads as the carousel
    // having weight/inertia rather than being weightless and twitchy.
    var ANGLE_LERP = 0.08;
    var TILT_LERP = 0.07;

    var targetAngle = 0, renderAngle = 0;
    var targetTilt = 0, renderTilt = 0;
    var momentumSpeed = 0;
    var mode = 'auto';        // 'auto' | 'momentum' (dragging drives the target directly)
    var dragging = false;
    // Vertical drag tilts on mouse, but never on touch - touch-action:pan-y
    // reserves vertical gestures for native page scroll, so trying to also
    // read vertical drag there just fights the browser and gets "stuck".
    var allowTilt = false;
    var lastX = 0, lastY = 0, lastT = 0;
    var velocity = 0; // smoothed horizontal deg/ms while dragging

    // All the constants above are tuned per ~16.67ms frame (60fps). rAF
    // doesn't always fire at a steady 60fps though - it dips under load, on a
    // throttled background tab, etc. - and on a 120Hz display it fires twice
    // as often. Applying a fixed per-frame delta made the spin speed drift
    // with whatever frame rate the browser actually achieved ("rotates too
    // slowly sometimes"). Scale every step by real elapsed time instead, so
    // the speed stays constant no matter the frame rate.
    var FRAME_MS = 16.67;
    var lastFrameTime = null;

    function tick(now) {
      var dt = lastFrameTime === null ? FRAME_MS : Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;
      var steps = dt / FRAME_MS;

      if (!dragging) {
        if (mode === 'momentum') {
          momentumSpeed *= Math.pow(DECAY, steps);
          targetAngle += momentumSpeed * steps;
          if (Math.abs(momentumSpeed) < MIN_MOMENTUM) mode = 'auto';
        } else {
          targetAngle += AMBIENT_DEG * steps;
        }
        targetTilt = 0; // ease back to resting center once released
      }

      var angleStep = 1 - Math.pow(1 - ANGLE_LERP, steps);
      var tiltStep = 1 - Math.pow(1 - TILT_LERP, steps);
      renderAngle += (targetAngle - renderAngle) * angleStep;
      renderTilt += (targetTilt - renderTilt) * tiltStep;

      track.style.transform = 'rotateY(' + renderAngle + 'deg)';
      dragLayer.style.transform = 'rotateX(' + renderTilt + 'deg)';

      requestAnimationFrame(tick);
    }

    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true;
      allowTilt = e.pointerType !== 'touch';
      mode = 'auto';
      velocity = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      wrap.classList.add('is-dragging');
    }

    function onMove(e) {
      if (!dragging) return;
      var x = e.clientX, y = e.clientY, t = performance.now();
      var dx = x - lastX, dy = y - lastY;
      var dt = Math.max(t - lastT, 1);

      targetAngle += dx * DRAG_SENSITIVITY;
      velocity = velocity * 0.7 + (dx * DRAG_SENSITIVITY / dt) * 0.3; // low-pass so one noisy sample can't dominate

      if (allowTilt) {
        targetTilt = Math.max(-TILT_MAX, Math.min(TILT_MAX, targetTilt - dy * TILT_SENSITIVITY));
      }

      lastX = x; lastY = y; lastT = t;
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      mode = 'momentum';
      momentumSpeed = Math.max(-MAX_FLICK_DEG, Math.min(MAX_FLICK_DEG, velocity * 16.67));
      wrap.classList.remove('is-dragging');
    }

    wrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    wrap.addEventListener('dragstart', function (e) { e.preventDefault(); });

    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initCarouselHover(); initShowcase(); initHeroVideos(); initCarouselDrag(); });
  } else {
    init();
    initCarouselHover();
    initShowcase();
    initHeroVideos();
    initCarouselDrag();
  }
})();
