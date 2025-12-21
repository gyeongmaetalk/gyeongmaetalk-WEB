import { useState } from "react";

import { useGetQnaList } from "@/lib/tanstack/query/qna";
import type { QnaListItem } from "@/types/qna";
import { Button, SentinelSpinner } from "@gyeongmaetalk/ui";

import InquiryAnswerModal from "./inquiry-answer-modal";
import InquiryStatusChip from "./inquiry-status-chip";
import type { InquiryFilterValue } from "./inquiry-table";

interface InquiryListProps {
  filters: InquiryFilterValue;
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

export default function InquiryList({ filters }: InquiryListProps) {
  const {
    data: qnaList = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetQnaList(filters);

  const [selectedInquiry, setSelectedInquiry] = useState<QnaListItem | null>(null);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  const onOpenAnswerModal = (inquiry: QnaListItem) => {
    setSelectedInquiry(inquiry);
    setIsAnswerModalOpen(true);
  };

  const onCloseAnswerModal = () => {
    setIsAnswerModalOpen(false);
    setSelectedInquiry(null);
  };

  return (
    <>
      <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3">유저</th>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">내용</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">문의 일시</th>
              <th className="px-4 py-3">답변 일시</th>
              <th className="px-4 py-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {qnaList.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-muted-foreground py-5 text-center">
                  표시할 문의가 없습니다.
                </td>
              </tr>
            ) : (
              qnaList.map((i) => (
                <tr key={i.id} className="border-t-cool-neutral-95 border-t">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{i.name}</span>
                      <span className="text-muted-foreground text-xs">{i.cellPhone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{i.qnaTitle}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate" title={i.qnaContent}>
                      {i.qnaContent}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <InquiryStatusChip status={i.qnaStatus} />
                  </td>
                  <td className="px-4 py-3">{formatDate(i.createdAt)}</td>
                  <td className="px-4 py-3">{i.answerTime ? formatDate(i.answerTime) : "-"}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outlined"
                      aria-label="답변하기"
                      onClick={() => onOpenAnswerModal(i)}
                    >
                      {i.qnaStatus === "PENDING" ? "답변하기" : "답변보기"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <SentinelSpinner
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          className="my-5"
        />
      </div>
      <InquiryAnswerModal
        inquiry={selectedInquiry}
        isOpen={isAnswerModalOpen}
        onClose={onCloseAnswerModal}
      />
    </>
  );
}
