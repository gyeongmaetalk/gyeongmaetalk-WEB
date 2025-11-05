import { formatDate } from "~/utils/format";

import Divider from "../divider";
import { Verified } from "../icons";
import Image from "../image";

interface ConsultantReviewCardProps {
  date?: string;
  counselorName: string;
  experience: number;
  counselorImage: string;
}

const ConsultantReviewCard = ({
  date,
  counselorName,
  experience,
  counselorImage,
}: ConsultantReviewCardProps) => {
  return (
    <div className="bg-cool-neutral-99 space-y-2.5 rounded-lg p-3">
      <div className="flex items-center gap-3">
        <div className="size-10 overflow-hidden rounded-full">
          <Image
            src={counselorImage}
            alt="counselor-image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-0.5">
            <p className="font-label2-bold text-label-strong">{counselorName} 상담사</p>
            <Verified />
          </div>
          <p className="font-label2-regular text-label-neutral">{experience}년차 경매지도사</p>
        </div>
      </div>
      {date && (
        <>
          <Divider className="bg-cool-neutral-50/22" />
          <div className="flex items-center gap-1">
            <p className="font-caption1-bold w-12">진행일</p>
            <p className="font-label2-regular text-label-alternative">
              {formatDate({ date, withTime: true })} 상담완료
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ConsultantReviewCard;
