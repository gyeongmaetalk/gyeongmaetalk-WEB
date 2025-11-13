import Image from "next/image";

import { StoreType } from "@/constants/store";

import LinkButton from "../button/link-button";

const section1Bg = "/static/section1-bg.webp";
const screenshot1 = "/static/section1-image1.webp";
const screenshot2 = "/static/section1-image2.webp";
const screenshot3 = "/static/section1-image3.webp";

export default function Section1() {
  return (
    <section className="relative bg-cover md:bg-contain" aria-label="메인 소개">
      {/* 메인 배경 이미지 */}
      <picture className="absolute inset-0 h-full w-full overflow-hidden object-contain">
        <source type="image/webp" srcSet={section1Bg} />
        <Image
          src={section1Bg}
          alt="메인 배경 이미지"
          className="h-full w-full object-cover md:h-auto md:object-contain"
        />
      </picture>
      {/* 메인 콘텐츠 */}
      <div className="relative container mx-auto pt-20">
        <div className="flex flex-col gap-4">
          <div className="font-display2-bold flex flex-col items-center justify-center md:mb-10 md:flex-row md:gap-4">
            <h1 className="text-label-strong">부동산 경매의</h1>
            <h1 className="text-primary-normal">든든한 파트너</h1>
          </div>

          {/* 앱 다운로드 버튼 */}
          <div className="flex flex-row items-center justify-center gap-4">
            <LinkButton
              type={StoreType.APP_STORE}
              className="border border-[rgba(0,119,255,0.12)]"
            />
            <LinkButton
              type={StoreType.GOOGLE_PLAY}
              className="border border-[rgba(0,119,255,0.12)]"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid w-full max-w-4xl grid-cols-1 gap-0.5 md:grid-cols-3 lg:gap-8">
            <div className="relative -mr-10 ml-10 hidden md:block">
              <Image
                src={screenshot1}
                alt="핸드폰 프레임"
                className="absolute top-0 left-0 h-full w-full"
                fetchPriority="high"
                width={424}
                height={621}
              />
              <Image
                src={screenshot3}
                alt="경매톡 앱 경매대행 화면"
                className="ratio-1/1 absolute top-5 left-0 h-full w-full object-contain p-[14px]"
                fetchPriority="high"
                width={424}
                height={621}
              />
            </div>
            <Image
              src={screenshot1}
              alt="경매톡 앱 메인 화면"
              className="ratio-1/1 h-auto max-h-118 w-full object-contain md:w-full"
              fetchPriority="high"
              width={424}
              height={621}
            />
            <div className="relative mr-10 -ml-10 hidden md:block">
              <Image
                src={screenshot1}
                alt="핸드폰 프레임"
                className="absolute top-0 left-0 w-full"
                fetchPriority="high"
                width={424}
                height={621}
              />
              <Image
                src={screenshot2}
                alt="경매톡 앱 무료상담 화면"
                className="ratio-1/1 absolute top-5 left-0 h-full w-full object-contain p-[14px]"
                fetchPriority="high"
                width={424}
                height={621}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
