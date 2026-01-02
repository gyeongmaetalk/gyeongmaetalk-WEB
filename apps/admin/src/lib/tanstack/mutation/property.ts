import type {
  ChangePropertyStatusRequest,
  ChangeSubscriptionStatusRequest,
} from "@/models/payment";
import type { AddPropertyRequest, UpdatePropertyRequest } from "@/models/property";
import {
  addProperty,
  changePropertyStatus,
  changeSubscriptionStatus,
  deleteProperty,
  updateProperty,
} from "@/service/property";
import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import type { UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import { useMutation } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

export const useUpdateProperty = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, UpdatePropertyRequest>
) => {
  return useMutation({
    mutationFn: updateProperty,
    ...options,
  });
};

export const useDeleteProperty = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, string>
) => {
  return useMutation({
    mutationFn: deleteProperty,
    ...options,
  });
};

export const useAddProperty = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, AddPropertyRequest>
) => {
  return useMutation({
    mutationFn: addProperty,
    ...options,
  });
};

export const useChangeSubscriptionStatus = (
  options?: UseMutationOptions<void, HTTPError, ChangeSubscriptionStatusRequest>
) => {
  return useMutation({
    mutationFn: changeSubscriptionStatus,
    ...options,
  });
};

export const useChangePropertyStatus = (
  options?: UseMutationOptions<void, HTTPError, ChangePropertyStatusRequest>
) => {
  return useMutation({
    mutationFn: changePropertyStatus,
    ...options,
  });
};
