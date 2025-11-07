export enum PaymentType {
  SUBSCRIPTION = "SUBSCRIPTION",
  PAYMENT = "PAYMENT",
}

export enum PaymentStatus {
  READY = "READY",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export enum PaymentMethod {
  CARD = "CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  VIRTUAL_ACCOUNT = "VIRTUAL_ACCOUNT",
  MOBILE = "MOBILE",
}

export const PAYMENT_TYPE_LABEL = {
  [PaymentType.SUBSCRIPTION]: "구독",
  [PaymentType.PAYMENT]: "결제",
};

export const PAYMENT_METHOD_LABEL = {
  [PaymentMethod.CARD]: "카드",
  [PaymentMethod.BANK_TRANSFER]: "계좌이체",
  [PaymentMethod.VIRTUAL_ACCOUNT]: "가상계좌",
  [PaymentMethod.MOBILE]: "휴대폰",
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
