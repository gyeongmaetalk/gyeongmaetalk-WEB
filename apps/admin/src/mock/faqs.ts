import type { Faq } from "@/types";

const date = new Date("2025-11-06T10:00:00.000Z");
const now = date.getTime();

export const mockFaqs: Faq[] = [
  {
    faqId: "faq-001",
    question: "경매 진행 절차는 어떻게 되나요?",
    answer: "경매 진행 절차는 권리분석, 입찰대행, 낙찰후등기 등의 단계로 진행됩니다. 각 단계별 상세 내용은 담당자에게 문의해주세요.",
    createdAtIso: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updatedAtIso: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    faqId: "faq-002",
    question: "입찰 보증금은 얼마인가요?",
    answer: "입찰 보증금은 경매 가격의 10%입니다. 낙찰 후 일정 기간 내에 반환됩니다.",
    createdAtIso: new Date(now - 1000 * 60 * 60 * 24 * 25).toISOString(),
    updatedAtIso: new Date(now - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    faqId: "faq-003",
    question: "법인 투자가 가능한가요?",
    answer: "네, 법인 투자도 가능합니다. 법인 투자 시 추가 서류가 필요할 수 있으니 사전에 상담받으시기 바랍니다.",
    createdAtIso: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
    updatedAtIso: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
];

