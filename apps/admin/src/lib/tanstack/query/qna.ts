import { QNA } from "@/constants/qna";
import { getFaqList, getQnaList } from "@/service/qna";
import { useInfiniteQuery, useSuspenseQuery } from "@gyeongmaetalk/lib/tanstack";
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

export const useGetFaqList = () => {
  return useSuspenseQuery({
    queryKey: [QNA.FAQ],
    queryFn: getFaqList,
    select: (data) => data.result,
  });
};
