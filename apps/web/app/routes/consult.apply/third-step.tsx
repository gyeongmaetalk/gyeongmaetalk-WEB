import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";

import { SERVICE_OPTIONS } from "./constant";
import Select from "./select";

interface ThirdStepProps {
  form: UseFormReturn<ApplyConsultForm>;
}

const ThirdStep = ({ form }: ThirdStepProps) => {
  const [service, setService] = useState(form.getValues("service"));

  const navigate = useNavigate();

  const nextDisabled = !service;

  const onSelect = (value: string) => {
    if (service === value) {
      setService("");
    } else {
      setService(value);
    }
  };

  const onNext = () => {
    form.setValue("service", service);
    navigate("?step=4");
  };

  const onPrev = () => {
    navigate("?step=2");
  };

  return (
    <>
      <section className="space-y-9 px-4">
        <div className="space-y-2">
          <p className="font-label2-bold text-primary-normal">3. 희망 서비스</p>
          <p className="font-heading1-bold text-label-strong">
            도움이 필요한 서비스 범위를
            <br />
            선택해 주세요
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {SERVICE_OPTIONS.map((option) => (
            <Select
              key={option}
              label={option}
              isSelected={service === option}
              onChange={() => onSelect(option)}
            />
          ))}
        </div>
      </section>
      <FloatingContainer className="flex gap-3">
        <Button onClick={onPrev} theme="assistive" className="flex-1 transition-none">
          이전
        </Button>
        <Button onClick={onNext} disabled={nextDisabled} className="flex-1 transition-none">
          다음
        </Button>
      </FloatingContainer>
    </>
  );
};

export default ThirdStep;
