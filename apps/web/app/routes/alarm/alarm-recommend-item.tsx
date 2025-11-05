import Image from "~/components/image";
import type { NotificationItem } from "~/types/fcm";

export default function AlarmRecommendItem({
  propertyName,
  counselorName,
  thumbnail,
}: NotificationItem) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="space-y-1">
        <p className="font-body2-normal-bold">{propertyName}</p>
        <p className="font-body2-normal-normal">
          {counselorName} 상담사님이 추천 매물을 올려주셨어요.
        </p>
      </div>
      <Image src={thumbnail} alt="추천 매물 이미지" className="size-16 rounded-lg object-cover" />
    </div>
  );
}
