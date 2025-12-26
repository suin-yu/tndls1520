//00.a속성제거(a를 클릭했을 때 위로 튕기는 현상 제거)
$(document).on('click', 'a[href="#"]', function(e) {e.preventDefault();})


// 모바일 메뉴 open/close
$(function () {
  $('.menuOpen button').on('click', function () {
    $('.menuOpen .menuWrap').addClass('on');
  });

  $('.menuOpen .menuWrap .close').on('click', function (e) {
    e.preventDefault();
    $('.menuOpen .menuWrap').removeClass('on');
  });
});

// 헤더 고정 + 스크롤 다운 시 숨김 / 업 시 표시
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  if (!header) return;

  let lastY = window.scrollY;
  const threshold = 10;        // 이 값 이상 스크롤하면 fixed-state 적용
  const tolerance = 5;         // 너무 민감하게 흔들리지 않게

  function onScroll() {
    const y = window.scrollY;

    // 일정 이상 스크롤하면 헤더 고정 상태
    if (y > threshold) header.classList.add('fixed-state');
    else header.classList.remove('fixed-state');

    // 아래로 스크롤하면 숨김, 위로 스크롤하면 표시
    if (y > lastY + tolerance) {
      header.classList.add('header-hidden');
    } else if (y < lastY - tolerance) {
      header.classList.remove('header-hidden');
    }

    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 최초 실행
});


// 베스트셀러 스와이프
// BestSeller 전용
const $bestBar = $('.bestSeller .b_bar');

const bestSwiper = new Swiper('.bestSeller .best-swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 12,
  direction: 'horizontal',
  slidesPerGroup: 1,
  on: {
    init: function () { updateBestBar(this); },
    slideChange: function () { updateBestBar(this); }
  }
});

function updateBestBar(sw) {
  // loop 때문에 복제 슬라이드 제외한 "진짜 개수"
  const total = sw.slides.length - (sw.loopedSlides * 2);

  // realIndex: 0 ~ total-1 (loop에서도 정확)
  const idx = sw.realIndex;

  // 한 칸씩 채우기 (1/total, 2/total ...)
  const step = 100 / total;
  const width = (idx + 1) * step;

  $bestBar.css('width', width + '%');
}

// 베스트 동영상

$(function () {

  const hoverFiles = [
    'best_hover_1.png',
    'best_hover_2.png',
    'best_hover_3.png',
    'best_hover_4.png',
    'best_hover_5.png',
    'best_hover_6.png',
    'best_hover_7.mp4', // 7번째는 동영상
    'best_hover_8.png',
    'best_hover_9.png',
    'best_hover_10.png',
    'best_hover_11.png',
    'best_hover_12.png'
  ];

  // loop 때문에 duplicate 제외
  $('.bestSeller .swiper-slide:not(.swiper-slide-duplicate)').each(function (i) {

    // data-index 추가
    $(this).attr('data-index', i + 1);

    const $imgBox = $(this).find('.img');
    const file = hoverFiles[i];

    if (!file) return;

    // overlay container
    const $overlay = $('<div class="hoverMedia"></div>');

    if (file.endsWith('.mp4')) {
      const video = $(`
        <video class="hoverVideo" muted loop playsinline preload="metadata">
            <source src="img/productMain/${file}" type="video/mp4">
        </video>
      `);
      $overlay.append(video);
    } else {
      const img = $(`<img class="hoverImg" src="img/productMain/${file}">`);
      $overlay.append(img);
    }

    $imgBox.append($overlay);
  });


  /** mp4만 hover 재생 */
  $('.bestSeller .swiper-slide').on('mouseenter focusin', function () {
    const v = $(this).find('video.hoverVideo').get(0);
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.catch(()=>{});
  });

  $('.bestSeller .swiper-slide').on('mouseleave focusout', function () {
    const v = $(this).find('video.hoverVideo').get(0);
    if (!v) return;
    v.pause();
  });

});









// 신제품 슬라이드

const $bar = $('.NewArrival .b_bar');
const total = 6;                 // 슬라이드 개수
const step = 100 / total;        // 16.66% 한칸당 width 비율을 가져옴

const swiper = new Swiper('.list-swiper', {
  loop: true,
  slidesPerView: 1,

  on: {
    init: function () {
      updateBar(this.realIndex);
    },
    slideChange: function () {
      updateBar(this.realIndex);
    }
  }
});

function updateBar(index) {
  // index: 0,1,2,3,4,5
  const width = (index + 1) * step;   // 16.66, 33.32, 49.98 ...
  $bar.css('width', width + '%');
}


// allProduct img >video

$(function () {
  // ✅ video-target 이미지마다 hover용 video를 삽입
  $('.allProduct img.video-target').each(function () {
    const $img = $(this);

    // 이미지 파일명에서 번호 추출: allProduct_4.png -> 4
    const m = ($img.attr('src') || '').match(/allProduct_(\d+)\./);
    if (!m) return;

    const num = m[1]; // "4", "6", "10", "11", "14", "17" ...
    const videoSrc = `img/productMain/allProduct_hover_${num}.mp4`; // 네가 만들 mp4 경로 규칙

    // a 태그 안에 overlay 넣기
    const $a = $img.closest('a');
    if (!$a.length) return;

    // 이미 생성돼 있으면 중복 방지
    if ($a.find('.hoverMedia').length) return;

    const $overlay = $('<div class="hoverMedia"></div>');
    const $video = $(`
      <video class="hoverVideo" muted loop playsinline preload="metadata">
        <source src="${videoSrc}" type="video/mp4">
      </video>
    `);

    $overlay.append($video);
    $a.append($overlay);
  });

  // ✅ hover/focus 시 재생, 벗어나면 정지
  $('.allProduct .list_product li ul li')
    .on('mouseenter focusin', function () {
      const v = $(this).find('video.hoverVideo').get(0);
      if (!v) return;
      const p = v.play();
      if (p) p.catch(() => {});
    })
    .on('mouseleave focusout', function () {
      const v = $(this).find('video.hoverVideo').get(0);
      if (!v) return;
      v.pause();
      v.currentTime = 0; // 원하면 제거
    });
});





$(function () {

  function changeTurnImage() {
    var winW = $(window).width();

    if (winW < 768) {
        $('.visual .inner>.img img').attr('src', 'img/productMain/visualMain_768.png');
        $('.allProduct .inner .list_product .turn .text img')
            .attr('src', 'img/productMain/allProduct_turn_text2.svg');
        $('.top h2').html('Embracing beauty<br>that begins in nature');
        $('.top p').html('자연에서 시작된 아름다움이 시간과 일상 속에서<br>천천히 스며들어 나를 더욱 빛나게 합니다.');
    } else {
        $('.allProduct .inner .list_product .turn .text img')
            .attr('src', 'img/productMain/allProduct_turn_text.svg');
        $('.top h2').html('Embracing beauty that begins in nature');
        $('.top p').html('자연에서 시작된 아름다움이<br>시간과 일상 속에서 천천히 스며들어 나를 더욱 빛나게 합니다.');
    }
    if (winW < 390 ) {
      $('.visual .inner>.img img').attr('src', 'img/productMain/visualMain_390.png');
    }

    
  }
  




  // 최초 실행
  changeTurnImage();

  // 리사이즈 시 다시 체크
  $(window).on('resize', changeTurnImage);

});
