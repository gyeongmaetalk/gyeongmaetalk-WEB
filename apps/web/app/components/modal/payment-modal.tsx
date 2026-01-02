import { useState } from "react";

import { Button, Modal } from "@gyeongmaetalk/ui";

import { X } from "lucide-react";

import { errorToast, successToast } from "~/utils/toast";

interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const ACCOUNT_INFO = {
  bank: "신한은행",
  accountNumber: "140-015-134116",
  accountHolder: "(주)데벨",
};

export default function PaymentModal({ isOpen, amount, onClose, onConfirm }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onCompletePayment = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      successToast("입금 완료 요청이 접수되었어요.");
      onClose();
    } catch (error) {
      console.error("입금 완료 요청 처리 중 오류 발생:", error);
      errorToast("입금 완료 처리에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal className="max-h-[90vh] overflow-y-auto">
      <Modal.Header className="text-label-normal flex items-center justify-between border-b pb-1">
        <h2 className="text-lg font-semibold">결제하기</h2>
        <Button iconOnly theme="secondary" onClick={onClose} aria-label="결제 모달 닫기" size="sm">
          <X className="text-label-normal" />
        </Button>
      </Modal.Header>

      <Modal.Content className="space-y-3">
        <div className="font-body2-reading-bold flex items-center justify-between rounded-lg">
          <span className="text-label-neutral">결제금액</span>
          <span className="text-primary-normal">{amount.toLocaleString()}원</span>
        </div>

        <div className="space-y-2 rounded-lg">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-label-alternative font-label2-medium">은행</span>
              <span className="text-label-neutral font-label2-bold">{ACCOUNT_INFO.bank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-label-alternative font-label2-medium">계좌번호</span>
              <span className="text-label-neutral font-label2-bold">
                {ACCOUNT_INFO.accountNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-label-alternative font-label2-medium">예금주</span>
              <span className="text-label-neutral font-label2-bold">
                {ACCOUNT_INFO.accountHolder}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-cool-neutral-99 rounded-lg p-3">
          <ul className="text-label-neutral space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">•</span>
              <span>위 계좌로 입금하신 후 아래 버튼을 눌러주세요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">•</span>
              <span>결제 승인은 영업일 기준 하루 안에 처리해드립니다.</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={onCompletePayment}
          disabled={isLoading}
          className="w-full"
          aria-label="입금 완료"
        >
          {isLoading ? "처리 중..." : "입금 완료"}
        </Button>
      </Modal.Content>
    </Modal>
  );
}
