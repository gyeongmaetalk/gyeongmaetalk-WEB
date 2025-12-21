import { api } from "@/lib/ky";
import type { PropertyListResponse } from "@/models/property";
import type { PaginationResponse } from "@gyeongmaetalk/types";

export const getPropertyList = async (props: {
  page: number;
  memberId: number;
}): Promise<PaginationResponse<PropertyListResponse>> => {
  return api.get("properties/list", { searchParams: { ...props, size: "10" } }).json();
};
