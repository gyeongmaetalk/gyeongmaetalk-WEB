import { api, baseApi } from "@/lib/ky";
import type { AnswerQnaRequest, QnaListResponse } from "@/models/qna";
import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

export const getQnaList = async ({
  page,
}: {
  page: number;
}): Promise<PaginationResponse<QnaListResponse>> => {
  return api.get("qna/list", { searchParams: { page, size: "10" } }).json();
};

export const answerQna = async ({
  qnaId,
  content,
}: AnswerQnaRequest): Promise<BaseResponse<void>> => {
  return baseApi.post(`qna/${qnaId}/answer`, { searchParams: { content } }).json();
};
