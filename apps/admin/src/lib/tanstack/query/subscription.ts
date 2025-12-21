import { SUBSCRIPTION } from "@/constants/subscription";
import { getSubscriptionList } from "@/service/subscription";
import { useSuspenseInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePaigination } from "@gyeongmaetalk/utils";

export const useGetSubscriptionList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [SUBSCRIPTION.LIST],
    queryFn: ({ pageParam = 0 }) => getSubscriptionList(pageParam),
    getNextPageParam: calculatePaigination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.subscriptions),
  });
};
