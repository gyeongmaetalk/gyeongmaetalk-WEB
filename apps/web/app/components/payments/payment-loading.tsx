import { Modal, Spinner } from "@gyeongmaetalk/ui";

interface PaymentLoadingProps {
  isOpen: boolean;
}

export default function PaymentLoading({ isOpen }: PaymentLoadingProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal className="flex flex-col items-center justify-center gap-7 bg-transparent">
      <Spinner className="size-20 text-white" />
      <Modal.Content className="font-heading1-bold text-white">결제 진행 중</Modal.Content>
    </Modal>
  );
}
