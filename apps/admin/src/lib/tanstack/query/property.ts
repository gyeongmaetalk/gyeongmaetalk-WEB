import { PROPERTY } from "@/constants/property";
import { getPropertyList } from "@/service/property";
import { useSuspenseInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePaigination } from "@gyeongmaetalk/utils";

export const useGetPropertyList = (memberId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: [PROPERTY.LIST, memberId],
    queryFn: ({ pageParam = 0 }) => getPropertyList({ page: pageParam, memberId }),
    getNextPageParam: calculatePaigination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.properties),
  });
};
