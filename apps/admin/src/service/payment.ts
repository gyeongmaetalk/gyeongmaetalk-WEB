import type { PaymentType } from "@/constants/payment";
import { api } from "@/lib/ky";
import type { PaymentListResponse } from "@/models/payment";
import type { PaginationResponse } from "@gyeongmaetalk/types";

export const getPaymentList = async (props: {
  page: string;
  paymentType: PaymentType;
  startDate: string;
  endDate: string;
}): Promise<PaginationResponse<PaymentListResponse>> => {
  return api.get("payments/list", { searchParams: { ...props, size: "10" } }).json();
};
