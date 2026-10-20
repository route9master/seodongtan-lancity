import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { RENTAL, RENTAL_NOTE } from "@/data/site";

export default function Rental() {
  return (
    <section id="rental" className="bg-pearl-50 py-24 md:py-36">
      <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
        <SectionHead
          className="md:col-span-4"
          over="Private Rental"
          title={"서동탄역 외삼미1지구\n민간임대아파트"}
          desc="새 아파트에서 오래, 안정적으로. 민간임대주택으로 공급되는 서동탄역 랜시티의 거주 방식입니다."
        />

        <ol className="grid gap-x-10 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {RENTAL.map((r, i) => (
            <li key={r.no} className="border-t border-navy/80">
              <Reveal delay={i * 0.05} className="py-7 md:py-9">
                <span className="num text-[13px] font-medium tracking-[0.2em] text-burgundy">{r.no}</span>
                <h3 className="mt-3 text-[20px] font-semibold tracking-tightest text-navy md:text-[22px]">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.75] text-navy/70">{r.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="note md:col-span-7 md:col-start-6">{RENTAL_NOTE}</p>
      </div>
    </section>
  );
}
