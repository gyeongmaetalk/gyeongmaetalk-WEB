import { useState } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";

import Divider from "~/components/divider";
import { Verified } from "~/components/icons";
import { Calendar as CalendarIcon, Person } from "~/components/icons";
import Image from "~/components/image";
import { Header } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import CancelApplyConsult from "~/components/modal/cancel-apply-consult";
import { COUNSEL } from "~/constants";
import { useReserveConsult } from "~/lib/tanstack/mutation/counsel";
import { useGetAvailableTimes } from "~/lib/tanstack/query/counsel";
import type { MatchCounselResponse, ReserveConsultResponse } from "~/models/counsel";
import { errorToast } from "~/utils/toast";

import Calendar from "./calendar";
import type { Mode } from "./page";
import TimeSelect from "./time-select";

interface SecondStepProps {
  consultant: MatchCounselResponse;
  setReservationResult: (result: ReserveConsultResponse) => void;
  onChangeMode: (mode: Mode) => void;
}

const SecondStep = ({ consultant, onChangeMode, setReservationResult }: SecondStepProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const formatedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";

  const { data: availableTimes = [], isLoading } = useGetAvailableTimes({
    counseldorId: consultant.counselorId,
    date: formatedDate,
  });

  const { mutateAsync: reserveConsult, isPending } = useReserveConsult({
    onSuccess: async (data) => {
      setReservationResult(data.result);
      await queryClient.invalidateQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
      onChangeMode("complete");
    },
    onError: (error) => {
      errorToast("상담 예약에 실패했어요.");
      console.error(error);
    },
  });

  const reservationDisabled = !selectedDate || !selectedTime;

  const onReservation = async () => {
    await reserveConsult({
      counseldorId: consultant.counselorId,
      counselFormId: consultant.counselFormId,
      date: `${formatedDate}T${selectedTime}`,
    });
  };

  return (
    <>
      <PageLayout
        header={
          <Header.Container>
            <Header.Left>
              <Header.Back onClick={() => onChangeMode(null)} />
            </Header.Left>
            <Header.Center>
              <Header.Title>상담 신청</Header.Title>
            </Header.Center>
            <Header.Right>
              <Header.Close onClick={() => setIsModalOpen(true)} />
            </Header.Right>
          </Header.Container>
        }
      >
        <section className="space-y-4 px-4 py-6">
          <div className="flex items-center gap-1">
            <Person className="text-primary-normal" />
            <p className="font-headline2-bold text-label-strong">상담사 정보</p>
          </div>
          <div className="bg-cool-neutral-98 flex items-center gap-3 rounded-lg p-3">
            <Image className="size-10 rounded-full" />
            <div className="space-y-1">
              <div className="flex items-center gap-0.5">
                <p className="font-label2-bold text-label-strong">
                  {consultant.counselorName} 상담사
                </p>
                <Verified />
              </div>
              <p className="font-label2-regular text-label-neutral">
                {consultant.experience}년차 경매지도사
              </p>
            </div>
          </div>
        </section>
        <Divider className="h-2" />
        <section className="space-y-4 px-4 py-6">
          <div className="flex items-center gap-1">
            <CalendarIcon className="text-primary-normal" />
            <p className="font-headline2-bold text-label-strong">상담 일정을 선택해 주세요.</p>
          </div>
          <div className="space-y-6">
            <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            {selectedDate && (
              <>
                <Divider className="bg-cool-neutral-97" />
                {isLoading ? (
                  <Loader2 className="text-primary-normal mx-auto animate-spin" />
                ) : (
                  <TimeSelect
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    availableTimes={availableTimes}
                    onTimeSelect={setSelectedTime}
                  />
                )}
              </>
            )}
          </div>
          <div className="mt-6 pt-2 pb-6">
            <Button
              onClick={onReservation}
              className="w-full"
              disabled={reservationDisabled || isPending}
              loading={isPending}
            >
              예약 하기
            </Button>
          </div>
        </section>
      </PageLayout>
      <CancelApplyConsult isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </>
  );
};

export default SecondStep;
