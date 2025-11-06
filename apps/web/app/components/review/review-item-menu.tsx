import { useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { cn } from "@gyeongmaetalk/utils";

import { useNavigate } from "react-router";

import { REVIEW } from "~/constants";
import { useRemoveReview } from "~/lib/tanstack/mutation/review";
import { getReviewById } from "~/services/review";
import { errorToast, successToast } from "~/utils/toast";

import ReviewReport from "./review-report";
import { Menu } from "../icons";

const OTHER_ITEM_OPTIONS = [
  {
    label: "신고",
    value: "report",
  },
];

const MY_ITEM_OPTIONS = [
  {
    label: "수정",
    value: "edit",
  },
  {
    label: "삭제",
    value: "delete",
  },
];

interface ReviewItemMenuProps {
  reviewId: number;
  isMyReview: boolean;
}

const ReviewItemMenu = ({ reviewId, isMyReview }: ReviewItemMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [menuRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const navigate = useNavigate();

  // 리뷰 삭제 Mutation
  const { mutateAsync: removeReview, isPending: isRemoveReviewPending } = useRemoveReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEWS] });
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEW_DETAIL, reviewId.toString()] });
      successToast("리뷰가 삭제되었어요.");
    },
    onError: (error) => {
      errorToast("리뷰 삭제에 실패했어요.");
      console.error(error);
    },
  });

  const menuOptions = isMyReview ? MY_ITEM_OPTIONS : OTHER_ITEM_OPTIONS;
  const buttonDisabled = isRemoveReviewPending;

  const onClickMenu = async (value: string) => {
    if (value === "edit") {
      navigate(`/consult/write?reviewId=${reviewId}`);
    }

    if (value === "delete") {
      await removeReview(reviewId);
    }

    setIsOpen(false);
  };

  const onMouseEnter = (value: string) => {
    if (value === "edit") {
      queryClient.prefetchQuery({
        queryKey: [REVIEW.REVIEW_DETAIL, reviewId.toString()],
        queryFn: () => getReviewById(reviewId.toString()),
        staleTime: 1000 * 60,
      });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>
      <div
        className={cn(
          "font-body1-normal-regular border-cool-neutral-97 shadow-input absolute top-full right-0 mt-2 flex w-[140px] flex-col rounded-[12px] border bg-white p-2",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {menuOptions.map((option) =>
          // 신고 버튼 클릭시 신고 바텀시트 노출
          option.value === "report" ? (
            <ReviewReport
              key={option.value}
              reviewId={reviewId}
              onMenuClose={() => setIsOpen(false)}
            />
          ) : (
            <button
              key={option.value}
              className="active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start disabled:opacity-50"
              onClick={() => onClickMenu(option.value)}
              onMouseEnter={() => onMouseEnter(option.value)}
              disabled={buttonDisabled}
            >
              {option.label}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewItemMenu;
