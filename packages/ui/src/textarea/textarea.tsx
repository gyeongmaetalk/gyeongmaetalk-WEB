"use client";

import { useState } from "react";

import { cn } from "@gyeongmaetalk/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  errorText?: string;
  successText?: string;
  helperText?: string;
  additionalText?: string;
}

const DEFAULT_MAX_LENGTH = 2000;

function Textarea({
  label,
  errorText,
  successText,
  helperText,
  additionalText,
  ...props
}: TextareaProps) {
  const {
    className,
    value: controlledValue,
    onChange: controlledOnChange,
    required,
    ...restProps
  } = props;
  const [internalValue, setInternalValue] = useState("");

  // controlled 또는 uncontrolled 상태에 따라 value 결정
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const maxLength = restProps.maxLength || DEFAULT_MAX_LENGTH;
  const isHelperTextRender = errorText || successText || helperText;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
      return;
    }
    controlledOnChange?.(e);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="font-label1-normal-bold">
          {label} {required && <span className="text-status-negative">*</span>}
        </label>
      )}
      <div
        className={cn(
          "placeholder:text-label-assistive focus-within:border-primary font-body1-normal-regular border-cool-neutral-50/16 flex flex-col gap-2 rounded-[12px] border p-3 transition-colors outline-none focus-within:border-2",
          errorText && "focus-within:border-status-negative/43 border-status-negative/28",
          restProps.disabled && "bg-cool-neutral-50/8",
          className
        )}
      >
        <textarea
          className="disabled:placeholder:text-label-disable disabled:text-label-alternative flex-1 resize-none outline-none"
          value={currentValue}
          onChange={onChange}
          maxLength={maxLength}
          {...restProps}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-label-alternative font-label2-medium">
            {currentValue.toString().length}/{maxLength}
          </p>
          {additionalText && (
            <p className="text-primary-normal font-body1-normal-bold line-clamp-1">
              {additionalText}
            </p>
          )}
        </div>
      </div>
      {isHelperTextRender && (
        <p
          className={cn(
            "font-caption1-regular",
            errorText ? "text-status-negative" : "text-label-alternative"
          )}
        >
          {errorText || successText || helperText}
        </p>
      )}
    </div>
  );
}

export { Textarea };
