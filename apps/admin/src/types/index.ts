import type { CounselStatus } from "@/constants/counsel";

export type ReservationId = string;

export type ReservationStatus = "pending" | "approved" | "rejected" | "completed";

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "대기",
  approved: "승인",
  rejected: "거절",
  completed: "완료",
};

export interface Reservation {
  reservationId: ReservationId;
  status: CounselStatus;
  customerName: string;
  customerPhone: string;
  requestedAtIso: string;
  scheduledAtIso: string;
  auctionPurpose: "거주" | "투자" | "법인투자" | "기타";
  interestRegions: string[];
  serviceScopes: ("사전권리분석" | "입찰대행" | "낙찰후등기" | "명도지원" | "세무상담연계")[];
  interestTopics: ("권리분석" | "배당/세금" | "대출/자금" | "명도" | "법인전략" | "기타")[];
  ownershipPlan: "개인" | "공동" | "법인";
  isSoleProprietorPlanned: boolean;
  additionalNote?: string;
}
