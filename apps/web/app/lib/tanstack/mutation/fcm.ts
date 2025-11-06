import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { readNotification } from "~/services/fcm";

export const useReadNotification = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, number>
) => {
  return useMutation<BaseResponse<void>, HTTPError, number>({
    mutationFn: readNotification,
    ...options,
  });
};
