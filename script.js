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

  // 히어로 패럴랙스 (글자 split 이후 실행 — 요소가 존재할 때)
  if (typeof ScrollTrigger !== 'undefined' && !prefersReduced()) initHeroParallax();
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
function initWorks() {
  const section = document.querySelector('#works');
  if (!section) return;
  const pin = section.querySelector('.works__pin');
  const panels = gsap.utils.toArray('.wpanel');
  const bgs = gsap.utils.toArray('.works__bg');
  const curEl = section.querySelector('.works__cur');
  const N = panels.length;
  if (N < 2) return;

  // 초기 상태: 첫 프로젝트만 표시
  gsap.set(panels, { opacity: 0 });
  gsap.set(panels[0], { opacity: 1 });
  gsap.set(bgs, { opacity: 0 });
  gsap.set(bgs[0], { opacity: 1 });

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
        if (!curEl) return;
        const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
        curEl.textContent = String(idx + 1).padStart(2, '0');
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

// 히어로 패럴랙스 (글자 split 이후 호출)
function initHeroParallax() {
  const robot = document.getElementById('robot');
  if (!robot) return;
  const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to(robot, { y: 48, ease: 'none', scrollTrigger: st });
  gsap.to(document.querySelectorAll('.hero__stage text'), { y: -28, ease: 'none', scrollTrigger: st });
  gsap.to(document.querySelectorAll('.glow'), { y: 80, ease: 'none', scrollTrigger: st });
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
    return `<a class="card" data-type="${p.type}" href="case.html?p=${slug}" style="--g:linear-gradient(135deg,${shades[i % shades.length]})">
      <div class="card__thumb"><span class="card__no">${String(i + 1).padStart(2, '0')}</span>${badge}<span class="card__view">VIEW →</span></div>
      <div class="card__body"><h3>${p.title}</h3><p>${p.category} · ${p.year}</p></div>
    </a>`;
  }).join('');

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

// GRAPHIC DESIGN — data.js로 타일 렌더 + 필터 + 라이트박스
function initGraphic() {
  const grid = document.getElementById('graphic-grid');
  if (!grid || typeof GRAPHICS === 'undefined') return;
  grid.innerHTML = GRAPHICS.map((g, i) => {
    const cls = g.type === 'Banner' ? 'g--banner' : (g.type === 'Poster' ? 'g--poster' : 'g--cardnews');
    const count = g.slides ? `<span class="gitem__count">${g.slides.length}장</span>` : '';
    const thumb = g.img ? `<span class="gitem__media"><img class="gitem__img" src="${g.img}" alt="${g.title}" loading="lazy"></span>` : `<span class="gitem__media"></span>`;
    return `<button class="gitem ${cls}" data-type="${g.type}" data-index="${i}" style="--g:${shadeGrad(g.shade)}">
      ${thumb}
      <span class="gitem__meta"><span class="gitem__label">${g.title}</span><span class="gitem__type">${g.type}</span></span>${count}
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
  let cur = null, slide = 0;

  function paint() {
    const item = GRAPHICS[cur];
    const hasSlides = !!item.slides;
    const data = hasSlides ? item.slides[slide] : item;
    const src = data.img || (!hasSlides ? item.img : null);
    if (src) {
      // 실제 이미지: 원본 비율 그대로
      imgEl.innerHTML = `<img src="${src}" alt="${item.title}">`;
      imgEl.className = 'lightbox__img has-img';
      imgEl.style.background = 'none';
    } else {
      // placeholder: 그라데이션 박스
      imgEl.innerHTML = '';
      imgEl.style.background = shadeGrad(data.shade != null ? data.shade : item.shade);
      imgEl.className = 'lightbox__img ' + (item.type === 'Banner' ? 'is-banner' : item.type === 'Poster' ? 'is-poster' : 'is-cardnews');
    }
    capEl.textContent = item.title;
    countEl.textContent = hasSlides ? `${slide + 1} / ${item.slides.length}` : '';
    const showNav = hasSlides ? '' : 'none';
    prevBtn.style.display = showNav; nextBtn.style.display = showNav;
  }
  function open(i) { cur = i; slide = 0; paint(); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; cur = null; }
  function nav(dir) { const item = GRAPHICS[cur]; if (!item || !item.slides) return; slide = (slide + dir + item.slides.length) % item.slides.length; paint(); }

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
   부팅
   ========================================================= */
function initSections() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  initReveal();
  initHeadingReveal();
  initSkills();
  initWorks();
  initContact();
  initProgress();
  initArchive();
  initGraphic();
  initActiveNav();

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
}

function reveal() {
  const svg = document.querySelector('.hero__stage');
  if (svg) svg.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  initNav();

  // 스크롤 섹션 애니메이션 (히어로 폰트 로드와 무관하게 먼저 준비)
  initSections();

  // 부드러운 스크롤 + 데스크톱 전용 인터랙션
  initSmoothScroll();
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !prefersReduced()) { initCursor(); initMagnetic(); }

  // 히어로: 폰트 로드 후 메트릭 계산 + 인트로
  const safety = setTimeout(reveal, 1500);
  const safeStart = () => { clearTimeout(safety); try { start(); } catch (e) { reveal(); } };
  const ready = document.fonts
    ? document.fonts.load('900 200px A2z').then(() => document.fonts.ready)
    : Promise.resolve();
  ready.then(safeStart).catch(safeStart);
});
