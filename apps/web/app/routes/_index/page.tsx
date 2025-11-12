import { DragCarousel, DragCarouselItem } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import homeBg from "~/assets/home-main.webp";
import thumbnail1 from "~/assets/home-thumbnail1.webp";
import thumbnail2 from "~/assets/home-thumbnail2.webp";
import thumbnail3 from "~/assets/home-thumbnail3.webp";
import Dot from "~/components/icons/Dot";
import { DefaultHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { CounselStatus, SortType } from "~/constants";
import useScroll from "~/hooks/use-scroll";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import { useGetReviews } from "~/lib/tanstack/query/review";
import { HOME_SECTION_TITLES } from "~/routes/_index/constant";
import ReviewPreview from "~/routes/_index/review-preview";
import SectionField from "~/routes/_index/section-field";
import TitleSection from "~/routes/_index/title-section";
import { formatCounselDate, formatCounselTime, getTimeDisplay } from "~/utils/format";

const contents = [
  {
    id: 1,
    title: "법원에서 부동산을?\n경매, 진짜 뭔가요?",
    thumbnail: thumbnail1,
  },
  {
    id: 2,
    title: "경매를 위한 \n필수 용어를 살펴보자!",
    thumbnail: thumbnail2,
  },
  {
    id: 3,
    title: "경매는 무조건\n 싸게 살 수 있다?",
    thumbnail: thumbnail3,
  },
];

export default function HomePage() {
  const { data: counselStatus } = useCheckCounselStatus();
  const { data: reviews = [], isLoading, isError } = useGetReviews(SortType.LATEST);

  const navigate = useNavigate();

  const status = counselStatus ? counselStatus.status : CounselStatus.NONE;

  const isScrolled = useScroll();

  return (
    <PageLayout
      header={<DefaultHeader className={isScrolled ? "bg-white" : "bg-transparent"} />}
      showNav
      mainClassName="mt-0"
    >
      <div
        className="flex h-full flex-col bg-gray-300 bg-cover bg-center bg-no-repeat pt-[calc(2.75rem+var(--spacing-ios-top))]"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <TitleSection status={status} />
        <div className="flex h-full flex-col gap-18 rounded-t-[20px] rounded-b-none bg-[#FFF] px-4 py-6 shadow-[0_0_16px_0_rgba(8,89,193,0.2)]">
          {status === CounselStatus.COUNSEL_AFTER && (
            <SectionField title={HOME_SECTION_TITLES.RESERVATION}>
              <div className="flex cursor-pointer flex-row items-center gap-2 rounded-[12px] bg-[rgba(0_119_255_/0.05)] p-4">
                <div className="rounded-[111px] border border-[rgba(18,18,19,0.5)] bg-[#FFF] px-2 py-[5px] text-[12px] font-bold text-[#07F]">
                  {getTimeDisplay(counselStatus?.info.counselDate ?? "")}
                </div>
                <div className="flex flex-row items-center gap-1.5">
                  <div className="font-body1-normal-medium text-label-neutral">
                    {formatCounselDate(counselStatus?.info.counselDate ?? "")}
                  </div>
                  <Dot />
                  <div className="font-body1-normal-medium text-label-neutral">
                    {formatCounselTime(counselStatus?.info.counselTime ?? "")}
                  </div>
                </div>
              </div>
            </SectionField>
          )}
          <SectionField title={HOME_SECTION_TITLES.A_TO_Z}>
            <DragCarousel>
              {contents.map((item) => (
                <DragCarouselItem key={item.id} className="cursor-pointer">
                  <div
                    className="font-body1-normal-bold text-label-neutral h-60 w-45 rounded-[12px] bg-[rgb(247_247_248_/0.5)] bg-cover bg-center bg-no-repeat p-4 whitespace-pre-line"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                    onClick={() => navigate(`/content/${item.id}`)}
                  >
                    {item.title}
                  </div>
                </DragCarouselItem>
              ))}
            </DragCarousel>
          </SectionField>

          <SectionField
            title={HOME_SECTION_TITLES.USER_REVIEWS}
            viewMore
            viewMoreLink="/consult/reviews"
          >
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="flex h-full items-center justify-center py-10">
                  <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
                </div>
              ) : isError ? (
                <div className="flex h-full items-center justify-center py-10">
                  <p className="font-label1-normal-medium text-label-neutral">
                    오류가 발생했습니다.
                  </p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewPreview
                    key={review.reviewId}
                    {...review}
                    onClick={() => navigate(`/consult/reviews/${review.reviewId}`)}
                  />
                ))
              ) : (
                <div className="flex h-full items-center justify-center py-10">
                  <p className="font-label1-normal-medium text-label-neutral">리뷰가 없어요.</p>
                </div>
              )}
            </div>
          </SectionField>
        </div>
      </div>
    </PageLayout>
  );
}
