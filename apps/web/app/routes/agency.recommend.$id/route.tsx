import AgencyRecommendDetailPage from "./page";

export function meta() {
  return [
    { title: "경매대행 - 추천 매물 상세" },
    { name: "description", content: "경매대행 - 추천 매물 상세" },
  ];
}

export default function AgencyRecommendDetailLayout() {
  return <AgencyRecommendDetailPage />;
}
