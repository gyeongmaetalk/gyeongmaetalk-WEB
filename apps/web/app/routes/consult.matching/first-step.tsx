import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import complete from "~/assets/complete.png";
import ConsultantCard from "~/components/card/consultant-card";
import FloatingContainer from "~/components/container/floating-container";
import Image from "~/components/image";
import { WithCloseHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import CancelApplyConsult from "~/components/modal/cancel-apply-consult";
import { useGetMyInfo } from "~/lib/tanstack/query/auth";
import type { MatchCounselResponse } from "~/models/counsel";

import type { Mode } from "./page";

interface FirstStepProps {
  consultant: MatchCounselResponse;
  onChangeMode: (mode: Mode) => void;
}

const FirstStep = ({ consultant, onChangeMode }: FirstStepProps) => {
  const { data: myInfo } = useGetMyInfo();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRematched, setIsRematched] = useState(false);

  const onRematch = () => {
    setIsRematched(true);
  };

  const onMakeReservation = () => {
    onChangeMode("reservation");
  };

  return (
    <>
      <PageLayout
        header={<WithCloseHeader className="bg-transparent" onClose={() => setIsModalOpen(true)} />}
        className="from-blue-gradient-start bg-gradient-to-b to-white to-10%"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src={complete} alt="complete" className="size-[52px]" />
          <p className="text-cool-neutral-10 font-heading2-bold">
            {myInfo?.name ?? "OO"}님께 딱 맞는
            <br />
            <span className="text-primary-normal">경매 전문 상담사</span>를 찾아드렸어요.
          </p>
        </div>
        <div className="mt-8 px-4">
          <ConsultantCard consultant={consultant} />
        </div>
      </PageLayout>
      <FloatingContainer className="flex gap-3">
        <Button
          theme="assistive"
          className="flex-1 transition-none"
          onClick={onRematch}
          disabled={isRematched}
        >
          다시 매칭 ({isRematched ? 0 : 1}/1)
        </Button>
        <Button onClick={onMakeReservation} className="flex-1 transition-none">
          상담일정 선택
        </Button>
      </FloatingContainer>
      <CancelApplyConsult isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </>
  );
};

export default FirstStep;
