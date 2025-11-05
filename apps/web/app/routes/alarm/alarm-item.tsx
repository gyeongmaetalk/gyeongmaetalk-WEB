import { cn } from "@gyeongmaetalk/utils";

import { useNavigate } from "react-router";

import { Bubble, Company } from "~/components/icons";
import { FCM, NotificationType } from "~/constants";
import { queryClient } from "~/lib/tanstack";
import { useReadNotification } from "~/lib/tanstack/mutation/fcm";
import type { NotificationItem } from "~/types/fcm";
import { getTimeDisplay } from "~/utils/format";

interface AlarmItemProps extends NotificationItem {
  children: React.ReactNode;
}

export default function AlarmItem({
  type,
  id,
  contentId,
  createdAt,
  read,
  children,
}: AlarmItemProps) {
  const navigate = useNavigate();

  const { mutate: readNotification } = useReadNotification({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FCM.NOTIFICATIONS] });
    },
    onError: (error) => {
      console.error("알림 읽음 처리 실패", error);
    },
  });

  const isReview = type === NotificationType.COUNSEL_FINISHED;

  const title = isReview ? "리뷰 작성" : "추천 매물";
  const bgColor = isReview ? "bg-orange-95" : "bg-pink-95";
  const Icon = isReview ? Bubble : Company;

  const onNavTo = () => {
    if (!read) {
      readNotification(id);
    }

    if (isReview) {
      return navigate(`/consult/write?consultantId=${contentId}`);
    }
    navigate(`/agency/recommend/${contentId}`);
  };

  return (
    <button
      className={cn("w-full space-y-2 p-4 text-start", !read && "bg-blue-99")}
      onClick={onNavTo}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className={cn("w-max rounded-full p-1", bgColor)}>
            <Icon />
          </div>
          <p className="font-label1-normal-medium text-label-alternative">{title}</p>
        </div>
        <p className="font-label2-regular text-label-alternative">{getTimeDisplay(createdAt)}</p>
      </div>
      {children}
    </button>
  );
}
