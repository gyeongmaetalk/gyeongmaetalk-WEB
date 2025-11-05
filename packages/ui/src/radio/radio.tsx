"use client";

import { createContext, useContext } from "react";

import { cn } from "@gyeongmaetalk/utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  children: React.ReactNode;
  className?: string;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function RadioGroup({ className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={props}>
      <div className={cn("flex flex-col gap-2", className)}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

interface RadioProps extends Omit<InputProps, "size"> {
  size?: "default" | "sm";
}

const radioSize = {
  default: {
    container: "size-8",
    input: "size-5",
    dot: "size-2",
  },
  sm: {
    container: "size-7",
    input: "size-4",
    dot: "size-[7px]",
  },
};

function Radio({ className, size = "default", value, ...props }: RadioProps) {
  const { value: groupValue, onValueChange, name } = useContext(RadioGroupContext);
  const isChecked = groupValue === value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  return (
    <div
      className={cn(
        "has-active:bg-label-normal/12 relative flex items-center justify-center rounded-full transition-all",
        radioSize[size].container
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className={cn(
          "peer border-cool-neutral-50/22 checked:border-primary-normal hover:border-primary-strong checked:bg-primary-normal appearance-none rounded-full border-[1.5px] transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          radioSize[size].input,
          className
        )}
        {...props}
      />
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100",
          radioSize[size].dot
        )}
      />
    </div>
  );
}

export { RadioGroup, Radio };
