import { api } from "@/lib/ky";
import type {
  PaymentListRequest,
  PaymentListResponse,
  RefundPaymentRequest,
} from "@/models/payment";
import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

export const getPaymentList = async (
  props: PaymentListRequest
): Promise<PaginationResponse<PaymentListResponse>> => {
  return api.get("payments/list", { searchParams: { ...props, size: "10" } }).json();
};

export const refundPayment = async (props: RefundPaymentRequest): Promise<BaseResponse<void>> => {
  return api.post("/payments/refund", { json: props }).json();
};
