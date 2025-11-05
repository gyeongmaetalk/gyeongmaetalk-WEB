import * as React from "react";

import { cn } from "@gyeongmaetalk/utils";

import { cva } from "class-variance-authority";

interface BadgeProps extends React.ComponentProps<"div"> {
  /**
   * 뱃지 종류
   * default(solid): 기본 뱃지
   * outlined: 테두리 뱃지
   */
  variant?: "default" | "outlined";

  /**
   * 뱃지 테마
   * default(neutral): 기본 뱃지
   * accent: 강조 색상
   */
  theme?: "default" | "accent";

  /**
   * 뱃지 크기
   * default(sm): 기본 뱃지
   * xs: 작은 뱃지
   * md: 중간 뱃지
   */
  size?: "default" | "xs" | "md";

  /**
   * 아이콘 위치
   * size를 이용해서 크기 조절
   */
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
}

const iconSize = {
  default: "size-3.5",
  xs: "size-3",
  md: "size-4",
};

const badgeCompoundVariants = [
  // default variant + theme combinations
  {
    variant: "default",
    theme: "default",
    class: "text-label-alternative/61 bg-cool-neutral-50/8 border border-transparent",
  } as const,
  {
    variant: "default",
    theme: "accent",
    class: "text-accent-fg-cyan bg-accent-fg-cyan/8 border border-transparent",
  } as const,
  // outlined variant + theme combinations
  {
    variant: "outlined",
    theme: "default",
    class: "text-label-alternative/61 border border-label-alternative/61 bg-transparent",
  } as const,
  {
    variant: "outlined",
    theme: "accent",
    class: "text-accent-fg-cyan bg-transparent border-accent-fg-cyan",
  } as const,
];

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap shrink-0 font-caption1-medium",
  {
    variants: {
      variant: {
        default: "border border-transparent",
        outlined: "border",
      },
      theme: {
        default: "",
        accent: "",
      },
      size: {
        default: "px-1.5 py-1 rounded-sm gap-[3px] font-caption1-medium",
        xs: "px-1.5 py-[3px] rounded-sm gap-0.5 font-caption2-medium",
        md: "px-2 py-[5px] rounded-md gap-1 font-label1-normal-medium",
      },
    },
    compoundVariants: badgeCompoundVariants,
    defaultVariants: {
      variant: "default",
      theme: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant,
  size,
  theme,
  LeftIcon,
  RightIcon,
  children,
  ...props
}: BadgeProps) {
  const childrenWithIcon = (
    <>
      {LeftIcon && <LeftIcon className={cn(iconSize[size ?? "default"])} />}
      {children}
      {RightIcon && <RightIcon className={cn(iconSize[size ?? "default"])} />}
    </>
  );

  return (
    <div className={cn(badgeVariants({ variant, size, theme, className }))} {...props}>
      {childrenWithIcon}
    </div>
  );
}

export { Badge };
