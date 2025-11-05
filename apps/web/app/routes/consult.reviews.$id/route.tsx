import { Navigate } from "react-router";

import type { Route } from "./+types/route";
import ConsultReviewsDetailPage from "./page";

export function meta() {
  return [{ title: "상담 리뷰 상세" }, { name: "description", content: "상담 리뷰 상세" }];
}

export default function ConsultReviewsDetailLayout({ params }: Route.ComponentProps) {
  const { id } = params;

  if (!id) {
    return <Navigate to="/consult/reviews" />;
  }

  return <ConsultReviewsDetailPage reviewId={id} />;
}
