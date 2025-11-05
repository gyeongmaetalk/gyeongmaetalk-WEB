import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type {
  ConfirmPaymentResponse,
  ConfirmPurchaseRequest,
  ConfirmSubscriptionRequest,
  PropertyDetailResponse,
  PropertyListResponse,
  ReadyPurchaseResponse,
  ReadySubscribeResponse,
  RequestBidResponse,
} from "~/models/property";

export const getPropertyList = async (
  page: number,
  status: string | null
): Promise<PaginationResponse<PropertyListResponse>> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: "10",
  });
  if (status) {
    searchParams.set("status", status);
  }
  return api.get("properties/list", { searchParams }).json();
};

export const getPropertyDetail = async (
  id: string
): Promise<BaseResponse<PropertyDetailResponse>> => {
  return api.get(`properties/${id}`).json();
};

export const readySubscribe = async (
  counselorId: number
): Promise<BaseResponse<ReadySubscribeResponse>> => {
  return api.post(`properties/${counselorId}/subscribe`).json();
};

export const confirmSubscription = async (
  props: ConfirmSubscriptionRequest
): Promise<BaseResponse<ConfirmPaymentResponse>> => {
  const { subscriptionId, ...restProps } = props;
  return api.post(`properties/subscribe/${subscriptionId}/confirm`, { json: restProps }).json();
};

// 추천 매물 구매하기 준비
export const readyPurchase = async (
  propertyId: number
): Promise<BaseResponse<ReadyPurchaseResponse>> => {
  return api.post(`properties/${propertyId}/prepare`).json();
};

// 추천 매물 구매 확인 요청
export const confirmPurchase = async (
  props: ConfirmPurchaseRequest
): Promise<BaseResponse<ConfirmPaymentResponse>> => {
  const { propertyId, ...restProps } = props;
  return api.post(`properties/${propertyId}/confirm`, { json: restProps }).json();
};

// 입찰 요청
export const requestBid = async (propertyId: string): Promise<BaseResponse<RequestBidResponse>> => {
  return api.post(`properties/${propertyId}/purchase`).json();
};
