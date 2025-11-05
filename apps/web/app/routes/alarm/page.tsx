import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import { AlarmFill } from "~/components/icons";
import { Header } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { NotificationType, WebviewEvent } from "~/constants";
import { useWebView } from "~/hooks/use-webview";
import { useGetNotifications } from "~/lib/tanstack/query/fcm";
import { useRefreshTokenStore } from "~/lib/zustand/user";
import AlarmItem from "~/routes/alarm/alarm-item";
import AlarmRecommendItem from "~/routes/alarm/alarm-recommend-item";
import AlarmReviewItem from "~/routes/alarm/alarm-review-item";

export default function AlarmPage() {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState<boolean | null>(null);
  const isAuthenticated = useRefreshTokenStore((state) => state.refreshToken) !== null;

  const { data: notifications = [], isPending } = useGetNotifications();

  const navigate = useNavigate();

  const onMessage = (event: { type: string; data: unknown }) => {
    const { type, data } = event;
    if (type === WebviewEvent.GET_ALARM_STATUS) {
      const { alarmEnabled } = data as { alarmEnabled: boolean };
      setIsAlarmEnabled(alarmEnabled);
    }
  };

  const { postMessage } = useWebView(onMessage);

  const onNavigateSetting = () => {
    navigate("/mypage/alarm");
  };

  const onOpenSetting = () => {
    postMessage(WebviewEvent.OPEN_SETTING);
  };

  const onNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <PageLayout
      header={
        <Header.Container>
          <Header.Left>
            <Header.Back />
          </Header.Left>
          <Header.Center>
            <Header.Title>알림센터</Header.Title>
          </Header.Center>
          <Header.Right>
            {notifications && (
              <Button
                variant="text"
                theme="assistive"
                className="p-0 active:bg-transparent"
                onClick={onNavigateSetting}
              >
                설정
              </Button>
            )}
          </Header.Right>
        </Header.Container>
      }
      withFloating
    >
      {isAlarmEnabled === false && (
        <div className="bg-blue-99 border-blue-95 mx-3 my-4 flex items-center justify-between rounded-[12px] border p-3">
          <div className="flex items-center gap-1">
            <AlarmFill />
            <p className="font-body2-normal-regular text-label-neutral">알림이 꺼져있어요.</p>
          </div>
          <Button
            variant="text"
            theme="secondary"
            className="p-0 active:bg-transparent"
            onClick={onOpenSetting}
          >
            알림 켜기
          </Button>
        </div>
      )}

      {isAuthenticated && isPending ? (
        <div className="flex h-full flex-col items-center justify-center px-6">
          <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
        </div>
      ) : !isAuthenticated ? (
        <div className="flex h-full flex-col items-center justify-center px-6">
          <div className="bg-cool-neutral-97 mb-2 flex size-16 items-center justify-center rounded-full">
            <AlarmFill className="text-label-neutral size-8" />
          </div>
          <h3 className="font-title3-bold text-label-strong mb-2">알림을 받아보세요</h3>
          <p className="font-body2-normal-regular text-label-neutral mb-4 text-center">
            로그인하시면 상담 후기 작성, 매물 추천 등<br />
            다양한 알림을 받아보실 수 있어요
          </p>
          <Button className="w-full" onClick={onNavigateLogin}>
            로그인하고 알림 받기
          </Button>
        </div>
      ) : notifications.length > 0 ? (
        <>
          {notifications.map((item) => (
            <AlarmItem key={item.id} {...item}>
              {item.type === NotificationType.COUNSEL_FINISHED ? (
                <AlarmReviewItem {...item} />
              ) : (
                <AlarmRecommendItem {...item} />
              )}
            </AlarmItem>
          ))}

          <p className="font-label2-regular text-label-alternative mt-11 text-center">
            30일 전 알림까지 확인할 수 있어요
          </p>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="font-body2-normal-regular text-label-neutral">알림이 없어요.</p>
        </div>
      )}
    </PageLayout>
  );
}
