import Image from "next/image";

const section5Icon1 = "/static/section5-icon1.webp";
const section5Icon2 = "/static/section5-icon2.webp";
const section5Icon3 = "/static/section5-icon3.webp";
const section5Icon4 = "/static/section5-icon4.webp";

export default function Section5() {
  return (
    <section className="bg-blue-99 py-15" aria-label="이용 안내">
      <div className="container mx-auto max-w-250 px-4">
        <div className="mb-6 text-center">
          <h2 className="font-title2-bold text-label-strong">이용 안내</h2>
          <p className="font-body1-normal-regular text-label-neutral">
            경매 대행은 아래의 순서로 진행돼요.
          </p>
        </div>
        <div className="flex flex-col rounded-2xl bg-white px-6 py-5 md:max-w-250 md:flex-row md:justify-around md:py-10">
          {/* 01 */}
          <div className="flex flex-row items-center justify-between md:flex-col">
            <div className="flex flex-1 flex-col items-start justify-start gap-1 rounded-2xl">
              <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-[999px] border px-2 py-1">
                01
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h1 className="font-body1-normal-medium text-label-strong">
                  상담 신청 및 전문가 매칭
                </h1>
                <p className="font-caption1-regular text-label-neutral text-start">
                  검증된 전문가가
                  <br />
                  직접 선별한 매물을 받아보세요.
                </p>
              </div>
            </div>
            <Image
              width={80}
              height={80}
              src={section5Icon1}
              alt="상담 신청 아이콘"
              className="ratio-1/1 object-contain md:h-20 md:w-20"
              loading="lazy"
            />
          </div>
          {/* 모바일: 가로 구분선 */}
          <div className="dash-divider-horizontal text-label-assistive my-5 h-px w-full md:hidden" />
          {/* 데스크탑: 세로 구분선 */}
          <div className="dash-divider text-label-assistive mx-6 hidden h-auto w-px md:block" />

          <div className="flex flex-row items-center justify-between gap-6 md:flex-col">
            <div className="flex flex-1 flex-col items-start justify-start gap-1 rounded-2xl">
              <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-[999px] border px-2 py-1">
                02
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h1 className="font-body1-normal-medium text-label-strong">1:1 전화 상담</h1>
                <p className="font-caption1-regular text-label-neutral text-start">
                  원하는 스케쥴에 맞춤 상담으로
                  <br />
                  경매 절차를 이해할 수 있습니다.
                </p>
              </div>
            </div>
            <Image
              width={80}
              height={80}
              src={section5Icon2}
              alt="1:1 전화 상담 아이콘"
              className="ratio-1/1 object-contain md:h-20 md:w-20"
              loading="lazy"
            />
          </div>
          {/* 모바일: 가로 구분선 */}
          <div className="dash-divider-horizontal text-label-assistive my-5 h-px w-full md:hidden" />
          {/* 데스크탑: 세로 구분선 */}
          <div className="dash-divider text-label-assistive mx-6 hidden h-auto w-px md:block" />

          <div className="flex flex-row items-center justify-between gap-6 md:flex-col">
            <div className="flex flex-1 flex-col items-start justify-start gap-1 rounded-2xl">
              <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-[999px] border px-2 py-1">
                03
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h1 className="font-body1-normal-medium text-label-strong">
                  경매 전략 & 매물 추천
                </h1>
                <p className="font-caption1-regular text-label-neutral text-start">
                  전문가가 직접 분석한 입찰 전략과 <br />
                  추천 매물을 받아보세요.
                </p>
              </div>
            </div>
            <Image
              width={80}
              height={80}
              src={section5Icon3}
              alt="경매 전략 및 매물 추천 아이콘"
              className="ratio-1/1 object-contain md:h-20 md:w-20"
              loading="lazy"
            />
          </div>
          {/* 모바일: 가로 구분선 */}
          <div className="dash-divider-horizontal text-label-assistive my-5 h-px w-full md:hidden" />
          {/* 데스크탑: 세로 구분선 */}
          <div className="dash-divider text-label-assistive mx-6 hidden h-auto w-px md:block" />

          <div className="flex flex-row items-center justify-between gap-6 md:flex-col">
            <div className="flex flex-1 flex-col items-start justify-start gap-1 rounded-2xl">
              <div className="font-caption1-bold text-primary-normal bg-primary-normal/10 border-primary-normal/7 rounded-[999px] border px-2 py-1">
                04
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h1 className="font-body1-normal-medium text-label-strong">입찰 대행</h1>
                <p className="font-caption1-regular text-label-neutral text-start">
                  전문가가 입찰 과정을 대신
                  <br />
                  진행해 실수 없는 낙찰을 돕습니다.
                </p>
              </div>
            </div>
            <Image
              width={80}
              height={80}
              src={section5Icon4}
              alt="입찰 대행 아이콘"
              className="ratio-1/1 object-contain md:h-20 md:w-20"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
