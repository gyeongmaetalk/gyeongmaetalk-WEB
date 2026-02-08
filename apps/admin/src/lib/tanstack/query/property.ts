import { PROPERTY } from "@/constants/property";
import { getPropertyDetail, getPropertyList } from "@/service/property";
import { useQuery, useSuspenseInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePagination } from "@gyeongmaetalk/utils";

export const useGetPropertyList = (memberId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: [PROPERTY.LIST, memberId],
    queryFn: ({ pageParam = 0 }) => getPropertyList({ page: pageParam, memberId }),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.properties),
  });
};

export const useGetPropertyDetail = (propertyId: string) => {
  const isNew = propertyId === "new";

  return useQuery({
    queryKey: [PROPERTY.DETAIL, propertyId],
    queryFn: () => getPropertyDetail(propertyId),
    select: (data) => data.result,
    enabled: !isNew,
  });
};
