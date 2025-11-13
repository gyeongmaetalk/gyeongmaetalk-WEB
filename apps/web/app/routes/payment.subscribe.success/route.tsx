import PageLayout from "~/components/layout/page-layout";

import SubscribePaymentSuccessPage from "./page";

export function meta() {
  return [
    { title: "경매톡 - 결제 확인 중..." },
    { name: "description", content: "경매톡 - 결제 확인 중..." },
  ];
}

export default function SubscribePaymentSuccessLayout() {
  return (
    <PageLayout>
      <SubscribePaymentSuccessPage />
    </PageLayout>
  );
}

