import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { fcmKeys } from "~/lib/tanstack/keys/fcm";
import { useUserStore } from "~/lib/zustand/user";
import type { NotificationResponse, NotificationSettingResponse } from "~/models/fcm";
import { getNotifications, getNotificationSetting } from "~/services/fcm";

export const useGetNotifications = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery<BaseResponse<NotificationResponse>, HTTPError, NotificationResponse>({
    queryKey: fcmKeys.getNotifications(),
    queryFn: getNotifications,
    select: (data) => data.result,
    enabled: isLoggedIn,
  });
};

export const useGetNotificationSetting = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery<
    BaseResponse<NotificationSettingResponse>,
    HTTPError,
    NotificationSettingResponse
  >({
    queryKey: fcmKeys.getNotificationSetting(),
    queryFn: getNotificationSetting,
    select: (data) => data.result,
    enabled: isLoggedIn,
  });
};
