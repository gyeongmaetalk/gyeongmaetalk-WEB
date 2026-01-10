import { api } from "@/lib/ky";
import type {
  ChangePropertyStatusRequest,
  ChangeSubscriptionStatusRequest,
} from "@/models/payment";
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

export const addProperty = async (props: AddPropertyRequest): Promise<BaseResponse<void>> => {
  return api.post("properties", { json: props }).json();
};

export const changeSubscriptionStatus = async (
  props: ChangeSubscriptionStatusRequest
): Promise<void> => {
  const searchParams = new URLSearchParams({
    status: props.status,
  });
  return api
    .patch(`properties/subscription/${props.subscriptionId}/status`, { searchParams })
    .json();
};

export const changePropertyStatus = async (props: ChangePropertyStatusRequest): Promise<void> => {
  const searchParams = new URLSearchParams({
    status: props.status,
  });
  return api.patch(`properties/${props.propertyId}/status`, { searchParams }).json();
};
