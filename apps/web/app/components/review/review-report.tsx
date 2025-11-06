import { useState } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Label,
  Radio,
  RadioGroup,
  Textarea,
  useDrawer,
} from "@gyeongmaetalk/ui";

import { REVIEW } from "~/constants";
import { useReportReview } from "~/lib/tanstack/mutation/review";
import { errorToast, successToast } from "~/utils/toast";

interface ReviewReportProps {
  reviewId: number;
  onMenuClose: () => void;
}

const REPORT_OPTIONS = [
  {
    label: "욕설 및 비방",
    value: "ABUSE",
  },
  {
    label: "허위/광고성 게시물",
    value: "ADVERTISEMENT",
  },
  {
    label: "개인정보 노출",
    value: "PERSONAL_INFO",
  },
  {
    label: "기타",
    value: "ETC",
  },
];

function ReviewReportContent({ reviewId, onMenuClose }: ReviewReportProps) {
  const [selectedValue, setSelectedValue] = useState(REPORT_OPTIONS[0].value);
  const [showTextarea, setShowTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const { close } = useDrawer();

  // 리뷰 신고 Mutation
  const { mutateAsync: reportReview, isPending: isReportReviewPending } = useReportReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEW.REVIEWS] });
      successToast("리뷰가 신고되었어요.");
      onMenuClose();
      close();
    },
    onError: (error) => {
      errorToast("리뷰 신고에 실패했어요.");
      console.error(error);
    },
  });

  const submitDisabled =
    !selectedValue || (showTextarea && textareaValue.length === 0) || isReportReviewPending;

  const onSelectOption = (value: string) => {
    setSelectedValue(value);

    if (value === "ETC") {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
    }
  };

  const onSubmit = async () => {
    const body = { reasonType: selectedValue };
    if (showTextarea) {
      Object.assign(body, { reasonDetail: textareaValue });
    }

    await reportReview({ reviewId, body });
  };

  return (
    <DrawerContent className="typo-semibold flex flex-col">
      <div className="flex flex-col space-y-4">
        <RadioGroup value={selectedValue} onValueChange={onSelectOption} className="space-y-1">
          {REPORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex gap-2">
              <Radio
                disabled={isReportReviewPending}
                value={option.value}
                size="default"
                id={option.value}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
          {showTextarea && (
            <Textarea
              maxLength={100}
              id="textarea"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="메세지를 입력해주세요"
            />
          )}
        </RadioGroup>
        <Button
          variant="default"
          theme="default"
          className="w-full"
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          신고하기
        </Button>
      </div>
    </DrawerContent>
  );
}

export default function ReviewReport({ reviewId, onMenuClose }: ReviewReportProps) {
  return (
    <Drawer>
      <DrawerTrigger className="active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start disabled:opacity-50">
        신고
      </DrawerTrigger>
      <ReviewReportContent reviewId={reviewId} onMenuClose={onMenuClose} />
    </Drawer>
  );
}
