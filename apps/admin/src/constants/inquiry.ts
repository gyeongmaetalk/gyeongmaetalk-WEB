export enum InquiryStatus {
  PENDING = "PENDING",
  ANSWERED = "ANSWERED",
}

export const INQUIRY_STATUS_LABEL = {
  [InquiryStatus.PENDING]: {
    label: "답변 전",
    wrap: "bg-orange-95 text-orange-30 border-orange-90 ring-orange-90",
    dot: "bg-orange-50",
  },
  [InquiryStatus.ANSWERED]: {
    label: "답변 후",
    wrap: "bg-blue-95 text-blue-30 border-blue-90 ring-blue-90",
    dot: "bg-blue-50",
  },
};

