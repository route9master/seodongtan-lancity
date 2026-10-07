"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { DEVELOPMENT, DISCLAIMER } from "@/data/site";

export default function Development() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const d = DEVELOPMENT[active];

  const onKey = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const n = (active + dir + DEVELOPMENT.length) % DEVELOPMENT.length;
    setActive(n);
    (listRef.current?.querySelectorAll("button")[n] as HTMLButtonElement | undefined)?.focus();
  };

  return (
    <section id="plan" className="bg-pearl py-24 md:py-36">
      <div className="container-site">
        <SectionHead
          over="Development Plan"
          title={"주변에서 추진 중인\n교통 · 의료 계획"}
          desc="관계기관이 발표한 주변 개발계획입니다. 모두 계획 또는 추진 단계로, 내용과 일정은 바뀔 수 있습니다."
        />

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-10 [&>*]:min-w-0">
          <Reveal className="md:col-span-4">
            <div
              ref={listRef}
              role="tablist"
              aria-label="개발계획"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="-mx-5 flex overflow-x-auto border-b border-line px-5 md:mx-0 md:flex-col md:overflow-visible md:border-b-0 md:border-t md:border-navy md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {DEVELOPMENT.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`relative shrink-0 px-3 pb-4 pt-2 text-left transition-colors md:flex md:items-baseline md:gap-4 md:border-b md:border-line md:px-0 md:py-5 ${
                      on ? "text-navy" : "text-greige hover:text-navy"
                    }`}
                  >
                    <span className="num hidden text-[12px] tracking-[0.2em] text-burgundy md:inline">{String(i + 1).padStart(2, "0")}</span>
                    <span className="whitespace-nowrap text-[15px] font-semibold md:whitespace-normal md:text-[17px]">{item.title}</span>
                    {on && <span className="absolute inset-x-3 -bottom-px h-[2px] bg-navy md:inset-x-auto md:bottom-auto md:left-[-12px] md:top-0 md:h-full md:w-[2px]" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div role="tabpanel" aria-label={d.title} className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={d.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-8 lg:gap-8"
              >
                <button
                  type="button"
                  onClick={() => setZoom(active)}
                  className="group relative block overflow-hidden bg-white lg:col-span-5"
                  aria-label={`${d.title} 이미지 크게 보기`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.img} alt={`${d.title} 계획도`} width={d.w} height={d.h} loading="lazy" className="aspect-[3/2] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
                  <span className="absolute bottom-0 right-0 bg-navy/85 px-3 py-2 text-[11px] text-pearl">크게 보기</span>
                </button>

                <div className="lg:col-span-3">
                  <span className="inline-block border border-burgundy px-2 py-0.5 text-[11px] font-semibold text-burgundy">{d.status}</span>
                  <h3 className="mt-4 text-[22px] font-semibold leading-snug tracking-tightest text-navy md:text-[26px]">{d.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-navy/70">{d.desc}</p>
                  <dl className="mt-6 border-t border-navy text-[14px]">
                    {d.facts.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[56px_1fr] gap-3 border-b border-line py-3">
                        <dt className="text-greige">{k}</dt>
                        <dd className="text-navy">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="note mt-10">{DISCLAIMER.plan}</p>
      </div>

      <Lightbox
        items={DEVELOPMENT.map((x) => ({ src: x.img, alt: `${x.title} 계획도`, caption: `${x.title} (${x.status})`, light: true }))}
        index={zoom}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
