import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { qnaKeys } from "~/lib/tanstack/keys/qna";
import type { FaqResponse, QnaResponse } from "~/models/qna";
import { getFaq, getMyQna } from "~/services/qna";

export const useGetMyQna = () => {
  return useQuery<BaseResponse<QnaResponse>, HTTPError, QnaResponse>({
    queryKey: qnaKeys.getMyQna(),
    queryFn: getMyQna,
    select: (data) => data.result,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetFaq = () => {
  return useQuery<BaseResponse<FaqResponse>, HTTPError, FaqResponse>({
    queryKey: qnaKeys.getFaq(),
    queryFn: getFaq,
    select: (data) => data.result,
    staleTime: 1000 * 60 * 5,
  });
};
