import { useState } from "react";

import { useRefundPayment } from "@/lib/tanstack/mutation/payment";
import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { Button, Modal } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import { ChevronDown } from "lucide-react";

import type { RefundModalState } from "./payment-list";

interface RefundModalProps {
  refundModalState: RefundModalState;
  onClose: () => void;
}

const refundReasons = ["고객 변심", "기타"];

export default function RefundModal({ refundModalState, onClose }: RefundModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [dropdownRef] = useOutsideClick<HTMLDivElement>(() => setIsDropdownOpen(false));

  const { mutateAsync: refundPayment, isPending } = useRefundPayment({
    onSuccess: () => {
      setSelectedReason("");
      setIsDropdownOpen(false);
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const currentReason = refundReasons.find((reason) => reason === selectedReason);

  const onRefundConfirm = async () => {
    if (!selectedReason) {
      return;
    }

    await refundPayment({
      paymentKey: refundModalState.paymentKey,
      cancelReason: selectedReason,
      cancelAmount: refundModalState.cancelAmount,
    });
  };

  if (!refundModalState.isOpen) {
    return null;
  }

  return (
    <Modal className="max-w-xl">
      <Modal.Header>환불 사유를 선택해주세요</Modal.Header>
      <Modal.Content className="text-left">
        <div className="flex flex-col gap-2">
          <p className="font-label1-normal-bold">
            환불 사유 <span className="text-status-negative">*</span>
          </p>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={cn(
                "font-body1-normal-regular border-cool-neutral-50/16 shadow-input flex w-full flex-1 items-center justify-between rounded-[12px] border p-3 text-left outline-none",
                selectedReason ? "text-label-normal" : "text-label-alternative"
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="환불 사유 선택"
            >
              {currentReason || "환불 사유를 선택해주세요."}
              <ChevronDown
                className={cn("size-5 transition-transform", isDropdownOpen && "rotate-180")}
              />
            </button>
            {isDropdownOpen && (
              <div className="font-body1-normal-regular border-cool-neutral-97 shadow-input absolute top-full left-0 z-100 mt-2 flex w-full flex-col rounded-[12px] border bg-white p-2">
                {refundReasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    className={cn(
                      "active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start",
                      reason === selectedReason && "text-primary-normal"
                    )}
                    onClick={() => {
                      setSelectedReason(reason);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Button
          onClick={onRefundConfirm}
          disabled={!selectedReason || isPending}
          loading={isPending}
        >
          환불하기
        </Button>
        <Button variant="text" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
