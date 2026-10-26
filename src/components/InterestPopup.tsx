"use client";
import { useEffect, useId, useRef, useState } from "react";
import PrivacyText from "./PrivacyText";
import { SITE } from "@/data/site";
import { buildSmsHref, isMobile } from "@/lib/sms";

// 진입 시 관심고객 등록 팝업. "오늘 하루 보지 않기"는 브라우저 저장소에 날짜로 기록
const HIDE_KEY = "lancity-interest-hide";
const SHOW_DELAY = 1200;

const todayStr = () => {
  const t = new Date();
  return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
};

const isoToday = () => {
  const t = new Date();
  t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  return t.toISOString().slice(0, 10);
};

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
};

export default function InterestPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [minDate, setMinDate] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const id = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hidden = false;
    try {
      hidden = localStorage.getItem(HIDE_KEY) === todayStr();
    } catch {
      /* 저장소 차단 환경: 항상 노출 */
    }
    setMinDate(isoToday());
    if (hidden) return;
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    boxRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hideToday = () => {
    try {
      localStorage.setItem(HIDE_KEY, todayStr());
    } catch {
      /* 무시 */
    }
    setOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    if (!name.trim()) return setErr("이름을 입력해 주세요.");
    if (phone.replace(/\D/g, "").length < 10) return setErr("연락처를 정확히 입력해 주세요.");
    if (!visitDate) return setErr("방문 희망 날짜를 선택해 주세요.");
    if (!agree) return setErr("개인정보 수집·이용에 동의해 주세요.");
    setErr(null);
    const body = `[${SITE.name} 관심고객 등록]\n이름: ${name.trim()}\n연락처: ${phone}\n관심타입: ${type || "미정"}\n방문희망: ${visitDate} ${visitTime.trim() || "시간 미정"}`;
    setNotice(
      isMobile()
        ? "문자 앱이 열리면 전송 버튼을 눌러주세요."
        : `PC에서는 문자 앱이 열리지 않을 수 있습니다. 휴대전화로 접속하시거나 ${SITE.tel}로 전화 주세요.`
    );
    window.location.href = buildSmsHref(body);
  };

  if (!open) return null;

  const field =
    "h-11 w-full border-0 border-b border-line bg-transparent px-0 text-[16px] text-navy placeholder:text-greige/60 focus:border-navy focus:outline-none focus:ring-0";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#08142A]/75 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        ref={boxRef}
        tabIndex={-1}
        className="flex max-h-[calc(100dvh-2rem)] w-full max-w-[420px] flex-col overflow-hidden bg-pearl-50 text-navy outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 bg-navy-900 px-6 pb-6 pt-7 text-pearl md:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/lancity-white.svg" alt="LANCITY 서동탄역 랜시티" width={229} height={78} className="h-7 w-auto" />
          <h2 id={`${id}-title`} className="mt-5 text-[26px] font-semibold leading-tight tracking-tightest">
            관심고객 등록
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-pearl/70">등록하시면 담당자가 주요 일정과 조건을 먼저 안내해 드립니다.</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="닫기"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-pearl/70 hover:text-pearl"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden>
              <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <form onSubmit={submit} noValidate className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6 md:px-8">
          <div>
            <label htmlFor={`${id}-name`} className="text-xs text-greige">
              이름 <span className="text-burgundy">*</span>
            </label>
            <input id={`${id}-name`} className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="홍길동" maxLength={20} />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className="text-xs text-greige">
              연락처 <span className="text-burgundy">*</span>
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
            <legend className="text-xs text-greige">
              관심타입 <span className="text-greige/70">(선택)</span>
            </legend>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {["59㎡", "84㎡", "미정"].map((t) => (
                <label
                  key={t}
                  className={`flex h-10 cursor-pointer items-center justify-center border text-[14px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy ${
                    type === t ? "border-navy bg-navy font-semibold text-pearl" : "border-line text-navy/80 hover:border-navy/50"
                  }`}
                >
                  <input type="radio" name={`${id}-type`} value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-[1.15fr_1fr] gap-4">
            <div>
              <label htmlFor={`${id}-date`} className="text-xs text-greige">
                방문 희망 날짜 <span className="text-burgundy">*</span>
              </label>
              <input
                id={`${id}-date`}
                type="date"
                className={`${field} num`}
                value={visitDate}
                min={minDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`${id}-time`} className="text-xs text-greige">
                방문 희망 시간
              </label>
              <input
                id={`${id}-time`}
                className={field}
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                placeholder="예) 오후 2시"
                maxLength={20}
              />
            </div>
          </div>

          <div className="border-t border-line pt-4">
            <div className="flex items-start justify-between gap-3">
              <label className="flex cursor-pointer items-start gap-2.5 text-[14px] text-navy/85">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-navy"
                />
                개인정보 수집·이용 동의 <span className="text-burgundy">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPolicy((v) => !v)}
                aria-expanded={showPolicy}
                className="shrink-0 text-xs text-greige underline underline-offset-4 hover:text-navy"
              >
                {showPolicy ? "접기" : "내용 보기"}
              </button>
            </div>
            {showPolicy && (
              <div className="mt-3 max-h-48 overflow-y-auto border border-line bg-pearl p-3 [&_*]:text-[12px]">
                <PrivacyText />
              </div>
            )}
          </div>

          <div aria-live="polite" className="min-h-[1.1rem] text-[13px]">
            {err && <p className="text-burgundy">{err}</p>}
            {!err && notice && <p className="text-navy/70">{notice}</p>}
          </div>

          <button type="submit" className="h-[52px] w-full bg-navy text-[16px] font-semibold text-pearl transition-colors hover:bg-navy-900">
            관심고객 등록하기
          </button>
          <a href={SITE.telHref} className="num block text-center text-[13px] text-greige hover:text-navy">
            전화 상담 {SITE.tel}
          </a>
        </form>

        <div className="grid shrink-0 grid-cols-2 border-t border-line text-[13px]">
          <button type="button" onClick={hideToday} className="h-12 text-greige hover:text-navy">
            오늘 하루 보지 않기
          </button>
          <button type="button" onClick={() => setOpen(false)} className="h-12 border-l border-line font-medium text-navy hover:bg-pearl">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
