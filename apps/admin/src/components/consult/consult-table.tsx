"use client";

import { useMemo, useState } from "react";

import { COUNSEL_STATUS_LABEL, CounselStatus } from "@/constants/counsel";
import { mockReservations } from "@/mock/bookings";
import type { Reservation } from "@/types";
import { cn } from "@gyeongmaetalk/utils";

import ConsultFilter, { type ConsultFilterValue } from "./consult-filter";
import ConsultStatusChip from "./consult-status-chip";

const STATUS = [CounselStatus.COUNSEL_BEFORE, CounselStatus.COUNSEL_AFTER, CounselStatus.SUBSCRIBE];

// 추후 tanstack quert로 교체
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
          {STATUS.map((status) => (
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
        <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3">고객</th>
                <th className="px-4 py-3">상담일시</th>
                <th className="px-4 py-3">신청일시</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">목적</th>
                <th className="px-4 py-3">관심 지역</th>
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
              {!isLoading && filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center">
                    표시할 상담이 없습니다.
                  </td>
                </tr>
              )}
              {!isLoading &&
                filteredReservations.map((r) => (
                  <tr key={r.reservationId} className="border-t-cool-neutral-95 border-t">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{r.customerName}</span>
                        <span className="text-muted-foreground text-xs">{r.customerPhone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatDate(r.scheduledAtIso)}</td>
                    <td className="px-4 py-3">{formatDate(r.requestedAtIso)}</td>
                    <td className="px-4 py-3">
                      <ConsultStatusChip status={r.status} />
                    </td>
                    <td className="px-4 py-3">{r.auctionPurpose}</td>
                    <td className="truncate px-4 py-3" title={r.interestRegions.join(", ")}>
                      {r.interestRegions.join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
