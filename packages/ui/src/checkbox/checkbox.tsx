import { cn } from "@gyeongmaetalk/utils";

import { Check } from "lucide-react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "default" | "sm";
}

const checkboxSize = {
  default: {
    container: "size-8",
    input: "size-4.5",
    check: "size-4",
  },
  sm: {
    container: "size-7",
    input: "size-4",
    check: "size-3.5",
  },
};

function Checkbox({ className, size = "default", ...props }: CheckboxProps) {
  return (
    <div
      className={cn(
        "has-active:bg-label-normal/12 relative flex items-center justify-center rounded-full transition-all",
        checkboxSize[size].container
      )}
    >
      <input
        type="checkbox"
        className={cn(
          "peer border-cool-neutral-50/22 checked:border-primary-normal checked:bg-primary-normal hover:border-primary-strong appearance-none rounded-[5px] border-[1.5px] bg-white transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          checkboxSize[size].input,
          className
        )}
        {...props}
      />
      <Check
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100",
          checkboxSize[size].check
        )}
      />
    </div>
  );
}

export { Checkbox };
