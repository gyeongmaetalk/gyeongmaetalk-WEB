import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { RequestOrderRequest, RequestOrderResponse } from "~/models/order";
import { requestOrder } from "~/services/order";

export const useRequestOrder = (
  options?: UseMutationOptions<BaseResponse<RequestOrderResponse>, HTTPError, RequestOrderRequest>
) => {
  return useMutation({
    mutationFn: requestOrder,
    ...options,
  });
};
