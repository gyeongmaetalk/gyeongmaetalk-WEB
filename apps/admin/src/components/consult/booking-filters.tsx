"use client";

import { CounselStatus } from "@/constants/counsel";
import { Button, Textfield } from "@gyeongmaetalk/ui";

export interface BookingFiltersValue {
  statuses: CounselStatus[];
  startDate?: string;
  endDate?: string;
}

interface BookingFiltersProps {
  value: BookingFiltersValue;
  onChange: (next: BookingFiltersValue) => void;
}

function getLabel(status: CounselStatus) {
  switch (status) {
    case CounselStatus.COUNSEL_BEFORE:
      return "상담 전";
    case CounselStatus.COUNSEL_AFTER:
      return "상담 후";
    case CounselStatus.SUBSCRIBE:
      return "경매 진행 중";
    case CounselStatus.NONE:
      return "상담 미예약";
  }
}

export default function BookingFilters({ value, onChange }: BookingFiltersProps) {
  const onToggleStatus = (status: CounselStatus) => {
    const has = value.statuses.includes(status);
    const nextStatuses = has
      ? value.statuses.filter((s) => s !== status)
      : [...value.statuses, status];
    onChange({ ...value, statuses: nextStatuses });
  };

  const onResetFilters = () => {
    onChange({ statuses: [], startDate: undefined, endDate: undefined });
  };

  return (
    <section aria-label="예약 필터" className="rounded-md border p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">필터를 선택해 예약을 좁혀보세요.</p>
        <Button size="sm" variant="outlined" aria-label="필터 초기화" onClick={onResetFilters}>
          초기화
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">상태</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(CounselStatus).map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`상태 ${getLabel(s)}`}
                className={
                  "rounded-md border px-3 py-1 text-sm " +
                  (value.statuses.includes(s) ? "bg-primary text-white" : "text-foreground")
                }
                onClick={() => onToggleStatus(s)}
              >
                {getLabel(s)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">기간</p>
          <div className="flex items-center gap-2">
            <Textfield
              id="start-date"
              aria-label="시작 날짜"
              type="date"
              value={value.startDate ?? ""}
              onChange={(e) => onChange({ ...value, startDate: e.target.value })}
            />
            <span className="text-muted-foreground text-sm">~</span>
            <Textfield
              id="end-date"
              aria-label="종료 날짜"
              type="date"
              value={value.endDate ?? ""}
              onChange={(e) => onChange({ ...value, endDate: e.target.value })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
