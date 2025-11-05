import { WithLeftTitleHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";

import AgencyRecommendPage from "./page";

export function meta() {
  return [
    { title: "경매대행 - 추천 매물" },
    { name: "description", content: "경매대행 - 추천 매물" },
  ];
}

export default function AgencyRecommendLayout() {
  return (
    <PageLayout header={<WithLeftTitleHeader title="추천 매물" />} showNav>
      <AgencyRecommendPage />
    </PageLayout>
  );
}
