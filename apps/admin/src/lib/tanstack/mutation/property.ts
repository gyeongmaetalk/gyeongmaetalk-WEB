import type { AddPropertyRequest, UpdatePropertyRequest } from "@/models/property";
import { addProperty, deleteProperty, updateProperty } from "@/service/property";
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
