(function () {
  gsap.registerPlugin(ScrollTrigger);

  // The Vimeo #t= URL fragment trick isn't reliably honored by the bare player
  // embed, so use the official Player SDK to seek once it's actually loaded.
  var wdVideoIframe = document.querySelector('.wd-video[data-start-at]');
  if (wdVideoIframe) {
    var m = wdVideoIframe.getAttribute('data-start-at').match(/(?:(\d+)m)?(?:(\d+(?:\.\d+)?)s)?/);
    var startSeconds = (parseInt(m[1] || 0, 10) * 60) + parseFloat(m[2] || 0);

    if (!window.__vimeoSDKPromise) {
      window.__vimeoSDKPromise = new Promise(function (resolve) {
        var s = document.createElement('script');
        s.src = 'https://player.vimeo.com/api/player.js';
        s.onload = function () { resolve(); };
        document.head.appendChild(s);
      });
    }
    window.__vimeoSDKPromise.then(function () {
      var player = new window.Vimeo.Player(wdVideoIframe);
      player.on('loaded', function () {
        player.setCurrentTime(startSeconds).catch(function () {});
      });
    });
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
