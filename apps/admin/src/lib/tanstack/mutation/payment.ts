import type { RefundPaymentRequest } from "@/models/payment";
import type { UpdatePropertyRequest } from "@/models/property";
import { refundPayment } from "@/service/payment";
import { updateProperty } from "@/service/property";
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

export const useUpdateProperty = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, UpdatePropertyRequest>
) => {
  return useMutation({
    mutationFn: updateProperty,
    ...options,
  });
};
