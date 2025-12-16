import type { AnswerQnaRequest } from "@/models/qna";
import { answerQna } from "@/service/qna";
import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import type { UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import { useMutation } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

export const useAnswerQna = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, AnswerQnaRequest>
) => {
  return useMutation<BaseResponse<void>, HTTPError, AnswerQnaRequest>({
    mutationFn: answerQna,
    ...options,
  });
};
