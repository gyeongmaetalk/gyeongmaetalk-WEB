import { Link } from "react-router";

import Dot from "~/components/icons/Dot";
import Image from "~/components/image";
import StarRating from "~/components/star-rating";
import { SortType } from "~/constants/api";
import { useGetReviewPreview } from "~/lib/tanstack/query/review";
import type { ReviewListItemDTO } from "~/models/review";
import { formatDate, maskUserName } from "~/utils/format";

const formatReviewDate = (date: string): string => {
  const now = new Date();
  const reviewDate = new Date(date);

  const isSameYear = reviewDate.getFullYear() === now.getFullYear();
  const isSameMonth = reviewDate.getMonth() === now.getMonth();
  const isSameDay = reviewDate.getDate() === now.getDate();

  if (isSameYear && isSameMonth && isSameDay) {
    return "오늘";
  }

  const diffMilliseconds = now.getTime() - reviewDate.getTime();
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays}일 전`;
  }

  return formatDate({ date });
};

export default function ReviewPreview() {
  const { data: reviews = [] } = useGetReviewPreview(SortType.LATEST, "5");

  return (
    <div className="flex flex-col gap-4 px-4">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewPreviewItem key={review.reviewId} {...review} />)
      ) : (
        <div className="flex h-full items-center justify-center py-10">
          <p className="font-label1-normal-medium text-label-neutral">리뷰가 없어요.</p>
        </div>
      )}
    </div>
  );
}

const ReviewPreviewItem = ({
  reviewId,
  score,
  content,
  name,
  createAt,
  thumbnail,
}: ReviewListItemDTO) => {
  return (
    <Link
      className="flex flex-row items-center justify-between gap-2.5"
      to={`/consult/reviews/${reviewId}`}
    >
      <div className="flex flex-col gap-1">
        <StarRating rating={score} />
        <p className="font-label1-normal-medium text-label-neutral text-overflow-ellipsis line-clamp-2">
          {content}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="font-label2-regular text-label-alternative">{maskUserName(name)}</p>
          <Dot />
          <p className="font-label2-regular text-label-alternative">{formatReviewDate(createAt)}</p>
        </div>
      </div>
      {thumbnail && (
        <div className="size-20 shrink-0 rounded-[12px]">
          <Image src={thumbnail} alt="리뷰 이미지" className="w-full rounded-[12px] object-cover" />
        </div>
      )}
    </Link>
  );
};
