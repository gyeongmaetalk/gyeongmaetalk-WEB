import { useRef, useState } from "react";

import { useDebounce } from "@gyeongmaetalk/hooks";
import { Label, Switch } from "@gyeongmaetalk/ui";

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

  const debouncedAlarmState = useDebounce(alarmState, 500);
  const prevDebouncedStateRef = useRef(debouncedAlarmState);

  const onChangeAlarmState = (key: keyof typeof alarmState, value: boolean) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const { mutate: updateNotificationSetting } = useUpdateNotificationSetting();

  // debounced 값이 변경되면 API 호출
  if (
    prevDebouncedStateRef.current.reviewNotificationEnabled !==
      debouncedAlarmState.reviewNotificationEnabled ||
    prevDebouncedStateRef.current.propertyNotificationEnabled !==
      debouncedAlarmState.propertyNotificationEnabled
  ) {
    // override가 있을 때만 API 호출 (초기 렌더링 방지)
    if (Object.keys(overrides).length > 0) {
      updateNotificationSetting(debouncedAlarmState);
    }
    prevDebouncedStateRef.current = debouncedAlarmState;
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
