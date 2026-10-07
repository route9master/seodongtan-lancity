"use client";
import { useState } from "react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import Picture from "./Picture";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { DISCLAIMER, GALLERY } from "@/data/site";

const [PERSPECTIVE, SITE_A, SITE_B] = GALLERY;
const AERIAL = { src: "/images/render/aerial.webp", alt: "서동탄역 랜시티 조감도", caption: "조감도", w: 2560, h: 1600 };

const ITEMS: LightboxItem[] = [SITE_A, SITE_B, AERIAL, PERSPECTIVE].map((g) => ({ src: g.src, alt: g.alt, caption: g.caption }));

function Tile({
  g,
  onOpen,
  className = "",
}: {
  g: { src: string; m?: string; alt: string; caption: string; w: number; h: number };
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button type="button" onClick={onOpen} className={`group relative block w-full overflow-hidden text-left ${className}`} aria-label={`${g.caption} 크게 보기`}>
      <Picture src={g.src} mobile={g.m} alt={g.alt} width={g.w} height={g.h} className="w-full transition-transform duration-700 group-hover:scale-[1.02]" />
      <span className="absolute bottom-0 left-0 bg-navy/85 px-3 py-2 text-[11px] text-pearl">{g.caption}</span>
    </button>
  );
}

export default function Complex() {
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <section id="complex" className="bg-pearl-50 py-24 md:py-36">
      <div className="container-site">
        <SectionHead
          over="Site Plan"
          title={"서동탄역에서 이어지는\n두 개의 단지"}
          desc="서동탄역 쪽에 자리한 주상복합, 녹지를 따라 놓인 공동주택. 두 단지의 배치를 확인해 보세요."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-4">
          <Reveal>
            <Tile g={SITE_A} onOpen={() => setIdx(0)} />
          </Reveal>
          <Reveal delay={0.06}>
            <Tile g={SITE_B} onOpen={() => setIdx(1)} />
          </Reveal>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <Reveal>
            <Tile g={{ ...AERIAL, src: "/images/render/aerial-m.webp", w: 1200, h: 900 }} onOpen={() => setIdx(2)} />
          </Reveal>
          <Reveal delay={0.06}>
            <Tile g={{ ...PERSPECTIVE, src: PERSPECTIVE.m!, w: 1200, h: 667 }} onOpen={() => setIdx(3)} />
          </Reveal>
          <p className="note col-span-2 mt-1 md:col-span-1 md:mt-0 md:self-end">{DISCLAIMER.cg}</p>
        </div>
      </div>

      <Lightbox items={ITEMS} index={idx} onClose={() => setIdx(null)} />
    </section>
  );
}
