import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useInfiniteQuery, useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { PROPERTY } from "~/constants";
import type { PropertyDetailResponse } from "~/models/property";
import { getPropertyDetail, getPropertyList } from "~/services/property";
import { calculatePaigination } from "~/utils/api";

export const useGetPropertyList = (status: string | null) => {
  return useInfiniteQuery({
    queryKey: [PROPERTY.PROPERTY_LIST, status],
    queryFn: ({ pageParam = 0 }) => getPropertyList(pageParam, status),
    getNextPageParam: calculatePaigination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.properties),
  });
};

export const useGetPropertyDetail = (id: string) => {
  return useQuery<BaseResponse<PropertyDetailResponse>, HTTPError, PropertyDetailResponse>({
    queryKey: [PROPERTY.PROPERTY_DETAIL, id],
    queryFn: () => getPropertyDetail(id),
    select: (data) => data.result,
  });
};
