import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { readNotification, registerDeviceToken } from "~/services/fcm";

export const useReadNotification = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, number>
) => {
  return useMutation({
    mutationFn: readNotification,
    ...options,
  });
};

export const useRegisterDeviceToken = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, string>
) => {
  return useMutation({
    mutationFn: registerDeviceToken,
    ...options,
  });
};
