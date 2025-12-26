$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});

// 라이브러리 초기화
$(function() {
    $('.animate').scrolla({ mobile: true, once: false });
    if (typeof Splitting === "function") Splitting(); 
});

$(function(){
    $('.menuOpen button').on('click', function(){ $('.menuOpen .menuWrap').addClass('on'); });
    $('.menuOpen .menuWrap .close').on('click',function(){ $('.menuOpen .menuWrap').removeClass('on'); });
});

document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // --- [1. 로고 모션 & 비주얼 고정] ---
    const header = document.querySelector('header');
    const visual = document.querySelector('.visual');
    const visualLogo = document.querySelector('.visual a.logo');
    const headerLogoContainer = document.querySelector('header .logo');
    
    if (visual && visualLogo && headerLogoContainer) {
        ScrollTrigger.create({
            trigger: visual, start: "top top", pin: true, end: "+=1000", scrub: true
        });

        const lerp = (s, e, p) => s + (e - s) * p;
        const calcPos = () => {
            headerLogoContainer.style.opacity = '1';
            const rect = headerLogoContainer.getBoundingClientRect();
            headerLogoContainer.style.opacity = '0';
            return {
                initX: window.innerWidth / 2, initY: window.innerHeight / 2, initW: visualLogo.offsetWidth,
                targetX: rect.left + (rect.width / 2), targetY: rect.top + (rect.height / 2), targetW: rect.width
            };
        };

        let pos = calcPos();
        window.addEventListener('resize', () => { pos = calcPos(); });

        let lastY = 0;
        window.addEventListener('scroll', () => {
            const currY = window.scrollY;
            let prog = Math.min(1, Math.max(0, currY / 1000));
            if (prog < 1) {
                const curW = lerp(pos.initW, pos.targetW, prog);
                visualLogo.style.cssText = `position:fixed; opacity:1; width:${curW}px; left:${lerp(pos.initX, pos.targetX, prog)-(curW/2)}px; top:${lerp(pos.initY, pos.targetY, prog)-(visualLogo.offsetHeight/2)}px; transform:none; z-index:9999;`;
                headerLogoContainer.style.opacity = '0';
                header.classList.remove('fixed-state');
            } else {
                header.classList.add('fixed-state');
                visualLogo.style.opacity = '0';
                headerLogoContainer.style.opacity = '1';
            }
            if (currY > lastY && currY > 1100) header.classList.add('hide');
            else header.classList.remove('hide');
            lastY = currY;
        });
    }

    // --- [2. Visual Gradient & Bottom Image (복구)] ---
    gsap.timeline({
        scrollTrigger: { trigger: ".visual", start: "top top", end: "+=1000", scrub: true }
    })
    .to(".visual .grad", { y: -500, ease: "none" }, 0)
    .fromTo(".visual .img-bottom", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.2);

    // --- [3. Intro 텍스트 애니메이션 (복구)] ---
    function splitText(sel) {
        const el = document.querySelector(sel);
        if(!el) return;
        const nodes = Array.from(el.childNodes);
        el.innerHTML = ""; 
        nodes.forEach(n => {
            if (n.nodeType === 3) { 
                [...n.textContent].forEach(c => { const s = document.createElement("span"); s.innerText = c === " " ? "\u00A0" : c; el.appendChild(s); });
            } else if (n.nodeType === 1) {
                const w = document.createElement("span"); w.className = n.className;
                [...n.textContent].forEach(c => { const s = document.createElement("span"); s.innerText = c === " " ? "\u00A0" : c; w.appendChild(s); });
                el.appendChild(w);
            }
        });
    }
    splitText(".tit"); splitText(".txt");
    gsap.to(".tit span", { opacity: 1, color: "#fff", stagger: 0.05, scrollTrigger: { trigger: ".intro", start: "top 60%", end: "top 20%", scrub: 1 } });
    gsap.to(".txt span", { opacity: 1, color: "#eaeaea", stagger: 0.02, scrollTrigger: { trigger: ".intro", start: "top 40%", end: "top 0%", scrub: 1 } });

    

// --- [4. Product 스크롤 수정본] ---
const productSec = document.querySelector('.scroll-item');
if (productSec) {
    const items = gsap.utils.toArray('.product-list li');
    const titles = gsap.utils.toArray('.product-title');
    const mainImgs = gsap.utils.toArray('.img-wrap img');

    // 초기 세팅
    gsap.set(titles, { opacity: 0 }); gsap.set(titles[0], { opacity: 1 });
    gsap.set(mainImgs, { opacity: 0 }); gsap.set(mainImgs[0], { opacity: 1 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: productSec,
            start: "top top",
            // 768px 이하에서도 핀 고정을 위해 충분한 스크롤 거리(3000px)를 줍니다.
            // 이 숫자가 커질수록 스크롤 속도가 더 천천히(느리게) 느껴집니다.
            end: window.innerWidth <= 768 ? "+=1500" : "+=12000", 
            pin: true,           // 핀 고정 활성화
            scrub: 1.5,          // 스크롤 추적 부드럽게
            invalidateOnRefresh: true,
            onEnter: () => {
                if(window.innerWidth > 768) gsap.to('body', { backgroundColor: '#1A1A1E', duration: 0.5 });
            }
        }
    });

    items.forEach((item, i) => {
    // 공통 중앙 배치
    gsap.set(item, { xPercent: -50, yPercent: -50, top: "50%", left: "50%", position: "absolute" });

    tl.fromTo(item, 
        { autoAlpha: 0, y: window.innerWidth <= 768 ? 150 : 500, scale: 0.8 }, // 1. 등장 (y거리 줄임)
        { 
            autoAlpha: 1, y: 0, duration: 2, scale: 1.1, ease: "none",
            onStart: () => {
                let aT = Math.floor(i/6), aI = Math.floor(i/3);
                titles.forEach((t, idx) => gsap.to(t, { opacity: idx === aT ? 1 : 0, overwrite: true }));
                mainImgs.forEach((m, idx) => gsap.to(m, { opacity: idx === aI ? 1 : 0, overwrite: true }));
            }
        }, 
        i === 0 ? 0 : ">-1.5" 
    )
    // --- [추가: 중앙에서 머무는 구간] ---
    // duration: 1 만큼 아무 변화 없이 유지시켜 "멈춘 느낌"을 줍니다.
    .to(item, { duration: 1 }, ">") 
    // ---------------------------------
    .to(item, { 
        autoAlpha: 0, 
        y: window.innerWidth <= 768 ? -150 : -500, // 3. 퇴장
        scale: 0.8, 
        duration: 1.5, 
        ease: "none" 
    }, ">-0.5"); 
});
}

    // --- [Skin Concern: 텍스트 단어별 등장 + 이미지 애니메이션] ---

// 1. 텍스트를 단어별로 쪼개는 함수
const splitWordsForSkin = (selector) => {
    const targets = document.querySelectorAll(selector);
    targets.forEach(target => {
        const text = target.innerText;
        target.innerHTML = ''; // 기존 텍스트 비우기
        
        // 공백을 기준으로 단어 분리
        text.split(' ').forEach(word => {
            const span = document.createElement('span');
            span.classList.add('word'); // CSS에 정의하신 .word 클래스 적용
            span.innerText = word;
            target.appendChild(span);
            
            // 단어 뒤에 공백 노드 추가 (레이아웃 유지)
            target.appendChild(document.createTextNode(' '));
        });
    });
};

// 분리 실행 (span.label과 h3를 대상으로 함)
splitWordsForSkin('.skin-concern .left .label, .skin-concern .left h3');

// 2. 단어들이 한 줄씩/한 단어씩 서서히 보이는 애니메이션
gsap.utils.toArray('.skin-concern .left').forEach((container) => {
    const words = container.querySelectorAll('.word');
    
    gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.2, // 단어 사이의 시간 간격 (0.2초씩 차이나게 등장)
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: container,
            start: "top 85%", // 화면 하단에서 15% 정도 올라왔을 때 시작
            toggleActions: "play none none reverse" // 다시 올라가면 사라지게 설정
        }
    });
});

// --- [Skin Concern: 이미지 차오르는 등장 + 둥둥 애니메이션] ---
gsap.utils.toArray('.skin-concern .imgAni').forEach((box, i) => {
    
    // 1. 아래에서 위로 차오르는 등장 애니메이션 (Reveal 효과)
    gsap.fromTo(box, 
        { 
            clipPath: "inset(100% 0 0 0)",       // 아래에 완전히 가려진 상태
            webkitClipPath: "inset(100% 0 0 0)",
            y: 50                                // 약간의 상승 효과 추가
        }, 
        { 
            clipPath: "inset(0% 0 0 0)",         // 완전히 다 보이는 상태
            webkitClipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.5,
            ease: "power2.inOut",                // 차오를 때 부드러운 가속도
            scrollTrigger: {
                trigger: box,
                start: "top 90%",                // 화면 90% 지점에 닿으면 시작
                toggleActions: "restart none none reverse" // 스크롤 올릴 때마다 반복
            }
        }
    );
    // 2. 무한 둥둥 애니메이션
    gsap.to(box, {
        y: i % 2 === 0 ? -20 : 20,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.8  // 등장 모션과 겹치지 않게 약간의 시간차
    });
});

    // --- [6. Day6 & Model & Theraphy (복구)] ---
    ['.day6 .imgAni', '.model .imgAni'].forEach(sel => {
        gsap.utils.toArray(sel).forEach(c => {
            const img = c.querySelector('img');
            if (img) gsap.to(img, { yPercent: -20, scrub: 1, scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
    });

    const marqueeList = document.querySelector('.marquee-content');
    if (marqueeList) {
        marqueeList.innerHTML += marqueeList.innerHTML;
        gsap.to(marqueeList, { x: -(marqueeList.offsetWidth/2), duration: 30, ease: "none", repeat: -1 });
        gsap.utils.toArray('.theraphy .imgAni2').forEach((box, i) => {
            gsap.to(box, { y: i % 2 === 0 ? -30 : 30, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
        gsap.utils.toArray('.theraphy .imgAni2 img').forEach(img => {
            gsap.set(img, { filter: 'brightness(60%)' });
            img.addEventListener('mouseenter', () => gsap.to(img, { filter: 'brightness(100%)', duration: 0.5 }));
            img.addEventListener('mouseleave', () => gsap.to(img, { filter: 'brightness(60%)', duration: 0.5 }));
        });
    }

    // --- [7. 배경색 & 커서 & Footer (복구)] ---
// --- [7. 배경색 & 커서 & Footer (복구)] ---

// matchMedia 설정: 769px 이상일 때만 내부 로직 실행
let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // 배경색 전환 리스트
    const bgMap = [
        { t: ".day6", c: "#F0E5E0" }, 
        { t: ".model", c: "#F0E5E0" }, 
        { t: ".skin-concern", c: "#1A1A1E" }
    ];

    bgMap.forEach(m => {
        if(document.querySelector(m.t)) {
            ScrollTrigger.create({ 
                trigger: m.t, 
                start: "top 50%", 
                onEnter: () => gsap.to('body', { backgroundColor: m.c, duration: 0.8 }), 
                onEnterBack: () => gsap.to('body', { backgroundColor: m.c, duration: 0.8 }) 
            });
        }
    });

    // 범위를 벗어날 때(768px 이하로 줄어들 때) 배경색 초기화
    return () => gsap.set('body', { backgroundColor: "" });
});

// 커서 로직 (커서는 보통 모바일에서 필요 없으므로 같이 넣어두면 좋습니다)
const cursorImg = document.querySelector('.cursor-texture');
if (cursorImg) {
    window.addEventListener('mousemove', (e) => gsap.to(cursorImg, { x: e.clientX-50, y: e.clientY-50, duration: 0.5 }));
    document.querySelector('.skin-concern')?.addEventListener('mouseenter', () => gsap.to(cursorImg, { autoAlpha: 0.8, scale: 1 }));
    document.querySelector('.skin-concern')?.addEventListener('mouseleave', () => gsap.to(cursorImg, { autoAlpha: 0, scale: 0.5 }));
}

// 푸터 애니메이션
const footerH3 = document.querySelector('footer .top h3');
if (footerH3) {
    // 트랜지션 충돌을 막기 위해 초기화
    gsap.set(footerH3, { backgroundColor: "transparent", transition: "none" });

    gsap.to(footerH3, { 
        clipPath: "inset(0 0% 0 0)", 
        webkitClipPath: "inset(0 0% 0 0)",
        duration: 1.5, 
        ease: "power2.inOut",
        scrollTrigger: { 
            trigger: "footer", 
            start: "top 90%",
            onEnter: () => {
                // 부모 요소인 footer .top의 배경색이 body색인지 확인하고 강제 교정
                const parent = document.querySelector('footer .top');
                if (parent) {
                    parent.style.setProperty('background-color', '#F0E5E0');
                }
            }
        }
    });
}

gsap.utils.toArray('.animate').forEach((el) => {
    ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
            const animationClass = el.getAttribute('data-animate'); // "motion" 가져오기
            el.classList.add(animationClass); // class="tit animate motion" 이 됨
        },
        onLeaveBack: () => el.classList.remove(el.getAttribute('data-animate'))
    });
});

    ScrollTrigger.refresh();
});

