import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type {
  PropertyDetailResponse,
  PropertyListResponse,
  RequestBidResponse,
} from "~/models/property";

export const getPropertyList = async (
  page: number,
  isPurchased: string | null
): Promise<PaginationResponse<PropertyListResponse>> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: "10",
  });
  if (isPurchased) {
    searchParams.set("isPurchased", isPurchased);
  }
  return api.get("properties/list", { searchParams }).json();
};

export const getPropertyDetail = async (
  id: string
): Promise<BaseResponse<PropertyDetailResponse>> => {
  return api.get(`properties/${id}`).json();
};

// 경매 대행 서비스 구독 결제 요청
export const requestSubscribe = async (counselorId: number): Promise<void> => {
  return api.post(`properties/${counselorId}/subscribe`).json();
};

// 추천 매물 구매 결제 요청
export const requestPurchase = async (propertyId: number): Promise<void> => {
  return api.post(`properties/${propertyId}/prepare`).json();
};

// 입찰 요청
export const requestBid = async (propertyId: string): Promise<BaseResponse<RequestBidResponse>> => {
  return api.post(`properties/${propertyId}/purchases`).json();
};
