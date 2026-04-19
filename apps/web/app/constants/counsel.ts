export enum CounselStatus {
  NONE = "NONE",
  COUNSEL_AFTER = "COUNSEL_AFTER",
  COUNSEL_BEFORE = "COUNSEL_BEFORE",
  SUBSCRIBE = "SUBSCRIBE",
}

export const CANCEL_APPLY_CONSULT_EXIT_INTENT = {
  CONSULTATION: "consultation",
  RESERVATION: "reservation",
} as const;

export type CancelApplyConsultExitIntentType =
  (typeof CANCEL_APPLY_CONSULT_EXIT_INTENT)[keyof typeof CANCEL_APPLY_CONSULT_EXIT_INTENT];
