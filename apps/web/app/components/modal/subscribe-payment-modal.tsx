import { useEffect, useState } from "react";

import { Button } from "@gyeongmaetalk/ui";
import {
  ANONYMOUS,
  loadTossPayments,
  type TossPaymentsWidgets,
  type WidgetAgreementWidget,
  type WidgetPaymentMethodWidget,
} from "@tosspayments/tosspayments-sdk";

import { X } from "lucide-react";

import { COUNSEL } from "~/constants";
import { queryClient } from "~/lib/tanstack";
import { useConfirmSubscription, useReadySubscribe } from "~/lib/tanstack/mutation/property";
import { errorToast, successToast } from "~/utils/toast";

import Modal from ".";

interface SubscribePaymentModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNT = 300000;
const TOSS_PAYMENTS_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;

export default function SubscribePaymentModal({ id, isOpen, onClose }: SubscribePaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentWidgetLoading, setIsPaymentWidgetLoading] = useState(true);
  const [tossPayments, setTossPayments] = useState<TossPaymentsWidgets | null>(null);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState<WidgetPaymentMethodWidget | null>(
    null
  );
  const [agreementWidget, setAgreementWidget] = useState<WidgetAgreementWidget | null>(null);
  const [isAgreementChecked, setIsAgreementChecked] = useState(true);

  const { mutateAsync: readySubscribe } = useReadySubscribe();
  const { mutateAsync: confirmSubscription } = useConfirmSubscription();

  const paymentDisabled = !isAgreementChecked || isLoading || isPaymentWidgetLoading;

  const onRequestPayment = async () => {
    if (!tossPayments) return;

    try {
      setIsLoading(true);

      const readyResponse = await readySubscribe(id);

      if (!readyResponse.isSuccess) {
        errorToast("결제 준비에 실패했습니다.");
        return;
      }

      await tossPayments.setAmount({
        currency: "KRW",
        value: AMOUNT,
      });

      // 결제 요청
      const result = await tossPayments.requestPayment({
        orderId: readyResponse.result.orderId,
        orderName: "경매 대행 서비스",
      });

      await confirmSubscription({
        subscriptionId: readyResponse.result.subscriptionId,
        paymentKey: result.paymentKey,
        orderId: result.orderId,
        amount: result.amount.value,
      });

      successToast("결제가 완료되었어요.");
      queryClient.invalidateQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      errorToast("결제에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // 토스페이먼츠 초기화
  useEffect(() => {
    const initializeTossPayments = async () => {
      if (isOpen && !tossPayments) {
        try {
          const sdk = await loadTossPayments(TOSS_PAYMENTS_CLIENT_KEY);
          const widgets = sdk.widgets({ customerKey: ANONYMOUS });
          setTossPayments(widgets);
        } catch (error) {
          console.error("토스페이먼츠 초기화 실패:", error);
          errorToast("결제창을 열지 못했어요. 다시 시도해주세요.");
        }
      }
    };

    initializeTossPayments();
  }, [isOpen, tossPayments]);

  // 결제 UI 렌더링
  useEffect(() => {
    const renderPaymentUI = async () => {
      if (!tossPayments) return;

      if (isOpen) {
        try {
          // 결제 금액 설정
          await tossPayments.setAmount({
            currency: "KRW",
            value: AMOUNT,
          });

          // 결제 UI 렌더링
          const paymentMethod = await tossPayments.renderPaymentMethods({
            selector: "#payment-method-container",
          });
          setPaymentMethodWidget(paymentMethod);

          // 결제 약관 UI 렌더링
          const agreement = await tossPayments.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          });
          agreement.on("agreementStatusChange", (agreementStatus) => {
            setIsAgreementChecked(agreementStatus.agreedRequiredTerms);
          });
          setAgreementWidget(agreement);
        } catch (error) {
          console.error("결제 UI 렌더링 실패:", error);
          errorToast("결제창을 열지 못했어요. 다시 시도해주세요.");
        } finally {
          setIsPaymentWidgetLoading(false);
        }
        return;
      }

      // 모달이 닫힌 경우 위젯 제거
      if (paymentMethodWidget) {
        paymentMethodWidget.destroy();
      }
      if (agreementWidget) {
        agreementWidget.destroy();
      }
      setPaymentMethodWidget(null);
      setAgreementWidget(null);
    };

    renderPaymentUI();
  }, [tossPayments, isOpen]);

  if (!isOpen) return null;

  return (
    <Modal className="max-h-[90vh] overflow-y-auto">
      <Modal.Header className="flex items-center justify-between border-b pb-1 text-gray-900">
        <h2 className="text-lg font-semibold">결제하기</h2>
        <Button
          variant="text"
          theme="assistive"
          className="p-1"
          onClick={onClose}
          aria-label="결제 모달 닫기"
        >
          <X className="text-gray-900" />
        </Button>
      </Modal.Header>

      <Modal.Content className="space-y-4">
        <div className="bg-cool-neutral-99 flex items-center justify-between rounded-lg p-3">
          <span className="text-label-neutral font-label2-medium">결제금액</span>
          <span className="text-primary-normal font-body1-normal-bold">
            {AMOUNT.toLocaleString()}원
          </span>
        </div>
        <div id="payment-method-container" className="bg-cool-neutral-99 min-h-[200px]" />
        <div id="agreement" />
        <Button
          onClick={onRequestPayment}
          disabled={paymentDisabled}
          className="w-full"
          aria-label="결제하기"
        >
          {isLoading ? "결제 처리 중..." : `${AMOUNT.toLocaleString()}원 결제하기`}
        </Button>
      </Modal.Content>
    </Modal>
  );
}
