import type { CounselStatus } from "@/constants/counsel";
import { COUNSEL } from "@/constants/counsel";
import { getCounselList } from "@/service/counsel";
import { useSuspenseInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePagination } from "@gyeongmaetalk/utils";

export const useGetCounselList = (props: {
  statuses: CounselStatus[];
  startDate: string;
  endDate: string;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: [COUNSEL.LIST, props.statuses, props.startDate, props.endDate],
    queryFn: ({ pageParam = 0 }) => getCounselList({ page: pageParam.toString(), ...props }),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.counsels),
  });
};
