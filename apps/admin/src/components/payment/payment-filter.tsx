"use client";

import { PAYMENT_TYPE_LABEL, PaymentType } from "@/constants/payment";
import { Button, Textfield } from "@gyeongmaetalk/ui";

export interface PaymentFilterValue {
  type?: PaymentType;
  startDate?: string;
  endDate?: string;
}

interface PaymentFilterProps {
  value: PaymentFilterValue;
  onChange: (next: PaymentFilterValue) => void;
}

const maxDate = new Date().toISOString().split("T")[0];

const TYPES = [PaymentType.SUBSCRIPTION, PaymentType.PAYMENT];

export default function PaymentFilter({ value, onChange }: PaymentFilterProps) {
  const onSelectType = (type: PaymentType) => {
    // 이미 선택된 타입을 클릭하면 해제, 다른 타입을 클릭하면 선택
    const nextType = value.type === type ? undefined : type;
    onChange({ ...value, type: nextType });
  };

  const onResetFilters = () => {
    onChange({ type: undefined, startDate: undefined, endDate: undefined });
  };

  return (
    <section
      aria-label="결제 필터"
      className="border-cool-neutral-95 flex flex-wrap items-end gap-4 rounded-md border p-4"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">결제 타입</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Button
              key={t}
              aria-label={`결제 타입 ${PAYMENT_TYPE_LABEL[t]}`}
              size="md"
              variant={value.type === t ? "default" : "outlined"}
              onClick={() => onSelectType(t)}
            >
              {PAYMENT_TYPE_LABEL[t]}
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
