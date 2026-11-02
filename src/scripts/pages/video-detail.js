(function () {
  gsap.registerPlugin(ScrollTrigger);

  // The Vimeo #t= URL fragment trick isn't reliably honored by the bare player
  // embed, so use the official Player SDK to seek once it's actually loaded.
  var wdVideoIframe = document.getElementById('wdVideo');
  var wdVideoWrap    = document.getElementById('wdVideoWrap');
  var wdVideoFallback = document.getElementById('wdVideoFallback');
  var wdVideoRetry    = document.getElementById('wdVideoRetry');
  var wdVideoLoading  = document.getElementById('wdVideoLoading');

  if (wdVideoIframe && wdVideoWrap) {
    var startAtAttr = wdVideoIframe.getAttribute('data-start-at');
    var originalSrc = wdVideoIframe.src;
    var failTimer    = null;

    function getVimeoSDK() {
      if (!window.__vimeoSDKPromise) {
        window.__vimeoSDKPromise = new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.src = 'https://player.vimeo.com/api/player.js';
          s.onload = function () { resolve(); };
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      return window.__vimeoSDKPromise;
    }

    function hideLoading() {
      if (wdVideoLoading) wdVideoLoading.classList.add('is-hidden');
    }

    function showFallback() {
      clearTimeout(failTimer);
      hideLoading();
      wdVideoWrap.classList.add('is-errored');
    }

    function hideFallback() {
      clearTimeout(failTimer);
      wdVideoWrap.classList.remove('is-errored');
    }

    function attachPlayer() {
      if (wdVideoLoading) wdVideoLoading.classList.remove('is-hidden');

      // If the SDK itself can't load (blocked, offline), there's nothing left to
      // wait on - the iframe content is unreachable either way.
      getVimeoSDK().then(function () {
        var player = new window.Vimeo.Player(wdVideoIframe);

        failTimer = setTimeout(showFallback, 8000);

        player.on('loaded', function () {
          clearTimeout(failTimer);
          hideLoading();
          hideFallback();
          if (startAtAttr) {
            var m = startAtAttr.match(/(?:(\d+)m)?(?:(\d+(?:\.\d+)?)s)?/);
            var startSeconds = (parseInt(m[1] || 0, 10) * 60) + parseFloat(m[2] || 0);
            player.setCurrentTime(startSeconds).catch(function () {});
          }
        });
        player.on('error', showFallback);
      }, showFallback);
    }

    attachPlayer();

    if (wdVideoRetry) {
      wdVideoRetry.addEventListener('click', function () {
        hideFallback();
        // Force a real reload rather than relying on a no-op same-src assignment.
        wdVideoIframe.src = originalSrc + (originalSrc.indexOf('?') > -1 ? '&' : '?') + '_retry=' + Date.now();
        attachPlayer();
      });
    }
  }

  // The template renders every other video in the collection - pick a random
  // subset here so the "more work" picks are different on every page load,
  // and drop the rest before GSAP ever sees them.
  var moreGrid = document.querySelector('.wd-more-grid');
  if (moreGrid) {
    var items = Array.from(moreGrid.children);
    var count = parseInt(moreGrid.getAttribute('data-shuffle-count'), 10) || 4;
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i]; items[i] = items[j]; items[j] = tmp;
    }
    items.slice(0, count).forEach(function (item) { moreGrid.appendChild(item); });
    items.slice(count).forEach(function (item) { item.remove(); });
  }

  gsap.from('.wd-back', { opacity: 0, y: -8, duration: 0.4, ease: 'power2.out', delay: 0.2 });
  gsap.from('.wd-video-wrap', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', delay: 0.3 });
  gsap.from('.wd-info > *', { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.5 });

  gsap.from('.wd-more-item', {
    scrollTrigger: { trigger: '.wd-more', start: 'top 85%' },
    opacity: 0, y: 20, duration: 0.4, stagger: 0.06, ease: 'power2.out'
  });
})();
