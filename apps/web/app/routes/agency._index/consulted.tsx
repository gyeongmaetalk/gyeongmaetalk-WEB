import ConsultantReviewCard from "~/components/card/consultant-review-card";
import type { ReservedCounselDataResponse } from "~/models/counsel";
import { formatDate } from "~/utils/format";

interface ConsultedProps {
  info: ReservedCounselDataResponse["info"];
}
export default function Consulted({ info }: ConsultedProps) {
  return (
    <div className="space-y-4">
      <p className="text-label-strong font-headline2-bold">
        예약한 상담을 마친 후,
        <br />
        경매 대행를 진행해 보세요.
      </p>
      <ConsultantReviewCard
        date={formatDate({ date: info.counselDate, withTime: true, shortYear: true })}
        counselorName={info.counselorName}
        experience={info.experience}
        counselorImage={info.counselorImage}
      />
    </div>
  );
}
