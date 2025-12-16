"use client";

import { useEffect, useState } from "react";

import { QNA } from "@/constants/qna";
import { useAnswerQna } from "@/lib/tanstack/mutation/qna";
import type { QnaListItem } from "@/types/qna";
import { errorToast, successToast } from "@/utils/toast";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
} from "@gyeongmaetalk/ui";

interface InquiryAnswerModalProps {
  inquiry: QnaListItem | null;
  isOpen: boolean;
  onClose: () => void;
}
// 답변하는 API 안되는거 확인하기
function formatDate(date: string) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function InquiryAnswerModal({ inquiry, isOpen, onClose }: InquiryAnswerModalProps) {
  const [answer, setAnswer] = useState("");

  const { mutate: answerQna, isPending: isSubmitting } = useAnswerQna({
    onSuccess: () => {
      successToast("답변이 저장되었어요.");
      queryClient.invalidateQueries({ queryKey: [QNA.LIST] });
      onClose();
    },
    onError: (error) => {
      errorToast("질문 답변에 실패했어요.");
      console.error(error);
    },
  });

  useEffect(() => {
    if (inquiry) {
      setAnswer(inquiry.answerContent || "");
    }
  }, [inquiry]);

  if (!inquiry) {
    return null;
  }

  const onSaveAnswer = () => {
    answerQna({ qnaId: inquiry.id, content: answer });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>문의 답변</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">유저 정보</div>
            <div className="text-muted-foreground text-sm">
              <div>이름: {inquiry.name}</div>
              <div>전화번호: {inquiry.cellPhone}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">제목</div>
            <div className="text-sm">{inquiry.qnaTitle}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">내용</div>
            <div className="text-sm whitespace-pre-wrap">{inquiry.qnaContent}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">문의 일시</div>
            <div className="text-muted-foreground text-sm">{formatDate(inquiry.createdAt)}</div>
          </div>

          {inquiry.qnaStatus === "ANSWERED" && inquiry.answerTime && (
            <div className="space-y-2">
              <div className="text-sm font-medium">답변 일시</div>
              <div className="text-muted-foreground text-sm">{formatDate(inquiry.answerTime)}</div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              답변 내용
            </label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변 내용을 입력하세요"
              rows={8}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={onSaveAnswer} disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
