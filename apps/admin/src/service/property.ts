import { api } from "@/lib/ky";
import type { PropertyDetailResponse, PropertyListResponse } from "@/models/property";
import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

export const getPropertyList = async (props: {
  page: number;
  memberId: number;
}): Promise<PaginationResponse<PropertyListResponse>> => {
  return api.get("properties/list", { searchParams: { ...props, size: "10" } }).json();
};

export const getPropertyDetail = async (
  propertyId: string
): Promise<BaseResponse<PropertyDetailResponse>> => {
  return api.get(`properties/${propertyId}/detail`).json();
};
