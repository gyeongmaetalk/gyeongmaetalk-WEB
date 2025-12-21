export type QnaCategory = "PAYMENT" | "ETC";
export type QnaStatus = "PENDING" | "ANSWERED";

export interface QnaListItem {
  id: number;
  name: string;
  cellPhone: string;
  category: QnaCategory;
  qnaTitle: string;
  qnaContent: string;
  createdAt: string;
  qnaStatus: QnaStatus;
  answerContent: string;
  answerTime: string;
}

export interface FaqListItem {
  id: number;
  question: string;
  answer: string;
}
