import { Fragment } from "react";

import { cn } from "@gyeongmaetalk/utils";

import type { ConsultantReviewListItemDTO, ReviewListItemDTO } from "~/models/review";
import FilterDropdown from "~/routes/consult.reviews.consultant/filter-dropdown";

import ReviewItem from "./review-item";
import Divider from "../divider";

function Review({ children, ...props }: React.ComponentProps<"div">) {
  const { className: propsClassName, ...rest } = props;
  const className = cn("space-y-6 px-4", propsClassName);

  return (
    <section className={className} {...rest}>
      {children}
    </section>
  );
}

interface ReviewHeaderProps {
  [key: string]: string | number;
  sort: string;
  totalCount: number;
}

function ReviewHeader({ sort, totalCount, ...props }: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-headline2-bold">
        전체 <span className="text-primary-normal">{totalCount}개</span>
      </p>
      <FilterDropdown sort={sort} {...props} />
    </div>
  );
}

interface ReviewListProps {
  reviews: ConsultantReviewListItemDTO[] | ReviewListItemDTO[];
}

function ReviewList({ reviews }: ReviewListProps) {
  return reviews.length > 0 ? (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <Fragment key={index}>
          <ReviewItem {...review} />
          {index !== 9 && <Divider className="bg-cool-neutral-98" />}
        </Fragment>
      ))}
    </div>
  ) : (
    <div className="flex h-full items-center justify-center">
      <p className="font-label1-normal-medium text-label-neutral">리뷰가 없어요.</p>
    </div>
  );
}

export { Review, ReviewHeader, ReviewList };
