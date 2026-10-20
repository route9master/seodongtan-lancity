# 서동탄역 랜시티 홈페이지 (서동탄역 외삼미1지구 민간임대아파트)

Next.js 14 (App Router) · TypeScript · Tailwind 3 · framer-motion · Pretendard(서브셋). 정적 페이지, 백엔드 없음.
시티오씨엘 9단지 템플릿 기반.

## 구조
- `src/data/site.ts` — 모든 문구·수치·연락처의 단일 출처. 문구 수정은 여기서만.
- `src/components/*` — Hero → Overview → Location → Premium → Development → Complex → FloorPlans → Rental → Contact → Footer, MobileBar
- `src/lib/sms.ts` — SMS 스킴. iOS `&body=` / Android `?body=` 분기
- `docs/CONTENT.md` — 원본 자료(교육자료 3차 2026.09.17, 3차 광고 금지어 안내) 정리 및 원본 대비 수정 내역
- `public/images/*` — 교육자료 PDF 원본 이미지에서 추출한 webp (Vercel 이미지 최적화 미사용)
- `public/images/brand/lancity-*.svg` — 공식 로고 PDF(벡터)에서 분리한 SVG (navy / white / burgundy)

## 반드시 지킬 것 (3차 광고 금지어 안내 기준)
- 금지어: 분양 · 분양계약 · 분양권 · 일반분양 · 청약 · 당첨 · 확정(분양가·시공·GTX·역·역세권·학교) · 투자 · 수익 · 원금/프리미엄/시세차익 보장 · 1군/메이저 건설사 · 시공사 언급
- 사업 명칭: "서동탄역 외삼미1지구 민간임대아파트" (2026-10-20 고객 요청으로 '협동조합형' 표현 전면 삭제). 상담 신청
- '분양전환(총회에서 확정)' 문구는 고객 요청으로 민간임대 안내 03 · Premium 07에만 사용
- 개발계획: 개통·개원 연도 표기 금지, (계획)/(추진) 상태 배지 필수, 확정 표현 금지
- 시세·분양가·타 단지 비교, 인구·공급량 등 시장환경 자료, 출자금·납부일정·입금계좌 노출 금지
- 문구가 애매하면 임의 판단하지 말고 광고 담당자 확인 후 게시
- 대표번호 1555-6760. SMS 수신번호는 `SITE.smsParts` 배열로만 보관 — 소스·DOM 어디에도 연속 문자열 금지
- 디자인 토큰: navy #163259(로고) / navy-900 #0E2140 / pearl #F4F2EE / burgundy #88181C(로고, 선·숫자만, 면 채움 금지). radius ≤ 4px, 그림자 없음, 아이콘 카드 그리드 금지
- 한글 줄바꿈: `word-break: keep-all` 전역 적용됨
- 섹션 라벨 클래스는 `.eyebrow` (Tailwind `overline` 유틸과 충돌하므로 `overline` 이름 쓰지 말 것)

## 남은 TODO
- 배포 후 실제 URL이 다르면 `SITE.url` 수정 (OG·canonical 기준)
- 개인정보 처리 주체 상세(상호·대표·사업자번호·주소): `AGENCY`에 입력하면 푸터·방침에 자동 반영

## 문구 수정 후 새 한글이 생기면 폰트 서브셋 다시 만들기
```powershell
npm pack pretendard@1.3.9; tar -xzf pretendard-1.3.9.tgz
pip install fonttools brotli
python scripts/subset-fonts.py package/dist/web/static/woff2
Remove-Item -Recurse -Force package, pretendard-1.3.9.tgz
Remove-Item public/fonts/subset-chars.txt
```

## 작업 규칙
- 작업 단위마다 `git add . ; git commit` → `vercel --prod`
- rollback 전 반드시 `git status` / `git log` 확인
