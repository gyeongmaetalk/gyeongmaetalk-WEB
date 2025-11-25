import { useRef, useState } from "react";

import { useDebounce } from "@gyeongmaetalk/hooks";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Label, Switch } from "@gyeongmaetalk/ui";

import { FCM } from "~/constants";
import { useUpdateNotificationSetting } from "~/lib/tanstack/mutation/auth";
import { useGetNotificationSetting } from "~/lib/tanstack/query/fcm";

interface AlarmState {
  reviewNotificationEnabled: boolean;
  propertyNotificationEnabled: boolean;
}

const MyPageAlarmPage = () => {
  // 사용자가 직접 변경한 값들만 저장 (override)
  const [overrides, setOverrides] = useState<Partial<AlarmState>>({});

  const { data: notificationSetting } = useGetNotificationSetting();

  // 실제 표시될 상태: override가 있으면 override 값, 없으면 서버 값
  const alarmState = {
    reviewNotificationEnabled:
      overrides.reviewNotificationEnabled ??
      notificationSetting?.reviewNotificationEnabled ??
      false,
    propertyNotificationEnabled:
      overrides.propertyNotificationEnabled ??
      notificationSetting?.propertyNotificationEnabled ??
      false,
  };

  const debouncedReviewNotificationEnabled = useDebounce(alarmState.reviewNotificationEnabled, 500);
  const debouncedPropertyNotificationEnabled = useDebounce(
    alarmState.propertyNotificationEnabled,
    500
  );
  const prevDebouncedStateRef = useRef({
    reviewNotificationEnabled: debouncedReviewNotificationEnabled,
    propertyNotificationEnabled: debouncedPropertyNotificationEnabled,
  });

  const onChangeAlarmState = (key: keyof typeof alarmState, value: boolean) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const { mutate: updateNotificationSetting } = useUpdateNotificationSetting({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FCM.NOTIFICATION_SETTING] });
    },
  });

  // debounced 값이 변경되면 API 호출
  if (
    prevDebouncedStateRef.current.reviewNotificationEnabled !==
      debouncedReviewNotificationEnabled ||
    prevDebouncedStateRef.current.propertyNotificationEnabled !==
      debouncedPropertyNotificationEnabled
  ) {
    // override가 있을 때만 API 호출 (초기 렌더링 방지)
    if (Object.keys(overrides).length > 0) {
      updateNotificationSetting({
        reviewNotificationEnabled: debouncedReviewNotificationEnabled,
        propertyNotificationEnabled: debouncedPropertyNotificationEnabled,
      });
    }
    prevDebouncedStateRef.current = {
      reviewNotificationEnabled: debouncedReviewNotificationEnabled,
      propertyNotificationEnabled: debouncedPropertyNotificationEnabled,
    };
  }

  return (
    <div className="px-4 py-6">
      <div className="flex flex-row items-center justify-between py-3">
        <Label className="font-body1-normal-regular text-label-normal">추천매물</Label>
        <Switch
          checked={alarmState.propertyNotificationEnabled}
          onCheckedChange={(value) => onChangeAlarmState("propertyNotificationEnabled", value)}
        />
      </div>
      <div className="flex flex-row items-center justify-between py-3">
        <Label className="font-body1-normal-regular text-label-normal">리뷰</Label>
        <Switch
          checked={alarmState.reviewNotificationEnabled}
          onCheckedChange={(value) => onChangeAlarmState("reviewNotificationEnabled", value)}
        />
      </div>
    </div>
  );
};

export default MyPageAlarmPage;
