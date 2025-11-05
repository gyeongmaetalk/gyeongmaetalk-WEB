import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type { FaqResponse, QnaResponse, RequestQnaRequest } from "~/models/qna";

export const getMyQna = async (): Promise<BaseResponse<QnaResponse>> => {
  return api.get("qna/my").json();
};

export const requestQna = async (props: RequestQnaRequest): Promise<BaseResponse<unknown>> => {
  return api.post("qna", { json: props }).json();
};

export const getFaq = async (): Promise<BaseResponse<FaqResponse>> => {
  return api.get("qna/faq").json();
};
