import type { BaseResponse } from "@gyeongmaetalk/types";
import { useQuery } from "@tanstack/react-query";

import type { HTTPError } from "ky";

import { FCM } from "~/constants";
import { useRefreshTokenStore } from "~/lib/zustand/user";
import type { NotificationResponse, NotificationSettingResponse } from "~/models/fcm";
import { getNotifications, getNotificationSetting } from "~/services/fcm";

export const useGetNotifications = () => {
  const refreshToken = useRefreshTokenStore((state) => state.refreshToken);

  return useQuery<BaseResponse<NotificationResponse>, HTTPError, NotificationResponse>({
    queryKey: [FCM.NOTIFICATIONS],
    queryFn: getNotifications,
    select: (data) => data.result,
    enabled: !!refreshToken,
  });
};

export const useGetNotificationSetting = () => {
  const refreshToken = useRefreshTokenStore((state) => state.refreshToken);

  return useQuery<
    BaseResponse<NotificationSettingResponse>,
    HTTPError,
    NotificationSettingResponse
  >({
    queryKey: [FCM.NOTIFICATION_SETTING],
    queryFn: getNotificationSetting,
    select: (data) => data.result,
    enabled: !!refreshToken,
  });
};
