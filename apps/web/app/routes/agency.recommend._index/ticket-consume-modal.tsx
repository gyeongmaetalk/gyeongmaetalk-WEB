import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import { Button, Modal, toast } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import { Ticket } from "~/components/icons";
import { VIEW_TICKET_QUERY_OPTIONS } from "~/lib/tanstack/query/view-ticket";

interface TicketConsumeModalProps {
  propertyId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketConsumeModal({
  propertyId,
  isOpen,
  onClose,
}: TicketConsumeModalProps) {
  const navigate = useNavigate();

  const { data: remainingViewTickets } = useQuery(
    VIEW_TICKET_QUERY_OPTIONS.GetRemainingViewTickets()
  );

  const onRouteToRecommendList = () => {
    if (remainingViewTickets?.balance === 0) {
      toast.info("열람권이 부족합니다. 열람권을 구매해주세요.");
      navigate("/payment/ticket");
      return;
    }
    navigate(`/agency/recommend/${propertyId}`);
  };

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
        <p className="text-label-neutral font-label1-reading-bold">
          잔여 열람권 {remainingViewTickets?.balance ?? 0}개
        </p>
      </Modal.Content>
      <Modal.Footer className="flex flex-col gap-2">
        <Button onClick={onRouteToRecommendList}>추천 매물 열람하기</Button>
        <Button variant="outlined" theme="secondary" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
