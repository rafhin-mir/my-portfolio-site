const btns  = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.work-item');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const visible = [];

    items.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
      if (match) visible.push(item);
    });

    if (visible.length) {
      gsap.from(visible, {
        opacity: 0, y: 14, duration: 0.28, stagger: 0.05, ease: 'power2.out'
      });
    }
  });
});
