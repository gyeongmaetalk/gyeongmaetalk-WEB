import { useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import complete from "~/assets/complete.png";
import Image from "~/components/image";
import Modal from "~/components/modal";
import { PROPERTY } from "~/constants";
import { useRequestBid } from "~/lib/tanstack/mutation/property";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";

interface RequestBidButtonProps {
  id: string;
  purchased: boolean;
}

export default function RequestBidButton({ id, purchased }: RequestBidButtonProps) {
  const { data: counselInfoData } = useCheckCounselStatus();
  const counselorName = counselInfoData?.info.counselorName || "";

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: requestBid, isPending } = useRequestBid({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY.PROPERTY_DETAIL, id] });
      setIsOpen(true);
    },
  });

  const navigate = useNavigate();

  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const isDisabled = purchased || isPending;

  const onRequestBid = () => {
    requestBid(id);
  };

  const onRouteToRecommendList = () => {
    navigate("/agency/recommend");
  };

  return (
    <>
      <Button className="mt-5 w-full" onClick={onRequestBid} disabled={isDisabled}>
        입찰 요청하기
      </Button>
      {isOpen && (
        <Modal ref={modalRef}>
          <Modal.Header>
            <Image src={complete} alt="complete" className="mx-auto mb-1 size-[52px]" />
            <p>
              <span className="text-primary-normal">{counselorName} 상담사</span>에게 입찰 요청을
              <br />
              완료했습니다.
            </p>
          </Modal.Header>
          <Modal.Content>
            <p>
              잠시만 기다려주세요.
              <br />곧 맞춤 매물을 추천해드릴게요.
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button className="w-full" onClick={onRouteToRecommendList}>
              추천 매물로 이동
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
