import { useState } from "react";

import { PaymentStatus, PaymentType } from "@/constants/payment";
import { useGetPaymentList } from "@/lib/tanstack/query/payment";
import { Button } from "@gyeongmaetalk/ui";

import ChangePaymentStatusModal from "./change-payment-status-modal";
import PaymentStatusChip from "./payment-status-chip";
import type { PaymentFilterValue } from "./payment-table";

interface PaymentListProps {
  filters: PaymentFilterValue;
}

export interface ChangePaymentStatusModalState {
  isOpen: boolean;
  id: number;
  paymentStatus: PaymentStatus;
}

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

export default function PaymentList({ filters }: PaymentListProps) {
  const { data: payments } = useGetPaymentList(filters);
  const [changePaymentStatusModalState, setChangePaymentStatusModalState] =
    useState<ChangePaymentStatusModalState>({
      isOpen: false,
      id: 0,
      paymentStatus: PaymentStatus.READY,
    });

  const isPropertyPaymentType = filters.paymentType === PaymentType.PROPERTY;

  const onChangePaymentStatus = (id: number, paymentStatus: PaymentStatus) => {
    setChangePaymentStatusModalState({
      isOpen: true,
      id,
      paymentStatus,
    });
  };

  const onChangePaymentStatusModalClose = () => {
    setChangePaymentStatusModalState({
      isOpen: false,
      id: 0,
      paymentStatus: PaymentStatus.READY,
    });
  };

  return (
    <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3">결제 상태</th>
            <th className="px-4 py-3">결제 일시</th>
            <th className="px-4 py-3">유저 이름</th>
            <th className="px-4 py-3">유저 전화번호</th>
            <th className="px-4 py-3">작업</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-muted-foreground py-5 text-center">
                결제 내역이 없습니다.
              </td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.id} className="border-t-cool-neutral-95 border-t">
                <td className="px-4 py-3">
                  <PaymentStatusChip status={p.paymentStatus} />
                </td>
                <td className="px-4 py-3">{formatDate(p.payDate)}</td>
                <td className="px-4 py-3">{p.userName}</td>
                <td className="px-4 py-3">{p.cellPhone}</td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outlined"
                    aria-label="상태 변경"
                    onClick={() => onChangePaymentStatus(p.id, p.paymentStatus)}
                  >
                    상태 변경
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {changePaymentStatusModalState.isOpen && (
        <ChangePaymentStatusModal
          changePaymentStatusModalState={changePaymentStatusModalState}
          isPropertyPaymentType={isPropertyPaymentType}
          onClose={onChangePaymentStatusModalClose}
        />
      )}
    </div>
  );
}
