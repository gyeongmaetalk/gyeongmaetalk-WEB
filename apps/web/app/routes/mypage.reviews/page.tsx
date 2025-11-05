import { Loader2 } from "lucide-react";

import { Review, ReviewList } from "~/components/review";
import SentinelSpinner from "~/components/sentinel-spinner";
import { useGetMyReviews } from "~/lib/tanstack/query/review";

export default function MyPageReviewsPage() {
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetMyReviews();

  if (isLoading) {
    return (
      <div className="flex h-full items-center">
        <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-label1-normal-medium text-label-neutral">오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="h-full py-6">
      <Review className="h-full">
        <ReviewList reviews={data} />
      </Review>
      <SentinelSpinner
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
