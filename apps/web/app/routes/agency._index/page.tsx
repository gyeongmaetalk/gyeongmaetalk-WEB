import { Loader2 } from "lucide-react";
import { Navigate } from "react-router";

import Divider from "~/components/divider";
import { CounselStatus } from "~/constants";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import AuctionExample from "~/routes/agency._index/auction-example";
import Consulted from "~/routes/agency._index/consulted";
import NotConsulted from "~/routes/agency._index/not-consulted";
import NotPaid from "~/routes/agency._index/not-paid";

const AgencyPage = () => {
  const { data: reservedcCounselData, isLoading } = useCheckCounselStatus();

  if (isLoading) {
    return (
      <div className="flex h-full items-center">
        <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
      </div>
    );
  }

  const renderConsultStatus = () => {
    if (!reservedcCounselData) {
      return <NotConsulted />;
    }

    switch (reservedcCounselData.status) {
      case CounselStatus.NONE:
        return <NotConsulted />;
      case CounselStatus.COUNSEL_BEFORE:
        return <Consulted info={reservedcCounselData.info} />;
      case CounselStatus.COUNSEL_AFTER:
        return <NotPaid info={reservedcCounselData.info} />;
      case CounselStatus.SUBSCRIBE:
        return <Navigate to="/agency/recommend" replace />;
    }
  };

  return (
    <div>
      <section className="px-4 py-6">
        <p className="font-heading2-bold text-label-strong">
          경매톡에서 경매대행 시
          <br />
          <span className="text-primary-normal">무료로 추천매물</span>을 받아 볼 수 있어요!
        </p>
        <AuctionExample />
        <p className="text-label-assistive font-caption1-regular">예시 이미지 입니다.</p>
      </section>
      <Divider className="h-2" />
      <section className="px-4 py-6">{renderConsultStatus()}</section>
    </div>
  );
};

export default AgencyPage;
