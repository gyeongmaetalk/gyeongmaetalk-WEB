"use client";

import { useState } from "react";

import type { Reservation } from "@/types";

import StatusChip from "./status-chip";

type SortKey = "scheduledAtIso" | "requestedAtIso" | "status" | "customerName";
type SortDirection = "asc" | "desc";

interface BookingTableProps {
  data: Reservation[];
}

export default function BookingTable({ data }: BookingTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("scheduledAtIso");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading] = useState<boolean>(false);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sorted = (() => {
    const copy = [...data];
    copy.sort((a, b) => {
      let av: string = "";
      let bv: string = "";
      if (sortKey === "customerName") {
        av = a.customerName;
        bv = b.customerName;
      } else if (sortKey === "status") {
        av = a.status;
        bv = b.status;
      } else if (sortKey === "scheduledAtIso") {
        av = a.scheduledAtIso;
        bv = b.scheduledAtIso;
      } else {
        av = a.requestedAtIso;
        bv = b.requestedAtIso;
      }
      if (av < bv) return sortDirection === "asc" ? -1 : 1;
      if (av > bv) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  })();

  return (
    <div className="w-full text-nowrap" aria-label="예약 테이블">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <ThButton
                label="고객"
                ariaLabel="고객 기준 정렬"
                active={sortKey === "customerName"}
                direction={sortDirection}
                onClick={() => toggleSort("customerName")}
              />
              <ThButton
                label="예약일시"
                ariaLabel="예약일시 기준 정렬"
                active={sortKey === "scheduledAtIso"}
                direction={sortDirection}
                onClick={() => toggleSort("scheduledAtIso")}
              />
              <ThButton
                label="신청일시"
                ariaLabel="신청일시 기준 정렬"
                active={sortKey === "requestedAtIso"}
                direction={sortDirection}
                onClick={() => toggleSort("requestedAtIso")}
              />
              <ThButton
                label="상태"
                ariaLabel="상태 기준 정렬"
                active={sortKey === "status"}
                direction={sortDirection}
                onClick={() => toggleSort("status")}
              />
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
            {!isLoading && sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center">
                  표시할 예약이 없습니다.
                </td>
              </tr>
            )}
            {!isLoading &&
              sorted.map((r) => (
                <tr key={r.reservationId} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{r.customerName}</span>
                      <span className="text-muted-foreground text-xs">{r.customerPhone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{new Date(r.scheduledAtIso).toLocaleString()}</td>
                  <td className="px-4 py-3">{new Date(r.requestedAtIso).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StatusChip status={r.status} />
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
  );
}

interface ThButtonProps {
  label: string;
  ariaLabel: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
}

function ThButton({ label, ariaLabel, active, direction, onClick }: ThButtonProps) {
  return (
    <th
      className="px-4 py-3"
      aria-sort={active ? (direction === "asc" ? "ascending" : "descending") : undefined}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        className={
          "text-foreground/90 hover:text-foreground inline-flex items-center gap-1 text-sm"
        }
        onClick={onClick}
      >
        {label}
        {active && <span className="text-xs">{direction === "asc" ? "▲" : "▼"}</span>}
      </button>
    </th>
  );
}
