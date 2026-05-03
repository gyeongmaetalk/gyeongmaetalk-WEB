import type { Platform } from "~/types/platform";

export interface RequestOrderRequest {
  productId: number;
  paymentProvider: Platform;
  idempotencyKey: string;
  counselorId: number;
}

export interface RequestOrderResponse {
  amount: number;
  orderId: number;
  orderNumber: string;
  paymentProvider: Platform;
  productId: number;
  productName: string;
  productType: string | null;
  storeProductId: string;
}
