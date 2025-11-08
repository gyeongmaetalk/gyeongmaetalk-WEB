import Image from "next/image";

import TriangleArrow from "@/assets/triangle-arrow.svg";

const section4Img1 = "/static/section4-img1.webp";
const section4Img2 = "/static/section4-img2.webp";
const section4Img3 = "/static/section4-img3.webp";

export default function Section4() {
  return (
    <section className="bg-white py-10" aria-label="서비스 혜택">
      {/* 1:1 전문가 매칭 */}
      <div className="container mx-auto flex max-w-250 flex-col items-center gap-12 px-4 py-10 not-first-of-type:justify-center md:flex-row md:py-3">
        <div className="flex h-95 flex-1 flex-col items-center justify-center gap-3 rounded-2xl">
          <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-full border px-2.5 py-1">
            혜택 01
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-title2-bold text-label-strong">
              <strong className="text-primary-normal">1:1</strong> 전문가 매칭
            </h2>
            <p className="font-body1-normal-regular text-label-neutral text-center">
              몇 가지 간단한 질문을 통해 꼭 맞는
              <br />
              경매 전문가를 연결해드려요.
            </p>
          </div>
        </div>
        <div className="bg-cool-neutral-99 relative h-95 w-full flex-1 rounded-2xl px-20 pt-8 md:px-0">
          <div className="h-95">
            <Image
              src={section4Img1}
              alt="전문가 매칭 화면 이미지"
              className="object-contain pt-8"
              loading="lazy"
              fill
            />
          </div>
        </div>
      </div>
      {/* 직접 찾아주는 확실한 매물 */}
      <div className="container mx-auto flex max-w-250 flex-col-reverse items-center gap-12 px-4 py-10 not-first-of-type:justify-center md:flex-row md:py-3">
        <div className="bg-cool-neutral-99 relative h-95 w-full flex-1 rounded-2xl px-20 pt-8 md:px-0">
          <div className="h-95">
            <Image
              src={section4Img2}
              alt="직접 찾아주는 확실한 매물 화면 이미지"
              className="object-contain pt-8"
              loading="lazy"
              fill
            />
          </div>
        </div>
        <div className="flex h-95 flex-1 flex-col items-center justify-center gap-3 rounded-2xl">
          <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-full border px-2.5 py-1">
            혜택 02
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-title2-bold text-label-strong">
              직접 찾아주는 <strong className="text-primary-normal">확실한 매물</strong>
            </h2>
            <p className="font-body1-normal-regular text-label-neutral text-center">
              검증된 전문가가
              <br />
              직접 선별한 매물을 받아보세요.
            </p>
          </div>
        </div>
      </div>
      {/* 부담없는 합리적 비용 */}
      <div className="container mx-auto flex max-w-250 flex-col items-center gap-12 px-4 py-10 not-first-of-type:justify-center md:flex-row md:py-3">
        <div className="flex h-95 flex-1 flex-col items-center justify-center gap-3 rounded-2xl">
          <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-full border px-2.5 py-1">
            혜택 03
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-title2-bold text-label-strong">
              부담없는 <strong className="text-primary-normal">합리적 비용</strong>
            </h2>
            <p className="font-body1-normal-regular text-label-neutral text-center">
              평균 50~55만 원의 초기 비용을
              <br />
              30만원으로 부담을 낮췄어요.
            </p>
          </div>
        </div>
        <div className="bg-cool-neutral-99 flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-2xl px-20 py-5.5 md:px-0">
          <h1 className="text-[54px] font-extrabold whitespace-nowrap text-black line-through opacity-10">
            500,000원
          </h1>
          <Image
            width={156}
            height={176}
            src={section4Img3}
            alt="부담없는 합리적 비용 화면 이미지"
            className="-mt-12"
            loading="lazy"
          />
          <TriangleArrow className="size-4" />
          <h1 className="text-primary-normal flex flex-row items-center justify-center gap-1 text-[32px] font-extrabold">
            300,000
            <p className="text-primary-normal text-[24px] font-semibold">원</p>
          </h1>
          <p className="font-body1-normal-regular text-label-normal text-center whitespace-nowrap opacity-60">
            시세보다 <strong>약 45% 저렴한 가격</strong>으로 <br /> 시작 할 수 있어요.
          </p>
        </div>
      </div>
    </section>
  );
}
