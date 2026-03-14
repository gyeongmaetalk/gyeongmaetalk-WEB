import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useInfiniteQuery, useQuery, useSuspenseQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";
import { calculatePagination } from "@gyeongmaetalk/utils";

import type { SortType } from "~/constants";
import { reviewKeys } from "~/lib/tanstack/keys/review";
import type { ReviewDetailResponse } from "~/models/review";
import { getConsultantReviews, getMyReviews, getReviewById, getReviews } from "~/services/review";

export const useGetConsultantReviews = ({
  consultantId,
  type,
}: {
  consultantId: string;
  type: SortType;
}) => {
  return useInfiniteQuery({
    queryKey: reviewKeys.getConsultantReviews(consultantId, type),
    queryFn: ({ pageParam = 0 }) =>
      getConsultantReviews({ consultantId, type, page: pageParam.toString() }),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => {
      return {
        consultantReviews: data.pages.flatMap((page) => page.result.reviews),
        counselorInfo: data.pages[0].result.counselorInfo,
      };
    },
  });
};

export const useGetReviewPreview = (type: SortType, size: string) => {
  return useSuspenseQuery({
    queryKey: reviewKeys.getReviews(type, size),
    queryFn: () => getReviews({ type, page: "0", size }),
    select: (data) => data.result.reviews,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetReviews = (type: SortType, size: string = "10") => {
  return useInfiniteQuery({
    queryKey: reviewKeys.getReviews(type, size),
    queryFn: ({ pageParam = 0 }) => getReviews({ type, page: pageParam.toString(), size }),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.reviews),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetReviewById = (reviewId: string | null) => {
  return useQuery<BaseResponse<ReviewDetailResponse>, HTTPError, ReviewDetailResponse>({
    queryKey: reviewKeys.getReviewById(reviewId),
    queryFn: () => getReviewById(reviewId as string),
    select: (data) => data.result,
    enabled: !!reviewId,
    staleTime: 1000 * 60,
  });
};

export const useGetMyReviews = () => {
  return useInfiniteQuery({
    queryKey: reviewKeys.getMyReviews(),
    queryFn: ({ pageParam = 0 }) => getMyReviews(pageParam),
    getNextPageParam: calculatePagination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.reviews),
  });
};
