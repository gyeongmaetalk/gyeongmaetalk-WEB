import { Verified } from "~/components/icons";
import type { NotificationItem } from "~/types/fcm";
import { formatDate } from "~/utils/format";

export default function AlarmReviewItem({ counselorName, counselTime }: NotificationItem) {
  return (
    <div className="space-y-2">
      <p className="font-body2-normal-regular">무료 상담은 어떠셨나요? 후기를 남겨주세요</p>
      <div className="bg-cool-neutral-99 flex items-center gap-1.5 rounded-md px-3 py-2">
        <div className="flex items-center gap-0.5">
          <Verified />
          <p className="font-label2-regular text-label-neutral">{counselorName} 상담사</p>
        </div>
        <p className="text-label-alternative text-[3px]">●</p>
        <p className="font-label2-regular text-label-alternative">
          {formatDate({ date: counselTime, withTime: true, shortYear: true })} 상담완료
        </p>
      </div>
    </div>
  );
}
