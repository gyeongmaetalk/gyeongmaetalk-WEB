import ConsultantReviewCard from "~/components/card/consultant-review-card";
import type { ReservedCounselDataResponse } from "~/models/counsel";

interface ConsultedProps {
  info: ReservedCounselDataResponse["info"];
}
export default function Consulted({ info }: ConsultedProps) {
  return (
    <div className="space-y-4">
      <p className="text-label-strong font-headline2-bold">에약된 상담</p>
      <ConsultantReviewCard
        date={`${info.counselDate}T${info.counselTime}`}
        counselorName={info.counselorName}
        experience={info.experience}
        counselorImage={info.counselorImage}
      />
    </div>
  );
}
