import type { QnaListItem } from "@/types/qna";

export interface QnaListResponse {
  qnas: QnaListItem[];
}

export interface AnswerQnaRequest {
  qnaId: number;
  content: string;
}
