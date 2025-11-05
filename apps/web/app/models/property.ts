import type { PropertyListItemProps } from "~/types/property";

export interface PropertyListResponse {
  properties: PropertyListItemProps[];
}

export interface PropertyDetailResponse {
  name: string;
  area: number;
  appraisedPrice: number;
  minPrice: number;
  address: string;
  caseNumber: string;
  caseTitle: string;
  courtName: string;
  registrationDate: string;
  commencementDate: string;
  status: string;
  scheduleInfos: {
    round: number;
    date: string;
    price: number;
    result: string;
  }[];
  debtor: string;
  creditor: string;
  owner: string;
  tenant: string;
  expertComment: string;
  images: string[];
  buildingType: string;
  updateDate: string;
  purchased: boolean;
}

export interface ReadySubscribeResponse {
  subscriptionId: number;
  orderId: string;
  amount: number;
  orderName: string;
}

export interface ConfirmSubscriptionRequest {
  subscriptionId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface ConfirmPaymentResponse {
  status: string;
  paymentKey: string;
  orderId: string;
  totalAmount: number;
  failureReason: string;
}

export interface ReadyPurchaseResponse {
  propertyId: number;
  orderId: string;
  amount: number;
  orderName: string;
}

export interface ConfirmPurchaseRequest {
  propertyId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface RequestBidResponse {
  id: number;
}
