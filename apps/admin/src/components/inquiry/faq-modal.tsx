"use client";

import { useEffect, useState } from "react";

import type { FaqListItem } from "@/types/qna";
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
  Textfield,
} from "@gyeongmaetalk/ui";

interface FaqModalProps {
  faq: FaqListItem | null;
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
}

export default function FaqModal({ faq, isOpen, isEditMode, onClose }: FaqModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onSaveFaq = async () => {
    if (!question.trim() || !answer.trim()) {
      return;
    }

    if (isEditMode) {
      // TODO: FAQ 수정 API 호출
      return;
    }
    // TODO: FAQ 추가 API 호출
  };

  useEffect(() => {
    if (isOpen) {
      setQuestion(faq?.question || "");
      setAnswer(faq?.answer || "");
    }
  }, [isOpen, faq]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "FAQ 수정" : "FAQ 추가"}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto p-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              질문
            </label>
            <Textfield
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              답변
            </label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력하세요"
              rows={8}
            />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onSaveFaq} disabled={!question.trim() || !answer.trim()}>
            {isEditMode ? "수정" : "추가"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
