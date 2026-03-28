import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { Button, Modal } from "@gyeongmaetalk/ui";

import { Ticket } from "~/components/icons";

interface TicketConsumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketConsumeModal({ isOpen, onClose }: TicketConsumeModalProps) {
  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal ref={modalRef}>
      <Modal.Header>
        <span className="text-primary-normal">열람권 1개</span>를 사용하시겠습니까?
      </Modal.Header>
      <Modal.Content className="bg-cool-neutral-99 mt-2 flex items-center justify-center gap-1 rounded-md py-2">
        <Ticket className="text-label-neutral" />
        <p className="text-label-neutral font-label1-reading-bold">잔여 열람권 1개</p>
      </Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Button>추천 매물 열람하기</Button>
        <Button variant="outlined" theme="secondary" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
