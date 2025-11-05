import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";

import { CATEGORY_OPTIONS } from "./constant";
import Select from "./select";

interface FourthStepProps {
  form: UseFormReturn<ApplyConsultForm>;
}

const FourthStep = ({ form }: FourthStepProps) => {
  const [category, setCategory] = useState(form.getValues("category"));

  const navigate = useNavigate();

  const nextDisabled = !category;

  const onSelect = (value: string) => {
    if (category === value) {
      setCategory("");
    } else {
      setCategory(value);
    }
  };

  const onNext = () => {
    form.setValue("category", category);
    navigate("?step=5");
  };

  const onPrev = () => {
    navigate("?step=3");
  };

  return (
    <>
      <section className="space-y-9 px-4">
        <div className="space-y-2">
          <p className="font-label2-bold text-primary-normal">4. 궁금한 분야</p>
          <p className="font-heading1-bold text-label-strong">궁금하신 분야가 있으신가요?</p>
        </div>
        <div className="flex flex-col gap-3">
          {CATEGORY_OPTIONS.map((option) => (
            <Select
              key={option}
              label={option}
              isSelected={category === option}
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

export default FourthStep;
