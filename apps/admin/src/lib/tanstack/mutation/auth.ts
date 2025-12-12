import type { LoginRequest } from "@/models/auth";
import { login } from "@/service/auth";
import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import type { UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import { useMutation } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

export const useLogin = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, LoginRequest>
) => {
  return useMutation<BaseResponse<void>, HTTPError, LoginRequest>({
    mutationFn: login,
    ...options,
  });
};
