// 모든 문구·수치의 단일 출처. 출처: docs/CONTENT.md (교육자료 3차 2026.09.17 + 3차 광고 금지어 안내)
// 금지: 분양·청약·확정·보장·투자·수익 계열 표현, 개통·개원 연도, 시세·가격 비교, 시공사 언급
// 계획 시설은 반드시 (계획)/(추진) 표기

export const SITE = {
  name: "서동탄역 랜시티",
  officialName: "서동탄역 랜시티",
  tel: "1555-6760",
  telHref: "tel:15556760",
  // SMS 수신번호 — 연속 문자열로 두지 말 것 (lib/sms.ts에서 조립)
  smsParts: ["010", "8571", "3964"],
  url: "https://seodongtan-lancity.vercel.app",
};

// 개인정보 처리 주체 · 푸터 표기. 정보 수급 시 채우면 자동 반영 (빈 값은 렌더링 생략)
export const AGENCY = {
  name: "서동탄역 랜시티 홍보관",
  ceo: "",
  bizNo: "",
  address: "",
  retention: "상담 목적 달성 후 지체 없이 파기",
};

export const NAV = [
  { id: "overview", label: "사업개요" },
  { id: "location", label: "입지환경" },
  { id: "premium", label: "프리미엄" },
  { id: "plan", label: "개발계획" },
  { id: "complex", label: "단지안내" },
  { id: "floor", label: "평면안내" },
  { id: "rental", label: "민간임대 안내" },
  { id: "contact", label: "상담신청" },
];

export const DISCLAIMER = {
  cg: "※ 상기 CG, 이미지 등은 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으며, 심의 등 인·허가 과정 및 실시설계에서 변경될 수 있습니다.",
  area: "※ 본 계획안은 심의 등 인·허가 과정 및 실시설계에서 다소 변경될 수 있으며, 세대수·면적은 예정 기준입니다.",
  plan: "※ 개발계획은 관계기관 발표 자료 기준이며, 각 기관의 사정에 따라 사업 내용·일정이 변경되거나 취소될 수 있습니다.",
  site: "※ 본 홈페이지의 CG, 이미지, 면적, 세대수, 개발계획 등은 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으며, 인·허가 및 관계기관 사정에 따라 변경될 수 있습니다. 본 사업은 협동조합형 민간임대주택 사업으로, 가입 전 반드시 관련 계약서 및 안내 자료를 확인하시기 바랍니다.",
};

// 사업개요 — [구분, 공동주택, 주상복합 | null(통합)]
export const OVERVIEW_ROWS: [string, string, string | null][] = [
  ["사업명", "외삼미1지구 도시개발사업 내 협동조합형 민간임대아파트", null],
  ["대지위치", "경기도 오산시 외삼미동 228번지 일원", null],
  ["세대수", "총 1,472세대 (예정) · 14개동", null],
  ["용도지역", "제2종일반주거지역", "준주거지역"],
  ["건물용도", "공동주택(아파트) 및 부대복리시설", "아파트, 부대복리시설, 근린생활시설, 업무시설 등"],
  ["건축규모", "지하 2층 ~ 지상 29층", "지하 3층 ~ 지상 29층"],
  ["대지면적", "42,749.00㎡ (12,931.57평)", "19,667.00㎡ (5,949.27평)"],
  ["연면적", "144,185.69㎡ (43,616.17평)", "122,393.84㎡ (37,024.14평)"],
  ["용적률", "217.86%", "399.62%"],
];

export const STATS = [
  { value: 1472, unit: "세대", label: "총 세대수 (예정)", decimals: 0 },
  { value: 29, unit: "층", label: "최고 층수", decimals: 0 },
  { value: 14, unit: "개동", label: "건립 동수", decimals: 0 },
];

export const SUPPLY = [
  { key: "59", type: "59㎡", group: "공동주택", units: 303 },
  { key: "84a", type: "84㎡", group: "공동주택", units: 595 },
  { key: "84b", type: "84㎡", group: "주상복합", units: 574 },
];

export const LOCATION = [
  {
    no: "01",
    title: "교통",
    lead: "서동탄역(1호선) 도보 이용",
    items: [
      "수도권 전철 1호선 서동탄역 — 사업지 인근, 도보 이용 가능",
      "동탄역(SRT · GTX-A) 약 4km — 수서역 · 평택지제역 · 대전역 · 동대구역 · 부산역 방면 이용",
      "경부고속도로 · 수도권제2순환고속도로 · 용인서울고속도로 접근",
      "수원버스터미널 등 대중교통 거점 접근",
    ],
    note: "거리는 직선거리 기준의 대략적인 수치로, 실제 이동거리와 다를 수 있습니다.",
  },
  {
    no: "02",
    title: "교육",
    lead: "반경 2km 내 초 · 중 · 고교",
    items: [
      "삼미초 · 송화초 · 푸른초 · 푸른중 · 솔빛중 · 병점고 · 동탄고",
      "삼미초 도보 통학권",
      "동탄신도시 학원가 이용 편리",
    ],
    note: "통학 배정은 관할 교육청 기준에 따르며 변경될 수 있습니다.",
  },
  {
    no: "03",
    title: "생활 · 자연",
    lead: "동탄신도시 생활권 인접",
    items: [
      "이마트 트레이더스 · 홈플러스 · 롯데백화점 동탄점",
      "한림대학교 동탄성심병원",
      "동탄센트럴파크 · 구봉산근린공원 · 벽천폭포",
    ],
    note: "주변 시설은 현재 기준이며, 운영 주체 사정에 따라 변경될 수 있습니다.",
  },
];

export const PREMIUM = [
  { no: "01", en: "Best Location", title: "서동탄역 곁, 동탄 생활권", desc: "1호선 서동탄역을 도보로 이용하고, 동탄신도시의 상업 · 의료 · 공원 인프라를 가까이 누리는 자리입니다." },
  { no: "02", en: "Fast Traffic", title: "광역으로 이어지는 길", desc: "서동탄역(1호선)과 동탄역(SRT · GTX-A), 경부 · 용인서울 · 수도권제2순환고속도로로 수도권 곳곳에 닿습니다." },
  { no: "03", en: "Best Life", title: "학교와 공원이 가까운 일상", desc: "삼미초 도보 통학권, 구봉산근린공원과 동탄센트럴파크가 생활 반경 안에 있습니다." },
  { no: "04", en: "Landmark Plan", title: "14개동 1,472세대 (예정)", desc: "최고 29층. 선호도 높은 전용 59㎡ · 84㎡ 두 가지 주택형으로 구성했습니다." },
  { no: "05", en: "High Vision", title: "계획 중인 교통망", desc: "동탄도시철도(트램), 동탄인덕원선, 1호선 연장, GTX-C 연장 등 주변 철도 계획이 추진되고 있습니다. (계획 단계)" },
  { no: "06", en: "Complex Plan", title: "함께 조성되는 복합 생활권", desc: "외삼미1지구 도시개발사업으로 아파트 · 주상복합과 근린생활 · 업무시설이 함께 계획되었습니다." },
  { no: "07", en: "Stable Living", title: "장기 거주의 안정감", desc: "8~10년 장기 임대로 이사 걱정을 덜고, 임대료 증액은 연 5% 이내로 제한됩니다." },
];

export type DevItem = {
  id: string;
  title: string;
  status: string;
  desc: string;
  facts: [string, string][];
  img: string;
  w: number;
  h: number;
};

export const DEVELOPMENT: DevItem[] = [
  {
    id: "line1",
    title: "수도권 전철 1호선 연장",
    status: "추진",
    desc: "서동탄역에서 동탄역까지 1호선을 연장하고, 구간 내 역사(가칭 솔빛나루역) 신설을 추진하고 있습니다.",
    facts: [
      ["구간", "서동탄역 ~ 동탄역"],
      ["내용", "1호선 연장 및 구간 내 역사 신설"],
    ],
    img: "/images/dev/line1.webp",
    w: 1400,
    h: 963,
  },
  {
    id: "sinsuwon",
    title: "동탄인덕원선 (신수원선)",
    status: "추진",
    desc: "인덕원에서 수원을 거쳐 동탄까지 잇는 복선전철로, 서동탄역과의 연계가 계획되어 있습니다.",
    facts: [
      ["구간", "인덕원 ~ 수원 ~ 동탄"],
      ["규모", "복선전철 약 37~38km"],
    ],
    img: "/images/dev/sinsuwon.webp",
    w: 1400,
    h: 963,
  },
  {
    id: "tram",
    title: "동탄도시철도 (트램)",
    status: "계획",
    desc: "병점역과 동탄2신도시를 잇는 1호선, 망포역 · 동탄역 · 오산역을 잇는 2호선으로 계획된 노면전차입니다.",
    facts: [
      ["1호선", "병점역 ~ 동탄2신도시 (내부순환)"],
      ["2호선", "망포역 ~ 동탄역 ~ 오산역"],
    ],
    img: "/images/dev/tram.webp",
    w: 1400,
    h: 934,
  },
  {
    id: "gtxc",
    title: "GTX-C 병점 연장",
    status: "계획",
    desc: "수도권 광역급행철도 C노선을 수원에서 병점 방면으로 연장하는 계획입니다.",
    facts: [
      ["구간", "덕정 ~ 수원 (병점 연장)"],
      ["내용", "수도권 남부 광역 교통 접근성 개선"],
    ],
    img: "/images/dev/gtxc.webp",
    w: 1400,
    h: 940,
  },
  {
    id: "hospital",
    title: "(가칭) 고려대학교 동탄병원",
    status: "추진",
    desc: "약 700병상 규모의 종합병원과 메디컬 복합단지 조성이 추진되고 있습니다.",
    facts: [
      ["규모", "약 700병상 종합병원"],
      ["내용", "메디컬 복합단지 조성"],
    ],
    img: "/images/dev/hospital.webp",
    w: 1400,
    h: 934,
  },
];

export type Plan = {
  id: string;
  label: string;
  img: string;
  w: number;
  h: number;
  tagline: string;
  rows: { group: string; units: number; exclusive: number; supply: number }[];
  points: string[];
};

export const PLANS: Plan[] = [
  {
    id: "59",
    label: "59",
    img: "/images/plans/59.webp",
    w: 1800,
    h: 1791,
    tagline: "공간 활용성을 높인 맞춤형 공간설계",
    rows: [{ group: "공동주택", units: 303, exclusive: 59.65, supply: 80.87 }],
    points: ["공동주택 303세대 (예정)", "실용적인 중소형 구성"],
  },
  {
    id: "84",
    label: "84",
    img: "/images/plans/84.webp",
    w: 1800,
    h: 1211,
    tagline: "여유로운 거실과 수납을 갖춘 공간 디자인",
    rows: [
      { group: "공동주택", units: 595, exclusive: 84.76, supply: 113.87 },
      { group: "주상복합", units: 574, exclusive: 84.96, supply: 113.13 },
    ],
    points: ["공동주택 595세대 · 주상복합 574세대 (예정)", "주거동 유형에 따라 면적 상이"],
  },
];

export const PLAN_NOTES = [
  "※ 평면 이미지는 소비자의 이해를 돕기 위한 대표 평면 CG로, 실시설계 및 인·허가 과정에서 변경될 수 있습니다.",
  "※ 인·허가 과정에서 주택형별 세대수, 단위세대 면적은 증감될 수 있습니다.",
  "※ 평 환산은 ㎡ × 0.3025 기준이며 소수점 이하에서 오차가 있을 수 있습니다.",
];

export const RENTAL = [
  { no: "01", title: "자격 요건 부담 완화", desc: "주택 소유 여부, 소득 수준 등 별도의 자격 요건을 두지 않습니다." },
  { no: "02", title: "신축 아파트 거주", desc: "최신 주거 설계와 단지 커뮤니티 시설을 이용할 수 있습니다." },
  { no: "03", title: "장기 안정 거주", desc: "8~10년 장기 임대로 이사 걱정 없이 머무를 수 있습니다." },
  { no: "04", title: "임대료 상승 제한", desc: "임대료 증액은 연 5% 이내로 제한되어 주거비 급등 부담을 줄입니다." },
];

export const RENTAL_NOTE =
  "※ 본 사업은 협동조합형 민간임대주택 사업입니다. 가입 조건, 임대 기간 및 조건 등 세부 사항은 관련 법령과 계약 내용에 따르며, 상담 시 자세히 안내해 드립니다.";

export const GALLERY = [
  { src: "/images/render/perspective.webp", m: "/images/render/perspective-m.webp", alt: "서동탄역 랜시티 투시도", caption: "투시도", w: 2560, h: 1423 },
  { src: "/images/site/siteplan-a.webp", alt: "서동탄역 랜시티 단지배치도 (주상복합)", caption: "단지배치도 · 주상복합", w: 2200, h: 1650 },
  { src: "/images/site/siteplan-b.webp", alt: "서동탄역 랜시티 단지배치도 (공동주택)", caption: "단지배치도 · 공동주택", w: 2200, h: 1650 },
];
