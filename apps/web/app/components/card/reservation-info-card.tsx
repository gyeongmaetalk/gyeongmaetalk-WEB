import type { ReserveConsultResponse, ReservedCounselDataResponse } from "~/models/counsel";

import Divider from "../divider";
import { Person } from "../icons";

interface ReservationInfoCardProps {
  reservation: ReservedCounselDataResponse["info"] | ReserveConsultResponse;
  counselorName?: string;
}

const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

const getConsultDate = (date: string) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};

const ReservationInfoCard = ({ reservation, counselorName }: ReservationInfoCardProps) => {
  const name = "counselorName" in reservation ? reservation.counselorName : counselorName;

  return (
    <section className="space-y-4 px-4 py-6">
      <div className="flex items-center gap-1">
        <Person className="text-primary-normal" />
        <p className="font-headline2-bold text-label-strong">예약 정보</p>
      </div>
      <div className="space-y-3">
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">예약된 일정</p>
          <p>{getConsultDate(`${reservation.counselDate}T${reservation.counselTime}`)}</p>
        </div>
        <Divider className="bg-cool-neutral-97" />
        <div className="font-body2-normal-regular space-y-2">
          <p className="text-label-alternative">상담사 정보</p>
          <p>
            {name} 상담사 ({formatPhoneNumber(reservation.cellPhone)})
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReservationInfoCard;
