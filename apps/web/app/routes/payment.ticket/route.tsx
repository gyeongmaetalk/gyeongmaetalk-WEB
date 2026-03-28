import { redirect } from "react-router";

import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { useUserStore } from "~/lib/zustand/user";

import PaymentTicketPage from "./page";

export function meta() {
  return [{ title: "경매대행 - 티켓" }, { name: "description", content: "경매대행 - 티켓" }];
}

export function clientLoader() {
  const isLoggedIn = useUserStore.getState().isLoggedIn;

  if (!isLoggedIn) {
    throw redirect("/");
  }
}

export default function PaymentTicketLayout() {
  return (
    <PageLayout header={<WithBackHeader title="추천 매물 열람권" />} showNav>
      <PaymentTicketPage />
    </PageLayout>
  );
}
