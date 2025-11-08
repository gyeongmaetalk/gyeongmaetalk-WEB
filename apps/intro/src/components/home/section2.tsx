import Image from "next/image";

import Coupon from "@/assets/coupon.svg";

import { ChevronRight } from "lucide-react";

const section2BgIcon = "/static/section2-bg-icon1.webp";
const section2BgIcon2 = "/static/section2-bg-icon2.webp";

export default function Section2() {
  return (
    <section
      className="bg-primary-normal relative overflow-hidden py-15 text-white"
      aria-label="신규 회원 혜택"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-title2-bold mb-1.5">신규 회원 즉시 혜택!</h2>
        <p className="font-body1-reading-medium mb-8 text-white opacity-70">
          지금 가입만 해도 즉시 사용 가능해요.
        </p>

        <div className="relative z-1 mx-auto flex h-40 w-70 items-center justify-center">
          <Coupon className="absolute mt-1" />
          <div className="absolute flex h-40 w-70 items-center justify-between px-5 py-9">
            <div className="text-start">
              <p className="font-label1-normal-medium text-label-alternative">신규회원 전용</p>
              <h3 className="font-title3-bold text-label-strong">경매 전문가</h3>
              <h3 className="font-title3-bold text-primary-normal">무료 상담 1회</h3>
            </div>

            <a href="#" aria-label="무료 상담 신청하기" className="bg-transparent">
              <ChevronRight className="text-label-assistive relative left-1 size-8" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 h-full w-full max-w-120 -translate-x-1/2 md:mx-auto md:max-w-120">
        <Image
          width={247}
          height={247}
          src={section2BgIcon}
          alt="배경 아이콘 - 집 모양"
          className="absolute -right-[113px] -bottom-90 aspect-square h-[798px] w-[882px] object-contain opacity-40 md:-right-50 md:-bottom-90 md:max-w-130"
          fetchPriority="high"
        />
        <Image
          width={247}
          height={247}
          src={section2BgIcon2}
          alt="배경 아이콘2 - 책 모양"
          className="absolute top-0 -left-10 aspect-square w-[247px] object-contain opacity-40 md:-top-30 md:-left-25 md:h-[360px] md:w-[360px]"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
