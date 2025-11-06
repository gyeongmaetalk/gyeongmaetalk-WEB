import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { RequestQnaRequest } from "~/models/qna";
import { requestQna } from "~/services/qna";

export const useRequestQna = (
  options?: UseMutationOptions<BaseResponse<unknown>, HTTPError, RequestQnaRequest>
) => {
  return useMutation({
    mutationFn: requestQna,
    ...options,
  });
};
