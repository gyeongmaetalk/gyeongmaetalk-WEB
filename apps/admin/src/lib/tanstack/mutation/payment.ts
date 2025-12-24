import type { RefundPaymentRequest } from "@/models/payment";
import { refundPayment } from "@/service/payment";
import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import type { UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import { useMutation } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

export const useRefundPayment = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, RefundPaymentRequest>
) => {
  return useMutation({
    mutationFn: refundPayment,
    ...options,
  });
};
