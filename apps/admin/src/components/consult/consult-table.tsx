"use client";

import { useMemo, useState } from "react";

import { COUNSEL_STATUS_LABEL, CounselStatus } from "@/constants/counsel";
import { mockReservations } from "@/mock/bookings";
import type { Reservation } from "@/types";
import { Accordion } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import ConsultFilter, { type ConsultFilterValue } from "./consult-filter";
import ConsultStatusChip from "./consult-status-chip";

const statuses = [
  CounselStatus.COUNSEL_BEFORE,
  CounselStatus.COUNSEL_AFTER,
  CounselStatus.SUBSCRIBE,
];

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

export default function ConsultTable() {
  const [filters, setFilters] = useState<ConsultFilterValue>({
    statuses: [],
    startDate: undefined,
    endDate: undefined,
  });

  const filteredReservations = useMemo(() => {
    const inStatus = (r: Reservation) =>
      filters.statuses.length === 0 || filters.statuses.includes(r.status);
    const inDate = (r: Reservation) => {
      if (!filters.startDate && !filters.endDate) return true;
      const d = new Date(r.scheduledAtIso);
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
    return mockReservations.filter((r) => inStatus(r) && inDate(r));
  }, [filters]);

  return (
    <div className="space-y-4">
      <ConsultFilter value={filters} onChange={setFilters} />
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
              <span className="font-caption2-bold text-sm">
                {COUNSEL_STATUS_LABEL[status].label}
              </span>
            </div>
          ))}
        </div>
        <div className="border-cool-neutral-95 w-full overflow-x-auto rounded-md border text-left text-sm">
          <ul className="bg-muted grid grid-cols-4">
            <li className="px-4 py-3">고객</li>
            <li className="px-4 py-3">상담일시</li>
            <li className="px-4 py-3">신청일시</li>
            <li className="px-4 py-3">상태</li>
          </ul>
          <div>
            {filteredReservations.map((r) => (
              <Accordion key={r.reservationId} className="w-full">
                <Accordion.Header
                  iconClassName="absolute right-4 top-1/2 -translate-y-1/2"
                  className="border-t-cool-neutral-95 w-full border-t"
                >
                  <ul className="grid w-full grid-cols-4 items-center text-start">
                    <li className="truncate px-4 py-3">
                      <span className="block">{r.customerName}</span>
                      <span className="text-muted-foreground block text-xs">{r.customerPhone}</span>
                    </li>
                    <li className="truncate px-4 py-3">{formatDate(r.scheduledAtIso)}</li>
                    <li className="truncate px-4 py-3">{formatDate(r.requestedAtIso)}</li>
                    <li className="px-4 py-3">
                      <ConsultStatusChip status={r.status} />
                    </li>
                  </ul>
                </Accordion.Header>
                <Accordion.Content>
                  <div className="grid grid-cols-6 gap-5 overflow-x-auto px-5 text-sm">
                    <div className="space-y-2">
                      <p className="truncate font-medium">상담사</p>
                      <div>
                        <p>이정훈</p>
                        <p className="text-muted-foreground truncate text-xs">010-1234-5678</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium">목적</p>
                      <p className="truncate">{r.auctionPurpose}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium">지역</p>
                      <p className="truncate">{r.interestRegions}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium">희망 서비스</p>
                      <p className="truncate">전체 대행</p>
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium">궁금한 분야</p>
                      <p className="truncate">아파트 경매 등</p>
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium">명의</p>
                      <p className="truncate">개인</p>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
