import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type { PaymentConfirmRequest, PaymentConfirmResponse } from "~/models/payment";

export const confirmPayment = async (
  props: PaymentConfirmRequest
): Promise<BaseResponse<PaymentConfirmResponse>> => {
  return api.post("payments/confirm", { json: props }).json();
};
