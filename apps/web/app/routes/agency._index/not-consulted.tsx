import { Button } from "@gyeongmaetalk/ui";

import { useNavigate } from "react-router";

export default function NotConsulted() {
  const navigate = useNavigate();

  const onRouteToConsultApply = () => {
    navigate("/onboarding?mode=apply");
  };

  return (
    <div className="font-heading2-bold text-label-strong border-blue-95 bg-blue-99 space-y-4 rounded-[12px] border p-3">
      <p className="text-label-strong font-headline2-bold text-center">
        전문가와 상담하고,
        <br />
        경매를 진행해보세요.
      </p>
      <Button className="w-full" onClick={onRouteToConsultApply}>
        무료 상담 신청하기
      </Button>
    </div>
  );
}
