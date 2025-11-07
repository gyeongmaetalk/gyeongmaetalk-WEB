"use client";

import { useEffect, useState } from "react";

import type { Faq } from "@/types";
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
  faq: Faq | null;
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSave: (faq: Omit<Faq, "faqId" | "createdAtIso" | "updatedAtIso">) => void;
}

export default function FaqModal({ faq, isOpen, isEditMode, onClose, onSave }: FaqModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [faq, isOpen]);

  const onSaveFaq = async () => {
    if (!question.trim() || !answer.trim()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSave({ question: question.trim(), answer: answer.trim() });
    setIsSubmitting(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "FAQ 수정" : "FAQ 추가"}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 p-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              질문
            </label>
            <Textfield
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={onSaveFaq} disabled={isSubmitting || !question.trim() || !answer.trim()}>
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
