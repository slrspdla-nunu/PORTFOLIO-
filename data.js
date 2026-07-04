/* =========================================================
   공유 데이터 (index.html · case.html 둘 다 로드)
   - 프로젝트/그래픽 내용은 모두 이 파일에서 수정하면 됩니다.
   - 케이스 본문은 placeholder. 실제 내용/이미지로 교체하세요.
   ========================================================= */

/* 프로젝트 8개. featured:true → SELECTED WORKS 핀 전환에 노출.
   type: Web | App | Commerce  (ARCHIVE 필터 기준)
   mock: web | app | shop      (목업 와이어프레임 종류)
   theme: light | dark         (다크는 어두운 무드 목업)
   gallery: ['image/a.png', ...]  (선택) 케이스 페이지 VISUALS 스트립 이미지. 없으면 placeholder. */
const PROJECTS = {
  'dingo': {
    no: 'PROJECT 01', title: 'Dingo 리디자인', category: 'Web Redesign', type: 'Web', year: '2026',
    link: 'https://slrspdla-nunu.github.io/Dingo/',
    team: false, featured: false, theme: 'light', mock: 'web',
    summary: '영상·음악 콘텐츠 브랜드 Dingo의 홈페이지 리디자인. 브랜드 무드와 핵심 콘텐츠 진입을 첫 화면에서 강화했습니다.',
    role: 'UI 디자인 · AI 활용 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Gemini', 'ChatGPT','Claude'],
    problem: '원본(makeus.com)은 기존 템플릿 기반 기업 사이트 구조로, 메뉴·정보는 많지만 첫 화면에서 브랜드 감성과 최신 영상·음악이 잘 드러나지 않았습니다.',
    goal: '대메뉴 구조(Company·Content·Business·Contact)는 그대로 두되, 히어로와 큐레이션으로 콘텐츠 감성과 진입 동선을 끌어올리는 것.',
    process: [
      { step: 'Analyze', desc: '원본(makeus.com)의 IA·진입 동선과 템플릿 기반 구조의 한계 정리.' },
      { step: 'Wireframe', desc: '히어로·딩고 큐레이션·스튜디오 지표·플레이리스트 순으로 우선순위 재설계.' },
      { step: 'UI Design', desc: '브랜드 컬러/타이포 시스템 재정의와 데코 그래픽 무드 설정.' },
      { step: 'Interaction', desc: 'Killing Voice 바이닐 플레이어·큐레이션 필터 등 인터랙션 설계.' },
      { step: 'Publishing', desc: 'HTML·CSS·jQuery로 반응형 마크업과 스크롤 애니메이션 구현.' },
    ],
    decisions: [
      { title: '콘텐츠 우선 히어로', desc: "기업 태그라인 중심이던 첫 화면을 'It's time to dingo' 카피·추천 아티스트로 바꿔 콘텐츠 감성을 강조." },
      { title: '믿고 보는 큐레이션', desc: '원본의 채널 나열 방식 대신 ALL·LIVE·INTERVIEW·MUSIC 필터로 영상을 한 곳에서 탐색.' },
      { title: '지표 섹션 정돈', desc: '원본에도 있던 구독자·시청시간·콘텐츠 수 롤링 지표를 유지하되 시각적으로 정돈해 신뢰를 강화.' },
      { title: '몰입형 뮤직 플레이어', desc: '원본엔 없던 Killing Voice 바이닐·시크바 인터랙션을 더해 음악 콘텐츠 경험을 강화.' },
    ],
    outcome: '기업 소개형 첫인상이 콘텐츠 브랜드다운 무드로 바뀌고, 영상·음악 진입 동선이 짧아졌습니다. 언어 선택도 KOR·ENG에서 4개국어로 확장했습니다.',
    learnings: '메뉴가 많은 브랜드일수록 리디자인은 "새로 그리기"보다 "우선순위 다시 잡기"라는 걸 체감했고, jQuery로 인터랙션을 직접 구현하며 디자인–퍼블리싱 간극을 좁혔습니다.',
  },
  'class101': {
    no: 'PROJECT 02', title: 'Class101 리디자인', category: 'Web Redesign', type: 'Web', year: '2024',
    link: 'https://slrspdla-nunu.github.io/Class101/',
    team: false, featured: false, theme: 'light', mock: 'web',
    summary: '온라인 클래스 플랫폼 Class101의 홈 리디자인. 밝은 마켓형 화면을 다크·네온 무드로 바꿔 브랜드 개성과 탐색 흐름을 강화했습니다.',
    role: 'UX/UI · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'HTML/CSS', 'JavaScript'],
    problem: '예전 Class101은 "세상의 모든 클래스를 하나의 구독으로"를 내세웠지만, 클래스가 4,000개 이상으로 많아 무엇부터 볼지 막막하고 밝은 마켓형 화면에서 브랜드 개성이 옅었습니다.',
    goal: '방대한 클래스를 관심사 추천과 명확한 카테고리로 정돈하고, 다크·네온 무드로 브랜드 개성과 몰입감을 높이는 것.',
    process: [
      { step: 'Research', desc: '예전 Class101(구독 모델)의 정보 구조와 탐색·추천 흐름 정리.' },
      { step: 'Flow', desc: '추천 → 카테고리 → 클래스 상세 → 멤버십 흐름 재설계.' },
      { step: 'UI Design', desc: '다크 팔레트 + 네온 옐로우 그라디언트 디자인 시스템 정의.' },
      { step: 'Interaction', desc: 'Swiper 히어로 슬라이더·아코디언 메가메뉴·드래그 캐러셀·카드 hover 설계.' },
      { step: 'Publishing', desc: 'HTML·CSS·바닐라 JS로 멀티페이지 구현(로그인은 localStorage 목업).' },
    ],
    decisions: [
      { title: '무드 대전환', desc: '밝은 마켓형 화면을 다크 배경 + 네온 옐로우 포인트로 바꿔 브랜드 개성과 몰입감을 강화.' },
      { title: '추천 우선', desc: '"님을 위한 추천 클래스"처럼 첫 화면을 관심사 추천으로 시작해 진입 장벽을 낮춤.' },
      { title: '메가메뉴 카테고리', desc: '일러스트·공예·코딩 등 방대한 분류를 아코디언 메가메뉴로 상시 탐색.' },
      { title: '몰입형 카드·슬라이더', desc: 'Swiper 슬라이더와 hover glow·zoom 카드로 클래스 탐색에 리듬감을 더함.' },
    ],
    outcome: '탐색 피로를 줄이면서, 밋밋하던 브랜드 인상을 또렷한 다크·네온 무드로 끌어올렸습니다.',
    learnings: '레퍼런스를 그대로 베끼기보다 브랜드 톤을 재해석하는 게 리디자인의 핵심임을 배웠고, 바닐라 JS로 슬라이더·메뉴 인터랙션을 직접 구현했습니다.',
  },
  'purrcare': {
    no: 'PROJECT 03', title: 'PurrCare 쇼핑몰', category: 'Commerce', type: 'Commerce', year: '2025',
    link: 'https://slrspdla-nunu.github.io/0610_purrcare/',
    team: false, featured: true, theme: 'light', mock: 'shop',
    summary: '고양이 용품 쇼핑몰 PurrCare 홈페이지 디자인.',
    role: '기획 · UI/UX · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'Illustrator', '카페24'],
    problem: '상품이 많지만 정돈되지 않아 브랜드 인상이 약하고 상품이 묻혔습니다.',
    goal: '상품이 주인공이 되는 그리드와 따뜻한 브랜드 톤으로 신뢰감 있는 쇼핑 경험.',
    process: [
      { step: 'Research', desc: '레퍼런스 쇼핑몰의 그리드·여백·상품 카드 분석.' },
      { step: 'Branding', desc: '따뜻하고 말랑한 브랜드 톤 정의.' },
      { step: 'UI Design', desc: '상품 중심 카드 그리드 + 절제된 컬러.' },
      { step: 'Publishing', desc: 'PC·모바일 반응형 구현.' },
    ],
    decisions: [
      { title: '상품 우선', desc: '장식을 줄여 상품 이미지가 돋보이게 했습니다.' },
      { title: '일관된 카드', desc: '카드 규격 통일로 목록을 정돈.' },
    ],
    outcome: '정돈된 그리드로 브랜드 인상과 상품 가독성이 함께 좋아졌습니다.',
    learnings: '커머스에서는 "절제"가 곧 상품을 돋보이게 하는 디자인입니다.',
  },
  'local-community': {
    no: 'PROJECT 04', title: 'HOLO', category: 'App · Team', type: 'App', year: '2025',
    team: true, featured: true, theme: 'light', mock: 'app',
    summary: '동네 이웃을 연결하는 지역 커뮤니티 모바일 앱 (팀 프로젝트).',
    role: 'UI 디자인 · 프로토타입 (팀 4인)', contribution: 50,
    tools: ['Figma', 'Photoshop'],
    problem: '지역 정보가 여러 채널에 흩어져 있어 이웃 간 소통이 번거로웠습니다.',
    goal: '동네 글·모임·중고거래를 한 앱에서 가볍게 주고받도록 설계.',
    process: [
      { step: 'Research', desc: '지역 커뮤니티 사용 행태 인터뷰.' },
      { step: 'IA', desc: '피드·모임·거래 구조 정의(팀 협업).' },
      { step: 'UI Design', desc: '담당 화면(피드·작성) UI 설계.' },
      { step: 'Prototype', desc: '핵심 플로우 프로토타입 검증.' },
    ],
    decisions: [
      { title: '가벼운 작성', desc: '글쓰기 단계를 최소화해 참여 장벽을 낮춤.' },
      { title: '동네 중심 피드', desc: '거리 기반 정렬로 관련성을 높임.' },
    ],
    outcome: '핵심 플로우(글 작성·모임 참여)가 단순해졌습니다.',
    learnings: '팀 협업에서 화면 간 일관성을 맞추는 커뮤니케이션의 중요성을 배웠습니다.',
  },
  'imagination-door': {
    no: 'PROJECT 05', title: '상상의 문 리디자인', category: 'Web · Team', type: 'Web', year: '2024',
    link: 'https://doorlove1234-coder.github.io/sangsangDoor/',
    team: true, featured: false, theme: 'light', mock: 'web',
    summary: '전시/문화 공간 "상상의 문" 홈페이지 리디자인 (팀 프로젝트).',
    role: 'UI 디자인 (팀 3인)', contribution: 40,
    tools: ['Figma', 'Photoshop'],
    problem: '전시 정보가 분산되고 예약 동선이 길었습니다.',
    goal: '전시 소개와 예약을 매끄럽게 잇는 정보 구조.',
    process: [
      { step: 'Audit', desc: '기존 사이트 동선 점검.' },
      { step: 'Wireframe', desc: '전시→예약 흐름 재설계(팀).' },
      { step: 'UI Design', desc: '담당 섹션 비주얼 정리.' },
    ],
    decisions: [
      { title: '예약 단축', desc: '전시 상세에서 바로 예약으로 연결.' },
      { title: '비주얼 강조', desc: '전시 이미지를 크게 노출해 몰입.' },
    ],
    outcome: '전시 탐색과 예약 흐름이 이어졌습니다.',
    learnings: '역할 분담 시 디자인 시스템을 먼저 합의하면 충돌이 줄어듭니다.',
  },
  'wolfram-alpha': {
    no: 'PROJECT 06', title: '울프람알파 리디자인', category: 'Web · Team', type: 'Web', year: '2024',
    figmaProto: 'https://www.figma.com/proto/imFRSwAPpB6DtefqHXhxDH/1%ED%8C%80-%ED%8C%80%ED%94%8C--03-24-TEST_%ED%9D%AC%EC%A7%84?node-id=301-6234&t=mIANDwY7EVm9YTag-0&scaling=min-zoom&content-scaling=fixed&page-id=85%3A1301&starting-point-node-id=301%3A6234',
    team: true, featured: false, theme: 'light', mock: 'web',
    summary: '연산 지식엔진 WolframAlpha 홈 리디자인 (팀 프로젝트).',
    role: 'UI 디자인 (팀 3인)', contribution: 40,
    tools: ['Figma', 'Photoshop'],
    problem: '강력한 기능에 비해 첫 화면이 딱딱하고 진입이 어려웠습니다.',
    goal: '검색 중심의 단순한 첫 화면과 예시로 진입 장벽 낮추기.',
    process: [
      { step: 'Analyze', desc: '핵심 사용 시나리오 정리.' },
      { step: 'Wireframe', desc: '검색 우선 레이아웃 설계(팀).' },
      { step: 'UI Design', desc: '담당 영역 비주얼/예시 카드.' },
    ],
    decisions: [
      { title: '검색 우선', desc: '첫 화면을 큰 검색창으로 단순화.' },
      { title: '예시 노출', desc: '질의 예시로 사용법을 즉시 학습.' },
    ],
    outcome: '첫 화면이 단순해지고 진입이 쉬워졌습니다.',
    learnings: '복잡한 기능일수록 "처음 한 줄"의 설계가 중요합니다.',
  },
  'hogwarts': {
    no: 'PROJECT 07', title: '호그와트 레거시 리디자인', category: 'Web', type: 'Web', year: '2026',
    team: false, featured: true, theme: 'dark', mock: 'web',
    summary: '게임 세계관을 담은 인터랙티브 팬 사이트 리디자인.',
    role: 'UI 디자인 · 인터랙션', contribution: 100,
    tools: ['Figma', 'ChatGPT', 'Claude', 'Codex'],
    problem: '정보 사이트는 많지만 세계관의 분위기를 전달하는 곳은 드물었습니다.',
    goal: '어둡지만 칙칙하지 않은 무드와 스크롤 인터랙션으로 몰입감 연출, 가독성 유지.',
    process: [
      { step: 'Moodboard', desc: '조명·안개·금속 질감 레퍼런스로 톤 정의.' },
      { step: 'Wireframe', desc: '히어로→소개→갤러리 스크롤 시나리오.' },
      { step: 'UI Design', desc: '대비 높은 타이포 + 은은한 글로우.' },
      { step: 'Publishing', desc: '스크롤 인터랙션 구현.' },
    ],
    decisions: [
      { title: '분위기 vs 가독성', desc: '배경은 어둡게, 본문은 충분한 대비로 양립.' },
      { title: '절제된 모션', desc: '효과를 포인트 구간에만 사용.' },
    ],
    outcome: '"분위기가 산다"는 피드백과 함께 정보 전달도 유지했습니다.',
    learnings: '분위기 연출은 더하기보다 "어디서 멈출지"의 문제였습니다.',
  },
  'dream-diary': {
    no: 'PROJECT 08', title: 'DreamDex', category: 'Web App', type: 'App', year: '2025',
    link: 'https://slrspdla-nunu.github.io/Dreamdex/',
    team: false, featured: true, theme: 'light', mock: 'app',
    summary: '매일의 꿈을 기록하고 돌아보는 꿈일기 웹앱.',
    role: '기획 · UI/UX · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'HTML/CSS', 'JavaScript'],
    problem: '꿈은 깨는 순간 빠르게 사라져, 빠르고 부담 없는 기록 도구가 필요했습니다.',
    goal: '깨자마자 1분 안에 기록하고, 모아 돌아볼 수 있는 경험.',
    process: [
      { step: 'Concept', desc: '몽환적이되 차분한 무드 정의.' },
      { step: 'Wireframe', desc: '기록·캘린더·회고 플로우 설계.' },
      { step: 'UI Design', desc: '큰 입력 영역과 태그로 빠른 기록.' },
      { step: 'Publishing', desc: '핵심 화면 반응형 구현.' },
    ],
    decisions: [
      { title: '1분 기록', desc: '입력 단계를 최소화해 아침 기록 이탈을 방지.' },
      { title: '회고 캘린더', desc: '월별로 꿈을 모아 패턴을 돌아보게 함.' },
    ],
    outcome: '빠른 기록과 회고 흐름이 자연스럽게 이어졌습니다.',
    learnings: '"부담 없음"이 기록형 제품의 핵심 사용성이라는 걸 배웠습니다.',
  },
  'altitude': {
    no: 'PROJECT 09', title: 'ALTITUDE', category: 'E-Commerce', type: 'Commerce', year: '2025',
    team: false, featured: false, theme: 'light', mock: 'web',
    summary: '고산·익스페디션 무드의 아웃도어 의류/장비 브랜드 커머스 사이트.',
    role: '기획 · UI/UX · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'HTML/CSS', 'JavaScript'],
    problem: '아웃도어 제품은 스펙 정보가 많아 자칫 카탈로그처럼 딱딱해지고, 브랜드가 지향하는 "고산 등반"의 무드가 잘 전달되지 않았습니다.',
    goal: '제품 신뢰도(스펙·기능)를 지키면서도, 스크롤 인터랙션으로 익스페디션의 몰입감을 주는 커머스 경험 설계.',
    process: [
      { step: 'Branding', desc: '고도·설산·금속 질감을 키워드로 톤&매너와 타이포 시스템 정의.' },
      { step: 'IA', desc: '스토어·익스페디션 라인·상세·장바구니·위시리스트·마이페이지까지 쇼핑 플로우 설계.' },
      { step: 'UI Design', desc: '제품이 주인공이 되는 그리드 + 스펙 위계 정리, 컬렉션 히어로 구성.' },
      { step: 'Publishing', desc: '스크롤 리빌·호버 등 인터랙션을 반응형으로 구현.' },
    ],
    decisions: [
      { title: '무드와 정보의 균형', desc: '히어로·컬렉션은 감성적으로, 상세는 스펙 중심으로 역할을 분리.' },
      { title: '일관된 제품 카드', desc: '브랜드·제품명·가격 위계를 통일해 목록 탐색을 정돈.' },
    ],
    outcome: '브랜드 무드와 제품 정보가 함께 살아있는 커머스 화면을 완성했습니다.',
    learnings: '커머스에서 "분위기"는 구매를 방해하지 않는 선에서 얹을 때 가장 효과적이라는 걸 배웠습니다.',
  },
  'purrcare-app': {
    no: 'PROJECT 10', title: 'PurrCare 웹앱', category: 'Web App', type: 'App', year: '2025',
    team: false, featured: false, theme: 'light', mock: 'app',
    summary: '반려묘의 건강·기록·일정을 한 곳에서 관리하는 반려묘 케어 웹앱.',
    role: '기획 · UI/UX · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'HTML/CSS', 'JavaScript'],
    problem: '반려묘의 병원 기록·증상·일정이 메모나 기억에 흩어져 있어, 필요할 때 한눈에 돌아보기 어려웠습니다.',
    goal: '고양이별로 건강 기록과 일정을 쌓고, 대시보드에서 상태를 빠르게 확인할 수 있는 관리 도구.',
    process: [
      { step: 'Define', desc: '집사의 기록 시나리오(증상·병원·체중·일정)를 정리해 정보 구조 설계.' },
      { step: 'Flow', desc: '홈(대시보드)·기록·건강·일정·커뮤니티·마이페이지로 뷰를 구성.' },
      { step: 'UI Design', desc: '고양이 등록/전환, 필터·검색, 카드형 기록 UI 설계.' },
      { step: 'Build', desc: '뷰 전환형 SPA로 구현, AI 간단 진료 등 인터랙션 추가.' },
    ],
    decisions: [
      { title: '고양이 중심 구조', desc: '여러 마리를 등록·전환하며 각자 기록을 따로 쌓게 설계.' },
      { title: '빠른 기록', desc: '증상·건강·행동을 최소 단계로 남기도록 입력 흐름을 단순화.' },
    ],
    outcome: '흩어져 있던 반려묘 정보를 한 앱에서 기록·회고할 수 있게 되었습니다.',
    learnings: '기록형 앱은 "얼마나 빨리·부담 없이 남기느냐"가 핵심 사용성이라는 걸 다시 확인했습니다.',
  },
};

const ORDER = ['local-community', 'imagination-door', 'wolfram-alpha', 'dingo', 'class101', 'purrcare', 'hogwarts', 'dream-diary', 'altitude', 'purrcare-app'];

/* ARCHIVE 카드 썸네일 (slug → 이미지). object-fit:cover 로 꽉 차게 표시.
   매핑 없으면 그라디언트 플레이스홀더로 표시됨. */
const THUMBS = {
  'dingo': 'image/thumbnail_dingo.png',
  'class101': 'image/thumbnail_class101.png',
  'purrcare': 'image/thumbnail_purrcare_web.png',
  'local-community': ['image/thumbnail_holo1.png', 'image/thumbnail_holo2.png'], // 배열이면 여러 장 나란히(contain)
  'imagination-door': 'image/thumbnail_sangsnagdoor.png',
  'wolfram-alpha': 'image/thumbnail_wolfram.png',
  'hogwarts': 'image/thumbnail_hogwart.png',
  'dream-diary': 'image/thumbnail_dreamdex.png',
  'altitude': 'image/thumbnail_ALTITUDE.png',
  'purrcare-app': 'image/thumbnail_purrcare_webapp.png',
};

/* 그래픽 작업물 (라이트박스).
   type: Banner | Mobile | Poster | Program(식순지)  → GRAPHIC 필터 기준
   단일:  { type:'Poster', title:'...', img:'image/poster2.png' }
   앞뒤:  { type:'Poster', title:'...', slides:[{img:'..._front.jpg'},{img:'..._back.jpg'}] }
          → 한 카드로 묶여 라이트박스에서 자동으로 앞↔뒤 전환 */
const GRAPHICS = [
  // 배너 (마퀴) — 기존 15개 유지 + 신규 1개 추가
  { type: 'Banner', title: '배너 01', img: 'image/banner1.png' },
  { type: 'Banner', title: '배너 02', img: 'image/banner2.png' },
  { type: 'Banner', title: '배너 03', img: 'image/banner3.png' },
  { type: 'Banner', title: '배너 04', img: 'image/banner4.png' },
  { type: 'Banner', title: '배너 05', img: 'image/banner5.png' },
  { type: 'Banner', title: '배너 06', img: 'image/banner6.png' },
  { type: 'Banner', title: '배너 07', img: 'image/banner7.png' },
  { type: 'Banner', title: '배너 08', img: 'image/banner8.png' },
  { type: 'Banner', title: '배너 09', img: 'image/banner9.png' },
  { type: 'Banner', title: '배너 10', img: 'image/banner10.png' },
  { type: 'Banner', title: '배너 11', img: 'image/banner11.png' },
  { type: 'Banner', title: '배너 12', img: 'image/banner12.png' },
  { type: 'Banner', title: '배너 13', img: 'image/banner13.png' },
  { type: 'Banner', title: '배너 14', img: 'image/banner14.png' },
  { type: 'Banner', title: '배너 15', img: 'image/banner15.png' },
  { type: 'Banner', title: '배너 16', img: 'image/banner16.jpg' },
  // 모바일 배너 (신규)
  { type: 'Mobile', title: '모바일 배너 01', img: 'image/mo_banner1.png' },
  { type: 'Mobile', title: '모바일 배너 02', img: 'image/mo_banner2.png' },
  { type: 'Mobile', title: '모바일 배너 03', img: 'image/mo_banner3.png' },
  { type: 'Mobile', title: '모바일 배너 04', img: 'image/mo_banner4.png' },
  // 포스터 (신규) — poster01은 앞/뒤
  { type: 'Poster', title: '포스터 01', slides: [{ img: 'image/poster1_front.jpg' }, { img: 'image/poster1_back.jpg' }] },
  { type: 'Poster', title: '포스터 02', img: 'image/poster2.png' },
  { type: 'Poster', title: '포스터 03', img: 'image/poster3.png' },
  { type: 'Poster', title: '포스터 04', img: 'image/poster4.jpg' },
  { type: 'Poster', title: '포스터 05', img: 'image/poster5.jpg' },
  { type: 'Poster', title: '포스터 06', img: 'image/poster6.jpg' },
  { type: 'Poster', title: '포스터 07', img: 'image/poster7.jpg' },
  { type: 'Poster', title: '포스터 08', img: 'image/poster8.jpg' },
  { type: 'Poster', title: '포스터 09', img: 'image/poster9.jpg' },
  // 식순지 (신규) — 앞/뒤
  { type: 'Program', title: '식순지', slides: [{ img: 'image/Program_front.jpg' }, { img: 'image/Program_back.jpg' }] },
];
