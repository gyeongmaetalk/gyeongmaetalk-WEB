import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { Button, Modal } from "@gyeongmaetalk/ui";

import { Link } from "react-router";

interface CounselorAssignRequireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CounselorAssignRequireModal({
  isOpen,
  onClose,
}: CounselorAssignRequireModalProps) {
  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal ref={modalRef}>
      <Modal.Header>
        <span className="text-primary-normal">상담사를 배정 받은</span> 후<br />
        이용 가능한 서비스 입니다
      </Modal.Header>
      <Modal.Content>무료 상담을 통해 상담사를 배정 받으세요</Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Link to="/consult/apply">
          <Button className="w-full">무료 상담 신청하기</Button>
        </Link>
        <Button variant="text" theme="assistive" onClick={onClose}>
          나가기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
