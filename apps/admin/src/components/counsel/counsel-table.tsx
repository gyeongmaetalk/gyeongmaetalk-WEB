"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { COUNSEL_STATUS_LABEL, CounselStatus } from "@/constants/counsel";
import { Spinner } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import CounselFilter from "./counsel-filter";

const CounselList = dynamic(() => import("./counsel-list"), {
  ssr: false,
  loading: () => <Spinner className="mx-auto my-5" />,
});

export interface CounselFilterValue {
  statuses: CounselStatus[];
  startDate: string;
  endDate: string;
}

const statuses = [
  CounselStatus.COUNSEL_BEFORE,
  CounselStatus.COUNSEL_AFTER,
  CounselStatus.SUBSCRIBE,
];

const today = new Date().toISOString().split("T")[0];

export default function CounselTable() {
  const [filters, setFilters] = useState<CounselFilterValue>({
    statuses,
    startDate: today,
    endDate: today,
  });

  return (
    <div className="space-y-4">
      <CounselFilter value={filters} onChange={setFilters} />
      <div className="space-y-2 text-nowrap" aria-label="상담 테이블">
        <div className="flex items-center gap-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border p-1 ring-1",
                  COUNSEL_STATUS_LABEL[status].wrap
                )}
              >
                <div
                  className={cn("size-2.5 rounded-full", COUNSEL_STATUS_LABEL[status].dot)}
                  aria-hidden="true"
                />
              </div>
              <p className="font-caption2-bold text-sm">{COUNSEL_STATUS_LABEL[status].label}</p>
            </div>
          ))}
        </div>
        <div className="border-cool-neutral-95 w-full overflow-x-auto rounded-md border text-left text-sm">
          <ul className="bg-muted grid grid-cols-4 font-bold">
            <li className="px-4 py-3">고객</li>
            <li className="px-4 py-3">상담일시</li>
            <li className="px-4 py-3">신청일시</li>
            <li className="px-4 py-3">상태</li>
          </ul>
          <CounselList filters={filters} />
        </div>
      </div>
    </div>
  );
}
