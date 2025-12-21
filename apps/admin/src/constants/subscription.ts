export enum SubscriptionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  CANCELED = "CANCELED",
}

export const SUBSCRIPTION_STATUS_LABEL = {
  [SubscriptionStatus.PENDING]: {
    label: "결제 대기",
    wrap: "bg-orange-95 text-orange-30 border-orange-90 ring-orange-90",
    dot: "bg-orange-50",
  },
  [SubscriptionStatus.IN_PROGRESS]: {
    label: "구독중",
    wrap: "bg-green-95 text-green-30 border-green-90 ring-green-90",
    dot: "bg-green-50",
  },
  [SubscriptionStatus.COMPLETED]: {
    label: "완료됨",
    wrap: "bg-blue-95 text-blue-30 border-blue-90 ring-blue-90",
    dot: "bg-blue-50",
  },
  [SubscriptionStatus.PAYMENT_FAILED]: {
    label: "결제 실패",
    wrap: "bg-cool-neutral-95 text-cool-neutral-30 border-cool-neutral-90 ring-cool-neutral-90",
    dot: "bg-cool-neutral-50",
  },
  [SubscriptionStatus.CANCELED]: {
    label: "취소됨",
    wrap: "bg-red-95 text-red-30 border-red-90 ring-red-90",
    dot: "bg-red-50",
  },
};

export const SUBSCRIPTION = {
  LIST: "subscription-list",
};
