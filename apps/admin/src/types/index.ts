import type { InquiryStatus } from "@/constants/inquiry";

export type ReservationId = string;
export type PaymentId = string;
export type InquiryId = string;
export type FaqId = string;
export type PropertyId = string;

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

export interface PropertyScheduleInfo {
  round: number;
  date: string;
  price: number;
  result: string;
}

export interface Property {
  propertyId: PropertyId;
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
  scheduleInfos: PropertyScheduleInfo[];
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
