import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { ReviewReportRequest, ReviewResponse } from "~/models/review";
import { createReview, removeReview, reportReview, updateReview } from "~/services/review";

export const useCreateReview = (
  options?: UseMutationOptions<BaseResponse<ReviewResponse>, HTTPError, FormData>
) => {
  return useMutation({
    mutationFn: createReview,
    ...options,
  });
};

export const useUpdateReview = (
  options?: UseMutationOptions<
    BaseResponse<ReviewResponse>,
    HTTPError,
    { formData: FormData; reviewId: string }
  >
) => {
  return useMutation({
    mutationFn: updateReview,
    ...options,
  });
};

export const useRemoveReview = (
  options?: UseMutationOptions<BaseResponse<ReviewResponse>, HTTPError, number>
) => {
  return useMutation<BaseResponse<ReviewResponse>, HTTPError, number>({
    mutationFn: removeReview,
    ...options,
  });
};

export const useReportReview = (
  options?: UseMutationOptions<BaseResponse<ReviewResponse>, HTTPError, ReviewReportRequest>
) => {
  return useMutation<BaseResponse<ReviewResponse>, HTTPError, ReviewReportRequest>({
    mutationFn: reportReview,
    ...options,
  });
};
