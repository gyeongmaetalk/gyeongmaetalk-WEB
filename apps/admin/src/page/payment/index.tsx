import PaymentTable from "@/components/payment/payment-table";

export default function PaymentPage() {
  return (
    <main>
      <h1 className="text-2xl font-semibold tracking-tight">결제 대시보드</h1>
      <PaymentTable />
    </main>
  );
}
