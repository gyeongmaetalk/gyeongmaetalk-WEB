import type { FaqListItem, QnaListItem } from "@/types/qna";

export interface QnaListResponse {
  qnas: QnaListItem[];
}

export type FaqListResponse = FaqListItem[];

export interface AnswerQnaRequest {
  qnaId: number;
  content: string;
}
