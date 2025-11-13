import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import ConsultantReviewCard from "~/components/card/consultant-review-card";
import SubscribePaymentModal from "~/components/modal/subscribe-payment-modal";
import type { ReservedCounselDataResponse } from "~/models/counsel";

interface NotPaidProps {
  info: ReservedCounselDataResponse["info"];
}

export default function NotPaid({ info }: NotPaidProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const onStartAuction = () => {
    setIsPaymentModalOpen(true);
  };

  const onPaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-label-strong font-headline2-bold">상담은 어떠셨나요?</p>
        <p className="text-label-neutral font-body2-normal-regular">
          경매톡과 함께 경매를 진행해보세요!
        </p>
      </div>
      <ConsultantReviewCard
        date={info.counselDate}
        counselorName={info.counselorName}
        experience={info.experience}
        counselorImage={info.counselorImage}
      />
      <Button className="w-full" onClick={onStartAuction} aria-label="경매 대행 서비스 결제하기">
        결제 후 대행 시작하기
      </Button>

      <SubscribePaymentModal
        id={info.counselorId}
        isOpen={isPaymentModalOpen}
        onClose={onPaymentModalClose}
      />
    </div>
  );
}
