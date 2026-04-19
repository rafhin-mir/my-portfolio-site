document.querySelectorAll('details.acc-item').forEach(details => {
  const summary = details.querySelector('summary');
  const body    = details.querySelector('.acc-body');

  summary.addEventListener('click', e => {
    e.preventDefault();

    if (details.open) {
      body.style.height = body.scrollHeight + 'px';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        body.style.height = '0';
      }));
      body.addEventListener('transitionend', () => {
        details.removeAttribute('open');
      }, { once: true });
    } else {
      details.setAttribute('open', '');
      body.style.height = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        body.style.height = body.scrollHeight + 'px';
      }));
      body.addEventListener('transitionend', () => {
        body.style.height = 'auto';
      }, { once: true });
    }
  });
});
