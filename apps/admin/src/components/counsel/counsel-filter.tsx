"use client";

import { CounselStatus } from "@/constants/counsel";
import { Button, Textfield } from "@gyeongmaetalk/ui";

export interface CounselFilterValue {
  statuses: CounselStatus[];
  startDate: string;
  endDate: string;
}

interface CounselFilterProps {
  value: CounselFilterValue;
  onChange: (next: CounselFilterValue) => void;
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

const today = new Date().toISOString().split("T")[0];

const statuses = [
  CounselStatus.COUNSEL_BEFORE,
  CounselStatus.COUNSEL_AFTER,
  CounselStatus.SUBSCRIBE,
];

export default function CounselFilter({ value, onChange }: CounselFilterProps) {
  const onSelectStatus = (status: CounselStatus) => {
    const has = value.statuses.includes(status);
    const nextStatuses = has
      ? value.statuses.length > 1
        ? value.statuses.filter((s) => s !== status)
        : value.statuses
      : [...value.statuses, status];
    onChange({ ...value, statuses: nextStatuses });
  };

  const onResetFilters = () => {
    onChange({ statuses, startDate: today, endDate: today });
  };

  return (
    <section
      aria-label="상담 필터"
      className="border-cool-neutral-95 flex flex-wrap items-end gap-4 rounded-md border p-4"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">상태</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <Button
              key={s}
              aria-label={`상태 ${getLabel(s)}`}
              size="md"
              variant={value.statuses.includes(s) ? "default" : "outlined"}
              onClick={() => onSelectStatus(s)}
            >
              {getLabel(s)}
            </Button>
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
            className="text-xs"
          />
          <span className="text-muted-foreground text-sm">~</span>
          <Textfield
            id="end-date"
            aria-label="종료 날짜"
            type="date"
            max={today}
            value={value.endDate ?? ""}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
            className="text-xs"
          />
        </div>
      </div>
      <Button size="sm" variant="outlined" aria-label="필터 초기화" onClick={onResetFilters}>
        초기화
      </Button>
    </section>
  );
}
