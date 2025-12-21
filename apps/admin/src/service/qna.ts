import { api, baseApi } from "@/lib/ky";
import type { AnswerQnaRequest, FaqListResponse, QnaListResponse } from "@/models/qna";
import type { QnaStatus } from "@/types/qna";
import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

export const getQnaList = async (props: {
  page: string;
  status: QnaStatus;
  startDate: string;
  endDate: string;
}): Promise<PaginationResponse<QnaListResponse>> => {
  return api.get("qna/list", { searchParams: { ...props, size: "10" } }).json();
};

export const answerQna = async ({
  qnaId,
  content,
}: AnswerQnaRequest): Promise<BaseResponse<void>> => {
  return baseApi.post(`qna/${qnaId}/answer`, { searchParams: { content } }).json();
};

export const getFaqList = async (): Promise<BaseResponse<FaqListResponse>> => {
  return baseApi.get("qna/faq").json();
};
