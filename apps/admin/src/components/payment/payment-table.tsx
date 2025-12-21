"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { PaymentType } from "@/constants/payment";
import { PAYMENT_STATUS_LABEL, PaymentStatus } from "@/constants/payment";
import { Spinner } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import PaymentFilter from "./payment-filter";

const PaymentList = dynamic(() => import("./payment-list"), {
  ssr: false,
  loading: () => <Spinner className="mx-auto my-5" />,
});

export interface PaymentFilterValue {
  paymentType: PaymentType;
  startDate: string;
  endDate: string;
}

const statuses = [PaymentStatus.READY, PaymentStatus.SUCCESS, PaymentStatus.FAIL];

const today = new Date().toISOString().split("T")[0];

export default function PaymentTable() {
  const [filters, setFilters] = useState<PaymentFilterValue>({
    paymentType: PaymentType.SUBSCRIPTION,
    startDate: today,
    endDate: today,
  });

  return (
    <div className="space-y-4">
      <PaymentFilter value={filters} onChange={setFilters} />
      <div className="space-y-2 text-nowrap" aria-label="결제 테이블">
        <div className="flex items-center gap-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border p-1 ring-1",
                  PAYMENT_STATUS_LABEL[status].wrap
                )}
              >
                <div
                  className={cn("size-2.5 rounded-full", PAYMENT_STATUS_LABEL[status].dot)}
                  aria-hidden="true"
                />
              </div>
              <span className="font-caption2-bold text-sm">
                {PAYMENT_STATUS_LABEL[status].label}
              </span>
            </div>
          ))}
        </div>
        <PaymentList filters={filters} />
      </div>
    </div>
  );
}
