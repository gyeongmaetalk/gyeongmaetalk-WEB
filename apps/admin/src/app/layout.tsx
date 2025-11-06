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
  title: "경매톡 - 어드민",
  description: "경매톡 어드민 페이지",
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
