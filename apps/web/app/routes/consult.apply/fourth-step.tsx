import { useState } from "react";

import { Button } from "@gyeongmaetalk/ui";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import { trackMixpanelEvent } from "~/lib/analytics/mixpanel-client";
import { MIXPANEL_EVENT } from "~/lib/analytics/mixpanel-events";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";

import { CATEGORY_OPTIONS } from "./constant";
import Select from "./select";

interface FourthStepProps {
  form: UseFormReturn<ApplyConsultForm>;
  mode?: string;
}

const FourthStep = ({ form, mode }: FourthStepProps) => {
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
    trackMixpanelEvent(MIXPANEL_EVENT.CONSULTATION_STEP_COMPLETED, {
      step_number: 4,
      selected_option: category,
      is_input_direct: false,
    });
    form.setValue("category", category);
    const searchParams = new URLSearchParams();
    searchParams.set("step", "5");
    if (mode) {
      searchParams.set("mode", mode);
    }
    navigate(`?${searchParams.toString()}`);
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
