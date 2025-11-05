import { Button, DragCarousel, DragCarouselItem } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import ConsultantReviewCard from "~/components/card/consultant-review-card";
import FloatingContainer from "~/components/container/floating-container";
import Image from "~/components/image";
import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import ReviewItemHeader from "~/components/review/review-item-header";
import { useGetReviewById } from "~/lib/tanstack/query/review";
import { formatDate } from "~/utils/format";

interface ConsultReviewsDetailPageProps {
  reviewId: string;
}

const ConsultReviewsDetailPage = ({ reviewId }: ConsultReviewsDetailPageProps) => {
  const { data: review, isLoading, isError, error } = useGetReviewById(reviewId);

  const navigate = useNavigate();

  const isNotFoundError = isError && error.response.status === 404;

  return (
    <>
      <PageLayout header={<WithBackHeader title="상담 상세" />} withFloating>
        {isLoading ? (
          <div className="flex h-full">
            <Loader2 className="text-primary-normal mx-auto size-10 animate-spin self-center" />
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-label1-normal-medium text-label-neutral">
              {isNotFoundError ? "존재하지 않는 리뷰입니다." : "오류가 발생했습니다."}
            </p>
          </div>
        ) : (
          <section className="space-y-3 px-4 py-6">
            <ReviewItemHeader
              isMyReview={review?.mine || false}
              reviewId={+reviewId}
              createAt={review?.createAt || new Date().toISOString()}
              name={review?.name || "닉네임"}
              score={review?.score || 0}
            />
            <ConsultantReviewCard
              date={formatDate({
                date: review?.counselDate || new Date().toISOString(),
                withTime: true,
              })}
              counselorName={review?.counselorName || "이름"}
              experience={review?.experience || 0}
              counselorImage={review?.counselorImage || ""}
            />
            {review?.images.length === 1 && (
              <Image
                src={review?.images[0]}
                alt={`${review.name} 이미지`}
                className="aspect-image w-full rounded-[12px] object-cover"
              />
            )}
            {review?.images && review?.images.length > 1 && (
              <DragCarousel>
                {review?.images.map((image, index) => (
                  <DragCarouselItem key={index} className="w-4/5">
                    <Image
                      src={image}
                      alt="review-image"
                      className="aspect-image w-full rounded-[12px] object-cover"
                    />
                  </DragCarouselItem>
                ))}
              </DragCarousel>
            )}

            <p className="font-label1-normal-medium text-label-neutral whitespace-pre-line">
              {review?.content || "내용"}
            </p>
          </section>
        )}
      </PageLayout>
      <FloatingContainer>
        <Button
          className="w-full"
          variant="outlined"
          theme="assistive"
          onClick={() => navigate(-1)}
        >
          후기 목록으로 이동
        </Button>
      </FloatingContainer>
    </>
  );
};

export default ConsultReviewsDetailPage;
