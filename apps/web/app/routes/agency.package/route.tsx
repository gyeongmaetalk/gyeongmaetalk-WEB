import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import AgencyPackagePage from "./page";

export function meta() {
  return [{ title: "경매대행 - 패키지" }, { name: "description", content: "경매대행 - 패키지" }];
}
export default function AgencyPackageLayout() {
  return (
    <PageLayout header={<WithBackHeader title="경매대행 패키지" />} showNav>
      <AgencyPackagePage />
    </PageLayout>
  );
}
