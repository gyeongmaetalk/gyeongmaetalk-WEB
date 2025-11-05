import type { BaseResponse } from "@gyeongmaetalk/types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { HTTPError } from "ky";

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
