import type { FaqListItem, QnaListItem } from "~/types/qna";

export type QnaResponse = QnaListItem[];

export interface RequestQnaRequest {
  title: string;
  content: string;
}

export type FaqResponse = FaqListItem[];
