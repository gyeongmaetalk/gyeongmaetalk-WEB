import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type {
  ConfirmPaymentResponse,
  ConfirmPurchaseRequest,
  ConfirmSubscriptionRequest,
  ReadyPurchaseResponse,
  ReadySubscribeResponse,
  RequestBidResponse,
} from "~/models/property";
import {
  confirmPurchase,
  confirmSubscription,
  readyPurchase,
  readySubscribe,
  requestBid,
} from "~/services/property";

export const useReadySubscribe = (
  options?: UseMutationOptions<BaseResponse<ReadySubscribeResponse>, HTTPError, number>
) => {
  return useMutation<BaseResponse<ReadySubscribeResponse>, HTTPError, number>({
    mutationFn: readySubscribe,
    ...options,
  });
};

export const useConfirmSubscription = (
  options?: UseMutationOptions<
    BaseResponse<ConfirmPaymentResponse>,
    HTTPError,
    ConfirmSubscriptionRequest
  >
) => {
  return useMutation<BaseResponse<ConfirmPaymentResponse>, HTTPError, ConfirmSubscriptionRequest>({
    mutationFn: confirmSubscription,
    ...options,
  });
};

export const useReadyPurchase = (
  options?: UseMutationOptions<BaseResponse<ReadyPurchaseResponse>, HTTPError, number>
) => {
  return useMutation<BaseResponse<ReadyPurchaseResponse>, HTTPError, number>({
    mutationFn: readyPurchase,
    ...options,
  });
};

export const useConfirmPurchase = (
  options?: UseMutationOptions<
    BaseResponse<ConfirmPaymentResponse>,
    HTTPError,
    ConfirmPurchaseRequest
  >
) => {
  return useMutation<BaseResponse<ConfirmPaymentResponse>, HTTPError, ConfirmPurchaseRequest>({
    mutationFn: confirmPurchase,
    ...options,
  });
};

export const useRequestBid = (
  options?: UseMutationOptions<BaseResponse<RequestBidResponse>, HTTPError, string>
) => {
  return useMutation<BaseResponse<RequestBidResponse>, HTTPError, string>({
    mutationFn: requestBid,
    ...options,
  });
};
