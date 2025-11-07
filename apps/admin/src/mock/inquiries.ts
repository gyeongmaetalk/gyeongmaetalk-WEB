import { InquiryStatus } from "@/constants/inquiry";
import type { Inquiry } from "@/types";

const date = new Date("2025-11-06T10:00:00.000Z");
const now = date.getTime();

export const mockInquiries: Inquiry[] = [
  {
    inquiryId: "inq-001",
    userName: "김철수",
    userPhone: "010-1234-5678",
    title: "경매 진행 절차가 궁금합니다",
    content: "경매 진행 절차와 필요한 서류에 대해 알고 싶습니다.",
    status: InquiryStatus.PENDING,
    createdAtIso: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    inquiryId: "inq-002",
    userName: "이영희",
    userPhone: "010-2222-3333",
    title: "입찰 보증금 반환 시기",
    content: "입찰 보증금은 언제 반환되나요?",
    status: InquiryStatus.ANSWERED,
    createdAtIso: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
    answerContent: "입찰 보증금은 경매 낙찰 후 일정 기간 내에 반환됩니다. 구체적인 일정은 담당자에게 문의해주세요.",
    answeredAtIso: new Date(now - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    inquiryId: "inq-003",
    userName: "박민수",
    userPhone: "010-4444-5555",
    title: "법인 투자 가능 여부",
    content: "법인으로 경매에 참여할 수 있나요?",
    status: InquiryStatus.PENDING,
    createdAtIso: new Date(now - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    inquiryId: "inq-004",
    userName: "최지영",
    userPhone: "010-6666-7777",
    title: "세금 관련 문의",
    content: "경매 취득 후 세금은 얼마나 부과되나요?",
    status: InquiryStatus.ANSWERED,
    createdAtIso: new Date(now - 1000 * 60 * 60 * 72).toISOString(),
    answerContent: "경매 취득 시 취득세, 등록세 등이 부과됩니다. 구체적인 금액은 취득 가액과 부동산 종류에 따라 다릅니다.",
    answeredAtIso: new Date(now - 1000 * 60 * 60 * 60).toISOString(),
  },
];

