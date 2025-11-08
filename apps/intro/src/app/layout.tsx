import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import RootProvider from "@/components/layout/root-provider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "경매톡 | 부동산 경매를 쉽고 빠르게",
  description:
    "복잡한 부동산 경매 절차, 전문가와 함께 쉽고 빠르게 해결하세요. 30분 무료 상담부터 입찰 대행, 명도까지 한 번에! 초보자도 안심하고 시작할 수 있는 경매 파트너, 경매톡.",
  keywords: [
    "경매톡",
    "부동산 경매",
    "경매 상담",
    "경매 대행",
    "법원 경매",
    "권리분석",
    "명도",
    "입찰 전략",
    "부동산 투자",
    "취득세",
    "부동산 자산관리",
  ],
  metadataBase: new URL("https://gyeongmaetalk-intro.vercel.app"),
  openGraph: {
    title: "경매톡 | 부동산 경매를 쉽고 빠르게",
    description:
      "30분 무료 상담으로 불안 해소부터 입찰 대행까지 — 복잡한 부동산 경매, 이제 경매톡과 함께 하세요.",
    url: "https://gyeongmaetalk-intro.vercel.app",
    siteName: "경매톡",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://gyeongmaetalk-intro.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
