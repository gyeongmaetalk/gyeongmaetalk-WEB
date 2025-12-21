"use client";

import { INQUIRY_STATUS_LABEL, InquiryStatus } from "@/constants/inquiry";
import { Button, Textfield } from "@gyeongmaetalk/ui";

import type { InquiryFilterValue } from "./inquiry-table";

interface InquiryFilterProps {
  value: InquiryFilterValue;
  onChange: (next: InquiryFilterValue) => void;
}

const today = new Date().toISOString().split("T")[0];
const statuses = [InquiryStatus.PENDING, InquiryStatus.ANSWERED];

export default function InquiryFilter({ value, onChange }: InquiryFilterProps) {
  const onSelectStatus = (status: InquiryStatus) => {
    const has = value.statuses.includes(status);
    const nextStatus = has
      ? value.statuses.length > 1
        ? value.statuses.filter((s) => s !== status)
        : value.statuses
      : [...value.statuses, status];
    onChange({ ...value, statuses: nextStatus });
  };

  const onResetFilters = () => {
    onChange({
      statuses,
      startDate: today,
      endDate: today,
    });
  };

  return (
    <section
      aria-label="문의 필터"
      className="border-cool-neutral-95 flex flex-wrap items-end gap-4 rounded-md border p-4"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">상태</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <Button
              key={s}
              aria-label={`상태 ${INQUIRY_STATUS_LABEL[s].label}`}
              size="md"
              variant={value.statuses.includes(s) ? "default" : "outlined"}
              onClick={() => onSelectStatus(s)}
            >
              {INQUIRY_STATUS_LABEL[s].label}
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
            max={today}
            value={value.startDate ?? ""}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
            className="text-xs"
            onReset={() => onChange({ ...value, startDate: today })}
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
            onReset={() => onChange({ ...value, endDate: today })}
          />
        </div>
      </div>
      <Button size="sm" variant="outlined" aria-label="필터 초기화" onClick={onResetFilters}>
        초기화
      </Button>
    </section>
  );
}
