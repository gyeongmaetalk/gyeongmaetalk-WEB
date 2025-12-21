import { useGetPaymentList } from "@/lib/tanstack/query/payment";

import type { PaymentFilterValue } from "./payment-table";

interface PaymentListProps {
  filters: PaymentFilterValue;
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

function formatAmount(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

export default function PaymentList({ filters }: PaymentListProps) {
  const { data: payments } = useGetPaymentList(filters);

  return (
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
          {payments.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-muted-foreground py-5 text-center">
                결제 내역이 없습니다.
              </td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.orderId} className="border-t-cool-neutral-95 border-t">
                <td className="px-4 py-3">{formatDate(p.payDate)}</td>
                <td className="px-4 py-3">{formatAmount(p.amount)}</td>
                <td className="px-4 py-3">{p.orderId}</td>
                <td className="px-4 py-3">{p.userName}</td>
                <td className="px-4 py-3">{p.cellPhone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
