import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { mutationOptions, useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { SignupResponse, UpdateNotificationSettingRequest } from "~/models/auth";
import type { UpdateUserInfoForm } from "~/routes/mypage.userinfo/schema";
import {
  deleteUser,
  logout,
  requestReviewLoginCode,
  updateNotificationSetting,
  updateUserInfo,
} from "~/services/auth";

export const useUpdateUserInfo = (
  options?: UseMutationOptions<BaseResponse<SignupResponse>, HTTPError, UpdateUserInfoForm>
) => {
  return useMutation({
    mutationFn: updateUserInfo,
    ...options,
  });
};

export const useUpdateNotificationSetting = (
  options?: UseMutationOptions<BaseResponse<void>, HTTPError, UpdateNotificationSettingRequest>
) => {
  return useMutation({
    mutationFn: updateNotificationSetting,
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, HTTPError>) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
};

export const useDeleteUser = (options?: UseMutationOptions<void, HTTPError>) => {
  return useMutation({
    mutationFn: deleteUser,
    ...options,
  });
};

export const AUTH_MUTATIONS = {
  RequestReviewLoginCode: () => {
    return mutationOptions({
      mutationFn: requestReviewLoginCode,
    });
  },
};
