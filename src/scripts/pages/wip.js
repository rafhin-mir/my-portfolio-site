(function () {
  var tiltEl = document.querySelector('.carousel-tilt');
  if (tiltEl) {
    gsap.fromTo(tiltEl,
      { rotateX: 35, rotateY: -75, rotateZ: -40 },
      {
        rotateX: 15, rotateY: -8, rotateZ: -8,
        duration: 2.4,
        ease: 'power3.out',
        delay: 0.3,
        onComplete: function () {
          gsap.set(tiltEl, { clearProps: 'transform' });
          tiltEl.style.animationPlayState = 'running';
        }
      }
    );
  }

  gsap.from('.wip-content', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.6
  });

  var form  = document.getElementById('wipForm');
  var input = document.getElementById('wipPassword');
  var error = document.getElementById('wipError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === 'preview2025') {
      localStorage.setItem('rv_preview_auth', 'true');
      window.location.replace('/');
    } else {
      error.classList.add('visible');
      input.value = '';
      input.focus();
      gsap.fromTo(input.closest('.wip-input-row'),
        { x: -6 },
        { x: 0, duration: 0.3, ease: 'elastic.out(3, 0.4)' }
      );
    }
  });

  input.addEventListener('input', function () {
    error.classList.remove('visible');
  });
})();
