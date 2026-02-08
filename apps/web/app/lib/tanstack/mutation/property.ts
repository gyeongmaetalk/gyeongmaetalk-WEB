import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { RequestBidResponse } from "~/models/property";
import { requestBid, requestPurchase, requestSubscribe } from "~/services/property";

export const useRequestSubscribe = (options?: UseMutationOptions<void, HTTPError, number>) => {
  return useMutation({
    mutationFn: requestSubscribe,
    ...options,
  });
};

export const useRequestPurchase = (options?: UseMutationOptions<void, HTTPError, number>) => {
  return useMutation({
    mutationFn: requestPurchase,
    ...options,
  });
};

export const useRequestBid = (
  options?: UseMutationOptions<BaseResponse<RequestBidResponse>, HTTPError, string>
) => {
  return useMutation({
    mutationFn: requestBid,
    ...options,
  });
};
