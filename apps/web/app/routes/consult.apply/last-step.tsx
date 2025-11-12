import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import { Loader2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import Modal from "~/components/modal";
import SuggestLogin from "~/components/modal/suggest-login";
import { useMatchCounsel } from "~/lib/tanstack/mutation/counsel";
import { useGetMyInfo } from "~/lib/tanstack/query/auth";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";
import { errorToast } from "~/utils/toast";

import { LAST_STEP_OPTIONS } from "./constant";
import Select from "./select";

interface LastStepProps {
  form: UseFormReturn<ApplyConsultForm>;
}

const LastStep = ({ form }: LastStepProps) => {
  const { data: myInfo } = useGetMyInfo();

  const [name, setName] = useState(form.getValues("name"));
  const [innerOption, setInnerOption] = useState("");
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const { mutate: matchCounsel } = useMatchCounsel({
    onSuccess: (data) => {
      navigate("/consult/matching", { replace: true, state: data.result });
    },
    onError: (error) => {
      errorToast("상담 신청에 실패했어요.");
      console.error(error);
    },
  });

  const submitDisabled = name === "개인" ? !innerOption : !name;
  const isInnerOpen = name === "개인";

  const onSelect = (value: string) => {
    if (name === value.trim()) {
      setName("");
    } else {
      setName(value);
    }
  };

  const onInnerSelect = (value: string) => {
    if (innerOption === value.trim()) {
      setInnerOption("");
    } else {
      setInnerOption(value);
    }
  };

  const onPrev = () => {
    navigate("?step=4");
  };

  const onComplete = form.handleSubmit(
    async (data) => {
      if (!myInfo) return setIsShowLoginModal(true);

      const selectedValue = name === "개인" ? `개인,${innerOption}` : name;

      matchCounsel({
        purpose: data.purpose,
        area: data.region,
        serviceType: data.service,
        interest: data.category,
        participantType: selectedValue,
      });
    },
    (errors) => {
      console.error(errors);
    }
  );

  return (
    <>
      <section className="space-y-9 px-4">
        <div className="space-y-2">
          <p className="font-label2-bold text-primary-normal">5. 명의</p>
          <p className="font-heading1-bold text-label-strong">
            경매 참여는 어떤 명의로
            <br />
            하실 계획이신가요?
          </p>
          <p className="text-cool-neutral-50 font-body1-normal-regular">
            절세 전략과 대출 조건 상담에 활용돼요.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {LAST_STEP_OPTIONS.map((option) => (
            <div key={option.label} className="space-y-2">
              <Select
                label={option.label}
                isSelected={name === option.label}
                onChange={() => onSelect(option.label)}
              />
              <div className="space-y-1.5">
                {option.options &&
                  isInnerOpen &&
                  option.options.map((inner) => (
                    <Select
                      key={inner.label}
                      variant="inner"
                      label={inner.label}
                      isSelected={innerOption === inner.label}
                      onChange={() => onInnerSelect(inner.label)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <FloatingContainer className="flex gap-3">
        <Button onClick={onPrev} theme="assistive" className="flex-1 transition-none">
          이전
        </Button>
        <Button onClick={onComplete} disabled={submitDisabled} className="flex-1 transition-none">
          완료
        </Button>
      </FloatingContainer>
      {(form.formState.isSubmitting || form.formState.isSubmitSuccessful) && (
        <Modal className="flex flex-col items-center justify-center gap-7 bg-transparent">
          <Loader2 className="size-20 animate-spin text-white" />
          <Modal.Content className="font-heading1-bold text-white">
            ‘{myInfo?.name ?? "사용자"}’님에게 적합한
            <br />
            경매 전문가를 찾고 있어요
          </Modal.Content>
        </Modal>
      )}
      <SuggestLogin isOpen={isShowLoginModal} />
    </>
  );
};

export default LastStep;
