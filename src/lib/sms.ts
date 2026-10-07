import { SITE } from "@/data/site";

// 수신번호는 런타임에 배열 조립 — 소스·DOM에 연속 문자열로 노출하지 않음
const recipient = () => SITE.smsParts.join("");

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function buildSmsHref(body: string) {
  const sep = isIOS() ? "&" : "?";
  return `sms:${recipient()}${sep}body=${encodeURIComponent(body)}`;
}
