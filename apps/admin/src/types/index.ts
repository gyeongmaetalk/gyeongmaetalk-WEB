import type { CounselStatus } from "@/constants/counsel";
import type { InquiryStatus } from "@/constants/inquiry";
import type { PaymentMethod, PaymentStatus, PaymentType } from "@/constants/payment";

export type ReservationId = string;
export type PaymentId = string;
export type InquiryId = string;
export type FaqId = string;

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

export interface Payment {
  paymentId: PaymentId;
  type: PaymentType;
  status: PaymentStatus;
  amount: number;
  paidAtIso: string;
  userName: string;
  userPhone: string;
  paymentMethod: PaymentMethod;
}

export interface Inquiry {
  inquiryId: InquiryId;
  userName: string;
  userPhone: string;
  title: string;
  content: string;
  status: InquiryStatus;
  createdAtIso: string;
  answerContent?: string;
  answeredAtIso?: string;
}

export interface Faq {
  faqId: FaqId;
  question: string;
  answer: string;
  createdAtIso: string;
  updatedAtIso: string;
}
