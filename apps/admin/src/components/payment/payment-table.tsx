"use client";

import { useMemo, useState } from "react";

import { PAYMENT_METHOD_LABEL, PAYMENT_STATUS_LABEL, PaymentStatus } from "@/constants/payment";
import { mockPayments } from "@/mock/payments";
import type { Payment } from "@/types";
import { cn } from "@gyeongmaetalk/utils";

import PaymentFilter, { type PaymentFilterValue } from "./payment-filter";

const STATUS = [PaymentStatus.READY, PaymentStatus.SUCCESS, PaymentStatus.FAIL];

// 추후 tanstack query로 교체
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

function formatAmount(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

export default function PaymentTable() {
  const [filters, setFilters] = useState<PaymentFilterValue>({
    type: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  const filteredPayments = useMemo(() => {
    const inType = (p: Payment) => !filters.type || filters.type === p.type;
    const inDate = (p: Payment) => {
      if (!filters.startDate && !filters.endDate) return true;
      const d = new Date(p.paidAtIso);
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
    return mockPayments.filter((p) => inType(p) && inDate(p));
  }, [filters]);

  return (
    <div className="space-y-4">
      <PaymentFilter value={filters} onChange={setFilters} />
      <div className="space-y-2 text-nowrap" aria-label="결제 테이블">
        <div className="flex items-center gap-2">
          {STATUS.map((status) => (
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
        <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3">결제 일시</th>
                <th className="px-4 py-3">결제 금액</th>
                <th className="px-4 py-3">결제 ID</th>
                <th className="px-4 py-3">유저 이름</th>
                <th className="px-4 py-3">유저 전화번호</th>
                <th className="px-4 py-3">결제 방법</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-muted-foreground px-4 py-10 text-center">
                    로딩 중...
                  </td>
                </tr>
              )}
              {!isLoading && filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-muted-foreground px-4 py-10 text-center">
                    표시할 결제가 없습니다.
                  </td>
                </tr>
              )}
              {!isLoading &&
                filteredPayments.map((p) => (
                  <tr key={p.paymentId} className="border-t-cool-neutral-95 border-t">
                    <td className="px-4 py-3">{formatDate(p.paidAtIso)}</td>
                    <td className="px-4 py-3">{formatAmount(p.amount)}</td>
                    <td className="px-4 py-3">{p.paymentId}</td>
                    <td className="px-4 py-3">{p.userName}</td>
                    <td className="px-4 py-3">{p.userPhone}</td>
                    <td className="px-4 py-3">{PAYMENT_METHOD_LABEL[p.paymentMethod]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
