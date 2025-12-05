import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { FCM } from "~/constants";
import { useUserStore } from "~/lib/zustand/user";
import type { NotificationResponse, NotificationSettingResponse } from "~/models/fcm";
import { getNotifications, getNotificationSetting } from "~/services/fcm";

export const useGetNotifications = () => {
  const user = useUserStore((state) => state.user);

  return useQuery<BaseResponse<NotificationResponse>, HTTPError, NotificationResponse>({
    queryKey: [FCM.NOTIFICATIONS],
    queryFn: getNotifications,
    select: (data) => data.result,
    enabled: !!user,
  });
};

export const useGetNotificationSetting = () => {
  const user = useUserStore((state) => state.user);

  return useQuery<
    BaseResponse<NotificationSettingResponse>,
    HTTPError,
    NotificationSettingResponse
  >({
    queryKey: [FCM.NOTIFICATION_SETTING],
    queryFn: getNotificationSetting,
    select: (data) => data.result,
    enabled: !!user,
  });
};
