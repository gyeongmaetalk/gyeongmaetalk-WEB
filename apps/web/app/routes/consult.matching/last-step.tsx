import { Button } from "@gyeongmaetalk/ui";

import { Info } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

import calendarCheck from "~/assets/calendar-check.webp";
import ConsultInfoCard from "~/components/card/consult-info-card";
import ConsultantCard from "~/components/card/consultant-card";
import ReservationInfoCard from "~/components/card/reservation-info-card";
import FloatingContainer from "~/components/container/floating-container";
import Divider from "~/components/divider";
import Image from "~/components/image";
import PageLayout from "~/components/layout/page-layout";
import type { MatchCounselResponse, ReserveConsultResponse } from "~/models/counsel";

interface LastStepProps {
  consultant: MatchCounselResponse;
  reservationResult: ReserveConsultResponse | null;
}

const LastStep = ({ consultant, reservationResult }: LastStepProps) => {
  const navigate = useNavigate();

  const onRouteToHome = () => {
    navigate("/");
  };

  const onRouteToConsultHistory = () => {
    navigate("/consult");
  };

  if (!reservationResult) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageLayout withFloating className="from-blue-gradient-start bg-linear-to-b to-white to-10%">
        <section className="space-y-8 px-4 pb-6">
          <div className="flex flex-col items-center gap-3">
            <Image src={calendarCheck} alt="상담 일정 확정 아이콘" className="w-20" />
            <p className="text-cool-neutral-10 font-heading2-bold">
              <span className="text-primary-normal">상담 일정</span>이 확정되었습니다.
            </p>
          </div>
          <ConsultantCard consultant={consultant} />
        </section>

        <Divider className="bg-cool-neutral-99 h-2" />

        <ReservationInfoCard
          reservation={reservationResult}
          counselorName={consultant.counselorName}
        />

        <Divider className="bg-cool-neutral-99 h-2" />

        <ConsultInfoCard
          purpose={reservationResult.purpose}
          area={reservationResult.area}
          serviceType={reservationResult.serviceType}
          interest={reservationResult.interest}
          participantType={reservationResult.participantType}
        />

        <section className="bg-cool-neutral-99 mb-5 p-4">
          <div className="flex items-center gap-1">
            <Info className="text-cool-neutral-99 size-[18px]" fill="#2e2f33e0" />
            <p className="text-label-neutral font-body2-normal-bold">상담 안내</p>
          </div>
          <ul className="font-body2-normal-regular text-label-neutral list-disc pl-5">
            <li>예약된 일정에 맞춰 연락드릴 예정입니다.</li>
            <li>무료 상담은 약 30분간 진행 됩니다.</li>
          </ul>
        </section>
      </PageLayout>
      <FloatingContainer className="flex gap-3">
        <Button onClick={onRouteToHome} theme="assistive" className="flex-1 transition-none">
          홈으로 이동
        </Button>
        <Button onClick={onRouteToConsultHistory} className="flex-1 transition-none">
          상담 내역으로 이동
        </Button>
      </FloatingContainer>
    </>
  );
};

export default LastStep;
