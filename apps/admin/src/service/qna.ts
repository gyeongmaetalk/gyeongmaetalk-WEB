import { api, baseApi } from "@/lib/ky";
import type { AnswerQnaRequest, FaqListResponse, QnaListResponse } from "@/models/qna";
import type { QnaStatus } from "@/types/qna";
import type { BaseResponse, PaginationResponse } from "@gyeongmaetalk/types";

export const getQnaList = async (props: {
  page: string;
  statuses: QnaStatus[];
  startDate: string;
  endDate: string;
}): Promise<PaginationResponse<QnaListResponse>> => {
  const { statuses, ...restProps } = props;
  const searchParams = new URLSearchParams({
    ...restProps,
    size: "10",
  });
  statuses.forEach((status) => {
    searchParams.append("statuses", status);
  });
  return api.get("qna/list", { searchParams }).json();
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
