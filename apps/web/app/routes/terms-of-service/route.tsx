import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import TermsOfServicePage from "./page";

export function meta() {
  return [{ title: "이용약관" }, { name: "description", content: "이용약관" }];
}

const TermsOfServiceLayout = () => {
  return (
    <PageLayout header={<WithBackHeader title="이용약관" />}>
      <TermsOfServicePage />
    </PageLayout>
  );
};

export default TermsOfServiceLayout;
