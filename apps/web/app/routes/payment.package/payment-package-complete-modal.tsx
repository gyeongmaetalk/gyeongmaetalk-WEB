import { Button, Modal } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import complete from "~/assets/complete.webp";
import Image from "~/components/image";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";

interface PaymentPackageCompleteModalProps {
  isOpen: boolean;
}

export default function PaymentPackageCompleteModal({ isOpen }: PaymentPackageCompleteModalProps) {
  const navigate = useNavigate();
  const { data } = useCheckCounselStatus();
  const counselorName = data?.info?.counselorName || "경매톡";

  const onRouteToRecommendList = () => {
    navigate("/agency/recommend");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal>
      <Modal.Header>
        <Image src={complete} alt="complete" className="mx-auto mb-1 size-[52px]" />
        <p>
          <span className="text-primary-normal">{counselorName} 상담사</span>에게 경매 대행 요청을
          <br />
          완료했습니다
        </p>
      </Modal.Header>
      <Modal.Content>
        <p>
          잠시만 기다려주세요
          <br />곧 맞춤 매물을 추천해드릴게요
        </p>
      </Modal.Content>
      <Modal.Footer>
        <Button className="w-full" onClick={onRouteToRecommendList}>
          경매 대행으로 이동
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
