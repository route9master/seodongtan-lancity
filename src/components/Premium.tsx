import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PREMIUM } from "@/data/site";

export default function Premium() {
  return (
    <section id="premium" className="bg-navy-900 py-24 text-pearl md:py-36">
      <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionHead dark over="Special Premium 7" title={"서동탄역 랜시티의\n일곱 가지 이유"} />
            <Reveal delay={0.1} className="mt-12 hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/lancity-white.svg" alt="" aria-hidden width={229} height={78} loading="lazy" className="w-[240px] opacity-90" />
            </Reveal>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7">
          {PREMIUM.map((p, i) => (
            <li key={p.no} className="border-t border-pearl/15 first:border-pearl/60">
              <Reveal delay={i * 0.03} className="grid grid-cols-[48px_1fr] gap-x-4 py-8 md:grid-cols-[72px_1fr] md:py-10">
                <span className="num pt-1 text-[13px] font-medium tracking-[0.2em] text-burgundy-300">{p.no}</span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-over text-greige-300">{p.en}</p>
                  <h3 className="mt-2 text-[20px] font-semibold leading-snug tracking-tightest text-pearl md:text-[26px]">{p.title}</h3>
                  <p className="mt-3 max-w-[30rem] text-[15px] leading-[1.75] text-pearl/70">{p.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
