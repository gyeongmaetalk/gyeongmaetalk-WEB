import type { PaginationResponse } from "@gyeongmaetalk/types";

export const calculatePagination = (lastPage: PaginationResponse<unknown>) => {
  if (lastPage.result.isLast) return undefined;
  return lastPage.result.page + 1;
};
