import { useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { cn } from "@gyeongmaetalk/utils";

import { useNavigate } from "react-router";

import { ArrowDown } from "~/components/icons";

const SORT_OPTIONS = [
  {
    label: "최신순",
    value: "LATEST",
  },
  {
    label: "오래된순",
    value: "OLDEST",
  },
  {
    label: "별점 높은 순",
    value: "HIGHEST_SCORE",
  },
  {
    label: "별점 낮은 순",
    value: "LOWEST_SCORE",
  },
];

interface FilterDropdownProps {
  [key: string]: string;
  sort: string;
}

const FilterDropdown = (props: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [menuRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const navigate = useNavigate();

  const currentSort = props.sort || "LATEST";
  const currentLabel = SORT_OPTIONS.find((option) => option.value === currentSort)?.label;
  const params = new URLSearchParams(props);

  const onClickFilter = (value: string) => {
    params.set("sort", value);
    navigate(`?${params.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="border-cool-neutral-50/16 font-caption1-medium flex items-center gap-0.5 rounded-sm border py-1 pl-2 pr-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <ArrowDown />
      </button>
      {isOpen && (
        <div className="font-body1-normal-regular border-cool-neutral-97 shadow-input z-100 absolute right-0 top-full mt-2 flex w-[140px] flex-col rounded-[12px] border bg-white p-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={cn(
                "active:bg-cool-neutral-97 rounded-[12px] px-3 py-2 text-start",
                option.value === currentSort && "text-primary-normal"
              )}
              onClick={() => onClickFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
