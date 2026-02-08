import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useInfiniteQuery, useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";
import { calculatePagination } from "@gyeongmaetalk/utils";

import { propertyKeys } from "~/lib/tanstack/keys/property";
import type { PropertyDetailResponse } from "~/models/property";
import { getPropertyDetail, getPropertyList } from "~/services/property";

export const useGetPropertyList = (isPurchased: string | null) => {
  return useInfiniteQuery({
    queryKey: propertyKeys.getPropertyList(isPurchased),
    queryFn: ({ pageParam = 0 }) => getPropertyList(pageParam, isPurchased),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.properties),
  });
};

export const useGetPropertyDetail = (id: string) => {
  return useQuery<BaseResponse<PropertyDetailResponse>, HTTPError, PropertyDetailResponse>({
    queryKey: propertyKeys.getPropertyDetail(id),
    queryFn: () => getPropertyDetail(id),
    select: (data) => data.result,
  });
};
