"use client";

import { useMemo, useState } from "react";

import { INQUIRY_STATUS_LABEL, InquiryStatus } from "@/constants/inquiry";
import { mockInquiries } from "@/mock/inquiries";
import type { Inquiry } from "@/types";
import { Button } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import InquiryAnswerModal from "./inquiry-answer-modal";
import InquiryFilter, { type InquiryFilterValue } from "./inquiry-filter";
import InquiryStatusChip from "./inquiry-status-chip";

const STATUS = [InquiryStatus.PENDING, InquiryStatus.ANSWERED];

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

export default function InquiryTable() {
  const [filters, setFilters] = useState<InquiryFilterValue>({
    status: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  const filteredInquiries = useMemo(() => {
    const inStatus = (i: Inquiry) => !filters.status || filters.status === i.status;
    const inDate = (i: Inquiry) => {
      if (!filters.startDate && !filters.endDate) return true;
      const d = new Date(i.createdAtIso);
      if (filters.startDate) {
        const s = new Date(filters.startDate + "T00:00:00");
        if (d < s) return false;
      }
      if (filters.endDate) {
        const e = new Date(filters.endDate + "T23:59:59");
        if (d > e) return false;
      }
      return true;
    };
    return mockInquiries.filter((i) => inStatus(i) && inDate(i));
  }, [filters]);

  const onOpenAnswerModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsAnswerModalOpen(true);
  };

  const onCloseAnswerModal = () => {
    setIsAnswerModalOpen(false);
    setSelectedInquiry(null);
  };

  return (
    <>
      <div className="space-y-4">
        <InquiryFilter value={filters} onChange={setFilters} />
        <div className="space-y-2" aria-label="문의 테이블">
          <div className="flex items-center gap-2">
            {STATUS.map((status) => (
              <div key={status} className="flex items-center gap-1">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border p-1 ring-1",
                    INQUIRY_STATUS_LABEL[status].wrap
                  )}
                >
                  <div
                    className={cn("size-2.5 rounded-full", INQUIRY_STATUS_LABEL[status].dot)}
                    aria-hidden="true"
                  />
                </div>
                <span className="font-caption2-bold text-sm">
                  {INQUIRY_STATUS_LABEL[status].label}
                </span>
              </div>
            ))}
          </div>
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
                {isLoading && (
                  <tr>
                    <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center">
                      로딩 중...
                    </td>
                  </tr>
                )}
                {!isLoading && filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center">
                      표시할 문의가 없습니다.
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  filteredInquiries.map((i) => (
                    <tr key={i.inquiryId} className="border-t-cool-neutral-95 border-t">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{i.userName}</span>
                          <span className="text-muted-foreground text-xs">{i.userPhone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{i.title}</td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs truncate" title={i.content}>
                          {i.content}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <InquiryStatusChip status={i.status} />
                      </td>
                      <td className="px-4 py-3">{formatDate(i.createdAtIso)}</td>
                      <td className="px-4 py-3">
                        {i.answeredAtIso ? formatDate(i.answeredAtIso) : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outlined"
                          aria-label="답변하기"
                          onClick={() => onOpenAnswerModal(i)}
                        >
                          {i.status === InquiryStatus.PENDING ? "답변하기" : "답변보기"}
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedInquiry && (
        <InquiryAnswerModal
          inquiry={selectedInquiry}
          isOpen={isAnswerModalOpen}
          onClose={onCloseAnswerModal}
        />
      )}
    </>
  );
}
