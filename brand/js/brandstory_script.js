// a 태그 기본동작 막기
$(document).on('click', 'a[href="#"]', function(e){
  e.preventDefault();
});

$(function() {
  // scrolla
  $('.animate').scrolla({
    mobile: true,
    once: false
  });

  // Splitting
  Splitting();

  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  // ===============================
  // 메뉴 오픈 / 닫기
  // ===============================
  $('.menuOpen button').on('click', function(){
    $('.menuOpen .menuWrap').addClass('on');
  });
  $('.menuOpen .menuWrap .close').on('click', function(){
    $('.menuOpen .menuWrap').removeClass('on');
  });

  // ===============================
  // 헤더 고정 + 스크롤 방향에 따라 숨김/등장
  // ===============================
  (function () {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollTolerance = 5;
    let ticking = false;

    function updateHeader() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        header.classList.remove('fixed-state', 'header-hidden');
      } else {
        header.classList.add('fixed-state');

        if (currentScrollY > lastScrollY + scrollTolerance) {
          header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY - scrollTolerance) {
          header.classList.remove('header-hidden');
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  })();

  // =========================
  // 1) VISUAL 구간 반응형
  // =========================
  ScrollTrigger.matchMedia({

    // ✅ PC (1025px 이상)
    "(min-width: 1025px)": function () {
      return buildVisual({
        endPin: 2500,
        endFrame: 2000,
        frames: [
          'img/brandstory/visual_1.png',
          'img/brandstory/visual_2.png',
          'img/brandstory/visual_3.png',
          'img/brandstory/visual_4.png',
          'img/brandstory/visual_5.png',
          'img/brandstory/visual_6.png',
          'img/brandstory/visual_7.png',
          'img/brandstory/visual_8.png',
          'img/brandstory/visual_9.png',
          'img/brandstory/visual_10.png',
          'img/brandstory/visual_11.png',
          'img/brandstory/visual_12.png',
          'img/brandstory/visual_13.png',
          'img/brandstory/visual_14.png',
          'img/brandstory/visual_15.png',
          'img/brandstory/visual_16.png',
          'img/brandstory/visual_17.png',
          'img/brandstory/visual_18.png',
        ],
        natuScale: 2,
        cipeScale: 1.6,
        cipeMarginTop: '14%',
        middleRe: { yFrom: 100, yTo: -50, x: 0, width: null }
      });
    },

    // ✅ 태블릿 (769px ~ 1024px)
    "(min-width: 769px) and (max-width: 1024px)": function () {
      return buildVisual({
        endPin: 2000,
        endFrame: 2000,
        frames: [
          'img/brandstory/visual_1.png',
          'img/brandstory/visual_2.png',
          'img/brandstory/visual_3.png',
          'img/brandstory/visual_4.png',
          'img/brandstory/visual_5.png',
          'img/brandstory/visual_6.png',
          'img/brandstory/visual_7.png',
          'img/brandstory/visual_8.png',
          'img/brandstory/visual_9.png',
          'img/brandstory/visual_10.png',
          'img/brandstory/visual_11.png',
          'img/brandstory/visual_12.png',
          'img/brandstory/visual_13.png',
          'img/brandstory/visual_14.png',
          'img/brandstory/visual_15.png',
          'img/brandstory/visual_16.png',
          'img/brandstory/visual_17.png',
          'img/brandstory/visual_18.png',
        ],
        natuScale: 2.5,
        cipeScale: 2.1,
        cipeMarginTop: '17%',
        middleRe: { yFrom: 100, yTo: -50, x: -45, width: '12%' }
      });
    },

    // ✅ 모바일 (768px 이하)
    "(max-width: 768px)": function () {
      return buildVisual({
        endPin: 2000,
        endFrame: 2000,
        frames: [
          'img/brandstory/visual_1_768.png',
          'img/brandstory/visual_2_768.png',
          'img/brandstory/visual_3_768.png',
          'img/brandstory/visual_4_768.png',
          'img/brandstory/visual_5_768.png',
          'img/brandstory/visual_6_768.png',
          'img/brandstory/visual_7_768.png',
          'img/brandstory/visual_8_768.png',
          'img/brandstory/visual_9_768.png',
          'img/brandstory/visual_10_768.png',
          'img/brandstory/visual_11_768.png',
          'img/brandstory/visual_12_768.png',
          'img/brandstory/visual_13_768.png',
          'img/brandstory/visual_14_768.png',
          'img/brandstory/visual_15_768.png',
          'img/brandstory/visual_16_768.png',
          'img/brandstory/visual_17_768.png',
          'img/brandstory/visual_18_768.png',
        ],
        natuScale: 2.5,
        cipeScale: 2.1,
        cipeMarginTop: '17%',
        middleRe: { yFrom: 100, yTo: 0, x: -30, width: '12%' }
      });
    },

    // ✅ 아주 작은 모바일 (390px 이하)
    "(max-width: 390px)": function () {
      return buildVisual({
        endPin: 2000,
        endFrame: 2000,
        frames: [
          'img/brandstory/visual_1_390.png',
          'img/brandstory/visual_2_390.png',
          'img/brandstory/visual_3_390.png',
          'img/brandstory/visual_4_390.png',
          'img/brandstory/visual_5_390.png',
          'img/brandstory/visual_6_390.png',
          'img/brandstory/visual_7_390.png',
          'img/brandstory/visual_8_390.png',
          'img/brandstory/visual_9_390.png',
          'img/brandstory/visual_10_390.png',
          'img/brandstory/visual_11_390.png',
          'img/brandstory/visual_12_390.png',
          'img/brandstory/visual_13_390.png',
          'img/brandstory/visual_14_390.png',
          'img/brandstory/visual_15_390.png',
          'img/brandstory/visual_16_390.png',
          'img/brandstory/visual_17_390.png',
          'img/brandstory/visual_18_390.png',
        ],
        natuScale: 3.5,
        cipeScale: 3.2,
        cipeMarginTop: '28%',
        left_parMarginTop: '15%',
        middleRe: { yFrom: 100, yTo: 35, x:-75, width: '11%' },
        visualInner : { gap : '5%' },
        leftPar:  { scale: 0.6 },
        rightPar: { scale: 0.6 }
      });
    }
  });

  // ✅ VISUAL 생성 함수 (공통)
  function buildVisual(opt) {
    const middleImg = document.getElementById('changeImg');
    if (!middleImg) return;

    const frames = opt.frames;
    const frameCount = frames.length;

    // 기존 visual 관련 트리거 제거
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars && st.vars.trigger === ".visual") st.kill();
    });

    middleImg.setAttribute('src', frames[0]);

    // ★★★ 초기 gap을 옵션 기반으로 강제 세팅 ★★★
    const initialGap = (opt.visualInner && opt.visualInner.gap) ? opt.visualInner.gap : '5%';
    gsap.set('.visual .visual-inner', { gap: initialGap });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.visual',
        start: 'top top',
        end: '+=' + opt.endPin,
        scrub: true,
        pin: '.visual-scroll',
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    tl.fromTo(
      '.visual .middle img',
      { scale: 1.2, transformOrigin: '50% 50%' },
      { scale: 1, duration: 0.3, ease: 'none' },
      0
    );

    tl.fromTo(
      '.visual .natu',
      { x: '-40vw', opacity: 0, scale: 1 },
      { x: '0vw', opacity: 1, scale: opt.natuScale, duration: 0.7, ease: 'none' },
      0.3
    );

    tl.fromTo(
      '.visual .cipe',
      { x: '40vw', opacity: 0, scale: 1 },
      { x: '0vw', opacity: 1, scale: opt.cipeScale, marginTop: opt.cipeMarginTop, duration: 0.7, ease: 'none' },
      0.3
    );

    tl.fromTo(
      '.visual .visual-inner .left_par',
      { scale: 1, width: '100%' },
      { scale: 0.5, width: '50%', duration: 0.7, ease: 'none' },
      0.3
    );

    tl.fromTo(
      '.visual .visual-inner .right_par',
      { scale: 1, width: '100%' },
      { scale: 0.5, width: '50%', duration: 0.7, ease: 'none' },
      0.3
    );

    // ★★★ gap 애니메이션: initialGap → 0% ★★★
    tl.fromTo(
      '.visual .visual-inner',
      { scale: 1, transformOrigin: '50% 50%' },
      { scale: 1, gap: '5%', duration: 0.7, ease: 'none' },
      0.3
    );

    tl.fromTo(
      '.visual .middle',
      { width: '62%', transformOrigin: '50% 50%' },
      { width: '0%', duration: 0.7, ease: 'none' },
      0.3
    );

    tl.to('.visual .middle', { opacity: 0, duration: 0.01 }, 0.9);

    // middle_re
    const mr = opt.middleRe || {};
    const mrFrom = { yPercent: mr.yFrom ?? 100, opacity: 0 };
    const mrTo   = { yPercent: mr.yTo ?? -50, opacity: 1, duration: 0.3, ease: 'power1.out', zIndex: 100 };

    if (mr.x !== 0 && mr.x !== undefined && mr.x !== null) {
      mrFrom.xPercent = mr.x;
      mrTo.xPercent = mr.x;
    }
    if (mr.width) {
      mrFrom.width = mr.width;
      mrTo.width = mr.width;
    }

    tl.fromTo('.visual .middle_re', mrFrom, mrTo, 1);

    tl.fromTo(
      '.visual .visual-inner .left',
      { scale: 1.2, transformOrigin: '50% 50%' },
      { scale: 0.7, marginLeft: opt.endPin === 2500 ? '150px' : '80px', duration: 0.7, ease: 'none' },
      0.3
    );

    tl.fromTo(
      '.visual .visual-inner .right',
      { scale: 1.2, transformOrigin: '50% 50%' },
      { scale: (opt.endPin === 2500 ? 0.7 : 0.65), marginRight: (opt.endPin === 2500 ? '150px' : '80px'), duration: 0.7, ease: 'none' },
      0.3
    );

    // 프레임 교체 트리거
    const frameST = ScrollTrigger.create({
      trigger: '.visual',
      start: 'top top',
      end: '+=' + opt.endFrame,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(frameCount - 1, Math.max(0, Math.round(self.progress * (frameCount - 1))));
        const src = frames[idx];
        if (middleImg.getAttribute('src') !== src) {
          middleImg.setAttribute('src', src);
        }
      }
    });

    // media 해제 시 정리
    return () => {
      frameST.kill();
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }

  // =========================
  // 2) HISTORY 가로 스크롤 (새 버전 통합)
  // =========================
  (function () {
    const historySection = document.querySelector('.history');
    const scrollList = document.querySelector('.history-inner ul');

    if (!historySection || !scrollList) return;

    let scrollTween = null;

    function initHorizontalScroll() {
      // 기존 트윈/트리거 제거
      if (scrollTween) {
        scrollTween.scrollTrigger.kill();
        scrollTween.kill();
        scrollTween = null;
      }

      // 스타일 초기화 + x 0으로 세팅
      gsap.set(scrollList, { clearProps: "all" });
      gsap.set(scrollList, { x: 0 });

      // 768px 초과에서만 가로 스크롤
      if (window.innerWidth > 768) {
        const getScrollDistance = () => scrollList.scrollWidth - window.innerWidth;

        scrollTween = gsap.to(scrollList, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: historySection,
            start: "top top",
            end: () => "+=" + getScrollDistance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }
    }

    // 모든 리소스 로드 후 정확한 너비 기준으로 세팅
    window.addEventListener('load', function () {
      initHorizontalScroll();
      ScrollTrigger.refresh();
    });

    // 리사이즈 대응
    window.addEventListener('resize', function () {
      initHorizontalScroll();
      ScrollTrigger.refresh();
    });
  })();
});


/// =========================
// 텍스트/이미지 교체 (최종 정리 버전)
// =========================
$(function () {

  // 🔄 Splitting 다시 적용할 때 쓰는 헬퍼
  function reSplit(selector) {
    $(selector).each(function () {
      const $el = $(this);

      // 1) 예전에 Splitting이 만들어 둔 span.word / span.char 있으면 제거
      $el.find('span.word, span.char').contents().unwrap();

      // 2) Splitting 내부 상태 초기화
      this.splitting = null;
    });

    // 3) 새 텍스트에 다시 Splitting 적용
    Splitting({ target: selector });
  }

  function changeTurnImage() {
    var winW = $(window).width();

    /* ------------------------------
       1024 이하 공통
    ------------------------------ */
    if (winW <= 1024) {
      $('.bombee .bombee-inner p').html('깊은 보습감으로 시작하는<br>민낯 자신감');
      $('.story .story-inner .text .txt:nth-child(3)').html(
        '자연의 질서와 사랑의 시작에서 출발한 스킨케어,<br>본질만 담은 원료와 정직한 과정으로 완성된 제품.<br>우리는 피부가 스스로 회복할 수 있는<br>환경을 만드는 브랜드입니다.'
      );
      $('.our-inner .txt-box .top p').html(
        '우리가 지키는 것은 피부 한 겹이 아닙니다.<br>자연이 다시 호흡할 수 있는 균형, 그리고 다음 세대를 위한 환경입니다.<br>파파레서피는 자연에서 얻은 것을 다시 자연으로 돌려주는<br>순환의 가치를 추구하며,재활용 가능한 패키지와 책임 있는<br>원료 채집, 친환경 공정을 꾸준히 실천합니다.<br>이 모든 노력이 결국, 오래도록 남아야 할 품질과 가치를 완성합니다.'
      );
    } else {
      $('.bombee .bombee-inner p').html('깊은 보습감으로 시작하는 민낯 자신감');
      $('.story .story-inner .text .txt:nth-child(3)').html(
        '자연의 질서와 사랑의 시작에서 출발한 스킨케어,<br>본질만 담은 원료와 정직한 과정으로 완성된 제품.<br>우리는 피부가 스스로 회복할 수 있는 환경을 만드는 브랜드입니다.'
      );
      $('.our-inner .txt-box .top p').html(
        '우리가 지키는 것은 피부 한 겹이 아닙니다.<br>자연이 다시 호흡할 수 있는 균형, 그리고 다음 세대를 위한 환경입니다.<br>파파레서피는 자연에서 얻은 것을 다시 자연으로 돌려주는 순환의 가치를 추구하며,<br>재활용 가능한 패키지와 책임 있는 원료 채집, 친환경 공정을 꾸준히 실천합니다.<br>이 모든 노력이 결국, 오래도록 남아야 할 품질과 가치를 완성합니다.'
      );
    }

    /* ------------------------------
       768 이하
    ------------------------------ */
    if (winW <= 768) {
      $('.visual .middle img').attr('src', 'img/brandstory/visual_1_768.png');

      $('.story .story-inner .text .txt:nth-child(1)').html(
        '자연은 과장하지 않고 스스로 균형을 찾아갑니다.<br>그 원리는 피부에도 이어져, 필요한 것만 남기고<br>본연의 힘을 되살립니다.'
      );
      $('.story .story-inner .text .txt:nth-child(2)').html(
        '아버지의 믿음은 순한 오일을 만들어냈고,<br>작은 병 하나는 많은 가족들에게 안심할 수 있는<br>선택이 되었습니다.<br>오늘의 파파레서피는 그 마음을 그대로 이어갑니다.'
      );
    } else {
      $('.visual .middle img').attr('src', 'img/brandstory/visual_1.png');

      $('.story .story-inner .text .txt:nth-child(1)').html(
        '자연은 과장하지 않고 스스로 균형을 찾아갑니다.<br>그 원리는 피부에도 이어져, 필요한 것만 남기고 본연의 힘을 되살립니다.'
      );
      $('.story .story-inner .text .txt:nth-child(2)').html(
        '아버지의 믿음은 순한 오일을 만들어냈고,<br>작은 병 하나는 많은 가족들에게 안심할 수 있는 선택이 되었습니다.<br>오늘의 파파레서피는 그 마음을 그대로 이어갑니다.'
      );
    }

    /* ------------------------------
       390 이하
    ------------------------------ */
    if (winW <= 390) {
      $('.visual .middle img').attr('src', 'img/brandstory/visual_1_390.png');

      $('.introduce.first .txt').html(
        '<span class="fff">Natu(re)cipe</span>는 자연이 가진 본래의 흐름을 다시<span class="fff">(re)</span><br>' +
        '되돌려, 가장 순수한 레시피를 지향합니다.<br>' +
        '자연 유래 원료와 회복의 뜻을 더해<br>' +
        '부담 없이 피부에 흡수되는 정직한 공식을 만듭니다.<br>' +
        '그 결과 피부는 스스로 회복하는 힘을 되찾아<br>' +
        '자연스러운 상태로 돌아갑니다.'
      );

      $('.story .story-inner .text .txt:nth-child(1)').html(
        '자연은 과장하지 않고<br>스스로 균형을 찾아갑니다.<br>그 원리는 피부에도 이어져,<br>필요한 것만 남기고 본연의 힘을 되살립니다.'
      );

      $('.our-inner .txt-box .top .txt').html(
        '우리가 지키는 것은 피부 한 겹이 아닙니다.<br>자연이 다시 호흡할 수 있는 균형, 그리고 다음 세대를 위한 환경입니다.<br>파파레서피는 자연에서 얻은 것을 다시 자연으로.<br>돌려주는 순환의 가치를 추구하며, 재활용 가능한 패키지와 책임 있는 원료 채집, 친환경 공정을 꾸준히 실천합니다.<br>이 모든 노력이 결국, 오래도록 남아야 할 품질과 가치를 완성합니다.'
      );

      $('.our-inner .txt-box .bottom .txt').html(
        '오늘의 작은 선택이 쌓여 더 큰 변화를 만듭니다.<br>우리의 방식은 느리고 조용하지만,<br>가장 확실한 길을 믿습니다.<br>파파레서피는 그 믿음을<br>지구와 피부 모두를 위한 실천으로 이어갑니다.'
      );

      $('.introduce .introduce-inner p.txt').html(
        '우리는 자연이 주는 좋은 원료와 피부에 맞는<br>올바른 레서피를 찾기 위해 늘 새로운 여정을 이어갑니다.'
      );
    } else {
      $('.introduce.first .txt').html(
        '<span class="fff">Natu(re)cipe</span>는 자연이 가진 본래의 흐름을 다시<span class="fff">(re)</span> 되돌려, 가장 순수한 레시피를 지향합니다.<br>' +
        '자연 유래 원료와 회복의 뜻을 더해 부담 없이 피부에 흡수되는 정직한 공식을 만듭니다. <br>' +
        '그 결과 피부는 스스로 회복하는 힘을 되찾아 자연스러운 상태로 돌아갑니다.'
      );

      $('.our-inner .txt-box .bottom .txt').html(
        '오늘의 작은 선택이 쌓여 더 큰 변화를 만듭니다.<br>우리의 방식은 느리고 조용하지만, 가장 확실한 길을 믿습니다.<br>파파레서피는 그 믿음을 지구와 피부 모두를 위한 실천으로 이어갑니다.'
      );

      $('.introduce.close .introduce-inner p.txt').html(
        '우리는 자연이 주는 좋은 원료와 피부에 맞는 올바른 레서피를 찾기 위해 늘 새로운 여정을 이어갑니다.'
      );
    }

    // ✅ 텍스트 갈아끼운 뒤 Splitting 재적용
    reSplit(
      '.story .story-inner .text .txt, ' +
      '.introduce.first .txt, ' +
      '.introduce.close .txt, ' +
      '.our-inner .txt-box .top .txt, ' +
      '.our-inner .txt-box .bottom .txt'
    );
  }

  // 최초 실행
  changeTurnImage();

  // 리사이즈 시 재실행
  $(window).on('resize', changeTurnImage);
});
