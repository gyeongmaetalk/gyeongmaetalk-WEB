import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { Button, Modal } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

interface CancelApplyConsultProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmLeave?: () => void;
}

const CancelApplyConsult = ({ isOpen, onCancel, onConfirmLeave }: CancelApplyConsultProps) => {
  const navigate = useNavigate();

  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    onCancel();
  });

  const onConfirm = () => {
    onConfirmLeave?.();
    navigate("/");
  };

  return (
    isOpen && (
      <Modal ref={modalRef}>
        <Modal.Header>상담 신청이 아직 완료되지 않았습니다. 지금 나가시겠어요?</Modal.Header>
        <Modal.Content>나가시면 입력하신 정보가 사라집니다.</Modal.Content>
        <Modal.Footer className="flex flex-col gap-2">
          <Button onClick={onConfirm} aria-label="상담 신청 나가기 확인">
            나가기
          </Button>
          <Button variant="text" onClick={onCancel} aria-label="상담 신청 계속 작성">
            계속 작성하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default CancelApplyConsult;
