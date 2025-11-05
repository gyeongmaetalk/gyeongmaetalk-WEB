import ConsultReviewsPage from "./page";

export function meta() {
  return [{ title: "상담후기" }, { name: "description", content: "상담후기" }];
}

export default function ConsultReviewsLayout() {
  return <ConsultReviewsPage />;
}
