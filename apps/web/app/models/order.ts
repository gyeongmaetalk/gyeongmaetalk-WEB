export interface RequestOrderRequest {
  productId: number;
  idempotencyKey: string;
  counselorId: number;
}

export interface RequestOrderResponse {
  amount: number;
  orderId: number;
  orderNumber: string;
  productId: number;
  productName: string;
  storeProductId: string;
  revenueCatAppUserId: string;
}
