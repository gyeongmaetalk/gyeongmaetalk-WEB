import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import PrivacyPolicyPage from "./page";

export function meta() {
  return [{ title: "개인정보 처리방침" }, { name: "description", content: "개인정보 처리방침" }];
}

const PrivacyPolicyLayout = () => {
  return (
    <PageLayout header={<WithBackHeader title="개인정보 처리방침" />}>
      <PrivacyPolicyPage />
    </PageLayout>
  );
};

export default PrivacyPolicyLayout;
