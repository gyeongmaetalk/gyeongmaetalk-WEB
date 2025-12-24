import type { PaymentType } from "@/constants/payment";
import type { PaymentListItemProps } from "@/types/payment";

export interface PaymentListRequest {
  page: string;
  paymentType: PaymentType;
  startDate: string;
  endDate: string;
}

export interface PaymentListResponse {
  payments: PaymentListItemProps[];
}

export interface RefundPaymentRequest {
  paymentKey: string;
  cancelReason: string;
  cancelAmount: number;
}
