import type { PaymentStatus, PaymentType } from "@/constants/payment";
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

export interface ChangeSubscriptionStatusRequest {
  subscriptionId: number;
  memberId: number;
  status: PaymentStatus;
}

export interface ChangePropertyStatusRequest {
  propertyId: number;
  memberId: number;
  status: PaymentStatus;
}
