"use client";

import { useState } from "react";

import { InquiryStatus } from "@/constants/inquiry";
import type { Inquiry } from "@/types";
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
  inquiry: Inquiry;
  isOpen: boolean;
  onClose: () => void;
}

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
  const [answer, setAnswer] = useState(inquiry.answerContent || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSaveAnswer = async () => {
    if (!answer.trim()) {
      return;
    }

    setIsSubmitting(true);
    // TODO: API 호출
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>문의 답변</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">유저 정보</div>
            <div className="text-muted-foreground text-sm">
              <div>이름: {inquiry.userName}</div>
              <div>전화번호: {inquiry.userPhone}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">제목</div>
            <div className="text-sm">{inquiry.title}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">내용</div>
            <div className="text-sm whitespace-pre-wrap">{inquiry.content}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">문의 일시</div>
            <div className="text-muted-foreground text-sm">{formatDate(inquiry.createdAtIso)}</div>
          </div>

          {inquiry.status === InquiryStatus.ANSWERED && inquiry.answeredAtIso && (
            <div className="space-y-2">
              <div className="text-sm font-medium">답변 일시</div>
              <div className="text-muted-foreground text-sm">
                {formatDate(inquiry.answeredAtIso)}
              </div>
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
          <Button onClick={onSaveAnswer} disabled={isSubmitting || !answer.trim()}>
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
