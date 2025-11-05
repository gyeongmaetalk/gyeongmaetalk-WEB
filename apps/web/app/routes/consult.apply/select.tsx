import { cn } from "@gyeongmaetalk/utils";

interface SelectProps {
  variant?: "default" | "inner";
  label: string;
  isSelected: boolean;
  onChange: () => void;
}

const defaultStyles = {
  default: "border border-cool-neutral-95",
  inner: "bg-cool-neutral-50/16",
};

const selectedStyles = {
  default: "border-primary-normal text-primary-normal",
  inner: "bg-primary-normal/8",
};

const Select = ({ variant = "default", label, isSelected, onChange }: SelectProps) => {
  return (
    <button
      className={cn(
        "flex h-20 w-full flex-col justify-center gap-2 rounded-[12px] px-4 transition-colors",
        defaultStyles[variant],
        isSelected && selectedStyles[variant]
      )}
      onClick={onChange}
    >
      {label}
    </button>
  );
};

export default Select;
