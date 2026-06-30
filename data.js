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
    no: 'PROJECT 01', title: 'Dingo 리디자인', category: 'Web Redesign', type: 'Web', year: '2024',
    team: false, featured: false, theme: 'light', mock: 'web',
    summary: '영상 콘텐츠 브랜드 Dingo 홈페이지 리디자인.',
    role: 'UI 디자인 · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'HTML/CSS'],
    problem: '콘텐츠는 매력적이지만 첫 화면에서 브랜드 무드와 최신 영상이 한눈에 들어오지 않았습니다.',
    goal: '브랜드 톤을 강화하고 핵심 콘텐츠로 빠르게 진입하도록 정보 구조를 정리.',
    process: [
      { step: 'Analyze', desc: '기존 IA와 진입 동선의 문제점 정리.' },
      { step: 'Wireframe', desc: '히어로·콘텐츠 그리드 우선순위 재설계.' },
      { step: 'UI Design', desc: '브랜드 컬러/타이포 시스템 재정의.' },
      { step: 'Publishing', desc: '반응형 마크업으로 구현.' },
    ],
    decisions: [
      { title: '콘텐츠 우선 히어로', desc: '최신/인기 영상을 첫 화면에 노출해 진입을 단축.' },
      { title: '일관된 그리드', desc: '카드 규격을 통일해 탐색을 정돈.' },
    ],
    outcome: '브랜드 인상과 콘텐츠 진입 동선이 또렷해졌습니다.',
    learnings: '리디자인은 "새로 그리기"보다 "우선순위 다시 잡기"라는 걸 체감했습니다.',
  },
  'class101': {
    no: 'PROJECT 02', title: 'Class101 리디자인', category: 'Web Redesign', type: 'Web', year: '2024',
    team: false, featured: false, theme: 'light', mock: 'web',
    summary: '온라인 클래스 플랫폼 Class101 홈 리디자인.',
    role: 'UX/UI · 퍼블리싱', contribution: 100,
    tools: ['Figma', 'Photoshop', 'HTML/CSS'],
    problem: '강의가 많아 무엇부터 봐야 할지 막막하고, 추천 흐름이 약했습니다.',
    goal: '관심사 기반 추천과 카테고리 진입을 명확히 해 탐색 피로를 줄이기.',
    process: [
      { step: 'Research', desc: '수강 동기와 탐색 패턴 정리.' },
      { step: 'Flow', desc: '추천 → 카테고리 → 상세 흐름 재설계.' },
      { step: 'UI Design', desc: '카드/배지로 정보 위계 강화.' },
      { step: 'Publishing', desc: '반응형 구현.' },
    ],
    decisions: [
      { title: '추천 우선', desc: '첫 화면을 관심사 추천으로 시작해 진입 장벽을 낮춤.' },
      { title: '명확한 카테고리', desc: '카테고리 탐색을 상시 노출.' },
    ],
    outcome: '탐색 흐름이 단순해지고 추천 진입이 자연스러워졌습니다.',
    learnings: '선택지가 많을수록 "덜어내고 안내하는" 설계가 중요합니다.',
  },
  'purrcare': {
    no: 'PROJECT 03', title: 'PurrCare', category: 'Commerce', type: 'Commerce', year: '2025',
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
    no: 'PROJECT 04', title: '지역 커뮤니티 앱', category: 'App · Team', type: 'App', year: '2025',
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
    no: 'PROJECT 07', title: '호그와트 레거시 리디자인', category: 'Web', type: 'Web', year: '2025',
    team: false, featured: true, theme: 'dark', mock: 'web',
    summary: '게임 세계관을 담은 인터랙티브 팬 사이트 리디자인.',
    role: 'UI 디자인 · 인터랙션', contribution: 100,
    tools: ['Figma', 'Photoshop', 'Illustrator', 'HTML/CSS'],
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
    no: 'PROJECT 08', title: '꿈일기 웹앱', category: 'Web App', type: 'App', year: '2025',
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
};

const ORDER = ['dingo', 'class101', 'purrcare', 'local-community', 'imagination-door', 'wolfram-alpha', 'hogwarts', 'dream-diary'];

/* 그래픽 작업물 (라이트박스).
   배너=단일 이미지, 카드뉴스=slides[], 포스터=단일.
   shade: placeholder 명암(0~1).
   ★ 실제 이미지 넣는 법 (가로 1200·세로 제각각이어도 OK):
     - 썸네일은 자동으로 일정 비율로 크롭(cover)되어 그리드가 정렬됨
     - 라이트박스는 원본 비율 그대로(잘림 없이) 표시
     - 단일:   { type:'Banner', title:'...', img:'image/graphic/banner01.png' }
     - 카드뉴스: { type:'Card News', title:'...', slides:[{img:'...1.png'},{img:'...2.png'}] } */
const GRAPHICS = [
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
  { type: 'Card News', title: '카드뉴스 01', shade: 0.26, slides: [{ shade: 0.20 }, { shade: 0.30 }, { shade: 0.40 }, { shade: 0.16 }] },
  { type: 'Card News', title: '카드뉴스 02', shade: 0.34, slides: [{ shade: 0.18 }, { shade: 0.28 }, { shade: 0.38 }] },
  { type: 'Poster', title: '포스터 01', shade: 0.24 },
];
