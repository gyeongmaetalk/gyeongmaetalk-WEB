import { useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { cn } from "@gyeongmaetalk/utils";

import { ChevronDown } from "lucide-react";

import { InquiryCategory } from "./schema";

interface InquiryDropdownProps {
  category: InquiryCategory;
  onSelectCategory: (value: InquiryCategory) => void;
}

const inquiryCategories = [
  {
    value: InquiryCategory.PAYMENT,
    label: "결제",
  },
  {
    value: InquiryCategory.ETC,
    label: "기타",
  },
];

export default function InquiryDropdown({ category, onSelectCategory }: InquiryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const currentLabel = inquiryCategories.find(({ value }) => value === category)?.label;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-label1-normal-bold">
        문의 유형 <span className="text-status-negative">*</span>
      </p>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={cn(
            "font-body1-normal-regular border-cool-neutral-50/16 shadow-input flex w-full flex-1 items-center justify-between rounded-[12px] border p-3 text-left outline-none",
            category ? "text-label-normal" : "text-label-alternative"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentLabel || "문의 유형을 선택해주세요."}
          <ChevronDown className={cn("size-5 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="font-body1-normal-regular border-cool-neutral-97 shadow-input absolute top-full right-0 z-100 mt-2 flex w-[140px] w-full flex-col rounded-[12px] border bg-white p-2">
            {inquiryCategories.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={cn(
                  "active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start",
                  value === category && "text-primary-normal"
                )}
                onClick={() => onSelectCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
