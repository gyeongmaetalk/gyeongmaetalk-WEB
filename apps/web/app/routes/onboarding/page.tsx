import { useEffect, useState } from "react";

import {
  Button,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

import { useNavigate, useSearchParams } from "react-router";

import Image from "~/components/image";
import { Header } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { ONBOARDING_STEPS } from "~/routes/onboarding/constant";

const OnboardingPage = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isApplyMode = searchParams.get("mode") === "apply";
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;
  const buttonText = isLastStep ? (isApplyMode ? "무료 상담 신청하기" : "경매톡 시작하기") : "다음";

  const onNext = () => {
    if (api?.canScrollNext() && !isLastStep) {
      api?.scrollNext();
    }
    if (isLastStep) {
      const location = isApplyMode ? "/consult/apply" : "/";
      navigate(location);
    }
  };

  const onPrev = () => {
    if (api?.canScrollPrev()) {
      api?.scrollPrev();
    }
  };

  const onSkip = () => {
    setCurrentStep(ONBOARDING_STEPS.length - 1);
    api?.scrollTo(ONBOARDING_STEPS.length - 1);
  };

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCurrentStep(api.selectedScrollSnap());
      });
    }
  }, [api]);

  return (
    <PageLayout
      header={
        <Header.Container className="bg-transparent">
          <Header.Left>
            <Header.Back onClick={onPrev} />
          </Header.Left>
          {!isLastStep && (
            <Header.Right>
              <Button
                variant="text"
                theme="assistive"
                onClick={onSkip}
                className="p-0 hover:bg-transparent active:bg-transparent"
              >
                건너뛰기
              </Button>
            </Header.Right>
          )}
        </Header.Container>
      }
      style={{
        background: "linear-gradient(225.28deg, #D8EAFF 22.13%, #F5F7FF 68.11%)",
      }}
    >
      <div className="flex h-[calc(100%-5.625rem)] flex-col">
        <Carousel className="h-full" setApi={setApi}>
          <CarouselContent containerClassName="h-full" className="h-full">
            {ONBOARDING_STEPS.map((step) => (
              <CarouselItem key={`${step.id}-${step.title}`}>
                <div className="flex h-full flex-col px-4 py-5">
                  <div>
                    <h3 className="font-body1-normal-bold text-primary-normal">{step.title}</h3>
                    <p className="font-heading1-bold text-label-strong whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                  <Image src={step.image} alt={step.title} className="aspect-square" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center gap-1 py-10">
          {Array.from({ length: ONBOARDING_STEPS.length }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-label-assistive size-2 rounded-full transition-all",
                currentStep === index && "bg-label-neutral w-5"
              )}
            />
          ))}
        </div>
      </div>
      <div className="px-5">
        <Button onClick={onNext} className="w-full">
          {buttonText}
        </Button>
      </div>
    </PageLayout>
  );
};

export default OnboardingPage;
