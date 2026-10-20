import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/data/site";

const desc =
  "경기도 오산시 외삼미동 서동탄역 랜시티. 서동탄역 외삼미1지구 민간임대아파트, 최고 29층 14개동 총 1,472세대(예정), 전용 59㎡ · 84㎡. 상담 문의 1555-6760.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | 민간임대 상담 ${SITE.tel}`,
  description: desc,
  openGraph: {
    url: "/",
    title: `${SITE.name} | 민간임대 상담 ${SITE.tel}`,
    description: "서동탄역 곁에 서는 14개동 1,472세대(예정). 서동탄역 외삼미1지구 민간임대아파트.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#163259",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="color-scheme" content="light" />
        <style>{`html,body{background:#F4F2EE;color:#163259}`}</style>
        <link rel="preload" href="/fonts/Pretendard-SemiBold.subset.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Pretendard-Regular.subset.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
