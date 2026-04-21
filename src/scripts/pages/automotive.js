(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    // Hero entrance
    gsap.from('.auto-hero', { opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.85 });

    var tl = gsap.timeline({ delay: 1.1 });
    tl.from('.auto-eyebrow',     { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' })
      .from('.auto-stripe',      { scaleX: 0, transformOrigin: 'center center', duration: 0.35, ease: 'power3.out' }, '-=0.1')
      .from('.auto-hero-italic', { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.15')
      .from('.auto-scroll-hint', { opacity: 0, duration: 0.28, ease: 'power1.out' }, '-=0.05');

    // Capabilities copy
    gsap.from(['.auto-cap-italic', '.auto-cap-bold'], {
      scrollTrigger: { trigger: '.auto-cap-copy', start: 'top 78%' },
      opacity: 0, y: 16, duration: 0.38, stagger: 0.08, ease: 'power3.out'
    });
    gsap.from('.auto-cap-body', {
      scrollTrigger: { trigger: '.auto-cap-copy', start: 'top 75%' },
      opacity: 0, y: 12, duration: 0.35, delay: 0.12, ease: 'power2.out'
    });
    gsap.from('.auto-cap-list', {
      scrollTrigger: { trigger: '.auto-cap-lists', start: 'top 80%' },
      opacity: 0, y: 10, duration: 0.3, stagger: 0.07, ease: 'power2.out'
    });

    // Video cards stagger
    gsap.from('.auto-video-grid .auto-video-card', {
      scrollTrigger: { trigger: '.auto-video-grid', start: 'top 82%', once: true },
      autoAlpha: 0, y: 28, duration: 0.4, stagger: 0.08, ease: 'power2.out'
    });
    gsap.from('.auto-video-stack .auto-video-card', {
      scrollTrigger: { trigger: '.auto-video-stack', start: 'top 82%', once: true },
      autoAlpha: 0, y: 22, duration: 0.4, stagger: 0.08, ease: 'power2.out'
    });

    // Photo masonry
    gsap.from('.auto-masonry-item', {
      scrollTrigger: { trigger: '.auto-masonry', start: 'top 80%' },
      opacity: 0, y: 18, duration: 0.35, stagger: { each: 0.05, from: 'start' }, ease: 'power2.out'
    });

    // CTA
    gsap.from('.auto-cta-content', {
      scrollTrigger: { trigger: '.auto-cta', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.4, ease: 'power2.out'
    });
  }

  function initFilmstrip() {
    var wrap = document.querySelector('.auto-filmstrip-wrap');
    if (!wrap) return;

    // Skip on very slow connections
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) return;

    var loaded = false;

    // Clone column structure immediately so -50% translateY is calculated correctly.
    // Video clones start empty and get their src filled after originals load.
    function cloneStructure() {
      wrap.querySelectorAll('.auto-strip-col').forEach(function (col) {
        Array.from(col.querySelectorAll('.auto-frame')).forEach(function (frame) {
          var clone = frame.cloneNode(true);
          var cloneVid = clone.querySelector('video');
          if (cloneVid) {
            cloneVid.removeAttribute('data-src');
            cloneVid.removeAttribute('src');
          }
          col.appendChild(clone);
        });
      });
    }

    // After originals are playing, fill cloned videos using captureStream (Chrome/Firefox)
    // or same src via browser cache (Safari).
    function fillClones() {
      wrap.querySelectorAll('.auto-strip-col').forEach(function (col) {
        var originals = Array.from(col.querySelectorAll('.auto-frame video[src]'));
        var clones = Array.from(col.querySelectorAll('.auto-frame video:not([src])'));
        originals.forEach(function (orig, i) {
          var clone = clones[i];
          if (!clone) return;
          if (typeof orig.captureStream === 'function') {
            clone.srcObject = orig.captureStream();
          } else {
            clone.src = orig.src;
          }
          clone.muted = true;
          clone.play().catch(function () {});
        });
      });
    }

    // Clone structure immediately, then load + fill on scroll into view
    cloneStructure();

    var loadObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || loaded) return;
      loaded = true;
      loadObs.disconnect();
      var videos = Array.from(wrap.querySelectorAll('video[data-src]'));
      videos.forEach(function (v) {
        v.src = v.dataset.src;
        v.removeAttribute('data-src');
        v.play().catch(function () {});
      });
      setTimeout(fillClones, 400);
    }, { threshold: 0.05 });

    // Pause entire filmstrip when off-screen
    var sectionObs = new IntersectionObserver(function (entries) {
      if (!loaded) return;
      var visible = entries[0].isIntersecting;
      wrap.querySelectorAll('video').forEach(function (v) {
        if (visible && v.paused && v.src) v.play().catch(function () {});
        else if (!visible && !v.paused) v.pause();
      });
    }, { threshold: 0 });

    // Per-video observer within the filmstrip — pause videos hidden by overflow
    var perVideoObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (!v.src) return;
        if (e.isIntersecting && v.paused) v.play().catch(function () {});
        else if (!e.isIntersecting && !v.paused) v.pause();
      });
    }, { root: wrap, threshold: 0, rootMargin: '100px 0px' });

    loadObs.observe(wrap);
    sectionObs.observe(wrap);

    // Attach per-video observer after load
    var attachPerVideo = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || !loaded) return;
      wrap.querySelectorAll('video').forEach(function (v) { perVideoObs.observe(v); });
      attachPerVideo.disconnect();
    }, { threshold: 0 });
    attachPerVideo.observe(wrap);
  }

  function initHeroVideo() {
    var v = document.querySelector('.auto-hero-video');
    if (!v) return;
    v.muted = true;
    v.setAttribute('muted', '');
    if (v.paused) {
      var p = v.play();
      if (p !== undefined) p.catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initHeroVideo(); initFilmstrip(); });
  } else {
    init();
    initHeroVideo();
    initFilmstrip();
  }
})();
