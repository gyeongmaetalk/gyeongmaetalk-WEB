import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router";

import homeBg from "~/assets/home-main.png";
import { Back, Close } from "~/components/icons";
import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { Review, ReviewHeader, ReviewList } from "~/components/review";
import SentinelSpinner from "~/components/sentinel-spinner";
import { SortType } from "~/constants";
import { useGetReviews } from "~/lib/tanstack/query/review";

const reservationStatus: "reservation" | "before-consult" | "after-consult" = "reservation";

const getReservationText = (status: "reservation" | "before-consult" | "after-consult") => {
  if (status === "reservation") return null;
  if (status === "before-consult")
    return {
      title: "전문가 상담 무료 혜택을 드려요",
      toText: "상담 신청하러 가기",
      to: "/onboarding?mode=apply",
    };

  return {
    title: "나와 딱 맞는 매물을 둘러 보세요",
    toText: "매물 추천받기",
    to: "/agency/recommend",
  };
};

const ConsultReviewsPage = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || SortType.LATEST;

  const reservationText = getReservationText(reservationStatus);
  const [isShowModal, setIsShowModal] = useState(Boolean(reservationText));

  const {
    data: reviews = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReviews(sort as SortType);

  return (
    <PageLayout header={<WithBackHeader title="상담후기" />}>
      {isShowModal && (
        <section className="px-4 pb-6 pt-3">
          <div
            className="space-y-1.5 rounded-[12px] bg-cover bg-center bg-no-repeat px-5 py-[15px]"
            style={{ backgroundImage: `url(${homeBg})` }}
          >
            <div className="flex items-center justify-between">
              <p className="font-body1-normal-bold">{reservationText?.title}</p>
              <button onClick={() => setIsShowModal(false)}>
                <Close />
              </button>
            </div>
            <Link
              to={reservationText?.to || ""}
              className="text-primary-normal flex items-center gap-1"
            >
              <p className="font-body2-normal-medium">{reservationText?.toText}</p>
              <Back className="size-3 rotate-180" />
            </Link>
          </div>
        </section>
      )}
      <Review className="h-[calc(100%-52px)]">
        <ReviewHeader sort={sort} totalCount={reviews.length} />
        {isLoading ? (
          <div className="flex h-full items-center">
            <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-label1-normal-medium text-label-neutral">오류가 발생했습니다.</p>
          </div>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </Review>
      <SentinelSpinner
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </PageLayout>
  );
};

export default ConsultReviewsPage;
