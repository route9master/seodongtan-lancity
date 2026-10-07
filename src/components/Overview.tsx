import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { DISCLAIMER, OVERVIEW_ROWS, STATS, SUPPLY } from "@/data/site";

const total = SUPPLY.reduce((a, b) => a + b.units, 0);
const tone = ["bg-navy-600", "bg-navy", "bg-burgundy"];

export default function Overview() {
  return (
    <section id="overview" className="bg-pearl py-24 md:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
        <div className="lg:col-span-4">
          <SectionHead
            over="Overview"
            title={"공동주택과 주상복합,\n두 개의 단지"}
            desc="오산시 외삼미동 228번지 일원. 지상 최고 29층, 14개동 총 1,472세대(예정)로 계획되었습니다."
          />
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/lancity-navy.svg" alt="LANCITY 서동탄역 랜시티" width={229} height={78} loading="lazy" className="w-[200px]" />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8" delay={0.05}>
          {/* 모바일: 표 대신 세로 목록 */}
          <dl className="border-t border-navy md:hidden">
            {OVERVIEW_ROWS.map(([k, a, b]) => (
              <div key={k} className="border-b border-line py-4">
                <dt className="text-[13px] font-medium text-greige">{k}</dt>
                {b === null ? (
                  <dd className="num mt-1.5 text-[15px] leading-relaxed text-navy">{a}</dd>
                ) : (
                  <dd className="mt-1.5 space-y-1 text-[15px] leading-relaxed text-navy">
                    <p className="num"><span className="mr-2 text-[12px] text-greige">공동주택</span>{a}</p>
                    <p className="num"><span className="mr-2 text-[12px] text-greige">주상복합</span>{b}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>

          <div className="hidden md:block">
            <table className="w-full border-t border-navy text-left">
              <caption className="sr-only">사업개요</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[84px] py-3 text-[12px] font-medium text-greige md:w-[110px]">
                    구분
                  </th>
                  <th scope="col" className="py-3 pr-4 text-[13px] font-semibold text-navy">
                    공동주택
                  </th>
                  <th scope="col" className="py-3 text-[13px] font-semibold text-navy">
                    주상복합
                  </th>
                </tr>
              </thead>
              <tbody>
                {OVERVIEW_ROWS.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-line">
                    <th scope="row" className="py-4 pr-3 align-top text-[13px] font-medium text-greige md:text-sm">
                      {k}
                    </th>
                    {b === null ? (
                      <td colSpan={2} className="num py-4 text-[14px] leading-relaxed text-navy md:text-[15px]">
                        {a}
                      </td>
                    ) : (
                      <>
                        <td className="num py-4 pr-4 align-top text-[14px] leading-relaxed text-navy md:text-[15px]">{a}</td>
                        <td className="num py-4 align-top text-[14px] leading-relaxed text-navy md:text-[15px]">{b}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note mt-4">{DISCLAIMER.area}</p>
        </Reveal>
      </div>

      <div className="container-site mt-20 md:mt-28">
        <dl className="grid grid-cols-3 border-t border-line">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="py-7 pl-4 first:pl-0 md:py-9 md:pl-8 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-line">
              <dt className="text-[12px] text-greige md:text-[13px]">{s.label}</dt>
              <dd className="mt-3 flex items-baseline gap-1">
                <span className="text-[32px] font-semibold leading-none tracking-tightest text-navy md:text-[56px]">
                  <CountUp value={s.value} decimals={s.decimals} />
                </span>
                <span className="text-sm text-navy/70 md:text-base">{s.unit}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-14 md:mt-20">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-navy">주택형별 공급 구성</p>
            <p className="num text-xs text-greige">총 {total.toLocaleString()}세대 (예정)</p>
          </div>
          <div className="mt-4 flex h-3 w-full gap-px" role="img" aria-label="주택형별 세대수 비율">
            {SUPPLY.map((s, i) => (
              <div key={s.key} className={tone[i]} style={{ width: `${(s.units / total) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-5 grid grid-cols-3 gap-4 text-[12px] md:text-[13px]">
            {SUPPLY.map((s, i) => (
              <li key={s.key} className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2 font-semibold text-navy">
                  <span className={`inline-block h-2 w-2 ${tone[i]}`} aria-hidden />
                  {s.type}
                </span>
                <span className="text-greige">{s.group}</span>
                <span className="num text-navy">{s.units.toLocaleString()}세대</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
