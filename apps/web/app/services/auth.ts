import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type {
  MyInfoResponse,
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
