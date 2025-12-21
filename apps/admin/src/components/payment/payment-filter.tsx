"use client";

import { PAYMENT_TYPE_LABEL, PaymentType } from "@/constants/payment";
import { Button, Textfield } from "@gyeongmaetalk/ui";

import type { PaymentFilterValue } from "./payment-table";

interface PaymentFilterProps {
  value: PaymentFilterValue;
  onChange: (next: PaymentFilterValue) => void;
}

const today = new Date().toISOString().split("T")[0];

const TYPES = [PaymentType.SUBSCRIPTION, PaymentType.PROPERTY];

export default function PaymentFilter({ value, onChange }: PaymentFilterProps) {
  const onSelectType = (type: PaymentType) => {
    if (type === value.paymentType) return;
    onChange({ ...value, paymentType: type });
  };

  const onResetFilters = () => {
    onChange({ paymentType: PaymentType.SUBSCRIPTION, startDate: today, endDate: today });
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
              variant={value.paymentType === t ? "default" : "outlined"}
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
