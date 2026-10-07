"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = { src: string; alt: string; caption?: string; light?: boolean };

export default function Lightbox({
  items,
  index,
  onClose,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
}) {
  const [i, setI] = useState(index ?? 0);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (index !== null) setI(index);
  }, [index]);

  const prev = useCallback(() => setI((v) => (v - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setI((v) => (v + 1) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  if (!mounted || !open) return null;
  const item = items[i];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-[#08142A]/95"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-pearl md:px-8">
        <p className="num text-xs tracking-[0.2em] text-pearl/60">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-pearl/80 hover:text-pearl"
          aria-label="닫기"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
        <figure
          className={`flex max-h-full max-w-full flex-col items-center ${item.light ? "bg-pearl-50 p-4 md:p-8" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} className="max-h-[78vh] w-auto max-w-full object-contain" />
          {item.caption && <figcaption className="mt-3 text-center text-xs text-greige-300">{item.caption}</figcaption>}
        </figure>
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-pearl/70 hover:text-pearl md:left-6"
              aria-label="이전 이미지"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path d="M13 3L6 10l7 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-pearl/70 hover:text-pearl md:right-6"
              aria-label="다음 이미지"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path d="M7 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
