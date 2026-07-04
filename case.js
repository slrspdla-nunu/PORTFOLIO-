/* =========================================================
   케이스 스터디 렌더링 (데이터는 data.js의 PROJECTS/ORDER)
   페이지: case.html?p=<slug>
   ========================================================= */
function mockHTML(type, theme) {
  const screen = (cls) => `<div class="device__screen">${cls}</div>`;
  const uiApp = '<div class="ui ui-app"><span class="ui-status"></span><span class="ui-head"></span><span class="ui-row"></span><span class="ui-row"></span><span class="ui-row"></span><span class="ui-tabbar"></span></div>';
  const uiWeb = '<div class="ui ui-web"><span class="ui-top"><i></i><i></i><i></i><b></b></span><span class="ui-hero"></span><span class="ui-ln ui-ln--1"></span><span class="ui-ln ui-ln--2"></span><span class="ui-cards"><i></i><i></i><i></i><i></i></span></div>';
  const uiShop = '<div class="ui ui-shop"><span class="ui-top"><i></i><i></i><i></i><b></b></span><span class="ui-nav"></span><span class="ui-prods"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>';
  const shot = theme === 'dark' ? '--shotA:linear-gradient(160deg,#333,#141414)' : '--shotA:linear-gradient(150deg,#e6e6e6,#bdbdbd)';
  if (type === 'app') {
    const shotC = theme === 'dark' ? '--shotC:linear-gradient(160deg,#333,#141414)' : '--shotC:linear-gradient(160deg,#fff,#e6e6e6)';
    return `<div class="mockup mockup--solo-phone" style="${shotC}"><div class="device device--phone"><div class="device__notch"></div>${screen(uiApp)}</div></div>`;
  }
  const ui = type === 'shop' ? uiShop : uiWeb;
  return `<div class="mockup mockup--solo" style="${shot}"><div class="device device--laptop"><div class="device__bar"></div>${screen(ui)}</div></div>`;
}

function render() {
  if (typeof PROJECTS === 'undefined') return;
  const params = new URLSearchParams(location.search);
  let slug = params.get('p');
  if (!PROJECTS[slug]) slug = ORDER[0];
  const d = PROJECTS[slug];

  // 출처(from): 아카이브에서 들어왔으면 아카이브로, 아니면 WORKS로 돌아가게
  const from = params.get('from');
  const back = document.querySelector('.cs-back');
  if (back) {
    if (from === 'archive') { back.href = 'index.html#archive'; back.textContent = '← BACK TO ARCHIVE'; }
    else { back.href = 'index.html#works'; back.textContent = '← BACK TO WORKS'; }
  }

  document.title = `${d.title} — 김주휘 Portfolio`;
  document.body.setAttribute('data-theme', d.theme || 'light');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cs-no', d.no);
  set('cs-title', d.title);
  set('cs-summary', d.summary);
  set('cs-cat', d.category);
  set('cs-year', d.year);
  set('cs-role', d.role);
  set('cs-responsive', d.responsive === false ? '데스크톱 전용' : 'PC · 모바일 대응');
  set('cs-problem', d.problem);
  set('cs-goal', d.goal);
  set('cs-outcome', d.outcome);
  set('cs-learnings', d.learnings);

  // CONTRIBUTION: 숫자면 퍼센트+막대, 문자열이면 "무엇을 했는지" 텍스트(막대 숨김)
  const bar = document.getElementById('cs-contrib-bar');
  const barWrap = bar ? bar.parentElement : null; // .spec__bar
  if (typeof d.contribution === 'number') {
    set('cs-contrib', d.contribution + '%');
    if (bar) bar.style.setProperty('--p', d.contribution + '%');
    if (barWrap) barWrap.style.display = '';
  } else {
    set('cs-contrib', d.contribution || '—');
    if (barWrap) barWrap.style.display = 'none';
  }

  const tools = document.getElementById('cs-tools');
  if (tools) tools.innerHTML = d.tools.map((t) => `<li>${t}</li>`).join('');

  const proc = document.getElementById('cs-process');
  if (proc) proc.innerHTML = d.process.map((p, i) => `
    <li class="cs-step"><span class="cs-step__idx">${String(i + 1).padStart(2, '0')}</span>
    <div class="cs-step__body"><h4>${p.step}</h4><p>${p.desc}</p></div></li>`).join('');

  const dec = document.getElementById('cs-decisions');
  if (dec) dec.innerHTML = d.decisions.map((x) => `
    <li class="cs-dec"><h4>${x.title}</h4><p>${x.desc}</p></li>`).join('');

  // 라이브 사이트 링크 — d.link 있을 때만 버튼 표시
  const live = document.getElementById('cs-live');
  if (live) {
    if (d.link) { live.href = d.link; live.style.display = ''; }
    else { live.style.display = 'none'; }
  }

  // 피그마 프로토타입 링크 — d.figmaProto 있을 때만 버튼 표시(새 탭)
  const proto = document.getElementById('cs-proto');
  if (proto) {
    if (d.figmaProto) { proto.href = d.figmaProto; proto.style.display = ''; }
    else { proto.style.display = 'none'; }
  }

  const visual = document.getElementById('cs-visual');
  if (visual) {
    const t = (typeof THUMBS !== 'undefined') ? THUMBS[slug] : null;
    if (Array.isArray(t)) {          // 여러 장 → 나란히(전체 보이게) + 흰 배경
      visual.className = 'cs-cover is-multi';
      visual.innerHTML = t.map((src) => `<img class="cs-cover__img" src="${src}" alt="${d.title}">`).join('');
    } else if (t) {                  // 단일 → 커버를 꽉 채우게
      visual.className = 'cs-cover is-fill';
      visual.innerHTML = `<img class="cs-cover__img" src="${t}" alt="${d.title}">`;
    } else {                         // 썸네일 없으면 기존 와이어프레임 목업
      visual.className = 'cs-cover';
      visual.innerHTML = mockHTML(d.mock, d.theme);
    }
  }

  // 갤러리 스트립: 실제 이미지(d.gallery) 있으면 img, 없으면 흑백 placeholder 프레임
  const gal = document.getElementById('cs-gallery');
  if (gal) {
    if (d.gallery && d.gallery.length) {
      gal.innerHTML = d.gallery.map((src) => `<figure class="cs-shot"><img src="${src}" alt="${d.title}" loading="lazy"></figure>`).join('');
    } else {
      const shades = [0.16, 0.28, 0.20];
      gal.innerHTML = shades.map((s) => {
        const v = Math.round(255 * (1 - s));
        const hi = Math.min(255, v + 18), lo = Math.max(0, v - 18);
        return `<figure class="cs-shot cs-shot--ph" style="background:linear-gradient(135deg,rgb(${hi},${hi},${hi}),rgb(${lo},${lo},${lo}))"></figure>`;
      }).join('');
    }
  }

  // 제작 페이지 목록 — d.pages 있을 때만 섹션 표시
  const pagesSec = document.getElementById('cs-pages-sec');
  const pagesUl = document.getElementById('cs-pages');
  const pagesCount = document.getElementById('cs-pages-count');
  if (pagesSec) {
    if (Array.isArray(d.pages) && d.pages.length) {
      pagesSec.style.display = '';
      if (pagesUl) pagesUl.innerHTML = d.pages.map((p) => `<li>${p}</li>`).join('');
      if (pagesCount) pagesCount.textContent = `총 ${d.pages.length}개`;
    } else {
      pagesSec.style.display = 'none';
    }
  }

  // 본문 섹션 번호를 "보이는 섹션"만 세어 다시 매김(숨겨진 PAGES로 번호가 비지 않도록)
  let secN = 0;
  document.querySelectorAll('.cs-body .cs-sec').forEach((sec) => {
    if (sec.style.display === 'none') return;
    secN += 1;
    const idxEl = sec.querySelector('.cs-sec__idx');
    if (idxEl) idxEl.textContent = String(secN).padStart(2, '0');
  });

  // prev / next (전체 8개 순환)
  const idx = ORDER.indexOf(slug);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  const prevA = document.getElementById('cs-prev');
  const nextA = document.getElementById('cs-next');
  const fromQ = from ? `&from=${from}` : ''; // prev/next로 이동해도 출처 유지
  if (prevA) { prevA.href = `case.html?p=${prev}${fromQ}`; prevA.querySelector('.cs-navlink__title').textContent = PROJECTS[prev].title; }
  if (nextA) { nextA.href = `case.html?p=${next}${fromQ}`; nextA.querySelector('.cs-navlink__title').textContent = PROJECTS[next].title; }
}

function initCaseNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const toggle = nav.querySelector('.nav__toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('.nav__menu a').forEach((a) =>
    a.addEventListener('click', () => nav.classList.remove('is-open'))
  );
}

document.addEventListener('DOMContentLoaded', () => { render(); initCaseNav(); });
