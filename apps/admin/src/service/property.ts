import { api } from "@/lib/ky";
import type {
  AddPropertyRequest,
  PropertyDetailResponse,
  PropertyListResponse,
  UpdatePropertyRequest,
} from "@/models/property";
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

export const updateProperty = async (props: UpdatePropertyRequest): Promise<BaseResponse<void>> => {
  return api.patch(`properties/${props.propertyId}`, { json: props.body }).json();
};

export const deleteProperty = async (propertyId: string): Promise<BaseResponse<void>> => {
  return api.delete(`properties/${propertyId}`).json();
};

export const addProperty = async (body: AddPropertyRequest): Promise<BaseResponse<void>> => {
  return api.post("properties", { json: body }).json();
};
