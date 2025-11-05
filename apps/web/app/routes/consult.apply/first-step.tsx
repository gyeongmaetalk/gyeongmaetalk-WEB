import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";

import { PURPOSE_OPTIONS } from "./constant";
import Select from "./select";

interface FirstStepProps {
  form: UseFormReturn<ApplyConsultForm>;
}

const FirstStep = ({ form }: FirstStepProps) => {
  const [purpose, setPurpose] = useState(form.getValues("purpose"));

  const navigate = useNavigate();

  const nextDisabled = !purpose;

  const onNext = () => {
    navigate("?step=2");
    form.setValue("purpose", purpose);
  };

  const onSelect = (value: string) => {
    if (purpose === value) {
      setPurpose("");
    } else {
      setPurpose(value);
    }
  };

  return (
    <>
      <section className="space-y-9 px-4">
        <div className="space-y-2">
          <p className="font-label2-bold text-primary-normal">1. 목적</p>
          <p className="font-heading1-bold text-label-strong">
            어떤 목적으로
            <br />
            경매를 고려 중이신가요?
          </p>
          <p className="text-cool-neutral-50 font-body1-normal-regular">
            원하는 목적에 맞춰 상담해드려요.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {PURPOSE_OPTIONS.map((option) => (
            <Select
              key={option}
              label={option}
              isSelected={purpose === option}
              onChange={() => onSelect(option)}
            />
          ))}
        </div>
      </section>
      <FloatingContainer className="flex gap-3">
        <Button onClick={onNext} disabled={nextDisabled} className="w-full transition-none">
          다음
        </Button>
      </FloatingContainer>
    </>
  );
};

export default FirstStep;
