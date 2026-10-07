import type { Metadata } from "next";
import PrivacyText from "@/components/PrivacyText";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${SITE.name}`,
  robots: { index: false },
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-pearl py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5">
        <a href="/" className="text-xs text-greige hover:text-navy">
          ← {SITE.name} 홈으로
        </a>
        <h1 className="mt-8 text-[28px] font-semibold tracking-tightest text-navy md:text-4xl">개인정보처리방침</h1>
        <div className="mt-10">
          <PrivacyText />
        </div>
        <p className="mt-10 text-sm text-navy/70">
          개인정보 관련 문의: {SITE.tel}
        </p>
      </div>
    </main>
  );
}
