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
