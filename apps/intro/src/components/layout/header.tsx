"use client";

import { useState } from "react";

import LogoIcon from "@/assets/logo-icon.svg";
import LogoText from "@/assets/logo-text.svg";
import { StoreType } from "@/constants/store";
import { useScroll } from "@/hooks/use-scroll";
import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { cn } from "@gyeongmaetalk/utils";

import LinkButton from "../button/link-button";

export default function Header() {
  const isScrolled = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [downloadMenuRef] = useOutsideClick<HTMLDivElement>(() => setIsMenuOpen(false));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-10 flex w-full flex-row justify-between px-4 py-2.5 transition-colors duration-300",
        isScrolled ? "bg-white" : "bg-transparent"
      )}
    >
      <div className="flex flex-row gap-1">
        <LogoIcon className="h-6" />
        <LogoText className="h-6" />
      </div>
      <div className="relative z-20">
        <button
          className="bg-primary-normal font-caption1-medium block rounded-md px-2 py-1 text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="앱 다운로드 메뉴"
          aria-expanded={isMenuOpen}
          aria-controls="download-menu"
        >
          앱 다운로드
        </button>

        <div
          ref={downloadMenuRef}
          id="download-menu"
          role="menu"
          aria-label="다운로드 옵션"
          className={cn(
            "absolute top-10 right-0 flex flex-col rounded-lg bg-white p-3 md:hidden",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <LinkButton
            type={StoreType.APP_STORE}
            className="w-50 justify-start whitespace-nowrap"
            text="App Store 다운로드"
          />
          <LinkButton
            type={StoreType.GOOGLE_PLAY}
            className="w-50 justify-start whitespace-nowrap"
            text="Google Play 다운로드"
          />
        </div>
      </div>
    </header>
  );
}
