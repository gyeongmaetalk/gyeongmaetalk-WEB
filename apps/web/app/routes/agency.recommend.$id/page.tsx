import { Badge } from "@gyeongmaetalk/ui";

import { Copy, Loader2 } from "lucide-react";
import { Navigate, useParams } from "react-router";

import Divider from "~/components/divider";
import { Header } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { useGetPropertyDetail } from "~/lib/tanstack/query/property";
import RequestBidButton from "~/routes/agency.recommend._index/request-bid-button";
import GyeongmaeMap from "~/routes/agency.recommend.$id/gyeongmae-map";
// TODO: 내,외부 이미지 로직 반영되면 추가하기
// import ListingCarousel from "~/routes/agency.recommend.$id/listing-carousel";
import { formatArea, formatDate, formatPrice } from "~/utils/format";
import { errorToast, successToast } from "~/utils/toast";

const AgencyRecommendDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/agency/recommend" />;
  }

  const { data, isLoading } = useGetPropertyDetail(id);

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation();

    const defaultSuccess = () => successToast("복사 완료");
    const defaultFailure = () => errorToast("복사 실패");

    navigator.clipboard.writeText(id).then(defaultSuccess).catch(defaultFailure);
  };

  if (isLoading || !data) {
    return (
      <div className="flex h-screen items-center">
        <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
      </div>
    );
  }

  return (
    <PageLayout
      header={
        <Header.Container>
          <Header.Left>
            <Header.Back />
          </Header.Left>
          <Header.Center>
            <Header.Title>{data.caseNumber}</Header.Title>
          </Header.Center>
          <Header.Right>
            <Header.Alarm />
          </Header.Right>
        </Header.Container>
      }
      withFloating
    >
      {/* <ListingCarousel /> */}
      <section className="space-y-3 px-4 py-6">
        <div className="space-y-1">
          <Badge size="xs" theme="accent">
            {data.buildingType}
          </Badge>
          <div className="flex items-center gap-1">
            <p className="font-headline1-bold text-label-strong">{data.name}</p>
            <div className="flex items-center justify-between">
              <p className="font-label1-normal-regular text-label-alternative">
                {formatArea(data.area)}
              </p>
            </div>
          </div>
          <p className="text-label-neutral font-body2-normal-regular">{data.address}</p>
          <div className="flex items-center gap-1">
            <p className="text-label-neutral font-body2-normal-regular">{data.caseNumber}</p>
            <button onClick={onCopy}>
              <Copy className="text-label-alternative size-4 rotate-180" />
            </button>
          </div>
        </div>
        <div className="bg-cool-neutral-99 space-y-2 rounded-[4px] p-3">
          <div className="flex items-center justify-between">
            <p className="font-body2-normal-regular text-label-neutral">감정가</p>
            <p className="font-body2-normal-bold">
              {formatPrice(data.appraisedPrice, { showUnit: true })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body2-normal-regular text-label-neutral">최저가</p>
            <p className="font-body2-normal-bold">
              {formatPrice(data.minPrice, { showUnit: true })}
            </p>
          </div>
        </div>
        <p className="font-caption1-regular text-label-alternative">
          {formatDate({ date: data.updateDate, shortYear: true })} 업데이트 매물
        </p>
      </section>
      <Divider className="h-2" />
      <section className="space-y-3 px-4 py-6">
        <p className="font-body1-normal-bold">사건 개요</p>
        <div className="font-body2-normal-regular space-y-1">
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">사건명</p>
            <p>{data.caseTitle}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">법원명</p>
            <p>{data.courtName}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">접수일</p>
            <p>{formatDate({ date: data.registrationDate })}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">개시결정일</p>
            <p>{formatDate({ date: data.commencementDate })}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">현재 상태</p>
            <p>{data.status}</p>
          </div>
        </div>
      </section>
      <Divider className="h-2" />
      <section className="space-y-3 px-4 py-6">
        <p className="font-body1-normal-bold">입찰 일정</p>
        <div className="font-label1-normal-regular border-cool-neutral-98 w-full overflow-hidden rounded-[4px] border">
          <div className="text-label-neutral bg-cool-neutral-99 flex p-2.5">
            <p className="flex-1 shrink-0 text-center">구분</p>
            <p className="flex-2 shrink-0 text-center">매각기일</p>
            <p className="flex-2 shrink-0 text-center">최저가</p>
            <p className="flex-1 shrink-0 text-center">결과</p>
          </div>
          <div>
            {data.scheduleInfos.map((info) => (
              <div key={info.round} className="border-t-cool-neutral-98 flex border-t p-2.5">
                <p className="flex-1 shrink-0 text-center">{info.round}차</p>
                <p className="flex-2 shrink-0 text-center">{formatDate({ date: info.date })}</p>
                <p className="flex-2 shrink-0 text-center">
                  {formatPrice(info.price, { showUnit: true })}
                </p>
                <p className="flex-1 shrink-0 text-center">{info.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider className="h-2" />
      <section className="space-y-3 px-4 py-6">
        <p className="font-body1-normal-bold">권리관계</p>
        <div className="font-body2-normal-regular space-y-1">
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">채무자</p>
            <p>{data.debtor}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">채권자</p>
            <p>{data.creditor}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">소유자</p>
            <p>{data.owner}</p>
          </div>
          <div className="flex">
            <p className="text-label-alternative w-20 shrink-0">임차인</p>
            <p>{data.tenant}</p>
          </div>
        </div>
      </section>
      <Divider className="h-2" />
      <section className="space-y-3 px-4 py-6">
        <p className="font-body1-normal-bold">전문가 코멘트</p>
        <p className="font-body1-normal-regular">{data.expertComment}</p>
      </section>
      <Divider className="h-2" />
      <section className="space-y-3 px-4 py-6">
        <p className="font-body1-normal-bold">지도</p>
        <div className="space-y-2">
          <p className="font-body1-normal-regular text-label-alternative">{data.address}</p>
          <GyeongmaeMap address={data.address} />
        </div>
        <RequestBidButton id={id} purchased={data.purchased} />
      </section>
    </PageLayout>
  );
};

export default AgencyRecommendDetailPage;
