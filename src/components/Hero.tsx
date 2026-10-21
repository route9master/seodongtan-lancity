import Picture from "./Picture";
import { DISCLAIMER, HERO_POINTS, SITE } from "@/data/site";

const HERO_STATS = [
  { k: "최고", v: "29", u: "층" },
  { k: "", v: "14", u: "개동" },
  { k: "총", v: "1,472", u: "세대" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col overflow-hidden bg-navy-900 text-pearl md:min-h-[100svh]">
      {/* 모바일: 조감도를 자르지 않도록 4:3 블록으로 상단 배치 */}
      <div className="relative aspect-[4/3] w-full md:hidden">
        <Picture
          src="/images/render/aerial-m.webp"
          alt="서동탄역 랜시티 조감도"
          width={1200}
          height={900}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-24" style={{ background: "linear-gradient(to bottom, rgba(14,33,64,.65), rgba(14,33,64,0))" }} aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(14,33,64,1), rgba(14,33,64,0))" }} aria-hidden />
      </div>

      {/* 데스크톱: 풀스크린 */}
      <div className="absolute inset-0 hidden md:block">
        <Picture
          src="/images/render/aerial.webp"
          alt="서동탄역 랜시티 조감도"
          width={2560}
          height={1600}
          priority
          className="h-full w-full object-cover object-[50%_40%] animate-[heroZoom_14s_ease-out_forwards]"
        />
        {/* 텍스트 가독성용 포토 스크림 (장식 아님) */}
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(14,33,64,.6), rgba(14,33,64,0))" }} aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-[62%]" style={{ background: "linear-gradient(to top, rgba(14,33,64,.9), rgba(14,33,64,0))" }} aria-hidden />
        <div className="absolute inset-y-0 left-0 w-[78%]" style={{ background: "linear-gradient(to right, rgba(14,33,64,.82) 0%, rgba(14,33,64,.6) 50%, rgba(14,33,64,0) 100%)" }} aria-hidden />
      </div>

      <div className="container-site relative z-10 pb-10 pt-6 md:mt-auto md:pb-16 md:pt-32">
        <p className="eyebrow flex items-center gap-3 text-pearl/75">
          <span className="inline-block h-px w-8 bg-burgundy-300" aria-hidden />
          LANDMARK CITY
        </p>
        <h1 className="mt-5 text-[36px] font-semibold leading-[1.18] tracking-tightest sm:text-[52px] md:mt-6 md:text-[72px]">
          서동탄역,
          <br />
          랜드마크가 서다.
        </h1>
        <p className="mt-4 text-[15px] font-light text-pearl/80 md:mt-5 md:text-xl">
          <span className="block md:inline">서동탄역 외삼미1지구 민간임대아파트</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">전용 59㎡ · 84㎡</span>
        </p>

        {/* 핵심 조건 4가지 (고객 요청 · 2026-10-21 확인) */}
        <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-5 gap-y-5 md:mt-9 md:gap-y-6">
          {HERO_POINTS.map((h) => (
            <li key={h.v} className="border-l-2 border-burgundy-300 pl-3 md:pl-5">
              <p className="text-[19px] font-semibold leading-tight tracking-tightest text-pearl md:text-[24px]">{h.v}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-pearl/65 md:text-[13px]">{h.s}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 flex max-w-xl items-stretch divide-x divide-pearl/25 border-y border-pearl/25 md:mt-10">
          {HERO_STATS.map((s) => (
            <div key={s.u} className="flex-1 py-4 pl-4 first:pl-0 md:py-5 md:pl-6">
              <dt className="sr-only">{s.u}</dt>
              <dd className="flex items-baseline gap-1">
                {s.k && <span className="text-xs text-pearl/60 md:text-sm">{s.k}</span>}
                <span className="num text-2xl font-semibold md:text-[34px]">{s.v}</span>
                <span className="text-xs text-pearl/70 md:text-sm">{s.u}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[11px] text-pearl/50">세대수 · 층수는 예정 기준</p>

        <div className="mt-8 hidden gap-3 md:flex">
          <a
            href="#contact"
            className="inline-flex h-[52px] items-center bg-pearl px-8 text-[15px] font-semibold text-navy transition-colors hover:bg-white"
          >
            상담 신청
          </a>
          <a
            href={SITE.telHref}
            className="num inline-flex h-[52px] items-center border border-pearl/50 px-8 text-[15px] font-semibold text-pearl transition-colors hover:border-pearl"
          >
            {SITE.tel}
          </a>
        </div>
      </div>

      <p className="container-site relative z-10 pb-24 text-[10px] leading-relaxed text-pearl/50 md:pb-5 md:text-[11px]">
        {DISCLAIMER.cg}
      </p>
    </section>
  );
}
