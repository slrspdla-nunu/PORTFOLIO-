const SVGNS = 'http://www.w3.org/2000/svg';

/* =========================================================
   S01 HERO — 인트로 + 스크롤 줌
   ========================================================= */
function start() {
  const svg = document.querySelector('.hero__stage');
  const title = document.getElementById('title');
  const web = document.getElementById('web');
  const robot = document.getElementById('robot');
  const glows = document.querySelectorAll('.glow');
  const accents = document.querySelectorAll('.accent');
  const dots = document.querySelectorAll('.deco');
  const cue = document.querySelector('.scroll-cue');

  // PORTFOLIO를 글자 단위 <text>로 분리 (폰트 메트릭 기준 위치 계산)
  const text = title.textContent;
  const y = title.getAttribute('y');
  const letters = [];
  for (let i = 0; i < text.length; i++) {
    const pos = title.getStartPositionOfChar(i);
    const t = document.createElementNS(SVGNS, 'text');
    t.setAttribute('x', pos.x);
    t.setAttribute('y', y);
    t.setAttribute('fill', '#191919');
    t.setAttribute('font-family', 'A2z');
    t.setAttribute('font-size', '200');
    t.setAttribute('font-weight', '900');
    t.textContent = text[i];
    title.parentNode.insertBefore(t, title.nextSibling);
    letters.push(t);
  }
  title.remove();

  svg.style.visibility = 'visible';
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from([robot, ...glows], { opacity: 0, duration: 0.6 }, 0)
    .from(letters, { y: 90, opacity: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.06 }, 0.15)
    .from(web, { opacity: 0, y: 20, duration: 0.5 }, '-=0.25')
    .from(accents, { opacity: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)', stagger: 0.05 }, '-=0.3');

  // 배경 도트/오브젝트가 천천히 떠다니는 무한 모션
  gsap.to(dots, { y: '+=10', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to(accents, {
    y: '+=14', duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
    stagger: { each: 0.4, from: 'random' },
  });

  // 인트로가 끝난 뒤에만 글자 물결 시작 (등장 애니메이션과 충돌 방지)
  tl.eventCallback('onComplete', () => initHeroTextWave(letters));

  // Hello :) 타이핑 효과
  typeWeb(web);
}

// Hello :) 를 한 글자씩 타이핑 — 사람처럼 글자마다 시간이 다르게 (랜덤 + 공백/이모티콘 앞 뜸)
function typeWeb(web, startDelay = 1350, fullText) {
  if (!web) return;
  const full = (fullText || web.textContent || 'Hello :)').trim();
  web.textContent = '|'; // 타이핑 전에도 커서 표시
  if (prefersReduced()) { web.textContent = full; return; } // 모션 최소화: 즉시 완성

  const rand = () => 60 + Math.random() * 130;              // 기본 타건 간격 60~190ms(불규칙)
  const pauseAfter = (ch) => {
    if (ch === ' ') return 150;   // 공백 뒤 살짝 쉼
    if (ch === ':') return 170;   // 이모티콘 :) 사이 뜸
    if (ch === 'o' || ch === ',') return 90;
    return 0;
  };
  let i = 0;
  const step = () => {
    i += 1;
    web.textContent = full.slice(0, i) + '|';
    if (i < full.length) {
      setTimeout(step, rand() + pauseAfter(full[i - 1]));
    } else {
      let on = true; // 완료 → 커서 깜빡임
      setInterval(() => { on = !on; web.textContent = on ? full + '|' : full; }, 500);
    }
  };
  setTimeout(step, startDelay); // 시작 전 대기
}

/* =========================================================
   공통 — fade-up 리빌 ([data-reveal])
   ========================================================= */
function initReveal() {
  const els = gsap.utils.toArray('[data-reveal]');
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y: 28 });
  ScrollTrigger.batch(els, {
    start: 'top 86%',
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, overwrite: true }),
  });
}

/* =========================================================
   Hero → ABOUT : 원형(아이리스) 리빌 — 스크롤을 멈추지 않고 부드럽게 자동 오픈
   진입 시 원이 스르륵 퍼지며 ABOUT이 드러남(핀 없음 → 스크롤 자연스럽게 유지).
   끝나면 clip 제거 → 하단 콘텐츠 잘림/스티키 카드 충돌 없음.
   ========================================================= */
function initAboutIris() {
  const about = document.getElementById('about');
  if (!about || typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;
  if (prefersReduced()) return; // 정적: clip 없이 표시
  gsap.fromTo(about,
    { clipPath: 'circle(0% at 50% 42%)' },
    {
      clipPath: 'circle(150% at 50% 42%)', ease: 'power2.out', duration: 1.05,
      scrollTrigger: { trigger: about, start: 'top 75%', once: true },
      onComplete: () => { about.style.clipPath = 'none'; about.style.willChange = 'auto'; },
    }
  );
}

/* =========================================================
   S03 SKILL — 게이지 채움 + 숫자 카운트업
   ========================================================= */
function initSkills() {
  gsap.utils.toArray('.stat').forEach((stat) => {
    const val = +stat.dataset.skill || 0;
    const fill = stat.querySelector('.gauge__fill');
    const num = stat.querySelector('.stat__num');
    const counter = { v: 0 };
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(fill, { width: val + '%', duration: 1.1, ease: 'power2.out' });
        gsap.to(counter, {
          v: val, duration: 1.1, ease: 'power2.out',
          onUpdate: () => { num.textContent = Math.round(counter.v); },
        });
      },
    });
  });
}

/* =========================================================
   S04 SELECTED WORKS — 핀 고정 후 스크롤로 프로젝트 전환
   배경 cross-fade · 목업 scale+fade-up · 텍스트 slide-in · 태그 stagger
   ========================================================= */
// 골든 스니치: 컨테이너(호그와트 배경) 영역 안을 불규칙하게 날아다님 (호그와트 레거시 원작 이식)
function initSnitch(container) {
  const snitch = container && container.querySelector('.snitch');
  if (!snitch || prefersReduced()) return null;
  const SW = 92, SH = 61;
  const W = () => container.clientWidth || window.innerWidth;
  const H = () => container.clientHeight || window.innerHeight;
  let sx = W() / 2, sy = H() / 2, tx = sx, ty = sy;
  let mode = 'cruise', modeUntil = 0, rafId = null, running = false, lastSparkle = 0;

  // 금빛 반짝이 잔상 (스니치 궤적을 따라 생겼다 떨어지며 사라짐)
  function dropSparkle(x, y) {
    const s = document.createElement('span');
    s.className = 'gold-sparkle';
    s.style.left = (x + SW / 2 + (Math.random() - 0.5) * 30) + 'px';
    s.style.top = (y + SH / 2 + (Math.random() - 0.5) * 24) + 'px';
    s.style.setProperty('--sx', ((Math.random() - 0.5) * 44) + 'px');
    s.style.setProperty('--sy', (18 + Math.random() * 44) + 'px');
    container.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }

  function newTarget() {
    tx = Math.random() * Math.max(1, W() - SW);
    ty = Math.random() * Math.max(1, H() - SH);
  }
  function pickMode(now) {
    const r = Math.random();
    if (r < 0.24)      { mode = 'hover';  modeUntil = now + 700 + Math.random() * 1500; }
    else if (r < 0.44) { mode = 'dash';   newTarget(); modeUntil = now + 400 + Math.random() * 600; }
    else               { mode = 'cruise'; newTarget(); modeUntil = now + 1200 + Math.random() * 1800; }
  }
  function fly(now) {
    if (!running) return;
    if (now >= modeUntil) pickMode(now);
    const dx = tx - sx, dy = ty - sy;
    if (Math.hypot(dx, dy) < 26 && mode !== 'hover') newTarget();
    const flip = dx < 0 ? -1 : 1;
    if (mode === 'hover') {                       // 제자리에서 날개만 파닥이며 미세하게 떠 있기
      sx += (Math.random() - 0.5) * 1.6;
      sy += Math.sin(now / 90) * 0.9;
    } else if (mode === 'dash') {                 // 후다다닥 질주
      const sp = 0.16 + Math.random() * 0.07;
      sx += dx * sp + (Math.random() - 0.5) * 8;
      sy += dy * sp + (Math.random() - 0.5) * 8;
    } else {                                      // 평범한 불규칙 비행
      const sp = 0.045 + Math.random() * 0.035;
      sx += dx * sp + (Math.random() - 0.5) * 5;
      sy += dy * sp + (Math.random() - 0.5) * 5;
    }
    sx = Math.max(-SW * 0.15, Math.min(W() - SW * 0.85, sx)); // 경계 안 유지
    sy = Math.max(-SH * 0.15, Math.min(H() - SH * 0.85, sy));
    snitch.style.transform = 'translate(' + sx + 'px,' + sy + 'px) scaleX(' + flip + ')';
    // 반짝이: 질주할 땐 자주, 멈춰 있을 땐 드물게
    const gap = mode === 'dash' ? 40 : mode === 'hover' ? 240 : 70;
    if (now - lastSparkle > gap) { dropSparkle(sx, sy); lastSparkle = now; }
    rafId = requestAnimationFrame(fly);
  }
  return {
    setActive(on) {
      if (on && !running) {
        running = true;
        container.classList.add('is-on'); // 페이드 인
        sx = Math.random() * Math.max(1, W() - SW); sy = -SH; // 위에서 등장
        newTarget(); mode = 'dash'; modeUntil = performance.now() + 700;
        rafId = requestAnimationFrame(fly);
      } else if (!on && running) {
        running = false;
        container.classList.remove('is-on'); // 페이드 아웃
        if (rafId) cancelAnimationFrame(rafId);
      }
    },
  };
}

function initWorks() {
  const section = document.querySelector('#works');
  if (!section) return;
  const pin = section.querySelector('.works__pin');
  const panels = gsap.utils.toArray('.wpanel');
  const bgs = gsap.utils.toArray('.works__bg');
  const curEl = section.querySelector('.works__cur');
  const N = panels.length;
  if (N < 2) return;
  const snitch = initSnitch(section.querySelector('.works__snitch'));
  const HOG = panels.findIndex((p) => p.classList.contains('wpanel--hog'));

  // 초기 상태: 첫 프로젝트만 표시
  gsap.set(panels, { opacity: 0 });
  gsap.set(panels[0], { opacity: 1 });
  gsap.set(bgs, { opacity: 0 });
  gsap.set(bgs[0], { opacity: 1 });
  // 겹쳐 쌓인 패널 중 '보이는' 패널만 hover/클릭 받도록 (안 보이는 패널이 가로채는 것 방지)
  panels.forEach((p, i) => { p.style.pointerEvents = i === 0 ? 'auto' : 'none'; });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut', immediateRender: false, overwrite: false },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + window.innerHeight * N, // 뷰포트 기준(섹션 높이와 무관 → 핀 스페이서 피드백 방지)
      pin: pin,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // 한 번에 한 프로젝트씩만 정착하도록 스냅 (겹친 중간 상태에 머무르지 않음)
      snap: {
        snapTo: (v) => Math.round(v * (N - 1)) / (N - 1),
        duration: { min: 0.15, max: 0.4 },
        delay: 0.04,
        ease: 'power1.inOut',
      },
      onUpdate: (self) => {
        const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
        if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
        // 활성 패널이 다크면 상단 헤드를 흰색으로
        section.classList.toggle('is-dark', panels[idx].dataset.theme === 'dark');
        // 활성 패널만 hover/클릭 받도록 (뒤에 겹친 패널의 목업이 hover 가로채는 것 방지)
        panels.forEach((p, i) => { p.style.pointerEvents = i === idx ? 'auto' : 'none'; });
        // 골든 스니치는 호그와트 패널이 활성일 때만 날게 함
        if (snitch) snitch.setActive(idx === HOG);
      },
    },
  });

  // 정착 지점은 정수 시간(0,1,2,3) = 프로젝트별 hold 중앙.
  // 전환은 그 사이 중앙에서 일어나고, 나가는 패널이 먼저 사라진 뒤 들어오는 패널이 등장(겹침 최소화).
  const SWAP = 0.5; // 전환 길이 (정착 간 간격 1 중)
  for (let i = 1; i < N; i++) {
    const start = (i - 1) + (1 - SWAP) / 2;
    // 배경은 전환 구간 전체에 걸쳐 부드럽게 cross-fade
    tl.to(bgs[i - 1], { opacity: 0, duration: SWAP }, start)
      .to(bgs[i], { opacity: 1, duration: SWAP }, start);
    // 콘텐츠: 나가는 패널 → (거의) 다 사라진 뒤 들어오는 패널
    tl.to(panels[i - 1], { opacity: 0, duration: SWAP * 0.45, ease: 'power1.in' }, start)
      .fromTo(panels[i], { opacity: 0 }, { opacity: 1, duration: SWAP * 0.55, ease: 'power1.out' }, start + SWAP * 0.45)
      .fromTo(panels[i].querySelector('.wpanel__visual'),
        { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: SWAP * 0.7, ease: 'power2.out' }, start + SWAP * 0.4)
      .fromTo(panels[i].querySelectorAll('.wpanel__info > *'),
        { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: SWAP * 0.6, stagger: 0.05, ease: 'power2.out' }, start + SWAP * 0.45);
  }
}

/* =========================================================
   S07 CONTACT — 텍스트 등장 + 마스코트 손 흔들기
   ========================================================= */
function initContact() {
  const mascot = document.querySelector('.contact__mascot');
  if (!mascot) return;
  gsap.from(mascot, {
    y: 50, opacity: 0, duration: 0.8, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.contact', start: 'top 72%' },
  });
  gsap.to(mascot, {
    rotation: 8, transformOrigin: 'bottom center', duration: 0.65,
    ease: 'sine.inOut', yoyo: true, repeat: -1,
    scrollTrigger: { trigger: '.contact', start: 'top 72%' },
  });

  // 마스코트 화면에 "Thank you :D" 타이핑 (메인 Hello :) 와 동일 효과, 진입 시 시작)
  const web = document.getElementById('contact-web');
  if (web) {
    const full = (web.textContent || 'Thank you :D').trim();
    const CX = 356; // 로봇(712 뷰박스) 화면 가로 중앙
    if (prefersReduced()) {
      web.setAttribute('x', String(CX)); web.setAttribute('text-anchor', 'middle'); web.textContent = full;
    } else {
      web.textContent = '|'; // 진입 전엔 커서만
      ScrollTrigger.create({
        trigger: '.contact', start: 'top 72%', once: true,
        onEnter: () => {
          web.textContent = full; // 폭 측정용으로 잠깐 완성
          const len = web.getComputedTextLength ? web.getComputedTextLength() : 0;
          if (len) web.setAttribute('x', String(CX - len / 2)); // 전체 문구가 화면 중앙에 오도록 시작점 보정
          typeWeb(web, 300, full); // 타이핑 시작(좌→우), 딜레이 300ms
        },
      });
    }
  }
}

/* =========================================================
   NAV — 스크롤 시 배경 표시 (GSAP 무관하게 동작)
   ========================================================= */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 모바일 햄버거 토글
  const toggle = nav.querySelector('.nav__toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__menu a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
}

/* =========================================================
   인터랙션 업그레이드 (스크롤·hover)
   ========================================================= */
function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 히어로 커서 위치(client px) — 도트 그리드와 텍스트 물결이 공유
const heroPointer = { x: -9999, y: -9999 };
let heroPointerWired = false;
function ensureHeroPointer() {
  if (heroPointerWired) return;
  heroPointerWired = true;
  window.addEventListener('mousemove', (e) => { heroPointer.x = e.clientX; heroPointer.y = e.clientY; }, { passive: true });
  window.addEventListener('mouseleave', () => { heroPointer.x = -9999; heroPointer.y = -9999; });
}

// 부드러운 스크롤 (Lenis ↔ GSAP)
function initSmoothScroll() {
  if (typeof Lenis === 'undefined' || prefersReduced()) return null;
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update(); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // 내부 앵커는 부드럽게 이동
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); lenis.scrollTo(el); }
      }
    });
  });
  return lenis;
}

// 상단 스크롤 진행바
function initProgress() {
  const bar = document.querySelector('.scroll-prog');
  if (!bar) return;
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => { bar.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')'; },
  });
}

// 현재 섹션 nav 강조
function initActiveNav() {
  const links = [...document.querySelectorAll('.nav__menu a')];
  const map = {};
  links.forEach((a) => { const h = a.getAttribute('href'); if (h && h.startsWith('#')) map[h.slice(1)] = a; });
  ['about', 'skill', 'works', 'archive', 'graphic', 'contact'].forEach((id) => {
    const sec = document.getElementById(id);
    const link = map[id];
    if (!sec || !link) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top center', end: 'bottom center',
      onToggle: (self) => {
        if (self.isActive) { links.forEach((l) => l.classList.remove('is-active')); link.classList.add('is-active'); }
      },
    });
  });
}

// 제목 마스크 리빌
function initHeadingReveal() {
  gsap.utils.toArray('[data-reveal-mask]').forEach((el) => {
    const inner = document.createElement('span');
    inner.className = 'rmask__i';
    while (el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(inner);
    el.classList.add('rmask');
    gsap.set(inner, { yPercent: 115 });
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 0.85, ease: 'power3.out' }),
    });
  });
}

// 커스텀 커서
function initCursor() {
  const dot = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  // 초기엔 화면 밖에 두고 숨김 → 첫 마우스 이동 때 표시(구석에 박히는 현상 방지)
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
  let shown = false;
  window.addEventListener('mousemove', (e) => {
    if (!shown) { shown = true; document.body.classList.add('has-cursor'); gsap.set([dot, ring], { x: e.clientX, y: e.clientY }); }
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  });
  const hot = 'a, button, .card, .btn, .wpanel__visual, .tag, .tools li';
  document.querySelectorAll(hot).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hot'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hot'));
  });
}

// 마그네틱 버튼
function initMagnetic() {
  document.querySelectorAll('.btn, .contact__links a, .nav__logo').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
}

// 그래픽 placeholder 그라데이션
function shadeGrad(shade) {
  const s = Math.round(255 * (1 - (shade != null ? shade : 0.25)));
  const hi = Math.min(255, s + 20), lo = Math.max(0, s - 20);
  return `linear-gradient(135deg, rgb(${hi},${hi},${hi}), rgb(${lo},${lo},${lo}))`;
}

// PROJECT ARCHIVE — data.js로 카드 렌더 + 필터
function initArchive() {
  const grid = document.getElementById('archive-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;
  const shades = ['#bdbdbd,#8f8f8f', '#9a9a9a,#6a6a6a', '#cccccc,#9a9a9a', '#7a7a7a,#4d4d4d', '#d2d2d2,#a6a6a6', '#8a8a8a,#5a5a5a', '#b0b0b0,#7d7d7d', '#c4c4c4,#969696'];
  grid.innerHTML = ORDER.map((slug, i) => {
    const p = PROJECTS[slug];
    const badge = p.team ? '<span class="card__badge">TEAM</span>' : '';
    const t = (typeof THUMBS !== 'undefined') ? THUMBS[slug] : null;
    let thumb = '', thumbCls = '';
    if (Array.isArray(t)) { // 여러 장 → 나란히 작게(contain) + 흰 배경
      thumb = `<div class="card__multi">${t.map((src) => `<img src="${src}" alt="${p.title}" loading="lazy">`).join('')}</div>`;
      thumbCls = ' has-img is-multi';
    } else if (t) {         // 단일 → cover 꽉 차게
      thumb = `<img class="card__img" src="${t}" alt="${p.title}" loading="lazy">`;
      thumbCls = ' has-img';
    }
    return `<a class="card" data-type="${p.type}" href="case.html?p=${slug}&from=archive" style="--g:linear-gradient(135deg,${shades[i % shades.length]})">
      <div class="card__thumb${thumbCls}">${thumb}<span class="card__no">${String(i + 1).padStart(2, '0')}</span>${badge}<span class="card__view">VIEW →</span></div>
      <div class="card__body"><h3>${p.title}</h3><p>${p.category} · ${p.year}</p></div>
    </a>`;
  }).join('');

  revealGridItems(grid.querySelectorAll('.card'));

  const fbar = document.getElementById('archive-filter');
  if (fbar) {
    fbar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;
      fbar.querySelectorAll('.filter__btn').forEach((b) => b.classList.toggle('is-on', b === btn));
      const f = btn.dataset.filter;
      grid.querySelectorAll('.card').forEach((c) => { c.style.display = (f === 'all' || c.dataset.type === f) ? '' : 'none'; });
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }
}

// GRAPHIC DESIGN — 배너=두 줄 자동 마퀴, 나머지(모바일·포스터·식순지)=필터 그리드 + 라이트박스(앞뒤 자동 전환)
function initGraphic() {
  const grid = document.getElementById('graphic-grid');
  if (!grid || typeof GRAPHICS === 'undefined') return;
  const typeLabel = (t) => (t === 'Program' ? '식순지' : t);

  // 원본 인덱스 보존(라이트박스 매핑용) 후 배너/그 외 분리
  const items = GRAPHICS.map((g, i) => ({ g, i }));
  const banners = items.filter((x) => x.g.type === 'Banner');
  const rest = items.filter((x) => x.g.type !== 'Banner');

  // 배너 두 줄 마퀴 — 세트를 2배 복제해 translateX(-50%)로 seamless 루프
  const bm = document.getElementById('banner-marquee');
  if (bm && banners.length) {
    const bannerRow = (list, rev) => {
      const slides = list.map((x) =>
        `<span class="bslide"><img class="bslide__img" src="${x.g.img}" alt="${x.g.title}" loading="eager"></span>`).join('');
      const dur = Math.max(28, list.length * 6);
      return `<div class="bmarquee__row${rev ? ' bmarquee__row--rev' : ''}">
        <div class="bmarquee__track" style="animation-duration:${dur}s">${slides}${slides}</div>
      </div>`;
    };
    const mid = Math.ceil(banners.length / 2);
    bm.innerHTML = bannerRow(banners.slice(0, mid), false) + bannerRow(banners.slice(mid), true);
  }

  // 나머지(모바일·포스터·식순지) 그리드 — data-index는 원본 인덱스 → 라이트박스 정확
  grid.innerHTML = rest.map(({ g, i }) => {
    const cls = 'g--' + g.type.toLowerCase(); // g--mobile / g--poster / g--program
    const thumbSrc = g.img || (g.slides && g.slides[0] && g.slides[0].img);
    const twoSide = g.slides && g.slides.length === 2;
    const count = g.slides ? `<span class="gitem__count">${twoSide ? '앞 · 뒤' : g.slides.length + '장'}</span>` : '';
    const thumb = thumbSrc
      ? `<span class="gitem__media"><img class="gitem__img" src="${thumbSrc}" alt="${g.title}" loading="lazy"></span>`
      : `<span class="gitem__media"></span>`;
    return `<button class="gitem ${cls}" data-type="${g.type}" data-index="${i}" style="--g:${shadeGrad(g.shade)}">
      ${thumb}
      <span class="gitem__meta"><span class="gitem__label">${g.title}</span><span class="gitem__type">${typeLabel(g.type)}</span></span>${count}
    </button>`;
  }).join('');

  const fbar = document.getElementById('graphic-filter');
  if (fbar) {
    fbar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;
      fbar.querySelectorAll('.filter__btn').forEach((b) => b.classList.toggle('is-on', b === btn));
      const f = btn.dataset.filter;
      grid.querySelectorAll('.gitem').forEach((t) => { t.style.display = (f === 'all' || t.dataset.type === f) ? '' : 'none'; });
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }

  revealGridItems(grid.querySelectorAll('.gitem'));
  initLightbox(grid);
}

// 라이트박스 (단일/슬라이드)
function initLightbox(grid) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const imgEl = document.getElementById('lightbox-img');
  const capEl = document.getElementById('lightbox-cap');
  const countEl = document.getElementById('lightbox-count');
  const prevBtn = lb.querySelector('.lightbox__nav--prev');
  const nextBtn = lb.querySelector('.lightbox__nav--next');
  const closeBtn = lb.querySelector('.lightbox__close');
  let cur = null, slide = 0, autoTimer = null;

  // 앞뒤(슬라이드) 항목: 보고 있는 동안 몇 초마다 자동 전환
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function startAuto() {
    stopAuto();
    const item = GRAPHICS[cur];
    if (item && item.slides && item.slides.length > 1 && !prefersReduced()) {
      autoTimer = setInterval(() => nav(1), 3000);
    }
  }

  function paint(dir) {
    const item = GRAPHICS[cur];
    const hasSlides = !!item.slides;
    const data = hasSlides ? item.slides[slide] : item;
    const src = data.img || (!hasSlides ? item.img : null);
    // 이미지 갱신 로직 (플립 중간에 호출)
    const setImg = () => {
      if (src) {
        imgEl.innerHTML = `<img src="${src}" alt="${item.title}">`;
        imgEl.className = 'lightbox__img has-img';
        imgEl.style.background = 'none';
      } else {
        imgEl.innerHTML = '';
        imgEl.style.background = shadeGrad(data.shade != null ? data.shade : item.shade);
        imgEl.className = 'lightbox__img ' + (item.type === 'Banner' ? 'is-banner' : item.type === 'Poster' ? 'is-poster' : 'is-cardnews');
      }
    };
    // 캡션·카운트·화살표는 즉시
    capEl.textContent = item.title;
    countEl.textContent = hasSlides ? `${slide + 1} / ${item.slides.length}` : '';
    const showNav = hasSlides ? '' : 'none';
    prevBtn.style.display = showNav; nextBtn.style.display = showNav;
    // 전환: 새 이미지를 기존 위에 겹쳐 슬라이드-인. 기존은 다 덮인 뒤 제거 → 빈 순간(깜빡임) 없음
    const oldImg = imgEl.querySelector('img');
    if (dir && src && oldImg && typeof gsap !== 'undefined' && !prefersReduced()) {
      const d = dir < 0 ? -1 : 1;
      imgEl.className = 'lightbox__img has-img';
      imgEl.style.background = 'none';
      const newImg = document.createElement('img');
      newImg.alt = item.title;
      newImg.className = 'is-incoming';
      newImg.src = src;
      imgEl.appendChild(newImg);
      gsap.fromTo(newImg, { xPercent: 10 * d, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.42, ease: 'power2.out',
          onComplete: () => { if (oldImg && oldImg.parentNode) oldImg.remove(); newImg.classList.remove('is-incoming'); gsap.set(newImg, { clearProps: 'transform,opacity' }); } });
    } else {
      setImg();
    }
  }
  function open(i) {
    cur = i; slide = 0; paint(0); startAuto();
    const it = GRAPHICS[i];
    if (it && it.slides) it.slides.forEach((s) => { if (s.img) { const im = new Image(); im.src = s.img; } }); // 앞뒤 미리 로드
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  }
  function close() { stopAuto(); lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; cur = null; }
  function nav(dir) { const item = GRAPHICS[cur]; if (!item || !item.slides) return; slide = (slide + dir + item.slides.length) % item.slides.length; paint(dir); startAuto(); }

  grid.addEventListener('click', (e) => { const t = e.target.closest('.gitem'); if (t) open(+t.dataset.index); });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => nav(-1));
  nextBtn.addEventListener('click', () => nav(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') nav(-1);
    else if (e.key === 'ArrowRight') nav(1);
  });
}

/* =========================================================
   그리드 스크롤 효과: stagger 리빌 · 이미지 패럴랙스 · 속도 스큐
   ========================================================= */
// 카드/타일이 뷰포트에 들어올 때 아래에서 stagger로 떠오름
function revealGridItems(els) {
  els = [...els];
  if (!els.length || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (prefersReduced()) { gsap.set(els, { opacity: 1 }); return; }
  gsap.set(els, { opacity: 0, y: 26 });
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    // clearProps로 완료 후 inline transform 제거 → CSS hover(translateY) 보존
    onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, clearProps: 'transform', overwrite: true }),
  });
}

// 스크롤 속도에 따라 살짝 기울어짐 (고전 GSAP skew-on-scroll, 적당히)
// hover transform이 없는 안쪽 요소에만 적용 → 카드 hover 뜸 보존
function initScrollVelocity() {
  if (prefersReduced() || typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;
  const targets = document.querySelectorAll('.card__thumb, .gitem__img');
  if (!targets.length) return;
  gsap.set(targets, { transformOrigin: 'center center', force3D: true });
  const setSkew = gsap.quickSetter(targets, 'skewY', 'deg');
  const clamp = gsap.utils.clamp(-3, 3);
  const proxy = { skew: 0 };
  ScrollTrigger.create({
    onUpdate: (self) => {
      const skew = clamp(self.getVelocity() / -600);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, { skew: 0, duration: 0.5, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.skew) });
      }
    },
  });
}

/* =========================================================
   히어로 배경: 인터랙티브 도트 그리드 (캔버스)
   ========================================================= */
function initHeroDots() {
  const canvas = document.querySelector('.hero-fx');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || typeof gsap === 'undefined') return;
  const ctx = canvas.getContext('2d');
  const reduce = prefersReduced();
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const interactive = fine && !reduce;

  const GAP = 40, BASE_R = 1.4, INFL = 150, MAX_SCALE = 3.4, PUSH = 10, BASE_A = 0.12;
  let W = 0, H = 0, dots = [];

  function build() {
    const rect = hero.getBoundingClientRect();
    W = rect.width; H = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1;
    const offX = (W - (cols - 1) * GAP) / 2, offY = (H - (rows - 1) * GAP) / 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const bx = offX + i * GAP, by = offY + j * GAP;
        dots.push({ bx, by, x: bx, y: by, tx: bx, ty: by, r: BASE_R, tr: BASE_R, a: BASE_A, ta: BASE_A });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // 공유 포인터(client px) → 캔버스 로컬 좌표 (스크롤 시에도 정확)
    let mx = -9999, my = -9999;
    if (interactive) {
      const rect = canvas.getBoundingClientRect();
      mx = heroPointer.x - rect.left;
      my = heroPointer.y - rect.top;
    }
    for (const d of dots) {
      if (interactive) {
        const dx = d.bx - mx, dy = d.by - my;
        const dist = Math.hypot(dx, dy);
        if (dist < INFL) {
          const t = 1 - dist / INFL;
          d.tr = BASE_R + t * BASE_R * (MAX_SCALE - 1);
          d.ta = BASE_A + t * 0.4;
          const ang = Math.atan2(dy, dx);
          d.tx = d.bx + Math.cos(ang) * t * PUSH;
          d.ty = d.by + Math.sin(ang) * t * PUSH;
        } else { d.tr = BASE_R; d.ta = BASE_A; d.tx = d.bx; d.ty = d.by; }
        d.r += (d.tr - d.r) * 0.15;
        d.a += (d.ta - d.a) * 0.15;
        d.x += (d.tx - d.x) * 0.15;
        d.y += (d.ty - d.y) * 0.15;
      }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,' + d.a.toFixed(3) + ')';
      ctx.fill();
    }
  }

  build();
  draw();
  window.addEventListener('resize', () => { build(); draw(); });

  if (interactive) {
    ensureHeroPointer();
    gsap.ticker.add(draw);
  }
}

/* =========================================================
   히어로 텍스트: PORTFOLIO 글자 커서 물결 (도트와 동일 감성)
   ========================================================= */
function initHeroTextWave(letters) {
  const svg = document.querySelector('.hero__stage');
  if (!svg || !letters || !letters.length || typeof gsap === 'undefined') return;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (prefersReduced() || !fine) return; // 터치·모션감소: 정적
  ensureHeroPointer();

  const INFL = 340, PUSH = 30, LIFT = -10, SCALE = 0.14, EASE = 0.15;
  // 각 글자 중심을 SVG 유저좌표로 캐시 (getBBox는 element transform 무시 → 안정적 기준)
  const items = letters.map((el) => {
    const b = el.getBBox();
    return { el, cx: b.x + b.width / 2, cy: b.y + b.height / 2, x: 0, y: 0, s: 1, tx: 0, ty: 0, ts: 1 };
  });
  const pt = svg.createSVGPoint();

  function frame() {
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    pt.x = heroPointer.x; pt.y = heroPointer.y;
    const m = pt.matrixTransform(ctm.inverse()); // 커서 → SVG 유저좌표
    for (const it of items) {
      const dx = it.cx - m.x, dy = it.cy - m.y;
      const dist = Math.hypot(dx, dy);
      if (dist < INFL) {
        const t = 1 - dist / INFL;
        const ang = Math.atan2(dy, dx);
        it.tx = Math.cos(ang) * t * PUSH;          // 커서에서 밀려남
        it.ty = Math.sin(ang) * t * PUSH + t * LIFT; // + 살짝 뜸
        it.ts = 1 + t * SCALE;                     // 살짝 커짐
      } else { it.tx = 0; it.ty = 0; it.ts = 1; }
      it.x += (it.tx - it.x) * EASE;
      it.y += (it.ty - it.y) * EASE;
      it.s += (it.ts - it.s) * EASE;
      gsap.set(it.el, { x: it.x, y: it.y, scale: it.s, svgOrigin: it.cx + ' ' + it.cy });
    }
  }

  gsap.ticker.add(frame);
}

/* =========================================================
   부팅
   ========================================================= */
function initSections() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  initReveal();
  initAboutIris();
  initHeadingReveal();
  initSkills();
  initWorks();
  initContact();
  initProgress();
  initArchive();
  initGraphic();
  initScrollVelocity(); // 그리드 렌더 후 (quickSetter 노드 확정)
  initActiveNav();

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
}

function reveal() {
  const svg = document.querySelector('.hero__stage');
  if (svg) svg.style.visibility = 'visible';
}

/* =========================================================
   스크롤 위치 유지 — 프로젝트 상세로 나갔다 돌아와도
   보던 위치(=SELECTED WORKS의 그 프로젝트)로 복원
   ========================================================= */
let pfLenis = null;
const PF_SCROLL_KEY = 'pf_scrollY';

function pfSaveScroll() {
  try { sessionStorage.setItem(PF_SCROLL_KEY, String(Math.round(window.scrollY || window.pageYOffset || 0))); } catch (e) {}
}
function pfReadSavedScroll() {
  try { const v = sessionStorage.getItem(PF_SCROLL_KEY); return v == null ? null : (parseFloat(v) || 0); } catch (e) { return null; }
}
function pfRestoreScroll() {
  const y = pfReadSavedScroll();
  if (!y || y <= 0) return;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = Math.min(y, max);
  if (pfLenis) pfLenis.scrollTo(target, { immediate: true, force: true });
  else window.scrollTo(0, target);
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
}
// 로드 직후엔 폰트 로드·이미지·ScrollTrigger.refresh 등이 잇따라 스크롤을 0으로
// 되돌릴 수 있어, 몇 차례 간격을 두고 복원을 재적용한다(매 프레임 X — Lenis와 충돌).
// 사용자가 스크롤하면 즉시 중단.
function pfRestoreScrollPersistent() {
  const y = pfReadSavedScroll();
  if (!y || y <= 0) return;
  let stop = false;
  const cancel = () => { stop = true; };
  const opt = { passive: true, once: true };
  window.addEventListener('wheel', cancel, opt);
  window.addEventListener('touchstart', cancel, opt);
  window.addEventListener('keydown', cancel, opt);
  [0, 120, 300, 550, 850].forEach((d) => setTimeout(() => { if (!stop) pfRestoreScroll(); }, d));
}
// 저장된 위치가 현재 해시(#works·#archive 등)가 가리키는 섹션 안에 있는지.
// (works 섹션 높이는 핀 스페이서를 포함하므로 그대로 범위로 쓸 수 있음)
function pfSavedIsInHashSection() {
  const id = (location.hash || '').slice(1);
  const el = id && document.getElementById(id);
  const y = pfReadSavedScroll();
  if (!el || !y) return false;
  const top = el.getBoundingClientRect().top + window.scrollY; // 문서 기준 섹션 시작점
  return y >= top - 150 && y <= top + el.getBoundingClientRect().height + 150;
}
// 페이지를 떠날 때 현재 위치 저장 (pagehide는 bfcache 상황에서도 안전)
window.addEventListener('pagehide', pfSaveScroll);
window.addEventListener('beforeunload', pfSaveScroll);

window.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  // 해시 앵커(#about 등)로 진입한 경우는 그쪽을 우선, 아니면 항상 top에서 시작
  const hasHash = !!location.hash && location.hash.length > 1;
  if (!hasHash) window.scrollTo(0, 0);

  initNav();
  initHeroDots();

  // 스크롤 섹션 애니메이션 (히어로 폰트 로드와 무관하게 먼저 준비)
  initSections();

  // 부드러운 스크롤 + 데스크톱 전용 인터랙션
  pfLenis = initSmoothScroll();
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !prefersReduced()) { initCursor(); initMagnetic(); }

  // 히어로: 폰트 로드 후 메트릭 계산 + 인트로
  const safety = setTimeout(reveal, 1500);
  const safeStart = () => { clearTimeout(safety); try { start(); } catch (e) { reveal(); } };
  const ready = document.fonts
    ? Promise.all([document.fonts.load('900 200px A2z'), document.fonts.load('bold 96px Galmuri11')]).then(() => document.fonts.ready)
    : Promise.resolve();
  ready.then(safeStart).catch(safeStart);

  // 스크롤 레이아웃(핀 스페이서 높이)이 확정된 뒤 저장된 위치로 복원.
  //  - 해시 없이 진입(브라우저 뒤로가기 등) → 저장 위치로 복원
  //  - 섹션 해시로 진입(#works·#archive 등, 케이스 페이지의 BACK 버튼·상단 메뉴) →
  //    저장 위치가 그 섹션 안이면 그 위치(그 프로젝트/카드)로 복원, 아니면 해시(섹션 상단) 우선
  if (pfReadSavedScroll() > 0) {
    const whenLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener('load', r, { once: true }));
    const whenFonts = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    Promise.all([whenLoaded, whenFonts]).then(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      // 해시가 있는데 저장 위치가 그 섹션 밖이면 해시(그 섹션 상단)를 우선 → 복원 생략
      if (hasHash && !pfSavedIsInHashSection()) return;
      setTimeout(pfRestoreScrollPersistent, 0);
    });
  }
});
