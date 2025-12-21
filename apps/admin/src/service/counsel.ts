import type { CounselStatus } from "@/constants/counsel";
import { api } from "@/lib/ky";
import type { CounselListResponse } from "@/models/counsel";
import type { PaginationResponse } from "@gyeongmaetalk/types";

export const getCounselList = async (props: {
  page: string;
  statuses: CounselStatus[];
  startDate: string;
  endDate: string;
}): Promise<PaginationResponse<CounselListResponse>> => {
  const { statuses, ...restProps } = props;
  const searchParams = new URLSearchParams({
    ...restProps,
    size: "10",
  });
  statuses.forEach((status) => {
    searchParams.append("statuses", status);
  });
  return api.get("counsels/list", { searchParams }).json();
};
