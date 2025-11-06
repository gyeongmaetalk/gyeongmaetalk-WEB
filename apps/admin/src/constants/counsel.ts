export enum CounselStatus {
  NONE = "NONE",
  COUNSEL_AFTER = "COUNSEL_AFTER",
  COUNSEL_BEFORE = "COUNSEL_BEFORE",
  SUBSCRIBE = "SUBSCRIBE",
}

export const COUNSEL_STATUS_LABEL = {
  [CounselStatus.COUNSEL_BEFORE]: {
    label: "상담 전",
    wrap: "bg-orange-95 text-orange-30 border-orange-90 ring-orange-90",
    dot: "bg-orange-50",
  },
  [CounselStatus.COUNSEL_AFTER]: {
    label: "상담 후",
    wrap: "bg-green-95 text-green-30 border-green-90 ring-green-90",
    dot: "bg-green-50",
  },
  [CounselStatus.SUBSCRIBE]: {
    label: "경매 진행 중",
    wrap: "bg-blue-95 text-blue-30 border-blue-90 ring-blue-90",
    dot: "bg-blue-50",
  },
  [CounselStatus.NONE]: {
    label: "상담 미예약",
    wrap: "bg-red-95 text-red-30 border-red-90 ring-red-90",
    dot: "bg-red-50",
  },
};
