const btns  = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.work-item');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    items.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
      if (filter !== 'all') item.classList.remove('solo');
      else if (item === document.querySelector('[data-category="film"]:last-child')) {
        item.classList.add('solo');
      }
    });
  });
});
