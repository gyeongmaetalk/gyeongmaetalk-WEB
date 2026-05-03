import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type { RequestOrderRequest, RequestOrderResponse } from "~/models/order";

export const requestOrder = async (
  props: RequestOrderRequest
): Promise<BaseResponse<RequestOrderResponse>> => {
  return api.post("orders", { json: props }).json();
};
