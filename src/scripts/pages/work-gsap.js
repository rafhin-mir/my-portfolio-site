(function () {
  gsap.registerPlugin(ScrollTrigger);

  var VALID_TABS = ['all', 'events', 'weddings', 'cafe', 'ads'];

  function revealPanel(panel) {
    var cards = panel.querySelectorAll('.work-card, .work-text-panel');
    gsap.fromTo(cards,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
    );
  }

  function initVideoCards() {
    var cards = Array.from(document.querySelectorAll('.work-card'));
    cards.forEach(function (card) {
      var v = card.querySelector('video.work-card-video');
      if (!v || v.hasAttribute('autoplay')) return; // autoplay videos manage themselves, see initAutoplayVideos

      card.addEventListener('pointerenter', function () {
        if (v.getAttribute('preload') !== 'auto') {
          v.setAttribute('preload', 'auto');
          v.load();
        }
        v.play().then(function () {
          card.classList.add('is-playing');
        }).catch(function () {});
      });
      card.addEventListener('pointerleave', function () {
        card.classList.remove('is-playing');
        v.pause();
        v.currentTime = 0;
      });
    });
  }

  // Videos meant to always be running (not hover-to-play). Retry play() on
  // loadeddata/canplay same as the Automotive hero, since autoplay can
  // silently fail on a slow first attempt - and re-kick it whenever a tab
  // switch reveals a panel that was previously display:none, since some
  // browsers won't resume an autoplay video on their own once hidden that way.
  function initAutoplayVideos() {
    Array.from(document.querySelectorAll('.work-card-video[autoplay]')).forEach(function (v) {
      var tryPlay = function () {
        if (!v.paused) return;
        var p = v.play();
        if (p !== undefined) p.catch(function () {});
      };
      tryPlay();
      v.addEventListener('loadeddata', tryPlay);
      v.addEventListener('canplay', tryPlay);
    });
  }

  function playAutoplayVideosIn(panel) {
    panel.querySelectorAll('.work-card-video[autoplay]').forEach(function (v) {
      var p = v.play();
      if (p !== undefined) p.catch(function () {});
    });
  }

  function initLightbox() {
    var lb      = document.getElementById('lb');
    var lbImg   = document.getElementById('lbImg');
    var lbClose = document.getElementById('lbClose');
    var lbPrev  = document.getElementById('lbPrev');
    var lbNext  = document.getElementById('lbNext');
    if (!lb) return;

    var imgs = Array.from(document.querySelectorAll('.work-masonry .work-card img'));
    var current = 0;

    function open(idx) {
      current = idx;
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function prev() { open((current - 1 + imgs.length) % imgs.length); }
    function next() { open((current + 1) % imgs.length); }

    imgs.forEach(function (img, i) {
      img.closest('.work-card').addEventListener('click', function () { open(i); });
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    lbNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === document.querySelector('.lb-img-wrap')) close(); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  function initTabs() {
    var tabs = Array.from(document.querySelectorAll('.work-tab'));
    var panels = Array.from(document.querySelectorAll('.work-panel'));
    if (!tabs.length || !panels.length) return;

    function setTab(tab, opts) {
      opts = opts || {};
      if (VALID_TABS.indexOf(tab) === -1) tab = 'all';

      tabs.forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === tab); });

      var activePanel = null;
      panels.forEach(function (p) {
        var isActive = p.dataset.panel === tab;
        p.classList.toggle('is-active', isActive);
        if (isActive) activePanel = p;
      });

      if (activePanel && !opts.skipReveal) revealPanel(activePanel);
      if (activePanel) playAutoplayVideosIn(activePanel);
      if (opts.updateHash) history.replaceState(null, '', tab === 'all' ? '#panel' : '#' + tab);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        setTab(tab.dataset.tab, { updateHash: true });
        document.getElementById('panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    var initial = (location.hash || '').replace('#', '');
    if (VALID_TABS.indexOf(initial) !== -1 && initial !== 'all') {
      setTab(initial, { skipReveal: true });
    }
  }

  function init() {
    // Hero entrance
    var tl = gsap.timeline({ delay: 0.85 });
    tl.from('.work-eyebrow',        { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' })
      .from('.work-stripe',         { scaleX: 0, transformOrigin: 'center center', duration: 0.35, ease: 'power3.out' }, '-=0.1')
      .from('.work-hero-content .work-italic', { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.15')
      .from('.work-hero-title',     { opacity: 0, y: 14, duration: 0.32, ease: 'power3.out' }, '-=0.2')
      .from('.work-hero-actions',   { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' }, '-=0.15')
      .from('.work-scroll-hint',    { opacity: 0, duration: 0.28, ease: 'power1.out' }, '-=0.1');

    // Tab bar
    gsap.from('.work-tab', {
      scrollTrigger: { trigger: '.work-index', start: 'top 90%' },
      opacity: 0, y: 12, duration: 0.35, stagger: 0.05, ease: 'power2.out'
    });

    // Default "All" panel reveals on scroll (independent fromTo per card, same
    // pattern proven on the Automotive page — a single shared stagger tween
    // used to leave cards stuck invisible when the trigger fired out of order)
    var allPanel = document.querySelector('.work-panel[data-panel="all"]');
    if (allPanel) {
      var reveal = function () {
        allPanel.querySelectorAll('.work-card, .work-text-panel').forEach(function (el, i) {
          gsap.fromTo(el,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.4, delay: i * 0.06, ease: 'power2.out' }
          );
        });
      };
      ScrollTrigger.create({ trigger: allPanel, start: 'top 85%', once: true, onEnter: reveal });
    }

    // CTA
    gsap.from('.work-cta-content', {
      scrollTrigger: { trigger: '.work-cta', start: 'top 80%' },
      opacity: 0, y: 20, duration: 0.4, ease: 'power2.out'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initTabs(); initVideoCards(); initAutoplayVideos(); initLightbox(); });
  } else {
    init();
    initTabs();
    initVideoCards();
    initAutoplayVideos();
    initLightbox();
  }
})();
