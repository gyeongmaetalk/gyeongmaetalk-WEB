"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { INQUIRY_STATUS_LABEL, InquiryStatus } from "@/constants/inquiry";
import type { QnaStatus } from "@/types/qna";
import { Spinner } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import InquiryFilter from "./inquiry-filter";

const InquiryList = dynamic(() => import("./inquiry-list"), {
  ssr: false,
  loading: () => <Spinner className="mx-auto my-5" />,
});

export interface InquiryFilterValue {
  status: QnaStatus;
  startDate: string;
  endDate: string;
}

const statuses = [InquiryStatus.PENDING, InquiryStatus.ANSWERED];
const today = new Date().toISOString().split("T")[0];

export default function InquiryTable() {
  const [filters, setFilters] = useState<InquiryFilterValue>({
    status: InquiryStatus.PENDING,
    startDate: today,
    endDate: today,
  });

  return (
    <div className="space-y-4">
      <InquiryFilter value={filters} onChange={setFilters} />
      <div className="space-y-2" aria-label="문의 테이블">
        <div className="flex items-center gap-2">
          {statuses.map((status) => (
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
        <InquiryList filters={filters} />
      </div>
    </div>
  );
}
