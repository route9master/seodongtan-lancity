"use client";
import { useState } from "react";
import Lightbox from "./Lightbox";
import Picture from "./Picture";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { LOCATION } from "@/data/site";

export default function Location() {
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <section id="location" className="bg-pearl-50 py-24 md:py-36">
      <div className="container-site">
        <SectionHead
          over="Location"
          title={"서동탄역과 동탄 생활권,\n그 사이의 자리"}
          desc="사업지 동쪽으로 동탄신도시가 맞닿아 있습니다. 걸어서, 또 차로 닿는 생활 인프라를 정리했습니다."
        />

        <Reveal className="mt-14 md:mt-20">
          <button
            type="button"
            onClick={() => setZoom(0)}
            className="group relative block w-full overflow-hidden bg-white text-left"
            aria-label="광역 입지도 크게 보기"
          >
            <Picture
              src="/images/location/map-wide.webp"
              alt="서동탄역 랜시티 광역 입지도"
              width={2400}
              height={1664}
              className="w-full transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <span className="absolute right-3 top-3 bg-navy px-3 py-2 text-xs font-medium text-pearl md:right-5 md:top-5">크게 보기</span>
          </button>
          <p className="note mt-3">※ 상기 입지도는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.</p>
        </Reveal>

        <ol className="mt-4 md:mt-8">
          {LOCATION.map((l, i) => (
            <li key={l.no} className="border-b border-line py-10 md:grid md:grid-cols-12 md:gap-10 md:py-14">
              <Reveal className="md:col-span-4" delay={i * 0.04}>
                <div className="flex items-baseline gap-5">
                  <span className="num text-[44px] font-light leading-none text-burgundy md:text-[64px]">{l.no}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tightest text-navy md:text-2xl">{l.title}</h3>
                    <p className="mt-1 text-sm text-greige">{l.lead}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal className="mt-6 md:col-span-7 md:col-start-6 md:mt-0" delay={0.08 + i * 0.04}>
                <ul className="divide-y divide-line border-t border-navy/80">
                  {l.items.map((t) => (
                    <li key={t} className="py-3.5 text-[15px] leading-relaxed text-navy md:text-base">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="note mt-3">※ {l.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Lightbox
        items={[{ src: "/images/location/map-wide.webp", alt: "서동탄역 랜시티 광역 입지도", caption: "광역 입지도", light: true }]}
        index={zoom}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
