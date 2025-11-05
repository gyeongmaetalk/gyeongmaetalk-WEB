import { Button } from "@gyeongmaetalk/ui";

import { Info, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import ConsultInfoCard from "~/components/card/consult-info-card";
import ConsultantCard from "~/components/card/consultant-card";
import ReservationInfoCard from "~/components/card/reservation-info-card";
import Divider from "~/components/divider";
import { WithLeftTitleHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { CounselStatus } from "~/constants";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import { ConsultEmpty } from "~/routes/consult._index/consultEmpty";

const RESERVED_BUTTON_OPTIONS = [
  {
    variant: "outlined",
    theme: "assistive",
    label: "예약 취소",
    value: "cancel",
    review: false,
  },
  {
    variant: "outlined",
    theme: "assistive",
    label: "예약 변경",
    value: "change",
    review: false,
  },
];

const ConsultPage = () => {
  const { data: reservedcCounselData, isLoading } = useCheckCounselStatus();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <PageLayout header={<WithLeftTitleHeader title="무료상담" />} showNav>
        <div className="flex h-full flex-col items-center justify-center">
          <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (!reservedcCounselData || reservedcCounselData.status === CounselStatus.NONE) {
    return (
      <PageLayout header={<WithLeftTitleHeader title="무료상담" />} showNav>
        <ConsultEmpty />
      </PageLayout>
    );
  }

  const COMPLETED_BUTTON_OPTIONS = [
    {
      variant: "outlined",
      theme: "assistive",
      label: "리뷰 작성",
      value: "review",
      review: reservedcCounselData?.info.reviewed,
    },
    {
      variant: "outlined",
      theme: "primary",
      label: "경매 진행",
      value: "auction",
      review: false,
    },
  ];

  const AUCTION_BUTTON_OPTIONS = [
    {
      variant: "outlined",
      theme: "assistive",
      label: "리뷰 작성",
      value: "review",
      review: reservedcCounselData?.info.reviewed,
    },
    {
      variant: "outlined",
      theme: "primary",
      label: "추천 매물 보기",
      value: "recommend",
      review: false,
    },
  ];

  const buttonOptions =
    reservedcCounselData.status === CounselStatus.COUNSEL_BEFORE
      ? RESERVED_BUTTON_OPTIONS
      : reservedcCounselData.status === CounselStatus.COUNSEL_AFTER
        ? COMPLETED_BUTTON_OPTIONS
        : AUCTION_BUTTON_OPTIONS;

  const handleButtonClick = (value: string) => {
    if (value === "cancel") {
      // TODO: 예약 취소 API 호출
    }
    if (value === "change") {
      // TODO: 예약 변경 API 호출
    }
    if (value === "review") {
      navigate(`/consult/write?consultantId=${reservedcCounselData?.info.counselorId}`);
    }
    if (value === "auction") {
      navigate("/agency");
    }
    if (value === "recommend") {
      navigate("/agency/recommend");
    }
  };

  return (
    <>
      <PageLayout header={<WithLeftTitleHeader title="무료상담" />} showNav>
        <div className="flex h-full flex-col">
          {/* 상담사 정보 */}
          <div className="px-4 py-6">
            <ConsultantCard
              status={reservedcCounselData.status}
              consultant={reservedcCounselData?.info}
            />
          </div>
          <Divider className="bg-cool-neutral-99 h-2" />

          {/* 예약 정보 */}
          <ReservationInfoCard reservation={reservedcCounselData?.info} />
          <Divider className="bg-cool-neutral-99 h-2" />
          {/* 상담 정보 */}
          <ConsultInfoCard
            purpose={reservedcCounselData.info.purpose}
            area={reservedcCounselData.info.area}
            serviceType={reservedcCounselData.info.serviceType}
            interest={reservedcCounselData.info.interest}
            participantType={reservedcCounselData.info.participantType}
          />

          {/* 경매 정보 */}
          {reservedcCounselData.status === CounselStatus.COUNSEL_BEFORE && (
            <>
              <Divider className="bg-cool-neutral-99 h-2" />
              <section className="bg-cool-neutral-99 mb-5 p-4">
                <div className="flex items-center gap-1">
                  <Info className="text-cool-neutral-99 size-[18px]" fill="#2e2f33e0" />
                  <p className="text-label-neutral font-body2-normal-bold">상담 안내</p>
                </div>
                <ul className="font-body2-normal-regular text-label-neutral list-disc pl-5">
                  <li>예약된 일정에 맞춰 연락드릴 예정입니다.</li>
                  <li>무료 상담은 약 30분간 진행 됩니다.</li>
                </ul>
              </section>
            </>
          )}
          <div className="mb-2 flex w-full gap-3 px-4 py-2">
            {buttonOptions.map((button) => (
              <Button
                className={`${button.review ? "hidden" : "flex-1"}`}
                key={button.label}
                variant={button.variant as "default" | "text" | "outlined"}
                theme={button.theme as "default" | "assistive" | "secondary"}
                onClick={() => handleButtonClick(button.value)}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ConsultPage;
