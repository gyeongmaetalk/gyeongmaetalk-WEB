import { useState } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Button, Modal, Spinner } from "@gyeongmaetalk/ui";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import FloatingContainer from "~/components/container/floating-container";
import SuggestLogin from "~/components/modal/suggest-login";
import SuggestSignup from "~/components/modal/suggest-signup";
import { trackMixpanelEvent } from "~/lib/analytics/mixpanel-client";
import { MIXPANEL_EVENT } from "~/lib/analytics/mixpanel-events";
import { counselKeys } from "~/lib/tanstack/keys/counsel";
import { useChangeMatchCounsel, useMatchCounsel } from "~/lib/tanstack/mutation/counsel";
import { useMixpanelSessionStore } from "~/lib/zustand/mixpanel-session";
import { useUserStore } from "~/lib/zustand/user";
import { type ApplyConsultForm } from "~/routes/consult.apply/schema";
import { errorToast } from "~/utils/toast";

import { LAST_STEP_OPTIONS } from "./constant";
import Select from "./select";

interface LastStepProps {
  form: UseFormReturn<ApplyConsultForm>;
  isChangeMode: boolean;
  counselFormId?: number;
}

const LastStep = ({ form, isChangeMode, counselFormId }: LastStepProps) => {
  const { isLoggedIn, user, isRegistered } = useUserStore();

  const defauleName = form.getValues("name").split(",");
  const [name, setName] = useState(defauleName[0]);
  const [innerOption, setInnerOption] = useState(defauleName[1] || "");
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isShowSignupModal, setIsShowSignupModal] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync: matchCounsel } = useMatchCounsel({
    onSuccess: (data) => {
      const selectedValue = name === "개인" ? `개인,${innerOption}` : name;
      const body = {
        purpose: form.getValues("purpose"),
        area: form.getValues("region"),
        serviceType: form.getValues("service"),
        interest: form.getValues("category"),
        participantType: selectedValue,
      };
      const startedAtMs: number | null = useMixpanelSessionStore.getState().consultFormStartedAtMs;
      const totalTimeTaken = startedAtMs !== null ? Date.now() - startedAtMs : 0;
      trackMixpanelEvent(MIXPANEL_EVENT.CONSULTATION_FORM_SUBMITTED, {
        total_time_taken: totalTimeTaken,
        all_options_summary: JSON.stringify(body),
      });
      navigate("/consult/matching", {
        replace: true,
        state: { result: data.result, matchCounselRequest: body },
      });
    },
    onError: (error) => {
      errorToast("상담 신청에 실패했어요.");
      console.error(error);
    },
  });

  const { mutateAsync: changeMatchCounsel } = useChangeMatchCounsel({
    onSuccess: (data) => {
      const selectedValue = name === "개인" ? `개인,${innerOption}` : name;
      const body = {
        purpose: form.getValues("purpose"),
        area: form.getValues("region"),
        serviceType: form.getValues("service"),
        interest: form.getValues("category"),
        participantType: selectedValue,
      };
      const startedAtMs: number | null = useMixpanelSessionStore.getState().consultFormStartedAtMs;
      const totalTimeTaken = startedAtMs !== null ? Date.now() - startedAtMs : 0;
      trackMixpanelEvent(MIXPANEL_EVENT.CONSULTATION_FORM_SUBMITTED, {
        total_time_taken: totalTimeTaken,
        all_options_summary: JSON.stringify({ ...body, mode: "change" }),
      });
      queryClient.invalidateQueries({ queryKey: counselKeys.getReservedCounselData() });
      navigate("/consult/matching?mode=change", {
        replace: true,
        state: { result: data.result },
      });
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
      if (!isLoggedIn) {
        return setIsShowLoginModal(true);
      }

      if (!isRegistered) {
        return setIsShowSignupModal(true);
      }

      const selectedValue = name === "개인" ? `개인,${innerOption}` : name;
      const body = {
        purpose: data.purpose,
        area: data.region,
        serviceType: data.service,
        interest: data.category,
        participantType: selectedValue,
      };

      trackMixpanelEvent(MIXPANEL_EVENT.CONSULTATION_STEP_COMPLETED, {
        step_number: 5,
        selected_option: selectedValue,
        is_input_direct: false,
      });

      if (!isChangeMode && user) {
        trackMixpanelEvent(MIXPANEL_EVENT.MATCHING_LOADING_VIEWED, {
          matching_algorithm_version: "web-v1",
        });
      }

      if (isChangeMode && counselFormId) {
        await changeMatchCounsel({ ...body, counselFormId });
      } else {
        await matchCounsel(body);
      }
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
        <Button
          onClick={onComplete}
          disabled={submitDisabled}
          loading={form.formState.isSubmitting}
          className="flex-1 transition-none"
        >
          완료
        </Button>
      </FloatingContainer>
      {(form.formState.isSubmitting || form.formState.isSubmitSuccessful) &&
        !isChangeMode &&
        user && (
          <Modal className="flex flex-col items-center justify-center gap-7 bg-transparent">
            <Spinner className="size-20 text-white" />
            <Modal.Content className="font-heading1-bold text-white">
              {isChangeMode
                ? "예약을 변경하고 있어요"
                : `‘${user.name}’님에게 적합한
              경매 전문가를 찾고 있어요`}
            </Modal.Content>
          </Modal>
        )}
      <SuggestLogin isOpen={isShowLoginModal} />
      <SuggestSignup isOpen={isShowSignupModal} />
    </>
  );
};

export default LastStep;
