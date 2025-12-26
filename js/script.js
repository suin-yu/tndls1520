$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});

// scrolla.js
$(function() {
    $('.animate').scrolla({
        mobile: true, //모바일 버전시 ani활성
        once: false //스크롤시 ani활성, 딱 한번만 활성화시키고 싶으면 true
    });
});

// splitting.js
    $(function() {
      Splitting(); 
    });

//menuWrap mobile
$(function(){
    $('.menuOpen button').on('click', function(){
        $('.menuOpen .menuWrap').addClass('on');
    });
    $('.menuOpen .menuWrap .close').on('click',function(){
        $('.menuOpen .menuWrap').removeClass('on');
    });
});

// //배경색 변경
// $(window).on('scroll resize', function(){
//     let scrollTop = $(document).scrollTop();
//     //alert(scrollTop)

//     bgColor();
//     function bgColor(){
//         if(scrollTop > 7907 && scrollTop<=15250){
//             $('body').addClass('on');
//         } else {
//             $('body').removeClass('on');
//         }
//     };
// });



document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    const visual = document.querySelector('.visual');
    const videoBg = document.querySelector('.visual .main-bg');
    const bgElement = document.querySelector('.visual .bg');
    const gradElement = document.querySelector('.visual .grad');
    const visualLogo = document.querySelector('.visual a.logo');
    
    const headerHeight = 70; 
    const targetLogoWidth = 100; 
    const targetLogoX = (window.innerWidth / 2) - (targetLogoWidth / 2); 
    const targetLogoY = (headerHeight / 2) - (targetLogoWidth * 0.1 / 2); 
    const logoPinDuration = 1000;

    
    gsap.timeline({
        scrollTrigger: {
            trigger: visual,
            start: "top top", 
            end: "bottom top",
            scrub: true,
        }
    })
    .to(bgElement, {y: (index, target) => -(target.offsetHeight * 0.2), 
        ease: "none"
    }, 0)
    .to(gradElement, {
        y: (index, target) => -(target.offsetHeight * 0.1), 
        ease: "none"
    }, 0)
    .to(videoBg, {
        opacity: 1,
        ease: "power1.inOut"
    }, 0.1); 

    gsap.timeline({
    scrollTrigger: {
        trigger: visual,
        start: "top top", 
        pin: true, 
        end: `+=${logoPinDuration}`, 
        scrub: true,
    }
})

    .to(visualLogo, {
        width: targetLogoWidth + 'px',
        x: targetLogoX,
        y: targetLogoY, 
        transform: 'none', 
        ease: "power2.inOut"
    }, 0)
    
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const visualLogo = document.querySelector('.visual a.logo');
    const visualLogoImg = document.querySelector('.visual a.logo img');
    const headerLogoContainer = document.querySelector('header .logo');
    
    if (!header || !visualLogo || !headerLogoContainer || !visualLogoImg) {
        console.error("필요한 요소(header, visual logo, header logo container, visual logo image)를 찾을 수 없습니다.");
        return;
    }

    const animationStart = 0;
    let animationEnd = document.querySelector('.visual').offsetHeight;
    let lastScrollY = 0;
    const scrollTolerance = 5; 

    const lerp = (start, end, progress) => start + (end - start) * progress;

    const calculatePositions = () => {

        headerLogoContainer.style.opacity = '1'; 
        const targetRect = headerLogoContainer.getBoundingClientRect();
        headerLogoContainer.style.opacity = '0'; 

        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2; 
        const targetLogoWidth = targetRect.width;
        const targetLogoHeight = 37; 

        const initialRect = visualLogo.getBoundingClientRect();
        const initialLogoWidth = initialRect.width;
        const initialLogoHeight = initialRect.height; 

        const initialCenterX = window.innerWidth / 2;
        const initialCenterY = window.innerHeight / 2; 

        return {
            initialCenterX, initialCenterY, initialLogoWidth, initialLogoHeight,
            targetCenterX, targetCenterY, targetLogoWidth, targetLogoHeight
        };
    };

    let positions = calculatePositions();

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        const animationThreshold = animationEnd;

        if (currentScrollY <= animationThreshold) {
            
            let progress = (currentScrollY - animationStart) / (animationEnd - animationStart);
            progress = Math.min(1, Math.max(0, progress));

            header.classList.remove('fixed-state');
            header.classList.remove('header-hidden');

            if (progress > 0 && progress < 1) {
                visualLogo.style.position = 'fixed';

                const currentCenterX = lerp(positions.initialCenterX, positions.targetCenterX, progress);
                const currentCenterY = lerp(positions.initialCenterY, positions.targetCenterY, progress);
                const currentWidth = lerp(positions.initialLogoWidth, positions.targetLogoWidth, progress);
                const currentHeight = lerp(positions.initialLogoHeight, positions.targetLogoHeight, progress);

                visualLogo.style.width = `${currentWidth}px`;
                visualLogo.style.height = `${currentHeight}px`;
                visualLogo.style.left = `${currentCenterX - (currentWidth / 2)}px`;
                visualLogo.style.top = `${currentCenterY - (currentHeight / 2)}px`;

                visualLogo.style.transform = 'none';
                visualLogo.style.opacity = '1';
                headerLogoContainer.style.opacity = '0';
            
            } else if (progress === 1) {
                visualLogo.style.opacity = '0';
                headerLogoContainer.style.opacity = '1';
                header.classList.add('fixed-state');

            } else {
                visualLogo.style.position = 'absolute';
                visualLogo.style.top = '50%';
                visualLogo.style.left = '50%';
                visualLogo.style.width = '85%';
                visualLogo.style.height = 'auto';
                visualLogo.style.transform = 'translate(-50%, -50%)';
                visualLogo.style.opacity = '1';
                headerLogoContainer.style.opacity = '0';
            }
        } 
        else {
            header.classList.add('fixed-state');
            visualLogo.style.opacity = '0';
            headerLogoContainer.style.opacity = '1';

            if (currentScrollY > lastScrollY && Math.abs(currentScrollY - lastScrollY) > scrollTolerance) {
                header.classList.add('header-hidden');
            } else if (currentScrollY < lastScrollY) {
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }
    window.addEventListener('resize', () => {
        visualLogo.style.position = 'absolute';
        visualLogo.style.width = '85%';
        visualLogo.style.height = 'auto';

        animationEnd = document.querySelector('.visual').offsetHeight;
        positions = calculatePositions();
        handleScroll();
    });
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

//intro

function splitText(selector) {
    const element = document.querySelector(selector);
    const nodes = Array.from(element.childNodes); // 텍스트와 span들을 모두 가져옴
    element.innerHTML = ""; // 비우기

    nodes.forEach(node => {
        if (node.nodeType === 3) { // 일반 텍스트인 경우
            [...node.textContent].forEach(char => {
                const span = document.createElement("span");
                span.innerText = char === " " ? "\u00A0" : char;
                element.appendChild(span);
            });
        } else if (node.nodeType === 1) { // .index768 같은 span 태그인 경우
            const wrapper = document.createElement("span");
            wrapper.className = node.className; // 클래스 복사 (index768 등)
            
            [...node.textContent].forEach(char => {
                const span = document.createElement("span");
                span.innerText = char === " " ? "\u00A0" : char;
                wrapper.appendChild(span);
            });
            element.appendChild(wrapper);
        }
    });
}

// 실행
document.addEventListener("DOMContentLoaded", function() {
    splitText(".tit");
    splitText(".txt");

    // 타이틀 애니메이션
    gsap.to(".tit span", {
        opacity: 1,
        color: "#fff",
        stagger: 0.05, // 글자 간의 간격 (숫자가 작을수록 빠름)
        scrollTrigger: {
            trigger: ".intro",
            start: "top 60%", // 섹션이 화면 60% 지점에 올 때 시작
            end: "top 20%",   // 섹션이 화면 20% 지점에 올 때 종료
            scrub: 1,         // 스크롤 속도에 맞춤
        }
    });

    // 본문 애니메이션
    gsap.to(".txt span", {
        opacity: 1,
        color: "#eaeaea",
        stagger: 0.02,
        scrollTrigger: {
            trigger: ".intro",
            start: "top 40%",
            end: "top 0%",
            scrub: 1,
        }
    });
});

//product
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const sections = gsap.utils.toArray('.scroll-item');

    ScrollTrigger.matchMedia({
        // [1025px 이상: 데스크탑 기능]
        "(min-width: 1025px)": function() {
            sections.forEach((section, index) => {
                const leftSide = section.querySelector('.left-sticky');
                const title = section.querySelector('.product-title');

                ScrollTrigger.create({
                    id: `productPin_${index}`,
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: leftSide,
                    pinSpacing: false
                });

                ScrollTrigger.create({
                    id: `titlePin_${index}`,
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: title,
                    pinType: "fixed",
                    pinSpacing: false
                });
            });
        },

        // [1024px 이하: 스타일 강제 초기화]
        "(max-width: 1024px)": function() {
            // 1. 특정 ID를 가진 Pin 트리거 제거
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.id && trigger.vars.id.includes('Pin')) {
                    trigger.kill(true);
                }
            });

            // 2. GSAP이 태그에 직접 박아놓은 인라인 스타일 강제 삭제
            gsap.set(".scroll-container, .scroll-item, .scroll-item__inner, .left-sticky, .product-title, .right-content", { 
                clearProps: "all" 
            });
            
            // 768px 이하인지 체크하여 추가 작업
        if (window.innerWidth <= 768) {
            // 내부 스크롤이 남아있을 수 있는 인라인 스타일 제거
            gsap.set(".product-inner .right", { 
                clearProps: "height,overflow" 
            });
        }
            
            // 3. 페이지 높이 재계산
            ScrollTrigger.refresh();
        }
    });
});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    
    // --- [1] 패럴랙스 함수 정의 (Skin Concern용) ---
    const animateImage = (selector, yDist) => {
        gsap.utils.toArray(selector).forEach((container) => {
            const img = container.querySelector('img');
            if (!img) return;

            gsap.to(img, {
                yPercent: yDist,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });
    };
    // --- [2] Skin Concern 애니메이션 실행 ---
    // (이 부분이 다시 살아나야 합니다)
    animateImage('.skin-concern .imgAni', -20);
    animateImage('.model .imgAni', -20);
    animateImage('.day6 .imgAni', -20);


    // 배경색
const sections = [
    { trigger: '.day6', color: '#F0E5E0' }, 
    { trigger: '.scroll-container', color: '#1A1A1E' }, 
    { trigger: '.model', color: '#F0E5E0' },
    { trigger: '.skin-concern', color: '#1A1A1E' } 
];

sections.forEach((sec) => {
    const el = document.querySelector(sec.trigger);
    if (el) {
        ScrollTrigger.create({
            trigger: el,
            // start와 end를 화면 중앙(50%) 기준으로 잡으면 
            // 어떤 방향에서 진입해도 해당 섹션이 화면의 절반을 차지할 때 색이 바뀝니다.
            start: "top 50%", 
            end: "bottom 50%",
            // 내릴 때 진입 (onEnter), 올릴 때 진입 (onEnterBack) 모두 대응
            onEnter: () => gsap.to('body', { backgroundColor: sec.color, duration: 0.6, overwrite: 'auto' }),
            onEnterBack: () => gsap.to('body', { backgroundColor: sec.color, duration: 0.6, overwrite: 'auto' }),
            // [중요] 스크롤을 아주 빨리 할 때를 대비해 상태가 바뀔 때마다 색상 재확인
            onToggle: self => {
                if (self.isActive) gsap.to('body', { backgroundColor: sec.color, duration: 0.6 });
            }
        });
    }
});

// --- [Footer 애니메이션: GSAP 직접 제어 버전] ---
// 페이지의 모든 소스가 로드된 후 실행되도록 window.onload 권장
window.addEventListener('load', () => {
    
    // 타겟 요소 확인
    const footerH3 = document.querySelector('footer .top h3');
    
    if (footerH3) {
        gsap.to(footerH3, {
            clipPath: "inset(0 0% 0 0)",      // 100%에서 0%로 (글자가 나타남)
            webkitClipPath: "inset(0 0% 0 0)", // 사파리 대응
            duration: 0.5,                       // 2초 동안 재생
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "footer",             // footer가 보이기 시작하면
                start: "top 95%",              // footer 상단이 화면 맨 아래에서 5% 올라왔을 때
                // markers: true,              // 이 선이 보이나 확인하세요!
                toggleActions: "play none restart reset" // 처음 한 번만 실행
            }
        });
    }
});


// 모든 설정 후 위치 재계산 (특히 model의 큰 마진 때문에 필수)
ScrollTrigger.refresh();


    // --- [3] Theraphy 섹션 로직 (복제 후 둥둥 애니메이션) ---
    const marqueeContainer = document.querySelector('.marquee-container');
    const marqueeList = document.querySelector('.marquee-content');

    if (marqueeContainer && marqueeList) {
        // 1. HTML 복제 (구조 먼저 완성)
        const originalContent = marqueeList.innerHTML;
        marqueeList.innerHTML = originalContent + originalContent + originalContent;

        gsap.utils.toArray('.theraphy .imgAni2').forEach((box, i) => {
        gsap.to(box, {
            y: i % 2 === 0 ? -15 : 15, // 홀수/짝수 박스가 서로 반대 방향으로 시작
            duration: 1 + Math.random(), // 각자 조금씩 다른 속도로 움직여서 더 자연스럽게
            ease: "sine.inOut", // 부드럽게 가속/감속
            repeat: -1, // 무한 반복
            yoyo: true, // 올라갔다가 다시 내려옴
            delay: i * 0.2 // 순차적으로 움직이기 시작
        });
    });
        // // 2. 복제가 끝난 직후 테라피 박스(둥둥 애니) 적용
        // gsap.utils.toArray('.theraphy .imgAni2').forEach((box, i) => {
        //     gsap.to(box, {
        //         y: i % 2 === 0 ? -60 : -120, // 위로 둥둥 떠오르는 효과
        //         ease: "none",
        //         scrollTrigger: {
        //             trigger: box,
        //             start: "top bottom",
        //             end: "bottom top",
        //             scrub: 1.5,
        //         }
        //     });
        // });

        // 3. 테라피 마우스 호버 효과
        gsap.utils.toArray('.theraphy .imgAni2 img').forEach(img => {
            img.addEventListener('mouseenter', () => gsap.to(img, { filter: 'brightness(100%)', duration: 0.5, overwrite: true }));
            img.addEventListener('mouseleave', () => gsap.to(img, { filter: 'brightness(70%)', duration: 0.5, overwrite: true }));
        });

        // 4. 무한 드래그 로직 (중복 선언 없이 통합)
        let isDown = false;
        let startX, scrollLeft;

        marqueeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            marqueeContainer.style.cursor = 'grabbing';
            startX = e.pageX - marqueeContainer.offsetLeft;
            scrollLeft = marqueeContainer.scrollLeft;
        });

        window.addEventListener('mouseup', () => { isDown = false; if(marqueeContainer) marqueeContainer.style.cursor = 'grab'; });
        
        marqueeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marqueeContainer.offsetLeft;
            const walk = (x - startX) * 2;
            marqueeContainer.scrollLeft = scrollLeft - walk;
        });

        const handleInfiniteScroll = () => {
            const max = marqueeContainer.scrollWidth / 3;
            if (marqueeContainer.scrollLeft <= 0) marqueeContainer.scrollLeft = max;
            else if (marqueeContainer.scrollLeft >= max * 2) marqueeContainer.scrollLeft = max;
        };

        marqueeContainer.addEventListener('scroll', handleInfiniteScroll);
    }

    // --- [텍스트 애니메이션 로직] ---
const textContainers = gsap.utils.toArray('.skin .left');

textContainers.forEach((container) => {
    // 1. 대상 찾기 (Skin Concern의 라벨과 제목)
    const targets = container.querySelectorAll('span.label, h3');
    
    targets.forEach(target => {
        const text = target.innerText;
        target.innerHTML = ''; // 기존 텍스트 비우기
        
        // 2. 단어별로 쪼개서 span.word 태그로 감싸기
        const words = text.split(' ');
        words.forEach(word => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.innerText = word;
            target.appendChild(span);
            
            // 단어 사이 공백 추가
            target.appendChild(document.createTextNode(' '));
        });
    });

    // 3. 스크롤 트리거 애니메이션 설정
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 85%", // 화면 85% 지점에 도달하면 시작
            toggleActions: "play none none reverse", // 다시 올라가면 리셋
        }
    });

    // 박스 전체가 살짝 올라오면서 단어들이 순차적으로 나타남
    tl.fromTo(container, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6 }
    )
    .to(container.querySelectorAll('.word'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1, // 단어 사이의 시간차 (0.1초씩 늦게 나타남)
        ease: "power2.out"
    }, "-=0.3"); // 이전 애니메이션이 끝나기 0.3초 전에 시작
});

   // --- [마우스 커서 로직] ---
const cursorImg = document.querySelector('.cursor-texture');

if (cursorImg) {
    // 1. 커서 이동 최적화 (quickTo 사용)
    const xSetter = gsap.quickTo(cursorImg, "x", { duration: 0.5, ease: "power3" });
    const ySetter = gsap.quickTo(cursorImg, "y", { duration: 0.5, ease: "power3" });

    // 2. 마우스 이동 이벤트
    window.addEventListener('mousemove', (e) => {
        const halfWidth = cursorImg.offsetWidth / 2;
        const halfHeight = cursorImg.offsetHeight / 2;
        
        // 커서 이미지가 마우스 포인터 정중앙에 오도록 계산
        xSetter(e.clientX - halfWidth);
        ySetter(e.clientY - halfHeight);
    });

    // 3. 특정 섹션(Skin Concern) 진입 시에만 나타나게 설정
    const concernSection = document.querySelector('.skin-concern');
    
    if (concernSection) {
        concernSection.addEventListener('mouseenter', () => {
            gsap.to(cursorImg, { autoAlpha: 0.8, scale: 1, duration: 0.3 });
        });

        concernSection.addEventListener('mouseleave', () => {
            gsap.to(cursorImg, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
        });
    }
}
});
