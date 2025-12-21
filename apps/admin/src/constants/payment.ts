export enum PaymentType {
  SUBSCRIPTION = "SUBSCRIPTION",
  PROPERTY = "PROPERTY",
}

export enum PaymentStatus {
  READY = "READY",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export const PAYMENT_TYPE_LABEL = {
  [PaymentType.SUBSCRIPTION]: "구독",
  [PaymentType.PROPERTY]: "결제",
};

export const PAYMENT_STATUS_LABEL = {
  [PaymentStatus.READY]: {
    label: "결제 대기",
    wrap: "bg-orange-95 text-orange-30 border-orange-90 ring-orange-90",
    dot: "bg-orange-50",
  },
  [PaymentStatus.SUCCESS]: {
    label: "완료됨",
    wrap: "bg-blue-95 text-blue-30 border-blue-90 ring-blue-90",
    dot: "bg-blue-50",
  },
  [PaymentStatus.FAIL]: {
    label: "결제 실패",
    wrap: "bg-red-95 text-red-30 border-red-90 ring-red-90",
    dot: "bg-red-50",
  },
};

export const PAYMENT = {
  LIST: "payment-list",
};
