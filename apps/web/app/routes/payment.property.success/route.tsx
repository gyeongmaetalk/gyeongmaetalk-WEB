import PageLayout from "~/components/layout/page-layout";

import PropertyPaymentSuccessPage from "./page";

export function meta() {
  return [
    { title: "경매톡 - 결제 확인 중..." },
    { name: "description", content: "경매톡 - 결제 확인 중..." },
  ];
}

export default function PropertyPaymentSuccessLayout() {
  return (
    <PageLayout>
      <PropertyPaymentSuccessPage />
    </PageLayout>
  );
}
