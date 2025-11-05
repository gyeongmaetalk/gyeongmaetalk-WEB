import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type { NotificationResponse, NotificationSettingResponse } from "~/models/fcm";

export const getNotifications = async (): Promise<BaseResponse<NotificationResponse>> => {
  return api.get("fcm/notifications").json();
};

export const readNotification = async (notificationId: number): Promise<BaseResponse<void>> => {
  return api.patch(`fcm/${notificationId}/read`).json();
};

export const getNotificationSetting = async (): Promise<
  BaseResponse<NotificationSettingResponse>
> => {
  return api.get("fcm/notifications/setting").json();
};
