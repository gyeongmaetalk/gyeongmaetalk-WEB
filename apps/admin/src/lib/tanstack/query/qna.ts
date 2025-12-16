import { QNA } from "@/constants/qna";
import { getQnaList } from "@/service/qna";
import { useInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePaigination } from "@gyeongmaetalk/utils";

export const useGetQnaList = () => {
  return useInfiniteQuery({
    queryKey: [QNA.LIST],
    queryFn: ({ pageParam = 0 }) => getQnaList({ page: pageParam }),
    getNextPageParam: calculatePaigination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.qnas),
  });
};
