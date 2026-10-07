"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import Lightbox from "./Lightbox";
import SectionHead from "./SectionHead";
import { PLANS, PLAN_NOTES } from "@/data/site";

const py = (m: number) => (Math.round(m * 0.3025 * 100) / 100).toFixed(2);
const m2 = (m: number) => m.toFixed(2);

export default function FloorPlans() {
  const [active, setActive] = useState(1); // 84㎡ 기본 노출 (주력 타입)
  const [zoom, setZoom] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = PLANS[active];
  const total = p.rows.reduce((a, r) => a + r.units, 0);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (active + (e.key === "ArrowRight" ? 1 : -1) + PLANS.length) % PLANS.length;
    setActive(n);
    (tabsRef.current?.querySelectorAll("button")[n] as HTMLButtonElement | undefined)?.focus();
  };

  return (
    <section id="floor" className="bg-pearl py-24 md:py-36">
      <div className="container-site">
        <SectionHead over="Floor Plan" title={"전용 59㎡ · 84㎡,\n두 가지 주택형"} desc="타입을 선택하면 대표 평면과 면적을 확인할 수 있습니다." />

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="주택형"
          onKeyDown={onKey}
          className="mt-12 flex border-b border-line md:mt-16"
        >
          {PLANS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative px-5 pb-4 pt-2 text-[16px] font-semibold transition-colors md:px-8 md:text-[18px] ${
                i === active ? "text-navy" : "text-greige hover:text-navy"
              }`}
            >
              {t.label}㎡
              {i === active && <span className="absolute inset-x-3 -bottom-px h-[2px] bg-navy md:inset-x-6" aria-hidden />}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={`${p.label}㎡ 주택형`} className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <button
              type="button"
              onClick={() => setZoom(0)}
              className="relative flex aspect-[4/3] w-full items-center justify-center bg-white p-4 md:p-8"
              aria-label={`${p.label}㎡ 평면도 크게 보기`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={p.img}
                  src={p.img}
                  alt={`${p.label}㎡ 평면도`}
                  width={p.w}
                  height={p.h}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>
              <span className="absolute bottom-3 right-3 text-[11px] text-greige">클릭하여 확대</span>
            </button>
          </div>

          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Type</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="num text-[56px] font-semibold leading-none tracking-tightest text-navy md:text-[72px]">{p.label}</span>
              <span className="text-lg text-navy/60">㎡</span>
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-navy/75">{p.tagline}</p>
            <p className="num mt-2 text-sm text-greige">총 {total.toLocaleString()}세대 (예정)</p>

            <table className="mt-8 w-full border-t border-navy text-[14px]">
              <caption className="sr-only">{p.label}㎡ 면적표 (㎡ / 평)</caption>
              <thead>
                <tr className="border-b border-line text-[12px] text-greige">
                  <th scope="col" className="py-2.5 text-left font-normal">구분</th>
                  <th scope="col" className="py-2.5 text-right font-normal">전용면적</th>
                  <th scope="col" className="py-2.5 text-right font-normal">공급면적</th>
                </tr>
              </thead>
              <tbody>
                {p.rows.map((r) => (
                  <tr key={r.group} className="border-b border-line align-top">
                    <th scope="row" className="py-3 text-left font-medium text-navy">
                      {r.group}
                      <span className="num block text-[12px] font-normal text-greige">{r.units.toLocaleString()}세대</span>
                    </th>
                    <td className="num py-3 text-right text-navy">
                      {m2(r.exclusive)}㎡
                      <span className="block text-[12px] text-greige">{py(r.exclusive)}평</span>
                    </td>
                    <td className="num py-3 text-right text-navy">
                      {m2(r.supply)}㎡
                      <span className="block text-[12px] text-greige">{py(r.supply)}평</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="mt-8 space-y-2.5">
              {p.points.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-navy">
                  <span className="mt-[11px] h-px w-3 shrink-0 bg-burgundy" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-1">
          {PLAN_NOTES.map((n) => (
            <p key={n} className="note">
              {n}
            </p>
          ))}
        </div>
      </div>

      <Lightbox
        items={[{ src: p.img, alt: `${p.label}㎡ 평면도`, caption: `${p.label}㎡ 대표 평면 (CG)`, light: true }]}
        index={zoom}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
