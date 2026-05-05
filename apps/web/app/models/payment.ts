export interface PaymentConfirmRequest {
  orderId: number;
  productIdentifier: string;
  transactionIdentifier: string;
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
