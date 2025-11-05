import { Accordion } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import { Loader2 } from "lucide-react";

import { useGetMyQna } from "~/lib/tanstack/query/qna";
import type { QnaStatus } from "~/types/qna";

const getQnaStatus = (status: QnaStatus) => {
  switch (status) {
    case "PENDING":
      return "답변 대기";
    case "ANSWERED":
      return "답변 완료";
  }
};

const getQnaAnswerTime = (time: string) => {
  const date = new Date(time);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })
    .format(date)
    .replace(/(\d{4})\. (\d{2})\. (\d{2})\. (.+)/, "$1.$2.$3 $4");
};

export default function MyInquiryTab() {
  const { data: myQna, isLoading, isError } = useGetMyQna();

  return (
    <div className="h-full space-y-2 px-2">
      {isError ? (
        <div className="flex h-full items-center">
          <p className="font-label1-normal-regular text-label-neutral mx-auto">
            오류가 발생했습니다.
          </p>
        </div>
      ) : isLoading || !myQna ? (
        <div className="flex h-full items-center">
          <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
        </div>
      ) : myQna.length === 0 ? (
        <div className="flex h-full items-center">
          <p className="font-label1-normal-regular text-label-neutral mx-auto">
            문의 내역이 없습니다.
          </p>
        </div>
      ) : (
        myQna.map((qna) => (
          <Accordion key={`${qna.qnaTitle}-${qna.qnaStatus}`}>
            <Accordion.Header>
              <div className="flex w-full items-center justify-between gap-2">
                <p className="font-body2-normal-bold">{qna.qnaTitle}</p>
                <p
                  className={cn(
                    "font-label1-normal-bold mr-2",
                    qna.qnaStatus === "PENDING" ? "text-label-alternative" : "text-status-positive"
                  )}
                >
                  {getQnaStatus(qna.qnaStatus)}
                </p>
              </div>
            </Accordion.Header>
            <Accordion.Content className="space-y-2">
              <div className="space-y-2 px-2">
                <p className="font-label1-normal-regular text-label-neutral">{qna.qnaContent}</p>
                <p className="font-label1-normal-regular text-cool-neutral-70">
                  {getQnaAnswerTime(qna.createdAt)}
                </p>
              </div>
              {qna.answerTime && (
                <div className="bg-cool-neutral-99 space-y-2 px-2 py-3">
                  <p className="font-label1-normal-bold text-label-normal">답변</p>
                  <p className="font-label1-normal-regular text-label-neutral">
                    {qna.answerContent}
                  </p>
                  <p className="font-label1-normal-regular text-cool-neutral-70">
                    {getQnaAnswerTime(qna.answerTime)}
                  </p>
                </div>
              )}
            </Accordion.Content>
          </Accordion>
        ))
      )}
    </div>
  );
}
