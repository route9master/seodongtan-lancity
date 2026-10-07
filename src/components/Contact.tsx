"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PrivacyText from "./PrivacyText";
import Reveal from "./Reveal";
import { SITE } from "@/data/site";
import { buildSmsHref, isMobile } from "@/lib/sms";

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
};

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const id = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modal) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    if (!name.trim()) return setErr("이름을 입력해 주세요.");
    if (phone.replace(/\D/g, "").length < 10) return setErr("연락처를 정확히 입력해 주세요.");
    if (!agree) return setErr("개인정보 수집·이용에 동의해 주세요.");
    setErr(null);
    const body = `[${SITE.name} 상담신청]\n이름: ${name.trim()}\n연락처: ${phone}\n관심타입: ${type || "미정"}`;
    if (!isMobile()) {
      setNotice(`PC에서는 문자 앱이 열리지 않을 수 있습니다. 휴대전화로 접속하시거나 ${SITE.tel}로 전화 주세요.`);
    } else {
      setNotice("문자 앱이 열리면 전송 버튼을 눌러주세요.");
    }
    window.location.href = buildSmsHref(body);
  };

  const field = "h-12 w-full border-0 border-b border-pearl/30 bg-transparent px-0 text-[16px] text-pearl placeholder:text-pearl/35 focus:border-pearl focus:outline-none focus:ring-0";

  return (
    <section id="contact" className="bg-navy py-24 text-pearl md:py-36">
      <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-greige-300">
            <span className="inline-block h-px w-6 bg-burgundy-300" aria-hidden />
            Contact
          </p>
          <h2 className="mt-5 text-[28px] font-semibold leading-[1.3] tracking-tightest md:text-[40px]">
            상담 신청
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-pearl/70">
            남겨주신 연락처로 담당자가 직접 안내해 드립니다. 바로 통화를 원하시면 대표번호로 연락 주세요.
          </p>
          <div className="mt-10 border-t border-pearl/20 pt-6">
            <p className="text-xs text-greige-300">상담 문의</p>
            <a href={SITE.telHref} className="num mt-2 inline-block text-[36px] font-semibold tracking-tightest md:text-[44px]">
              {SITE.tel}
            </a>
          </div>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={0.08}>
          <form onSubmit={submit} noValidate className="space-y-8">
            <div>
              <label htmlFor={`${id}-name`} className="text-xs text-greige-300">
                이름 <span className="text-burgundy-300">*</span>
              </label>
              <input id={`${id}-name`} className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="홍길동" maxLength={20} />
            </div>
            <div>
              <label htmlFor={`${id}-phone`} className="text-xs text-greige-300">
                연락처 <span className="text-burgundy-300">*</span>
              </label>
              <input
                id={`${id}-phone`}
                className={`${field} num`}
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                inputMode="numeric"
                autoComplete="tel"
                placeholder="010-0000-0000"
              />
            </div>
            <fieldset>
              <legend className="text-xs text-greige-300">
                관심타입 <span className="text-pearl/40">(선택)</span>
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["59㎡", "84㎡", "미정"].map((t) => (
                  <label
                    key={t}
                    className={`flex h-11 cursor-pointer items-center justify-center border text-[15px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy-300 ${
                      type === t ? "border-pearl bg-pearl font-semibold text-navy" : "border-pearl/30 text-pearl/80 hover:border-pearl/60"
                    }`}
                  >
                    <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex items-start justify-between gap-4 border-y border-pearl/15 py-4">
              <label className="flex cursor-pointer items-start gap-3 text-[14px] text-pearl/85">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none border border-pearl/50 bg-transparent checked:border-pearl checked:bg-pearl checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M3 8.5l3 3 7-7%22 stroke=%22%23163259%22 stroke-width=%222%22 fill=%22none%22/></svg>')]"
                />
                개인정보 수집·이용에 동의합니다. <span className="text-burgundy-300">*</span>
              </label>
              <button type="button" onClick={() => setModal(true)} className="shrink-0 text-xs text-pearl/60 underline underline-offset-4 hover:text-pearl">
                내용 보기
              </button>
            </div>

            <div aria-live="polite" className="min-h-[1.25rem] text-sm">
              {err && <p className="text-[#E8A88F]">{err}</p>}
              {!err && notice && <p className="text-pearl/70">{notice}</p>}
            </div>

            <button type="submit" className="h-14 w-full bg-pearl text-[16px] font-semibold text-navy transition-colors hover:bg-white">
              문자로 상담 신청하기
            </button>
          </form>
        </Reveal>
      </div>

      {modal &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-labelledby={`${id}-pt`} className="fixed inset-0 z-[100] flex items-end justify-center bg-[#08142A]/70 md:items-center" onClick={() => setModal(false)}>
            <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto bg-pearl p-6 text-navy md:p-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 id={`${id}-pt`} className="text-lg font-semibold">
                  개인정보 수집·이용 안내
                </h3>
                <button ref={closeRef} type="button" onClick={() => setModal(false)} aria-label="닫기" className="flex h-10 w-10 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <div className="mt-5">
                <PrivacyText />
              </div>
              <button
                type="button"
                onClick={() => {
                  setAgree(true);
                  setModal(false);
                }}
                className="mt-8 h-12 w-full bg-navy text-[15px] font-semibold text-pearl"
              >
                동의하고 닫기
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
