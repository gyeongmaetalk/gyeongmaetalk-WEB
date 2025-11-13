import PageLayout from "~/components/layout/page-layout";

import SubscribePaymentFailPage from "./page";

export function meta() {
  return [
    { title: "경매톡 - 결제 실패" },
    { name: "description", content: "경매톡 - 결제 실패" },
  ];
}

export default function SubscribePaymentFailLayout() {
  return (
    <PageLayout>
      <SubscribePaymentFailPage />
    </PageLayout>
  );
}

