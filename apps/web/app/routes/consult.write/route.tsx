import { Loader2 } from "lucide-react";
import { Navigate } from "react-router";

import { REVIEW } from "~/constants";
import { queryClient } from "~/lib/tanstack";
import { getReviewById } from "~/services/review";

import type { Route } from "./+types/route";
import ConsultWriteReviewPage from "./page";

export const meta = () => {
  return [{ title: "상담후기 작성" }, { name: "description", content: "상담후기 작성" }];
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const reviewId = url.searchParams.get("reviewId");
  if (!reviewId) {
    return null;
  }

  return queryClient.fetchQuery({
    queryKey: [REVIEW.REVIEW_DETAIL, reviewId],
    queryFn: () => getReviewById(reviewId),
    staleTime: 1000 * 60,
  });
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
    </main>
  );
}

export default function ConsultWriteReviewLayout({ loaderData }: Route.ComponentProps) {
  if (loaderData && !loaderData.result.mine) {
    return <Navigate to="/consult/reviews" replace />;
  }

  return <ConsultWriteReviewPage review={loaderData?.result ?? null} />;
}
