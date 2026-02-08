import type { SortType } from "~/constants";

export const reviewKeys = {
  all: ["review"] as const,
  getConsultantReviews: (consultantId: string, type: SortType) =>
    [...reviewKeys.all, "getConsultantReviews", consultantId, type] as const,
  getReviews: (type: SortType, size: string) =>
    [...reviewKeys.all, "getReviews", type, size] as const,
  getReviewById: (reviewId: string | null) =>
    [...reviewKeys.all, "getReviewById", reviewId] as const,
  getMyReviews: () => [...reviewKeys.all, "getMyReviews"] as const,
};
