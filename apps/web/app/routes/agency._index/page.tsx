import { Button } from "@gyeongmaetalk/ui";

import { Link } from "react-router";

import Divider from "~/components/divider";
import { CounselStatus } from "~/constants";
import type { ReservedCounselDataResponse } from "~/models/counsel";
import AuctionExample from "~/routes/agency._index/auction-example";
import Consulted from "~/routes/agency._index/consulted";
import NotConsulted from "~/routes/agency._index/not-consulted";
import NotPaid from "~/routes/agency._index/not-paid";

interface AgencyPageProps {
  loaderData: ReservedCounselDataResponse | null;
}

const AgencyPage = ({ loaderData }: AgencyPageProps) => {
  const renderConsultStatus = () => {
    if (!loaderData) {
      return <NotConsulted />;
    }

    switch (loaderData.status) {
      case CounselStatus.NONE:
        return <NotConsulted />;
      case CounselStatus.COUNSEL_BEFORE:
        return <Consulted info={loaderData.info} />;
      case CounselStatus.COUNSEL_AFTER:
        return <NotPaid info={loaderData.info} />;
    }
  };

  return (
    <div>
      <section className="flex flex-col gap-4 px-4 py-6">
        <AuctionExample />
        <Link to="/agency/package">
          <Button className="w-full">경매 대행 패키지 살펴보기</Button>
        </Link>
      </section>
      <Divider className="h-2" />
      <section className="px-4 py-6">{renderConsultStatus()}</section>
    </div>
  );
};

export default AgencyPage;
