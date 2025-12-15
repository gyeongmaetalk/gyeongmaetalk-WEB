export type QnaStatus = "PENDING" | "ANSWERED";

export type QnaCategory = "PAYMENT" | "ETC";

export interface QnaListItem {
  category: QnaCategory;
  qnaTitle: string;
  qnaContent: string;
  qnaStatus: QnaStatus;
  createdAt: string;
  answerContent: string;
  answerTime: string;
}

export interface FaqListItem {
  question: string;
  answer: string;
}
