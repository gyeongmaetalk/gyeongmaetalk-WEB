import { cn } from "@gyeongmaetalk/utils";

import { Quote } from "lucide-react";

import { CounselStatus } from "~/constants";
import type { MatchCounselResponse, ReservedCounselDataResponse } from "~/models/counsel";

import { Star, Verified } from "../icons";
import Image from "../image";

interface ConsultantCardProps {
  consultant: ReservedCounselDataResponse["info"] | MatchCounselResponse;
  status?: CounselStatus;
}

const getStatusText = (status: ConsultantCardProps["status"]) => {
  switch (status) {
    case CounselStatus.COUNSEL_BEFORE:
      return "예약 확정";
    case CounselStatus.COUNSEL_AFTER:
      return "상담 완료";
    case CounselStatus.SUBSCRIBE:
      return "경매 진행";
  }
};

const getStatusColor = (status: ConsultantCardProps["status"]) => {
  if (status === CounselStatus.COUNSEL_BEFORE) return "text-green-20 bg-green-95";
  return "text-blue-20 bg-blue-95";
};

const ConsultantCard = ({ status, consultant }: ConsultantCardProps) => {
  return (
    <section className="shadow-card from-primary-normal/50 flex flex-col items-center gap-4 rounded-[12px] bg-linear-to-tr to-[#13DBFF]/20 p-px">
      <div className="flex w-full flex-col gap-2 rounded-[12px] bg-white p-4">
        {status && (
          <div
            className={cn("font-caption1-bold w-max rounded-sm px-2 py-1", getStatusColor(status))}
          >
            {getStatusText(status)}
          </div>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          <Image className="size-[72px] rounded-full" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <p className="font-heading2-bold">{consultant.counselorName} 상담사</p>
              <Verified />
            </div>
            <p className="text-label-neutral font-label1-normal-regular">경매지도사</p>
            <div className="font-label1-normal-regular flex items-center gap-1">
              <Star className="text-status-cautionary" />
              <p>{consultant.score}</p>
              <p className="text-label-neutral underline">리뷰 {consultant.reviewCount}건</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Quote fill="#007fff" className="size-3 rotate-180 text-transparent" />
            <p className="font-body1-normal-medium">{consultant.description}</p>
            <Quote fill="#007fff" className="size-3 text-transparent" />
          </div>
          <div className="bg-blue-99 w-full rounded-md">
            <div className="flex items-center gap-2 px-3 py-2">
              <p className="font-label1-normal-bold w-[60px]">전문분야</p>
              <p className="font-label1-normal-regular">{consultant.specialization}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <p className="font-label1-normal-bold w-[60px]">경력</p>
              <p className="font-label1-normal-regular">{consultant.experience}년차</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <p className="font-label1-normal-bold w-[60px]">누적상담</p>
              <p className="font-label1-normal-regular">{consultant.counselCount}건</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <p className="font-label1-normal-bold w-[60px]">자격</p>
              <p className="font-label1-normal-regular">{consultant.license}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultantCard;
