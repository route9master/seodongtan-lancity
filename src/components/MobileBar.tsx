import { SITE } from "@/data/site";

export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-navy/20 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)", background: "#163259" }}>
      <a href={SITE.telHref} className="flex h-14 items-center justify-center gap-2 text-[15px] font-semibold text-pearl">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path d="M4.2 1.5l2 3-1.4 1.6a8.6 8.6 0 004.9 4.9l1.6-1.4 3 2-1 2.4c-6.3 0-11.3-5-11.3-11.3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
        전화 상담
      </a>
      <a href="#contact" className="flex h-14 items-center justify-center bg-pearl text-[15px] font-semibold text-navy">
        문자 상담
      </a>
    </div>
  );
}
