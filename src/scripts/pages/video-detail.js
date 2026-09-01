(function () {
  gsap.from('.wd-back', { opacity: 0, y: -8, duration: 0.4, ease: 'power2.out', delay: 0.2 });
  gsap.from('.wd-video-wrap', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', delay: 0.3 });
  gsap.from('.wd-info > *', { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.5 });
})();
