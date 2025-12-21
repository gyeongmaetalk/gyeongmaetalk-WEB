import { api } from "@/lib/ky";
import type { SubscriptionListResponse } from "@/models/subscription";
import type { PaginationResponse } from "@gyeongmaetalk/types";

export const getSubscriptionList = async (
  page: number
): Promise<PaginationResponse<SubscriptionListResponse>> => {
  return api.get("subscriptions/list", { searchParams: { page, size: "10" } }).json();
};
