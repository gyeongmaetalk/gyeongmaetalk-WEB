import ConsultantReviewCard from "~/components/card/consultant-review-card";
import type { ReservedCounselDataResponse } from "~/models/counsel";

interface NotPaidProps {
  info: ReservedCounselDataResponse["info"];
}

export default function NotPaid({ info }: NotPaidProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-label-strong font-headline2-bold">상담은 어떠셨나요?</p>
        <p className="text-label-neutral font-body2-normal-regular">
          경매톡과 함께 경매를 진행해보세요!
        </p>
      </div>
      <ConsultantReviewCard
        date={`${info.counselDate}T${info.counselTime}`}
        counselorName={info.counselorName}
        experience={info.experience}
        counselorImage={info.counselorImage}
      />
    </div>
  );
}
