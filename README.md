# PORTFOLIO — 김주휘

> 사용자 경험을 시각적으로 즐겁게 풀어내는 **웹 · UI/UX 디자이너 김주휘**의 포트폴리오 사이트

**🔗 Live** — https://slrspdla-nunu.github.io/PORTFOLIO-/

흑백(B&W) + 오렌지 포인트의 미니멀한 톤에, 스크롤마다 반응하는 인터랙션을 얹어
"정보를 나열"하기보다 **끝까지 보게 만드는** 것을 목표로 만든 원페이지 포트폴리오입니다.

---

## ✨ Features

- **커서 반응 점 그리드** — Hero 배경의 점들이 마우스에 반응
- **AI 채팅 인트로** — Hello :) 이후, 포트폴리오 기획 의도를 타이핑으로 소개
- **원형(아이리스) 리빌** — About 진입 시 원이 퍼지며 등장
- **핀 고정 프로젝트 스위처** — Selected Works를 한 화면씩 고정 전환 (배경 영상·목업·프로젝트별 컬러)
- **골든 스니치** — 호그와트 패널에 숨겨둔 인터랙션
- **Project Archive** — 카드 그리드 + 스크롤 시 한 줄 소개 말풍선
- **케이스 스터디** — 프로젝트별 상세 페이지 (문제→과정→결정→결과)
  - 리디자인: **BEFORE / AFTER** 비교 · 원본: **MAIN SCREEN** 풀샷
  - 이미지 클릭 **라이트박스** 확대, **VISIT SITE / PROTOTYPE** 링크
- **부드러운 스크롤 · 스크롤 애니메이션** (Lenis + GSAP ScrollTrigger)
- **반응형** (PC · 모바일) · 다크/라이트 목업 · 접근성 포커스 · reduced-motion 대응

---

## 🛠 Tech

- **Vanilla HTML · CSS · JavaScript** (프레임워크·빌드 과정 없음)
- [GSAP](https://gsap.com/) + **ScrollTrigger** — 스크롤 연출·핀 고정
- [Lenis](https://lenis.darkroom.engineering/) — 부드러운 스크롤
- Fonts — **A2z**(타이틀) · **Galmuri**(픽셀)
- 배포 — **GitHub Pages** (정적 호스팅)

---

## 📁 Structure

```
portfolio/
├── index.html      # 메인 원페이지 (Hero·About·Skill·Works·Archive·Graphic·Contact)
├── case.html       # 프로젝트 케이스 스터디 (case.html?p=<slug>)
├── data.js         # 프로젝트 공유 데이터 (index·case 둘 다 로드)
├── script.js       # 메인 인터랙션·스크롤 연출
├── case.js         # 케이스 페이지 렌더링
├── style.css       # 전체 스타일 (디자인 토큰·섹션·컴포넌트)
└── image/          # 썸네일·목업·배경·프로젝트 이미지
```

프로젝트 내용(제목·설명·이미지·링크 등)은 **`data.js` 한 곳**에서 관리합니다.

---

## 🚀 Run locally

정적 사이트라 서버만 있으면 됩니다.

```bash
# 저장소 클론 후
python3 -m http.server 8080
# → http://localhost:8080
```

---

## 📮 Contact

- **Email** — kjh20021105@gmail.com
- **GitHub** — https://github.com/slrspdla-nunu

---

© 2026 김주휘 — Designed & Built with :)
