import type { InquiryFilterValue } from "@/components/inquiry/inquiry-table";
import { QNA } from "@/constants/qna";
import { getFaqList, getQnaList } from "@/service/qna";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePaigination } from "@gyeongmaetalk/utils";

export const useGetQnaList = (filters: InquiryFilterValue) => {
  return useSuspenseInfiniteQuery({
    queryKey: [QNA.LIST, filters.status, filters.startDate, filters.endDate],
    queryFn: ({ pageParam = 0 }) => getQnaList({ page: pageParam.toString(), ...filters }),
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
