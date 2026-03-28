import { Button, Modal } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

interface PaymentTicketCompleteModalProps {
  isOpen: boolean;
}

export default function PaymentTicketCompleteModal({ isOpen }: PaymentTicketCompleteModalProps) {
  const navigate = useNavigate();

  const onRouteToRecommendList = () => {
    navigate("/agency/recommend");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal>
      <Modal.Header>열람권 구매가 완료되었습니다</Modal.Header>
      <Modal.Content>추천매물을 열람하실 수 있습니다</Modal.Content>
      <Modal.Footer>
        <Button className="w-full" onClick={onRouteToRecommendList}>
          추천 매물 열람하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
