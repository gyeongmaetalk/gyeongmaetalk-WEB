import { Fragment } from "react";

import { Loader2 } from "lucide-react";
import { Navigate, useSearchParams } from "react-router";

import ConsultantReviewCard from "~/components/card/consultant-review-card";
import Divider from "~/components/divider";
import { Document } from "~/components/icons";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import { useGetPropertyList } from "~/lib/tanstack/query/property";
import { useRefreshTokenStore } from "~/lib/zustand/user";
import AgencyRecommendItem from "~/routes/agency.recommend._index/agency-recommend-item";
import StatusNav from "~/routes/agency.recommend._index/status-nav";

const STATUS_LIST = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "구매",
    value: "buy",
  },
  {
    label: "미구매",
    value: "not-buy",
  },
];

const getStatus = (status: string) => {
  switch (status) {
    case "buy":
      return "true";
    case "not-buy":
      return "false";
    default:
      return null;
  }
};

const AgencyRecommendPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const isAuthenticated = useRefreshTokenStore((state) => state.refreshToken) !== null;

  const { data = [], isLoading } = useGetPropertyList(getStatus(status));
  const { data: counselStatus } = useCheckCounselStatus();

  if (!isAuthenticated) {
    return <Navigate to="/agency" replace />;
  }

  return (
    <div className="h-full">
      <section className="px-4 pt-6 pb-[18px]">
        <ConsultantReviewCard
          counselorName={counselStatus?.info.counselorName || ""}
          experience={counselStatus?.info.experience || 0}
          counselorImage={counselStatus?.info.counselorImage || ""}
        />
      </section>
      <StatusNav statusList={STATUS_LIST} status={status} />
      {isLoading ? (
        <div className="flex h-[calc(100%-200px)] items-center">
          <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <section className="mt-44 flex flex-col justify-center space-y-3">
          <Document />
          <div className="space-y-1 text-center">
            <p className="font-headline2-bold text-label-strong">아직 추천매물이 없어요.</p>
            <p className="font-body1-normal-regular text-label-neutral">
              잠시만 기다려주세요.
              <br />곧 맞춤 매물을 추천해드릴게요.
            </p>
          </div>
        </section>
      ) : (
        <section className="space-y-6 px-4 py-6">
          {data.map((item) => (
            <Fragment key={item.id}>
              <AgencyRecommendItem {...item} />
              <Divider className="bg-cool-neutral-98" />
            </Fragment>
          ))}
        </section>
      )}
    </div>
  );
};

export default AgencyRecommendPage;
