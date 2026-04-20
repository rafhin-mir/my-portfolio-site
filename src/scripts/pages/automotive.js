(function () {
  gsap.registerPlugin(ScrollTrigger);

  function init() {
    // Hero entrance
    var tl = gsap.timeline({ delay: 1.0 });
    tl.from('.auto-eyebrow',     { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' })
      .from('.auto-hero-italic', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .from('.auto-hero-bold',   { opacity: 0, y: 24, duration: 0.65, ease: 'power3.out' }, '-=0.3')
      .from('.auto-scroll-hint', { opacity: 0, duration: 0.5, ease: 'power1.out' }, '-=0.1');

    // Capabilities copy
    gsap.from(['.auto-cap-italic', '.auto-cap-bold'], {
      scrollTrigger: { trigger: '.auto-cap-copy', start: 'top 78%' },
      opacity: 0, y: 22, duration: 0.65, stagger: 0.1, ease: 'power3.out'
    });
    gsap.from('.auto-cap-body', {
      scrollTrigger: { trigger: '.auto-cap-copy', start: 'top 75%' },
      opacity: 0, y: 16, duration: 0.6, delay: 0.2, ease: 'power2.out'
    });
    gsap.from('.auto-cap-list', {
      scrollTrigger: { trigger: '.auto-cap-lists', start: 'top 80%' },
      opacity: 0, y: 14, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    });

    // Video cards stagger
    gsap.from('.auto-video-grid .auto-video-card', {
      scrollTrigger: { trigger: '.auto-video-grid', start: 'top 82%', once: true },
      autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });
    gsap.from('.auto-video-stack .auto-video-card', {
      scrollTrigger: { trigger: '.auto-video-stack', start: 'top 82%', once: true },
      autoAlpha: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });

    // Photo masonry
    gsap.from('.auto-masonry-item', {
      scrollTrigger: { trigger: '.auto-masonry', start: 'top 80%' },
      opacity: 0, y: 24, duration: 0.55, stagger: { each: 0.07, from: 'start' }, ease: 'power2.out'
    });

    // CTA
    gsap.from('.auto-cta-content', {
      scrollTrigger: { trigger: '.auto-cta', start: 'top 80%' },
      opacity: 0, y: 30, duration: 0.75, ease: 'power2.out'
    });
  }

  function initFilmstrip() {
    var wrap = document.querySelector('.auto-filmstrip-wrap');
    if (!wrap) return;
    var loaded = false;

    // Skip videos on very slow connections — show placeholder frames only
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) return;

    // Load unique videos in staggered batches of 3 to avoid network congestion
    var loadObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || loaded) return;
      loaded = true;
      loadObs.disconnect();
      var videos = Array.from(wrap.querySelectorAll('video[data-src]'));
      // Deduplicate by src so identical loop copies share one load
      var seen = {};
      videos.forEach(function (v, i) {
        var s = v.dataset.src;
        var delay = seen[s] !== undefined ? 0 : Math.floor(Object.keys(seen).length / 3) * 200;
        seen[s] = true;
        setTimeout(function () {
          v.src = s;
          v.removeAttribute('data-src');
          v.play().catch(function () {});
        }, delay);
      });
    }, { threshold: 0.05 });

    // Pause all filmstrip videos when scrolled away, resume on return
    var pauseObs = new IntersectionObserver(function (entries) {
      if (!loaded) return;
      var visible = entries[0].isIntersecting;
      wrap.querySelectorAll('video').forEach(function (v) {
        if (visible && v.paused && v.src) v.play().catch(function () {});
        else if (!visible && !v.paused) v.pause();
      });
    }, { threshold: 0 });

    loadObs.observe(wrap);
    pauseObs.observe(wrap);
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
