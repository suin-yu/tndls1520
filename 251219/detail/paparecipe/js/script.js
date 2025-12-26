document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.sticky-img');
  const left = document.querySelector('.left');

  window.addEventListener('scroll', () => {
    const start = left.offsetTop;
    const end = start + left.offsetHeight;
    const y = window.scrollY + window.innerHeight / 2;

    if (y >= start && y <= end) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
    }
  });
});