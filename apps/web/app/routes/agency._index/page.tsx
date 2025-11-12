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
        <AuctionExample />
        <p className="text-label-assistive font-caption1-regular">예시 이미지 입니다.</p>
      </section>
      <Divider className="h-2" />
      <section className="px-4 py-6">{renderConsultStatus()}</section>
    </div>
  );
};

export default AgencyPage;
