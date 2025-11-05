import { Accordion } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";

import { useGetFaq } from "~/lib/tanstack/query/qna";

export default function QuestionsPage() {
  const { data: faq, isLoading, isError } = useGetFaq();

  return (
    <div className="h-full space-y-2 px-5">
      {isError ? (
        <div className="flex h-full items-center">
          <p className="font-label1-normal-regular text-label-neutral mx-auto">
            오류가 발생했습니다.
          </p>
        </div>
      ) : isLoading || !faq ? (
        <div className="flex h-full items-center">
          <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
        </div>
      ) : faq.length === 0 ? (
        <div className="flex h-full items-center">
          <p className="font-label1-normal-regular text-label-neutral mx-auto">
            자주 묻는 질문이 없습니다.
          </p>
        </div>
      ) : (
        faq.map((fag) => (
          <Accordion key={fag.question}>
            <Accordion.Header>
              <p className="font-body2-normal-bold">{fag.question}</p>
            </Accordion.Header>
            <Accordion.Content>
              <p className="font-label1-normal-regular text-label-neutral">{fag.answer}</p>
            </Accordion.Content>
          </Accordion>
        ))
      )}
    </div>
  );
}
