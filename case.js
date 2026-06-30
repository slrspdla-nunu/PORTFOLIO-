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

  document.title = `${d.title} — 김주휘 Portfolio`;
  document.body.setAttribute('data-theme', d.theme || 'light');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cs-no', d.no);
  set('cs-title', d.title);
  set('cs-summary', d.summary);
  set('cs-cat', d.category);
  set('cs-year', d.year);
  set('cs-role', d.role);
  set('cs-contrib', d.contribution + '%');
  set('cs-problem', d.problem);
  set('cs-goal', d.goal);
  set('cs-outcome', d.outcome);
  set('cs-learnings', d.learnings);

  const bar = document.getElementById('cs-contrib-bar');
  if (bar) bar.style.setProperty('--p', d.contribution + '%');

  const tools = document.getElementById('cs-tools');
  if (tools) tools.innerHTML = d.tools.map((t) => `<li>${t}</li>`).join('');

  const proc = document.getElementById('cs-process');
  if (proc) proc.innerHTML = d.process.map((p, i) => `
    <li class="cs-step"><span class="cs-step__idx">${String(i + 1).padStart(2, '0')}</span>
    <div class="cs-step__body"><h4>${p.step}</h4><p>${p.desc}</p></div></li>`).join('');

  const dec = document.getElementById('cs-decisions');
  if (dec) dec.innerHTML = d.decisions.map((x) => `
    <li class="cs-dec"><h4>${x.title}</h4><p>${x.desc}</p></li>`).join('');

  const visual = document.getElementById('cs-visual');
  if (visual) visual.innerHTML = mockHTML(d.mock, d.theme);

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

  // prev / next (전체 8개 순환)
  const idx = ORDER.indexOf(slug);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  const prevA = document.getElementById('cs-prev');
  const nextA = document.getElementById('cs-next');
  if (prevA) { prevA.href = `case.html?p=${prev}`; prevA.querySelector('.cs-navlink__title').textContent = PROJECTS[prev].title; }
  if (nextA) { nextA.href = `case.html?p=${next}`; nextA.querySelector('.cs-navlink__title').textContent = PROJECTS[next].title; }
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
