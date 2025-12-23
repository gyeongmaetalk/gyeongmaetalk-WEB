import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { WithCloseHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import CancelApplyConsult from "~/components/modal/cancel-apply-consult";
import ApplyConsultError from "~/routes/consult.apply/error";
import FirstStep from "~/routes/consult.apply/first-step";
import FourthStep from "~/routes/consult.apply/fourth-step";
import LastStep from "~/routes/consult.apply/last-step";
import { type ApplyConsultForm, applyConsultFormSchema } from "~/routes/consult.apply/schema";
import SecondStep from "~/routes/consult.apply/second-step";
import Stepper from "~/routes/consult.apply/stepper";
import ThirdStep from "~/routes/consult.apply/third-step";

interface ConsultApplyPageProps {
  defaultValues: ApplyConsultForm;
  mode?: string;
  step: number;
  counselFormId?: number;
}

const ConsultApplyPage = ({ defaultValues, mode, step, counselFormId }: ConsultApplyPageProps) => {
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isChangeMode = mode === "change";

  const form = useForm<ApplyConsultForm>({
    resolver: zodResolver(applyConsultFormSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const onResetError = () => {
    form.reset();
    setIsError(false);
    const searchParams = new URLSearchParams();
    if (mode) {
      searchParams.set("mode", mode);
    }
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep form={form} mode={mode} />;
      case 2:
        return <SecondStep form={form} mode={mode} />;
      case 3:
        return <ThirdStep form={form} mode={mode} />;
      case 4:
        return <FourthStep form={form} mode={mode} />;
      case 5:
        return <LastStep form={form} isChangeMode={isChangeMode} counselFormId={counselFormId} />;
    }
  };

  useEffect(() => {
    // 스텝의 범위를 벗어났는지 확인
    const isOutOfRange = step > 5 || step < 1;

    // 이전 스텝의 값이 빈 문자열이라면 잘못된 접근
    const isStepValid = (() => {
      switch (step) {
        case 2:
          return !!form.getValues("purpose");
        case 3:
          return !!form.getValues("region");
        case 4:
          return !!form.getValues("service");
        case 5:
          return !!form.getValues("category");
        default:
          return true;
      }
    })();

    if (isOutOfRange || !isStepValid) {
      setIsError(true);
    }
  }, [step]);

  return isError ? (
    <ApplyConsultError onResetError={onResetError} />
  ) : (
    <PageLayout header={<WithCloseHeader title="상담 신청" onClose={() => setIsModalOpen(true)} />}>
      <Stepper currentStep={step} />
      {renderStep()}
      <CancelApplyConsult isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default ConsultApplyPage;
