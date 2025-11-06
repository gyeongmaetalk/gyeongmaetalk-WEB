import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { SignupResponse, UpdateNotificationSettingRequest } from "~/models/auth";
import type { UpdateUserInfoForm } from "~/routes/mypage.userinfo/schema";
import { updateNotificationSetting, updateUserInfo } from "~/services/auth";

export const useUpdateUserInfo = (
  options?: UseMutationOptions<BaseResponse<SignupResponse>, HTTPError, UpdateUserInfoForm>
) => {
  return useMutation<BaseResponse<SignupResponse>, HTTPError, UpdateUserInfoForm>({
    mutationFn: updateUserInfo,
    ...options,
  });
};

export const useUpdateNotificationSetting = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, UpdateNotificationSettingRequest>
) => {
  return useMutation<BaseResponse<void>, HTTPError, UpdateNotificationSettingRequest>({
    mutationFn: updateNotificationSetting,
    ...options,
  });
};
