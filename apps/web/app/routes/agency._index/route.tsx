import { WithLeftTitleHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import AgencyPage from "./page";

export function meta() {
  return [{ title: "경매대행" }, { name: "description", content: "경매대행" }];
}

export default function AgencyLayout() {
  return (
    <PageLayout header={<WithLeftTitleHeader title="경매대행" />} showNav>
      <AgencyPage />
    </PageLayout>
  );
}
