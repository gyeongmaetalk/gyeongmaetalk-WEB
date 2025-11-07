"use client";

import { INQUIRY_STATUS_LABEL, InquiryStatus } from "@/constants/inquiry";
import { Button, Textfield } from "@gyeongmaetalk/ui";

export interface InquiryFilterValue {
  status?: InquiryStatus;
  startDate?: string;
  endDate?: string;
}

interface InquiryFilterProps {
  value: InquiryFilterValue;
  onChange: (next: InquiryFilterValue) => void;
}

const maxDate = new Date().toISOString().split("T")[0];

const STATUS = [InquiryStatus.PENDING, InquiryStatus.ANSWERED];

export default function InquiryFilter({ value, onChange }: InquiryFilterProps) {
  const onSelectStatus = (status: InquiryStatus) => {
    // 이미 선택된 상태를 클릭하면 해제, 다른 상태를 클릭하면 선택
    const nextStatus = value.status === status ? undefined : status;
    onChange({ ...value, status: nextStatus });
  };

  const onResetFilters = () => {
    onChange({ status: undefined, startDate: undefined, endDate: undefined });
  };

  return (
    <section
      aria-label="문의 필터"
      className="border-cool-neutral-95 flex flex-wrap items-end gap-4 rounded-md border p-4"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">상태</p>
        <div className="flex flex-wrap gap-2">
          {STATUS.map((s) => (
            <Button
              key={s}
              aria-label={`상태 ${INQUIRY_STATUS_LABEL[s].label}`}
              size="md"
              variant={value.status === s ? "default" : "outlined"}
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
            value={value.startDate ?? ""}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
            className="text-xs"
          />
          <span className="text-muted-foreground text-sm">~</span>
          <Textfield
            id="end-date"
            aria-label="종료 날짜"
            type="date"
            max={maxDate}
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

