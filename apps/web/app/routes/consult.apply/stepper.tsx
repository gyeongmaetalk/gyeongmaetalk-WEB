import { cn } from "@gyeongmaetalk/utils";

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="mt-5 mb-6 flex items-center gap-2 mx-4">
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
