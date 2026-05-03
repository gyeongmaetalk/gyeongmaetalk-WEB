import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { PaymentConfirmRequest, PaymentConfirmResponse } from "~/models/payment";
import { confirmPayment } from "~/services/payment";

export const useConfirmPayment = (
  options?: UseMutationOptions<
    BaseResponse<PaymentConfirmResponse>,
    HTTPError,
    PaymentConfirmRequest
  >
) => {
  return useMutation({
    mutationFn: confirmPayment,
    ...options,
  });
};
