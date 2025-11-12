import { Button } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

import hasNoConsult from "~/assets/has-no-consult.webp";
import Image from "~/components/image";

export const ConsultEmpty = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <Image
        src={hasNoConsult}
        alt="consult-empty"
        className="mb-3 aspect-[83/78] h-[234px] w-[249px] shrink-0"
      />
      <div className="font-heading2-bold mb-15 text-center">
        아직 상담 내역이 없어요, <br />
        1분만 투자하면 <br />딱 맞는 경매 전문가를 연결해드려요.
      </div>
      <Button className="w-full" onClick={() => navigate("/consult/apply")}>
        무료 상담 신청하기
      </Button>
    </div>
  );
};
