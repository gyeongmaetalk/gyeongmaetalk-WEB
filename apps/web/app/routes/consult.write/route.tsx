import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Spinner } from "@gyeongmaetalk/ui";

import { Navigate } from "react-router";

import { reviewKeys } from "~/lib/tanstack/keys/review";
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
    queryKey: reviewKeys.getReviewById(reviewId),
    queryFn: () => getReviewById(reviewId),
    staleTime: 1000 * 60,
  });
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Spinner className="mx-auto size-10" />
    </main>
  );
}

export default function ConsultWriteReviewLayout({ loaderData }: Route.ComponentProps) {
  if (loaderData && !loaderData.result.mine) {
    return <Navigate to="/consult/reviews" replace />;
  }

  return <ConsultWriteReviewPage review={loaderData?.result ?? null} />;
}
