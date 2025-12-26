document.addEventListener('DOMContentLoaded', () => {
  const history = document.querySelector('.history');
  const historyUl = document.querySelector('.history-inner ul');

  if (!history || !historyUl) return;

  // 가로 스크롤 최대값 계산
  const maxScrollX = historyUl.scrollWidth - historyUl.clientWidth;

  historyUl.addEventListener('wheel', (e) => {
    const rect = history.getBoundingClientRect();

    // 화면 안에서만 적용
    if (rect.top > 0 || rect.bottom < window.innerHeight) return;

    e.preventDefault(); // 기본 스크롤 막기
    const delta = e.deltaY;

    const atStart = historyUl.scrollLeft === 0;
    const atEnd = historyUl.scrollLeft >= maxScrollX;

    if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
      // 가로 스크롤
      historyUl.scrollLeft += delta;
    } else if (delta > 0 && atEnd) {
      // 끝 → 아래 섹션
      const nextSection = history.nextElementSibling;
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    } else if (delta < 0 && atStart) {
      // 시작 → 위 섹션
      const prevSection = history.previousElementSibling;
      if (prevSection) prevSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, { passive: false });
});
