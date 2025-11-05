import { Link } from "react-router";

import type { ConsultantReviewListItemDTO, ReviewListItemDTO } from "~/models/review";
import { formatDate } from "~/utils/format";

import ReviewItemHeader from "./review-item-header";
import { Verified } from "../icons";
import Image from "../image";

type ReviewItemProps = ConsultantReviewListItemDTO | ReviewListItemDTO;

const ReviewItem = (props: ReviewItemProps) => {
  const isConsultantReview = "counselorName" in props;

  return (
    <div className="space-y-3">
      <ReviewItemHeader
        isMyReview={props.mine}
        reviewId={props.reviewId}
        createAt={props.createAt}
        name={props.name}
        score={props.score}
      />
      {isConsultantReview && (
        <div className="bg-cool-neutral-99 flex items-center gap-1.5 rounded-[12px] px-3 py-2">
          <div className="flex items-center gap-0.5">
            <p className="font-label2-regular text-label-strong">{props.counselorName} 상담사</p>
            <Verified />
          </div>
          <p className="text-label-alternative text-[3px]">●</p>
          <p className="font-label2-regular text-label-alternative">
            {formatDate({ date: props.counselDate, withTime: true })} 상담완료
          </p>
        </div>
      )}
      <Link to={`/consult/reviews/${props.reviewId}`} className="flex justify-between gap-2.5">
        <p className="font-label1-normal-medium line-clamp-3 py-2.5 whitespace-pre-line">
          {props.content}
        </p>
        <div className="size-20 shrink-0 rounded-[12px]">
          <Image
            src={props.thumbnail}
            alt="리뷰 이미지"
            className="w-full rounded-[12px] object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default ReviewItem;
