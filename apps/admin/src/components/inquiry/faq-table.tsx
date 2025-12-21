"use client";

import { lazy, useState } from "react";

import { useGetFaqList } from "@/lib/tanstack/query/qna";
import type { FaqListItem } from "@/types/qna";
import { Button } from "@gyeongmaetalk/ui";

const FaqModal = lazy(() => import("./faq-modal"));

export default function FaqTable() {
  const { data: faqs } = useGetFaqList();

  const [selectedFaq, setSelectedFaq] = useState<FaqListItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onOpenAddModal = () => {
    setSelectedFaq(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const onOpenEditModal = (faq: FaqListItem) => {
    setSelectedFaq(faq);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFaq(null);
    setIsEditMode(false);
  };

  const onDeleteFaq = async (faqId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      // TODO: 삭제 API 호출
      return;
    }
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
                <th className="bg-muted px-4 py-3">작업</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-muted-foreground py-5 text-center">
                    등록된 FAQ가 없습니다.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="border-t-cool-neutral-95 border-t">
                    <td className="px-4 py-3">{faq.question}</td>
                    <td className="px-4 py-3">
                      <div className="max-w-md truncate" title={faq.answer}>
                        {faq.answer}
                      </div>
                    </td>
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
                          onClick={() => onDeleteFaq(faq.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FaqModal
        faq={selectedFaq}
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        onClose={onCloseModal}
      />
    </>
  );
}
