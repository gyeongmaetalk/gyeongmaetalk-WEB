import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type {
  MyInfoResponse,
  RequestReviewLoginCodeRequest,
  SignupResponse,
  UpdateNotificationSettingRequest,
} from "~/models/auth";
import type { UpdateUserInfoForm } from "~/routes/mypage.userinfo/schema";

export const getMyInfo = async (): Promise<BaseResponse<MyInfoResponse>> => {
  return api.get("auth/info").json();
};

export const updateUserInfo = async (
  data: UpdateUserInfoForm
): Promise<BaseResponse<SignupResponse>> => {
  return api.post("auth/signup", { json: data }).json();
};

export const updateNotificationSetting = async (
  props: UpdateNotificationSettingRequest
): Promise<BaseResponse<void>> => {
  return api.patch("auth/notification/setting", { json: props }).json();
};

export const logout = async (): Promise<void> => {
  await api.post("auth/logout", {
    context: { skipAuthRedirect: true },
    throwHttpErrors: (status) => status !== 401,
  });
};

export const deleteUser = async (): Promise<void> => {
  return api.post("auth/delete").json();
};

export const requestSmsCode = async (phoneNumber: string): Promise<void> => {
  return api.post("auth/sms", { searchParams: { phoneNumber: phoneNumber } }).json();
};

export const requestReviewLoginCode = async (
  props: RequestReviewLoginCodeRequest
): Promise<BaseResponse<MyInfoResponse>> => {
  return api.post("admin/auth/login", { searchParams: props }).json();
};
