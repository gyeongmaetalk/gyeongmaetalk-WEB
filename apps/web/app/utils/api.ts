import type { PaginationResponse } from "@gyeongmaetalk/types";

export const calculatePaigination = (lastPage: PaginationResponse<unknown>) => {
  if (lastPage.result.isLast) return undefined;
  return lastPage.result.page + 1;
};
