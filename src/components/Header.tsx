"use client";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = solid || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? "border-b border-line bg-pearl/95 backdrop-blur-[2px]" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-[72px]">
        <a href="#top" aria-label={`${SITE.name} 처음으로`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dark ? "/images/brand/lancity-navy.svg" : "/images/brand/lancity-white.svg"}
            alt="LANCITY 서동탄역 랜시티"
            width={229}
            height={78}
            className="h-[30px] w-auto md:h-[36px]"
          />
        </a>

        <nav aria-label="주요 메뉴" className="hidden xl:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`text-[14px] font-medium transition-colors ${
                    dark ? "text-navy/75 hover:text-navy" : "text-pearl/80 hover:text-pearl"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.telHref}
            className={`hidden h-10 items-center gap-2 border px-4 text-[14px] font-semibold num md:flex ${
              dark ? "border-navy text-navy hover:bg-navy hover:text-pearl" : "border-pearl/60 text-pearl hover:bg-pearl hover:text-navy"
            } transition-colors`}
          >
            {SITE.tel}
          </a>
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center xl:hidden ${dark ? "text-navy" : "text-pearl"}`}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              {open ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="모바일 메뉴" className="h-[calc(100dvh-64px)] overflow-y-auto bg-pearl xl:hidden">
          <ul className="container-site divide-y divide-line border-t border-line">
            {NAV.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-5 text-xl font-semibold tracking-tightest text-navy"
                >
                  <span className="num w-6 text-xs font-normal text-greige">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-site py-8">
            <p className="eyebrow">상담 문의</p>
            <a href={SITE.telHref} className="num mt-2 block text-3xl font-semibold text-navy">
              {SITE.tel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
