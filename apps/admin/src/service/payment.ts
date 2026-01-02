import { api } from "@/lib/ky";
import type { PaymentListRequest, PaymentListResponse } from "@/models/payment";
import type { PaginationResponse } from "@gyeongmaetalk/types";

export const getPaymentList = async (
  props: PaymentListRequest
): Promise<PaginationResponse<PaymentListResponse>> => {
  return api.get("payments/list", { searchParams: { ...props, size: "10" } }).json();
};
