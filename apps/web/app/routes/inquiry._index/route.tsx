import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import InquiryPage from "./page";

export function meta() {
  return [{ title: "1:1 문의" }, { name: "description", content: "1:1 문의" }];
}

export default function InquiryLayout() {
  return (
    <PageLayout header={<WithBackHeader title="1:1 문의" />}>
      <InquiryPage />
    </PageLayout>
  );
}
