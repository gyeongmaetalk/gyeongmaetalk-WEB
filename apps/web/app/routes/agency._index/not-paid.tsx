import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import ConsultantReviewCard from "~/components/card/consultant-review-card";
import PaymentModal from "~/components/modal/payment-modal";
import { useRequestSubscribe } from "~/lib/tanstack/mutation/property";
import type { ReservedCounselDataResponse } from "~/models/counsel";

const SUBSCRIBE_AMOUNT = 300000;

interface NotPaidProps {
  info: ReservedCounselDataResponse["info"];
}

export default function NotPaid({ info }: NotPaidProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const { mutateAsync: requestSubscribe } = useRequestSubscribe();

  const onStartAuction = () => {
    setIsPaymentModalOpen(true);
  };

  const onConfirmSubscribePayment = async () => {
    await requestSubscribe(info.counselorId);
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
        date={`${info.counselDate}T${info.counselTime}`}
        counselorName={info.counselorName}
        experience={info.experience}
        counselorImage={info.counselorImage}
      />
      <Button className="w-full" onClick={onStartAuction} aria-label="경매 대행 서비스 결제하기">
        결제 후 대행 시작하기
      </Button>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        amount={SUBSCRIBE_AMOUNT}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={onConfirmSubscribePayment}
      />
    </div>
  );
}
