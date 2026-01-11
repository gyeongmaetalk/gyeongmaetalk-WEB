import { useState } from "react";

import { PAYMENT, PAYMENT_STATUS_LABEL, PaymentStatus } from "@/constants/payment";
import { SUBSCRIPTION } from "@/constants/subscription";
import {
  useChangePropertyStatus,
  useChangeSubscriptionStatus,
} from "@/lib/tanstack/mutation/property";
import { errorToast } from "@/utils/toast";
import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Modal } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import { ChevronDown } from "lucide-react";

import type { ChangePaymentStatusModalState } from "./payment-list";

interface ChangePaymentStatusModalProps {
  changePaymentStatusModalState: ChangePaymentStatusModalState;
  isPropertyPaymentType: boolean;
  onClose: () => void;
}

const paymentStatuses = Object.keys(PAYMENT_STATUS_LABEL);

export default function ChangePaymentStatusModal({
  changePaymentStatusModalState,
  isPropertyPaymentType,
  onClose,
}: ChangePaymentStatusModalProps) {
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    changePaymentStatusModalState.paymentStatus
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [dropdownRef] = useOutsideClick<HTMLDivElement>(() => setIsDropdownOpen(false));

  const { mutateAsync: changeSubscriptionStatus, isPending: isSubscriptionPending } =
    useChangeSubscriptionStatus({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PAYMENT.LIST] });
        queryClient.invalidateQueries({ queryKey: [SUBSCRIPTION.LIST] });
        setSelectedPaymentStatus(changePaymentStatusModalState.paymentStatus);
        setIsDropdownOpen(false);
        onClose();
      },
      onError: (error) => {
        errorToast("구독 상태 변경에 실패했어요.");
        console.error(error);
      },
    });

  const { mutateAsync: changePropertyStatus, isPending: isPropertyPending } =
    useChangePropertyStatus({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PAYMENT.LIST] });
        queryClient.invalidateQueries({ queryKey: [SUBSCRIPTION.LIST] });
        setSelectedPaymentStatus(changePaymentStatusModalState.paymentStatus);
        setIsDropdownOpen(false);
        onClose();
      },
      onError: (error) => {
        errorToast("매물 구매 상태 변경에 실패했어요.");
        console.error(error);
      },
    });

  const isSamePaymentStatus = changePaymentStatusModalState.paymentStatus === selectedPaymentStatus;
  const isReadyStatus = changePaymentStatusModalState.paymentStatus === PaymentStatus.READY;
  const isDisabled =
    !selectedPaymentStatus || isSamePaymentStatus || isSubscriptionPending || isPropertyPending;
  const isLoading = isSubscriptionPending || isPropertyPending;

  const onChangePaymentStatus = async () => {
    if (isDisabled) {
      return;
    }

    if (isPropertyPaymentType) {
      await changePropertyStatus({
        propertyId: changePaymentStatusModalState.id,
        memberId: changePaymentStatusModalState.memberId,
        status: selectedPaymentStatus,
      });
      return;
    }

    await changeSubscriptionStatus({
      subscriptionId: changePaymentStatusModalState.id,
      memberId: changePaymentStatusModalState.memberId,
      status: selectedPaymentStatus,
    });
  };

  if (!changePaymentStatusModalState.isOpen) {
    return null;
  }

  return (
    <Modal className="max-w-xl">
      <Modal.Header>변경할 상태를 선택해주세요</Modal.Header>
      <Modal.Content className="text-left">
        <div className="flex flex-col gap-2">
          <p className="font-label1-normal-bold">상태</p>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={cn(
                "font-body1-normal-regular border-cool-neutral-50/16 shadow-input flex w-full flex-1 items-center justify-between rounded-[12px] border p-3 text-left outline-none",
                selectedPaymentStatus ? "text-label-normal" : "text-label-alternative"
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="상태 목록 선택"
            >
              {PAYMENT_STATUS_LABEL[selectedPaymentStatus].label || "상태 목록을 선택해주세요."}
              <ChevronDown
                className={cn("size-5 transition-transform", isDropdownOpen && "rotate-180")}
              />
            </button>
            {isDropdownOpen && (
              <div className="font-body1-normal-regular border-cool-neutral-97 shadow-input absolute top-full left-0 z-100 mt-2 flex w-full flex-col rounded-[12px] border bg-white p-2">
                {paymentStatuses.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    disabled={!isReadyStatus && reason === PaymentStatus.READY}
                    className={cn(
                      "active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start disabled:opacity-50",
                      reason === selectedPaymentStatus && "text-primary-normal"
                    )}
                    onClick={() => {
                      setSelectedPaymentStatus(reason as PaymentStatus);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {PAYMENT_STATUS_LABEL[reason as PaymentStatus].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Button onClick={onChangePaymentStatus} disabled={isDisabled} loading={isLoading}>
          상태 변경
        </Button>
        <Button variant="text" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
