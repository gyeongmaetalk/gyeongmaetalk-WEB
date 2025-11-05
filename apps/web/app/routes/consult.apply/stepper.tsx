import { cn } from "@gyeongmaetalk/utils";

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="mb-6 mt-5 flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-cool-neutral-97 h-1 flex-1 rounded-full transition-colors",
            index < currentStep && "bg-primary"
          )}
        />
      ))}
    </div>
  );
};

export default Stepper;
