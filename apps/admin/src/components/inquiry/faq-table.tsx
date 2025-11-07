"use client";

import { useState } from "react";

import { mockFaqs } from "@/mock/faqs";
import type { Faq } from "@/types";
import { Button } from "@gyeongmaetalk/ui";

import FaqModal from "./faq-modal";

// 추후 tanstack query로 교체
const isLoading = false;

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

export default function FaqTable() {
  const [faqs, setFaqs] = useState(mockFaqs);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onOpenAddModal = () => {
    setSelectedFaq(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const onOpenEditModal = (faq: Faq) => {
    setSelectedFaq(faq);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFaq(null);
    setIsEditMode(false);
  };

  const onDeleteFaq = async (faqId: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    // TODO: API 호출
    setFaqs(faqs.filter((f) => f.faqId !== faqId));
  };

  const onSaveFaq = async (faq: Omit<Faq, "faqId" | "createdAtIso" | "updatedAtIso">) => {
    if (isEditMode && selectedFaq) {
      // TODO: API 호출
      setFaqs(
        faqs.map((f) =>
          f.faqId === selectedFaq.faqId
            ? {
                ...f,
                ...faq,
                updatedAtIso: new Date().toISOString(),
              }
            : f
        )
      );
    } else {
      // TODO: API 호출
      const newFaq: Faq = {
        ...faq,
        faqId: `faq-${Date.now()}`,
        createdAtIso: new Date().toISOString(),
        updatedAtIso: new Date().toISOString(),
      };
      setFaqs([...faqs, newFaq]);
    }
    onCloseModal();
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">FAQ 목록</h3>
          <Button onClick={onOpenAddModal} aria-label="FAQ 추가" size="sm">
            추가
          </Button>
        </div>
        <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="bg-muted px-4 py-3">질문</th>
                <th className="bg-muted px-4 py-3">답변</th>
                <th className="bg-muted px-4 py-3">생성 일시</th>
                <th className="bg-muted px-4 py-3">수정 일시</th>
                <th className="bg-muted px-4 py-3">작업</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="text-muted-foreground px-4 py-10 text-center">
                    로딩 중...
                  </td>
                </tr>
              )}
              {!isLoading && faqs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-muted-foreground px-4 py-10 text-center">
                    등록된 FAQ가 없습니다.
                  </td>
                </tr>
              )}
              {!isLoading &&
                faqs.map((faq) => (
                  <tr key={faq.faqId} className="border-t-cool-neutral-95 border-t">
                    <td className="px-4 py-3">{faq.question}</td>
                    <td className="px-4 py-3">
                      <div className="max-w-md truncate" title={faq.answer}>
                        {faq.answer}
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatDate(faq.createdAtIso)}</td>
                    <td className="px-4 py-3">{formatDate(faq.updatedAtIso)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outlined"
                          aria-label="수정"
                          onClick={() => onOpenEditModal(faq)}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="outlined"
                          aria-label="삭제"
                          onClick={() => onDeleteFaq(faq.faqId)}
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <FaqModal
        faq={selectedFaq}
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        onClose={onCloseModal}
        onSave={onSaveFaq}
      />
    </>
  );
}
