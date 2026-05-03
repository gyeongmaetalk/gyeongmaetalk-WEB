import type { Platform } from "~/types/platform";

export interface PaymentConfirmRequest {
  orderId: number;
  provider: Platform;
  storeProductId: string;
  providerVerificationData: string;
}

export interface PaymentConfirmResponse {
  orderId: number;
  orderNumber: string;
  paymentNumber: string;
  productId: number;
  productName: string;
  orderStatus: string;
  paymentStatus: string;
  approvedAmount: number;
  approvedAt: string;
}
